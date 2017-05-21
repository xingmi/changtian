var  fs = require('fs')
var  path = require('path')
var  config = {}
var  filenames = fs.readdirSync(path.join(__dirname,'/res/controllers')).filter((filename) =>{
  return /\.js$/.test(filename)
})

filenames.map((filename)=>{
  config[filename.split('.')[0]] = path.join(__dirname,'./res/controllers/' + filename);
})

module.exports = config