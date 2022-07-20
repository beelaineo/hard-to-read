const fs = require('fs')

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaaeeeeiiiioooouuuunc------";

  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
}
function docFromString(string) {
  let obj = {}
  obj._id = 'theme_' + string_to_slug(string)
  obj._type = 'theme'
  obj.title = string
  obj.slug = { _type: 'slug', current: string_to_slug(string) }
  return obj
} 

const themes = ["art", "comedy", "gender", "fashion", "pleasure", "coming of age", "family", "gentility", "virality", "gossip", "eros", "errors", "catharsis", "human folly", "failure", "interdependence", "gay", "texture", "form", "lambda", "news media", "water", "decay", "apocalypse", "horniness", "crisis", "privacy", "covid", "housework", "quarantine", "performance", "publicity", "noise", "space", "violence", "spatial politics", "animals", "radio", "revolution", "poetry", "communion", "kids", "class", "sexuality", "the commons", "brexit", "excavation", "regeneration", "consecration", "disappearance", "conspiracy", "legacy", "film", "sex", "love", "los angeles", "cities", "tokyo", "scifi", "future", "new york", "hypercapitalism", "domesticity", "architecture", "business", "leisure", "work", "rest", "song", "fanny howe", "mysticism", "race", "health", "accessibility", "writing", "labor", "industry", "disco", "dance", "music", "fan", "networks", "reading is over", "intimacy", "language as a tool", "comfort", "home", "coming out", "porn", "partnership", "fuck", "environment", "earth", "lesbian", "athletics", "wetness", "shame", "ambition", "internet", "mental wellness", "sensousness", "madness", "crazy", "angry", "masculinity", "communists", "community", "body language", "physicality", "loneliness", "americana", "voice", "processing", "freedom", "dicks", "happiness", "beauty", "bilingual", "activisms", "astrology", "friendship", "trouble", "expansion", "relaxation", "canada", "abuse", "power", "awakening", "pillows", "kathy acker", "intelligence", "cosmic", "it girls", "butterflies"]

console.log(themes.map(t => docFromString(t)))

const content = JSON.stringify(themes.map(t => docFromString(t)))

fs.writeFile('/Users/blaine/sites/hard-to-read/sanity/scripts/themes.json', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})