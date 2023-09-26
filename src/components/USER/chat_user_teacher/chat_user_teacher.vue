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
				<part2 select="0" />
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
					id: this.$sessionStorage.get("id"),
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
				if(this.id==null){
					this.$router.push({
						path: '/',
					});
				}else{
					this.loader();
				}
			},
			methods:{
				sav(e, THIS = this){
					var sender = (this.$localStorage.get('user').username.role==1) ? 'U' : 'T';
					$.post(this.baseurl+'chat/'+this.id, { token: this.$localStorage.get("user"), chat: e, sender: sender }, function(D){
						THIS.flds = {ok: false, data: []};
						THIS.flds = D;
					}, "json");
				},
				// *********************************************************************
				loader(THIS = this){
					$.post(this.baseurl+'chat/'+this.id, {token: this.$localStorage.get("user"),}, function(D){
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
