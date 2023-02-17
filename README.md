# Lista de Tarefas (TO DO List)
Lista de Tarefas usando javascript puro

Projeto TO DO LIST feito em javascript puro usando os conceitos de:
    1. Organização de código.
    2. This
    3. JSON
    4. Armazenamento local no navegador


Observações:
- 'this' é uma palavra-chave de referência que se refere ao objeto sendo atualmente executado, OBS: se for usado fora de qualquer objeto ou dentro de funções callback vai se referir ao objeto pai de todos, window
- JSON é capaz de transformar um objeto em string e também um string em objeto!

Considerações:
Este projeto foi um pouco desafiador para mim a principio, principalmente quando se tratou da implementação do armazenamento local por conta toda essa questão de usar JSON, modificar e lançar no armazenamento loca, mas reescrevendo o código, comentando ele e lendo outras fontes me ajudaram bastante no entendimento do mesmo.


    -- Primeiros passos --

    ITEM 01 - Objeto main
    ITEM 03 - Função init
    ITEM 04 - Função cacheSelectors
    ITEM 05 - Função bindEvents
    ITEM 13 - Chamada de função depois do objeto main (main.init())
    ITEM 09 - Events
    ITEM 10 - Events.checkButton_click
    ITEM 11 - Event.inputTask_keypress
    ITEM 12 - Events.removeButton_click

    -- Adição LocalStorage --

    ITEM 11 - Event.inputTask_keypress - Adicionado ao envio para a lista de tarefas um método para também enviar a tarefa para o Armazenamento local do navegador
    ITEM 02 - Array 'tasks'
    ITEM 06 - getStoraged
    ITEM 08 - buildTasks
    ITEM 3.2 - Funções getStoraged e buildTasks chamadas no ITEM 3.
    ITEM 11 - Event.inputTask_keypress - Adicionado verificação para ver as tarefas salvas
    ITEM 12 - Events.removeButton_click - Adicionado método de remover do armazenamento local uma tarefa excluída
    ITEM 07 - getTasksHTML
    ITEM 10 - Events.checkButton_click - Adicionado métedo para modificar o estado de um parâmetro no armazenamento local caso a tarefa tenha sido concluída.
    ITEM 08 - buildTaks - Adicionado método para verificar o parâmetro da tarefa e inicializar a mesma já com a classe de css. 
    
    
## Todos os itens númerados estão presentes no código fonte de javaScript
### Resumo no notion explicando como fiz: https://samuelcolares.notion.site/To-do-list-bbee42dafbc04dd58ec54fb31dad46f5
