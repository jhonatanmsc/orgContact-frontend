<template>
  <MainLayout>
    <div class="about pa-6">
      <h1>Quantidade de contatos por domínio</h1>
      <v-row
        no-gutters
      >
        <v-col md="5">
          <div id="chart">
            <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
          </div>
        </v-col>
      </v-row>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/containers/MainLayout.vue';
import {api, getUrl} from '@/services/api';

export default {
  name: 'about',
  components: {
    MainLayout
  },
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          type: 'donut',
        },
        labels: [],
        responsive: [{
          breakpoint: 200,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    }
  },
  mounted() {
    api.get(`${getUrl('contacts')}?unique_id=${localStorage.getItem('uniqueId')}`, {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        if (res.data.accounts.length > 0) {
          res.data.accounts.forEach(account => {
              this.series.push(account.emails.length);
              this.chartOptions.labels.push(account.organization);
          })
        }
      })
      .catch(err => {
        alert(err);
        router.push('/login');
      })
  }
}
</script>