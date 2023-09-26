<template>
	<div style="background-color:#fffcf7;" class="container">
		<headMenu />
		<div
			class="w-100 overflow-hidden"
			:class="(windowWidth<=1000)? 'h-center': ''"
		>
			<div class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left p-3">
				<back
					title="افزودن کلاس جدید"
				/>
				<part1
					@setPage = "setPage"
				/>
			</div>
			<div class="col-lg-3 col-md-3 float-left"  v-if="windowWidth>1000">
				<part2 select="1_2" />
			</div>
		</div>
		<footerPage />
	</div>
</template>

	<script>
		import headMenu from  "../../menu/headMenu.vue";
		import btn from  "../../UI/button/btn.vue";
		import part1 from  "./part1.vue";
		import back from  "../../UI/back/back.vue";
		import part2 from  "../../USER/reserved_user_list/part2.vue";
		import footerPage from  "../../USER/public/home/home_part9.vue";
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
				}
			},
			components: {
				btn,
				part1,
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
					this.loader();
				}
			},
			methods:{
				rtrNewClass(){
					this.$router.push('/class/create');
				},
				// *********************************************************************
			}
		}
	</script>
<style>

</style>
