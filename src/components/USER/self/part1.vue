<template>
	<div class="w-100 p-3 shadow bg-white border-15 h-center">
		<div style="width: 75%; max-width: 500px;">
			<previewImage
				:img="val.i"
				@chengeFile="chengeFile"
			/>
			<textInput
				label="نام و نام خانوادگی"
				@inputTxtFunc = "nFunc"
				:val="val.n"
			/>
			<textInput
				label="ایمیل (اختیاری)"
				@inputTxtFunc = "eFunc"
				:val="val.e"
			/>
			<textInput
				label="نام کاربری"
				@inputTxtFunc = "uFunc"
				:val="val.u"
			/>
			<selectInput
				:value="val.d"
				:flds="degrees.data"
				@inputTxtFunc = "dFunc"
				label="مقطع تحصیلی"
			/>
			<selectInput
				:value="val.f"
				:flds="field.data"
				@inputTxtFunc = "fFunc"
				label="رشته تحصیلی"
			/>
			<div class="w-100 overflow-hidden">
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right" :class="(windowWidth>770) ? 'pr-0' : 'p-0'">
					<selectInput
						:value="val.lP"
						:flds="location.data"
						@inputTxtFunc = "pFunc"
						label="استان"
					/>
				</div>
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right" :class="(windowWidth>770) ? 'pl-0' : 'p-0'">
					<selectInput
						:value="val.lC"
						:flds="(val.lP==0)? [] : location.data[indexFinder(location.data, val.lP)].county"
						@inputTxtFunc = "cFunc"
						label="شهر"
					/>
				</div>
			</div>
			<selectInput
				label="وضعیت"
				:flds="[{'id': '1','name': 'وضعیت فعال'},{'id': '0','name': 'وضعیت غیر فعال'}]"
				@inputTxtFunc = "(e)=>{val.s = e}"
				:value = "val.s"
				v-if="$localStorage.get('user').username.role==3"
			/>
			<btn
				class="pt-3 w-100"
				textClass="w-100"
				text="ذخیره"
				@clickMe="sav()"
			/>
		</div>
	</div>
