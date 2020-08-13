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
    /**
     * 册封配置
     */
    var WifestatusCfg;
    (function (WifestatusCfg) {
        var wifestatusListCfg = [];
        function formatData(data) {
            for (var key in data) {
                var itemCfg = new WifestatusItemCfg();
                // if(!wifestatusListCfg.hasOwnProperty(String(key)))
                // {
                // wifestatusListCfg[String(key)]=new WifestatusItemCfg();
                // }
                // itemCfg=wifestatusListCfg[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
                wifestatusListCfg.push(itemCfg);
            }
            wifestatusListCfg.reverse();
            // egret.log("123")
        }
        WifestatusCfg.formatData = formatData;
        function getWifestatusCfgByID(id) {
            for (var index = 0; index < wifestatusListCfg.length; index++) {
                var element = wifestatusListCfg[index];
                if (element.id == id) {
                    return element;
                }
            }
            return null;
            // return wifestatusListCfg[String(id)];
        }
        WifestatusCfg.getWifestatusCfgByID = getWifestatusCfgByID;
        function getWifestatusList() {
            return wifestatusListCfg;
        }
        WifestatusCfg.getWifestatusList = getWifestatusList;
        /**
         * 获取最大长度
         */
        function getMaxLength() {
            return Object.keys(wifestatusListCfg).length;
        }
        WifestatusCfg.getMaxLength = getMaxLength;
    })(WifestatusCfg = Config.WifestatusCfg || (Config.WifestatusCfg = {}));
    var WifestatusItemCfg = (function (_super) {
        __extends(WifestatusItemCfg, _super);
        function WifestatusItemCfg() {
            return _super.call(this) || this;
        }
        return WifestatusItemCfg;
    }(BaseItemCfg));
    Config.WifestatusItemCfg = WifestatusItemCfg;
    __reflect(WifestatusItemCfg.prototype, "Config.WifestatusItemCfg");
})(Config || (Config = {}));
