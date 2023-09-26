<template>
	<div>
		<titleList :flds="flds.cats" v-if="flds.cats.length>0" title="موضوع تدریس:"  />
		<titleList :flds="flds.degs" v-if="flds.degs.length>0" title="دسته بندی:"  />
		<titleList :flds="flds.fild" v-if="flds.fild.length>0" title="رشته های تحصیلی:"  />
		<div class="w-100 overflow-hidden"  v-if="flds.about_me!=null">
			<div class="col-12 pb-3">
				<div class="w-100 border-15 bg-white p-3 shadow overflow-hidden">
					<p class="bMikhak">
						درباره من:
					</p>
					<p class="text-justify">
					{{flds.about_me}}
					</p>
				</div>
			</div>
		</div>
		<div class="w-100 overflow-hidden"  v-if="flds.files.length!=0">
			<div class="col-12 pb-3">
				<div class="w-100 border-15 bg-white p-3 shadow overflow-hidden">
					<p class="bMikhak">
						مدارک و افتخارات:
					</p>
					<div
						class="col-12 col-lg-6  col-md-6 col-sm-12 mb-3 float-right"
						v-for="(f, i) in flds.files"
						:key="i"
					>
					<iframe
					style="width: 100%; height: 250px;"
					:src="$localStorage.get('imgurl') + f.fileUpload"
					v-if="f.fileUpload.split('.')[f.fileUpload.split('.').length - 1] == 'pdf'"
					></iframe>
						<userImg
							imgClass="pointer"
							:src="f.fileUpload"
							vWidth="100%"
							imgSize="250px"
							@click="shw(f.fileUpload)"
							v-else
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="w-100 overflow-hidden"  v-if="flds.address!=null && flds.phone!=null && flds.email!=null">
			<div class="col-12 pb-3">
				<div class="w-100 border-15 bg-white p-3 shadow overflow-hidden">
					<p class="bMikhak" v-if="flds.address!=null">
						آدرس محل تدریس حضوری:
					</p>
					<p v-if="flds.address!=null">
					{{flds.address}}
					</p>
					<p class="bMikhak w-50 float-right" v-if="flds.phone!=null">
						شماره تماس:
					</p>
					<p class="bMikhak w-50 float-right" v-if="flds.email!=null">
						ایمیل:
					</p>
					<p class="w-50 float-right " v-if="flds.phone!=null">
						{{flds.public_phone}}
					</p>
					<p class="w-50 float-right" v-if="flds.email!=null">
						{{flds.email}}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import btn from  "../../../UI/button/btn.vue";
	import userImg from  "../../../UI/userImg/userImg.vue";
	import titleList from  "../../../UI/titleList/titleList.vue";
	import { showImg } from  "../../../assets/library/messege.js";
	export default {
		name: 'teachers_id_part1_1',
		data(){
			return {
				showImg : showImg,
				imgurl: this.$localStorage.get('imgurl'),
		   	baseurl: this.$localStorage.get('baseurl'),
				degrees: [],
				category: [],
				location: [],
				img:{

				}
			}
		},
		components: {
			showImg,
				btn,
				titleList,
				userImg,
		},
			props: ["flds",],
		mounted(){

		},
		methods:{
			shw(img){
				this.showImg(this, this.$localStorage.get('imgurl') + img);
			}
		}
	}
</script>
<style>

</style>
