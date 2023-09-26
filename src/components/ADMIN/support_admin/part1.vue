<template>
	<div class="w-100 p-3 bg-white border-15 overflow-auto">
		<table class="table">
			<tr class="border">
				<td class="bMikhak p-3 text-center">
					نام کاربر
				</td>
				<td class="bMikhak p-3 text-center">
					نام و نام خانوادگی
				</td>
				<td class="bMikhak p-3 text-center">
					شماره موبایل
				</td>
				<td class="bMikhak p-3 text-center">
					ایمیل
				</td>
				<td class="bMikhak p-3 text-center">
					آخرین پیام
				</td>
				<td class="bMikhak p-3 text-center">
					وضعیت
				</td>
				<td class="bMikhak p-3 text-center">
					مدیریت
				</td>
			</tr>
			<tr
				v-for = "(f, i) in flds.content"
				:key = "i"
			>
				<td
					class="text-center"
					data-toggle = "tooltip"
					data-placement = "top"
					:title = "setTitle(i)"
				>
					{{f.username}}
				</td>
				<td
					class="text-center"
					data-toggle = "tooltip"
					data-placement = "top"
					:title = "setTitle(i)"
				>
					{{f.fullname}}
				</td>
				<td
					class="text-center yekan"
					data-toggle = "tooltip"
					data-placement = "top"
					:title = "setTitle(i)"
				>
					{{f.mobile}}
				</td>
				<td
					data-toggle = "tooltip"
					data-placement = "top"
					:title = "setTitle(i)"
					class="text-center yekan"
				>
					{{f.email}}
				</td>
				<td
					data-toggle = "tooltip"
					data-placement = "top"
					:title = "setTitle(i)"
					class="yekan text-center"
				>
					{{f.date}}
				</td>
				<td
					data-toggle = "tooltip"
					data-placement = "top"
					:title = "setTitle(i)"
					class="yekan text-center text-success"
					v-if="f.read==0 || f.read==3"
				>
					خوانده شده
				</td>
				<td
					data-toggle = "tooltip"
					data-placement = "top"
					:title = "setTitle(i)"
					class="yekan text-center text-danger"
					v-else
				>
					خوانده نشده
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
				setTitle(i){
					let title = '';
					if(this.flds.content[i].knd=='comment'){
						title = "اطلاعات تایید نشده است";
					}else if(this.flds.content[i].role=='1'){
						title = "دانش آموز";
					}else if(this.flds.content[i].role=='2'){
						title = "مدرس";
					}
					return title;
				},
				//______________________________________________________________________
				setPage(page){
					this.$emit('setPage', page);
				},
				//______________________________________________________________________
				showMe(i, THIS = this){
					$.post(THIS.baseurl+'support/read', {
						token: this.$localStorage.get("user"),
						id: THIS.flds.content[i].id,
						knd: THIS.flds.content[i].knd,
						role: this.$localStorage.get("user").username.role
					}, function(D){
						THIS.flds.content[i].read = 0;
					}, "json");
					if(THIS.flds.content[i].knd=="comment"){
						THIS.$swal.fire({
							position: 'center',
							type: '',
							title: "",
						html: `
							<h1 class="text-success bMikhak">`+THIS.flds.content[i].fullname+`</h1>
							<p class="m-0">آدرس ایمیل: `+THIS.flds.content[i].email+`</p>
							<p class="mb-3 yekan">شماره موبایل: `+THIS.flds.content[i].mobile+`</p>
							<div class='text-justify'>`+THIS.flds.content[i].text+`</div>
						`,
							width: "80%",
							showCloseButton: true,
							showCancelButton: false,
							showConfirmButton: true,
							confirmButtonText: "بستن",
						})
					}else{
						this.$router.push("/chat/user/admin/" + THIS.flds.content[i].id);
					}
				}
			}
		}
	</script>
<style>

</style>
