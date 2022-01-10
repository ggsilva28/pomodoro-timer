import settings from "./settings.js"
import timer from './timer.js'

const modal = {}

modal.init = () => {
    modal.el = document.querySelector('.modal')
    modal.open()
    modal.close()
    modal.loadColors()
    modal.inputChanges()
}

modal.open = () => {
    const btn = document.querySelector('.config-btn')
    btn.addEventListener('click', () => {
        modal.loadTimers()
        modal.el.classList.add('show')
    })
}

modal.close = () => {
    const backdrop = document.querySelector('.modal-backdrop')
    backdrop.addEventListener('click', () => {
        modal.el.classList.remove('show')
    })
}

modal.setValues = () => {

}

modal.loadColors = () => {
    const colorsDiv = document.querySelector('.colors')
    colorsDiv.innerHTML = ''

    settings.colors.forEach((color, index) => {
        const html = `<div style="background-color: ${color.primary}" class="color-block primary"></div> 
                    <div style="background-color: ${color.secondary}" class="color-block secondary"></div>`

        const div = document.createElement('div')
        div.classList.add('color-item')
        div.innerHTML = html
        div.setAttribute('index', index)
        colorsDiv.appendChild(div)
        div.addEventListener('click', () => {
            modal.changeColor(div)
        })
    })
}

modal.loadTimers = () => {
    for (let i in settings.timer) {
        const input = document.querySelector(`[name="${i}"]`)
        if (input) {
            input.value = settings.timer[i] / 60
        }
    }
}

modal.inputChanges = () => {
    const inputs = document.querySelectorAll('.timers input')
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const name = input.getAttribute('name')
            settings.timer[name] = input.value * 60
            sessionStorage.setItem(name, input.value * 60)
            timer.init()
        })
    })
}

modal.changeColor = (el) => {
    const index = el.getAttribute('index')
    settings.color_selected = settings.colors[index]
    console.log(settings.colors[index])
    sessionStorage.setItem('color', JSON.stringify(settings.colors[index]))
    
    settings.setColor()
}

modal.init()