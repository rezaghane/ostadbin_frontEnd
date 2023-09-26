<template>
	<div class="overflow-hidden p-3 text-center bg-white border-15 shadow">
		<i class="fa fa-spinner fa-pulse text-success mt-3" style="font-size: 100px;"></i>

		<h2 class="text-center bMikhak p-3 mt-3 text-orange">
			{{text}}
		</h2>
	</div>
</template>

<script>
	import btn from  "../button/btn.vue";
	export default {
		name: 'PageNavigation',
		data(){
			return {
				img:{

				}
			}
		},
		components: {
			btn,

		},
		props: {
			"text": {
				default: "لطفا صبر کنید"
			}
		},
		methods:{
			setPage: function(j){
				this.$emit('setPage', j);
			}
		},
		mounted(){
		},
	}
</script>

<style scope>
</style>
