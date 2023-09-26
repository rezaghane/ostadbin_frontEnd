<template>
	<div>
		<label class="w-100 pointer" style="display: flex; align-items: center;">
			<input
				:id="id"
				type="file"
				accept="image/*"
				@change="PreviewImage();"
				style="display:none"
			/>
			<userImg
				imgSize="50px"
				:src="img"
			/>
			<span class="text-orange">
				&nbsp;
				&nbsp;
				افزودن عکس
				<span v-if="error" class="text-danger">
					(عکس کاربر وارد نشده است)
				</span>
			</span>
		</label>
	</div>
</template>

	<script>
		import userImg from '../userImg/userImg.vue';

		export default {
			name: 'previewImage',
			data(){
				return {

				}
			},
			components: {
				userImg,
			},
			props: {
				id:{
					default: "uploadImg"
				},
				img: {
					default: ""
				},
				error: {
					default: true
				}
			},
			mounted(){

			},
			methods:{
				//______________________________________________________________________
				PreviewImage(THIS = this){
					this.$emit("chengeFile", document.getElementById(this.id).files);
					const reader = new FileReader();
					const file = document.querySelector('#'+this.id).files[0];
					if(file.type=="image/jpeg" || file.type=="image/png"){
						reader.addEventListener("load", function () {
							THIS.img = reader.result;
						}, false);
					}
					if (file) {
						reader.readAsDataURL(file);
					}
				},
				//______________________________________________________________________
				//______________________________________________________________________
			}
		}
	</script>
<style>

</style>
