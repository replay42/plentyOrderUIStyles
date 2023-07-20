// ==UserScript==
// @name         plenty: Order UI CSS
// @namespace    biokinder
// @version      0.4
// @description  Modifies new ORderUI in Plentymarkets Backend to fit our needs
// @author       RbnSwr @biokinder
// @match        https://*.plentymarkets-cloud-de.com/plenty/terra/order/order-ui/overview
// @downloadURL  https://raw.githubusercontent.com/replay42/plentyOrderUIStyles/main/order-ui.js
// @updateURL    https://raw.githubusercontent.com/replay42/plentyOrderUIStyles/main/order-ui.js
// @grant        GM_addStyle
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css.replace(/;/g, ' !important;');
    head.appendChild(style);
}

function calculateBrightness(color) {
    // Extract the RGB values from the color string
    const rgb = color.match(/\d+/g);
    const red = parseInt(rgb[0]);
    const green = parseInt(rgb[1]);
    const blue = parseInt(rgb[2]);

    // Calculate the brightness using the formula
    const brightness = Math.sqrt(
        (red * red * 0.299) +
        (green * green * 0.587) +
        (blue * blue * 0.114)
    );

    return brightness;
}

function makeCertainBoxesBold() {
    const titles = document.getElementsByTagName('mat-grid-tile');
    // Loop through the <toolbar> elements
    for (let i = 0; i < titles.length; i++) {
        const box = titles[i];
        if (box.innerText.includes('AUFTRAGSWERT')) {
            box.classList.add('is_bold_text')
        }
    }


}

function updateToolbarColors() {
    const toolbars = document.getElementsByTagName('mat-toolbar');

    // Loop through the <toolbar> elements
    for (let i = 0; i < toolbars.length; i++) {
        const toolbar = toolbars[i];
        const anchor = toolbar.querySelector('a');

        if (anchor === null) continue;

        // Check if the content of the <a> element contains the desired text
        toolbar.classList.remove('preorder');
        if (anchor.innerText.includes('Vorbestellung'))
            toolbar.classList.add('preorder');

        toolbar.classList.remove('credit');
        if (anchor.innerText.includes('Gutschrift'))
            toolbar.classList.add('credit');

        toolbar.classList.remove('return');
        if (anchor.innerText.includes('Retoure'))
            toolbar.classList.add('return');

        toolbar.classList.remove('warranty');
        if (anchor.innerText.includes('Gewährleistung'))
            toolbar.classList.add('warranty');
    }
}

function updateStatusColors() {
    // Get all elements with the class "terra-order-ui-order-status-readonly"
    // Get all the outer elements
    const outerElements = document.querySelectorAll('terra-order-ui-order-status-readonly');

    // Loop through each outer element
    outerElements.forEach((element) => {
        // Get the first <div> element inside the outer element
        const firstDiv = element.querySelector('div');
        const matIcon = firstDiv.querySelector('.mat-icon');
        matIcon.style.display = 'none';
        const bgColor = matIcon.getAttribute('style').match(/color: (.*?);/)[1];

        const brightness = calculateBrightness(bgColor);
        // Set the text color based on brightness
        let color = '#fff';
        if (brightness > 128) {
            let color = '#000'; // Dark text color for light background
        }

        // Set the background color of the first <div> element
        firstDiv.style.backgroundColor = bgColor;
        firstDiv.style.color = color;
        firstDiv.style.padding = '1px 5px';
    });
}


(function() {
    'use strict';
    // Spacingt between order boxes
    addGlobalStyle('.compact-view-order-row {   \
                        margin: 0 0 20px;       \
                        background: #fff;       \
                    }')
    addGlobalStyle('.terra-table-container .terra-table-inner-container.background-white {\
                        background: none;       \
                    }')

    // Styles for different order tyopes
    addGlobalStyle('mat-toolbar.preorder    {     background: #f8caca; }')
    addGlobalStyle('mat-toolbar.credit      {     background: #fbd76a; }')
    addGlobalStyle('mat-toolbar.return      {     background: #cdb39e; }')
    addGlobalStyle('mat-toolbar.warranty    {     background: #b1e4a5; }')

    // Spacing of Boxes
    addGlobalStyle('* {    \
                    --space-md-fix: 15px;   \
                    --space-sm-fix: 7px;    \
    }');

    addGlobalStyle('.is_bold_text { font-weight: bold; }')

    setInterval(() => {

        updateToolbarColors();
        makeCertainBoxesBold();
        updateStatusColors();

    }, 1000);

})();