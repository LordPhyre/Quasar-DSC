function create() {
    const invmenu = document.createElement('div');
    invmenu.className = 'invmenu';
    invmenu.id = "invmenu";
    invmenu.style = "position: absolute; z-index: 1000; left: 0px; right: 0px; margin: auto; margin-top: 10px;";
    invmenu.innerHTML = `
    <div style="height: 40px; display: flex; align-items: center; justify-content: center;">
        <div style="background-color: var(--menuColor); height: 40px; width: 250px; display: flex; align-items: center; justify-content: center; border-radius: 5px;">
            <input type="text" placeholder="Invite link..." style="margin-left: 5px; margin-bottom: 15px; width: 230px;">
            <input type="button" value="JOIN" style="background-color: grey; border: none; height: 22px; color: white; border-radius:5px; width: 60px;margin-bottom: 15px;">
        </div>
    </div>
    `;
    document.body.appendChild(invmenu);
}

module.exports = {
    create: create
};