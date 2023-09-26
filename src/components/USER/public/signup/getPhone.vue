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
						ثبت نام در  استادبین
					</h2>
					<textInput
						type="number"
						:val="val.mobile"
						placeholder="شماره موبایل"
						label="شماره موبایل"
						@inputTxtFunc="(e)=>{ val.mobile = e }"
					/>
					<p class="mt-3">
						ثبت نام شما به منزله پذیرش
						<span class="pointer text-success" style="text-decoration: underline;" @click="showRule()">
							قوانین و مقررات
						</span>
						می باشد.
					</p>
					<btn
						@clickMe="sav()"
						class="w-100 mt-3"
						textClass="w-100"
						text="ثبت نام"
					/>
					<br/>
					<br/>

					<div class="overflow-hidden" v-if="chechRole()">
						<div class="float-right" style="display: flex; align-items: center; height: 40;">
							قبلا ثبت نام کرده اید؟
						</div>
						<router-link to="/login">
							<btn type="outline-success" class="float-left" text="ورود" />
						</router-link>
					</div>
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
	import { validateEmail, validatePhone, indexFinder } from  "../../../assets/library/filter.js";
	import { textRule } from  "../../../assets/text/rule.js";
	import { error } from  "../../../assets/library/messege.js";

	export default {
			name: 'teachers_id',
		data(){
			return {
				error: error,
				validateEmail: validateEmail,
				validatePhone: validatePhone,
				indexFinder: indexFinder,
				textRule: textRule,
				imgurl: this.$localStorage.get('imgurl'),
				baseurl: this.$localStorage.get('baseurl'),
				flds: [],
				degrees: [],
				category: [],
				location: [],
				val:{
					"mobile": "",
				},

			}
		},
		components: {
			error,
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
			showRule(THIS = this){
				var index_text = this.indexFinder(this.$localStorage.get('settings'), "3");
				THIS.$swal.fire({
						position: 'center',
						type: '',
					html: "<p class='text-justify'>" + this.$localStorage.get('settings')[index_text].dsc + "</p>" ,
						width: '80%',
					title: this.$localStorage.get('settings')[index_text].title,
						showCloseButton: true,
						showConfirmButton: true,
						confirmButtonText: "بستن",
				});
			},
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
					token: this.$localStorage.get("user"), 
					username: this.val.username,
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
						THIS.error(THIS, 'نام کاربری تکراری است');
					}
				}, "json");
			},
			// *********************************************************************
			sav(THIS=this){
				if(this.val.mobile==""){
					THIS.error(THIS, 'اطلاعات را تکمیل نمایید');
				} else if(!this.validatePhone(this.val.mobile)){
					THIS.error(THIS, 'شماره موبایل اشتباه است');
				} else {
					$.post(THIS.baseurl + "user/check", { token: this.$localStorage.get("user"), userPhone: THIS.val.mobile }, function(D){
						if(D.data == '0'){
							THIS.$localStorage.set('signup', THIS.val);
							THIS.$router.push('/check/phone');
						}else{
							THIS.val.mobile = '';
							THIS.error(THIS, 'شماره تماس وارد شده قبلا در سیستم ثبت نام کرده است')
						}
					}, "json");
				}
			},
			// *********************************************************************
		}
	}
</script>
<style>

</style>
