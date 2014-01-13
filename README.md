superfluous
===========

*superfluous* is a web framework built in node.js. it serves apps & components
to browsers and simplifies how the server & client communicate in the modern
app environment.

[![Build Status](https://travis-ci.org/logicflower/superfluous.png)](https://travis-ci.org/logicflower/superfluous)
[![NPM version](https://badge.fury.io/js/logicflower.png)](http://badge.fury.io/js/superfluous)

## Quick Start

### 0) get it running

# install node (>= 0.8)

```bash
# get the code and dependencies for superfluous
npm install -g superfluous
superfluous create my_first_app

cd my_first_app
npm install
vim package.json # edit your app name here

# start the server with the dev environment for
# localhost
ENV=localhost nodemon app.js

# visit http://localhost:3300

# get hacking
vim app/controllers/home/server.js
```

## Fundamentals

Everything needed to build your own app!

* Controllers
* Components
* Templates

See the guide [locally](http://localhost:3300) or [online](http://superfluous.io)

### Extra Features!

* pipelined page generation
* transparently marshalled components
* per request globals, aka request local storage
* socket setup & authorization
* server or client side rendering

#### ORM Not Included

## built on

* [backbone](http://backbonejs.org)
* [underscore](http://underscorejs.org)
* [express](http://expressjs.com)
* [node.js](http://nodejs.org)

## default app comes with

* [bootstrap](http://getbootstrap.com)

## Deploying To Heroku


1. create an app (`heroku apps:create my_todo_app`, for example)
2. set environment variables on heroku for the app:
  1. `heroku config:add MONGOHQ\_URL=mongodb://user:pwd@host:port/db` (you can use mongohq addon to get a mongo db instance)
  2. `heroku config:add ENV=heroku`
  3. `heroku config:add HTTPHOST=my_todo_app.herokuapp.com` (or whatever you use)
1. push everything under the superfluous directory (in particular the Procfile) to your heroku git repo. If you have git subtree, use: `git subtree push --prefix superfluous heroku master`

## Hacking on the core
    # install node (>= 0.8) and mongo-db
    git clone superfluous.git

    # get the code and dependencies for superfluous
    cd superfluous/superfluous
    npm install

    ENV=localhost nodemon app.js

    # start hacking in core/
    vim superfluous/core/server/main.js
