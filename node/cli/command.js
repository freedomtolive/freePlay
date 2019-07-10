const commander = require('commander');

/* 
    设置当前项目的版本
        第一个参数为项目的版本编号
        第二个参数为查看项目版本的简写no
*/
commander.version('v1.0.0', '-v, --version');

/*
    设置其他option，--name 后面的 [val] 是当前这个选项的参数值（用户再--name后填入的值）
    []表示可选，<>表示必填
    如果第三个参数是一个函数的话，那么该函数会接受来自用户输入的值
    并返回一个值作为 最后 这个选项实际的值
    第四个参数为默认值
*/
commander.option('-n, --name [val]', '设置名称', 'app');

// commander.option('-n, --name [val]', '设置名称', function(val) {
//     console.log(val); //函数接收的参数是用户输入的值
//     return val.toUpperCase();
// });

// 增加子命令
commander.command('create');

// 设置命令的动作
commander.action(() => {
    console.log('Hello ' + commander.name);
});

// 解析来自process.argv上的数据，会ni自动帮助我们添加一个 -h 的解析
commander.parse( process.argv );