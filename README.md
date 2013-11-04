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

    # helper for restarting the server when js files change
    npm install -g nodemon

    # copy and edit your config
    cp config/config.js config/local/my_dev_env.js

    # start the server with the dev environment
    ENV=local/my_dev_env nodemon app.js


    # visit http://localhost:3000

### 1) hack away

    vim superfluous/app/controllers/home/server.js

## Fundamentals

### 0) Routes

routes.json holds a dictionary of routes that the server will be handling.
Routes are URL handling functions that create an app or HTML page and send
them to the client.

Each route is hooked up to a controller that controls the inner workings of
that URL and its sub URLs.

For example:

    {
      "/users" : "users"
    }

specifies that the *users* controller will be handling the route "/users". Any
urls matching "/users\*" will be handed to the *users* controller.


### 1) Controllers

Every controller has at least two files: server.js and client.js. These are
responsible for handling the server / client side of the communication,
respectively.

Inside each controller's server definition, *routes* and *post_routes* maps
URLs to function handlers for those routes, when they are retrieved off the
server.

#### An Example Controller Definition:

    var HomeController = {
      routes: {
        "" : "index",
        "/list" : "index",
      },
      post\_routes: {
        "/add" : "add",
        "/remove" : "remove"
      },
      get_index: function() { },
      post_add: function() { },
      post_remove: function() { },
    }

The server side handlers use the core libraries for *pages*, *components* and
*templates* to send a fully constructed app down to the client. This app will
run *client.js* and maintain communication with *server.js* through sockets.

### 2) Templates & Components

Templates are used to lay out page content and dynamic components. Inside each
server handler, the page will be rendered as a template that contains one or
more components or variables.

A *component* is a set of html, js and less that describes a modular piece of
functionality in the app. When a component is created and rendered on the
server, it is automatically marshalled and created on the client, with the
required component libraries downloaded via the *bootloader* and *packager*.

Although, If components aren't your thing, it's fine to just use *templates* &
*partials* to build a page :-)

### 3) Client / Bridge / Server

When the app creates or renders components on the client or server, it uses the
bridge to hand instructions to the running app on the client. This allows
components that are created on the server to be properly re-instantiated on the
client, as well as maintain references to each other.

### 4) Asynchronous Delivery

We all know that today's modern apps are too impatient to wait for all the data
to come back before rendering.  That's why superfluous supports page
pipelining. Simply put, you can insert async placeholders into a page that will
get rendered into whenever all the data has come back.

The placeholder will be delivered to the client, while the data is fetched and
whenever the data is finished processing, the placeholder will be updated.

See [Facebook's note on Bigpipe](
https://www.facebook.com/notes/facebook-engineering/bigpipe-pipelining-web-pages-for-high-performance/389414033919) for more about the underlying
mechanics.


## built with <3 on

* [backbone](http://backbonejs.org)
* [underscore](http://underscorejs.org)
* [passport](http://passportjs.org)
* [express](http://expressjs.com)
* [node.js](http://nodejs.org)

