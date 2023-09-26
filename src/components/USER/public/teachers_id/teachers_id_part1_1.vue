<template>
	<div class="w-100 overflow-hidden">
		<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 float-right pb-3">
			<div
				class="w-100 border-15 bg-white p-3 shadow"
				data-aos="flip-left"
				data-aos-easing="ease-out-cubic"
				data-aos-duration="2000"
				:class="(flds.in_person_teaching_active == 1) ? 'pointer' : 'noDrop' "
				@click="(flds.in_person_teaching_active == 1) ? $router.push('/teachers/'+flds.id+'/person') : ''"
			>
				<img width="20%" :src="img.StatusNo" v-if="flds.in_person_teaching_active!=1" />
				<img width="20%" :src="img.StatusYes" v-else />
				&nbsp;
				<span class="bMikhak" v-if="flds.in_person_teaching_active!=1" >
					تدریس حضوری ندارد
				</span>
				<span class="bMikhak" v-else >
					تدریس حضوری دارد
				</span>
			</div>
		</div>
		<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 float-right pb-3">
			<div
				class="w-100 border-15 bg-white p-3 shadow"
				data-aos="flip-left"
				data-aos-easing="ease-out-cubic"
				data-aos-duration="2000"
				:class="(flds.online_teaching_active == 1) ? 'pointer' : 'noDrop' "
				@click="(flds.online_teaching_active == 1) ? $router.push('/teachers/'+flds.id+'/online') : ''"
			>
				<img width="20%" :src="img.StatusNo" v-if="flds.online_teaching_active!=1" />
				<img width="20%" :src="img.StatusYes" v-else />
				&nbsp;
				<span class="bMikhak" v-if="flds.online_teaching_active!=1" >
					تدریس آنلاین ندارد
				</span>
				<span class="bMikhak" v-else >
					تدریس آنلاین دارد
				</span>
			</div>
		</div>
		<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 float-right pb-3">
			<div
				class="w-100 border-15 bg-white p-3 shadow"
				data-aos="flip-left"
				data-aos-easing="ease-out-cubic"
				data-aos-duration="2000"
				:class="(flds.teaching_home_active == 1) ? 'pointer' : 'noDrop' "
				@click="(flds.teaching_home_active == 1) ? $router.push('/teachers/'+flds.id+'/home') : ''"
			>
				<img width="20%" :src="img.StatusNo" v-if="flds.teaching_home_active!=1" />
				<img width="20%" :src="img.StatusYes" v-else />
				&nbsp;
				<span class="bMikhak" v-if="flds.teaching_home_active!=1" >
					تدریس در منزل ندارد
				</span>
				<span class="bMikhak" v-else >
					تدریس در منزل دارد
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import btn from  "../../../UI/button/btn.vue";
	import Location from  "../../../assets/img/Location.svg";
	import star from  "../../../assets/img/star.svg";
	import StatusNo from  "../../../assets/img/Status_No.svg";
	import StatusYes from  "../../../assets/img/Status_Yes.svg";
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
						"Location":Location,
						"star":star,
						"StatusNo":StatusNo,
						"StatusYes":StatusYes,
					}

			}
		},
		components: {
				btn,
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
