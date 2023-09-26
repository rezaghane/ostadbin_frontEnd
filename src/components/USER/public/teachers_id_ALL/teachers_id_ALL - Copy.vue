<template>
	<div style="background-color:#fffcf7;" class="container">
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
			<back class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left" title="روز و ساعت تدریس را مشخص نمایید" />
			<div dir="rtl" class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left p-3 bg-white border-15 shadow overflow-hidden">
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right">
					<p>
						یکی از روزهای مجاز را انتخاب نمایید
					</p>
					<calendar
						v-if="date.ok"
						:dates="date.data.date"
						@clickMe="calendar"
						data-aos="flip-left"
						data-aos-easing="ease-out-cubic"
						data-aos-duration="2000"
					/>
					<loading v-else />
				</div>
				<div
					class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right"
					v-if="vals.length != 0"
				>
					<p>
						جلسات انتخابی شما
					</p>
					<!-- style="overflow-y: auto;"
					:style="(vals.length ==0 ) ? 'height: 0;' : 'height: 15%;'" -->
					<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right p-1" v-for="(f, i) in vals" :key="i">
						<btn
							textClass="w-100 yekan"
							type="orange"
							:html="f.date + '<br/> ساعت ' + f.time[0] + ' تا ' + f.time[1]"
							text=""
							@clickMe="vals.splice(i, 1);"
							:img="img.x"
						/>
					</div>
				</div>
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right">
					<div class="" v-if="this.val.date==''">
						<p>
							هنوز تاریخی مشخص نکرده اید!
						</p>
						<div style="height: 50%;">
						</div>
					</div>
					<div class="" v-else>
						<p>
							انتخاب ساعت برای
							<span class="yekan">
								{{this.val.date}}
							</span>
						</p>
						<div
							style="overflow-y: auto;"
							:style="(vals.length ==0 ) ? 'height: 50%;' : 'height: 35%;'"
						>
							<span v-for="(index, j) in indexVal" :key="j">
								<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right p-1" v-for="(f, i) in date.data.flds[index].times_class" :key="i">
									<btn
										textClass="w-100 yekan"
										:type="(val.time[0]!=f.start && val.time[1]!=f.end) ? 'outline-success' : 'orange'"
										:text="'ساعت '+f.start+' تا '+f.end"
										:disable="(f.status=='1' && f.reserved=='1')? '0' : '1'"
										:disableText="(f.reserved=='0')? 'این ساعت قبلا رزرو شده است' : 'این ساعت غیر فعال شده است'"
										@clickMe="setTime(f.start+'-'+f.end)"
									/>
								</div>
							</span>
						</div>
					</div>
					<btn
						:disable="(val.time=='') ? '1' : '0'"
						@clickMe="sav()"
						type="success"
						textClass="w-100"
						:text="(val.time=='')? 'مرحله بعد' : 'مرحله بعد ( ' + price() + ' تومان ) '"
						disableText="لطفا تاریخ و ساعت را مشخص نمایید"
					/>
				</div>
			</div>
		</div>
		<footerPage />
	</div>
</template>

<script>
	import footerPage from  "../../../UI/footer/footer.vue";
	import calendar from  "../../../UI/calendar/calendar.vue";
	import back from  "../../../UI/back/back.vue";
	import btn from  "../../../UI/button/btn.vue";
	import btnLg from  "../../../UI/button/btnLg.vue";
	import loading from  "../../../UI/loading/loading.vue";
	import headMenu from  "../../../menu/headMenu.vue";
	import teachersIdPart2 from  "../teachers_id/teachers_id_part2.vue";
	import x from  "../../../assets/img/x.svg";

	export default {
		name: 'teachers_id',
		data(){
			return {
				imgurl: this.$localStorage.get('imgurl'),
				baseurl: this.$localStorage.get('baseurl'),
				flds: {"ok": false, "data": []},
				date: {"ok": false, "data": []},
				degrees: [],
				category: [],
				location: [],
				indexVal: [],
				img:{
					x: x,
				},
				val:{
					"id": 0,
					date: "",
					time: "",
					price: 0,
					"teacher": this.$route.params.id,
					"typeTeaching": 0,
					"address_teach": "",
				},
				vals: [],
				VALS: [],
			}
		},
		components: {
				btn,
				btnLg,
				back,
				headMenu,
				footerPage,
				calendar,
				teachersIdPart2,
				loading,
		},
			props: [],
		mounted(){
			this.loader();
		},
		methods:{
			price(){
				let p = 0;
				for(let i=0; i<this.vals.length; i++){
					p += parseInt(this.vals[i].price);
				}
				return p;
			},
			// *********************************************************************
			sav(){
				this.$localStorage.set('dateTime', this.vals);
				this.$router.push('/teachers/form');
			},
			// *********************************************************************
			setTime(time){
				// for(let I=0; I<this.indexVal.length; I++){
					this.val.id = this.date.data.flds[this.indexVal[0]].id;
					this.val.price = this.date.data.flds[this.indexVal[0]].price;
				this.val.time = time.split('-');
				let checkDate = this.checkDate();
				if(checkDate == -1){
					let val = {
							"id": this.val.id,
							date: this.val.date,
							time: this.val.time,
							price: this.val.price,
							"teacher": this.val.teacher,
							"typeTeaching": this.val.typeTeaching,
							"address_teach": this.val.address_teach,
					};
					this.vals.push(val);
					
				}else{
					this.vals.splice(checkDate, 1);
				}
				// }
			},
			// *********************************************************************
			checkDate(){
				let mod = -1;
				for(var i=0; i<this.vals.length; i++){
					if(this.vals[i].date == this.val.date && this.vals[i].time.toString() == this.val.time.toString()){
						mod = i;
					}
				}
				return mod;
			},
			// *********************************************************************
			calendar(e){
				this.val.date = e;
				this.val.time = "";
				this.indexVal = [];
				for(let i=0; i<this.date.data.date.length; i++){
					if(this.date.data.date[i]==e){
						this.indexVal.push(i);
					}
				}
			},
			// *********************************************************************
			// findIndexCalendar(date){
			// 	return date == this.val.date;
			// },
			// *********************************************************************
			loader(THIS=this){
				var knd_class = 0;
				var urlArr = window.location.pathname.split('/');
				if(urlArr[urlArr.length - 1] == 'person'){
					knd_class = 1;
				}else if(urlArr[urlArr.length - 1] == 'online'){
					knd_class = 2;
				}else if(urlArr[urlArr.length - 1] == 'home'){
					knd_class = 3;
				}
				this.val.typeTeaching = knd_class;
				//______________________________________________________________________
				$.get(this.baseurl+'view/teachers/'+this.$route.params.id, { }, function(D){
					THIS.flds = D;
					THIS.val.address_teach = (knd_class==1) ? D.data.address_teach : "";
				}, "json");
				//______________________________________________________________________
				$.get(this.baseurl+'view/teachers/'+this.$route.params.id, { knd_class: knd_class }, function(D){
					THIS.date = D;
					
				}, "json");
			},
				// *********************************************************************
		}
	}
</script>
<style>

</style>
