<template id="MainLayout">
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            orgContacts
          </v-list-item-title>
          <v-list-item-subtitle>
            organizador de contatos
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      src="notepad.jpg"
      prominent
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>{{username}}</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click.stop="dialog = true"
      >
        <v-icon>mdi-power</v-icon>
      </v-btn>

      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">
            Deslogar agora?
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="info darken-1"
              text
              @click="dialog = false"
            >
              Cancelar
            </v-btn>

            <v-btn
              color="red darken-1"
              text
              @click="logout"
            >
              Sim
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script>
import {api, getUrl} from '@/services/api';
import router from '@/router';

export default {
  name: 'MainLayout',

  components: {
  },

  data: () => ({
    drawer: null,
    dialog: false,
    username: localStorage.getItem('givenName'),
    items: [
      { title: 'Resumo', icon: 'mdi-view-dashboard', to: '/' },
      { title: 'Gráficos', icon: 'mdi-chart-donut', to: '/graficos' },
    ],
  }),
  methods: {
    logout() {
      api.get(getUrl('logout'), {headers: {'Content-Type': 'application/json'}})
        .then(res => {
          router.push('/login');
        })
        .catch(err => {
          alert(err);
        })
    }
  }
};
</script>
