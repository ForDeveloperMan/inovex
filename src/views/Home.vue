<template>
<div class="sec-home">
	<Header></Header>
	<div class="sec-home__wrap">
		<div class="sec-home__content" v-if="showMain">
			<transition name="bounceUp" v-show="showAnim">
				<img :src="home.logo" alt="" class="sec-home__logo">
			</transition>
		</div>
	</div>
</div>
</template>
<script>
import axios from 'axios'
import Header from '@/components/Header.vue'

export default {
	name: 'Home',
	data(){
		return{
			showAnim: false,
			showMain: false,
			home: Array,
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
		this.$nextTick(function () {
			this.$store.commit('isHomeF', true);
		});
	},
	methods: {
		showPage() {
			setTimeout(()=>this.showAnim = true, 1600);
		},
		getInfo() {
			axios.get('https://inovex.qazxswedc.site/wp-json/vue/v1/home', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.home = response.data.home;
				this.showMain = true;
				this.$store.commit('loadedPageF', true);
				this.showPage();
			});
		},
	},
}

</script>