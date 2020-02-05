export default class ModernSelect {

    /**
     *Creates an instance of modernSelect.
     * @param {string | HTMLSelectElement} select
     * @param {string} formName
     * @memberof modernSelect
     */
    constructor(select, options) {
        this.debug = true
        this.value = ""
        this.event = {
            change: 'modern-select-change',
            open: 'modern-select-open',
            close: 'modern-select-close'
        }
        this.settings = {
            formName: "",
            icon: "",
            animation: "slideInDown",
            customClass: ""
        }

        this.select = typeof select == 'string' ? document.querySelector(select) : select
        Object.assign(this.settings, options)
        this._createSelect(this.settings.formName)

        window.addEventListener('resize', () => {
            this._setDropdownHeight(this.optionContainer)
        })

        document.addEventListener('click', evt => {
            if (!evt.target.closest('.modern-select__wrapper') || evt.target.closest('.modern-select__wrapper') != this.select) {
                if (!this.optionContainer.classList.contains('modern-select--dropdown__close')) {
                    this.close()
                }
            }
        })
    }


    value(value) {
        let response, option
        response = false
        this.optionContainer.querySelectorAll('[data-value]').forEach(el => {
            if (el.getAttribute('data-value') == value.toString()) {
                response = true
                option = el
            }
        })
        this.value = value
        this.input.value = this.value

        if (response) {
            this._setOutput(option)
        } else {
            if (this.debug) {
                console.warn("[MODERN-SELECT][VALUE ERROR]", `The value ${value} doesn't exist inside your select. Please, please, make sur your value match with your data-value attribute`)
                console.warn("[MODERN-SELECT][HELP]", "Error on element : ", this.select)
            }
        }
    }

    close() {
        this.optionContainer.classList.add('modern-select--dropdown__close')
        if (this.settings.animation) {
            this.optionContainer.classList.remove(this.settings.animation)
            this.optionContainer.classList.remove('animated')
        }
        this._dispatch('close')
    }

    on(event, cb) {
        const evt = this.event[event]
        this.select.addEventListener(evt, function (evt) {
            cb(evt)
        })
    }

    _dispatch(evt) {
        let event = new Event(this.event[evt])
        this.select.dispatchEvent(event)
    }

    _updateValue(evt) {
        let option = evt.target
        if (!evt.target.hasAttribute('data-value')) {
            option = evt.target.closest('[data-value]')
        }
        if (this.value != option.getAttribute('data-value')) {
            this.value = option.getAttribute('data-value')
            this.input.value = this.value
            this._setOutput(option)
            this._dispatch('change')
        }
        return this.value
    }

    _createSelect(selectName) {

        const parent = this.select.parentElement
        const select = document.createElement('select')
        const options = this.select.querySelectorAll('[data-value]')
        const optionContainer = document.createElement('div')
        const output = document.createElement('div')

        optionContainer.classList.add('modern-select--dropdown')
        optionContainer.classList.add('modern-select--dropdown__close')

        output.classList.add('modern-select--output')
        this.settings.customClass ? output.classList.add(this.settings.customClass) : null

        options.forEach(el => {
            let option = document.createElement('option')
            option.value = el.getAttribute('data-value')
            el.classList.add('modern-select--option')
            select.appendChild(option)
            optionContainer.appendChild(el)
            if (el.hasAttribute('data-placeholder')) {
                el.style.display = 'none'
            }
        })

        output.innerHTML = options[0].innerHTML
        this.select.appendChild(output)
        this.select.appendChild(optionContainer)

        select.setAttribute('name', selectName)
        select.style.display = 'none'

        parent.appendChild(select)

        this.output = output
        this.optionContainer = optionContainer
        this.input = select

        this._clickListener(output, optionContainer)
        this.select.classList.add('modern-select__wrapper')

        this._createIcon(output)

        this._setValue()
    }

    _createIcon(output) {
        if (this.settings.icon) {
            const iconContainer = document.createElement('div')
            iconContainer.classList.add('modern-select--icon')
            iconContainer.innerHTML = this.settings.icon
            output.appendChild(iconContainer)
        }
    }

    _clickListener(output, optionContainer) {
        output.addEventListener('click', evt => {
            evt.preventDefault()
            this._setDropdownHeight(optionContainer)
            optionContainer.classList.toggle('modern-select--dropdown__close')
            if (this.settings.animation) {
                optionContainer.classList.toggle(this.settings.animation)
                optionContainer.classList.toggle('animated')
            }
            optionContainer.classList.contains('modern-select--dropdown__close') ? this._dispatch('close') : this._dispatch('open')
        })
    }

    _setDropdownHeight(optionContainer) {
        const delta = optionContainer.getBoundingClientRect()
        let windowHeight = window.innerHeight
        let finalHeight = windowHeight - delta.y

        optionContainer.style.maxHeight = finalHeight + "px"
    }

    _setValue() {
        const options = this.optionContainer.querySelectorAll('[data-value]')
        options.forEach(option => {
            option.removeEventListener('click', this._updateValue)
            option.removeEventListener('click', this.close)
            option.addEventListener('click', this._updateValue.bind(this))
            option.addEventListener('click', this.close.bind(this))
        })
    }

    _setOutput(option) {
        this.output.innerHTML = option.innerHTML
        this._createIcon(this.output)
    }
}