</template>

	<script>
		import btn from  "../../UI/button/btn.vue";
		import textInput from  "../../UI/input/textInput.vue";
		import selectInput from  "../../UI/input/selectInput.vue";
		import userImg from  "../../UI/userImg/userImg.vue";
		import pageNavigation from  "../../UI/pageNavigation/pageNavigation.vue";
		import previewImage from  "../../UI/uploadFile/previewImage.vue";
		import { validateEmail, validatePhone, indexFinder } from  "../../assets/library/filter.js";
		import { error, success, loading } from  "../../assets/library/messege.js";

		export default {
			name: 'self_part1',
			data(){
				return {

					error: error,
					success: success,
					loading: loading,

					validateEmail: validateEmail,
					validatePhone: validatePhone,
					indexFinder: indexFinder,
					imgurl: this.$localStorage.get('imgurl'),
					baseurl: this.$localStorage.get('baseurl'),
					location: {ok: false, data: []},
					degrees: {ok: false, data: []},
					field: {ok: false, data: []},
					username: [],
					val:{
						i: null,
						e: '',
						p: '',
						ab: '',
						a: "",
						s: "1",
						lP: "",
						lC: "",
					}
				}
			},
			components: {
				btn,
				textInput,
				selectInput,
				pageNavigation,
				userImg,
				previewImage,
			},
			props: {
				flds: {
					default: [],
				},
			},
			mounted(){
				this.loader();
			},
			methods:{
				uploadFile(url, THIS = this){
					THIS.loading(THIS);
					let user = this.$localStorage.get("user");
					var formData = new FormData();
					formData.append("file", this.val.file[0]);
					formData.append("format", this.$localStorage.get('formatImage'));
					formData.append("idImg", "u_"+user.username.id);
					formData.append("oldImg", user.username.img);
					var xhttp = new XMLHttpRequest();
					xhttp.open("POST", this.$localStorage.get('upldurl'), true);
					xhttp.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							this.getVar = JSON.parse(this.responseText);
							if(this.getVar.response == 1){
								user.username.img = "u_" + user.username.id + "." + this.getVar.file_extension;
								(THIS.$route.params.id == undefined) ? THIS.$localStorage.set("user", user) : '';
								var typI = this.getVar.file_extension;
							} else {
								THIS.$swal.fire({
									position: 'top',
									type: 'error',
									html: '<p dir="rtl" class="text-center">فرمت فایل باید jpg باشد</p>',
									showConfirmButton: false,
									timer: 1500
								})
							}
						}
					};
					xhttp.send(formData);
					THIS.success(THIS);
					setTimeout(function() {
						THIS.$router.push(url);
					}, 1000)
				},
				//______________________________________________________________________
				sav(THIS = this){
					THIS.loading(THIS);
					let user = THIS.$localStorage.get("user");
					let id = (this.$route.params.id == undefined) ? this.$localStorage.get("user").username.id : this.$route.params.id;
					let role = (this.$route.params.role == undefined) ? this.$localStorage.get("user").username.role : this.$route.params.role;
					$.post(this.baseurl+'self/account', {
						token: this.$localStorage.get("user"),
						id: id,
						role: role,
						fullname: this.val.n,
						province: this.val.lP,
						status: this.val.s,
						county: this.val.lC,
						degrees: this.val.d,
						field: this.val.f,
						email: this.val.e,
						username: this.val.u
					}, function(D){
						let url = '';
						if(user.username.role!=3){
							user.username.email = THIS.val.e;
							user.username.about_me = THIS.val.ab;
							user.username.address = THIS.val.a;
							user.username.mobile = THIS.val.p;
							user.username.province = THIS.val.lP;
							user.username.county = THIS.val.lC;
							user.username.status = THIS.val.s;
							THIS.$localStorage.set("user", user);
							url = '/reserved/user/list';
						}else{
							url = '/users';
						}
						if(THIS.val.file==null){
							THIS.$router.push(url);
						}else{
							THIS.uploadFile(url);
						}
					}, "json");
				},
				//______________________________________________________________________
				chengeFile(files){ this.val.file = files; },
				//______________________________________________________________________
				nFunc(e){ this.val.n=e; },
				//______________________________________________________________________
				eFunc(e){ this.val.e=e; },
				//______________________________________________________________________
				uFunc(e){ this.val.u=e; },
				//______________________________________________________________________
				dFunc(e){ this.val.d=e; },
				//______________________________________________________________________
				fFunc(e){ this.val.f=e; },
				//______________________________________________________________________
				pFunc(e){ this.val.lP=e; },
				//______________________________________________________________________
				cFunc(e){ this.val.lC=e; },
				//______________________________________________________________________
				loader(THIS = this){
					$.get(this.baseurl+'location/list', { }, function(D){
						THIS.location = D;
					}, "json");
					$.get(this.baseurl+'degrees/list', { }, function(D){
						THIS.degrees = D;
					}, "json");
					$.get(this.baseurl+'field/list', { }, function(D){
						THIS.field = D;
					}, "json");
					if(this.$route.params.id == undefined){
						this.val.i = this.$localStorage.get("user").username.img;
						this.val.n = this.$localStorage.get("user").username.fullname;
						this.val.u = this.$localStorage.get("user").username.username;
						this.val.d = this.$localStorage.get("user").username.degrees;
						this.val.f = this.$localStorage.get("user").username.field;
						this.val.e = this.$localStorage.get("user").username.email;
						this.val.p = this.$localStorage.get("user").username.mobile;
						this.val.a = this.$localStorage.get("user").username.address;
						this.val.ab = this.$localStorage.get("user").username.about_me;
						this.val.lP = this.$localStorage.get("user").username.province;
						this.val.lC = this.$localStorage.get("user").username.county;
						this.val.s = this.$localStorage.get("user").username.status;
					}else{
						$.get(this.baseurl+'/user/'+this.$route.params.id, { }, function(D){
							THIS.val.i = D.data.img;
							THIS.val.n = D.data.fullname;
							THIS.val.u = D.data.username;
							THIS.val.d = D.data.degrees;
							THIS.val.f = D.data.field;

							THIS.val.e = D.data.email;
							THIS.val.p = D.data.mobile;
							THIS.val.a = D.data.address;
							THIS.val.ab = D.data.about_me;
							THIS.val.lP = D.data.province;
							THIS.val.lC = D.data.county;
							THIS.val.s = D.data.status;
						}, "json");
					}
				}
			}
		}
	</script>
<style>

</style>
