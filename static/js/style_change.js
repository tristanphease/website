
// key for localstorage
const SHEET_KEY_NAME = "theme_style";

/**
 * Adds the event to the buttons to set the themes
 */
function addStyleButtonEvent() {
    const styleSelectButtons = document.getElementsByClassName("style-select");

    for (const styleSelectButton of styleSelectButtons) {
        const styleSheet = styleSelectButton.dataset.style;

        styleSelectButton.addEventListener("click", () => {
            changeStyleSheet(styleSheet);
        });
    }
}

/**
 * Sets the style sheet for the theme
 * Also saves it to localstorage for persistence
 * @param {string} sheetName the name of the style sheet to set
 */
function changeStyleSheet(sheetName) {
    const themeStyleSheet = document.getElementById("theme-stylesheet");
    const newStyleSheetName = `/style/background_styles/${sheetName}.css`;
    if (themeStyleSheet.href !== newStyleSheetName) {
        themeStyleSheet.href = newStyleSheetName;
    }

    const currentStyleIcon = document.getElementById("current-style-icon");
    const newStyleIconPath = `/styles_icons/${sheetName}.png`;
    if (currentStyleIcon.src !== newStyleIconPath) {
        currentStyleIcon.src = newStyleIconPath;
    }

    window.localStorage.setItem(SHEET_KEY_NAME, sheetName);
}

/**
 * Sets the current style from the stored style in localstorage
 */
function setCurrentStyle() {
    const currentSheet = window.localStorage.getItem(SHEET_KEY_NAME);

    if (currentSheet) {
        changeStyleSheet(currentSheet);
    }
}

/**
 * Stuff to run on startup to set things up
 */
function setupStyleChange() {
    setCurrentStyle();
    addStyleButtonEvent();
}

setupStyleChange();
