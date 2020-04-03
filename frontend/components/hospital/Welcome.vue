<template>
  <div>
    <v-stepper v-model="current" light>
      <template>
        <v-stepper-header>
          <template v-for="n in steps">
            <v-stepper-step
              :key="`${n}-step`"
              :complete="current > n"
              :step="n"
            >
              Step {{ n }}
            </v-stepper-step>

            <v-divider v-if="n !== steps" :key="n"></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
            <v-card
              class="mb-5"
              max-width="400"
              align="center"
              color="grey lighten-3"
              elevation="0"
            >
              <!-- Karte 1 -->
              <v-card-text v-if="current === 1">
                <p class="display-1 text--primary">
                  Willkommen Krankenhaus bei Hospitally!
                </p>
                <div class="text--primary">
                  Wir freuen uns, dass Sie einen Teil zur Bekämpfung der
                  Coronakrise beitragen wollen!
                </div>
              </v-card-text>

              <!-- Karte 2 -->
              <v-card-text v-if="current === 2">
                <p class="display-1 text--primary">
                  Bitte ergänzen Sie Ihre Informationen:
                </p>
                <v-form :lazy-validation="lazy" class="formContainer">
                  <!-- Personal Data -->
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        label="Name*"
                        required
                        @input="validate()"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="number"
                        :rules="numberRules"
                        label="Telefonnummer*"
                        required
                        @input="validate()"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <!-- Qualifikationen -->
                  <v-row>
                    <v-col cols="12">
                      <v-combobox
                        v-model="select"
                        :items="items"
                        label="Qualifikationen"
                        multiple
                        chips
                      >
                        <template v-slot:selection="data">
                          <v-chip
                            :key="JSON.stringify(data.item)"
                            v-bind="data.attrs"
                            :input-value="data.selected"
                            :disabled="data.disabled"
                            @click:close="data.parent.selectItem(data.item)"
                          >
                            {{ data.item }}
                          </v-chip>
                        </template>
                      </v-combobox>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>

              <!-- Karte 3 -->
              <v-card-text v-if="current === 3">
                <p class="display-1 text--primary">
                  Wie geht es weiter?
                </p>
                <div class="text--primary">
                  Sie finden im nächsten Schritt eine Liste von
                  Stellenausschreibungen die zu Ihrem Profil passen.
                </div>
              </v-card-text>
            </v-card>
            <v-row>
              <v-col cols="auto" class="mr-auto">
                <v-btn text @click="previousStep(n)">Zurück</v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  :disabled="!valid && current === 2"
                  color="blue"
                  style="color: white"
                  @click="nextStep(n)"
                >
                  Weiter
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </template>
    </v-stepper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      steps: 3,
      valid: false,
      name: '',
      nameRules: [(v) => v !== '' || 'Name ist ein Pflichtfeld'],
      number: undefined,
      numberRules: [
        (v) => v !== undefined || 'Telefonnummer ist ein Pflichtfeld'
      ],
      // Qualification
      select: [],
      lazy: true
    }
  },
  computed: {
    qualifications() {
      return this.$store.state.qualifications
    }
  },
  watch: {
    steps(val) {
      if (this.current > val) {
        this.current = val
      }
    }
  },
  methods: {
    nextStep(n) {
      // finish process
      if (n === this.steps) {
        // set user data
        const user = this.$store.state.user
        user.name = this.name
        user.number = this.number
        user.qualifications = this.select
        // commit changes
        this.$store.commit('setUser', user)
        this.$store.commit('setShowWelcome', false)
        this.$emit('processDone')
      } else if (this.current === 2) {
        this.validate()
        this.current = this.valid ? n + 1 : n
      } else {
        this.current = n + 1
        if (this.current === 2) this.validate()
      }
    },
    previousStep(n) {
      if (n !== 1) this.current = n - 1
    },
    validate() {
      this.valid = this.name !== '' && this.number !== undefined
    }
  }
}
</script>
