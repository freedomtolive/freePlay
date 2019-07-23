/**
 * ls
 *  输出当前运行命令所在的目录下的文件和文件夹
 * ls -p d:\
 *  我们还可以指定要显示的目录
 */

//  加载commander模块
const commander = require("commander");

// 设置当前命令的版本
commander.version("1.0.0","-v, --version");

// 添加文件夹模块
const fs = require("fs");

// 添加子命令
const subCommander = commander.command(' <path>');

// 实现命令的具体逻辑
commander.action((a) => {  //这里的参数就是在命令中定义的path
    try{
        // 读取文件夹
        const files = fs.readdirSync( path );
        console.log(files);
    }
    catch(e){
        // 开发过程中，可以把错误打印出来，实际发布以后应该屏蔽错误信息
        console.log(e);
    }
})

// 添加子命令(多个参数时)   如果是多个参数时，则用多个参数对应
/* const subCommander = commander.command(' <path> <path1>');
commander.action((a,b) => { 
    console.log(a,b)
}) */


// 在把process.argv交给parse解析之前进行一个简单的处理，少于3个参数，表示使用的是默认值
if (process.argv.length < 3) {
    process.argv.push(__dirname);
}
// console.log(process.argv);


// 输出
commander.parse( process.argv );