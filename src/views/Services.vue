<template>
<div class="sec-page sec-services">
	<Header></Header>
	<div class="sec-page__wrap sec-services__wrap" v-if="showMain">
		<div class="sec-services__top">
			<h1 class="title title_sec title_dec sec-services__title">{{ pageInfo.title }}</h1>
			<transition name="fadeUp" v-show="showAnim">
				<p class="text-sec sec-services__text">{{ pageInfo.text }}</p>
			</transition>
		</div>
		<div class="sec-services__content">
			<div class="block-services">
				<template v-for="(item,  ind) in services" v-bind:key="ind">
					<transition name="fade" v-show="showAnim">
						<div class="block-services__el" :style="'animation-delay:'+ ( 0.2+ind * 0.15 ) +'s'">
							<router-link :to="{name: 'service-'+this.$route.meta.language, params: {service: item.post_name}}" class="services-el">
								<img :src="item.icon" alt="" class="services-el__icon">
								<div class="services-el__text">{{ item.post_title }}</div>
							</router-link>
						</div>
					</transition>
				</template>
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
			setTimeout(()=>this.showAnim = true, 1100);
		},
		getInfo() {
			axios.get('https://inovex.qazxswedc.site/wp-json/vue/v1/services', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.pageInfo = response.data.pageInfo;
				this.services = response.data.services;
				this.showMain = true;
				this.$store.commit('loadedPageF', true);
				this.showPage();
			});
		},
	},
}

</script>