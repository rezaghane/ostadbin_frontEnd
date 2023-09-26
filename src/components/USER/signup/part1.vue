<template>
	<div class="w-100 p-3 bg-white border-15 h-center">
		<div style="width: 75%; max-width: 500px;">
			<previewImage
				:img="val.i"
				@chengeFile="(e)=>{val.i = e}"
			/>
			<textInput
				label="نام و نام خانوادگی"
				@inputTxtFunc = "(e)=>{val.n = e}"
				:val="val.n"
			/>
			<textInput
				label="شماره موبایل"
				@inputTxtFunc = "(e)=>{val.p = e}"
				:val="val.p"
			/>
			<div class="w-100 overflow-hidden">
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right" :class="(windowWidth>770) ? 'pr-0' : 'p-0'">
					<selectInput
						:value="val.lP"
						:flds="location.data"
						@inputTxtFunc = "(e)=>{val.lP = e}"
						label="استان"
					/>
				</div>
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right" :class="(windowWidth>770) ? 'pl-0' : 'p-0'">
					<selectInput
						:value="val.lC"
						:flds="(val.lP==0)? [] : location.data[indexFinder(location.data, val.lP)].county"
						@inputTxtFunc = "(e)=>{val.lC = e}"
						label="شهر"
					/>
				</div>
			</div>
			<multiSelectInput
				:multiple="false"
				:value="val.d"
				:flds="$localStorage.get('degrees').data"
				@input="(e)=>{val.d = e}"
				label="دسته بندی ها"
			/>
			<multiSelectInput
				:multiple="false"
				:flds="field.data"
				:value="val.f"
				@input="(e)=>{val.f = e}"
				label="رشته تحصیلی"
			/>
			<textInput
				label="ایمیل (اختیاری)"
				@inputTxtFunc = "(e)=>{val.e = e}"
				:val="val.e"
			/>
			<textInput
				label="نام کاربری"
				@inputTxtFunc = "(e)=>{val.u = e}"
				:val="val.u"
			/>
			<textInput
				type="password"
				label="کلمه عبور"
				@inputTxtFunc = "(e)=>{val.p1 = e}"
				:val="val.p1"
			/>
			<textInput
				type="password"
				label="تکرار کلمه عبور"
				@inputTxtFunc = "(e)=>{val.p2 = e}"
				:val="val.p2"
			/>
			<selectInput
				@inputTxtFunc = "(e)=>{val.st = e}"
				:value = "val.st"
				label="وضعیت"
				:flds="[{'id': '1','name': 'وضعیت فعال'},{'id': '0','name': 'وضعیت غیر فعال'}]"
				v-if="!chechRole()"
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
		import multiSelectInput from  "../../UI/input/multiSelectInput.vue";
		import selectInput from  "../../UI/input/selectInput.vue";
		import textareaInput from  "../../UI/input/textareaInput.vue";
		import userImg from  "../../UI/userImg/userImg.vue";
		import pageNavigation from  "../../UI/pageNavigation/pageNavigation.vue";
		import previewImage from  "../../UI/uploadFile/previewImage.vue";
		import { validateEmail, validatePhone, indexFinder } from  "../../assets/library/filter.js";
		import { success, error, loading } from  "../../assets/library/messege.js";

		export default {
			name: 'self_part1',
			data(){
				return {
					validateEmail: validateEmail,
					validatePhone: validatePhone,
					indexFinder: indexFinder,
					success: success,
					error: error,
					loading: loading,
					imgurl: this.$localStorage.get('imgurl'),
					baseurl: this.$localStorage.get('baseurl'),
					location: {ok: false, data: []},
					degrees: {ok: false, data: []},
					category: {ok: false, data: []},
					field: {ok: false, data: []},
					username: [],
					val:{
						i: null,
						n: '',
						p: '',
						lP: "",
						lC: "",
						st: 0,
						d: null,
						f: null,
						e: '',
						u: '',
						p1: '',
						p2: '',
						id: 0,
					}
				}
			},
			components: {
				btn,
				validateEmail,
				validateEmail,
				textInput,
				selectInput,
				pageNavigation,
				userImg,
				previewImage,
				textareaInput,
				multiSelectInput,
			},
			props: {
				flds: {
					default: [],
				},
			},
			mounted(){
				(this.$route.params.id == undefined) ? this.loader() : this.getTeacher();
			},
			methods:{
				getTeacher(THIS = this){
					$.post(this.baseurl+'user/'+this.$route.params.id, {token: this.$localStorage.get("user"), }, function(D){
						THIS.val = {
							i: D.data.img,
							n: D.data.fullname,
							p: D.data.phone,
							lP: D.data.province,
							lC: D.data.county,
							st: D.data.status,
							d: (D.data.degrees==0) ? null : D.data.degrees,
							f: (D.data.field==0) ? null : D.data.field,
							e: D.data.email,
							u: D.data.username,
							p1: "",
							p2: "",
							id: D.data.id,
						};
						THIS.loader();
					}, "json");
				},
				// *********************************************************************
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
				uploadFile(user = this.$localStorage.get("user"), url, THIS = this){
					THIS.loading(THIS);
					var formData = new FormData();
					formData.append("file", this.val.i[0]);
					formData.append("format", this.$localStorage.get('formatImage'));
					formData.append("idImg", "u_"+user.username.id);
					var xhttp = new XMLHttpRequest();
					xhttp.open("POST", this.$localStorage.get('upldurl'), true);
					xhttp.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							this.getVar = JSON.parse(this.responseText);

							if(this.getVar.response == 1){
								user.username.img = "u_" + user.username.id + "." + this.getVar.file_extension;
								if(this.chechRole()){
									THIS.$localStorage.set("user", user);
								}
								var typI = this.getVar.file_extension;
							} else {
								THIS.error(THIS, "فرمت فایل باید jpg باشد");
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
					if(this.$route.params.id == undefined && (this.val.p1=="" || this.val.p2=="")){
						THIS.error(THIS, 'کلمه عبور را وارد نمایید');
					}
					else if(this.val.n=="" || this.val.p=="" || this.val.lP=="" || this.val.lC=="" || this.val.u=="" || this.val.d==null || this.val.f==null){
						THIS.error(THIS, 'اطلاعات را تکمیل نمایید');
					}
					else if(!this.validateEmail(this.val.e) && this.val.e!=""){
						THIS.error(THIS, 'ایمیل اشتباه است');
					}
					else if(!this.validatePhone(this.val.p)){
						THIS.error(THIS, 'شماره موبایل اشتباه است');
					}
					else if(this.val.p1 != this.val.p2){
						THIS.error(THIS, 'کلمات عبور برابر نیستند');
					} else {
						this.savF();
					}
				},
				//______________________________________________________________________
				savF(THIS = this){
					let user;
					THIS.loading(THIS);
					$.post(this.baseurl + 'account/signup', {
						token: this.$localStorage.get("user"), fullname: this.val.n,
						phone: this.val.p,
						province: this.val.lP,
						county: this.val.lC,
						degrees: this.val.d,
						field: this.val.f,
						email: this.val.e,
						username: this.val.u,
						password: this.val.p1,
						status: this.val.st,
						id: this.val.id,
					}, function(D){
						if(D.ok){
							let url = '';
							if(THIS.chechRole() == true){
								THIS.$localStorage.set("user", D.data);
								url = '/reserved/user/list';
							} else{
								url = '/users';
							}
							if(THIS.val.i==null){
								THIS.$router.push(url);
							}else{
								THIS.uploadFile(D.data, url);
							}
						}else{
							THIS.error(THIS, 'نام کاربری تکراری است');
						}
					}, "json");
				},
				//______________________________________________________________________
				getInput(e, knd){ this.val[knd]=e; },
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
					$.get(this.baseurl+'category/list', { }, function(D){
						THIS.category = D;
					}, "json");
				}
			}
		}
	</script>
<style>

</style>
