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
						یک پیامک حاوی
						رمز یکبار مصرف
						  برای شماره
						  موبایل زیر ارسال شده است، آن را وارد نمایید.
					</p>
					<h3 class="text-center h-center">
						<btn
							type=""
							textClass="text-success"
							@clickMe="edit()"
							text="ویرایش"
						/>
						{{signup.phone}}
					</h3>
					<textInput
						autofocus="true"
						@inputTxtFunc="(e)=>{ val.rand = e; }"
						:val="val.rand"
						label="رمز یکبار مصرف"
					/>
					<btn @clickMe="getPhone()" class="w-100 mt-3" textClass="w-100" text="ورود" />
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
								@clickMe="checkPhone()"
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
			name: 'oneTimePassword_check_phone',
		data(){
			return {
				validateEmail: validateEmail,
				validatePhone: validatePhone,
				error: error,
				minutes2time: minutes2time,
				imgurl: this.$localStorage.get('imgurl'),
				baseurl: this.$localStorage.get('baseurl'),
				sendSms: this.$localStorage.get('sendSms'),
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
					"phone": this.$localStorage.get('signup').phone,
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
			this.checkPhone();
		},
		methods:{
			userCheck(userPhone = this.val.phone, THIS = this){
				$.post(THIS.baseurl + "user/check", { token: this.$localStorage.get("user"),userPhone: userPhone }, function(D){
					if(D.data != '0'){
						if(THIS.validatePhone(userPhone)){
							THIS.signup = THIS.$localStorage.get('signup');
							THIS.signup.phone = userPhone;
							THIS.$localStorage.set('signup', THIS.signup);
							THIS.random();
						}
					}else{
						THIS.error(THIS, 'شماره تماس وارد شده قبلا در سیستم ثبت نام نکرده است')
					}
				}, "json");
			},
			// ***********************************************************************
			checkPhone(mobile = this.val.phone, THIS = this){
				this.time= '120';
				this.timer();
				$.post(this.baseurl + 'account/oneTimePassword', { token: this.$localStorage.get("user"), mobile: mobile }, function(D){
					if(D.ok==true){
						THIS.flds = D.data;
						THIS.sendSmsF(mobile);
					}else{
						THIS.$swal.fire({
								position: 'center',
								type: 'error',
								title: 'شماره تلفن همراه وارد شده قبلا در سیستم ثبت نشده است',
								timer: '2000',
								showConfirmButton: false
						});
					}
				}, "json");
			},
			// ***********************************************************************
			getPhone(THIS = this){
				if(THIS.val.rand!=''){
					let res = -1;
				  for(let i=0; i < THIS.flds.DATA.length; i++){
				    if(THIS.flds.DATA[i].password == THIS.val.rand) res = i;
				  }
					if(res == -1){
						THIS.$swal.fire({
									position: 'center',
									type: 'error',
									title: 'رمز یکبار مصرف وارد شده اشتباه است',
									timer: '2000',
									showConfirmButton: false
							});
					}else{
						THIS.login(THIS.flds.DATA[res].username);
					}
				}
			},
			// ***********************************************************************
			sendSmsF(phone, THIS = this){
				var txt = this.flds.text;
				$.post(this.sendSms, {token: this.$localStorage.get("user"), phn: phone, txt: txt }, function(data){
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
					inputValue: THIS.$localStorage.get('signup').phone
				}).then((result) => {
					if(result.value){
						THIS.userCheck(result.value);
					}
				})
			},
			// ***********************************************************************
			login(username, THIS=this){
				$.post(this.baseurl + 'account/oneTimePassword', { token: this.$localStorage.get("user"), username: username }, function(D){
					if(D.ok){
						THIS.$localStorage.set('user', D.data);
						if(THIS.urlPath != null){
							let url = THIS.urlPath;
							THIS.$router.push(url);
						}else{
							THIS.$router.push('/reserved/user/list');
						}
					}else{
						THIS.$swal.fire({
								position: 'center',
								type: 'error',
								title: 'کاربر یافت نشد',
								timer: '1000',
								showConfirmButton: false
						});
					}
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
		}
	}
</script>
<style>

</style>
