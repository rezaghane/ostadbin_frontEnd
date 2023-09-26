<template>
	<div class="p-3 pa-sm-8 mt-4 mt-sm-8 border-15 " style="background: #f6be67;">
		<div class="row ma-0 align-center">
			<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12" v-if="windowWidth > 1000">
				<img :src="img.phone"
					data-aos="fade-up" data-aos-duration="3000"
					style="
					filter: drop-shadow(rgb(255, 255, 255) 0px 0px 10px);
					width: 280px;
					transform: translateY(-20%);
					position: absolute;
				" />
			</div>
			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<p class="text-right bMikhak p-3 text-white" style="font-size: 25px;">
					دانلود اپلیکیشن موبایل
				</p>
				<div class="row ma-0 align-center"  data-aos="fade-left" data-aos-duration="3000">
					<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-3" v-if="(data[0].link != '' && data[0].link != NULL) || windowWidth > 1000" >
						<a :title="data[0].title" :href="data[0].link" target="_blank" v-if="data[0].link != '' && data[0].link != NULL">
							<img :src="img.myket" class="w-100" style="" />
						</a>
						<img :src="img.myket" class="w-100 noDrop " style="opacity: 0.5;" v-else />
					</div>
					<!-- ------------------------------------------------------- -->
					<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-3" v-if="(data[1].link != '' && data[1].link != NULL) || windowWidth > 1000">
						<a :title="data[1].title" :href="data[1].link" target="_blank" v-if="data[1].link != '' && data[1].link != NULL">
							<img :src="img.cafebazaar" class="w-100" style="" />
						</a>
						<img :src="img.cafebazaar" class="w-100 noDrop " style="opacity: 0.5;" v-else />
					</div>
					<!-- ------------------------------------------------------- -->
					<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-3" v-if="(data[2].link != '' && data[2].link != NULL) || windowWidth > 1000">
						<a :title="data[2].title" :href="data[2].link" target="_blank" v-if="data[2].link != '' && data[2].link != NULL">
							<img :src="img.googleplay" class="w-100" style="" />
						</a>
						<img :src="img.googleplay" class="w-100 noDrop " style="opacity: 0.5;" v-else />
					</div>
					<!-- -----------------------******-------------------------------- -->
					<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-3" v-if="(data[3].link != '' && data[3].link != NULL) || windowWidth > 1000">
						<a :title="data[3].title" :href="data[3].link" target="_blank" v-if="data[3].link != '' && data[3].link != NULL">
							<img :src="img.sibapp" class="w-100" style="" />
						</a>
						<img :src="img.sibapp" class="w-100 noDrop " style="opacity: 0.5;" v-else />
					</div>
					<!-- ------------------------------------------------------- -->
					<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12  mt-3" v-if="(data[4].link != '' && data[4].link != NULL) || windowWidth > 1000">
						<a :title="data[4].title" :href="data[4].link" target="_blank" v-if="data[4].link != '' && data[4].link != NULL">
							<img :src="img.sibche" class="w-100" style="" />
						</a>
						<img :src="img.sibche" class="w-100 noDrop " style="opacity: 0.5;" v-else />
					</div>
					<!-- ------------------------------------------------------- -->
					<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12  mt-3" v-if="(data[5].link != '' && data[5].link != NULL) || windowWidth > 1000">
						<a :title="data[5].title" :href="data[5].link" target="_blank" v-if="data[5].link != '' && data[5].link != NULL">
							<img :src="img.appstore" class="w-100" style="" />
						</a>
						<img :src="img.appstore" class="w-100 noDrop " style="opacity: 0.5;" v-else />
					</div>
					<!-- ------------------------------------------------------- -->
				</div>
			</div>
			<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 text-center "  data-aos="fade-up" data-aos-duration="3000">
				<p class="text-center">
					با موبایل اسکن کنید:
				</p>
				<img :src="img.qrCode" class="w-75" style="

				" />
			</div>
		</div>
	</div>
</template>

	<script>
		import phone from '../../../assets/img/social_network/phone.svg';
		import qrCode from '../../../assets/img/social_network/qr-code.png';

		import appstore from '../../../assets/img/social_network/appstore.png';
		import cafebazaar from '../../../assets/img/social_network/cafebazaar.png';
		import googleplay from '../../../assets/img/social_network/googleplay.png';
		import myket from '../../../assets/img/social_network/myket.png';
		import sibapp from '../../../assets/img/social_network/sibapp.png';
		import sibche from '../../../assets/img/social_network/sibche.png';

		import ArrowBoxLeft from '../../../assets/img/Arrow_Box_Left.svg';
		import btn from  "../../../UI/button/btn.vue";
		export default {
			name: 'p_home82',
			data(){
				return {
					img: {
						"phone": phone,
						"qrCode": qrCode,
						"appstore" : appstore,
						"cafebazaar" : cafebazaar,
						"googleplay" : googleplay,
						"myket" : myket,
						"sibapp" : sibapp,
						"sibche" : sibche,
					},
				}
			},
			components: {
				btn,

			},
			props: ["data"],
			mounted(){
			},
			methods:{

			}
		}
	</script>
<style scope>

</style>
