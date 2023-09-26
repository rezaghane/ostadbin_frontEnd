<template>
	<div class="w-100 p-3" v-if="flds.ok">
		<div class="w-100 pb-3 pl-3 pr-3 border-15 border overflow-auto shadow">
			<div class="col-lg-3 col-md-12 col-sm-12 col-xs-12 float-right">
				<selectInput
					label="دسته بندی"
					:value="val.d"
					:flds="flds.data"
					@inputTxtFunc = "(e)=>{val.d = e}"
				/>
			</div>
			<div class="col-lg-3 col-md-12 col-sm-12 col-xs-12 float-right">
				<selectInput
					:value="val.c"
					:flds="flds.data[indexFinder(flds.data, val.d)].category"
					@inputTxtFunc = "(e)=>{val.c = e}"
					label="انتخاب موضوع درس"
				/>
			</div>
			<div class="col-lg-3 col-md-12 col-sm-12 col-xs-12 float-right">
				<selectInput
					:value="val.l"
					:flds="this.location.data"
					@inputTxtFunc = "(e)=>{val.l = e}"
					label="انتخاب شهر"
				/>
			</div>
			<div class="col-lg-3 col-md-12 col-sm-12 col-xs-12 pt-3 float-right h-center">
				<btn
					class="w-100"
					style="margin-top: 15px;"
					textClass="w-100"
					type="orange"
					text="جستجو"
					@clickMe="srch()"
				/>
			</div>
		</div>
	</div>
</template>

	<script>
		import btn from  "../../../UI/button/btn.vue";
		import selectInput from  "../../../UI/input/selectInput.vue";
		import { indexFinder } from  "../../../assets/library/filter.js";
		export default {
			name: 'p_home',
			data(){
				return {
					baseurl: this.$localStorage.get('baseurl'),
					val:{
						d: 1,
						c: "",
						l: "",
					},
					indexFinder: indexFinder,
					location: [],
				}
			},
			components: {
				btn,
				selectInput,
			},
			props: {
				flds: {
					default: {"ok": false,},
				},
			},
			mounted( THIS = this){
				$.get(this.baseurl+'/location/highlights', { }, function(D){
					THIS.location = D;
				}, "json");
			},
			methods:{
				srch(){
					let d = (this.val.d != '') ? "degrees=" + this.val.d : '0';
					let c = (this.val.c != '') ? "category=" + this.val.c : '0';
					let l = (this.val.l != '') ? "location=" + this.val.l : '0';
					this.$router.push('/teachers?'+d+'&'+c+'&'+l)
				},
			}
		}
	</script>
<style>

</style>
