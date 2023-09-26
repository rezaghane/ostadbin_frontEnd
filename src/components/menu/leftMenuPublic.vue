<template>
	<div class="w-100 text-center bg-white border-15 shadow p-3 overflow-auto">
		<br/>
		<img :src="require('../assets/img/Logo_Footer.svg')" style="width:50%;" />
		<br/>
		<br/>
		<table class="w-100">
			<tr v-if="index_0 != '-1'">
				<td class="text-success">
					<a
						:href="settings[index_0].href"
						class="text-success"
						style="font-size: medium !important; "
					>
						{{ settings[index_0].title }}:
					</a>
				</td>
				<td class="text-success yekan">
					<a
						:href="settings[index_0].href"
						class="text-success yekan"
						style="font-size: medium !important; "
					>
						{{ settings[index_0].dsc }}
					</a>
				</td>
			</tr>
			<!-- ---------------------------------------------------------- -->
			<tr v-if="index_1 != '-1'">
				<td class="text-success">
					<a
						:href="settings[index_1].href"
						class="text-success"
						style="font-size: medium !important; "
					>
						{{ settings[index_1].title }}:
					</a>
				</td>
				<td class="text-success yekan">
					<a
						:href="settings[index_1].href"
						class="text-success yekan"
						style="font-size: medium !important; "
					>
						{{ settings[index_1].dsc }}
					</a>
				</td>
			</tr>
			<!-- ---------------------------------------------------------- -->
			<tr v-if="index_2 != '-1'">
				<td class="text-success">
					<a
						:href="settings[index_2].href"
						class="text-success"
						style="font-size: medium !important; "
					>
						{{ settings[index_2].title }}:
					</a>
				</td>
				<td class="text-success yekan">
					<a
						:href="settings[index_2].href"
						class="text-success yekan"
						style="font-size: medium !important; "
					>
						{{ settings[index_2].dsc }}
					</a>
				</td>
			</tr>
			<!-- ---------------------------------------------------------- -->
			<tr v-if="index_3 != '-1'">
				<td class="text-success">
					<a
						:href="settings[index_3].href"
						class="text-success"
						style="font-size: medium !important; "
					>
						{{ settings[index_3].title }}:
					</a>
				</td>
				<td class="text-success yekan">
					<a
						:href="settings[index_3].href"
						class="text-success yekan"
						style="font-size: medium !important; "
					>
						{{ settings[index_3].dsc }}
					</a>
				</td>
			</tr>
			<!-- ---------------------------------------------------------- -->
			<tr v-if="index_4 != '-1'">
				<td class="text-success">
					<a
						:href="settings[index_4].href"
						class="text-success"
						style="font-size: medium !important; "
					>
						{{ settings[index_4].title }}:
					</a>
				</td>
				<td class="text-success yekan">
					<a
						:href="settings[index_4].href"
						class="text-success yekan"
						style="font-size: medium !important; "
					>
						{{ settings[index_4].dsc }}
					</a>
				</td>
			</tr>
			<!-- ---------------------------------------------------------- -->
			<tr v-if="index_5 != '-1'">
				<td class="text-success" colspan="2">
					<a
						:href="settings[index_5].href"
						class="text-success"
						style="font-size: medium !important; "
					>
						{{ settings[index_5].title }}:
					</a>
				</td>
			</tr>
			<tr v-if="index_5 != '-1'">
				<td class="text-success yekan " colspan="2">
					<a
						:href="settings[index_5].href"
						class="text-success yekan"
						style="font-size: medium !important; "
					>
						{{ settings[index_5].dsc }}
					</a>
				</td>
			</tr>
			<!-- ---------------------------------------------------------- -->
			<tr v-if="index_6 != '-1'">
				<td class="text-success">
					<a
						:href="settings[index_6].href"
						class="text-success"
						style="font-size: medium !important; "
					>
						{{ settings[index_6].title }}:
					</a>
				</td>
				<td class="text-success yekan">
					<a
						:href="settings[index_6].href"
						class="text-success yekan"
						style="font-size: medium !important; "
					>
						{{ settings[index_6].dsc }}
					</a>
				</td>
			</tr>
			<!-- ---------------------------------------------------------- -->
			<tr v-if="index_7 != '-1'">
				<td class="text-success">
					<a
						:href="settings[index_7].href"
						class="text-success"
						style="font-size: medium !important; "
					>
						{{ settings[index_7].title }}:
					</a>
				</td>
				<td class="text-success yekan">
					<a
						:href="settings[index_7].href"
						class="text-success yekan"
						style="font-size: medium !important; "
					>
						{{ settings[index_7].dsc }}
					</a>
				</td>
			</tr>
			<!-- ---------------------------------------------------------- -->
			<tr v-if="index_8 != '-1'">
				<td class="text-success">
					<a
						:href="settings[index_8].href"
						class="text-success"
						style="font-size: medium !important; "
					>
						{{ settings[index_8].title }}:
					</a>
				</td>
				<td class="text-success yekan">
					<a
						:href="settings[index_8].href"
						class="text-success yekan"
						style="font-size: medium !important; "
					>
						{{ settings[index_8].dsc }}
					</a>
				</td>
			</tr>
			<!-- ---------------------------------------------------------- -->
			<tr v-if="index_9 != '-1'">
				<td class="text-success">
					<a
						:href="settings[index_9].href"
						class="text-success"
						style="font-size: medium !important; "
					>
						{{ settings[index_9].title }}:
					</a>
				</td>
				<td class="text-success yekan">
					<a
						:href="settings[index_9].href"
						class="text-success yekan"
						style="font-size: medium !important; "
					>
						{{ settings[index_9].dsc }}
					</a>
				</td>
			</tr>
		</table>

		<p class="text-orange text-justify" v-if="urlPath != ''">
			استادبین با توجه به نیاز شما بهترین و مناسب ترین مدرس را به شما معرفی خواهد کرد.
		</p>
	</div>
</template>

	<script>
		import { indexFinder } from  "../assets/library/filter.js";
		export default {
			name: 'leftMenu',
			data(){
				return {
					indexFinder: indexFinder,
					index_0: -1,
					index_1: -1,
					index_2: -1,
					index_3: -1,
					index_4: -1,
					index_5: -1,
					index_6: -1,
					index_7: -1,
					index_8: -1,
					index_9: -1,
					settings: this.$localStorage.get('settings'),
				}
			},
			props: {
				urlPath:{
					default: ""
				},
			},
			components: {

			},
			mounted(){
				this.index_0 = this.indexFinder(this.settings, "1");
				this.index_1 = this.indexFinder(this.settings, "2");
				this.index_2 = this.indexFinder(this.settings, "4");
				this.index_3 = this.indexFinder(this.settings, "5");
				this.index_4 = this.indexFinder(this.settings, "6");
				this.index_5 = this.indexFinder(this.settings, "7");
				this.index_6 = this.indexFinder(this.settings, "8");
				this.index_7 = this.indexFinder(this.settings, "9");
				this.index_8 = this.indexFinder(this.settings, "10");
				this.index_9 = this.indexFinder(this.settings, "17");
			},
			methods:{

			}
		}
	</script>
<style>

</style>
