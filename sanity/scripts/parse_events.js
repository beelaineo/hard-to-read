const Schema = require('@sanity/schema').default
const blockTools = require('@sanity/block-tools').default
const fs = require('fs')
const jsdom = require('jsdom')
const {JSDOM} = jsdom

// Start with compiling a schema we can work against
const defaultSchema = Schema.compile({
  name: 'mySite',
  types: [
    {
      type: 'document',
      name: 'event',
      fields: [
        {
          title: 'Text',
          name: 'text',
          type: 'array',
          of: [
            {
              title: 'Block',
              type: 'block',
              styles: [
                {title: 'Normal', value: 'normal'},
                {title: 'H1', value: 'h1'},
                {title: 'H2', value: 'h2'},
                {title: 'H3', value: 'h3'},
                {title: 'H4', value: 'h4'},
                {title: 'Quote', value: 'blockquote'},
              ],
              lists: [{title: 'Bullet', value: 'bullet'}],
              marks: {
                decorators: [
                  {title: 'Strong', value: 'strong'},
                  {title: 'Emphasis', value: 'em'},
                ],
                annotations: [
                  {
                    title: 'URL',
                    name: 'link',
                    type: 'object',
                    fields: [
                      {
                        title: 'URL',
                        name: 'href',
                        type: 'url',
                      },
                    ],
                  },
                ],
              },
            },
            {
              type: 'image',
              options: {hotspot: true},
            },
          ],
        },
      ]
    }
  ]
})

const blockContentType = defaultSchema
  .get("event")
  .fields.find(field => field.name === "text").type

let rawdata = fs.readFileSync('events_input.json')
let input = JSON.parse(rawdata)

const formattedEvents = input.map(d => formatDoc(d))

console.log(formattedEvents)

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
function formatDoc(input) {
  let themesArray = input.themes.split(",").map(item => item.trim())
  let linksArray = input.links.split(",").map(item => item.trim())

  let obj = {
    _id: 'imported-' + string_to_slug(input.slug) || undefined,
    _type: 'event',
    title: input.title || 'Untitled',
    event_type: input.event_type || 'event',
    event_program: input.event_program || '',
    date: input.date || undefined,
    end_date: input.end_date || undefined,
    start: input.start_time || undefined,
    end: input.end_time || undefined,
    timezone: input.timezone || undefined,
    action_label: input.action_label || input.action_link ? 'Link' : undefined,
    action_link: input.action_link || undefined,
    text: input.text || undefined,
    // text: blockTools.htmlToBlocks(
    //   input.text,
    //   blockContentType,
    //   {
    //     parseHtml: html => new JSDOM(html).window.document
    //   }
    // ),
    themes: themesArray.length > 0 ? themesArray.map(t => { return {_type: 'reference', _ref: 'theme_' + string_to_slug(t)} }) : undefined,
    links: linksArray.length > 0 ? linksArray.map(l => { return {_type: 'externalLink', url: l, title: l} }) : undefined,
    slug: { _type: 'slug', current: string_to_slug(input.slug) }
  }
  return JSON.stringify(obj)
} 


fs.writeFile('/Users/blaine/sites/hard-to-read/sanity/scripts/events.json', formattedEvents.toString(), err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})