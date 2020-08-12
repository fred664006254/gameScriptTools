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
 * 邀请好友规则说明
 * author qianjun
 *
 */
var InviteFriendRulePopupView = (function (_super) {
    __extends(InviteFriendRulePopupView, _super);
    function InviteFriendRulePopupView() {
        return _super.call(this) || this;
    }
    InviteFriendRulePopupView.prototype.isTouchMaskClose = function () {
        return false;
    };
    InviteFriendRulePopupView.prototype.getTitleStr = function () {
        return null;
    };
    InviteFriendRulePopupView.prototype.getTitleBgName = function () {
        return null;
    };
    // 背景图名称
    InviteFriendRulePopupView.prototype.getBgName = function () {
        return "invitefriendtipbg";
    };
    // 打开该面板时，需要传参数msg
    InviteFriendRulePopupView.prototype.initView = function () {
        var view = this;
    };
    InviteFriendRulePopupView.prototype.resetBgSize = function () {
        var view = this;
        _super.prototype.resetBgSize.call(this);
        var cfg = Config.InvitefriendCfg;
        view.closeBtn.x = view.viewBg.x + view.viewBg.width - view.closeBtn.width + 18;
        view.closeBtn.y = view.viewBg.y - 8;
        var tipBg = BaseBitmap.create("invitefriendtiptop");
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipBg, view.container, [-10, 15], true);
        view.addChildToContainer(tipBg);
        var tipTxt = ComponentMgr.getTextField(LangMger.getlocal("sysTip"), TextFieldConst.SIZE_32, 0xFEFEFE);
        tipTxt.stroke = 2;
        tipTxt.strokeColor = 0x822800;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipBg, [0, 10]);
        view.addChildToContainer(tipTxt);
        var descTxt = ComponentMgr.getTextField(LangMger.getlocal("invitefriendRuleTip", [cfg.getInvitePoint1() + ""]), TextFieldConst.SIZE_22, 0x355D94);
        descTxt.stroke = 0;
        descTxt.lineSpacing = 13;
        descTxt.width = 470;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descTxt, tipBg, [62, tipBg.height + 19]);
        view.addChildToContainer(descTxt);
        var descBg = BaseBitmap.create("ab_bird_infoattrbg");
        descBg.width = 500;
        descBg.height = 212;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, descTxt, [0, descTxt.height + 22]);
        view.addChildToContainer(descBg);
        var descGroup = new BaseDisplayObjectContainer();
        descGroup.width = descBg.width;
        var task2 = cfg.getInvitePoint(2);
        var task3 = cfg.getInvitePoint(3);
        var task4 = cfg.getInvitePoint(4);
        var detailTxt = ComponentMgr.getTextField(LangMger.getlocal("invitefriendRuleDesc", [task2, task3, task4]), TextFieldConst.SIZE_22, 0xFFFFFF);
        detailTxt.stroke = 2;
        detailTxt.strokeColor = 0x000000;
        detailTxt.lineSpacing = 13;
        detailTxt.width = 360;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, detailTxt, descGroup, [14, 26]);
        descGroup.addChild(detailTxt);
        var fillBg = BaseBitmap.create("public_alphabg");
        fillBg.width = descGroup.width;
        fillBg.height = descGroup.height;
        descGroup.addChild(fillBg);
        var scrollView = ComponentMgr.getScrollView(descGroup, new egret.Rectangle(0, 0, descBg.width, descBg.height - 10));
        view.addChildToContainer(scrollView);
        scrollView.bounces = false;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollView, descBg);
        var conbtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal("sysconfirm"), view.hide, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, conbtn, descBg, [0, descBg.height + 15]);
        view.addChildToContainer(conbtn);
    };
    InviteFriendRulePopupView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return InviteFriendRulePopupView;
}(PopupView));
__reflect(InviteFriendRulePopupView.prototype, "InviteFriendRulePopupView");
//# sourceMappingURL=InviteFriendRulePopupView.js.map