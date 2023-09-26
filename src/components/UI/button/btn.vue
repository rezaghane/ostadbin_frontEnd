<template>
	<div>
		<button
			:id="set_id_btn()"
			type="button"
			class="h-center btn rtl"
			:class="'btn-'+type +' '+textClass+' '+shadowClass"
			style="border-radius: 10px;"
			@click="clickMe($event)"
			@mousemove="$emit('mousemove')"
			@mouseleave="$emit('mouseleave')"
			v-if="disable=='0'"
		>
			{{ text }}
			<span v-html="html" class="yekan text-center"></span>
			<span v-if="img!=''" >&nbsp;</span>
			<img
				:width="imgSize"
				:height="(heightSize=='') ? imgSize : heightSize"
				:src="img"
				v-if="img!=''"
				:style="styleImg"
			/>
		</button>
		<button
			:id="set_id_btn()"
			type="button"
			class="h-center btn disabled noDrop"
			style="border-radius: 10px;"
			:class="'btn-' + type + ' '+ textClass + ' ' +btnClass"
			@click="disableLink()"
			v-else
		>
			{{text}}
		</button>
	</div>
</template>

	<script>
		export default {
			name: 'btnWhite',
			data(){return {
				shadowClass: '',
			}},
			components: {},
			props: {
				id_btn: {
					type: String,
					default: "",
				},
  			text: {
					type: String,
					default: "متن",
					required: true,
				},
  			html: {
					type: String,
					default: "",
				},
  			textClass: {
					type: String,
					default: "",
				},
  			shadow: {
					type: String,
					default: "1",
				},
  			btnClass: {
					type: String,
					default: "",
				},
  			type: {
					type: String,
					default: "success",
				},
  			img: {
					default: "",
				},
  			imgSize: {
					type: String,
					default: "15px",
				},
  			heightSize: {
					type: String,
					default: "auto",
				},
				disable: {
					type: String,
					default: '0',
				},
				disableText: {
					type: String,
					default: 'این بخش غیرفعال است',
				},
				styleImg: {
					type: String,
					default: '',
				},
				function: {
					type: String,
					default: 'clickMe',
				}
			},
			mounted(){
				this.shadowClass = (this.shadow=="1") ? "shadow-hover": "";
			},
			methods:{
				set_id_btn(){
					var random = parseInt(Math.random()*1000000);
					var id_btn = (this.id_btn=="") ? ("btn_" + random) : this.id_btn;
					return( id_btn );
				},
				//--------------------------------------------------------
				clickMe(event){
					this.$emit(this.function);
				},
				//--------------------------------------------------------
				disableLink(){
					this.$swal.fire({
						position: 'center',
						type: 'error',
						title: this.disableText,
						showCloseButton: true,
						showCancelButton: false,
						showConfirmButton: false,
						timer: 2000,
					})
				}
			}
		}
	</script>
<style>
.text-success {
    color: #219380 !important;
}
</style>
