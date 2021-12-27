const term = new Terminal({cursorBlinking: true});
const fitting = new FitAddon.FitAddon();
const gl = new WebglAddon.WebglAddon();

let command = '';

term.loadAddon(fitting);

term.open(document.getElementById('term-box'));

term.loadAddon(gl);

fitting.fit();

term.onKey(key => {
    switch(key.key) {
        case '\r':
            window.ipcAPI.send('term.toShell', command);
            command = '';
            break;
        case '\x7F':
            term.write('\x1b[D\ \x1b[D');
            break;
        case '\x1BOD':
            term.write('\x1b[D');
            break;
        case '\x1BOC':
            term.write('\x1b[C');
            break;
        case '\x1BOB':
            term.write('\x1b[B');
            break;
        case '\x1BOA':
            term.write('\x1b[A');
            break;
        case '\':
            console.log('esc');
        default:
            console.log('Unkown key: ' + key.key);
            term.write(key.key, () => {
                command += key.key;
            });
    }
});

window.ipcAPI.receive('term.toWeb', (data) => {
    term.write(data);
});