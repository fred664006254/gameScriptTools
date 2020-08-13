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
 * 邀请有礼，关系界面
 *
 */
var InviteViewTab4 = (function (_super) {
    __extends(InviteViewTab4, _super);
    function InviteViewTab4() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    InviteViewTab4.prototype.initView = function () {
        var innerBg = BaseBitmap.create("activity_db_01");
        innerBg.height = GameConfig.stageHeigth - 490;
        innerBg.width = 606;
        innerBg.x = GameConfig.stageWidth / 2 - innerBg.width / 2;
        innerBg.y = 90;
        this.addChild(innerBg);
        var titleBg = BaseBitmap.create("rank_biao");
        var temScale = 568 / titleBg.width;
        titleBg.x = innerBg.x + innerBg.width / 2 - titleBg.width * temScale / 2;
        titleBg.y = innerBg.y + 13;
        titleBg.scaleX = titleBg.scaleY = temScale;
        this.addChild(titleBg);
        var borderBg = BaseBitmap.create("public_9v_bg03");
        borderBg.width = GameConfig.stageWidth;
        borderBg.height = GameConfig.stageHeigth - 455;
        borderBg.x = 0;
        borderBg.y = 80;
        this.addChild(borderBg);
        //标题信息
        //底部个人排行信息
        var title_rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        title_rankTxt.text = LanguageManager.getlocal("rankorder");
        title_rankTxt.x = 92 - title_rankTxt.width / 2;
        title_rankTxt.y = titleBg.y + titleBg.height / 2 - title_rankTxt.height + 15;
        this.addChild(title_rankTxt);
        var title_nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        title_nameTxt.text = LanguageManager.getlocal("ranknickName");
        title_nameTxt.x = 250 - title_nameTxt.width / 2;
        title_nameTxt.y = title_rankTxt.y;
        this.addChild(title_nameTxt);
        var title_serverTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        title_serverTxt.text = LanguageManager.getlocal("serverListServer2");
        title_serverTxt.x = 382 - title_serverTxt.width / 2;
        title_serverTxt.y = title_rankTxt.y;
        this.addChild(title_serverTxt);
        var title_powerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        title_powerTxt.text = LanguageManager.getlocal("rankpower");
        title_powerTxt.x = 514 - title_powerTxt.width / 2;
        title_powerTxt.y = title_rankTxt.y;
        this.addChild(title_powerTxt);
        // 列表
        var friendList = Api.inviteVoApi.sortedByPower;
        // friendList = friendList.concat(friendList);
        // friendList = friendList.concat(friendList);
        // friendList = friendList.concat(friendList);
        // friendList = friendList.concat(friendList);
        // friendList = friendList.concat(friendList);
        // friendList = friendList.concat(friendList);
        // friendList = friendList.concat(friendList);
        // friendList = friendList.concat(friendList);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 570);
        this._scrollList = ComponentManager.getScrollList(InviteViewTab4ScrollItem, friendList, rect);
        this._scrollList.y = titleBg.y + titleBg.height + 10;
        this.addChild(this._scrollList);
    };
    InviteViewTab4.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return InviteViewTab4;
}(CommonViewTab));
__reflect(InviteViewTab4.prototype, "InviteViewTab4");
