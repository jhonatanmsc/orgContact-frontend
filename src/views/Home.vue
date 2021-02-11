<template>
  <MainLayout>
    <v-card>
      <v-card-title>
        Contatos
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
      ></v-data-table>
    </v-card>
  </MainLayout>
</template>
<script>
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
      headers: [
        {
          text: 'Domínio',
          align: 'start',
          sortable: false,
          value: 'organization',
        },
        { text: 'Emails', value: 'emails' },
      ],
      desserts: [
        {
          orgnization: 'Frozen Yogurt',
          emails: [],
        },
        
      ],
    }
  },
  mounted(){
    api.get(`?access_token=${localStorage.getItem('accessToken')}&unique_id=${localStorage.getItem('uniqueId')}`, {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        console.log(res.data.accounts)
        this.desserts = res.data.accounts.map(contact => {
          return {
            organization: contact.organization,
            emails: contact.emails.join(', ')
          }
        })
      })
      .catch(err => alert(err))
  },
  methods: {
    doneTask(id) {
      let task = this.tasks.filter(task => task.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },
    addTask() {
      let newTask = {
        id: Date.now(),
        title: this.newTaskTitle,
        done:false
      }
      this.tasks.push(newTask);
      this.newTaskTitle = '';
    }
  }
}
</script>