node-torrent-util
=================

Overview
--------

.torrent files differ wildly in their contents. This package aims to make it a
little easier to extract the various metadata components from them in a simple
way.

Features
--------

* "created by" field parsing

Usage
-----

```
var torrent_util = require("torrent-util");
var created_by = torrent_util.parse_created_by("uTorrent/2040");
```

License
-------

3-clause BSD. A copy is included with the source.

Contact
-------

* GitHub ([deoxxa](http://github.com/deoxxa))
* Twitter ([@deoxxa](http://twitter.com/deoxxa))
* Email ([deoxxa@fknsrs.biz](mailto:deoxxa@fknsrs.biz))
