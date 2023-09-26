<template>
	<div data-aos="flip-up" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
		<div
			class="w-100 p-3 shadow shadow-hover bg-white border-15"
			:class="(disable == '0') ? 'bg-white' : 'bg-gray noDrop'"
			:style="( windowWidth < 600 ) ?
				'background-image:url('+img.ArrowLeftCircle+'); background-position: 15px 15px;  background-size: 35px;' :
				'background-image:url('+img.ArrowLeftCircle+'); background-position: 15px center;  background-size: 50px;' "
			style="background-repeat: no-repeat;"
			@click = "showMsg()"
		>
			<p class="bMikhak pr-3" style="font-size: 20px;">
				{{title}}
			</p>
			<p class="pr-3 pb-1" style="font-size: 15px;">
				{{text}}
			</p>
		</div>
	</div>
</template>

<script>
	import ArrowLeftCircle from "../../assets/img/Arrow_Left_Circle.svg";
	export default {
		name: 'btnLg',
		data(){
			return {
				img: {
					"ArrowLeftCircle": ArrowLeftCircle
				},
			}},
		components: {
			ArrowLeftCircle,
		},
		props: {
			title:{
				type: String,
				default: "title",
			},
			text:{
				type: String,
				default: "text",
			},
			disable: {
				type: String,
				default: '0',
			},
			disableText: {
				type: String,
				default: 'مدرس روز و ساعتی را فعال نکرده است',
			},
		},
		mounted(){

		},
		methods:{
			showMsg(){
				if(this.disable == '1'){
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
	}
</script>
<style>

</style>
