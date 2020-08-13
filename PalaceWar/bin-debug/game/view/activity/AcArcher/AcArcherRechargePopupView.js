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
  * 黄忠活动充值奖励
  * author 张朝阳
  * date 2018/6/20
  * @class AcArcherRechargePopupView
  */
var AcArcherRechargePopupView = (function (_super) {
    __extends(AcArcherRechargePopupView, _super);
    function AcArcherRechargePopupView() {
        var _this = _super.call(this) || this;
        _this.code = null;
        return _this;
    }
    Object.defineProperty(AcArcherRechargePopupView.prototype, "cfg", {
        /**
         * 配置文件数据
         */
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACARCHER, this.code);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化view
     */
    AcArcherRechargePopupView.prototype.initView = function () {
        this.code = this.param.data.code;
        var rechearDesc = ComponentManager.getTextField(LanguageManager.getlocal("acArcherRechearDesc"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
        rechearDesc.setPosition(this.getShowWidth() / 2 - rechearDesc.width / 2, 15);
        this.addChildToContainer(rechearDesc);
        var itembg = BaseBitmap.create("public_9_bg43");
        itembg.width = 520;
        itembg.height = 640;
        itembg.setPosition(this.getShowWidth() / 2 - itembg.width / 2, rechearDesc.y + rechearDesc.height + 15);
        this.addChildToContainer(itembg);
        var recharge = this.cfg.recharge;
        var itemRect = new egret.Rectangle(0, 0, itembg.width - 20, itembg.height - 20);
        var scrollList = ComponentManager.getScrollList(AcArcherRechargeScrollItem, recharge, itemRect, { "code": this.code });
        scrollList.setPosition(itembg.x + 10, itembg.y + 10);
        this.addChildToContainer(scrollList);
    };
    /**标题 */
    AcArcherRechargePopupView.prototype.getTitleStr = function () {
        return "acArcherRechearTitle";
    };
    /**
     * 设置当前高度
     */
    AcArcherRechargePopupView.prototype.getShowHeight = function () {
        return 798;
    };
    /**关闭界面 */
    AcArcherRechargePopupView.prototype.dispose = function () {
        this.code = null;
        _super.prototype.dispose.call(this);
    };
    return AcArcherRechargePopupView;
}(PopupView));
__reflect(AcArcherRechargePopupView.prototype, "AcArcherRechargePopupView");
//# sourceMappingURL=AcArcherRechargePopupView.js.map