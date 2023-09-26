<template>
	<div class="w-100 p-3 bg-white border-15 h-center">
		<div style="width: 75%; max-width: 500px;">
			<!-- ------------------------------------------------------------------- -->
			<textInput
				label = "کد تخفیف"
				@inputTxtFunc = "(e)=>{val.code = e}"
				:val="val.code"
				autofocus="true"
				v-show="val.id==0"
			/>
			<!-- ------------------------------------------------------------------- -->
			<textInput
				type="number"
				label = "درصد تخفیف"
				@inputTxtFunc = "(e)=>{val.percentage = e}"
				:val="val.email"
				v-show="val.id==0"
			/>
			<!-- ------------------------------------------------------------------- -->
			<selectInput
				@inputTxtFunc = "(e)=>{ val.teachers = null; val.category = null; val.type = e;}"
				:value = "val.type"
				label="نوع تخفیف"
				:flds="[{'id': '1','name': 'عمومی'}, {'id': '2','name': 'مدرس'}, {'id': '3','name': 'درس'}]"
				v-show="val.id==0"
			/>
			<!-- ------------------------------------------------------------------- -->
			<multiSelectInput
				:multiple="false"
				label="نام مدرس"
				:flds = "publicData.teacher"
				:value="val.teachers"
				@input = "(e) => {val.teachers = e}"
				v-show="val.type==2 && val.id==0"
			/>
			<!-- ------------------------------------------------------------------- -->
			<multiSelectInput
				:multiple="false"
				label="نام درس"
				:flds = "publicData.category"
				:value="val.category"
				@input = "(e) => {val.category = e}"
				v-show="val.type==3 && val.id==0"
			/>
			<!-- ------------------------------------------------------------------- -->
			<selectInput
				@inputTxtFunc = "(e)=>{val.status = e}"
				:value = "val.status"
				label="وضعیت"
				:flds="[{'id': '1','name': 'وضعیت فعال'},{'id': '0','name': 'وضعیت غیر فعال'}]"
			/>
			<!-- ------------------------------------------------------------------- -->
			<btn
				class="w-100 mt-3"
				textClass="w-100"
				text="ذخیره"
				@clickMe="sav()"
				:disable = "(this.val.code == '' || this.val.percentage == '' || (this.val.type==2 && this.val.teachers==null) || (this.val.type==3 && this.val.category==null)) ? '1' : '0'"
				disableText = "اطلاعات را تکمیل نمایید"
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
		import { error, success, loading, success_sm } from  "../../assets/library/messege.js";

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
					success_sm: success_sm,
					success: success,
					loading: loading,
					publicData:{
						teacher: [],
						category: [],
					},
					val:{
						id: 0,
						code: '',
						percentage: '',
						teachers: null,
						category: null,
						type: 1,
						status: 1,
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
				(this.$route.params.id != undefined) ? this.loader() : this.getData();
			},
			methods:{
				//______________________________________________________________________
				getData(THIS = this){
					THIS.loading(THIS);
					$.post(this.baseurl+"all/public", { token: this.$localStorage.get("user") }, function(D){
						THIS.publicData.teacher = D.data.teacher;
						THIS.publicData.category = D.data.category;
						THIS.success_sm(THIS, "آماده شد");
					}, "json");
				},
				//______________________________________________________________________
				loader(THIS = this){
					document.body.scrollTop = 0;
					THIS.loading(THIS);
					$.post(this.baseurl+"discount/" + this.$route.params.id, {token: this.$localStorage.get("user"), }, function(D){
						if(D.status.code=="401"){
							THIS.$localStorage.remove('user');
							THIS.$router.push('/login');
						}else{
							THIS.val = D.data
							THIS.getData();
						}
					}, "json");
				},
				//______________________________________________________________________
				sav(THIS = this){
					let mod = (this.$route.params.id != undefined) ? this.$route.params.id : 'create';
					THIS.loading(THIS);
					$.post(this.baseurl+'discount/' + mod, {
						val: THIS.val,token: this.$localStorage.get("user"),
					}, function(D){
						THIS.success(THIS);
						THIS.$router.push('/discount/list');
					}, "json");
				},
			}
		}
	</script>
<style>

</style>
