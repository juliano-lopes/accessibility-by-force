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
* O número de telefone dos contatos não salvos serão substituídos por "Mensagem de" nas conversas em grupo para facilitar a leitura das mensagens;
* As mensagens com imagem ou vídeo serão anunciadas.

#### Teclas de atalho
Depois de ativar o WhatsappWebWithMoreAccessibility, as seguintes teclas de atalho estarão disponíveis:

* ALT + a: coloca o foco nas opções para escolher o tipo de anexo a ser enviado na conversa ativa;
* ALT + B: coloca o foco no campo de busca e o rotula como "Buscar nas conversas e nos contatos...";
* ALT + C: coloca o foco na lista de conversas;
* ALT + D: Coloca o foco na janela que contém os botões para favoritar, deletar, encaminhar ou baixar uma mensagem.
* ALT + E: coloca o foco no campo de escrita de mensagem e o rotula como "Escreva uma mensagem (nome da conversa ativa)";
* ALT + G: coloca o foco na caixa de diálogo  que contém o botão para iniciar a mensagem de voz;
* ALT + L: abre uma caixa de opções para selecionar o idioma do script (Português, Inglês ou Espanhol), após precionar a tecla 'enter' na opção desejada as mensagens do script passam a estar naquele idioma;
* ALT + N: abre uma caixa de texto para ser inserido um número de telefone. Ao teclar 'enter', caso seja um número válido, o chat com esse número será iniciado. Um número válido deve conter: código do país (Brasil = 55), código da cidade (Belo Horizonte 31) e o número propriamente dito;
* ALT + M: coloca o foco na lista de mensagens da conversa ativa;
* ALT + S: ativa e desativa o script;
* ALT + T: fala o título da conversa ativa;
* ALT + V: envia as mensagens que foram selecionadas para serem encaminhadas.

OBS.: as vezes o NVDA não entra em modo de foco automaticamente ao utilizar os atalhos, Então talvez seja necessário colocá-lo em modo de foco com o atalho NVDA + barra de espaço. Outras teclas podem ser configuradas como tecla NVDA, mas por padrão é o 'Insert'.

#### Passos para Favoritar, deletar, encaminhar ou baixar mensagens:

A janela que o atalho ALT + D se refere, só será exibida depois que os seguintes passos forem realizados:
1. Utilizar o atalho ALT + M para ir para lista de mensagens;
2. Se certificar de que o NVDA está no modo de foco (no Jaws é o cursor virtual desativado);
3. Ao chegar sobre a mensagem que deseja encaminhar, apertar seta para direita;
4. Clicar no botão encaminhar. Assim será aberta a janela com as opções.

Se nessa janela você escolher realmente encaminhar, então ao clicar o foco irá para uma lista para você selecionar o contato para o qual deseja encaminhar aquela mensagem. Escolha o contato utilizando a seta para baixo ou para cima e precionando 'enter'.
Caso deseje escolher mais contatos, caminhe com setas novamente e aperte 'enter' no outro contato.
Quando quiser enviar, utilize o atalho ALT + V.
Dessa forma, somente aquela mensagem será encaminhada.
Para selecionar mais mensagens, depois que a janela com as opções for aberta, não clique no botão 'encaminhar'.
Utilize o atalho ALT + M para retornar à lista de mensagens, e utilize a 'barra de espaço' para selecionar outras mensagens.
Depois de selecioná-las, utilize o atalho ALT + D para retornar para a janela com as opções, clique no botão 'encaminhar' e selecione os contatos e depois envie com ALT + V.
Caso não queira encaminhar, você pode clicar nos outros botões:
* Se clicar em 'favoritar' aquelas mensagens ficarão como favoritas;
* caso clique em 'deletar' outra janela entrará em foco, então você confirma se deseja realmente deletar ou cancelar;
* ou se clicar em 'baixar' o download será realizado. Caso mais de uma mensagem esteja selecionada, o arquivo baixado estará no formato.zip, que você pode utilizar programas como WINRAR ou WINZIP para descompactá-lo.

