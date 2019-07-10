#CLI - Command-Line Interface：
    命令行界面，也称为 CUI，字符用户界面

###CLI
    command [subCommand] [options] [arguments]
        command：命令，比如 vue
        [subCommand]：子命令，比如 vue create
        [options]：选项，配置，同一个命令不同选项会有不一样的操作结果，比如 vue -h，vue -v
        [arguments]：参数，某些命令需要使用的值，比如 vue create myApp
        选项与参数的区别：选项是命令内置实现，用户进行选择，参数一般是用户决定传入的值

###选项
    选项一般会有全拼与简写形式（具体看使用的命令帮助），比如 --version = -v
    全拼：以 -- 开头 / 简写：以 - 开头
    选项也可以接受值，值写在选项之后，通过空格分隔
    多个简写的选项可以连写，开头使用一个 - 即可，需要注意的是，如果有接受值的选项需要放在最后，比如：
        vue create -d -r <-r的值> myApp
        vue create -dr <-r的值> myApp

###第三方框架
	commander
		命令行开发工具
	chalk
		命令行样式风格控制器
	inquirer
		交互式命令行工具
    

####commander
	.parse(argv: string[])
		解析执行传入的 argv 命令字符串，通常改命令字符串来自用户在命令行的输入，process.argv
		commander 同时会默认创建一个 -h, --help 的选项
    .version(str, flags?)
		设置版本信息，该方法会自动为命令注册一个 -V,  --version 的 option
		str：版本号
		flags：指定的 option，默认为：”-V, --version”
    .option(flags, description?, fn?, defaultValue?)
		设置命令选项
		flags：选项标记名称，”-v, --version”
		description：选项使用说明
		fn：默认值，函数返回值为defaultValue，优先级高于defaultValue
		defaultValue：选项默认值，如果需要的话
    选项属性
		flags 中的格式可以接收参数
		-n, --name [val]
		-n, --name <val>
			[] 可选
			<> 必填
		设置成功以后，会在命令对象下增加一个与全局的同名的属性
    .action(fn)
		指定命令要执行的动作行为
		该函数执行过程会接收到至少一个参数
		如果命令中带有参数，则是对应的参数列表
		参数的最后一个永远都是 commander 实例
    .command(name, desc?, opts?)
		子命令
		name：命令的名称，也可以接受值
			'create [appName]'
		desc：简介
		opts：配置
    .description(str)
		命令描述
	.alias(str)
		设置命令别名(命令简写)
	.usage(str)
		设置或获取当前命令的使用说明





