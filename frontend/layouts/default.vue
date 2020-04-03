<template>
  <v-app>
    <component
      :is="getNavigation"
      v-if="isDashboard"
      :drawer-prop="drawer"
      @closeDrawer="drawer = null"
    />
    <MenuBar @toggleNavigation="drawer = !drawer" />

    <v-content>
      <nuxt />
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import MenuBar from '@/components/shared/MenuBar'
import VolunteerNavigationDrawer from '@/components/volunteer/NavigationDrawer'
import HospitalNavigationDrawer from '@/components/hospital/NavigationDrawer'
export default {
  components: {
    MenuBar,
    VolunteerNavigationDrawer,
    HospitalNavigationDrawer
  },
  data() {
    return {
      fixed: false,
      title: 'Vuetify.js',
      drawer: null
    }
  },
  computed: {
    getNavigation() {
      return this.$store.state.role === 'hospital'
        ? HospitalNavigationDrawer
        : VolunteerNavigationDrawer
    },
    isDashboard() {
      return (
        !this.$route.path.includes('login') &&
        !this.$route.path.includes('register')
      )
    }
  },
  middleware: 'setLastPage',
  mounted() {
    // subscribe to state changes an write them to local storage
    this.$store.subscribe((mutation, state) => {
      // Store the state object as a JSON string
      localStorage.setItem('store', JSON.stringify(state))
    })

    // initialize store from local storage
    this.$store.commit('initialiseStore')

    // reroute to last page
    this.$router.push(this.$store.state.lastPage)
  }
}
</script>
