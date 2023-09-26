<template>
	<div>
		<div>
			<h2 class="text-success pt-3 bMikhak text-center" data-aos="fade-down" data-aos-duration="3000">
				برترین اساتید
			</h2>
			<p class="text-center" data-aos="fade-up" data-aos-duration="3000">
				برترین و با تجربه ترین اساتید در تمامی مقاطع و موضوعات مختلف
			</p>
		</div>
		<br/>
		<br/>
		<div id="teacherSlider" class="w-100 p-3 border-15"
			:style="'background-image: url('+require('../../../assets/img/Back_Down.svg')+');'"
			style="
			background-repeat: no-repeat;
			background-position: center bottom;
			background-size: cover;
			height: 450px;
			"
		>
			<section class="customer-logos slider col-10 m-auto">
				<VueSlickCarousel  v-bind="settings" >
					<div class="slide p-3" v-for="(f, j) in teachers.content" :key="j">
						<router-link :to="{ path: '/teachers/' + f.id }" >
							<div class="bg-white border-15 shadow p-3" >
								<div class="text-center" style="" >
									<userImg
										imgClass="m-auto"
										:src="f.img"
									/>

									<p class="bMikhak text-center mt-3">
										{{f.fullname}}
									</p>
									<div class="bMikhak text-center text-success mt-3 dfjj">
										{{f.province}}، {{f.county}}
										&nbsp
										<img 
											:src="require('../../../assets/img/Location.svg')"
										/>
									</div>
									<div class="text-center text-truncate mt-3 dfjj">
										<span v-for="(c, j) in f.cats" :key="j">
											{{c.name}}
											<span v-if="j != (f.cats.length-1)">
												،
											</span>
										</span>
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
				margin-top: -50px;
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
			props: ["teachers"],
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
.userPicHomeP{
	width: 8vw;
	height: 8vw;
	background-size: contain;
background-repeat: no-repeat;
background-position: center;
}
.dfjj{
	display: flex;
	justify-content: center;
	font-size: 10px;
}
#teacherSlider  .slick-track{
	height: 350px;
}
</style>
