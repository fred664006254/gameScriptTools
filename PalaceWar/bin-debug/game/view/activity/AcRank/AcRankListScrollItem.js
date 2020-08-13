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
 * 冲榜列表节点
 * author yanyuling
 * date 2017/11/06
 * @class AcRankListScrollItem
 */
var AcRankListScrollItem = (function (_super) {
    __extends(AcRankListScrollItem, _super);
    function AcRankListScrollItem() {
        var _this = _super.call(this) || this;
        _this._isShowAsk = false;
        _this._isSkipClick = false;
        return _this;
    }
    AcRankListScrollItem.prototype.initItem = function (index, data, itemParam) {
        // this.height = 52;
        this._data = data;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        // this.width = GameConfig.stageWidth;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data.uid) {
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }
        else {
            if (data.id == Api.playerVoApi.getPlayerAllianceId()) {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }
        if (itemParam.skipClick) {
            this._isSkipClick = true;
        }
        var startY = 16;
        if (index > 2) {
            var rankbg = BaseBitmap.create("rankbgs_4");
            rankbg.width = 516;
            rankbg.height = 62;
            rankbg.x = 27;
            rankbg.y = 0; //this.height/2 - rankbg.height/2;
            this._nodeContainer.addChild(rankbg);
            var titleTxt1 = ComponentManager.getTextField("", 20, tarColor);
            titleTxt1.text = String(index + 1);
            titleTxt1.x = 90 - titleTxt1.width / 2;
            titleTxt1.y = startY;
            this._nodeContainer.addChild(titleTxt1);
            this.height = 60;
        }
        else {
            this.height = 76;
            var rankbg = BaseBitmap.create("rankbgs_" + String(index + 1));
            rankbg.width = 516;
            rankbg.height = 76;
            rankbg.x = 27;
            rankbg.y = this.height / 2 - rankbg.height / 2;
            this._nodeContainer.addChild(rankbg);
            var rankImg = BaseBitmap.create("rankinglist_rankn" + String(index + 1));
            rankImg.x = 90 - rankImg.width / 2;
            rankImg.y = (rankbg.height - rankImg.height) * 0.5;
            this._nodeContainer.addChild(rankImg);
        }
        var titleTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        if (data.eflag && data.eflag == true) {
            titleTxt2.text = LanguageManager.getlocal("acRankList_allianceQuit", [data.name]);
            titleTxt2.x = 245 - titleTxt2.width / 2 + 30;
        }
        else {
            titleTxt2.text = data.name;
            titleTxt2.x = 245 - titleTxt2.width / 2;
        }
        if (index < 3) {
            startY = 30;
        }
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField("", titleTxt2.size, tarColor);
        if (data.value > 0) {
            titleTxt3.text = App.StringUtil.changeIntToText(data.value, 1);
        }
        else {
            titleTxt3.text = "" + data.value;
            // if(itemParam.isShowFloor&&data.value <= -2000)
            // {
            //     titleTxt3.text = data.value + LanguageManager.getlocal("acRank_FloorTip");
            // }
        }
        titleTxt3.x = 460 - titleTxt3.width / 2;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);
        var lineImg = BaseLoadBitmap.create("rank_line");
        lineImg.width = 500;
        lineImg.height = 2;
        lineImg.x = 30;
        lineImg.y = 60;
        this._nodeContainer.addChild(lineImg);
        if (index < 3) {
            lineImg.visible = false;
        }
        if (Api.switchVoApi.checkOpenAtkracegChangegpoint() && itemParam.type == 14 && data.value < -2000) {
            var askIcon = BaseBitmap.create("activity_rank_ask");
            askIcon.setPosition(titleTxt3.x + titleTxt3.width + 10, this.height / 2 - askIcon.height / 2);
            this._nodeContainer.addChild(askIcon);
            askIcon.addTouchTap(this.askClick, this);
        }
        var t = this;
        this.addTouchTap(function () {
            if (t._isShowAsk || t._isSkipClick) {
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, { ruid: data.uid, rzid: Api.mergeServerVoApi.getTrueZid(data.uid) });
        }, this);
    };
    AcRankListScrollItem.prototype.askClick = function () {
        this._isShowAsk = true;
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "itemUseConstPopupViewTitle",
            msg: LanguageManager.getlocal("allianceRankActiveMinus2000Tip"),
            callback: this.askCallback,
            handler: this,
            needCancel: false
        });
    };
    AcRankListScrollItem.prototype.askCallback = function () {
        this._isShowAsk = false;
    };
    AcRankListScrollItem.prototype.userShotCallback = function (event) {
        if (!event.data.ret) {
            return;
        }
        var data = event.data.data.data;
        if (String(data.ruid) == this._data.uid) {
            if (event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT) {
                data["crossZone"] = 1;
                data['zid'] = Api.mergeServerVoApi.getTrueZid();
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        }
    };
    AcRankListScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcRankListScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcRankListScrollItem.prototype.dispose = function () {
        this._isShowAsk = false;
        this._isSkipClick = false;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        _super.prototype.dispose.call(this);
    };
    return AcRankListScrollItem;
}(ScrollListItem));
__reflect(AcRankListScrollItem.prototype, "AcRankListScrollItem");
//# sourceMappingURL=AcRankListScrollItem.js.map