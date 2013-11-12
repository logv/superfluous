superfluous
===========

*superfluous* is a node.js app & component server. at its core, it deals
with how the server & client communicate in today's modern app environment.

there are two major parts of communication during the app cycle. The initial
delivery, and subsequent interactions. superfluous connects the two :-D

## Quick Start

### 0) get it running

    git clone superfluous.git

    # install node (>= 0.8) and mongo-db

    # get the code and dependencies for superfluous
    cd superfluous/superfluous
    npm install

    # start the server with the dev environment for
    # localhost
    ENV=localhost nodemon app.js

    # visit http://localhost:3300

### 1) hack away

    vim superfluous/app/controllers/home/server.js

## Fundamentals

See the guide [locally](http://localhost:3300) or [online](http://sf.nicsho.es)

## built with <3 on

* [backbone](http://backbonejs.org)
* [underscore](http://underscorejs.org)
* [passport](http://passportjs.org)
* [express](http://expressjs.com)
* [node.js](http://nodejs.org)

