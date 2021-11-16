<template>
<div class="sec-page sec-whoweare">
	<Header></Header>
	<div class="sec-page__wrap sec-whoweare__wrap" v-if="showMain">
		<div class="sec-whoweare__top center">
			<h1 class="title title_sec ttu title_dec sec-whoweare__title">{{ pageInfo.title }}</h1>
			<p class="text-sec sec-whoweare__text" v-html="pageInfo.text"></p>
		</div>
		<div class="sec-whoweare__content">
			<div class="block-whoweare">
				<template v-for="(item, ind) in people" v-bind:key="ind">
					<div class="block-whoweare__el">
						<router-link :to="{name: 'Human-'+this.$route.meta.language, params: {human: item.post_name}}" class="whoweare-el">
							<div class="whoweare-el__img"><img v-if="item.img" :src="item.img" alt="" class="whoweare-el__img-img"></div>
							<div class="whoweare-el__body">
								<h3 class="whoweare-el__title">{{ item.post_title }}</h3>
								<p class="whoweare-el__text">{{ item.who }}</p>
							</div>
						</router-link>
					</div>
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
	name: 'Service',
	data(){
		return{
			showAnim: false,
			showMain: false,
			pageInfo: Object,
			people: Object,
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
			axios.get('http://inovex.com/wp-json/vue/v1/whoweare', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.pageInfo = response.data.pageInfo;
				this.people = response.data.people;
				this.$store.commit('loadedPageF', true);
				this.showMain = true;
				this.showPage();
			});
		},
	},
}

</script>