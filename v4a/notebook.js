new Vue({
    el:'#notebook',
    data(){
        return {
            content: localStorage.getItem('content') || 'you can write in **markdown**',
            notes: [],
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
        },
        addNote() {
            const time = Date.now()
            // Default new note
            const note = {
                id: String(time),
                title: 'New note ' + (this.notes.length + 1),
                content: '**Hi!** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
                created: time,
                favorite: false,
            }
            // Add
            this.notes.push(note)
        }
    },
    //钩子
    beforeCreate(){
        console.log('[beforeCreate] 在vue被实例创建时(例new Vue({}))，完成其他事项之前调用');
    },
    created(){
        console.log('[created] 在实例准备就绪之后调用，此时实例还没有挂载到DOM中');
    },
    beforeMount(){
        console.log('[beforeMount] 在挂载(添加)实例到web页面之前调用');
    },
    mounted(){
        console.log('[mounted] 当实例被挂载到页面并且DOM可见时调用');
    },
    beforeUpdate(){
        console.log('[beforeUpdate] 当实例需要更新时(一般来说，是某个数据或计算属性发生改变时)调用');
    },
    update(){
        console.log('[update] 在把数据变化应用到模板之后调用，*此时DOM可能还没有更新');
    },
    beforeDestroy(){
        console.log('[beforeDestroy] 在实例销毁之前调用');
    },
    destroy(){
        console.log('[destroy] 在实例完全销毁之后调用');
    }
})