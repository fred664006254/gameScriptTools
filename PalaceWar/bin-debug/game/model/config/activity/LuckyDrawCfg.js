var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var LuckyDrawCfg = (function () {
            function LuckyDrawCfg() {
            }
            /**
             * 初始化数据
             */
            LuckyDrawCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
            };
            /**解析翻牌奖池 */
            LuckyDrawCfg.prototype.getWealthGod = function () {
                var rewards = "";
                // for(let key in this.prizePool)
                // {
                for (var i in this.prizePool[0].prize) {
                    var unit = this.prizePool[0].prize[i];
                    rewards += unit[0] + "|";
                }
                //}
                return rewards.substring(0, rewards.length - 1);
            };
            /**
            * 炫光特效
            */
            LuckyDrawCfg.prototype.isSpecial = function (data) {
                for (var i in this.prizePool[0].prize) {
                    var unit = this.prizePool[0].prize[i];
                    if (unit[0] === data && unit[2] == 1) {
                        return true;
                    }
                }
                return false;
            };
            LuckyDrawCfg.prototype.getTotalProgress = function () {
                return this.achievement[this.achievement.length - 1].needNum;
            };
            LuckyDrawCfg.prototype.getSkinBone = function (code) {
                var cfg = null;
                switch (Number(code)) {
                    case 1:
                    case 3:
                        cfg = Config.WifeskinCfg.getWifeCfgById("1072");
                        break;
                    case 2:
                    case 4:
                        cfg = Config.ServantskinCfg.getServantSkinItemById("20011");
                        break;
                    case 5:
                    case 6:
                        cfg = Config.WifeCfg.getWifeCfgById("232");
                        break;
                    case 7:
                        cfg = Config.WifeskinCfg.getWifeCfgById("2031");
                        break;
                    case 8:
                        cfg = Config.WifeskinCfg.getWifeCfgById("2111");
                        break;
                }
                return cfg.bone ? cfg.bone : '';
            };
            LuckyDrawCfg.prototype.getSkinName = function (code) {
                var cfg = null;
                switch (Number(code)) {
                    case 1:
                    case 3:
                        cfg = Config.WifeskinCfg.getWifeCfgById("1072");
                        break;
                    case 2:
                    case 4:
                        cfg = Config.ServantskinCfg.getServantSkinItemById("20011");
                        break;
                    case 5:
                    case 6:
                        cfg = Config.WifeCfg.getWifeCfgById("232");
                        break;
                    case 7:
                        cfg = Config.WifeskinCfg.getWifeCfgById("2031");
                        break;
                    case 8:
                        cfg = Config.WifeskinCfg.getWifeCfgById("2111");
                        break;
                }
                return cfg.name ? cfg.name : '';
            };
            LuckyDrawCfg.prototype.getSkin = function (code) {
                var skin = '';
                switch (Number(code)) {
                    case 1:
                    case 3:
                        skin = "1072";
                        break;
                    case 2:
                    case 4:
                        skin = "20011";
                        break;
                    case 7:
                        skin = "2031";
                        break;
                    case 8:
                        skin = "2111";
                        break;
                }
                return skin;
            };
            LuckyDrawCfg.prototype.getServantNeed = function () {
                if (this.servant) {
                    for (var k in this.recharge) {
                        var v = this.recharge[k];
                        var rewards = GameData.formatRewardItem(v.getReward);
                        for (var i = 0; i < rewards.length; i++) {
                            var onevo = rewards[i];
                            if (onevo.type == 8 && onevo.id == Number(this.servant)) {
                                return v.needGem;
                            }
                        }
                    }
                }
                return 0;
            };
            LuckyDrawCfg.prototype.getWifeNeed = function () {
                if (this.wife) {
                    for (var k in this.achievement) {
                        var v = this.achievement[k];
                        var rewards = GameData.formatRewardItem(v.getReward);
                        for (var i = 0; i < rewards.length; i++) {
                            var onevo = rewards[i];
                            if (onevo.type == 10 && onevo.id == Number(this.wife)) {
                                return v.needNum;
                            }
                        }
                    }
                }
                return 0;
            };
            return LuckyDrawCfg;
        }());
        AcCfg.LuckyDrawCfg = LuckyDrawCfg;
        __reflect(LuckyDrawCfg.prototype, "Config.AcCfg.LuckyDrawCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=LuckyDrawCfg.js.map