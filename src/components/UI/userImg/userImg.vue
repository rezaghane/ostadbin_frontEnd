<template>
	<div
		class="border-15 cropped"
		:class="imgClass"
		:style="style()"
		@click = "$emit('click')"
	>
	</div>
</template>

	<script>
		import Avatar from '../../assets/img/Avatar.jpg';
		export default {
			name: 'userImg',
			data(){
				return {
					shadowClass: '',
					img: {
							"Avatar": Avatar,
							"bg": '',
					},
				}
			},
			components: {
				Avatar,
			},
			props: {
				src: {
						default: null,
				},
				imgClass: {
						default: "",
				},
				imgSize: {
						default: "150px",
				},
				vStyle: {
						default: "",
				},
				vWidth: {
						default: " width:100%; ",
				},

			},
			mounted( THIS = this){
			},
			methods:{
				style(){
					return (this.vStyle + " " + this.vWidth + ' max-width:' + this.imgSize+'; height:' + this.imgSize + '; background-image:url(' + this.showImage() + '); ');
				},
				//______________________________________________________________________
				showImage(){
					var img;
					if(this.src == null || this.src == ''){
						img = this.img.Avatar;
					} else if(this.src.includes('data:image/')){
						img = this.src;
					}	else {
						img = this.$localStorage.get('imgurl')+this.src+"?v="+Math.random();
					}
					return img;
				}
			}
		}
	</script>
<style>
.text-success {
    color: #219380 !important;
}
</style>
