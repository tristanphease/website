
const SHEET_KEY_NAME = "theme_style";


function addStyleButtonEvent() {
    const styleButton = document.getElementById("style-picker-wrapper");

    const styleSelectButtons = document.getElementsByClassName("style-select");

    for (const styleSelectButton of styleSelectButtons) {
        const styleSheet = styleSelectButton.dataset.style;
        
        styleSelectButton.addEventListener("click", () => {
            changeStyleSheet(styleSheet);
        });
    }
}

function changeStyleSheet(sheetName) {
    const themeStyleSheet = document.getElementById("theme-stylesheet");
    const newStyleSheetName = `/background_styles/${sheetName}.css`;
    if (themeStyleSheet.href !== newStyleSheetName) {
        themeStyleSheet.href = newStyleSheetName;
    }

    window.localStorage.setItem(SHEET_KEY_NAME, sheetName);
}

function setCurrentStyle() {
    const currentSheet = window.localStorage.getItem(SHEET_KEY_NAME);

    if (currentSheet) {
        changeStyleSheet(currentSheet);
    }
}

function setupStyleChange() {
    setCurrentStyle();
    addStyleButtonEvent();

    
    //test.href = "/background_styles/test.css";
}

setupStyleChange();
