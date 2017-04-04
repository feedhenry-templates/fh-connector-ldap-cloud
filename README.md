# FeedHenry Custom LDAP Connector
[![Dependency Status](https://img.shields.io/david/feedhenry-templates/fh-connector-ldap-cloud.svg?style=flat-square)](https://david-dm.org/feedhenry-templates/fh-connector-ldap-cloud)

The FeedHenry Custom LDAP Connector.

# Required Environment Variables

* LDAP_URL : The URL of the LDAP server (including the ldap protocol). E.g. `ldap://testing.feedhenry.com`
* DN_PREFIX: A prefix to be added before the username. E.g. `CN=`
* DN: A suffix to be added after the user name. E.g. `,CN=Roles,CN=LDAPtest,DC=feedhenry,DC=com`

# LDAP Connector API

# AUTH [/cloud/auth]

Bind against a LDAP server

## AUTH [POST]

Validate a user against a LDAP server

+ Request (application/json)

    + Body

            {
              "username": "users username",
              "password": "users password"
            }

+ Response 200 (application/json)

    + Body

            {
              "status": "ok",
              "message": "Successfully Authenticated"
            }

+ Response 401 (application/json)

    + Body

            {
              "status": "unauthorised",
              "message": {
                "dn": ""
                "code": Error Code
                "name": "The authorisation error name"
                "message": "The authorisation error message"
              }
            }

+ Response 500 (application/json)

    + Body

            {
              "status": "error",
              "message": "You need to provide a username and password."
            }
