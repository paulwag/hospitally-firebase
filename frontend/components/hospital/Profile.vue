<template>
  <div>
    <v-card max-width="500" class="mx-auto mt-8 cardContainer">
      <v-card-title class="pl-0">Krankenhausprofil</v-card-title>
      <v-form
        ref="form"
        v-model="valid"
        :lazy-validation="lazy"
        class="formContainer"
      >
        <!-- Personal Data -->
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="hospital.name"
              label="Name"
              required
              readonly
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="hospital.adress"
              :rules="streetRules"
              label="Straße und Hausnr."
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-list class="px-2 py-4">
          <p class="mb-0 blue--text darken-3">Kontaktpersonen</p>
          <v-list-item
            v-for="person in hospital.contactPeople"
            :key="person.name"
          >
            <v-list-item-title>{{ person.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ person.email }}</v-list-item-subtitle>
            <v-list-item-action>
              <v-icon
                @click="
                  hospital.contactPeople.splice(
                    hospital.contactPeople.indexOf(person),
                    1
                  )
                "
                >mdi-close</v-icon
              >
            </v-list-item-action>
          </v-list-item>
          <!-- add contacts -->
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn color="blue" dark v-on="on"
                  ><v-icon>mdi-plus</v-icon></v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Neue Kontaktperson</span>
                </v-card-title>
                <v-card-text>
                  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="newContactPerson.name"
                          label="Name*"
                          :rules="nameRules"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="newContactPerson.email"
                          label="Email*"
                          :rules="emailRules"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                  <small>*benötigte Felder</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false"
                    >Schließen</v-btn
                  >
                  <v-btn
                    :disabled="!valid"
                    color="blue darken-1"
                    text
                    @click="addPerson()"
                    >Hinzufügen</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-list>
      </v-form>
      <v-card-actions class="px-2">
        <v-btn outlined color="blue">Abbrechen</v-btn>
        <v-spacer />
        <v-btn dark color="blue">Speichern</v-btn>
      </v-card-actions>
    </v-card>

    <!-- add contact -->
  </div>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    valid: true,
    streetRules: [(v) => !!v || 'Anschrift ist ein Pflichtfeld'],
    // rules for contact person
    nameRules: [(v) => !!v || 'Name ist ein Pflichtfeld'],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail ist ein Pflichtfeld',
      (v) => /.+@.+\..+/.test(v) || 'bitte geben Sie eine gültige E-mail ein'
    ],
    zip: '',
    zipRules: [
      (v) => !!v || 'Postleitzahl ist Pflichteingabe!',
      (v) =>
        (v && v.length === 5) || 'Bitte geben Sie eine gültige Postleitzahl ein'
    ],
    // Contact Personal
    newContactPerson: {
      name: '',
      email: ''
    },
    lazy: false,
    hospital: undefined
  }),
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.passwordRepeat ||
        'Passwörter müssen übereinstimmen'
    }
  },
  mounted() {
    this.hospital = this.$store.state.user
  },
  methods: {
    register() {
      const dummy = {
        name: 'Dummy User',
        role: 'Admin'
      }
      if (this.valid) {
        // here user request
        this.$store.commit('setUser', dummy)
        // here set token for further verification
        this.$router.push('/')
      } else {
        this.error = 1
      }
    },
    addPerson() {
      this.contactPeople.push(this.newContactPerson)
      this.newContactPerson = {}
      this.dialog = false
    }
  }
}
</script>

<style lang="sass" scoped>
.cardContainer
  padding: 20px 5%
  width: 90%
</style>
