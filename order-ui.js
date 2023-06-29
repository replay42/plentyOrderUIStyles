
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css.replace(/;/g, ' !important;');
    head.appendChild(style);
}

function orderInvoiceAddressFirstLineBold() {
    document.querySelectorAll('terra-order-ui-order-address-readonly').forEach((elem) => {
        elem.querySelectorAll('.infobox-text')[0].style.fontWeight = 900;
    });
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
        if (anchor.innerText.includes('Vorbestellung'))
            toolbar.classList.add('preorder');

        if (anchor.innerText.includes('Gutschrift'))
            toolbar.classList.add('credit');

        if (anchor.innerText.includes('Retoure'))
            toolbar.classList.add('return');

        if (anchor.innerText.includes('Gewährleistung'))
            toolbar.classList.add('warranty');
    }
}

function updateStatusColors() {
    // Get all elements with the class "terra-order-ui-order-status-readonly"
    const elements = document.querySelectorAll('terra-order-ui-order-status-readonly');
    // Iterate over each element and set the background color dynamically
    elements.forEach(element => {
        const color = getComputedStyle(element.querySelector('mat-icon')).color;

        const brightness = calculateBrightness(color);

        // Set the text color based on brightness
        if (brightness > 128) {
            element.style.color = '#000'; // Dark text color for light background
        } else {
            element.style.color = '#fff'; // Light text color for dark background
        }

        element.style.backgroundColor = color;
        element.style.display = 'block';
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

    addGlobalStyle('.is_bold_text { font-weight: bold; }')

    addGlobalStyle('* {    \
                    --space-md-fix: 15px;   \
                    --space-sm-fix: 7px;    \
    }');


    setInterval(() => {

        updateToolbarColors();
        makeCertainBoxesBold();
        orderInvoiceAddressFirstLineBold();
        // updateStatusColors();

    }, 1000);




})();