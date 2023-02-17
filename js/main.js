/*
    Projeto TO DO LIST feito em javascript puro usando os conceitos de:
    1. Organização de código.
    2. This
    3. JSON
    4. Armazenamento local no navegador
*/

/*
    Considerações:
    'this' é uma palavra-chave de referência que se refere ao objeto sendo atualmente executado, OBS: se for usado fora de qualquer objeto ou dentro de funções callback vai se referir ao objeto pai de todos, window
    JSON é capaz de transformar um objeto em string e também um string em objeto!
*/

/*
    Ordem de criação do código:

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
*/

// 1. Objeto main para armazenar todo o código
const main = {

    // 2. array chamada 'tasks' para armazenar o localStorage com JSON (em breve na função getStoraged)
    tasks: [],

    // 3. Função inicial para iniciar todas as outras funções principais
    init: function () {

        // 3.1 A primeira função a ser invocada precisa ser a função que lê o HTML  
        this.cacheSelectors()
        this.bindEvents()

        // 3.2 as funções que compõe o funcionamento do localStoraged precisam ser aplicadas por útlimo
        this.getStoraged()
        this.buildTasks()
    },

    // 4. Função para invocar todos os elementos do HTML e transformar eles em variáveis de JavaScript
    cacheSelectors: function () {
        this.$list = document.querySelector('.list')
        this.$checkButtons = document.querySelectorAll('.check')
        this.$removeButtons = document.querySelectorAll('.remove')
        this.$inputTask = document.querySelector('#inputTask')
        this.$toast = document.querySelector('.toast')
        this.$listItem = document.querySelector('.list-item')
    },

    // 5. Função para invocar outras funções que apenas acontecem com interação do usuário
    bindEvents: function () {

        //5.1 Sempre que um elemento do HTML seja mais de uma unidade o uso do forEach é necessário
        this.$checkButtons.forEach(checkmark => {
            checkmark.onclick = this.Events.checkButton_click
        })

        // 5.2 Nesse caso não é necessário o uso de forEeach por existir apenas um input de envio de dados
        this.$inputTask.onkeypress = this.Events.inputTask_keypress.bind(this)

        this.$removeButtons.forEach((remove) => {
            remove.onclick = this.Events.removeButton_click
        })
    },

    // 6. Função para armazenar os dados enviados para a TO DO List na array mostrada no ITEM 2
    getStoraged: function () {

        // 6.1 Variável para pegar e armazenar os dados (em string) que estão no armazenamento local (localStorage)
        const tasksLocalStorage = localStorage.getItem('tasks');

        // 6.2 Aplicando um JSON.parse para transformar em objetos e atribuindo para a Array 'tasks'
        this.tasks = JSON.parse(tasksLocalStorage)
    },

    // 7. Função para reaproveitar código com dois parâmetros, um para o texto de output e outro para classe
    getTaskHTML: function (taskContent, check) {
        return `
        <li class="${check}">
            <div class="check"></div>
            <label for="" class="task">${taskContent}</label>
            <button class="remove" data-task="${taskContent}"></button>
        </li>`
    },

    // 8. Função para montar as tarefas salvas no ITEM 6 quando o usuário recarregar a página
    buildTasks: function () {

        // 8.1 Definindo a variável que vai receber as tarefas, por isso uma string vazia
        let html = '';

        // 8.2 Verificação para saber se possui algo dentro da array, caso não, a função é encerrada, nesse caso é optativo, caso nao inclua esse 'if' só faz diferença quando o usuário entra pela primeira vez no site um erro é emitido no console, mas nenhuma funcionalidade é afetada.
        if (!this.tasks) {
            return
        }
        // 8.3 forEach para percorrer a array de objetos, mesmo que só possua um item.
        this.tasks.forEach(item => {
            // 8.4 Outra verificação dessa vez para manter a tarefa com a classe do css ativa caso o usuário reinicie a página
            if (item.done) {
                item.className = "checked";
            } else {
                item.className = "";
            }
            // 8.5 Atribuição de incremento das tarefas à variável defininda no ITEM 8.1
            html += this.getTaskHTML(item.task, item.className);
        });

        // 8.6  Output para o usuário, ou seja, montar as tarefas
        this.$list.innerHTML = html;

        // 8.7 Sempre que há mudança com innerHTML é necessário chamar as funções de novo para manter a funcionalidade dos eventos aplicados no 'bindEvents'
        this.cacheSelectors();
        this.bindEvents();
    },

    // 9. Objeto para armazenar as funções de interação com o usuário dentro, todas essas funções são chamadas no ITEM 5. 'bindEvents'
    Events: {

        // 10. Função de click para marcar a tarefa que usuário deu input.
        checkButton_click: function (e) {

            // 10.1 variavel usando o parâmetro da função para pegar o elemento pai
            const li = e.target.parentElement;

            // 10.2 variável usada para selecionar o contéudo da tarefa (usado no ITEM 10.5)
            const taskContent = li.querySelector(".task").textContent;

            // 10.3. variável só para verificar se a li no html possui a classe .checked
            const checked = li.classList.contains("checked");

            // 10.4. variável para transformar os elementos salvos no local storage em objetos ou em uma array vazia (mais uma vez para previnir erros)
            let tasks = JSON.parse(localStorage.getItem("tasks"));

            // 10.5 verificação para checar se existe a classe checked (ITEM 10.3)
            if (!checked) {

                // caso a verificação seja falsa, ou seja nao contenha a classe, adicionar a classe
                li.classList.add("checked");

                // método MAP de percorrer arrays para modificar o done de FALSE para TRUE e rertonar uma nova array
                tasks = tasks.map(item => {
                    if (item.task === taskContent) {
                        item.done = true;
                    }
                    return item;
                });

                // 10.6 agora inserindo o novo ARRAY feito com MAP no ITEM 10.5 no localStorage, substituindo o antigo
                localStorage.setItem("tasks", JSON.stringify(tasks));
                return;
            }

            // 10.7 o mesmo que o ITEM 10.5 só que agora para modificar o done de TRUE para FALSE e remover a classe
            li.classList.remove("checked");
            tasks = tasks.map(item => {
                if (item.task === taskContent) {
                    item.done = false;
                }
                return item;
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        },

        // 11. Função para receber o dados do input.
        inputTask_keypress: function (e) {
            // 11.1 Variável usando o parãmetro da função para receber a tecla
            const key = e.key

            // 11.2 Variável para receber o toast (mensagem de erro)
            const toast = this.$toast

            // 11.3 Variável para receber o valor enviado pelo input
            let value = e.target.value

            // 11.4 Verificação para não receber tarefas sem nome, ou menor que quatro letras
            if (!value && key === 'Enter') {
                toast.innerText = 'Por favor, digite um nome para sua tarefa!'
                toast.classList.add('error')
                setTimeout(function () {
                    toast.classList.remove('error')
                }, 3000)
            } else if (value.length < 4 && key === 'Enter') {
                toast.innerText = 'Por favor, digite um nome para sua tarefa que seja maior que 3 letras!'
                toast.classList.add('warning')
                setTimeout(function () {
                    toast.classList.remove('warning')
                }, 3000)
                // 11.5 caso as verificações acima não sejam acionadas, adicionar a tarefa ao HTML usando a função reutilizavel do ITEM 7
            } else if (key === 'Enter') {
                this.$list.innerHTML += this.getTaskHTML(value, "")
                e.target.value = ''
                // 11.6 Chamando as funções de novo para manter a funcionalidade dos eventos aplicados no ITEM 5
                this.cacheSelectors()
                this.bindEvents()

                // !IMPORTANTE 11.7 A partir de agora começa o coração do local storage, primeiro definindo o objeto com dois parâmetros, um recebendo o nome da tarefa e o segundo recebendo um valor falso, que caso seja alterado, mantenha a classe de css para deixar o item da tarefa marcado quando a página for reinciada.
                const task = {
                    task: value,
                    done: false
                };

                // !IMPORTANTE 11.8 após definido o objeto, uma variável para pegar os items do local storage
                let savedTasks = localStorage.getItem('tasks')

                /* 
                !IMPORTANTE 11.9 Verificação TERNARIO para substituir IF e enxugar o código, se tiver alguma tarefa salva ele transforma o localstorage em objeto, caso contrário ele cria uma array vazia (evita problema com o codigo).
                Acontece que quando esse código rodar pela primeira vez ele já vai criar uma array porque não há nada salvo em savedTasks por isso o 'savedTasks' funciona
                */
                let savedTasksOBJ = savedTasks ? JSON.parse(savedTasks) : []

                // !IMPORTANTE 11.10 metodo push para inserir novas tarefas dentro da array criada no ITEM 11.9 
                savedTasksOBJ.push(task)

                // !IMPORTANTE 11.12 Após a criação de novas tarefas e juntar elas em uma array de objetos, enviar para o localStorage
                localStorage.setItem('tasks', JSON.stringify(savedTasksOBJ))
            }
        },

        // 12. última Função, remover items.
        removeButton_click: function (e) {
            // 12.1 assim como na Função checkButton, usamos o parâmetro da função para pegar o elemento pai
            const li = e.target.parentElement;

            // 12.2 mais uma vez igual na Função checkButton precisamos pegar os caracteres da tarefa
            const task = li.querySelector(".task").textContent;

            // 12.3 vamos transformar os itens salvos no local storage em objetos mais uma vez
            let tasks = JSON.parse(localStorage.getItem("tasks"));

            // 12.4 método FILTER que filtra e cria uma nova array com os elementos que passaram na condição, no caso a nova array vai ser a array anterior com a exclusão do item removido (item é o parâmetro da função e retorna todos os item.task diferente da task removida)
            tasks = tasks.filter(item => item.task !== task);

            // 12.5 re-enviando para o localStorage a nova array sem o item removido
            localStorage.setItem("tasks", JSON.stringify(tasks));

            // 12.6 adicionar a classe .removed que causa um efeito de translocamento para direita para sumir da tela.
            li.classList.add('removed')

            // 12.7 após 600 milissegundos aplicar a classe .deleted que causa display: none;
            setTimeout(() => {
                li.classList.add('deleted')
            }, 600)

            // 12.8 após 601 milissegundos aplicar uma função para excluir o item do HTML
            setTimeout(() => {
                li.remove();
            }, 601)
        }
    }

}

// 13. Chamada para fazer as funções rodarem
main.init()