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
        //let data = chatData[0];
        var bg = BaseBitmap.create('public_9_bg35');
        bg.width = 604;
        bg.height = 129;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);
        //头像背景
        var posStr = null;
        if (chatData.content.headBg && Api.switchVoApi.checkVip1Privilege()) {
            posStr = chatData.content.headBg;
        }
        var headContaner = Api.playerVoApi.getPlayerCircleHead(Number(chatData.content.pic), posStr);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, headContaner, bg, [30, 0]);
        view.addChild(headContaner);
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
        var nameTxt = ComponentManager.getTextField(chatData.sendername, 24, 0xa87e00);
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, headContaner, [headContaner.width * headContaner.scaleX + 20, 20]);
        view.addChild(nameTxt);
        var msg = chatData.content.message; //chatData.content.message.length > 15 ? (chatData.content.message) : chatData.content.message;
        msg = Api.emoticonVoApi.chatStrChangeLocal(msg);
        if (msg.length > 10) {
            msg = msg.substring(0, 11) + '...';
        }
        var newTxt = ComponentManager.getTextField(msg, 24, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, newTxt, nameTxt, [0, nameTxt.textHeight + 20]);
        view.addChild(newTxt);
        view.cacheAsBitmap = true;
        view.addTouchTap(view.clickPriChat, view);
        var vipFlag = null;
        var isself = (chatData.sender == Api.playerVoApi.getPlayerID()) || (typeof chatData.issender == 'undefined' ? false : (chatData.issender == 0));
        if (isself || !chatData.content.hideVip) {
            if (chatData.content.vip && chatData.content.vip > 0 && !PlatformManager.checkIsKRSp()) {
                vipFlag = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(chatData.content.vip).icon);
                vipFlag.setScale(0.65);
                vipFlag.setPosition(headContaner.x + headContaner.width / 2 - 33, headContaner.y + headContaner.height - 20 - 10);
                view.addChild(vipFlag);
            }
        }
    };
    PriChatScrollItem.prototype.clickPriChat = function () {
        var view = this;
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
//# sourceMappingURL=PriChatScrollItem.js.map