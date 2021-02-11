<template>
  <MainLayout>
    <v-card>
      <v-card-title>
        Contatos
        <v-btn
          icon
          color="green"
          @click.prevent="refreshContacts"
        >
          <v-icon>mdi-cached</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        :loading="loading"
        loading-text="Loading... Please wait"
      ></v-data-table>
    </v-card>
  </MainLayout>
</template>
<script>
import router from '@/router';
import MainLayout from '@/containers/MainLayout.vue';
import {api, getUrl} from '@/services/api';

export default {
  name: 'Home',
  components: {
    MainLayout
  },
  data() {
    return {
      newTaskTitle: '',
      search: '',
      loading: false,
      headers: [
        {
          text: 'Domínio',
          align: 'start',
          sortable: false,
          value: 'organization',
        },
        { text: 'Emails', value: 'emails' },
      ],
      desserts: [],
    }
  },
  mounted(){
    this.loading = true;
    api.get(`${getUrl('contacts')}?unique_id=${localStorage.getItem('uniqueId')}`, {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        if (res.data.accounts.length > 0) {
          this.desserts = res.data.accounts.map(contact => {
            return {
              organization: contact.organization,
              emails: contact.emails.join(', ')
            }
          })
        }
        this.loading = false;
      })
      .catch(err => {
        alert(err);
        router.push('/login');
      })
  },
  methods: {
    refreshContacts() {
      this.loading = true;
      api.get(`${getUrl('refresh-contacts')}?unique_id=${localStorage.getItem('uniqueId')}&access_token=${localStorage.getItem('accessToken')}`, {headers: {'Content-Type': 'application/json'}})
        .then(res => {
          if (res.data.accounts.length > 0) {
            this.desserts = res.data.accounts.map(contact => {
              return {
                organization: contact.organization,
                emails: contact.emails.join(', ')
              }
            })
          }
          this.loading = false;
        })
        .catch(err => {
          alert(err);
        })
    }
  }
}
</script>