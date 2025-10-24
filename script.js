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
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    scrollPositionDisplay.textContent = `X: ${scrollX}, Y: ${scrollY}px`;
    if (scrollY < THRESHOLD_LOW) {
        scrollVisualization.style.background = 'forestgreen';
    } else if (scrollY >= THRESHOLD_LOW && scrollY < THRESHOLD_HIGH) {
        scrollVisualization.style.backgroundColor = 'gold';
    } else {
        scrollVisualization.style.backgroundColor = 'crimson';
    }
})

// ** Page status

const pageStatus = byId('page-status');

window.addEventListener('DOMContentLoaded', () => {
    pageStatus.textContent = 'DOM geladen';
})