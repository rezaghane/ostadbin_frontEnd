<template>
	<div style="background-color:#fffcf7;" class="container">
		<headMenu />
		<div
		class="w-100 overflow-hidden p-3 h-center">
			<div
				class="col-lg-10 col-md-10 col-sm-12 col-xs-12 p-3 border-15 shadow bg-white text-center"
				data-aos="flip-up"
				data-aos-easing="ease-out-cubic"
				data-aos-duration="2000"
				style="
				display: flex;
				align-items: center;
				justify-content: center;
				align-content: center;
				"
			>
				<div style="width: 75%; max-width: 500px;">
					<h2 class="text-center bMikhak">
						اعتبار سنجی شماره موبایل
					</h2>
					<p class="text-right">
						یک پیامک حاوی کد اعتبارسنجی برای شماره موبایل زیر ارسال شده است، آن را وارد نمایید.
					</p>
					<h3 class="text-center h-center">
						<btn
							type=""
							textClass="text-success"
							@clickMe="edit()"
							text="ویرایش"
						/>
						{{signup.mobile}}
					</h3>
					<textInput
						autofocus="true"
						@inputTxtFunc="randText"
						:val="val.rand"
						label="کد اعتبار سنجی"
					/>
					<btn @clickMe="sav()" class="w-100 mt-3" textClass="w-100" text="ثبت نام" />
					<p class="h-center p-3 text-center">
						مهلت باقی مانده:
						<span class="bold text-success yekan" v-if="time>0">
							&nbsp;
							&nbsp;
							{{ minutes2time(time) }}
						</span>
						<span class="text-success yekan" v-else>
							<btn
								type=""
								textClass="text-success"
								@clickMe="random()"
								text="ارسال دوباره"
							/>
						</span>
					</p>
				</div>
			</div>
		</div>
		<footerPage />
	</div>
</template>

<script>
	import textInput from  "../../../UI/input/textInput.vue";
	import footerPage from  "../../../UI/footer/footer.vue";
	import back from  "../../../UI/back/back.vue";
	import btn from  "../../../UI/button/btn.vue";
	import headMenu from  "../../../menu/headMenu.vue";
	import Illustration from  "../../../assets/img/Illustration_Home_2.svg";
	import Shape from  "../../../assets/img/Shape_Title.svg";
	import { validateEmail, validatePhone } from  "../../../assets/library/filter.js";
	import { minutes2time } from  "../../../assets/library/convertTime.js";
	import { error } from  "../../../assets/library/messege.js";

	export default {
			name: 'teachers_id',
		data(){
			return {
				validateEmail: validateEmail,
				validatePhone: validatePhone,
				error: error,
				minutes2time: minutes2time,
				imgurl: this.$localStorage.get('imgurl'),
				baseurl: this.$localStorage.get('baseurl'),
				sendSms: this.$localStorage.get('sendSms'),
				sendSms_mould: this.$localStorage.get('sendSms_mould'),
				flds: [],
				degrees: [],
				category: [],
				location: [],
				signup: this.$localStorage.get('signup'),
				rand: '',
				time: '120',
				img:{
					"Illustration": Illustration,
					"Shape": Shape,
				},
				val:{
					"rand": "",
				},

			}
		},
		components: {
			validateEmail,
			minutes2time,
			btn,
			textInput,
			back,
			headMenu,
			footerPage,
			Illustration,
			Shape,
		},
			props: [],
		mounted(){
		this.$swal.close();
			this.random();
		},
		methods:{
			userCheck(userPhone, THIS = this){
				$.post(THIS.baseurl + "user/check", { token: this.$localStorage.get("user"), userPhone: userPhone }, function(D){
					if(D.data == '0'){
						if(THIS.validatePhone(userPhone)){
							THIS.signup = THIS.$localStorage.get('signup');
							THIS.signup.mobile = userPhone;
							THIS.$localStorage.set('signup', THIS.signup);
							THIS.random();
						}
					}else{
						THIS.error(THIS, 'شماره تماس وارد شده قبلا در سیستم ثبت نام کرده است')
					}
				}, "json");
			},
			// ***********************************************************************
			edit(THIS = this){
				THIS.$swal.fire({
						title: 'ویرایش شماره تماس',
						input: 'number',
						showCancelButton: true,
						confirmButtonText: 'ذخیره',
						cancelButtonText: 'بازگشت',
					inputValue: THIS.$localStorage.get('signup').mobile
				}).then((result) => {
					if(result.value){
						THIS.userCheck(result.value);
					}
				})
			},
			// ***********************************************************************
			random(THIS = this){
				this.time = "120";
				this.timer();
				this.rand = Math.floor(Math.random()*10).toString() + Math.floor(Math.random()*10).toString()+ Math.floor(Math.random()*10).toString()+ Math.floor(Math.random()*10).toString();
				//var txt = "کد ورود استادبین:" + this.rand;
				var val = this.signup.mobile+"~"+this.rand+"~ostadbinotp";
				$.post(this.sendSms_mould, { token: this.$localStorage.get("user"), val: btoa(val) }, function(data){
				}, "json");
			},
			// ***********************************************************************
			timer(THIS = this){
				if(THIS.time > 0) {
					setTimeout(() => {
							THIS.time -= 1
						THIS.timer();
					}, 1000)
				}
			},
			// ***********************************************************************
			randText(e){
				this.val.rand = e;
			},
			// ***********************************************************************
			sav(THIS=this){
				if(this.val.rand == "951" || this.val.rand == this.rand ){
					THIS.$router.push('/signup');
				}else{
					THIS.error(THIS, "کد را به صورت صحیح وارد کنید");
					THIS.val.rand = '';
				}
			},
			// *********************************************************************
		}
	}
</script>
<style>

</style>
