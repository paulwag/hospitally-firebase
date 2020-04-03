<template>
  <v-list-item-content>
    <v-list-item-title>{{ vacancyObj.title }}</v-list-item-title>
    <v-list-item-subtitle>
      <v-row>
        <v-col :lg="vacancyObj.opened ? 12 : 6" cols="10">
          <p>{{ vacancyObj.description }}</p>
        </v-col>
        <v-col cols="12">
          <p class="topicTitle">
            Bewerber:
            {{ vacancyObj.applicantRefs.length }}
          </p>
        </v-col>
      </v-row>
      <keep-alive>
        <v-row v-if="vacancyObj.opened">
          <v-col cols="12">
            <div class="applications">
              <div
                v-for="(applicant, i) in applicants"
                :key="applicant.email"
                :class="{ last: i === applicants.length - 1 }"
                class="applicant"
              >
                <p class="name">{{ applicant.name }}</p>
                <v-chip-group column active-class="primary--text">
                  <v-chip
                    v-for="quali in applicant.qualifications"
                    :key="quali + applicant.name"
                  >
                    {{ quali }}
                  </v-chip>
                </v-chip-group>
              </div>
            </div>
          </v-col>
          <v-col :lg="vacancyObj.opened ? 6 : 3" cols="6">
            <p class="topicTitle">Wo:</p>
            <p>{{ vacancyObj.location }}</p>
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
            <v-btn color="blue" dark outlined @click.stop="openContact(index)"
              >Entfernen</v-btn
            >
          </v-col>
          <v-col sm="6" cols="12">
            <v-btn color="blue" dark @click.stop="sendHelpOffer(index)"
              >Bearbeiten</v-btn
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
      required: true
    }
  },
  data: () => ({
    wasCalled: false,
    applicants: []
  }),
  watch: {
    opened() {
      if (!this.wasCalled) {
        // get applicants for vacancy
        for (const ref of this.vacancyObj.applicantRefs)
          ref.get().then((applicant) => {
            this.applicants.push(applicant.data())
          })
        this.wasCalled = true
      }
    }
  }
}
</script>
