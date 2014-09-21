# node-restable
[![GitHub version](https://badge.fury.io/gh/eliias%2Fnode-restable.svg)](http://badge.fury.io/gh/eliias%2Fnode-restable)
[![Build Status](https://travis-ci.org/eliias/node-restable.svg?branch=master)](https://travis-ci.org/eliias/node-restable)
[![Coverage Status](https://img.shields.io/coveralls/eliias/node-restable.svg)](https://coveralls.io/r/eliias/node-restable)
[![Dependency Status](https://david-dm.org/eliias/node-restable.svg)](https://david-dm.org/eliias/node-restable#info=dependencies)
[![Dependency Status](https://david-dm.org/eliias/node-restable/dev-status.svg)](https://david-dm.org/eliias/node-restable#info=devDependencies)
[![Code Climate](http://img.shields.io/codeclimate/github/eliias/node-restable.svg)](https://codeclimate.com/github/eliias/node-restable)

A RESTful API skeleton for node.js

## Introduction

The target of this project is to provide an upstream repository which can be forked for your own REST API projects.
It covers the most common tasks in API development. Creating models (entities), routing, resources, privileges,
versioning and client profiles.

Design goals are:

* Be reactive as defined by the [reactivemanifesto](http://www.reactivemanifesto.org/)
* No states at all (so no sessions on server)
* Scale horizontal
* Documentation is always up2date

## Resources

A resource is the business logic for a specific entity. This is a pretty generic description that might not apply to
all cases but it might give you a good understanding.

    GET /users/:id

would return a single document (for ODM) or row (for ORM) for the specific ID.

## Documentation

Keeping the documentation up 2 date is hard and it is a critical part in every API. The docs of this project are
generated automagically every time the server is started.

## Privileges

A generic ACL approach is used to handle granular privilege demands. There are two basic models you should know about.

 * resource-centric
 * object-centric

In general this means that you want to have more general rules for the whole resource. Think about creating a new user
within the users resource. This would be a resource-centric privilege check.

    POST /users

would create a new user and every "guest" should be allowed to create a user.
In comparison to that, only a user (and maybe a superuser/admin) is allowed to modify its own information.

    PUT /users/:id

This would need an object-centric approach. There is one more thing to keep in mind. How to handle different access
rights for the same object. Think about a venue that is maintained by the owner (same as the user object) but you its
staff members must be allowed to create events for a specific venue. For this kind of rules there exists a top-down
approach.

All ACL settings are declarative as it should be. No custom code necessary (In special cases you might create your own
asserts).

## Versioning

Every lifecycle of an API may contain changes and additions to the public interface. It is a good idea in general to
add versioning as early as possible. A key request to API versioning is to keep backward and forward compatibility.
Easily said, but hard to achieve. This skeleton tries to provide a generic solution to version problems.

## Profiles

Think about a reduced response for mobile devices or a deeply nested entity to reduce number of requests. This can be
achieved in two ways. Provide an **extend** parameter which specifies the branches to extend and/or set the **depth**
parameter.

## Query Language

A powerful URL driven query toolkit can be quite effective when using an API. It prevents you from writing "custom"
code for specific demands. This skeleton using an OData specification to add QL support.

    GET /users?filter=name LK 'My Nam...' AND email EQ 'box@mail.com'&order=name,-email

## SSL

Node.js provide you with an easy way to use certificates to secure your application traffic. In this
app we have created a self-signed certificate for you (to prevent bootstrap time), but you should never
use this certificate anywhere else than in your production environment.

    key: fs.readFileSync('./keys/key.pem'),
    cert: fs.readFileSync('./keys/cert.pem')

    // Create your own self-signed certificate
    openssl genrsa 4096 > api.dev.key
    openssl req -x509 -new -key api.dev.key > api.dev.cert

## Fixtures

In order to create useful fixtures for your API, you should use testdate or create data on your own.
I have used [json-generator](http://www.json-generator.com/) for this project.

## References

* [RESTful webservices with node.js](http://de.slideshare.net/FDConf/writing-restful-web-services-using-nodejs)
* [RESTful Best Practice](https://s3.amazonaws.com/tfpearsonecollege/bestpractices/RESTful+Best+Practices.pdf)
* [OData URI Conventions](http://www.odata.org/documentation/odata-v2-documentation/uri-conventions/)

## Releases

- 0.0.1 Upgrade express.js to 4.x
- 0.0 Project start
