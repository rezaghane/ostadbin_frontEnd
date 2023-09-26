<template>
	<div style="background-color:#fffcf7;" class="container">
		<headMenu />
		<div
			class=" p-3 float-left"
			:class="(chechRole()) ? 'h-center col-lg-9 col-md-9 col-sm-12 col-xs-12 ' : 'col-lg-9 col-md-9 col-sm-12 col-xs-12 ' "
		>
			<back
				:title="(this.$route.params.id == undefined) ? 'مدرس جدید' : 'ویرایش مدرس'"
				showBtn="true"
				v-if="!chechRole()"
			/>
			<part1
				class="w-100 border-15 shadow bg-white text-center"
				@setPage = "setPage"
			/>
		</div>
		<leftMenuUser
			class="col-lg-3 col-md-3 float-left"
			select="1"
			v-if="!chechRole()"
		/>
		<leftMenuPublic
			class="col-lg-3 col-md-3 float-left"
			select="1"
			v-else
		/>
		<footerPage />
	</div>
</template>

	<script>
		import textInput from  "../../UI/input/textInput.vue";
		import headMenu from  "../../menu/headMenu.vue";
		import btn from  "../../UI/button/btn.vue";
		import back from  "../../UI/back/back.vue";
		import part1 from  "./part1.vue";
		import part2 from  "../../USER/reserved_user_list/part2.vue";
		import footerPage from  "../../USER/public/home/home_part9.vue";
		import leftMenuUser from  "../../menu/leftMenuUser.vue";
		import leftMenuPublic from  "../../menu/leftMenuPublic.vue";

		export default {
			name: 'signupTeacher',
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
				back,
				footerPage,
				headMenu,
				textInput,
				leftMenuPublic,
				leftMenuUser,
			},
			props: [],
			computed :{
			},
			mounted(){
		this.$swal.close();
				// if(this.$localStorage.get('user')==null){
				// 	this.$localStorage.set('urlPath', window.location.pathname);
				// 	this.$router.push('/login');
				// }else{
				// 	// this.loader();
				// }
			},
			methods:{
				// *********************************************************************
				chechRole(){
					let user = this.$localStorage.get('user');
					if(user == null){
						return true;
					}else if(user.username.role != 3){
						return true;
					}else{
						return false;
					}
				},
				// *********************************************************************
			}
		}
	</script>
<style>

</style>
