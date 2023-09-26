	<template>
		<div class="w-100">
			<back
				title="جزئیات در خواست"
				:leftBtn="($localStorage.get('user').username.role==3) ? 'true' : 'false'"
				leftBtnText="ویرایش درخواست"
				leftBtnType="success"
				@clickMe="updateRtr()"
			/>
			<div
				data-aos="fade-up"
				data-aos-duration="1500"
				class="w-100 p-3 overflow-hidden shadow border-15 border mb-3 bg-white"
			>
				<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 float-right text-center">
					<userImg
						imgClass="m-auto"
						:src="flds.img"
						:class="(this.$localStorage.get('user').username.role==1) ? 'pointer' : ''"
						@click = "rtrT()"
					/>
				</div>
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right">
					<div class="">
						<p
							class="bMikhak mt-3"
							:class="(this.$localStorage.get('user').username.role==1) ? 'pointer' : ''"
							@click = "rtrT()"
						>
							{{flds.fullname}}
							&nbsp;
							<img
								:src="require('../../assets/img/Arrow_Left_Long.svg')"
								v-if="$localStorage.get('user').username.role == 3"
							/>
							&nbsp;
							<span class="bMikhak" v-if="flds.teachers_fullname != '' && flds.teachers_fullname != null">
								{{flds.teachers_fullname}}
							</span>
							<span class="bMikhak text-orange" v-else-if="$localStorage.get('user').username.role == 3">
								(نامشخص)
							</span>
						</p>
						<div class="bMikhak text-success mt-3" >
							<i class="fa fa-chalkboard-teacher" v-if="flds.knd_class_id==1"></i>
							<i class="fa fa-laptop" v-else-if="flds.knd_class_id==2"></i>
							<i class="fa fa-home" v-else-if="flds.knd_class_id==3"></i>
							&nbsp;
							{{flds.knd_class}}
						</div>
						<div class="text-truncate mt-3 yekan">
							هزینه پرداختی:
							{{flds.price}}
							تومان
						</div>
					</div>
				</div>
				<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 float-right">
					<div
						class="bMikhak text-orange mt-3"
						:class="(windowWidth < 767) ? '' : 'text-left' "
					>
						تاریخ خرید:
						<br v-show="windowWidth >= 767" />
						<span class="text-success yekan">
							{{flds.date}}
						</span>
					</div>
					<btn
						type="orange"
						class="float-left mt-3"
						:class="(windowWidth < 767) ? 'w-100' : '' "
						:textClass="(windowWidth < 767) ? 'w-100' : '' "
						text="ارسال پیام"
						:disable="(flds.reserved_status_id==5)? '1' : '0'"
						@clickMe="goChat()"
						v-if="$localStorage.get('user').username.role!=3"
					/>
					<btn
						type="orange"
						class="float-left mt-3"
						text="مشاهده گفتگو"
						:class="(windowWidth < 767) ? 'w-100' : '' "
						:textClass="(windowWidth < 767) ? 'w-100' : '' "
						disableText = "پیامی ارسال نشده است"
						:disable="(flds.messege.length>0)? '0' : '1'"
						@clickMe="showChat()"
						v-if="$localStorage.get('user').username.role==3"
					/>
				</div>
				<div class="w-100 overflow-hidden p-3">
					<div
						class="col-lg-4 col-md-4 col-sm-12 col-xs-12 bMikhak"
						:class="(windowWidth > 767) ? 'float-right text-right ' : '' "
					>
						<img width="45" :src="require('../../assets/img/Status_Yes.svg')" />
						مقطع تحصیلی:
						{{flds.degre}}
					</div>
					<div
						class="col-lg-4 col-md-4  col-sm-12  col-xs-12 bMikhak"
						:class="(windowWidth > 767) ? 'float-right text-center ' : '' "
					>
						<img width="45" :src="require('../../assets/img/Status_Yes.svg')" />
						رشته تحصیلی:
						{{flds.field}}
					</div>
					<div
						class="col-lg-4 col-md-4  col-sm-12  col-xs-12 bMikhak"
						:class="(windowWidth > 767) ? 'float-right text-left ' : '' "
					>
						<img width="45" :src="require('../../assets/img/Status_Yes.svg')" />
						درس:
						{{flds.category}}
					</div>
				</div>
				<div class="w-100 overflow-hidden p-3" v-if="flds.explain_user!=''">
					<div class="float-right col-lg-12">
						<span class="bMikhak">
							توضیحات:
						</span>
						{{flds.explain_user}}
					</div>
				</div>
				<div class="w-100 overflow-hidden p-3" v-if="flds.date_class != '' && flds.date_class != null">
					<div class="float-right text-center col-lg-6 col-md-6 col-sm-12 col-xs-12 p-3">
						<div class="border border-15 bg-light-green p-3 overflow-auto">
							<p class="text-success bMikhak text-center">
								تاریخ جلسه
							</p>
							<table class="table">
								<tr>
									<td class="yekan border-none">
										در تاریخ
										{{flds.date_class}}
									</td>
									<td class="yekan text-left border-none">
										ساعت
										{{flds.time_class.start}}
										تا
										{{flds.time_class.end}}
									</td>
								</tr>
							</table>
						</div>
					</div>
					<div class="float-right text-center col-lg-6 col-md-6 col-sm-12 col-xs-12 p-3" v-if="flds.reserved_status_id==2 && flds.endClass==0">
						<!-- ------------------------------------------------------------- -->
						<div class="border border-15 bg-light-green p-3" v-if="flds.knd_class_id==1">
							<p class="text-success bMikhak text-center">
								آدرس محل تحصیل
							</p>
							<p class="text-right">
								{{flds.address_teach}}
							</p>
						</div>
						<!-- ------------------------------------------------------------- -->
						<div class="border border-15 bg-light-green p-3" v-else-if="flds.knd_class_id==2">
							<p class="text-success bMikhak text-center">
								لینک جلسه آنلاین
							</p>
							<btn
								class="w-100"
								textClass="w-100"
								:text="(flds.link == '' || flds.link == null) ? 'افزودن لینک' : 'ویرایش لینک'"
								@clickMe="setLink();"
								v-if="$localStorage.get('user').username.role==3"
							/>
							<a
								:href="flds.link"
								target="_blank"
								v-else
							>
								<btn
									class="w-100"
									textClass="w-100"
									:disable="flds.disable_link"
									:text="(flds.disable_link==0)? 'ورود به جلسه' : 'غیر فعال'"
								/>
							</a>
							<!-- @clickMe="rtr()" -->
						</div>
						<!-- ------------------------------------------------------------- -->
						<div class="border border-15 bg-light-green p-3" v-else-if="flds.knd_class_id==3">
							<p class="text-success bMikhak text-center">
								آدرس محل تحصیل
							</p>
							<p class="text-right">
								{{flds.address}}
							</p>
						</div>
					</div>
					<!-- _____________________________________________________________________________________________________ -->
					<div class="float-right text-center col-lg-6 col-md-6 col-sm-12 col-xs-12 p-3" v-else-if="flds.reserved_status_id==2 && flds.endClass==1">
						<!-- ------------------------------------------------------------- -->
						<div class="border border-15 bg-light-green p-3" >
							<p class="text-success bMikhak text-center">
								ثبت امتیاز
							</p>
							<p class="text-center">
								به عملکرد این مدرس چه امتیازی می‌دهید؟
							</p>
							<p class="text-left ltr">
								<img
									class='pointer'
									:src="require('../../assets/img/star_off.svg')"
									@mousemove="grade=1"
									v-show="grade < 1"
								/>
								<img
									class='pointer'
									:src="require('../../assets/img/star_on.svg')"
									@mousemove="grade=1"
									v-show="grade >= 1"
								/>
								&nbsp;
								<img
									class='pointer'
									:src="require('../../assets/img/star_off.svg')"
									@mousemove="grade=2"
									v-show="grade < 2"
								/>
								<img
									class='pointer'
									:src="require('../../assets/img/star_on.svg')"
									@mousemove="grade=2"
									v-show="grade >= 2"
								/>
								&nbsp;
								<img
									class='pointer'
									:src="require('../../assets/img/star_off.svg')"
									@mousemove="grade=3"
									v-show="grade < 3"
								/>
								<img
									class='pointer'
									:src="require('../../assets/img/star_on.svg')"
									@mousemove="grade=3"
									v-show="grade >= 3"
								/>
								&nbsp;
								<img
									class='pointer'
									:src="require('../../assets/img/star_off.svg')"
									@mousemove="grade=4"
									v-show="grade < 4"
								/>
								<img
									class='pointer'
									:src="require('../../assets/img/star_on.svg')"
									@mousemove="grade=4"
									v-show="grade >= 4"
								/>
								&nbsp;
								<img
									class='pointer'
									:src="require('../../assets/img/star_off.svg')"
									@mousemove="grade=5"
									v-show="grade < 5"
								/>
								<img
									class='pointer'
									:src="require('../../assets/img/star_on.svg')"
									@mousemove="grade=5"
									v-show="grade >= 5"
								/>
								<span class="float-right bMikhak text-success">
									{{ gradeDsc[grade]}}
								</span>
								<btn
									class="mt-3 w-100"
									textClass="w-100"
									text="ثبت امتیاز"
									:disable="grade==0"
									disableText="امتیاز مدرس را مشخص نمایید"
									@clickMe="setGrade()"
									v-if="flds.grade==0"
								/>
							</p>

						</div>
					</div>

					<div class="float-right text-center col-lg-6 col-md-6 col-sm-12 col-xs-12 p-3" v-if="flds.reserved_status_id==5 || flds.reserved_status_id==1 || flds.reserved_status_id==6">
						<div class="border border-15 bg-light-green p-3 overflow-auto">
							<p class="text-orange bMikhak ">
								در انتظار پرداخت
							</p>
							<p class="">
								این درخواست توسط مدیر برای شما ثبت شده است و نیازمند پرداخت هزینه از طرف شما می باشد
							</p>
							<table class="table">
								<tr>
									<td class="yekan text-success border-none">
										مبلغ قابل پرداخت:
									</td>
									<td class="yekan text-success text-left border-none">
										{{flds.price}} تومان
									</td>
								</tr>
							</table>
							<btn
								class="w-100"
								textClass="w-100"
								text="تایید و پرداخت"
								@clickMe="prd()"
							/>
						</div>
					</div>
				</div>
				<!-- -------------------------------------------------------------------- -->
				<div class="w-100 overflow-hidden pb-3 pl-3 pr-3" v-if="$localStorage.get('user').username.role==3">
					<div
						class="float-right text-center col-lg-6 col-md-6 col-sm-12 col-xs-12 pb-3 pl-3 pr-3 pointer"
						@click="$router.push('/signupUser/'+flds.teachers_id)"
					>
						<div class="w-100 text-success bMikhak pb-3 pl-3 pr-3">
							اطلاعات کاربر
						</div>
						<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 float-right text-center">
							<userImg
								imgClass=""
								:src="flds.img"
								imgSize="60px"
							/>
						</div>
						<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right">
							<div class="">
								<p class="bMikhak">
									{{flds.fullname}}
								</p>
								<p class="yekan">
									{{flds.user_phone}}
								</p>
							</div>
						</div>
					</div>
					<div
						class="float-right text-center col-lg-6 col-md-6 col-sm-12 col-xs-12 pb-3 pl-3 pr-3 pointer"
						@click="$router.push('/signupTeacher/'+flds.teachers_id2)"
					>
					<div class="w-100 text-success bMikhak pb-3 pl-3 pr-3">
						اطلاعات مدرس
					</div>
					<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 float-right text-center">
						<userImg
							imgClass=""
							:src="flds.img2"
							imgSize="60px"
						/>
					</div>
					<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right">
						<div class="">
							<p class="bMikhak">
								<span class="bMikhak" v-if="flds.teachers_fullname != '' && flds.teachers_fullname != null">
									{{flds.teachers_fullname}}
								</span>
								<span class="bMikhak text-orange" v-else>
									(نامشخص)
								</span>
							</p>
							<p class="yekan">
								<span class="yekan" v-if="flds.teachers_phone != '' && flds.teachers_phone != null">
									{{flds.teachers_phone}}
								</span>
								<span class="bMikhak text-orange" v-else>
									-
								</span>
							</p>
						</div>
					</div>
				</div>
				<!-- ---------------------------------------------------------------- -->
			</div>
		</div>
	</div>
