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
  if (matches = created_by.match(regex_sane)) {
    return {client: matches[1], version: matches[2]};
  }

  if (matches = created_by.match(/^mktorrent-GUI \[mktorrent (.+?)\]$/)) {
    return {client: "mktorrent (via mktorrent-GUI)", version: matches[1]};
  }
  if (matches = created_by.match(/^ruTorrent \(PHP Class - Adrien Gibrat\)$/)) {
    return {client: "ruTorrent"};
  }
  if (created_by == "1.9.6.1073cn") {
    return {client: "Flashget", version: "1.9.6.1073cn"};
  }

  return null;
};

/**
 * Returns the size from the torrent or null on error.
 */
exports.get_size = function(torrent, strict) {
  if (typeof torrent.info != "object") {
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
