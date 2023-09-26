<template>
	<div class="w-100" style="padding-top: 1rem">
		<label class="mb-0" style="color:#b4bebf" v-if="label!=''">
			{{label}}
		</label>
		<div
			id="customInput"
			class="form-Control pointer"
			:class="textClass"
			style="background-color: #f5fafd; border: 1px solid #e5ebeb; color: #219580; border-radius:10px;"
			@click="show = true"
		>
			{{ (value=='' || value==null)? label : value }}
		</div>
		<date-picker
			type="time"
			:show="show"
			:input-format="inputFormat"
			:format='format'
			:autofocus="autofocus"
			custom-input="#customInput"
			color="#219380"
			inputClass="d-none"
			spanClass="d-none"
			v-model="value"
			@close="show=false"
			@input="inputTxt($event)"
		/>
	</div>
</template>
<script>
	export default {
		name: 'yearInput',
		data(){
			return {
				show: false,
				baseurl: this.$localStorage.get('baseurl'),

			}
		},
		components: {
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
			placeholder: {
				type: String,
				default: "",
			},
			textClass: {
				type: String,
				default: "",
			},
			inputFormat: {
				type: String,
				default: "HH:mm",
			},
			format: {
				type: String,
				default: "HH:mm",
			},
		},
		mounted(){
			this.placeholder = (this.placeholder!='') ? this.placeholder : this.label;
			if(this.min == ''){
				this.getToday();
			}
		},
		methods:{
			//________________________________________________________________________
			getToday(THIS = this){
				if(THIS.min == ''){
					if(THIS.$localStorage.get('date') == null){
						$.get(this.baseurl+'date', {}, function(D){
							THIS.min = D.data;
							THIS.$localStorage.set('date', D.data);
						});
					}else{
						this.min = THIS.$localStorage.get('date');
					}
				}
			},
			//________________________________________________________________________
			inputTxt(){
				this.$emit('input', this.value);
			}
			//________________________________________________________________________
		}
	}
</script>

<style scope>
.counter, .down-arrow-btn, .up-arrow-btn{
	text-align: center !important;
}
.vpd-time-m, .vpd-time-h{
	height: 50% !important;
}
</style>
