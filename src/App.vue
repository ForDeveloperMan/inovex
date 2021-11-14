<template>
	<router-view :key="$route.name+$route.path" />
	<div class="loader">
		<svg class="loader__preload" width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.9 1V23.6C31.9 23.6 15.1 4.5 12.3 1H10.9V5L33.2 31.2H34.8V1H31.9Z" stroke="black" stroke-width="0.7087" stroke-miterlimit="10"/><path d="M10.8 31.2H13.6V24L10.8 20.8V31.2Z" stroke="black" stroke-width="0.7087" stroke-miterlimit="10"/><path d="M25.1 26.1L3.2 1H1V31.2H3.8V7.8C3.8 7.8 22.9 29.8 24 31.2H25.2L25.1 26.1Z" stroke="black" stroke-width="0.7087" stroke-miterlimit="10"/><path d="M25.2 1H22.4V7.5L25.2 10.7V1Z" stroke="black" stroke-width="0.7087" stroke-miterlimit="10"/></svg>
		<div class="loader__el"><span></span></div>
		<div class="loader__el"><span></span></div>
		<div class="loader__el"><span></span></div>
		<div class="loader__el"><span></span></div>
		<div class="loader__el"><span></span></div>
		<div class="loader__el"><span></span></div>
		<div class="loader__el"><span></span></div>
		<div class="loader__el"><span></span></div>
	</div>
	<transition name="slideUp">
		<div class="loader-first" v-show="showPreload">
			<svg class="loader-first__logo" width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.9 1V23.6C31.9 23.6 15.1 4.5 12.3 1H10.9V5L33.2 31.2H34.8V1H31.9Z" stroke="black" stroke-width="0.7087" sёtroke-miterlimit="10"/><path d="M10.8 31.2H13.6V24L10.8 20.8V31.2Z" stroke="black" stroke-width="0.7087" stroke-miterlimit="10"/><path d="M25.1 26.1L3.2 1H1V31.2H3.8V7.8C3.8 7.8 22.9 29.8 24 31.2H25.2L25.1 26.1Z" stroke="black" stroke-width="0.7087" stroke-miterlimit="10"/><path d="M25.2 1H22.4V7.5L25.2 10.7V1Z" stroke="black" stroke-width="0.7087" stroke-miterlimit="10"/></svg>
		</div>
	</transition>
</template>
<script>

export default {
	name: 'App',
	data() {
		return {
			showPreload: !this.$route.meta.preload,
		};
	},
	watch: {
		'$route'() {
			this.$store.commit('setTranslateSlugs', false);
			if ( this.$route.meta.preload ) {
				this.$store.commit('loadedPageF', false);
				this.preloadStart();
			}else{
				this.showPreload = true;
			}
		},
		'$store.state.loadedPage': function() {
			if ( this.$store.state.loadedPage ) {
				setTimeout(this.preloadClose, 1000);
				setTimeout(()=>this.showPreload=false, 1000);
			}
		}
	},
	methods: {
		preloadStart() {
			let preload = document.querySelector('.loader');
			let elements = document.getElementsByClassName('loader__el');
			preload.style.display = 'flex';
			for( var i=0; i<elements.length; i++ ){
				let el = elements[i];
				let widthSpan = 0;
				let interval = (i*50);
				let timeSpan;
				setTimeout(()=>{ timeSpan = setInterval(timeSpanFunc, 10) },interval);
				let span = el.querySelector('span');
				function timeSpanFunc() {
					widthSpan += 10;
					span.style.width = widthSpan+'%';
					if ( widthSpan >= 100 ) {
						clearTimeout(timeSpan);
						document.querySelector('.loader__preload').style.opacity = '1';
					}
				}
			}
		},
		preloadClose() {
			let preload = document.querySelector('.loader');
			let elements = document.getElementsByClassName('loader__el');
			document.querySelector('.loader__preload').style.opacity = '0';
			for( var i=0; i<elements.length; i++ ){
				let el = elements[i];
				let widthSpan = 100;
				let timeSpan = setInterval(timeSpanFunc, 20);
				let span = el.querySelector('span');
				function timeSpanFunc() {
					widthSpan -= 10;
					span.style.width = widthSpan+'%';
					if ( widthSpan <= 0 ) {
						clearTimeout(timeSpan);
						preload.style.display = 'none';
					}
				}
			}
		},
	},
}

</script>

<style lang="scss">
  @import './assets/sass/style.scss';
</style>
