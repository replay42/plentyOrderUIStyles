# plentyOrderUIStyles
This is a quick & dirty script for usage with tampermonkey. 
It manipulates the Order-UI of the plentyMarkets System for better usability.

It only works with the `CompactView`-Mode

## Setup
Install Tempermonkey in Chrome
Install Script
Maybe adjust the match to `https://*.plentymarkets-cloud-de.com/*`

## Features
- change font-weight of "AUFTRAGSWERT" infobox
- change the color of an Order-Box-Header if its a different type of order (aka.: preorder, return, warranty or credit) for better visibility in the list of orders
- change the spacing of the order-boxes vertically, to better seperate the orders from eachother
- (currently optional) change the background of the status-box to the actal status-color and change te text-color to black or white, according to status-color-brightnes
