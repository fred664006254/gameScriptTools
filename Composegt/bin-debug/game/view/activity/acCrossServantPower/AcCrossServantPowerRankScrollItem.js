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
var AcCrossServantPowerRankScrollItem = (function (_super) {
    __extends(AcCrossServantPowerRankScrollItem, _super);
    function AcCrossServantPowerRankScrollItem() {
        var _this = _super.call(this) || this;
        _this._rowIdx = 0;
        _this._uiData = undefined;
        return _this;
    }
    AcCrossServantPowerRankScrollItem.prototype.initItem = function (index, data) {
        this._rowIdx = index;
        this._uiData = data;
        this.width = 520;
        this.height = 40;
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (index % 2 == 1) {
            var bg = BaseBitmap.create("public_tc_bg05");
            bg.width = 510;
            bg.height = 40;
            bg.x = this.width / 2 - bg.width / 2;
            // bg.y = this.height / 2 - bg.height/2;
            this.addChild(bg);
        }
        if (this._uiData.uid == Api.playerVoApi.getPlayerID()) {
            tarColor = TextFieldConst.COLOR_WARN_GREEN;
        }
        if (this._rowIdx < 3) {
            var rankImg = BaseBitmap.create("rank_" + String(this._rowIdx + 1));
            rankImg.x = 65 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
            rankTxt.text = String(this._rowIdx + 1);
            rankTxt.x = 65 - rankTxt.width / 2;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        nameTxt.text = this._uiData.name + "<font color=0x13851e>(" + Api.mergeServerVoApi.getAfterMergeSeverName(this._uiData.uid, true, this._uiData.zid) + ")</font>";
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        nameTxt.x = 220 - nameTxt.width / 2;
        this.addChild(nameTxt);
        var powerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        powerTxt.text = App.StringUtil.changeIntToText(Number(this._uiData.v));
        powerTxt.x = 410 - powerTxt.width / 2;
        powerTxt.y = nameTxt.y;
        this.addChild(powerTxt);
        this.touchEnabled = true;
        // this.addTouch(this.eventHandler,this,null,true);
    };
    AcCrossServantPowerRankScrollItem.prototype.eventHandler = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_END:
                if (this._uiData.zid) {
                    App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
                    NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, { ruid: this._uiData.uid, rzid: this._uiData.zid });
                }
                else {
                    App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
                    NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: this._uiData.uid });
                }
        }
    };
    AcCrossServantPowerRankScrollItem.prototype.userShotCallback = function (event) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        var rdata = event.data.data;
        var ret = rdata.ret;
        if (rdata.ret != 0) {
            App.CommonUtil.showTip("requestLoadErrorTip");
            return;
        }
        if (String(rdata.data.ruid) == this._uiData.uid) {
            if (event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT) {
                rdata.data['zid'] = this._uiData.zid;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW, rdata.data);
        }
    };
    AcCrossServantPowerRankScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    AcCrossServantPowerRankScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcCrossServantPowerRankScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        this._maskImg = null;
        this._rowIdx = null;
        this._uiData = null;
        this.cacheAsBitmap = false;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServantPowerRankScrollItem;
}(ScrollListItem));
__reflect(AcCrossServantPowerRankScrollItem.prototype, "AcCrossServantPowerRankScrollItem");
