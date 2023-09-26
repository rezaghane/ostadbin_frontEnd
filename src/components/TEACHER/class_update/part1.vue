<template>
	<div class="w-100 p-3 bg-white border-15 h-center">
		<div style="width: 75%; max-width: 500px;">
			<h3 class="bMikhak">
				مدیریت کلاس
			</h3>
			<switchInput
				:value="flds.status"
				:label="'کلاس موجود در تاریخ: '+flds.date_class"
				@input="getInput($event, 'd')"
				icon="calendar"
			/>
			<hr/>
			<h3 class="bMikhak">
				مدیریت ساعات کلاس
			</h3>
			<switchInput
				v-for="(f, i) in flds.times_class"
				:key="i"
				:label="'از ساعت ' + f.start + ' تا ساعت ' + f.end"
				icon="clock"
				:value="f.status"
				@input="setTimesClass($event, i)"
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
					val:{
						d: 1,
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
		this.$swal.close();
			},
			methods:{
				setTimesClass(e, id){
					this.flds.times_class[id].status = e;
					this.sav();
				},
				//______________________________________________________________________
				getInput(e, knd){
					this.flds.status = e;
					this.sav();
				},
				//______________________________________________________________________
				sav(THIS = this){
					THIS.$swal.fire({
						position: 'center',
						type: 'success',
						title: "لطفا صبر کنید",
						showCancelButton: false,
						showConfirmButton: false,
					})
					$.post(this.baseurl+'classes/'+this.$route.params.id, {
					token: this.$localStorage.get("user"),
						role: this.$localStorage.get('user').username.role,
						teacher: this.$localStorage.get('user').username.id,
						status: this.flds.status,
						times_class: this.flds.times_class,
					}, function(D){
						THIS.$swal.fire({
							position: 'center',
							type: 'success',
							title: "ثبت شد",
							showCloseButton: true,
							showCancelButton: false,
							showConfirmButton: false,
							timer: 2000,
						})
						// THIS.$router.push('/class/list');
					}, "json");
				},
			}
		}
	</script>
<style>

</style>
