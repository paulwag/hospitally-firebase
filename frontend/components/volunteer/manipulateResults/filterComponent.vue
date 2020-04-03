<template>
  <div class="searchArea">
    <v-select
      v-model="select"
      dense
      class="filterInput"
      label="Filter
      "
      :items="items"
      multiple
    >
      <template v-slot:selection="{ item, index }">
        <v-chip v-if="index === 0">
          <span>{{ item }}</span>
        </v-chip>
        <span v-if="index === 1" class="grey--text caption"
          >(+{{ select.length - 1 }} others)</span
        >
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  data: () => ({
    select: [],
    items: ['Bezahlt', '', 'Vue', 'Vuetify']
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
