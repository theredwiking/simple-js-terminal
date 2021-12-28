const term = new Terminal({cursorBlinking: true});
const fitting = new FitAddon.FitAddon();
const gl = new WebglAddon.WebglAddon();

let command = '';

term.loadAddon(fitting);

term.open(document.getElementById('term-box'));

term.loadAddon(gl);

fitting.fit();

term.onKey(key => keymaps(key));

window.ipcAPI.receive('term.toWeb', (data) => {
    term.write(data);
});