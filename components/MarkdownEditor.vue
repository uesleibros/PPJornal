<template>
  <div v-if="authAccess">
    <div class="Postar">
      <h1 class="big__font">Postar nova notícia</h1>
      <form class="formulario" @submit.prevent="handleSubmit">
        <div class="_message" style="margin-bottom: 15px; background: #5151ff; color: white; border-radius: 4px; padding: 15px; border: solid 1px #c9c9ff; display: none;">
          <p>Notícia publicada com sucesso!</p>
        </div>
        <div class="form_field">
          <input name="titulo" id="titulo" autocomplete="off" type="text" placeholder="Título" required />
        </div>
        <div class="editor">
          <div class="e-toolbar">
            <div class="e-toolbar-left">
              <div :class="{ 'e-toolbar-tab-active': isActive, 'e-toolbar-tab': true }" v-on:click="changeSection()">
                <i class="fa-solid fa-code"></i> Escrever</div>
              <div :class="{ 'e-toolbar-tab-active': !isActive, 'e-toolbar-tab': true }" v-on:click="changeSection()">
                <i class="fa-regular fa-eye"></i> Visualizar</div>
            </div>
          </div>
          <div class="e-body">
            <div class="write" :style="{display: hidden}">
              <textarea name="assunto" id="_textarea-md" ref="textarea" :value="md" @input="resize()" @focus="outline()" @focusout="removeOutline()" required></textarea>
            </div>
            <div class="read" v-if="hidden == 'none'">
              <div class="output" v-html="output"></div>
            </div>
          </div>
        </div>
        <div class="form_field">
          <label for="autor">Autor da notícia</label>
          <select name="autor" id="autor">
            <option value="Enzo Barata">Enzo Barata</option>
            <option value="Gabb">Gabb</option>
            <option value="Davi">Davi</option>
            <option value="Daniel Clímaco">Daniel Clímaco</option>
          </select>
        </div>
        <div class="form_field">
          <label for="confirmacao">
            Digite <b>quero publicar</b> para confirmar.
          </label>
          <input name="confirmacao" id="confirmacao" autocomplete="off" pattern="quero publicar" type="text" placeholder="quero publicar" required />
        </div>
        <button type="submit" :class="{ _button__publicar: true, disabled: isDisabled }" :disabled="isDisabled">Publicar notícia</button>
        {{ formData.titulo }}
      </form>
    </div>
  </div>
  <div v-else>
    <div class="_auth_form">
      <h4>Autenticação</h4>
      <p>Digite o código para fazer a postagem.</p>
      <small>Apenas pessoas com permissão pode usar essa função.</small>
      <div class="form_field">
        <input name="authCode" autocomplete="off" id="authCode" type="text" placeholder="Código de Autenticação" style="margin-top: 25px; width: 90%;" />
      </div>
      <button type="submit" :class="{ _button__publicar: true }" style="width: 96%;" v-on:click="auth">Acessar</button>
    </div>
  </div>
</template>

<script setup>
  const supabase = useSupabaseClient();
  let formData = {
    titulo: null,
    assunto: null,
    autor: null
  }

  const handleSubmit = async () => {
    formData.titulo = document.querySelector("#titulo").value.trim();
    formData.assunto = document.querySelector("#_textarea-md").value.trim();
    formData.autor = document.querySelector("#autor").value.trim();

    const data = await supabase.from('noticias').insert(formData);

    if (await data.status == 201 && await data.error == null) {
      document.querySelector("#titulo").value = "";
      document.querySelector("#_textarea-md").value = "";
      document.querySelector("._message").style.display = 'block';
    }
  }
</script>

