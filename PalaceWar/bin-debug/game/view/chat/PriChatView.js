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
 * author qianjun
 */
var PriChatView = (function (_super) {
    __extends(PriChatView, _super);
    function PriChatView() {
        var _this = _super.call(this) || this;
        _this._openTime = 0;
        return _this;
    }
    PriChatView.prototype.initView = function () {
        var view = this;
        view._openTime = GameData.serverTime;
        var data = view.param.data;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_PUSHMSG),this.refreshChat,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_SENDMSG), view.sendMsgCallBack, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW, view.refreshChat, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_TRANS + TransType.Pri, this.refreshTrans, this);
        var chatList = Api.chatVoApi.getPriChatList(data.sender);
        // data = chatList
        //下面属性背景
        var bottom = BaseBitmap.create("chatview_bottom");
        bottom.height = 200;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottom, view);
        view.addChild(bottom);
        var bottomBg = BaseBitmap.create("chatview_inputbg");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bottomBg, bottom);
        view.addChild(bottomBg);
        var Bg = BaseBitmap.create("public_9_bg22");
        Bg.width = GameConfig.stageWidth - 30;
        Bg.height = GameConfig.stageHeigth - view.titleBg.height - bottom.height + 5;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, Bg, view.titleBg, [0, view.titleBg.height - 5]);
        view.addChild(Bg);
        view.swapChildren(Bg, view.container);
        var listBg = BaseBitmap.create("public_9_bg32");
        listBg.width = GameConfig.stageWidth - 30;
        listBg.height = Bg.height - 40;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, listBg, Bg);
        view.addChild(listBg);
        var maskBg = BaseBitmap.create("public_9_bg33");
        maskBg.width = listBg.width;
        maskBg.height = 30;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, maskBg, listBg);
        view.addChild(maskBg);
        var nameTxt = ComponentManager.getTextField(data.sendername, 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, maskBg);
        view.addChild(nameTxt);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 50, listBg.height - 50);
        view._scrollList = ComponentManager.getScrollList(ChatScrollItem, chatList, rect, NaN, 0);
        view.addChild(view._scrollList);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._scrollList, maskBg, [0, maskBg.height]);
        view._scrollList.setEmptyTip(LanguageManager.getlocal("chatNoData"));
        // this._scrollList.addTouchTap(this.clickItemHandler,this);
        if (chatList.length > 0) {
            view._scrollList.moveToButtom();
        }
        view._scrollList.bindMoveCompleteCallback(this.refreshChatByScroll, this);
        //输入框
        var inputWidth = 463;
        if (this.isShowEmoticonBtn()) {
            inputWidth = 403;
        }
        var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, inputWidth, 48, "public_chatinputbg", LanguageManager.getlocal("chatMaxLength"), 0xa4917f);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, inputTF, bottomBg, [20, 0]);
        view.addChild(inputTF);
        view._inputTextField = inputTF.getChildByName("textField");
        view._inputTextField.maxChars = GameData.chatMaxNumber();
        // this._inputTextField.
        //表情按钮  input 463 48
        var emoticonBtn = ComponentManager.getButton("emoticon_btn", "", this.emoticonBtnClick, this);
        emoticonBtn.x = inputTF.x + inputTF.width + 8;
        emoticonBtn.y = bottomBg.y + bottomBg.height / 2 - emoticonBtn.height / 2;
        this.addChild(emoticonBtn);
        emoticonBtn.visible = false;
        var sendBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "chatViewSend", this.sentBtnClick, this);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, sendBtn, inputTF, [inputTF.width + 10, 0]);
        sendBtn.setColor(TextFieldConst.COLOR_BLACK);
        view.addChild(sendBtn);
        if (this.isShowEmoticonBtn()) {
            emoticonBtn.visible = true;
            view.setLayoutPosition(LayoutConst.leftverticalCenter, sendBtn, emoticonBtn, [emoticonBtn.width + 10, 0]);
        }
        if (Api.switchVoApi.checkVip1Privilege()) {
            if (Api.playerVoApi.getPlayerLevel() < GameData.chatlevel && Api.playerVoApi.getPlayerVipLevel() < 1) {
                App.DisplayUtil.changeToGray(sendBtn);
            }
        }
        else {
            if (Api.playerVoApi.getPlayerLevel() < GameData.chatlevel) {
                App.DisplayUtil.changeToGray(sendBtn);
            }
        }
        view.checkShowMoreTip();
    };
    PriChatView.prototype.getTitleStr = function () {
        return 'chatViewTab3Title';
    };
    PriChatView.prototype.refreshChatByScroll = function () {
        var isButtom = this._scrollList.checkIsAtButtom();
        if (isButtom) {
            this._openTime = GameData.serverTime;
            // let chatList = Api.chatVoApi.getPriChatList(this.param.sender);
            // this._scrollList.refreshData(chatList);
            // this._scrollList.moveToButtom();
            // let moreBtn:BaseButton=<BaseButton>this.getChildByName("moreBtn");
            // if(this._scrollList&&this._scrollList.checkIsAtButtom())
            // {
            // 	if(moreBtn)
            // 	{
            // 		moreBtn.visible=false;
            // 	}
            // }
        }
    };
    PriChatView.prototype.isShowEmoticonBtn = function () {
        if (!Api.switchVoApi.checkEmoticonOpen()) {
            return false;
        }
        if (Api.switchVoApi.checkVip1Privilege()) {
            if (Api.playerVoApi.getPlayerLevel() < GameData.chatlevel && Api.playerVoApi.getPlayerVipLevel() < 1) {
                return false;
            }
        }
        else {
            if (Api.playerVoApi.getPlayerLevel() < GameData.chatlevel) {
                return false;
            }
        }
        return true;
    };
    PriChatView.prototype.sendMsgCallBack = function (evt) {
        var view = this;
        if (evt.data.data.ret >= 0) {
            Api.chatVoApi.setPriChatList(evt.data.data.data[0]);
        }
        // if(evt.data.data.data && evt.data.data.data[0] == 'Success'){
        // 	// NetManager.request(NetRequestConst.REQUEST_PRICHAT_GETMSG, {
        // 	// 	isall : 0
        // 	// });
        // }
    };
    PriChatView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "servant_bottombg",
            "wifeview_bottombg", "shield_cn",
            "chatview_arrow", "chatview_bottom",
            "chatview_inputbg", "emoticon_btn"
        ]);
    };
    PriChatView.prototype.emoticonBtnClick = function () {
        if (Api.switchVoApi.checkCloseChat()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("noChat"));
            return;
        }
        if (Api.otherInfoVoApi.getBanet() - GameData.serverTime > 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatBanet", [App.DateUtil.getFormatBySecond(Api.otherInfoVoApi.getBanet(), 2)]));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.EMOTICONVIEW, { channel: 1, type: 2, receiveuid: this.param.data.sender });
    };
    PriChatView.prototype.refreshChat = function () {
        var view = this;
        var isButtom = this._scrollList.checkIsAtButtom();
        var chatList = Api.chatVoApi.getPriChatList(this.param.data.sender);
        this._scrollList.refreshData(chatList);
        if (isButtom) {
            this._scrollList.moveToButtom();
            view._openTime = GameData.serverTime;
        }
        this.checkShowMoreTip();
    };
    PriChatView.prototype.checkShowMoreTip = function () {
        var view = this;
        var moreBtn = this.getChildByName("moreBtn");
        if (this._scrollList && this._scrollList.checkIsAtButtom()) {
            if (moreBtn) {
                moreBtn.visible = false;
            }
        }
        else {
            if (!moreBtn) {
                var moreBtn_1 = new BaseDisplayObjectContainer();
                moreBtn_1.width = 610;
                moreBtn_1.height = 40;
                moreBtn_1.name = "moreBtn";
                moreBtn_1.x = 640 / 2 - 610 / 2;
                moreBtn_1.y = this._scrollList.y + this._scrollList.height - moreBtn_1.height + 5;
                moreBtn_1.addTouchTap(this.scrollToButtom, this);
                var moreBtnImg = BaseBitmap.create("public_9_bg33");
                moreBtnImg.width = 610;
                moreBtnImg.height = 40;
                moreBtnImg.scaleY = -1;
                moreBtnImg.x = 0;
                moreBtnImg.y = 0 + moreBtnImg.height;
                moreBtn_1.addChild(moreBtnImg);
                var moreBtnText = ComponentManager.getTextField(LanguageManager.getlocal("chatHaveNewMsg"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
                moreBtnText.x = moreBtn_1.width / 2 - moreBtnText.width / 2;
                moreBtnText.y = moreBtn_1.height / 2 - moreBtnText.height / 2;
                moreBtn_1.addChild(moreBtnText);
                var moreBtnArrow = BaseBitmap.create("chatview_arrow");
                moreBtnArrow.x = moreBtnText.x + moreBtnText.width + 5;
                moreBtnArrow.y = moreBtnText.y + moreBtnText.height / 2 - moreBtnArrow.height / 2;
                moreBtn_1.addChild(moreBtnArrow);
                this.addChild(moreBtn_1);
                moreBtn_1.visible = Api.chatVoApi.judgeIsHaveNewMsg(this.param.data.sender, view._openTime);
            }
            else {
                moreBtn.visible = Api.chatVoApi.judgeIsHaveNewMsg(this.param.data.sender, view._openTime);
            }
        }
    };
    PriChatView.prototype.scrollToButtom = function () {
        var view = this;
        view._scrollList.moveToButtom();
        view._openTime = GameData.serverTime;
        view.refreshChat();
    };
    PriChatView.prototype.sentBtnClick = function () {
        if (Api.switchVoApi.checkCloseChat()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("noChat"));
            return;
        }
        if (Api.switchVoApi.checkOpenPrichatSendMsg()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("noChat"));
            return;
        }
        if (Api.switchVoApi.checkVip1Privilege()) {
            if (Api.playerVoApi.getPlayerLevel() < GameData.chatlevel && Api.playerVoApi.getPlayerVipLevel() < 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("reachLvelUnlockDesc2", [Api.playerVoApi.getPlayerOfficeByLevel(GameData.chatlevel)]));
                return;
            }
        }
        else {
            if (Api.playerVoApi.getPlayerLevel() < GameData.chatlevel) {
                App.CommonUtil.showTip(LanguageManager.getlocal("reachLvelUnlockDesc", [Api.playerVoApi.getPlayerOfficeByLevel(GameData.chatlevel)]));
                return;
            }
        }
        if (!this._inputTextField.bindData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatInputTip"));
            return;
        }
        if (this._inputTextField.text.length <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatInputTip"));
            return;
        }
        if (GameData.serverTime - Api.chatVoApi._lastTime < 5) {
            var times = String(Api.chatVoApi._lastTime - GameData.serverTime + 5);
            // Api.chatVoApi._lastTime = GameData.serverTime;
            App.CommonUtil.showTip(LanguageManager.getlocal("chatTimeTip", [times]));
            return;
        }
        Api.chatVoApi._lastTime = GameData.serverTime;
        if (Config.ShieldCfg.checkShield(this._inputTextField.text) == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        if (App.StringUtil.checkChar(this._inputTextField.text)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        var txtStr = this._inputTextField.text;
        var chatData = {};
        chatData.channel = Api.playerVoApi.getPlayerAllianceId();
        chatData.message = txtStr;
        this._inputTextField.text = "";
        NetManager.request(NetRequestConst.REQUEST_PRICHAT_SENDMSG, {
            receiveuid: this.param.data.sender,
            content: txtStr,
        });
        // NetManager.requestChat(chatData);
    };
    PriChatView.prototype.refreshTrans = function () {
        var isButtom = this._scrollList.checkIsAtButtom();
        this._scrollList.refreshData(Api.chatVoApi.getPriChatList(this.param.data.sender));
        if (isButtom) {
            this._scrollList.moveToButtom();
        }
    };
    PriChatView.prototype.dispose = function () {
        // this._inputTextField.removeEventListener();
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME,this.refreshChat,this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_PUSHMSG),this.refreshChat,this);
        var view = this;
        if (Api.chatVoApi.getUnreadMsgNum(view.param.data.sender)) {
            NetManager.request(NetRequestConst.REQUEST_PRICHAT_SETREAD, {
                receiveuid: view.param.data.sender
            });
        }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRICHAT_SENDMSG), view.sendMsgCallBack, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_PRICHAT_FRESHVIEW, view.refreshChat, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_TRANS + TransType.Pri, this.refreshTrans, this);
        _super.prototype.dispose.call(this);
    };
    return PriChatView;
}(CommonView));
__reflect(PriChatView.prototype, "PriChatView");
//# sourceMappingURL=PriChatView.js.map