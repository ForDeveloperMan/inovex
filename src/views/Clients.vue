<template>
<div class="overflow-y">	
<div class="sec-clients">
	<Header></Header>
	<div class="sec-clients__wrap" v-if="showMain">
		<div class="sec-clients__top">
			<h1 class="title title_main title_dec title_dec-left sec-clients__title">{{ pageInfo.title }}</h1>
		</div>
		<div class="sec-clients__content">
			<div class="block-clients">
				<template v-for="(client, ind) in clients" v-bind:key="client">
					<transition name="fade" v-show="showAnim">
						<div class="block-clients__el" :style="'animation-delay:'+ ( 0.2+ind * 0.1 + 0.1 ) +'s'">
							<div class="clients-el"><img :src="client" alt="" class="clients-el__img"></div>
						</div>
					</transition>
				</template>
			</div>
			<div class="center">
				<a href="#" class="btn sec-clients__btn">CONTACT US</a>
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
	name: 'Clients',
	data(){
		return{
			showAnim: false,
			showMain: false,
			pageInfo: Object,
			clients: Object,
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
			axios.get('http://inovex.com/wp-json/vue/v1/clients', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.pageInfo = response.data.pageInfo;
				this.clients = response.data.clients;
				this.$store.commit('loadedPageF', true);
				this.showMain = true;
				this.showPage();
			});
		},
	},
}

</script>