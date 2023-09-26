<template>
	<div class="overflow-hidden p-3" style="display: flex; align-items: center;">
		<btn
			type="white"
			class="float-right"
			textClass=""
			dir="ltr"
			:img="img.arrow"
			text=""
			imgSize="40"
			@clickMe="$router.go(-1)"
			v-if="showBtn=='true' || showBtn==true"
		/>
		&nbsp;
		<span class="bMikhak">
			{{title}}
		</span>
		<btn
			:type="leftBtnType"
			:text="leftBtnText"
			@clickMe="$emit('clickMe')"
			style="position: absolute; left: 15px;"
			v-if="leftBtn=='true' || leftBtn==true"
		/>
		<btn
			:text="leftBtn1Text"
			:type="leftBtn1Type"
			@clickMe="$emit('clickMe2')"
			style="position: absolute; left: 155px;"
			v-if="leftBtn1=='true' || leftBtn1==true"
		/>
	</div>
</template>

<script>
	import btn from  "../button/btn.vue";
	import arrow from  "../../assets/img/arrowRightCircle.svg";
	export default {
		name: 'PageNavigation',
		data(){
			return {
				img:{
					"arrow": arrow,
				}
			}
		},
		components: {
			btn,
			arrow,
		},
		props: {
			title:{
				type: String,
				default: "متن"
			},
			leftBtn:{
				type: String,
				default: "false"
			},
			leftBtnType:{
				type: String,
				default: "orange"
			},
			leftBtnText:{
				type: String,
				default: "متن"
			},
			leftBtn1:{
				type: String,
				default: "false"
			},
			leftBtn1Type:{
				type: String,
				default: "outline-success"
			},
			leftBtn1Text:{
				type: String,
				default: "متن"
			},
			showBtn:{
				type: String,
				default: "true"
			},
		},
		methods:{

		},
		mounted(){
		},
	}
</script>

<style scope>
</style>
