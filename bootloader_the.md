the bootloader is first to the party
====================================

when pages are delivered to the client, they need to load in javascripts and
CSS. unfortunately, knowing when multiple javascript and CSS files have loaded
is tedious, because the browser.

the bootloader, though... the bootloader.... where was I going? oh yeah... the
bootloader can load in multiple files at once and invoke a callback when they
are all done. sometimes, it knows how to use local storage but usually not.

the bootloader is part of the first javascript delivered to the page. without
it, the rest of the page is not going to work.
