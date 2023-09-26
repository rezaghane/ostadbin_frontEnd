<template>
	<div class="w-100 p-3 shadow bg-white border-15 h-center">
		<div style="width: 75%; max-width: 500px;">

			<previewImage
				:img="val.i"
				@chengeFile="getInput($event, 'i')"
			/>
			<textInput
				label="ایمیل (اختیاری)"
				@inputTxtFunc = "getInput($event, 'e')"
				:val="val.e"
			/>
			<textInput
				label="شماره تماس عمومی (اختیاری)"
				@inputTxtFunc = "getInput($event, 'p')"
				:val="val.p"
			/>
			<div class="w-100 overflow-hidden">
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right" :class="(windowWidth>770) ? 'pr-0' : 'p-0'">
					<selectInput
						:value="val.lP"
						:flds="location.data"
						@inputTxtFunc = "getInput($event, 'lP')"
						label="استان"
					/>
				</div>
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right" :class="(windowWidth>770) ? 'pl-0' : 'p-0'">
					<selectInput
						:value="val.lC"
						:flds="(val.lP==0)? [] : location.data[indexFinder(location.data, val.lP)].county"
						@inputTxtFunc = "getInput($event, 'lC')"
						label="شهر"
					/>
				</div>
			</div>
			<textInput
				label="محل تدریس حضوری"
				@inputTxtFunc = "getInput($event, 'a')"
				:val="val.a"
			/>
			<textareaInput
				@inputTxtFunc="getInput($event, 'ab')"
				:value="val.ab"
				label="درباره من"
			/>
			<p class="text-success mt-3" style="font-size: 12px;">
				با تکمیل "درباره من" می توانید اطلاعات بیشتری از خود را به کاربران بدهید.
			</p>
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
		import textareaInput from  "../../UI/input/textareaInput.vue";
		import selectInput from  "../../UI/input/selectInput.vue";
		import userImg from  "../../UI/userImg/userImg.vue";
		import pageNavigation from  "../../UI/pageNavigation/pageNavigation.vue";
		import previewImage from  "../../UI/uploadFile/previewImage.vue";
		import { validateEmail, validatePhone, indexFinder } from  "../../assets/library/filter.js";
		import { error, success, loading } from  "../../assets/library/messege.js";

		export default {
			name: 'self_part1_TEACHER',
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
				textareaInput
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
					THIS.$swal.fire({
	          position: 'center',
	          type: '',
	          html: '<div class="text-center text-primary"><i class="fa-3x fas fa-spinner fa-pulse"></i></div><br/><p dir="rtl" class=" text-primary text-center">در حال ارسال عکس لطفا صبر کنید</p>',
	          showConfirmButton: false,
	        });

					let user = this.$localStorage.get("user");
					var formData = new FormData();
					formData.append("file", this.val.i[0]);
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
					THIS.$swal.fire({
	          position: 'center',
						title: 'ثبت شد',
						type: 'success',
						timer: 1500,
	          showConfirmButton: false,
	        });
					setTimeout(function() {
						THIS.$router.push(url);
					}, 1000)
				},
				//______________________________________________________________________
				sav(THIS = this){
					THIS.loading(THIS)
					let user = THIS.$localStorage.get("user");
					let id = (this.$route.params.id == undefined) ? this.$localStorage.get("user").username.id : this.$route.params.id;
					let role = (this.$route.params.role == undefined) ? this.$localStorage.get("user").username.role : this.$route.params.role;
					$.post(this.baseurl+'self/account', {
						token: this.$localStorage.get("user"),
						id: id,
						role: role,
						email: this.val.e,
						province: this.val.lP,
						county: this.val.lC,
						mobile: this.val.p,
						address: this.val.a,
						about_me: this.val.ab,
						status: this.val.s
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
							url = '/teachers';
						}

						if(THIS.val.i==null){
							THIS.$router.push(url);
						}else{
							THIS.uploadFile(url);
						}
					}, "json");
				},
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
						this.val.e = this.$localStorage.get("user").username.email;
						this.val.p = this.$localStorage.get("user").username.mobile;
						this.val.a = this.$localStorage.get("user").username.address;
						this.val.ab = this.$localStorage.get("user").username.about_me;
						this.val.lP = this.$localStorage.get("user").username.province;
						this.val.lC = this.$localStorage.get("user").username.county;
						this.val.s = this.$localStorage.get("user").username.status;
					}else{
						$.get(this.baseurl+'/teachers/'+this.$route.params.id, { }, function(D){
							THIS.val.i = D.data.img;
							THIS.val.e = D.data.email;
							THIS.val.p = D.data.mobile;
							THIS.val.a = D.data.address;
							THIS.val.ab = D.data.about_me;
							THIS.val.lP = D.data.province;
							THIS.val.lC = D.data.county;
							THIS.val.s = D.data.status;
						}, "json");
					}
				},
				//______________________________________________________________________
				getInput(e, knd){ this.val[knd]=e; },
				//______________________________________________________________________
			}
		}
	</script>
<style>

</style>