<script>
  import { marked } from 'marked';
  export default {
    data() {
      return {
        hidden: 'block',
        md: '',
        isActive: true,
        isDisabled: false,
        authAccess: false
      }
    },
    computed: {
      output() {
        return marked(this.md)
      }
    },
    methods: { 
      resize() {
        let element = this.$refs["textarea"];
        let ebody = document.querySelector(".editor");

        element.style.height = "18px";
        element.style.height = element.scrollHeight + "px";
        ebody.style.height = element.scrollHeight + "px";
      },
      checkMD() {
        if (this.md.trim() == "" || this.md.trim().length == 0) {
          this.isDisabled = true
        } else {
          this.isDisabled = false
        }
      },
      changeSection() {
        let element = this.$refs["textarea"];
        document.querySelector(".editor").style.height = "auto";
        this.hidden = this.hidden == 'block' ? 'none' : 'block';
        this.md = element.value;
        this.isActive = !this.isActive;
      },
      outline() {
        let editor = document.querySelector(".editor");
        editor.style.borderColor = "#0066ff";
        //this.checkMD();
      },
      removeOutline() {
        let editor = document.querySelector(".editor");
        editor.style.borderColor = "#d0d7de";
        //this.checkMD();
      },
      auth() {
        let authCode = document.querySelector("#authCode").value
        if (authCode == 'asa4ww2xas4A45') {
          this.authAccess = true;
        } else {
          document.querySelector("#authCode").style.borderColor = "pink";
        }
      }
    }
  }
</script>

<style scoped>
  .big__font {
    font-weight: 600;
    font-size: 35px;
    margin: 0px 0px 16px;
  }
  
  @media screen and (min-width: 1012px) {
    .Postar {
      padding: 24px;
    }
  }
  
  .Postar {
    max-width: 1012px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 16px 8px 8px;
  }

  .formulario {
    margin-bottom: 24px;
    width: 100%;
  }

  .form_field input {
    width: 98%;
    border: solid 1px lightgrey;
    border-radius: 4px;
    padding: 8px;
    outline-color: #0066ff;
  }

  .form_field select {
    width: 100%;
    border: solid 1px lightgrey;
    border-radius: 4px;
    padding: 8px;
    outline-color: #0066ff;
  }

  .editor {
    /*
    height: -webkit-calc(100vh - 350px);
    height: -moz-calc(100vh - 350px);
    height: calc(100vh - 350px);
    */
    min-height: 220px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    padding: 1px;
    border: 1px solid #d0d7de;
    margin-top: 15px;
  }

  .editor .e-toolbar {
    -webkit-border-top-left-radius: 6px;
    -moz-border-radius-topleft: 6px;
    border-top-left-radius: 6px;
    -webkit-border-top-right-radius: 6px;
    -moz-border-radius-topright: 6px;
    border-top-right-radius: 6px;
  }
  
  .e-toolbar {
    padding: 4px 12px;
    border-bottom: 1px solid #e1e4e8;
    background-color: #fafbfc;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    overflow: hidden;
  }
  
  .editor, .editor * {
    box-sizing: border-box;
  }

  .e-toolbar-left {
    float: left;
  }

  .e-toolbar-right {
    float: right;
  }

  .e-toolbar-tab-active {
    color: #0366d6 !important;
    border: 1px solid #d0d7de;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  
  .e-toolbar-tab {
    display: inline-block;
    cursor: pointer;
    top: 5px;
    padding-left: 8px;
    padding-right: 8px;
    line-height: 24px;
    font-size: 14px;
    position: relative;
    color: grey;
  }

  .e-body {
    height: calc(100% - 58px);
    overflow: auto;
  }

  .e-body textarea {
    resize: none;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    overflow: auto;
    padding: 15px;
    font-family: monospace;
  }

  .output {
    overflow: auto;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
  }

  ._button__publicar {
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

  .disabled {
    opacity: .8;
    cursor: auto !important;
  }

  ._button__publicar:hover {
    background: #0055ff;
  }

  ._auth_form {
    margin: auto;
    margin-top: 8%;
    text-align: center;
    padding: 15px;
    width: 280px;
    height: 300px;
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(244,244,244,1) 100%);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
</style>
