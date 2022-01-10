import settings from "./settings.js"

const timer = {}

timer.elMinutes = document.getElementById('timer-minutes')
timer.elSeconds = document.getElementById('timer-seconds')

timer.minutes = 0;
timer.seconds = 0;

timer.setting = 'pomodoro'

timer.init = () => {
    settings.init()
    timer.set(timer.setting)
    timer.listeners()
}

timer.listeners = () => {
    const container = document.getElementById('timer-container')
    const controller = container.querySelector('#timer-controller')

    container.addEventListener('click', () => {
        let action = controller.getAttribute('action')

        if (action == 'restart') {
            timer.percentage(0)
            timer.set(timer.setting)
        }

        if (action == 'start' || action == 'restart' || action == 'continue') {
            controller.setAttribute('action', 'pause')
            controller.innerHTML = 'PAUSE'
            document.body.classList.add('run')
            timer.countDown()
        }

        if (action == 'pause') {
            controller.setAttribute('action', 'continue')
            controller.innerHTML = 'CONTINUE'
            timer.stop()
        }

    })

    const types = document.getElementById('timer-types')
    types.querySelectorAll('li').forEach(el => {

        el.addEventListener('click', () => {
            const type = el.getAttribute('type')
            types.querySelectorAll('li').forEach(allEl => {
                allEl.classList.remove('active')

            })

            el.classList.add('active')
            controller.setAttribute('action', 'start')
            controller.innerHTML = 'START'
            
            timer.setting = type
            timer.stop()
            timer.percentage(0)
            timer.set(type)
        })
    })
}

timer.allowReset = () => {
    const controller = document.getElementById('timer-controller')
    controller.setAttribute('action', 'restart')
    controller.innerHTML = 'RESTART'
}

timer.countDown = () => {
    let minutes = timer.minutes
    let seconds = timer.seconds

    if (minutes == 0 && seconds == 0) {
        timer.allowReset()
        timer.stop()
    }

    if (seconds == 0) {
        seconds = 59
        minutes = minutes - 1
    } else {
        seconds = seconds - 1
    }

    setTimeout(() => {
        if (document.body.classList.contains('run')) {
            timer.update(minutes, seconds)
            timer.percentage()
            timer.countDown()
        }
    }, 1000)
}

timer.stop = () => {
    document.body.classList.remove('run')
}

timer.set = (setting) => {
    const minutes = settings.timer[setting].minutes;
    const seconds = settings.timer[setting].seconds;
    timer.update(minutes, seconds)
}

timer.update = (minutes, seconds) => {
    console.log(minutes, ':', seconds)
    timer.minutes = minutes;
    timer.seconds = seconds;
    timer.elMinutes.innerHTML = timer.formatter(minutes)
    timer.elSeconds.innerHTML = timer.formatter(seconds)
}

timer.formatter = (time) => {

    if (time == 0) {
        return '00'
    }

    if (time > 0 && time < 10) {
        return '0' + String(time)
    }

    return time
}

timer.percentage = (value = null) => {
    const root = document.querySelector(':root');

    if(value != null){
        return root.style.setProperty('--circle-percentage', value);
    }

    const total_time = Number(settings.timer[timer.setting].minutes) * 60 + Number(settings.timer[timer.setting].seconds)
    const current_time = Number(timer.minutes) * 60 + Number(timer.seconds)
    const percentage = 100 - ((100 * current_time) / total_time) 

    root.style.setProperty('--circle-percentage', percentage);
}
 
timer.init()