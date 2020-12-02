// ==UserScript==
// @name         WhatsappWithMoreAccessibility
// @namespace    https://github.com/juliano-lopes/accessibility-by-force/
// @version      2.0
// @description  It inserts accessibility on WhatsappWeb
// @author       Juliano Lopes (https://github.com/juliano-lopes/)
// @match        *://web.whatsapp.com
// @downloadURL https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.user.js
// @updateURL https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var activeConversationTitle = "";
    var buttonAccessibility = null;
    var listeners = [];
    initialButton();
    function initialButton() {
        let initialButton = document.createElement("button");
        initialButton.setAttribute("aria-label", "Ativar script de acessibilidade");
        initialButton.setAttribute("data-status", "off");
        initialButton.addEventListener("click", function () {
            buttonAccessibility = document.querySelector('[data-status]');
            if (buttonAccessibility.getAttribute("data-status") === "off") {
                if (document.getElementById("pane-side")) {
                    //.querySelectorAll('[data-icon="default-user"]').length > 0
                    setMainPanelTitle();
                    buttonAccessibility.setAttribute("data-status", "on");
                    buttonAccessibility.setAttribute("aria-label", "Desativar script de acessibilidade");
                    activeEvents();
                    spanToAriaLive();
                    alert('Script de acessibilidade ativado!');
                }
                else {
                    alert('Documento ainda sendo carregado...');
                }
            }
            else {
                removeAccessibilityElements();
                removeAccessibilityListenerEvents();
                buttonAccessibility.setAttribute("data-status", "off");
                buttonAccessibility.setAttribute("aria-label", "Ativar script de acessibilidade");
                alert("Script de acessibilidade desativado!");
            }
        }, false);
        document.body.insertBefore(initialButton, document.body.firstChild);
    }

    function removeAccessibilityListenerEvents() {
        if (listeners && listeners.length > 0) {
            listeners.forEach(function (listener) {
                listener.element.removeEventListener(listener.listenerType, listener.listener, false);
            });
        }
    }

    function updateMessage() {
        setConversationTitle();
    }

    function setMainPanelTitle() {
        const panel = document.getElementById('pane-side');
        const mainPanelTitle = document.querySelector('[data-main-panel]');
        if (panel) {
            if (!mainPanelTitle) {
                let heading = document.createElement("h1");
                let headingText = document.createTextNode("Painel principal");
                heading.appendChild(headingText);
                heading.setAttribute("data-sr-only", "pane-side");
                heading.setAttribute("data-main-panel", "pane-side");
                panel.insertBefore(heading, panel.firstChild);
            }
        }
    }

    function removeAccessibilityElements() {
        document.querySelectorAll('[data-sr-only]').forEach(function (accessibilityElement) {
            accessibilityElement.parentNode.removeChild(accessibilityElement);
        });
    }

    function setConversationTitle() {
        let main = document.getElementById('main');
        if (main) {
            let conversation = main.querySelector('[data-sr-only="conversation-title"]');
            let conversationTitle = main.childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].getAttribute("title");
            if (!conversation) {
                if (conversationTitle) {
                    activeConversationTitle = conversationTitle;
                    conversationTitle = "Conversa ativa com " + conversationTitle;
                } else {
                    conversationTitle = "Conversa ativa";
                }

                let heading = document.createElement("h2");
                let headingText = document.createTextNode(conversationTitle);
                heading.appendChild(headingText);
                heading.setAttribute("data-sr-only", "conversation-title");
                main.insertBefore(heading, main.firstChild);
            }
        }
    }

    function addFooterButtonLabels() {
        let footer = document.querySelector('footer');
        if (footer) {
            document.querySelector('[data-icon="smiley"]') ? document.querySelector('[data-icon="smiley"]').setAttribute("aria-label", "Smiley") : false;
            document.querySelector('[data-icon="gif"]') ? document.querySelector('[data-icon="gif"]').setAttribute("aria-label", "GIF") : false;
            document.querySelector('[data-icon="sticker"]') ? document.querySelector('[data-icon="sticker"]').setAttribute("aria-label", "Sticker") : false;
            activeButtonToRecordEvent();
            let buttonToSendText = document.querySelector('[data-icon="send"]');
            buttonToSendText ? buttonToSendText.setAttribute("aria-label", "Enviar mensagem de texto") : "";
        }
    }

    function activeButtonToRecordEvent() {
        let buttonToRecord = document.querySelector('[data-icon="ptt"]');
        if (buttonToRecord) {
            buttonToRecord.setAttribute("aria-label", "Gravar mensagem de voz");

            const buttonToRecordListener = function (e) {
                console.log("gravação clicada");
                setTimeout(function () {
                    let buttonToSendRecordedAudio = document.querySelector('[data-icon="round-send-inv"]');
                    buttonToSendRecordedAudio ? buttonToSendRecordedAudio.setAttribute("aria-label", "Enviar mensagem de voz") : "";
                    let buttonToCancelRecord = document.querySelector('[data-icon="round-x-inv"]');
                    buttonToCancelRecord ? buttonToCancelRecord.setAttribute("aria-label", "Cancelar gravação") : "";

                }, 1000);

            };
            buttonToRecord.addEventListener("click", buttonToRecordListener, false);
            listeners.push({ element: buttonToRecord, listener: buttonToRecordListener, listenerType: "click" });
        }

    }

    function activeEvents() {

        const documentListener = function (e) {
            let el;

            if (e.altKey && e.keyCode == 67) {
                e.preventDefault();
                el = document.getElementById('pane-side').querySelector('[tabindex="-1"]');
            }
            else if (e.altKey && e.keyCode == 77) {
                e.preventDefault();
                el = document.getElementById('main').querySelector('[role="region"]');
            }
            else if (e.altKey && e.keyCode == 69) {
                e.preventDefault();
                el = document.querySelector('footer').querySelector('[contenteditable="true"]');
                if (el) {
                    activeConversationTitle ? el.setAttribute("aria-label", "Escreva uma mensagem para " + activeConversationTitle) : el.setAttribute("aria-label", "Escreva uma mensagem");

                    const footerMessageBoxListener = function (e) {
                        console.log("mudou! " + e.target);
                        let buttonToSendText = document.querySelector('[data-icon="send"]');
                        buttonToSendText ? buttonToSendText.setAttribute("aria-label", "Enviar mensagem de texto") : "";
                        activeButtonToRecordEvent();
                    };
                    el.addEventListener("keyup", footerMessageBoxListener, false);
                    el.addEventListener("focus", activeButtonToRecordEvent);
                    listeners.push({ element: el, listener: footerMessageBoxListener, listenerType: "keyup" });
                    listeners.push({ element: el, listener: activeButtonToRecordEvent, listenerType: "focus" });
                }
            }
            else if (e.altKey && e.keyCode == 65) {
                e.preventDefault();
                let attachShadow = document.querySelector('[data-icon="attach-shadow"]');

                if (!attachShadow) {
                    el = document.querySelector('[data-icon="clip"]');
                    el ? el.click() : false;
                }

                el = attachShadow;
                if (el) {
                    el.parentNode.setAttribute("aria-label", "Selecione o que deseja anexar...");
                    el.parentNode.setAttribute("id", "container-attach-shadow");
                    el.parentNode.querySelector('ul').setAttribute("aria-labelledby", "container-attach-shadow");
                    el = el.parentNode.querySelector('ul li');
                }

            }
            else if (e.altKey && e.keyCode == 66) {
                e.preventDefault();
                el = document.querySelector('[contenteditable="true"]');
                el ? el.setAttribute("aria-label", "Buscar nas conversas e nos contatos...") : false;
            }
            else if (e.altKey && e.keyCode == 84) {
                e.preventDefault();
                document.getElementById("span-to-aria-live").textContent = activeConversationTitle;
                setTimeout(function () {
                    document.getElementById("span-to-aria-live").textContent = "";
                }, 1000);
            }

            console.log("Tecla: " + e.keyCode);

            el ? el.focus() : false;

            if (document.getElementById('main')) {
                updateMessage();
                addFooterButtonLabels();
            }

        };
        document.addEventListener("keydown", documentListener, false);
        listeners.push({ element: document, listener: documentListener, listenerType: "keydown" });
    }

    function spanToAriaLive() {
        let spanToAriaLive = document.getElementById("span-to-aria-live");
        if (!spanToAriaLive) {
            spanToAriaLive = document.createElement("span");
            spanToAriaLive.setAttribute("aria-live", "polite");
            spanToAriaLive.setAttribute("id", "span-to-aria-live");
            document.body.appendChild(spanToAriaLive);
        }
    }

})()
