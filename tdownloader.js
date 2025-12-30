"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/icon.svg
  var icon_default = '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="4 4 16 16">\n    <path fill="currentcolor" d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z" />\n</svg>';

  // src/manifest.json
  var manifest_default = {
    type: "other",
    version: "2.3.0",
    author: "https://github.com/kvart714",
    name: "Torrent Downloader",
    description: "Transmission RPC client",
    component: "t-downloader"
  };

  // src/services/torrents-data-storage.ts
  var STORAGE_KEY = manifest_default.component + ".torrents.data.v2";
  var TorrentsDataStorage = class {
    static getData() {
      return this.data;
    }
    static getMovie(id) {
      const filtered = this.data.torrents.filter((item) => item.id === id);
      return filtered.length > 0 ? filtered.reduce(
        (prev, current) => prev.percentDone < current.percentDone ? prev : current
      ) : null;
    }
    static ensureMovie(movie) {
      const filtered = this.data.torrents.filter((item) => item.externalId === movie.externalId);
      return filtered.length > 0 ? filtered.reduce(
        (prev, current) => prev.percentDone < current.percentDone ? prev : current
      ) : movie;
    }
    static setData(torrents) {
      return __async(this, null, function* () {
        this.data = torrents;
        Lampa.Storage.set(STORAGE_KEY, this.data);
      });
    }
  };
  TorrentsDataStorage.data = Lampa.Storage.get(STORAGE_KEY, { torrents: [], info: { freeSpace: 0 } });

  // src/components/download-card/download-card.html
  var download_card_default = '<div class="selector download-card full-start__button d-updatable" id="download-card-{id}">\n  <div class="download-card__file-info">\n    <span class="file-name">\n      <span data-key="fileName">{fileName}</span>\n    </span>\n    <span class="speed">\n      <span data-key="speed">{speed}</span>\n    </span>\n  </div>\n  <div class="download-card__progress-bar">\n    <div class="download-card__progress-bar-progress" style="width: {percent}"></div>\n  </div>\n  <div class="download-card__stats">\n    <span class="downloaded">\n      <span data-key="downloadedSize">{downloadedSize}</span> / \n      <span data-key="totalSize">{totalSize}</span>\n    </span>\n    <span class="percent">\n      <span data-key="percent">{percent}</span>\n    </span>\n    <span class="eta">\n      <span data-key="eta">{eta}</span>\n    </span>\n  </div>\n</div>\n';

  // src/components/download-card/download-card.scss
  var download_card_default2 = `.download-card {
  all: unset;
  display: block;
  width: 80%;
  height: auto;
  margin: 0;
  margin-top: 0.75em;
  padding: 0.75em;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  transition: background-color 0.3s;
  border-radius: 1em;
}
.download-card__file-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
}
.download-card__file-info .file-name, .download-card__file-info .speed {
  font-size: 1.5em;
}
.download-card__progress-bar {
  height: 6px;
  background: #ddd;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 0.7em;
  margin-bottom: 0.5em;
}
.download-card__progress-bar-progress {
  height: 100%;
  background: linear-gradient(90deg, #4a90e2, #357ab8);
  transition: width 0.5s ease;
}
.download-card__stats {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  font-size: 1.1em;
}
.download-card__stats .speed {
  position: absolute;
  top: 0;
  right: 0;
  font-size: inherit;
}
.download-card__stats .percent {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: inherit;
}
.download-card__stats .downloaded {
  text-align: left;
  font-size: inherit;
}
.download-card__stats .eta {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: inherit;
}`;

  // src/log.ts
  function log(...args) {
    console.log(manifest_default.name, ...args);
  }
  function warn(...args) {
    console.warn(manifest_default.name, ...args);
  }

  // src/services/movieinfo-data-storage.ts
  var MOVIE_INFO_STORAGE_KEY = manifest_default.component + ".movieinfo.data.v3";
  var MovieInfoDataStorage = class {
    static getMovieInfo(torrent) {
      const id = torrent == null ? void 0 : torrent.id;
      const type = torrent == null ? void 0 : torrent.type;
      if (!id) return null;
      if (this.memoryCache[id]) {
        return this.memoryCache[id];
      }
      if (!this.requestedIds.has(id)) {
        this.requestedIds.add(id);
        this.loadByTypeWithFallback(id, type);
      }
      return this.diskCache[id] || null;
    }
    static loadByTypeWithFallback(id, type) {
      return __async(this, null, function* () {
        let typesToTry = ["movie", "tv"];
        for (const contentType of typesToTry.sort((a) => a === type ? -1 : 0)) {
          const info = yield this.loadContentInfo(id, contentType);
          if (info) {
            this.memoryCache[id] = info;
            this.diskCache[id] = info;
            Lampa.Storage.set(MOVIE_INFO_STORAGE_KEY, this.diskCache);
            return;
          }
        }
      });
    }
    static loadContentInfo(id, contentType) {
      return __async(this, null, function* () {
        const lang = Lampa.Storage.field("tmdb_lang") || Lampa.Storage.field("language") || "ru";
        const url = Lampa.Utils.addUrlComponent(
          Lampa.TMDB.api(`${contentType}/${id}`),
          `api_key=${Lampa.TMDB.key()}&language=${lang}&certification_country=ru&certification.lte=18`
        );
        try {
          const response = yield fetch(url);
          if (response.ok) {
            const data = yield response.json();
            if ((data == null ? void 0 : data.title) || (data == null ? void 0 : data.name)) {
              return data;
            }
          }
        } catch (error) {
          warn(`Failed to load ${contentType} info for id ${id}:`, error);
        }
        return null;
      });
    }
  };
  MovieInfoDataStorage.requestedIds = /* @__PURE__ */ new Set();
  MovieInfoDataStorage.diskCache = Lampa.Storage.get(MOVIE_INFO_STORAGE_KEY, {});
  MovieInfoDataStorage.memoryCache = {};

  // src/services/torrent-client/statuses.ts
  var STATUS_CODES = {
    STOPPED: 0,
    CHECK_PENDING: 1,
    CHECKING: 2,
    DOWNLOAD_PENDING: 3,
    DOWNLOADING: 4,
    SEED_PENDING: 5,
    SEEDING: 6,
    ISOLATED: 7,
    STALLED: 8,
    ERROR: 9,
    ALLOCATING: 10,
    MOVING: 11,
    UNKNOWN: 12,
    INITIALIZATION: 13
  };
  function mapTransmissionStatus(status) {
    switch (status) {
      case 0:
        return STATUS_CODES.STOPPED;
      case 1:
        return STATUS_CODES.CHECK_PENDING;
      case 2:
        return STATUS_CODES.CHECKING;
      case 3:
        return STATUS_CODES.DOWNLOAD_PENDING;
      case 4:
        return STATUS_CODES.DOWNLOADING;
      case 5:
        return STATUS_CODES.SEED_PENDING;
      case 6:
        return STATUS_CODES.SEEDING;
      default:
        return STATUS_CODES.UNKNOWN;
    }
  }
  function mapQBState(state) {
    switch (state) {
      case "allocating":
        return STATUS_CODES.ALLOCATING;
      case "checkingDL":
      case "checkingUP":
      case "checkingResumeData":
        return STATUS_CODES.CHECKING;
      case "queuedDL":
        return STATUS_CODES.DOWNLOAD_PENDING;
      case "queuedUP":
        return STATUS_CODES.SEED_PENDING;
      case "downloading":
      case "forcedMetaDL":
        return STATUS_CODES.DOWNLOADING;
      case "uploading":
      case "forcedUP":
        return STATUS_CODES.SEEDING;
      case "pausedDL":
      case "pausedUP":
      case "stoppedDL":
      case "stoppedUP":
        return STATUS_CODES.STOPPED;
      case "stalledDL":
      case "stalledUP":
        return STATUS_CODES.STALLED;
      case "missingFiles":
        return STATUS_CODES.ISOLATED;
      case "moving":
        return STATUS_CODES.MOVING;
      case "error":
        return STATUS_CODES.ERROR;
      case "metaDL":
      case "forcedDL":
        return STATUS_CODES.INITIALIZATION;
      default:
        return STATUS_CODES.UNKNOWN;
    }
  }

  // src/services/torrent-client/lampa-id.ts
  var ID_KEY = "lampa:";
  function extractId(tags) {
    var _a;
    const tagsArray = typeof tags === "string" ? tags.split(",").map((t) => t.trim()) : tags;
    const id = ((_a = tagsArray.find((tag) => tag.startsWith(ID_KEY))) == null ? void 0 : _a.split(":")[1]) || "";
    return parseInt(id);
  }
  function extractType(tags) {
    const tagsArray = typeof tags === "string" ? tags.split(",").map((t) => t.trim()) : tags;
    return tagsArray.indexOf("tv") !== -1 ? "tv" : "movie";
  }
  function buildTags(movie) {
    const tags = [ID_KEY + movie.id];
    if (movie.seasons) {
      tags.push("tv");
    }
    return tags;
  }

  // src/services/torrent-client/qbit/qbittorrent-webapi-client.ts
  var QBittorrentWebApiClient = class {
    constructor(url, login, password, cookie) {
      this.url = url;
      this.login = login;
      this.password = password;
      this.cookie = cookie;
    }
    fetchWithAuth(_0) {
      return __async(this, arguments, function* (path, options = {}) {
        let response = yield fetch(this.url + path, __spreadProps(__spreadValues({}, options), {
          credentials: "include"
        }));
        if (!response.ok && response.status === 403) {
          yield this.authorize();
          response = yield fetch(this.url + path, __spreadProps(__spreadValues({}, options), {
            credentials: "include"
          }));
        }
        return response;
      });
    }
    authorize() {
      return __async(this, null, function* () {
        const params = new URLSearchParams();
        params.append("username", this.login);
        params.append("password", this.password);
        const response = yield fetch(this.url + "/api/v2/auth/login", {
          method: "POST",
          body: params,
          credentials: "include"
        });
        if (!response.ok) throw new Error("qBittorrent login failed");
        this.cookie = response.headers.get("set-cookie") || void 0;
      });
    }
    getTorrents() {
      return __async(this, null, function* () {
        let response = yield this.fetchWithAuth("/api/v2/torrents/info");
        if (!response.ok) throw new Error("Failed to get torrents");
        const data = yield response.json();
        return this.formatTorrents(data);
      });
    }
    getData() {
      return __async(this, null, function* () {
        const response = yield this.fetchWithAuth("/api/v2/sync/maindata");
        if (!response.ok) throw new Error("Failed to get qBittorrent info");
        const data = yield response.json();
        return {
          torrents: this.formatTorrents(Array.isArray(data.torrents) ? data.torrents : Object.keys(data.torrents).map((k) => __spreadProps(__spreadValues({}, data.torrents[k]), { hash: k }))),
          info: {
            freeSpace: data.server_state.free_space_on_disk
          }
        };
      });
    }
    addTorrent(movie, selectedTorrent) {
      return __async(this, null, function* () {
        const form = new FormData();
        const url = new URL(selectedTorrent.MagnetUri || selectedTorrent.Link);
        url.searchParams.delete("dn");
        form.append("urls", url.toString());
        form.append("tags", buildTags(movie).join(","));
        form.append("sequentialDownload", "true");
        const response = yield this.fetchWithAuth("/api/v2/torrents/add", {
          method: "POST",
          body: form
        });
        if (!response.ok) throw new Error("Failed to add torrent");
      });
    }
    startTorrent(torrent) {
      return __async(this, null, function* () {
        const params = new URLSearchParams();
        params.append("hashes", String(torrent.externalId));
        const response = yield this.fetchWithAuth("/api/v2/torrents/start", {
          method: "POST",
          body: params
        });
        if (!response.ok) throw new Error("Failed to start torrents");
      });
    }
    stopTorrent(torrent) {
      return __async(this, null, function* () {
        const params = new URLSearchParams();
        params.append("hashes", String(torrent.externalId));
        const response = yield this.fetchWithAuth("/api/v2/torrents/stop", {
          method: "POST",
          body: params
        });
        if (!response.ok) throw new Error("Failed to stop torrents");
      });
    }
    hideTorrent(torrent) {
      return __async(this, null, function* () {
        const params = new URLSearchParams();
        params.append("hashes", String(torrent.externalId));
        params.append("tags", "hide");
        const response = yield this.fetchWithAuth("/api/v2/torrents/addTags", {
          method: "POST",
          body: params
        });
        if (!response.ok) throw new Error("Failed to hide torrent");
      });
    }
    removeTorrent(torrent, deleteFiles = false) {
      return __async(this, null, function* () {
        const params = new URLSearchParams();
        params.append("hashes", String(torrent.externalId));
        params.append("deleteFiles", deleteFiles ? "true" : "false");
        const response = yield this.fetchWithAuth("/api/v2/torrents/delete", {
          method: "POST",
          body: params
        });
        if (!response.ok) throw new Error("Failed to remove torrents");
      });
    }
    getFiles(torrent) {
      return __async(this, null, function* () {
        const params = new URLSearchParams();
        params.append("hash", String(torrent.externalId));
        const response = yield this.fetchWithAuth(`/api/v2/torrents/files?${params.toString()}`);
        if (!response.ok) {
          throw new Error(`Failed to get files for torrent ${torrent.externalId}`);
        }
        const filesData = yield response.json();
        return filesData.map((f) => {
          var _a, _b;
          return {
            bytesCompleted: Math.floor(f.progress * f.size),
            length: f.size,
            name: f.name,
            begin_piece: (_a = f.piece_range) == null ? void 0 : _a[0],
            end_piece: (_b = f.piece_range) == null ? void 0 : _b[1]
          };
        });
      });
    }
    formatTorrents(data) {
      return data.sort((a, b) => b.added_on - a.added_on).filter((t) => !t.tags.includes("hide")).map((t) => ({
        id: extractId(t.tags),
        type: extractType(t.tags),
        externalId: t.hash,
        name: t.name,
        status: mapQBState(t.state),
        percentDone: t.progress,
        totalSize: t.size,
        eta: t.eta,
        speed: t.dlspeed,
        files: [],
        seeders: t.num_seeds,
        // всего сидов
        activeSeeders: t.num_complete,
        // активных сидов (если есть)
        hash: t.hash
        //хеш торрента
      }));
    }
  };

  // src/services/torrent-client/transmission/transmission-rpc-client.ts
  var TransmissionRpcClient = class {
    constructor(url, login, password, sessionId) {
      this.url = url;
      this.login = login;
      this.password = password;
      this.sessionId = sessionId;
    }
    POST(request) {
      return __async(this, null, function* () {
        const response = yield fetch(this.url, {
          method: "POST",
          headers: {
            Authorization: `Basic ${btoa(
              this.login + ":" + this.password
            )}`,
            "Content-Type": "application/json",
            "X-Transmission-Session-Id": this.sessionId || ""
          },
          body: JSON.stringify(request)
        });
        if (response.status === 409) {
          this.sessionId = response.headers.get("X-Transmission-Session-Id");
          if (this.sessionId == null) {
            throw new Error("Can`t authorize to Transmission RPC");
          }
          return this.POST(request);
        }
        if (!response.ok) {
          throw {
            message: `Transmission RPC error: ${response.statusText}`,
            status: response.status
          };
        }
        return yield response.json();
      });
    }
    getSession() {
      const request = {
        method: "session-get"
      };
      return this.POST(request);
    }
    addTorrent(args) {
      const request = {
        method: "torrent-add",
        arguments: args
      };
      return this.POST(request);
    }
    getTorrents(args) {
      const request = {
        method: "torrent-get",
        arguments: args
      };
      return this.POST(request);
    }
    setTorrent(args) {
      const request = {
        method: "torrent-set",
        arguments: args
      };
      return this.POST(request);
    }
    startTorrent(args) {
      const request = {
        method: "torrent-start",
        arguments: args
      };
      return this.POST(request);
    }
    stopTorrent(args) {
      const request = {
        method: "torrent-stop",
        arguments: args
      };
      return this.POST(request);
    }
    removeTorrent(args) {
      const request = {
        method: "torrent-remove",
        arguments: args
      };
      return this.POST(request);
    }
  };

  // src/services/torrent-client/transmission/transmission.ts
  var TransmissionService = class {
    constructor(url, login, password) {
      this.url = url;
      this.login = login;
      this.password = password;
      this.client = new TransmissionRpcClient(url + "/transmission/rpc", login, password);
    }
    getTorrents() {
      return __async(this, null, function* () {
        var _a;
        const response = yield this.client.getTorrents({
          fields: [
            "id",
            "name",
            "status",
            "percentDone",
            "sizeWhenDone",
            "rateDownload",
            "eta",
            "labels",
            "files",
            "peersConnected",
            // всего сидов/пиров
            "peersSendingToUs",
            // активные сиды (отдают нам)
            "trackerStats",
            // для получения точного количества сидов с трекеров
            "hashString"
            // хеш торрента
          ]
        });
        return ((_a = response.arguments) == null ? void 0 : _a.torrents.filter((torrent) => !Array.isArray(torrent.labels) || torrent.labels.indexOf("hide") === -1).map((torrent) => {
          let seederCount = 0;
          let activeSeederCount = 0;
          if (Array.isArray(torrent.trackerStats)) {
            seederCount = Math.max(...torrent.trackerStats.map((tr) => tr.seederCount || 0), 0);
          }
          activeSeederCount = torrent.peersSendingToUs || 0;
          return {
            id: extractId(torrent.labels),
            type: extractType(torrent.labels),
            externalId: torrent.id,
            name: torrent.name,
            status: mapTransmissionStatus(torrent.status),
            percentDone: torrent.percentDone,
            totalSize: torrent.sizeWhenDone,
            eta: torrent.eta,
            speed: torrent.rateDownload,
            files: torrent.files,
            seeders: seederCount,
            activeSeeders: activeSeederCount,
            hash: torrent.hashString
            //хеш торрента
          };
        }).filter((torrent) => torrent.id)) || [];
      });
    }
    addTorrent(movie, selectedTorrent) {
      return __async(this, null, function* () {
        var _a;
        const response = yield this.client.addTorrent({
          paused: false,
          sequential_download: true,
          filename: selectedTorrent.MagnetUri || selectedTorrent.Link,
          labels: buildTags(movie)
        });
        if ((_a = response.arguments) == null ? void 0 : _a["torrent-added"]) {
          yield this.client.setTorrent({
            ids: [response.arguments["torrent-added"].id],
            labels: buildTags(movie)
          });
        }
      });
    }
    startTorrent(torrent) {
      return __async(this, null, function* () {
        yield this.client.startTorrent({ ids: [torrent.externalId] });
      });
    }
    stopTorrent(torrent) {
      return __async(this, null, function* () {
        yield this.client.stopTorrent({ ids: [torrent.externalId] });
      });
    }
    hideTorrent(torrent) {
      return __async(this, null, function* () {
        var _a, _b;
        const response = yield this.client.getTorrents({
          ids: [torrent.externalId],
          fields: ["labels"]
        });
        const currentLabels = ((_b = (_a = response.arguments) == null ? void 0 : _a.torrents[0]) == null ? void 0 : _b.labels) || [];
        yield this.client.setTorrent({
          ids: [torrent.externalId],
          labels: [...currentLabels, "hide"]
        });
      });
    }
    removeTorrent(torrent, deleteFiles = false) {
      return __async(this, null, function* () {
        yield this.client.removeTorrent({
          ids: [torrent.externalId],
          "delete-local-data": deleteFiles
        });
      });
    }
    getFiles(torrent) {
      return __async(this, null, function* () {
        return torrent.files;
      });
    }
    getData() {
      return __async(this, null, function* () {
        return {
          torrents: yield this.getTorrents(),
          info: {
            freeSpace: 0
            // TODO: Implement free space retrieval
          }
        };
      });
    }
  };

  // src/services/torrent-client/torrent-client-factory.ts
  var _TorrentClientFactory = class _TorrentClientFactory {
    static getClient() {
      if (!this.client) {
        const url = Lampa.Storage.field(URL_KEY);
        const urls = url.split(";");
        if (urls.length === 1) {
          _TorrentClientFactory.buildClient(url);
        }
        if (urls.length > 1) {
          _TorrentClientFactory.selectUrl(urls);
        }
      }
      return this.client;
    }
    static reset() {
      this.client = void 0;
    }
    static buildClient(url) {
      const useQbittorrent = Lampa.Storage.field(CLIENT_TYPE_KEY) === 1;
      const login = Lampa.Storage.field(LOGIN_KEY);
      const password = Lampa.Storage.field(PASSWORD_KEY);
      this.client = useQbittorrent ? new QBittorrentWebApiClient(url, login, password) : new TransmissionService(url, login, password);
    }
    static selectUrl(urls) {
      return __async(this, null, function* () {
        const attempts = urls.map((url) => fetch(url + "/ping", { cache: "no-cache" }).then((res) => res.ok ? url : Promise.reject()));
        return new Promise((resolve) => {
          let failed = 0;
          let done = false;
          attempts.forEach(
            (p) => p.then((url) => {
              if (!done) {
                done = true;
                this.buildClient(url);
                resolve();
              }
            }).catch(() => {
              if (++failed === attempts.length && !done) {
                this.buildClient(urls[0]);
                resolve();
              }
            })
          );
        });
      });
    }
  };
  _TorrentClientFactory.isConnected = false;
  var TorrentClientFactory = _TorrentClientFactory;

  // src/settings.ts
  var INTERVAL_KEY = `${manifest_default.component}.interval`;
  var DEFAULT_ACTION_KEY = `${manifest_default.component}.default-action`;
  var ALLOW_MULTIPLE_DOWNLOADS_KEY = `${manifest_default.component}.allow-multiple-marks`;
  var POSTER_QUALITY_KEY = `${manifest_default.component}.poster-quality`;
  var URL_KEY = `${manifest_default.component}.server.url`;
  var LOGIN_KEY = `${manifest_default.component}.server.login`;
  var PASSWORD_KEY = `${manifest_default.component}.server.password`;
  var CLIENT_TYPE_KEY = `${manifest_default.component}.server.type`;
  var INTERVALS = [2, 5, 10, 30, 60, 5 * 60, 15 * 60];
  var POSTER_QUALITIES = ["w200", "w342", "w500", "w780", "w1280"];
  function settings() {
    Lampa.SettingsApi.addComponent({
      component: manifest_default.component,
      name: manifest_default.name,
      icon: icon_default
    });
    Lampa.SettingsApi.addParam({
      component: manifest_default.component,
      param: {
        name: INTERVAL_KEY,
        type: "select",
        placeholder: "2s",
        values: ["2s", "5s", "10s", "30s", "1m", "5m", "15m"],
        default: 0
      },
      field: {
        name: "Update interval"
      },
      onChange(item) {
        Lampa.Settings.update();
        BackgroundWorker.start();
      }
    });
    Lampa.SettingsApi.addParam({
      component: manifest_default.component,
      param: {
        name: DEFAULT_ACTION_KEY,
        type: "select",
        placeholder: "",
        values: [
          "Open actions menu",
          "Play",
          "Resume / Pause download"
        ],
        default: 0
      },
      field: {
        name: "Default press action",
        description: "Long press always opens the actions menu."
      },
      onChange(item) {
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: manifest_default.component,
      param: {
        name: ALLOW_MULTIPLE_DOWNLOADS_KEY,
        type: "trigger",
        default: false
      },
      field: {
        name: "Keep torrents screen open after download",
        description: "After selecting a torrent, the app does not return back and keeps the add screen open, allowing you to add multiple torrents in a row."
      },
      onChange(item) {
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: manifest_default.component,
      param: {
        name: POSTER_QUALITY_KEY,
        type: "select",
        placeholder: "",
        values: [
          "Low",
          "Medium",
          "High",
          "Very High",
          "Ultra"
        ],
        default: 1
      },
      field: {
        name: "Poster quality"
      },
      onChange(item) {
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: manifest_default.component,
      param: {
        name: "transmission-title",
        type: "title",
        default: ""
      },
      field: {
        name: "Server settings:"
      }
    });
    Lampa.SettingsApi.addParam({
      component: manifest_default.component,
      param: {
        name: CLIENT_TYPE_KEY,
        type: "select",
        placeholder: "",
        values: ["Transmission", "qBitTorrent"],
        default: "0"
      },
      field: {
        name: "Torrent Client"
      },
      onChange(item) {
        Lampa.Settings.update();
        TorrentClientFactory.reset();
      }
    });
    Lampa.SettingsApi.addParam({
      component: manifest_default.component,
      param: {
        name: URL_KEY,
        type: "input",
        placeholder: "",
        values: "",
        default: ""
      },
      field: {
        name: "Url"
      },
      onChange(item) {
        Lampa.Settings.update();
        TorrentClientFactory.reset();
      }
    });
    Lampa.SettingsApi.addParam({
      component: manifest_default.component,
      param: {
        name: LOGIN_KEY,
        type: "input",
        placeholder: "",
        values: "",
        default: ""
      },
      field: {
        name: "Login"
      },
      onChange(item) {
        Lampa.Settings.update();
        TorrentClientFactory.reset();
      }
    });
    Lampa.SettingsApi.addParam({
      component: manifest_default.component,
      param: {
        name: PASSWORD_KEY,
        type: "input",
        placeholder: "",
        values: "",
        default: ""
      },
      field: {
        name: "Password"
      },
      onChange(item) {
        Lampa.Settings.update();
        TorrentClientFactory.reset();
      }
    });
  }

  // src/components/formatters.ts
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
    return size + " " + Lampa.Lang.translate(`download-card.size.${i}`);
  }
  function formatSpeed(bytesPerSecond) {
    const sec = Lampa.Lang.translate("download-card.time.3");
    return `${formatBytes(bytesPerSecond)}/${sec}`;
  }
  function formatTime(seconds) {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor(seconds % 86400 / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    const parts = [d, h, m, s].map((p, i) => p ? p + Lampa.Lang.translate(`download-card.time.${i}`) : null).filter(Boolean);
    return parts.slice(0, 2).join(" ");
  }
  function formatYear(dateStr) {
    const d = new Date(dateStr || "");
    return isNaN(d.getTime()) ? "" : d.getFullYear();
  }
  function formatTorrent(torrent) {
    const info = MovieInfoDataStorage.getMovieInfo(torrent);
    const posterQuality = POSTER_QUALITIES[Lampa.Storage.get(POSTER_QUALITY_KEY)] || POSTER_QUALITIES[1];
    return {
      id: torrent.id + "_" + torrent.externalId,
      title: (info == null ? void 0 : info.title) || (info == null ? void 0 : info.name) || (torrent.status === STATUS_CODES.INITIALIZATION ? "Initialization" : torrent.name),
      poster: (info == null ? void 0 : info.poster_path) ? Lampa.TMDB.image(`t/p/${posterQuality}${info.poster_path}`) : "",
      year: formatYear((info == null ? void 0 : info.release_date) || (info == null ? void 0 : info.first_air_date)),
      fileName: (info == null ? void 0 : info.title) || (info == null ? void 0 : info.name) ? torrent.name : "",
      percent: (100 * torrent.percentDone).toFixed(2) + "%",
      speed: torrent.speed > 0 ? formatSpeed(torrent.speed) : "",
      downloadedSize: formatBytes(torrent.percentDone * torrent.totalSize),
      totalSize: formatBytes(torrent.totalSize),
      eta: torrent.status === STATUS_CODES.DOWNLOADING ? formatTime(torrent.eta) : torrent.status === STATUS_CODES.STALLED && torrent.percentDone === 1 ? Lampa.Lang.translate(`download-card.status.14`) : Lampa.Lang.translate(`download-card.status.${torrent.status}`),
      status: torrent.status === STATUS_CODES.DOWNLOADING ? "downloading" : torrent.percentDone === 1 ? "completed" : "paused",
      seeders: `${torrent.seeders || 0} (${torrent.activeSeeders || 0})`
    };
  }

  // src/services/TorrentViewsStorage.ts
  var STORAGE_KEY2 = manifest_default.component + ".torrents.data.views.";
  var TorrentViewsStorage = class _TorrentViewsStorage {
    static getViews(torrent) {
      return Lampa.Storage.get(STORAGE_KEY2 + torrent.externalId);
    }
    static rememberView(torrent, name) {
      let data = _TorrentViewsStorage.getViews(torrent) || {};
      data.last = name;
      data[name] = true;
      Lampa.Storage.set(STORAGE_KEY2 + torrent.externalId, data);
    }
  };

  // src/components/open-actions.ts
  function play(source, torrent, name) {
    return __async(this, null, function* () {
      const client = TorrentClientFactory.getClient();
      const files = yield client.getFiles(torrent);
      const baseUrl = client.url + "/downloads/";
      if (files.length < 1) {
        throw new Error("No files found in torrent");
      }
      if (files.length === 1) {
        Lampa.Player.play({
          title: name || torrent.name,
          url: baseUrl + files[0].name,
          torrent_hash: torrent.hash
          //Отправляем в плеер хеш торрента, для совместимости с плагином tracks
        });
      }
      if (files.length > 1) {
        let _a;
        const views = TorrentViewsStorage.getViews(torrent);
        const sortedFiles = files.sort((a, b) => a.name.localeCompare(b.name, void 0, {
          numeric: true,
          sensitivity: "base"
        }));
        const playlist = sortedFiles.map((f, i) => ({
          title: f.name.split(/[\\/]/).pop() || f.name,
          name: f.name,
          url: baseUrl + f.name,
          picked: views[f.name],
          selected: views.last === f.name
        }));
        Lampa.Select.show({
          title: Lampa.Lang.translate("actions.select-file"),
          items: playlist,
          onSelect(item) {
            return __async(this, null, function* () {
              TorrentViewsStorage.rememberView(torrent, item.name);
              Lampa.Player.play({
                playlist,
                title: name || torrent.name,
                url: item.url,
                torrent_hash: torrent.hash
                //Отправляем в плеер хеш торрента, для совместимости с плагином tracks
              });
              Lampa.Player.playlist(playlist);
              Lampa.Controller.toggle(source);
            });
          },
          onBack: function onBack() {
            Lampa.Controller.toggle(source);
          }
        });
      }
    });
  }
  function resumeOrPause(torrent) {
    if (torrent.status === STATUS_CODES.STOPPED) {
      TorrentClientFactory.getClient().startTorrent(torrent);
    } else {
      TorrentClientFactory.getClient().stopTorrent(torrent);
    }
  }
  function openActions(source, torrent, name) {
    torrent = TorrentsDataStorage.ensureMovie(torrent);
    const info = MovieInfoDataStorage.getMovieInfo(torrent);
    Lampa.Select.show({
      title: Lampa.Lang.translate("actions.title"),
      items: [
        {
          title: Lampa.Lang.translate("actions.open"),
          onSelect() {
            return __async(this, null, function* () {
              play(source, torrent, name);
            });
          }
        },
        ...source === "downloads-tab" && torrent.id ? [
          {
            title: Lampa.Lang.translate("actions.open-card"),
            onSelect() {
              return __async(this, null, function* () {
                Lampa.Activity.push({
                  component: "full",
                  id: torrent.id,
                  method: (info == null ? void 0 : info.seasons) ? "tv" : "movie",
                  card: torrent
                });
              });
            }
          }
        ] : [],
        {
          title: torrent.status === STATUS_CODES.STOPPED ? Lampa.Lang.translate("actions.resume") : Lampa.Lang.translate("actions.pause"),
          onSelect() {
            resumeOrPause(torrent);
            Lampa.Controller.toggle(source);
          }
        },
        {
          title: Lampa.Lang.translate("actions.hide"),
          onSelect() {
            TorrentClientFactory.getClient().hideTorrent(torrent);
            $(`.downloads-tab__item[data-id="${torrent.id}_${torrent.externalId}"]`).remove();
            Lampa.Controller.toggle(source);
          }
        },
        {
          title: Lampa.Lang.translate("actions.delete"),
          subtitle: Lampa.Lang.translate("actions.delete-with-file"),
          onSelect() {
            TorrentClientFactory.getClient().removeTorrent(torrent, true);
            $(`.downloads-tab__item[data-id="${torrent.id}_${torrent.externalId}"]`).remove();
            Lampa.Controller.toggle(source);
          }
        },
        {
          title: Lampa.Lang.translate("actions.delete-torrent"),
          subtitle: Lampa.Lang.translate("actions.delete-torrent-keep-file"),
          onSelect() {
            TorrentClientFactory.getClient().removeTorrent(torrent, false);
            $(`.downloads-tab__item[data-id="${torrent.id}_${torrent.externalId}"]`).remove();
            Lampa.Controller.toggle(source);
          }
        }
      ],
      onBack: function onBack() {
        Lampa.Controller.toggle(source);
      }
    });
  }
  function openTorrent(source, torrent, name) {
    const action = Lampa.Storage.field(DEFAULT_ACTION_KEY);
    if (action == 1) {
      play(source, torrent, name);
    } else if (action == 2) {
      resumeOrPause(torrent);
    } else {
      openActions(source, torrent, name);
    }
  }

  // src/components/download-card/download-card.ts
  function addDownloadCard(torrent, movie) {
    const card = $(Lampa.Template.get("download-card", formatTorrent(torrent)));
    $(".full-start-new__right").append(card);
    card.on("hover:enter", () => {
      openTorrent("full_start", torrent, (movie == null ? void 0 : movie.title) || (movie == null ? void 0 : movie.original_title));
    });
    card.on("hover:long", () => {
      openActions("full_start", torrent, (movie == null ? void 0 : movie.title) || (movie == null ? void 0 : movie.original_title));
    });
  }
  function updateDownloadCard(torrent) {
    const updatedData = formatTorrent(torrent);
    const card = document.getElementById(`download-card-${updatedData.id}`);
    if (!card) return;
    for (const key in updatedData) {
      const el = card.querySelector(`[data-key="${key}"]`);
      if (el)
        el.textContent = updatedData[key];
    }
    card.querySelector(".download-card__progress-bar-progress").setAttribute(
      "style",
      `width: ${updatedData.percent};`
    );
  }
  function download_card_default3() {
    Lampa.Template.add("download-card", download_card_default);
    $("body").append(`<style>${download_card_default2}</style>`);
    Lampa.Listener.follow("full", (e) => {
      if (e.type === "complite") {
        const torrent = TorrentsDataStorage.getMovie(e.data.movie.id);
        if (torrent) {
          addDownloadCard(torrent, e.data.movie);
        }
      }
    });
  }

  // src/components/download-circle/download-circle.html
  var download_circle_default = '<div class="download-circle d-updatable download-circle-{status}-{id}">\n    <div class="download-circle__circle">\n        <svg class="download-circle__circle-svg" xmlns="http://www.w3.org/2000/svg">\n            <circle\n                fill="rgba(0, 0, 0, 0.60)"\n                r="17px"\n                cx="20"\n                cy="20"\n            ></circle>\n            <circle\n                class="download-circle__full_{status}"\n                stroke-width="2px"\n                r="12px"\n                cx="20"\n                cy="20"\n            ></circle>\n            <circle\n                class="download-circle__partial_{status}"\n                fill="none"\n                stroke="#fff"\n                stroke-width="2px"\n                stroke-dasharray="100"\n                stroke-dashoffset="{progress}"\n                transition="stroke-dasharray 0.7s linear 0s"\n                r="12px"\n                cx="20"\n                cy="20"\n                pathlength="100"\n            ></circle>\n        </svg>\n    </div>\n    <div class="download-circle__down-arrow">\n        <svg\n            class="download-circle__down-arrow-svg_{status}"\n            xmlns="http://www.w3.org/2000/svg"\n        >\n            <path\n                d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z"\n            />\n        </svg>\n        <svg\n            class="download-circle__down-arrow-svg-animated_{status}"\n            fill="white"\n            xmlns="http://www.w3.org/2000/svg"\n        >\n            <path\n                d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z"\n            />\n        </svg>\n    </div>\n</div>\n';

  // src/components/download-circle/download-circle.scss
  var download_circle_default2 = `.download-complete,
.download-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(2);
}
.download-complete__circle,
.download-circle__circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  position: relative;
}
.download-complete__circle-svg,
.download-circle__circle-svg {
  transform: rotate(-90deg);
  display: flex;
  justify-content: center;
  align-items: center;
}
.download-complete__full_in-progress,
.download-circle__full_in-progress {
  fill: none;
  stroke: rgba(255, 255, 255, 0.5);
}
.download-complete__full_complete,
.download-circle__full_complete {
  fill: white;
  stroke: none;
}
.download-complete__partial_complete,
.download-circle__partial_complete {
  display: none;
}
.download-complete__partial_in-progress,
.download-circle__partial_in-progress {
  transition: stroke-dashoffset 0.5s ease;
}
.download-complete__down-arrow,
.download-circle__down-arrow {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}
.download-complete__down-arrow svg,
.download-circle__down-arrow svg {
  width: 24px;
  height: 24px;
}
.download-complete__down-arrow-svg_in-progress,
.download-circle__down-arrow-svg_in-progress {
  fill: rgba(255, 255, 255, 0.5);
}
.download-complete__down-arrow-svg_complete,
.download-circle__down-arrow-svg_complete {
  fill: "white";
}
.download-complete__down-arrow-svg-animated_in-progress,
.download-circle__down-arrow-svg-animated_in-progress {
  position: absolute;
  clip-path: inset(0 0 100% 0);
  animation: pulseColor 2s ease-out infinite;
}
.download-complete__down-arrow-svg-animated_complete,
.download-circle__down-arrow-svg-animated_complete {
  display: none;
}

@keyframes pulseColor {
  0% {
    clip-path: inset(0 0 100% 0);
  }
  30% {
    clip-path: inset(0 0 0 0);
  }
  70% {
    clip-path: inset(0 0 0 0);
  }
  100% {
    clip-path: inset(100% 0 0 0);
  }
}`;

  // src/components/download-circle/download-circle.ts
  function addDownloadCircleInternal(movie, card) {
    const cardJQ = $(card);
    if (!cardJQ.find(".download-circle").length) {
      const progressBar = Lampa.Template.get("download-circle", {
        id: movie.id,
        status: movie.percentDone === 1 ? "complete" : "in-progress",
        progress: 100 * (1 - movie.percentDone)
      });
      cardJQ.find(".card__vote").after(progressBar);
    }
  }
  function addDownloadCircle(movieId, card) {
    const torrent = TorrentsDataStorage.getMovie(movieId);
    if (torrent) {
      addDownloadCircleInternal(torrent, card);
    }
  }
  function updateDownloadCircle(torrent) {
    const elements = document.querySelectorAll(`.download-circle-in-progress-${torrent.id}`);
    if (!elements.length) return;
    elements.forEach((element) => {
      if (torrent.percentDone === 1) {
        const parent = element.parentElement;
        element.remove();
        addDownloadCircleInternal(torrent, parent);
      } else {
        const progressCircle = element.querySelector(".download-circle__partial_in-progress");
        progressCircle == null ? void 0 : progressCircle.setAttribute("stroke-dashoffset", `${100 * (1 - torrent.percentDone)}`);
      }
    });
  }
  function download_circle_default3() {
    Lampa.Template.add("download-circle", download_circle_default);
    $("body").append(`<style>${download_circle_default2}</style>`);
    Lampa.Listener.follow("line", (e) => {
      var _a, _b;
      if (e.type === "append") {
        for (const item of e.items) {
          if ((_a = item == null ? void 0 : item.data) == null ? void 0 : _a.id) {
            addDownloadCircle((_b = item == null ? void 0 : item.data) == null ? void 0 : _b.id, item.card);
          }
        }
      }
    });
  }

  // src/services/background-worker.ts
  var _BackgroundWorker = class _BackgroundWorker {
    static start() {
      const intervalInSeconds = INTERVALS[Lampa.Storage.field(INTERVAL_KEY)];
      if (_BackgroundWorker.subscription) {
        clearInterval(_BackgroundWorker.subscription);
      }
      _BackgroundWorker.errorCount = 0;
      _BackgroundWorker.notified = false;
      _BackgroundWorker.subscription = setInterval(_BackgroundWorker.tick, intervalInSeconds * 1e3);
    }
    static tick() {
      return __async(this, null, function* () {
        try {
          const data = yield TorrentClientFactory.getClient().getData();
          TorrentsDataStorage.setData(data);
          if ($(".d-updatable").length) {
            for (const torrent of data.torrents) {
              updateDownloadCard(torrent);
              updateDownloadCircle(torrent);
              updateDownloadsTab(torrent);
            }
          }
          const url = TorrentClientFactory.getClient().url;
          if (!TorrentClientFactory.isConnected) {
            log("Connected to " + url);
          }
          TorrentClientFactory.isConnected = true;
          _BackgroundWorker.notifyFirstTime(Lampa.Lang.translate("background-worker.connection-success") + ": " + url);
        } catch (error) {
          log("Error:", error);
          TorrentClientFactory.isConnected = false;
          _BackgroundWorker.errorCount++;
          if (_BackgroundWorker.errorCount > 10) {
            clearInterval(_BackgroundWorker.subscription);
            log("Stopping background worker due to too many errors");
            _BackgroundWorker.notifyFirstTime(Lampa.Lang.translate("background-worker.error-detected"));
          }
        }
      });
    }
    static notifyFirstTime(msg) {
      if (!_BackgroundWorker.notified) {
        Lampa.Noty.show(msg);
        _BackgroundWorker.notified = true;
      }
    }
  };
  _BackgroundWorker.errorCount = 0;
  _BackgroundWorker.notified = false;
  var BackgroundWorker = _BackgroundWorker;

  // src/components/downloads-tab/downloads-row.html
  var downloads_row_default = `<div class="downloads-tab__item selector {status}" data-id="{id}">
  <div class="downloads-tab__poster" style="background-image: url('{poster}')"></div>
  <div class="downloads-tab__main">
    <div class="downloads-tab__movie"><span data-field="movieTitle">{title}</span></div>
    <div class="downloads-tab__year"><span data-field="year">{year}</span></div>
    <div class="downloads-tab__file"><span data-field="fileName">{fileName}</span></div>

    <div class="downloads-tab__footer">
      <div class="downloads-tab__meta-top">
        <div class="downloads-tab__meta-left">
          <span class="downloads-tab__meta-text" data-field="percent">{percent}</span>
          <span> \u2022 </span>
          <span class="downloads-tab__meta-text" data-field="seeders">{seeders}</span>
        </div>
        <span class="downloads-tab__speed"><span data-field="speed">{speed}</span></span>
      </div>

      <div class="downloads-tab__progress-wrapper">
        <div class="downloads-tab__progress-fill" style="width: {percent};"></div>
      </div>

      <div class="downloads-tab__meta-bottom">
        <div class="downloads-tab__sizes">
          <span class="downloads-tab__meta-downloaded" data-field="downloadedSize">{downloadedSize}</span>
          <span class="downloads-tab__meta-slash"> / </span>
          <span class="downloads-tab__meta-total" data-field="totalSize">{totalSize}</span>
        </div>
        <span class="downloads-tab__eta" data-field="eta">{eta}</span>
      </div>
    </div>
  </div>
</div>
`;

  // src/components/downloads-tab/downloads-tab.html
  var downloads_tab_default = '<div class="downloads-tab__list d-updatable">\n  <div class="downloads-tab__header-title-wrapper">\n    <div class="downloads-tab__header-title">{server}</div>\n    <div class="downloads-tab__header-size">{freeSpace}</div>\n  </div>\n  <div class="downloads-tab__rows"></div>\n</div>\n';

  // src/components/downloads-tab/downloads-tab.scss
  var downloads_tab_default2 = `@charset "UTF-8";
.downloads-tab__list {
  --color-text-primary: #dbdbdb;
  --color-text-muted: #b1b1b1;
  --fs-header: 1.4em;
  --fs-title: 1.6em;
  --fs-file: 1em;
  --fs-body: 1.2em;
  --sp-after-title: 0.3em;
  --sp-between-text-and-progress: 0.5em;
  --accent-violet: #b67dff;
  --accent-violet-light: #c698ff;
  --card-bg-color: 24, 24, 24;
  --card-bg-alpha: 0.8;
  --card-bg-alpha-hover: 0.6;
  --poster-scale-hover: 1.04;
  color: var(--color-text-muted);
  padding: 1em;
}
.downloads-tab__list .downloads-tab__header-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
  font-size: var(--fs-header);
  font-weight: 700;
  color: var(--color-text-primary);
}
.downloads-tab__list .downloads-tab__rows {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
}
.downloads-tab__item {
  display: grid;
  grid-template-columns: 9em 1fr;
  gap: 1em;
  padding: 0.8em;
  border-radius: 0.6em;
  background: rgba(var(--card-bg-color), var(--card-bg-alpha));
  box-shadow: 0 0.5em 1.2em rgba(0, 0, 0, 0.5);
  transition: background 0.15s ease, box-shadow 0.15s ease;
  /* \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F */
  /* \u043C\u0430\u0441\u0448\u0442\u0430\u0431 \u043F\u043E\u0441\u0442\u0435\u0440\u0430 \u043F\u0440\u0438 hover/focus \u043D\u0430 item */
}
.downloads-tab__item:hover, .downloads-tab__item.focus, .downloads-tab__item:focus-visible {
  outline: 3px solid var(--accent-violet);
  background: rgba(var(--card-bg-color), var(--card-bg-alpha-hover));
}
.downloads-tab__item.downloading .downloads-tab__meta-left {
  display: inline;
}
.downloads-tab__item.completed .downloads-tab__meta-downloaded,
.downloads-tab__item.completed .downloads-tab__meta-slash {
  display: none;
}
.downloads-tab__item:hover .downloads-tab__poster, .downloads-tab__item.focus .downloads-tab__poster, .downloads-tab__item:focus-visible .downloads-tab__poster {
  transform: scale(var(--poster-scale-hover));
}
.downloads-tab__poster {
  position: relative;
  width: 9em;
  height: 13.5em;
  border-radius: 0.6em;
  overflow: hidden;
  background-color: rgb(35, 35, 35);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: transform 0.2s ease;
}
.downloads-tab__poster::after {
  content: "POSTER";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1em;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.08);
  pointer-events: none;
  user-select: none;
}
.downloads-tab__main {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr auto;
  min-height: 13.5em;
}
.downloads-tab__movie {
  font-size: var(--fs-title);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.2;
  margin-bottom: var(--sp-after-title);
  word-break: break-word;
  overflow-wrap: break-word;
}
.downloads-tab__year {
  color: var(--color-text-muted);
  margin-bottom: 0.8em;
  font-weight: bold;
}
.downloads-tab__file {
  font-size: var(--fs-file);
  font-weight: 500;
  color: #727272;
  margin-bottom: var(--sp-between-text-and-progress);
  overflow-wrap: anywhere;
}
.downloads-tab__footer {
  align-self: end;
  display: grid;
  row-gap: var(--sp-between-text-and-progress);
  font-size: var(--fs-body);
  font-weight: 500;
  color: var(--color-text-muted);
}
.downloads-tab__meta-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8em;
}
.downloads-tab__meta-left {
  display: none;
  white-space: nowrap;
}
.downloads-tab__speed {
  font-weight: 600;
  color: var(--color-text-primary);
}
.downloads-tab__progress-wrapper {
  height: 0.5em;
  border-radius: 4px;
  overflow: hidden;
  background: #2a2a2a;
}
.downloads-tab__progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-violet), var(--accent-violet-light));
  will-change: width;
  transition: width 0.25s ease;
}
.downloads-tab__meta-bottom {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  column-gap: 0.8em;
}
.downloads-tab__sizes {
  white-space: nowrap;
}
.downloads-tab__eta {
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .downloads-tab__item, .downloads-tab__poster, .downloads-tab__progress-fill {
    transition: none;
  }
}`;

  // src/components/downloads-tab/menu-button.html
  var menu_button_default = '<li class="menu__item selector">\n    <div class="menu__ico">{icon}</div>\n    <div class="menu__text">{text}</div>\n</li>\n';

  // src/components/downloads-tab/downloads-tab.ts
  var DownloadsTabComponent = class {
    constructor() {
      this.html = $("<div></div>");
      this.lastFocusedElement = null;
    }
    create() {
      if (!TorrentClientFactory.isConnected) {
        BackgroundWorker.start();
      }
      this.scroll = new Lampa.Scroll({ mask: true, over: true, step: 200 });
      const data = TorrentsDataStorage.getData();
      const server = TorrentClientFactory.isConnected ? Lampa.Lang.translate("downloads-tab.connected") + " (" + TorrentClientFactory.getClient().url + ")" : Lampa.Lang.translate("downloads-tab.disconnected");
      const page = $(
        Lampa.Template.get("downloads-tab", {
          server,
          freeSpace: Lampa.Lang.translate("downloads-tab.freespace") + formatBytes(data.info.freeSpace)
        })
      );
      const rowsContainer = page.find(".downloads-tab__rows");
      data.torrents.forEach((torrent) => {
        const fmt = formatTorrent(torrent);
        const $row = $(
          Lampa.Template.get("downloads-row", fmt)
        ).on("hover:focus", (e) => this.scroll.update(e.currentTarget, true)).on("hover:enter", () => openTorrent("downloads-tab", torrent)).on("hover:long", () => openActions("downloads-tab", torrent));
        rowsContainer.append($row);
      });
      this.scroll.minus();
      this.scroll.append(page.get(0));
      this.html.append(this.scroll.render());
    }
    render(js = false) {
      return this.html;
    }
    start() {
      Lampa.Controller.add("downloads-tab", {
        toggle: () => {
          var _a;
          Lampa.Controller.collectionSet(this.scroll.render());
          Lampa.Controller.collectionFocus((_a = this.lastFocusedElement) != null ? _a : false, this.scroll.render());
        },
        left: () => Navigator.canmove("left") ? Navigator.move("left") : Lampa.Controller.toggle("menu"),
        right: () => Navigator.move("right"),
        up: () => {
          ;
          Navigator.canmove("up") ? Navigator.move("up") : Lampa.Controller.toggle("head");
          this.lastFocusedElement = Navigator.getFocusedElement();
        },
        down: () => {
          ;
          Navigator.canmove("down") && Navigator.move("down");
          this.lastFocusedElement = Navigator.getFocusedElement();
        },
        back: () => Lampa.Activity.backward()
      });
      Lampa.Controller.toggle("downloads-tab");
    }
    build(data) {
    }
    bind(data) {
    }
    empty() {
    }
    next() {
    }
    append(data, append) {
    }
    limit() {
    }
    refresh() {
    }
    pause() {
    }
    stop() {
    }
    destroy() {
      this.scroll.destroy();
      this.html.remove();
    }
  };
  function updateDownloadsTab(torrent) {
    const fmt = formatTorrent(torrent);
    const $row = $(document).find(`.downloads-tab__item[data-id="${fmt.id}"]`);
    if (!$row.length) return;
    $row.removeClass("downloading completed paused").addClass(fmt.status);
    $row.find(".downloads-tab__progress-fill").css("width", fmt.percent);
    $row.find(".downloads-tab__poster").css("background-image", `url(${fmt.poster})`);
    Object.keys(fmt).forEach((key) => {
      $row.find(`[data-field="${key}"]`).each(function() {
        $(this).text(fmt[key]);
      });
    });
  }
  function downloads_tab_default3() {
    Lampa.Template.add("menu-button", menu_button_default);
    Lampa.Template.add("downloads-row", downloads_row_default);
    Lampa.Template.add("downloads-tab", downloads_tab_default);
    $("body").append(`<style>${downloads_tab_default2}</style>`);
    Lampa.Component.add("downloads-tab", DownloadsTabComponent);
    const text = Lampa.Lang.translate("downloads");
    const button = $(Lampa.Template.get("menu-button", { icon: icon_default, text }));
    button.on("hover:enter", function() {
      Lampa.Activity.push({
        url: "",
        title: text,
        component: "downloads-tab",
        page: 1
      });
    });
    $(".menu .menu__list").eq(0).append(button);
  }

  // l10n/translations.json
  var translations_default = {
    downloads: {
      ru: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0438",
      en: "Downloads"
    },
    download: {
      ru: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C",
      en: "Download"
    },
    "downloads-tab.connected": {
      ru: "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E",
      en: "Connected"
    },
    "downloads-tab.disconnected": {
      ru: "\u041D\u0435\u0442 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",
      en: "Disconnected"
    },
    "downloads-tab.freespace": {
      ru: "\u0421\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E: ",
      en: "Free space: "
    },
    "download-card.time.0": {
      en: "d",
      ru: "\u0434"
    },
    "download-card.time.1": {
      en: "h",
      ru: "\u0447"
    },
    "download-card.time.2": {
      en: "min",
      ru: "\u043C\u0438\u043D"
    },
    "download-card.time.3": {
      en: "s",
      ru: "\u0441\u0435\u043A"
    },
    "download-card.status.0": {
      en: "stopped",
      ru: "\u043F\u0430\u0443\u0437\u0430"
    },
    "download-card.status.1": {
      en: "queued to verify local data",
      ru: "\u0436\u0434\u0451\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438"
    },
    "download-card.status.2": {
      en: "verifying local data",
      ru: "\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445"
    },
    "download-card.status.3": {
      en: "queued to download",
      ru: "\u0436\u0434\u0451\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438"
    },
    "download-card.status.4": {
      en: "downloading",
      ru: "\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430"
    },
    "download-card.status.5": {
      en: "queued to seed",
      ru: "\u0436\u0434\u0451\u0442 \u0440\u0430\u0437\u0434\u0430\u0447\u0438"
    },
    "download-card.status.6": {
      en: "seeding",
      ru: "\u0440\u0430\u0437\u0434\u0430\u0451\u0442\u0441\u044F"
    },
    "download-card.status.7": {
      en: "isolated",
      ru: "\u043D\u0435\u0442 \u043F\u0438\u0440\u043E\u0432"
    },
    "download-card.status.8": {
      en: "stalled",
      ru: "\u043F\u0440\u043E\u0441\u0442\u0430\u0438\u0432\u0430\u0435\u0442"
    },
    "download-card.status.9": {
      en: "error",
      ru: "\u043E\u0448\u0438\u0431\u043A\u0430"
    },
    "download-card.status.10": {
      en: "allocating",
      ru: "\u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043C\u0435\u0441\u0442\u0430"
    },
    "download-card.status.11": {
      en: "moving",
      ru: "\u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435"
    },
    "download-card.status.12": {
      en: "unknown",
      ru: "\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E"
    },
    "download-card.status.13": {
      en: "initializing",
      ru: "\u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F"
    },
    "download-card.status.14": {
      en: "completed",
      ru: "\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E"
    },
    "download-card.size.0": {
      en: "B",
      ru: "\u0411"
    },
    "download-card.size.1": {
      en: "KB",
      ru: "\u041A\u0411"
    },
    "download-card.size.2": {
      en: "MB",
      ru: "\u041C\u0411"
    },
    "download-card.size.3": {
      en: "GB",
      ru: "\u0413\u0411"
    },
    "download-card.size.4": {
      en: "TB",
      ru: "\u0422\u0411"
    },
    "actions.title": {
      ru: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
      en: "Actions"
    },
    "actions.open": {
      ru: "\u0412\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0441\u0442\u0438",
      en: "Play"
    },
    "actions.open-card": {
      ru: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0444\u0438\u043B\u044C\u043C\u0430",
      en: "Open movie card"
    },
    "actions.select-file": {
      ru: "\u0424\u0430\u0439\u043B\u044B:",
      en: "Files:"
    },
    "actions.pause": {
      ru: "\u041F\u0430\u0443\u0437\u0430",
      en: "Pause"
    },
    "actions.resume": {
      ru: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",
      en: "Resume"
    },
    "actions.hide": {
      ru: "\u0421\u043A\u0440\u044B\u0442\u044C",
      en: "Hide"
    },
    "actions.delete": {
      ru: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
      en: "Delete"
    },
    "actions.delete-with-file": {
      ru: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442 \u0438 \u0444\u0430\u0439\u043B",
      en: "Delete torrent and file"
    },
    "actions.delete-torrent": {
      ru: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442",
      en: "Delete torrent"
    },
    "actions.delete-torrent-keep-file": {
      ru: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442, \u043D\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0444\u0430\u0439\u043B",
      en: "Delete torrent but keep file"
    },
    "background-worker.connection-success": {
      ru: "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E",
      en: "Connection to server successfully established"
    },
    "background-worker.error-detected": {
      ru: "\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u0432 \u043A\u043E\u043D\u0441\u043E\u043B\u0438",
      en: "An error has been detected. See console for details"
    }
  };

  // src/components/download-button/download-button.html
  var download_button_default = '<div class="full-start__button selector button--download">\n    {icon}\n    <span>{text}</span>\n</div>';

  // src/components/download-button/download-button.ts
  function addDownloadButton(data) {
    const button = $(
      Lampa.Template.get("download-button", {
        icon: icon_default,
        text: Lampa.Lang.translate("download")
      })
    );
    button.on("hover:enter", (e) => {
      Lampa.Activity.push({
        url: "",
        title: Lampa.Lang.translate("download"),
        component: "torrents-download",
        // search: combinations[Storage.field('parse_lang')],
        search_one: data.movie.title,
        search_two: data.movie.original_title,
        movie: data.movie,
        page: 1
      });
    });
    $(".full-start-new__buttons").children().first().after(button);
  }
  function download_button_default2() {
    Lampa.Template.add("download-button", download_button_default);
    Lampa.Component.add("torrents-download", Lampa.Component.get("torrents"));
    Lampa.Listener.follow("full", (e) => {
      if (e.type === "complite") {
        const data = e.data;
        addDownloadButton(data);
      }
    });
    Lampa.Listener.follow("torrent", (e) => {
      const component = Lampa.Activity.active();
      if (e.type === "render" && component.component === "torrents-download") {
        $(e.item).off("hover:enter");
        $(e.item).on("hover:enter", (a) => __async(this, null, function* () {
          yield TorrentClientFactory.getClient().addTorrent(component.movie, e.element);
          component.activity.component.mark(e.element, e.item, true);
          const allowMultiple = Lampa.Storage.get(ALLOW_MULTIPLE_DOWNLOADS_KEY, false);
          if (!allowMultiple) {
            Lampa.Activity.back();
            const torrents = yield TorrentClientFactory.getClient().getTorrents();
            const torrent = torrents.find((t) => t.id === component.movie.id);
            addDownloadCard(torrent, component.movie);
          }
        }));
      }
    });
  }

  // src/main.ts
  function startPlugin() {
    ;
    window.plugin_transmission_ready = true;
    Lampa.Manifest.plugins = manifest_default;
    Lampa.Lang.add(translations_default);
    settings();
    download_button_default2();
    download_card_default3();
    downloads_tab_default3();
    download_circle_default3();
    const isConfigured = Lampa.Storage.field(URL_KEY);
    if (isConfigured) {
      BackgroundWorker.start();
    }
  }
  if (!window.plugin_transmission_ready) {
    if (window.appready) startPlugin();
    else {
      Lampa.Listener.follow("app", function(e) {
        if (e.type === "ready") startPlugin();
      });
    }
  }
})();
