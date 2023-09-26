<template>
	<div style="background-color:#fffcf7;" class="container">
		<headMenu />
		<div
			class="w-100 overflow-hidden"
			:class="(windowWidth<=1000)? 'h-center': ''"
		>
			<div class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left p-3">
				<back
					title="مدیریت کلاس ها"
					:showBtn="($localStorage.get('user').username.role==3) ? 'true' : 'false'"
					leftBtn="true"
					leftBtnText="+ افزودن کلاس جدید"
					@clickMe="rtrNewClass()"
				/>
				<loading
				v-if="flds.ok == null"
				/>
				<part1
					:flds="flds.data"
					v-else-if="flds.ok==true"
					@setPage = "setPage"
				/>
				<empty
					text="موردی یافت نشد"
					v-else-if="flds.ok==false"
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
		import loading from  "../../UI/loading/loading.vue";
		import empty from  "../../UI/empty/empty.vue";
		export default {
			name: 'self',
			data(){
				return {
					imgurl: this.$localStorage.get('imgurl'),
					baseurl: this.$localStorage.get('baseurl'),
					flds: {ok: null, data: []},
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
				empty,
				loading,
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
				setPage(p){
					this.loader(p);
				},
				rtrNewClass(){
					let T = (this.$route.params.id == undefined) ? '' : '/' + this.$route.params.id ;
					this.$router.push('/class/create'+T);
				},
				// *********************************************************************
				loader(p=1,THIS = this){
					this.flds = {ok: null, data: []};
					document.body.scrollTop = 0;
					let T = (this.$route.params.id == undefined) ? this.$localStorage.get("user").username.id : this.$route.params.id ;
					$.post(this.baseurl+'classes/list?p='+p, {
						token: this.$localStorage.get("user"),
						teacher: T, 
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
