import settings from "./settings.js"

const timer = {}

timer.interval = null;

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

timer.listeners = async () => {
    const container = document.getElementById('timer-container')
    const controller = container.querySelector('#timer-controller')

    container.addEventListener('click', () => {
        let action = controller.getAttribute('action')

        if (action == 'restart') {
            timer.set(timer.setting)
            timer.resetPercentage()
        }

        setTimeout(() => {
            if (action == 'start' || action == 'restart' || action == 'continue') {
                controller.setAttribute('action', 'pause')
                controller.innerHTML = 'PAUSE'
                document.body.classList.add('run')
                timer.percentage()
                if (!timer.interval) {
                    timer.interval = setInterval(timer.countDown, 100);
                }
            }

            if (action == 'pause') {
                controller.setAttribute('action', 'continue')
                controller.innerHTML = 'CONTINUE'
                timer.stop()
            }
        }, 10)
    })

    const types = document.getElementById('timer-types')
    types.querySelectorAll('li').forEach(el => {
        el.addEventListener('click', () => {
            container.classList.add('await')

            const type = el.getAttribute('type')
            types.querySelectorAll('li').forEach(allEl => {
                allEl.classList.remove('active')
            })

            el.classList.add('active')
            controller.setAttribute('action', 'start')
            controller.innerHTML = 'START'

            timer.setting = type
            timer.stop()
            timer.set(type)

            timer.resetPercentage()

            setTimeout(() => {
                container.classList.remove('await')
            }, 300)
        })
    })
}

timer.allowReset = () => {
    const controller = document.getElementById('timer-controller')
    controller.setAttribute('action', 'restart')
    controller.innerHTML = 'RESTART'
}

timer.countDown = () => {
    if (timer.seconds <= 0) {
        timer.allowReset()
        timer.stop()
    }

    timer.seconds = timer.seconds - 0.1
    if (document.body.classList.contains('run')) {
        timer.update()
    } else {
        timer.stop()
    }
}

timer.stop = () => {
    timer.pausePercentage()
    document.body.classList.remove('run')
    if (timer.interval) {
        clearInterval(timer.interval);
        timer.interval = null;
    }
}

timer.set = (setting) => {
    timer.seconds = settings.timer[setting]
    console.log(timer.seconds)
    timer.update()
}

timer.update = () => {
    const time = timer.formatter(timer.seconds)
    timer.elMinutes.innerHTML = time[0]
    timer.elSeconds.innerHTML = time[1]
}

timer.formatter = (duration) => {
    // minutes and seconds
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret.split(':')
}


timer.percentage = async (value = null) => {
    const el = document.getElementById('timer-percentage')
    const calc = timer.calculatePercentage()

    el.style.transition = 'all 0ms linear 0s'
    if (calc.percentage == 100) {
        timer.setCirclePercentage(0)
    } else {
        timer.setCirclePercentage(calc.percentage)
    }

    el.style.transition = 'all ' + String((calc.current_time * 1000) - 1000) + 'ms linear 0s'
    timer.setCirclePercentage(100)
}

timer.resetPercentage = () => {
    const el = document.getElementById('timer-percentage')

    el.style.transition = 'all 0ms linear 0s'
    timer.setCirclePercentage(0)
}

timer.pausePercentage = () => {
    const el = document.getElementById('timer-percentage')
    const calc = timer.calculatePercentage()

    el.style.transition = 'all 0ms linear 0s'
    timer.setCirclePercentage(calc.percentage)
}

timer.setCirclePercentage = (percentage) => {
    if(percentage > 100)
        percentage = 100

    const root = document.querySelector(':root');
    root.style.setProperty('--circle-percentage', percentage);
}

timer.calculatePercentage = () => {
    const total_time = Number(settings.timer[timer.setting])
    const current_time = Number(timer.seconds)
    const percentage = 100 - (100 * current_time) / total_time

    console.log({
        total_time: total_time,
        current_time: current_time,
        percentage: percentage
    })
    return {
        total_time: total_time,
        current_time: current_time,
        percentage: percentage
    }
}

timer.init()

export default timer