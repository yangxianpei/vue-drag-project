<template>
    <el-button class="v-button">{{propValue}}</el-button>
</template>
<script>
export default {
    props: {
        propValue: {
            type: String,
            default: "",
        },
    },
};
</script>
