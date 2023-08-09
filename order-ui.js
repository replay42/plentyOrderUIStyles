// ==UserScript==
// @name         plenty: Order UI CSS
// @namespace    biokinder
// @version      0.5
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

function calculateBrightness(rgbColor) {
    // Parse the RGB values from the input color string
    const match = rgbColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) {
        return 0;
    }

    const red = parseInt(match[1], 10);
    const green = parseInt(match[2], 10);
    const blue = parseInt(match[3], 10);

    // Calculate the brightness level using the formula (0.299 * R + 0.587 * G + 0.114 * B)
    const brightness = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

    // Return the brightness level (a value between 0 and 1)
    return brightness;
}

function makeCertainBoxesBold() {
    const titles = document.getElementsByTagName('mat-grid-tile');
    // Loop through the <toolbar> elements
    for (let i = 0; i < titles.length; i++) {
        const box = titles[i];
        if (box.innerText.includes('Auftragswert')) {
            box.classList.add('is_bold_text')
            box.querySelector('.text-nowrap .infobox-text').style.fontSize = '110%';
        }
    }
}


function highlightSuisse() {
    const titles = document.getElementsByClassName('mat-grid-tile-content');
    // Loop through the <toolbar> elements
    for (let i = 0; i < titles.length; i++) {
        const box = titles[i];
        if (box.innerText.includes('Schweiz') && box.querySelector('.suisseFlag') === null) {
            let suisse = box.querySelector('.info-box-data-container div:nth-child(2) div');
            const newElement = document.createElement('div');

            // Set content and styles
            newElement.textContent = '+';
            newElement.style.background = 'red';
            newElement.style.width = '20px';
            newElement.style.height = '15px';
            newElement.style.color = '#ffff';
            newElement.style.display = 'inline-block';
            newElement.style.textAlign = 'center';
            newElement.style.lineHeight = '14px';
            newElement.style.fontWeight = 'bold';
            newElement.classList.add('suisseFlag');

            // Append the new element to the suisse element
            suisse.insertBefore(newElement, suisse.firstChild);

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
        const matgridtilecontent = element.closest('.mat-grid-tile-content');

        matIcon.style.display = 'none';
        const bgColor = matIcon.getAttribute('style').match(/color: (.*?);/)[1];

        const brightness = calculateBrightness(bgColor);
        // Set the text color based on brightness
        let color = '#000';
        if (brightness < 0.45) {
            color = '#fff'; // Dark text color for light background
        }

        // Set the background color of the first <div> element
        firstDiv.style.backgroundColor = bgColor;
        firstDiv.style.color = color;
        firstDiv.style.padding = '1px 10px';
        firstDiv.style.margin = '0 0 5px 0px';
        firstDiv.style.borderRadius = '5px';
        firstDiv.style.bottom = '5px';

        matgridtilecontent.flexFlow = 'column';

    });
}


(function () {
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
        highlightSuisse();

    }, 1000);

})();