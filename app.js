var gui = require('nw.gui');

if (process.platform == "darwin") {
    var menu = new gui.Menu({ type: "menubar" });
    menu.createMacBuiltin && menu.createMacBuiltin(window.document.title);
    gui.Window.get().menu = menu;
}