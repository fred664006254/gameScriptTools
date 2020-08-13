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
var Config;
(function (Config) {
    var StudyatkCfg;
    (function (StudyatkCfg) {
        var studyatkList = {};
        var maxLevel = 0;
        function formatData(data) {
            studyatkList = {};
            maxLevel = 0;
            for (var key in data) {
                var itemCfg = void 0;
                if (!studyatkList.hasOwnProperty(String(key))) {
                    studyatkList[String(key)] = new StudyatkItemCfg();
                }
                itemCfg = studyatkList[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
                maxLevel = Math.max(maxLevel, Number(key));
            }
        }
        StudyatkCfg.formatData = formatData;
        function getStudyatkCfgById(id) {
            return studyatkList[id];
        }
        StudyatkCfg.getStudyatkCfgById = getStudyatkCfgById;
        function getStudyatkList() {
            return studyatkList;
        }
        StudyatkCfg.getStudyatkList = getStudyatkList;
        function getMaxLevel() {
            return maxLevel;
        }
        StudyatkCfg.getMaxLevel = getMaxLevel;
    })(StudyatkCfg = Config.StudyatkCfg || (Config.StudyatkCfg = {}));
    var StudyatkItemCfg = (function (_super) {
        __extends(StudyatkItemCfg, _super);
        function StudyatkItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StudyatkItemCfg;
    }(BaseItemCfg));
    __reflect(StudyatkItemCfg.prototype, "StudyatkItemCfg");
})(Config || (Config = {}));
