<template>
	<div class="w-100 overflow-hidden" style="padding-top: 1rem">
		<label class="mb-0" style="color: rgb(34 149 129); font-size: 15px; font-weight: bold;">
			<i
				:class="'fa fa-' + icon"
				v-if="icon != ''"
				color="#f6be67"
			></i>
			<span v-if="icon != ''">&nbsp;</span>
			{{label}}
		</label>
		<label class="pointer float-left text-success" v-show="value=='1'" @click="input">
			{{activeText}}
			<img height="20px" :src="img.onSwitch" />
		</label>
		<label class="pointer float-left text-orange" v-show="value!='1'"  @click="input">
			{{deactiveText}}
			<img height="20px" :src="img.offSwitch" />
		</label>
	</div>
</template>
<script>
	import onSwitch from  "../../assets/img/Switch.svg";
	import offSwitch from  "../../assets/img/Switch-2.svg";
	export default {
		name: 'switchInput',
		data(){
			return {
				img: {
						"onSwitch": onSwitch,
						"offSwitch": offSwitch,
				}
			}
		},
		components: {

		},
		props: {
			textClass: {
				type: String,
				default: "",
			},
			label: {
				type: String,
				default: "label",
			},
			value: {
				default: '1',
			},
			icon: {
				default: '',
			},
			activeText: {
				type: String,
				default: "فعال",
			},
			deactiveText: {
				type: String,
				default: "غیر فعال",
			},
		},
		mounted(){

		},
		methods:{
			input(){
				this.value = (this.value=='1') ? '0' : '1';
				this.$emit('input', this.value);
			}
		}
	}
</script>

<style scope>
</style>
