# FeedHenry Custom LDAP Connector

The FeedHenry Custom LDAP Connector.

# Custom LDAP Connector API

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

+ Request 200 (application/json)

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
