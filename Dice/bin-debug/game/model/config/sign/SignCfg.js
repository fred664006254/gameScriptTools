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
    var SignCfg;
    (function (SignCfg) {
        var signCfg = {};
        var signKeys = [];
        var signLoopKeys = [];
        function formatData(data) {
            var signList = data.signReward;
            for (var key in signList) {
                if (signList.hasOwnProperty(key)) {
                    var item = new SiginCfgItem();
                    item.initData(signList[key]);
                    signCfg[key] = item;
                    if (Number(key) <= 7) {
                        signKeys.push(key);
                    }
                    else {
                        signLoopKeys.push(key);
                    }
                }
            }
            signKeys.splice(6, 1);
            signLoopKeys.splice(6, 1);
        }
        SignCfg.formatData = formatData;
        function getSignInfoByID(id) {
            return signCfg[id].getReward;
        }
        SignCfg.getSignInfoByID = getSignInfoByID;
        function getSkinInfo() {
            return signCfg;
        }
        SignCfg.getSkinInfo = getSkinInfo;
        // export function getIsDefaultSkin(id:string):boolean{
        //     if(signCfg[id].getType == 1&&String(Api.LineVoApi.getUseSkinID()) == id){
        //         return false;
        //     }else{
        //         return true;
        //     }
        // }
        function getSgnIDs() {
            return signKeys;
        }
        SignCfg.getSgnIDs = getSgnIDs;
        function getSgnLoopIDs() {
            return signLoopKeys;
        }
        SignCfg.getSgnLoopIDs = getSgnLoopIDs;
    })(SignCfg = Config.SignCfg || (Config.SignCfg = {}));
    var SiginCfgItem = (function (_super) {
        __extends(SiginCfgItem, _super);
        function SiginCfgItem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**是否循环 */
            _this.isLoop = "";
            /**获得的宝箱ID */
            _this.getReward = "";
            return _this;
        }
        return SiginCfgItem;
    }(BaseItemCfg));
    Config.SiginCfgItem = SiginCfgItem;
    __reflect(SiginCfgItem.prototype, "Config.SiginCfgItem");
})(Config || (Config = {}));
//# sourceMappingURL=SignCfg.js.map