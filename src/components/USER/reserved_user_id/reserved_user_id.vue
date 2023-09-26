<template>
	<div style="background-color:#fffcf7;" class="container">
		<loginUser />
		<headMenu />
		<div
		class="w-100 overflow-hidden"
		:class="(windowWidth<=1000)? 'h-center': ''"
		>
			<div class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left p-3">
				<part1
					:flds="flds.data[0]"
					v-if="flds.ok"
					@setPage = "setPage"
				/>
			</div>
			<div class="col-lg-3 col-md-3 float-left"  v-if="windowWidth>1000">
				<part2 select="0" />
			</div>
		</div>
		<footerPage />
	</div>
</template>

	<script>
		import headMenu from  "../../menu/headMenu.vue";
		import btn from  "../../UI/button/btn.vue";
		import part1 from  "./part1.vue";
		import part2 from  "../reserved_user_list/part2.vue";
		import footerPage from  "../public/home/home_part9.vue";
		import loginUser from  "../../check/login_user.vue";
		export default {
			name: 'teachers',
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
				loginUser,
			},
			props: [],
			computed :{
			},
			mounted(){
		this.$swal.close();
				this.loader();
			},
			methods:{
				setPage(p){
					this.loader(p);
				},
				// *********************************************************************
				loader(THIS = this){
					this.flds = {ok: false, data: []};
					document.body.scrollTop = 0;
					$.post(this.baseurl+'reserved/'+this.$route.params.id, {
						token: this.$localStorage.get("user"),
						username: this.$localStorage.get("user").username.id,
						role: this.$localStorage.get("user").username.role
					}, function(D){
						if(D.status.code=="401"){
							THIS.$localStorage.remove('user');
							THIS.$router.push('/login');
						}else{
							THIS.flds = D;
						}
					}, "json");
				}
				// *********************************************************************
			}
		}
	</script>
<style>

</style>
