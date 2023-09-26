<template>
	<div style="width: 100%;">
		مقدار پیشرفت
		<b-progress
			:max="100"
			animated
			show-progress
		>
			<b-progress-bar
				:value="val1"
				variant="success"
			>
				<span class="text-center">
					{{val1}}
				</span>
			</b-progress-bar>
			<b-progress-bar
				:value="val2"
				variant="primary"
			>
				<span class="text-center">
					{{val2}}
				</span>
			</b-progress-bar>
			<b-progress-bar
				:value="val3"
				variant="warning"
			>
				<span class="text-center">
					{{val3}}
				</span>
			</b-progress-bar>
			<b-progress-bar
				:value="val4"
				variant="danger"
			>
				<span class="text-center">
					{{val4}}
				</span>
			</b-progress-bar>
		</b-progress>
	</div>
</template>

	<script>
		export default {
			name: 'self_part1_progress',
			data(){
				return {

				}
			},
			components: {

			},
			props: {
				val1: {
					type: String,
					default: "0",
				},
				val2: {
					type: String,
					default: "0",
				},
				val3: {
					type: String,
					default: "0",
				},
				val4: {
					type: String,
					default: "0",
				},
			},
			mounted(THIS = this){

			},
			methods:{

			}
		}
	</script>
<style>

</style>
