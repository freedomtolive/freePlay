/*
    需求
    usage ： node crate app -i
        crate ：运行的脚本文件
        app ：创建的项目名称
        -i ： 参数，表示是否同时声称index.html文件
*/
/*fs 文件夹模块*/
const fs = require("fs");

/* 
    process 显示进程(项目)信息
*/
// 此处获取生成的文件夹名
let appName = process.argv[2];

/* 
    根据获取到的文件家名生成目录结构
    __dirname 当前文件所在的绝对路径
*/
let appRoot = __dirname + "/" + appName;

// 判断所创建的文件夹是否存在11
if(fs.existsSync(appRoot)){
    console.log("项目已经存在了，请勿重复创建");
    return;
}


// 利用文件夹模块新建文件夹
fs.mkdirSync(appRoot)
fs.mkdirSync(appRoot + "/css")
fs.mkdirSync(appRoot + "/image")
fs.mkdirSync(appRoot + "/js")

// 判断是否存在-i的选项
/* 
    writeFileSync 创建文件
*/
if(process.argv.includes("-i")){
    fs.writeFileSync(appRoot + "/index.html",`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>app</title>
        </head>
        <body>
            <h1>app</h1>
        </body>
    </html>
    `)
}

console.log("文件创建成功")

