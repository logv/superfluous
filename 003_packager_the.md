what is the packager, anyways?
==============================

when building a web site or application, it's important to deliver the client code
and assets to the browser in a timely fashion. 

originally, web apps were raw HTML and a collection of script tags to load
javascripts.  dependencies were managed by the ordering of the script tags.
this made people sad, because having dozens of JS modules loading over the
network is a bad thin.

so 'bundling' became popular. when bundling, many small scripts are turned into
one larger script for use in production (more on *production* later)
environments. this allows the application to load using a smaller number of
requests.

the *packager*, in common terms, is the code that figures out what assets the
client will need and distributes them into packages.

in single page apps, it is enough to just build one large package, since the
app won't run without any of its dependencies loaded, anyways.

in multi page apps, figuring out which assets exist inside which package
becomes a problem, because it doesn't make sense to distribute a massive bundle
consisting of several apps. instead, the assets should be loaded only on pages
that they are needed for. 

how good is your packager?
--------------------------

packagers can be graded along several dimensions:

* hit rate - how many modules in the package were necessary on the current page
* redundancy - how much overlap of modules are there in packages.
* cacheability - how often do package contents change? are they stable or unstable?

sometimes, *grunt* or other file build tools are confused for a packager.
that's packaging in the same way that stacking logs is building a house.
