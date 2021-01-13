<template>
    <div>
    <v-button></v-button>
    <div v-for="item in $store.state.componentData" :key="item.id">
         <component class="component" :is="item.component"
         :propValue="item.propValue" />
    </div>
   </div>
</template>

<script>
export default {};
</script>