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
var AcCrossServerWifeBattleChatViewTab1 = (function (_super) {
    __extends(AcCrossServerWifeBattleChatViewTab1, _super);
    function AcCrossServerWifeBattleChatViewTab1(param) {
        var _this = _super.call(this) || this;
        _this._checkBox1 = undefined;
        _this.aid = null;
        _this.code = null;
        _this.aid = param.data.aid;
        _this.code = param.data.code;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerWifeBattleChatViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWifeBattleChatViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeBattleChatViewTab1.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME, this.refreshChat, this);
        var chatList = Api.chatVoApi.getBlockWorldList();
        //下面属性背景
        // let bottomBg:BaseBitmap = BaseBitmap.create("wifeview_bottombg");
        // bottomBg.width = GameConfig.stageWidth;
        // bottomBg.height = 96;
        // bottomBg.x = 0;
        // bottomBg.y = GameConfig.stageHeigth -240 ;
        // this.addChild(bottomBg);
        // let listBg:BaseBitmap = BaseBitmap.create("public_9v_bg04"); 
        // listBg.width = GameConfig.stageWidth - 30;
        // listBg.height = GameConfig.stageHeigth - 260;
        // listBg.x = 15;
        // listBg.y = 12 ;
        // this.addChild(listBg);
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
        if (!this.vo.isCanJoin) {
            // sendBtn.setEnable(false);
            sendBtn.setGray(true);
        }
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
        this.addChild(sendBtn);
        var bottom = BaseBitmap.create("chatview_bottom");
        // bottom.height = 200;
        bottom.y = GameConfig.stageHeigth - 143 - bottom.height;
        this.addChild(bottom);
        // let contanier = new BaseDisplayObjectContainer();
        // this.addChild(contanier);
        // let checkBox1 = ComponentManager.getCheckBox(LanguageManager.getlocal("chatShowShare"),null,null,TextFieldConst.COLOR_WARN_YELLOW);
        // checkBox1.x = 0;
        // checkBox1.y = 0;
        // contanier.addChild(checkBox1);
        // Api.otherInfoVoApi.getShareblock()==1?checkBox1.setSelected(false):checkBox1.setSelected(true);
        // this._checkBox1 = checkBox1;
        // contanier.x = bottom.x + bottom.width/2 - contanier.width/2;
        // contanier.y = bottom.y + 70;
        // this._checkBox1.addTouchTap(this.selectHandler1,this);
        // this.selectHandler1();
        this.checkShowMoreTip();
    };
    // private selectHandler1()
    // {
    // 	this.request(NetRequestConst.REQUEST_CHAT_BLOCKSHARE,{dtype:1});
    // }
    AcCrossServerWifeBattleChatViewTab1.prototype.refreshChat = function () {
        var isButtom = this._scrollList.checkIsAtButtom();
        if (isButtom) {
            var chatList = Api.chatVoApi.getBlockWorldList();
            this._scrollList.refreshData(chatList);
            this._scrollList.moveToButtom();
        }
        this.checkShowMoreTip();
    };
    AcCrossServerWifeBattleChatViewTab1.prototype.refreshChat2 = function () {
        var chatList = Api.chatVoApi.getWorldList();
        this._scrollList.refreshData(chatList);
        this._scrollList.moveToButtom();
    };
    AcCrossServerWifeBattleChatViewTab1.prototype.checkShowMoreTip = function () {
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
                moreBtn_1.y = GameConfig.stageHeigth - 400;
                moreBtn_1.addTouchTap(this.scrollToButtom, this);
                var moreBtnImg = BaseBitmap.create("chatview_morebg");
                moreBtn_1.addChild(moreBtnImg);
                var moreBtnText = ComponentManager.getTextField(LanguageManager.getlocal("chatHaveNewMsg"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
                moreBtnImg.width = moreBtnText.width + 60;
                moreBtnImg.x = GameConfig.stageWidth - moreBtnImg.width;
                moreBtnText.x = moreBtnImg.x + 40;
                moreBtnText.y = moreBtnImg.y + moreBtnImg.height / 2 - moreBtnText.height / 2;
                moreBtn_1.addChild(moreBtnText);
                this.addChild(moreBtn_1);
            }
            else {
                moreBtn.visible = true;
            }
        }
    };
    AcCrossServerWifeBattleChatViewTab1.prototype.scrollToButtom = function () {
        this._scrollList.moveToButtom();
        this.refreshChat();
    };
    AcCrossServerWifeBattleChatViewTab1.prototype.sentBtnClick = function () {
        if (!this.vo.isCanJoin) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerWifeBattle_chatcannotjointip"));
            return;
        }
        if (Api.otherInfoVoApi.getBanet() - GameData.serverTime > 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatBanet", [App.DateUtil.getFormatBySecond(Api.otherInfoVoApi.getBanet(), 2)]));
            return;
        }
        if (Api.switchVoApi.checkVip1Privilege()) {
            var needVip = Api.vipVoApi.getNeedVip("reachLvelUnlock");
            if (needVip && Api.playerVoApi.getPlayerLevel() < GameData.chatlevel && Api.playerVoApi.getPlayerVipLevel() < needVip) {
                App.CommonUtil.showTip(LanguageManager.getlocal("reachLvelUnlockDesc2", [Api.playerVoApi.getPlayerOfficeByLevel(GameData.chatlevel), needVip + ""]));
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
        this._lastMsg = txtStr;
        this._inputTextField.text = "";
        //猫玩处理聊天
        if (PlatformManager.checkIsMwSp()) {
            var server_name = this.request(NetRequestConst.REQUEST_CHAT_MWSIGN, {
                server_name: ServerCfg.selectServer.sname,
                chat_channel: 1,
                chat_content: txtStr,
                sender_uid: PlatformManager.userId,
            });
            return;
        }
        else if (PlatformManager.checkIsWxmgSp()) {
            PlatformManager.chat_ts = GameData.serverTime;
            var server_name = this.request(NetRequestConst.REQUEST_CHAT_WXSIGN, {
                server_name: ServerCfg.selectServer.sname,
                chat_channel: 1,
                chat_content: txtStr,
                sender_uid: PlatformManager.userId,
            });
            return;
        }
        else if (PlatformManager.checkIsJPSp() || PlatformManager.checkIsWdSp()) {
            var server_name = this.request(NetRequestConst.REQUEST_CHAT_CRY, {});
            return;
        }
        NetManager.requestChat(chatData);
    };
    AcCrossServerWifeBattleChatViewTab1.prototype.receiveData = function (data) {
        if (data.ret == false) {
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_CHAT_BLOCKSHARE) {
            this.refreshChat2();
            return;
        }
        // if(PlatformManager.checkIsWxSp()&&data.data.data.msg&&data.data.data.msg&&data.data.data.msg.data.result==1)
        if (PlatformManager.checkIsWxmgSp() && data.data.data.msg && data.data.data.msg && data.data.data.msg.data.result == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        if (data.data.data.mkey) {
            PlatformManager.chat_mkey = data.data.data.mkey;
        }
        if (PlatformManager.checkIsWxmgSp() || PlatformManager.checkIsJPSp() || PlatformManager.checkIsWdSp()) {
            var chatData_1 = {};
            chatData_1.channel = 1;
            chatData_1.message = this._lastMsg;
            NetManager.requestChat(chatData_1);
            return;
        }
        if (data.data.data.msg && data.data.data.msg.code && data.data.data.msg.code == -1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        else if (data.data.data.msg && data.data.data.msg.code && data.data.data.msg.code == -2) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatBanet2"));
            return;
        }
        else if (data.data.data.msg && data.data.data.msg.code && data.data.data.msg.code == -3) {
            return;
        }
        var chatData = {};
        chatData.channel = 1;
        chatData.message = data.data.data.msg.content;
        NetManager.requestChat(chatData);
    };
    AcCrossServerWifeBattleChatViewTab1.prototype.dispose = function () {
        // this._inputTextField.removeEventListener();
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHAT_COME, this.refreshChat, this);
        this._inputTextField = null;
        this._lastMsg = null;
        this._scrollList = null;
        this._checkBox1 = undefined;
        this.aid = null;
        this.code = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeBattleChatViewTab1;
}(CommonViewTab));
__reflect(AcCrossServerWifeBattleChatViewTab1.prototype, "AcCrossServerWifeBattleChatViewTab1");
