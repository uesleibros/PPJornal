// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxtjs/supabase'],
	app: {
	  head: {
	  	title: 'PPJornal',
	  	htmlAttrs: {
      	lang: 'pt-BR'
    	},
	    meta: [
	      { charset: 'utf-8' },
	      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
	      { hid: 'description', name: 'description', content: '' },
	      { name: 'format-detection', content: 'telephone=no' }
	    ],
	    script: [],
	    link: [
	      // <link rel="stylesheet" href="https://myawesome-lib.css">
	      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' }
	      //{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css' }
	    ],
	    // please note that this is an area that is likely to change
	    style: [
	    	{ children: '* { margin: 0; padding: 0; }', type: 'text/css' }
	    ],
	    noscript: [
	      // <noscript>Javascript is required</noscript>
	      { children: 'É necessário que o seu navegador seja compatível com Javascript.' }
	    ]
	  }
	}
});
