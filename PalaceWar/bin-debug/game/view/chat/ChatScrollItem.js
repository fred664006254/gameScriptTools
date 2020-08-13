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
 * 聊天
 * author dky
 * date 2017/10/26
 * @class ChatScrollItem
 */
var ChatScrollItem = (function (_super) {
    __extends(ChatScrollItem, _super);
    function ChatScrollItem() {
        var _this = _super.call(this) || this;
        _this._stype = 0; //分享的类型
        _this._isSharePast = false;
        _this._goTo = null;
        _this._itemBgx = 0;
        //翻译按钮
        _this._translate = null;
        _this._itemBgPic = null;
        _this._itemBg = null;
        return _this;
    }
    ChatScrollItem.prototype.initItem = function (index, chatData) {
        this.width = 590;
        // let chatList = Api.chatVoApi.getChatList();
        // let chatData = chatList[index];
        this._chatData = chatData;
        //头像背景
        this._posContainer = new BaseDisplayObjectContainer();
        var posStr = null;
        if (chatData.content.headBg && Api.switchVoApi.checkVip1Privilege()) {
            posStr = chatData.content.headBg;
        }
        var pic = Number(chatData.content.pic);
        if (this._chatData.gmchat) {
            pic = "gm";
            chatData.sendername = LanguageManager.getlocal("gm_name");
        }
        var headContaner = Api.playerVoApi.getPlayerCircleHead(pic, posStr);
        // headContaner.width = 103;
        // headContaner.height = 100;
        // let posBg:BaseBitmap = BaseBitmap.create(posStr);
        // this._posContainer.addChild(posBg)
        // this.addChild(this._posContainer);
        // //  this._posContainer.setPosition(-30,-30)
        this._posContainer.addChild(headContaner);
        this._posContainer.width = headContaner.width;
        this._posContainer.height = headContaner.height;
        this._posContainer.addTouch(this.eventHandler, this, null);
        this.addChild(this._posContainer);
        if (chatData.kingdom) {
            var kingdomflag = BaseBitmap.create("chatkingdombg" + chatData.kingdom);
            this._posContainer.addChild(kingdomflag);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, kingdomflag, headContaner, [-6, headContaner.height]);
        }
        // let rect1:egret.Rectangle=egret.Rectangle.create();
        // rect1.setTo(0,0,136,143);
        // let posBB = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPathById(chatData.content.pic),rect1);
        // posBB.x = 0;
        // posBB.y = -7;
        // posBB.setScale(2/3);
        // this._posContainer.addChild(posBB);
        var itemBgPic = "public_chatbg3";
        var isself = (chatData.sender == Api.playerVoApi.getPlayerID()) || (typeof chatData.issender == 'undefined' ? false : (chatData.issender == 0));
        //自己说的话
        // if (chatData.content.ket>0 && chatData.content.ket>GameData.serverTime)
        if (chatData.content.ket > 0) {
            itemBgPic = "public_chatbg_king";
        }
        else if (isself) {
            itemBgPic = "public_chatbg2";
        }
        var isSpecial = false;
        // if (isself){
        //     let ptitle = Api.playerVoApi.getPlayerPtitle();
        //     if (ptitle && ptitle.ctitle){
        //         isSpecial = true;
        //         itemBgPic = Api.playerVoApi.getUserChatImgById(ptitle.ctitle);
        //     }
        // }
        // else{
        //     if (chatData.content.headBg && chatData.content.headBg.ctitle){
        //         isSpecial = true;
        //         itemBgPic = Api.playerVoApi.getUserChatImgById(chatData.content.headBg.ctitle);
        //     }
        // }
        if (chatData.content.headBg && chatData.content.headBg.ctitle) {
            isSpecial = true;
            itemBgPic = Api.playerVoApi.getUserChatImgById(chatData.content.headBg.ctitle);
        }
        this._itemBgPic = itemBgPic;
        var itemBg = undefined;
        if (isSpecial) {
            itemBg = BaseLoadBitmap.create(itemBgPic);
        }
        else {
            itemBg = BaseBitmap.create(itemBgPic);
        }
        itemBg.width = 404;
        itemBg.x = 98;
        itemBg.y = 40;
        this.addChild(itemBg);
        this._itemBg = itemBg;
        var serverTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, 0x39d7fe);
        if (chatData.chattype && chatData.chattype == 'cross') {
            var sidname = Api.mergeServerVoApi.getAfterMergeSeverName(this._chatData.sender);
            serverTxt.text = sidname;
            serverTxt.x = itemBg.x + 5;
            serverTxt.y = 10;
            this.addChild(serverTxt);
        }
        //名字
        var chatName = "<font u ='true'>" + (isself ? Api.playerVoApi.getPlayerName() : chatData.sendername) + "</font>" + (chatData.lastroundRank ? "(" + LanguageManager.getlocal("acThreeKingdomslastroundRank" + chatData.lastroundRank) + ")" : ""); //(chatData.lastroundRank?LanguageManager.getlocal(`acThreeKingdomslastroundRank${chatData.lastroundRank}`):``)
        this._userName = ComponentManager.getTextField(chatName, TextFieldConst.FONTSIZE_TITLE_SMALL);
        this._userName.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this._userName.x = (chatData.chattype && chatData.chattype == 'cross' ? (serverTxt.x + serverTxt.textWidth - 5) : itemBg.x) + 10;
        this._userName.y = 10;
        this.addChild(this._userName);
        this._userName.addTouchTap(this.showUserInfo, this, null);
        var dis = 0;
        var vipFlag = null;
        if (isself || !chatData.content.hideVip) {
            if (chatData.content.vip && chatData.content.vip > 0 && !PlatformManager.checkIsKRSp()) {
                vipFlag = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(chatData.content.vip).icon);
                vipFlag.setScale(0.65);
                // vipFlag.x =  this._userName.x + this._userName.width + 10;
                // vipFlag.y = this._userName.y ;
                vipFlag.setPosition(headContaner.x + headContaner.width / 2 - 33, headContaner.y + headContaner.height - 20 - 10);
                // this.addChild(vipFlag);
                this._posContainer.addChild(vipFlag);
                // dis = 68 + 5;
            }
        }
        var officerImg;
        var titleinfo = App.CommonUtil.getTitleData(chatData.content.title);
        if (titleinfo.title != "") {
            officerImg = App.CommonUtil.getTitlePic(chatData.content.title);
            officerImg.x = this._userName.x + this._userName.width + dis + 20;
            officerImg.y = this._userName.y + this._userName.height / 2 - 33;
            if (PlatformManager.checkIsThSp()) {
                officerImg.x = this._userName.x + this._userName.width;
            }
            this.addChild(officerImg);
            dis = dis + 110 + 5;
        }
        //时间
        var ts = chatData.ts || chatData.content.ts;
        var timeDis = GameData.serverTime - ts;
        var timeTF = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(timeDis, 4), TextFieldConst.FONTSIZE_TITLE_SMALL);
        timeTF.textColor = TextFieldConst.COLOR_BROWN;
        // timeTF.x = this._userName.x + this._userName.width + dis + 5;
        timeTF.x = this.width - timeTF.width - 5;
        timeTF.y = this._userName.y;
        this.addChild(timeTF);
        if (chatData.kingdom && chatData.lastroundRank) {
            timeTF.visible = false;
        }
        var messageStr = chatData.content.message;
        if (Api.chatVoApi.isShieldEmoji()) {
            messageStr = Api.chatVoApi.checkShieldEmoji(messageStr);
        }
        var textTotalLength = 0;
        var messageTF;
        if (chatData.content.stype) {
            this._stype = chatData.content.stype;
            this.initShareInfo(itemBg, isself);
        }
        else {
            var msg = Api.emoticonVoApi.chatStrChangeToEmoticon(chatData.content.message);
            if (msg) {
                itemBg.visible = false;
                this.showEmoticonAni(msg, isself);
            }
            else {
                //内容
                messageTF = ComponentManager.getTextField(messageStr, TextFieldConst.FONTSIZE_TITLE_SMALL);
                messageTF.textColor = TextFieldConst.COLOR_BLACK;
                messageTF.x = itemBg.x + 20;
                messageTF.y = itemBg.y + 12;
                this.addChild(messageTF);
                if (messageStr == "") {
                    messageTF.text = LanguageManager.getlocal("chatEmojiShield");
                }
                textTotalLength = messageTF.width;
                if (messageTF.width > 370) {
                    messageTF.width = 370;
                }
                var bgHeight = messageTF.height + 20;
                if (bgHeight < 50) {
                    itemBg.width = messageTF.width + 30;
                    itemBg.height = 47;
                }
                else {
                    itemBg.width = 404;
                    itemBg.height = messageTF.height + 20;
                }
            }
        }
        //自己说的话
        if (isself) {
            this._posContainer.x = this.width - this._posContainer.width;
            itemBg.skewY = 180;
            itemBg.x = this._posContainer.x - 12;
            if (serverTxt) {
                serverTxt.x = itemBg.x - serverTxt.textWidth - 5;
                this._userName.x = serverTxt.x - this._userName.textWidth - 5;
            }
            else {
                this._userName.x = itemBg.x - this._userName.textWidth - 8;
            }
            var distance = 0;
            if (officerImg) {
                if (titleinfo.clv) {
                    var titlecfg = Config.TitleCfg.getTitleCfgById(titleinfo.title);
                    if (titlecfg.isTitle == 1 && titlecfg.titleType < 3) {
                        var arr = [];
                        switch (titlecfg.titleType) {
                            case 1:
                                arr = Config.TitleupgradeCfg.diList;
                                break;
                            case 2:
                                arr = Config.TitleupgradeCfg.wangList;
                                break;
                            case 7:
                                arr = Config.TitleupgradeCfg.huangList;
                                break;
                        }
                        var unit = arr[titleinfo.clv - 1];
                        if (unit && unit.title2) {
                            distance = 25;
                        }
                    }
                }
                officerImg.x = this._userName.x - officerImg.width - distance;
                if (PlatformManager.checkIsThSp()) {
                    officerImg.x = this._userName.x - 155;
                }
            }
            timeTF.x = 5;
            if (messageTF) {
                messageTF.x = itemBg.x - messageTF.width - 20;
            }
        }
        //翻译按钮
        if (messageTF && messageStr != "" && Api.switchVoApi.checkOpenTranslate() && !isself && !App.StringUtil.numberOrSymbolCheck(messageStr) && !Api.emoticonVoApi.chatStrChangeToEmoticon(messageStr)) {
            var lineStr = LanguageManager.getlocal("translate");
            // this._translate = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN2);   
            // this._translate.textFlow = new Array<egret.ITextElement>(
            //         { text: lineStr, style: { "underline": true} }
            //         );
            this._translate = BaseLoadBitmap.create("chatview_translate");
            this._translate.y = itemBg.y;
            this.addChild(this._translate);
            this._translate.addTouchTap(this.trainlatHandle, this, [messageStr]);
            // let tempText:BaseTextField = ComponentManager.getTextField(lineStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);  
            // if (370-textTotalLength >= tempText.width +10)
            // {
            //     //一行显示
            //     itemBg.width += tempText.width +10;
            //     // this._translate.setPosition(messageTF.x+messageTF.width+10,messageTF.y);
            // }
            // else
            // {   
            //     //多行
            //     let lastLineLength:number = textTotalLength%370;
            //     if (370-lastLineLength >= tempText.width +10)
            //     {
            //         //不换行
            //         // this._translate.setPosition(itemBg.x+404-tempText.width-5,messageTF.y+messageTF.height - this._translate.height);
            //     }
            //     else
            //     {
            //         // this._translate.setPosition(itemBg.x+404-tempText.width-5, messageTF.y+messageTF.height+messageTF.lineSpacing+5);
            //         itemBg.width = 404;
            //         // itemBg.height += this._translate.height + messageTF.lineSpacing+5;
            //     }
            // }
            this._translate.x = itemBg.x + itemBg.width + 12;
        }
        if (this._chatData.content.trans) {
            this.createTrainInfo();
            this._translate.visible = false;
        }
        if (App.DeviceUtil.isRuntime2() == false) {
            this.cacheAsBitmap = true;
        }
    };
    ChatScrollItem.prototype.getTrasMessageConst = function () {
        var str = MessageConst.MESSAGE_NOTICE_CHAT_TRANS;
        if (this._chatData.transType) {
            str += this._chatData.transType;
        }
        return str;
    };
    ChatScrollItem.prototype.trainlatHandle = function (event, parms) {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHAT_TRANSLATION, this.trainslateCallback, this);
        NetManager.request(NetRequestConst.REQUEST_CHAT_TRANSLATION, { msg: parms, target_language: PlatformManager.getTransTargetLang() });
    };
    ChatScrollItem.prototype.trainslateCallback = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHAT_TRANSLATION, this.trainslateCallback, this);
        if (this._translate) {
            this._translate.visible = false;
        }
        if (event.data && event.data.ret == true && event.data.data.data.target) {
            var transMessage = event.data.data.data.target;
            this._chatData.content.trans = transMessage;
            if (this._chatData.transType == TransType.Pri) {
                Api.chatVoApi.setPriTrans(transMessage, this._chatData);
            }
            App.MessageHelper.dispatchEvent(this.getTrasMessageConst());
        }
    };
    ChatScrollItem.prototype.createTrainInfo = function () {
        //翻译内容
        var transBg = BaseBitmap.create(this._itemBgPic);
        transBg.width = 404;
        transBg.x = this._itemBg.x;
        transBg.y = this._itemBg.y + this._itemBg.height + 10;
        this.addChild(transBg);
        var transTF = ComponentManager.getTextField(this._chatData.content.trans, TextFieldConst.FONTSIZE_TITLE_SMALL);
        transTF.textColor = TextFieldConst.COLOR_BLACK;
        transTF.x = transBg.x + 20;
        transTF.y = transBg.y + 12;
        this.addChild(transTF);
        if (transTF.width > 370) {
            transTF.width = 370;
        }
        var bgHeight = transTF.height + 20;
        if (bgHeight < 50) {
            transBg.width = transTF.width + 30;
            transBg.height = 47;
        }
        else {
            transBg.width = 404;
            transBg.height = transTF.height + 20;
        }
    };
    ChatScrollItem.prototype.showEmoticonAni = function (emoticonId, isSelf) {
        var emoticonData = Config.EmoticonCfg.getEmoticonCfgById(emoticonId);
        if (emoticonData) {
            var emoticonAni_1 = ComponentManager.getCustomMovieClip("emoticon_" + emoticonId + "_effect", emoticonData.frame, 100);
            var emoticon = BaseLoadBitmap.create("emoticon_" + emoticonId + "_effect1");
            if (isSelf) {
                emoticonAni_1.setPosition(this.width - this._posContainer.width - 125, this._itemBg.y + 20);
            }
            else {
                emoticonAni_1.setPosition(this._itemBg.x + 20, this._itemBg.y + 20);
            }
            this._itemBg.height = 145;
            this.addChild(emoticonAni_1);
            emoticonAni_1.playWithTime(1);
            emoticonAni_1.setEndCallBack(function () {
                egret.Tween.get(emoticonAni_1).wait(700).call(function () {
                    emoticonAni_1.playWithTime(1);
                });
            }, this);
        }
    };
    ChatScrollItem.prototype.initShareInfo = function (itemBg, isself) {
        itemBg.height = 106;
        itemBg.addTouchTap(this.shareTurnOnHandler, this, null);
        var iconBg = BaseBitmap.create("chat_share_bg");
        iconBg.setPosition(itemBg.x + 11, itemBg.y + 1);
        this.addChild(iconBg);
        if (isself) {
            iconBg.x = itemBg.x + 26 - iconBg.width / 2;
        }
        var lineStr;
        if (this._stype == 1) {
            lineStr = LanguageManager.getlocal("taskGoBtn");
            var icon = BaseLoadBitmap.create("chat_share_icon1_" + this._chatData.content.sinfo.dtype);
            icon.setPosition(iconBg.x, iconBg.y);
            this.addChild(icon);
        }
        else if (this._stype == 2) {
            lineStr = LanguageManager.getlocal("taskGoBtn");
            var icon = BaseLoadBitmap.create("chat_share_icon2");
            icon.setPosition(iconBg.x, iconBg.y);
            this.addChild(icon);
        }
        else if (this._stype == 3) {
            lineStr = LanguageManager.getlocal("adultMarry");
            // if (this._chatData.content.sinfo.cid)
            // {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 106, 87);
            var icon = BaseLoadBitmap.create(Api.adultVoApi.getAdultHalfPic(this._chatData.content.sinfo.sex, this._chatData.content.sinfo.aquality), rect);
            icon.setPosition(iconBg.x, iconBg.y + 8);
            this.addChild(icon);
            // }
        }
        var posY = itemBg.y + 10;
        for (var key in this._chatData.content.sinfo.info) {
            var infoStr = this._chatData.content.sinfo.info[key];
            var infoText = ComponentManager.getTextField(infoStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            infoText.setPosition(iconBg.x + iconBg.width + 10, posY);
            this.addChild(infoText);
            posY += infoText.height + 10;
        }
        this._goTo = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW2);
        this._goTo.textFlow = new Array({ text: lineStr, style: { "underline": true } });
        this._goTo.setPosition(iconBg.x + 377 - this._goTo.width, itemBg.y + itemBg.height / 2 - this._goTo.height / 2);
        this.addChild(this._goTo);
        this._itemBgx = iconBg.x;
        if (GameData.serverTime >= this._chatData.content.sinfo.et) {
            this.setSharePast();
        }
        else {
            var isShow = LocalStorageManager.get("ChatShare" + this._chatData.ts + this._chatData.sender);
            if (isShow && isShow != "") {
                this.setSharePast();
            }
        }
    };
    ChatScrollItem.prototype.setSharePast = function (write) {
        if (write) {
            LocalStorageManager.set("ChatShare" + this._chatData.ts + this._chatData.sender, "true");
        }
        this._isSharePast = true;
        this._goTo.textFlow = new Array({ text: LanguageManager.getlocal("shareOver"), style: { "underline": true } });
        this._goTo.x = (this._itemBgx + 377 - this._goTo.width);
        this._goTo.textColor = TextFieldConst.COLOR_WARN_RED;
    };
    ChatScrollItem.prototype.shareTurnOnHandler = function () {
        if (this._isSharePast == true) {
            App.CommonUtil.showTip(LanguageManager.getlocal("shareTimeOver"));
            return;
        }
        if (GameData.serverTime >= this._chatData.content.sinfo.et) {
            this.setSharePast();
            App.CommonUtil.showTip(LanguageManager.getlocal("shareTimeOver"));
            return;
        }
        if (this._stype == 1) {
            if (Config.DinnerCfg.getNeedLv() > Api.playerVoApi.getPlayerLevel()) {
                App.CommonUtil.showTip(Api.dinnerVoApi.getLockedString());
                return;
            }
            // if (this._chatData.sender == Api.playerVoApi.getPlayerID())
            // {   
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL), this.requiestCallback2, this);
            NetManager.request(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL, { "getuid": this._chatData.sender });
            // }
            // else
            // {
            //     ViewController.getInstance().openView(ViewConst.BASE.GOTODINNEREDVIEW, {"info":{name:this._chatData.sendername ,uid: this._chatData.sender}});
            // }
        }
        else if (this._stype == 2) {
            if (GameConfig.config.studyatkbaseCfg.needLv > Api.playerVoApi.getPlayerLevel()) {
                App.CommonUtil.showTip(Api.studyatkVoApi.getLockedString());
                return;
            }
            var studyAtkBaseCfg = GameConfig.config.studyatkbaseCfg;
            var tmpFuid = Api.playerVoApi.getPlayerID();
            var studyatkvo = Api.studyatkVoApi.getStudyatkVo();
            var lasttime = studyAtkBaseCfg.lastTime;
            if (studyatkvo.skillinfo && studyatkvo.skillinfo.lastTime) {
                lasttime = studyatkvo.skillinfo.lastTime;
            }
            var endSec = studyatkvo.create_time + lasttime;
            if (Api.studyatkVoApi.getStudyatkVo().join_uid > 0) {
                endSec = Api.studyatkVoApi.getStudyatkVo().join_st + lasttime;
                tmpFuid = Api.studyatkVoApi.getStudyatkVo().join_uid;
            }
            if (endSec > GameData.serverTime && this._chatData.sender != Api.playerVoApi.getPlayerID() && this._chatData.sender != tmpFuid) {
                App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_already"));
                return;
            }
            // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_INDEX),this.requiestCallback3,this);
            // NetManager.request(NetRequestConst.REQUEST_STUDYATK_INDEX,{});
            ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKDETAILVIEW, { uid: this._chatData.sender });
        }
        else if (this._stype == 3) {
            if (this._chatData.sender == Api.playerVoApi.getPlayerID()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("shareAdultMarryNoSelf"));
                return;
            }
            var sinfo = this._chatData.content.sinfo;
            var childList = Api.adultVoApi.getAdultVoListById(sinfo.aquality, sinfo.sex);
            if (childList.length == 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("adult_no_match"));
                return;
            }
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ADULT_EXISTPROPOSE), this.requiestCallback, this);
            NetManager.request(NetRequestConst.REQUEST_ADULT_EXISTPROPOSE, { "proposeId": Number(sinfo.aid) });
        }
    };
    //提亲回调
    ChatScrollItem.prototype.requiestCallback = function (p) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ADULT_EXISTPROPOSE), this.requiestCallback, this);
        if (p.data.ret == true) {
            var sinfo = this._chatData.content.sinfo;
            var info = { id: Number(sinfo.aid), aquality: sinfo.aquality, sex: sinfo.sex, uid: this._chatData.sender, visit: sinfo.visit, fatherName: this._chatData.sendername, name: sinfo.info[0], total: sinfo.total };
            ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSECHILDVIEW, { childInfo: info, confirmCallback: null, handler: null });
        }
        else {
            this.setSharePast(true);
            App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip5"));
        }
    };
    //宴会回调
    ChatScrollItem.prototype.requiestCallback2 = function (p) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL), this.requiestCallback2, this);
        if (p.data.ret == true) {
            if (p.data.data.data.dinnerReport) {
                Api.dinnerVoApi.formatData(p.data.data.data.dinnerdetail);
                ViewController.getInstance().openView(ViewConst.BASE.DINNERFINISHVIEW, { "info": p.data.data.data.dinnerReport, "baodi": p.data.data.data.baodiNum });
            }
            else {
                var data = { "info": p.data.data.data, "uid": this._chatData.sender };
                ViewController.getInstance().openView(ViewConst.COMMON.DINNERDETAILVIEW, data);
            }
        }
        else {
            this.setSharePast(true);
            App.CommonUtil.showTip(LanguageManager.getlocal("dinner_is_over"));
        }
    };
    //演武场回调
    ChatScrollItem.prototype.requiestCallback3 = function (event) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_INDEX), this.requiestCallback3, this);
        var rdata = event.data.data;
        var openInfo = null;
        if (rdata.ret == 0) {
            var finishinfo = rdata.data.finishinfo;
            if (finishinfo) {
                var studyRet = finishinfo.ret;
                if (studyRet == 1) {
                    ViewController.getInstance().openView(ViewConst.BASE.STUDYATKSUCCESSVIEW, finishinfo);
                }
                else if (studyRet == -1) {
                    ViewController.getInstance().openView(ViewConst.POPUP.STUDYATKFAILEDPOPUPVIEW, finishinfo);
                }
            }
        }
    };
    ChatScrollItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        var cross = this._chatData.chattype && this._chatData.chattype == 'cross';
        if (cross) {
            data.crossZone = cross;
            data.zid = this._chatData.zoneid;
        }
        // if(String(data.ruid) == this._chatData.sender)
        // {
        if (!Api.switchVoApi.checkOpenShenhe()) {
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        }
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(cross ? NetRequestConst.REQUEST_RANKG_USERSHOT : NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
    };
    ChatScrollItem.prototype.showUserInfo = function () {
        if (this._chatData.gmchat) {
            PlatformManager.getContackService();
            return;
        }
        var cross = this._chatData.chattype && this._chatData.chattype == 'cross';
        App.MessageHelper.addEventListener(NetManager.getMessageName(cross ? NetRequestConst.REQUEST_RANKG_USERSHOT : NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        if (cross) {
            NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, { ruid: this._chatData.sender, rzid: this._chatData.zoneid });
        }
        else {
            if (typeof this._chatData.issender == 'undefined') {
                NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: this._chatData.sender });
            }
            else {
                NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: this._chatData.issender == 1 ? this._chatData.sender : Api.playerVoApi.getPlayerID() });
            }
        }
    };
    ChatScrollItem.prototype.eventHandler = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                // egret.Tween.get(this._posContainer,{loop:false}).to({scaleX:0.8,ScaleY:0.8},200);
                if (this._chatData.gmchat) {
                    PlatformManager.getContackService();
                }
                else {
                    this.showUserInfo();
                }
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                // this._itemBg.texture = ResourceManager.getRes("public_9_bg28");
                break;
            case egret.TouchEvent.TOUCH_END:
                // this._itemBg.texture = ResourceManager.getRes("public_9_bg28");
                break;
        }
    };
    ChatScrollItem.prototype.getSpaceY = function () {
        return 30;
    };
    ChatScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL), this.requiestCallback2, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_INDEX), this.requiestCallback3, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHAT_TRANSLATION, this.trainslateCallback, this);
        this.cacheAsBitmap = false;
        this._userName.removeTouchTap();
        this._userName = null;
        this._posContainer.removeTouch();
        this._posContainer = null;
        this._stype = 0;
        this._isSharePast = false;
        this._goTo = null;
        this._itemBgx = null;
        this._translate = null;
        this._itemBgPic = null;
        this._chatData = null;
        _super.prototype.dispose.call(this);
    };
    return ChatScrollItem;
}(ScrollListItem));
__reflect(ChatScrollItem.prototype, "ChatScrollItem");
//# sourceMappingURL=ChatScrollItem.js.map