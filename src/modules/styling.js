function styling(skinButtonColor, skinButtonHoverColor, skinCloseColor, skinCloseTextColor, skinCloseTextHoverColor, menuColor) {

document.documentElement.style.setProperty('--skinButtonColor', skinButtonColor);
document.documentElement.style.setProperty('--skinButtonHoverColor', skinButtonHoverColor);
document.documentElement.style.setProperty('--skinCloseColor', skinCloseColor);
document.documentElement.style.setProperty('--skinCloseTextColor', skinCloseTextColor);
document.documentElement.style.setProperty('--skinCloseTextHoverColor', skinCloseTextHoverColor);
document.documentElement.style.setProperty('--menuColor', menuColor);

let skincss = document.createElement('style');
skincss.innerText = `@import 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:'Poppins',sans-serif
    }
    body{
        overflow-y: hidden;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .titlebar{
        -webkit-user-select: none;
        -webkit-app-region: drag;
    }
    .skinwrapper{
        position:absolute;
        top:50%;
        left:50%;
        max-width:750px;
        width:100%;
        background: var(--menuColor);
        transform:translate(-50%,-50%);
        border:solid 1px #000;
        color:#fff;
        height:335px;
    }
    .skinwrapper header{
        font-size:23px;
        font-weight:500;
        padding:17px 30px;
        border-bottom:1px solid #000;
        text-align:center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .skinwrapper header.skinactive{
        cursor:move;
        user-select:none;
    }
    .skinwrapper .skincontent{
        display:flex;
        flex-direction:wrap;
        flex-wrap:wrap;
        justify-content:center;
    }
    .skincontent .title{
        margin:15px 0;
        font-size:29px;
        font-weight:500
    }
    .skincontent p{
        font-size:16px;
        text-align:center;
        display:flex
    }
    .skinbutton{
        width:100%;
        height:48px;
        background-color: var(--skinButtonColor);
        border:none;
        color:#fff;
        font-size:20px
    }
    .skinbutton:hover{
        background-color: var(--skinButtonHoverColor);
    }
    .skinclose{
        color: var(--skinCloseTextColor);
        position:absolute;
        top:0;
        right:0;
        margin-right:16px;
        margin-top:6px;
        background-color: var(--skinCloseColor);
        border:none;
        font-size:35px
    }
    .skinclose:hover{
        color:var(--skinCloseTextHoverColor)
    }
    p{
        font-size:20px
    }
    input[type=text]{
        float:right;
        margin:14px 25px 10px 0;
        font-weight:700;
        color:grey
    }
    input[type=range]{
        float:right;
        margin:16px 20px 10px 0
    }
    input[type=checkbox]{
        float:right;
        transform:scale(2);
        margin:14px 25px 5px 0;
        width:35px;
        font-weight:700;
        color:grey;
    }
    input[type=button]{
        float:right;
        margin:14px 25px 10px 0;
    }
    .optiondescr{
        float:left;
        margin:10px 0 10px 20px
    }
    .optionholder{
        background-color:" + optionColor + ";
         display: inline-block
    }
    hr{
        width:100%;
        border:.1px solid rgb(255, 27, 8, 0);
    }
    .skinCategory:hover{
        background-color:#0798fc
    }
`;
document.head.appendChild(skincss);

let scrollcss = document.createElement('style');
scrollcss.innerText = `
::-webkit-scrollbar { width: 8px; height: 3px;}
::-webkit-scrollbar-track {  background-color: #646464;}
::-webkit-scrollbar-track-piece { background-color: #000;}
::-webkit-scrollbar-thumb { height: 50px; background-color: #666; border-radius: 3px;}
::-webkit-scrollbar-corner { background-color: #646464;}}
::-webkit-resizer { background-color: #666;}`;
document.head.appendChild(scrollcss);
}

module.exports = {
    styling: styling
};