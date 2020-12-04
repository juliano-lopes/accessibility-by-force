### accessibility-by-force
Scripts para colocar melhor acessibilidade e usabilidade em algumas páginas WEB.

### Scripts disponíveis: 
* [WhatsappWeb With More Accessibility](https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.user.js)

Para utilização dos scripts, é necessário ter instalada a extensção [Tampermonkey para o Google Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=pt-BR) ou [Tampermonkey para Mozilla Firefox](https://addons.mozilla.org/pt-BR/firefox/addon/tampermonkey/).
Após isso, basta acessar o script, que será reconhecido pelo Tampermonkey, e clicar em instalar.

### WhatsappWebWithMoreAccessibility

Depois de instalar o script para o Whatsapp Web (WhatsappWebWithMoreAccessibility), ao acessar o app,  Deve-se aguardar o carregamento da aplicação e então utilizar o atalho ALT + S.
Caso o script esteja desativado, será exibida a mmensagem:  "Script ativado com sucesso"; se o script já estiver ativado, será dado um alerta com a mensagem "Script desativado".
Ao desativá-lo, todos os elementos e atalhos criados por ele serão removidos, exceto o atalho de ativação e desativação.

#### Elementos e rótulos adicionados
Com o WhatsappWebWithMoreAccessibility ativado, serão aplicadas as seguintes modificações:

* Antes do painel com a listagem de conversas haverá um cabeçalho de nível 1 (H1) para facilitar a navegação via screen reader, ao precionar a tecla 'h' ou o número '1' no modo de navegação;
* Após abrir uma conversa, no início da área do contato / grupo haverá um cabeçalho de nível 2(H2), com o rótulo "Conversa ativa + <NOME DO CONTATO/GRUPO>", que poderá ser acessado precionando a tecla 'h' ou o número 2 no modo de navegação;
* Os botões de emogi estarão etiquetados acima do campo de escrita de mensagem no rodapé;
* Após o campo de escrita de mensagem haverá um botão que estará com o rótulo "Gravar mensagem de voz" caso o campo de texto esteja limpo, ou "Enviar mensagem de texto" caso esteja preenchido;
* Ao clicar no botão "Gravar Mensagem de Voz", irá surgir abaixo do campo de mensagem um botão "Cancelar gravação", o tempo da gravação e um outro botão com o rótulo "Enviar mensagem de voz";

#### Teclas de atalho
Depois de ativar o WhatsappWebWithMoreAccessibility, as seguintes teclas de atalho estarão disponíveis:

* ALT + a: coloca o foco nas opções para escolher o tipo de anexo a ser enviado na conversa ativa;
* ALT + B: coloca o foco no campo de busca e o rotula como "Buscar nas conversas e nos contatos...";
* ALT + C: coloca o foco na lista de conversas;
* ALT + E: coloca o foco no campo de escrita de mensagem e o rotula como "Escreva uma mensagem (nome da conversa ativa)";
* ALT + L: abre uma caixa de opções para selecionar o idioma do script (Português, Inglês ou Espanhol), após precionar a tecla 'enter' na opção desejada as mensagens do script passam a estar naquele idioma;
* ALT + M: coloca o foco na lista de mensagens da conversa ativa;
* ALT + S: ativa e desativa o script;
* ALT + T: fala o título da conversa ativa.

OBS.: as vezes o NVDA não entra em modo de foco automaticamente ao utilizar os atalhos, Então talvez seja necessário colocá-lo em modo de foco com o atalho NVDA + barra de espaço. Outras teclas podem ser configuradas como tecla NVDA, mas por padrão é o 'Insert'.

### Contato

Qualquer contribuição que queira realizar pode ser feita por meio do endereço julopeson@gmail.com

### accessibility-by-force
Scripts to put better accessibility and usability on some WEB pages.

### Available scripts:
* [WhatsappWeb With More Accessibility] (https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.user.js)

To use the scripts, it is necessary to have the extension [Tampermonkey for Google Chrome] installed (https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) or [Tampermonkey for Mozilla Firefox] (https://addons.mozilla.org/pt-BR/firefox/addon/tampermonkey/).
After that, just access the script, which will be recognized by Tampermonkey, and click on install.

### WhatsappWebWithMoreAccessibility

After installing the script for Whatsapp Web (WhatsappWebWithMoreAccessibility), when accessing the app, you must wait for the application to load and then use the shortcut ALT + S.
If the script is deactivated, the message: "Script activated successfully" will be displayed; if the script is already activated, an alert will be given with the message "Script disabled".
When you deactivate it, all elements and shortcuts created by it will be removed, except the activation and deactivation shortcut.

#### Added elements and labels
With WhatsappWebWithMoreAccessibility enabled, the following modifications will be applied:

* Before the panel with the conversation list there will be a level 1 header (H1) to facilitate navigation via the screen reader, by pressing the 'h' key or the number '1' in the navigation mode;
* After opening a conversation, at the beginning of the contact / group area there will be a level 2 (H2) header, with the label "Active conversation + <CONTACT / GROUP NAME>", which can be accessed by pressing the 'h' key or number 2 in navigation mode;
* The emogi buttons will be labeled above the message writing field in the footer;
* After the message writing field, there will be a button with the label "Record voice message" if the text field is clear, or "Send text message" if it is filled;
* When you click on the "Record Voice Message" button, a "Cancel recording" button, the recording time and another button with the label "Send voice message" will appear below the message field;

#### Hotkeys
After enabling WhatsappWebWithMoreAccessibility, the following shortcut keys are available:

* ALT + a: focus on the options for choosing the type of attachment to be sent in the active conversation;
* ALT + B: focus on the search field and label it as "Search conversations and contacts ...";
* ALT + C: focus on the conversation list;
* ALT + E: puts the focus on the message writing field and labels it "Write a message (name of the active conversation)";
* ALT + L: opens an options box to select the language of the script (Portuguese, English or Spanish), after pressing the 'enter' key in the desired option, the script messages will be in that language;
* ALT + M: puts the focus on the message list of the active conversation;
* ALT + S: activate and deactivate the script;
* ALT + T: speak the title of the active conversation.

NOTE: sometimes NVDA does not go into focus mode automatically when using shortcuts, so you may need to put it in focus mode with the shortcut NVDA + space bar. Other keys can be configured as the NVDA key, but by default it is 'Insert'.

### Contact

Any contribution you want to make can be made through julopeson@gmail.com

### accessibility-by-force
Scripts para mejorar la accesibilidad y usabilidad de algunas páginas WEB.

### Scripts disponibles:
* [WhatsappWeb con más accesibilidad] (https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.user.js)

Para utilizar los scripts, es necesario tener instalada la extensión [Tampermonkey para Google Chrome] (https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) o [Tampermonkey para Mozilla Firefox] (https://addons.mozilla.org/pt-BR/firefox/addon/tampermonkey/).
Después de eso, simplemente acceda al script, que será reconocido por Tampermonkey, y haga clic en instalar.

### WhatsappWebWithMoreAccessibility

Luego de instalar el script para Whatsapp Web (WhatsappWebWithMoreAccessibility), al acceder a la aplicación, debe esperar a que se cargue la aplicación y luego usar el atajo ALT + S.
Si el script está desactivado, aparecerá el mensaje: "Script activado correctamente"; si el script ya está activado, se dará una alerta con el mensaje "Script desactivado".
Al desactivarlo, se eliminarán todos los elementos y accesos directos creados por él, excepto el acceso directo de activación y desactivación.

#### Elementos y etiquetas agregados
Con WhatsappWebWithMoreAccessibility habilitado, se aplicarán las siguientes modificaciones:

* Antes del panel con la lista de conversaciones habrá un encabezado de nivel 1 (H1) para facilitar la navegación a través del lector de pantalla, presionando la tecla 'h' o el número '1' en el modo de navegación;
* Después de abrir una conversación, al inicio del área de contacto / grupo habrá un encabezado de nivel 2 (H2), con la etiqueta "Conversación activa + <NOMBRE DEL CONTACTO / GRUPO>", al que se puede acceder presionando la tecla 'h' o el número 2 en modo navegación;
* Los botones emogi estarán etiquetados sobre el campo de escritura del mensaje en el pie de página;
* Después del campo de escritura del mensaje, habrá un botón con la etiqueta "Grabar mensaje de voz" si el campo de texto está limpio, o "Enviar mensaje de texto" si está lleno;
* Al hacer clic en el botón "Grabar mensaje de voz", aparecerá un botón "Cancelar grabación", el tiempo de grabación y otro botón con la etiqueta "Enviar mensaje de voz" debajo del campo del mensaje;

#### Teclas de acceso rápido
Después de habilitar WhatsappWebWithMoreAccessibility, están disponibles las siguientes teclas de acceso directo:

* ALT + a: centrarse en las opciones para elegir el tipo de archivo adjunto que se enviará en la conversación activa;
* ALT + B: centrarse en el campo de búsqueda y etiquetarlo como "Buscar conversaciones y contactos ...";
* ALT + C: centrarse en la lista de conversaciones;
* ALT + E: pone el foco en el campo de escritura del mensaje y lo etiqueta "Escribe un mensaje (nombre de la conversación activa)";
* ALT + L: abre un cuadro de opciones para seleccionar el idioma del guión (portugués, inglés o español), luego de presionar la tecla 'enter' en la opción deseada, los mensajes del guión estarán en ese idioma;
* ALT + M: pone el foco en la lista de mensajes de la conversación activa;
* ALT + S: activar y desactivar el script;
* ALT + T: dice el título de la conversación activa.

NOTA: a veces NVDA no entra en modo de enfoque automáticamente cuando se utilizan atajos, por lo que es posible que debas ponerlo en modo de enfoque con el atajo NVDA + barra espaciadora. Se pueden configurar otras claves como la clave de NVDA, pero por defecto es 'Insertar'.

### Contacto

Cualquier aportación que quieras realizar la puedes realizar a través de julopeson@gmail.com