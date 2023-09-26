<template>
	<div class="w-100 p-3 shadow bg-white border-15 h-center">
		<div style="width: 75%; max-width: 500px;">

			<textInput
				@inputTxtFunc = "cFunc"
				type="password"
				label="کلمه عبور فعلی"
				:val="val.c"
			/>
			<textInput
				@inputTxtFunc = "pFunc"
				type="password"
				label="کلمه عبور جدید"
				:val="val.p"
			/>
			<textInput
				@inputTxtFunc = "p1Func"
				type="password"
				label="تکرار کلمه عبور جدید"
				:val="val.p1"
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

		export default {
			name: 'self_part1',
			data(){
				return {
					img:{
					},
					imgurl: this.$localStorage.get('imgurl'),
					baseurl: this.$localStorage.get('baseurl'),
					location: {ok: false, data: []},
					degrees: {ok: false, data: []},
					field: {ok: false, data: []},
					username: [],
					val:{
						c: '',
						p: '',
						p1: '',
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

			},
			methods:{
				//______________________________________________________________________
				sav(THIS = this){
					if(this.val.p == '' || this.val.p1 == '' || this.val.c == ''){
						this.$swal.fire({
							position: 'center',
							type: 'error',
							title: "تمام قسمت ها را تکمیل نمایید",
							showCloseButton: true,
							showCancelButton: false,
							showConfirmButton: false,
							timer: 2000,
						})
					} else if(this.val.p != this.val.p1){
						this.$swal.fire({
							position: 'center',
							type: 'error',
							title: "کلمات عبور برابر نیستند",
							showCloseButton: true,
							showCancelButton: false,
							showConfirmButton: false,
							timer: 2000,
						})
					}else{
						$.post(this.baseurl+'self/setpass', {
							token: this.$localStorage.get("user"),
							role: this.$localStorage.get("user").username.role,
							id: this.$localStorage.get("user").username.id,
							cur: this.val.c,
							password: this.val.p,
						}, function(D){
							var type = ''
							var title = ''
							THIS.val.c = '';
							THIS.val.p = '';
							THIS.val.p1 = '';
							if(D.data=='1'){
								type = 'success'
								title = 'ثبت شد';
							}else{
								type = 'error'
								title = 'کلمه عبور فعلی صحیح نیست';
							}
							THIS.$swal.fire({
								position: 'center',
								type: type,
								title: title,
								showCloseButton: true,
								showCancelButton: false,
								showConfirmButton: false,
								timer: 2000,
							})
						}, "json");
					}
				},
				//______________________________________________________________________
				cFunc(e){ this.val.c=e; },
				//______________________________________________________________________
				pFunc(e){ this.val.p=e; },
				//______________________________________________________________________
				p1Func(e){ this.val.p1=e; },
				//______________________________________________________________________
			}
		}
	</script>
<style>

</style>
