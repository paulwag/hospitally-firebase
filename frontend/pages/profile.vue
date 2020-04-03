<template>
  <div>
    <component :is="getProfile" />
  </div>
</template>

<script>
import hospitalProfile from '@/components/hospital/Profile'
import volunteerProfile from '@/components/volunteer/Profile'
export default {
  compontens: {
    hospitalProfile,
    volunteerProfile
  },
  middleware: ['authenticated'],
  computed: {
    getProfile() {
      return this.$store.state.role === 'hospital'
        ? hospitalProfile
        : volunteerProfile
    }
  }
}
</script>
