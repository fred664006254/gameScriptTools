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
    var BattleskinCfg;
    (function (BattleskinCfg) {
        var skinCfg = {};
        var skinKeys = [];
        function formatData(data) {
            var skinList = data.skinList;
            for (var key in skinList) {
                if (skinList.hasOwnProperty(key)) {
                    var item = new BattleSkinCfgItem();
                    item.initData(skinList[key]);
                    skinCfg[key] = item;
                    skinKeys.push(key);
                }
            }
        }
        BattleskinCfg.formatData = formatData;
        function getSkinInfoByID(id) {
            return skinCfg[id];
        }
        BattleskinCfg.getSkinInfoByID = getSkinInfoByID;
        function getSkinInfo() {
            return skinCfg;
        }
        BattleskinCfg.getSkinInfo = getSkinInfo;
        function getIsDefaultSkin(id) {
            if (skinCfg[id].getType == 1 && String(Api.LineVoApi.getUseSkinID()) == id) {
                return false;
            }
            else {
                return true;
            }
        }
        BattleskinCfg.getIsDefaultSkin = getIsDefaultSkin;
        function getSkinIDs() {
            return skinKeys;
        }
        BattleskinCfg.getSkinIDs = getSkinIDs;
    })(BattleskinCfg = Config.BattleskinCfg || (Config.BattleskinCfg = {}));
    var BattleSkinCfgItem = (function (_super) {
        __extends(BattleSkinCfgItem, _super);
        function BattleSkinCfgItem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**皮肤列表上的排序 */
            _this.sortId = 0;
            /**获得方式 */
            _this.getType = 0;
            /**需要的奖杯数 */
            _this.needScore = 0;
            /**需要的钻石数 */
            _this.costGem = 0;
            return _this;
        }
        return BattleSkinCfgItem;
    }(BaseItemCfg));
    Config.BattleSkinCfgItem = BattleSkinCfgItem;
    __reflect(BattleSkinCfgItem.prototype, "Config.BattleSkinCfgItem");
})(Config || (Config = {}));
//# sourceMappingURL=BattleskinCfg.js.map