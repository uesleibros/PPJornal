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
      <div class="menu">
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
      <div class="Header_item jTwoLh bby">
        <div @click="activeBurger = !activeBurger" class="burger_menu" :class="{ active_burger: activeBurger }">
          <i class="fa-solid fa-bars"></i>
        </div>
      </div>
    </div>
    <div class="__burger_active" v-show="activeBurger">
      <div class="Header_item jTwoLh">
        <div class="_search" data-v-axWQ>
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
        searchValue: '',
        activeBurger: false
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
  }


  .menu {
    display: flex;
  }

  .jTwoLh {
    display: flex;
    margin-right: 16px;
    align-self: stretch;
    -webkit-box-align: center;
    align-items: center;
    flex-wrap: nowrap;
  }

  @media screen and (max-width: 600px) {
    .menu {
      display: none;
    }
    .bby {
      display: block !important;
    }
  }

  .bby {
    display: none;
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
    color: white;
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
    background: rgb(37, 37, 37);
    outline: none;
    color: white;
  }

  .burger_menu {
    border: solid 1px grey;
    cursor: pointer;
    border-radius: 4px;
    padding: 2px 8px 2px 8px;
    color: white;
  }

  .active_burger {
    background: white !important;
    color: rgb(37, 37, 37) !important;
  }

  .__input_header {
    background: none;
    border: none;
    outline: none;
    color: white;
    padding-right: 5px;
    background: rgb(37, 37, 37);
  }

  ._btn__search {
    border: solid 1px grey;
    border-radius: 4px;
    padding: 0 5px 0 5px;
    justify-content: flex-end;
    text-decoration: none;
    color: white;
  }

  .__burger_active {
    padding: 5px;
    width: 100%;
    background: rgb(37, 37, 37);
  }

  .__burger_active .jTwoLh:not(:first-child) {
    margin-top: 10px;
    margin-left: 0;
    padding: 5px;
    border-top: solid 1px grey;
  }

  ._search[data-v-axWQ] {
    width: 100%;
  }

  ._search[data-v-axWQ] .__input_header {
    width: 97%;
  }

</style>
