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
 * 私聊
 * author dky
 * date 2017/10/26
 * @class ChatScrollItem
 */
var PriChatScrollItem = (function (_super) {
    __extends(PriChatScrollItem, _super);
    function PriChatScrollItem() {
        var _this = _super.call(this) || this;
        _this._redpot = null;
        _this._data = null;
        return _this;
    }
    PriChatScrollItem.prototype.initItem = function (index, chatData) {
        var view = this;
        view._data = chatData;
        view.width = 604;
        view.height = 129;
        var bg = BaseBitmap.create('public_listbg');
        bg.width = 604;
        bg.height = 129;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);
        var title = chatData.content.title;
        if (chatData.sender == Api.playerVoApi.getPlayerID()) {
            title = "-1";
        }
        else if (title == null) {
            title = "0";
        }
        //头像背景
        var posStr = "head_circle_bg";
        //  let posStr =  "head_circle_bg";//chatData.content.headID;
        if (chatData.content.headID && chatData.content.headID != "") {
            posStr = chatData.content.headID;
        }
        if (chatData.content.headBg && Api.switchVoApi.checkVip1Privilege() && chatData.content.headBg != 'head_circle_bg_0') {
            posStr = chatData.content.headBg;
        }
        // posStr = posStr.substr(15);// head_circle_bg
        var headContaner = Api.playerVoApi.getPlayerCircleHead(Number(chatData.content.pic), posStr);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, headContaner, bg, [30, 0]);
        view.addChild(headContaner);
        //头像框等级
        var head = headContaner.getChildByName("myHead");
        var titleLv = chatData.content.titleLv;
        if (titleLv && titleLv != 0) {
            var lvbg = BaseBitmap.create("public_lvupbg");
            lvbg.setPosition(head.x + head.width * head.scaleX / 2 - lvbg.width / 2, headContaner.height - lvbg.height + 3);
            headContaner.addChild(lvbg);
            var levelTf = ComponentManager.getTextField("Lv." + String(titleLv), 16, TextFieldConst.COLOR_BROWN);
            levelTf.x = lvbg.x + lvbg.width / 2 - levelTf.width / 2;
            levelTf.y = lvbg.y;
            headContaner.addChild(levelTf);
        }
        var redpot = BaseBitmap.create("public_dot2");
        redpot.scaleX = redpot.scaleY = 1.5;
        view.setLayoutPosition(LayoutConst.lefttop, redpot, headContaner, [-10, 5]);
        view.addChild(redpot);
        view._redpot = redpot;
        redpot.visible = Api.chatVoApi.getUnreadMsgNum(chatData.sender) > 0;
        var num = Api.chatVoApi.getUnreadMsgNum(chatData.sender);
        var unreadTxt = ComponentManager.getTextField(num.toString(), 17, TextFieldConst.COLOR_QUALITY_WHITE);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, unreadTxt, redpot);
        view.addChild(unreadTxt);
        unreadTxt.visible = redpot.visible;
        var nameTxt = ComponentManager.getTextField(chatData.sendername, 24, 0xE37444);
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, headContaner, [headContaner.width * headContaner.scaleX + 20, 10]);
        view.addChild(nameTxt);
        var msg = chatData.content.message; //chatData.content.message.length > 15 ? (chatData.content.message) : chatData.content.message;
        if (msg.length > 10) {
            msg = msg.substring(0, 11) + '...';
        }
        var newTxt = ComponentManager.getTextField(msg, 24, TextFieldConst.COLOR_BROWN);
        newTxt.lineSpacing = 7;
        view.setLayoutPosition(LayoutConst.lefttop, newTxt, nameTxt, [0, nameTxt.textHeight + 10]);
        view.addChild(newTxt);
        view.cacheAsBitmap = true;
        view.addTouchTap(view.clickPriChat, view);
    };
    PriChatScrollItem.prototype.clickPriChat = function () {
        var view = this;
        if (Api.switchVoApi.checkCloseChat()) {
            App.CommonUtil.showTip("很抱歉，聊天系统维护中");
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.PRICHATVIEW, view._data);
    };
    PriChatScrollItem.prototype.getSpaceY = function () {
        return 0;
    };
    PriChatScrollItem.prototype.dispose = function () {
        this.cacheAsBitmap = true;
        this._redpot = null;
        _super.prototype.dispose.call(this);
    };
    return PriChatScrollItem;
}(ScrollListItem));
__reflect(PriChatScrollItem.prototype, "PriChatScrollItem");
