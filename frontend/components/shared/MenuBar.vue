<template>
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue" dark>
    <v-app-bar-nav-icon
      v-if="isDashboard"
      class="burgerMenu"
      @click.stop="$emit('toggleNavigation')"
    />
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span>Hospitally</span>
    </v-toolbar-title>
    <v-spacer />
    <v-icon v-if="isDashboard" @click="logout()">mdi-logout</v-icon>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    isDashboard() {
      return (
        !this.$route.path.includes('login') &&
        !this.$route.path.includes('register')
      )
    }
  },
  methods: {
    logout() {
      this.$store.commit('setUser', undefined)
      this.$store.commit('setRole', '')
      this.$store.commit('setLastPage', '/login')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="sass" scoped>
@media (min-width: 1264px)
  .burgerMenu
    display: none
</style>
