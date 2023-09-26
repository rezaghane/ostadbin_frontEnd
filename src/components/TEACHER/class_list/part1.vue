<template>
	<div class="w-100 p-3 bg-white border-15 overflow-auto">
		<table class="table">
			<tr class="border">
				<td class="bMikhak p-3 text-center">
					تاریخ
				</td>
				<td class="bMikhak p-3 text-center">
					بازه زمانی
				</td>
				<td class="bMikhak p-3 text-center">
					کل جلسات
				</td>
				<td class="bMikhak p-3 text-center">
					فروخته شده
				</td>
				<td class="bMikhak p-3 text-center">
					وضعیت
				</td>
				<td class="bMikhak p-3 text-center">
					مدیریت
				</td>
			</tr>
			<tr v-for="(f, i) in flds.content" :key="i">
				<td class="text-center yekan">
					{{f.date_class}}
				</td>
				<td dir="ltr" class="yekan text-center">
					{{f.timeRange.start}} - {{f.timeRange.end}}
				</td>
				<td class="yekan text-center">
					{{f.cnt_class}}
				</td>
				<td class="yekan text-center">
					{{f.cnt_reserved}}
				</td>
				<td class="text-center text-danger" v-if="f.status==0">
					غیر فعال
				</td>
				<td class="text-center text-success" v-if="f.status==1">
					فعال
				</td>
				<td class="text-center">
					<router-link
						class="text-orange"
						style="font-size: 14px; text-decoration: underline;"
						:to="'/class/update/'+f.id"
					>
						ویرایش
					</router-link>
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
