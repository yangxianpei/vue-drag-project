<template>
    <div  class="event">
        <el-button @click="add">添加事件</el-button>
        <Modal v-model="ModalShow">
            <el-tabs v-model="tabsValue">
                <el-tab-pane :label="item.label" :name="item.key" v-for="item in eventsList" :key='item.key'>
                    <el-input v-if="item.key == 'redirect'" v-model="item.param" type="textarea"
                        placeholder="请输入完整的 URL" />
                    <el-input v-if="item.key == 'alert'" v-model="item.param" type="textarea"
                        placeholder="请输入要 alert 的内容" />
                    <el-button style="margin-top: 20px;" @click="addEvent(item.key, item.param)">确定</el-button>
                </el-tab-pane>
            </el-tabs>
        </Modal>
    </div>
</template>

<script>
import Modal from "../Modal";
import { eventsList } from "@/utils/events";
export default {
    data() {
       
        return {
            eventsList:[],
            ModalShow: false,
            tabsValue: "redirect",
        };
    },
    mounted() {
       this.eventsList =eventsList
    },
    components: {
        Modal,
    },
    methods: {
        add() {
            this.ModalShow = !this.ModalShow;
        },
        addEvent(event,param) {
            this.ModalShow = false;
            this.$store.commit("addEvent", { event, param });
        },
    },
};
</script>
<style lang="less" scoped>
.event{
    text-align: center;
}
</style>