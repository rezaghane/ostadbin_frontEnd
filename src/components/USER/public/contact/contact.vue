<template>
	<div style="background-color:#fffcf7; height: 100vh;">
		<headMenu />
		<div class="w-100 overflow-hidden p-3">
			<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 float-right p-3" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000"  v-if="windowWidth >= 767">
				<leftMenuPublic />
			</div>
			<back
				class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left"
				title="تماس با ما"
			/>
			<div
				class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left p-3 border-15 shadow bg-white text-center"
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
					<h2 v-if="index_text>-1">
						{{this.$localStorage.get('settings')[index_text].title}}
					</h2>
					<p class="text-justify" v-if="index_text>-1">
						{{this.$localStorage.get('settings')[index_text].dsc}}
					</p>
					<textInput autofocus="true" @inputTxtFunc="fullnameF" :val="val.fullname" placeholder="نام و نام خانوادگی" label="نام و نام خانوادگی" />
					<textInput type="number" @inputTxtFunc="mobileF" :val="val.mobile" textClass="" placeholder="تلفن تماس" label="تلفن تماس" />
					<textInput type="email" @inputTxtFunc="emailF" :val="val.email" placeholder="آدرس ایمیل" label="آدرس ایمیل" />
					<textInput @inputTxtFunc="textF" :val="val.text" placeholder="پیام خود را بنویسید" label="پیام خود را بنویسید" />
					<btn @clickMe="sav()" class="w-100 mt-3" textClass="w-100" text="ارسال پیام" />
				</div>
			</div>
			<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 float-right p-3" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000"  v-if="windowWidth < 767">
				<leftMenuPublic />
			</div>
		</div>
		<footer>

		</footer>
		<footerPage  />
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


	export default {
			name: 'teachers_id',
		data(){
			return {
				validateEmail: validateEmail,
				validatePhone: validatePhone,
				indexFinder: indexFinder,
				imgurl: this.$localStorage.get('imgurl'),
				baseurl: this.$localStorage.get('baseurl'),
				flds: [],
				degrees: [],
				category: [],
				location: [],
				img:{
				},
				val:{
					"fullname": "",
					"email": "",
					"mobile": "",
					"text": "",
				},
				index_text : -1

			}
		},
		components: {
				validateEmail,
				leftMenuPublic,
				btn,
				textInput,
				back,
				headMenu,
				footerPage,
		},
			props: [],
		mounted(){
			this.$swal.close();
			this.loader();
			this.index_text = this.indexFinder(this.$localStorage.get('settings'), "15");
		},
		methods:{
			sav(THIS=this){
				if(this.val.fullname=="" || this.val.email=="" || this.val.mobile=="" || this.val.text==""){
					THIS.$swal.fire({
							position: 'center',
							type: 'error',
							title: 'اطلاعات را تکمیل نمایید',
							timer: '1000',
							showConfirmButton: false
					});
				} else if(this.validateEmail(this.val.email)==false){
					THIS.$swal.fire({
							position: 'center',
							type: 'error',
							title: 'ایمیل اشتباه است',
							timer: '1000',
							showConfirmButton: false
					});
				}else if(this.validatePhone(this.val.mobile)==false){
					THIS.$swal.fire({
							position: 'center',
							type: 'error',
							title: 'شماره موبایل اشتباه است',
							timer: '1000',
							showConfirmButton: false
					});
				} else {
					$.post(this.baseurl + 'view/comment', { token: this.$localStorage.get("user"), fullname: this.val.fullname, email: this.val.email, mobile: this.val.mobile, text: this.val.text }, function(D){
						THIS.$swal.fire({
								position: 'center',
								type: 'success',
								title: 'ثبت شد',
								timer: '1000',
								showConfirmButton: false
						});
							THIS.val.fullname="";
							THIS.val.email="";
							THIS.val.mobile="";
							THIS.val.text="";
					}, "json");
				}
			},
			// *********************************************************************
			fullnameF(e){
				this.val.fullname = e;
			},
			// *********************************************************************
			mobileF(e){
				this.val.mobile = e;
			},
			// *********************************************************************
			emailF(e){
				this.val.email = e;
			},
			// *********************************************************************
			textF(e){
				this.val.text = e;
			},
			// *********************************************************************
			loader(THIS=this){
				$.get(this.baseurl+'view/teachers/'+this.$route.params.id, { }, function(D){
					THIS.flds = D;
				}, "json");
			}
				// *********************************************************************
		}
	}
</script>
<style>

</style>
