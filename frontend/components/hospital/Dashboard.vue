<template>
  <v-container>
    <v-toolbar
      class="toolbarStyle mt-5"
      max-width="800"
      color="blue lighten-5"
      fluid
    >
      <v-toolbar-title>Ausgeschriebene Stellen</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon
        :color="displaySearch ? 'blue' : ''"
        class="mx-1"
        @click="setManipulation('search')"
        >mdi-magnify</v-icon
      >
      <v-icon
        :color="displayFilter ? 'blue' : ''"
        class="mx-1"
        @click="setManipulation('filter')"
        >mdi-filter</v-icon
      >
      <v-icon
        :color="displaySort ? 'blue' : ''"
        class="mx-1"
        @click="setManipulation('sort')"
        >mdi-sort</v-icon
      >
    </v-toolbar>
    <v-container class="manipulationContainer">
      <component
        :is="manipulationComponent"
        @input="setInput($event)"
      ></component>
    </v-container>

    <VacancyList :list="searchResults" />

    <v-btn
      bottom
      color="cyan darken-1"
      dark
      fab
      fixed
      right
      @click="dialog = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <!-- Stelle erstellen Dialog -->
    <VacancyDialog
      :dialog-prop="dialog"
      type="new"
      @closeDialog="dialog = false"
    />
  </v-container>
</template>

<script>
import VacancyList from '@/components/hospital/VacancyList'
import VacancyDialog from '@/components/hospital/VacancyDialog'
import SearchComponent from '@/components/volunteer/manipulateResults/searchComponent'
import FilterComponent from '@/components/volunteer/manipulateResults/filterComponent'
import SortComponent from '@/components/volunteer/manipulateResults/sortComponent'
export default {
  components: {
    VacancyDialog,
    VacancyList,
    SearchComponent,
    FilterComponent,
    SortComponent
  },
  data: () => ({
    dialog: false,
    vacancies: [],
    displaySearch: false,
    displaySort: false,
    displayFilter: false,
    search: '',
    sort: '',
    filter: []
  }),
  computed: {
    searchResults() {
      return this.vacancies.filter((element) =>
        element.title.includes(this.search)
      )
    },
    manipulationComponent() {
      if (this.displaySearch) return SearchComponent
      else if (this.displaySort) return SortComponent
      else if (this.displayFilter) return FilterComponent
      else return ''
    }
  },
  mounted() {
    this.$fireStore
      .collection('hospitals')
      .get()
      .then((data) => {
        for (const doc of data.docs) {
          doc.ref
            .collection('vacancies')
            .get()
            .then((vacancyResponse) => {
              for (const vacancy of vacancyResponse.docs) {
                const vacancyObj = vacancy.data()
                vacancyObj.opened = false
                vacancyObj.uid = vacancy.id
                // get applicants
                vacancyObj.applicantRefs = []
                vacancy.ref
                  .collection('applicants')
                  .get()
                  .then((applicantResponse) => {
                    for (const applicant of applicantResponse.docs)
                      vacancyObj.applicantRefs.push(applicant.data().ID)
                  })
                this.vacancies.push(vacancyObj)
              }
            })
        }
      })
  },
  methods: {
    setManipulation(manipulation) {
      this.displaySearch = manipulation === 'search' && !this.displaySearch
      this.displaySort = manipulation === 'sort' && !this.displaySort
      this.displayFilter = manipulation === 'filter' && !this.displayFilter
    },
    setInput(input) {
      if (this.displaySearch) this.search = input
      else if (this.displaySort) this.sort = input
      else if (this.displayFilter) this.filter = input
    }
  }
}
</script>

<style lang="sass" scoped>
p
  margin-bottom: 0
.subheaderStyle
  font-size: 20px
  margin-top: 40px
  magin-bottom: 20px
  color: #2196F3
.listItem
  cursor: pointer
  box-shadow: 5px 5px 10px rgba(0,0,0,.2)
  border-radius: 20px
.topicTitle
  margin-bottom: 0
  font-style: italic
  font-size: 12px
  font-weight: bold
.manipulationContainer
  padding-left: 20%
  max-width: 800px
  text-align: right
  margin-bottom: -10px
@media (min-width: 850px)
  .manipulationContainer
    width: 460px
    margin-left: 340px
    margin-top: 20px
    padding: 0
</style>
