<template>
  <div>
    <div class="Header pWasZ">
      <div class="Header_item jTwoLh">
        <NuxtLink to="/" class="Header_link lLkL">
          <div class="babalu">
            PPJornal
          </div>
        </NuxtLink>
      </div>
      <div class="Header_item jTwoLh">
        <div class="_search">
          <input @input="sumSearch" name="--se" type="text" placeholder="Pesquisar por notícias" class="__input_header" />
          <NuxtLink :to="'/buscar/' + searchValue" class= "_btn__search">
            <div>
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="Header_item jTwoLh">
        <NuxtLink to="/postar" class="Header_link lLkL">
          <div class="babalu">
            Fazer uma postagem
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchValue: ''
      }
    },
    methods: {
      sumSearch(e) {
        this.searchValue = e.target.value.trim();
      }
    }
  }
</script>

<style scoped>
  @media screen and (min-width: 1012px) {
    .pWasZ {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
  
  .pWasZ {
    z-index: 32;
    display: flex;
    padding: 16px 8px;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.7);
    background: rgb(37, 37, 37);  
    -webkit-box-align: center;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
  }

  .jTwoLh {
    display: flex;
    margin-right: 16px;
    align-self: stretch;
    -webkit-box-align: center;
    align-items: center;
    flex-wrap: nowrap;
  }

  .lLkL {
    font-weight: 700;
    color: rgb(255, 255, 255);
    white-space: nowrap;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
  }

  .babalu {
    margin-left: 8px;
  }

  .babalu:hover {
    color: lightgrey;
  }

  #img__small {
    height: 30px;
  }

  ._search {
    display: flex;
    border: solid 1px grey;
    border-radius: 4px;
    padding: 5px 0px 5px 15px;
    width: 205px;
    background: none;
    outline: none;
    color: white;
  }

  .__input_header {
    background: none;
    border: none;
    outline: none;
    color: white;
    padding-right: 5px;
  }

  ._btn__search {
    border: solid 1px grey;
    border-radius: 4px;
    padding: 0 5px 0 5px;
    justify-content: flex-end;
    text-decoration: none;
    color: white;
  }
</style>
