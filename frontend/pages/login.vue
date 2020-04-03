<template>
  <v-container fill-height fluid>
    <v-container ref="startContainer" class="loading">
      <v-container>
        <v-img class="minimize" src="img/Hospitally.png"></v-img>
      </v-container>
    </v-container>
    <v-row class="afterLoading mx-0" align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="blue" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <p v-if="error !== ''" class="red--text darken font-italic">
                {{ error }}
              </p>
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
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue" outlined dark @click="$router.push('/register')"
              >Registrieren</v-btn
            >
            <v-spacer />
            <v-btn
              :disabled="!valid"
              color="blue"
              class="mr-4"
              style="color: white"
              @click="login()"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    password: '',
    passwordRules: [
      (v) => !!v || 'Password ist ein Pflichtfeld',
      (v) =>
        (v && v.length >= 8) || 'Password muss mindestens 8 Zeichen lang sein'
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail ist ein Pflichtfeld',
      (v) => /.+@.+\..+/.test(v) || 'bitte geben Sie eine gültige E-mail ein'
    ],
    lazy: true,
    disappear: false,
    error: ''
  }),
  mounted() {
    setTimeout(() => {
      this.disappear = true
    }, 2500)
  },
  methods: {
    login() {
      if (this.valid) {
        this.$fireAuth
          .signInWithEmailAndPassword(this.email, this.password)
          .then((response) => {
            this.findRole(response.user.uid)
            // set show welcome to false by default
            this.$store.commit('setShowWelcome', false)
            // set login in flag
            this.$store.commit('setLogin', true)
            // navigate to home
            this.$router.push('/')
            this.error = ''
          })
          .catch((error) => {
            this.error = error
          })
      }
    },
    findRole(uid) {
      // find role -- try hospital
      this.$fireStore
        .collection('hospitals')
        .doc(uid)
        .get()
        .then((data) => {
          if (data.exists) {
            const user = data.data()
            user.uid = uid
            user.email = this.email
            this.$store.commit('setRole', 'hospital')
            this.$store.commit('setUser', user)
          }
        })
      // find role -- try volunteer
      this.$fireStore
        .collection('volunteers')
        .doc(uid)
        .get()
        .then((data) => {
          if (data.exists) {
            const user = data.data()
            user.uid = uid
            user.email = this.email
            this.$store.commit('setRole', 'volunteer')
            this.$store.commit('setUser', user)
          }
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.loading
  -webkit-animation-duration: 1s
  animation-duration: 1s
  -webkit-animation-fill-mode: both
  animation-fill-mode: both
  -webkit-animation-name: zoomIn
  animation-name: zoomIn
  top: 0
  text-align: center
  position: absolute
  top: 27vh
  width: 200px
  left: calc(50% - 100px)
  height: 0

.minimize
  -webkit-animation-duration: 1s
  animation-duration: 1s
  animation-delay: 2s
  -webkit-animation-delay: 2s
  -webkit-animation-fill-mode: both
  animation-fill-mode: both
  -webkit-animation-name: minimize
  animation-name: minimize

.moveUp
  -webkit-animation-duration: 1s
  animation-duration: 1s
  animation-delay: 2s
  -webkit-animation-delay: 2s
  -webkit-animation-fill-mode: both
  animation-fill-mode: both
  -webkit-animation-name: moveUp
  animation-name: moveUp

.afterLoading
  -webkit-animation-duration: 1s
  animation-duration: 1s
  animation-delay: 2.5s
  -webkit-animation-delay: 2.5s
  -webkit-animation-fill-mode: both
  animation-fill-mode: both
  -webkit-animation-name: fadeIn
  animation-name: fadeIn
  width: 100%

@media (min-width: 600px)
  .loading
    top: 24vh
    width: 300px
    left: calc(50% - 150px)


@keyframes zoomIn
  from
    opacity: 0
    transform: scale3d(0.3, 0.3, 0.3)

  50%
    opacity: 1

.zoomIn
  animation-name: zoomIn

@keyframes fadeIn
  from
    opacity: 0

  to
    opacity: 1

.fadeIn
  animation-name: fadeIn

@keyframes minimize
  from
    transform: translateY(0) scale(1)

  to
    transform: translateY(-220px) scale(0.4)
    -webkit-backface-visibility: hidden

.minimize
  animation-name: minimize
</style>
