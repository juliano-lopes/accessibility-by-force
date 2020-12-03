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
* ALT + M: coloca o foco na lista de mensagens da conversa ativa;
* ALT + S: ativa e desativa o script;
* ALT + T: fala o título da conversa ativa.

OBS.: as vezes o NVDA não entra em modo de foco automaticamente ao utilizar os atalhos, Então talvez seja necessário colocá-lo em modo de foco com o atalho NVDA + barra de espaço. Outras teclas podem ser configuradas como tecla NVDA, mas por padrão é o 'Insert'.

### Contato

Qualquer contribuição que queira realizar pode ser feita por meio do endereço julopeson@gmail.com
