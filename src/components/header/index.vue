<template>
    <div class="header">
        <el-button @click="cancel">撤消</el-button>
        <el-button @click="preLook">预览</el-button>
        <el-button @click="save">保存</el-button>
    </div>
</template>
<script>
export default {
    methods:{
        cancel(){},
        preLook(){},
        save(){}
    }
}
</script>

<style lang="less">
.header{
    display: flex;
    align-items: center;
    padding: 20px  10px;
    background: #fff;
}
</style>