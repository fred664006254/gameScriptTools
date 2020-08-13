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
        this.width = 510;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var startY = 16;
        this._data = data;
        if (index % 2 == 1) {
            var bg = BaseBitmap.create("public_tc_bg05");
            bg.width = 510;
            bg.height = 40;
            bg.x = 0;
            bg.y = 5;
            this._nodeContainer.addChild(bg);
        }
        if (index > 2) {
            var titleTxt1 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
            titleTxt1.text = String(index + 1);
            titleTxt1.x = 90 - titleTxt1.width / 2 - 13;
            titleTxt1.y = startY;
            this._nodeContainer.addChild(titleTxt1);
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                titleTxt1.textColor = TextFieldConst.COLOR_WARN_GREEN;
            }
        }
        else {
            var rankImg = BaseLoadBitmap.create("rank_" + String(index + 1));
            rankImg.width = 49;
            rankImg.height = 39;
            rankImg.x = 90 - rankImg.width / 2 - 13;
            rankImg.y = 9;
            this.addChild(rankImg);
        }
        var titleTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        titleTxt2.text = data.name;
        titleTxt2.x = 240 - titleTxt2.width / 2 - 30;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);
        var server = "";
        if (this.vo.getQuByZid(data.zid) > 0) {
            // server = LanguageManager.getlocal("mergeServer",[String(data.qu),String(data.zid)]);
            server = LanguageManager.getlocal("mergeServerOnlyqu", [String(this.vo.getQuByZid(data.zid))]);
        }
        else {
            // "ranserver2":"{1}服",
            server = LanguageManager.getlocal("ranserver2", [String(data.zid)]);
        }
        var titleTxt3 = ComponentManager.getTextField("", titleTxt2.size, TextFieldConst.COLOR_BROWN);
        titleTxt3.text = server;
        titleTxt3.x = 360 - titleTxt3.width / 2 - 30;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);
        var titleTxt4 = ComponentManager.getTextField("", titleTxt2.size, TextFieldConst.COLOR_BROWN);
        titleTxt4.text = String(data.point);
        titleTxt4.x = 480 - titleTxt4.width / 2 - 30;
        titleTxt4.y = startY;
        this._nodeContainer.addChild(titleTxt4);
        if (data.uid == Api.playerVoApi.getPlayerID() || data.id == Api.playerVoApi.getPlayerAllianceId()) {
            titleTxt2.textColor = TextFieldConst.COLOR_WARN_GREEN;
            titleTxt3.textColor = TextFieldConst.COLOR_WARN_GREEN;
            titleTxt4.textColor = TextFieldConst.COLOR_WARN_GREEN;
        }
        this.addTouch(this.eventHandler, this, null, true);
        var maskImg = BaseBitmap.create("public_9_bg29");
        // maskImg.height = 42;
        maskImg.height = 54;
        maskImg.width = 500;
        maskImg.x = 15; //this.width / 2 - maskImg.width/2;
        maskImg.y = -2; //this.height/2 - maskImg.height/2 + 5;
        maskImg.visible = false;
        this._maskImg = maskImg;
        this.addChild(maskImg);
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
            ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW, rdata.data);
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
