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
 * 榜
 * author dky
 * date 2017/11/23
 * @class AcCrossServerWifeBattleRankScrollItem2
 */
var AcCrossServerWifeBattleRankScrollItem2 = (function (_super) {
    __extends(AcCrossServerWifeBattleRankScrollItem2, _super);
    function AcCrossServerWifeBattleRankScrollItem2() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcCrossServerWifeBattleRankScrollItem2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeBattleRankScrollItem2.prototype.initItem = function (index, data, itemParam) {
        this.aid = itemParam.aid;
        this.code = itemParam.code;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        this.height = 40;
        this.width = 610;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var startY = 16;
        this._data = data;
        this._data = data;
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW2;
        }
        var rankbg;
        if (index < 3) {
            var bgpic = "";
            if (index == 0) {
                bgpic = "public_9_bg66";
            }
            else if (index == 1) {
                bgpic = "public_9_bg69";
            }
            else {
                bgpic = "public_9_bg68";
            }
            this.height = 88;
            rankbg = BaseBitmap.create(bgpic);
            rankbg.width = 610;
            rankbg.scaleY = 88 / rankbg.height;
            rankbg.x = 0;
            rankbg.y = 0;
            this.addChild(rankbg);
            var rankImg = BaseBitmap.create("rankinglist_rankn" + String(index + 1));
            rankImg.x = 68 - rankImg.width / 2;
            rankImg.y = 44 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            this.height = 70;
            rankbg = BaseBitmap.create("public_9_bg70");
            rankbg.width = 610;
            rankbg.scaleY = 70 / rankbg.height;
            rankbg.x = 0;
            rankbg.y = 0;
            this.addChild(rankbg);
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            rankTxt.text = String(index + 1);
            rankTxt.x = 68 - rankTxt.width / 2;
            rankTxt.y = 25;
            this.addChild(rankTxt);
        }
        var nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        nameTxt.x = 176 - nameTxt.width / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        this.addChild(nameTxt);
        var server = "";
        if (this.vo.getQuByZid(data.zid) > 0) {
            // server = LanguageManager.getlocal("mergeServer",[String(data.qu),String(data.zid)]);
            server = LanguageManager.getlocal("mergeServerOnlyqu", [String(this.vo.getQuByZid(data.zid))]);
        }
        else {
            // "ranserver2":"{1}服",
            server = LanguageManager.getlocal("ranserver2", [String(data.zid)]);
        }
        var serverTxt = ComponentManager.getTextField(server, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        serverTxt.x = 438 - serverTxt.width / 2;
        serverTxt.y = nameTxt.y;
        this.addChild(serverTxt);
        var scoreTxt = ComponentManager.getTextField(data.point, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        scoreTxt.x = 538 - scoreTxt.width / 2;
        scoreTxt.y = nameTxt.y;
        this.addChild(scoreTxt);
        if (data.info && data.info.title && data.info.title.title) {
            var officerImg = App.CommonUtil.getTitlePic(data.info.title);
            var deltaV = 0.8;
            officerImg.setScale(deltaV);
            officerImg.x = 260;
            officerImg.y = nameTxt.y + nameTxt.height / 2 - officerImg.height * officerImg.scaleY / 2;
            this.addChild(officerImg);
        }
        else {
            var officerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            officerTxt.text = LanguageManager.getlocal("officialTitle" + data.info.level);
            officerTxt.x = 320 - officerTxt.width / 2;
            officerTxt.y = nameTxt.y;
            this.addChild(officerTxt);
            if (data.uid == Api.playerVoApi.getPlayerID() || data.id == Api.playerVoApi.getPlayerAllianceId()) {
                officerTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
            }
        }
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        this.addTouchTap(function () {
            NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, {
                ruid: data.uid,
                rzid: Api.mergeServerVoApi.getTrueZid(data.uid)
            });
        }, this);
        if (data.uid == Api.playerVoApi.getPlayerID() || data.id == Api.playerVoApi.getPlayerAllianceId()) {
            nameTxt.textColor = serverTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
        }
        // this.addTouch(this.eventHandler,this,null,true);
        // let maskImg = BaseBitmap.create("public_9_bg29")
        // // maskImg.height = 42;
        // maskImg.height = 54;
        // maskImg.width = 500;
        // maskImg.x = 15//this.width / 2 - maskImg.width/2;
        // maskImg.y = -2//this.height/2 - maskImg.height/2 + 5;
        // maskImg.visible = false;
        // this._maskImg = maskImg;
        // this.addChild(maskImg);
    };
    AcCrossServerWifeBattleRankScrollItem2.prototype.eventHandler = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._maskImg.visible = true;
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this._maskImg.visible = false;
                break;
            case egret.TouchEvent.TOUCH_END:
                this._maskImg.visible = false;
                // NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._uiData.uid});
                if (this._data.zid) {
                    NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, { ruid: this._data.uid, rzid: this._data.zid });
                }
                else {
                    NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: this._data.uid });
                }
                break;
        }
    };
    AcCrossServerWifeBattleRankScrollItem2.prototype.userShotCallback = function (event) {
        var rdata = event.data.data;
        var ret = rdata.ret;
        if (rdata.ret != 0) {
            App.CommonUtil.showTip("requestLoadErrorTip");
            return;
        }
        if (String(rdata.data.ruid) == this._data.uid) {
            if (event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT) {
                // rdata.data["crossZone"] = 1;
                rdata.data['zid'] = this._data.zid;
                rdata.data["isCrossWifeBattle"] = true;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, rdata.data);
        }
    };
    AcCrossServerWifeBattleRankScrollItem2.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcCrossServerWifeBattleRankScrollItem2.prototype.getSpaceY = function () {
        return 5;
    };
    AcCrossServerWifeBattleRankScrollItem2.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        this._nodeContainer = null;
        this._maskImg = null;
        this._data = null;
        this.aid = null;
        this.code = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeBattleRankScrollItem2;
}(ScrollListItem));
__reflect(AcCrossServerWifeBattleRankScrollItem2.prototype, "AcCrossServerWifeBattleRankScrollItem2");
//# sourceMappingURL=AcCrossServerWifeBattleRankScrollItem2.js.map