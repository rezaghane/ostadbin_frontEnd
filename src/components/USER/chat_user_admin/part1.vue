<template>
	<div class="w-100">
		<back
			title="تماس با پشتیبان"
			:showBtn="($localStorage.get('user').username.role!=3) ? 'false' : 'true'"
		/>
		<div class="w-100 border-15 shadow bg-white p-3">
			<chat
				reciver="A"
				:sender="setSender()"
				:flds = "flds"
			/>
			<div class="w-100 h-center border-15 p-3 overflow-hidden">
				<textInput
					class="pt-0 pl-3"
					label=""
					:val="val"
					@inputTxtFunc = "msgFnc"
					placeholder="پیام خود را بنویسید...."
					autofocus="true"
					@enter="sav()"
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

			},
			methods:{
				setSender(){
					let sender;
					if(this.$localStorage.get('user').username.role==1){
						sender = 'U';
					}else if(this.$localStorage.get('user').username.role==2){
						sender = 'T';
					}else if(this.$localStorage.get('user').username.role==3){
						sender = 'A';
					}
					return sender;
				},
				//______________________________________________________________________
				msgFnc(e){
					this.text = e;
				},
				//______________________________________________________________________
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
