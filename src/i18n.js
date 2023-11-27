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
  meaning: "Meaning, tradition, values",
  growth: "Growth and the natural cycle of life",
  truth: "Truth, mysteries, and relating to the unknown",
  fortune: "Fortune, prosperity, fate, and failure",
  identity: "Identity, relating the self to the world around them",
  fiction: "Fiction, falsehood, and the cultivation or destruction of novelty",
}

messages.en['classrel_alterant'] = `They <b>change and cultivate</b> `
messages.en['classrel_student'] = `They <b>are changed by</b>`
messages.en['classrel_operant'] = `They <b>use and manifest</b>`
messages.en['classrel_agent'] = `They <b>are used by</b> `
messages.en['classrel_subsumer'] = `They <b>subsume</b>`
messages.en['classrel_subsumee'] = `They <b>are subsumed by</b>`

messages.en['desc_mutualist'] = `For their own advancement. Them advancing their own goals advances the narrative's goals.`
messages.en['desc_commensalist'] = `For the advancement of others. They advance the goals of others to advance the narrative's goals.`
messages.en['desc_parasitic'] = `For/at the advancement of the narrative. The narrative advances its goals by actively acting in their detriment.`
messages.en['desc_self'] = `For the advancement of both the self and the narrative as one. Their goals and the narrative's are inseperable and they are codependent on each other.`

// Aspect pair abstraction
messages.en['tuningprompt_abstractpairs_abstraction'] = "Which is more strongly linked to them?"
messages.en['tuningdesc_abstract'] = "The abstract"
messages.en['tuningdesc_material'] = "The material"

// Aspect pair nature
messages.en['tuningprompt_aspectpairs_nature'] = "Which tends to be their focus?"

messages.en['tuningdesc_instrumental'] = "Instrumentality, application"
messages.en['tuningdesc_fundamental'] = "Fundamentals, natural forces"
messages.en['tuningdesc_delinquent'] = "Subversion, mutation"

// Aspect direction
messages.en['tuningprompt_aspect_direction'] = "In what direction are they focused?"
messages.en['tuningdesc_expand'] = "Expansion: Growth, life"
messages.en['tuningdesc_contract'] = "Contraction: Definition, limitation"

// Class nature
messages.en['tuningprompt_class_nature'] = "Which tends to be their relationship with their aspect?"
messages.en['tuningdesc_mutualist'] = messages.en['desc_mutualist']
messages.en['tuningdesc_commensalist'] = messages.en['desc_commensalist']
messages.en['tuningdesc_parasitic'] = messages.en['desc_parasitic']
messages.en['tuningdesc_self'] = messages.en['desc_self']

// Class relationships
messages.en['tuningprompt_class_rel'] = "Which tends to be their relationship with their aspect?"
messages.en['tuningdesc_student'] = "Changed by aspect in its service"
messages.en['tuningdesc_alterant'] = "Changes aspect in its service"
messages.en['tuningdesc_agent'] = "Used by aspect in its service"
messages.en['tuningdesc_operant'] = "Uses aspect in its service"
messages.en['tuningdesc_subsumer'] = "Subsumes aspect"
messages.en['tuningdesc_subsumee'] = "Subsumed by aspect"

// Classrel active/passive

messages.en['tuningprompt_classrel_activity'] = "Which tends to be their nature?"
messages.en['tuningdesc_active'] = "Active"
messages.en['tuningdesc_passive'] = "Passive"

messages.en[`tuningdesc_skip`] = '(skip)'

const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})

export { i18n }