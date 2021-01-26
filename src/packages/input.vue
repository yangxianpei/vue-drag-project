<template>
    <el-input  v-model="msg"  style="height:100%"  :placeholder="propValue" @input="write"></el-input>
</template>

<script>
export default {
    data(){
        return {
            msg:''
        }
    },
    props: {
        propValue: {
            type: String,
            default: "",
        },
        element:{
            type:Object
        }
    },
    methods:{
        write(){
            this.$emit('input',this.element,this.msg)
        }
    }
};
</script>

<style lang="less" scoped>

</style>