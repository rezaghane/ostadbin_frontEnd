<template>
	<div class="w-100">
		<div
			v-for="(f, i) in flds.content"
			:key="i"
			class="w-100 p-3 overflow-hidden shadow border-15 border mb-3 bg-white"
		>
			<div class="col-lg-2 col-md-3 col-3 float-right text-center p-0">
				<userImg
					:imgSize="(windowWidth < 570) ? windowWidth/6 : '120'"
					:src="f.img"
				/>
			</div>
			<div class="col-lg-6 col-md-6 col-9 float-right">
				<div class="">
					<p class="bMikhak">
						<span class="bMikhak" v-if="f.teachers_fullname != '' && f.teachers_fullname != null">
							{{f.teachers_fullname}}
						</span>
						<span class="bMikhak text-orange" v-else>
							(نامشخص)
						</span>
						&nbsp;
						<img
							:src="require('../../assets/img/Arrow_Left_Long.svg')"
							v-if="f.teachers_fullname2 != ''"
							v-show="windowWidth > 570"
						/>
						&nbsp;
						<span class="bMikhak" v-if="f.teachers_fullname2 != '' && f.teachers_fullname2 != null && f.teachers_fullname2 != ''">
							{{f.teachers_fullname2}}
						</span>
						<span class="bMikhak text-orange" v-else-if="f.teachers_fullname2 != ''">
							(نامشخص)
						</span>
					</p>
					<div class="bMikhak text-success" :class="(windowWidth < 767) ? '' : 'mt-4' " >
						<i class="fa fa-chalkboard-teacher" v-if="f.knd_class_id==1"></i>
						<i class="fa fa-laptop" v-else-if="f.knd_class_id==2"></i>
						<i class="fa fa-home" v-else-if="f.knd_class_id==3"></i>
						&nbsp;
						<span v-if="f.date_class != '' && f.date_class != null">
							{{f.knd_class_name}}
						</span>
						<span v-else>
							پیشنهاد مدرس
						</span>
					</div>
					<span v-if="windowWidth >= 570">
						<div class="text-truncate yekan mt-3" v-if="f.date_class != '' && f.date_class != null">
							زمان جلسه:
							{{f.date_class}} - {{f.time_class.start}} تا {{f.time_class.end}}
						</div>
						<div class="text-truncate yekan mt-3" v-else>
							زمان جلسه:
							<span class="text-orange">
								(نامشخص)
							</span>
						</div>
					</span>
				</div>
			</div>
			<span class="text-white" style="font-size: 1px;">.</span>
			<div class="col-12" v-show="windowWidth < 570">
				<div class="text-truncate yekan mt-3" v-if="f.date_class != '' && f.date_class != null">
					زمان جلسه:
					{{f.date_class}} - {{f.time_class.start}} تا {{f.time_class.end}}
				</div>
				<div class="text-truncate yekan mt-3" v-else>
					زمان جلسه:
					<span class="text-orange">
						(نامشخص)
					</span>
				</div>
			</div>
			<div
				class="col-lg-4 col-md-3 col-sm-12 col-xs-12"
				:class="(windowWidth >= 767) ? 'float-right' : 'mt-3' "
			>
				<div
					class="bMikhak "
					:class="(windowWidth < 767) ? '' : 'text-left' "
				>
					<span style="font-size: 12px;">
						تاریخ خرید:
					</span>
					<br v-show="windowWidth >= 767" />
					<span class="text-success yekan"  v-if="(f.status_id != 1 && f.status_id != 5 && f.status_id != 6 )">
						{{f.date}}
						<br v-show="windowWidth >= 767" />
						{{f.time}}
					</span>
					<span class="text-danger yekan"  v-else>
						در انتظار پرداخت
					</span>
				</div>
				<router-link :to="'/reserved/user/'+f.id">
					<btn
						type="orange"
						class="float-left mt-3"
						text="مشاهده"
						:class="(windowWidth < 767) ? 'w-100' : '' "
						:textClass="(windowWidth < 767) ? 'w-100' : '' "
					/>
				</router-link>
			</div>

		</div>
		<div class="w-100" style="display: flex; align-items: center; justify-content: center;">
			<pageNavigation :page="flds.curPage" :pages="flds.totalPages" @setPage="setPage"  />
		</div>
	</div>
</template>

	<script>
		import btn from  "../../UI/button/btn.vue";
		import userImg from  "../../UI/userImg/userImg.vue";
		import pageNavigation from  "../../UI/pageNavigation/pageNavigation.vue";

		export default {
			name: 'teachers_part1',
			data(){
				return {
					img:{
					}
				}
			},
			components: {
				btn,
				pageNavigation,
				userImg,
			},
			props: {
				flds: {
					default: [],
				},
			},
			mounted(){

			},
			methods:{
				setPage(page){
					this.$emit('setPage', page);
				}
			}
		}
	</script>
<style>

</style>
