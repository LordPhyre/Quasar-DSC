// going through options via arrow keys
let currentOption = 0;
const hoverOptions = document.querySelectorAll(".skinbutton");

document.addEventListener("keydown", function(event) {
switch (event.key) {
    case "ArrowUp":
        event.preventDefault();
        currentOption = currentOption > 0 ? currentOption - 1 : hoverOptions.length - 1;
        hoverOptions[currentOption].focus();
        break;
    case "ArrowDown":
        event.preventDefault();
        currentOption = currentOption < hoverOptions.length - 1 ? currentOption + 1 : 0;
        hoverOptions[currentOption].focus();
        break;
    case "ArrowRight":
        document.getElementById(options[currentOption]).dispatchEvent(new Event("click"));
        console.log(options[currentOption])
        break;
}
});