<template>
	<div class="" style="background-color:#fffcf7;" class="container">
		<headMenu />
		<div class="w-100 overflow-hidden">
			<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 float-right" >
				<div class="input-group mb-3" v-if="windowWidth <= 767">
					<input
						type="text"
						class="p-4 form-control shadow mb-3 ml-3"
						@input="loader(1, $event.target.value)"
						placeholder="جستجو کنید..."
						style="border-color: white; border-radius: 10px;"
					/>
					<div class="input-group-prepend">
						<btn
							:img="img.filter"
							text=""
							style="height: 50px"
							textClass="navigation-horizontal"
							@clickMe="shwFltr = !shwFltr"
						/>
					</div>
				</div>
				<part2
					:flds="flds.data"
					:category="category.data"
					:degrees="degrees.data"
					:location="location.data"
					:knd_class="knd_class.data"
					:field="field.data"
					:sex="sex.data"
					v-if="location.ok && chechRole() && (shwFltr || windowWidth >= 767)"
					@setCategory="setCategory"
					@setDegrees="setDegrees"
					@setDegrees1="setDegrees1"
					@setLocation="setLocation"
					@setKndClass="setKndClass"
					@setField="setField"
					@setSex="setSex"
				/>
				<leftMenuUser
					select="1"
					v-else-if="!chechRole()"
				/>
			</div>
			<div class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-right p-3">
				<back
					title="مدرس ها"
					showBtn="false"
					:leftBtn="!chechRole()"
					leftBtnText="ثبت مدرس جدید"
					leftBtnType="success"
					leftBtn1Type="orange"
					@clickMe="$router.push('/signupTeacher')"
				/>
				<input
					type="text"
					class="p-4 w-100 border-15 form-control shadow mb-3"
					@input="loader(1, $event.target.value)"
					placeholder="جستجو کنید..."
					:style="'background-image:url('+require('../../../assets/img/Search.svg')+')'"
					style="background-repeat: no-repeat; background-position: 15px center; background-size: 25px; border-color: white;"
					v-if="windowWidth > 767"
				/>
				<loading
					v-if="flds.ok == null"
				/>
				<part1
					:flds="flds.data"
					v-else-if="flds.ok==true"
					@setPage="setPage"
				/>
				<empty
					text="مدرسی یافت نشد"
					v-else-if="flds.ok==false"
				/>
			</div>
			<!-- v-if="windowWidth < 767" -->

		</div>
		<footerPage />
	</div>
