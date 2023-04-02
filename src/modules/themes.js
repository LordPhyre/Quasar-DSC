function createThemeButton(theme) {
    console.log(theme);
    const button = document.createElement("button");
    button.classList.add("theme-button");
    button.classList.add(theme.color);
    button.id = theme.id;
    return button;
}

function createThemeStyles(theme) {
    const style = document.createElement('style');
    style.innerHTML = `
        .theme-button.${theme.color} {
            background-color: ${theme.backgroundColor};
        }
        
        .theme-button.${theme.color}:after {
            background-color: ${theme.afterColor};
        }
    `;
    return style;
}

function themes(jsonobj, themesData) {
    const themeOptionHolder = document.createElement("div");
    themeOptionHolder.id = "themeOptionHolder";
    rightDiv.appendChild(themeOptionHolder); // Append to an existing element in the DOM
  
    themesData.forEach(theme => {
      const button = createThemeButton(theme);
      themeOptionHolder.appendChild(button);
      document.getElementById(theme.id).addEventListener("click", function() {
        jsonobj.Colors.menuHeaderColor = theme.color;
        document.getElementById("skinheader").style.background = theme.backgroundColor;
      });
      const style = createThemeStyles(theme);
      document.getElementsByTagName('head')[0].appendChild(style);
    });
  }
  

module.exports = {
    themes: themes
};