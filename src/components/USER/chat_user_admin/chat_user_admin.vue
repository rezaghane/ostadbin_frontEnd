<template>
	<div style="background-color:#fffcf7;" class="container">
		<headMenu />
		<div
			class="w-100 overflow-hidden"
			:class="(windowWidth<=1000)? 'h-center': ''"
		>
			<div class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left p-3">
				<part1
					:flds="flds.data"
					@clickMe="sav"
				/>
			</div>
			<div class="col-lg-3 col-md-3 float-left"  v-if="windowWidth>1000">
				<part2 select="4" />
			</div>
		</div>
		<footerPage v-show="windowWidth>1000" />
	</div>
</template>

	<script>
		import headMenu from  "../../menu/headMenu.vue";
		import btn from  "../../UI/button/btn.vue";
		import part1 from  "./part1.vue";
		import part2 from  "../reserved_user_list/part2.vue";
		import footerPage from  "../public/home/home_part9.vue";
		export default {
			name: 'chat_user_teacher',
			data(){
				return {
					imgurl: this.$localStorage.get('imgurl'),
					baseurl: this.$localStorage.get('baseurl'),
					flds: {ok: false, data: []},
					user: this.$localStorage.get("user").username.id,
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
				sav(e, THIS = this){
					let sender;
					if(this.$localStorage.get('user').username.role==1){
						sender = 'U';
					}else if(this.$localStorage.get('user').username.role==2){
						sender = 'T';
					}else if(this.$localStorage.get('user').username.role==3){
						sender = 'A';
					}
					let id = (this.$route.params.id == undefined) ? this.user : this.$route.params.id;
					$.post(this.baseurl+'chat/admin', {
						token: this.$localStorage.get("user"),
						username: id, 
						chat: e, sender: sender, role: this.$localStorage.get('user').username.role 
					}, function(D){
							THIS.flds = D;
					}, "json");
				},
				// *********************************************************************
				loader(THIS = this){
					let id = (this.$route.params.id == undefined) ? '' : this.$route.params.id;
					$.post(this.baseurl+'chat/admin', { token: this.$localStorage.get("user"), username: this.user, role: this.$localStorage.get('user').username.role, id: id }, function(D){
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
