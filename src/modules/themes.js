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
    rightDiv.appendChild(themeOptionHolder);
  
    themesData.forEach(theme => {
      const button = createThemeButton(theme);
      themeOptionHolder.appendChild(button);
      document.getElementById(theme.id).addEventListener("click", function() {
        jsonobj.Colors.menuHeaderColor = theme.color;
        document.documentElement.style.setProperty('--borderRadius', theme.skinWrapperBorderRadius + "px");
        document.documentElement.style.setProperty('--menuHeaderColor', theme.menuHeaderColor);
        document.documentElement.style.setProperty('--behindOptionsColor', theme.behindOptionsColor);
        document.documentElement.style.setProperty('--optionColor', theme.optionColor);
        document.documentElement.style.setProperty('--msgBoxColor', theme.msgBoxColor);
        document.documentElement.style.setProperty('--skinButtonColor', theme.skinButtonColor);
        document.documentElement.style.setProperty('--skinButtonHoverColor', theme.skinButtonHoverColor);
        document.documentElement.style.setProperty('--skinCloseColor', theme.skinCloseColor);
        document.documentElement.style.setProperty('--skinCloseTextColor', theme.skinCloseTextColor);
        document.documentElement.style.setProperty('--skinCloseTextHoverColor', theme.skinCloseTextHoverColor);
        document.documentElement.style.setProperty('--menuColor', theme.menuColor);
      });
      const style = createThemeStyles(theme);
      document.getElementsByTagName('head')[0].appendChild(style);
    });
  }
  

module.exports = {
    themes: themes
};