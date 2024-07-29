<h1>LINK TO YOUTUBE VIDEO: https://www.youtube.com/watch?v=u27xHZN2Gus </h1>
<h1>Steps to Push Code in Github into Production</h1>
<ol> 
  <li>Ensure IDE is in sync with main on github repo</li>
  <li>Create a heroku account</li>
  <li>Sign into heroku and link github account with heroku account</li>
  <li>Select New App on Heroku and follow the steps</li>
  <li>Within heroku app, select Heroku Git deployment method and follow the listed steps to link git repo to heroku</li>
  <li>Make sure latest version of angular cli is present, run following commands: npm install @angular/cli@latest --save-dev and npm install @angular/compiler-cli --save-dev</li>
  <li>In package.json, copy "@angular/cli": x.x.x" and "@angular/compiler-cli": "^x.x.x" and "typescript":"~x.x.x" from devDependencies to depencies</li>
  <li>Within package.json again, under scripts add the command "heroku-postbuild": "ng build --prod"</li>
  <li>Add node and npm engines to package.json by adding: "engines": {
    "node": "xx.x.x",
    "npm": "x.x.x"
  }</li>
  <li>install express to application by running command: npm install express path --save</li>
  <li>create new file server.js and input following code: const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/eezee-meals'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+'/dist/eezee-meals/index.html'));});
app.listen(process.env.PORT || 8080);
</li>
  <li>in package.json, change the start command under scripts from "ng serve" to "node server.js"</li>
  <li>push changes to git repo main</li>
  <li>add heroku as a remote repo by running code: heroku git:remote -a eezeemeals</li>
  <li>run command: git push heroku main</li>
  <li>Application is successfully deployed to heroku</li>
</ol>

