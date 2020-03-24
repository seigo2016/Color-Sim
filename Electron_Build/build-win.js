'use strict';

const builder = require('electron-builder');
const fs = require('fs');
const packagejson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const Platform = builder.Platform
builder.build({
    targets: Platform.WINDOWS.createTarget(),
    config: {
        'appId': `com.seigo2016.${packagejson.name}`,
        'productName': 'Color-Sim',
        'directories':{
            'output':'build/win'
        },
        'win': {
            'target': {
                'target': 'zip',
                'arch': [
                    'x64',
                ]
            }
        },
    },
});
