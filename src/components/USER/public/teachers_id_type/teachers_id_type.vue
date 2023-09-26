<template>
	<div style="background-color:#fffcf7;" class="container">
		<headMenu />
		<div class="w-100 overflow-hidden p-3">
			<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 float-right">
				<teachersIdPart2 class="bg-white p-3 border-15 shadow" :flds="flds.data" v-if="flds.ok" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000" />
			</div>
			<back class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left" title="نوع آموزش را انتخاب نمایید" />
			<!-- --------------------------------------------------------------------------------- -->
			<router-link :to="'/teachers/'+$route.params.id+'/person'" v-if="flds.data.in_person_teaching_active==1">
				<btnLg
					v-if="flds.ok && flds.data.in_person_teaching==1"
					class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left mb-3"
					title="آموزش حضوری"
					text="باید برای جلسه تدریس، به محل تدریس مدرس مراجعه نمایید."
				/>
			</router-link>
			<btnLg
				class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left mb-3"
				title="آموزش حضوری"
				text="باید برای جلسه تدریس، به محل تدریس مدرس مراجعه نمایید."
				disable='1'
				v-else
			/>
			<!-- --------------------------------------------------------------------------------- -->
			<router-link :to="'/teachers/'+$route.params.id+'/online'" v-if="flds.data.online_teaching_active==1">
				<btnLg
					v-if="flds.ok && flds.data.online_teaching==1"
					class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left mb-3"
					title="آموزش آنلاین"
					text="جلسه تدریس، به صورت آنلاین و به در خواست شما تصویری یا صوتی خواهد بود."
				/>
			</router-link>
			<btnLg
				class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left mb-3"
				title="آموزش آنلاین"
				text="جلسه تدریس، به صورت آنلاین و به در خواست شما تصویری یا صوتی خواهد بود."
				disable='1'
				v-else
			/>
			<!-- --------------------------------------------------------------------------------- -->
			<router-link :to="'/teachers/'+$route.params.id+'/home'" v-if="flds.data.teaching_home_active==1">
				<btnLg
					v-if="flds.ok && flds.data.teaching_home==1"
					class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left mb-3"
					title="آموزش در منزل"
					text="مدرس مدرس برای جلسه تدریس، به منزل شما مراجعه خواهد کرد."
				/>
			</router-link>
			<btnLg
				class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left mb-3"
				title="آموزش در منزل"
				text="مدرس مدرس برای جلسه تدریس، به منزل شما مراجعه خواهد کرد."
				disable='1'
				v-else
			/>
			<!-- --------------------------------------------------------------------------------- -->
		</div>
		<footerPage />
	</div>
</template>

<script>
	import footerPage from  "../../../UI/footer/footer.vue";
	import back from  "../../../UI/back/back.vue";
	import btn from  "../../../UI/button/btn.vue";
	import btnLg from  "../../../UI/button/btnLg.vue";
	import headMenu from  "../../../menu/headMenu.vue";
	import Shape from  "../../../assets/img/Shape_Title.svg";
	import Ellipse from  "../../../assets/img/Ellipse.svg";
	import teachersIdPart2 from  "../teachers_id/teachers_id_part2.vue";


	export default {
			name: 'teachers_id',
		data(){
			return {
				imgurl: this.$localStorage.get('imgurl'),
				baseurl: this.$localStorage.get('baseurl'),
				flds: {"ok": false},
				degrees: [],
				category: [],
				location: [],
				img:{
					"Shape": Shape,
					"Ellipse": Ellipse,
				}

			}
		},
		components: {
				btn,
				btnLg,
				back,
				headMenu,
				footerPage,
				Shape,
				Ellipse,
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
