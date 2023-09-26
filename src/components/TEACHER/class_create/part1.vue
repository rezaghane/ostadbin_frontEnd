<template>
	<div class="w-100 p-3 bg-white border-15 h-center">
		<div style="width: 75%; max-width: 500px;">
			<datepicker
				label="انتخاب تاریخ"
				@input = "getInput($event, 'd')"
			/>
			<selectInput
				:value="val.l"
				:flds="lengthSession"
				@inputTxtFunc = "getInput($event, 'l')"
				label="طول هر جلسه(دقیقه)"
			/>
			<selectInput
				:value="val.b"
				:flds="breakTime"
				@inputTxtFunc = "getInput($event, 'b')"
				label="زنگ تفریح بین هر جلسه(دقیقه)"
			/>
			<selectInput
				:value="val.s"
				:flds="startSession"
				@inputTxtFunc = "getInput($event, 's')"
				label="ساعت شروع"
			/>
			<multiSelectInput
				@input="getInput($event, 'c')"
				:value="( val['c'].length==0 ) ? vlaTimeOptions(val.s, val.l, val.b) : val['c'] "
				:flds="timeOptions(val.s, val.l, val.b)"
				label="انتخاب جلسات"
			/>
			<multiSelectInput
				@input="getInput($event, 'k')"
				:flds="setKndClass()"
				label="نوع آموزش"
			/>
			<textInput
				@inputTxtFunc="getInput($event, 'p1')"
				type="number"
				label="قیمت هر جلسه حضوری (تومان)"
				v-if="val.k.includes(1)"
			/>
			<textInput
				@inputTxtFunc="getInput($event, 'p2')"
				type="number"
				label="قیمت هر جلسه آنلاین (تومان)"
				v-if="val.k.includes(2)"
			/>
			<textInput
				@inputTxtFunc="getInput($event, 'p3')"
				type="number"
				label="قیمت هر جلسه در منزل (تومان)"
				v-if="val.k.includes(3)"
			/>
			<btn
				class="pt-3 w-100"
				textClass="w-100"
				text="ذخیره"
				@clickMe="sav()"
			/>
		</div>
	</div>
