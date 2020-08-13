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
/**
 * Vip折扣
 * author 赵占涛
 * date 2018/1/31
 * @class AcDiscountView
 */
var AcDiscountView = (function (_super) {
    __extends(AcDiscountView, _super);
    function AcDiscountView() {
        var _this = _super.call(this) || this;
        _this._acBaseVoList = [];
        return _this;
    }
    AcDiscountView.prototype.initView = function () {
        //顶部背景图片
        var forpeople_top = BaseBitmap.create("forpeople_top");
        this.addChildToContainer(forpeople_top);
        forpeople_top.y = -50;
        //描述 
        var acDescTxt = ComponentManager.getTextField(LanguageManager.getlocal("acDiscount_desc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(acDescTxt);
        acDescTxt.x = 30;
        // acDescTxt.y = 20;
        acDescTxt.width = 550;
        this._acBaseVoList = Api.acVoApi.getActivityVoListByAid(this.aid);
        var rect = new egret.Rectangle(0, 0, 640, GameConfig.stageHeigth - 210);
        this._scrollList = ComponentManager.getScrollList(AcDiscountViewScrollItem, this._acBaseVoList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(0, 115);
        var bottomBg = BaseBitmap.create("public_9v_bg03");
        bottomBg.width = 640;
        bottomBg.height = GameConfig.stageHeigth - 65;
        bottomBg.x = 0;
        bottomBg.y = 60;
        this.addChild(bottomBg);
        this.setChildIndex(bottomBg, 3);
        return;
    };
    AcDiscountView.prototype.getTitleStr = function () {
        return "ac" + App.StringUtil.firstCharToUper(this.aid) + "_Title";
    };
    AcDiscountView.prototype.getResourceList = function () {
        var acBaseVoList = Api.acVoApi.getActivityVoListByAid(this.aid);
        var arr = [];
        for (var i = 0; i < acBaseVoList.length; i++) {
            var acBaseVo = acBaseVoList[i];
            if (acBaseVo.code != 2) {
                arr.push("acdiscountviewbg" + acBaseVo.code);
            }
            else {
                if (PlatformManager.checkIsWxSp()) {
                    arr.push("acdiscountviewbg2_wx");
                }
                else {
                    arr.push("acdiscountviewbg" + acBaseVo.code);
                }
            }
        }
        return _super.prototype.getResourceList.call(this).concat([
            "forpeople_top"
        ]).concat(arr);
    };
    AcDiscountView.prototype.dispose = function () {
        this._scrollList = null;
        this._acBaseVoList = [];
        _super.prototype.dispose.call(this);
    };
    return AcDiscountView;
}(AcCommonView));
__reflect(AcDiscountView.prototype, "AcDiscountView");
