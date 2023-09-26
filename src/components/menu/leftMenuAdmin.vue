<template>
	<div class="p-3" v-if="windowWidth > 1000">
		<div class="p-3 shadow border-15 overflow-hidden bg-white">
			<div class="w-100 mb-3 text-center">
				<img
					class="m-auto w-75"
					:src="require('../assets/img/Logo_admin.svg')"
				/>
			</div>
			<hr class="mt-0 mb-3" />
			<router-link to="/reserved/user/list">
				<btn
					:type="(select=='0') ? 'orange' : 'white'"
					class="w-100"
					shadow="0"
					textClass="w-100 border-hover"
					text="درخواست ها"
				/>
			</router-link>
			<router-link to="/teachers">
				<btn
					:type="(select=='1') ? 'orange' : 'white'"
					class="w-100"
					shadow="0"
					textClass="w-100 border-hover"
					text="مدرس ها"
				/>
			</router-link>
			<router-link to="/users">
				<btn
					:type="(select=='2') ? 'orange' : 'white'"
					class="w-100"
					shadow="0"
					textClass="w-100 border-hover"
					text="کاربران"
				/>
			</router-link>
			<router-link to="/degrees/list">
				<btn
					:type="(select=='3.1') ? 'orange' : 'white'"
					class="w-100"
					shadow="0"
					textClass="w-100 border-hover"
					text="دسته بندی"
				/>
			</router-link>
			<router-link to="/category/list">
				<btn
					:type="(select=='3') ? 'orange' : 'white'"
					class="w-100"
					shadow="0"
					textClass="w-100 border-hover"
					text="موضوع درس"
				/>
			</router-link>
			<router-link to="/field/list">
				<btn
					:type="(select=='3.2') ? 'orange' : 'white'"
					class="w-100"
					shadow="0"
					textClass="w-100 border-hover"
					text="رشته های تحصیلی"
				/>
			</router-link>
			<router-link to="/auditors/list">
				<btn
					:type="(select=='3.3') ? 'orange' : 'white'"
					class="w-100"
					shadow="0"
					textClass="w-100 border-hover"
					text="هیئت ممیزه"
				/>
			</router-link>
			<router-link to="/payment/list">
				<btn
					:type="(select=='4') ? 'orange' : 'white'"
					class="w-100"
					shadow="0"
					textClass="w-100 border-hover"
					text="تراکنش های مالی"
				/>
			</router-link>
			<router-link to="/support/admin">
				<btn
					:type="(select=='5') ? 'orange' : 'white'"
					class="w-100"
					shadow="0"
					textClass="w-100 border-hover"
					text="پشتیبانی"
				/>
			</router-link>
			<router-link to="/support/chat">
				<btn
					:type="(select=='6') ? 'orange' : 'white'"
					class="w-100"
					shadow="0"
					textClass="w-100 border-hover"
					text="پیام ها"
				/>
			</router-link>
			<router-link to="/admin/list">
				<btn
					:type="(select=='7') ? 'orange' : 'white'"
					class="w-100"
					shadow="0"
					textClass="w-100 border-hover"
					text="مدیران"
				/>
			</router-link>
			<router-link to="/discount/list">
				<btn
					:type="(select=='8') ? 'orange' : 'white'"
					class="w-100"
					shadow="0"
					textClass="w-100 border-hover"
					text="تخفیف ها"
				/>
			</router-link>
			<router-link to="/settings/list">
				<btn
					:type="(select=='9') ? 'orange' : 'white'"
					class="w-100"
					shadow="0"
					textClass="w-100 border-hover"
					text="تنظیمات"
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
