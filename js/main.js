
const main = {
    tasks: [],

    init: function () {
        this.cacheSelectors()
        this.bindEvents()
        this.getStoraged()
        this.buildTasks()
    },


    cacheSelectors: function () {
        this.$list = document.querySelector('.list')
        this.$checkButtons = document.querySelectorAll('.check')
        this.$removeButtons = document.querySelectorAll('.remove')
        this.$inputTask = document.querySelector('#inputTask')
        this.$toast = document.querySelector('.toast')
        this.$listItem = document.querySelector('.list-item')
    },


    bindEvents: function () {
        const self = this
        this.$checkButtons.forEach(function (checkmark) {
            checkmark.onclick = self.Events.checkButton_click.bind(self)
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(self)

        this.$removeButtons.forEach(function (remove) {
            remove.onclick = self.Events.removeButton_click.bind(self)
        })
    },


    getStoraged: function () {
        const tasks = localStorage.getItem('tasks');
        this.tasks = tasks ? JSON.parse(tasks) : [];
    },

    getTaskHTML: function (task, check) {
        return `
        <li class="${check}">
            <div class="check"></div>
            <label for="" class="task">${task}</label>
            <button class="remove" data-task="${task}"></button>
        </li>`
    },

    buildTasks: function () {
        let html = '';
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        console.log(tasks);

        if (Array.isArray(this.tasks)) {
            this.tasks.forEach(item => {
                if (item.done) {
                    item.className = "done";
                } else {
                    item.className = "";
                }

                html += this.getTaskHTML(item.task, item.className);
            });
        }

        this.$list.innerHTML = html;

        this.cacheSelectors();
        this.bindEvents();
    },

    Events: {
        checkButton_click: function (e) {
            const li = e.target.parentElement;
            const task = li.querySelector(".task").textContent;
            const done = li.classList.contains("done");
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            if (!done) {
                li.classList.add("done");
                tasks = tasks.map(item => {
                    if (item.task === task) {
                        item.done = true;
                    }
                    return item;
                });
                localStorage.setItem("tasks", JSON.stringify(tasks));
                return;
            }
            li.classList.remove("done");
            tasks = tasks.map(item => {
                if (item.task === task) {
                    item.done = false;
                }
                return item;
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        },
        inputTask_keypress: function (e) {
            const key = e.key
            const toast = this.$toast
            let value = e.target.value
            if (!value && key === 'Enter') {
                toast.innerText = 'Por favor, digite um nome para sua tarefa!'
                toast.classList.add('visible')
                setTimeout(function () {
                    toast.classList.remove('visible')
                }, 3000)
            } else if (value.length < 4 && key === 'Enter') {
                toast.innerText = 'Por favor, digite um nome para sua tarefa que seja maior que 3 letras!'
                toast.classList.add('length')
                setTimeout(function () {
                    toast.classList.remove('length')
                }, 3000)
            } else if (key === 'Enter') {
                this.$list.innerHTML += this.getTaskHTML(value)
                e.target.value = ''
                this.cacheSelectors()
                this.bindEvents()

                const task = {
                    task: value,
                    done: false
                };
                let savedTasks = localStorage.getItem('tasks')
                let savedTasksOBJ = savedTasks ? JSON.parse(savedTasks) : []

                if (!Array.isArray(savedTasksOBJ)) {
                    savedTasksOBJ = []
                }
                savedTasksOBJ.push(task)
                localStorage.setItem('tasks', JSON.stringify(savedTasksOBJ))
            }
        },
        removeButton_click: function (e) {
            const li = e.target.parentElement;
            const task = li.querySelector(".task").textContent;
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks = tasks.filter(item => item.task !== task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            

            li.classList.add('removed')
            setTimeout(function () {
                li.classList.add('deleted')
            }, 600)
            setTimeout(()=>{
                li.remove();
            }, 601)
        }
    }

}

// fazer as funções rodarem
main.init()