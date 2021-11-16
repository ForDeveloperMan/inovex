import {createRouter, createWebHistory} from "vue-router";
import Home from '@/views/Home.vue'
import Services from '@/views/Services.vue'
import Service from '@/views/Service.vue'
import Clients from '@/views/Clients.vue'
import About from '@/views/About.vue'
import WhoWeAre from '@/views/WhoWeAre.vue'
import Human from '@/views/Human.vue'

let languages = ['ua', 'en', 'ru'];
let language_def = 'en';

// name, path, component, path_meta

let components = {
	home: {
		name: 'home',
		path: ['', '', '', ''],
		component: Home,
		path_meta: '/',
	},
	services: {
		name: 'services',
		path: ['poslugi', 'services', 'uslugi'],
		component: Services,
	},
	service: {
		name: 'service',
		path: ['poslugi/:service', 'services/:service', 'uslugi/:service'],
		component: Service,
	},
	serviceMedia: {
		name: 'serviceMedia',
		path: ['poslugi/meida/:media', 'services/meida/:media', 'uslugi/meida/:media'],
		component: Service,
	},
	clients: {
		name: 'clients',
		path: ['clients', 'clients', 'clients'],
		component: Clients,
	},
	about: {
		name: 'about',
		path: ['pro-nas', 'about-us', 'pro-nas'],
		component: About,
	},
	whoWeAre: {
		name: 'WhoWeAre',
		path: ['pro-nas/hto-mi', 'about-us/who-we-are', 'pro-nas/kto-mi'],
		component: WhoWeAre,
	},
	human: {
		name: 'Human',
		path: ['pro-nas/hto-mi/:human', 'about-us/who-we-are/:human', 'pro-nas/kto-mi/:human'],
		component: Human,
	},
};


let routes = []

for (var route_el in components) {
	for(var i=0; i<languages.length; i++){
		let language = languages[i];
		let route = components[route_el];
		let _path = '';
		let _pathLanguage = '';
		let languages_links = {};
		let linkHome = '';
		let category;

		//check default language
		if ( language === language_def ) {
			_path = '/' + route['path'][i];
			linkHome = '/';
		}else{
			_path = '/' + language + '/' + route['path'][i];
			linkHome = '/'+ language;
		}

		for(var lang=0; lang<languages.length; lang++){
			if ( languages[lang] === language_def ) {
				_pathLanguage = '/' + route['path'][lang];
			}else{
				_pathLanguage = '/' + languages[lang] + '/' + route['path'][lang];
			}
			languages_links[languages[lang]] = _pathLanguage
		}

		if ( route['category'] ) {
			category = route['category'];
		}

		routes.push({
			name: route['name'] +'-'+language,
			path: _path,
			component: route['component'],
			meta: {
				'linkHome': linkHome,
				'languages':  languages,
				'language': language,
				'translate_links': languages_links,
				'name': route['name'],
				'category': category,
			},
		});
	}
}

routes.push({
	path: "/:catchAll(.*)",
	name: "NotFound",
	redirect: '/',
	meta:{
		'path':  '/',
		'language':  language_def,
		'languages':  languages,
		'linkHome': '',
	},
});

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach((to, from, next) => {
	if ( from.name !== undefined ){
		to.meta.preload = true;
		next();
	}else{
		to.meta.preload = false;
		next();
	}
	return false;
})

export default router;
