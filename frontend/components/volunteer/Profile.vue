<template>
  <v-card max-width="500" class="mx-auto mt-8 cardContainer">
    <v-card-title class="pl-0">Profil</v-card-title>
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
            v-model="user.name"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="user.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Qualifikationen -->
      <v-row>
        <v-col cols="12">
          <v-combobox
            v-model="select"
            :items="qualifications"
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
                <v-avatar
                  class="accent white--text"
                  left
                  v-text="data.item.slice(0, 1).toUpperCase()"
                ></v-avatar>
                {{ data.item }}
              </v-chip>
            </template>
          </v-combobox>
        </v-col>
      </v-row>
    </v-form>
    <v-card-actions class="px-2">
      <v-btn outlined color="blue">Abbrechen</v-btn>
      <v-spacer />
      <v-btn dark color="blue" @click="save()">Speichern</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {},
  data: () => ({
    user: {},
    valid: true,
    nameRules: [(v) => !!v || 'Name ist ein Pflichtfeld'],
    emailRules: [
      (v) => !!v || 'E-mail ist ein Pflichtfeld',
      (v) => /.+@.+\..+/.test(v) || 'bitte geben Sie eine gültige E-mail ein'
    ],
    // Qualification
    select: [],
    lazy: false
  }),
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.passwordRepeat ||
        'Passwörter müssen übereinstimmen'
    },
    qualifications() {
      return this.$store.state.qualifications
    }
  },
  mounted() {
    this.user = this.$store.state.user
    this.select = this.$store.state.user.qualifications
  },
  methods: {
    save() {
      // save user
    }
  }
}
</script>

<style lang="sass" scoped>
.cardContainer
  padding: 20px 5%
  width: 90%
</style>
