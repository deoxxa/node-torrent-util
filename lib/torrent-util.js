exports.parse_client_banner = function(banner) {
  if (matches = banner.match(/^uTorrent\/(.+)$/)) {
    return {client: "uTorrent", version: matches[1]};
  }
  if (matches = banner.match(/^Azureus\/(.+)$/) {
    return {client: "Azureus", version: matches[1]});
  }
  if (matches = banner.match(/^AzureusBitTyrant\/(.+?)$/) {
    return {client: "Azureus Bit Tyrant", version: matches[1]};
  }
  if (matches = banner.match(/^BitComet\/(.+?)$/) {
    return {client: "BitComet", version: matches[1]};
  }
  if (matches = banner.match(/^BitLet\/(.+?)$/) {
    return {client: "BitLet", version: matches[1]};
  }
  if (matches = banner.match(/^BitLord\/(.+?)$/) {
    return {client: "BitLord", version: matches[1]};
  }
  if (matches = banner.match(/^BitSpirit\/(.+?)$/) {
    return {client: "BitSpirit", version: matches[1]};
  }
  if (matches = banner.match(/^BitTorrent\/(.+?)$/) {
    return {client: "Mainline BitTorrent", version: matches[1]};
  }
  if (matches = banner.match(/^buildtorrent\/(.+?)$/) {
    return {client: "buildtorrent", version: matches[1]};
  }
  if (matches = banner.match(/^Burnbit (.+?)$/) {
    return {client: "Burnbit", version: matches[1]};
  }
  if (matches = banner.match(/^Enhanced-CTorrent\/(.+?)$/) {
    return {client: "CTorrent (enhanced)", version: matches[1]};
  }
  if (matches = banner.match(/^Flush (.+?)$/) {
    return {client: "Flush", version: matches[1]};
  }
  if (matches = banner.match(/^Halite v (.+?)$/) {
    return {client: "Halite", version: matches[1]};
  }
  if (matches = banner.match(/^KTorrent$/) {
    return {client: "KTorrent"};
  }
  if (matches = banner.match(/^KTorrent[\/ ](.+?)$/) {
    return {client: "KTorrent", version: matches[1]};
  }
  if (matches = banner.match(/^mktorrent$/) {
    return {client: "mktorrent"};
  }
  if (matches = banner.match(/^mktorrent (.+?)$/) {
    return {client: "mktorrent", version: matches[1]};
  }
  if (matches = banner.match(/^mktorrent-GUI \[mktorrent (.+?)\]$/) {
    return {client: "mktorrent (via mktorrent-GUI)", version: matches[1]};
  }
  if (matches = banner.match(/^py3createtorrent v(.+?)$/) {
    return {client: "py3createtorrent", version: matches[1]};
  }
  if (matches = banner.match(/^qBittorrent v(.+?)$/) {
    return {client: "qBittorrent", version: matches[1]};
  }
  if (matches = banner.match(/^ruTorrent \(PHP Class - Adrien Gibrat\)$/) {
    return {client: "ruTorrent"};
  }
  if (matches = banner.match(/^Sturmtruppen-bt$/) {
    return {client: "Sturmtruppen-bt"};
  }
  if (matches = banner.match(/^Tixati v(.+?)$/) {
    return {client: "Tixati", version: matches[1]};
  }
  if (matches = banner.match(/^TorrentAid (.+?)$/) {
    return {client: "TorrentAid", version: matches[1]};
  }
  if (matches = banner.match(/^TorrentB\/(.+?) libtorrent\/(.+?)$/) {
    return {client: "TorrentB", version: matches[1], extra: "libttorrent " + matches[2]};
  }
  if (matches = banner.match(/^TorrentSpy\/(.+?)$/) {
    return {client: "TorrentSpy", version: matches[1]};
  }
  if (matches = banner.match(/^Transmission\/(.+?) \((.+?)\)$/) {
    return {client: "TorrentSpy", version: matches[1], extra: matches[2]};
  }
  if (matches = banner.match(/^VIP Torrent\/(.+?)$/) {
    return {client: "TorrentSpy", version: matches[1], extra: matches[2]};
  }
};
