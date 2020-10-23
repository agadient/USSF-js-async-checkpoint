//given name, make a request to url 'https://pokeapi.co/api/v2/pokemon/{id or name}/'
// parse req, log type of pokemon to a file

var fs = require('fs')
var fetch = require('node-fetch')

process.argv

if (process.argv.length !== 3) {
    console.error('Invalid command line')
    throw EvalError
}

var data = fs.readFileSync(process.argv[2])

data = data.toString().split('\n').filter(name => name !== '')

data = data.map(name =>  `https://pokeapi.co/api/v2/pokemon/${name}/`)

async function getUrl(url) {
    const response = await fetch(url)
    const JSON = await response.json()
    return JSON
 
}

function printStrings(types, name) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    var type_str = `${name}: `
    for (type of types) {
        type_str += `${type.type.name}, `
    }
    console.log(type_str.slice(0, -2))
}

data.forEach(url => {
    getUrl(url)
    .then((json) => printStrings(json.types, json.name))
}); 
