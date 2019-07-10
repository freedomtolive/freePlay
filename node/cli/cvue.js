const commander = require('commander');
const fs = require('fs');

commander.version('v1.0.0', '-v, --version');


commander.command('create <app-name>')
.description('创建项目')
.alias('c')
.usage('使用说明')
.action( appName => {
    console.log(appName)
    fs.mkdirSync(appName);
});

commander.action(() => {
    console.log('Hello ' + commander.name);
});

commander.parse( process.argv );