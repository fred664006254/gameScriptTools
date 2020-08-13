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
var ChatActivityCrossViewTab1 = (function (_super) {
    __extends(ChatActivityCrossViewTab1, _super);
    function ChatActivityCrossViewTab1() {
        var _this = _super.call(this) || this;
        // 滑动列表
        // private _labanum : BaseTextField =null;
        _this._scrollList = null;
        _this._checkBox1 = undefined;
        _this.isNew = false;
        _this.oldLen = 0;
        _this.initView();
        return _this;
    }
    ChatActivityCrossViewTab1.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_GETMSG), view.getMsgBack, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_SENDMSG), view.sendMsgBack, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_TRANS + TransType.CrossAc, this.refreshTrans, this);
        //下面属性背景
        // let bottomBg:BaseBitmap = BaseBitmap.create("chatview_inputbg");
        // bottomBg.x = 0;
        // bottomBg.y = GameConfig.stageHeigth - 143 - 110 - bottomBg.height + 30;
        // this.addChild(bottomBg);
        // let listBg:BaseBitmap = BaseBitmap.create("public_9_bg32"); 
        // listBg.width = GameConfig.stageWidth - 30;
        // listBg.height = GameConfig.stageHeigth - 143 - 110 - bottomBg.height;
        // listBg.x = 15;
        // listBg.y = 12;
        // this.addChild(listBg);
        // let rect = egret.Rectangle.create();
        // rect.setTo(0,0,GameConfig.stageWidth - 50,listBg.height - 10);
        // this._scrollList = ComponentManager.getScrollList(ChatScrollItem, [], rect, NaN, 0);
        // this._scrollList.setEmptyTip(LanguageManager.getlocal("chatNoData"));
        // this.addChild(this._scrollList);
        // this._scrollList.setPosition(25,12);
        // this._scrollList.bindMoveCompleteCallback(this.refreshChatByScroll,this);
        // this._scrollList.setEmptyTip(LanguageManager.getlocal("chatNoData"));
        // //输入框
        // let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,TextFieldConst.FONTSIZE_TITLE_SMALL,463,48,"public_chatinputbg",LanguageManager.getlocal("chatMaxLength"),0xa4917f);
        // inputTF.x = 20;
        // inputTF.y = bottomBg.y + bottomBg.height/2 - inputTF.height/2;
        // this.addChild(inputTF);
        // this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
        // this._inputTextField.maxChars = 40;
        // let sendBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"chatViewSend",this.sentBtnClick,this);
        // sendBtn.x = inputTF.x + inputTF.width + 10;
        // sendBtn.y = bottomBg.y + bottomBg.height/2 - sendBtn.height/2;
        // sendBtn.setColor(TextFieldConst.COLOR_BLACK);
        // this._sendBtn = sendBtn;
        // if(Api.switchVoApi.checkVip1Privilege()){
        // 	if(Api.playerVoApi.getPlayerLevel() < GameData.chatlevel&&Api.playerVoApi.getPlayerVipLevel()<1){
        // 		App.DisplayUtil.changeToGray(sendBtn);
        // 	}
        // }
        // else{
        // 	if(Api.playerVoApi.getPlayerLevel() < GameData.chatlevel){
        // 		App.DisplayUtil.changeToGray(sendBtn);
        // 	}
        // }
        // this.addChild(sendBtn);
        // let obj = Api.chatVoApi.getacCrossList();
        // if(!obj.length){
        // 	NetManager.request(NetRequestConst.REQUEST_CROSSCHAT_GETMSG, {
        // 		isall : 1,
        // 		activeId : this.activeId
        // 	});
        // }
        // else{
        // 	view._scrollList.refreshData(obj);
        // 	view._scrollList.moveToButtom();
        // }
        // //绑定计时器
        // this.clearTimer();
        // this._timer = new egret.Timer(1000 * 5);
        // this._timer.addEventListener(egret.TimerEvent.TIMER, this.show_round, this);
        // this._timer.start();
        // let chatList = Api.chatVoApi.getAllianceList();
        var chatList = Api.chatVoApi.getacCrossList();
        if (!chatList.length) {
            NetManager.request(NetRequestConst.REQUEST_CROSSCHAT_GETMSG, {
                isall: 1,
                activeId: this.activeId
            });
        }
        var hh = 60;
        var bottomBg0 = BaseBitmap.create("public_9v_bg02");
        bottomBg0.width = GameConfig.stageWidth;
        bottomBg0.height = GameConfig.stageHeigth - 300 + 100 - hh;
        bottomBg0.x = 0;
        bottomBg0.y = 0;
        this.addChild(bottomBg0);
        var bottomBg2 = BaseBitmap.create("adult_lowbg");
        bottomBg2.x = GameConfig.stageWidth / 2 - bottomBg2.width / 2;
        this.addChild(bottomBg2);
        var lisetBg = BaseBitmap.create("public_9v_bg03");
        lisetBg.width = GameConfig.stageWidth;
        lisetBg.height = GameConfig.stageHeigth - 150 - hh;
        ;
        lisetBg.x = 0;
        lisetBg.y = 0;
        this.addChild(lisetBg);
        bottomBg2.y = lisetBg.y + lisetBg.height - bottomBg2.height - 10;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 30, GameConfig.stageHeigth - 263 - hh);
        this._scrollList = ComponentManager.getScrollList(ChatScrollItem, chatList, rect);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("chatNoData"));
        this.addChild(this._scrollList);
        this._scrollList.setPosition(10, 12);
        // this._scrollList.addTouchTap(this.clickItemHandler,this);
        if (chatList.length > 0) {
            this._scrollList.setScrollTopByIndex(chatList.length - 1);
        }
        //输入框
        var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_COMMON, 393, 46, "public_tc_srkbg05", LanguageManager.getlocal("chatMaxLength"), TextFieldConst.COLOR_WHITE);
        inputTF.x = 20;
        inputTF.y = bottomBg2.y + bottomBg2.height / 2 - inputTF.height / 2;
        this.addChild(inputTF);
        this._inputTextField = inputTF.getChildByName("textField");
        this._inputTextField.maxChars = 40;
        // this._inputTextField.
        var sendBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "chatViewSend", this.sentBtnClick, this);
        sendBtn.x = inputTF.x + inputTF.width + 15;
        sendBtn.y = bottomBg2.y + bottomBg2.height / 2 - sendBtn.height / 2;
        // sendBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChild(sendBtn);
        if (Api.switchVoApi.checkVip1Privilege()) {
            var needVip = Api.vipVoApi.getNeedVip("reachLvelUnlock");
            if (needVip && Api.playerVoApi.getPlayerLevel() < GameData.chatlevel && Api.playerVoApi.getPlayerVipLevel() < needVip) {
                App.DisplayUtil.changeToGray(sendBtn);
            }
        }
        else {
            if (Api.playerVoApi.getPlayerLevel() < GameData.chatlevel) {
                App.DisplayUtil.changeToGray(sendBtn);
            }
        }
        var bottom = BaseBitmap.create("chatview_bottom");
        // bottom.height = 200;
        bottom.y = GameConfig.stageHeigth - 143 - bottom.height;
        this.addChild(bottom);
        var contanier = new BaseDisplayObjectContainer();
        this.addChild(contanier);
        /*
        let checkBox1 = ComponentManager.getCheckBox(LanguageManager.getlocal("chatShowShare"),null,null,TextFieldConst.COLOR_WARN_YELLOW);
        checkBox1.x = 0;
        checkBox1.y = 0;
        contanier.addChild(checkBox1);
        Api.otherInfoVoApi.getAllianceShareblock()==1?checkBox1.setSelected(false):checkBox1.setSelected(true);
        this._checkBox1 = checkBox1;
        contanier.x = bottom.x + bottom.width/2 - contanier.width/2;
        contanier.y = bottom.y + 70;
        this._checkBox1.addTouchTap(this.selectHandler1,this);
        */
        this.checkShowMoreTip();
    };
    ChatActivityCrossViewTab1.prototype.selectHandler1 = function () {
        // this.request(NetRequestConst.REQUEST_CHAT_BLOCKSHARE,{dtype:2});
    };
    Object.defineProperty(ChatActivityCrossViewTab1.prototype, "activeId", {
        get: function () {
            var mainview = ViewController.getInstance().getView('ChatActivityCrossView');
            return mainview.activeID;
        },
        enumerable: true,
        configurable: true
    });
    ChatActivityCrossViewTab1.prototype.refreshChatByScroll = function () {
        var isButtom = this._scrollList.checkIsAtButtom();
        if (isButtom) {
            var chatList = Api.chatVoApi.getacCrossList();
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
    ChatActivityCrossViewTab1.prototype.getMsgBack = function (evt) {
        var view = this;
        if (evt.data.data.ret >= 0) {
            if (evt.data.data.data.crosschat) {
                var oldMsg = Api.chatVoApi.getLastAcCrossMessage();
                if (oldMsg && oldMsg.seq == evt.data.data.data.crosschat[0].seq) {
                    return;
                }
                Api.chatVoApi.clearAcCrossChatList();
                Api.chatVoApi.setAccrossChatList(evt.data.data.data);
                var chatList = Api.chatVoApi.getacCrossList();
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
                }
                this.oldLen = chatList.length;
            }
        }
    };
    ChatActivityCrossViewTab1.prototype.refreshChat = function () {
        var isButtom = this._scrollList.checkIsAtButtom();
        if (isButtom) {
            var chatList = Api.chatVoApi.getacCrossList();
            this._scrollList.refreshData(chatList);
            this._scrollList.moveToButtom();
        }
        this.checkShowMoreTip();
    };
    ChatActivityCrossViewTab1.prototype.checkShowMoreTip = function () {
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
    ChatActivityCrossViewTab1.prototype.scrollToButtom = function () {
        this._scrollList.moveToButtom();
        this.refreshChat();
    };
    ChatActivityCrossViewTab1.prototype.sentBtnClick = function () {
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
        Api.chatVoApi._lastTime = GameData.serverTime;
        var txtStr = this._inputTextField.text;
        var chatData = {};
        chatData.channel = 1;
        chatData.message = txtStr;
        this._inputTextField.text = "";
        // NetManager.requestChat(chatData);
        NetManager.request(NetRequestConst.REQUEST_CROSSCHAT_SENDMSG, {
            //receiveuid : this.param.data.sender,
            content: txtStr,
            activeId: this.activeId
        });
        //this.fresh_laba();
    };
    ChatActivityCrossViewTab1.prototype.sendMsgBack = function (evt) {
        var view = this;
        if (evt.data.data.ret < 0) {
            return;
        }
        if (evt.data.data.data.crosschat) {
            Api.chatVoApi.setAccrossChatList(evt.data.data.data);
            var chatList = Api.chatVoApi.getacCrossList();
            var isButtom = this._scrollList.checkIsAtButtom();
            view._scrollList.refreshData(chatList);
            if (isButtom) {
                this._scrollList.moveToButtom();
            }
            this.checkShowMoreTip();
        }
    };
    // public closeTimer():void{
    // 	let view = this;
    // 	if(view._timer){
    // 		view._timer.stop();
    // 	}
    // }
    // private clearTimer():void{
    // 	let view = this;
    // 	if(view._timer){
    //         view._timer.stop();
    // 		view._timer.removeEventListener(egret.TimerEvent.TIMER, view.show_round, view);
    // 		view._timer = null;
    // 	}
    // }
    // public refreshWhenSwitchBack():void{
    // 	let view = this;
    // 	//view.closeTimer();
    // 	if(view._timer){
    // 		view._timer.start();
    // 	}
    // }
    // private show_round():void{
    // 	NetManager.request(NetRequestConst.REQUEST_CROSSCHAT_GETMSG, {
    // 		isall : 1,
    // 		activeId : this.activeId
    // 	});
    // }
    ChatActivityCrossViewTab1.prototype.refreshTrans = function () {
        var isButtom = this._scrollList.checkIsAtButtom();
        this._scrollList.refreshData(Api.chatVoApi.getacCrossList());
        if (isButtom) {
            this._scrollList.moveToButtom();
        }
    };
    ChatActivityCrossViewTab1.prototype.dispose = function () {
        // this._inputTextField.removeEventListener();
        var view = this;
        // view.clearTimer();
        // view._inputTextField = null;
        // view._labanum = null;
        // view._scrollList = null;
        // view._sendBtn = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_GETMSG), view.getMsgBack, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CROSSCHAT_SENDMSG), view.sendMsgBack, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_TRANS + TransType.CrossAc, this.refreshTrans, this);
        _super.prototype.dispose.call(this);
    };
    return ChatActivityCrossViewTab1;
}(CommonViewTab));
__reflect(ChatActivityCrossViewTab1.prototype, "ChatActivityCrossViewTab1");
