'use strict';

// Define short aliases
window.byId = (id) => document.getElementById(id);
window.$ = (selector) => document.querySelector(selector);
window.$$ = (selector) => document.querySelectorAll(selector);
window.log = console.log;

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
let currentScrollY = 0;
let currentScrollX = 0;

window.addEventListener('scroll', () => {
    currentScrollY = window.scrollY;
    currentScrollX = window.scrollX;
    scrollPositionDisplay.textContent = `X: ${currentScrollX}, Y: ${currentScrollY}px`;
    if (currentScrollY < THRESHOLD_LOW) {
        scrollVisualization.style.background = 'forestgreen';
    } else if (currentScrollY >= THRESHOLD_LOW && currentScrollY < THRESHOLD_HIGH) {
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

// window.addEventListener('beforeunload', e => {
//     if (currentScrollY < THRESHOLD_HIGH) {
//         e.preventDefault();
//         e.returnValue = '';
//     }
// })

// Navigator Information

const browserInfo = byId('browser-info');
const userLanguages = byId('languages');
const userPlatform = byId('platform');
const cookiesActive = byId('cookies-enabled');
const doNotTrack = byId('do-not-track');

// ** Browser-Name

let browserName;
if (navigator.userAgentData && navigator.userAgentData.brands && navigator.userAgentData.brands[0] && navigator.userAgentData.brands[0].brand) {
    browserName = navigator.userAgentData.brands[0].brand;
} else if (navigator.userAgent.includes("Chrome")) {
    browserName = "Chrome";
} else if (navigator.userAgent.includes("Firefox")) {
    browserName = "Firefox";
} else if (navigator.userAgent.includes("Safari")) {
    browserName = "Safari";
} else {
    browserName = "Unbekannt";
}

// ** Browser-Version

let browserVersion;
if (navigator.userAgentData && navigator.userAgentData.brands && navigator.userAgentData.brands[0] && navigator.userAgentData.brands[0].version) {
    browserVersion = navigator.userAgentData.brands[0].version;
} else {
    // For Firefox, userAgentData.brands is not compatible with Firefox
    let lastIn = navigator.userAgent.split(' ').length - 1;
    browserVersion = navigator.userAgent.split(' ')[lastIn].slice(8);
}
browserInfo.textContent = browserName + ', ' + browserVersion;

// ** Languages

userLanguages.textContent = navigator.languages;

// ** Platform

userPlatform.textContent = navigator.platform;

// ** Cookies enabled

if (navigator.cookieEnabled) {
    cookiesActive.textContent = 'Cookies sind aktiv';
}

// ** Do not track

function isDoNotTrackActive() {
    if (navigator.doNotTrack === "1" || navigator.doNotTrack === "yes") {
        return true;
    }
    if (navigator.msDoNotTrack === "1") {
        return true;
    }
    return false;
}

if (isDoNotTrackActive()) {
    doNotTrack.textContent = 'Do not track ist aktiv';
} else {
    doNotTrack.textContent = 'Do not track ist nicht aktiv';
}

// URL analyzer

const fullUrlOutput = byId('full-url');
const protocolOutput = byId('protocol');
const hostOutput = byId('hostname');
const queryOutput = byId('query-params');
const fullUrl = window.location;
const queryParams = new URLSearchParams(window.location.search);
const params = {};

// ** Full URL
fullUrlOutput.textContent = fullUrl;

// ** Protocol
protocolOutput.textContent = fullUrl.protocol;

// ** Host and port
hostOutput.textContent = fullUrl.hostname + ':' + fullUrl.port;

//  ** Query parameters
function getAllParams() {
    queryOutput.textContent = '';
    const entries = [];
    for (let [key, value] of queryParams) {
        params[key] = value;
        entries.push(`${key}: ${value}`);
    }
    queryOutput.textContent = entries.join(', ');
}
getAllParams();

// ** Modify URL
const modifyUrlBtn = byId('modify-url');
const updateHistBtn = byId('update-history');

modifyUrlBtn.addEventListener('click', () => {
    let newUrl = prompt('Bitte URL ändern.', fullUrl);
    history.replaceState(
        { source: 'dashboard', previousUrl: window.location.href },
        document.title, newUrl
    );
});
updateHistBtn.addEventListener('click', () => {
    window.history.go(0);
})

// Performance-Tracker
const domLoaded = byId('dom-loaded');
const pageLoaded = byId('page-loaded');
const memoryUsage = byId('memory-usage');
const memoryProgress = byId('memory-progress');

// ** DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    domLoaded.textContent = `${(performance.now() / 1000).toFixed(3)} s`;
});

// ** Page loaded
window.addEventListener('load', () => {
    pageLoaded.textContent = `${(performance.now() / 1000).toFixed(3)} s`;
})

// ** Performance visualization
// Chart with canvas
const xLine = [1, 2, 3, 4, 5, 6];
const yLine = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let currentPath = false;

function getCanvas() {
    return byId('performance-visualization');
}

function getCtx() {
    return getCanvas().getContext('2d');
}

function initCanvasStyles() {
    const ctx = getCtx();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = .5;
    ctx.lineCap = 'round';
}
function initGridStyles() {
    const ctx = getCtx();
    ctx.strokeStyle = 'rgba(0,0,0, .2)';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
}
function drawGrid() {
    initGridStyles();
    const canvas = getCanvas();
    const canvasWidth = canvas.width;
    const tenMins = canvasWidth / xLine.length;
    const tenPercent = canvas.height / yLine.length;
    const ctx = getCtx();

    ctx.beginPath();
    for (let x = 0; x <= xLine.length; x++) {
        ctx.moveTo(tenMins * x, 0);
        ctx.lineTo(tenMins * x, canvas.height);
    }

    for (let y = 0; y <= yLine.length; y++) {
        ctx.moveTo(0, tenPercent * y);
        ctx.lineTo(canvasWidth, tenPercent * y)
    }
    ctx.stroke();
}
drawGrid();

function drawChart() {
    initCanvasStyles();
    const canvas = getCanvas();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ctx = getCtx();
    const now = new Date();
    const mins = now.getMinutes();
    const secs = now.getSeconds();
    const m = performance.memory;
    const memInPercent = (m.usedJSHeapSize / m.jsHeapSizeLimit) * 100;
    const fakePercent = memInPercent * 1000;
    const percentInHeight = canvasHeight - ((canvasHeight / fakePercent) * 10).toFixed(2);
    const minsInWidth = (canvasWidth / 60) * mins;
    // const totalSecs = mins * 60 + secs;
    // const secsInWidth = (canvasWidth / 3600) * totalSecs;

    if (!ctx.currentPath) {
        ctx.beginPath();
        ctx.moveTo(minsInWidth, percentInHeight);
        ctx.currentPath = true;
    } else {
        ctx.lineTo(minsInWidth, percentInHeight)
    }
    ctx.stroke();
}
setInterval(drawChart, 1000)

function resizeCanvas() {
    const canvas = getCanvas();
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = 120;
    drawGrid();
    drawChart();
}
window.addEventListener('resize', resizeCanvas);

// ** Memory usage
function updateMemoryUsage() {
    if (performance.memory) {
        const m = performance.memory;
        const memInPercent = (m.usedJSHeapSize / m.jsHeapSizeLimit) * 100;

        // const fakeUsagePercentage = 90;
        // const memInPercent = fakeUsagePercentage;

        memoryUsage.textContent = `Used: ${(m.usedJSHeapSize / 1e6).toFixed(1)}MB / ${(m.jsHeapSizeLimit / 1e6).toFixed(1)}MB`;
        memoryProgress.style.width = `${memInPercent}%`;

        if (memInPercent > 80) {
            memoryProgress.style.background = '#f44336';
        } else if (memInPercent > 60) {
            memoryProgress.style.background = '#ff9800';
        } else {
            memoryProgress.style.background = '#4caf50';
        }
    } else {
        memoryUsage.textContent = 'performance.memory API is not supported in this browser.';
    }
}

setInterval(updateMemoryUsage, 2000);


// Interactive control elements

const openWindow = byId('open-window');
const closeWindow = byId('close-window');
const fullScreen = byId('fullscreen');
const exitFullScreen = byId('exit-fullscreen');
let windowReference;
let isMaximized = false;

openWindow.addEventListener('click', () => {
    isMaximized = false;
    const url = window.location;
    windowReference = window.open(
        url,
        'windowTitle',
        'width=500,height=500,resizable,scrollbars=yes,status=1'
    );
});

closeWindow.addEventListener('click', () => {
    isMaximized = false;
    windowReference.close();
})

fullScreen.addEventListener('click', () => {
    if (windowReference && !isMaximized) {
        windowReference.moveTo(0, 0);
        windowReference.resizeTo(screen.availWidth, screen.availHeight);
        isMaximized = true;
    }
});

exitFullScreen.addEventListener('click', () => {
    if (windowReference && isMaximized) {
        windowReference.resizeTo(600, 600);
        windowReference.moveTo(100, 100);
        windowReference.focus();
        isMaximized = false;
    }
});

// ** Scrolling to elements

const panelIcons = $$('.panel-icon');
const elementInputField = byId('scroll-to-element');
const scrollBtn = byId('scroll-to-button');

elementInputField.addEventListener('focus', () => {
    elementInputField.value = '';
    elementInputField.style.color = '';
    elementInputField.style.borderColor = '';

});
scrollBtn.addEventListener('click', () => {
    let foundMatch = false;

    panelIcons.forEach((icon) => {
        if (elementInputField.value === icon.textContent) {
            icon.scrollIntoView({ behavior: 'smooth' });
            elementInputField.value = '';
            foundMatch = true;
        }
    });

    if (!foundMatch) {
        elementInputField.style.color = 'red';
        elementInputField.value = 'Bitte eine Zahl zwischen 1 und 10 eingeben!';
        elementInputField.style.borderColor = 'red';
    }
});

// ** Dialog manager 

const showAlert = byId('show-alert');
const showConfirm = byId('show-confirm');
const showPrompt = byId('show-prompt');

showAlert.addEventListener('click', () => {
    alert('&#127760; ' + fullUrl.hostname + ':' + fullUrl.port);
})

// Alert -> weblogo dann addresse und port
// text
// untenrechts ein btn mit ok

// Prompt -> weblogo dann addresse und port
// text
// input feld
// untenrechts abbrechen btn(grau) und ein btn mit ok