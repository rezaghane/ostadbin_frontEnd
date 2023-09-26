<template>
	<div style="background-color:#fffcf7;" class="container">
		<loginUser />
		<headMenu />
		<div class="w-100 overflow-hidden p-3">
			<loading v-if="!data.ok" />
			<div
				dir="rtl"
				class="col-lg-9 col-md-9 col-sm-12 col-xs-12 m-auto p-3 bg-white border-15 shadow overflow-hidden h-center"
				v-if="data.ok"
				v-for="(f, i) in data.data" :key="i"
			>
				<div class="w-75 text-center">
					<img :src="img.Status_Yes" height="50" width="50" v-if="f.reserved_status_id==2" />
					<img :src="img.Status_No" height="50" width="50" v-else />
					<p class="bMikhak text-center mt-3 mb-3" style="font-size: 25px;" v-if="f.reserved_status_id==2">
						درخواست با موفقیت ثبت شد
					</p>
					<p class="bMikhak text-center mt-3 mb-3" style="font-size: 25px;" v-else>
						درخواست ثبت نشد!
					</p>
					<div
						class="w-100 border border-15 p-3 bg-light-green overflow-auto"
						data-aos="flip-right"
						data-aos-easing="ease-out-cubic"
						data-aos-duration="2000"
					>
						<p class="bMikhak text-center text-success">
							جلسه انتخابی
						</p>
						<table class="table" v-if="data.ok">
							<tr>
								<td class="yekan border-none">
									در تاریخ
									{{f.date_class}}
								</td>
								<td class="yekan text-left border-none">
									ساعت
									{{f.time_class.start}}
									تا
									{{f.time_class.end}}
								</td>
							</tr>
						</table>
					</div>
					<div
						class="w-100 border border-15 p-3 bg-light-green mt-3"
						data-aos="flip-right"
						data-aos-easing="ease-out-cubic"
						data-aos-duration="2000"
						v-if="f.knd_class_id!=2"
					>
						<p class="bMikhak text-center text-success">
							آدرس محل تحصیل
						</p>
						<p class="text-right" v-if="f.knd_class_id==1">
							{{f.address_teach}}
						</p>
						<p class="text-right" v-else-if="f.knd_class_id==3">
							{{f.address}}
						</p>
					</div>
					<div
						class="w-100 border border-15 p-3 bg-light-green mt-3 overflow-auto"
						data-aos="flip-right"
						data-aos-easing="ease-out-cubic"
						data-aos-duration="2000"
						v-if="f.knd_class_id!=2"
					>
						<p class="bMikhak text-center text-success">
							جزئیات خرید
						</p>
						<table class="table" v-if="data.ok">
							<tr>
								<td class="yekan border-none">
									کدپیگیری:
								</td>
								<td class="yekan text-left border-none">
									{{ f.prdCod }}
								</td>
							</tr>
						</table>
					</div>
					<br/>
					<table class="table" v-if="data.ok">
						<tr>
							<td class="border-none">
								<router-link :to="'/teachers/'+f.teachers_id">
									<btn
										type="outline-success"
										textClass="w-100"
										class="w-100"
										text="مشاهده مشاور"
									/>
								</router-link>
							</td>
							<td class="yekan w-50 border-none">
								<btn
									textClass="w-100"
									class="w-100"
									@clickMe="showMe()"
									text="مشاهده جزئیات"
								/>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<footerPage />
	</div>
</template>

