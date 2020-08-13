var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AtkraceServantVo = /** @class */ (function (_super) {
    __extends(AtkraceServantVo, _super);
    function AtkraceServantVo() {
        var _this = _super.call(this) || this;
        /**
         * 当前属性
         */
        _this.attr = 0;
        /**
         * 满血
         */
        _this.fullattr = 0;
        /**
         * 总资质
         */
        _this.ability = 0;
        /**
         * 等级
         */
        _this.lv = 0;
        /**
         * 门客id
         */
        _this.sid = null;
        /**
         * 技能1等级
         */
        _this.s1lv = 0;
        /**
         * 技能2等级
         */
        _this.s2lv = 0;
        /**
         * 爵位
         */
        _this.clv = 0;
        /**
         * 穿着皮肤
        */
        _this.equip = "";
        _this.weaponDps = 0;
        return _this;
    }
    AtkraceServantVo.prototype.initData = function (data) {
        if (data) {
            this.attr = data.attr;
            this.fullattr = data.fullattr;
            this.ability = data.ability;
            this.lv = data.lv;
            this.sid = data.sid;
            this.s1lv = data.s1lv;
            this.s2lv = data.s2lv;
            this.equip = data.equip;
            if (this.clv != null) {
                this.clv = data.clv;
            }
            this.weaponDps = data.weaponDps;
        }
    };
    AtkraceServantVo.prototype.dispose = function () {
        this.id = null;
        this.attr = 0;
        this.fullattr = 0;
        this.ability = 0;
        this.lv = 0;
        this.sid = null;
        this.s1lv = 0;
        this.s2lv = 0;
        this.clv = 0;
        this.equip = "";
        this.weaponDps = 0;
    };
    return AtkraceServantVo;
}(BaseVo));
//# sourceMappingURL=AtkraceServantVo.js.map