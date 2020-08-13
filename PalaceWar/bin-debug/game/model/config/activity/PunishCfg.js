var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var PunishCfg = (function () {
            function PunishCfg() {
                this.itemNum = 0;
            }
            PunishCfg.prototype.formatData = function (data) {
                if (data) {
                    for (var key in data) {
                        this[key] = data[key];
                    }
                }
            };
            PunishCfg.prototype.getHp = function (day) {
                var hp = 0;
                hp = this.Hp;
                // day = Math.min(this.punishhp[this.punishhp.length -1].day, day);
                // for(let i in this.punishhp){
                // 	let unit = this.punishhp[i];
                // 	if(unit.day == day || unit.day.indexOf(day) > -1){
                // 		hp = unit.Hp;
                // 		break; 
                // 	}
                // }
                return hp;
            };
            return PunishCfg;
        }());
        AcCfg.PunishCfg = PunishCfg;
        __reflect(PunishCfg.prototype, "Config.AcCfg.PunishCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=PunishCfg.js.map