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
 * 新邀请有礼邀请玩家item
 * author qianjun
 */
var NewInviteUserinfoItem = (function (_super) {
    __extends(NewInviteUserinfoItem, _super);
    function NewInviteUserinfoItem() {
        return _super.call(this) || this;
    }
    NewInviteUserinfoItem.prototype.initItem = function (index, data) {
        var view = this;
        view.width = 510;
        view.height = 95;
        var bg = BaseBitmap.create("public_popupscrollitembg"); //threekingdomsranklistbg
        bg.width = view.width;
        bg.scaleY = 0.72;
        view.addChild(bg);
        var rankbg = BaseBitmap.create("rankinglist_rankbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rankbg, bg, [15, 0]);
        view.addChild(rankbg);
        var idTxt = ComponentManager.getTextField("" + (index + 1), TextFieldConst.FONTSIZE_TITLE_SMALL);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, idTxt, rankbg);
        view.addChild(idTxt);
        var Txt1 = ComponentManager.getTextField(LanguageManager.getlocal("newinviteuserinfo1", [data.name]), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, Txt1, bg, [65, 20]);
        view.addChild(Txt1);
        var Txt2 = ComponentManager.getTextField(LanguageManager.getlocal("newinviteuserinfo2", [data.uid]), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, Txt2, Txt1, [0, Txt1.textHeight + 7]);
        view.addChild(Txt2);
        var Txt3 = ComponentManager.getTextField(LanguageManager.getlocal("newinviteuserinfo3", [App.StringUtil.changeIntToText(data.power)]), 20, TextFieldConst.COLOR_BLACK);
        Txt3.y = Txt2.y;
        Txt3.x = bg.x + bg.width - Txt3.width - 35;
        view.addChild(Txt3);
    };
    NewInviteUserinfoItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return NewInviteUserinfoItem;
}(ScrollListItem));
__reflect(NewInviteUserinfoItem.prototype, "NewInviteUserinfoItem");
//# sourceMappingURL=NewInviteUserinfoItem.js.map