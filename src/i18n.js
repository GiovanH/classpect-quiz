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

messages.en[`theme_skip`] = '(skip)'
messages.en[`picker_skip`] = '(skip)'
messages.en[`desc_skip`] = '(skip)'

messages.en['aspect_desc'] = {
  "Blood": "Established meaning, roots, connection to tradition",
  "Breath": "New meaning, novelty, disconnect from tradition",
  "Time": "Planned endings, checked growth, and fate",
  "Space": "Planned growth, development, and reproduction",
  "Light": "Answers, truth, confidence, and cognizance-of-story",
  "Void": "The ambiguous, the ill-defined, indeterminate, and unknown",
  "Doom": "Death, decay, and inevitable failure",
  "Life": "Growth, momentum, and success",
  "Heart": "Identity, personal meaning, choice, and the individual",
  "Mind": "Bigger-picture meaning determined by systems, not the self" ,
  "Rage": "Unchecked destruction and hatred of falsehood ",
  "Hope": "Unchecked growth and the creation of the fake and inexplicable",
}

messages.en['picker_instrumental'] = "Instrumentality, application"
messages.en['picker_fundamental'] = "Fundamentals, natural forces"
messages.en['picker_delinquent'] = "Subversion, mutation"

messages.en['desc_intrinsic'] = `For your own advancement. Advancing my goals advances the narrative's goals.`
messages.en['desc_extrinsic'] = `For the advancement of others. I advance the goals of others to advance the narrative's goals.`
messages.en['desc_victim'] = `For/at the advancement of the narrative. The narrative advances its goals by actively acting in my detriment.`
messages.en['desc_self'] = `For the advancement of both the self and the narrative as one. My goals and the narrative's are inseperable. We are codependent on each other.`

messages.en['desc_expand'] = "Expansion: Growth, life"
messages.en['desc_contract'] = "Contraction: Definition, limitation"


const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})

export { i18n }