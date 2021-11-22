<template>
<div class="sec-page sec-about" v-bind:class="{notScroll: notScroll}">
	<Header></Header>
	<div class="sec-page__wrap sec-about__wrap" v-if="showMain">
		<div class="sec-about__content">
			<div class="sec-about__left">
				<transition name="fadeUp" v-show="showAnim">
					<h1 class="title title_main title_dec title_dec-left sec-about__title">{{ pageInfo.title }}</h1>
				</transition>
				<transition name="fadeUp" v-show="showAnim" style="animation-delay: 0.2s">
					<div class="sec-about__text text-info" v-html="about.text"></div>
				</transition>
			</div>
			<div class="sec-about__right block-descrp">
				<transition name="fadeUp" v-show="showAnim" style="animation-delay: 0.4s">
					<div class="block-descrp__title">{{ about.content.zagolovok }}</div>
				</transition>
				<div class="block-descrp__content">
					<template v-for="(item, ind) in about.content.elementy" v-bind:key="ind">
						<transition name="fadeUp" v-show="showAnim">
							<div class="block-descrp__el" :style="'animation-delay:'+ ( 0.6+ind * 0.1 + 0.1 ) +'s'">
								<div class="descrp-el">
									<div class="descrp-el__title">{{ item.zagolovok }}</div>
									<div class="descrp-el__text text-info">{{ item.tekst }}</div>
								</div>
							</div>
						</transition>
					</template>
				</div>
			</div>
		</div>
		<transition name="fadeUp" v-show="showAnim" style="animation-delay: 1.2s">
			<div class="center">
				<router-link :to="{name: 'WhoWeAre'+'-'+this.$route.meta.language}" class="btn sec-about__btn">{{ pageInfo.who }}</router-link>
			</div>
		</transition>
	</div>
</div>
</template>
<script>
import axios from 'axios'
import Header from '@/components/Header.vue'

export default {
	name: 'About',
	data(){
		return{
			showAnim: false,
			showMain: false,
			notScroll: true,
			translateSlugs: Object,
			pageInfo: Object,
			about: Object,
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
			setTimeout(()=>this.notScroll = false, 3000);
		},
		getInfo() {
			axios.get('https://inovex.qazxswedc.site/wp-json/vue/v1/about', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.pageInfo = response.data.pageInfo;
				this.about = response.data.about;
				this.$store.commit('loadedPageF', true);
				this.showMain = true;
				this.showPage();
			});
		},
	},
}

</script>