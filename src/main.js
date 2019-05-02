import Vue from "vue";
import App from "./App";
import router from "./router/index";
import Vuex from 'vuex';
import { HTTP } from './common/http-common';
import store from './store/index'
import VueParticles from 'vue-particles'
import VueSweetalert from 'vue-sweetalert2';
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
import { ClientTable } from 'vue-tables-2';
import ImgInputer from 'vue-img-inputer';
//css
import "vue-notifyjs/themes/default.css";
import "nprogress/nprogress.css"
import 'vue-img-inputer/dist/index.css'
import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'


// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
//vee validate
import fa from 'vee-validate/dist/locale/fa';
import VeeValidate, {Validator} from 'vee-validate';

import PaperDashboard from "./plugins/paperDashboard";
import './assets/css/font-bmi.css'

Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});


Validator.localize('fa', fa);

Vue.use(PaperDashboard);
Vue.use(Vuex);
Vue.use(HighchartsVue, { Highcharts });
Vue.use(VueSweetalert);
Vue.use(VeeValidate);
Vue.use(VueParticles);
Vue.use(require('vue-jalali-moment'));
Vue.use(ClientTable);
Vue.component('ImgInputer', ImgInputer);
// global components
Vue.prototype.$http = HTTP;

/* eslint-disable no-new */



/**
 * TODO: Uncomment below when compiling to production
 */
// Vue.config.devtools = false;
// Vue.config.debug = false;
// Vue.config.silent = true;
new Vue({
    router,
    store: store,
    render: h => h(App)
}).$mount("#app");
