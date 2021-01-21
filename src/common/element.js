import Vue from 'vue'
import { Button, Message, Tabs, TabPane, Form, FormItem, ColorPicker, Input, Select, Option, RadioGroup, Drawer, Scrollbar, Tag } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Button)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(ColorPicker)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(RadioGroup)
Vue.use(Drawer)
Vue.use(Scrollbar)
Vue.use(Tag)
Vue.prototype.$message = Message;