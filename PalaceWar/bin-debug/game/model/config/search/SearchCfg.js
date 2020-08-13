var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 配置
 */
var Config;
(function (Config) {
    /**
     * 寻访配置
     */
    var SearchCfg;
    (function (SearchCfg) {
        var personList = {};
        var buildList = {};
        function formatData(data) {
            for (var key in data) {
                if (typeof (data[key]) == "object") {
                    if (key == "personList") {
                        formatpersonList(data[key]);
                    }
                    else if (key == "buildList") {
                        formatbuildList(data[key]);
                    }
                }
                else {
                    SearchCfg[key] = data[key];
                }
            }
        }
        SearchCfg.formatData = formatData;
        function formatpersonList(data) {
            for (var key in data) {
                var itemCfg = new SearchPersonItemCfg();
                itemCfg.initData(data[key]);
                itemCfg.personId = String(key);
                personList[key] = itemCfg;
            }
        }
        function formatbuildList(data) {
            for (var key in data) {
                var itemCfg = new SearchBuildItemCfg();
                itemCfg.initData(data[key]);
                buildList[key] = itemCfg;
            }
        }
        function getRandromPersonId() {
            var keys = Object.keys(personList);
            var l = keys.length;
            var selectIndex = Math.floor(Math.random() * l);
            return String(keys[selectIndex]);
        }
        SearchCfg.getRandromPersonId = getRandromPersonId;
        function getPersonItemCfgByPersonId(personId) {
            return personList[personId];
        }
        SearchCfg.getPersonItemCfgByPersonId = getPersonItemCfgByPersonId;
        function getPersonItemCfgByWifeId(wifeId) {
            var resultList = [];
            var itemCfg = null;
            for (var key in personList) {
                itemCfg = personList[key];
                if (String(wifeId) == String(itemCfg.wifeId) && !Config.WifeCfg.checkIsLockedByGM(itemCfg.wifeId)) {
                    return itemCfg;
                }
            }
            return null;
        }
        SearchCfg.getPersonItemCfgByWifeId = getPersonItemCfgByWifeId;
        function getPersonItemCfgListByBuildId(buildId) {
            var resultList = [];
            var itemCfg = null;
            for (var key in personList) {
                itemCfg = personList[key];
                if (Number(buildId) == Number(itemCfg.build)) {
                    if (itemCfg.wifeId && Config.WifeCfg.checkIsLockedByGM(String(itemCfg.wifeId))) {
                        continue;
                    }
                    if (itemCfg.servantId && Config.ServantCfg.checkIsLockedByGM(String(itemCfg.servantId))) {
                        continue;
                    }
                    resultList.push(itemCfg);
                }
            }
            return resultList;
        }
        SearchCfg.getPersonItemCfgListByBuildId = getPersonItemCfgListByBuildId;
    })(SearchCfg = Config.SearchCfg || (Config.SearchCfg = {}));
    var SearchPersonItemCfg = (function (_super) {
        __extends(SearchPersonItemCfg, _super);
        function SearchPersonItemCfg() {
            return _super.call(this) || this;
        }
        Object.defineProperty(SearchPersonItemCfg.prototype, "personFullIcon", {
            get: function () {
                var icon;
                if (this.type == 2) {
                    icon = Config.WifeCfg.getWifeCfgById(this.wifeId).body;
                }
                else if (this.servantId) {
                    var item = Config.ServantCfg.getServantItemById(this.servantId); //Api.servantVoApi.getFullImgPathWithId(this.servantId);
                    icon = item.fullIcon;
                }
                else {
                    icon = "searchnpc_full" + this.personId;
                }
                return icon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SearchPersonItemCfg.prototype, "fullIconSize", {
            get: function () {
                var size;
                if (this.type == 2) {
                    size = { width: 640, height: 840 };
                }
                else if (this.servantId) {
                    size = { width: 405, height: 467 };
                }
                else {
                    size = { width: 405, height: 467 };
                }
                return size;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SearchPersonItemCfg.prototype, "name", {
            get: function () {
                var localKey;
                var wifeCfg = Config.WifeCfg.getWifeCfgById(this.wifeId);
                if (this.type == 2) {
                    localKey = "wifeName_" + this.wifeId;
                    if (wifeCfg && wifeCfg.isBule()) {
                        localKey = "wifeName_" + this.wifeId + "_male";
                    }
                }
                else {
                    localKey = "searchPersonName" + this.personId;
                    if (wifeCfg && wifeCfg.isBule()) {
                        localKey = "searchPersonName" + this.personId + "_male";
                    }
                }
                return LanguageManager.getlocal(localKey);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SearchPersonItemCfg.prototype, "shortDesc", {
            get: function () {
                var wifeCfg = Config.WifeCfg.getWifeCfgById(this.wifeId);
                if (wifeCfg && wifeCfg.isBule()) {
                    return LanguageManager.getlocal("searchPersonshortDesc" + this.personId + "_male");
                }
                return LanguageManager.getlocal("searchPersonshortDesc" + this.personId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SearchPersonItemCfg.prototype, "desc", {
            get: function () {
                var wifeCfg = Config.WifeCfg.getWifeCfgById(this.wifeId);
                if (wifeCfg && wifeCfg.isBule()) {
                    return LanguageManager.getlocal("searchPersonDesc" + this.personId + "_male");
                }
                return LanguageManager.getlocal("searchPersonDesc" + this.personId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SearchPersonItemCfg.prototype, "sound", {
            get: function () {
                var wifeCfg = Config.WifeCfg.getWifeCfgById(this.wifeId);
                if (wifeCfg && wifeCfg.isBule()) {
                    return LanguageManager.getlocal("searchPersonTalk" + this.personId + "_male");
                }
                return "searchPersonTalk" + this.personId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SearchPersonItemCfg.prototype, "words", {
            get: function () {
                var wifeCfg = Config.WifeCfg.getWifeCfgById(this.wifeId);
                if (wifeCfg && wifeCfg.isBule()) {
                    return LanguageManager.getlocal("searchPersonTalk" + this.personId + "_cn" + "_male");
                }
                return LanguageManager.getlocal("searchPersonTalk" + this.personId + "_cn");
            },
            enumerable: true,
            configurable: true
        });
        return SearchPersonItemCfg;
    }(BaseItemCfg));
    __reflect(SearchPersonItemCfg.prototype, "SearchPersonItemCfg");
    var SearchBuildItemCfg = (function (_super) {
        __extends(SearchBuildItemCfg, _super);
        function SearchBuildItemCfg() {
            return _super.call(this) || this;
        }
        return SearchBuildItemCfg;
    }(BaseItemCfg));
    __reflect(SearchBuildItemCfg.prototype, "SearchBuildItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=SearchCfg.js.map