const settings = {}

settings.init = () => {
    settings.getUserSetting()
}

settings.timer = {
    pomodoro: 1500,
    short_break: 300,
    long_break: 900,
}

settings.colors = [
    {
        primary: '#c31432',
        primary_rgb: '195, 20, 50',
        secondary: '#240b36',
        secondary_rgb: '36, 11, 54',
        secondary_fade: '#2e1541',
        text: '#ffffff',
    },
    {
        primary: '#F27121',
        primary_rgb: '242, 113, 33',
        secondary: '#8A2387',
        secondary_rgb: '138, 35, 135',
        secondary_fade: '#9D569B',
        text: '#ffffff'
    },
    {
        primary: '#EB5757',
        primary_rgb: '235, 87, 87',
        secondary: '#111111',
        secondary_rgb: '17, 17, 17',
        secondary_fade: '#222222',
        text: '#ffffff'
    },
    {
        primary: '#66ff00',
        primary_rgb: '102, 255, 0',
        secondary: '#a80077',
        secondary_rgb: '168, 0, 119',
        secondary_fade: '#B73790',
        text: '#ffffff'
    },
    {
        primary: '#0b8793',
        primary_rgb: '11, 135, 147',
        secondary: '#360033',
        secondary_rgb: '54, 0, 51',
        secondary_fade: '#4F184C',
        text: '#ffffff'
    }
]

settings.color_selected = settings.colors[0]

settings.getUserSetting = () => {

    //Timer Setting
    for (let i in settings.timer) {
        const sett = sessionStorage.getItem(i)
        if (sett) {
            settings.timer[i] = sett
        }
    }

    const color = sessionStorage.getItem('color')
    settings.color_selected = JSON.parse(color)

    settings.setColor()
}

settings.setColor = () => {
    const root = document.querySelector(':root');
    console.log(settings.color_selected)
    root.style.setProperty('--primary-color', settings.color_selected.primary);
    root.style.setProperty('--primary-color-rgb', settings.color_selected.primary_rgb);
    root.style.setProperty('--secondary-color', settings.color_selected.secondary);
    root.style.setProperty('--secondary-color-rgb', settings.color_selected.secondary_rgb);
    root.style.setProperty('--secondary-color-fade', settings.color_selected.secondary_fade);
    root.style.setProperty('--text-color', settings.color_selected.text);
}

export default settings