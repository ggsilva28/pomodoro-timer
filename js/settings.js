const settings = {}

settings.init = () => {
    settings.getUserSetting()   
}

settings.timer = {}

settings.timer.pomodoro = {
    minutes: 25,
    seconds: 0
}

settings.timer.short_break = {
    minutes: 5,
    seconds: 0
}

settings.timer.long_break = {
    minutes: 15,
    seconds: 0
}

settings.getUserSetting = () => {

    //Timer Setting
    for(let i in settings.timer){
        const sett = localStorage.getItem(i)
        if(sett){
            settings.timer[i] = sett
        }
    }
}


export default settings