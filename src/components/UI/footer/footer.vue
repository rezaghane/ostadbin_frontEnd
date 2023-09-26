<template>
	<div class="overflow-hidden p-3">
		<hr class="" />
		<router-link to="/">
			<btn
				type="white"
				class="float-right"
				textClass="text-success"
				dir="ltr"
				imgSize="120px"
				heightSize="auto"
				:img="require('../../assets/img/Logo_Footer.svg')"
				text=""
			/>
		</router-link>
		<router-link to="/contact">
			<btn type="white" class="float-left" text="تماس با ما" />
		</router-link>
		<router-link to="/aboutMe">
			<btn type="white" class="float-left" text="درباره ما" />
		</router-link>
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
		props: [],
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
