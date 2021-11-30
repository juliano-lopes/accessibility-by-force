const version = "5.5";
const WPPAPI = "https://api.whatsapp.com/send?phone=";
const CHANEL_URL = "https://youtu.be/Kxws4kpk_dY";
const defaultPlaybackRate = 1;
const SCRIPT_WHATSAPP_WEB_WITH_MORE_ACCESSIBILITY_SUBSCRIPTION = "script-whatsapp-web-with-more-accessibility-subscription";
var activeConversationTitle = "";
var listeners = [];
var activated = false;
var phrases = null;
var files = [];
var filesAttachInterval = null;
var playbackRate = defaultPlaybackRate;
initial();
function isChrome() {
    return navigator.userAgent.includes("Chrome");
}
function initial() {

    document.addEventListener("keydown", function (e) {
        if (e.altKey && e.keyCode == 83) {

            if (!activated) {

                if (document.getElementById("pane-side")) {
                    phrases = getPhrasesWithCorrectLanguage();
                    setMainPanelTitle();
                    activeEvents();
                    spanToAriaLive();

                    activated = true;
                    activation();
                    checkScriptUpdate();
                    checkChannelSubscrition();
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
function activation() {
    const ACTIVATE_URL = "https://julianolopes.com.br/activation.php?activated=#*#7-5";
    alert(phrases.SCRIPT_ACTIVATED);
    if (!localStorage.getItem("activated")) {
        let activate = window.open(ACTIVATE_URL);
        if (activate) {
            setTimeout(function () {
                activate.close();
            }, 2000);
            localStorage.setItem("activated", "#*#7-5");
        }
        else {
            let activateLink = document.createElement("a");
            activateLink.href = ACTIVATE_URL;
            activateLink.setAttribute("target", "_blank");
            document.body.appendChild(activateLink);
            activateLink.addEventListener("click", function () {
                localStorage.setItem("activated", "#*#7-5");
            });
            activateLink.click();
            activateLink.parentNode.removeChild(activateLink);
        }
    }

}

function checkChannelSubscrition() {


    if (!localStorage.getItem(SCRIPT_WHATSAPP_WEB_WITH_MORE_ACCESSIBILITY_SUBSCRIPTION)) {

        subscritionInformation();

    }
}

function subscritionInformation() {
    if (document.getElementById("subscrition-information")) {
        document.getElementById("subscrition-information").focus();
    } else {

        let subscritionInformationContainer = document.createElement("div");
        let subscritionInformationHeading = document.createElement("h1");
        let subscritionInformationBody = document.createElement("p");
        let subscritionInformationOkButton = document.createElement("button");
        let subscritionInformationCloseButton = document.createElement("button");
        let subscritionInformationChanel = document.createElement("div");
        subscritionInformationHeading.id = "subscrition-information-heading";
        subscritionInformationHeading.textContent = phrases.SUBSCRIPTION_HEADING;
        subscritionInformationBody.textContent = phrases.SUBSCRIPTION_BODY;

        subscritionInformationOkButton.textContent = phrases.UPDATE_INFORMATION_OK_BUTTON;
        subscritionInformationOkButton.id = "uiokb";
        subscritionInformationCloseButton.textContent = phrases.UPDATE_INFORMATION_CLOSE_BUTTON;
        subscritionInformationCloseButton.id = "uicb";

        subscritionInformationContainer.id = "channel-subscrition-information";
        subscritionInformationContainer.setAttribute("role", "dialog");
        subscritionInformationContainer.setAttribute("tabindex", "-1");
        subscritionInformationContainer.setAttribute("aria-labelledby", subscritionInformationHeading.id);

        subscritionInformationCloseButton.addEventListener("click", () => subscritionInformationContainer.parentNode.removeChild(subscritionInformationContainer));
        subscritionInformationOkButton.addEventListener("click", () => subscritionInformationContainer.parentNode.removeChild(subscritionInformationContainer));
        subscritionInformationContainer.addEventListener("keydown", function (e) {
            let allowedKeys = [13, 38, 39, 40, 41];
            if (allowedKeys.indexOf(e.keyCode) == -1) {
                e.preventDefault();
                e.stopPropagation();
            }

            if (e.keyCode == 27)
                subscritionInformationContainer.parentNode.removeChild(updateInformationContainer);
        }, false);
        subscritionInformationContainer.appendChild(subscritionInformationCloseButton);
        subscritionInformationContainer.appendChild(subscritionInformationHeading);

        subscritionInformationContainer.appendChild(subscritionInformationBody);
        let subscritionLink = document.createElement("a");
        subscritionLink.href = "https://www.youtube.com/channel/UCxWt9IBtZME208X-LFVSRZw?sub_confirmation=1";
        subscritionLink.setAttribute("target", "_blank");
        subscritionLink.textContent = phrases.SUBSCRIPTION_LINK_TEXT;
        subscritionLink.addEventListener("click", function (e) {
            localStorage.setItem(SCRIPT_WHATSAPP_WEB_WITH_MORE_ACCESSIBILITY_SUBSCRIPTION, SCRIPT_WHATSAPP_WEB_WITH_MORE_ACCESSIBILITY_SUBSCRIPTION);

        });
        subscritionInformationChanel.appendChild(subscritionLink);
        subscritionInformationContainer.appendChild(subscritionInformationChanel);

        subscritionInformationContainer.appendChild(subscritionInformationOkButton);

        document.body.appendChild(subscritionInformationContainer);

        subscritionInformationContainer.focus();
    }
}

function scriptVersionInformation() {
    if (document.getElementById("script-version-information")) {
        document.getElementById("script-version-information").focus();
    } else {

        let updateInformationContainer = document.createElement("div");
        let updateInformationHeading = document.createElement("h1");
        let updateInformationBody = document.createElement("p");
        let updateInformationOkButton = document.createElement("button");
        let updateInformationCloseButton = document.createElement("button");
        let updateInformationChanelLink = document.createElement("a");
        updateInformationHeading.id = "update-information-heading";
        updateInformationHeading.textContent = phrases.UPDATE_INFORMATION_HEADING;
        updateInformationOkButton.textContent = phrases.UPDATE_INFORMATION_OK_BUTTON;
        updateInformationOkButton.id = "uiokb";
        updateInformationCloseButton.textContent = phrases.UPDATE_INFORMATION_CLOSE_BUTTON;
        updateInformationCloseButton.id = "uicb";

        let updateInformationBodyText = phrases.UPDATE_INFORMATION_BODY.split("#");
        updateInformationBody.textContent = updateInformationBodyText[0] + version + updateInformationBodyText[1];
        updateInformationChanelLink.href = CHANEL_URL;
        updateInformationChanelLink.target = "_blank";
        updateInformationChanelLink.textContent = phrases.UPDATE_INFORMATION_CHANEL_LINK;
        updateInformationContainer.id = "script-version-information";
        updateInformationContainer.setAttribute("role", "dialog");
        updateInformationContainer.setAttribute("tabindex", "-1");
        updateInformationContainer.setAttribute("aria-labelledby", updateInformationHeading.id);

        updateInformationCloseButton.addEventListener("click", () => updateInformationContainer.parentNode.removeChild(updateInformationContainer));
        updateInformationOkButton.addEventListener("click", () => updateInformationContainer.parentNode.removeChild(updateInformationContainer));
        updateInformationContainer.addEventListener("keydown", function (e) {
            let allowedKeys = [13, 38, 39, 40, 41];
            if (allowedKeys.indexOf(e.keyCode) == -1) {
                e.preventDefault();
                e.stopPropagation();
            }

            if (e.keyCode == 27)
                updateInformationContainer.parentNode.removeChild(updateInformationContainer);
        }, false);
        updateInformationContainer.appendChild(updateInformationCloseButton);
        updateInformationContainer.appendChild(updateInformationHeading);
        updateInformationBody.appendChild(updateInformationChanelLink);
        updateInformationContainer.appendChild(updateInformationBody);
        updateInformationContainer.appendChild(updateInformationOkButton);
        document.body.appendChild(updateInformationContainer);
        updateInformationContainer.focus();
    }
}

function checkScriptUpdate() {
    const SCRIPT_WHATSAPP_WEB_WITH_MORE_ACCESSIBILITY_VERSION = "script-whatsapp-web-with-more-accessibility-version";

    if (localStorage.getItem(SCRIPT_WHATSAPP_WEB_WITH_MORE_ACCESSIBILITY_VERSION)) {
        if (localStorage.getItem(SCRIPT_WHATSAPP_WEB_WITH_MORE_ACCESSIBILITY_VERSION) < version) {

            localStorage.setItem(SCRIPT_WHATSAPP_WEB_WITH_MORE_ACCESSIBILITY_VERSION, version);
            scriptVersionInformation();
        }
    }
    else {
        localStorage.setItem(SCRIPT_WHATSAPP_WEB_WITH_MORE_ACCESSIBILITY_VERSION, version);
    }
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
function setLabelOnAttachFiles() {
    filesAttachInterval ? clearInterval(filesAttachInterval) : null;
    files = [];
    filesAttachInterval = setInterval(function () {
        if (document.querySelector('header').parentNode.parentNode && document.querySelector('header').parentNode.parentNode.querySelector('[data-icon="x-alt"]') && document.querySelector('header').parentNode.parentNode.querySelector('[data-icon="x"]') && document.querySelector('header').parentNode.parentNode.querySelector('[data-icon="send"]')) {
            document.querySelector('header').parentNode.parentNode.setAttribute("data-sr-only", "dialog-to-atach-files");
            document.querySelector('header').parentNode.parentNode.setAttribute("role", "dialog");
            document.querySelector('header').parentNode.parentNode.setAttribute("tabindex", "-1");

            if (document.querySelectorAll('[data-icon="x-alt"]') && document.querySelectorAll('[data-icon="x-alt"]').length > files.length) {
                document.querySelector('header').parentNode.parentNode.focus();
                files = document.querySelectorAll('[data-icon="x-alt"]');

                files.forEach(function (el, i) {
                    if (!el.querySelector('span')) {
                        let span = document.createElement("span");
                        span.textContent = phrases.REMOVE_ATTACHED_FILE + (i + 1);
                        el.appendChild(span);
                        let span2 = document.createElement("span");
                        span2.textContent = phrases.VIEW_ATTACHED_FILE + (i + 1);
                        el.parentNode.parentNode.appendChild(span2);
                    }
                });
            }

            document.querySelector('[data-icon="x"]').parentNode.setAttribute("aria-label", phrases.CLOSE_ATTACHED_FILE_PREVIEW);
            document.querySelector('[data-icon="x"]').parentNode.addEventListener("click", function () {
                clearInterval(filesAttachInterval);
                files = [];
            }, false);

            document.querySelector('[data-icon="send"]').parentNode.setAttribute("aria-label", phrases.SEND_ATTACHED_FILE);
            document.querySelector('[data-icon="send"]').parentNode.addEventListener("click", function () {
                clearInterval(filesAttachInterval);
                files = [];
            }, false);

            document.querySelector('header').parentNode.parentNode.addEventListener("keyup", function (e) {
                if (e.keyCode == 27) {
                    clearInterval(filesAttachInterval);
                    files = [];
                }

            }, false);
        }

    }, 2000);

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
            if (el && el.querySelector('[data-icon]') && el.querySelector('[data-icon]').getAttribute("data-icon").indexOf("user") != -1) {
                let statusContainer = el.querySelector('header');
                statusContainer = statusContainer ? statusContainer.querySelector('[dir="auto"]') : null;
                statusContainer = statusContainer ? statusContainer.parentNode : null;
                statusContainer = statusContainer ? statusContainer.parentNode : null;
                statusContainer = statusContainer ? statusContainer.parentNode : null;
                statusContainer ? statusContainer.setAttribute("aria-live", "polite") : null;

            }

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
            setLabelOnAttachFiles();
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
                let conversationStatus = document.getElementById("main") ? document.getElementById("main").querySelector("header") : null;
                conversationStatus = conversationStatus ? conversationStatus.querySelector('[dir="auto"]') : null;
                conversationStatus = conversationStatus ? conversationStatus.parentNode : null;
                conversationStatus = conversationStatus ? conversationStatus.parentNode : null;
                conversationStatus = conversationStatus ? conversationStatus.nextSibling : null;
                conversationStatus = conversationStatus ? conversationStatus.querySelector('span[title]') : null;
                conversationStatus = conversationStatus ? conversationStatus.getAttribute("title") : null;
                conversationStatus = conversationStatus && conversationStatus.indexOf(",") == -1 ? conversationStatus : null;

                spanAriaLive.textContent = conversationStatus ? activeConversationTitle + " (" + conversationStatus + ")" : activeConversationTitle;
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
        } else if (e.altKey && e.keyCode == 73) {
            e.preventDefault();
            e.stopPropagation();

            scriptVersionInformation();
        }
        el ? el.focus() : false;

        if (document.getElementById('main')) {
            updateMessage();
            addFooterButtonLabels();
            addClickOnElementsIntoMessage();
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

function addClickOnElementsIntoMessage() {

    let main = document.getElementById("main");
    if (main) {
        main.querySelectorAll('[class*="message-in"], [class*="message-out"]').forEach(function (msg) {
            //!isChrome() ? addClickOnAudioButton(msg) : false;
            controlNativeAudioMensagem(msg);
            downloadFile(msg);
            replaceContactPhone(msg);
            replaceContactPhoneInMention(msg);
            addLabelVideoAndImage(msg);
        });
    }
}
function controlNativeAudioMensagem(msg) {
    let audioButton = msg.querySelector('button span[data-icon*="audio-p"]');
    if (audioButton && !audioButton.parentNode.getAttribute("data-sr-only-audio")) {
        let slider = msg.querySelector('[role="slider"]');
        msg.addEventListener("keydown", function (e) {
            if (e.keyCode == 49) {
                e.preventDefault();
                if (document.activeElement.getAttribute("role") && document.activeElement.getAttribute("role") == "slider")
                    audioButton.parentNode.focus();
                else
                    slider.focus();
            } else if (e.keyCode == 50) {
                e.preventDefault();
                msg.querySelectorAll('[aria-hidden]').forEach((elem) => {
                    if (elem.getAttribute("role") && elem.getAttribute("role") == "button") {
                        if (elem.firstChild && elem.firstChild.textContent.indexOf(",") != -1) {
                            elem.setAttribute("aria-hidden", "false");
                            let speedElement = elem.firstChild;
                            speedElement.setAttribute("role", "alert");
                            elem.click();
                        }
                    }
                });
            }

        });

        audioButton.parentNode.setAttribute("data-sr-only-audio", "data-sr-only-audio");
    }
}
function addClickOnAudioButton(msg) {
    let audioButton = msg.querySelector('button span[data-icon="audio-play"]');
    downloadUnloadAudio(msg);
    if (audioButton && !audioButton.parentNode.getAttribute("data-sr-only-audio")) {
        createNewElementAudio(msg);
        msg.addEventListener("keydown", function (e) {
            playAndStopAudio(msg, e);
            playerControl(msg, e);
        });
        audioButton.parentNode.setAttribute("data-sr-only-audio", "data-sr-only-audio");
    }
}

function downloadUnloadAudio(msg) {
    let downloadAudioButton = msg.querySelector('button span[data-icon="audio-download"]');
    if (downloadAudioButton && !msg.querySelector('[class*=doc-]')) {
        downloadAudioButton.parentNode.click();
    }
}

function pauseNewAudioElement() {
    document.querySelectorAll('audio').forEach(function (audio) {
        if (playing(audio))
            audio.pause();
    });
}

function createNewElementAudio(msg) {
    let originalAudio = msg.querySelector('audio');
    if (originalAudio && !msg.querySelector('[data-sr-new-element-audio]')) {
        fetch(originalAudio.src).then((res) => res.blob()).then((res) => {
            let reader = new FileReader();
            reader.readAsDataURL(res);
            reader.onload = function (e) {
                let newAudioElement = document.createElement("audio");
                newAudioElement.setAttribute("data-sr-new-element-audio", "data-sr-new-element-audio");
                newAudioElement.setAttribute("style", "display: none;");
                newAudioElement.src = e.target.result;
                originalAudio.parentNode.appendChild(newAudioElement);
                originalAudio.onplay = function () {
                    playJustNewAudioElement(msg);
                };
                newAudioElement.ontimeupdate = function () {
                    originalAudio.currentTime = parseInt(newAudioElement.currentTime) - 1;
                };

            };
        });
    }
}

function playing(audio) {
    return ((audio.currentTime > 0) && (!audio.paused));
}

function playerControl(msg, event) {
    let newAudioElement = msg.querySelector('[data-sr-new-element-audio]');
    if (newAudioElement && playing(newAudioElement)) {
        if (event.shiftKey && event.keyCode == 37) {
            event.preventDefault();
            event.stopPropagation();
            playbackRate = defaultPlaybackRate;
            newAudioElement.playbackRate = playbackRate;
        }
        else if (!event.ctrlKey && event.keyCode == 39) {
            event.preventDefault();
            event.stopPropagation();
            newAudioElement.currentTime += 1;
        }
        else if (!event.ctrlKey && event.keyCode == 37) {
            event.preventDefault();
            event.stopPropagation();
            newAudioElement.currentTime -= 1;
        }
        else if (event.ctrlKey && event.keyCode == 37) {
            event.preventDefault();
            event.stopPropagation();
            playbackRate -= 0.2;
            newAudioElement.playbackRate = playbackRate;
        }
        else if (event.ctrlKey && event.keyCode == 39) {
            event.preventDefault();
            event.stopPropagation();
            playbackRate += 0.2;
            newAudioElement.playbackRate = playbackRate;
        }
        else if (event.ctrlKey && event.keyCode == 38) {
            event.preventDefault();
            event.stopPropagation();
            newAudioElement.volume += 0.1;
        }
        else if (event.ctrlKey && event.keyCode == 40) {
            event.preventDefault();
            event.stopPropagation();
            newAudioElement.volume -= 0.1;
        }
    }
}

function playAndStopAudio(msg, e) {
    let originalAudio = msg.querySelector('audio');
    let newAudio = originalAudio.parentNode.querySelector('[data-sr-new-element-audio]');
    if (e.keyCode == 13) {
        if (newAudio) {
            if (playing(newAudio)) {
                originalAudio.pause();
                newAudio.pause();
            }
            else {
                pauseNewAudioElement();
                originalAudio.volume = 0;
                newAudio.play();
                newAudio.playbackRate = playbackRate;
                originalAudio.play();
            }
        }
        else {
            if (playing(originalAudio)) {
                originalAudio.pause();
            }
            else {
                pauseNewAudioElement();
                originalAudio.play();
            }
        }
    }
}

function playJustNewAudioElement(msg) {
    let originalAudio = msg.querySelector('audio');
    let newAudio = originalAudio.parentNode.querySelector('[data-sr-new-element-audio]');
    msg.setAttribute("aria-label", "-");
    msg.focus();
    msg.onfocus = function () {
        msg.removeAttribute("aria-label");
    };
    originalAudio.volume = 0;
    newAudio.play();
    newAudio.playbackRate = playbackRate;
}

function downloadFile(msg) {
    if (msg.querySelector('[class*="icon-doc"]')) {
        if (!msg.querySelector('[sr-only-download-file]')) {
            msg.querySelector("button") ? msg.querySelector("button").setAttribute("sr-only-download-file", "download-file") : false;
            msg.addEventListener("keydown", function (ek) {
                if (ek.keyCode == 13)
                    msg.querySelector("button") ? msg.querySelector("button").click() : false;
            }, false);
        }
    }
}

function replaceContactPhoneInMention(msg) {
    let mention = msg.querySelector(".quoted-mention");
    if (mention) {
        if (!mention.getAttribute("data-sr-only")) {
            let dataElement = mention.parentNode;
            dataElement = dataElement ? dataElement.previousSibling : null;
            if (dataElement) {
                let phone = dataElement.firstChild;
                let name = dataElement.lastChild;

                if (dataElement.childElementCount == 2)
                    phone ? phone.setAttribute("aria-hidden", "true") : false;

                let posPhone = document.createElement("span");
                posPhone.innerHTML = "<p> " + phrases.REPLAY + " &nbsp;&nbsp;</p>";
                posPhone = setClassSROnly(posPhone);
                dataElement.insertBefore(posPhone, name);

                let posName = document.createElement("span");
                posName.innerHTML = "<p> &nbsp; " + phrases.ABOUT + " &nbsp;</p>";
                posName = setClassSROnly(posName);
                dataElement.appendChild(posName);

                let posMention = document.createElement("span");
                posMention.innerHTML = "<p> " + phrases.SAY + ": </p>";
                posMention = setClassSROnly(posMention);
                mention.parentNode.appendChild(posMention);
                mention.setAttribute("data-sr-only", "mention");
                msg.addEventListener("keydown", (e) => {
                    if (e.keyCode == 51) {
                        e.preventDefault();
                        if (mention.getAttribute("aria-hidden") && mention.getAttribute("aria-hidden") == "true") {
                            mention.setAttribute("aria-hidden", "false");
                            posName.setAttribute("aria-hidden", "false");
                            document.getElementById("span-to-aria-live").textContent = document.getElementById("span-to-aria-live") ? phrases.SHOWED_TEXT : "";
                        }
                        else {
                            mention.setAttribute("aria-hidden", "true");
                            posName.setAttribute("aria-hidden", "true");
                            document.getElementById("span-to-aria-live").textContent = document.getElementById("span-to-aria-live") ? phrases.HIDDEN_TEXT : "";
                        }
                        setTimeout(() => {
                            document.getElementById("span-to-aria-live").textContent = "";
                        }, 1000);
                    }
                });

            }
        }
    }
}

function replaceContactPhone(msg) {

    let contactName = msg.querySelector('span[dir="auto"]');
    if (contactName && !contactName.parentNode.querySelector('[data-sr-only="pos-name"]') && !msg.querySelector('.quoted-mention') && contactName.textContent != "" && contactName.textContent.indexOf(":") == -1 && !contactName.querySelector('.matched-mention')) {
        let span = document.createElement("span");
        span.setAttribute("data-sr-only", "pos-name");
        span.innerHTML = "&nbsp; " + phrases.SAY_S + ": &nbsp;";
        span = setClassSROnly(span);
        contactName.parentNode.appendChild(span);
    }

    if (contactName && (contactName.textContent != "") && (contactName.textContent.indexOf(":") == -1) && contactName.previousSibling && (contactName.previousSibling.getAttribute("role") == "button")) {
        let contactPhone = contactName.previousSibling;

        if (contactPhone.textContent.indexOf("+") == 0) {

            if (!contactPhone.parentNode.querySelector('[data-sr-only="replace-contact-phone"]')) {
                let span = document.createElement("span");
                span.setAttribute("data-sr-only", "replace-contact-phone");
                //span.textContent = phrases.REPLACE_CONTACT_PHONE_MESSAGE;
                contactPhone.parentNode.insertBefore(span, contactPhone.parentNode.firstChild);
                contactPhone.setAttribute("aria-hidden", "true");
            }
        }

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
        newChatInput = document.createElement("input");
        let span = document.createElement("span");
        newChatContainer.id = "new-chat-container";
        span.setAttribute("role", "alert");
        newChatInput.setAttribute("type", "tel");
        newChatInput.id = "new-chat-input";
        newChatInput.setAttribute("aria-label", phrases.LABEL_NEW_CHAT_INPUT);
        newChatInput.setAttribute("placeholder", phrases.PLACEHOLDER_NEW_CHAT_INPUT);
        newChatInput.setAttribute("autocomplete", "off");
        let newChatInputStyle = "background-color: #90ee90;";

        newChatInput.setAttribute("style", newChatInputStyle);
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
                                let conversationTitle = main.querySelector("header");
                                conversationTitle = conversationTitle ? conversationTitle.querySelector('[dir="auto"]') : "";
                                conversationTitle = conversationTitle ? conversationTitle.getAttribute("title") : "";

                                activeConversationTitle = conversationTitle;
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
        document.getElementById("pane-side").insertBefore(newChatContainer, document.getElementById("pane-side").firstChild);

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
"LANGUAGE_SELECTED":"O idioma do script foi alterado com sucesso!",
"LABEL_NEW_CHAT_INPUT":"Digite o número para o qual deseja enviar mensagem",
"PLACEHOLDER_NEW_CHAT_INPUT":"EX.: 5531999999999",
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
"SELECTED_MESSAGE":" mensagem(ens) selecionada(s).",
"NEW_VERSION_MESSAGE":"Uma nova versão para o script 'Whatsapp Web With More Accessibility' está disponível. Caso queira atualizar, clique em 'OK' e depois em atualizar. Após isso recarregue a página do Whatsapp apertando a tecla F5 e reative o script com ALT + S. Nova versão: ",
"CLOSE_ATTACHED_FILE_PREVIEW":"Fechar previsualização de arquivos",
"REMOVE_ATTACHED_FILE":"Remover arquivo ",
"VIEW_ATTACHED_FILE":"Visualizar arquivo ",
"SEND_ATTACHED_FILE":"Enviar arquivos anexados",
"UPDATE_INFORMATION_HEADING":"Atualização para o ScriptWhatsappWebWithMoreAccessibility",
"UPDATE_INFORMATION_OK_BUTTON":"Ok",
"UPDATE_INFORMATION_CLOSE_BUTTON":"Fechar janela de informação",
"UPDATE_INFORMATION_BODY":"O script WhatsappWebWithMoreAccessibility foi atualizado para versão #. Se inscreva e acompanhe o canal para ficar por dentro do que mudou. Acesse: ",
"UPDATE_INFORMATION_CHANEL_LINK":"@Continue Desenvolvendo no Youtube. (Abrirá em uma nova aba)",
"SUBSCRIPTION_HEADING":"Um momento de sua atenção",
"SUBSCRIPTION_BODY":"Espero que você esteja gostando do script para o WhatsApp Web! Esse é um trabalho que tenho feito com muito carinho, na esperança de que lhe seja útil. Por favor, gostaria de seu apoio para que eu consiga continuar com as atualizações e novidades do script. Para isso gostaria de pedir para que você se inscreva no canal @Continue Desenvolvendo clicando no link a seguir que irá abrir uma nova página, e então você precisará clicar no botão 'Inscrever-se' para confirmar. Obrigado, isso é de grande ajuda para mim!",
"SUBSCRIPTION_LINK_TEXT":"Se inscrever no canal @Continue Desenvolvendo (abrirá em outra aba)",
"REPLAY":"responde",
"ABOUT":"sobre",
"SAY":"dizendo",
"HIDDEN_TEXT":"texto oculto",
"SHOWED_TEXT":"texto exibido"

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
"PLACEHOLDER_NEW_CHAT_INPUT":"EX.: 5531999999999",
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
"SELECTED_MESSAGE":" message(s) selected.",
"NEW_VERSION_MESSAGE": "A new version for the 'Whatsapp Web With More Accessibility' script is available. If you want to update, click on 'OK' and then on update. After that reload the Whatsapp page by pressing the F5 key and reactivate the script with ALT + S. New version: ",
"CLOSE_ATTACHED_FILE_PREVIEW":"Close file preview",
"REMOVE_ATTACHED_FILE":"Remove file ",
"VIEW_ATTACHED_FILE":"View file ",
"SEND_ATTACHED_FILE":"Send attached files",
"UPDATE_INFORMATION_HEADING": "Update for ScriptWhatsappWebWithMoreAccessibility",
"UPDATE_INFORMATION_OK_BUTTON": "Ok",
"UPDATE_INFORMATION_CLOSE_BUTTON": "Close information window",
"UPDATE_INFORMATION_BODY": "The WhatsappWebWithMoreAccessibility script has been updated to # version. Subscribe and follow the channel to stay on top of what has changed. Access: ",
"UPDATE_INFORMATION_CHANEL_LINK": "@Continue Desenvolvendo on Youtube. (It will open in a new tab)",
"SUBSCRIPTION_HEADING":"A moment of your attention",
"SUBSCRIPTION_BODY":"I hope you're enjoying the script for WhatsApp Web! This is a job I've been doing with a lot of love, hoping it will be useful to you. Please, I'd like your support so I can continue with the script updates and news. For this I would like to ask you to subscribe to the @Continue Desenvolvendo channel by clicking on the following link which will open a new page, and then you will need to click on the 'Subscribe' button to confirm it. Thank you, this is a great help for me!",
"SUBSCRIPTION_LINK_TEXT":"Subscribe to @Continue Desenvolvendo channel (will open in another tab)",
"REPLAY":"replays",
"ABOUT":"about",
"SAY":"saying",
"HIDDEN_TEXT":"the text was hidden",
"SHOWED_TEXT":"the text is showed"

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
"PLACEHOLDER_NEW_CHAT_INPUT":"EX.: 5531999999999",
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
"SELECTED_MESSAGE":" mensaje(s) seleccionada(s).",
"NEW_VERSION_MESSAGE": "Hay disponible una nueva versión del script 'Whatsapp Web With More Accessibility'. Si desea actualizar, haga clic en 'OK' y luego en actualizar. Después de eso, vuelva a cargar la página de Whatsapp presionando la tecla F5 y reactive el script con ALT + S. Nueva versión: ",
"CLOSE_ATTACHED_FILE_PREVIEW":"Cerrar vista previa del archivo",
"REMOVE_ATTACHED_FILE":"Eliminar archivo ",
"VIEW_ATTACHED_FILE":"Ver archivo ",
"SEND_ATTACHED_FILE":"Enviar archivos adjuntos",
"UPDATE_INFORMATION_HEADING": "Actualización de ScriptWhatsappWebWithMoreAccessibility",
"UPDATE_INFORMATION_OK_BUTTON": "Ok",
"UPDATE_INFORMATION_CLOSE_BUTTON": "Cerrar ventana de información",
"UPDATE_INFORMATION_BODY": "El script WhatsappWebWithMoreAccessibility se ha actualizado a la versión #. Suscríbete y sigue el canal para estar al tanto de lo que ha cambiado. Acceso: ",
"UPDATE_INFORMATION_CHANEL_LINK": "@Continue Desenvolvendo en Youtube. (Se abrirá en una nueva pestaña)",
"SUBSCRIPTION_HEADING": "Un momento de su atención",
"SUBSCRIPTION_BODY": "¡Espero que estés disfrutando el script para WhatsApp Web! Este es un trabajo que he estado haciendo con mucho amor, esperando que te sea útil. Por favor, me gustaría tu apoyo, así que puede continuar con las actualizaciones del script y las noticias.Para ello, me gustaría pedirle que se suscriba al canal @Continue Desenvolvendo haciendo clic en el siguiente enlace que abrirá una nueva página, y luego deberá hacer clic en el botón 'Suscribe'. ¡Gracias, esto es de gran ayuda para mí!",
"SUBSCRIPTION_LINK_TEXT": "Suscríbete a canal @Continue Desenvolvendo (se abrirá en otra pestaña)",
"REPLAY":"responde",
"ABOUT":"sobre",
"SAY":"diciendo",
"HIDDEN_TEXT":"texto oculto",
"SHOWED_TEXT":"texto mostrado"

                }
]
`;