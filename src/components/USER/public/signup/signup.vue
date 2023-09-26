<template>
	<div style="background-color:#fffcf7;" class="container">
		<headMenu />
		<div
		class="w-100 overflow-hidden p-3 h-center">
			<leftMenuUser
				class="col-lg-3 col-md-3 float-left"
				select="1"
				v-if="!chechRole()"
			/>
			<div
				class="col-lg-9 col-md-9 col-sm-12 col-xs-12 p-3 border-15 shadow bg-white text-center"
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
						تکمیل ثبت نام
					</h2>
					<textInput autofocus="true" @inputTxtFunc="fullnameF" :val="val.fullname" placeholder="نام و نام خانوادگی" label="نام و نام خانوادگی" />
					<textInput @inputTxtFunc="emailF" :val="val.email" placeholder="ایمیل (اختیاری)" label="ایمیل (اختیاری)" />
					<textInput @inputTxtFunc="usernameF" :val="val.username" placeholder="نام کاربری" label="نام کاربری" />
					<textInput type="password" @inputTxtFunc="passwordF" :val="val.password" placeholder="کلمه عبور" label="کلمه عبور" />
					<textInput type="password" @inputTxtFunc="password2F" :val="val.password2" placeholder="تکرار کلمه عبور" label="تکرار کلمه عبور" />
					<btn @clickMe="sav()" class="w-100 mt-3" textClass="w-100" text="ثبت نام" />
					<br/>
					<br/>
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
	import leftMenuUser from  "../../../menu/leftMenuUser.vue";
	import { validateEmail, validatePhone } from  "../../../assets/library/filter.js";

	export default {
			name: 'teachers_id',
		data(){
			return {
				validateEmail: validateEmail,
				validatePhone: validatePhone,
				imgurl: this.$localStorage.get('imgurl'),
				baseurl: this.$localStorage.get('baseurl'),
				flds: [],
				degrees: [],
				category: [],
				location: [],
				val:{
					"fullname": "",
					"mobile": this.$localStorage.get('signup').mobile,
					"email": "",
					"username": "",
					"password": "",
					"password2": "",
				},

			}
		},
		components: {
			validateEmail,
			validateEmail,
			btn,
			textInput,
			back,
			headMenu,
			footerPage,
			leftMenuUser,
		},
			props: [],
		mounted(){
		this.$swal.close();

		},
		methods:{
			// *********************************************************************
			chechRole(){
				let user = this.$localStorage.get('user');
				if(user == null){
					return true;
				}else if(user.username.role != 3){
					return true;
				}else{
					return false;
				}
			},
			// *********************************************************************
			savF(THIS=this){
				$.post(this.baseurl + 'account/signup', {
					token: this.$localStorage.get("user"), username: this.val.username,
					password: this.val.password,
					fullname: this.val.fullname,
					email: this.val.email,
					mobile: this.val.mobile
				}, function(D){
					if(D.ok){
						if(THIS.chechRole()){
							THIS.$localStorage.set('user', D.data);
							if(THIS.$localStorage.get('urlPath')!=null){
								let url = THIS.$localStorage.get('urlPath');
								THIS.$localStorage.remove('urlPath');
								THIS.$router.push(url);
							}else{
								THIS.$router.push('/reserved/user/list');
							}
						}else{
							THIS.$router.push('/users');
						}
					}else{
						THIS.$swal.fire({
								position: 'center',
								type: 'error',
								title: 'نام کاربری تکراری است',
								timer: '1000',
								showConfirmButton: false
						});
					}
				}, "json");
			},
			// *********************************************************************
			sav(THIS=this){
				if(this.val.fullname=="" || this.val.mobile=="" || this.val.username=="" || this.val.password=="" || this.val.password2==""){
					THIS.$swal.fire({
							position: 'center',
							type: 'error',
							title: 'اطلاعات را تکمیل نمایید',
							timer: '1000',
							showConfirmButton: false
					});
				} else if(!this.validateEmail(this.val.email) && this.val.email!=""){
					THIS.$swal.fire({
							position: 'center',
							type: 'error',
							title: 'ایمیل اشتباه است',
							timer: '1000',
							showConfirmButton: false
					});
				}else if(!this.validatePhone(this.val.mobile)){
					THIS.$swal.fire({
							position: 'center',
							type: 'error',
							title: 'شماره موبایل اشتباه است',
							timer: '1000',
							showConfirmButton: false
					});
				} else if(this.val.password != this.val.password2){
					THIS.$swal.fire({
							position: 'center',
							type: 'error',
							title: 'کلمات عبور برابر نیستند',
							timer: '1000',
							showConfirmButton: false
					});
				} else {
					$.post(this.baseurl + 'account/duplicate', { token: this.$localStorage.get("user"), username: this.val.username }, function(D){
						if(D.data=='0'){
							// if (THIS.chechRole() == true) {
							// 	THIS.$localStorage.set('signup', THIS.val);
							// 	THIS.$router.push('/check/phone');
							// }else{
								THIS.savF();
							// }
						}else{
							THIS.$swal.fire({
									position: 'center',
									type: 'error',
									title: 'نام کاربری تکراری است',
									timer: '1000',
									showConfirmButton: false
							});
						}
					}, "json");
				}
			},
			// *********************************************************************
			emailF(e){ this.val.email = e; },
			// *********************************************************************
			mobileF(e){ this.val.mobile = e; },
			// *********************************************************************
			fullnameF(e){ this.val.fullname = e; },
			// *********************************************************************
			passwordF(e){ this.val.password = e; },
			// *********************************************************************
			password2F(e){ this.val.password2 = e; },
			// *********************************************************************
			usernameF(e){ this.val.username = e; },
			// *********************************************************************
		}
	}
</script>
<style>

</style>
