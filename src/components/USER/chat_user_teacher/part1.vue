<template>
	<div class="w-100">
		<back title="گفتگو" />
		<div class="w-100 border-15 shadow bg-white p-3">
			<chat
			:sender="($localStorage.get('user').username.role==1) ? 'U' : 'T'"
			:reciver="($localStorage.get('user').username.role==1) ? 'T' : 'U'"
			:flds = "flds"
			/>
			<div class="w-100 h-center border-15 p-3 overflow-hidden">
				<textInput
					class="pt-0 pl-3"
					label=""
					:val="val"
					@inputTxtFunc = "msgFnc"
					placeholder="پیام خود را بنویسید...."
					@enter="sav()"
					autofocus="true"
				/>
				<img
					width="35"
					class="float-left pointer shadow-hover"
					:src="img.Arrow"
					@click="sav()"
				/>
			</div>
		</div>
	</div>
</template>

	<script>
		import back from  "../../UI/back/back.vue";
		import btn from  "../../UI/button/btn.vue";
		import textInput from  "../../UI/input/textInput.vue";
		import chat from  "../../UI/chat/chat.vue";
		import userImg from  "../../UI/userImg/userImg.vue";
		import Arrow from  "../../assets/img/Arrow_Box_Left_Green.svg";

		export default {
			name: 'teachers_part1',
			data(){
				return {
					img:{
						Arrow: Arrow
					},
					text: '',
					val: '',
				}
			},
			components: {
				btn,
				chat,
				back,
				userImg,
				Arrow,
				textInput,
			},
			props: {
				flds: {
					default: [],
				},
			},
			mounted(){
		this.$swal.close();

			},
			methods:{
				msgFnc(e){
					this.text = e;
				},
				sav(){
					if(this.text!=''){
						this.$emit("clickMe", this.text);
						this.val = "";
						this.text = "";
					}
				}
			}
		}
	</script>
<style>

</style>
