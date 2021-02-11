import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

const getUrl = (urlname, args=[]) => {
  switch(urlname) {
    // Auth
    case 'login': return `login`
    case 'logout': return `logout`
    
    // Core
    case 'contacts': return `contacts`
    case 'contacts-report': return `contacts/report`
  }
}

export {api, getUrl}