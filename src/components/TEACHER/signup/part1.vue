<template>
	<div class="w-100 p-3 bg-white border-15 h-center">
		<div style="width: 75%; max-width: 500px;">
			<part1_progress
				:val1="progress(1)"
				:val2="progress(2)"
				:val3="progress(3)"
				:val4="progress(4)"
			/>
			<br/>
			<previewImage
				v-if="part_show==1"
				:img="val.i"
				@chengeFile="(e)=>{val.i = e}"
				:error="check_input && (val.i == '' || val.i == null)"
			/>
			<textInput
				v-if="part_show==1"
				label="نام و نام خانوادگی"
				@inputTxtFunc = "(e)=>{val.n = e}"
				:val="val.n"
				:error="check_input"
				:blur_error="val.n.length<5"
				error_text="نام و نام خانوادگی باید حداقل 5 کارکتر داشته باشد"
				@blurinputTxtFunc = "(e)=>{p_sav(e)}"
			/>
			<textInput
				v-if="part_show==1"
				label="شماره موبایل"
				@inputTxtFunc = "(e)=>{val.p = e}"
				:val="val.p"
				:error="check_input"
				:blur_error="!validatePhone(val.p)"
				error_text="شماره موبایل وارد شده صحیح نمی‌باشد"
				@blurinputTxtFunc = "(e)=>{p_sav(e)}"
			/>
			<div
				class="w-100 overflow-hidden"
				v-if="part_show==1"
			>
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right" :class="(windowWidth>770) ? 'pr-0' : 'p-0'">
					<selectInput
						:value="val.lP"
						:flds="location.data"
						@inputTxtFunc = "(e)=>{val.lP = e}"
						label="استان"
						:error="check_input"
						:blur_error="val.lP==''"
						error_text="استان انتخاب نشده است"
						@blurinputTxtFunc = "(e)=>{p_sav(e)}"
					/>
				</div>
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right" :class="(windowWidth>770) ? 'pl-0' : 'p-0'">
					<selectInput
						:value="val.lC"
						:flds="(val.lP==0)? [] : location.data[indexFinder(location.data, val.lP)].county"
						@inputTxtFunc = "(e)=>{val.lC = e}"
						label="شهر"
						:error="check_input"
						:blur_error="val.lC==''"
						error_text="شهر انتخاب نشده است"
						@blurinputTxtFunc = "(e)=>{p_sav(e)}"
					/>
				</div>
			</div>
			<selectInput
				v-if="part_show==1"
				:value="val.s"
				:flds="sex"
				@inputTxtFunc = "(e)=>{val.s = e}"
				label="جنسیت"
				:error="check_input"
				:blur_error="val.s==''"
				error_text="جنسیت مشخص نشده است"
				@blurinputTxtFunc = "(e)=>{p_sav(e)}"
			/>
			<btn
				v-if="part_show==1"
				class="pt-3 w-100"
				textClass="w-100"
				text="ذخیره و مرحله بعد"
				@clickMe="sav(1)"
			/>
			<!--__________________________________________________________________-->
			<multiSelectInput
				v-if="part_show==2"
				:value="val.d"
				:flds="$localStorage.get('degrees').data"
				@input="(e)=>{val.d = e; p_sav(e);}"
				label="دسته بندی ها"
				:error="check_input && val.d.length == 0"
				error_text="دسته بندی را مشخص نمایید"
			/>
			<multiSelectInput
				v-if="part_show==2"
				:flds="field.data"
				:value="val.f"
				@input="(e)=>{val.f = e; p_sav(e);}"
				label="رشته تحصیلی"
				:error="check_input && val.f.length == 0"
				error_text="رشته تحصیلی را مشخص نمایید"
			/>
			<multiSelectInput
				v-if="part_show==2"
				:flds="category.data"
				:value="val.c"
				@input="(e)=>{val.c = e; p_sav(e);}"
				label="موضوع تدریس"
				:error="check_input && val.c.length == 0"
				error_text="موضوع تدریس را مشخص نمایید"
			/>
			<div
				class="w-100 overflow-hidden"
				v-if="part_show==2"
			>
				<div
					class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right"
					:class="(windowWidth>770) ? 'pr-0' : 'p-0'"
				>
					<btn
						type="warning"
						v-if="part_show==2"
						class="pt-3 w-100"
						textClass="w-100"
						text="بازگشت"
						@clickMe="part_show=part_show-1"
					/>
				</div>
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right" :class="(windowWidth>770) ? 'pl-0' : 'p-0'">
					<btn
						v-if="part_show==2"
						class="pt-3 w-100"
						textClass="w-100"
						text="ذخیره و مرحله بعد"
						@clickMe="sav(2)"
					/>
				</div>
			</div>
			<!--__________________________________________________________________-->
			<textInput
				label="پورسانت از مدرس"
				@inputTxtFunc = "(e)=>{val.cm = e}"
				:val="val.cm"
				v-if="!chechRole() && part_show==3"
			/>
			<textInput
				v-if="part_show==3"
				label="شماره تماس عمومی(اختیاری)"
				@inputTxtFunc = "(e)=>{val.pp = e}"
				:val="val.pp"
				@blurinputTxtFunc = "(e)=>{p_sav(e)}"
			/>
			<textInput
				v-if="part_show==3"
				label="آدرس تدریس حضوری"
				@inputTxtFunc = "(e)=>{val.a = e}"
				:val="val.a"
				:error="check_input"
				:blur_error="val.a == '' || val.a == null"
				error_text="آدرس تدریس حضوری را مشخص نمایید"
				@blurinputTxtFunc = "(e)=>{p_sav(e)}"
			/>
			<textareaInput
				v-if="part_show==3"
				:value = "val.ab"
				@inputTxtFunc="(e)=>{val.ab = e}"
				label="درباره من"
				:error="check_input && (val.ab == '' || val.ab == null)"
				error_text="توضیحاتی را در باره خود وارد نمایید"
				@blurinputTxtFunc = "(e)=>{p_sav(e)}"
			/>
			<textInput
				v-if="part_show==3"
				label="ایمیل (اختیاری)"
				@inputTxtFunc = "(e)=>{val.e = e}"
				:val="val.e"
				:error="check_input && (validateEmail(val.e) && val.e!='')"
				error_text="ایمیل وارد شده صحیح نمی‌باشد"
				@blurinputTxtFunc = "(e)=>{p_sav(e)}"
			/>
			<div
				class="w-100 overflow-hidden"
				v-if="part_show==3"
			>
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right" :class="(windowWidth>770) ? 'pr-0' : 'p-0'">
					<btn
						type="warning"
						class="pt-3 w-100"
						textClass="w-100"
						text="بازگشت"
						@clickMe="part_show=part_show-1"
					/>
				</div>
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right" :class="(windowWidth>770) ? 'pl-0' : 'p-0'">
					<btn
						class="pt-3 w-100"
						textClass="w-100"
						text="ذخیره و مرحله بعد"
						@clickMe="sav(3)"
					/>
				</div>
			</div>
			<!-- __________________________________________________________________ -->
			<textInput
				v-if="part_show==4"
				label="نام کاربری"
				@inputTxtFunc = "(e)=>{val.u = e}"
				:val="val.u"
				:error="check_input"
				:blur_error="val.u.length < 5"
				error_text="نام کاربری باید حداقل 5 کارکتر باشد"
				@blurinputTxtFunc = "(e)=>{p_sav(e)}"
			/>
			<textInput
				v-if="part_show==4"
				type = "password"
				label="کلمه عبور"
				@inputTxtFunc = "(e)=>{val.p1 = e}"
				:val="val.p1"
				:error="check_input"
				:blur_error="val.p1.length < 5"
				error_text="کلمه عبور باید حداقل 5 کارکتر باشد"
				@blurinputTxtFunc = "(e)=>{p_sav(e)}"
			/>
			<textInput
				v-if="part_show==4"
				type = "password"
				label="تکرار کلمه عبور"
				@inputTxtFunc = "(e)=>{val.p2 = e}"
				:val="val.p2"
				:error="check_input"
				:blur_error="val.p1 != val.p2"
				error_text="کلمات عبور یکسان نیست"
				@blurinputTxtFunc = "(e)=>{p_sav(e)}"
			/>
			<selectInput
				v-if="!chechRole() && part_show==4"
				@inputTxtFunc = "(e)=>{val.st = e}"
				:value = "val.st"
				label="وضعیت"
				:flds="[{'id': '1','name': 'وضعیت فعال'},{'id': '0','name': 'وضعیت غیر فعال'}]"
				@blurinputTxtFunc = "(e)=>{p_sav(e)}"
			/>
			<uploadFile
				v-if="part_show==4"
				label="تصویر کارت ملی"
				:files="val.fs.f1"
				:inputFile="val.file"
				@chengeFile = "(e)=>{val.file = e; uploadTF('f1');}"
				@removeFile = "(e)=>{val.fs.f1 = e;}"
				:error="check_input && fs.f1.length==0"
				error_text="تصویر کارت ملی وارد نشده است"
			/>
			<uploadFile
				v-if="part_show==4"
				label="مدارک تحصیلی و افتخارات"
				:files="val.fs.f2"
				:inputFile="val.file"
				@chengeFile = "(e)=>{val.file = e; uploadTF('f2');}"
				@removeFile = "(e)=>{val.fs.f2 = e;}"
				:error="check_input && fs.f2.length==0"
				error_text="مدارک تحصیلی و افتخارات وارد نشده است"
			/>
			<span
				class="text-light"
				v-if="part_show==4"
			>
				می‌توانید بیش از یک فایل بارگذاری نمایید
			</span>

			<div
				class="w-100 overflow-hidden"
				v-if="part_show==4"
			>
				<div
					class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right"
					:class="(windowWidth>770) ? 'pr-0' : 'p-0'"

				>
					<btn
						type="warning"
						class="pt-3 w-100"
						textClass="w-100"
						text="بازگشت"
						@clickMe="part_show = part_show-1"
					/>
				</div>
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right" :class="(windowWidth>770) ? 'pl-0' : 'p-0'">
					<btn
						class="pt-3 w-100"
						textClass="w-100"
						text="ذخیره نهایی"
						@clickMe=" sav(4);"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

	<script>
		import btn from  "../../UI/button/btn.vue";
		import part1_progress from  "./part1_progress.vue";
		import textInput from  "../../UI/input/textInput.vue";
		import multiSelectInput from  "../../UI/input/multiSelectInput.vue";
		import selectInput from  "../../UI/input/selectInput.vue";
		import textareaInput from  "../../UI/input/textareaInput.vue";
		import userImg from  "../../UI/userImg/userImg.vue";
		import pageNavigation from  "../../UI/pageNavigation/pageNavigation.vue";
		import previewImage from  "../../UI/uploadFile/previewImage.vue";
		import uploadFile from  "../../UI/uploadFile/file.vue";
		import { validateEmail, validatePhone, indexFinder } from  "../../assets/library/filter.js";
		import { success, error, loading, success_sm } from  "../../assets/library/messege.js";

		export default {
			name: 'self_part1',
			data(){
				return {
					validateEmail: validateEmail,
					validatePhone: validatePhone,
					indexFinder: indexFinder,
					success: success,
					success_sm: success_sm,
					error: error,
					loading: loading,
					imgurl: this.$localStorage.get('imgurl'),
					baseurl: this.$localStorage.get('baseurl'),
					location: {ok: false, data: []},
					degrees: {ok: false, data: []},
					category: {ok: false, data: []},
					field: {ok: false, data: []},
					username: [],
					part_show: 1,
					check_input: false,
					sex: [
					{id:1, name: "مرد"},
					{id:2, name: "زن"}
					 ],
					 part: [0, 0, 0, 0],
					val:{
						file: null,
						fs: {
							f1: [],
							f2: [],
						},
						i: null,
						n: '',
						cm: '0',
						p: '',
						lP: "",
						lC: "",
						s: '',
						st: 0,
						d: [],
						f: [],
						c: [],
						pp: '',
						a: '',
						ab: '',
						e: '',
						u: '',
						p1: '',
						p2: '',
						id: 0,
					},
					id_p: 0,
					usr_p: 0,
				}
			},
			components: {
				btn,
				uploadFile,
				validateEmail,
				validateEmail,
				textInput,
				selectInput,
				pageNavigation,
				userImg,
				previewImage,
				textareaInput,
				multiSelectInput,
				part1_progress,
			},
			props: {
				flds: {
					default: [],
				},
			},
			mounted(THIS = this){
				THIS.loading(THIS);
				(this.$route.params.id == undefined) ? this.loader() : this.getTeacher();
				this.usr_p = parseInt(Math.random()*1000000);
			},
			methods:{
				getTeacher(THIS = this){
					$.post(this.baseurl+'teachers/'+this.$route.params.id, {token: this.$localStorage.get("user"), }, function(D){
						THIS.val = {
							file: null,
							fs: D.data.files,
							i: D.data.img,
							n: D.data.fullname,
							cm: D.data.commission,
							p: D.data.phone,
							lP: D.data.province,
							lC: D.data.county,
							s: D.data.sex,
							st: D.data.status,
							d: D.data.degrees.split(','),
							f: D.data.field.split(','),
							c: D.data.category.split(','),
							pp: D.data.public_phone,
							a: D.data.address,
							ab: D.data.about_me,
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
				uploadTF(val, THIS = this){
					THIS.loading(THIS);
					var formData = new FormData();
					formData.append("file", this.val.file[0]);
					formData.append("format", this.$localStorage.get('formatDocs'));
					formData.append("idImg", "t_[DATE]_[RANDOM]");
					var xhttp = new XMLHttpRequest();
					xhttp.open("POST", this.$localStorage.get('upldurl'), true);
					xhttp.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							this.getVar = JSON.parse(this.responseText);
							if(this.getVar.response == 1){
								if(THIS.chechRole()){

								}
								var typI = this.getVar.file_extension;
								let F = {
									fileName: this.getVar.filename,
									fileUpload: this.getVar.uploadFileName,
								};
								if(val=='f1'){
									THIS.val.fs.f1.push(F);
								}else if(val=='f2'){
									THIS.val.fs.f2.push(F);
								}
								THIS.success_sm(THIS);
							} else {
								THIS.error(THIS, "فرمت فایل باید jpg باشد");
							}
						}
					};
					xhttp.send(formData);

				},
				// *********************************************************************
				uploadFile(user = this.$localStorage.get("user"), url, THIS = this){
					THIS.loading(THIS);
					var formData = new FormData();
					formData.append("file", this.val.i[0]);
					formData.append("format", this.$localStorage.get('formatImage'));
					formData.append("idImg", "t_"+user.username.id);
					var xhttp = new XMLHttpRequest();
					xhttp.open("POST", this.$localStorage.get('upldurl'), true);
					xhttp.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							this.getVar = JSON.parse(this.responseText);

							if(this.getVar.response == 1){
								user.username.img = "t_" + user.username.id + "." + this.getVar.file_extension;
								if(THIS.chechRole()){
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
				progress(part=1){
					var res = 0;
					if(part==1){
						if(this.val.i != '' && this.val.i != null)	res += 1;
						if(this.val.n != '' && this.val.n != null)	res += 1;
						if(this.val.p != '' && this.val.p != null)	res += 1;
						if(this.val.lP != '' && this.val.lP != null)	res += 1;
						if(this.val.lC != '' && this.val.lC != null)	res += 1;
						if(this.val.s != '' && this.val.s != null)	res += 1;
						res = res / 6 * 100 / 4;
					}
					if(part==2){
						if(this.val.c.length != 0)	res += 1;
						if(this.val.d.length != 0)	res += 1;
						if(this.val.f.length != 0)	res += 1;
						res = res / 3 * 100 / 4;
					}
					if(part==3){
						if(this.val.a != '' && this.val.a != null)	res += 1;
						if(this.val.pp != '' && this.val.pp != null)	res += 1;
						if(this.val.ab != '' && this.val.ab != null)	res += 1;
						if(this.val.e != '' && this.val.e != null)	res += 1;
						res = res / 4 * 100 / 4;
					}
					if(part==4){
						if(this.val.u != '' && this.val.u != null)	res += 1;
						if(this.val.p1 != '' && this.val.p1 != null)	res += 1;
						if(this.val.p2 != '' && this.val.p2 != null)	res += 1;
						if(this.val.fs.f1.length != 0)	res += 1;
						if(this.val.fs.f2.length != 0)	res += 1;
						res = res / 5 * 100 / 4;
					}
					return parseInt(res*100)/100;
				},
				//______________________________________________________________________
				sav(part_show=1, THIS = this){
					this.check_input = true;
					if(this.progress(part_show)==25 || (part_show==3 && this.progress(part_show)==12.5)){
						THIS.part_show = part_show + 1;
						this.check_input = false;
					}

					if(part_show==4){
						if(this.$route.params.id == undefined && (this.val.p1=="" || this.val.p2=="")){
							THIS.error(THIS, 'کلمه عبور را وارد نمایید');
						} else if(this.val.n=="" || this.val.p=="" || this.val.lP=="" || this.val.lC=="" || this.val.s=="" || this.val.a=="" || this.val.ab=="" || this.val.u=="" || this.val.d.length==0 || this.val.f.length==0 || this.val.c.length==0){
							THIS.error(THIS, 'اطلاعات را تکمیل نمایید');
							} else if(!this.validateEmail(this.val.e) && this.val.e!=""){
								THIS.error(THIS, 'ایمیل اشتباه است');
							}else if(!this.validatePhone(this.val.p)){
								THIS.error(THIS, 'شماره موبایل اشتباه است');
							} else if(this.val.p1 != this.val.p2){
								THIS.error(THIS, 'کلمات عبور برابر نیستند');
							} else {
								this.savF();
							}
							}
							},
							//______________________________________________________________________
							savF(THIS = this){
								let user;
								THIS.loading(THIS);
								$.post(this.baseurl + 'accountTeacher/signup', {
								token: this.$localStorage.get("user"),
									fullname: this.val.n,
									phone: this.val.p,
									province: this.val.lP,
									county: this.val.lC,
									sex: this.val.s,
									degrees: this.val.d.toString(),
									field: this.val.f.toString(),
									category: this.val.c.toString(),
									public_phone: this.val.pp,
									address: this.val.a,
									about_me: this.val.ab,
									email: this.val.e,
									username: this.val.u,
									password: this.val.p1,
									status: this.val.st,
									commission: this.val.cm,
									files: this.val.fs,
									id: this.val.id,
								}, function(D){
									if(D.ok){
										let url = '';
										THIS.success_sm(THIS, "ثبت شد");
										if(THIS.chechRole() == true){
											THIS.$localStorage.set("user", D.data);
											url = '/reserved/user/list';
										} else{
											url = '/teachers';
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
							p_sav(e, THIS = this){
								if(this.validatePhone(this.val.p) && (this.$route.params.id == undefined)){
									$.post(this.baseurl + 'accountTeacher/signup', {
									token: this.$localStorage.get("user"),
										fullname: this.val.n,
										phone: this.val.p,
										province: this.val.lP,
										county: this.val.lC,
										sex: this.val.s,
										degrees: this.val.d.toString(),
										field: this.val.f.toString(),
										category: this.val.c.toString(),
										public_phone: this.val.pp,
										address: this.val.a,
										about_me: this.val.ab,
										email: this.val.e,
										password: this.val.p1,
										status: 2,
										commission: this.val.cm,
										id: this.id_p,
										files: this.val.fs,
										username: ((this.val.u == "") ? "NULL_"+this.usr_p : this.val.u) ,
									}, function(D){
										if(D.ok){
											THIS.id_p = D.data.username.id;
											THIS.val.id = D.data.username.id;
										}
									}, "json");
								}
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
									THIS.success_sm(THIS, "آماده شد");
								}, "json");
							}
							}
							}
							</script>
								<style>

								</style>
