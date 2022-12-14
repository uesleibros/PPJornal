<template>
	<div v-if="error == null">
		<Header />
		<div class="Noticia">
			<img src="https://assets-global.website-files.com/5f9072399b2640f14d6a2bf4/638a71cfbd7fbf6236a8ba0a_Policy%20%26%20Safety%20-%202-p-1600.png" class="image-19" />
			<div class="_noticia__titulo">
				<h1>{{ data.titulo }}</h1>
			</div>
			<div class="_noticia__body">
				<div class="_autor">
					<img :src="'/_nuxt/assets/autores/' + data.autor + '.jpg'" />
					<p>{{ data.autor }}</p>
					<small>
						<i class="fa-solid fa-eye"></i> ・ {{ data.visualizacoes }}
					</small><br/>
					<small>{{ moment(data.created_at).format('MMMM DD, YYYY') }}</small>
				</div>
				<div class="_assunto">
					<div id="assunto__md" v-html="assunto"></div>
				</div>
				<div>
					<div class="_contents">
						<h4 class="_title__contents">Conteúdos</h4>
						<div v-for="t in tableContents">
							<a v-bind:click="curContent" :id="'_' + t[1]" :href="'#' + t[1]"> {{ t[0] }}</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--
			<div class="divider-bar"></div>
		-->
	</div>
	<div v-else>
		<Header />
		<div class="__not-found">
			<div>
				<h1>Notícia não encontrada.</h1>
				<p>
					Ops! A notícia em que você está procurando não foi encontrada, felizmente temos alguns métodos que podem funcionar caso você tente, como:
				</p><br/>
				<ul>
					<li>
						Certifique-se de ter colocado o <b>id (identificador)</b> da notícia corretamente.
					</li>
					<li>
						Cheque se a notícia existe ou se foi <b>deletada</b>.
					</li>
					<li>
						No caso da notícia existir e continuar vendo essa tela, contate a <b>Bedrock (UesleiDev)</b>.
					</li>
				</ul>
				<NuxtLink to="/">
					<button class="_btn">Voltar para a página inicial</button>
				</NuxtLink>
			</div>
			<div>
				<img src="~/assets/not_found.gif" style="height: 350px;" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { marked } from 'marked';
	import moment from 'moment';
	let assunto;

	const supabase = useSupabaseClient();
	const route = useRoute();

	const _id = route.params.id;

	const { data, error } = await supabase.from('noticias').select('*').eq('id', _id).single();

	assunto = marked.parse(data.assunto, { breaks: true, gfm: false, xhtml: true });
	if (error == null) {
		//await supabase.from('noticias').update({ visualizacoes: data.visualizacoes + 1 }).eq('id', _id).select();
	}
</script>

<script>
	export default {
		data() {
			return {
				tableContents: []
			}
		},
		mounted() {
			const md = document.querySelectorAll("#assunto__md > *");
			md.forEach((e) => {
				if (e.tagName == "H1"){
					this.tableContents.push([e.textContent, e.id]);
				}
			});
			if(document.querySelector("._contents") !== null){
				setInterval(this.checkScroll, 100);
			}

			// Markdown Styles
			/* PRE */
			document.querySelectorAll("#assunto__md pre").forEach((pre) => {
				pre.style.backgroundColor = "RGB(245, 245, 245)";
				pre.style.borderRadius = "4px";
				pre.style.border = "solid 1px lightgrey";
				pre.style.padding = "15px";
			});
			/* H1 */
			document.querySelectorAll("#assunto__md h1").forEach((h1) => {
				h1.style.fontFamily = "Kanit, sans-serif, Helvetica";
			});
			/* BLOCKQUOTE */
			document.querySelectorAll("#assunto__md blockquote").forEach((bq) => {
				bq.style.borderLeft = "solid 4px #5865f2";
				bq.style.paddingLeft = "5px";
			});
		},
		methods: {
			checkScroll() {
				const md = document.querySelectorAll("#assunto__md > *");
				var docViewTop = $(window).scrollTop();
    		var docViewBottom = docViewTop + $(window).height();

				md.forEach((e) => {
					if (e.tagName == "H1"){
				    var elemTop = $(e).offset().top;
				    var elemBottom = elemTop + $(e).height();
						if ((elemBottom <= docViewBottom) && (elemTop >= docViewTop)) {
							document.querySelector("#_" + e.id).classList.add('activeContent');
						} else {
							document.querySelector("#_" + e.id).classList.remove('activeContent');
						}
					}
				});
			},
			curContent(j) {
				const md = document.querySelectorAll("#assunto__md > *");
				md.forEach((e) => {
					if (e.tagName == "H1"){
						document.querySelector("#_" + e.id).classList.remove('activeContent');
					}
				});
				j.classList.add('activeContent');
			}
		}
	}
