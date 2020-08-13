var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ChatActivityCrossViewTab2 = /** @class */ (function (_super) {
    __extends(ChatActivityCrossViewTab2, _super);
    function ChatActivityCrossViewTab2(data) {
        var _this = _super.call(this) || this;
        // 滑动列表
        _this._labanum = null;
        _this._scrollList = null;
        _this._sendBtn = null;
        _this._timer = null;
        _this.isNew = false;
        _this.oldLen = 0;
        _this.param = data;
        _this.initView();
        return _this;
    }
    ChatActivityCrossViewTab2.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_GETMSG), view.getMsgBack, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_SENDMSG), view.sendMsgBack, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_TRANS + TransType.CrossAc, this.refreshTrans, this);
        // chatList.forEach((data)=>{
        // 	data.chattype = 'cross';
        // });
        //下面属性背景
        var bottomBg = BaseBitmap.create("chatview_inputbg");
        bottomBg.x = 0;
        bottomBg.y = GameConfig.stageHeigth - 143 - 110 - bottomBg.height + 30;
        this.addChild(bottomBg);
        var listBg = BaseBitmap.create("public_9_bg32");
        listBg.width = GameConfig.stageWidth - 30;
        listBg.height = GameConfig.stageHeigth - 143 - 110 - bottomBg.height;
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
        sendBtn.x = inputTF.x + inputTF.width;
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
        var tmp = Api.chatVoApi.getacCrossSeasonList();
        var obj = [];
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        for (var i = 0; i < tmp.length; ++i) {
            if (tmp[i].kingdom && tmp[i].kingdom == vo.getMyKingdoms()) {
                obj.push(tmp[i]);
            }
        }
        if (!obj.length) {
            NetManager.request(NetRequestConst.REQUEST_CROSSCHAT_GETMSG, {
                isall: 1,
                activeId: this.activeId,
                iskingdom: 1
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
    ChatActivityCrossViewTab2.prototype.isShowEmoticonBtn = function () {
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
    ChatActivityCrossViewTab2.prototype.emoticonBtnClick = function () {
        if (Api.switchVoApi.checkCloseChat()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("noChat"));
            return;
        }
        if (Api.otherInfoVoApi.getCrossBanet() - GameData.serverTime > 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatBanet", [App.DateUtil.getFormatBySecond(Api.otherInfoVoApi.getCrossBanet(), 2)]));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.EMOTICONVIEW, { channel: 1, type: 1, activeId: this.activeId, iskingdom: 1 });
    };
    Object.defineProperty(ChatActivityCrossViewTab2.prototype, "activeId", {
        get: function () {
            var mainview = ViewController.getInstance().getView('ChatActivityCrossView');
            return mainview.activeID;
        },
        enumerable: true,
        configurable: true
    });
    ChatActivityCrossViewTab2.prototype.getChatList = function () {
        var view = this;
        var tmp = Api.chatVoApi.getacCrossSeasonList();
        var obj = [];
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        for (var i = 0; i < tmp.length; ++i) {
            if (tmp[i].kingdom && tmp[i].kingdom == vo.getMyKingdoms()) {
                obj.push(tmp[i]);
            }
        }
        return obj;
    };
    ChatActivityCrossViewTab2.prototype.refreshChatByScroll = function () {
        var isButtom = this._scrollList.checkIsAtButtom();
        if (isButtom) {
            var chatList = this.getChatList();
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
    ChatActivityCrossViewTab2.prototype.getMsgBack = function (evt) {
        var view = this;
        if (evt.data.data.ret >= 0 && evt.data.data.data.iskingdom) {
            if (evt.data.data.data.crosschat && evt.data.data.data.crosschat.length) {
                var oldMsg = Api.chatVoApi.getLastAcCrossMessageSeason();
                if (oldMsg && oldMsg.seq && oldMsg.seq == evt.data.data.data.crosschat[0].seq) {
                    return;
                }
                Api.chatVoApi.clearAcCrossChatSeasonList();
                Api.chatVoApi.setAccrossChatSeasonList(evt.data.data.data);
                var chatList = this.getChatList();
                if (evt.data.data.data.isall) {
                    if (chatList.length > 0) {
                        view._scrollList.refreshData(chatList);
                        view._scrollList.moveToButtom();
                    }
                }
                else {
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
                if (chatList.length > this.oldLen) {
                    this.checkShowMoreTip();
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CROSSCHAT_MSG);
                }
                this.oldLen = chatList.length;
            }
        }
    };
    ChatActivityCrossViewTab2.prototype.refreshChat = function () {
        var isButtom = this._scrollList.checkIsAtButtom();
        if (isButtom) {
            var chatList = this.getChatList();
            this._scrollList.refreshData(chatList);
            this._scrollList.moveToButtom();
        }
        this.checkShowMoreTip();
    };
    ChatActivityCrossViewTab2.prototype.checkShowMoreTip = function () {
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
    ChatActivityCrossViewTab2.prototype.scrollToButtom = function () {
        this._scrollList.moveToButtom();
        this.refreshChat();
    };
    ChatActivityCrossViewTab2.prototype.sentBtnClick = function () {
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
            activeId: this.activeId,
            iskingdom: 1
        });
        //this.fresh_laba();
    };
    ChatActivityCrossViewTab2.prototype.sendMsgBack = function (evt) {
        var view = this;
        if (evt.data.data.ret < 0) {
            return;
        }
        if (evt.data.data.data.crosschat && evt.data.data.data.iskingdom) {
            Api.chatVoApi.setAccrossChatSeasonList(evt.data.data.data);
            var chatList = this.getChatList();
            var isButtom = this._scrollList.checkIsAtButtom();
            view._scrollList.refreshData(chatList);
            if (isButtom) {
                this._scrollList.moveToButtom();
            }
            this.checkShowMoreTip();
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CROSSCHAT_MSG);
        }
    };
    ChatActivityCrossViewTab2.prototype.closeTimer = function () {
        var view = this;
        if (view._timer) {
            view._timer.stop();
        }
    };
    ChatActivityCrossViewTab2.prototype.clearTimer = function () {
        var view = this;
        if (view._timer) {
            view._timer.stop();
            view._timer.removeEventListener(egret.TimerEvent.TIMER, view.show_round, view);
            view._timer = null;
        }
    };
    ChatActivityCrossViewTab2.prototype.refreshWhenSwitchBack = function () {
        var view = this;
        //view.closeTimer();
        if (view._timer) {
            view._timer.start();
        }
    };
    ChatActivityCrossViewTab2.prototype.show_round = function () {
        NetManager.request(NetRequestConst.REQUEST_CROSSCHAT_GETMSG, {
            isall: 1,
            activeId: this.activeId,
            iskingdom: 1
        });
        // console.log(22);
    };
    ChatActivityCrossViewTab2.prototype.refreshTrans = function () {
        var isButtom = this._scrollList.checkIsAtButtom();
        this._scrollList.refreshData(this.getChatList());
        if (isButtom) {
            this._scrollList.moveToButtom();
        }
    };
    ChatActivityCrossViewTab2.prototype.dispose = function () {
        // this._inputTextField.removeEventListener();
        var view = this;
        view.clearTimer();
        // view._inputTextField = null;
        // view._labanum = null;
        // view._scrollList = null;
        // view._sendBtn = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_GETMSG), view.getMsgBack, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_SENDMSG), view.sendMsgBack, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_TRANS + TransType.CrossAc, this.refreshTrans, this);
        _super.prototype.dispose.call(this);
    };
    return ChatActivityCrossViewTab2;
}(CommonViewTab));
//# sourceMappingURL=ChatActivityCrossViewTab2.js.map