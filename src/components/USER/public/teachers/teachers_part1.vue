<template>
	<div class="w-100">
		<div
			v-for="(f, i) in flds.content"
			:key="i"
			class="w-100 p-3 overflow-hidden shadow border-15 mb-3"
			:class = "(f.status==1) ? ' bg-white ' : ' bg-brand-light '"
		>
			<div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 float-right text-center p-0" @click="rtr(f.id)">
				<userImg
					:src="f.img"
					imgSize="110"
					:class ="(windowWidth > 770) ? '' : ' m-auto '"
					:data-toggle="(f.status==1) ? '' : 'tooltip'"
					data-placement="right"
					:title="(f.status==1) ? f.fullname : 'تایید نشده است'"
				/>
			</div>
			<div class="col-lg-7 col-md-7 col-sm-12 col-xs-12 float-right">
				<div class="">
					<p
						class="bMikhak"
						:class="(windowWidth<776) ? 'text-center mt-3' : ''"
						style="font-size:20px;"
						@click="rtr(f.id)"
					>
						{{f.fullname}}
					</p>
					<div
						dir="ltr"
						class="bMikhak text-success mt-3"
						:class="(windowWidth<776) ? 'text-center' : ''"
						:title="f.province+'، '+f.county"
						:alt="f.province+'، '+f.county"
					>
						{{f.province}}، {{f.county}}
						&nbsp
						<img 
							:src="require('../../../assets/img/Location.svg')"
						/>
					</div>
					<div class="text-truncate mt-3" :class="(windowWidth<776) ? 'text-center' : ''" >
						<span v-for="(c, j) in flds.content[i].cats" :key="j">
							{{c.name}}
							<span v-if="j != (flds.content[i].cats.length-1)">
								،
							</span>
						</span>
					</div>
				</div>
			</div>
			<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 float-right">
				<div 
					class="text-orange text-left" 
					:class="(windowWidth<776) ? 'text-center mt-3' : ''" 
					:title="f.grade"
				>
					{{f.grade}}
					&nbsp
					<img 
						:src="require('../../../assets/img/star.svg')"
					/>
				</div>
				<router-link :to="'/teachers/'+f.id" v-if="chechRole()">
					<btn :class="(windowWidth < 767) ? 'w-100' : '' " :textClass="(windowWidth < 767) ? 'w-100' : '' " type="orange" class="float-left mt-4" text="مشاهده" />
				</router-link>
				<router-link :to="'/signupTeacher/'+f.id" v-if="!chechRole()">
					<btn :class="(windowWidth < 767) ? 'w-100' : '' " :textClass="(windowWidth < 767) ? 'w-100' : '' " type="orange" class="float-left mt-4" text="ویرایش" />
				</router-link>
				<router-link :to="'/class/list/'+f.id" v-if="!chechRole()">
					<btn :class="(windowWidth < 767) ? 'w-100' : '' " :textClass="(windowWidth < 767) ? 'w-100' : '' " type="outline-success" class="ml-1 float-left mt-4" text="کلاس ها" />
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
				rtr(id){
					if(this.chechRole()){
						this.$router.push('/teachers/'+id)
					}
				},
				// *********************************************************************
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
