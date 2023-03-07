// ==UserScript==
// @name WhatsappWithMoreAccessibility
// @namespace https://github.com/juliano-lopes/accessibility-by-force/
// @version 6.0
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

    includeBaseScript();

    function includeBaseScript() {
        const baseScript = "https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.js";

        GM_xmlhttpRequest({
            method: "GET",
            url: baseScript,
            responseType: "text",
            onload: function (res) {
                let script = document.createElement("script");
                script.textContent = res.responseText;
                document.body.appendChild(script);
            }
        });
    }

})()
