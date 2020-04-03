<template>
  <v-list-item-content>
    <v-list-item-title>{{ vacancyObj.title }}</v-list-item-title>
    <v-list-item-subtitle>
      <v-row>
        <v-col :lg="vacancyObj.opened ? 12 : 6" cols="10">
          <p>{{ vacancyObj.description }}</p>
        </v-col>
      </v-row>
      <keep-alive>
        <v-row v-if="vacancyObj.opened">
          <v-col :lg="vacancyObj.opened ? 6 : 3" cols="6">
            <p class="topicTitle">Wo:</p>
            <p>{{ vacancyObj.adress }}</p>
          </v-col>
          <v-col :lg="vacancyObj.opened ? 6 : 3" cols="6">
            <p class="topicTitle">Entlohnung:</p>
            <p>{{ vacancyObj.pay === 0 ? 'keine' : vacancyObj.pay }}</p>
          </v-col>
          <v-col cols="6">
            <p class="topicTitle">Zeiten:</p>
            <p>{{ vacancyObj.times }}</p>
          </v-col>
          <v-col cols="6">
            <p class="topicTitle">Qualifikationen:</p>
            <v-chip-group column active-class="primary--text">
              <v-chip
                v-for="quali in vacancyObj.qualifications"
                :key="quali + index"
              >
                {{ quali }}
              </v-chip>
            </v-chip-group>
          </v-col>
          <v-col sm="6" cols="12">
            <v-btn color="blue" dark outlined @click.stop="$emit('contact')"
              >Kontakt anzeigen</v-btn
            >
          </v-col>
          <v-col sm="6" cols="12">
            <v-btn color="blue" dark @click.stop="sendHelpOffer()"
              >Hilfe anbieten</v-btn
            >
          </v-col>
        </v-row>
      </keep-alive>
    </v-list-item-subtitle>
  </v-list-item-content>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    vacancyObj: {
      type: Object,
      required: true
    },
    opened: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => ({
    wasCalled: false,
    applicants: []
  }),
  methods: {
    sendHelpOffer(index) {
      this.$fireStore
        .collection('hospitals')
        .doc(this.vacancyObj.hospitalID)
        .get()
        .then((hospital) => {
          hospital.ref
            .collection('vacancies')
            .doc(this.vacancyObj.uid)
            .get()
            .then((vacancy) => {
              vacancy.ref
                .collection('applicants')
                .doc(this.$store.state.user.uid)
                .set({
                  ref: this.$fireStore
                    .collection('volunteers')
                    .doc(this.$store.state.user.uid)
                })
            })
        })
    }
  }
}
</script>
