<template>
	<div style="background-color:#fffcf7;" class="container">
		<headMenu />
		<div
			class="w-100 overflow-hidden"
			:class="(windowWidth<=1000)? 'h-center': ''"
		>
			<div class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left p-3">
				<back
					title="در خواست ها"
					showBtn="false"
					leftBtn="true"
					leftBtnType="success"
					leftBtnText="ثبت درخواست"
					leftBtn1="true"
					leftBtn1Type="outline-success"
					leftBtn1Text="دریافت گزارش"
					v-if="$localStorage.get('user').username.role==3"
					@clickMe="$router.push('/reserved/user/create')"
					@clickMe2="filter = !filter"
				/>
				<div class="w-100 overflow-hidden" style="" v-if="filter">
					<h2 class='bMikhak w-100 text-center'>
						دریافت گزارش
					</h2>
					<datepicker
						class="col-6 pr-0 float-right overflow-hidden"
						min="false"
						label="از تاریخ"
						@input="(e)=>{val.from = e}"
						:value="val.from"
					/>
					<datepicker
						class="col-6 pl-0 float-right overflow-hidden"
						min="false"
						label="تا تاریخ"
						@input="(e)=>{val.to = e}"
						:value="val.to"
					/>
				</div>
				<btn
					text="ذخیره"
					class="mt-3 w-100"
					textClass="w-100"
					:disable="(val.to == '' || val.from == '') ? '1' : '0'"
					@clickMe="xlsx()"
					v-if="filter"
				/>
				<input
					type="text"
					class="p-4 w-100 border-15 form-control shadow mb-3 mt-3"
					placeholder="جستجو کنید..."
					:style="'background-image:url('+require('../../assets/img/Search.svg')+')'"
					style="background-repeat: no-repeat; background-position: 15px center; background-size: 25px;"
					@input="loader(1, $event.target.value)"
					v-if="$localStorage.get('user').username.role==3"
				/>
				<part1
					:flds="flds.data"
					v-if="flds.ok==true"
					@setPage = "setPage"
				/>
				<empty
					v-else-if="flds.ok==false"
					text="در خواستی  ثبت نشده است"
				/>
				<loading
					v-else-if="flds.ok==null"
					text="لطفا صبر کنید"
				/>
			</div>
			<div class="col-lg-3 col-md-3 float-left"  v-if="windowWidth>1000">
				<part2 select="0" />
			</div>
		</div>
		<footerPage />
	</div>
</template>

	<script>
		import XLSX from 'xlsx';

		import part1 from  "./part1.vue";
		import part2 from  "./part2.vue";
		import btn from  "../../UI/button/btn.vue";
		import datepicker from  "../../UI/input/datepicker.vue";
		import back from  "../../UI/back/back.vue";
		import empty from  "../../UI/empty/empty.vue";
		import loading from  "../../UI/loading/loading.vue";
		import headMenu from  "../../menu/headMenu.vue";
		import footerPage from  "../public/home/home_part9.vue";
		import { success, success_sm, error } from  "../../assets/library/messege.js";

		export default {
			name: 'teachers',
			data(){
				return {
					error: error,
					imgurl: this.$localStorage.get('imgurl'),
					baseurl: this.$localStorage.get('baseurl'),
					flds: {ok: null, data: []},
					filter: false,
					degrees: [],
					category: [],
					location: [],
					val:{
						from: '',
						to: '',
					},
				}
			},
			components: {
				btn,
				back,
				empty,
				loading,
				part1,
				part2,
				footerPage,
				headMenu,
				datepicker,
			},
			props: [],
			computed :{
			},
			mounted(){
				this.$swal.close();
				if(this.$localStorage.get('user')==null){
					this.$localStorage.set('urlPath', window.location.pathname);
					this.$router.push('/login');
				}else{
					this.loader();
				}
			},
			methods:{
				xlsx(THIS = this){
					$.post(this.baseurl+'xlsx/reserved', { token: this.$localStorage.get("user"), from: THIS.val.from, to: THIS.val.to }, function(D){
						if(D.status.code=="401"){
							THIS.$localStorage.remove('user');
							THIS.$router.push('/login');
						}else if(D.status.code=="400"){
							THIS.error(THIS, "اطلاعاتی یافت نشد");
						}
						else{
							const data = XLSX.utils.json_to_sheet(D.data)
							const wb = XLSX.utils.book_new()
							XLSX.utils.book_append_sheet(wb, data, 'data')
							XLSX.writeFile(wb,'reserved.xlsx');
							THIS.val.to = '';
							THIS.val.from = '';
						}
					}, "json");
				},
				// *********************************************************************
				setPage(p){
					this.loader(p);
				},
				// *********************************************************************
				loader(p=1, search= '',THIS = this){
					document.body.scrollTop = 0;
					let user;
					if(this.$localStorage.get("user").username.role != 3){
						user = this.$localStorage.get("user").username.id;
					}else if(this.$route.params.id != undefined){
						user = this.$route.params.id;
					}else{
						user = '';
					}
					$.post(this.baseurl+'reserved/teachers?n=5&p='+p, {
						 token: this.$localStorage.get("user"),
						 search: search ,
						 username: user,
						 role: this.$localStorage.get("user").username.role,
						 token: this.$localStorage.get("user")
					 }, function(D){

						if(D.status.code=="401"){
							THIS.$localStorage.remove('user');
							THIS.$router.push('/login');
						}else{
							THIS.flds= {ok: false, data: []};
							if(search == D.data.search){
								THIS.flds = D;
							}
						}
					}, "json");
				}
				// *********************************************************************
			}
		}
	</script>
<style>

</style>
