<template>
	<nav class="float-left rtl">
		<ul class="pagination" v-if="(10+page)<=pages">
			<li class="page-item pointer" :class="{'disabled': page==1}">
				<a style="padding: 10px !important;" class="page-link" aria-label="Previous" @click="setPage(parseInt(page)-1);">
					<span aria-hidden="true">
						<i class="fa fa-angle-right"></i>
					</span>
				</a>
			</li>
			<li class="page-item pointer" :class="{'active ': j==page}" v-for="(j) in (10+page)" :key="j">
				<a style="padding: 0 10px !important; height: 45px; display: flex;align-items: center;" class="page-link yekan" :class="{'bg-dark': j==page}" @click="setPage(j)">{{j}}</a>
			</li>
			<li class="pr-3 pl-3 page-item pointer" style="display: flex; align-items: center;" v-if="(10+page)<=pages">
				...
			</li>
			<li class="page-item pointer" :class="{'disabled': page==pages}">
				<a style="padding: 10px !important;" class="page-link" aria-label="Next" @click="setPage(parseInt(page)+1);">
					<span aria-hidden="true">
						<i class="fa fa-angle-left"></i>
					</span>
				</a>
			</li>
		</ul>
		<ul class="pagination" v-else>
			<li class="page-item pointer" :class="{'disabled': page==1}">
				<a style="padding: 10px !important;" class="page-link" aria-label="Previous" @click="setPage(parseInt(page)-1);">
					<span aria-hidden="true">
						<i class="fa fa-angle-right"></i>
					</span>
				</a>
			</li>
			<li class="page-item pointer" :class="{'active ': j==page}" v-for="(j) in pages" :key="j">
				<a style="padding: 0 10px !important; height: 45px; display: flex;align-items: center;" class="page-link yekan" :class="{'bg-dark': j==page}" @click="setPage(j)">{{j}}</a>
			</li>
			<li class="page-item pointer" :class="{'disabled': page==pages}">
				<a style="padding: 10px !important;" class="page-link" aria-label="Next" @click="setPage(parseInt(page)+1);">
					<span aria-hidden="true">
						<i class="fa fa-angle-left"></i>
					</span>
				</a>
			</li>
		</ul>
	</nav>
</template>

<script>
	export default {
		name: 'PageNavigation',
		data(){
			return {
			}
		},
		props: ['pages', 'page'],
		methods:{
			setPage: function(j){
				this.$emit('setPage', j);
			}
		},
		mounted(){
		},
	}
</script>

<style scope>
</style>
