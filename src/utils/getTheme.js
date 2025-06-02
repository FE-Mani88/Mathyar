export default function getTheme() {

    let currentThemeGlobal = null

    const currentTheme = localStorage.getItem('theme')
    currentThemeGlobal = currentTheme


    return currentThemeGlobal;
}
