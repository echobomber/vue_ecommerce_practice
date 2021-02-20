// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
// 
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';
// 
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// 
import currencyFilter from './filters/currencyFilter';
import dateFilter from './filters/dateFilter';
// 
import App from './App';
import router from './router';
import './bus';

// 
Object.keys(rules).forEach((rule) => {
    extend(rule, rules[rule]);
  });
  
  localize('zh_TW', TW);
  
  Vue.component('ValidationObserver', ValidationObserver);
  Vue.component('ValidationProvider', ValidationProvider);
  
  configure({
    classes: {
      valid: 'is-valid',
      invalid: 'is-invalid'
    }
  });
// 
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.use(VueAxios, axios);
// loading 效果
Vue.component('Loading', Loading);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
})

router.beforeEach((to, from, next) => {
    // console.log('to', to, 'from', from, 'next', next);
    if(to.meta.requiresAuth === true){
        const api = `${process.env.APIPATH}/api/user/check`;
        // 為何這裡用 axios，其他就用 this.$http ?
        axios.post(api).then((response) => {
            console.log(response.data);
            if(response.data.success){
                next();
            }else{
                next({
                  path: '/login',
                });
            }
        })
    }else{
        next();
    }
})