</script>

<style scoped>
	.Noticia {
    padding-right: 36px;
    padding-left: 36px;
    margin-top: 30px;
	}

	.Noticia ._noticia__titulo {
		font-weight: 700;
		font-family: Palanquin Dark, sans-serif, Helvetica;
		text-transform: uppercase;
		font-size: 24px;
		color: rgb(45, 45, 45);
	}

	._noticia__body {
		display: flex;
		margin-top: 7%;
	}

	@media screen and (max-width: 600px) {
		._noticia__body {
			display: block;
		}
		._assunto #assunto__md {
			width: 300px !important;
			overflow: hidden;
		}
		._contents {
			display: none;
		}
		.image-19 {
			object-fit: cover;
		}
	}

	._noticia__body ._autor {
		width: 200px;
	}

	._noticia__body ._autor img {
		height: 70px;
		border-radius: 50%;
	}

	._noticia__body ._autor p {
		font-weight: 650;
	}

	._noticia__body ._autor small {
		font-size: 12px;
		color: grey;
	}

	._assunto {
		width: 900px;
		overflow-wrap: break-word;
	}

	._assunto #assunto__md {
		font-size: 20px;
		font-family: Segoe UI Light;
		margin-bottom: 50px;
	}

	.divider-bar {
		content: '';
		height: 10px;
    margin-top: 120px;
    margin-bottom: 120px;
    background-color: #f0f0f0;
	}

	.__not-found {
		padding: 50px;
		display: flex;
	}

	.__not-found p {
		width: 700px;
	}

	._btn {
    margin-top: 5px;
    font-weight: 700;
    color: white;
    background: #0066ff;
    border: none;
    border-radius: 2px;
    position: relative;
    display: inline-block;
    padding: 7px 16px;
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    border: 1px solid;
    border-radius: 6px;
    -webkit-appearance: none;
    appearance: none;
    transition: all .3s;
	}

	._btn:hover {
		background: #0055ff;
	}

	._contents {
		position: -webkit-sticky; /* Safari */
		position: sticky;
		justify-content: flex-end;
		margin-left: 27px;
		top: 0;
	}

	._contents ._title__contents {
    margin-top: 0px;
    margin-bottom: 20px;
    color: #5865f2;
    font-weight: normal;
    font-size: 24px;
	}

	._contents a {
		margin-bottom: 0px;
    margin-left: -2px;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 9px;
    border-left: 2px solid #ebf0f7;
    color: #23272a;
    font-size: 1´4px;
    line-height: 15px;
    text-decoration: none;
	}

	._contents a:hover {
		text-decoration-line: underline;
	}

	.activeContent {
		font-weight: 500!important;
		border-color: #5865f2!important;
		color: #5865f2!important;
	}

	.image-19 {
    position: relative;
    max-width: 100%;
    min-height: 352px;
    float: none;
    border-radius: 8px;
    opacity: 1;
    -webkit-transition: all 1000ms ease;
    transition: all 1000ms ease;
    margin-bottom: 45px;
	}
</style>
