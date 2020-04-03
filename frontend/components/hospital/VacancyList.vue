<template>
  <div>
    <v-list max-width="800" three-line>
      <template v-for="(item, index) in list">
        <v-subheader
          v-if="item.header"
          :key="item.header + index"
          class="subheaderStyle"
          v-text="item.header"
        ></v-subheader>

        <v-list-item
          v-else
          :key="item.title + index"
          class="listItem my-5"
          :ripple="false"
          @click.stop="item.opened = !item.opened"
        >
          <Vacancy :vacancy-obj="item" :opened="item.opened" :index="index" />
        </v-list-item>
      </template>
    </v-list>

    <!-- contact modal -->
    <v-row justify="center">
      <v-dialog v-model="dialog1" max-width="290">
        <v-card>
          <v-card-title class="headline">Kontakt</v-card-title>

          <v-card-text>
            <p class="font-weight-bold">
              Kontaktperson:
            </p>
            <p></p>
            <p class="font-weight-bold">
              Email:
            </p>
            <p></p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog1 = false">
              Schließen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- help confirm modal -->
    <v-row justify="center">
      <v-dialog v-model="dialog2" max-width="290">
        <v-card>
          <v-card-title class="headline">Vielen Dank!</v-card-title>

          <v-card-text>
            <p>
              Wir haben Ihre Kontaktdaten an das Krankenhaus weitergegen!
            </p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog2 = false">
              Schließen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import Vacancy from './Vacancy'
export default {
  components: {
    Vacancy
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    dialog1: false,
    dialog2: false,
    newVacancy: {
      title: '',
      description: '',
      pay: '',
      times: ''
    },
    chosenContact: 0,
    chosenContacts: [],
    contactPeople: [
      { header: 'Group 1' },
      { name: 'Sandra Adams', group: 'Group 1' },
      { name: 'Ali Connors', group: 'Group 1' },
      { name: 'Trevor Hansen', group: 'Group 1' },
      { name: 'Tucker Smith', group: 'Group 1' },
      { divider: true },
      { header: 'Group 2' },
      { name: 'Britta Holt', group: 'Group 2' },
      { name: 'Jane Smith ', group: 'Group 2' },
      { name: 'John Smith', group: 'Group 2' },
      { name: 'Sandra Williams', group: 'Group 2' }
    ]
  }),
  methods: {
    remove(item) {
      const index = this.chosenContacts.indexOf(item.name)
      if (index >= 0) this.chosenContacts.splice(index, 1)
    },
    openContact(index) {
      this.dialog1 = true
      this.chosenContact = index
    },
    sendHelpOffer(index) {
      this.dialog2 = true
      this.chosenContact = index
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
.applicant
  width: 300px
  padding: 5px
  margin-bottom: 5px
  margin-left: 0px
  border-bottom: 1px solid lightgrey
  .name
    font-weight: bold
.last
  border-bottom: none
</style>
