new Vue({
    el:'#notebook',
    data(){
        return {
            content:'this is a note.'
        }
    },
    //计算属性
    computed:{
        notePreview () {
          // Markdown rendered to HTML
          return marked(this.content)
        },
    },
    //修改侦听器
    watch: {
        //侦听content数据属性
        content: {
            handler: 'saveNote',
            immediate: true, //会立即触发调用处理函数（vue创建时），而不用等到属性值第一次变化时才调用
            deep: true //以递归的方式侦听嵌套对象内部值得变化
        }
    },
    methods: {
        saveNote() {
            console.log('save note:', this.content)
            localStorage.setItem('content', this.content)
            this.reportOperation('saving')
        },
        reportOperation(opName) {
            console.log('the', opName, 'operation was completed!')
        }
    }
})