</template>

	<script>
		import headMenu from  "../../../menu/headMenu.vue";
		import btn from  "../../../UI/button/btn.vue";
		import back from  "../../../UI/back/back.vue";
		import part1 from  "./teachers_part1.vue";
		import part2 from  "./teachers_part2.vue";
		import leftMenuUser from  "../../../menu/leftMenuUser.vue";
		import footerPage from  "../home/home_part9.vue";
		import loading from  "../../../UI/loading/loading.vue";
		import empty from  "../../../UI/empty/empty.vue";
		import filter from '../../../assets/img/filter.svg';

		export default {
			name: 'teachers',
			data(){
				return {
					imgurl: this.$localStorage.get('imgurl'),
					baseurl: this.$localStorage.get('baseurl'),
					flds: {ok: null, data: []},
					shwFltr: false,
					img:{
						filter: filter,
					},
					filter: {
						f:"",
						cat:"0",
						deg:"0",
						loc:"0",
						knd:"0",
						fldT:"0",
						sex:"0"
					},
					degrees: [],
					category: [],
					location: [],
					knd_class: [],
					field: [],
					sex: [],
				}
			},
			components: {
				btn,
				part1,
				part2,
				back,
				leftMenuUser,
				footerPage,
				headMenu,
				loading,
				empty,
			},
			props: [],
			computed :{
				setDegrees1(){
					if(Number.isInteger(parseInt(this.$route.query.category))){
						this.filter.cat = this.$route.query.category;
					}
					if(Number.isInteger(parseInt(this.$route.query.degrees))){
						this.filter.deg = this.$route.query.degrees;
					}
					if(this.$route.query.location){
						this.filter.loc = this.$route.query.location;
					}
					this.loader(1, '', this.filter.cat, this.filter.deg, this.filter.loc);
					this.loader1();
				}
   		},
			mounted(){
		this.$swal.close();
				if(Number.isInteger(parseInt(this.$route.query.category))){
					this.filter.cat = this.$route.query.category;
				}
				if(Number.isInteger(parseInt(this.$route.query.degrees))){
					this.filter.deg = this.$route.query.degrees;
				}
				if(this.$route.query.location){
					this.filter.loc = this.$route.query.location;
				}
				this.loader(1, '', this.filter.cat, this.filter.deg, this.filter.loc);
				this.loader1();
			},
			methods:{
				chechRole(){
					let user = this.$localStorage.get('user');
					if(user == null){
						return true;
					}else if(user.username.role != 3){
						return true;
					}else{
						return false;
					}
				},
				// *********************************************************************
				setSex(id){
					this.loader(1, this.filter.f, this.filter.cat, this.filter.deg, this.filter.loc, this.filter.knd, this.filter.fldT, id);
				},
				// *********************************************************************
				setField(id){
					this.loader(1, this.filter.f, this.filter.cat, this.filter.deg, this.filter.loc, this.filter.knd, id);
				},
				// *********************************************************************
				setKndClass(id){
					this.loader(1, this.filter.f, this.filter.cat, this.filter.deg, this.filter.loc, id);
				},
				// *********************************************************************
				setLocation(id){
					this.loader(1, this.filter.f, this.filter.cat, this.filter.deg, id);
				},
				// *********************************************************************
				setDegrees(id){
					this.loader(1, this.filter.f, this.filter.cat, id);
				},
				// *********************************************************************
				setCategory(id){
					this.loader(1, this.filter.f, id);
				},
				// *********************************************************************
				setPage(page){
					this.loader(page);
				},
				// *********************************************************************
				loader(page=1, f = this.filter.f, cat = this.filter.cat, deg = this.filter.deg, loc = this.filter.loc, knd = this.filter.knd, fldT = this.filter.fldT, sex = this.filter.sex, THIS = this){
					this.filter.f = f;
					this.filter.cat = cat;
					this.filter.deg = deg;
					this.filter.loc = loc;
					this.filter.knd = knd;
					this.filter.fldT = fldT;
					this.filter.sex = sex;
					let role = (this.chechRole()) ? "0" : this.$localStorage.get('user').username.role;
					THIS.flds = {ok: null, data: []};
					$.get(this.baseurl+'view/teachers/list',
						{
							sort: "id:dsc",
							n: 5,
							p: page,
							filter: f,
							cat: cat,
							deg: deg,
							loc: loc,
							knd: knd,
							fldT: fldT,
							sex: sex,
							role: role
						}, function(D){
							THIS.flds = {ok: false, data: []};
							if(D.data.filter == f){
								THIS.flds = D;
							}
						}, "json");
				},
				// *********************************************************************
				loader1(THIS = this){
					// if(THIS.$localStorage.get("category")==null){
						// $.get(this.baseurl+'category/list', { sort: "id:asc" }, function(D){
						// 	THIS.category = D;
						// 	THIS.$localStorage.set("category", THIS.category);
						// }, "json");
						// $.get(this.baseurl+'degrees/list', { sort: "id:asc" }, function(D){
						// 		THIS.degrees = D;
						// 	THIS.$localStorage.set("degrees", THIS.degrees);
						// }, "json");
					THIS.degrees = THIS.$localStorage.get('degrees');
					$.get(this.baseurl+'/location/highlights', { }, function(D){
						THIS.location = D;
						THIS.$localStorage.set("location", THIS.location);
					}, "json");
					$.get(this.baseurl+'/knd_class/list', { }, function(D){
						THIS.knd_class = D;
						THIS.$localStorage.set("knd_class", THIS.knd_class);
					}, "json");
					$.get(this.baseurl+'/field/list', { }, function(D){
						THIS.field = D;
						THIS.$localStorage.set("field", THIS.field);
					}, "json");
					$.get(this.baseurl+'/sex/list', { }, function(D){
						THIS.sex = D;
						THIS.$localStorage.set("sex", THIS.sex);
					}, "json");
					// }
				}
				// *********************************************************************
			}
		}
	</script>
<style>

</style>
