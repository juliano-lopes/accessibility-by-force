// ==UserScript==
// @name         WhatsappWithMoreAccessibility
// @namespace    https://github.com/juliano-lopes/accessibility-by-force/
// @version      3.1
// @description  Este script faz com que o WhatsappWeb se torne mais acessível e tenha uma melhor usabilidade para deficientes visuais usuários de leitores de telas. It puts a better accessibility on WhatsappWeb to screen reader users. Script para una mejor accesibilidad y usabilidad en WhatsappWeb.
// @author       Juliano Lopes (https://github.com/juliano-lopes/)
// @match        https://web.whatsapp.com
// @downloadURL https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.user.js
// @updateURL https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const WPPAPI = "https://api.whatsapp.com/send?phone=";
    var activeConversationTitle = "";
    var listeners = [];
    var activated = false;
    var phrases = null;
    var intervalReplaceContactPhone = null;
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
                        replaceContactPhone();
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
                    clearInterval(intervalReplaceContactPhone);
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

            if (!conversation) {
                let conversationTitle = main.querySelector("header");
                conversationTitle = conversationTitle ? conversationTitle.querySelector('[dir="auto"]') : "";
                conversationTitle = conversationTitle ? conversationTitle.getAttribute("title") : "";

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
        let buttonToRecord = document.querySelector('[data-icon="ptt"]').parentNode;
        if (buttonToRecord) {
            buttonToRecord.setAttribute("aria-label", phrases.BUTTON_RECORD_VOICE_MESSAGE);
            buttonToRecord.setAttribute("tabindex", "-1");
            if (buttonToRecord.parentNode.parentNode.getAttribute("role")) {
                buttonToRecord.parentNode.parentNode.removeAttribute("role");
                buttonToRecord.parentNode.parentNode.removeChild(document.getElementById("dialog-heading"));
            }

            const buttonToRecordListener = function (e) {
                setTimeout(function () {
                    let buttonToSendRecordedAudio = document.querySelector('[data-icon="round-send-inv"]');
                    if (buttonToSendRecordedAudio) {
                        buttonToSendRecordedAudio.parentNode.parentNode.setAttribute("aria-label", phrases.BUTTON_SEND_VOICE_MESSAGE);
                        buttonToSendRecordedAudio.parentNode.parentNode.setAttribute("tabindex", "-1");

                    }

                    let buttonToCancelRecord = document.querySelector('[data-icon="round-x-inv"]');
                    if (buttonToCancelRecord) {
                        buttonToCancelRecord.parentNode.parentNode.setAttribute("aria-label", phrases.BUTTON_CANCEL_RECORDING);
                        buttonToCancelRecord.parentNode.parentNode.setAttribute("tabindex", "-1");

                    }
                    let recordingDialog = buttonToSendRecordedAudio.parentNode.parentNode.parentNode;
                    recordingDialog.setAttribute("role", "dialog");
                    recordingDialog.setAttribute("tabindex", "-1");
                    recordingDialog.setAttribute("aria-labelledby", "recording-dialog-heading");
                    if (!recordingDialog.querySelector("#recording-dialog-heading")) {

                        let recordingDialogHeading = document.createElement("h3");
                        recordingDialogHeading.id = "recording-dialog-heading";
                        recordingDialogHeading.textContent = phrases.RECORDING_DIALOG_HEADING;
                        recordingDialogHeading = setClassSROnly(recordingDialogHeading);
                        recordingDialog.insertBefore(recordingDialogHeading, recordingDialog.firstChild);
                    }
                    recordingDialog.focus();
                    let isRecording = buttonToSendRecordedAudio && buttonToCancelRecord;
                    recordingDialog.addEventListener("keydown", function (e) {

                        let allowedKeys = [13, 38, 39, 40, 41];
                        if (isRecording && allowedKeys.indexOf(e.keyCode) == -1) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }, false);


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
    function updateCheckedMessage() {
        if (document.querySelector('[data-dialog-sr-only]')) {
            if (document.querySelector('[role="checkbox"]')) {

                let messages = document.getElementById("main") ? document.getElementById("main").querySelectorAll('[class*="message-in"], [class*="message-out"]') : [];
                if (messages.length > 0) {
                    messages.forEach(function (msg) {
                        let tb = msg.querySelector('[role="checkbox"]');
                        msg.addEventListener("keydown", function (ekm) {
                            if (tb && ekm.keyCode == 32) {

                                tb.click();

                            }
                        }, false);
                        let cbText = tb.getAttribute("aria-checked") == "true" ? phrases.CHECKED : phrases.UNCHECKED;
                        let span = msg.querySelector('[data-sr-only="msg-checkbox"]');
                        if (!span) {
                            span = document.createElement("span");
                            span.setAttribute("data-sr-only", "msg-checkbox");
                            span.setAttribute("aria-label", cbText);
                            span.setAttribute("aria-live", "polite");
                            msg.insertBefore(span, msg.firstChild);
                        }
                        else {
                            span.setAttribute("aria-label", cbText);
                        }
                    });
                }
            }
        }
        else {
            if (document.querySelectorAll('[data-sr-only="msg-checkbox"]').length > 0) {
                document.querySelectorAll('[data-sr-only="msg-checkbox"]').forEach(function (msgCheckbox) {
                    msgCheckbox.parentNode.removeChild(msgCheckbox);
                });
            }
        }
    }

    function updateCheckedContact(ek) {
        if (document.querySelector('[data-icon="x"]'))
            document.querySelector('[data-icon="x"]').setAttribute("aria-label", phrases.CLOSE);
        if (document.querySelector('[role="checkbox"]')) {
            if (document.querySelector('[data-icon="send"]')) {
                document.querySelector('[data-icon="send"]').parentNode.setAttribute("aria-label", phrases.SEND);
                if (ek.altKey && ek.keyCode == 86) {
                    ek.preventDefault();
                    ek.stopPropagation();
                    document.querySelector('[data-icon="send"]').parentNode.click();
                }
            }
            let checkBoxes = document.querySelectorAll('[role="checkbox"]');

            checkBoxes.forEach(function (cb) {
                cb.parentNode.nextSibling ? cb.parentNode.nextSibling.setAttribute("role", "option") : false;
                if (cb.parentNode.parentNode.querySelector('[dir="auto"]')) {

                    let titles = cb.parentNode.parentNode.querySelector('[dir="auto"]').parentNode.parentNode.parentNode.parentNode.querySelectorAll('[title]');
                    titles[1] ? titles[1].setAttribute("aria-hidden", "true") : false;
                    let cbText = cb.getAttribute("aria-checked") == "true" ? phrases.CHECKED : phrases.UNCHECKED;
                    titles[0].setAttribute("aria-label", cbText + titles[0].getAttribute("title"));
                    cb.setAttribute("aria-label", titles[0].getAttribute("title"));

                }
            });

        }

    }
    function selectedMessages() {
        if (document.querySelector('[data-icon="star-btn"]')) {
            let selectedMessages = document.querySelector('[data-icon="star-btn"]').parentNode.previousSibling;
            let selectedMessagesText = parseInt(selectedMessages.textContent);
            selectedMessagesText = selectedMessagesText ? selectedMessagesText + phrases.SELECTED_MESSAGE : "";
            selectedMessages.textContent = selectedMessagesText ? selectedMessagesText : selectedMessages.textContent;
        }
    }
    function dialogToDeleteMessage() {
        if (document.querySelector('[data-animate-modal-body="true"]')) {
            document.querySelector('[data-animate-modal-body="true"]').setAttribute("tabindex", "-1");
            document.querySelector('[data-animate-modal-body="true"]').setAttribute("role", "dialog");
            document.querySelector('[data-animate-modal-body="true"]').focus();
            return true;
        }
        return false;

    }

    function activeEvents() {

        const documentListener = function (e) {
            let el;

            if (e.altKey && e.keyCode == 76) {
                e.preventDefault();
                e.stopPropagation();
                selectLanguage();
                setTimeout(function () {
                    el = document.getElementById("select-language").focus();
                }, 100);

            } else if (e.altKey && e.keyCode == 67) {
                e.preventDefault();
                e.stopPropagation();
                el = document.getElementById('pane-side').querySelector('[tabindex="-1"]');
            }
            else if (e.altKey && e.keyCode == 77) {
                e.preventDefault();
                e.stopPropagation();
                el = document.getElementById('main');
                el = el ? el.querySelector('[role="region"]') : null;
                if (el) {
                    el.addEventListener("keydown", function (e) {

                        if (e.keyCode == 39) {
                            setTimeout(function () {
                                if (document.querySelector('[data-animate-dropdown-item="true"]')) {
                                    let ul = document.querySelector('[data-animate-dropdown-item="true"]').parentNode;
                                    ul.querySelectorAll('li div[role="button"]').forEach(function (elem) {
                                        elem.parentNode.addEventListener("keydown", function (e2) {
                                            if (e2.keyCode == 13) {
                                                setTimeout(function () {
                                                    dialogToDeleteMessage();
                                                    if (document.querySelector('[data-icon="star-btn"]')) {
                                                        let container = document.querySelector('[data-icon="star-btn"]').parentNode.parentNode;
                                                        container.querySelector('[data-icon="x"]') ? container.querySelector('[data-icon="x"]').setAttribute("aria-label", phrases.CLOSE) : false;
                                                        container.setAttribute("tabindex", "-1");
                                                        container.setAttribute("role", "dialog");
                                                        container.setAttribute("aria-label", phrases.CONTAINER_HEADING);
                                                        container.setAttribute("data-dialog-sr-only", "dialog");
                                                        let containerHeading = container.querySelector('[data-sr-only="container-heading"]');
                                                        if (!containerHeading) {
                                                            containerHeading = document.createElement("h3");
                                                            containerHeading.textContent = phrases.CONTAINER_HEADING;
                                                            containerHeading.setAttribute("data-sr-only", "container-heading");
                                                            containerHeading = setClassSROnly(containerHeading);
                                                            container.insertBefore(containerHeading, container.firstChild);
                                                        }
                                                        selectedMessages();
                                                        container.addEventListener("keydown", function (evc) {
                                                            if (evc.keyCode == 9) {
                                                                evc.preventDefault();
                                                                evc.stopPropagation();
                                                            }
                                                        }, false);
                                                        container.focus();
                                                        updateCheckedMessage();
                                                        document.getElementById("main") ? document.getElementById("main").addEventListener("keydown", updateCheckedMessage, false) : false;
                                                        container.addEventListener("click", function (ec) {
                                                            setTimeout(function () {
                                                                document.addEventListener("keydown", updateCheckedContact, false);
                                                                dialogToDeleteMessage();
                                                                document.querySelector('button, [role="button"]').focus();
                                                            }, 1000);

                                                        }, false);


                                                    }
                                                }, 500);
                                            }
                                        }, false);
                                    });
                                }
                            }, 200);

                        }

                        updateMessage();
                    }, false);

                }

            }
            else if (e.altKey && e.keyCode == 69) {
                e.preventDefault();
                e.stopPropagation();
                el = document.querySelector('footer');
                el = el ? el.querySelector('[contenteditable="true"]') : null;
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
                e.stopPropagation();
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
                e.stopPropagation();
                el = document.querySelector('[contenteditable="true"]');
                el ? el.setAttribute("aria-label", phrases.SEARCH_LABEL) : false;
            }
            else if (e.altKey && e.keyCode == 84) {
                e.preventDefault();
                e.stopPropagation();
                let spanAriaLive = document.getElementById("span-to-aria-live");
                if (spanAriaLive) {
                    spanAriaLive.textContent = activeConversationTitle;
                    setTimeout(function () {
                        spanAriaLive.textContent = "";
                    }, 1000);
                }

            }
            else if (e.altKey && e.keyCode == 78) {
                e.preventDefault();
                e.stopPropagation();

                newChatWithNumberNotSaved();
            }
            else if (e.altKey && e.keyCode == 71) {
                e.preventDefault();
                e.stopPropagation();

                let buttonToRecord = document.querySelector('[data-icon="ptt"]');
                buttonToRecord = buttonToRecord ? buttonToRecord.parentNode : null;
                if (buttonToRecord) {
                    let dialogButtonToRecord = buttonToRecord.parentNode;
                    dialogButtonToRecord.setAttribute("role", "dialog");
                    dialogButtonToRecord.setAttribute("tabindex", "-1");
                    if (!dialogButtonToRecord.querySelector("#dialog-heading")) {
                        let dialogHeading = document.createElement("h3");
                        dialogHeading.id = "dialog-heading";
                        dialogHeading.textContent = phrases.DIALOG_HEADING_TO_RECORD_BUTTON;
                        dialogHeading = setClassSROnly(dialogHeading);
                        dialogButtonToRecord.insertBefore(dialogHeading, dialogButtonToRecord.firstChild);
                    }
                    dialogButtonToRecord.focus();
                }
            }
            else if (e.altKey && e.keyCode == 68) {
                e.preventDefault();
                e.stopPropagation();

                if (document.querySelector('[data-dialog-sr-only]')) {
                    selectedMessages();
                    document.querySelector('[data-dialog-sr-only]').focus();
                }
            }
            el ? el.focus() : false;

            if (document.getElementById('main')) {
                updateMessage();
                addFooterButtonLabels();
                replaceContactPhone();
            }

        };
        document.addEventListener("keydown", documentListener, false);
        listeners.push({ element: document, listener: documentListener, listenerType: "keydown" });
    }
    function addLabelVideoAndImage(element) {
        element.querySelector('img') && element.querySelector('img').parentNode.parentNode.parentNode.getAttribute("role") == "button" ? element.querySelector('img').setAttribute("alt", "Image") : false;
        if (element.querySelector('span[data-icon="video-pip"]')) {
            element.querySelector('span[data-icon="video-pip"]').setAttribute("aria-label", "Video");
            element.addEventListener("keydown", function (e) {
                if (e.keyCode == 13)
                    element.querySelector('span[data-icon="video-pip"]').click();
            }, false);
        }
    }

    function replaceContactPhone() {
        if (document.getElementById("main")) {
            intervalReplaceContactPhone = setInterval(function () {
                document.querySelectorAll('[class*="message-in"], [class*="message-out"]').forEach(function (el) {
                    if (el.querySelector('span[dir="auto"]') && el.querySelector('span[dir="auto"]').textContent != "") {
                        if (el.querySelector('span[role="button"]')) {
                            let contactPhone = el.querySelector('span[role="button"]');
                            if (!contactPhone.parentNode.querySelector('[data-sr-only="replace-contact-phone"]')) {
                                let span = document.createElement("span");
                                span.setAttribute("data-sr-only", "replace-contact-phone");
                                span.textContent = phrases.REPLACE_CONTACT_PHONE_MESSAGE;
                                contactPhone.parentNode.insertBefore(span, contactPhone.parentNode.firstChild);
                                contactPhone.setAttribute("aria-hidden", "true");
                            }
                        }
                    }
                    addLabelVideoAndImage(el);
                });
            }, 1000);
        }
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
    function newChatWithNumberNotSaved() {
        let newChatInput = document.getElementById("new-chat-input");
        if (!newChatInput) {
            let newChatContainer = document.createElement("div");
            let label = document.createElement("label");
            newChatInput = document.createElement("input");
            let span = document.createElement("span");
            newChatContainer.id = "new-chat-container";
            span.setAttribute("role", "alert");

            newChatInput.id = "new-chat-input";
            newChatInput.setAttribute("aria-label", phrases.LABEL_NEW_CHAT_INPUT);

            newChatInput.addEventListener("keydown", function (e) {
                if (e.keyCode == 13) {
                    const reg = /^\d+$/;

                    if ((newChatInput.value.length >= 9) && (reg.test(newChatInput.value))) {

                        let link = document.createElement("a");

                        link.href = WPPAPI + newChatInput.value;
                        newChatContainer.insertBefore(link, newChatContainer.firstChild);
                        link.click();
                        setTimeout(function () {
                            let errorElement = document.querySelector('[data-animate-modal-body="true"]');
                            if (errorElement && errorElement.firstChild.textContent.indexOf("url") != -1) {

                                errorElement.parentNode.parentNode.parentNode.setAttribute("hidden", "true");

                                newChatContainer.removeChild(link);
                                newChatInput.focus();
                                span.textContent = "";
                                setTimeout(function () {
                                    span.textContent = phrases.NEW_CHAT_INPUT_INVALID_NUMBER;
                                }, 1000);

                            }
                            else {
                                newChatContainer.parentNode.removeChild(newChatContainer);
                                setTimeout(function () {
                                    activeConversationTitle = document.getElementById("main").childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].getAttribute("title");
                                    document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 69, altKey: true }));
                                }, 500);

                            }
                        }, 500);


                    }
                    else {

                        span.textContent = "";
                        setTimeout(function () {
                            span.textContent = phrases.NEW_CHAT_INPUT_INCORRECT;
                        }, 100);


                    }

                }
                if (e.keyCode == 27) {
                    e.preventDefault();
                    e.stopPropagation();
                    newChatContainer.parentNode.removeChild(newChatContainer);
                }
            }, false);

            newChatContainer.appendChild(newChatInput);
            newChatContainer.appendChild(span);
            newChatContainer = setClassSROnly(newChatContainer);
            document.body.insertBefore(newChatContainer, document.body.firstChild);

        }
        setTimeout(function () {
            newChatInput.focus();
        }, 100);

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
        } else if (isRussian(myLanguage)) {
            return "ru-ru";
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
    const isRussian = function (language) {
        const languages = ["ru-ru", "ru"];
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
"LANGUAGE_SELECTED":"O idioma do script foi alterado com sucesso!",
"LABEL_NEW_CHAT_INPUT":"Digite o número para o qual deseja enviar mensagem: ",
"NEW_CHAT_INPUT_INCORRECT":"Esse número está num formato inválido. Deve conter somente números, o código do país (Brasil = 55), o DDD da cidade (Belo Horizonte = 31) e o 9 antes do número.",
"NEW_CHAT_INPUT_INVALID_NUMBER":"Este número é inválido, talvez não esteja cadastrado no Whatsapp.",
"DIALOG_HEADING_TO_RECORD_BUTTON":"Clique no botão abaixo para iniciar a gravação da mensagem de voz:",
"RECORDING_DIALOG_HEADING":"Gravação de mensagem de voz. Utilize as setas para navegar.",
"REPLACE_CONTACT_PHONE_MESSAGE":"Mensagem de",
"CLOSE":"Fechar",
"SEND":"Enviar",
"CHECKED":"Marcado ",
"UNCHECKED":"Não marcado ",
"CONTAINER_HEADING":"Selecione uma opção apertando a tecla 'enter', ou precione ALT + M para selecionar outras mensagens utilizando a 'barra de espaço'.",
"SELECTED_MESSAGE":" mensagem(ens) selecionada(s)."
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
   "LANGUAGE_SELECTED":"The script language has been successfully changed!",
   "LABEL_NEW_CHAT_INPUT": "Enter the number you want to send a message to:",
"NEW_CHAT_INPUT_INCORRECT": "This number is in an invalid format. It must contain only numbers, the country code and the city code before the phone number.",
"NEW_CHAT_INPUT_INVALID_NUMBER": "This number is invalid, it may not be registered on Whatsapp.",
"DIALOG_HEADING_TO_RECORD_BUTTON": "Click the button below to start recording your voice message:",
"RECORDING_DIALOG_HEADING": "Voice message recording. Use the arrows to navigate.",
"REPLACE_CONTACT_PHONE_MESSAGE":"Message from",
"CLOSE": "Close",
"SEND": "Send",
"CHECKED": "Checked ",
"UNCHECKED": "Not checked ",
"CONTAINER_HEADING": "Select an option by pressing the 'enter' key, or press ALT + M to select other messages using the 'space bar'.",
"SELECTED_MESSAGE":" message(s) selected."
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
       "LANGUAGE_SELECTED":"¡El idioma se ha cambiado correctamente!",
       "LABEL_NEW_CHAT_INPUT": "Ingresa el número al que deseas enviar un mensaje: ",
"NEW_CHAT_INPUT_INCORRECT": "Este número tiene un formato no válido. Debe contener solo números, el código del país y el código de la ciudad antes del número.",
"NEW_CHAT_INPUT_INVALID_NUMBER": "Este número no es válido, puede que no esté registrado en Whatsapp.",
"DIALOG_HEADING_TO_RECORD_BUTTON": "Haga clic en el botón de abajo para comenzar a grabar su mensaje de voz:",
"RECORDING_DIALOG_HEADING": "Grabación de notas de voz. Usa las flechas para navegar.",
"REPLACE_CONTACT_PHONE_MESSAGE":"Mensaje de",
"CLOSE":"Cerrar",
"SEND": "Enviar",
"CHECKED": "Marcado ",
"UNCHECKED": "No marcado ",
"CONTAINER_HEADING": "Seleccione una opción presionando la tecla 'enter', o presione ALT + M para seleccionar otros mensajes usando la 'barra espaciadora'.",
"SELECTED_MESSAGE":" mensaje(s) seleccionada(s)."
                            },
                    {
                        "language": "ru-ru",
                        "description":"Russian (Русский)",
                        "SCRIPT_ACTIVATED": "Скрипт доступности успешно активирован!",
                        "LOADING_PAGE": "Документ все еще загружается...",
                        "SCRIPT_DESACTIVATED": "Скрипт доступности отключен!",
   "MAIN_PANE_HEADING": "Основная панель",
   "CURRENT_CONVERSATION": "Активный чат с ",
   "CONVERSATION_TITLE_WITHOUT_CONTACT_NAME": "Активный чат",
   "BUTTON_SEND_TEXT_MESSAGE": "Отправить текстовое сообщение",
   "BUTTON_RECORD_VOICE_MESSAGE": "Записать голосовое сообщение",
   "BUTTON_SEND_VOICE_MESSAGE": "Отправить голосовое сообщение",
   "BUTTON_CANCEL_RECORDING": "Отменить запись",
   "WRITE_MESSAGE": "Написать сообщение для ",
   "WRITE_MESSAGE_WITHOUT_CONTACT_NAME": "Написать сообщение",
   "ATTACH_CONTAINER_MESSAGE": "Выберите, что вы хотите прикрепить...",
   "SEARCH_LABEL": "Поиск чатов и контактов...",
   "SELECT_LANGUAGE":"Выберите язык скрипта: ",
   "LANGUAGE_SELECTED":"Язык скрипта был успешно изменен!",
   "LABEL_NEW_CHAT_INPUT": "Введите номер, на который вы хотите отправить сообщение:",
"NEW_CHAT_INPUT_INCORRECT": "Не допустимый формат номера. Он должен содержать только цифры, код страны (+7 Россия) и код оператора перед номером телефона.",
"NEW_CHAT_INPUT_INVALID_NUMBER": "Этот номер недействителен, он не может быть зарегистрирован в Whatsapp.",
"DIALOG_HEADING_TO_RECORD_BUTTON": "Нажмите кнопку ниже, чтобы начать запись голосового сообщения:",
"RECORDING_DIALOG_HEADING": "Запись голосового сообщения. Для навигации используйте стрелки.",
"REPLACE_CONTACT_PHONE_MESSAGE":"Сообщение от",
"CLOSE": "Закрыть",
"SEND": "Отправить",
"CHECKED": "Отмечено ",
"UNCHECKED": "Не отмечено ",
"CONTAINER_HEADING": "Выберите нужную функцию, нажав клавишу 'enter' или нажмите ALT + M, используйте 'пробел', чтобы выбрать другие сообщения.",
"SELECTED_MESSAGE":" сообщений выбрано."
                        }
            ]
        `;

})()
