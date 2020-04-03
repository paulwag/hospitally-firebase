<template>
  <div class="searchArea">
    <input v-model="search" />
    <v-icon class="deleteSearch" @click="search = ''">mdi-close</v-icon>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: ''
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
.searchArea
  position: relative
  *
    display: inline
input
  height: 30px
  border: 1px solid #2196F3
  border-radius: 5px
  padding-left: 10px
  margin-left: 10px
  margin-top: 10px
.deleteSearch
  position: absolute
  top: 11px
  right: 5px
  &::after
    right: 0
</style>
