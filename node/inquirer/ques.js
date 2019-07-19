const inquirer = require('inquirer');


// 提问用户，与用户进行命令行的交互
// prompt数组中存放一个指定格式的对象，我们称为question对象

inquirer.prompt([
    // input 提出问题，用户输入答案
    // 可用选项：type, name, message[, default, filter, validate, transformer]
    {
        type:"input", //类型
        name: 'username', //名称，用来统计
        message: '请输入你的应用名称', //问题
        default: "app", //默认值
        validate(val){ //输入验证
            // 验证，如果用户输入为空，则无法进入下一步并提示用户输入不得为空
            if (val.trim() === '') {
                return '应用名称不能为空';
            }
            return true;
        },
        filter(val){ // 对用户输入的内容进行过滤
            // 过滤，将用户输入的内容变为小写
            return val.toLowerCase();
        }
    },
    // confirm 提出选择，用户选择 Y or N
	//    可用选项：type, name, message, [default]
    //    default如果提供，必须是 boolean 类型
    {
        type:"confirm",
        name:"useES6",
        message:"是否启用es6",
        default:true
    },
    // 单选（用单选框形式）
    {
        type: 'list',
        name: 'framework',
        message: '请选择框架：',
        choices: ['Vue', 'React', 'Angular'],
        default: 1
    },
    // 单选2（用数字填写方式）
    // {
    //     type: 'rawlist',
    //     name: 'framework2',
    //     message: '请选择框架：',
    //     choices: ['Vue', 'React', 'Angular'],
    //     default: 1
    // },
    // 多选
    {
        type: 'checkbox',
        name: 'tools',
        message: '开发工具',
        choices: [
            {
                name: '使用ESLint',
                value: 'eslint',
                checked: true   //多选框的默认值
            },
            {
                name: '使用mocha单元测试',
                value: 'mocha'
            }
        ]
    }
]).then(answers=>{
    console.log(answers);
})