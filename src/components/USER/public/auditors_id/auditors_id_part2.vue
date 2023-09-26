<template>
	<div>
		<div v-show="(windowWidth > 1000 && type == 'auto') || type=='large'">
			<div class="w-100 text-center">
				<userImg
					imgClass="m-auto"
					:src="flds.image"
				/>
			</div>
			<br/>
			<p class="bMikhak text-center">
				{{flds.name}}
			</p>
			<p class="text-success text-center">
				هیئت ممیزه استادبین
			</p>

		</div>
		<!-- ---------------------------------------------------------------------------- -->
	</div>
</template>

<script>
	import btn from  "../../../UI/button/btn.vue";
	import userImg from  "../../../UI/userImg/userImg.vue";
	import Location from  "../../../assets/img/Location.svg";
	import star from  "../../../assets/img/star.svg";
	export default {
			name: 'auditors',
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
