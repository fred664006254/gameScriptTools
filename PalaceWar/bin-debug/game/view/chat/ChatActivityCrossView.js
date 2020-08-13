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
        //NetManager.chat.checkAndReConnect();
        var bottom = BaseBitmap.create("chatview_bottom");
        bottom.height = 200;
        bottom.y = GameConfig.stageHeigth - 143 - bottom.height;
        this.addChildToContainer(bottom);
        var lisetBg = BaseBitmap.create("servant_bottombg");
        lisetBg.width = GameConfig.stageWidth + 14;
        lisetBg.height = GameConfig.stageHeigth - 250;
        lisetBg.x = -7;
        lisetBg.y = -70;
        this.addChildToContainer(lisetBg);
    };
    Object.defineProperty(ChatActivityCrossView.prototype, "activeID", {
        get: function () {
            var view = this;
            return view.param.data.activeID;
        },
        enumerable: true,
        configurable: true
    });
    ChatActivityCrossView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "servant_bottombg",
            "wifeview_bottombg", "shield_cn",
            "chatview_arrow", "chatview_bottom",
            "chatview_inputbg", "mainui_missionIcon1", "prichatview_bottom", "chatlaba", "emoticon_btn", "chatkingdombg1", "chatkingdombg2", "chatkingdombg3"
        ]);
    };
    ChatActivityCrossView.prototype.getTabbarTextArr = function () {
        var tab = [];
        if (this.param.data.isKingdom) {
            tab.push("acThreeKingdomsTip42-1");
            if (this.param.data.kingdoms) {
                tab.push("acThreeKingdomsTeam" + this.param.data.kingdoms + "-1");
            }
        }
        else {
            tab.push("chatViewTab4Title");
        }
        //openChatType3		
        // tab.push("chatViewTab3Title");
        //tab.push("chatViewTab4Title");
        return tab;
    };
    ChatActivityCrossView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ChatActivityCrossView;
}(CommonView));
__reflect(ChatActivityCrossView.prototype, "ChatActivityCrossView");
//# sourceMappingURL=ChatActivityCrossView.js.map