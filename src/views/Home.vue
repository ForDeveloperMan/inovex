<template>
<div class="sec-home" id="sec-home">
	<Header></Header>
	<div class="sec-home__wrap">
		<div class="sec-home__content">
			<img src="@/assets/img/logo.svg" alt="" class="sec-home__logo">
		</div>
	</div>
</div>
</template>
<script>
import axios from 'axios'
import * as THREE from 'three'
import Header from '@/components/Header.vue'

export default {
	name: 'Home',
	data(){
		return{
			showAnim: false,
			showMain: false,
		};
	},
	components: {
		Header
	},
	watch:{
	},
	created(){
	},
	mounted() {
		this.$nextTick(function () {
			// this.bgAnim();
			this.$store.commit('loadedPageF', true);
		});
	},
	methods: {
		bgAnim() {
			var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

			var container;
			var camera, scene, renderer;

			var particles, particle, count = 0;


			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			var mouseX = -windowHalfX, mouseY = 0 - windowHalfY;

			init();
			animate();

			function init() {

			container = document.createElement('div');
			container.classList.add('sec-home__bg');
			document.getElementById('sec-home').appendChild(container);

			camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
			camera.position.z = 1000;

			scene = new THREE.Scene();

			particles = new Array();

			var PI2 = Math.PI * 2;
			var material = new THREE.ParticleCanvasMaterial({

				color: 0x515151,
				program: function(context) {

				context.beginPath();
				context.arc( 0, 0, 0.5, 0, PI2, true );
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

			mouseX = event.clientX*.5 - windowHalfX;
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

			camera.position.x += (mouseX - camera.position.x) * .05;
			camera.position.y += (-mouseY - camera.position.y) * .05;
			camera.lookAt(scene.position);

			var i = 0;

			for (var ix = 0; ix < AMOUNTX; ix++) {

				for (var iy = 0; iy < AMOUNTY; iy++) {

					particle = particles[i++];
					particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
					particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;

				}

			}

			renderer.render(scene, camera);

			count += 0.1;

			}
		},
		showPage() {
			setTimeout(()=>this.showAnim = true, 100);
		},
		getInfo() {
			axios.get('http://privilege.qazxswedc.site/wp-json/vue/v1/home', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.pageInfo = response.data.pageInfo;
				this.showAnimMain = true;
				if ( this.$store.state.home_bg ) {
					this.showPage();
				}
			});
		},
	},
}

</script>