</template>

	<script>
		import btn from  "../../UI/button/btn.vue";
		import textInput from  "../../UI/input/textInput.vue";
		import datepicker from  "../../UI/input/datepicker.vue";
		import multiSelectInput from  "../../UI/input/multiSelectInput.vue";
		import selectInput from  "../../UI/input/selectInput.vue";
		import textareaInput from  "../../UI/input/textareaInput.vue";
		import userImg from  "../../UI/userImg/userImg.vue";
		import pageNavigation from  "../../UI/pageNavigation/pageNavigation.vue";
		import previewImage from  "../../UI/uploadFile/previewImage.vue";
		import { loading, success, success_sm, error } from  "../../assets/library/messege.js";
		import { validateEmail, validatePhone } from  "../../assets/library/filter.js";
		import { time2minutes, minutes2time, classTime, timeOptions, vlaTimeOptions } from  "../../assets/library/convertTime.js";

		export default {
			name: 'self_part1',
			data(){
				return {
					imgurl: this.$localStorage.get('imgurl'),
					baseurl: this.$localStorage.get('baseurl'),
					success: success,
					success_sm: success_sm,
					error: error,
					loading: loading,
					validateEmail: validateEmail,
					validatePhone: validatePhone,
					time2minutes: time2minutes,
					minutes2time: minutes2time,
					classTime: classTime,
					timeOptions: timeOptions,
					vlaTimeOptions: vlaTimeOptions,
					startSession: [
					{id:"06:00", name: "06:00"},
					{id:"07:00", name: "07:00"},
					{id:"08:00", name: "08:00"},
					{id:"09:00", name: "09:00"},
					{id:"10:00", name: "10:00"},
					{id:"11:00", name: "11:00"},
					{id:"12:00", name: "12:00"},
					{id:"13:00", name: "13:00"},
					{id:"14:00", name: "14:00"},
					{id:"15:00", name: "15:00"},
					{id:"16:00", name: "16:00"},
					{id:"17:00", name: "17:00"},
					{id:"18:00", name: "18:00"},
					{id:"19:00", name: "19:00"},
					{id:"20:00", name: "20:00"},
					{id:"21:00", name: "21:00"},
					{id:"22:00", name: "22:00"},
					{id:"23:00", name: "23:00"},
					],
					lengthSession: [
					{id:30, name: "30 دقیقه"},
					{id:60, name: "60 دقیقه"},
					{id:90, name: "90 دقیقه"},
					{id:120, name: "120 دقیقه"},
					{id:150, name: "150 دقیقه"},
					{id:180, name: "180 دقیقه"},
					{id:210, name: "210 دقیقه"},
					{id:240, name: "240 دقیقه"},
					],
					breakTime: [
					{id:5, name: "05 دقیقه"},
					{id:10, name: "10 دقیقه"},
					{id:15, name: "15 دقیقه"},
					{id:30, name: "30 دقیقه"},
					{id:45, name: "45 دقیقه"},
					{id:60, name: "60 دقیقه"},
					],
					knd_class: [
					{id:1, name: "آموزش حضوری"},
					{id:2, name: "آموزش انلاین"},
					{id:3, name: "آموزش در منزل"},
					],
					val:{
						l: '',
						d: '',
						b: '',
						s: '',
						p1: '',
						p2: '',
						p3: '',
						c: [],
						k: [],
					},
				}
			},
			components: {
				btn,
				validateEmail,
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

			},
			methods:{
				//______________________________________________________________________
				getInput(e, knd){
					if(knd != 'k' && knd != 'p1' && knd != 'p2' && knd != 'p3'){
						this.val['c'] = [];
					}
					this.val[knd]=e;
				},
				//______________________________________________________________________
				setKndClass(){
					let KND = this.knd_class;
					if(this.val.k.includes(3)){
						KND = [
						{id:3, name: "آموزش در منزل"},
						];
					}else if(this.val.k.includes(1) || this.val.k.includes(2)){
						KND = [
						{id:1, name: "آموزش حضوری"},
						{id:2, name: "آموزش انلاین"},
						];
					}
					return KND;
				},
				//______________________________________________________________________
				sav(THIS = this){
					if(this.val.l=='' || this.val.d=='' || this.val.b=='' || this.val.s==''|| this.val.c.length==0 || this.val.k.length==0 ){
						THIS.error(THIS, 'اطلاعات را تکمیل نمایید');
					} else if((this.val.k.includes(1) && this.val.p1=='') || (this.val.k.includes(2) && this.val.p2=='') || (this.val.k.includes(3) && this.val.p3=='')){
						THIS.error(THIS, 'هزینه جلسات را مشخص کنید');
					} else {
						let classTime = [];
						for (let i = 0; i < this.val.c.length; i++) {
							classTime.push(this.classTime(this.val.s, this.val.l, this.val.b)[this.val.c[i]]);
						}
						this.savF(classTime);
					}
				},
				//______________________________________________________________________
				savF(classTime, THIS = this){
					let T = (this.$route.params.id == undefined) ? this.$localStorage.get("user").username.id : this.$route.params.id ;
					let U = (this.$route.params.id == undefined) ? '' : '/' + this.$route.params.id ;
					this.loading(this);
					$.post(this.baseurl+'classes/create', {
						token: this.$localStorage.get("user"),
						teacher: T,
						role: this.$localStorage.get('user').username.role,
						knd_class: this.val.k,
						date_class: this.val.d,
						times_class: classTime,
						price: [this.val.p1, this.val.p2, this.val.p3],
						form: this.val
					}, function(D){
						THIS.success(THIS);
						THIS.$router.replace('/class/list' + U);
					}, "json");
				},
				//______________________________________________________________________
			}
		}
	</script>
<style>

</style>
