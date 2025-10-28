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

window.addEventListener('beforeunload', e => {
    if (currentScrollY < THRESHOLD_HIGH) {
        e.preventDefault();
        e.returnValue = '';
    }
})

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
    browserVersion = navigator.userAgent.split(' ')[8].slice(8);
}
browserInfo.textContent = browserName + ', ' + browserVersion;

// ** Languages

userLanguages.textContent = navigator.languages;

// ** Platform

userPlatform.textContent = navigator.platform;

// ** Cookies enabled

if(navigator.cookieEnabled) {
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
        document.title, 
        newUrl
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

// ** Memory usage
if ("performance" in window && performance.memory) {
    const memoryInfo = performance.memory;
    const totalJSHeapSizeInMB = (memoryInfo.totalJSHeapSize / 1000000).toFixed(3);
    const usedJSHeapSizeInMB = (memoryInfo.usedJSHeapSize / 1000000).toFixed(3);
    const jsHeapSizeLimitInMB = (memoryInfo.jsHeapSizeLimit / 1000000).toFixed(3);
    memoryUsage.textContent = `Total JS Heap Size: ${totalJSHeapSizeInMB} MB, Used JS Heap Size: ${usedJSHeapSizeInMB} MB, JS Heap Size Limit: ${jsHeapSizeLimitInMB} MB`;
  
    const memoryUsagePercentage = (memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100;
    memoryProgress.style.width = `${memoryUsagePercentage.toFixed(2)}%`;
  } else {
    memoryUsage.textContent = 'performance.memory API is not supported in this browser.'
  }


// memoryUsage.textContent = performance.memoryUsage;
// console.log(performance.measureUserAgentSpecificMemory())

// function runMemoryMeasurements() {
//     const interval = -Math.log(Math.random()) * 5 * 60 * 1000;
//     console.log(`Next measurement in ${Math.round(interval / 1000)} seconds.`);
//     setTimeout(measureMemory, interval);
//   }
  
//   async function measureMemory() {
//     const memorySample = await performance.measureUserAgentSpecificMemory();
//     console.log(memorySample);
//     runMemoryMeasurements();
//   }
  
//   if (crossOriginIsolated) {
//     runMemoryMeasurements();
//   }

//   runMemoryMeasurements();
