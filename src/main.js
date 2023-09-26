import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import VeeValidate from 'vee-validate';
window.$ = window.JQuery = require('jquery');
import 'bootstrap';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Storage from 'vue-web-storage';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import vbMsgBox from 'bootstrap-vue-msgbox'
import VueSweetalert2 from 'vue-sweetalert2'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
import VueTreeNavigation from 'vue-tree-navigation';
import Treeselect from '@riophae/vue-treeselect'; //منو آبشاری با قابلیت انتخاب چند مورد
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import VueWindowSize from 'vue-window-size';
import VueResource from 'vue-resource';
import VueApexCharts from 'vue-apexcharts'
import AOS from 'aos'
import 'aos/dist/aos.css'

//-------------------Add Pages------------------------------
import p_home from "./components/USER/public/home/home.vue";
import p_teachers from "./components/USER/public/teachers/teachers.vue";
import p_users from "./components/USER/public/users/users.vue";
import p_teachers_id from "./components/USER/public/teachers_id/teachers_id.vue";
import p_auditors_id from "./components/USER/public/auditors_id/auditors_id.vue";
import p_aboutMe from "./components/USER/public/aboutMe/aboutMe.vue";
import p_contact from "./components/USER/public/contact/contact.vue";
import p_login from "./components/USER/public/login/login.vue";
import p_one_time_password from "./components/USER/public/login/one_time_password.vue";
import p_signup from "./components/USER/public/signup/signup.vue";
import p_getPhone from "./components/USER/public/signup/getPhone.vue";
import p_teachers_id_type from "./components/USER/public/teachers_id_type/teachers_id_type.vue";
import p_teachers_id_ALL from "./components/USER/public/teachers_id_ALL/teachers_id_ALL.vue";
import p_teachers_form from "./components/USER/public/teachers_form/teachers_form.vue";
import p_teachers_address from "./components/USER/public/teachers_address/teachers_address.vue";
import p_check_phone from "./components/USER/public/check_phone/check_phone.vue";
import p_oneTimePassword_check_phone from "./components/USER/public/check_phone/oneTimePassword_check_phone.vue";

import u_reserved from "./components/USER/reserved/reserved.vue";
import u_reserved_id from "./components/USER/reserved_id/reserved_id.vue";
import u_reserved_user_list from "./components/USER/reserved_user_list/reserved_user_list.vue";
import u_reserved_user_id from "./components/USER/reserved_user_id/reserved_user_id.vue";
import u_chat_user_teacher from "./components/USER/chat_user_teacher/chat_user_teacher.vue";
import u_self from "./components/USER/self/self.vue";
import u_self_setpass from "./components/USER/self_setpass/self_setpass.vue";
import u_proposal from "./components/USER/proposal/proposal.vue";
import u_pay_list from "./components/USER/pay_list/pay_list.vue";
import u_chat_user_admin from "./components/USER/chat_user_admin/chat_user_admin.vue";
import u_signup from "./components/USER/signup/signup.vue";
import u_charity from "./components/USER/charity/charity.vue";

import t_signup from "./components/TEACHER/signup/signup.vue";
import t_class_list from "./components/TEACHER/class_list/class_list.vue";
import t_class_create from "./components/TEACHER/class_create/class_create.vue";
import t_class_update from "./components/TEACHER/class_update/class_update.vue";

import a_discount_list from "./components/ADMIN/discount_list/discount_list.vue";
import a_discount_list_id from "./components/ADMIN/discount_list_id/discount_list_id.vue";
import a_discount_update from "./components/ADMIN/discount_update/discount_update.vue";
import a_admin_list from "./components/ADMIN/admin_list/admin_list.vue";
import a_admin_update from "./components/ADMIN/admin_update/admin_update.vue";
import a_settings_list from "./components/ADMIN/settings_list/settings_list.vue";
import a_auditors_list from "./components/ADMIN/auditors_list/auditors_list.vue";
import a_auditors_update from "./components/ADMIN/auditors_update/auditors_update.vue";
import a_category_list from "./components/ADMIN/category_list/category_list.vue";
import a_category_update from "./components/ADMIN/category_update/category_update.vue";
import a_degrees_list from "./components/ADMIN/degrees_list/degrees_list.vue";
import a_degrees_update from "./components/ADMIN/degrees_update/degrees_update.vue";
import a_field_list from "./components/ADMIN/field_list/field_list.vue";
import a_field_update from "./components/ADMIN/field_update/field_update.vue";
import a_payment_list from "./components/ADMIN/payment_list/payment_list.vue";
import a_support_admin from "./components/ADMIN/support_admin/support_admin.vue";
import a_support_chat from "./components/ADMIN/support_chat/support_chat.vue";
import a_reserved_update from "./components/ADMIN/reserved_update/reserved_update.vue";





Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);
Vue.use(VueTreeNavigation);
Vue.use(VueWindowSize);
Vue.use(VuePersianDatetimePicker, {
    name: 'date-picker',
    props: {
        direction: 'rtl',
        inputFormat: 'YYYY/MM/DD HH:mm',
        format: 'jYYYY/jMM/jDD HH:mm',
        editable: false,
        inputClass: 'form-control text-green',
        placeholder: '',
        altFormat: 'YYYY/MM/DD HH:mm',
        color: '#348a7b',
        autoSubmit: false,
    }
});

