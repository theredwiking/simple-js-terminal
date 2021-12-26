const term = new Terminal({cursorBlinking: true});
const fitting = new FitAddon.FitAddon();
const gl = new WebglAddon.WebglAddon();

let command = '';

term.loadAddon(fitting);

term.open(document.getElementById('term-box'));

term.loadAddon(gl);

fitting.fit();

term.onKey(key => {
    if (key.key === '\r') {
        window.ipcAPI.send('term.toShell', command);
        command = '';
    } else if (key.key === '\x7F') {
        term.write('\x1b[D\ \x1b[D')
    }else if (key.key === '\x1BOD') {
        term.write('\x1b[D')
    }else if (key.key === '\x1BOC') {
        console.log('right arrow');
        term.write('\x1b[C')
    }else if (key.key === '\x1BOB') {
        term.write('\x1b[B')
    }else if (key.key === '\x1BOA') {
        term.write('\x1b[A')
    } else {
        term.write(key.key, () => {
            command += key.key;
        })
    }
})

window.ipcAPI.receive('term.toWeb', (data) => {
    term.write(data);
})