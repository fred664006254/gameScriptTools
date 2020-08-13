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
    // 召回好友配置
    var PlayercomebackCfg;
    (function (PlayercomebackCfg) {
        //--超过15天未登录，才可接受召回
        PlayercomebackCfg.needDay = 0;
        //--且 权势 大于等于 X ，才可接受召回
        PlayercomebackCfg.needPower = 0;
        // 召回后获得奖励
        PlayercomebackCfg.backReward = '';
        //邀请好友回归的玩家，根据召回人数不同，获得不同奖励
        PlayercomebackCfg.comeReward = [];
        //--3天内才可以填写
        PlayercomebackCfg.limitDay = 7;
        function formatData(data) {
            this.backReward = data.backReward;
            this.needDay = data.needDay;
            this.needPower = data.needPower;
            for (var key in data.comeReward) {
                var itemCfg = void 0;
                var id = Number(key) + 1;
                if (!this.comeReward.hasOwnProperty(String(key))) {
                    this.comeReward[String(key)] = new ComebackTaskCfg();
                }
                itemCfg = this.comeReward[String(key)];
                itemCfg.initData(data.comeReward[key]);
                itemCfg.id = id;
            }
        }
        PlayercomebackCfg.formatData = formatData;
    })(PlayercomebackCfg = Config.PlayercomebackCfg || (Config.PlayercomebackCfg = {}));
    var ComebackTaskCfg = (function (_super) {
        __extends(ComebackTaskCfg, _super);
        function ComebackTaskCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ComebackTaskCfg;
    }(BaseItemCfg));
    Config.ComebackTaskCfg = ComebackTaskCfg;
    __reflect(ComebackTaskCfg.prototype, "Config.ComebackTaskCfg");
})(Config || (Config = {}));
//# sourceMappingURL=PlayerComeBackCfg.js.map