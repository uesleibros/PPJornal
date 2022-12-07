<template>
	<div v-if="error == null">
		<Header />
		<div class="Noticia">
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
					<div id="assunto__md" v-html="marked(data.assunto)"></div>
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

	const supabase = useSupabaseClient();
	const route = useRoute();
	let tableContentsLength;
	const _id = route.params.id;

	const { data, error } = await supabase.from('noticias').select('*').eq('id', _id).single();
	if (error == null) {
		await supabase.from('noticias').update({ visualizacoes: data.visualizacoes + 1 }).eq('id', _id).select();
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
		font-family: Alfa Slab One;
		text-transform: uppercase;
		font-size: 24px;
		color: rgb(45, 45, 45);
	}

	._noticia__body {
		display: flex;
		margin-top: 7%;
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
		font-size: 24px;
		font-family: Segoe UI Light;
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
</style>
