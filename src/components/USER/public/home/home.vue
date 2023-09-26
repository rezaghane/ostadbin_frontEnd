<template>
	<div class="container">
		<headMenu @load="(e)=>{D = e}" />
		<part1 />
		<part11 :flds="D" />
		<!-- ------------------------------------------------------------- -->
		<div class="w-100 text-center">
			<img width="30px" 
			:src="require('../../../assets/img/Shape_Title.svg')"
			data-aos="flip-up" data-aos-easing="ease-out-cubic" data-aos-duration="2000" />
		</div>
		<!-- ------------------------------------------------------------- -->
		<div class="text-left" style="position: absolute; left: 0;" data-aos="fade-down" data-aos-duration="3000">
			<img width="100px" 
			:src="require('../../../assets/img/Home_Shape_3.svg')"
			data-aos="flip-down" data-aos-easing="ease-out-cubic" data-aos-duration="2000" />
		</div>
		<!-- ------------------------------------------------------------- -->
		<part2 />
		<!-- ------------------------------------------------------------- -->
		<part3 />
		<!-- ------------------------------------------------------------- -->
		<part4 :category="category.data" v-if="category.ok" />
		<!-- ------------------------------------------------------------- -->
		<br/>
		<br/>
		<br/>
		<br/>
		<div class="w-100 text-center">
			<img width="30px" 
			:src="require('../../../assets/img/Shape_Title.svg')"
			data-aos="flip-down" data-aos-easing="ease-out-cubic" data-aos-duration="2000" 
			/>
			
		</div>
		<!-- ------------------------------------------------------------- -->
		<part5 :teachers="teachers.data" v-if="teachers.ok" />
		<!-- ------------------------------------------------------------- -->
		<br/>
		<br/>
		<br/>
		<br/>
		<div class="w-100 text-center">
			<img width="30px" 
			:src="require('../../../assets/img/Shape_Title.svg')"
			data-aos="flip-down" data-aos-easing="ease-out-cubic" data-aos-duration="2000" />
		</div>
		<!-- ------------------------------------------------------------- -->
		<part6 v-if="windowWidth > 1000" />
		<!-- ------------------------------------------------------------- -->
		<br/>
		<br/>
		<br/>
		<br/>
		<!-- ------------------------------------------------------------- -->
		<part7 />
		<!-- ------------------------------------------------------------- -->
		<br/>
		<br/>
		<br/>
		<br/>
		<div class="w-100 text-center">
			<img width="30px" 
			:src="require('../../../assets/img/Shape_Title.svg')"
			data-aos="flip-down" data-aos-easing="ease-out-cubic" data-aos-duration="2000" />
		</div>
		<part8 v-if="degrees.ok" :flds="degrees.data" />
		<!-- ------------------------------------------------------------- -->
		<part81 :auditors="auditors.data" v-if="auditors.ok" />
		<!-- ------------------------------------------------------------- -->
		<part82 :data="social_network.data.social_network" v-if="social_network.ok" />
		<!-- ------------------------------------------------------------- -->
		<br/>

		<br/>
		<br/>
		<br/>
		<div class="w-100 text-center">
			<img width="30px" 
			:src="require('../../../assets/img/Shape_Title.svg')"
			data-aos="flip-down" data-aos-easing="ease-out-cubic" data-aos-duration="2000" />
		</div>
		<part9 />
		<!-- ------------------------------------------------------------- -->
	</div>
</template>

	<script>
		import myketir from '../../../assets/img/myketir.png';

		import headMenu from  "../../../menu/headMenu.vue";
		import btn from  "../../../UI/button/btn.vue";
		import part1 from  "./home_part1.vue";
		import part11 from  "./home_part1_1.vue";
		import part2 from  "./home_part2.vue";
		import part3 from  "./home_part3.vue";
		import part4 from  "./home_part4.vue";
		import part5 from  "./home_part5.vue";
		import part6 from  "./home_part6.vue";
		import part7 from  "./home_part7.vue";
		import part8 from  "./home_part8.vue";
		import part81 from  "./home_part8_1.vue";
		import part82 from  "./home_part8_2.vue";
		import part9 from  "./home_part9.vue";
		export default {
			name: 'phome',
			data(){
				return {
					imgurl: this.$localStorage.get('imgurl'),
					baseurl: this.$localStorage.get('baseurl'),
					categoryOK: false,
					teachersOK: false,
					category: {"ok": false,},
					social_network: {"ok": false,},
					teachers: {"ok": false,},
					degrees: {"ok": false,},
					D: {"ok": false,},
					auditors: {"ok": false,},
					img: {
							"myketir": myketir,
							"bg": '',
					},
				}
			},
			components: {
				headMenu,
				btn,
				part1,
				part11,
				part2,
				part3,
				part4,
				part5,
				part6,
				part7,
				part8,
				part81,
				part82,
				part9,
			},
			props: [],
			mounted(){
				this.$swal.close();
				(this.chechRole()) ? this.getCategory(this) : this.$router.push('/reserved/user/list');
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
				getCategory(THIS){
					if(!this.teachers.ok){
						$.get(this.baseurl + 'category/list', { sort: "id:asc" }, function(D){
							THIS.category = D;
							THIS.getTeachers(THIS);
						}, "json");
					}
				},
				getTeachers(THIS){
					$.get(this.baseurl+'view/teachers/list', { sort: "id:asc", n: 6, p: 1, filter: "", cat: 0, sex: 0, deg: 0, fldT: 0, loc: 0 }, function(D){
							THIS.teachers = D;
						THIS.getHightlightsDegrees(THIS);
					}, "json");
				},
				getHightlightsDegrees(THIS){
					$.get(this.baseurl+'degrees/hightlights', { }, function(D){
							THIS.degrees = D;
						THIS.getAuditors();
					}, "json");
				},
				getAuditors(THIS = this){
					$.post(this.baseurl+"auditors/list", { token: this.$localStorage.get("user"), role: 1 }, function(D){
						THIS.auditors = D;
						THIS.get_social_network();
					}, "json");
				},
				get_social_network(THIS = this){
					$.post(this.baseurl+"all/public", {token: this.$localStorage.get("user"), }, function(D){
						THIS.social_network = D;
						
					}, "json");
				},
			}
		}
	</script>
<style>

</style>
