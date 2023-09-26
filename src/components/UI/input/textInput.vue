<template>
	<div class="w-100" style="padding-top: 1rem">
		<label
			class="mb-0"
			style="color:#b4bebf"
			v-if="label!=''"
		>
			{{label}}
			<b v-if="(set_error()!='' && error_text!='')" class="is-invalid">

				({{error_text}})
			</b>
		</label>
		<input
			:type="type"
			class="form-Control p-3"
			:class="set_error() + textClass"
			style="background-color: #f5fafd; border: 1px solid #e5ebeb; color: #219580; border-radius:10px; background-repeat: no-repeat; background-position: 15 center;"
			:style="'background-image: url('+img+'); '"
			:placeholder="(placeholder=='') ? label : placeholder"
			v-model="val"
			@input="inputTxt($event)"
			@click='enterFunc'
			ref='focusMe'
			@keyup.enter='enterFunc'
			@blur="set_error(); blurinputTxt($event);"
			autocomplete="new-password"
		/>
	</div>
</template>
<script>
	export default {
		name: 'textInput',
		data(){
			return {
			}
		},
		components: {

		},
		props: {
			type: {
				type: String,
				default: "text",
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
			textClass: {
				type: String,
				default: "",
			},
			autofocus: {
				type: String,
				default: "false",
			},
			label: {
				type: String,
				default: "label",
			},
			val: {
				type: String,
				default: "",
			},
			placeholder: {
				type: String,
				default: "",
			},
			img: {
				default: "",
			},
		},
		mounted(){
			if(this.autofocus != "false"){
				this.$nextTick(() => this.$refs.focusMe.focus());
			}
			if(this.error){
				this.set_error();
			}
		},
		methods:{
			//__________________________________________________________________
			set_error(){
				return	(this.blur_error && this.error) ? " is-invalid " : "" ;
			},
			//__________________________________________________________________
			enterFunc(event){
				if(event.target.value != ''){
					this.$emit('enter', event.target.value.trim());
				}
			},
			inputTxt(event){
				this.$emit('inputTxtFunc', event.target.value.trim());
			},
			blurinputTxt(event){
				this.$emit('blurinputTxtFunc', event.target.value.trim());
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
