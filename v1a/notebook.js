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
    }
})