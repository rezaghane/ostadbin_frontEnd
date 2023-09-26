<template>
	<div style="background-color:#fffcf7;" class="container">
		<headMenu />
		<div class="w-100 overflow-hidden ltr" style="display: flex;">
			<div
				class="float-left p-3"
				:class="(windowWidth > 1000) ? 'col-9' :  'col-12'"
			>
				<back
					title="کاربرها"
					showBtn="false"
					:leftBtn="!chechRole()"
					leftBtnText="ثبت کاربر جدید"
					leftBtnType="success"
					@clickMe="$router.push('/signupUser')"
				/>
				<input
					type="text"
					class="p-4 w-100 border-15 form-control shadow mb-3"
					@input="loader(1, $event.target.value)"
					placeholder="جستجو کنید..."
					:style="'background-image:url('+require('../../../assets/img/Search.svg')+')'"
					style="background-repeat: no-repeat; background-position: 15px center; background-size: 25px;"
				/>
				<loading
				v-if="flds.ok == null"
				/>
				<part1
					:flds="flds.data"
					v-if="flds.ok"
					@setPage="setPage"
				/>
				<empty
					text="کاربری یافت نشد"
					v-else-if="flds.ok==false"
				/>
			</div>
			<div
				v-show="windowWidth > 1000"
				class="float-left"
				:class="(windowWidth > 1000) ? 'col-3' :  'col-12'"
			>
				<part2
					:flds="flds.data"
					:category="category.data"
					:degrees="degrees.data"
					:location="location.data"
					:knd_class="knd_class.data"
					:field="field.data"
					:sex="sex.data"
					v-if="category.ok && degrees.ok && location.ok && chechRole()"
					@setCategory="setCategory"
					@setDegrees="setDegrees"
					@setDegrees1="setDegrees1"
					@setLocation="setLocation"
					@setKndClass="setKndClass"
					@setField="setField"
					@setSex="setSex"
				/>
				<leftMenuUser
					select="2"
					v-else-if="!chechRole()"
				/>
			</div>
		</div>
		<footerPage />
	</div>
</template>

	<script>
		import headMenu from  "../../../menu/headMenu.vue";
		import btn from  "../../../UI/button/btn.vue";
		import back from  "../../../UI/back/back.vue";
		import part1 from  "./part1.vue";
		import part2 from  "./part2.vue";
		import leftMenuUser from  "../../../menu/leftMenuUser.vue";
		import footerPage from  "../home/home_part9.vue";
		import loading from  "../../../UI/loading/loading.vue";
		import empty from  "../../../UI/empty/empty.vue";
		export default {
			name: 'teachers',
			data(){
				return {
					imgurl: this.$localStorage.get('imgurl'),
					baseurl: this.$localStorage.get('baseurl'),
					flds: {ok: null, data: []},
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
					if(this.$route.query.category==undefined && this.$route.query.degrees==undefined){
						if(this.$localStorage.get('user')==null){
							this.$localStorage.set('urlPath', window.location.pathname);
							this.$router.push('/login');
						}else{
							this.loader();
						}
					}else if(Number.isInteger(parseInt(this.$route.query.category))){
						this.loader(1, '', this.$route.query.category);
					}else if(Number.isInteger(parseInt(this.$route.query.degrees))){
						this.loader(1, '', 0, this.$route.query.degrees);
					}
				}
   		},
			mounted(){
		this.$swal.close();
				if(this.$route.query.category==undefined && this.$route.query.degrees==undefined){
					if(this.$localStorage.get('user')==null){
						this.$localStorage.set('urlPath', window.location.pathname);
						this.$router.push('/login');
					}else{
						this.loader();
					}
				}else if(Number.isInteger(parseInt(this.$route.query.category))){
					this.loader(1, '', this.$route.query.category);
				}else if(Number.isInteger(parseInt(this.$route.query.degrees))){
					this.loader(1, '', 0, this.$route.query.degrees);
				}
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
					this.loader(1, '', 0, 0, 0, 0, 0, id);
				},
				// *********************************************************************
				setField(id){
					this.loader(1, '', 0, 0, 0, 0, id);
				},
				// *********************************************************************
				setKndClass(id){
					this.loader(1, '', 0, 0, 0, id);
				},
				// *********************************************************************
				setLocation(id){
					this.loader(1, '', 0, 0, id);
				},
				// *********************************************************************
				setDegrees(id){
					this.loader(1, '', 0, id);
				},
				// *********************************************************************
				setCategory(id){
					this.loader(1, '', id);
				},
				// *********************************************************************
				setPage(page){
					this.loader(page);
				},
				// *********************************************************************
				loader(page=1, f="", cat="0", deg="0", loc="0", knd="0", fldT="0", sex="0"){
					var THIS = this;
					let role = (this.chechRole()) ? "0" : this.$localStorage.get('user').username.role;
					THIS.flds = {ok: null, data: []};
					$.get(this.baseurl+'view/users/list', { sort: "id:asc", n: 5, p: page, filter: f, cat: cat, deg: deg, loc: loc, knd: knd, fldT: fldT, sex: sex, role: role }, function(D){
						if(D.status.code=="401"){
							THIS.$localStorage.remove('user');
							THIS.$router.push('/login');
						}else{
							THIS.flds = {ok: false, data: []};
							if(D.data.filter == f){
									THIS.flds = D;
							}
						}
					}, "json");
					// if(THIS.$localStorage.get("location")==null){
						$.get(this.baseurl+'category/list', { sort: "id:asc" }, function(D){
							THIS.category = D;
							THIS.$localStorage.set("category", THIS.category);
						}, "json");
						$.get(this.baseurl+'degrees/list', { sort: "id:asc" }, function(D){
							THIS.degrees = D;
							THIS.$localStorage.set("degrees", THIS.degrees);
						}, "json");
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
					// }else{
					// 	THIS.category = THIS.$localStorage.get("category");
					// 	THIS.degrees = THIS.$localStorage.get("degrees");
					// 	THIS.location = THIS.$localStorage.get("location");
					// 	THIS.knd_class = THIS.$localStorage.get("knd_class");
					// 	THIS.field = THIS.$localStorage.get("field");
					// 	THIS.sex = THIS.$localStorage.get("sex");
					// }
				}
				// *********************************************************************
			}
		}
	</script>
<style>

</style>
