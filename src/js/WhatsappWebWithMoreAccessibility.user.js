// ==UserScript==
// @name WhatsappWithMoreAccessibility
// @namespace https://github.com/juliano-lopes/accessibility-by-force/
// @version 4.5
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
    var version = "4.5";
    includeBaseScript();

    function includeBaseScript() {
        const scriptUrl = "https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.user.js";
        let baseScript = "https://cdn.jsdelivr.net/gh/juliano-lopes/accessibility-by-force@master/src/js/WhatsappWebWithMoreAccessibility.js";

        GM_xmlhttpRequest({
            method: "GET",
            url: scriptUrl,
            responseType: "text",
            onload: function (res) {
                let reg = /(\d[.]?)+/;
                let newVersion = reg.exec(res.responseText);
                if (newVersion) {
                    if (newVersion[0]) {
                        version = newVersion[0];
                        baseScript = "https://cdn.jsdelivr.net/gh/juliano-lopes/accessibility-by-force@v" + version + "/src/js/WhatsappWebWithMoreAccessibility.js";
                    }
                }

                let script = document.createElement("script");
                script.src = baseScript;
                document.body.appendChild(script);
            }
        });
    }

})()
