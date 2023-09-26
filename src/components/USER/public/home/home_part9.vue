<template>
	<div>
		<div class="w-100 overflow-hidden p-3 mt-3"
			:style="'background-image: url('+img.Path16409+')'"
			style="
    	background-repeat: no-repeat;
    	background-position: top;
    	background-size: cover;
		">
			<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 p-3 float-right">
				<br/>
				<br/>
				<br/>
				<router-link to="/">
					<img
						width="200px"
						:src="img.Logo_Footer"
						alt="استادبین"
						title="استادبین"
					/>
				</router-link>
				<p
					class="text-justify rtl"
					data-aos="fade-up"
					data-aos-duration="3000"
				>

					در استادبین می‌توانید مدرس، استاد یا مربی مد نظر خود را در تمامی مقاطع تحصیلی و همه‌ی رشته‌های درسی و غیردرسی مشاهده نموده و برای دریافت آموزش بصورت حضوری یا آنلاین، جلسه‌ی تدرس خصوصی خریداری نمایید.
				</p>
			</div>
			<div
				class="col-lg-4 col-md-4 col-sm-12 col-xs-12 p-3 mt-3 float-right"
				style="display: flex; align-items: flex-end; "
				:style = "(windowWidth > 767) ? 'height: 50%; ' : ''"
			>
				<div class="p-3 float-right" style="width:25%;">
					<a target="_blank" href="https://instagram.com/ostadbinir?utm_medium=copy_link">
						<img width="100%" :src="img.i" />
					</a>
				</div>
				<div class="p-3 float-right" style="width:25%;">
					<a target="_blank" href="https://t.me/ostadbinir">
						<img width="100%" :src="img.t" />
					</a>
				</div>
				<div class="p-3 float-right" style="width:25%;">
					<a target="_blank" href="https://www.linkedin.com/in/ostad-bin-09369b236">
						<img width="100%" :src="img.tw" />
					</a>
				</div>
				<div class="p-3 float-right" style="width:25%;">
					<a target="_blank" href="https://www.facebook.com/Ostadbin-111014418233687">
						<img width="100%" :src="img.f" />
					</a>
				</div>
			</div>
			<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 p-3 mt-3 float-right">
				<img
					class="w-75 mt-3"
					:src="img.FutureEducation"
					data-aos="fade-right"
					data-aos-duration="3000"
				/>
			</div>
		</div>
	</div>
</template>

	<script>
		import FutureEducation from '../../../assets/img/Future-Education.svg';
		import f from '../../../assets/img/f.svg';
		import t from '../../../assets/img/t.svg';
		import i from '../../../assets/img/i.svg';
		import tw from '../../../assets/img/tw.png';
		import Logo_Footer from '../../../assets/img/Logo_Footer.svg';
		import Path16409 from '../../../assets/img/Path16409.svg';
		import btn from  "../../../UI/button/btn.vue";
		export default {
			name: 'p_home3',
			data(){
				return {
					img: {
							"FutureEducation": FutureEducation,
							"Path16409": Path16409,
							"Logo_Footer": Logo_Footer,
							"i": i,
							"t": t,
							"tw": tw,
							"f": f,
					}
				}
			},
			components: {
				btn,
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
