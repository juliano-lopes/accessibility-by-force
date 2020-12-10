// ==UserScript==
// @name         YoutubeViews
// @namespace    
// @version      1.0
// @description  Youtube
// @author       
// @match        *://*/youtubeviews
// @downloadURL 
// @updateURL 
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const minhaJanela = "janela";
    var contador = 0;
    var url = prompt("Informe a url do vídeo: ");
    var duration = url && prompt("Informe a duração do vídeo: ");
    var times = url && duration && parseInt(prompt("Quantidade de vizualização:"));
    if (url && duration && times) {

        window.open(url, minhaJanela, "height=50,width=50");
        var interval = setInterval(function () {
            window.open(url, minhaJanela, "height=50,width=50");
            contador++;
            console.log("Abriu " + contador + " vezes...");
            if (contador == times)
                clearInterval(interval);

        }, duration);
    }

})()