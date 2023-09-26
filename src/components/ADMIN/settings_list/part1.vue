<template>
	<div class="w-100 p-3 bg-white border-15 overflow-auto">
		<table class="table">
			<tr class="border">
				<td id="title" class="bMikhak p-3 text-center">موضوع</td>
				<td id="dsc" class="bMikhak p-3 text-center">اطلاعات</td>
				<td id="href" class="bMikhak p-3 text-center">لینک</td>
				<td id="status" class="bMikhak p-3 text-center">وضعیت</td>
			</tr>
			<tr v-for="(f, i) in flds.content" :key="i">
				<td class="text-center">
					<div
						class="text-truncate pointer"
						style="width: 10vw !important;"
						:title = "f.title"
						@click="edit_me(i, 'title')"
					>
						{{f.title}}
					</div>
				</td>
				<td class="text-center">
					<div
						class="text-truncate pointer"
						style="width: 25vw !important;"
						@click="edit_me(i, 'dsc')"
					>
						{{f.dsc}}
					</div>
				</td>
				<td dir="ltr" class="">
					<div
						class="text-left text-truncate pointer"
						style="width: 10vw !important;"
						@click="edit_me(i, 'href')"
					>
						{{f.href}}
					</div>
				</td>
				<td
					class="text-center text-danger pointer"
					v-if="f.status==0"
					@click="sav(i, 'status', 1)"
				>
					غیر فعال
				</td>
				<td
					class="text-center text-success pointer"
					v-if="f.status==1"
					@click="sav(i, 'status', 0)"
				>
					فعال
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
		import { error, success, loading } from  "../../assets/library/messege.js";

		export default {
			name: 'teachers_part1',
			data(){
				return {
					baseurl: this.$localStorage.get('baseurl'),
					error: error,
					success: success,
					loading: loading,
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
				
				edit_me(i=0, mod=""){
					this.$swal.fire({
						icon: '',
						title: "ویرایش "+$("#"+mod).html(),
						input: 'textarea',
						inputPlaceholder: $("#"+mod).html(),
						inputValue: this.flds.content[i][mod],
						width: "80%",
						showCancelButton: true,
						showCloseButton: true,
						confirmButtonText:"ثبت",
						cancelButtonText:"بستن",
					}).then((result) => {
						if(result.hasOwnProperty("value")){
							this.sav(i, mod, result.value);
						}
					})
				},
				//**********************************************
				sav(i, mod, value, THIS = this){
					//THIS.loading(THIS);
					var id = this.flds.content[i].id;
					$.post(this.baseurl+'settings/' + id, {
					token: this.$localStorage.get("user"),
						role: this.$localStorage.get('user').username.role,
						mod: mod,
						value: value,
					}, function(D){
						if(D.ok==true){
							THIS.success(THIS);
							THIS.flds.content[i][mod] = value;
						}
					}, "json");
				},
				//**********************************************
				setPage(page){
					this.$emit('setPage', page);
				}
			}
		}
	</script>
<style>

</style>
