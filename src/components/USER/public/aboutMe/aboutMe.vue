<template>
	<div style="background-color:#fffcf7;" class="container">
		<headMenu />
		<div class="w-100 overflow-hidden p-3">
			<back class="col-lg-9 col-md-6 col-sm-12 col-xs-12 col-sm-push-3 float-right" title="درباره ما" />
			<div class="col-lg-9 col-md-6 col-sm-12 col-xs-12 float-left p-3 border-15 shadow bg-white text-center" v-if="index_text>=0">
				<img class="w-75" :src="img.Illustration" />
				<br/>
				<br/>
				<br/>
				<div class="w-75 m-auto mt-3">
					<img :src="img.Shape" />
					&nbsp;
					<span class="bMikhak text-success">
						{{this.$localStorage.get('settings')[index_text].title}}
						:
					</span>
				</div>
				<div class="w-75 text-justify m-auto mt-3">
					{{this.$localStorage.get('settings')[index_text].dsc}}
					<p>

						<span class="text-center p-3" style="font-size: 10px;" v-for="(f, i) in flds" :key="i">
							<router-link :to="{ path: '/teachers', query: {degrees: f.id}}" >
								<span>
									همه دروس {{f.name}}
								</span>
								</router-link >
								<router-link
									v-for="(c, j) in f.category"
									:key="j"
									:to="{ path: '/teachers', query: {category: c.id, degrees: f.id }}"
								>
									<span>
										{{c.name}} {{f.name}}
									</span>
									</router-link >
								</span>
							</p>
					<br/>
					<br/>
					<br/>
				</div>
			</div>
			<div class="col-lg-3 col-md-6 col-sm-12 col-xs-12 col-sm-push-9 float-left p-3">
				<leftMenuPublic />
			</div>
		</div>
		<footerPage />
	</div>
</template>

<script>
	import footerPage from  "../../../UI/footer/footer.vue";
	import back from  "../../../UI/back/back.vue";
	import btn from  "../../../UI/button/btn.vue";
	import headMenu from  "../../../menu/headMenu.vue";
	import Illustration from  "../../../assets/img/Illustration_Home_2.svg";
	import Shape from  "../../../assets/img/Shape_Title.svg";
	import leftMenuPublic from  "../../../menu/leftMenuPublic.vue";
	import { indexFinder } from  "../../../assets/library/filter.js";


	export default {
			name: 'teachers_id',
		data(){
			return {
				imgurl: this.$localStorage.get('imgurl'),
				baseurl: this.$localStorage.get('baseurl'),
				flds: [],
				degrees: [],
				category: [],
				location: [],
				indexFinder : indexFinder,
				img:{
					"Illustration": Illustration,
					"Shape": Shape,
				},
				index_text : -1
			}
		},
		components: {
				btn,
				back,
				headMenu,
				footerPage,
				Illustration,
				Shape,
				leftMenuPublic,
		},
			props: [],
		mounted(){
			this.$swal.close();
			this.loader();
			this.index_text = this.indexFinder(this.$localStorage.get('settings'), "14");
		},
		methods:{
			// *********************************************************************
			loader(THIS=this){
				$.get(this.baseurl+'degrees/hightlights', { }, function(D){
						THIS.flds = D.data;
				}, "json");
			}
				// *********************************************************************
		}
	}
</script>
<style>

</style>
