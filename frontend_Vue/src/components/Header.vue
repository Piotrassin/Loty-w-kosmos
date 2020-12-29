<template>
<div id="outer-grid" >
    <div id="top-inner-grid">
        <div>
            <img id="logo" src="../assets/logo.png">
        </div>
        <span id="title">{{ title }}</span>
        <!-- <div class="menu"> -->
            <!-- <nav>
                <a href="lista_lotow.html" class="navbutton">Lista lotów</a>
                <a href="lista_uzytkownikow.html" class="navbutton">Lista użytkowników</a>
            </nav> -->
            <div class="menu">
              <nav>
                <router-link class="navbutton" to="/" >Strona Główna</router-link>
                <router-link class="navbutton" to="/tickets">Bilety</router-link>
                <router-link class="navbutton" to="/users">Użytkownicy</router-link>
                <router-link class="navbutton" to="/flights">Loty</router-link>
              </nav>
            </div>
        <!-- </div> -->
    </div>
</div>
</template>

<script>
export default {
  props: ['title']
}
</script>
