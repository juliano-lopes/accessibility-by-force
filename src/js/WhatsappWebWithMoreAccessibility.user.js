// ==UserScript==
// @name         WhatsappWithMoreAccessibility
// @namespace    https://github.com/juliano-lopes/accessibility-by-force/
// @version      2.0
// @description  Este script faz com que o WhatsappWeb se torne mais acessível e tenha uma melhor usabilidade para deficientes visuais usuários de leitores de telas. It puts a better accessibility on WhatsappWeb to screen reader users. Script para una mejor accesibilidad y usabilidad en WhatsappWeb.
// @author       Juliano Lopes (https://github.com/juliano-lopes/)
// @match        https://web.whatsapp.com
// @downloadURL https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.user.js
// @updateURL https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var activeConversationTitle = "";
    var listeners = [];
    var activated = false;
    var phrases = null;

    initial();

    function initial() {

        document.addEventListener("keydown", function (e) {
            if (e.altKey && e.keyCode == 83) {

                if (!activated) {

                    if (document.getElementById("pane-side")) {
                        phrases = getPhrasesWithCorrectLanguage();
                        setMainPanelTitle();
                        activeEvents();
                        spanToAriaLive();
                        alert(phrases.SCRIPT_ACTIVATED);
                        activated = true;
                        document.getElementById('pane-side').querySelector('[tabindex="-1"]').focus();
                    }
                    else {
                        alert(phrases.LOADING_PAGE);
                    }

                }
                else {
                    removeAccessibilityElements();
                    removeAccessibilityListenerEvents();
                    alert(phrases.SCRIPT_DESACTIVATED);
                    activated = false;

                }
            }
        }, false);

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
        setAccessibilityAttributeToFirefox();
    }

    function setMainPanelTitle() {
        const panel = document.getElementById('pane-side');
        const mainPanelTitle = document.querySelector('[data-main-panel]');
        if (panel) {
            if (!mainPanelTitle) {
                let heading = document.createElement("h1");
                let headingText = document.createTextNode(phrases.MAIN_PANE_HEADING);
                heading.appendChild(headingText);
                heading.setAttribute("data-sr-only", "pane-side");
                heading.setAttribute("data-main-panel", "pane-side");
                heading = setClassSROnly(heading);
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
                    conversationTitle = phrases.CURRENT_CONVERSATION + conversationTitle;
                } else {
                    conversationTitle = phrases.CONVERSATION_TITLE_WITHOUT_CONTACT_NAME;
                }

                let heading = document.createElement("h2");
                let headingText = document.createTextNode(conversationTitle);
                heading.appendChild(headingText);
                heading.setAttribute("data-sr-only", "conversation-title");
                heading = setClassSROnly(heading);
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
            buttonToSendText ? buttonToSendText.setAttribute("aria-label", phrases.BUTTON_SEND_TEXT_MESSAGE) : "";
        }
    }

    function activeButtonToRecordEvent() {
        let buttonToRecord = document.querySelector('[data-icon="ptt"]');
        if (buttonToRecord) {
            buttonToRecord.setAttribute("aria-label", phrases.BUTTON_RECORD_VOICE_MESSAGE);

            const buttonToRecordListener = function (e) {
                setTimeout(function () {
                    let buttonToSendRecordedAudio = document.querySelector('[data-icon="round-send-inv"]');
                    if (buttonToSendRecordedAudio) {
                        buttonToSendRecordedAudio.parentNode.setAttribute("aria-label", phrases.BUTTON_SEND_VOICE_MESSAGE);

                    }

                    let buttonToCancelRecord = document.querySelector('[data-icon="round-x-inv"]');
                    if (buttonToCancelRecord) {
                        buttonToCancelRecord.parentNode.setAttribute("aria-label", phrases.BUTTON_CANCEL_RECORDING);

                    }


                }, 1000);

            };
            buttonToRecord.addEventListener("click", buttonToRecordListener, false);
            listeners.push({ element: buttonToRecord, listener: buttonToRecordListener, listenerType: "click" });
        }

    }

    const footerMessageBoxListener = function (e) {
        let buttonToSendText = document.querySelector('[data-icon="send"]');
        if (buttonToSendText) {
            buttonToSendText.parentNode.setAttribute("aria-label", phrases.BUTTON_SEND_TEXT_MESSAGE);
        }
        else {
            activeButtonToRecordEvent();
        }
    };

    function activeEvents() {

        const documentListener = function (e) {
            let el;

            if (e.altKey && e.keyCode == 76) {
                e.preventDefault();
                selectLanguage();
                setTimeout(function () {
                    el = document.getElementById("select-language").focus();
                }, 100);

            } else if (e.altKey && e.keyCode == 67) {
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
                    activeConversationTitle ? el.setAttribute("aria-label", phrases.WRITE_MESSAGE + activeConversationTitle) : el.setAttribute("aria-label", phrases.WRITE_MESSAGE_WITHOUT_CONTACT_NAME);

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
                    el.parentNode.setAttribute("aria-label", phrases.ATTACH_CONTAINER_MESSAGE);
                    el.parentNode.setAttribute("id", "container-attach-shadow");
                    el.parentNode.querySelector('ul').setAttribute("aria-labelledby", "container-attach-shadow");
                    el = el.parentNode.querySelector('ul li');
                }

            }
            else if (e.altKey && e.keyCode == 66) {
                e.preventDefault();
                el = document.querySelector('[contenteditable="true"]');
                el ? el.setAttribute("aria-label", phrases.SEARCH_LABEL) : false;
            }
            else if (e.altKey && e.keyCode == 84) {
                e.preventDefault();
                document.getElementById("span-to-aria-live").textContent = activeConversationTitle;
                setTimeout(function () {
                    document.getElementById("span-to-aria-live").textContent = "";
                }, 1000);
            }

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
    function selectLanguage() {
        if (!document.getElementById("select-language-container")) {
            let selectLanguageContainer = document.createElement("div");
            let select = document.createElement("select");
            selectLanguageContainer.id = "select-language-container";
            select.id = "select-language";
            select.setAttribute("aria-label", phrases.SELECT_LANGUAGE);
            let languages = JSON.parse(PHRASES_JSON);
            languages.forEach(function (p) {
                let option = document.createElement("option");
                option.value = p.language;
                option.textContent = p.description;
                select.appendChild(option);
            });
            select.addEventListener("keydown", function (e) {
                if (e.keyCode == 13) {
                    phrases = getPhrases(select.options[select.selectedIndex].value);
                    localStorage.setItem("language", phrases.language);
                    alert(phrases.LANGUAGE_SELECTED);
                    document.body.removeChild(selectLanguageContainer);
                    document.getElementById('pane-side').querySelector('[tabindex="-1"]').focus();
                }
            }, false);
            selectLanguageContainer.appendChild(select);
            selectLanguageContainer = setClassSROnly(selectLanguageContainer);
            document.body.insertBefore(selectLanguageContainer, document.body.firstChild);
        }
    }

    const getClassSROnly = function () {

        return (`
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
    `);
    };

    const setClassSROnly = function (element, label = "") {
        element.setAttribute("style", getClassSROnly());
        label ? element.setAttribute("aria-label", label) : "";
        return element;
    };

    const setAccessibilityAttributeToFirefox = function () {
        let main = document.getElementById("main");
        if (main) {
            let messageRegion = main.querySelector('[role="region"]');
            if (messageRegion) {
                let messageContainers = messageRegion.querySelectorAll('[class*="focusable-list-item"]');
                if (messageContainers.length > 0) {
                    messageContainers.forEach(function (messageContainer) {
                        messageContainer.setAttribute("role", "option");
                    });
                }
            }
        }
    };

    const getPhrasesWithCorrectLanguage = function () {
        return (localStorage.getItem("language") ? getPhrases(localStorage.getItem("language")) : getPhrases(window.navigator.language));
    };

    const getScriptLanguage = function (myLanguage) {
        if (isEnglish(myLanguage)) {
            return "en-us";
        } else if (isSpanish(myLanguage)) {
            return "es-es";
        } else {
            return "pt-br";
        }

    };

    const isEnglish = function (language) {
        const languages = ["en-us", "en-au", "en-nz", "en-za", "en", "en-tt", "en-gb", "en-ca", "en-ie", "en-jm", "en-bz"];
        return languages.indexOf(language) != -1;
    };
    const isSpanish = function (language) {
        const languages = ["es", "es-es", "es-gt", "es-mx", "es-cr", "es-pa", "es-do", "es-ve", "es-co", "es-pe", "es-ar", "es-ec", "es-cl", "es-uy", "es-py", "es-bo", "es-sv", "es-hn", "es-ni", "es-pr"];
        return languages.indexOf(language) != -1;
    };

    const getPhrases = function (myLanguage) {
        const allPhrases = JSON.parse(PHRASES_JSON);
        let phrases = null;

        allPhrases.forEach(function (p) {
            if (p.language.toLowerCase().trim() == getScriptLanguage(myLanguage).toLowerCase().trim())
                phrases = p;
        });
        return phrases;
    };

    const PHRASES_JSON = `
            [
                {
                    "language":"pt-br",
                    "description":"Português (Portuguese)",
                    "SCRIPT_ACTIVATED":"Script de acessibilidade ativado com sucesso!",
                    "LOADING_PAGE":"Documento ainda sendo carregado...", 
                    "SCRIPT_DESACTIVATED":"Script de acessibilidade desativado!",
"MAIN_PANE_HEADING":"Painel principal",
"CURRENT_CONVERSATION":"Conversa ativa com ",
"CONVERSATION_TITLE_WITHOUT_CONTACT_NAME":"Conversa ativa",
"BUTTON_SEND_TEXT_MESSAGE":"Enviar mensagem de texto",
"BUTTON_RECORD_VOICE_MESSAGE":"Gravar mensagem de voz",
"BUTTON_SEND_VOICE_MESSAGE":"Enviar mensagem de voz",
"BUTTON_CANCEL_RECORDING":"Cancelar gravação",
"WRITE_MESSAGE":"Escreva uma mensagem para ",
"WRITE_MESSAGE_WITHOUT_CONTACT_NAME":"Escreva uma mensagem",
"ATTACH_CONTAINER_MESSAGE":"Selecione o que deseja anexar...",
"SEARCH_LABEL":"Buscar nas conversas e nos contatos...",
"SELECT_LANGUAGE":"Selecione o idioma do script: ",
"LANGUAGE_SELECTED":"O idioma do script foi alterado com sucesso!"
                    },
                    {
                        "language": "en-us",
                        "description":"Inglês (English)",
                        "SCRIPT_ACTIVATED": "Accessibility script activated successfully!",
                        "LOADING_PAGE": "Document is still being loaded ...",
                        "SCRIPT_DESACTIVATED": "Accessibility script disabled!",
   "MAIN_PANE_HEADING": "Main panel",
   "CURRENT_CONVERSATION": "Active chat with ",
   "CONVERSATION_TITLE_WITHOUT_CONTACT_NAME": "Active chat",
   "BUTTON_SEND_TEXT_MESSAGE": "Send text message",
   "BUTTON_RECORD_VOICE_MESSAGE": "Record voice message",
   "BUTTON_SEND_VOICE_MESSAGE": "Send voice message",
   "BUTTON_CANCEL_RECORDING": "Cancel recording",
   "WRITE_MESSAGE": "Write a message to ",
   "WRITE_MESSAGE_WITHOUT_CONTACT_NAME": "Write a message",
   "ATTACH_CONTAINER_MESSAGE": "Select what you want to attach ...",
   "SEARCH_LABEL": "Search chats and contacts ...",
   "SELECT_LANGUAGE":"Select the script language: ",
   "LANGUAGE_SELECTED":"The script language has been successfully changed!"
                        },
                        {
                            "language": "es-es",
                            "description":"Espanhol (Spanish)",
                            "SCRIPT_ACTIVATED": "¡El script de accesibilidad se activó correctamente!",
                            "LOADING_PAGE": "El documento aún se está cargando ...",
                            "SCRIPT_DESACTIVATED": "¡Secuencia de comandos de accesibilidad inhabilitada!",
       "MAIN_PANE_HEADING": "Panel principal",
       "CURRENT_CONVERSATION": "Conversación activa con ",
       "CONVERSATION_TITLE_WITHOUT_CONTACT_NAME": "Conversación activa",
       "BUTTON_SEND_TEXT_MESSAGE": "Enviar mensaje de texto",
       "BUTTON_RECORD_VOICE_MESSAGE": "Grabar mensaje de voz",
       "BUTTON_SEND_VOICE_MESSAGE": "Enviar mensaje de voz",
       "BUTTON_CANCEL_RECORDING": "Cancelar grabación",
       "WRITE_MESSAGE": "Escribir un mensaje a ",
       "WRITE_MESSAGE_WITHOUT_CONTACT_NAME": "Escribe un mensaje",
       "ATTACH_CONTAINER_MESSAGE": "Seleccione lo que desea adjuntar ...",
       "SEARCH_LABEL": "Buscar conversaciones y contactos ...",
       "SELECT_LANGUAGE": "Seleccione el idioma del script:",
       "LANGUAGE_SELECTED":"¡El idioma se ha cambiado correctamente!"
                            }
            ]
        `;

})()
