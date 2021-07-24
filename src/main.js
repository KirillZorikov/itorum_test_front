import { createApp } from 'vue'
import App from './App.vue'
import {store} from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import VueNextSelect from 'vue-next-select'
import titleMixin from './mixins/title.mixin'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueAxios, axios)

app.component('vue-select', VueNextSelect)

app.mixin(titleMixin)

app.mount('#app')
