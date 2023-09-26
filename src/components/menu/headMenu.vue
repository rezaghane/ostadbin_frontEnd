<template>
	<div v-if="degrees.ok">
		<headMenuLg :flds="degrees.data" v-if="windowWidth > 1000 && chechRole()" />
		<headMenuSm :flds="degrees.data" v-if="windowWidth <= 1000" />
	</div>
</template>

	<script>
		import btn from  "../UI/button/btn.vue";
		import headMenuLg from  "./headMenuLg.vue";
		import headMenuSm from  "./headMenuSm.vue";
		export default {
			name: 'headMenu',
			data(){
				return {
					baseurl: window.location.origin.replace(":8081", ":8080")+"/api_UTadris/",
					imgurl: window.location.origin.replace(":8081", ":8080")+"/api_UTadris/upload/",
					upldurl: window.location.origin.replace(":8081", ":8080")+"/api_UTadris/ajaxfile.php",
					sendSms: window.location.origin.replace(":8081", ":8080")+"/api_UTadris/sendSms.php",
					sendSms_mould: window.location.origin.replace(":8081", ":8080")+"/api_UTadris/sendSms_mould.php",
					formatImage: ["jpg", "jpeg", "png", "gif"],
					formatDocs: ["jpg", "jpeg", "png", "pdf"],
					mgt: false,
					degrees: [],
				}
			},
			components: {
				btn,
				headMenuLg,
				headMenuSm,
			},
			mounted(){
				document.body.scrollTop = 0;
				this.$localStorage.set('baseurl', this.baseurl);
				this.$localStorage.set('imgurl', this.imgurl);
				this.$localStorage.set('upldurl', this.upldurl);
				this.$localStorage.set('formatImage', this.formatImage);
				this.$localStorage.set('formatDocs', this.formatDocs);
				this.$localStorage.set('sendSms', this.sendSms);
				this.$localStorage.set('sendSms_mould', this.sendSms_mould);
				if(this.$localStorage.get('setUrl')==null){
					this.$localStorage.set('setUrl', 1);
					location.reload();
				}
				if(this.$localStorage.get('mobile') == null){
					(this.$route.query.mobile == undefined) ? this.$localStorage.set('mobile', 0) : this.$localStorage.set('mobile', 1);
				}
				this.loader();
			},
			methods:{
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
				//____________________________________________________________________
				loader(THIS=this){
					if(THIS.$localStorage.get('degrees')==null){
						$.get(this.baseurl+'degrees/list', { sort: "id:asc" }, function(D){
							THIS.degrees = D;
							THIS.$localStorage.set('degrees', D);
							THIS.$emit("load", THIS.degrees);

						}, "json");
						$.get(this.baseurl+'settings/list', { }, function(D){
							THIS.$localStorage.set('settings', D.data);
						}, "json");
					}else{
						THIS.degrees = THIS.$localStorage.get('degrees');
						THIS.$emit("load", THIS.degrees);
					}
				}
			}
		}
	</script>
<style>
	@import "../css/templatemo-main.css";
	@import "../css/animate.css";
	@import "../assets/style/style.css";
</style>
