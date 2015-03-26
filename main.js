var winston = require('winston');
// Display timestamps in logs
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  'timestamp': true
});

/*
 * Verify required environment variables are set
 * @param {String} : environment variable to test
 */
function validateEnvVar(envVar) {
  if (!process.env[envVar]) {
    winston.error('ERROR: Required environment variable "' + envVar + '" not defined. Please set this environment variable via the Auth Policies section.')
  }
}

validateEnvVar('LDAP_URL');

var ldap = require('ldapjs');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

/*
 * Auth route to verify if a user can authenicate against an LDAP server
 */
function auth() {
  var bind = new express.Router();
  bind.use(cors());
  bind.use(bodyParser());

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  bind.post('/', function(req, res) {
    //Must pass a username & password
    if (!req.body.username || !req.body.password) {
      return res.status(500).json({'status': 'error','message': 'You need to provide a username and password.'});
    }

    if (!process.env.LDAP_URL) {
      return res.status(500).json({'status': 'error','message': 'Required environment variable "LDAP_URL" not defined. Please set this environment variable via the Auth Policies section.'});
    }

    var client = ldap.createClient({
      url: process.env.LDAP_URL,
    });

    var DN_PREFIX = process.env.DN_PREFIX || "";
    var DN = process.env.DN || "";
    var username = DN_PREFIX + req.body.username + DN;
    var password = req.body.password

    client.bind(username, password, function(err) {
      if (err) {
        return res.status(401).json({'status': 'unauthorised','message': err});
      }
      //Unbind after each bind attempt
      client.unbind();
      return res.json({'status': 'ok','message': 'Successfully Authenticated'});
    });
  });

  return bind;
}

module.exports = auth;