<template>
<div class="sec-page sec-contacts">
	<Header></Header>
	<div class="sec-page__wrap sec-contacts__wrap" v-if="showMain">
		<transition name="fadeDown" v-show="showAnim" style="animation-delay: 0.6s">
			<div class="sec-contacts__top">
				<h1 class="title title_big sec-contacts__title title title_dec title_dec-left">{{ pageInfo.title }}</h1>
			</div>
		</transition>
		<div class="sec-contacts__content">
			<div class="sec-contacts__left">
				<div class="block-contact">
					<transition name="fadeDown" v-show="showAnim" style="animation-delay: 0.4s">
						<div class="block-contact__el">
							<div class="contact-el">
								<div class="contact-el__title">{{ pageInfo.visit_us.title }}</div>
								<p class="contact-el__text">{{ pageInfo.visit_us.text }}</p>
							</div>
						</div>
					</transition>
					<transition name="fadeDown" v-show="showAnim" style="animation-delay: 0.2s">
						<div class="block-contact__el">
							<div class="contact-el">
								<div class="contact-el__title">{{ pageInfo.email.title }}</div>
								<a class="contact-el__text" :href="'mailto:'+pageInfo.email.text">{{ pageInfo.email.text }}</a>
							</div>
						</div>
					</transition>
					<transition name="fadeDown" v-show="showAnim">
						<div class="block-contact__el">
							<div class="contact-el">
								<div class="contact-el__title">{{ pageInfo.call.title }}</div>
								<a class="contact-el__text" :href="'mailto:'+pageInfo.call.text">{{ pageInfo.call.text }}</a>
							</div>
						</div>
					</transition>
				</div>
			</div>
			<div class="sec-contacts__right" v-bind:class="{center: thanks}">
				<div v-if="!thanks">
					<transition name="fadeDown" v-show="showAnim && !thanksForm" style="animation-delay: 0.8s">
						<div class="block-form">
							<input type="text" class="form-el inp block-form__el" :placeholder="pageInfo.fields.name" @focus="inpCheck" @blur="inpCheck" @input="inpCheck" name="name">
							<input type="text" class="form-el inp block-form__el" :placeholder="pageInfo.fields.mail" @focus="inpCheck" @blur="inpCheck" @input="inpCheck" name="mail">
							<input type="text" class="form-el inp block-form__el" :placeholder="pageInfo.fields.message" @focus="inpCheck" @blur="inpCheck" @input="inpCheck" name="message">
							<a href="#" class="block-form__btn" @click.prevent="sendForm">{{ pageInfo.fields.send }}</a>
						</div>
					</transition>
				</div>
				<transition name="fadeDown">
					<div class="form-thanks" v-if="thanks" v-html="pageInfo.fields.after"></div>
				</transition>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import axios from 'axios'
import Header from '@/components/Header.vue'

export default {
	name: 'About',
	data(){
		return{
			showAnim: false,
			showMain: false,
			translateSlugs: Object,
			pageInfo: Object,
			thanksForm: false,
			formError: false,
			thanks: false,
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
		sendForm(e) {
			let wrap = e.target.closest('.block-form');
			let inps = wrap.getElementsByClassName('block-form__el');
			let inps_check = 0;
			for(let i=0; i < inps.length; i++){
				if ( inps[i].value === '' || inps[i].value === null || inps[i].value === false || inps[i].value === undefined  ) {
					inps[i].classList.add('error');
				}else{
					inps[i].classList.remove('error');
					inps_check++;
				}
			}

			if( inps_check !== inps.length ){
				return false;
			}

			let inp_name = wrap.querySelector('.block-form__el[name="name"]').value;
			let inp_mail = wrap.querySelector('.block-form__el[name="mail"]').value;
			let inp_message = wrap.querySelector('.block-form__el[name="message"]').value;

			let formData = new FormData();
			formData.append('inp-name', inp_name);
			formData.append('inp-email', inp_mail);
			formData.append('inp-message', inp_message);
			
			axios.post('https://inovex.qazxswedc.site/wp-json/contact-form-7/v1/contact-forms/205/feedback', formData).then(response => {
				if ( response.data.status === 'mail_sent' ) {
					this.thanks = true;
				}
				if ( response.data.status === 'validation_failed' ) {
					this.formError = true;
					wrap.querySelector('.block-form__el[name="mail"]').classList.add('error');
				}
			});
		},
		inpCheck(e) {
			let inp = e.target;
			let val = inp.value;
			if ( val === '' || val === null || val === undefined || val === false ) {
				inp.classList.remove('focus');
			}else{
				inp.classList.add('focus');
				inp.classList.remove('error');
			}
		},
		showPage() {
			setTimeout(()=>this.showAnim = true, 1100);
		},
		getInfo() {
			axios.get('https://inovex.qazxswedc.site/wp-json/vue/v1/contacts', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.pageInfo = response.data.pageInfo;
				this.$store.commit('loadedPageF', true);
				this.showMain = true;
				this.showPage();
			});
		},
	},
}

</script>