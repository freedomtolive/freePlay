const {remote} = require('electron');

let _id = 0;

new Vue({
    el: '#root',
    data: {
        title: "TODOS",
        type:'all',
        newTodo : "",
        todos: [
            {
                title: '标题', 
                done: true
            },
            {
                title: '标题', 
                done: true
            },
            {
                title: '标题', 
                done: true
            }
        ]
    },
    computed:{
        showTodos(){
            return this.todos.filter((item) => {
                switch(this.type){
                    default:
                    case 'all':
                        return true;
                    case 'done':
                        return item.done;
                    case 'undone':
                        return !item.done;
                }
            })
        }
    },
    methods : {
        // 关闭应用
        closeApp(){
            // app对象只能通过主线程调用
            remote.app.exit();
        },
        // 最小化应用
        minApp(){
            // 通过remote下的一个方法来获取当前窗口对象（BrowserWindow）
            remote.getCurrentWindow().minimize();
        },
        //添加信息
        addTodo(){
            if(this.newTodo == "") return;
            _id++;
            this.todos.push({
                id : _id,
                title : this.newTodo,
                done:false
            })
            this.newTodo = "";
        },
        // 是否选中
        toggle(item){
            item.done = !item.done
        },
        // 删除功能
        delet(todo){
          this.todos = this.todos.filter(item => item!=todo)
        },
        // 更改查看的任务类型
        choose(type){
            this.type = type;
        }
    }
});