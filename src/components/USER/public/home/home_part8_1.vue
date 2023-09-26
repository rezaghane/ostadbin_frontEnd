<template>
	<div>
		<div>
			<br/>
			<h2 class="text-success pt-3 bMikhak text-center" data-aos="fade-down" data-aos-duration="3000">
				هیئت ممیزه استادبین
			</h2>
			<p class="text-center" data-aos="fade-up" data-aos-duration="3000">
				تمامی اساتید، مدرس ها و مربیان فعال در استادبین، مورد تایید هیئت ممیزه استادبین قرار گرفته اند.
			</p>
		</div>
		<div id="teacherSlider" class="w-100 p-3 border-15"
			style=""
		>
			<section
				class="customer-logos slider col-10 m-auto"
				style="height: 150;"
			>
				<VueSlickCarousel  v-bind="settings" >
					<div class="slide p-3" v-for="(f, j) in auditors.content" :key="j">
						<router-link :to="{ path: '/auditors/' + f.id }" >
							<div class="bg-white border-15 shadow p-3" >
								<div class="text-center overflow-hidden" >
								<userImg
									vWidth="width:50px !important;"
									imgSize="50px"
									:src="f.image"
									class="float-right w-25"
								/>

								<div class=" float-right aut text-truncate rtl w-70">
										&nbsp;
										{{f.name}}
									</div>
									<div class=" float-right text-success text-truncate rtl aut12 w-70">
										&nbsp;
										{{f.title}}
									</div>
									<div class="w-100 float-right text-truncate rtl aut8">
										{{f.about_me}}
									</div>
								</div>
							</div>
						</router-link>
					</div>
				</VueSlickCarousel>
			</section>
			<div style="
				overflow: hidden;
				display: flex;
				align-content: center;
				justify-content: center;
				align-items: center;
			">
				<btn
					text=""
					type=""
					shadow="0"
					imgSize="50"
					function="right"
					class="float-down col-1"
					style="display: flex; align-items: center; justify-content: center;"
					:img="img.ArrowBoxRight"
					@right="right()"
				/>
				<btn
					text=""
					type=""
					shadow="0"
					imgSize="50"
					function="left"
					class="float-down col-1"
					style="display: flex; align-items: center; justify-content: center;"
					:img="img.ArrowBoxLeft"
					@left="left()"
				/>
	</div>
	</div>
	</div>
</template>

	<script>
	import ArrowBoxRight from '../../../assets/img/Arrow_Box_Right.svg';
	import ArrowBoxLeft from '../../../assets/img/Arrow_Box_Left.svg';
	import VueSlickCarousel from 'vue-slick-carousel'
	import 'vue-slick-carousel/dist/vue-slick-carousel.css'
	import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
		import btn from  "../../../UI/button/btn.vue";
		import userImg from  "../../../UI/userImg/userImg.vue";
		export default {
			name: 'p_home4',
			data(){
				return {
					img: {
							"ArrowBoxRight": ArrowBoxRight,
							"ArrowBoxLeft": ArrowBoxLeft,
					},
					settings:{
						slidesToShow: 4,
						slidesToScroll: 1,
						autoplay: true,
						autoplay: true,
						autoplay: false,
						autoplaySpeed: 1500,
						arrows: true,
						dots: false,
						pauseOnHover: false,
						responsive: [{
							breakpoint: 768,
							settings: {
								slidesToShow: 2
							}
						}, {
							breakpoint: 520,
							settings: {
								slidesToShow: 1
							}
						}],
						"centerPadding": "15px",
					}
				}
			},
			components: {
				btn,
				userImg,
				VueSlickCarousel,
				ArrowBoxRight,
				ArrowBoxLeft,
			},
			props: ["auditors"],
			mounted(){
			},
			methods:{
				left(){
					$(".slick-next").click();
				},
				right(){
					$(".slick-prev").click();
				}
			}
		}
	</script>
<style scope>
.aut{
	font-size: 15px;
}
.aut12{
	font-size: 12px;
}
.aut8{
	font-size: 8px;
}
.w-70{
	 width: 70%;
}
</style>
