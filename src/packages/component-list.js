//公共样式
const commonStyle={
    rotate: '',
    opacity: 1,
};

//编辑器左侧组件列表
const list = [
    {
        component: 'v-button',
        label: '按钮',
        propValue: '按钮',
        icon: 'el-icon-thumb',
        animations: [],
        events: [],
        style: {
            width: 100,
            height: 34,
            borderWidth: '',
            borderColor: '',
            borderRadius: '',
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
            backgroundColor: '',
        },
    },
    {
        component: 'v-input',
        label: '输入框',
        propValue: '输入框',
        icon: 'el-icon-search',
        animations: [],
        events: {},
        style: {
            width: 200,
            height: 40,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
        },
    },
    {
        component: 'v-text',
        label: '文字',
        propValue: '文字',
        icon: 'el-icon-edit',
        animations: [],
        events: {},
        style: {
            width: 200,
            height: 33,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
        },
    },
]

list.forEach(item=>{
    item.style = { ...item.style, ...commonStyle}
})

export default list