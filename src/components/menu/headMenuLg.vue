<template>
	<div class="p-3" >
		<div
			class="p-3 shadow border-15 overflow-hidden bg-white"
			style="z-index: 100; position: fixed; width:98%; top:0px; max-width: 1320px;"
			:style="'right: ' + (100 - ( 1330 / windowWidth * 100 ))/2 + '%;'"
		>
			<router-link to="/" class="float-right">
				<img
					height="35px;"
					:src="img.Logo_Header"
					alt="استادبین"
					title="استادبین"
				/>
			</router-link>
			<router-link to="/" class="float-right">
				<btn
					type="white"
				  text="خانه"
					shadow="0"
					class="float-right"
					textClass="w-100 border-hover m-auto text-center"
				/>
			</router-link>
			<router-link to="/teachers" class="float-right">
				<btn
					type="white"
					text="مدرس ها"
					shadow="0"
					class="float-right"
					textClass="w-100 border-hover m-auto text-center"
				/>
			</router-link>
			<btn
				shadow="0"
				class="float-right"
				textClass="w-100 border-hover m-auto text-center"
				type="white"
				:img="img.ArrowDown"
				function="setMgt"
				@setMgt = "setMgt()"
				text="دسته بندی ها"
				id_btn="degrees"
			/>
			<router-link to="/proposal" class="float-right" v-if="this.$localStorage.get('user')==null">
				<btn
					shadow="0"
					class="float-right"
					textClass="w-100 border-hover m-auto text-center"
					type="white"
					text="پیشنهاد مدرس به شما"
				/>
			</router-link>
			<router-link to="/proposal" class="float-right" v-else-if="this.$localStorage.get('user').username.role==1">
				<btn
					shadow="0"
					class="float-right"
					textClass="w-100 border-hover m-auto text-center"
					type="white"
					text="پیشنهاد مدرس به شما"
				/>
			</router-link>

			<router-link to="/aboutMe" class="float-right">
				<btn
					shadow="0"
					class="float-right"
					textClass="w-100 border-hover m-auto text-center"
					type="white"
					text="درباره ما"
				/>
			</router-link>
			<router-link to="/contact" class="float-right">
				<btn
					shadow="0"
					class="float-right"
					textClass="w-100 border-hover m-auto text-center"
					type="white"
					text="تماس با ما"
				/>
			</router-link>
			<router-link to="/charity" class="float-right" >
				<btn
					textClass="w-100 border-hover m-auto text-center"
					type="outline-success"
					:img="require('../assets/img/love.png')"
					text="خیریه"
				/>
			</router-link>
			<router-link to="/signupTeacher" class="float-right" v-if="$localStorage.get('user')==null">
				<btn
					class="float-right"
					textClass="w-100 border-hover m-auto text-center"
					type="outline-danger"
					text="مدرس شوید"
				/>
			</router-link>

			<router-link to="/getPhone" class="float-left" v-if="$localStorage.get('user')==null">
				<btn type="success" text="ثبت نام" />
			</router-link>
			<router-link to="/login" class="float-left" v-if="$localStorage.get('user')==null">
				<btn type="white" text="ورود" textClass="text-success" />
			</router-link>
			<btn
				type="success"
				text="حساب کاربری"
				@clickMe="userL = !userL"
				class="float-left"
				v-if="$localStorage.get('user')!=null"
			/>
		</div>
		<!-- ---------------------------------------------------------------------- -->
		<!-- :style="'height: '+ (flds.length + 1) * 44 +'px;'" -->
		<div
			class="bg-white shadow mt-2 border-15 pt-3 pb-3 border"
			style="position: fixed; z-index:100; width: 200px; top: 50px; overflow-y: auto; max-height: 90vh; "
			:style="('height: '+ (flds.length + 1) * 44 +'px;') + 'left:' + set_degrees_margin()+'; ' + ((btnSelect == -2) ? '' : 'border-top-left-radius: 0px !important; border-bottom-left-radius: 0px !important;')"
			data-aos="fade-down"
			data-aos-duration="1500"
			v-if="mgt"
		>
			<router-link to="/teachers" >
				<btn
					shadow="0"
					class="w-100"
					textClass="w-100 border-hover m-auto"
					type="white"
					text="همه"
					@mousemove="btnSelect = -2"
				/>
			</router-link>
			<router-link v-for="(f, i) in flds" :key="i" :to="{ path: '/teachers', query: {degrees: f.id}}">
				<btn
					shadow="0"
					class="w-100"
					textClass="w-100 border-hover m-auto text-left"
					:text="f.name"
					:img="require('../assets/img/Arrow_Left2.svg')"
					imgSize="10px"
					styleImg="position: absolute; left: 15px;"
					@mousemove="btnSelect = i"
					:type="(btnSelect == i) ? 'outline-success' : 'white'"
				/>
			</router-link>
		</div>
		<!-- ----------------------------------------------------------------- -->
		<!-- :style="'margin-top: ' + (80 + (btnSelect * 45)) + 'px !important;'" -->
		<div
			class="bg-white shadow mt-2 border-15 pt-3 pb-3 border"
			style="position: fixed; z-index:100; width: 200px; top: 50px; border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important; max-height: 90vh; overflow-y: auto;"
			:style="'height: '+ (flds.length + 1) * 44 +'px;' + 'left:' + set_degrees_margin(-200)+'; '"
			data-aos="zoom-in-left"
			v-if="btnSelect!=-2 &&  mgt"
			@mouseleave="btnSelect = -2;"
		>
			<router-link v-for="(f, j) in flds[btnSelect].category" :key="j" :to="{ path: '/teachers', query: {degrees: flds[btnSelect].id, category: f.id}}">
				<btn
					shadow="0"
					class="w-100"
					textClass="w-100 border-hover m-auto text-left"
					type="white"
					:text="f.name"
					imgSize="10px"
					styleImg="position: absolute; left: 15px;"
					@mousemove="btnSelect2 = j"
					:type="(btnSelect2 == j) ? 'outline-success' : 'white'"
				/>
			</router-link>
		</div>
		<div
			class="bg-white shadow mt-2 col-3 border-15 pt-3 pb-3"
			style="position: fixed; z-index: 100; top: 75px; width: 98%; left: 1%; "
			data-aos="fade-down"
			data-aos-duration="1500"
			v-if="userL"
		>
			<router-link to="/reserved/user/list" >
				<btn
					shadow="0"
					class="w-100"
					textClass="w-100 border-hover m-auto text-center"
					type="white"
					text="در خواست های من"
				/>
			</router-link>
			<router-link to="/class/list" >
				<btn
					shadow="0"
					class="w-100"
					textClass="w-100 border-hover m-auto text-center"
					type="white"
					text="مدیریت کلاس ها"
					v-if="this.$localStorage.get('user').username.role=='2'"
				/>
			</router-link>
			<router-link to="/self" >
				<btn
					shadow="0"
					class="w-100"
					textClass="w-100 border-hover m-auto text-center"
					type="white"
					text="ویرایش اطلاعات"
				/>
			</router-link>
			<router-link to="/chat/user/admin" >
				<btn
					shadow="0"
					class="w-100"
					textClass="w-100 border-hover m-auto text-center"
					type="white"
					text="تماس با پشتیبانی"
				/>
			</router-link>
			<btn
				shadow="0"
				class="w-100"
				textClass="w-100 border-hover m-auto text-center text-danger"
				type="white"
				text="خروج"
				@clickMe="exit()"
			/>
		</div>
		<div style="
			position: fixed;
			width: 100vw;
			height: 100vh;
			left: 0;
			top: 0;
			background-color: #5454547a;
			z-index: 2;
			"
			v-if="mgt"
			@click="setMgt()"
			data-aos="flip-left"
		>
		</div>
		<div style="width: 100vw; height: 80px; z-index: 1; "></div>

	</div>
</template>

	<script>
		import Logo_Header from '../assets/img/Logo_Header.svg';
		import ArrowDown from '../assets/img/Arrow_Down.svg';
		import btn from  "../UI/button/btn.vue";
		import VueSlickCarousel from 'vue-slick-carousel'
  	import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
		export default {
			name: 'headMenu',
			data(){
				return {
					mgt: false,
					userL: false,
					btnSelect: -2,
					btnSelect2: -2,
					img: {
							"Logo_Header": Logo_Header,
							"ArrowDown": ArrowDown,
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
				set_degrees_margin(add=0){
					var element = document.getElementById("degrees");
					var rect = element.getBoundingClientRect();

					return rect.x + add;
				},
				//************************************************************
				setMgt(){
					this.mgt = !this.mgt;
				},
				//************************************************************
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
<style>
	@import "../css/templatemo-main.css";
</style>