</template>

	<script>
		import btn from  "../../UI/button/btn.vue";
		import userImg from  "../../UI/userImg/userImg.vue";
		import back from  "../../UI/back/back.vue";

		export default {
			name: 'teachers_part1',
			data(){
				return {
					baseurl: this.$localStorage.get('baseurl'),
					grade: 0,
					gradeDsc: ['', 'ضعیف', 'قابل قبول', 'خوب', 'خیلی خوب', 'عالی'],

				}
			},
			components: {
				btn,
				back,
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
				prd(THIS = this){
					$.get(THIS.baseurl + 'reserved/check/'+THIS.$route.params.id, {	}, function(D){
						if(D.data){
							let url = THIS.$localStorage.get('baseurl')+"/prdOnline.php?id=" + THIS.$route.params.id;
							location.replace(url);
						}else{
							THIS.$router.push('/teachers/'+ THIS.flds.teachers_id +'/type');
						}
					}, "json");
				},
				//----------------------------------------------------------------------
				updateRtr(){
					this.$router.push('/reserved/user/update/' + this.$route.params.id);
				},
				//----------------------------------------------------------------------
				setGrade(THIS = this){
					$.post(this.baseurl + 'reserved/grade/'+this.$route.params.id, {
						token: this.$localStorage.get("user"), grade: this.grade,
						role: this.$localStorage.get('user').username.role
					}, function(D){
						THIS.$swal.fire({
							position: 'center',
							type: 'success',
							title: 'ثبت شد',
							timer: '2000',
							showConfirmButton: false
						});
						THIS.flds.grade = THIS.grade;
					}, "json");
				},
				//----------------------------------------------------------------------
				rtr(){
					location.replace(this.flds.link);
				},
				//----------------------------------------------------------------------
				rtrT(){
					(this.$localStorage.get('user').username.role==1) ? this.$router.push({path: "/teachers/" + this.flds.teachers_id,}) : "";
				},
				//----------------------------------------------------------------------
				showChat(THIS = this){
					let html = '', clss='', sender='';
					for(let j=0; j<THIS.flds.messege.length; j++){
						if(THIS.flds.messege[j].sender == 'U'){
							sender = 'کاربر: ';
							clss = 'text-danger';
						}
						if(THIS.flds.messege[j].sender == 'T'){
								sender = 'مدرس: ';
								clss = 'text-info';
						}
							html += "<p class='m-0 "+clss+"' style='font-size: 15px; border-bottom: 1px solid #eee;'><span class='text-orange'>" + sender + "</span>" + THIS.flds.messege[j].text + " &nbsp; <span class='yekan' style='color: gray;'>" + THIS.flds.messege[j].date + "</span></p>"
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
				},
				//----------------------------------------------------------------------
				selLink(link, THIS = this){
					$.post(this.baseurl + 'reserved/link/'+this.$route.params.id, {
						token: this.$localStorage.get("user"), link: link,
						role: this.$localStorage.get('user').username.role
					}, function(D){
						THIS.$swal.fire({
							position: 'center',
							type: 'success',
							title: 'ثبت شد',
							timer: '2000',
							showConfirmButton: false
						});
							THIS.flds.link = link;
					}, "json");
				},
				//----------------------------------------------------------------------
				setLink(THIS = this){
					this.$swal.fire({
						title: 'لینک جلسه آنلاین',
						html:"<div class='text-center'>لطفا لینک کلاس آنلاین را ثبت کنید.</div>",
						showCancelButton: true,
						showCloseButton: true,
						confirmButtonText: 'ثبت',
						confirmButtonClass: 'w-50 btn btn-success text-center',
						cancelButtonText: 'بازگشت',
						cancelButtonClass: 'w-50 btn btn-orange text-center',
						width: "70%",
						input: 'url',
						inputPlaceholder: 'آدرس لینک',
						inputValue: this.flds.link,
						inputClass: 'minW text-center ltr',
						validationMessage: 'لینک ارسالی اشتباه است'
					}).then((result) => {
						if(result.value){
							THIS.selLink(result.value);
						}
					})
				},
				//----------------------------------------------------------------------
				goChat(){
					this.$sessionStorage.set("id", this.flds.id);
					this.$router.push({path: '/chat/user/chat',});
				},
				//----------------------------------------------------------------------
				setPage(page){
					this.$emit('setPage', page);
				}
				//----------------------------------------------------------------------
			}
		}
	</script>
<style>

</style>
