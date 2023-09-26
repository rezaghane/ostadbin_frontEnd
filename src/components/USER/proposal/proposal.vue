<template>
	<div style="background-color:#fffcf7;" class="container">
		<login_user/>
		<headMenu />
		<div
			class="w-100 overflow-hidden"
			:class="(windowWidth<=1000)? 'h-center': ''"
		>
			<div class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left p-3">
				<back
					title="اطلاعات زیر را تکمیل نمایید"
					showBtn='false'
				/>
				<part1
					data-aos="flip-up"
					data-aos-easing="ease-out-cubic"
					data-aos-duration="2000"
				/>
			</div>
			<div
				class="col-lg-3 col-md-3 col-sm-12 col-xs-12 float-right p-3"
				data-aos="flip-left"
				data-aos-easing="ease-out-cubic"
				data-aos-duration="2000"
				v-if="windowWidth>1000"
			>
				<div class="w-100 text-center bg-white border-15 shadow p-3">
					<br/>
					<userImg
						imgClass="m-auto"
						:src="($localStorage.get('user')==null) ? '' : $localStorage.get('user').username.img"
					/>
					<br/>
					<h3 class="text-center bMikhak">
						پیشنهاد مدرس
					</h3>
					<p class="text-success text-justify">
						استادبین با توجه به نیاز شما بهترین و مناسب ترین مدرس را به شما معرفی خواهد کرد.
					</p>
				</div>
			</div>
		</div>
		<footerPage />
	</div>
</template>

<script>
	import userImg from  "../../UI/userImg/userImg.vue";
	import headMenu from  "../../menu/headMenu.vue";
	import btn from  "../../UI/button/btn.vue";
	import part1 from  "./part1.vue";
	import back from  "../../UI/back/back.vue";
	import part2 from  "../reserved_user_list/part2.vue";
	import footerPage from  "../public/home/home_part9.vue";
	import login_user from  "../../check/login_user.vue";
	import {error} from  "../../assets/library/messege.js";
	export default {
		name: 'self',
		data(){
			return {
				imgurl: this.$localStorage.get('imgurl'),
				baseurl: this.$localStorage.get('baseurl'),
				flds: {ok: false, data: []},
				degrees: [],
				category: [],
				location: [],
				error: error,
			}
		},
		components: {
			btn,
			part1,
			part2,
			footerPage,
			headMenu,
			login_user,
			back,
			userImg,
		},
		props: [],
		computed :{
		},
		mounted(){
		this.$swal.close();
			if(this.$localStorage.get('user')!=null){
				if(this.$localStorage.get('user').username.role==2 || this.$localStorage.get('user').username.role==3){
					let text = "دسترسی این بخش مخصوص دانش آموزان و دانشجویان است.";
					this.error(this, text);
					this.$router.push("/reserved/user/list");
				}
			}
		},
		methods:{

		}
			// *********************************************************************
	}
</script>
<style>

</style>
