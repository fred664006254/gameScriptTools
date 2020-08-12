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
var InviteFriendShareView = (function (_super) {
    __extends(InviteFriendShareView, _super);
    function InviteFriendShareView() {
        return _super.call(this) || this;
    }
    InviteFriendShareView.prototype.getResourceList = function () {
        return [
            "invitescreenshotbg", "invitescreenshotcodebg", "invitescreenshottitle1", "invitescreenshottitle2", "firstrec_btnBg"
        ];
    };
    InviteFriendShareView.prototype.getTitleStr = function () {
        return null;
    };
    InviteFriendShareView.prototype.getTitleBgName = function () {
        return null;
    };
    InviteFriendShareView.prototype.getBgName = function () {
        return "invitescreenshotbg";
    };
    InviteFriendShareView.prototype.getMsgConstEventArr = function () {
        return [];
    };
    InviteFriendShareView.prototype.getNetConstEventArr = function () {
        return [];
    };
    InviteFriendShareView.prototype.msgEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
        }
    };
    InviteFriendShareView.prototype.netEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
        }
    };
    InviteFriendShareView.prototype.initView = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var title = BaseBitmap.create("invitescreenshottitle" + (App.DeviceUtil.isRuntime2() ? 2 : 1));
        view.addChild(title);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, view, [0, 191]);
        var btn = BaseBitmap.create("firstrec_btnBg");
        view.addChild(btn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, view, [0, 193]);
        var shareTxt = ComponentMgr.getTextField(LangMger.getlocal("invitefriendTip10"), 32, 0xFFFFFF);
        shareTxt.stroke = 2;
        shareTxt.strokeColor = 0x0864C4;
        view.addChild(shareTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, shareTxt, btn);
        var codeTxt = ComponentMgr.getTextField(LangMger.getlocal("invitefriendTip2"), 30, 0xFFEB96);
        codeTxt.stroke = 2;
        codeTxt.strokeColor = 0x000000;
        view.addChild(codeTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, codeTxt, view, [171, 142]);
        var codebg = BaseBitmap.create("invitescreenshotcodebg");
        view.addChild(codebg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, codebg, view, [78, 55]);
        var code = ComponentMgr.getTextField("" + Api.InviteFriendVoApi.getMyCode(), 40, 0xFFEB96);
        code.stroke = 2;
        code.strokeColor = 0x000000;
        view.addChild(code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, code, codebg);
        view.addTouchTap(view.hide, view);
    };
    InviteFriendShareView.prototype.getCloseBtnName = function () {
        return null;
    };
    InviteFriendShareView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return InviteFriendShareView;
}(CommonView));
__reflect(InviteFriendShareView.prototype, "InviteFriendShareView");
//# sourceMappingURL=InviteFriendShareView.js.map