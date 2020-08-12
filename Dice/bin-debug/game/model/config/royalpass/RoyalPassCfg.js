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
     * 商店配置类
     * author qianjun
     * @class ShopCfg
     */
    var RoyalpassCfg;
    (function (RoyalpassCfg) {
        //解锁 皇家政令 所需充值档位
        var needRecharge = "";
        //皇家政令
        var royalPass = {};
        function formatData(data) {
            needRecharge = data.needRecharge;
            for (var key in data.royalPass) {
                var itemCfg = void 0;
                if (!royalPass.hasOwnProperty(String(key))) {
                    royalPass[String(key)] = new RoyalPassItemCfg();
                }
                itemCfg = royalPass[String(key)];
                itemCfg.initData(data.royalPass[key]);
                itemCfg.id = Number(key);
            }
        }
        RoyalpassCfg.formatData = formatData;
        function getRoyalPassCfgList() {
            var arr = [];
            for (var i in royalPass) {
                arr.push(royalPass[i]);
            }
            return arr;
        }
        RoyalpassCfg.getRoyalPassCfgList = getRoyalPassCfgList;
        function getRoyalPassCfgById(id) {
            var cfg = royalPass[id];
            return cfg;
        }
        RoyalpassCfg.getRoyalPassCfgById = getRoyalPassCfgById;
        function getRoyalPassMaxLevel() {
            return Object.keys(royalPass).length;
        }
        RoyalpassCfg.getRoyalPassMaxLevel = getRoyalPassMaxLevel;
        function getRechargeType() {
            return needRecharge;
        }
        RoyalpassCfg.getRechargeType = getRechargeType;
        function getNowProgressId(score, isScrid) {
            var id = 0;
            if (score == null || score == undefined || score == NaN) {
                score = Api.UserinfoVoApi.getMaxScore();
            }
            var arr = getRoyalPassCfgList();
            for (var i = 0; i < arr.length; ++i) {
                var unit = arr[i];
                if (score >= unit.needScore) {
                    id = unit.id;
                    if (isScrid) {
                        if (Api.GameinfoVoApi.canGetRoyalPassRewardByLevel(id, 1) ||
                            (Api.GameinfoVoApi.getIsBuyRoyalPass() && Api.GameinfoVoApi.canGetRoyalPassRewardByLevel(id, 2))) {
                            break;
                        }
                    }
                }
            }
            return id;
        }
        RoyalpassCfg.getNowProgressId = getNowProgressId;
        function getNextNeedByScore(score) {
            var need = 0;
            var id = getNowProgressId(score);
            var nextcfg = royalPass[id + 1];
            if (nextcfg) {
                need = nextcfg.needScore;
            }
            return need;
        }
        RoyalpassCfg.getNextNeedByScore = getNextNeedByScore;
        function getPrevNeedByScore(score) {
            var need = 0;
            var id = getNowProgressId(score);
            var prevcfg = royalPass[id - 1];
            if (prevcfg) {
                need = prevcfg.needScore;
            }
            return need;
        }
        RoyalpassCfg.getPrevNeedByScore = getPrevNeedByScore;
    })(RoyalpassCfg = Config.RoyalpassCfg || (Config.RoyalpassCfg = {}));
    var RoyalPassItemCfg = (function (_super) {
        __extends(RoyalPassItemCfg, _super);
        function RoyalPassItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RoyalPassItemCfg;
    }(BaseItemCfg));
    Config.RoyalPassItemCfg = RoyalPassItemCfg;
    __reflect(RoyalPassItemCfg.prototype, "Config.RoyalPassItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=RoyalPassCfg.js.map