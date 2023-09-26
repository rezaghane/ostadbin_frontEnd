<template>
	<div class="p-3">
		<div class="p-3 shadow border-15 overflow-hidden bg-white">
			<div class="w-100 text-center">
				<userImg
					imgClass="m-auto"
					:src="user.username.img"
				/>
			</div>
			<p class="p-3 text-center bMikhak m-0">
				{{user.username.fullname}}
			</p>
			<hr class="mt-0 mb-3" />
			<router-link to="/reserved/user/list">
				<btn
					:type="(select=='0') ? 'orange' : 'white'"
					class="w-100"
					shadow="0"
					textClass="w-100 border-hover"
					text="درخواست های من"
				/>
			</router-link>
			<router-link to="/class/list">
				<btn
					:type="(select=='1_2') ? 'orange' : 'white'"
					shadow="0"
					class="w-100"
					textClass="w-100 border-hover"
					text="مدیریت کلاس ها"
					v-if="user.username.role=='2'"
				/>
			</router-link>
			<router-link to="/self">
				<btn
					:type="(select=='1') ? 'orange' : 'white'"
					shadow="0"
					class="w-100"
					textClass="w-100 border-hover"
					text="ویرایش اطلاعات"
				/>
			</router-link>
			<router-link to="/self/setpass">
				<btn
					:type="(select=='2') ? 'orange' : 'white'"
					class="w-100"
					shadow="0"
					textClass="w-100 border-hover"
					text="ویرایش کلمه عبور"
				/>
			</router-link>
			<router-link to="/pay/list">
				<btn
					:type="(select=='3') ? 'orange' : 'white'"
					class="w-100"
					shadow="0"
					textClass="w-100 border-hover"
					text="تراکنش های مالی"
				/>
			</router-link>
			<router-link to="/chat/user/admin">
				<btn
					:type="(select=='4') ? 'orange' : 'white'"
					class="w-100"
					shadow="0"
					textClass="w-100 border-hover"
					text="تماس با پشتیبان"
				/>
			</router-link>
			<btn
				class="w-100"
				shadow="0"
				textClass="w-100 border-hover text-danger"
				type="white"
				text="خروج"
				@clickMe="exit()"
			/>
		</div>
	</div>
</template>

	<script>
		import btn from  "../UI/button/btn.vue";
		import userImg from  "../UI/userImg/userImg.vue";
		import VueSlickCarousel from 'vue-slick-carousel'
  	import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
		export default {
			name: 'headMenu',
			data(){
				return {
					mgt: false,
					userL: false,
					user: [],
				}
			},
			props: {
				select:{
					default: "0"
				},
			},
			components: {
				btn,
				userImg
			},
			mounted(){
				this.user = this.$localStorage.get("user");
			},
			methods:{
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
	.swal2-actions {
    flex-wrap: nowrap !important;
	}
</style>
