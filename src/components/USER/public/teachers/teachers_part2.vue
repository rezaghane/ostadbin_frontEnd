<template>
	<div>
		<leftList
			:selectItem="flds.kndClass"
			:flds="knd_class"
			titleList="نوع آموزش"
			function="setKndClass"
			@setKndClass="setKndClass"
		/>
		<!-- <leftList
			:selectItem="flds.cat"
			:flds="category"
			titleList="دسته بندی ها"
			function="setCategory"
			@setCategory="setCategory"
		/> -->
		<leftList
			:selectItem="flds.deg"
			:flds="degrees"
			titleList="دسته بندی ها"
			children="category"
			function="setDegrees"
			@setDegrees="setDegrees"
		/>
		<leftList
			:selectItem="flds.fldT"
			:flds="field"
			titleList="رشته تحصیلی"
			function="setField"
			@setField="setField"
		/>
		<leftList
			:flds="location"
			:selectItem="flds.loc"
			titleList="شهر"
			allFld="همه شهرها"
			function="setLocation"
			@setLocation="setLocation"
		/>
		<leftList
			:flds="sex"
			:selectItem="flds.sex"
			titleList="جنسیت"
			allFld="فرقی نمی کند"
			function="setSex"
			@setSex="setSex"
		/>
	</div>
</template>

	<script>
		import btn from  "../../../UI/button/btn.vue";
		import leftList from  "../../../UI/leftList/leftList.vue";
		export default {
			name: 'teachers_part2',
			data(){
				return {

				}
			},
			components: {
				btn,
				leftList,
			},
			props: ["flds", "category", "degrees", "location", "knd_class", "field", "sex"],
			mounted(){

			},
			methods:{
				setCategory(func, id){
					this.$emit(func, id);
				},
				setDegrees(func, id){
					let deg = id.split("_");
					this.$emit('setDegrees', deg[0]);
					if(deg.length > 1) this.$emit('setCategory', deg[1]);
				},
				setLocation(func, id){
					this.$emit(func, id);
				},
				setKndClass(func, id){
					this.$emit(func, id);
				},
				setField(func, id){
					this.$emit(func, id);
				},
				setSex(func, id){
					this.$emit(func, id);
				},
			}
		}
	</script>
<style>

</style>
