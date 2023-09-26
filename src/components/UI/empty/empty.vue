<template>
	<div class="overflow-hidden p-3 text-center bg-white border-15 shadow">
		<img
			:src="require('../../assets/img/empty.svg')"
		/>
		<h2 class="text-center bMikhak p-3 text-orange">
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
				default: "متن"
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
