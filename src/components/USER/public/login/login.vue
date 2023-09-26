<template>
	<div style="background-color:#fffcf7; height: 100vh;">
		<headMenu />
		<div
		id="main"
		class="w-100 overflow-hidden p-3"
		:class=" (urlPath == '/proposal') ? '' : 'h-center' "
		>
			<leftMenuPublic
				class="col-lg-3 col-md-3 float-right"
				:urlPath = "urlPath"
				v-if="urlPath == '/proposal'"
			/>
			<div
				class=" col-sm-12 col-xs-12 p-3 border-15 shadow bg-white text-center float-right"
				:class=" (urlPath == '/proposal') ? 'col-lg-9 col-md-9 ' : 'col-lg-12 col-md-12 ' "
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
						ورود به استادبین
					</h2>
					<textInput
						autofocus="true"
						@inputTxtFunc="usernameF"
						:val="val.username"
						label="نام کاربری"
					/>
					<textInput
						type="password"
						@inputTxtFunc="passwordF"
						@enter="login()"
						:val="val.password"
						label="کلمه عبور"
					/>
					<btn
						type=""
						dir="ltr"
						class="mt-3"
						textClass="text-success"
						@clickMe="getPhone()"
						text="کلمه عبور را فراموش کرده ام"
					/>
					<btn
						@clickMe="login()"
						class="w-100 mt-3"
						textClass="w-100"
						text="ورود"
					/>
					<router-link to="/oneTimePassword">
					<btn
						class="w-100 mt-3"
						type="white"
						textClass="w-100 text-success"
						text="ورود با رمز یکبار مصرف"
					/>
				</router-link>
					<br/>

					<div class="overflow-hidden">
						<div class="float-right" style="display: flex; align-items: center; height: 40;">
							قبلا ثبت نام نکرده اید؟
						</div>
						<router-link to="/getPhone">
							<btn type="outline-success" class="float-left" text="ثبت نام" />
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<!-- <footerPage /> -->
		<footerPage
			style="position: absolute; width: 100%;"
		/>
	</div>
</template>

<script>
	import textInput from  "../../../UI/input/textInput.vue";
	import footerPage from  "../../../UI/footer/footer.vue";
	import back from  "../../../UI/back/back.vue";
	import btn from  "../../../UI/button/btn.vue";
	import headMenu from  "../../../menu/headMenu.vue";
	import { validateEmail, validatePhone } from  "../../../assets/library/filter.js";
	import leftMenuPublic from  "../../../menu/leftMenuPublic.vue";

	export default {
			name: 'Login',
		data(){
			return {
				imgurl: this.$localStorage.get('imgurl'),
				baseurl: this.$localStorage.get('baseurl'),
				sendSms: this.$localStorage.get('sendSms'),
				flds: [],
				degrees: [],
				category: [],
				location: [],
				urlPath: null,
				val:{
					"username": "",
					"password": "",
				},
			}
		},
		components: {
				btn,
				textInput,
				back,
				headMenu,
				footerPage,
				leftMenuPublic,
		},
			props: [],
		mounted(){
			this.$swal.close();
			if(this.$localStorage.get('urlPath') != null){
				this.urlPath = this.$localStorage.get('urlPath');
				this.$localStorage.remove('urlPath');
			}
		},
		methods:{
			// *********************************************************************
			getUsername(phone, THIS = this){
				$.post(this.baseurl + 'account/recovery', { token: this.$localStorage.get("user"),mobile: phone, }, function(data){

					if(data.OK){
						THIS.$swal.fire({
								position: 'center',
								type: 'error',
								title: 'شماره تلفن همراه وارد شده قبلا در سیستم ثبت نشده است',
								timer: '2000',
								showConfirmButton: false
						});
					}else{
						THIS.checkPhone(data.data, phone);
					}
				}, "json");
			},
			// *********************************************************************
			sendSmsF(txt, phone, THIS = this){
				$.post(this.sendSms, { token: this.$localStorage.get("user"), phn: phone, txt: txt }, function(data){
				}, "json");
				THIS.$swal.fire({
					position: 'center',
					type: '',
					title: 'ارسال شد',
					html: `<hr/><div class='text-center'>یک کلمه عبور برای شماره موبایل شما ارسال شد که می توانید آنرا ویرایش کنید.</div>`,
					showConfirmButton: true,
					confirmButtonText: "ادامه",
					confirmButtonClass: "btn btn-success w-100",
					showCloseButton: true,
					timer: '5000',
				});
			},
			// *********************************************************************
			checkPhone(txt, phone, THIS = this){
				$.post(this.baseurl + 'user/check', { token: this.$localStorage.get("user"), phone: phone }, function(D){
					if(D.data > 0){
						THIS.sendSmsF(txt, phone);
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
			// *********************************************************************
			getPhone(THIS = this){
				this.$swal.fire({
					title: 'فراموشی کلمه عبور',
					html:"<div class='text-center'>لطفا شماره تلفن همراهی که قبلا با آن ثبت نام کرده بودید را وارد نمایید.</div>",
					showCancelButton: true,
					showCloseButton: true,
					confirmButtonText: 'ورود',
					confirmButtonClass: 'w-50 btn btn-success text-center',
					cancelButtonText: 'بازگشت',
					cancelButtonClass: 'w-50 btn btn-orange text-center',
					width: "70%",
					input: 'number',
					inputClass: 'yekan',
					inputPlaceholder: 'شماره موبایل',
					inputValue: '',
					inputClass: 'minW text-center',
				}).then((result) => {
					if(result.value){
						if(validatePhone(result.value)){
							THIS.getUsername(result.value);
						}else{
							THIS.$swal.fire({
									position: 'center',
									type: 'error',
									title: 'شماره تلفن همراه وارد شده اشتباه است',
									timer: '2000',
									showConfirmButton: false
							});
						}
					}
				})
			},
			// *********************************************************************
			login(THIS=this){
				$.post(this.baseurl + 'account/login', { token: this.$localStorage.get("user"), username: this.val.username, password: this.val.password }, function(D){
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
			// *********************************************************************
			passwordF(e){
				this.val.password = e;
			},
			// *********************************************************************
			usernameF(e){
				this.val.username = e;
			},
				// *********************************************************************
		}
	}
</script>
<style>
	.minW{
		min-width: 98%;
	}
</style>
