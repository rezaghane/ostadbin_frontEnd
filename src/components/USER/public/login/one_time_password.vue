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
						type="number"
						@inputTxtFunc="(e)=>{ val.phone = e; }"
						@enter="( !validatePhone(val.phone) ) ? '' : checkPhone() "
						:val="val.phone"
						label="شماره موبایل"
					/>

					<btn
						@clickMe="sav()"
						class="w-100 mt-3"
						textClass="w-100"
						text="ورود"
						:disable = " ( !validatePhone(val.phone) ) ? '1' : '0' "
						disableText = "شماره موبایل وارد شده اشتباه است"
					/>
					<!-- :disable = " ( !validatePhone(val.phone) ) ? '1' : '0' " -->
					<router-link to="/login">
						<btn
							class="w-100 mt-3"
							type="white"
							textClass="w-100 text-success"
							text="ورود با نام کاربری"
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
	import { validateEmail, validatePhone, indexFinder } from  "../../../assets/library/filter.js";
	import leftMenuPublic from  "../../../menu/leftMenuPublic.vue";
	import { error } from  "../../../assets/library/messege.js";

	export default {
			name: 'one_time_password',
		data(){
			return {
				error: error,
				validatePhone: validatePhone,
				indexFinder: indexFinder,
				imgurl: this.$localStorage.get('imgurl'),
				baseurl: this.$localStorage.get('baseurl'),
				sendSms: this.$localStorage.get('sendSms'),
				flds: [],
				degrees: [],
				category: [],
				location: [],
				urlPath: null,
				val:{
					"phone": "",
				},

			}
		},
		components: {
			error,
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
			sav(THIS=this){
				if(this.val.phone==""){
					THIS.error(THIS, 'اطلاعات را تکمیل نمایید');
				} else if(!this.validatePhone(this.val.phone)){
					THIS.error(THIS, 'شماره موبایل اشتباه است');
				} else {
					$.post(THIS.baseurl + "user/check", { token: this.$localStorage.get("user"), userPhone: THIS.val.phone }, function(D){
						if(D.data != '0'){
							THIS.$localStorage.set('signup', THIS.val);
							THIS.$router.push('/oneTimePassword/check/phone');
						}else{
							THIS.val.phone = '';
							THIS.error(THIS, 'شماره تماس وارد شده قبلا در سیستم ثبت نام نکرده است')
						}
					}, "json");
				}
			},
			// *********************************************************************

			// *********************************************************************

			// *********************************************************************

			// *********************************************************************
			
			// *********************************************************************
		}
	}
</script>
<style>
	.minW{
		min-width: 98%;
	}
</style>
