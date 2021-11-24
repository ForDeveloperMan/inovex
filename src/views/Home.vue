<template>
<div class="sec-home">
	<Header></Header>
	<div class="sec-home__wrap" @click="openMenu" @wheel="wheel">
		<div class="sec-home__content" v-if="showMain">
			<transition name="fadeUp" v-show="showAnim">
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
			fixWheel: 0,
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
		wheel() {
			// if ( this.fixWheel === 0 ) {
			// }
			// this.fixWheel++;
			this.openMenu();
		},
		openMenu(val) {
			this.$store.dispatch('openMenu');
		},
		showPage() {
			setTimeout(()=>this.showAnim = true, 1600);
		},
		getInfo() {
			axios.get('https://www.innovex.pro/wp-json/vue/v1/home', {
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