<template>
  <v-dialog v-model="dialog" width="800px">
    <v-card>
      <v-card-title class="blue lighten-2">
        Stelle ausschreiben
      </v-card-title>
      <v-form>
        <v-row class="mx-2">
          <v-col cols="6">
            <v-text-field
              v-model="newVacancy.title"
              label="Title"
              prepend-icon="mdi-top"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="newVacancy.description"
              label="Beschreibung"
              prepend-icon="mdi-text"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mx-2">
          <v-col cols="6">
            <v-text-field
              v-model="newVacancy.pay"
              label="Entlohnung"
              prepend-icon="mdi-cash"
              required
            ></v-text-field>
          </v-col>
          <!-- Contact person -->
          <v-col cols="6">
            <v-autocomplete
              v-model="chosenContacts"
              :items="contactPeople"
              chips
              label="Kontaktperson"
              item-text="name"
              item-value="name"
              prepend-icon="mdi-email"
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="chosenContacts = []"
                >
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="data.item.group"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
          <!-- Qualification -->
          <v-col cols="12">
            <v-select
              v-model="sel_qualifications"
              :items="qualifications"
              :menu-props="{ maxHeight: '400' }"
              label="Qualification"
              multiple
              hint="Qualification"
              persistent-hint
            ></v-select>
          </v-col>
        </v-row>

        <v-row class="mx-2">
          <v-col cols="12" sm="10" md="8">
            <p style="color: grey; margin-left: 36px">für Tage:</p>
            <v-range-slider
              v-model="chosenDays"
              prepend-icon="mdi-calendar"
              :tick-labels="weekdays"
              min="0"
              max="6"
              ticks="always"
              tick-size="2"
            >
            </v-range-slider>
          </v-col>
        </v-row>

        <v-row align="center" class="mx-2">
          <v-col cols="8" sm="4">
            <v-select
              v-model="startTime"
              prepend-icon="mdi-clock"
              :items="times"
              label="Von"
            ></v-select>
          </v-col>
          <v-col cols="4" sm="2" style="font-size: 12px">Uhr</v-col>
          <v-col cols="8" sm="4">
            <v-select
              v-model="endTime"
              prepend-icon="mdi-clock"
              :items="times"
              label="Bis"
            ></v-select>
          </v-col>
          <v-col cols="4" sm="2" style="font-size: 12px">Uhr</v-col>
        </v-row>
      </v-form>
      <v-card-actions class="mx-3 pb-5">
        <v-btn outlined color="blue" @click="$emit('closeDialog')"
          >Abbrechen</v-btn
        >
        <v-spacer />
        <v-btn color="blue" dark @click="addVacancy()">Speichern</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import consola from 'consola'
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    dialogProp: Boolean
  },
  data: () => ({
    dialog: false,
    weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    chosenDays: [0, 4],
    startTime: 8,
    endTime: 16,
    newVacancy: {
      title: undefined,
      description: undefined,
      pay: undefined
    },
    chosenContacts: [],
    contactPeople: [],
    qualifications: [],
    sel_qualifications: []
  }),
  computed: {
    times() {
      return [...Array(24).keys()]
    },
    getDays() {
      return (
        this.weekdays[this.chosenDays[0]] +
        '-' +
        this.weekdays[this.chosenDays[1]]
      )
    },
    getTimes() {
      return this.startTime + ' Uhr - ' + this.endTime + ' Uhr'
    },
    getQualifications() {
      const selectedQualifications = []
      for (const quali of this.sel_qualifications)
        selectedQualifications.push(this.qualifications[quali].text)
      return selectedQualifications
    }
  },
  watch: {
    dialogProp() {
      this.dialog = this.dialogProp
    },
    dialog() {
      if (this.dialog === false) this.$emit('closeDialog')
    }
  },
  mounted() {
    this.qualifications = this.$store.state.qualifications
  },
  methods: {
    remove(item) {
      const index = this.chosenContacts.indexOf(item.name)
      if (index >= 0) this.chosenContacts.splice(index, 1)
    },
    addVacancy() {
      const ref = this.$fireStore
        .collection('hospitals')
        .doc(this.$store.state.user.uid)

      ref
        .collection('vacancies')
        .doc()
        .set({
          title: this.newVacancy.title,
          description: this.newVacancy.description,
          days: this.getDays,
          times: this.getTimes,
          pay: this.newVacancy.pay,
          contactPeople: this.contactPeople,
          qualifications: this.getQualifications
        })
        .then((response) => {
          this.$emit('success')
        })
        .catch((e) => {
          consola.error(e)
        })
      this.dialog = false
    }
  }
}
</script>
