<template>
	<div class="w-100 h-center">
		<date-picker
			v-model="date"
			color="#219380"
			:show="false"
			format='jYYYY/jMM/jDD'
			display-format="jYYYY/jM/jD"
			:min="min"
			:disable="checkDate"
			locale="fa"
			:highlight="highlight"
			element="my-custom-input"
			placeholder="انتخاب روز"
			inline
			auto-submit
			range
			@input = "clickMe($event)"
		/>
	</div>
</template>
<script>
	export default {
		name: 'calendar',
		data(){
			return {
				date: ""
			}
		},
		components: {

		},
		props: {
			dates: {},
			min: {
				type: String,
				default: "",
			},
		},
		mounted(){

		},
		methods:{
			clickMe(e){
				this.$emit("clickMe", e);
			},
			highlight(formatted) {
				let attributes = [];
				attributes['class'] = (this.dates.includes(formatted)) ? 'highlighted' : '';
				return attributes;
			},
			checkDate(formatted) {
				return (!this.dates.includes(formatted));
			},
		}
	}
</script>
<style>
	.highlighted {
		background-color: #fc9e00;
		border-radius: 50%;
	}
	.vpd-day-text{
		font-family: 'yekan';
	}
</style>
