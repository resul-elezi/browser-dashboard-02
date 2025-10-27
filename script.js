'use strict';

// Define short aliases
const byId = (id) => document.getElementById(id);
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// use case
// const element = $('#myId');
// const elements = $$('.myClass');
// const header = byId('header');

// Browser-Umgebungsmonitor

// ** Window size
const windowSize = byId('window-size');
let windowInnerWidth = window.innerWidth;
let windowInnerHeight = window.innerHeight;

windowSize.textContent = windowInnerWidth + 'px x ' + windowInnerHeight + 'px';
window.addEventListener('resize', () => {
    windowInnerWidth = window.innerWidth;
    windowInnerHeight = window.innerHeight;
    windowSize.textContent = windowInnerWidth + 'px x ' + windowInnerHeight + 'px';
})

const screenResolution = byId('screen-resolution');

screenResolution.textContent = window.screen.width + 'px x ' + window.screen.height + 'px';


// ** Scroll Position

const scrollPositionDisplay = byId('scroll-position');
const scrollVisualization = byId('scroll-visualization');
const THRESHOLD_LOW = 100;
const THRESHOLD_HIGH = 500;

function getScrollPosition() {
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
}
window.addEventListener('scroll', () => {
    getScrollPosition();
    scrollPositionDisplay.textContent = `X: ${scrollX}, Y: ${scrollY}px`;
    if (scrollY < THRESHOLD_LOW) {
        scrollVisualization.style.background = 'forestgreen';
    } else if (scrollY >= THRESHOLD_LOW && scrollY < THRESHOLD_HIGH) {
        scrollVisualization.style.background = 'gold';
    } else {
        scrollVisualization.style.background = 'crimson';
    }
})

// ** Page status

const pageStatus = byId('page-status');

document.addEventListener('DOMContentLoaded', () => {
    pageStatus.textContent = 'DOM geladen';
})

window.addEventListener('load', () => {
    pageStatus.textContent = 'Webseite vollständig geladen';
})

window.addEventListener('beforeunload', e => {
    getScrollPosition();
    if (scrollY < THRESHOLD_HIGH || scrollY === 0) {
        e.preventDefault();
        e.returnValue = '';
    }
})

// ** Navigator Informations

const browserInfo = byId('browser-info');

// browserInfo.textContent = navigator.appName;
browserInfo.textContent = navigator.appCodeName + ', ' + navigator.appVersion;