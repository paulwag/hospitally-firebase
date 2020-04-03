<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="blue" dark flat>
            <v-toolbar-title>Registrieren</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <p v-if="error !== ''" class="red--text darken-4">{{ error }}</p>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                required
                type="password"
              ></v-text-field>

              <v-text-field
                v-model="passwordRepeat"
                :rules="[passwordRepeatRules, passwordConfirmationRule]"
                label="Password Wiederholung"
                required
                type="password"
              ></v-text-field>

              <v-checkbox
                id="dataSec"
                v-model="checkbox"
                :rules="[(v) => !!v || 'Datenschutz muss akzeptiert werden!']"
                label="Ich akzeptiere die Datenschutzrichtlinie"
                required
              ></v-checkbox>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="blue"
              class="ml-4"
              outlined=""
              @click="$router.push('/login')"
            >
              Login
            </v-btn>
            <v-spacer />
            <v-btn
              :disabled="!valid"
              color="blue"
              class="mr-4"
              style="color: white"
              @click="register()"
            >
              Registrieren
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import consola from 'consola'
export default {
  data: () => ({
    valid: true,
    error: '',
    password: '',
    passwordRules: [
      (v) => !!v || 'Password ist ein Pflichtfeld',
      (v) =>
        (v && v.length >= 8) || 'Password muss mindestens 8 Zeichen lang sein'
    ],
    passwordRepeat: '',
    passwordRepeatRules: (v) =>
      !!v || 'Passwordwiederholung ist ein Pflichtfeld',
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    checkbox: false,
    lazy: false
  }),
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.passwordRepeat ||
        'Passwörter müssen übereinstimmen'
    }
  },
  methods: {
    register() {
      if (this.valid) {
        // here user request
        this.$fireAuth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((response) => {
            // get user data
            this.$store.commit('setUser', {
              uid: response.user.uid,
              email: this.email
            })
            // createvolunteer in db
            this.createUser(response.user.uid)
            // set login in flag
            this.$store.commit('setLogin', true)
            // is new
            this.$store.commit('setShowWelcome', true)
            // set role
            this.$store.commit('setRole', 'volunteer')
            // navigate to home
            this.$router.push('/')
            this.error = ''
          })
          .catch((error) => {
            this.error = error
          })
      }
    },
    createUser(uid) {
      this.$fireStore
        .collection('volunteers')
        .doc(uid)
        .set({
          adress: '',
          name: '',
          phone_number: '',
          qualifications: [],
          email: this.email
        })
        .then((response) => {})
        .catch((e) => {
          consola.error(e)
        })
    }
  }
}
</script>
