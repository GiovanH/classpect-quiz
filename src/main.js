import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n.js'


const reactivableStoreData = {}
const reactivableStore = new Proxy(reactivableStoreData, {
  set(target, key, value) {
    if (value === undefined) {
      localStorage.removeItem(key)
      try { delete reactivableStoreData[key] } catch {  }
      return true
    } else {
      localStorage.setItem(key, JSON.stringify(value))
      reactivableStoreData[key] = value
      return true
    }
  },
  get(target, key) {
    if (typeof key == 'symbol') return reactivableStoreData[key]
    const v = localStorage.getItem(key)
    return v === null ? v : JSON.parse(v)
  }
})

const app = createApp(App)

app.mixin({
  data() {
    return {
      Store: reactivableStore
    }
  }
})

app.use(i18n)
app.mount('#app')
