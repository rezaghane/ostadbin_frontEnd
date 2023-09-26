<template>
	<div>
		<leftMenuUser
			:select="select"
			data-aos="fade-up"
			data-aos-duration="1500"
		/>
	</div>
</template>

	<script>
		import btn from  "../../UI/button/btn.vue";
		import leftMenuUser from  "../../menu/leftMenuUser.vue";
		export default {
			name: 'teachers_part2',
			data(){
				return {

				}
			},
			components: {
				btn,
				leftMenuUser,
			},
			props: {
				select:{
					default: "0"
				},
			},
			mounted(){

			},
			methods:{

			}
		}
	</script>
<style>

</style>
