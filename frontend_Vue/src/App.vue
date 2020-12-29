<template>
  <div id="app">
    <Header v-bind:title="title"></Header>

    <router-view/>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      title: 'Spacetrip'
    }
  }
}
</script>
