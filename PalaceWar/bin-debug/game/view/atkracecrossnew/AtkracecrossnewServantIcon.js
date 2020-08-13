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
var AtkracecrossnewServantIcon = /** @class */ (function (_super) {
    __extends(AtkracecrossnewServantIcon, _super);
    function AtkracecrossnewServantIcon() {
        var _this = _super.call(this) || this;
        _this._sid = null;
        _this._choose = false;
        _this._flag1 = null;
        _this._flag2 = null;
        _this._obj = null;
        _this._func = null;
        return _this;
    }
    AtkracecrossnewServantIcon.prototype.init = function (sid, choose, f, o) {
        this._sid = sid;
        this._choose = choose;
        this._func = f;
        this._obj = o;
        var view = this;
        var servantInfoVo = Api.servantVoApi.getServantObj(sid);
        var temW = 105;
        var iconBgBt = BaseLoadBitmap.create(servantInfoVo ? servantInfoVo.qualityBoxImgPath : 'servant_cardbg_0');
        this.addChild(iconBgBt);
        iconBgBt.scaleX = temW / 194;
        iconBgBt.scaleY = temW / 192;
        var iconBt = BaseLoadBitmap.create(servantInfoVo ? servantInfoVo.halfImgPath : 'servant_half_empty');
        iconBt.x = iconBgBt.x + 5;
        iconBt.y = iconBgBt.y + 5;
        this.addChild(iconBt);
        iconBt.scaleX = (temW - 10) / 180;
        iconBt.scaleY = (temW - 10) / 177;
        iconBt.addTouchTap(this.touchHandler, this);
        //兵力数目
        var numbg = BaseBitmap.create("servant_namebg");
        numbg.width = 98;
        numbg.height = 24;
        numbg.setPosition(1, 75);
        this.addChild(numbg);
        var zizhistr = LanguageManager.getlocal("emperorWarBuzhenZzhi", [String(servantInfoVo.getTotalBookValue(0))]);
        var zizhiText = ComponentManager.getTextField(zizhistr, 18, TextFieldConst.COLOR_WHITE);
        if (PlatformManager.checkIsThSp()) {
            zizhiText.size = 14;
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, zizhiText, numbg);
        this.addChild(zizhiText);
        var flag1 = BaseBitmap.create("newcrossatkrace_gone");
        flag1.setPosition(-6, -6);
        this.addChild(flag1);
        this._flag1 = flag1;
        var flag2 = BaseBitmap.create("newcrossatkrace_check");
        flag2.setPosition(100 - flag2.width + 5, 100 - flag2.height + 5);
        this.addChild(flag2);
        this._flag2 = flag2;
        this.resetFlag();
    };
    AtkracecrossnewServantIcon.prototype.resetFlag = function () {
        this._flag1.visible = this._choose;
        this._flag2.visible = this._choose;
    };
    AtkracecrossnewServantIcon.prototype.setCheck = function () {
        this._choose = !this._choose;
        this.resetFlag();
    };
    AtkracecrossnewServantIcon.prototype.getChoose = function () {
        return this._choose;
    };
    AtkracecrossnewServantIcon.prototype.getSid = function () {
        return this._sid;
    };
    AtkracecrossnewServantIcon.prototype.touchHandler = function () {
        this._func.apply(this._obj, [this]);
    };
    AtkracecrossnewServantIcon.prototype.dispose = function () {
        this._sid = null;
        this._choose = false;
        this._flag1 = null;
        this._flag2 = null;
        this._obj = null;
        this._func = null;
        _super.prototype.dispose.call(this);
    };
    return AtkracecrossnewServantIcon;
}(BaseDisplayObjectContainer));
//# sourceMappingURL=AtkracecrossnewServantIcon.js.map