<template>
	<div class="w-100" style="padding-top: 1rem">
		<label class="m-0">
			{{label}}
			<b v-if="error" class="is-invalid">
				({{error_text}})
			</b>
		</label>
		<textarea
			v-model="value"
			class="form-control p-3 border-15"
			:class="textClass + ((error) ? ' is-invalid ' : '') "
			style="background-color: #f5fafd; border: 1px solid #e5ebeb; color: #219580; border-radius:10px;   resize: none;"
			:placeholder="(placeholder=='') ? label : placeholder"
			@input="inputTxt()"
			@blur="blurinputTxt($event);"
		></textarea>
	</div>
</template>
<script>
	export default {
		name: 'textareaInput',
		data(){
			return {
				input: "",
				plc: "",
				lbl: '',
			}
		},
		components: {

		},
		props: {
			error: {
				type: Boolean,
				default: false,
			},
			error_text: {
				type: String,
				default: "",
			},
			label: {
				type: String,
				default: "label",
			},
			value: {
				type: String,
				default: "",
			},
			placeholder: {
				type: String,
				default: "",
			},
			textClass: {
				type: String,
				default: "",
			},
		},


		mounted(){
		},
		methods:{
			inputTxt(){
				this.$emit('inputTxtFunc', this.value);
			},
			//-----------------------------------------------------------------
			blurinputTxt(event){
				this.$emit('blurinputTxtFunc', event.target.value.trim());
			},
		}
	}
</script>

<style scope>

</style>
