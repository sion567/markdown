计算属性，通过它可以定义一个新的属性，而该属性可以结合任何多个属性，并做相关转换操作。

文本插值转义

侦听器（watcher），当content数据属性发生改变时触发一些调用。

方法复用，把保存笔记的逻辑统一在一个地方。不要重复自己（DRY），也称为一次仅且一次（OAOO）
把一些逻辑写在可复用的函数里面：methods
methods内部，可以通过this关键字访问Vue实例。

通过this关键字，还可以访问vue实例的其他属性或特殊函数
基本上可以在任意函数（方法、处理函数或其他钩子）中使用this关键字访问Vue实例

动态css类
<div :class="['one', 'two', 'three']">   >>> <div class="one two three">
<div :class="{one:true, two:false, three:true}">   >>> <div class="one three">
将非动态的类放到静态的属性中,因为vue会对静态值做优化处理

v-if指令可以动态地决定哪些模板不应该出现
<template>标签不会出现在DOM中，它像一个幽灵元素对实际元素进行重新组合。

watch deep： 侦听数组中每个笔记属性的变化