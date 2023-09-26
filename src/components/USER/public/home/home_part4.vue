<template>
	<div class="container p-3 border-15 overflow-hidden"  style="
		background-color: #f5fafd;
		display: flex;
		"
	>
	<btn text="" type="" :img="img.ArrowRight" function="left" @left="left()" class="col-1 float-left" style="display: flex; align-items: center; justify-content: center;" />
		<section class="col-10 customer-logos slider float-down p-0">
			<VueSlickCarousel  v-bind="settings" >
				<div class="slide" v-for="(f, j) in category" :key="j" >
					<router-link :to="{ path: '/teachers', query: {category: f.id}}" >
						<btn :text="f.name" type="light" textClass="text-success bg-white p-3 text-center border-15 w-75 m-auto font15" />
					</router-link>
				</div>
			</VueSlickCarousel>
		</section>
		<btn text="" type="" :img="img.ArrowLeft" function="right" @right="right()" class="col-1 float-right" style="display: flex; align-items: center; justify-content: center;" />
	</div>
</template>

	<script>
	import VueSlickCarousel from 'vue-slick-carousel'
	import 'vue-slick-carousel/dist/vue-slick-carousel.css'
	import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
	import btn from  "../../../UI/button/btn.vue";
	import ArrowLeft from '../../../assets/img/Arrow_Left.svg';
	import ArrowRight from '../../../assets/img/Arrow_Right.svg';
		export default {
			name: 'p_home4',
			data(){
				return {
					img: {
							"ArrowRight": ArrowRight,
							"ArrowLeft": ArrowLeft,
					},
					settings:{
						slidesToShow: 5,
						slidesToScroll: 1,
						autoplay: true,
						autoplaySpeed: 1500,
						arrows: true,
						dots: false,
						pauseOnHover: false,
						responsive: [{
							breakpoint: 768,
							settings: {
								slidesToShow: 3
							}
						}, {
							breakpoint: 520,
							settings: {
								slidesToShow: 2
							}
						}],
						"centerPadding": "15px",
					}
				}
			},
			components: {
				btn,
				VueSlickCarousel,
				ArrowRight,
				ArrowLeft,
			},
			props: ["category"],
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
.slick-next{ display: none !important;}
.slick-prev{ display: none !important;}
.font15{font-size:10px;}
.slick-slide{ height: 50px!important;}
</style>