### Contato

Qualquer contribuição que queira realizar pode ser feita por meio do endereço julopeson@gmail.com

### accessibility-by-force
Scripts to put better accessibility and usability on some WEB pages.

### Available scripts:
* [WhatsappWeb With More Accessibility](https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.user.js)

To use the scripts, it is necessary to have the extension [Tampermonkey for Google Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
installed or [Tampermonkey for Mozilla Firefox](https://addons.mozilla.org/pt-BR/firefox/addon/tampermonkey/).
After that, just access the script, which will be recognized by Tampermonkey, and click on install.

### WhatsappWebWithMoreAccessibility

After installing the script for Whatsapp Web (WhatsappWebWithMoreAccessibility), when accessing the app, you must wait for the application to load and then use the shortcut ALT + S.
If the script is deactivated, the message: "Script activated successfully" will be displayed; if the script is already activated, an alert will be given with the message "Script disabled".
When you deactivate it, all elements and shortcuts created by it will be removed, except the activation and deactivation shortcut.

#### Added elements and labels
With WhatsappWebWithMoreAccessibility enabled, the following modifications will be applied:

* Before the panel with the chat list there will be a level 1 header (H1) to facilitate navigation via the screen reader, by pressing the 'h' key or the number '1' in the navigation mode;
* After opening a chat, at the beginning of the contact / group area there will be a level 2 (H2) header, with the label "Active chat + <CONTACT / GROUP NAME>", which can be accessed by pressing the 'h' key or number 2 in browse mode;
* The emogi buttons will be labeled above the message writing field in the footer;
* After the message writing field, there will be a button with the label "Record voice message" if the text field is clear, or "Send text message" if it is filled;
* When you click on the "Record Voice Message" button, a "Cancel recording" button, the recording time and another button with the label "Send voice message" will appear below the message field;
* The phone number of unsaved contacts will be replaced by "Message from" in group conversations to make it easier to read the messages;
* Messages with image or video will be announced.

#### Hotkeys
After enabling WhatsappWebWithMoreAccessibility, the following shortcut keys are available:

* ALT + a: focus on the options for choosing the type of attachment to be sent in the active chat;
* ALT + B: focus on the search field and label it as "Search chat and contacts ...";
* ALT + C: focus on the chat list;
* ALT + D: Place the focus on the window that contains the buttons to bookmark, delete, forward or download a message.
* ALT + E: puts the focus on the message writing field and labels it "Write a message (name of the active chat)";
* ALT + G: focus on the dialog box that contains the button to start the voice message;
* ALT + L: opens an options box to select the language of the script (Portuguese, English or Spanish), after pressing the 'enter' key in the desired option, the script messages will be in that language;
* ALT + N: opens a text box for entering a phone number. By pressing 'enter', if it is a valid number, the chat with that number will start. A valid number must contain: country code (Brazil = 55), city code (Belo Horizonte 31) and the number itself;
* ALT + M: puts the focus on the message list of the active chat;
* ALT + S: activate and deactivate the script;
* ALT + T: speak the title of the active chat;
* ALT + V: sends the messages that have been selected to be forwarded.

NOTE: sometimes NVDA does not go into focus mode automatically when using shortcuts, so you may need to put it in focus mode with the shortcut NVDA + space bar. Other keys can be configured as the NVDA key, but by default it is 'Insert'.

#### Steps to Favorite, delete, forward or download messages:

The window that the ALT + D shortcut refers to will only be displayed after the following steps are taken:
1. Use the ALT + M shortcut to go to the message list;
2. Make sure that NVDA is in focus mode (in Jaws, the virtual cursor is disabled);
3. When you reach the message you want to forward, press the right arrow;
4. Click the forward button. This will open the window with the options.

If in this window you choose to actually forward, then when you click the focus will go to a list for you to select the contact to whom you want to forward that message. Choose the contact using the down or up arrow and pressing 'enter'.
If you want to choose more contacts, walk with arrows again and press 'enter' on the other contact.
When you want to send, use the ALT + V shortcut.
That way, only that message will be forwarded.
To select more messages, after the options window opens, do not click on the 'forward' button.
Use the ALT + M shortcut to return to the message list, and use the 'space bar' to select other messages.
After selecting them, use the ALT + D shortcut to return to the options window, click on the 'forward' button and select the contacts and then send with ALT + V.
If you don't want to forward, you can click on the other buttons:
* If you click on 'favorite' those messages will become favorites;
* if you click on 'delete' another window will come into focus, then you confirm if you really want to delete or cancel;
* or if you click 'download' the download will be performed. If more than one message is selected, the downloaded file will be in the .zip format, which you can use programs like WINRAR or WINZIP to unzip it.

### Contact

Any contribution you want to make can be made through julopeson@gmail.com

### accessibility-by-force
Scripts para mejorar la accesibilidad y usabilidad de algunas páginas WEB.

### Scripts disponibles:
* [WhatsappWeb con más accesibilidad](https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.user.js)

Para utilizar los scripts, es necesario tener instalada la extensión [Tampermonkey para Google Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
o [Tampermonkey para Mozilla Firefox](https://addons.mozilla.org/pt-BR/firefox/addon/tampermonkey/).
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
* El número de teléfono de los contactos no guardados será reemplazado por "Mensaje de" en las conversaciones grupales para que sea más fácil leer los mensajes;
* Se anunciarán mensajes con imagen o video.
#### Teclas de acceso rápido
Después de habilitar WhatsappWebWithMoreAccessibility, están disponibles las siguientes teclas de acceso directo:

* ALT + a: centrarse en las opciones para elegir el tipo de archivo adjunto que se enviará en la conversación activa;
* ALT + B: centrarse en el campo de búsqueda y etiquetarlo como "Buscar conversaciones y contactos ...";
* ALT + C: centrarse en la lista de conversaciones;
* ALT + D: coloca el foco en la ventana que contiene los botones para marcar, borrar, reenviar o descargar un mensaje.
* ALT + E: pone el foco en el campo de escritura del mensaje y lo etiqueta "Escribe un mensaje (nombre de la conversación activa)";
* ALT + G: enfoque en el cuadro de diálogo que contiene el botón para iniciar el mensaje de voz;
* ALT + L: abre un cuadro de opciones para seleccionar el idioma del guión (portugués, inglés o español), luego de presionar la tecla 'enter' en la opción deseada, los mensajes del guión estarán en ese idioma;
* ALT + N: abre un cuadro de texto para ingresar un número de teléfono. Pulsando 'enter', si es un número válido, se iniciará el chat con ese número. Un número válido debe contener: código de país (Brasil = 55), código de ciudad (Belo Horizonte 31) y el número en sí;
* ALT + M: pone el foco en la lista de mensajes de la conversación activa;
* ALT + S: activar y desactivar el script;
* ALT + T: dice el título de la conversación activa;
* ALT + V: envía los mensajes que se han seleccionado para ser reenviados.

NOTA: a veces NVDA no entra en modo de enfoque automáticamente cuando se utilizan atajos, por lo que es posible que debas ponerlo en modo de enfoque con el atajo NVDA + barra espaciadora. Se pueden configurar otras claves como la clave de NVDA, pero por defecto es 'Insertar'.

#### Pasos para marcar como favorito, eliminar, reenviar o descargar mensajes:

La ventana a la que se refiere el atajo ALT + D solo se mostrará después de que se sigan los siguientes pasos:
1. Use el atajo ALT + M para ir a la lista de mensajes;
2. Asegúrate de que NVDA esté en modo de enfoque (en Jaws, el cursor virtual está desactivado);
3. Cuando llegue al mensaje que desea reenviar, presione la flecha derecha;
4. Haga clic en el botón de avance. Esto abrirá la ventana con las opciones.

Si en esta ventana elige reenviar realmente, cuando haga clic en el foco, irá a una lista para que seleccione el contacto al que desea reenviar ese mensaje. Elija el contacto usando la flecha hacia abajo o hacia arriba y presionando 'enter'
Si desea elegir más contactos, camine con flechas nuevamente y presione 'enter' en el otro contacto.
Cuando desee enviar, use el atajo ALT + V.
De esa forma, solo se reenviará ese mensaje.
Para seleccionar más mensajes, después de que se abra la ventana de opciones, no haga clic en el botón "Reenviar".
Use el atajo ALT + M para regresar a la lista de mensajes y use la 'barra espaciadora' para seleccionar otros mensajes.
Después de seleccionarlos, use el atajo ALT + D para regresar a la ventana de opciones, haga clic en el botón 'adelante' y seleccione los contactos y luego envíe con ALT + V.
Si no desea reenviar, puede hacer clic en los otros botones:
* Si hace clic en "favorito", esos mensajes se convertirán en favoritos;
* si hace clic en 'eliminar', otra ventana se activará, luego confirme si realmente desea eliminar o cancelar;
* o si hace clic en 'descargar' se realizará la descarga. Si se selecciona más de un mensaje, el archivo descargado estará en formato .zip, que puede usar programas como WINRAR o WINZIP para descomprimirlo.

### Contacto

Cualquier aportación que quieras realizar la puedes realizar a través de julopeson@gmail.com

### accessibility-by-force
Скрипты для улучшения доступности и удобства использования некоторых веб-страниц.

### Доступные скрипты:
* [WhatsappWeb With More Accessibility](https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.user.js)

Чтобы использовать скрипты, необходимо установить расширение [Tampermonkey для Google Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ru)
или [Tampermonkey для Mozilla Firefox](https://addons.mozilla.org/ru-RU/firefox/addon/tampermonkey/).
После этого просто откройте скрипт, который будет распознан Tampermonkey, и нажмите кнопку Установить.

### WhatsappWebWithMoreAccessibility

После установки скрипта для Whatsapp Web (WhatsappWebWithMoreAccessibility), при доступе к приложению, вы должны дождаться загрузки приложения, а затем использовать сочетание клавиш ALT + S.
Если скрипт отключен, то будет выведено сообщение: "скрипт успешно активирован"; если скрипт уже активирован, то будет выдано предупреждение с сообщением "скрипт отключен".
Когда вы отключаете его, все элементы и сочетания клавиш, созданные им, будут удалены, кроме клавиш активации и деактивации.

#### Добавлены элементы и метки
При включенной функции WhatsappWebWithMoreAccessibility будут применены следующие изменения:

* Перед панелью со списком чатов будет заголовок уровня 1 (H1) для облегчения навигации с помощью программы чтения с экрана, нажав клавишу "h" или цифру "1" в режиме навигации;
* После открытия чата в начале области контакта / группы появится заголовок уровня 2 (H2) с надписью " активный чат + <имя контакта / группы>", доступ к которому можно получить, нажав клавишу "h" или цифру 2 в режиме просмотра;
* Кнопки emogi будут помечены над полем записи сообщения в нижнем колонтитуле;
* После поля написать сообщение появится кнопка с надписью "записать голосовое сообщение", если текстовое поле очищено или "отправить текстовое сообщение", если оно заполнено;
* При нажатии на кнопку "записать голосовое сообщение" под полем сообщения появится кнопка" Отменить запись", время записи и еще одна кнопка с надписью" отправить голосовое сообщение".;
* Номер телефона несохраненных контактов в групповых разговорах будет заменен на "сообщение от", чтобы облегчить чтение сообщений;
* Будут объявляться сообщения с видео.

#### Горячие клавиши
После включения WhatsappWebWithMoreAccessibility будут доступны следующие клавиши:

* ALT + a: сфокусироваться на вариантах выбора типа вложения, которое будет отправлено в активный чат;
* ALT + B: Сфокусироваться на поле поиска и пометить его как "поиск чатов и контактов ...";
* ALT + C: Сфокусироваться на списке чатов;
* ALT + D: Поместить фокус на   окно, содержащее кнопки: В избранное, Удалить, Переслать или Загрузить сообщение.
* ALT + E: помещает фокус на поле написать сообщения и помечает его надписью " Написать сообщение (имя активного чата)";
* ALT + G: сфокусироваться на диалоговом окне, содержащем кнопку для записи голосового сообщения;
* ALT + L: открывает окно параметров для выбора языка скрипта (португальский, английский, испанский или русский), после нажатия клавиши "enter" в нужном варианте, сообщения скрипта будут на этом языке;
* ALT + N: открывает текстовое поле для ввода номера телефона. При нажатии кнопки "enter", если это действительный номер, начнется чат с этим номером. Действительный номер должен содержать: код страны (Россия = 7), код оператора  и сам номер;
* ALT + M: помещает фокус на список сообщений активного чата;
* ALT + S: Включить или отключить этот скрипт;
* ALT + T: произнести название активного чата;
* ALT + V: отправляет сообщения, которые были выбраны для пересылки.

Примечание: иногда NVDA не переходит в режим редактирования автоматически при использовании клавиш, поэтому вам может потребоваться перевести его в режим редактирования с помощью сочетания NVDA + пробел. Другие клавиши могут быть сконфигурированы как модификатор NVDA, но по умолчанию это "Insert".

#### Шаги по добавления в избранное, удалению, пересылке или загрузке сообщений:

Окно, на которое ссылается сочетание ALT + D, будет отображаться только после выполнения следующих действий:
1. Используйте сочетание клавиш ALT + M, чтобы перейти к списку сообщений;
2. Убедитесь, что NVDA находится в режиме редактирования (в Jaws виртуальный курсор отключен);
3. Когда Вы дойдете до сообщения, которое хотите переслать, нажмите стрелку вправо;
4. Нажмите кнопку Переслать. При этом откроется окно с опциями.

Если в этом окне вы выберете фактическую пересылку, то  появится список, в котором вы сможете выбрать контакт, которому вы хотите переслать это сообщение. Выберите контакт, используя стрелку вниз или вверх, и нажмите Enter.
Если вы хотите выбрать больше контактов, снова выберете стрелками и нажмите «Enter» на другом контакте.
Если вы хотите отправить, используйте сочетание клавиш ALT + V.
Таким образом будет переслано только это сообщение.
Чтобы выбрать больше сообщений, после открытия окна опций не нажимайте кнопку «переслать».
Используйте сочетание клавиш ALT + M, чтобы вернуться к списку сообщений, и используйте «пробел» для выбора других сообщений.
Выбрав их, используйте сочетание клавиш ALT + D, чтобы вернуться в окно параметров, нажмите кнопку «Переслать» и выберите контакты, а затем отправьте их с помощью ALT + V.
Если вы не хотите пересылать, вы можете нажать на другие кнопки:
* Если вы нажмете на кнопку "избранное" , эти сообщения станут избранными;
* если вы нажмете на кнопку "Удалить", в фокусе появится другое окно, где вы можете подтвердить, действительно ли хотите удалить или отменить;
* или если вы нажмете кнопку "Загрузить", то будет выполнена скачивание. Если выбрано несколько сообщений, загруженный файл будет иметь формат. zip, который вы можете распаковать с помощью таких программ, как WINRAR или WINZIP.

### Contact

Any contribution you want to make can be made through julopeson@gmail.com
Перевод на русский (Translation into Russian): @alekssamos
Новость на русскоязычном специальном сайте (News on the Russian-language special website):
http://www.tiflocomp.ru/news/1682