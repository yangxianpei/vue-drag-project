<template>
    <div>
        <textarea :value='propValue' @input="write" ref="textarea"></textarea>
    </div>
</template>
<script>
export default {
    props: {
        propValue: {
            type: String,
            default: "",
        },
        element: {
            type: Object,
        },
    },
    methods:{
        write(){
            this.$emit('input',this.element,this.$refs.textarea.value)
        }
    }
};
</script>
<style lang="less" scoped>
textarea{
    height: 100%;
    width: 100%;
    resize:none;
    border:1px solid #70c0ff;
    overflow: auto;
    outline:none;
}
</style>