<template>
	<div>

	<div>
		<h2 class="text-success pt-3 bMikhak text-center" data-aos="fade-up" data-aos-duration="3000">
			معرفی سامانه آموزش تدریس  خصوصی
		</h2>
		<p class="text-center" data-aos="fade-up" data-aos-duration="3000">
			تدریس خصوصی تمامی رشته‌های تحصیلی و غیر تحصیلی در تمامی رشته‌ها و موضوعات مختلف
		</p>
	</div>
	<!-- ------------------------------------------------------------- -->
	<div class="w-100 overflow-hidden">
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 p-3 float-right text-center" data-aos="fade-up" data-aos-duration="3000">
			<img 
			class="w-75" 
			:src="require('../../../assets/img/Benefits_1.svg')"
			alt="آموزش آنلاین و حضوری" title="آموزش آنلاین و حضوری" data-aos-easing="ease-out-cubic" data-aos-duration="2000" />
			<h4 class="text-center bMikhak">
				آموزش آنلاین و حضوری
			</h4>
			<p class="text-center" style="font-size: 12px;" data-aos="fade-up" data-aos-duration="3000">
				<br/>
				امکان انتخاب شیوه آموزشی
				<br/>
				بصورت تدریس خصوصی حضوری یا آنللاین
			</p>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 p-3 float-right text-center" data-aos="fade-up" data-aos-duration="3000">
			<img class="w-75" :src="require('../../../assets/img/Benefits_2.svg')" alt="مقاطع تحصیلی و رشته ها" title="مقاطع تحصیلی و رشته ها"/>
			<h4 class="text-center bMikhak">
				مقاطع تحصیلی و رشته ها
			</h4>
			<p class="text-center" style="font-size: 12px;" data-aos="fade-up" data-aos-duration="3000">
				<br/>
				امکان جستجوی اساتید بر اساس رشته
				<br/>
				و مقطع تحصیلی یا موضوع آموزشی
			</p>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 p-3 float-right text-center" data-aos="fade-up" data-aos-duration="3000">
			<img class="w-75" :src="require('../../../assets/img/Benefits_3.svg')" alt="انتخاب روز و ساعت" title="انتخاب روز و ساعت"/>
			<h4 class="text-center bMikhak">
				انتخاب روز و ساعت
			</h4>
			<p class="text-center" style="font-size: 12px;" data-aos="fade-up" data-aos-duration="3000">
				<br/>
				انتخاب زمان و محل تدریس توسط
				<br/>
				کاربر قبل از ثبت در خواست تدریس
			</p>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 p-3 float-right text-center" data-aos="fade-up" data-aos-duration="3000">
			<img class="w-75" :src="require('../../../assets/img/Benefits_4.svg')" alt="انتخاب محل آموزش" title="انتخاب محل آموزش"/>
			<h4 class="text-center bMikhak">
				انتخاب محل آموزش
			</h4>
			<p class="text-center" style="font-size: 12px;" data-aos="fade-up" data-aos-duration="3000">
				<br/>
				تدریس در منزل کاربر یا
				<br/>
				محل تدریس مشخص شده ی مدرس
			</p>
		</div>
	</div>
	</div>
</template>

	<script>
		import btn from  "../../../UI/button/btn.vue";
		export default {
			name: 'p_home2',
			data(){
				return {

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
