streaming (or chunked) XHR
==========================

streaming XHR is the ability to flush data down an XHR pipe multiple times and
have the browser actually let you use the data as it comes in. most web apps
won't use streaming XHR, because they don't know any better.

some ways of using streaming XHR:

page pipelining
---------------

do you ajax in new HTML to save time? does it take a while? you should probably break that work up into chunks and stream it down.


data streaming
--------------

for fetching linear data formats, like JSON, waiting until the end of a request
to parse is wasting time. especially for 40KB requests. with streaming XHR, you
can parse and act on data as it comes in.

for packaging
-------------

why not implement dynamic packaging (or SPDY) today over XHR? you can... :-D
