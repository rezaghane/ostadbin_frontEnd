<template>
	<div class="w-100 p-3 bg-white border-15 h-center">
		<div style="width: 75%; max-width: 500px;">
			<textInput
				label = "نام و نام خانوادگی"
				@inputTxtFunc = "(e)=>{val.name = e}"
				:val="val.name"
				autofocus="true"
			/>
			<textInput
				type="email"
				label = "ایمیل(اختیاری)"
				@inputTxtFunc = "(e)=>{val.email = e}"
				:val="val.email"
			/>
			<textInput
				label = "نام کاربری"
				@inputTxtFunc = "(e)=>{val.username = e}"
				:val="val.username"
			/>
			<textInput
				type="password"
				label = "کلمه عبور"
				@inputTxtFunc = "(e)=>{val.password = e}"
				:val="val.password"
			/>
			<textInput
				type="password"
				label = "کلمه عبور"
				@inputTxtFunc = "(e)=>{val.password2 = e}"
				:val="val.password2"
			/>
			<selectInput
				@inputTxtFunc = "(e)=>{val.status = e}"
				:value = "val.status"
				label="وضعیت"
				:flds="[{'id': '1','name': 'وضعیت فعال'},{'id': '0','name': 'وضعیت غیر فعال'}]"
			/>
			<btn
				class="w-100 mt-3"
				textClass="w-100"
				text="ذخیره"
				@clickMe="sav()"
				:disable = "setDisableBtn()"
				:disableText = "setDisableBtnText()"
			/>
		</div>
	</div>
</template>

	<script>
		import btn from  "../../UI/button/btn.vue";
		import switchInput from  "../../UI/input/switchInput.vue";
		import textInput from  "../../UI/input/textInput.vue";
		import datepicker from  "../../UI/input/datepicker.vue";
		import multiSelectInput from  "../../UI/input/multiSelectInput.vue";
		import selectInput from  "../../UI/input/selectInput.vue";
		import textareaInput from  "../../UI/input/textareaInput.vue";
		import userImg from  "../../UI/userImg/userImg.vue";
		import pageNavigation from  "../../UI/pageNavigation/pageNavigation.vue";
		import previewImage from  "../../UI/uploadFile/previewImage.vue";
		import { validateEmail, validatePhone } from  "../../assets/library/filter.js";
		import { time2minutes, minutes2time, classTime, timeOptions, vlaTimeOptions } from  "../../assets/library/convertTime.js";
		import { error, success, loading } from  "../../assets/library/messege.js";

		export default {
			name: 'self_part1',
			data(){
				return {
					imgurl: this.$localStorage.get('imgurl'),
					baseurl: this.$localStorage.get('baseurl'),
					time2minutes: time2minutes,
					minutes2time: minutes2time,
					classTime: classTime,
					timeOptions: timeOptions,
					vlaTimeOptions: vlaTimeOptions,

					error: error,
					success: success,
					loading: loading,

					val:{
						name: '',
						email: '',
						username: '',
						password: '',
						password2: '',
						status: '1',
					},
				}
			},
			components: {
				btn,
				switchInput,
				vlaTimeOptions,
				classTime,
				timeOptions,
				time2minutes,
				minutes2time,
				datepicker,
				textInput,
				selectInput,
				pageNavigation,
				userImg,
				previewImage,
				textareaInput,
				multiSelectInput,
			},
			props: {
				flds: {
					default: [],
				},
			},
			mounted(){
				(this.$route.params.id != undefined) ? this.loader() : '';
			},
			methods:{
				setDisableBtn(){
					let res = 0;
					if(this.val.email != '' && !validateEmail(this.val.email) ){
						res = 1;
					}
					if(this.val.name == '' || this.val.username == '' || this.val.password == '' || this.val.password2 == '' ){
						res = 1;
					}
					if(this.val.password != this.val.password2 ){
						res = 1;
					}
					return res;
				},
				//______________________________________________________________________
				setDisableBtnText(){
					let res = '';
					if(this.val.email != '' && !validateEmail(this.val.email) ){
						res = "ایمیل اشتباه است";
					}
					if(this.val.password != this.val.password2 ){
						res = "گذرواژه ها برابر نیستند";
					}
					if(this.val.name == '' || this.val.username == '' || this.val.password == '' || this.val.password2 == '' ){
						res = "اطلاعات را تکمیل نمایید";
					}
					return res;
				},
				//______________________________________________________________________
				loader(THIS = this){
					document.body.scrollTop = 0;
					$.post(this.baseurl+"admin/" + this.$route.params.id, { token: this.$localStorage.get("user") }, function(D){
					
						if(D.status.code=="401"){
							THIS.$localStorage.remove('user');
							THIS.$router.push('/login');
						}else{
							THIS.val.name = D.data.fullname;
							THIS.val.username = D.data.username;
							THIS.val.email = D.data.email;
							THIS.val.password = D.data.password;
							THIS.val.password2 = D.data.password;
							THIS.val.status = D.data.status;
						}
					}, "json");
				},
				//______________________________________________________________________
				sav(THIS = this){
					let mod = (this.$route.params.id != undefined) ? this.$route.params.id : 'create';
					THIS.loading(THIS);
					$.post(this.baseurl+'admin/' + mod, {
						role: this.$localStorage.get('user').username.role,
						name: THIS.val.name,
						email: THIS.val.email,
						username: THIS.val.username,
						password: THIS.val.password,
						status: THIS.val.status, 
						token: this.$localStorage.get("user")
					}, function(D){
						if(D.ok==true){
							THIS.success(THIS);
							THIS.$router.push('/admin/list');
						}else{
							THIS.error(THIS, "نام کاربری تکراری است");
							THIS.val.username = '';
						}
					}, "json");
				},
			}
		}
	</script>
<style>

</style>
