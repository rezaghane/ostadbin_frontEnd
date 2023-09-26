<template>
	<div style="height: 100px;">
		<div class="phone" style="z-index: 100; position: fixed; width:98%; top:0px; right: 1%;">
			<div class="content">
				<nav role="navigation overflow-hidden" style="
					box-shadow: 0 0 5px 1px #888888;
				">
					<div class="float-right col-4  h-center" style="height:100%;">
						<img class="pointer" style="margin-top: 5px; height:50px; " :src="img.M3" @click="mnu1 = !mnu1;  mnu2 = false;"/>
					</div>

					<div class="float-right col-4 text-center  h-center" style="height:100%;">
						<img class="pointer" style="margin-top: 5px; width:100%; max-height: 65px;" :src="img.Logo_Header"/>
					</div>

					<div class="float-right col-4 text-left  h-center" style="height:100%;">
						<img class="pointer" style="margin-top: 5px; height:50px; " :src="img.M4" @click="mnu2 = !mnu2; mnu1 = false;" v-if="$localStorage.get('user')!=null"/>
					</div>
				</nav>

				<div
					class="text-center shadow"
					style="background: white;
					width: 50%;
					position: absolute;
					top: 65px;
					height: 90vh;
					border-left: 1px solid #eee;
					overflow: auto;"
					v-show="mnu1"
				>
					<img class="pointer" style="margin-top: 5px; width:75%; max-height: 65px;" :src="img.LogoFooter" />
					<hr class=" w-75" />
					<!-- ________________________________________________________________________ -->
					<router-link to="/" v-if="chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="خانه"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<router-link to="/teachers">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="مدرس ها"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<btn
						shadow="0"
						class="w-100"
						textClass="w-100 border-hover m-auto text-center"
						type="white"
						text="دسته بندی ها"
						:img="img.ArrowDown"
						@clickMe="shwCat = !shwCat"
					/>
					<router-link to="/teachers" v-show="shwCat">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-primary"
							type="white"
							text="همه"
							@mousemove="btnSelect = -2"
						/>
					</router-link>
					<span v-for="(f, i) in flds" :key="i" v-show="shwCat">
						<btn
							:img="img.ArrowDown"
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-left text-primary"
							:text="f.name"
							imgSize="10px"
							styleImg="position: absolute; left: 15px;"
							type="white"
							@clickMe="catNum=i"
						/>
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-left text-success"
							text="همه"
							imgSize="10px"
							styleImg="position: absolute; left: 15px;"
							type="white"
							@clickMe="$router.push({ path: '/teachers', query: {degrees: f.id}})"
							v-show="catNum==i"
						/>
						<btn
							v-for="(fc, j) in f.category" :key="j"
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-left text-success"
							:text="fc.name"
							imgSize="10px"
							styleImg="position: absolute; left: 15px;"
							type="white"
							@clickMe="$router.push({ path: '/teachers', query: {degrees: f.id, category: fc.id}})"
							v-show="catNum==i"
						/>
					</span>
					<!-- ________________________________________________________________________ -->
					<router-link to="/proposal" v-if="this.$localStorage.get('user')==null">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="پیشنهاد مدرس به شما"
						/>
					</router-link>
					<router-link to="/proposal" v-else-if="this.$localStorage.get('user').username.role==1">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="پیشنهاد مدرس به شما"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<router-link to="/aboutMe" v-if="chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="درباره ما"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<router-link to="/contact" v-if="chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="تماس با ما"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<router-link to="/getPhone" v-if="$localStorage.get('user')==null && chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="ثبت نام"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<router-link to="/login" v-if="$localStorage.get('user')==null && chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="ورود"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<router-link to="/charity">
						<btn
							textClass="w-100 border-hover m-auto text-center"
							type="outline-success"
							:img="require('../assets/img/love.png')"
							text="خیریه"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<router-link to="/signupTeacher" v-if="$localStorage.get('user')==null && chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center text-danger"
							type="white"
							text="مدرس شوید"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
				</div>

				<!-- ---------------------------------------------------------------------------------------- -->

				<div
					class="text-center shadow border-15"
					style="background: white;
					width: 50%;
					position: absolute;
					top: 70px;
					border-left: 1px solid #eee;
					left: 5;
					overflow: auto;"
					v-show="mnu2"
				>
					<!-- ________________________________________________________________________ -->
					<router-link to="/reserved/user/list">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="درخواست ها"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<router-link to="/users" v-if="!chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="کاربران"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<router-link to="/category/list" v-if="!chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="دسته بندی ها"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<router-link to="/degrees/list" v-if="!chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="مقاطع تحصیلی"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<router-link to="/field/list" v-if="!chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="رشته تحصیلی"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<router-link to="/category/list" v-if="!chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="موضوع درس"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<router-link to="/auditors/list" v-if="!chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="هیئت ممیزه"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<router-link to="/discount/list" v-if="!chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="تخفیف ها"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<router-link to="/payment/list" v-if="!chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="تراکنش های مالی"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<router-link to="/support/admin" v-if="!chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="پشتیبانی"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<router-link to="/support/chat" v-if="!chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="پیام ها"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
				<router-link to="/admin/list" v-if="!chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="مدیران"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
				<router-link to="/class/list" v-if="$localStorage.get('user')!=null && chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="مدیریت کلاس ها"
							 v-if="$localStorage.get('user').username.role=='2'"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
				<router-link to="/self" v-if="$localStorage.get('user')!=null && chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="ویرایش اطلاعات"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
				<router-link to="/self/setpass" v-if="$localStorage.get('user')!=null && chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="ویرایش کلمه عبور"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
				<router-link to="/pay/list" v-if="$localStorage.get('user')!=null && chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="تراکنش های مالی"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
				<router-link to="/chat/user/admin" v-if="$localStorage.get('user')!=null && chechRole()">
						<btn
							shadow="0"
							class="w-100"
							textClass="w-100 border-hover m-auto text-center"
							type="white"
							text="تماس با پشتیبانی"
						/>
					</router-link>
					<!-- ________________________________________________________________________ -->
					<btn
						shadow="0"
						class="w-100"
						textClass="w-100 border-hover m-auto text-center"
						type="outline-danger"
						text="خروج"
						v-if="$localStorage.get('user')!=null"
						@clickMe="exit()"
					/>
					<!-- ________________________________________________________________________ -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Logo_Header from '../assets/img/Logo_Header.svg';
	import M3 from '../assets/img/M3.svg';
	import M4 from '../assets/img/M4.svg';
	import ArrowDown from '../assets/img/Arrow_Down.svg';
	import LogoFooter from '../assets/img/Logo_Footer.svg';
	import btn from  "../UI/button/btn.vue";

	export default {
			name: 'menuMobile',
		data(){
			return {
				fileurl: window.location.origin.replace(":8081", ":8080")+"/biography/upload/",
				vcfurl: window.location.origin.replace(":8081", ":8080")+"/biography/vcf/",
				mnu1: false,
				mnu2: false,
				shwCat: false,
				phn: '',h:'',
				catNum: -1,
				img: {
					"Logo_Header": Logo_Header,
					"M3": M3,
					"M4": M4,
					"ArrowDown": ArrowDown,
					"LogoFooter": LogoFooter,
				}
			}
		},
			props: ["flds"],
		components: {
			btn,
		},
		mounted(){

		},
		methods:{
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
			//________________________________________________________________________
			exit(){
				this.$swal.fire({
					position: 'center',
					type: '',
					title: "خروج از حساب",
					html: "<div class='text-center w-75 m-auto'><hr/> آیا مطمئن هستید می خواهید از حساب کاربری خود خارج شوید.</div>",
					showCloseButton: true,
					showConfirmButton: true,
					confirmButtonText: "خیر",
					confirmButtonClass:"btn btn-outline-success border w-50",
					showCancelButton: true,
					cancelButtonText: "بلی خروج!",
					cancelButtonClass:"btn btn-danger w-50",
				}).then((result) => {
					if (result.dismiss=="cancel") {
						this.$localStorage.remove('user');
						this.$router.push('/');
					}
				})
			}
		}
	}
	</script>

<style scope>
	@import "mobile.css";
</style>
