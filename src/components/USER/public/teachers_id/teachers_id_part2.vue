<template>
	<div>
		<div v-show="(windowWidth > 1000 && type == 'auto') || type=='large'">
			<div class="w-100 text-center">
				<userImg
					imgClass="m-auto"
					:src="flds.imgTypeMod"
				/>
			</div>
			<br/>
			<p class="bMikhak text-center">
				{{flds.fullname}}
			</p>
			<div dir="ltr" class="bMikhak text-success mt-3 text-center">
				{{flds.province}}، {{flds.county}}
				&nbsp
				<img class="" :src="img.Location" />
			</div>
			<div class="ltr text-orange mt-3 text-center" v-if="mode=='1'">
				<img class="" :src="img.star" />
				&nbsp
				{{flds.grade}}
			</div>
			<div dir="ltr" class="mt-3 text-center" style="display: flex; justify-content: center;">
				<router-link :to="'/teachers/'+flds.id+'/type'" v-if="mode=='1'">
					<btn type="orange" text="رزرو ساعت تدریس" />
				</router-link>
				<router-link :to="'/teachers/'+flds.id" v-else-if="mode=='0'">
					<btn type="orange" text="مشاهده مدرس" />
				</router-link>
			</div>
		</div>
		<!-- ---------------------------------------------------------------------------- -->
		<router-link
			v-show="(windowWidth <= 1000 && type == 'auto') || type == 'small'"
			:to="(mode=='1') ? '/teachers/'+flds.id+'/type' : '/teachers/'+flds.id"
			style="font-size: 14px;"
		>
			<div class="overflow-hidden">
				<userImg
					imgClass="m-auto"
					class="float-right"
					imgSize="50"
					:src="flds.imgTypeMod"
				/>
				<div class="float-right">
					<p class="bMikhak text-right m-0">
						&nbsp
						{{flds.fullname}}
					</p>
					<div dir="ltr" class="bMikhak text-success mt-1 mr-2 text-right">
						{{flds.province}}، {{flds.county}}
						&nbsp
						<img class="" :src="img.Location" />
					</div>
				</div>
			</div>
		</router-link>
	</div>
</template>

<script>
	import btn from  "../../../UI/button/btn.vue";
	import userImg from  "../../../UI/userImg/userImg.vue";
	import Location from  "../../../assets/img/Location.svg";
	import star from  "../../../assets/img/star.svg";
	export default {
			name: 'teachers',
		data(){
			return {
				imgurl: this.$localStorage.get('imgurl'),
				baseurl: this.$localStorage.get('baseurl'),
					flds: [],
					degrees: [],
					category: [],
					location: [],
					img:{
						"Location":Location,
						"star":star,
					}
			}
		},
		components: {
				btn,
				userImg,
		},
		props: {
			flds:{},
			mode:{
				type: String,
				default: "0",
			},
			type:{
				type: String,
				default: "auto",
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
