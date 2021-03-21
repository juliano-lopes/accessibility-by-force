// ==UserScript==
// @name WhatsappWithMoreAccessibility
// @namespace https://github.com/juliano-lopes/accessibility-by-force/
// @version 4.2
// @description Este script faz com que o WhatsappWeb se torne mais acessível e tenha uma melhor usabilidade para deficientes visuais usuários de leitores de telas. It puts a better accessibility on WhatsappWeb to screen reader users. Script para una mejor accesibilidad y usabilidad en WhatsappWeb.
// @author Juliano Lopes (https://github.com/juliano-lopes/)
// @match https://web.whatsapp.com
// @downloadURL https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.user.js
// @updateURL https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.user.js
// @grant GM_xmlhttpRequest
// @connect github.com
// @connect githubusercontent.com
// ==/UserScript==

(function () {
    'use strict';

    const baseScript = "https://cdn.jsdelivr.net/gh/juliano-lopes/accessibility-by-force@master/src/js/WhatsappWebWithMoreAccessibility.js";

    let script = document.createElement("script");
    script.src = baseScript;
    document.body.appendChild(script);

})()
