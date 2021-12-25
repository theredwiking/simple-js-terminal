const term = new Terminal({cursorBlinking: true});
const fitting = new FitAddon();

let command = '';

term.loadAddon(fitting);

term.open(document.getElementById('term-box'));

fitting.fit();

term.onKey(key => {
    if (key.key === '\r') {
        console.log('enter');
        window.ipcAPI.send('term.toShell', command);
        command = '';
        console.log(command);
    } else if (key.key === '\x7F') {
        console.log('backspace');
        term.write('\x1b[D\ \x1b[D')
    }else if (key.key === '\x1BOD') {
        console.log('left arrow');
        term.write('\x1b[D')
    }else if (key.key === '\x1BOC') {
        console.log('right arrow');
        term.write('\x1b[C')
    }else if (key.key === '\x1BOB') {
        console.log('down arrow');
        term.write('\x1b[B')
    }else if (key.key === '\x1BOA') {
        console.log('up arrow');
        term.write('\x1b[A')
    } else {
        term.write(key.key, () => {
            command += key.key;
        })
    }
})


// document.addEventListener('keyup', (event) => {
//     if (event.keyCode === 13) {
//         window.ipcAPI.send('term.toShell', e);
//     } else if(event.keyCode === 8) {
//         console.log('ehj');
//     }
// });

window.ipcAPI.receive('term.toWeb', (data) => {
    term.write(data);
})