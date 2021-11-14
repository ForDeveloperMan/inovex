<template>
<div class="sec-page sec-service">
	<Header></Header>
	<div class="sec-page__wrap sec-service__wrap" v-if="showMain">
		<div class="sec-service__content">
			<transition name="bounceDown" v-show="showAnim" style="animation-delay: 0.6s;">
				<h1 class="title title_dec title_main sec-service__title">{{ service.post_title }}</h1>
			</transition>
			<transition name="bounceDown" v-show="showAnim" style="animation-delay: 0.4s;">
				<p class="text-info sec-service__text">{{ service.text }}</p>
			</transition>
			<transition name="bounceDown" v-show="showAnim" style="animation-delay: 0.2s;">
				<div class="sec-service__links links-service" v-if="links">
					<router-link :to="{name: 'serviceMedia-'+this.$route.meta.language, params: {media: el.link.post_name}}" v-for="(el, ind) in links" v-bind:key="ind" class="links-service__el">{{ el.link.post_title }}</router-link>
				</div>
			</transition>
			<transition name="bounceDown">
				<div v-show="showAnim">
					<a href="#" class="btn sec-service__btn">CONTACT US</a>
				</div>
			</transition>
		</div>
	</div>
	<router-link @click="click" :to="{name: 'services'+'-'+this.$route.meta.language}" class="sec-page__back">back</router-link>
</div>
</template>
<script>
import axios from 'axios'
import Header from '@/components/Header.vue'

export default {
	name: 'Service',
	data(){
		return{
			showAnim: false,
			showMain: false,
			translateSlugs: Object,
			pageInfo: Object,
			service: Object,
			links: Array,
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
			axios.get('http://inovex.com/wp-json/vue/v1/service', {
				params:{
					lang: this.$route.meta.language,
					service: this.$route.params.service,
					media: this.$route.params.media,
				}
			}).then(response => {
				this.pageInfo = response.data.pageInfo;
				this.service = response.data.service;
				this.links = response.data.service.media;
				this.translateSlugs = response.data.service.languages_post;
				this.$store.commit('setTranslateSlugs', this.translateSlugs);
				this.$store.commit('loadedPageF', true);
				this.showMain = true;
				this.showPage();
			});
		},
	},
}

</script>