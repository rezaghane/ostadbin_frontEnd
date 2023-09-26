<template>
	<div style="background-color:#fffcf7;" class="container">
		<loginUser />
		<headMenu />
		<div class="w-100 overflow-hidden p-3">
			<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 float-right">
				<teachersIdPart2 class="bg-white p-3 border-15 shadow" :flds="flds.data" v-if="flds.ok" />
			</div>
			<back class="col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left" title="انتخاب آدرس(محل تدریس)" />
			<div
				class="bg-white col-lg-9 col-md-9 col-sm-12 col-xs-12 float-left mb-3 p-3 border-15 shadow"
			>
				<div
					class="w-75 m-auto"
					style="
					overflow-y: auto;
					max-height: 40vh;
					"
					:style="'height:'+ (100 * user.username.address.length) +';'"
				>
					<div
						class="w-100 border border-15 shadow-hover bg-light-green p-3 text-truncate text-success mb-3"
						v-if="user!=null"
						v-for="(f, i) in user.username.address.slice().reverse()"
						:key="i"
						:class="{ 'shadow': val.address==user.username.address.slice().reverse()[i] }"
						:title="user.username.address.slice().reverse()[i]"
						@click="selectAddress(i)"
					>
						<img
							:src="img.Tick"
							width="30px"
							height="30px"
							v-if="val.address==user.username.address.slice().reverse()[i]"
						/>
						<img
							:src="img.Ellipse"
							width="30px"
							height="30px"
							v-else
						/>
						<btn
							text=""
							type="white"
							imgSize="30"
							textClass="p-0"
							class="float-left"
							:img="img.Edit"
							@clickMe="setAddress(i)"
						/>
						&nbsp;
						{{f}}
					</div>
				</div>
				<btn
					class="mb-3 mt-3 w-75 m-auto rtl"
					textClass="bMikhak text-success"
					text="+ افزودن آدرس جدید"
					type="white"
					@clickMe="setAddress( user.username.address.length )"
				/>
				<btn
					class="mb-3 mt-3 w-75 m-auto"
					textClass="w-100"
					text="مرحله بعد"
					@clickMe="sav()"
				/>
			</div>
		</div>
		<footerPage />
	</div>
</template>

<script>
	import footerPage from  "../../../UI/footer/footer.vue";
	import back from  "../../../UI/back/back.vue";
	import btn from  "../../../UI/button/btn.vue";
	import btnLg from  "../../../UI/button/btnLg.vue";
	import headMenu from  "../../../menu/headMenu.vue";
	import Shape from  "../../../assets/img/Shape_Title.svg";
	import Ellipse from  "../../../assets/img/Ellipse.svg";
	import Edit from  "../../../assets/img/Edit.svg";
	import Tick from  "../../../assets/img/Tick.svg";
	import teachersIdPart2 from  "../teachers_id/teachers_id_part2.vue";
	import loginUser from  "../../../check/login_user.vue";


	export default {
			name: 'teachers_id',
		data(){
			return {
				imgurl: this.$localStorage.get('imgurl'),
				baseurl: this.$localStorage.get('baseurl'),
				flds: {"ok": false},
				degrees: [],
				category: [],
				location: [],
				user: [],
				img:{
					"Shape": Shape,
					"Ellipse": Ellipse,
					"Edit": Edit,
					"Tick": Tick,
				},
				val:{
					address: '',
				}
			}
		},
		components: {
				btn,
				btnLg,
				back,
				headMenu,
				footerPage,
				Shape,
				Ellipse,
				Edit,
				Tick,
				loginUser,
				teachersIdPart2,
		},
			props: [],
		mounted(){
		this.$swal.close();
			this.user = this.$localStorage.get('user');
			if(this.user!=null){
				this.loader();
				this.selectAddress(0);
			}else{
				this.$localStorage.set('urlPath', window.location.pathname);
				this.$router.push('/login');
			}
		},
		methods:{
			sav(THIS = this){
				$.post(this.baseurl+'reserved/address/'+this.$localStorage.get('reservedId'), { token: this.$localStorage.get("user"),address: this.val.address }, function(D){
					THIS.$router.push('/reserved');
				}, "json");
			},
			//________________________________________________________________________
			savAddress(){
				$.post(this.baseurl+'user/address/', { token: this.$localStorage.get("user"), username:this.user.username.id, address: this.user.username.address }, function(D){
					THIS.$swal.fire({
						type: 'success',
						title: 'ثبت شد',
						showCancelButton: false,
						showConfirmButton: false,
						timer: 2000
					});
				}, "json");
			},
			//________________________________________________________________________
			selectAddress(i){
				var DatTime = this.$localStorage.get('dateTime');
				this.val.address = this.user.username.address.slice().reverse()[i];
				for(let j=0; j<DatTime.length; j++){
					DatTime[j].address_teach = this.user.username.address.slice().reverse()[i];
				}
				this.$localStorage.set('dateTime', DatTime);
			},
			//________________________________________________________________________
			setAddress(index){
				this.$swal.fire({
					title: (index <= this.user.username.address.length-1) ? 'ویرایش آدرس' :'آدرس جدید',
					input: 'text',
					showCancelButton: true,
					confirmButtonText: 'ذخیره',
					cancelButtonText: 'بازگشت',
					inputValue: this.user.username.address.slice().reverse()[index]
				}).then((result) => {
					if(result.value){
						this.val.address = result.value;
						if(index == this.user.username.address.length){
							this.user.username.address.push(result.value);
						}else{
							this.user.username.address[this.user.username.address.length - index - 1] = result.value;
						}
						this.$localStorage.set('user', this.user);
						this.savAddress();
						this.selectAddress(index);
					}
				})
			},
			// *********************************************************************
			loader(THIS=this){
				$.get(this.baseurl+'view/teachers/'+this.$localStorage.get('dateTime').teacher, { }, function(D){
					THIS.flds = D;
				}, "json");
			}
				// *********************************************************************
		},
		computed:{

		}
	}
</script>
<style>

</style>
