<template>
	<div>
		<img
		class=""
		width="100px"
		style="position: absolute;"
		:src="require('../../../assets/img/Illustration_Home_2_1.svg')"
		data-aos="fade-up"
		data-aos-duration="3000"
		/>
		<div class="w-100 overflow-hidden p-3 mt-3"
		:style="'background-image: url('+require('../../../assets/img/Back_Up.svg')+');'"
		style="
    	background-repeat: no-repeat;
    	background-position: top;
    	background-size: cover;
		">
			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 p-3 float-right">
				<h2
				class="bMikhak text-success"
				style="margin-top: 100px;"
				data-aos="fade-up"
				data-aos-duration="3000"
				>
					با برترین مدرس ها، مربیان و اساتید
					<br/>
					در تمامی رشته ها و مقاطع
				</h2>
				<p
				class="text-justify rtl"
				data-aos="fade-up"
				data-aos-duration="3000"
				>
				جلسه ی تدریس خصوصی، می تواند بصورت آنلاین یا حضوری باشد. جلسه ی آنلاین می تواند بصورت تصویری، صوتی یا چت برگزار شود. همچنین جلسه ی تدریس خصوصی حضوری می تواند در محل کاربر یا محل تدریس مدرس انجام شود که تمامی این تنظیمات در اختیار کاربر می‌باشد.
				</p>
				<router-link to="/teachers" class="float-right">
					<btn type="orange" text="مشاهده مدرس ها" />
				</router-link>
				<router-link to="/aboutme" class="float-right">
					<btn
						class="float-right"
						type="white"
						text="بیشتر بدانید"
						textClass="text-success"
						:img="img.ArrowLeft"
					/>
				</router-link>
			</div>
			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 p-3 mt-3 float-right">
				<img
					class="w-100 mt-3"
					:src="require('../../../assets/img/Illustration_Home_2.svg')"
					data-aos="fade-right"
					data-aos-duration="3000"
				/>
			</div>
		</div>
	</div>
</template>

	<script>
		import btn from  "../../../UI/button/btn.vue";
		import ArrowLeft from '../../../assets/img/Arrow_Left.svg';
		export default {
			name: 'p_home3',
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
