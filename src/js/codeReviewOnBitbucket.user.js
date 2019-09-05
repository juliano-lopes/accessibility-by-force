// ==UserScript==
// @name         CodeReviewWithAccessibility
// @namespace    https://github.com/juliano-lopes/accessibility-by-force/
// @version      0.1
// @description  It inserts accessibility on bitbucket pull requests
// @author       Juliano Lopes (https://github.com/juliano-lopes/)
// @match        *://git.it.lan.com/projects/*/repos/*/pull-requests/*/*
// @downloadURL https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/codeReviewOnBitbucket.user.js
// @updateURL https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/codeReviewOnBitbucket.user.js
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
    document.addEventListener('click', trigger, false);
    trigger();
    function trigger() {
        setTimeout(setHeaderElementOnPage, 2000);
    }
    function setHeaderElementOnPage() {
        const elements = document.querySelectorAll(".line-number-marker.line-locator.bitbucket-gutter-marker");
        const classSROnly = `
border: 0;
clip: rect(1px, 1px, 1px, 1px);
clip-path: inset(50%);
height: 1px;
margin: -1px;
overflow: hidden;
padding: 0;
position: absolute;
width: 1px;
word-wrap: normal !important;
`;
        if (elements.length > 0) {
            elements.forEach(function (el) {
                let h6;
                let h5;
                let text;
                if (el.getAttribute("data-line-type") === "REMOVED") {
                    h5 = document.createElement("h5");
                    text = document.createTextNode("Removed line");
                    h5.appendChild(text);
                    h5.setAttribute("style", classSROnly);
                }
                if (el.getAttribute("data-line-type") === "ADDED") {
                    h6 = document.createElement("h6");
                    text = document.createTextNode("Added line");
                    h6.appendChild(text);
                    h6.setAttribute("style", classSROnly);
                }
                h5 ? el.appendChild(h5) : null;
                h6 ? el.appendChild(h6) : null;
            });
        }
    }
})();