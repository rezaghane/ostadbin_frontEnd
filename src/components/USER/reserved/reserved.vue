<template>
	<div style="background-color:#fffcf7;" class="container">
		<loginUser />
		<headMenu />
		<div class="w-100 overflow-hidden p-3">
			<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 float-right">
				<teachersIdPart2
					class="bg-white p-3 border-15 shadow"
					v-if="flds.ok"
					:flds="flds.data"
					data-aos="flip-left"
					data-aos-easing="ease-out-cubic"
					data-aos-duration="2000"
				/>
			</div>
			<back class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left" title="صورت حساب و پرداخت هزینه" />
			<div dir="rtl" class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left p-3 bg-white border-15 shadow overflow-hidden h-center" v-if="flds.ok">
				<div class="w-75">
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
							<tr v-for="(f, i) in data.data" :key="i">
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
					<br/>
					<table class="table" v-if="data.ok">
						<tr>
							<td class="border-none text-success">
								مبلغ قابل پرداخت:
							</td>
							<td class="text-left border-none text-success">
								<span
								class="yekan"
								v-if="val.discount.id!=0"
								>
								{{price() - (price() * val.discount.percentage / 100) }}
							</span>
								<span
								class="yekan"
								:style="(val.discount.id == 0) ? '' : 'text-decoration: line-through;'"
								:class="(val.discount.id == 0) ? '' : 'text-danger'"
								>
									{{price()}}
								</span>
								<!-- val.discount.id!=0 -->
								<span class="ltr">
									تومان
								</span>
							</td>
						</tr>
						<tr>
							<td class="pt-3 pr-0 pl-0 border-none" colSpan="2">
								<btn
									@clickMe="()=>{ val.showDiscut = !val.showDiscut; val.discutCode = ''; }"
									type="white"
									textClass="w-100 text-success"
									text="کد تخفیف دارم"
									v-show="!val.showDiscut && val.discount.id==0"
								/>
								<textInput
									autofocus="true"
									label="کد تخفیف"
									textClass="pointer"
									@inputTxtFunc = "(e)=>{ val.discutCode = e; }"
									@enter = "(e)=>{ if(val.discutCode.length>=3) checkDiscut(); }"
									@inputTxtClickFunc = "()=>{ val.showDiscut = !val.showDiscut; }"
									:val = "val.discutCode"
									:img="require('../../assets/img/addDiscut.png')"
									v-show="val.showDiscut && val.discount.id==0"
								/>

								<div v-if="val.discount.id!=0">
									<btn
										type="white"
										class="float-right overflow-hidden"
										textClass="text-success"
										dir="ltr"
										imgSize="40px"
										:img="require('../../assets/img/Status_No.svg')"
										text=""
										@clickMe="()=>{ val={ showDiscut: false, discutCode: '', discount: { id: 0, percentage: 0, code: ''} }; }"
									/>
									<span style="color: #a5a2a2; font-size: 13px;">
										کد تخفیف:
										{{ val.discount.code }}
									</span>
									<br/>
									<span class="text-success">
										مبلغ
										{{ price() * val.discount.percentage / 100 }}
										تومان از مبلغ شما کسر شد.
									</span>
								</div>
							</td>
						</tr>
						<tr>
							<td class="pt-3 pr-0 pl-0 border-none" colSpan="2">
								<btn
									@clickMe="sav()"
									textClass="w-100"
									text="تایید و پرداخت"
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
	import textInput from  "../../UI/input/textInput.vue";
	import back from  "../../UI/back/back.vue";
	import headMenu from  "../../menu/headMenu.vue";
	import teachersIdPart2 from  "../public/teachers_id/teachers_id_part2.vue";
	import loginUser from  "../../check/login_user.vue";
	import {loading, success_sm, error, success} from  "../../assets/library/messege.js";

	export default {
		name: 'teachers_id',
		data(){
			return {
				loading: loading,
				error: error,
				success: success,
				success_sm: success_sm,

				imgurl: this.$localStorage.get('imgurl'),
				baseurl: this.$localStorage.get('baseurl'),
				flds: {"ok": false, "data": []},
				data: {"ok": false, "data": []},
				img:{
				},
				val:{
					showDiscut: false,
					discutCode: '',
					reservedId: this.$localStorage.get('reservedId'),
					discount: {
						id: 0,
						percentage: 0,
						code: '',
					}
				},
			}
		},
		components: {
				btn,
				back,
				textInput,
				headMenu,
				footerPage,
				teachersIdPart2,
				loginUser,
		},
			props: [],
		mounted(){
		this.$swal.close();
			this.loading(this);
			if(this.$localStorage.get('reservedId')!=null){
				this.loader();
			}else{
				this.$router.push('/teachers');
			}
		},
		methods:{
			checkDiscut(THIS=this){
				this.loading(this);
				$.post(this.baseurl+'discount/check', { token: this.$localStorage.get("user"), val: this.val }, function(D){
					THIS.val.discutCode = '';
					THIS.val.discount= {
						id: 0,
						percentage: 0,
						code: '',
					};
					if(D.ok){
						THIS.success(THIS, 'کد تخفیف اعمال شد');
						THIS.val.discount= {
							id: D.data.id,
							percentage: D.data.percentage,
							code: D.data.code,
						};
						
					}else{
						THIS.error(THIS, 'کد تخفیف وارد شده اشتباه است');
					}
				}, "json");
			},
			// *********************************************************************
			sav(THIS=this){
				let url = this.$localStorage.get('baseurl')+"/prdOnline.php?id=" + this.$localStorage.get('reservedId') + "&mobile="+this.$localStorage.get('mobile') + "&discount=" + this.val.discount.id;
				location.replace(url);
			},
			// *********************************************************************
			price(){
				let p = 0;
				for(let i=0; i<this.data.data.length; i++){
					p += parseInt(this.data.data[i].price);
				}
				return p;
			},
			// *********************************************************************
			loader(THIS=this){
				$.get(this.baseurl+'view/teachers/'+this.$localStorage.get('dateTime')[0].teacher, { token: this.$localStorage.get("user"), }, function(D){			
					if(D.status.code=="401"){
						THIS.$localStorage.remove('user');
						THIS.$router.push('/login');
					}else{
						THIS.flds = D;
					}
				}, "json");
				$.post(this.baseurl+'reserved/'+this.$localStorage.get('reservedId'), { role: this.$localStorage.get('user').username.role }, function(D){
					
					THIS.data = D;
					THIS.success_sm(THIS, "آماده شد");
				}, "json");
			},
				// *********************************************************************
		}
	}
</script>
<style>

</style>
