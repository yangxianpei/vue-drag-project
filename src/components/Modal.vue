<template>
    <transition name='fade'>
        <div class="modalbox" @click="hide" v-show="show">
            <div @click="handleClick" class="modal">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    model: {
        prop: "show",
        event: "changed",
    },
    data() {
        return {
            maskshow: true,
        };
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        show(d) {
            this.maskshow = d;
        },
    },
    methods: {
        hide() {
            setTimeout(() => {
                this.$emit("changed", false);
            }, 100);
        },
        handleClick(e) {
            e.stopPropagation();
            e.preventDefault();
        },
    },
};
</script>

<style lang="less" scoped>
.modalbox {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .modal {
        width: 400px;
        height: 100%;
        background: #ffffff;
        box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2);
        opacity: 1;
        z-index: 9999;
    }
}

.fade-enter-active {
    animation: fade-in 1s;
}
.fade-leave-active {
    animation: fade-out 1s;
}

@keyframes fade-in {
    0% {
        opacity: 0;
        transform: translateX(-100%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
@keyframes fade-out {
    0% {
        opacity: 1;
        transform: translateX(0);
    }
    100% {
        opacity: 0;
        transform: translateX(-100%);
    }
}
</style>