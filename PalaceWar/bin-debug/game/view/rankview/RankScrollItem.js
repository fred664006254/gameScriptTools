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
 * 排行列表节点
 * author yanyuling
 * date 2017/10/25
 * @class RankScrollItem
 */
var RankScrollItem = (function (_super) {
    __extends(RankScrollItem, _super);
    function RankScrollItem() {
        var _this = _super.call(this) || this;
        _this._rowIdx = 0;
        _this._uiData = undefined;
        return _this;
    }
    RankScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICR_REFRESH_RANKITEM, this.refreshSelectStatus, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        this._rowIdx = index;
        this._uiData = data;
        this.width = 602;
        this.height = 62; //rankbg_1
        this.addTouch(this.eventHandler, this, null, true);
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (this._uiData.uid == Api.playerVoApi.getPlayerID()) {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        if (this._rowIdx < 3) {
            this.height = 76;
            var rankbg = BaseBitmap.create("rankbg_" + String(this._rowIdx + 1));
            rankbg.width = 608;
            rankbg.height = 76;
            rankbg.x = 16;
            rankbg.y = this.height / 2 - rankbg.height / 2;
            this.addChild(rankbg);
            var rankImg = BaseBitmap.create("rankinglist_rankn" + String(this._rowIdx + 1));
            rankImg.x = 70 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            var rankbg = BaseBitmap.create("rankbg_4");
            rankbg.width = 608;
            rankbg.height = 62;
            rankbg.x = 16;
            rankbg.y = this.height / 2 - rankbg.height / 2;
            this.addChild(rankbg);
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            rankTxt.text = String(this._rowIdx + 1);
            rankTxt.x = 70 - rankTxt.width / 2;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        nameTxt.text = this._uiData.name;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(nameTxt);
        //亲密榜
        if (this._uiData.total_imacy) {
            nameTxt.x = 235 - nameTxt.width / 2;
            var imacyTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            imacyTxt.text = this._uiData.total_imacy; //LanguageManager.getlocal("officialTitle"+ this._uiData.level);
            imacyTxt.x = 495 - imacyTxt.width / 2;
            imacyTxt.y = nameTxt.y;
            this.addChild(imacyTxt);
        }
        else if (this._uiData.cid) {
            nameTxt.x = 235 - nameTxt.width / 2;
            var bcid = Api.challengeVoApi.getBigChannelIdByCid(this._uiData.cid);
            var challengeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            // challengeTxt.text = this._uiData.cid +"."+ LanguageManager.getlocal("challengeTitle"+ bcid);
            // challengeTxt.x = 480-challengeTxt.width/2;
            challengeTxt.text = bcid + "." + LanguageManager.getlocal("challengeTitle" + bcid);
            challengeTxt.x = 430;
            challengeTxt.y = nameTxt.y;
            this.addChild(challengeTxt);
        }
        else {
            nameTxt.x = 205 - nameTxt.width / 2;
            var titleinfo = App.CommonUtil.getTitleData(this._uiData.title);
            if (!this._uiData.zid && titleinfo.title != "") {
                var officerImg = App.CommonUtil.getTitlePic(this._uiData.title);
                // officerImg.width = 155;
                // officerImg.height = 59;
                var deltaV = 0.8;
                officerImg.setScale(deltaV);
                officerImg.x = 320;
                // officerImg.y = nameTxt.y +nameTxt.height/2 -  30;
                officerImg.y = nameTxt.y + nameTxt.height / 2 - officerImg.height * officerImg.scaleY / 2;
                this.addChild(officerImg);
            }
            else {
                var officerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
                if (this._uiData.zid) {
                    var sidname = Api.mergeServerVoApi.getAfterMergeSeverName(this._uiData.uid);
                    officerTxt.text = sidname;
                }
                else {
                    officerTxt.text = LanguageManager.getlocal("officialTitle" + this._uiData.level);
                }
                officerTxt.x = 380 - officerTxt.width / 2;
                officerTxt.y = nameTxt.y;
                this.addChild(officerTxt);
            }
            var powerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            powerTxt.text = App.StringUtil.changeIntToText(Number(this._uiData.power));
            powerTxt.x = 530 - powerTxt.width / 2;
            powerTxt.y = nameTxt.y;
            this.addChild(powerTxt);
        }
        // if ( this._uiData.vip != "0")
        // {
        //     let vipFlag = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(this._uiData.vip).icon);
        //     vipFlag.setScale(0.65);
        //     vipFlag.x =   nameTxt.x + nameTxt.width  ;
        //     vipFlag.y = nameTxt.y ;
        //     this.addChild(vipFlag);
        // }
        var lineImg = BaseBitmap.create("rank_line");
        lineImg.x = GameConfig.stageWidth / 2 - lineImg.width / 2;
        lineImg.y = this.height - lineImg.height;
        this.addChild(lineImg);
        var maskImg = BaseBitmap.create("rank_select_mask");
        maskImg.x = GameConfig.stageWidth / 2 - maskImg.width / 2;
        maskImg.y = 0;
        maskImg.visible = false;
        this._maskImg = maskImg;
        if (this._rowIdx < 3) {
            maskImg.height = 76;
        }
        else {
            maskImg.height = 62;
        }
        this.addChild(maskImg);
        this.cacheAsBitmap = true;
    };
    RankScrollItem.prototype.eventHandler = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._maskImg.visible = true;
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this._maskImg.visible = false;
                break;
            case egret.TouchEvent.TOUCH_END:
                this._maskImg.visible = false;
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICR_REFRESH_RANKITEM, this._rowIdx);
                if (this._uiData.zid) {
                    NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, { ruid: this._uiData.uid, rzid: this._uiData.zid });
                }
                else {
                    NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: this._uiData.uid });
                }
                break;
        }
    };
    RankScrollItem.prototype.refreshSelectStatus = function (event) {
        var idx = event.data;
        if (this._rowIdx != idx) {
            this._maskImg.visible = false;
        }
    };
    RankScrollItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        if (String(data.ruid) == this._uiData.uid) {
            if (event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT) {
                data["crossZone"] = 1;
                data['zid'] = this._uiData.zid;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        }
    };
    RankScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    RankScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    RankScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICR_REFRESH_RANKITEM, this.refreshSelectStatus, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        this._maskImg = null;
        this._rowIdx = null;
        this._uiData = null;
        this.cacheAsBitmap = false;
        _super.prototype.dispose.call(this);
    };
    return RankScrollItem;
}(ScrollListItem));
__reflect(RankScrollItem.prototype, "RankScrollItem");
//# sourceMappingURL=RankScrollItem.js.map