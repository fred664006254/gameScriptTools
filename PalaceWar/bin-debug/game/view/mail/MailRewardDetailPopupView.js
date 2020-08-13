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
 * 邮件奖励详情
 * author 张朝阳
 * date 2018/5/31
 * @class MailRewardDetailPopupView
 */
var MailRewardDetailPopupView = (function (_super) {
    __extends(MailRewardDetailPopupView, _super);
    function MailRewardDetailPopupView() {
        return _super.call(this) || this;
    }
    /**UI的入口函数 */
    MailRewardDetailPopupView.prototype.initView = function () {
        this._rewardName = this.param.data.name;
        this._touch = this.param.data.touch;
        this._bg = BaseBitmap.create("public_9_bg4");
        this.addChildToContainer(this._bg);
        this._bg.width = 520;
        this._bg.height = 160;
        this._bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._bg.width / 2, this.viewBg.y + this.getContainerY() / 2);
        this._tipsInfoTxt = ComponentManager.getTextField(LanguageManager.getlocal("useMailRewardTips", [this._rewardName]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._tipsInfoTxt);
        this._tipsInfoTxt.setPosition(this._bg.x + 10, this._bg.y + 10);
        this._itemBg = BaseBitmap.create("public_9_bg1");
        this.addChildToContainer(this._itemBg);
        this._itemBg.width = this._bg.width - 20;
        this._itemBg.height = 110;
        this._itemBg.setPosition(this._bg.x + 10, this._tipsInfoTxt.y + this._tipsInfoTxt.height + 10);
        this._bg.height = this._itemBg.height + this._tipsInfoTxt.height + 40;
        var rewardVo = GameData.getRewardItemIcons(this._touch)[0];
        this.addChildToContainer(rewardVo);
        rewardVo.x = this._itemBg.x + this._itemBg.width / 2 - rewardVo.width / 2;
        rewardVo.y = this._itemBg.y + this._itemBg.height / 2 - rewardVo.height / 2;
    };
    /**添加标题 */
    MailRewardDetailPopupView.prototype.getTitleStr = function () {
        return "itemUseConstPopupViewTitle";
    };
    /**设置按钮上文本的内容 */
    MailRewardDetailPopupView.prototype.getConfirmBtnStr = function () {
        return "sysConfirm";
    };
    /**设置按钮的需要的图片 */
    MailRewardDetailPopupView.prototype.getConfirmBtnName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    /**设置整个UI的高度 */
    MailRewardDetailPopupView.prototype.getShowHeight = function () {
        return 360;
    };
    MailRewardDetailPopupView.prototype.dispose = function () {
        this._bg = null;
        this._itemBg = null;
        this._rewardName = null;
        this._tipsInfoTxt = null;
        this._touch = null;
        _super.prototype.dispose.call(this);
    };
    return MailRewardDetailPopupView;
}(PopupView));
__reflect(MailRewardDetailPopupView.prototype, "MailRewardDetailPopupView");
//# sourceMappingURL=MailRewardDetailPopupView.js.map