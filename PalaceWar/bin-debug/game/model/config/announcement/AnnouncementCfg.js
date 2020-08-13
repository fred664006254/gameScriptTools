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
    var AnnouncementCfg;
    (function (AnnouncementCfg) {
        var announcementNum;
        var announcements = [];
        function formatData(data) {
            data = data[0];
            announcementNum = data.announcementNum;
            announcements.length = 0;
            for (var key in data.priority) {
                var itemCfg = new AnnouncementItemCfg();
                itemCfg.initData(data.priority[key]);
                announcements.push(itemCfg);
            }
        }
        AnnouncementCfg.formatData = formatData;
        function getMaxNum() {
            return announcementNum;
        }
        AnnouncementCfg.getMaxNum = getMaxNum;
        function getAnnouncements() {
            return announcements;
        }
        AnnouncementCfg.getAnnouncements = getAnnouncements;
        var AnnouncementItemCfg = (function (_super) {
            __extends(AnnouncementItemCfg, _super);
            function AnnouncementItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.label = 0;
                _this.head = 0;
                _this.type = [];
                _this.activityType = null;
                _this.codeNum = null;
                return _this;
            }
            return AnnouncementItemCfg;
        }(BaseItemCfg));
        AnnouncementCfg.AnnouncementItemCfg = AnnouncementItemCfg;
        __reflect(AnnouncementItemCfg.prototype, "Config.AnnouncementCfg.AnnouncementItemCfg");
    })(AnnouncementCfg = Config.AnnouncementCfg || (Config.AnnouncementCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=AnnouncementCfg.js.map