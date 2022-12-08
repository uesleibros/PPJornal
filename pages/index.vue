<template>
  <div>
    <Header />
    <div class="app">
      <div class="__title">
        <h1>ULTIMAS NOTÍCIAS</h1>
      </div>
      <div class="_noticias" v-if="data.length > 0">
        <div v-for="noticia in data" id="noticia">
          <NuxtLink :to="'/noticia/' + noticia.id">
            <h4>{{ noticia.titulo }}</h4>
          </NuxtLink>
          <div id="infos">
            <small>
              {{ noticia.autor }} ・ {{ moment(noticia.created_at).format('MMMM DD, YYYY') }} ・ <i class="fa-solid fa-eye"></i>&nbsp;&nbsp;{{ noticia.visualizacoes }}
            </small>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Nenhuma notícia encontrada.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  const supabase = useSupabaseClient();
  import moment from 'moment';

  const { data } = await supabase.from('noticias').select('*').order('created_at', { ascending: false });
</script>

<style scoped>
  .app {
    padding: 25px;
  }

  .__title {
    font-weight: 700;
    font-family: Palanquin Dark, sans-serif, Helvetica;
    text-transform: uppercase;
    font-size: 16px;
    color: rgb(45, 45, 45);
  }

  ._noticias {
    margin-top: 30px;
  }

  #noticia {
    border-top: solid 1px lightgrey;
    margin-bottom: 15px;
    padding-top: 15px;
  }

  #noticia h4 {
    font-weight: 670;
  }

  #noticia a {
    color: rgb(0, 0, 0);
    text-decoration: none;
    width: max-content;
  }

  #noticia a:hover {
    text-decoration-line: underline;
  }

  #noticia #infos {
    margin-top: -9px;
  }

  #noticia small {
    font-size: 11px;
  }
</style>
