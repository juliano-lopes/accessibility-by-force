# accessibility-by-force
Scripts to put a better accessibility on some web pages

# Scripts disponíveis: 
# WhatsappWebWithMoreAccessibility.user.js https://github.com/juliano-lopes/accessibility-by-force/raw/master/src/js/WhatsappWebWithMoreAccessibility.user.js

Para utilização dos scripts, é necessário ter instalada a extensção Tampermonkey, que pode ser instalada pela Chrome Webstore.
Após isso, basta acessar o script, que será reconhecido pelo Tampermonkey, e clicar em instalar.

#WhatsappWebWithMoreAccessibility

Depois de instalar o script para o Whatsapp Web, ao acessar o app, haverá um botão no topo da tela "Ativar script de acessibilidade". Deve-se aguardar o carregamento do sistema e então clicar no botão, que exibirá uma mensagem de script ativado e o botão mudará o texto para "Desativar script de acessibilidade", que executará a desativação do script, realizando a remoção dos elementos criados por ele.
Com o script ativado serão acrescentadas as seguintes modificações:
* Antes do painel com a listagem de conversas haverá um cabeçalho de nível 2 (H2) para facilitar a navegação via screen reader, ao precionar a tecla 'h' ou o número '2';
* abaixo do campo de busca haverá um botão "Procurar", que ao ser clicado irá inserir um cabeçalho de nível 3 nos resultados da procura, que poderão ser acessados precionando a tecla 'h' ou o número 3;
* Acima do campo de busca o botão para limpar o campo estará com o rótudo de "Limpar e voltar para busca";
* Após abrir uma conversa, no início da área do contato / grupo haverá um cabeçalho de nível 3(H3), com o rótulo "Conversa ativa + <NOME DO CONTATO/GRUPO>", que poderá ser acessado precionando a tecla 'h' ou o número 3;
* Antes de cada mensagem enviada haverá um cabeçalho de nível 4 (H4), que poderá ser acessado precionando a tecla 'h' ou o número 4;
* Antes de cada mensagem recebida haverá um cabeçalho de nível 4 (H4), que poderá ser acessado precionando a tecla 'h' ou o número 4;
* O botão para reproduzir as mensagens de áudio estará com o rótulo "Play";
* Os botões de emogi estarão etiquetados acima do campo de escrita de mensagem no rodapé;
* Após o campo de escrita de mensagem haverá um botão que estará com o rótulo "Gravar" caso o campo de texto esteja limpo, ou "enviar" caso esteja preenchido;
* Ao clicar no botão "Gravar", irá surgir abaixo do campo de mensagem um botão "Cancelar gravação", o tempo da gravação e um outro botão com o rótulo "Enviar";
* Ao clicar no botão "Anexar", surgirão 4 outros botões com os rótulos: "Fotos e Vídeos", "Câmera", "Documentos" e "Contato". Ao clicar no botão "Documentos", por exemplo, será possível  selecionar um arquivo no computador e carregá-lo. Após a seleção do arquivo, haverá 3 botões: "Cancelar envio do arquivo", "Adicionar arquivo" e "Enviar".

#Outras dicas de navegação com o screen reader NVDA:

Para navegar pela lista de conversas, ao precionar o número 2 ou shift+2, o cabeçalho "Painel principal" receberá o foco de navegação. Logo abaixo, ao caminhar com cetas, estará os contatos e grupos, que para ser acessado é preciso ir para o modo de foto precionando NVDA + Barra de espaço e então continuar navegando com cetas cima / baixo.
Para realizar uma busca, é preciso ir até o campo de edição precionando a tecla "e" ou "shift + e" e passar para o modo de foco com NVDA + Barra de espaço. A edição pode ser prejudicada caso seja precionada somente a tecla enter.
Obs.: depois de abrir uma conversa, a navegação fica prejudicada, pois o foco sempre é puxado para o campo de edição de mensagem. Por isso é necessária a navegação via cabeçalhos precionando 'h', ou o número de seus níveis (1, 2, 3 ou 4, 5, ou 6).


# Contato

Qualquer contribuição que queira realizar pode ser feita por meio do endereço julopeson@gmail.com










