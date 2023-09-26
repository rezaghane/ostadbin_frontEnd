<template>
	<div class="w-100 pt-3">
		<label class="mb-0" style="color:#b4bebf">
			{{label}}
			<b v-if="(set_error()!='' || error_class!='') && error_text!=''" class="is-invalid">
				({{error_text}})
			</b>
		</label>
		<select
			class="form-control"
			:class="set_error() + error_class"
			style="background-color: #f5fafd; border: 1px solid #e5ebeb; color: #219580; border-radius:10px;"
			v-model="(value==-1 || value=='' || value==null) ? '-1' : value"
			@input="inputTxt($event)"
			@blur="set_error();  blurinputTxt($event);"
		>
			<option value='-1' hidden>{{label}}</option>
			<option class="" v-for="(option, j) in flds" :key="j" :value="option.id">
				{{option.name}}
			</option>
		</select>
	</div>
</template>
<script>
	export default {
		name: 'selectInput',
		data(){
			return {
				class_error : "",
				error_class : "",
			}
		},
		components: {

		},
		props: {
			'label': {
				type: String,
				default: "متن",
			},
			error: {
				type: Boolean,
				default: false,
			},
			blur_error: {
				type: Boolean,
				default: false,
			},
			error_text: {
				type: String,
				default: "",
			},
			'flds':{
				type: Object,
				default: [{'id': '2','name': 'خیر'},{'id': '1','name': 'بلی'}],
			},
			'value':{
				type: String,
				default: "-1",
			}
		},
		mounted(){
			if(this.error){
				this.set_error();
			}
		},
		methods:{
			//__________________________________________________________________
			set_error(){
				return (this.blur_error && this.error) ? " is-invalid " : "" ;
			},
			//__________________________________________________________________
			set_blur_error(){
				this.error_class = (this.blur_error || this.error) ? " is-invalid " : "" ;
			},
			//__________________________________________________________________
			blurinputTxt(event){
				this.$emit('blurinputTxtFunc', event.target.value.trim());
			},
			//__________________________________________________________________
			inputTxt(event){
				this.$emit('inputTxtFunc', event.target.value);
			},
		}
	}
</script>

<style scope>
	.is-invalid{
		border-color: #fa6a6e !important;
		color: #fa6a6e !important;
	}
</style>
