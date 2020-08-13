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
var DinnerSharePopupView = (function (_super) {
    __extends(DinnerSharePopupView, _super);
    function DinnerSharePopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._stype = 0;
        return _this;
    }
    DinnerSharePopupView.prototype.getTitleStr = function () {
        if (this.param.data.stype == 1) {
            return "dinner_share";
        }
        else {
            return "sharePopupViewTitle";
        }
    };
    DinnerSharePopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        this._stype = this.param.data.stype;
        var btnArray = ["share_to_world"];
        if (Api.playerVoApi.getPlayerAllianceId() > 0) {
            btnArray.push("share_to_alliance");
        }
        //此处需要判断跨服  打开分享到跨服的按钮
        //取消宴会分享到跨服聊天
        /*
        if (Api.switchVoApi.checkOpenCrossRank()){
            btnArray.push("share_to_cross");
        }
        */
        for (var i = 0; i < btnArray.length; i++) {
            var item = this.getItem(btnArray[i], i);
            item.setPosition(this.viewBg.width / 2 - item.width / 2, 40 + i * 82);
            this.addChildToContainer(item);
        }
    };
    DinnerSharePopupView.prototype.getItem = function (text, idx) {
        var container = new BaseDisplayObjectContainer();
        var itemBg = BaseBitmap.create("public_9_bg28");
        itemBg.width = 500;
        container.addChild(itemBg);
        var extendTf = ComponentManager.getTextField(LanguageManager.getlocal(text), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        extendTf.x = container.width / 2 - extendTf.width / 2;
        extendTf.y = container.height / 2 - extendTf.height / 2;
        container.addChild(extendTf);
        itemBg.addTouch(this.eventHandler, this, [idx, itemBg]);
        return container;
    };
    DinnerSharePopupView.prototype.doShareDinner = function (idx) {
        var data = {};
        data.type = "chat";
        if (idx == 0) {
            data.channel = 1;
        }
        else if (idx == 1) {
            if (Api.playerVoApi.getPlayerAllianceId() > 0) {
                data.channel = Api.playerVoApi.getPlayerAllianceId();
            }
            else if (Api.switchVoApi.checkIsCrossDinner()) {
                data.channel = 1;
            }
        }
        else if (idx == 2) {
            if (Api.switchVoApi.checkIsCrossDinner()) {
                data.channel = 1;
            }
        }
        data.sender = Api.playerVoApi.getPlayerID();
        data.sendername = Api.playerVoApi.getPlayerName();
        ;
        data.recivername = "";
        // let kinget:number = 0;
        // if (Api.promoteVoApi.isKing())
        // {
        // 	kinget = Api.promoteVoApi.getKingEndtime();
        // }
        data.ts = GameData.serverTime;
        data.zoneid = ServerCfg.selectServer.zid;
        var message = "";
        var sinfo = {};
        var childId = "";
        if (this._stype == 1) {
            // if(GameData.serverTime - Api.dinnerVoApi.lastShareTime[idx] < 5)
            // {
            // 	App.CommonUtil.showTip(LanguageManager.getlocal("chatTimeTip"));
            // 	return;
            // }
            // Api.dinnerVoApi.lastShareTime[idx] = GameData.serverTime;
            var num = this.param.data.num;
            var typeStr = LanguageManager.getlocal("dinnerTitle" + Api.dinnerVoApi.getDtype().toString());
            var totalNum = Config.DinnerCfg.getFeastItemCfg(Api.dinnerVoApi.getDtype()).contain;
            var seatStr = LanguageManager.getlocal("dinner_seat_num", [String(num), String(totalNum)]);
            message = LanguageManager.getlocal("dinner_share_text", [typeStr]);
            sinfo = { dtype: Api.dinnerVoApi.getDtype(), info: [typeStr, seatStr] };
        }
        else if (this._stype == 2) {
            message = LanguageManager.getlocal("chat_share_text2", [String(this.param.data.exp)]);
            var expStr = LanguageManager.getlocal("study_table_willGet2", [String(this.param.data.exp)]);
            var seatStr = LanguageManager.getlocal("dinner_seat_num", [String(this.param.data.num), "3"]);
            sinfo = { et: this.param.data.et, info: [LanguageManager.getlocal("studyatk"), seatStr, expStr] };
        }
        else if (this._stype == 3) {
            message = LanguageManager.getlocal("chat_share_text3", [LanguageManager.getlocal("adult_quality" + this.param.data.aquality)]);
            var attStr = LanguageManager.getlocal("atkraceChallengeinfoAttr", [String(this.param.data.att)]);
            var aqualityStr = LanguageManager.getlocal("adult_quality") + LanguageManager.getlocal("adult_quality" + this.param.data.aquality);
            // let picStr:string = Api.adultVoApi.getAdultHalfPic(this.param.data.id);
            childId = this.param.data.id;
            sinfo = { et: this.param.data.et,
                aid: this.param.data.aid,
                // cid:childId,
                sex: this.param.data.sex,
                visit: this.param.data.visit,
                aquality: this.param.data.aquality,
                total: this.param.data.att,
                info: [this.param.data.name, attStr, aqualityStr]
            };
        }
        var titleLv = 0;
        var titleId = Api.playerVoApi.getVipHeadID();
        if (titleId != null) {
            var titleInfo = Api.itemVoApi.getTitleInfoVoById(Number(titleId));
            if (Api.switchVoApi.checkOpenTitleLv() && titleInfo.isLvUp == 1) {
                titleLv = titleInfo.lv;
            }
        }
        data.content =
            {
                "pic": Api.playerVoApi.getPlayePicId(),
                "vip": Api.playerVoApi.getPlayerVipLevel(),
                "title": Api.playerVoApi.getTitleid(),
                "headBg": Api.playerVoApi.getVipHeadBg(),
                "sign": Api.chatVoApi.getChatSign(),
                // "ket" : kinget,
                "stype": this._stype,
                "message": message,
                "sinfo": sinfo,
                "titleLv": titleLv,
            };
        if (this._stype == 1) {
            if (idx == 0) {
                this.request(NetRequestConst.REQUEST_CHAT_SENDCHATMSG, { msg: data });
            }
            else if (data.channel == 1 && Api.switchVoApi.checkIsCrossDinner()) {
                this.sentServerMsg(message, sinfo);
            }
            else {
                this.request(NetRequestConst.REQUEST_CHAT_SENDCHATMSG, { msg: data });
            }
        }
        else if (this._stype == 2) {
            this.request(NetRequestConst.REQUEST_CHAT_SENDSTUDYATKMSG, { msg: data });
        }
        else if (this._stype == 3) {
            this.request(NetRequestConst.REQUEST_CHAT_SENDADULTMSG, { msg: data, mtype: childId });
        }
    };
    DinnerSharePopupView.prototype.sentServerMsg = function (message, sinfo) {
        if (Api.otherInfoVoApi.getCrossBanet() - GameData.serverTime > 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatBanet", [App.DateUtil.getFormatBySecond(Api.otherInfoVoApi.getCrossBanet(), 2)]));
            return;
        }
        var needVip = Api.vipVoApi.getNeedVip("reachLvelUnlock");
        if (needVip && Api.playerVoApi.getPlayerLevel() < GameData.chatlevel && Api.playerVoApi.getPlayerVipLevel() < needVip) {
            App.CommonUtil.showTip(LanguageManager.getlocal("reachLvelUnlockDesc2", [Api.playerVoApi.getPlayerOfficeByLevel(GameData.chatlevel), needVip + ""]));
            return;
        }
        if (GameData.serverTime - Api.chatVoApi._lastTime < 5) {
            var times = String(Api.chatVoApi._lastTime - GameData.serverTime + 5);
            // Api.chatVoApi._lastTime = GameData.serverTime;
            App.CommonUtil.showTip(LanguageManager.getlocal("chatTimeTip", [times]));
            return;
        }
        if (Api.chatVoApi.getLabaNum() <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("corssserverChatNot"));
            return;
        }
        Api.chatVoApi._lastTime = GameData.serverTime;
        this.request(NetRequestConst.REQUEST_CROSSCHAT_SENDMSG, {
            //receiveuid : this.param.data.sender,
            content: message,
            sinfo: sinfo,
            stype: this._stype
        });
    };
    DinnerSharePopupView.prototype.receiveData = function (data) {
        if (data.ret == true) {
            // if (this._stype == 1)
            // {
            // 	NetManager.request(NetRequestConst.REQUEST_DINNER_SHAREDINNER,{});
            // }
            App.CommonUtil.showTip(LanguageManager.getlocal("share_success"));
            if (this._obj && this._callbackF) {
                this._callbackF.apply(this._obj);
            }
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("dinner_share_fail"));
        }
        this.hide();
    };
    DinnerSharePopupView.prototype.getRequestErrorTip = function () {
        return LanguageManager.getlocal("dinner_share_fail");
    };
    DinnerSharePopupView.prototype.eventHandler = function (event, idx, itemBg) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                itemBg.texture = ResourceManager.getRes("public_9_bg28_down");
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                itemBg.texture = ResourceManager.getRes("public_9_bg28");
                break;
            case egret.TouchEvent.TOUCH_END:
                itemBg.texture = ResourceManager.getRes("public_9_bg28");
                this.doShareDinner(idx);
                break;
        }
    };
    DinnerSharePopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        this._stype = 0;
        _super.prototype.dispose.call(this);
    };
    return DinnerSharePopupView;
}(PopupView));
__reflect(DinnerSharePopupView.prototype, "DinnerSharePopupView");
