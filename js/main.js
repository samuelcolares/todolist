
//Const main um objeto para formalizar e deixar muito mais organizado as estruturas de código JavaScript
const main = {

    init: function () {
        this.cacheSelectors()
        this.bindEvents()
    },


    cacheSelectors: function () {
        this.$list = document.querySelector('.list')
        this.$checkButtons = document.querySelectorAll('.check')
        this.$removeButtons = document.querySelectorAll('.remove')
        this.$inputTask = document.querySelector('#inputTask')
        this.$toast = document.querySelector('.toast')
    },


    bindEvents: function () {
        const self = this
        this.$checkButtons.forEach(function (checkmark) {
            checkmark.onclick = self.Events.checkButton_click
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)

        this.$removeButtons.forEach(function (remove) {
            remove.onclick = self.Events.removeButton_click
        })
    },

    Events: {
        checkButton_click: function (e) {
            const li = e.target.parentElement
            const done = li.classList.contains('done')
            if (!done) {
                return li.classList.add('done')
            }
            li.classList.remove('done')
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
                this.$list.innerHTML += `
                <li>
                    <div class="check"></div>
                    <label for="" class="task">${value}</label>
                    <button class="remove"></button>
                </li>`

                e.target.value = ''
                this.cacheSelectors()
                this.bindEvents()
            }
        },
        removeButton_click: function (e){
            const li = e.target.parentElement
            const removed = li.classList.contains('removed')

            if(!removed){
                li.classList.add('removed')
                setTimeout(function(){
                    li.classList.add('deleted')
                }, 600)
            }
        }

    }

}
// fazer as funções rodarem
main.init()
