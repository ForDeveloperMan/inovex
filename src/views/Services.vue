<template>
<div class="sec-page sec-services">
	<Header></Header>
	<div class="sec-page__wrap sec-services__wrap" v-if="showMain">
		<div class="sec-services__top">
			<h1 class="title title_sec title_dec sec-services__title">{{ pageInfo.title }}</h1>
			<p class="text-sec sec-services__text">{{ pageInfo.text }}</p>
		</div>
		<div class="sec-services__content">
			<div class="block-services">
				<div class="block-services__el" v-for="(item,  ind) in services" v-bind:key="ind">
					<div class="services-el">
						<img :src="item.icon" alt="" class="services-el__icon">
						<div class="services-el__text">{{ item.post_title }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import axios from 'axios'
import Header from '@/components/Header.vue'

export default {
	name: 'Services',
	data(){
		return{
			showAnim: false,
			showMain: false,
			pageInfo: Object,
			services: Object,
		};
	},
	components: {
		Header
	},
	watch:{
	},
	created(){
		this.getInfo();
	},
	mounted() {
	},
	methods: {
		showPage() {
			setTimeout(()=>this.showAnim = true, 100);
		},
		getInfo() {
			axios.get('http://inovex.com/wp-json/vue/v1/services', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.pageInfo = response.data.pageInfo;
				this.services = response.data.services;
				this.showMain = true;
				this.showPage();
			});
		},
	},
}

</script>