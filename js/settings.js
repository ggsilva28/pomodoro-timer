const settings = {}

settings.init = () => {
    settings.getUserSetting()   
}

settings.timer = {}

settings.timer.pomodoro = 1500

settings.timer.short_break = 300

settings.timer.long_break = 900

settings.colors = [
    {
        primary: '#c31432',
        primary_rgb: '195, 20, 50',
        secondary: '#2e1541',
        secondary_rgb: '36, 11, 54',
        secondary_fade: '#2e1541',
        text: '#ffffff'
    },
    {
        primary: '#F27121',
        primary_rgb: '',
        secondary: '#8A2387',
        secondary_rgb: '',
        secondary_fade: '',
        text: '#ffffff'
    },
    {
        primary: '#EB5757',
        primary_rgb: '',
        secondary: '#111111',
        secondary_rgb: '',
        secondary_fade: '',
        text: '#ffffff'
    },
    {
        primary: '#66ff00',
        primary_rgb: '',
        secondary: '#a80077',
        secondary_rgb: '',
        secondary_fade: '',
        text: '#ffffff'
    },
    {
        primary: '#0b8793',
        primary_rgb: '',
        secondary: '#360033',
        secondary_rgb: '',
        secondary_fade: '',
        text: '#ffffff'
    }
]

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