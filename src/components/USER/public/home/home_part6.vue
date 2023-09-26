<template>
<div>
	<div class=" overflow-auto">
		<h2 class="text-success pt-3 bMikhak text-center" data-aos="fade-up" data-aos-duration="3000">
			جدیدترین مقالات
		</h2>
		<table class="w-100 rtl">
			<tr>
				<td class="text-center pr-3 pl-3 pt-3 " style="width:30%;">
					<img class="w-100 border-15" 
						:src="require('../../../assets/img/pix/002.png')"
					/>
				</td>
				<td class="text-center pr-3 pl-3 pt-3 " style="width:30%; ">
					<img class="w-100 border-15" :src="require('../../../assets/img/pix/003.png')" />
				</td>
				<td class="text-center pr-3 pl-3 pt-3 " style="width:30%;">
					<img class="w-100 border-15" :src="require('../../../assets/img/pix/001.png')" />
				</td>
			</tr>
			<tr>
				<td class="text-right pr-4 pb-0 bMikhak" style="font-size: 25px;">
					تدریس خصوصی
				</td>
				<td class="text-right pr-4 pb-0 bMikhak" style="font-size: 25px;">
					تدریس خصوصی حضوری یا آنلاین
				</td>
				<td class="text-right pr-4 pb-0 bMikhak" style="font-size: 25px;">
					محل تدریس خصوصی حضوری
				</td>
			</tr>
			<tr>
				<td class="text-justify pr-4" style="vertical-align: top;">
					برای موفقیت در تحصیل و یادگیری تدریس خصوصی بسیار موثر است بطوریکه دانش آموزان و دانشجویانی که احساس می کنند نیاز به تقویت در دروس و تحصیلات خودشان دارند و یا می خواهند از سطح متوسط به سطح عالی برسند، با استفاده از کلاسهای تدریس خصوصی می توانند عقب ماندگی را جبران و یا در یادگیری دروس پیشرفت قابل ملاحظه ای داشته باشند.
				</td>
				<td class="text-justify pr-4" style="vertical-align: top;">
					تدریس خصوصی را می توان به دو صورت حضوری و یا آنلاین  برگزار کرد. در کلاسهای حضوری چون در کلاس درس،  استاد و شاگرد رو در رو  و بصورت زنده کلاس را برگزار می نمایند، بطور قطع و یقین بازدهی بالاتری از جلسات تدریس خصوصی آنلاین خواهد داشت. البته تدریس خصوصی آنلاین هم مزیتهای منحصر به فردی دارد.
					<br/>
				</td>
				<td class="text-justify pr-4 pl-4" style="vertical-align: top;">
					مکان تدریس خصوصی حضوری به دو صورت قابل انتخاب است یا کلاس درس در محل سکونت شاگرد برگزار می‌شود و یا در کلاس درس استانداردی که استاد مشخص می‌کند، برگزار می‌شود. در نوع اول شاگرد نیازی به رفت و آمد ندارد ولی حس حضور در کلاس درس کمتر ایجاد می‌شود اما در نوع دوم شاگرد در کلاس درس استاندارد و محل استاد حاضر می‌شود.

				</td>
			</tr>
		</table>
	</div>


	</div>
</template>

	<script>
		import btn from  "../../../UI/button/btn.vue";
		export default {
			name: 'p_home6',
			data(){
				return {}
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
<style scope>
</style>
