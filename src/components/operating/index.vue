<template>
    <div>
        <PreLook v-model="PreLookShow"></PreLook>
    </div>
</template>
<script>

import PreLook from './prelook'
export default {
    data(){
        return {
           PreLookShow:false 
        }
    },
    mounted(){
    },
    components:{
        PreLook
    }
}
</script>
