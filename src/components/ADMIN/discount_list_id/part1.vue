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
				<td class="bMikhak p-3 text-center" colspan="2">
					ناریخ واریز
				</td>
				<td class="bMikhak p-3 text-center">
					مبلغ (تومان)
				</td>
				<td class="bMikhak p-3 text-center">
					تخفیف
				</td>
				<td class="bMikhak p-3 text-center">
					کدپرداخت
				</td>
			</tr>
			<tr v-for="(f, i) in flds.content" :key="i">
				<td class="text-center">
					{{f.users}}
				</td>
				<td class="text-center">
					{{f.teachers}}
				</td>
				<td class="text-center">
					{{f.time}}
				</td>
				<td class="text-center">
					{{f.date}}
				</td>
				<td class="text-center">
					{{f.price}}
				</td>
				<td class="text-center">
					{{ f.price * (f.percentage/100) }}
				</td>
				<td class="text-center">
					{{ f.prdCod }}
				</td>
			</tr>
		</table>
		<br/>
		<br/>
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
