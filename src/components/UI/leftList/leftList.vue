<template>
	<div class="w-100 pt-3 pb-3 pl-3">
		<div class=" border-15 p-3 bg-white shadow">
			<div
				class="alert alert-info border-15 text-center pointer m-0"
				@click="mod = !mod"
			>
				{{titleList}}
				<img
					:src="require('../../assets/img/Arrow_Down.svg')"
				/>
			</div>
			<div class="shadow-hover p-2 border-15" :class="{'text-success': selectItem==0}" @click="clickMe('0')" v-show="mod">
				{{allFld}}
			</div>
			<span v-for="(f, i) in flds" :key="i">
				<div
					class="shadow-hover p-2 border-15"
					:class="{'text-success': selectItem==f.id}"
					v-show="mod"
					:style="(children != '') ? 'background-image:url('+require('../../assets/img/Arrow_Left2.svg')+');' : ''"
					style="background-repeat: no-repeat; padding-left: 20px !important; background-position: 15px center;"
					@click="clickMe(f.id);  show = i;"
					@mousemove=""
				>
					{{f.name}}
				</div>
				<span v-if="children != '' " >
					<div
						v-for="(fc, j) in f.category"
						:key="j"
						class="shadow-hover p-2 border-15"
						@click="clickMe(f.id+'_'+fc.id)"
						style="padding-right: 15px !important;"
						v-show = "show == i && mod"
					>
						-  {{fc.name}}
					</div>
				</span>
			</span>
		</div>
	</div>
</template>

	<script>
		export default {
			name: 'leftList',
			data(){
				return {
					shadowClass: '',
					mod: false,
					show: -1,
				}
			},
			components: {},
			props: {
  			flds: {
					type: Object,
					default: null,
				},
  			function: {
					type: String,
					default: "clickMe",
				},
  			cat: {
					type: String,
					default: "0",
				},
  			children: {
					type: String,
					default: "",
				},
  			selectItem: {
					type: String,
					default: "0",
				},
  			allFld: {
					type: String,
					default: "همه دسته ها",
				},
  			titleList: {
					type: String,
					default: "متن",
				},
			},
			mounted(){

			},
			methods:{
				clickMe(id){
					this.$emit(this.function, this.function, id);
				},
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
