<template>
	<div style="background-color:#fffcf7;" class="container">
		<headMenu />
		<div
			class="w-100 overflow-hidden"
			:class="(windowWidth<=1000)? 'h-center': ''"
		>
			<div class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left p-3">
				<back
					title="ویرایش اطلاعات"
					:showBtn="($localStorage.get('user').username.role==3) ? 'true' : 'false'"
				/>
				<part1
					data-aos="flip-right"
					data-aos-easing="ease-out-cubic"
					data-aos-duration="2000"
					v-if="$localStorage.get('user').username.role==1 || $route.params.role==1"
				/>
				<part1T
					data-aos="flip-right"
					data-aos-easing="ease-out-cubic"
					data-aos-duration="2000"
					v-else-if="$localStorage.get('user').username.role==2 || $route.params.role==2"
				/>
			</div>
			<div class="col-lg-3 col-md-3 float-left"  v-if="windowWidth>1000">
				<part2 select="1" />
			</div>
		</div>
		<footerPage />
	</div>
</template>

	<script>
		import headMenu from  "../../menu/headMenu.vue";
		import footerPage from  "../public/home/home_part9.vue";
		import btn from  "../../UI/button/btn.vue";
		import part2 from  "../reserved_user_list/part2.vue";
		import back from  "../../UI/back/back.vue";
		import part1 from  "./part1.vue";
		import part1T from  "./part1T.vue";
		export default {
			name: 'selfUser',
			data(){
				return {
					imgurl: this.$localStorage.get('imgurl'),
					baseurl: this.$localStorage.get('baseurl'),
					flds: {ok: false, data: []},
					degrees: [],
					category: [],
					location: [],

				}
			},
			components: {
				btn,
				part1,
				part1T,
				part2,
				footerPage,
				headMenu,
				back,
			},
			props: [],
			computed :{
			},
			mounted(){
		this.$swal.close();
				if(this.$localStorage.get('user')==null){
					this.$localStorage.set('urlPath', window.location.pathname);
					this.$router.push('/login');
				}else{
					//this.loader();
				}
			},
			methods:{
				// *********************************************************************
			}
		}
	</script>
<style>

</style>
