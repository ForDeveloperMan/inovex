<template>
	<router-view :key="$route.name+$route.path" />
	<div class="loader">
		<svg class="loader__preload" width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.9 1V23.6C31.9 23.6 15.1 4.5 12.3 1H10.9V5L33.2 31.2H34.8V1H31.9Z" stroke="black" stroke-width="0.7087" stroke-miterlimit="10"/><path d="M10.8 31.2H13.6V24L10.8 20.8V31.2Z" stroke="black" stroke-width="0.7087" stroke-miterlimit="10"/><path d="M25.1 26.1L3.2 1H1V31.2H3.8V7.8C3.8 7.8 22.9 29.8 24 31.2H25.2L25.1 26.1Z" stroke="black" stroke-width="0.7087" stroke-miterlimit="10"/><path d="M25.2 1H22.4V7.5L25.2 10.7V1Z" stroke="black" stroke-width="0.7087" stroke-miterlimit="10"/></svg>
		<div class="loader__el"></div>
		<div class="loader__el"></div>
		<div class="loader__el"></div>
		<div class="loader__el"></div>
		<div class="loader__el"></div>
		<div class="loader__el"></div>
		<div class="loader__el"></div>
		<div class="loader__el"></div>
	</div>
</template>
<script>

export default {
  name: 'App',
  beforeRouteLeave(to, from, next) {
    console.log('leave', next);
    setTimeout(()=>next=true, 10000);
  },
  created(){
  },
}

</script>

<style lang="scss">
  @import './assets/sass/style.scss';
</style>
