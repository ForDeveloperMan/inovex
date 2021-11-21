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
	<div class="block-header__menu menu-dropdown" v-if="showMain" v-bind:class="[{open: openMenu},{close: closeMenu}]">
		<div class="menu-dropdown__content">
			<ul class="menu-dropdown__links links-menu">
				<li class="links-menu__el"><router-link @click="click" :to="{name: 'services'+'-'+this.$route.meta.language}" class="links-menu__link">{{ info.menu['services'] }}</router-link></li>
				<li class="links-menu__el"><router-link @click="click" :to="{name: 'clients'+'-'+this.$route.meta.language}" class="links-menu__link">{{ info.menu.clients }}</router-link></li>
				<li class="links-menu__el"><router-link @click="click" :to="{name: 'about'+'-'+this.$route.meta.language}" class="links-menu__link">{{ info.menu.about }}</router-link></li>
				<li class="links-menu__el"><router-link @click="click" :to="{name: 'Contacts'+'-'+this.$route.meta.language}" class="links-menu__link">{{ info.menu.contact }}</router-link></li>
			</ul>
			<div class="menu-dropdown__bottom">
				<div class="menu-dropdown__bottom-left">
					<div class="block-languages">
						<router-link
							v-for="language in languages" 
							:to="languages_links[language['lang']]" 
							:key="language" 
							class="block-languages__el" v-bind:class="{active: language['active']}">
							{{ language['lang'] }}
						</router-link>
					</div>
				</div>
				<div class="menu-dropdown__bottom-right">
					<div class="block-socials">
						<a v-for="(el, ind) in info.socials" v-bind:key="ind" :href="el.ssylka" target="_blank" class="block-socials__el">{{ el.tekst }}</a>
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
			language: this.$route.meta.language,
			languages_links: Array,
			languages: Array,
		};
	},
	watch: {
		'$store.state.translateSlugs': function() {
			if ( this.$store.state.translateSlugs ) {
				this.getLanguages();
			}
		}
	},
	created(){
		this.getInfo();
	},
	mounted() {
		this.getLanguages();
	},
	methods: {
		getClass(e) {
		},
		getLanguages() {
			let languages_arr = [];
			for(var i=0; i<this.$route.meta.languages.length; i++){
				if ( this.$route.meta.languages[i] === this.language ) {
					languages_arr.push({
						'lang': this.$route.meta.languages[i],
						'active': true,
					});
				}else{
					languages_arr.push({
						'lang': this.$route.meta.languages[i],
						'active': false,
					});
				}
			}
			this.languages = languages_arr;

			// if posts
			if ( this.$store.state.translateSlugs ) {
				let languages_page = {};
				for( const [key, val] of Object.entries(this.$store.state.translateSlugs) ) {
					let url_page = this.$route.meta.translate_links[key].split(':')[0] + val;
					languages_page[key] = url_page;
				}
				this.languages_links = languages_page;
			}else{
				this.languages_links = this.$route.meta.translate_links;
			}
		},
		click() {
			this.openMenuFunc();
		},
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
			axios.get('https://inovex.qazxswedc.site/wp-json/vue/v1/header', {
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