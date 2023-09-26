<template>
	<div style="background-color:#fffcf7;" class="container">
		<headMenu />
		<div class="w-100 overflow-hidden p-3">
			<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 float-right">
				<teachersIdPart2
					type='large'
					class="bg-white p-3 border-15 shadow"
					:class="(windowWidth > 1000)? '' : 'mr-3 ml-3'"
					:flds="flds.data"
					v-if="flds.ok"
					mode="1"
					data-aos="flip-left"
					data-aos-easing="ease-out-cubic"
					data-aos-duration="2000"
				/>
				<br/>
			</div>
			<teachersIdPart11 class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-right" :flds="flds.data" v-if="flds.ok"  />
			<teachersIdPart12 class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-right" :flds="flds.data" v-if="flds.ok" />
			<loading class="col-lg-12" v-if="!flds.ok" />
		</div>
		<footerPage />
	</div>
</template>

<script>
	import teachersIdPart11 from  "./teachers_id_part1_1.vue";
	import teachersIdPart12 from  "./teachers_id_part1_2.vue";
	import teachersIdPart2 from  "./teachers_id_part2.vue";
	import btn from  "../../../UI/button/btn.vue";
	import loading from  "../../../UI/loading/loading.vue";
	import headMenu from  "../../../menu/headMenu.vue";
	import footerPage from  "../home/home_part9.vue";
	export default {
			name: 'teachers_id',
		data(){
			return {
				imgurl: this.$localStorage.get('imgurl'),
				baseurl: this.$localStorage.get('baseurl'),
					flds: [],
					degrees: [],
					category: [],
					location: [],

			}
		},
		components: {
				btn,
				footerPage,
				loading,
				headMenu,
				teachersIdPart11,
				teachersIdPart12,
				teachersIdPart2,
		},
			props: [],
		mounted(){
		this.$swal.close();
			this.loader();
		},
		methods:{
			// *********************************************************************
			loader(THIS=this){
				$.get(this.baseurl+'view/teachers/'+this.$route.params.id, { }, function(D){
					THIS.flds = D;
					
				}, "json");
			}
				// *********************************************************************
		}
	}
</script>
<style>

</style>