<script>
	import btn from  "../../UI/button/btn.vue";
	import footerPage from  "../../UI/footer/footer.vue";
	import back from  "../../UI/back/back.vue";
	import loading from  "../../UI/loading/loading.vue";
	import headMenu from  "../../menu/headMenu.vue";
	import Status_No from  "../../assets/img/Status_No.svg";
	import Status_Yes from  "../../assets/img/Status_Yes.svg";
	import teachersIdPart2 from  "../public/teachers_id/teachers_id_part2.vue";
	import loginUser from  "../../check/login_user.vue";

	export default {
		name: 'teachers_id',
		data(){
			return {
				imgurl: this.$localStorage.get('imgurl'),
				baseurl: this.$localStorage.get('baseurl'),
				flds: {"ok": false, "data": []},
				data: {"ok": false, "data": []},
				img:{
					"Status_No": Status_No,
					"Status_Yes": Status_Yes,
				},
				val:{

				},
			}
		},
		components: {
				btn,
				loading,
				back,
				headMenu,
				footerPage,
				teachersIdPart2,
				loginUser,
				Status_No,
				Status_Yes,
		},
			props: [],
		mounted(THIS = this){
			if(this.$localStorage.get('reservedId')!=null){
				THIS.loader();
			}else{
				this.$router.push('/teachers');
			}
		},
		methods:{
			showMe(){
				this.$router.push('/reserved/user/' + this.$route.params.id);
				// let html = `
				// 	<table class="table">
				// 		<tr>
				// 			<td class="bMikhak">
				// 				مدرس:
				// 			</td>
				// 			<td>
				// 				`+this.f.fullname+`
				// 			</td>
				// 		</tr>
				// 		<tr>
				// 			<td class="bMikhak">
				// 				مقطع:
				// 			</td>
				// 			<td>
				// 				`+this.data.data.degre+`
				// 			</td>
				// 		</tr>
				// 		<tr>
				// 			<td class="bMikhak">
				// 				درس:
				// 			</td>
				// 			<td>
				// 				`+this.data.data.category+`
				// 			</td>
				// 		</tr>
				// 		<tr>
				// 			<td class="bMikhak">
				// 				رشته:
				// 			</td>
				// 			<td>
				// 				`+this.data.data.field+`
				// 			</td>
				// 		</tr>
				// 		</tr>
				// 		<tr>
				// 			<td class="bMikhak">
				// 				نوع کلاس:
				// 			</td>
				// 			<td>
				// 				`+this.data.data.knd_class+`
				// 			</td>
				// 		</tr>
				// 		<tr>
				// 			<td class="bMikhak">
				// 				تاریخ کلاس:
				// 			</td>
				// 			<td class="yekan">
				// 				`+this.data.data.date_class+`
				// 			</td>
				// 		</tr>
				// 		<tr>
				// 			<td class="bMikhak">
				// 				ساعت کلاس:
				// 			</td>
				// 			<td class="yekan">
				// 				`+this.data.data.time_class.start+` _ `+this.data.data.time_class.end+`
				// 			</td>
				// 		</tr>
				// 		<tr>
				// 			<td class="bMikhak">
				// 				توضیحات کاربر:
				// 			</td>
				// 			<td>
				// 				`+this.data.data.explain_user+`
				// 			</td>
				// 		</tr>
				// 		<tr>
				// 			<td class="bMikhak">
				// 				هزینه:
				// 			</td>
				// 			<td class="yekan">
				// 				`+this.data.data.price+` تومان
				// 			</td>
				// 		</tr>
				// 		<tr>
				// 			<td class="bMikhak">
				// 				وضعیت:
				// 			</td>
				// 			<td>
				// 				`+this.data.data.reserved_status+`
				// 			</td>
				// 		</tr>
				// 		<tr>
				// 			<td class="bMikhak">
				// 				زمان ثبت نام:
				// 			</td>
				// 			<td class="yekan">
				// 				`+this.data.data.date+` _ `+this.data.data.time+`
				// 			</td>
				// 		</tr>
				// 	</table>
				// `;
				// this.$swal.fire({
				// 	position: 'center',
				// 	type: '',
				// 	title: "",
				// 	html: html,
				// 	showCloseButton: true,
				// 	showConfirmButton: true,
				// 	confirmButtonText: "بستن",
				// 	showCancelButton: false,
				// })
			},
			// *********************************************************************
			loader(THIS=this){
				$.get(this.baseurl+'reserved/'+this.$route.params.id, {  }, function(D){
					THIS.data = D;
					THIS.setStatus();
				}, "json");
			},
			// *********************************************************************
			setStatus(THIS=this){
				let id = this.$localStorage.get('reservedId').split(',');
				if(THIS.data.data[0].reserved_status_id==2){
					for(let i=0; i<id.length; i++){
						$.post(this.baseurl+'reserved/setStatus', {
							token: this.$localStorage.get("user"), id: id[i],
							status: 6,
							address: this.$localStorage.get('dateTime').address_teach
						}, function(D){
							if(i+1 == id.length){
									// THIS.$localStorage.remove('dateTime');

							}
						}, "json");
					}
				}
			},
				// *********************************************************************
		}
	}
</script>
<style>

</style>
