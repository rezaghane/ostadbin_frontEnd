<template>
	<div class="w-100 p-3 shadow bg-white border-15 h-center">
		<div style="width: 75%; max-width: 500px;">
			<selectInput
				:value="val.d"
				:flds="this.$localStorage.get('degrees').data"
				@inputTxtFunc = "(e)=>{val.d = e}"
				label="انتخاب دسته بندی"
			/>
			<selectInput
				:value="val.f"
				:flds="field.data"
				@inputTxtFunc = "(e)=>{val.f = e}"
				label="رشته تحصیلی"
			/>
			<selectInput
				:value="val.c"
				:flds="(val.d=='') ? [] : $localStorage.get('degrees').data[indexFinder($localStorage.get('degrees').data, val.d)].category"
				@inputTxtFunc = "(e)=>{val.c = e}"
				label="موضوع تدریس"
			/>
			<textInput
				@inputTxtFunc = "(e)=>{val.e = e}"
				:val="val.e"
				label="توضیحات(اختیاری)"
			/>
			<div class="w-100 overflow-hidden">
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right" :class="(windowWidth>770) ? 'pr-0' : 'p-0'">
					<selectInput
						:value="val.lP"
						:flds="location.data"
						@inputTxtFunc = "(e)=>{val.lP = e}"
						label="استان"
					/>
				</div>
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right" :class="(windowWidth>770) ? 'pl-0' : 'p-0'">
					<selectInput
						:value="val.lC"
						:flds="(val.lP==0)? [] : location.data[indexFinder(location.data, val.lP)].county"
						@inputTxtFunc = "(e)=>{val.lC = e}"
						label="شهر"
					/>
				</div>
			</div>
			<p class="text-success text-justify">
				<br  />
				مدت زمان تماس کارشناسان ما با شما حداکثر 2 ساعت پس از ثبت سفارش خواهد بود
			</p>
			<btn
				class="w-100"
				textClass="w-100"
				text="ثبت درخواست(رایگان)"
				:disable = "val.lP=='' || val.lC=='' || val.f=='' || val.d=='' || val.c==''"
				disableText="اطلاعات را تکمیل نمایید"
				@clickMe="sav()"
			/>
		</div>
	</div>
</template>

	<script>
		import btn from  "../../UI/button/btn.vue";
		import textInput from  "../../UI/input/textInput.vue";
		import selectInput from  "../../UI/input/selectInput.vue";
		import userImg from  "../../UI/userImg/userImg.vue";
		import pageNavigation from  "../../UI/pageNavigation/pageNavigation.vue";
		import previewImage from  "../../UI/uploadFile/previewImage.vue";
		import { indexFinder } from  "../../assets/library/filter.js";

		export default {
			name: 'self_part1',
			data(){
				return {
					imgurl: this.$localStorage.get('imgurl'),
					baseurl: this.$localStorage.get('baseurl'),
					location: {ok: false, data: []},
					degrees: {ok: false, data: []},
					field: {ok: false, data: []},
					category: {ok: false, data: []},
					username: [],
					indexFinder: indexFinder,
					val:{
						lP: '',
						lC: '',
						d: '',
						c: '',
						f: '',
						e: '',
					}
				}
			},
			components: {
				btn,
				textInput,
				selectInput,
				pageNavigation,
				userImg,
				previewImage,
			},
			props: {
				flds: {
					default: [],
				},
			},
			mounted(){
				this.getLocation();
			},
			methods:{
				getLocation(THIS = this){
					$.get(this.baseurl+'location/list', { }, function(D){
						THIS.location = D;
						THIS.getField();
					}, "json");
				},
				getField(THIS = this){
					$.get(this.baseurl+'field/list', { }, function(D){
						THIS.field = D;
					}, "json");
				},
				//**********************************************************************

				//**********************************************************************
				sav(THIS = this){
					let indexLP = this.indexFinder(this.location.data, this.val.lP);
					let indexLC = this.indexFinder(this.location.data[indexLP].county, this.val.lC);
					let loc = this.location.data[indexLP].name + " _ " + this.location.data[indexLP].county[indexLC].name;
					$.post(this.baseurl+'teachers/proposal', {
						token: this.$localStorage.get("user"),
						degre:  this.val.d,
						category:  this.val.c,
						field:  this.val.f,
						explain:  this.val.e,
						address:  loc,
						user:  this.$localStorage.get('user').username.id
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
						THIS.$router.push('/reserved/user/list');
					}, "json");
				},
			}
		}
	</script>
<style>

</style>
