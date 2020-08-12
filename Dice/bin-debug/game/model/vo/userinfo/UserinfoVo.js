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
var UserinfoVo = (function (_super) {
    __extends(UserinfoVo, _super);
    function UserinfoVo() {
        var _this = _super.call(this) || this;
        _this.uid = 0;
        _this.name = "";
        /** 公会ID */
        _this.mygid = 0;
        /** 公会名称 */
        _this.mygname = "";
        /** 等级 */
        _this.level = 0;
        /** 目前的奖杯 */
        _this.score = 0;
        /** 最大的奖杯数 */
        _this.maxscore = 0;
        /** 金币 */
        _this.gold = 0;
        /** 钻石 */
        _this.gem = 0;
        /** 卡的数量 */
        _this.card = 0;
        /** 胜利次数 */
        _this.win = 0;
        /** 失败次数 */
        _this.lose = 0;
        /** 最大回合数 */
        _this.maxturn = 0;
        /** 购买货币 */
        _this.buyg = 0;
        /** 最后购买时间 */
        _this.buyt = 0;
        /** 累计购买次数 */
        _this.buyn = 0;
        /** 免费获得货币 */
        _this.freeg = 0;
        /** 总对战次数 */
        _this.sumb = 0;
        return _this;
    }
    UserinfoVo.prototype.initData = function (data) {
        if (data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
        // this.score = App.MathUtil.getRandom(0,5000);
    };
    UserinfoVo.prototype.dispose = function () {
        this.uid = 0;
        this.name = "";
        this.mygid = 0;
        this.mygname = "";
        this.level = 0;
        this.score = 0;
        this.maxscore = 0;
        this.gold = 0;
        this.gem = 0;
        this.card = 0;
        this.win = 0;
        this.lose = 0;
        this.maxturn = 0;
        this.buyg = 0;
        this.buyt = 0;
        this.buyn = 0;
        this.freeg = 0;
        this.sumb = 0;
    };
    return UserinfoVo;
}(BaseVo));
__reflect(UserinfoVo.prototype, "UserinfoVo");
//# sourceMappingURL=UserinfoVo.js.map