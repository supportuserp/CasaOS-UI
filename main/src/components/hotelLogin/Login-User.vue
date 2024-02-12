<template>
  <v-app>
    <v-card flat>
      <v-toolbar color="primary" flat outlined>
        <v-toolbar-title class="white--text">Log in to your account</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn class="white--text" icon @click.native="$emit('close');">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-form ref="authentication" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="email" :rules="emailRules" required placeholder="Email"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="password" :rules="passRules" type="password" placeholder="Password"
                required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn :disabled="!valid" depressed color="primary" @click="loginUser">
                Log in
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
    <v-snackbar v-model="snackbar.visible" :timeout="snackbar.timeout" :top="snackbar.position === 'top'"
      :color="snackbar.color">
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar.visible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>

import { hotelApi } from "@/service/hotel/httpClient";
import colors from 'vuetify/lib/util/colors';
import storageInfo from '@/service/hotel/storage';
import globalConstants from '@/metaData/globalConstants';

export default {
  name: "loginUser-page",
  data: () => ({
    snackbar: {
      visible: false,
      text: null,
      position: "top",
      timeout: 3000,
      color: null,
    },
    valid: true,
    password: '',
    passRules: [
      v => !!v || 'Please enter password.',
    ],
    email: '',
    emailRules: [
      v => !!v || 'Please enter email address.',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),

  methods: {
    async loginUser() {
      const url = `${globalConstants.HOTEL_API_URL}/login/checklogin`;
      const loginDetails = {
        pass: this.password,
        uname: this.email
      }
      const userInfo = await hotelApi.post(
        url, loginDetails
      ).catch(() => {
        this.snackbar = {
          visible: true,
          text: "Username or Password error!",
          position: "top",
          timeout: 3000,
          color: colors.orange.darken1,
        };
      });
      if (userInfo.data.authToken) {
        storageInfo.setStorageByKey("hotel_access_token", userInfo.data.authToken);
        this.$emit('close');
        this.$router.push("/dashboard");
      }
      else {
        this.snackbar = {
          visible: true,
          text: userInfo.data.msg,
          position: "top",
          timeout: 3000,
          color: colors.red.accent2,
        };
      }
    },
  }
}
</script>

<style>
.v-application--wrap {
  min-height: unset;
}

.theme--light.v-application {
  background: unset;
}
</style>