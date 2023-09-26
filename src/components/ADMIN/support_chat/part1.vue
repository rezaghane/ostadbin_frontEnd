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
					نوع کلاس
				</td>
				<td class="bMikhak p-3 text-center">
					زمان کلاس
				</td>
				<td class="bMikhak p-3 text-center">
					مدیریت
				</td>
			</tr>
			<tr
				v-for = "(f, i) in flds.content"
				:key = "i"
			>
				<td class="text-center">
					{{f.users_fullname}}
					<hr class="m-0" />
					<span class="yekan">
						{{f.users_mobile}}
					</span>
				</td>
				<td class="text-center">
					{{f.teachers_fullname}}
					<hr class="m-0" />
					<span class="yekan">
						{{f.teachers_mobile}}
					</span>
				</td>
				<td class="text-center yekan">
					{{f.knd_class}}
				</td>
				<td dir="ltr" class="yekan text-center">
					{{f.date_class}}
					<hr class="m-0" />
					<span class="yekan">
						{{f.time_class.start}} - {{f.time_class.end}}
					</span>
				</td>
				<td class="yekan text-center text-orange pointer" @click="showMe(i)">
					مشاهده
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
				baseurl: this.$localStorage.get('baseurl'),
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
			$('[data-toggle="tooltip"]').tooltip();
		},
		methods:{
			//______________________________________________________________________
			setPage(page){
				this.$emit('setPage', page);
			},
			//______________________________________________________________________
			showMe(i, THIS = this){
				let html = '', clss='', sender='';
				for(let j=0; j<THIS.flds.content[i].text.length; j++){
					if(THIS.flds.content[i].text[j].sender == 'U'){
						sender = 'کاربر: ';
						clss = 'text-danger';
					}
					if(THIS.flds.content[i].text[j].sender == 'T'){
							sender = 'مدرس: ';
							clss = 'text-info';
					}
						html += "<p class='m-0 "+clss+"' style='font-size: 15px; border-bottom: 1px solid #eee;'><span class='text-orange'>" + sender + "</span>" + THIS.flds.content[i].text[j].text + " &nbsp; <span class='yekan' style='color: gray;'>" + THIS.flds.content[i].text[j].date + "</span></p>"
				}
					THIS.$swal.fire({
						position: 'center',
						type: '',
						title: "",
						html: html,
						width: "80%",
						showCloseButton: true,
						showCancelButton: false,
						showConfirmButton: true,
						confirmButtonText: "بستن",
					})
				}
			}
		}
		</script>
		<style>

		</style>
