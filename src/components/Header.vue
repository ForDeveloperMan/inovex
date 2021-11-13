<template>
	<div class="block-header" v-if="showMain" v-bind:class="[{open: openMenu},{close: closeMenu}]">
		<div class="block-header__content">
			<router-link :to="{name: 'home'+'-'+this.$route.meta.language}">
				<img :src="info.logo" alt="" class="block-header__logo">
			</router-link>
			<div class="block-header__right">
				<div class="btn-burger" @click="openMenuFunc" v-bind:class="[{open: openMenu},{close: closeMenu}]">
					<div class="btn-burger__el"></div>
					<div class="btn-burger__el"></div>
					<div class="btn-burger__el"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="block-header__menu menu-dropdown" v-bind:class="[{open: openMenu},{close: closeMenu}]">
		<div class="menu-dropdown__content">
			<ul class="menu-dropdown__links links-menu">
				<li class="links-menu__el"><router-link :to="{name: 'services'+'-'+this.$route.meta.language}" class="links-menu__link">Services</router-link></li>
				<li class="links-menu__el"><a href="#" class="links-menu__link">Clients</a></li>
				<li class="links-menu__el"><a href="#" class="links-menu__link">About us</a></li>
				<li class="links-menu__el"><a href="#" class="links-menu__link">Contact</a></li>
			</ul>
			<div class="menu-dropdown__bottom">
				<div class="menu-dropdown__bottom-left">
					<div class="block-languages">
						<a href="#" class="block-languages__el">UA</a>
						<a href="#" class="block-languages__el active">EN</a>
						<a href="#" class="block-languages__el">RU</a>
					</div>
				</div>
				<div class="menu-dropdown__bottom-right">
					<div class="block-socials">
						<a href="#" target="_blank" class="block-socials__el">FACEBOOK</a>
						<a href="#" target="_blank" class="block-socials__el">LINKEDIN</a>
						<a href="#" target="_blank" class="block-socials__el">TELEGRAM</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'

export default {
	name: 'Header',
	data(){
		return{
			showMain: false,
			info: Object,
			openMenu: false,
			closeMenu: false,
		};
	},
	created(){
		this.getInfo();
	},
	mounted() {
	},
	methods: {
		openMenuFunc() {
			if ( !this.openMenu ) {
				this.openMenu = true;
			}else{
				this.openMenu = false;
				this.closeMenu = true;
				setTimeout(()=>this.closeMenu = false, 1000);
			}
		},
		getInfo() {
			axios.get('http://inovex.com/wp-json/vue/v1/header', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.info = response.data.info;
				this.showMain = true;
			});
		},
	},
}

</script>