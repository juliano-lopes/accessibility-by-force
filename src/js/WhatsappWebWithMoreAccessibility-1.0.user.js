// ==UserScript==
// @name         WhatsappWithMoreAccessibility
// @namespace    https://github.com/juliano-lopes/accessibility-by-force/
// @version      1.1
// @description  It inserts accessibility on WhatsappWeb
// @author       Juliano Lopes (https://github.com/juliano-lopes/)
// @match        *://web.whatsapp.com
// @downloadURL https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.user.js
// @updateURL https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var atachInterval;
    var messageInterval;
    var removeAttributesWithoutAccessibilityInterval;
    initialButton();
    function initialButton() {
        let initialButton = document.createElement("button");
        initialButton.setAttribute("aria-label", "Ativar script de acessibilidade");
        initialButton.setAttribute("data-status", "off");
        initialButton.addEventListener("click", function () {
            let buttonAccessibility = document.querySelector('[data-status]');
            if (buttonAccessibility.getAttribute("data-status") === "off") {
                if (document.getElementById("pane-side").querySelectorAll('[data-icon="default-user"]').length > 0) {
                    addSearchButton();
                    setMainPanelTitle();
                    cleanSearchButton();
                    messageInterval = setInterval(updateMessage, 1000);
                    atachInterval = setInterval(updateAtachLabel, 1500);
                    buttonAccessibility.setAttribute("data-status", "on");
                    buttonAccessibility.setAttribute("aria-label", "Desativar script de acessibilidade");
                    removeAttributesWithoutAccessibilityInterval = setInterval(removeAttributesWithoutAccessibility, 1000);
                    alert('Script de acessibilidade ativado!');
                }
                else {
                    alert('Documento ainda sendo carregado...');
                }
            }
            else {
                clearInterval(messageInterval);
                clearInterval(atachInterval);
                clearInterval(removeAttributesWithoutAccessibilityInterval);
                removeAccessibilityElements();
                buttonAccessibility.setAttribute("data-status", "off");
                buttonAccessibility.setAttribute("aria-label", "Ativar script de acessibilidade");
                alert("Script de acessibilidade desativado!");
            }
        }, false);
        document.body.insertBefore(initialButton, document.body.firstChild);
    }
    function removeAttributesWithoutAccessibility() {
        removeAttributeRoleWithText();
        removeAttributeRoleWithGroup();
    }
    function removeAttributeRoleWithText() {
        let roleTextAttributes = document.querySelectorAll('[role="text"]');
        if (roleTextAttributes.length > 0) {
            roleTextAttributes.forEach(function (el) {
                el.removeAttribute("role");
            });
        }
    }

    function removeAttributeRoleWithGroup() {
        let roleGroupAttributes = document.querySelectorAll('[role="group"]');
        if (roleGroupAttributes.length > 0) {
            roleGroupAttributes.forEach(function (el) {
                el.removeAttribute("role");
            });
        }
    }
    function updateMessage() {
        setMessageTitle();
        addPlayButtonLabel();
        setConversationTitle();
    }

    function updateAtachLabel() {
        addFooterButtonLabels();
        addButtonSendFileLabel();
        addAtachOptionButtonLabel();
    }

    function cleanSearchButton() {
        const backButton = document.querySelector('[data-icon="back-blue"]');
        if (backButton)
            backButton.setAttribute("aria-label", "Limpar e voltar para procura");
    }

    function setMainPanelTitle() {
        const panel = document.getElementById('pane-side');
        const mainPanelTitle = document.querySelector('[data-main-panel]');
        if (panel) {
            if (!mainPanelTitle) {
                let h2 = document.createElement("h2");
                let h2Text = document.createTextNode("Painel principal");
                h2.appendChild(h2Text);
                h2.setAttribute("data-sr-only", "pane-side");
                h2.setAttribute("data-main-panel", "pane-side");
                panel.insertBefore(h2, panel.firstChild);
            }
        }
    }

    function addButtonSendFileLabel() {
        let originalSendFile = document.querySelector('[data-icon="send-light"]');
        let cancelSendFile = document.querySelector('[data-icon="x-light"]');
        originalSendFile ? originalSendFile.setAttribute("aria-label", "Enviar arquivo") : "";
        cancelSendFile ? cancelSendFile.setAttribute("aria-label", "Cancelar Envio do arquivo") : "";
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
                if (conversationTitle)
                    conversationTitle = "Conversa ativa com " + conversationTitle;
                else
                    conversationTitle = "Conversa ativa";
                let h3 = document.createElement("h3");
                let h3Text = document.createTextNode(conversationTitle);
                h3.appendChild(h3Text);
                h3.setAttribute("data-sr-only", "conversation-title");
                main.insertBefore(h3, main.firstChild);
            }
        }
    }

    function setMessageTitle() {
        let main = document.getElementById('main');
        if (main) {
            let msgIn = main.querySelectorAll('div[class*="message-in"]');
            let msgOut = main.querySelectorAll('div[class*="message-out"]');
            if (msgOut.length > 0) {
                msgOut.forEach(function (message) {
                    let elSrOnly = message.querySelector('[data-sr-only]');
                    if (elSrOnly)
                        elSrOnly.parentNode.removeChild(elSrOnly);
                    let h5 = document.createElement("h5");
                    let h5Text = document.createTextNode("Mensagem enviada:");
                    h5.appendChild(h5Text);
                    h5.setAttribute("data-sr-only", "msg-out");
                    message.insertBefore(h5, message.firstChild);
                });
            }

            if (msgIn.length > 0) {
                msgIn.forEach(function (message) {
                    let elSrOnly = message.querySelector('[data-sr-only]');
                    if (elSrOnly)
                        elSrOnly.parentNode.removeChild(elSrOnly);
                    let h4 = document.createElement("h4");
                    let h4Text = document.createTextNode("Mensagem recebida:");
                    h4.appendChild(h4Text);
                    h4.setAttribute("data-sr-only", "msg-in");
                    message.insertBefore(h4, message.firstChild);
                });
            }
        }
    }

    function addPlayButtonLabel() {
        let main = document.getElementById('main');
        if (main) {
            let playButtons = main.querySelectorAll('[data-icon="audio-play"]');
            if (playButtons.length > 0) {
                playButtons.forEach(function (playButton) {
                    playButton.setAttribute("aria-label", "Play");
                });
            }
        }
    }

    function addAtachOptionButtonLabel() {
        let buttonToAtachFile = document.querySelector('[data-icon="clip"]');
        if (buttonToAtachFile) {
            document.querySelector('[data-icon="image"]').setAttribute("aria-label", "Fotos e V&iacute;deos");
            document.querySelector('[data-icon="camera"]').setAttribute("aria-label", "C&acirc;mera");
            document.querySelector('[data-icon="document"]').setAttribute("aria-label", "Documento");
            document.querySelector('[data-icon="contact"]').setAttribute("aria-label", "Contato");
        }
    }

    function addFooterButtonLabels() {
        let footer = document.querySelector('footer');
        if (footer) {
            document.querySelector('[data-icon="smiley"]').setAttribute("aria-label", "Smiley");
            document.querySelector('[data-icon="gif"]').setAttribute("aria-label", "GIF");
            document.querySelector('[data-icon="sticker"]').setAttribute("aria-label", "Sticker");
            let buttonToRecord = document.querySelector('[data-icon="ptt"]');
            buttonToRecord ? buttonToRecord.setAttribute("aria-label", "Gravar") : "";
            let buttonToSendText = document.querySelector('[data-icon="send"]');
            buttonToSendText ? buttonToSendText.setAttribute("aria-label", "Enviar") : "";
            let buttonToSendRecordedAudio = document.querySelector('[data-icon="round-send-inv"]');
            buttonToSendRecordedAudio ? buttonToSendRecordedAudio.setAttribute("aria-label", "Enviar") : "";
            let buttonToCancelRecord = document.querySelector('[data-icon="round-x-inv"]');
            buttonToCancelRecord ? buttonToCancelRecord.setAttribute("aria-label", "Cancelar grava&ccedil;&atilde;o") : "";
        }
    }

    function addSearchButton() {
        let buttonToSetSearchedTitle = document.createElement("button");
        buttonToSetSearchedTitle.setAttribute("aria-label", "Procurar");
        buttonToSetSearchedTitle.setAttribute("data-sr-only", "search");
        buttonToSetSearchedTitle.addEventListener("click", search, false);
        let mySearch = document.getElementsByTagName("input")[0];
        mySearch.parentNode.insertBefore(buttonToSetSearchedTitle, mySearch.nextSibling);
    }

    function search() {
        let mySearch = document.getElementsByTagName("input")[0];
        if (mySearch.value === "") {
            alert('A busca est� vazia...');
            return;
        }
        setTitleInSearchedResult();
    }

    function setTitleInSearchedResult() {
        let panel = document.getElementById('pane-side');
        let matchedResults = panel.querySelectorAll('.matched-text');
        if (matchedResults.length > 0) {
            matchedResults.forEach(function (match) {
                let message = match.parentNode;
                let title;
                if (message.getAttribute("title"))
                    title = "Conversa de " + message.getAttribute("title") + ":";
                else
                    title = "Mensagem:";
                if (message.querySelector('[data-sr-only]'))
                    message.querySelector('[data-sr-only]').parentNode.removeChild(message.querySelector('[data-sr-only]'));
                let h3 = document.createElement("h3");
                let h3Text = document.createTextNode(title);
                h3.appendChild(h3Text);
                h3.setAttribute("data-sr-only", "title");
                message.insertBefore(h3, match);
            });
        }
        else {
            alert('Nenhum resultado encontrado.');
        }
    }
    const getClassSROnly = (
    `
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
    
})()
