<template>
	<div class="w-100 p-3 bg-white border-15 h-center">
		<div style="width: 75%; max-width: 500px;" v-if="publicData.teacher.length>0">
			<!-- ------------------------------------------------------------------- -->
			<multiSelectInput
				:multiple="false"
				label="نام مدرس"
				:flds = "publicData.teacher"
				:value="val.t"
				@input = "(e) => {val.t = e}"
			/>
			<!-- ------------------------------------------------------------------- -->
			<multiSelectInput
				:multiple="false"
				label="نام کاربر"
				:flds = "publicData.user"
				:value = "val.u"
				@input = "(e) => {val.u = e}"
			/>
			<!-- ------------------------------------------------------------------- -->
			<multiSelectInput
				:multiple="false"
				label="نوع جلسه"
				:flds = "publicData.knd_class"
				:value = "val.k"
				@input = "(e) => {val.k = e}"
			/>
			<!-- ------------------------------------------------------------------- -->
			<datepicker
				label="انتخاب تاریخ"
				:value = "val.date"
				@input = "(e) => {val.date = e}"
			/>
			<!-- ------------------------------------------------------------------- -->
			<timepicker
				label="انتخاب ساعت شروع جلسه"
				:value = "val.ss"
				@input = "(e) => {val.ss = e}"
			/>
			<!-- ------------------------------------------------------------------- -->
			<timepicker
				label="انتخاب ساعت پایان جلسه"
				:value = "val.se"
				@input = "(e) => {val.se = e}"
			/>
			<!-- ------------------------------------------------------------------- -->
			<selectInput
				label="دسته بندی"
				:value="val.d"
				:flds="$localStorage.get('degrees').data"
				@inputTxtFunc = "(e)=>{val.d = e}"
			/>
			<!-- ------------------------------------------------------------------- -->
			<selectInput
				:value="val.c"
				:flds="(indexFinder($localStorage.get('degrees').data, val.d)==-1) ? [] : $localStorage.get('degrees').data[indexFinder($localStorage.get('degrees').data, val.d)].category"
				@inputTxtFunc = "(e)=>{val.c = e}"
				label="انتخاب موضوع درس"
			/>
			<!-- ------------------------------------------------------------------- -->
			<selectInput
				:value="val.f"
				:flds="publicData.field"
				@inputTxtFunc = "(e)=>{val.f = e}"
				label="رشته تحصیلی"
			/>
			<!-- ------------------------------------------------------------------- -->
			<textInput
				:val="val.e"
				@inputTxtFunc = "(e)=>{val.e = e}"
				label="توضیحات(اختیاری)"
			/>
			<!-- ------------------------------------------------------------------- -->
			<selectInput
				:value="val.a"
				:flds="(indexFinder(publicData.user, val.u)==-1) ? [] : publicData.user[indexFinder(publicData.user, val.u)].address"
				@inputTxtFunc = "(e)=>{val.a = e}"
				label="آدرس محل تحصیل"
				v-if="val.k==3"
			/>
			<!-- ------------------------------------------------------------------- -->
			<textInput
				:val=" (val.a == null ) ? val.ad : publicData.user[indexFinder(publicData.user, val.u)].address[val.a].name"
				@inputTxtFunc = "(e)=>{val.ad = e}"
				label="آدرس محل تحصیل را وارد نمایید"
				v-if="val.k==3"
			/>
			<!-- ------------------------------------------------------------------- -->
			<textInput
				:val="val.l"
				@inputTxtFunc = "(e)=>{val.l = e}"
				label="لینک کلاس آنلاین"
				v-if="val.k==2"
			/>
			<!-- ------------------------------------------------------------------- -->
			<textInput
				type="number"
				:val="val.cm"
				@inputTxtFunc = "(e)=>{val.cm = e}"
				label="کمسیون مدرس"
			/>
			<!-- ------------------------------------------------------------------- -->
			<textInput
				type="number"
				:val="val.p"
				@inputTxtFunc = "(e)=>{val.p = e}"
				label="مبلغ قابل پرداخت(تومان)"
				v-if="val.ap=='1'"
			/>
			<!-- ------------------------------------------------------------------- -->
			<switchInput
				label="هزینه دریافت شود؟"
				deactiveText="خیر"
				activeText="بلی"
				@input = "(e)=>{val.ap = e}"
				:value="val.ap"
			/>
			<!-- ------------------------------------------------------------------- -->
			<btn
				class="w-100 mt-3"
				textClass="w-100"
				text="ذخیره"
				@clickMe="sav()"
				:disable = "setBtn(1)"
				:disableText = "setBtn(2)"
			/>
		</div>
		<loadingC v-else />
	</div>
