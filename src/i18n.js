import { createI18n } from 'vue-i18n'

var messages = {
    'en': {}
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

import data from "./data.yaml";

Object.keys(data.aspect_pairs).forEach(theme => {
  messages.en[`theme_${theme}`] = toTitleCase(theme)
})

messages.en['aspect_desc'] = {
  "Blood": "Established meaning, connection to tradition",
  "Breath": "Novelty, new meaning, disconnect from tradition",
  "Time": "Planned endings, checked growth, and fate",
  "Space": "Planned growth, development, and reproduction",
  "Light": "Answers, truth, and cognizance-of-story",
  "Void": "The ambiguous, the ill-defined, and the unknown",
  "Doom": "Death, decay, and inevitable failure",
  "Life": "Growth, momentum, and success",
  "Heart": "Identity, personal meaning, and the individual",
  "Mind": "Bigger-picture meaning at the expense of the self" ,
  "Rage": "Unchecked destruction and hatred of falsehood ",
  "Hope": "Unchecked growth and the creation of the fake and inexplicable",
}



const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})

export { i18n }