<template>
	<div class="w-100">
		<div
			v-for="(f, i) in flds.content"
			:key="i"
			class="w-100 p-3 overflow-hidden shadow border-15 border mb-3"
			:class = "(f.status==1) ? ' bg-white ' : ' bg-brand-light '"


			:data-toggle="(f.status==1) ? '' : 'tooltip'"
			data-placement="right"
			:title="(f.status==1) ? f.fullname : 'تایید نشده است'"
		>
			<div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 float-right text-center m-auto">
				<userImg
					:src="f.img"
					imgSize="110"
					:class ="(windowWidth > 770) ? '' : ' m-auto '"
				/>
			</div>
			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 float-right">
				<div class="">
					<p class="bMikhak mt-1">
						{{f.fullname}}
					</p>
					<div 
						dir="ltr" 
						class="bMikhak text-success mt-1"
						:title="f.province+'، '+f.county"
						:alt="f.province+'، '+f.county"
					>
						{{f.province}}، {{f.county}}
						&nbsp
						<img 
							:src="require('../../../assets/img/Location.svg')"
						/>
					</div>
					<div dir="ltr" class="bMikhak mt-1">
						{{f.field}} _ {{f.degrees}}
					</div>
					<div class="text-truncate mt-3">
						<span v-for="(c, j) in flds.content[i].cats" :key="j">
							{{c.name}}
							<span v-if="j != (flds.content[i].cats.length-1)">
								،
							</span>
						</span>
					</div>
				</div>
			</div>
			<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 float-right">
				<div class="bMikhak text-orange mt-3 text-left">
					&nbsp
				</div>
				<router-link :to="'/teachers/'+f.id" v-if="chechRole()">
					<btn type="orange" class="float-left mt-4" text="مشاهده" />
				</router-link>
				<router-link :to="'/signupUser/'+f.id" v-if="!chechRole()">
					<btn type="orange" class="float-left mt-4" text="ویرایش" />
				</router-link>
				<router-link :to="'/reserved/user/list/'+f.id" v-if="!chechRole()">
					<btn type="outline-success" class="ml-1 float-left mt-4" text="درخواست ها" />
				</router-link>
			</div>
		</div>
		<div class="w-100" style="display: flex; align-items: center; justify-content: center;">
		<pageNavigation :page="flds.curPage" :pages="flds.totalPages" @setPage="setPage"  />
	</div>
	</div>
</template>

	<script>
		import btn from  "../../../UI/button/btn.vue";
		import userImg from  "../../../UI/userImg/userImg.vue";
		import pageNavigation from  "../../../UI/pageNavigation/pageNavigation.vue";
		export default {
			name: 'teachers_part1',
			data(){
				return {

				}
			},
			components: {
				btn,
				pageNavigation,
				userImg,
			},
			props: {
				flds: {
					type: Object,
					default: null,
				},
			},
			mounted(){
				$('[data-toggle="tooltip"]').tooltip();
			},
			methods:{
				chechRole(){
					let user = this.$localStorage.get('user');
					if(user == null){
						return true;
					}else if(user.username.role != 3){
						return true;
					}else{
						return false;
					}
				},
				// *********************************************************************
				search(e){
					this.$emit('filterPage', e.target.value);
				},
				setPage(page){
					this.$emit('setPage', page);
				}
			}
		}
	</script>
<style>

</style>
