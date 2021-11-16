<template>
<div class="sec-page sec-human">
	<Header></Header>
	<div class="sec-page__wrap sec-human__wrap" v-if="showMain">
		<div class="sec-human__top center">
			<h1 class="title title_main ttu sec-human__title">{{ human.post_title }}</h1>
			<p class="sec-human__who">{{ human.who }}</p>
		</div>
		<div class="sec-human__content">
			<div class="block-human">
				<div class="block-human__img">
					<img v-if="human.foto" :src="human.foto" alt="" class="block-human__img-img">
				</div>
				<div class="block-human__right">
					<div class="block-human__text" v-html="human.tekst"></div>
					<a href="#" class="btn sec-human__btn">CONTACT US</a>
				</div>
			</div>
		</div>
	</div>
	<router-link :to="{name: 'WhoWeAre'+'-'+this.$route.meta.language}" class="sec-page__back">back</router-link>
</div>
</template>
<script>
import axios from 'axios'
import Header from '@/components/Header.vue'

export default {
	name: 'Human',
	data(){
		return{
			showAnim: false,
			showMain: false,
			translateSlugs: Object,
			pageInfo: Object,
			human: Object,
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
			axios.get('http://inovex.com/wp-json/vue/v1/people', {
				params:{
					lang: this.$route.meta.language,
					human: this.$route.params.human,
				}
			}).then(response => {
				this.pageInfo = response.data.pageInfo;
				this.human = response.data.human;
				this.translateSlugs = response.data.human.languages_post;
				this.$store.commit('setTranslateSlugs', this.translateSlugs);
				this.$store.commit('loadedPageF', true);
				this.showMain = true;
				this.showPage();
			});
		},
	},
}

</script>