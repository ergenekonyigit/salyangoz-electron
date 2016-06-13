var menubar = require('menubar');

var mb = menubar({
    height: 550,
    width: 400
});

mb.on('ready', function ready() {
    console.log('🐌');
});
