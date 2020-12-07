Vue.filter('date', time => moment(time).format('YYYY/MM/DD HH:mm'))
new Vue({
    el:'#notebook',
    data(){
        return {
            notes: JSON.parse(localStorage.getItem('notes')) || [],
            selectedId: localStorage.getItem('selected-id') || null, //选中笔记的ID
        }
    },
    //计算属性
    computed:{
        notePreview () {
          // Markdown rendered to HTML
          return this.selectedNote ? marked(this.selectedNote.content) : ""
        },
        addButtonTitle () {
            return this.notes.length + ' note(s) already'
        },
        selectedNote() { //当前笔记
            return this.notes.find(note => note.id === this.selectedId)
        },
        sortedNotes(){ //对排序自动更新和缓存
            //step1 创建时间
            //step2 是否收藏
            return this.notes.slice()  //sort会直接修改原始数组,使用slice方法创建新的副本，可以防止触发notes的侦听器
              .sort((a, b) => a.created - b.created)
              .sort((a, b) => a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1)
        }
    },
    watch: {
        notes: {
            handler: 'saveNotes',
            deep: true
        },
        selectedId (val) {
            localStorage.setItem('selected-id', val)
        }
    },
    methods: {
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
        },
        selectNote (o) { //选中笔记
            //console.log(o.id)
            this.selectedId = o.id
        },
        saveNotes(){
            localStorage.setItem('notes', JSON.stringify(this.notes))
            console.log('Notes saved!', new Date());
        },
        removeNote(){
            if (this.selectedNote && confirm('Delete the note?')) {
                const index = this.notes.indexOf(this.selectedNote)
                if (index !== -1) {
                    this.notes.splice(index, 1);
                }
            }
        },
        favoriteNote(){
            //this.selectedNote.favorite = !this.selectedNote.favorite
            //this.selectedNote.favorite = this.selectedNote.favorite ^ true
            this.selectedNote.favorite ^= true
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