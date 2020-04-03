<template>
  <div class="searchArea">
    <v-select :items="items" label="Sortieren"></v-select>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: ['Sortieren 1', 'Sortieren 2', 'Sortieren 3']
  }),
  computed: {
    searchString() {
      return this.search.toLowerCase()
    }
  },
  watch: {
    search() {
      this.$emit('input', this.searchString)
    }
  }
}
</script>

<style lang="sass" scoped>
.filterInput
  position: relative
  top: 10px
  margin-bottom: -10px
</style>
