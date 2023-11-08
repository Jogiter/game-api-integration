import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
  // handle error, e.g. report to a service
  console.log(err, instance, info);
}

app.mount('#app')