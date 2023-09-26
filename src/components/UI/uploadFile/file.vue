<template>
	<div>
		<label class="w-100" style="padding-top: 1rem">
			<label class="mb-0" style="color:#b4bebf" v-if="label!=''">
				{{label}}
				<span v-if="error" class="text-danger">
					( {{error_text}} )
				</span>
			</label>
			<div
				id="customInput"
				class="form-Control pointer"
				:class="textClass"
				:style="'background-image:url('+require('../../assets/img/add.png')+')'"
				style="background-color: #f5fafd; border: 1px solid #e5ebeb; color: #219580; border-radius:10px; background-repeat: no-repeat; background-size: 35px; background-position: 10px center;"
				@click="show = true"
			>
				{{ (value=='' || value==null)? label : value }}
			</div>
			<input
				type="file"
				id="files"
				class="d-none"
				accept="application/pdf, image/gif, image/jpeg, image/png"
				name="files"
				@change="onFileChange"
				v-if="inputCheck"
			/>
		</label>
		<div
			class="border border-15 bg p-2 text-success mb-1"
			style="
			min-width: 150px;
			max-width: 100%;
			width: fit-content;
			display: flex;
			align-content: flex-start;
			justify-content: center;
			align-items: center;
			"
			v-for="(f, i) in files"
			:key="i"
		>
			<span
				class="pointer "
				@click="(e)=>{ rtr(f.fileUpload); }"
			>
				<i class="fa fa-download"></i>
				{{ f.fileName }}
			</span>
			&nbsp;
			&nbsp;
			&nbsp;
			<btn
				text="حذف"
				type="white text-danger"
				imgSize="30"
				textClass="p-0"
				@clickMe="rmv(i)"
			/>
		</div>
	</div>
</template>

	<script>
		import btn from  "../../UI/button/btn.vue";
		export default {
			name: 'previewImage',
			data(){
				return {
					inputCheck: true,
				}
			},
			components: {
				btn,
			},
			props: {
				label: {
					type: String,
					default: "label",
				},
				value: {
					type: String,
					default: "",
				},
				files:{
					default: []
				},
				inputFile: {
					default: []
				},
				error: {
					default: true
				},
				error_text: {
					type: String,
					default: ""
				}
			},
			mounted(){

			},
			methods:{
				rmv(index){
					this.files.splice(index, 1);
					this.$emit('removeFile', this.files);
				},
				//____________________________________________________________________
				rtr(fileUpload){
					window.open(this.$localStorage.get('imgurl') + fileUpload);
				},
				//______________________________________________________________________
				onFileChange(e, THIS = this){
					this.$emit('chengeFile', e.target.files);
					this.inputCheck = false;
					setTimeout(()=>{
						THIS.inputCheck = true;
					}, 10);
				},
				//______________________________________________________________________
			}
		}
	</script>
<style>

</style>
