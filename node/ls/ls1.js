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

// 设置命令选项(-p)
commander.option("-p , --path [path]" , "设置要显示的目录" , __dirname);

// 以列表的形式显示(如果选项不接收用户输入的值，那么这个选项将以boolean的形式提供给后面命令使用)
// 即用户输入值地时候为true，用户不输入值时为false
commander.option('-l, --list', '以列表的形式显示');

// 实现命令的具体逻辑
commander.action(() => {  //这里的path参数就是在命令中定义的<path>
    try{
        // 读取文件夹
        const files = fs.readdirSync( commander.path );
        
        console.log(commander.list);
        if(commander.list){
            // 用户输入内容时，以列表的形式显示
            // 数组地map方法，返回一个新数组，file为数组中的每一项
            let outPut = files.map( file => {

                // 文件的扩展信息（除了文件内容以外的信息）
                let stat = fs.statSync( commander.path + '/' + file );

                return stat.isDirectory() ? `[目录]   ${file}\r\n` : `[文件]   ${file}\r\n`;
            }).join("");

            console.log(outPut);

        }else{
            // 用户没有输入内容时，输出文件所在目录地数组
            console.log(files);

        }
    }
    catch(e){
        // 开发过程中，可以把错误打印出来，实际发布以后应该屏蔽错误信息
        console.log(e);
    }
})


// 在把process.argv交给parse解析之前进行一个简单的处理，少于3个参数，表示使用的是默认值
if (process.argv.length < 3) {
    process.argv.push(__dirname);
}
// console.log(process.argv);


// 输出
commander.parse( process.argv );