var html = require('choo/html')
var devtools = require('choo-devtools')
var choo = require('choo')
const axios = require('axios');

var app = choo()
app.use(devtools())
app.route('/', mainView)
app.mount('body')
app.use(loadPublicProfile) 

const profiles = {homer: {url: 'https://homersimpson.hashbase.io/public.json'}}

function fetchProfile(id) {
  return axios.get(profiles[id].url) 
} 

function mainView (state, emitter) {
  if(!state.profile) 
    return `<body><h1>Loading...</h1> </body> `

  return html`
    <body>
    <h1>My name is: ${state.profile.firstName} ${state.profile.lastName} </h1>
    <p> ${state.profile.occupation} </p> 
    <img src='${state.profile.profilePicture}'/>  
    <p> Tagline: ${state.profile.tagline}</p> 
    </body>
    `
}

function loadPublicProfile (state, emitter) {
	emitter.on('DOMContentLoaded', function () {
    console.log('loaded the document') 
    fetchProfile('homer').then( function(result) {
      console.log('result = ', result) 
      state.profile = result.data
      emitter.emit('render')
    })
	})
}
