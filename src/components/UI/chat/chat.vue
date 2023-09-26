<template>
	<div id="chatList" class="w-100 border-15 bg-light-green p-3" style="height: 50vh; overflow-y: scroll;">
		<div
			class="w-100 mb-3"
			style="display: flex;
			align-items: flex-end;
			justify-content: flex-start;
			align-content: center;"
			v-for="(f, i) in fldsF()" :key="i"
			:dir="(f.sender==sender) ? 'rtl' : 'ltr'"
		>
			<span class="btn btn-white border-15 border text-right"
				style="border-radius: 15px 15px 0px !important;"
				v-if="f.sender==sender"
			>
				{{f.text}}
			</span>
			<span class="btn btn-success border-15 text-right"
				style="border-radius: 15px 15px 15px 0px !important;"
				v-else
			>
				{{f.text}}
			</span>
			<span class="yekan text-muted" style="font-size: 10px;">
				{{f.date}}
			</span>
		</div>
	</div>
</template>

	<script>
		export default {
			name: 'chat',
			data(){
				return {

				}
			},
			components: {},
			props: {
  			flds: {
					default: [],
				},
  			sender: {
					type: String,
					default: "T",
				},
  			reciver: {
					type: String,
					default: "U",
				},
			},
			mounted(){
				let THIS = this;
				setTimeout(function() {
					document.getElementById("chatList").scrollTo(0, THIS.flds.length*10);
				}, 200);
				// document.getElementById("chatList").scrollTo(0, 100000000);
			},
			methods:{
				fldsF(){
					return (this.flds.length==0) ? [{text: 'سلام',date: "الان", sender: this.sender}] : this.flds;
					// return (this.flds.length==0) ? [{text: 'سلام',date: "الان", sender: this.sender}] : this.flds.slice().reverse();
				}
			}
		}
	</script>
<style>

</style>
