<template>
	<div style="background-color:#fffcf7;" class="container">
		<headMenu />
		<div
			class="w-100 overflow-hidden"
			:class="(windowWidth<=1000)? 'h-center': ''"
		>
			<div class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left p-3">
				<back
					title="تراکنش های مالی"
					showBtn='false'
					leftBtn="true"
					leftBtnText="دریافت گزارش"
					leftBtnType="outline-success"
					@clickMe="dayFilter()"
				/>
				<input
					type="text"
					class="p-4 w-100 border-15 form-control shadow mb-3"
					@input="loader(1, $event.target.value)"
					placeholder="جستجو کنید..."
					:style="'background-image:url('+require('../../assets/img/Search.svg')+')'"
					style="background-repeat: no-repeat; background-position: 15px center; background-size: 25px;"
				/>

				<loading
				v-if="flds.ok == null"
				/>

				<part1
					:flds="flds.data"
					v-else-if="flds.ok==true"
					@setPage = "setPage"
				/>
				<empty
					text="تراکنش مالی ثبت نشده است"
					v-else-if="flds.ok==false"
				/>
			</div>
			<div class="col-lg-3 col-md-3 float-left"  v-if="windowWidth>1000">
				<part2 select="4" />
			</div>
		</div>
	</div>
</template>

	<script>
		import headMenu from  "../../menu/headMenu.vue";
		import btn from  "../../UI/button/btn.vue";
		import empty from  "../../UI/empty/empty.vue";
		import part1 from  "./part1.vue";
		import back from  "../../UI/back/back.vue";
		import part2 from  "../../USER/reserved_user_list/part2.vue";
		import loading from  "../../UI/loading/loading.vue";
		export default {
			name: 'self',
			data(){
				return {
					imgurl: this.$localStorage.get('imgurl'),
					baseurl: this.$localStorage.get('baseurl'),
					flds: {ok: null, data: []},
					degrees: [],
					category: [],
					location: [],

				}
			},
			components: {
				btn,
				empty,
				part1,
				part2,
				headMenu,
				back,
				loading,
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
				setPage(p){
					this.loader(p);
				},
				// *********************************************************************
				loader(p=1, search = '',THIS = this){
					document.body.scrollTop = 0;
					THIS.flds = {ok: null, data: []};
					$.post(this.baseurl+'reserved/teachers?n=10&p='+p, {
						token: this.$localStorage.get("user"),
						search : search ,
						username: '',
						role: this.$localStorage.get("user").username.role
					}, function(D){
					
						if(D.status.code=="401"){
							THIS.$localStorage.remove('user');
							THIS.$router.push('/login');
						}else{
							THIS.flds = {ok: false, data: []};
							THIS.flds = (D.data.search == search) ? D : {ok: false, data: []};
						}
					}, "json");
				}
				// *********************************************************************
			}
		}
	</script>
<style>

</style>
