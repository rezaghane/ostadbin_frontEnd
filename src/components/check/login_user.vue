<template>
	<div>
	</div>
</template>

<script>
	export default {
		name: 'login_user',
		data(){
			return {

			}
		},
		components: {

		},
		props: [],
		mounted(){
			this.$swal.close();
			this.checkLogin();
		},
		methods:{
			checkLogin(){
				if(this.$localStorage.get('user')==null){
					this.$localStorage.set('urlPath', window.location.pathname);
					this.$router.push('/login');
				}
			},
			// *********************************************************************
		}
	}
</script>
<style>

</style>
