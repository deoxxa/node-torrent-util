function flatten(subject, res) {
  if (!res) {
    res = [];
  }

  if (typeof subject == "object" && subject instanceof Array) {
    subject.forEach(function(el) {
      flatten(el, res);
    });
  } else {
    res.push(subject);
  }

  return res;
}

/**
 * Just a little optimisation to save on a bunch of regexing later.
 */
var sane_client_strings = [
  "Azureus", "Azureus Bit Tyrant", "BitComet", "BitLet", "BitLord",
  "BitSpirit", "BitTorrent", "buildtorrent", "BurnBit", "Enhanced-CTorrent",
  "Flush", "Halite", "KTorrent", "mktorrent", "py3createtorrent",
  "qBittorrent", "Tixati", "TorrentAid", "TorrentB", "TorrentSpy",
  "Transmission", "uTorrent", "VIP Torrent",
].sort(function(a,b) { return b.length - a.length; });

var regex_sane = new RegExp("^(" + sane_client_strings.map(function(s) { return s.replace(/([\(\)\/\[\]])/g, "\\$1"); }).join("|") + ")(?:/| v | v| )?(.*?)$");

/**
 * Parses the "created by" key of the info dictionary into a handy object like
 * this:
 *
 * {
 *   client: "MyTorrent",
 *   version: "1.11"
 * }
 *
 * Use it like so:
 *
 * torrent_util.parse_created_by("MyTorrent/1.11")
 *
 * Returns null if it can't parse the string.
 */
exports.parse_created_by = function(created_by) {
  if (typeof created_by != "string") {
    return null;
  }

  // These are silly, but they need to be at the top.
  if (matches = created_by.match(/^mktorrent-GUI \[mktorrent (.+?)\]$/)) {
    return {client: "mktorrent (via mktorrent-GUI)", version: matches[1]};
  }
  if (matches = created_by.match(/^ruTorrent \(PHP Class - Adrien Gibrat\)$/)) {
    return {client: "ruTorrent"};
  }
  if (created_by == "1.9.6.1073cn") {
    return {client: "Flashget", version: "1.9.6.1073cn"};
  }

  if (matches = created_by.match(regex_sane)) {
    return {client: matches[1], version: matches[2]};
  }

  return null;
};

exports.get_created_by = function(torrent) {
  if (typeof torrent != "object") {
    return null;
  }

  var created_by = torrent["created by"];

  if (typeof created_by == "object" && Buffer.isBuffer(created_by)) {
    created_by = created_by.toString();
  }

  if (typeof created_by == "string") {
    return this.parse_created_by(created_by);
  } else {
    return null;
  }
};

/**
 * Returns the size from the torrent or null on error.
 */
exports.get_size = function(torrent, strict) {
  if (typeof torrent != "object" || typeof torrent.info != "object") {
    return null;
  }

  // One of these first two methods is preferable, they're always accurate

  if (typeof torrent.info.length == "number") {
    return torrent.info.length;
  }

  if (typeof torrent.info.files == "object" && torrent.info.files instanceof Array) {
    var size = 0;

    torrent.info.files.forEach(function(file) {
      if (typeof file.length == "number") {
        size += file.length;
      }
    });

    return size;
  }

  // This is a fallback in case there's something very wrong with the torrent.
  // It will -not- be byte accurate, but rather piece-length accurate. This is
  // often close enough. This can be disabled by passing true as the second
  // argument to this function.

  if (!strict && typeof torrent.info["piece length"] == "number" && typeof torrent.info.pieces == "object" && torrent.info.pieces instanceof Array) {
    return torrent.info["piece length"] * (torrent.info.pieces.length/20);
  }
};

exports.get_files = function(torrent) {
  if (typeof torrent != "object" || typeof torrent.info != "object") {
    return null;
  }

  if (typeof torrent.info.files == "object" && torrent.info.files instanceof Array) {
    return torrent.info.files.map(function(file) {
      if (typeof file != "object") { return; }
      if (typeof file.path == "object" && file.path instanceof Array) { file.path = file.path.shift(); }
      if (typeof file.path == "object" && Buffer.isBuffer(file.path)) { file.path = file.path.toString(); }
      if (typeof file.path != "string" || typeof file.length != "number") { return; }

      return {
        name: file.path,
        size: file.length,
      };
    }).filter(function(file) {
      return !!file;
    }).sort(function(a,b) {
      return a.name == b.name ? 0 : a.name < b.name ? -1 : 1;
    });
  }

  if (typeof torrent.info.name == "object" && Buffer.isBuffer(torrent.info.name)) {
    torrent.info.name = torrent.info.name.toString();
  }

  return [{
    name: torrent.info.name,
    size: this.get_size(torrent),
  }];
};

exports.get_trackers = function(torrent) {
  if (typeof torrent != "object") {
    return null;
  }

  return flatten([torrent["announce-list"], torrent.announce]).map(function(tracker) {
    if (Buffer.isBuffer(tracker)) {
      tracker = tracker.toString();
    }

    if (typeof tracker == "string") {
      return tracker;
    }
  }).filter(function(tracker) {
    return !!tracker;
  });
};
