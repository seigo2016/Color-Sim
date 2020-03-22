'use strict';

const builder = require('electron-builder');
const fs = require('fs');
const packagejson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const Platform = builder.Platform
builder.build({
    targets: Platform.MAC.createTarget(),
    config: {
        'appId': `com.seigo2016.${packagejson.name}`,
        'productName': 'Color-Sim',
        'directories':{
            'output':'build/mac'
        },
        'mac': {
            'target': {
                'target': 'zip',
                'arch': [
                    'x64',
                ]
            }
        },
    },
});
