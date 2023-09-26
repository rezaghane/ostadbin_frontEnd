<template>
	<div>
		<div class="container overflow-hidden p-3 mt-3 border-15 bg-success"
			style="display: flex;
    align-items: center;
		">
			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 p-3 mt-3 float-right">
				<img
					class="w-100 mt-3"
					:src="require('../../../assets/img/Illustration_Home_3.svg')"
					data-aos="fade-up"
					data-aos-duration="3000"
				/>
			</div>
			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 p-3 float-right h-center" style="height: 50%;	">
				<div>
					<h2
						class="bMikhak text-orange"
						data-aos="fade-up"
						data-aos-duration="3000"
					>
						دعوت به همکاری از مدرسان، مربیان و اساتید
					</h2>
					<p
						class='text-white text-justify rtl'
						data-aos="fade-up"
						data-aos-duration="3000"
					>
						مدرس ها و مربیان مقاطع و رشته های تحصیلی و غیرتحصیلی مختلف می‌توانند صفحه ی اختصاصی خود را در استادبین داشته باشند و به مدیریت کلاس های تدریس خصوصی خود بصورت آنلاین و حضوری بپردازند.
					</p>
					<router-link to="/signupTeacher" class="float-right">
						<btn
							type="orange"
							text="درخواست همکاری"
						/>
					</router-link>
					<router-link to="/aboutme" class="float-right">
						<btn
							dir="rtl"
							class="float-right"
							type=""
							text="بیشتر بدانید"
							textClass="text-white"
							:img="img.ArrowLeft"
						/>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

	<script>
		import btn from  "../../../UI/button/btn.vue";
		import ArrowLeft from '../../../assets/img/Arrow_Left_White.svg';
		export default {
			name: 'p_home3',
			data(){
				return {
					img: {
							"ArrowLeft": ArrowLeft,
					},
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
.bg-success {
    background-color: #219380 !important;
}
</style>
