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
var PlayerComeBackUserinfoItem = (function (_super) {
    __extends(PlayerComeBackUserinfoItem, _super);
    function PlayerComeBackUserinfoItem() {
        return _super.call(this) || this;
    }
    PlayerComeBackUserinfoItem.prototype.initItem = function (index, data) {
        var view = this;
        view.width = 513;
        view.height = 102 + 5;
        var bg = BaseBitmap.create("playercomebacklistbg"); //threekingdomsranklistbg
        view.addChild(bg);
        var rankbg = BaseBitmap.create("playercomebacknumorderbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rankbg, bg, [15, 0]);
        view.addChild(rankbg);
        var idTxt = ComponentManager.getTextField("" + (index + 1), TextFieldConst.FONTSIZE_TITLE_SMALL);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, idTxt, rankbg);
        view.addChild(idTxt);
        var Txt1 = ComponentManager.getTextField(LanguageManager.getlocal("newinviteuserinfo1", [data.name]), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, Txt1, bg, [65, 25]);
        view.addChild(Txt1);
        var Txt2 = ComponentManager.getTextField(LanguageManager.getlocal("newinviteuserinfo2", [data.uid]), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, Txt2, Txt1, [0, Txt1.textHeight + 10]);
        view.addChild(Txt2);
        var Txt3 = ComponentManager.getTextField(LanguageManager.getlocal("newinviteuserinfo3", [App.StringUtil.changeIntToText(data.power)]), 20, TextFieldConst.COLOR_BLACK);
        Txt3.y = Txt2.y;
        Txt3.x = bg.x + bg.width - Txt3.width - 35;
        view.addChild(Txt3);
    };
    PlayerComeBackUserinfoItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return PlayerComeBackUserinfoItem;
}(ScrollListItem));
__reflect(PlayerComeBackUserinfoItem.prototype, "PlayerComeBackUserinfoItem");
//# sourceMappingURL=PlayerComeBackUserinfoItem.js.map