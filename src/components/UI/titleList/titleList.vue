<template>
	<div class="w-100 overflow-hidden">
		<div class="col-12 pb-3">
			<div class="w-100 border-15 bg-white p-3 shadow overflow-hidden">
				<p class="bMikhak">
					{{title}}
				</p>
				<btn type="outline-light-green" class="float-right ml-3"  v-for="(f, i) in flds" :key="i" :text="f.name" />
			</div>
		</div>
	</div>
</template>

<script>
	import btn from  "../button/btn.vue";
	export default {
		name: 'teachers_id_part1_1',
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
		},
			props: ["flds", "title"],
		mounted(){

		},
		methods:{

		}
	}
</script>
<style>

</style>
