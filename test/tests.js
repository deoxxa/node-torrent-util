var assert = require("chai").assert;

var torrentUtil = require("../");

describe("torrent-util", function() {
  describe("getSize()", function() {
    it("should return the correct size if it is directly available", function() {
      var torrent = {info: {length: 12345}};

      assert.strictEqual(torrentUtil.getSize(torrent), torrent.info.length);
    });

    it("should return the correct size if it can be calculated from file entries", function() {
      var torrent = {info: {files: [
        {length: 10},
        {length: 20},
        {length: 150},
      ]}};

      assert.strictEqual(torrentUtil.getSize(torrent), 180);
    });

    it("should return an approximation if nothing else is available", function() {
      var torrent = {info: {
        "piece length": 1024,
        "pieces": Buffer(200),
      }};

      assert.strictEqual(torrentUtil.getSize(torrent), 10240);
    });

    it("should not return an approximation if it is told not to", function() {
      var torrent = {info: {
        "piece length": 1024,
        "pieces": Buffer(200),
      }};

      assert.isUndefined(torrentUtil.getSize(torrent, true));
    });
  });
});
