<template>
	<div>
		<div class="w-100 overflow-hidden"  v-if="flds.about_me!=null">
			<div class="col-12 pb-3">
				<div class="w-100 border-15 bg-white p-3 shadow overflow-hidden">
					<p class="bMikhak">
						{{flds.title}}:
					</p>
					<p class="text-justify">
					{{flds.about_me}}
					</p>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
	import btn from  "../../../UI/button/btn.vue";
	import titleList from  "../../../UI/titleList/titleList.vue";
	export default {
		name: 'auditors_id_part1_1',
		data(){
			return {
				imgurl: this.$localStorage.get('imgurl'),
		   	baseurl: this.$localStorage.get('baseurl'),
				degrees: [],
				category: [],
				location: [],
				img:{

				}
			}
		},
		components: {
				btn,
				titleList,
		},
			props: ["flds",],
		mounted(){

		},
		methods:{

		}
	}
</script>
<style>

</style>
