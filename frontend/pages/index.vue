<template>
  <div>
    <component :is="getDashboard" />
    <v-overlay :absolute="absolute" :opacity="opacity" :value="isNew">
      <component :is="getWelcome" @processDone="processDone = true" />
    </v-overlay>
  </div>
</template>

<script>
import hospitalDashboard from '@/components/hospital/Dashboard'
import volunteerDashboard from '@/components/volunteer/Dashboard'
import hospitalWelcome from '@/components/hospital/Welcome'
import volunteerWelcome from '@/components/volunteer/Welcome'
export default {
  compontens: {
    hospitalDashboard,
    volunteerDashboard,
    hospitalWelcome,
    volunteerWelcome
  },
  data: () => ({
    absolute: true,
    opacity: 0.9,
    processDone: false
  }),
  middleware: ['authenticated'],
  computed: {
    getDashboard() {
      return this.$store.state.role === 'volunteer'
        ? volunteerDashboard
        : hospitalDashboard
    },
    getWelcome() {
      return this.$store.state.role === 'volunteer'
        ? volunteerWelcome
        : hospitalWelcome
    },
    isNew() {
      // for volunteer
      return this.$store.state.showWelcome
    }
  }
}
</script>
