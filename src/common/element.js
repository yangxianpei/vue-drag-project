import Vue from 'vue'
import { Button, Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Button)
Vue.prototype.$message = Message;