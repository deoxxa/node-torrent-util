exports.parse_created_by = function(created_by) {
  if (matches = created_by.match(/^uTorrent\/(.+)$/)) {
    return {client: "uTorrent", version: matches[1]};
  }
  if (matches = created_by.match(/^Azureus\/(.+)$/)) {
    return {client: "Azureus", version: matches[1]};
  }
  if (matches = created_by.match(/^AzureusBitTyrant\/(.+?)$/)) {
    return {client: "Azureus Bit Tyrant", version: matches[1]};
  }
  if (matches = created_by.match(/^BitComet\/(.+?)$/)) {
    return {client: "BitComet", version: matches[1]};
  }
  if (matches = created_by.match(/^BitLet\/(.+?)$/)) {
    return {client: "BitLet", version: matches[1]};
  }
  if (matches = created_by.match(/^BitLord\/(.+?)$/)) {
    return {client: "BitLord", version: matches[1]};
  }
  if (matches = created_by.match(/^BitSpirit\/(.+?)$/)) {
    return {client: "BitSpirit", version: matches[1]};
  }
  if (matches = created_by.match(/^BitTorrent\/(.+?)$/)) {
    return {client: "Mainline BitTorrent", version: matches[1]};
  }
  if (matches = created_by.match(/^buildtorrent\/(.+?)$/)) {
    return {client: "buildtorrent", version: matches[1]};
  }
  if (matches = created_by.match(/^Burnbit (.+?)$/)) {
    return {client: "Burnbit", version: matches[1]};
  }
  if (matches = created_by.match(/^Enhanced-CTorrent\/(.+?)$/)) {
    return {client: "CTorrent (enhanced)", version: matches[1]};
  }
  if (matches = created_by.match(/^Flush (.+?)$/)) {
    return {client: "Flush", version: matches[1]};
  }
  if (matches = created_by.match(/^Halite v (.+?)$/)) {
    return {client: "Halite", version: matches[1]};
  }
  if (matches = created_by.match(/^KTorrent$/)) {
    return {client: "KTorrent"};
  }
  if (matches = created_by.match(/^KTorrent[\/ ](.+?)$/)) {
    return {client: "KTorrent", version: matches[1]};
  }
  if (matches = created_by.match(/^mktorrent$/)) {
    return {client: "mktorrent"};
  }
  if (matches = created_by.match(/^mktorrent (.+?)$/)) {
    return {client: "mktorrent", version: matches[1]};
  }
  if (matches = created_by.match(/^mktorrent-GUI \[mktorrent (.+?)\]$/)) {
    return {client: "mktorrent (via mktorrent-GUI)", version: matches[1]};
  }
  if (matches = created_by.match(/^py3createtorrent v(.+?)$/)) {
    return {client: "py3createtorrent", version: matches[1]};
  }
  if (matches = created_by.match(/^qBittorrent v(.+?)$/)) {
    return {client: "qBittorrent", version: matches[1]};
  }
  if (matches = created_by.match(/^ruTorrent \(PHP Class - Adrien Gibrat\)$/)) {
    return {client: "ruTorrent"};
  }
  if (matches = created_by.match(/^Sturmtruppen-bt$/)) {
    return {client: "Sturmtruppen-bt"};
  }
  if (matches = created_by.match(/^Tixati v(.+?)$/)) {
    return {client: "Tixati", version: matches[1]};
  }
  if (matches = created_by.match(/^TorrentAid (.+?)$/)) {
    return {client: "TorrentAid", version: matches[1]};
  }
  if (matches = created_by.match(/^TorrentB\/(.+?) libtorrent\/(.+?)$/)) {
    return {client: "TorrentB", version: matches[1], extra: "libttorrent " + matches[2]};
  }
  if (matches = created_by.match(/^TorrentSpy\/(.+?)$/)) {
    return {client: "TorrentSpy", version: matches[1]};
  }
  if (matches = created_by.match(/^Transmission\/(.+?) \((.+?)\)$/)) {
    return {client: "TorrentSpy", version: matches[1], extra: matches[2]};
  }
  if (matches = created_by.match(/^VIP Torrent\/(.+?)$/)) {
    return {client: "TorrentSpy", version: matches[1], extra: matches[2]};
  }
};
