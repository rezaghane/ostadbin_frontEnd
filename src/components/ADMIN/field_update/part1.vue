<template>
	<div class="w-100 p-3 bg-white border-15 h-center">
		<div style="width: 75%; max-width: 500px;">
			<textInput
				label = "عنوان دسته بندی"
				@inputTxtFunc = "(e)=>{val.name = e}"
				:val="val.name"
				autofocus="true"
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
				:disable = "( val.name!='' ) ? '0' : '1' "
				disableText="عنوان دسته بندی را وارد کنید"
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
					error: error,
					success: success,
					loading: loading,

					imgurl: this.$localStorage.get('imgurl'),
					baseurl: this.$localStorage.get('baseurl'),
					time2minutes: time2minutes,
					minutes2time: minutes2time,
					classTime: classTime,
					timeOptions: timeOptions,
					vlaTimeOptions: vlaTimeOptions,
					val:{
						name: '',
						status: '0',
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
				loader(THIS = this){
						document.body.scrollTop = 0;
					$.post(this.baseurl+"field/" + this.$route.params.id, { token: this.$localStorage.get("user"), }, function(D){
						if(D.status.code=="401"){
							THIS.$localStorage.remove('user');
							THIS.$router.push('/login');
						}else{
							THIS.val.name = D.data.name;
							THIS.val.status = D.data.status;
						}
					}, "json");
				},
				//______________________________________________________________________
				sav(THIS = this){
					THIS.loading(THIS);
					let mod = (this.$route.params.id != undefined) ? this.$route.params.id : 'create';
					$.post(this.baseurl+'field/' + mod, {
						role: this.$localStorage.get('user').username.role,
						name: THIS.val.name,
						status: THIS.val.status,
						token: this.$localStorage.get("user"),
					}, function(D){
						THIS.success(THIS);
						THIS.$router.push('/field/list');
					}, "json");
				},
			}
		}
	</script>
<style>

</style>
