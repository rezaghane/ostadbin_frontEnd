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
			<back class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left" title="اطلاعات زیر را تکمیل نمایید" />
			<div dir="rtl" class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left p-3 bg-white border-15 shadow overflow-hidden h-center" v-if="flds.ok">
				<div class="w-75">
					<selectInput
						@inputTxtFunc="funcDeg"
						:flds="flds.data.degs"
						label="مقطع تحصیلی"
					/>
					<selectInput
						@inputTxtFunc="funcFld"
						:flds="flds.data.fild"
						label="رشته تحصیلی"
					/>
					<selectInput
						@inputTxtFunc="funcCat"
						:flds="flds.data.cats"
						label="موضوع تدریس"
					/>
					<textInput
						@inputTxtFunc="funcExp"
						label="توضیحات(اختیاری)"
					/>
					<btn
						@clickMe="sav"
						class=" pt-3"
						textClass="w-100"
						text="مرحله بعد"
					/>
					<br/><br/>
				</div>
			</div>
		</div>
		<footerPage />
	</div>
</template>

<script>
	import btn from  "../../../UI/button/btn.vue";
	import selectInput from  "../../../UI/input/selectInput.vue";
	import textInput from  "../../../UI/input/textInput.vue";
	import footerPage from  "../../../UI/footer/footer.vue";
	import back from  "../../../UI/back/back.vue";
	import btnLg from  "../../../UI/button/btnLg.vue";
	import headMenu from  "../../../menu/headMenu.vue";
	import teachersIdPart2 from  "../teachers_id/teachers_id_part2.vue";
	import loginUser from  "../../../check/login_user.vue";
	import {loading, success_sm} from  "../../../assets/library/messege.js";

	export default {
		name: 'teachers_id',
		data(){
			return {
				loading: loading,
				success_sm: success_sm,

				imgurl: this.$localStorage.get('imgurl'),
				baseurl: this.$localStorage.get('baseurl'),
				flds: {"ok": false, "data": []},
				img:{
				},
				val:{
					degre: 0,
					category: 0,
					field: 0,
					explain: '',
				},
			}
		},
		components: {
				btn,
				selectInput,
				textInput,
				btnLg,
				back,
				headMenu,
				footerPage,
				teachersIdPart2,
				loginUser,
		},
			props: [],
		mounted(){
		this.$swal.close();
			this.loading(this);
			if(this.$localStorage.get('dateTime')!=null){
				this.loader();
			}else{
				this.$router.push('/teachers');
			}
		},
		methods:{
			sav(){
				if(this.val.degre==0 || this.val.category==0 || this.val.field==0){
					this.$swal.fire({
						position: 'center',
						type: 'error',
						title: "اطلاعات را تکمیل کنید",
						showCloseButton: true,
						showCancelButton: false,
						showConfirmButton: false,
						timer: 2000,
					})
				}else{
					this.savF();
				}
			},
			// *********************************************************************
			savF(THIS=this){
				var dateTime, time_class;
				var user = this.$localStorage.get('user').username.id;
				dateTime = this.$localStorage.get('dateTime');
				// time_class = {
				// 		"start": dateTime.time[0],
				// 		"end": dateTime.time[1],
				// };
				$.post(this.baseurl+'teachers/reserved', {
						token: this.$localStorage.get("user"), username: user,
						dateTime: dateTime,
						// classes_id: dateTime.id,
						// price: dateTime.price,
						// knd_class: dateTime.typeTeaching,
						// teacher: dateTime.teacher,
						// date_class: dateTime.date,
						// time_class: time_class,
						degre: this.val.degre,
						category: this.val.category,
						field: this.val.field,
						explain: this.val.explain,
						address: '',
				}, function(D){
					
					if(D.ok){
						THIS.$localStorage.set('reservedId', D.data);
						
						if(THIS.$localStorage.get('dateTime')[0].typeTeaching==3){
							THIS.$router.push('/teachers/address');
						}else{
							THIS.$router.push('/reserved');
						}
					}
				}, "json");
			},
			// *********************************************************************
			funcDeg(e){ this.val.degre = e; },
			funcCat(e){ this.val.category = e; },
			funcFld(e){ this.val.field = e; },
			funcExp(e){ this.val.explain = e; },
			// *********************************************************************
			loader(THIS=this){
				$.get(this.baseurl+'view/teachers/'+this.$localStorage.get('dateTime')[0].teacher, { }, function(D){
					THIS.flds = D;
					THIS.success_sm(THIS, "آماده شد");
				}, "json");
			},
				// *********************************************************************
		}
	}
</script>
<style>

</style>
