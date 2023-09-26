<template>
	<div class="w-100 p-3 bg-white border-15 h-center">
		<div style="width: 75%; max-width: 500px;" class="text-center">
			<img
				:src="require('../../assets/img/love.png')"
				style="width: 10vw;"
				title="بخش واریز خیریه ها در استاد بین"
				alt="بخش واریز خیریه ها در استاد بین"
			/>
			<h2 v-if="index_text>-1">
				{{this.$localStorage.get('settings')[index_text].title}}
			</h2>
			<p class="text-justify" v-if="index_text>-1">
				{{this.$localStorage.get('settings')[index_text].dsc}}
			</p>
			<textInput
				type="number"
				label="مبلغ پرداختی(تومان)"
				@inputTxtFunc = "(e)=>{val.money = e}"
				:val="val.money"
				:textClass="(val.money<50000 || val.money=='') ? 'text-danger border-danger' : ''"
			/>
			<textInput
				label="نام و نام خانوادگی (اختیاری)"
				@inputTxtFunc = "(e)=>{val.nam = e}"
				:val="val.n"
			/>
			<textInput
				label="شماره موبایل (اختیاری)"
				@inputTxtFunc = "(e)=>{val.phone = e}"
				:val="val.p"
			/>
			<textareaInput
				:value = "val.ab"
				@inputTxtFunc="(e)=>{val.exp = e}"
				label="توضیحات (اختیاری)"
			/>
			<btn
				class="pt-3 w-100"
				textClass="w-100"
				text="پرداخت"
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
					val:{
						money: '50000',
						nam: '',
						exp: '',
						phone: '',
					},
					index_text : -1
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
			},
			props: {

			},
			mounted(THIS = this){
				var url = new URL(location.href);
				var Status = url.searchParams.get("Status");

				if(Status=="OK"){
					THIS.success(THIS);
				}else if(Status=="NOK"){
					THIS.error(THIS, "پرداخت با موفقیت انجام نشده است");
				}
				this.index_text = this.indexFinder(this.$localStorage.get('settings'), "16");
			},
			methods:{
				//______________________________________________________________________
				sav(THIS = this){
					if(this.val.money=="" || parseInt(this.val.money) < 50000){
						THIS.error(THIS, 'حداقل مبلغ مجاز برای ثیت در خیریه پنجاه هزار تومان است');
						this.val.money = "50000";
					} else {
						this.savF();
					}
				},
				//______________________________________________________________________
				savF(THIS = this){
					THIS.loading(THIS);
					$.post(this.baseurl + 'charity/save', {
						token: this.$localStorage.get("user"),
						val: this.val,
					}, function(D){
						if(D.ok){
							window.location.href = location.origin+"/api_UTadris/prdOnline_charity.php?id="+D.data;
						}
					}, "json");
				},
				//______________________________________________________________________
			}
		}
	</script>
