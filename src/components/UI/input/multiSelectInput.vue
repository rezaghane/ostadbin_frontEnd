<template>
	<div class="w-100" style="padding-top: 1rem">
		<label class="m-0">
			{{label}}
			<b v-if="error" class="is-invalid">
				({{error_text}})
			</b>
		</label>
		<Treeselect
			search-nested
			:placeholder="(placeholder=='') ? label : placeholder"
			:multiple="multiple"
			:options="setOptions()"
			@input="inputTxt($event); "
			allowClear
      treeDefaultExpandAll
			:showSearch="false"
			v-model="value"
			noResultsText="موردی یافت نشد"
			noOptionsText="موردی یافت نشد"
			:class="class_error"
		/>
	</div>
</template>
<script>
	import Treeselect from '@riophae/vue-treeselect';
	import '@riophae/vue-treeselect/dist/vue-treeselect.css';
	export default {
		name: 'multiSelectInput',
		data(){
			return {
				class_error : "",
			}
		},
		components: {
			Treeselect ,
		},
		props: {
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
			label: {
				type: String,
				default: "label",
			},
			value: {
				default: [],
			},
			placeholder: {
				type: String,
				default: "",
			},
			textClass: {
				type: String,
				default: "",
			},
			multiple: {
				type: Boolean,
				default: true,
			},
			flds:{
				default: [
				{id: 1, name: 'a'},
				{id: 2, name: 'b'},
				],
			}
		},
		mounted(){
			if(this.multiple==true && this.value.length==0){
				this.value = [];
			}
			else if(this.multiple==false && (this.value==null || this.value.length==0)){
				this.value = null;
			}
			if(this.error){
				this.set_error();
			}
		},
		methods:{
			set_error(){
				this.class_error = (this.blur_error || this.error) ? " is-invalid " : "" ;
			},
			//__________________________________________________________________
			inputTxt(e){
				this.$emit('input', e);
			},
			//________________________________________________________________________
			blurinputTxt(event){
				this.$emit('blurinputTxtFunc', event.target.value.trim());
			},
			//________________________________________________________________________
			setOptions(){
				let idModified = this.flds.map(
					obj => {
						return {
	            "id" : obj.id,
	            "label":(obj.name == undefined) ? obj.label : obj.name,
						}
					}
				);
				return idModified;
			}
			//________________________________________________________________________
		}
	}
</script>
<style scope>
	.vue-treeselect__control{
		background-color: rgb(245, 250, 253);
    border: 1px solid rgb(229, 235, 235);
    color: rgb(33, 149, 128);
    border-radius: 10px;
	}

	.is-invalid{
		border-color: #fa6a6e !important;
		color: #fa6a6e !important;
	}
</style>
