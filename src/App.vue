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
	<div id="sec-home-bg"></div>
</template>
<script>
import * as THREE from 'three'

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
			this.$store.commit('isHomeF', false);
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
		},
		'$store.state.isHome': function() {
			if ( this.$store.state.isHome ) {
				this.bgAnim();
			}else{
				this.hideAnim();
			}
		},
	},
	mounted() {
		this.$nextTick(function () {
		});
	},
	methods: {
		hideAnim() {
			document.querySelector('#sec-home-bg').style.display = 'none';
			document.querySelector('#sec-home-bg canvas').style.display = 'none';
		},
		bgAnim() {
			if ( !this.$store.state.bgHome ) {
				this.$store.commit('bgHomeF', true);
			var SEPARATION = 160,
			AMOUNTX = 25,
			AMOUNTY = 25;

			var container;
			var camera, scene, renderer;

			var particles, particle, count = 0;

			var mouseX = 85,
			mouseY = -342;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			init();
			animate();

			function init() {

			container = document.querySelector('#sec-home-bg');

			camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 10000);
			camera.position.z = 1000;

			scene = new THREE.Scene();

			particles = new Array();

			var PI2 = Math.PI * 2;
			var material = new THREE.ParticleCanvasMaterial({

			color: 0xFFFFFF,
			program: function(context) {

			context.beginPath();
			context.arc(0, 0, .3, 0, PI2, true);
			context.fill();

			}

			});

			var i = 0;

			for (var ix = 0; ix < AMOUNTX; ix++) {

			for (var iy = 0; iy < AMOUNTY; iy++) {

			particle = particles[i++] = new THREE.Particle(material);
			particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
			particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
			scene.add(particle);

			}

			}

			renderer = new THREE.CanvasRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			container.appendChild(renderer.domElement);

			document.addEventListener('mousemove', onDocumentMouseMove, false);
			// document.addEventListener('touchstart', onDocumentTouchStart, false);
			// document.addEventListener('touchmove', onDocumentTouchMove, false);

			//

			window.addEventListener('resize', onWindowResize, false);

			}

			function onWindowResize() {

			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);

			}

			//

			function onDocumentMouseMove(event) {

			mouseX = event.clientX - windowHalfX;
			mouseY = event.clientY - windowHalfY;

			}

			function onDocumentTouchStart(event) {

			if (event.touches.length === 1) {

			event.preventDefault();

			mouseX = event.touches[0].pageX - windowHalfX;
			mouseY = event.touches[0].pageY - windowHalfY;

			}

			}

			function onDocumentTouchMove(event) {

			if (event.touches.length === 1) {

			event.preventDefault();

			mouseX = event.touches[0].pageX - windowHalfX;
			mouseY = event.touches[0].pageY - windowHalfY;

			}

			}

			//

			function animate() {

			requestAnimationFrame(animate);

			render();


			}

			function render() {

	            camera.position.x += ( mouseX - camera.position.x ) * .05;
	            camera.position.y += ( - mouseY - camera.position.y ) * .05;
	            camera.lookAt( scene.position );

	            var i = 0;

	            for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

	                for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

	                    particle = particles[ i++ ];
	                    particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 30 ) +
	                        ( Math.sin( ( iy + count ) * 0.5 ) * 30 );
	                    particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 +
	                        ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;

	                }

	            }

	            renderer.render( scene, camera );

	            count += 0.1;

	        }
			}else{
				document.querySelector('#sec-home-bg').style.display = 'block';
				document.querySelector('#sec-home-bg canvas').style.display = 'block';
			}
		},
		preloadStart() {
			let preload = document.querySelector('.loader');
			let elements = document.getElementsByClassName('loader__el');
			preload.style.display = 'flex';
			for( var i=0; i<elements.length; i++ ){
				let el = elements[i];
				let widthSpan = 0;
				let interval = (i*50);
				let timeSpan;
				setTimeout(()=>{ timeSpan = setInterval(timeSpanFunc, 10) }, interval);
				let span = el.querySelector('span');
				function timeSpanFunc() {
					widthSpan += 5;
					span.style.width = widthSpan+'%';
					if ( widthSpan >= 100 ) {
						clearTimeout(timeSpan);
						if ( el === elements[elements.length-1] ) {
							document.querySelector('.loader__preload').style.opacity = '1';
						}
					}
				}
			}
		},
		preloadClose() {
			let preload = document.querySelector('.loader');
			let elements = document.getElementsByClassName('loader__el');
			document.querySelector('.loader__preload').style.opacity = '0';
			let l = -1;
			for( var i=elements.length; i>0; i-- ){
				l++;
				let el = elements[l];
				let widthSpan = 100;
				let interval = (i*50);
				let timeSpan;
				setTimeout(()=>{ timeSpan = setInterval(timeSpanFunc, 10) }, interval);
				let span = el.querySelector('span');
				function timeSpanFunc() {
					widthSpan -= 5;
					span.style.width = widthSpan+'%';
					if ( widthSpan <= 0 ) {
						clearTimeout(timeSpan);
						if ( el === elements[0] ) {
							preload.style.display = 'none';
						}
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
