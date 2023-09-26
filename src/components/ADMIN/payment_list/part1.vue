<template>
	<div class="w-100 p-3 bg-white border-15 overflow-auto">
		<table class="table">
			<tr class="border">
				<td class="bMikhak p-3 text-center">
					نام کاربر
				</td>
				<td class="bMikhak p-3 text-center">
					نام مدرس
				</td>
				<td class="bMikhak p-3 text-center">
					تاریخ واریز
				</td>
				<td class="bMikhak p-3 text-center">
					مبلغ(تومان)
				</td>
				<td class="bMikhak p-3 text-center">
					تخفیف
				</td>
				<td class="bMikhak p-3 text-center">
					پورسانت
				</td>
				<td class="bMikhak p-3 text-center">
					کد پرداخت
				</td>
				<td class="bMikhak p-3 text-center">
					وضعیت
				</td>
			</tr>
			<tr v-for="(f, i) in flds.content" :key="i">
				<td class="text-center">
					{{f.teachers_fullname}}
				</td>
				<td class="text-center">
					{{f.teachers_fullname2}}
				</td>
				<td dir="ltr" class="yekan text-center">
					{{f.date}}
					{{f.time}}
				</td>
				<td class="yekan text-center">
					{{f.price}}
				</td>
				<td class="yekan text-center">
					{{ Math.round(((f.discount == 0 || f.discount == null) ? 0 : (f.price / f.discount))) }}
				</td>
				<td class="yekan text-center">
					{{ Math.round(((f.commission != 0) ? (f.price / f.commission) : 0)) }}
				</td>
				<td class="text-center">
					{{f.prdCod}}
				</td>
				<td
					class="text-center"
					:class="'text-'+f.status_class"
				>
					{{f.status_name}}
				</td>
			</tr>
		</table>
		<div class="w-100" style="display: flex; align-items: center; justify-content: center;">
			<pageNavigation :page="flds.curPage" :pages="flds.totalPages" @setPage="setPage"  />
		</div>
	</div>
</template>

	<script>
		import btn from  "../../UI/button/btn.vue";
		import userImg from  "../../UI/userImg/userImg.vue";
		import pageNavigation from  "../../UI/pageNavigation/pageNavigation.vue";

		export default {
			name: 'teachers_part1',
			data(){
				return {
					img:{
					}
				}
			},
			components: {
				btn,
				pageNavigation,
				userImg,
			},
			props: {
				flds: {
					default: [],
				},
			},
			mounted(){
			},
			methods:{
				setPage(page){
					this.$emit('setPage', page);
				}
			}
		}
	</script>
<style>

</style>