Vue.component('date-picker', VuePersianDatetimePicker);
Vue.use(VueRouter);
Vue.use(VeeValidate, {
   fieldsBagName: 'vvFields'
});
Vue.use(BootstrapVue);
Vue.use(Storage, {
  prefix: 'grpSelect_',
  drivers: ['session','local'],
});
Vue.use(require('vue-moment-jalaali'));
Vue.use(vbMsgBox);
const swalOptions = {
	title: "توجه",
	text: "باموفقیت انجام شد",
	type: "success",
	confirmButtonText: "تایید",
	cancelButtonText: "انصراف",
	confirmButtonColor: "#912",
	cancelButtonColor: "#012",
};
Vue.use(VueSweetalert2, swalOptions);
Vue.config.productionTip = false;

//************************ routes Links ******************************************************
const routes = [
 { path: '/signup', component: p_signup  },
 { path: '/getPhone', component: p_getPhone  },
 { path: '/login', component: p_login  },
 { path: '/oneTimePassword', component: p_one_time_password  },
 { path: '/contact', component: p_contact  },
 { path: '/aboutMe', component: p_aboutMe  },
 { path: '/teachers', component: p_teachers  },
 { path: '/users', component: p_users  },
 { path: '/teachers/form', component: p_teachers_form  },
 { path: '/teachers/address', component: p_teachers_address  },
 { path: '/teachers/:id', component: p_teachers_id  },
 { path: '/teachers/:id/type', component: p_teachers_id_type  },
 { path: '/teachers/:id/person', component: p_teachers_id_ALL  },
 { path: '/teachers/:id/online', component: p_teachers_id_ALL  },
 { path: '/teachers/:id/home', component: p_teachers_id_ALL  },
 { path: '/check/phone', component: p_check_phone  },
 { path: '/oneTimePassword/check/phone', component: p_oneTimePassword_check_phone  },
 { path: '/chat/user/chat', component: u_chat_user_teacher  },
 { path: '/chat/user/admin', component: u_chat_user_admin  },
 { path: '/chat/user/admin/:id', component: u_chat_user_admin  },
 { path: '/reserved/user/create', component: a_reserved_update  },
 { path: '/reserved/user/update/:id', component: a_reserved_update  },
 { path: '/reserved/user/list', component: u_reserved_user_list  },
 { path: '/reserved/user/list/:id', component: u_reserved_user_list  },
 { path: '/reserved/user/:id', component: u_reserved_user_id  },
 { path: '/reserved/:id', component: u_reserved_id  },
 { path: '/reserved', component: u_reserved  },
 { path: '/self', component: u_self  },
 { path: '/self/:id/:role', component: u_self  },
 { path: '/self/setpass', component: u_self_setpass  },
 { path: '/proposal', component: u_proposal  },
 { path: '/pay/list', component: u_pay_list  },
 { path: '/signupUser', component: u_signup  },
 { path: '/charity', component: u_charity  },
 { path: '/signupUser/:id', component: u_signup  },

 { path: '/signupTeacher', component: t_signup  },
 { path: '/signupTeacher/:id', component: t_signup  },
 { path: '/class/list', component: t_class_list  },
 { path: '/class/list/:id', component: t_class_list  },
 { path: '/class/create', component: t_class_create  },
 { path: '/class/create/:id', component: t_class_create  },
 { path: '/class/update/:id', component: t_class_update  },

 { path: '/category/list', component: a_category_list  },
 { path: '/category/create', component: a_category_update  },
 { path: '/category/update/:id', component: a_category_update  },
 { path: '/discount/list', component: a_discount_list  },
 { path: '/discount/list/:id', component: a_discount_list_id  },
 { path: '/discount/create', component: a_discount_update  },
 { path: '/discount/update/:id', component: a_discount_update  },
 { path: '/admin/list', component: a_admin_list  },
 { path: '/admin/create', component: a_admin_update  },
 { path: '/admin/update/:id', component: a_admin_update  },
 { path: '/settings/list', component: a_settings_list  },
 { path: '/auditors/list', component: a_auditors_list  },
 { path: '/auditors/create', component: a_auditors_update  },
 { path: '/auditors/update/:id', component: a_auditors_update  },
 { path: '/auditors/:id', component: p_auditors_id  },
 { path: '/field/list', component: a_field_list  },
 { path: '/field/create', component: a_field_update  },
 { path: '/field/update/:id', component: a_field_update  },
 { path: '/degrees/list', component: a_degrees_list  },
 { path: '/degrees/create', component: a_degrees_update  },
 { path: '/degrees/update/:id', component: a_degrees_update  },
 { path: '/payment/list', component: a_payment_list  },
 { path: '/support/admin', component: a_support_admin  },
 { path: '/support/chat', component: a_support_chat  },

 { path: '*', component: p_home  },
];
//************************ routes Links ******************************************************

const router = new VueRouter({
  mode: 'history',
  routes,
})
new Vue({
  router,
  created () {
    AOS.init()
  },
  render: h => h(App),
}).$mount('#app')
