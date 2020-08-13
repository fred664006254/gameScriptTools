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
var ChatViewTab4 = (function (_super) {
    __extends(ChatViewTab4, _super);
    function ChatViewTab4() {
        var _this = _super.call(this) || this;
        // 滑动列表
        _this._labanum = null;
        _this._freeTimes = null;
        _this._scrollList = null;
        _this._sendBtn = null;
        _this._timer = null;
        _this.isNew = false;
        _this.oldLen = 0;
        _this.initView();
        return _this;
    }
    ChatViewTab4.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_GETMSG), view.getMsgBack, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_SENDMSG), view.sendMsgBack, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_TRANS + TransType.Cross, this.refreshTrans, this);
        // chatList.forEach((data)=>{
        // 	data.chattype = 'cross';
        // });
        //下面属性背景
        var bottomBg = BaseBitmap.create("chatview_inputbg");
        bottomBg.x = 0;
        bottomBg.y = GameConfig.stageHeigth - 143 - 110 - bottomBg.height + 30;
        this.addChild(bottomBg);
        //let item = Config.ItemCfg.getItemCfgById(1651);
        var laba = BaseBitmap.create('chatlaba');
        var listBg = BaseBitmap.create("public_9_bg32");
        listBg.width = GameConfig.stageWidth - 30;
        listBg.height = GameConfig.stageHeigth - 143 - 110 - bottomBg.height - laba.height;
        listBg.x = 15;
        listBg.y = 12;
        this.addChild(listBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 50, listBg.height - 10);
        this._scrollList = ComponentManager.getScrollList(ChatScrollItem, [], rect, NaN, 0);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("chatNoData"));
        this.addChild(this._scrollList);
        this._scrollList.setPosition(25, 12);
        // this._scrollList.addTouchTap(this.clickItemHandler,this);
        this._scrollList.bindMoveCompleteCallback(this.refreshChatByScroll, this);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("chatNoData"));
        //喇叭
        this.setLayoutPosition(LayoutConst.lefttop, laba, listBg, [0, listBg.height + 5]);
        this.addChild(laba);
        var numDesc = ComponentManager.getTextField(LanguageManager.getlocal('chatviewlabanum'), 22, TextFieldConst.COLOR_BLACK);
        this.setLayoutPosition(LayoutConst.leftverticalCenter, numDesc, laba, [laba.width + 3, 0]);
        this.addChild(numDesc);
        var num = Api.chatVoApi.getLabaNum();
        var numTxt = ComponentManager.getTextField(num.toString(), 22, TextFieldConst.COLOR_WARN_GREEN);
        this.setLayoutPosition(LayoutConst.leftverticalCenter, numTxt, numDesc, [numDesc.textWidth + 3, 0]);
        this.addChild(numTxt);
        this._labanum = numTxt;
        if (PlatformManager.checkIsRuSp()) {
            var num1 = GameData.crossChatFreeTimes - Api.otherInfoVoApi.getCrosschatNum();
            var str = LanguageManager.getlocal("chatFreeTimes", [String(num1), String(GameData.crossChatFreeTimes)]);
            var freeTime = ComponentManager.getTextField(str, 22, TextFieldConst.COLOR_BLACK);
            freeTime.setPosition(GameConfig.stageWidth - freeTime.width - 30, numTxt.y);
            this.addChild(freeTime);
            this._freeTimes = freeTime;
        }
        //输入框
        var inputWidth = 463;
        if (this.isShowEmoticonBtn()) {
            inputWidth = 403;
        }
        var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, inputWidth, 48, "public_chatinputbg", LanguageManager.getlocal("chatMaxLength"), 0xa4917f);
        inputTF.x = 20;
        inputTF.y = bottomBg.y + bottomBg.height / 2 - inputTF.height / 2;
        this.addChild(inputTF);
        this._inputTextField = inputTF.getChildByName("textField");
        this._inputTextField.maxChars = GameData.chatMaxNumber();
        // this._inputTextField.
        //表情按钮  input 463 48
        var emoticonBtn = ComponentManager.getButton("emoticon_btn", "", this.emoticonBtnClick, this);
        emoticonBtn.x = inputTF.x + inputTF.width + 8;
        emoticonBtn.y = bottomBg.y + bottomBg.height / 2 - emoticonBtn.height / 2;
        this.addChild(emoticonBtn);
        emoticonBtn.visible = false;
        var sendBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "chatViewSend", this.sentBtnClick, this);
        sendBtn.x = inputTF.x + inputTF.width + 2;
        // sendBtn.x = emoticonBtn.x + emoticonBtn.width + 10;
        sendBtn.y = bottomBg.y + bottomBg.height / 2 - sendBtn.height / 2;
        sendBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._sendBtn = sendBtn;
        if (this.isShowEmoticonBtn()) {
            emoticonBtn.visible = true;
            sendBtn.x = emoticonBtn.x + emoticonBtn.width + 10;
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
        this.addChild(sendBtn);
        this.fresh_laba();
        var obj = Api.chatVoApi.getCrossList();
        if (!obj.length) {
            this.isNew = true;
            NetManager.request(NetRequestConst.REQUEST_CROSSCHAT_GETMSG, {
                isall: 1,
            });
        }
        else {
            view._scrollList.refreshData(obj);
            view._scrollList.moveToButtom();
        }
        //绑定计时器
        this.clearTimer();
        this._timer = new egret.Timer(1000 * 5);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.show_round, this);
        this._timer.start();
    };
    ChatViewTab4.prototype.isShowEmoticonBtn = function () {
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
    ChatViewTab4.prototype.refreshChatByScroll = function () {
        var isButtom = this._scrollList.checkIsAtButtom();
        if (isButtom) {
            var chatList = Api.chatVoApi.getCrossList();
            this._scrollList.refreshData(chatList);
            this._scrollList.moveToButtom();
            var moreBtn = this.getChildByName("moreBtn");
            if (this._scrollList && this._scrollList.checkIsAtButtom()) {
                if (moreBtn) {
                    moreBtn.visible = false;
                }
            }
        }
    };
    ChatViewTab4.prototype.getMsgBack = function (evt) {
        var view = this;
        if (evt.data.data.data.crosschat) {
            var oldMsg = Api.chatVoApi.getLastCrossMessage();
            if (oldMsg && oldMsg.seq == evt.data.data.data.crosschat[0].seq) {
                return;
            }
            Api.chatVoApi.clearCrossChatList();
            Api.chatVoApi.setCrossChatList(evt.data.data.data);
            var chatList = Api.chatVoApi.getCrossList();
            if (evt.data.data.data.isall) {
                if (chatList.length > 0) {
                    var isButtom = this._scrollList.checkIsAtButtom();
                    view._scrollList.refreshData(chatList);
                    if (isButtom) {
                        this._scrollList.moveToButtom();
                    }
                    if (this.isNew) {
                        this._scrollList.moveToButtom();
                        this.isNew = false;
                    }
                }
            }
            if (chatList.length > this.oldLen) {
                this.checkShowMoreTip();
            }
            this.oldLen = chatList.length;
        }
    };
    ChatViewTab4.prototype.emoticonBtnClick = function () {
        if (Api.switchVoApi.checkCloseChat()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("noChat"));
            return;
        }
        if (Api.otherInfoVoApi.getCrossBanet() - GameData.serverTime > 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatBanet", [App.DateUtil.getFormatBySecond(Api.otherInfoVoApi.getCrossBanet(), 2)]));
            return;
        }
        if (Api.chatVoApi.getLabaNum() <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("corssserverChatNot"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.EMOTICONVIEW, { channel: 1, type: 1 });
    };
    ChatViewTab4.prototype.refreshChat = function () {
        var isButtom = this._scrollList.checkIsAtButtom();
        if (isButtom) {
            var chatList = Api.chatVoApi.getCrossList();
            this._scrollList.refreshData(chatList);
            this._scrollList.moveToButtom();
        }
        this.checkShowMoreTip();
    };
    ChatViewTab4.prototype.checkShowMoreTip = function () {
        var moreBtn = this.getChildByName("moreBtn");
        if (this._scrollList && this._scrollList.checkIsAtButtom()) {
            if (moreBtn) {
                moreBtn.visible = false;
            }
        }
        else {
            if (!moreBtn) {
                // let moreBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"",this.scrollToButtom,this);
                var moreBtn_1 = new BaseDisplayObjectContainer();
                moreBtn_1.width = 610;
                moreBtn_1.height = 40;
                moreBtn_1.name = "moreBtn";
                moreBtn_1.x = 640 / 2 - 610 / 2;
                // moreBtn.y = 575;  960 - 575   385
                moreBtn_1.y = GameConfig.stageHeigth - 385;
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
            }
            else {
                moreBtn.visible = true;
            }
        }
    };
    ChatViewTab4.prototype.scrollToButtom = function () {
        this._scrollList.moveToButtom();
        this.refreshChat();
    };
    ChatViewTab4.prototype.sentBtnClick = function () {
        if (Api.switchVoApi.checkCloseChat()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("noChat"));
            return;
        }
        if (Api.otherInfoVoApi.getCrossBanet() - GameData.serverTime > 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatBanet", [App.DateUtil.getFormatBySecond(Api.otherInfoVoApi.getCrossBanet(), 2)]));
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
        if (Config.ShieldCfg.checkShield(this._inputTextField.text) == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        if (App.StringUtil.checkChar(this._inputTextField.text)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        var num = Api.chatVoApi.getLabaNum();
        if (PlatformManager.checkIsRuSp()) {
            if (GameData.crossChatFreeTimes > Api.otherInfoVoApi.getCrosschatNum()) {
                num += (GameData.crossChatFreeTimes - Api.otherInfoVoApi.getCrosschatNum());
            }
        }
        if (num <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("corssserverChatNot"));
            return;
        }
        var txtStr = this._inputTextField.text;
        // iOS源生包屏蔽	emoji
        if (Api.chatVoApi.isShieldEmoji()) {
            if (Api.chatVoApi.checkHasEmoji(txtStr)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldEmojiTip"));
                return;
            }
        }
        Api.chatVoApi._lastTime = GameData.serverTime;
        var chatData = {};
        chatData.channel = 1;
        chatData.message = txtStr;
        this._inputTextField.text = "";
        // NetManager.requestChat(chatData);
        NetManager.request(NetRequestConst.REQUEST_CROSSCHAT_SENDMSG, {
            //receiveuid : this.param.data.sender,
            content: txtStr,
        });
        //this.fresh_laba();
    };
    ChatViewTab4.prototype.fresh_laba = function () {
        var view = this;
        var num = Api.chatVoApi.getLabaNum();
        view._labanum.text = num.toString();
        view._labanum.textColor = num > 0 ? 0x3e9b00 : 0xce1515;
        if (PlatformManager.checkIsRuSp()) {
            if (GameData.crossChatFreeTimes > Api.otherInfoVoApi.getCrosschatNum()) {
                num += (GameData.crossChatFreeTimes - Api.otherInfoVoApi.getCrosschatNum());
            }
            var num1 = GameData.crossChatFreeTimes - Api.otherInfoVoApi.getCrosschatNum();
            num1 = num1 < 0 ? 0 : num1;
            var str = LanguageManager.getlocal("chatFreeTimes", [String(num1), String(GameData.crossChatFreeTimes)]);
            this._freeTimes.text = str;
        }
        view._sendBtn.setGray(num <= 0);
    };
    ChatViewTab4.prototype.tick = function () {
        if (PlatformManager.checkIsRuSp() && this._freeTimes) {
            var num1 = GameData.crossChatFreeTimes - Api.otherInfoVoApi.getCrosschatNum();
            num1 = num1 < 0 ? 0 : num1;
            var str = LanguageManager.getlocal("chatFreeTimes", [String(num1), String(GameData.crossChatFreeTimes)]);
            this._freeTimes.text = str;
        }
    };
    ChatViewTab4.prototype.sendMsgBack = function (evt) {
        var view = this;
        if (evt.data.data.ret < 0) {
            return;
        }
        view.fresh_laba();
        if (evt.data.data.data.crosschat) {
            Api.chatVoApi.setCrossChatList(evt.data.data.data);
            var chatList = Api.chatVoApi.getCrossList();
            var isButtom = this._scrollList.checkIsAtButtom();
            view._scrollList.refreshData(chatList);
            if (isButtom) {
                this._scrollList.moveToButtom();
            }
            this.checkShowMoreTip();
            this.tick();
        }
    };
    ChatViewTab4.prototype.closeTimer = function () {
        var view = this;
        if (view._timer) {
            view._timer.stop();
        }
    };
    ChatViewTab4.prototype.clearTimer = function () {
        var view = this;
        if (view._timer) {
            view._timer.stop();
            view._timer.removeEventListener(egret.TimerEvent.TIMER, view.show_round, view);
            view._timer = null;
        }
    };
    ChatViewTab4.prototype.refreshWhenSwitchBack = function () {
        var view = this;
        //view.closeTimer();
        if (view._timer) {
            view._timer.start();
        }
    };
    ChatViewTab4.prototype.show_round = function () {
        NetManager.request(NetRequestConst.REQUEST_CROSSCHAT_GETMSG, {
            isall: 1,
        });
        // console.log(22);
    };
    ChatViewTab4.prototype.refreshTrans = function () {
        var isButtom = this._scrollList.checkIsAtButtom();
        this._scrollList.refreshData(Api.chatVoApi.getCrossList());
        if (isButtom) {
            this._scrollList.moveToButtom();
        }
    };
    ChatViewTab4.prototype.dispose = function () {
        // this._inputTextField.removeEventListener();
        var view = this;
        view.clearTimer();
        view._inputTextField = null;
        view._labanum = null;
        view._scrollList = null;
        view._sendBtn = null;
        this._freeTimes = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_GETMSG), view.getMsgBack, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_SENDMSG), view.sendMsgBack, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_TRANS + TransType.Cross, this.refreshTrans, this);
        _super.prototype.dispose.call(this);
    };
    return ChatViewTab4;
}(CommonViewTab));
__reflect(ChatViewTab4.prototype, "ChatViewTab4");
//# sourceMappingURL=ChatViewTab4.js.map