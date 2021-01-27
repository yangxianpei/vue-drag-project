<template>
     <img src="../../public/1.jpg" alt="" draggable="false">
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
    mounted(){
        console.log(this.propValue);
    }
}

</script>
<style lang="less" scoped>
img{
    height: 100%;
    width: 100%;
    background-size: auto;
    background-repeat: no-repeat;
}
</style>