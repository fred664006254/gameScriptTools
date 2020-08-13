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
 * 跨服活动聊天
 * author qianjun
 */
var ChatActivityCrossView = (function (_super) {
    __extends(ChatActivityCrossView, _super);
    function ChatActivityCrossView() {
        return _super.call(this) || this;
    }
    ChatActivityCrossView.prototype.initView = function () {
        NetManager.chat.checkAndReConnect();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK, this.doQuickAlliance, this);
        // let bottom: BaseBitmap = BaseBitmap.create("chatview_bottom");
        // bottom.height = 200;
        // bottom.y = GameConfig.stageHeigth - 143 - bottom.height;
        // this.addChildToContainer(bottom);
        // let lisetBg = BaseBitmap.create("servant_bottombg");
        // lisetBg.width = GameConfig.stageWidth+14;
        // lisetBg.height = GameConfig.stageHeigth - 250;
        // lisetBg.x = -7;
        // lisetBg.y = -70;
        // this.addChildToContainer(lisetBg);
    };
    Object.defineProperty(ChatActivityCrossView.prototype, "activeID", {
        get: function () {
            var view = this;
            return view.param.data.activeID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatActivityCrossView.prototype, "tabHeight", {
        get: function () {
            var view = this;
            return view.tabViewData[0].height;
        },
        enumerable: true,
        configurable: true
    });
    ChatActivityCrossView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            // "servant_bottombg","adult_lowbg",
            // "chatview_morebg",
            // "wifeview_bottombg","shield_cn",
            // "chatview_arrow","chatview_bottom",
            // "chatview_inputbg","mainui_missionIcon1","prichatview_bottom","chatlaba"
            "adult_lowbg", "chatview_morebg",
            "wifeview_bottombg", "shield_cn", "public_9_bg33",
            "chat_share_bg_1", "chat_share_bg_2", "chat_share_bg_3",
            "itemicon1501", "itemicon1511", "chatlaba", "char_cross_hornbg", "chatview_arrow", "chat_morebg",
            "public_chatbg_king", "chatview_bottom",
        ]);
    };
    // (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
    ChatActivityCrossView.prototype.checkTabCondition = function (index) {
        if (index == 1 && Api.playerVoApi.getPlayerAllianceId() == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceNoAlliance"));
            return false;
        }
        return true;
    };
    ChatActivityCrossView.prototype.getTabbarTextArr = function () {
        var tab = [];
        tab.push("chatActivityCrossViewTab1Title");
        tab.push("chatActivityCrossViewTab2Title");
        //openChatType3		
        // tab.push("chatViewTab3Title");
        //tab.push("chatViewTab4Title");
        return tab;
    };
    ChatActivityCrossView.prototype.doQuickAlliance = function () {
        this.hide();
        App.CommonUtil.showTip(LanguageManager.getlocal("alliance_beKick"));
    };
    ChatActivityCrossView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK, this.doQuickAlliance, this);
        _super.prototype.dispose.call(this);
    };
    return ChatActivityCrossView;
}(CommonView));
__reflect(ChatActivityCrossView.prototype, "ChatActivityCrossView");
