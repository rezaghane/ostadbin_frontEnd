<template>
	<div>
		<leftMenu_U_T
			class="p-3"
			:select="select"
			v-if="$localStorage.get('user').username.role != 3"
		/>
		<leftMenuAdmin
			:select="select"
			v-else
			class="p-3"
		/>
	</div>
</template>

	<script>
		import leftMenuAdmin from  "./leftMenuAdmin.vue";
		import leftMenu_U_T from  "./leftMenu_U_T.vue";
		export default {
			name: 'leftMenu',
			data(){
				return {

				}
			},
			props: {
				select:{
					default: "0"
				},
			},
			components: {
				leftMenuAdmin,
				leftMenu_U_T,
			},
			mounted(){
			},
			methods:{

			}
		}
	</script>
<style>
	@import "../css/templatemo-main.css";
	.swal2-actions {
    flex-wrap: nowrap !important;
	}
</style>
