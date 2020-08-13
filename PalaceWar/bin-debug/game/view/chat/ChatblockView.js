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
 * 聊天黑名单
 * author dky qianjun
 * date 2018/3/14
 * @class ChatblockView
 */
var ChatblockView = (function (_super) {
    __extends(ChatblockView, _super);
    function ChatblockView() {
        return _super.call(this) || this;
    }
    ChatblockView.prototype.initView = function () {
        NetManager.chat.checkAndReConnect();
        var lisetBg = BaseBitmap.create("public_9_bg23");
        lisetBg.width = GameConfig.stageWidth;
        lisetBg.height = GameConfig.stageHeigth - 160;
        lisetBg.x = 0;
        lisetBg.y = -10;
        this.addChildToContainer(lisetBg);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK, this.doQuickAlliance, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CANCEBLOCK, this.doCancel, this);
        // let chatList = Api.chatVoApi.getChatBlockVo().list;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 30, GameConfig.stageHeigth - 180);
        this._scrollList = ComponentManager.getScrollList(ChatblockScrollItem, this._dataList, rect);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("chatblockNoBlock"));
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(15, 2);
        var num = 0;
        if (Api.chatVoApi.getChatBlockVo().info) {
            num = Api.chatVoApi.getChatBlockVo().info.length;
            if (!num) {
                num = 0;
            }
        }
        var str = LanguageManager.getlocal("chatblockCount", [num + "/" + 50]);
        this._countTF = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._countTF.x = this.width / 2 - this._countTF.width / 2;
        this._countTF.y = this.container.y + this.container.height + ((GameConfig.stageHeigth - this.container.y - this.container.height) - this._countTF.textHeight) / 2;
        this.addChild(this._countTF);
    };
    ChatblockView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_CHAT_LIST, requestData: {} };
    };
    //请求回调
    ChatblockView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_CHAT_LIST) {
            // let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
            this._dataList = data.data.data.list;
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_CHAT_UNBLOCK) {
            // let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
            this._dataList = data.data.data.list;
            this._scrollList.refreshData(this._dataList);
            App.CommonUtil.showTip(LanguageManager.getlocal("chatCancelBlockTip", [this._pName]));
            var num = 0;
            if (Api.chatVoApi.getChatBlockVo().info && Api.chatVoApi.getChatBlockVo().info.length) {
                num = Api.chatVoApi.getChatBlockVo().info.length;
            }
            var str = LanguageManager.getlocal("chatblockCount", [num + "/" + 50]);
            this._countTF.text = str;
        }
    };
    ChatblockView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "servant_bottombg",
            "wifeview_bottombg", "shield_cn"
        ]);
    };
    // protected getTabbarTextArr():Array<string>
    // {
    // 	let tab = ["chatViewTab1Title"];
    // 	if(!Api.switchVoApi.checkOpenShenhe())
    // 	{
    // 		tab.push("chatViewTab2Title");
    // 	}
    // 	return tab
    // }
    // (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
    ChatblockView.prototype.checkTabCondition = function (index) {
        if (index == 1 && Api.playerVoApi.getPlayerAllianceId() == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceNoAlliance"));
            return false;
        }
        return true;
    };
    // protected getRuleInfo():string
    // {
    // 	return "wife_description";
    // }
    ChatblockView.prototype.doCancel = function (event) {
        var data = event.data;
        this._pName = event.data.name;
        this.request(NetRequestConst.REQUEST_CHAT_UNBLOCK, { fuid: data.uid });
    };
    ChatblockView.prototype.doQuickAlliance = function () {
        this.hide();
        App.CommonUtil.showTip(LanguageManager.getlocal("alliance_beKick"));
    };
    ChatblockView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK, this.doQuickAlliance, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_DINNER_GUIDE, this.doCancel, this);
        this._scrollList = null;
        this._dataList = null;
        this._pName = null;
        _super.prototype.dispose.call(this);
    };
    return ChatblockView;
}(CommonView));
__reflect(ChatblockView.prototype, "ChatblockView");
//# sourceMappingURL=ChatblockView.js.map