</template>

	<script>
		import btn from  "../../UI/button/btn.vue";
		import loadingC from  "../../UI/loading/loading.vue";
		import switchInput from  "../../UI/input/switchInput.vue";
		import textInput from  "../../UI/input/textInput.vue";
		import datepicker from  "../../UI/input/datepicker.vue";
		import timepicker from  "../../UI/input/timepicker.vue";
		import multiSelectInput from  "../../UI/input/multiSelectInput.vue";
		import selectInput from  "../../UI/input/selectInput.vue";
		import textareaInput from  "../../UI/input/textareaInput.vue";
		import userImg from  "../../UI/userImg/userImg.vue";
		import pageNavigation from  "../../UI/pageNavigation/pageNavigation.vue";
		import previewImage from  "../../UI/uploadFile/previewImage.vue";
		import { validateEmail, validatePhone, validURL } from  "../../assets/library/filter.js";
		import { time2minutes, minutes2time, classTime, timeOptions, vlaTimeOptions } from  "../../assets/library/convertTime.js";
		import { error, success, loading } from  "../../assets/library/messege.js";
		import { indexFinder } from  "../../assets/library/filter.js";

		export default {
			name: 'self_part1',
			data(){
				return {
					filter: {
						validURL: validURL,
						validatePhone: validatePhone,
						validateEmail: validateEmail,
					},

					error: error,
					success: success,
					loading: loading,
					indexFinder: indexFinder,
					imgurl: this.$localStorage.get('imgurl'),
					baseurl: this.$localStorage.get('baseurl'),
					time2minutes: time2minutes,
					minutes2time: minutes2time,
					classTime: classTime,
					timeOptions: timeOptions,
					vlaTimeOptions: vlaTimeOptions,
					publicData:{
						teacher: [],
						user: [],
						knd_class: [],
						field: [],
					},
					val:{
						t: null,
						u: null,
						k: null,
						date: null,
						ss: null,
						se: null,
						d: null,
						f: null,
						c: null,
						e: null,
						h: null,
						a: null,
						ad: null,
						p: 0,
						ap: '0',
						cm: '0',
						l: null,
					},
				}
			},
			components: {
				btn,
				switchInput,
				timepicker,
				vlaTimeOptions,
				classTime,
				timeOptions,
				time2minutes,
				minutes2time,
				datepicker,
				textInput,
				selectInput,
				loadingC,
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
				(this.$route.params.id == undefined) ? this.publicLoad() : this.loader();
			},
			methods:{
				loader(THIS = this){
					$.post(this.baseurl+'reserved/'+this.$route.params.id, { token: this.$localStorage.get("user"),role: 3 }, function(D){
					
						if(D.status.code=="401"){
							THIS.$localStorage.remove('user');
							THIS.$router.push('/login');
						}else{
							THIS.val.u = D.data.teachers_id;
							THIS.val.t = D.data.teachers_id2;
							THIS.val.k = D.data.knd_class_id;
							THIS.val.date = D.data.date_class;
							THIS.val.ss = D.data.time_class.start;
							THIS.val.se = D.data.time_class.end;
							THIS.val.f = D.data.field_id;
							THIS.val.c = D.data.category_id;
							THIS.val.d = D.data.degre_id;
							THIS.val.e = D.data.explain_user;
							THIS.val.cm = D.data.commission;
							THIS.val.p = D.data.price;
							THIS.val.l = D.data.link;
							THIS.val.ad = D.data.address;
							THIS.val.ap = (D.data.reserved_status_id == 2) ? '0' : '1';
							THIS.publicLoad();
						}
					}, "json");
				},
				//______________________________________________________________________
				sav(THIS = this){
					let mod = (this.$route.params.id == undefined) ? 'create' : this.$route.params.id ;
					let url = (this.$route.params.id == undefined) ? 'list' : this.$route.params.id ;
					$.post(this.baseurl+"reserved/" + mod, { token: this.$localStorage.get("user"), val: this.val }, function(D){
						THIS.success(THIS);
						THIS.$router.replace('/reserved/user/' + url);
					}, "json");
				},
				//______________________________________________________________________
				publicLoad(THIS = this){
					$.post(this.baseurl+"all/public", { token: this.$localStorage.get("user"), }, function(D){
						THIS.publicData.teacher = D.data.teacher;
						THIS.publicData.knd_class = D.data.knd_class;
						THIS.publicData.user = D.data.user;
					}, "json");
					$.get(this.baseurl+'/field/list', { }, function(D){
						THIS.publicData.field = D.data;
					}, "json");
				},
				//______________________________________________________________________
				setBtn(mod){
					let text = '';
					let disb = '0';
					if(this.val.u == null || this.val.t == null || this.val.k == null || this.val.date == null || this.val.ss == null || this.val.se == null || this.val.c == null || this.val.f == null || this.val.d == null){
						disb = '1';
						text = 'اطلاعات را تکمیل نمایید';
					}
					if(this.val.k==3 && this.val.ad==null){
						disb = '1';
						text = 'آدرس محل تحصیل را مشخص کنید';
					}
					if(this.val.k == 2 && this.filter.validURL(this.val.l) && this.val.l != null){
						disb = '1';
						text = 'لینک ارسالی اشتباه است';
					}
					if(this.val.ap == '1' && this.val.p == null){
						disb = '1';
						text = 'هزینه کلاس را ثبت کنید';
					}
					if(this.val.ss > this.val.se){
						disb = '1';
						text = 'ساعت شروع باید کوچک تر از ساعت پایان باشد';
					}
					return ( mod == 1 ) ? disb : text;
				},
			}
		}
	</script>
<style>

</style>
