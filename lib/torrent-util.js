var parseCreatedBy = require("bittorrent-created-by");

function flatten(subject, res) {
  if (!res) {
    res = [];
  }

  if (typeof subject === "object" && Array.isArray(subject)) {
    subject.forEach(function(el) {
      flatten(el, res);
    });
  } else {
    res.push(subject);
  }

  return res;
}

var getCreatedBy = exports.get_created_by = exports.getCreatedBy = function getCreatedBy(torrent) {
  if (typeof torrent !== "object") {
    return null;
  }

  var created_by = torrent["created by"];

  if (typeof created_by === "object" && Buffer.isBuffer(created_by)) {
    created_by = created_by.toString();
  }

  if (typeof created_by === "string") {
    return parseCreatedBy(created_by);
  } else {
    return null;
  }
};

/**
 * Returns the size from the torrent or null on error.
 */
var getSize = exports.get_size = exports.getSize = function getSize(torrent, strict) {
  if (typeof torrent !== "object" || typeof torrent.info !== "object") {
    return null;
  }

  // One of these first two methods is preferable, they're always accurate

  if (typeof torrent.info.length === "number") {
    return torrent.info.length;
  }

  if (typeof torrent.info.files === "object" && Array.isArray(torrent.info.files)) {
    var size = 0;

    torrent.info.files.forEach(function(file) {
      if (typeof file.length === "number") {
        size += file.length;
      }
    });

    return size;
  }

  // This is a fallback in case there's something very wrong with the torrent.
  // It will -not- be byte accurate, but rather piece-length accurate. This is
  // often close enough. This can be disabled by passing true as the second
  // argument to this function.

  if (!strict && typeof torrent.info["piece length"] === "number" && typeof torrent.info.pieces === "object" && Buffer.isBuffer(torrent.info.pieces)) {
    return torrent.info["piece length"] * (torrent.info.pieces.length/20);
  }
};

var getName = exports.get_name = exports.getName = function getName(torrent) {
  if (typeof torrent !== "object" || typeof torrent.info !== "object" || typeof torrent.info.name === "undefined") {
    return null;
  }

  var name = torrent.info.name;

  if (Buffer.isBuffer(name)) { name = name.toString(); }

  if (typeof name !== "string") {
    return null;
  }

  return name;
};

var getComment = exports.get_comment = exports.getComment = function getComment(torrent) {
  if (typeof torrent !== "object" || typeof torrent.comment === "undefined") {
    return null;
  }

  var comment = torrent.comment;

  if (Buffer.isBuffer(comment)) { comment = comment.toString(); }

  if (typeof comment !== "string") {
    return null;
  }

  return comment;
};

var getFiles = exports.get_files = exports.getFiles = function getFiles(torrent) {
  if (typeof torrent !== "object" || typeof torrent.info !== "object") {
    return null;
  }

  if (typeof torrent.info.files === "object" && Array.isArray(torrent.info.files)) {
    return torrent.info.files.map(function(file) {
      if (typeof file !== "object") { return; }
      if (typeof file.path === "object" && Array.isArray(file.path)) { file.path = file.path.join("/"); }
      if (typeof file.path === "object" && Buffer.isBuffer(file.path)) { file.path = file.path.toString(); }
      if (typeof file.path !== "string" || typeof file.length !== "number") { return; }

      return {
        name: file.path,
        size: file.length,
      };
    }).filter(function(file) {
      return !!file;
    }).sort(function(a,b) {
      return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
    });
  }

  if (typeof torrent.info.name === "object" && Buffer.isBuffer(torrent.info.name)) {
    torrent.info.name = torrent.info.name.toString();
  }

  return [{
    name: torrent.info.name,
    size: getSize(torrent),
  }];
};

var getTrackers = exports.get_trackers = exports.getTrackers = function getTrackers(torrent) {
  if (typeof torrent !== "object") {
    return null;
  }

  return flatten([torrent["announce-list"], torrent.announce]).map(function(tracker) {
    if (Buffer.isBuffer(tracker)) {
      tracker = tracker.toString();
    }

    if (typeof tracker === "string") {
      return tracker;
    }
  }).filter(function(tracker) {
    return !!tracker;
  });
};

var getEverything = exports.get_everything = exports.getEverything = function getEverything(torrent) {
  return {
    name: getName(torrent),
    comment: getComment(torrent),
    createdBy: getCreatedBy(torrent),
    size: getSize(torrent),
    trackers: getTrackers(torrent),
    files: getFiles(torrent),
  };
};
