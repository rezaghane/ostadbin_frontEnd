<template>
		<div class="w-100 overflow-hidden">
			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 p-3 float-right" data-aos="fade-up" data-aos-duration="3000">
				<h1 class="bMikhak text-success" data-aos="fade-up" data-aos-duration="3000">
					<br/>
					آموزش آنلاین و حضوری
					<br/>
					تمام مقاطع تحصیلی و رشته ها
				</h1>
				<p class="text-justify rtl">
					در استادبین می توانید استاد، مدرس یا مربی مد نظر خود را در تمامی مقاطع تحصیلی، همه‌ی رشته‌های درسی و غیر درسی مشاهده نموده و پس از بررسی روزمه آنان مناسبترین روش برای دریافت آموزش شامل آموزش خصوصی در محل شما، آموزش حضوری در محل آموزشگاه یا استاد و آموزش خصوصی آنلاین را انتخاب و رزرو نمایید.
				</p>
				<div class="w-100 pl-3  pb-3 pt-3 overflow-hidden">
					<router-link to="/teachers">
						<btn
							class="float-right"
							type="orange"
							text = "مشاهده همه مدرس ها"
						/>
					</router-link>
					<router-link to="/aboutme">
						<btn
							class="float-right"
							type="white"
							text="بیشتر بدانید"
							textClass="text-success"
							:img="img.ArrowLeft"
						/>
					</router-link>
				</div>
			</div>
			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 p-3 float-right">
				<img
					class="w-100"
					:src="require('../../../assets/img/Illustration_Home_1.svg')"
					data-aos="fade-up"
					data-aos-duration="3000"
				/>
			</div>
		</div>
</template>

	<script>
		import btn from  "../../../UI/button/btn.vue";
		import ArrowLeft from '../../../assets/img/Arrow_Left.svg';
		export default {
			name: 'p_home',
			data(){
				return {
					img: {
							"ArrowLeft": ArrowLeft,
					}
				}
			},
			components: {
				btn,
				ArrowLeft,
			},
			props: [],
			mounted(){

			},
			methods:{

			}
		}
	</script>
<style>

</style>
