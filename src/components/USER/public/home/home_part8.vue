<template>
	<div>
		<div data-aos="fade-down" data-aos-duration="3000" class="text-up aos-init aos-animate" style="position: absolute; right: 0px;">
			<img 
			width="100px" 
			:src="require('../../../assets/img/Home_Shape_2.svg')"
			data-aos="flip-right" data-aos-easing="ease-out-cubic" data-aos-duration="2000" class="aos-init aos-animate"
			/>
		</div>
		<div data-aos="fade-up" data-aos-duration="3000" class="text-down aos-init aos-animate" style="position: absolute; left: 0px;">
			<img 
			width="100px" 
			:src="require('../../../assets/img/Home_Shape_3.svg')"
			data-aos="flip-up" data-aos-easing="ease-out-cubic" data-aos-duration="2000" class="aos-init aos-animate"
			/>
		</div>
		<div class=" overflow-auto">
			<h2 class="text-success pt-3 bMikhak text-center" data-aos="fade-up" data-aos-duration="3000">
				دسترسی سریع
			</h2>
			<table class="w-75 m-auto"  v-show="windowWidth > 1000">
				<tr>
					<td class="text-center p-3" style="font-size: 10px;" v-for="(f, i) in flds" :key="i">
						<p
							class="text-center text-orange bMikhak"
							style="font-size: 15px;"
						>
							{{f.name}}
						</p>
						<router-link :to="{ path: '/teachers', query: {degrees: f.id}}" >
							<p
								class="mb-1 text-center"
								style="font-size: 12px;"
							>
								همه دروس {{f.name}}
							</p>
							</router-link >
							<router-link
								v-for="(c, j) in f.category"
								:key="j"
								:to="{ path: '/teachers', query: {category: c.id, degrees: f.id }}"
							>
								<p
									class="mb-1 text-center"
									style="font-size: 12px;"
								>
									{{c.name}} {{f.name}}
								</p>
								</router-link >
							</td>
						</tr>
					</table>

					<div class="w-75 m-auto"  v-show="windowWidth <= 1000">
						<span class="text-center p-3" style="font-size: 10px;" v-for="(f, i) in flds" :key="i">
							<p
								class="text-center text-orange bMikhak"
								style="font-size: 15px;"
							>
							</p>
							<router-link :to="{ path: '/teachers', query: {degrees: f.id}}" >
								<p
									class="mb-1 text-center"
									style="font-size: 12px;"
								>
									همه دروس {{f.name}}
								</p>
								</router-link >
								<router-link
									v-for="(c, j) in f.category"
									:key="j"
									:to="{ path: '/teachers', query: {category: c.id, degrees: f.id }}"
								>
									<p
										class="mb-1 text-center"
										style="font-size: 12px;"
									>
										{{c.name}} {{f.name}}
									</p>
									</router-link >
								</span>
							</div>
						</div>
						<router-link to="/teachers">
							<btn textClass="m-auto" type="orange" text="مشاهده همه مدرس ها" />
						</router-link>
					</div>
				</template>

	<script>
		import btn from  "../../../UI/button/btn.vue";
		export default {
			name: 'p_home6',
			data(){
				return {}
			},
			components: {
				btn,
			},
			props: ["flds"],
			mounted(){

			},
			methods:{

			}
		}
	</script>
<style scope>
</style>
