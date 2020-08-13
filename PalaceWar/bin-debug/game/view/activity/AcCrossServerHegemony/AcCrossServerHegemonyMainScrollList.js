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
 * author jiangliuyang
 * date 2020/1/8
 * @class AcCrossServerHegemonyMainScrollList
 */
var AcCrossServerHegemonyMainScrollList = (function (_super) {
    __extends(AcCrossServerHegemonyMainScrollList, _super);
    function AcCrossServerHegemonyMainScrollList() {
        var _this = _super.call(this) || this;
        // private _nodeContainer:BaseDisplayObjectContainer;
        // private _maskImg:BaseBitmap;
        _this._rowIdx = 0;
        _this._uiData = undefined;
        _this._aid = "";
        _this._code = "";
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonyMainScrollList.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyMainScrollList.prototype.initItem = function (index, data, param) {
        // console.log(index,data,param);
        this._rowIdx = index;
        this._uiData = data;
        this._aid = param.aid;
        this._code = param.code;
        this.width = 620;
        var tarColor = TextFieldConst.COLOR_BROWN;
        this.addTouch(this.eventHandler, this, null, true);
        if (String(this._uiData.aid) == String(Api.playerVoApi.getPlayerAllianceId())) {
            tarColor = TextFieldConst.COLOR_WARN_GREEN4;
        }
        // if(index > 0 && String(this._uiData.endflag) == "1"){
        //     tarColor = TextFieldConst.COLOR_BROWN;
        // }
        if (this._rowIdx < 3) {
            this.height = 80;
            // let guang = BaseBitmap.create("rank_guang"+String(this._rowIdx+1));
            var guang = BaseBitmap.create("accshegemony_ranklistbg" + (this._rowIdx + 1));
            guang.width = this.width;
            guang.height = this.height;
            this.addChild(guang);
            var rankImg = BaseBitmap.create("accshegemonyprank" + String(this._rowIdx + 1));
            rankImg.x = 50 - rankImg.width / 2 + 10;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            this.height = 66;
            var guang = BaseBitmap.create("accshegemony_ranklistbg");
            guang.width = this.width;
            guang.height = this.height;
            this.addChild(guang);
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
            rankTxt.text = String(this._rowIdx + 1);
            rankTxt.x = 50 - rankTxt.width / 2 + 10;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        // if(index != 0){
        //     let bg = BaseBitmap.create("public_line4");
        //     bg.width = this.width-20;
        //     bg.x = this.width /2 - bg.width/2;
        //     bg.y = -bg.height/2;
        //     this.addChild(bg);
        // }
        var nameTxt = ComponentManager.getTextField(this._uiData.name, 20, tarColor);
        nameTxt.x = 50 + 113 + 25 - nameTxt.width / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        this.addChild(nameTxt);
        var quStr = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, Number(this._uiData.zid));
        var quTxt = ComponentManager.getTextField(quStr, 20, tarColor);
        quTxt.x = 50 + 113 + 131 + 25 - quTxt.width / 2;
        quTxt.y = this.height / 2 - quTxt.height / 2;
        this.addChild(quTxt);
        var winNumTxt = ComponentManager.getTextField(this._uiData.win, 20, tarColor);
        winNumTxt.x = 50 + 113 + 131 + 100 + 35 - winNumTxt.width / 2;
        winNumTxt.y = this.height / 2 - winNumTxt.height / 2;
        this.addChild(winNumTxt);
        var powerUpTxt = ComponentManager.getTextField(String(this._uiData.allpoweradd), 20, tarColor);
        powerUpTxt.x = 50 + 113 + 131 + 100 + 110 + 35 - powerUpTxt.width / 2;
        powerUpTxt.y = this.height / 2 - powerUpTxt.height / 2;
        this.addChild(powerUpTxt);
    };
    AcCrossServerHegemonyMainScrollList.prototype.eventHandler = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                // this._maskImg.visible = true;
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                // this._maskImg.visible = false;
                break;
            case egret.TouchEvent.TOUCH_END:
                // if(this._uiData.endflag == "1"){
                //     App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyBattleMatchNameLose"));
                //     return;
                // }
                if (!this.vo.isInActivity()) {
                    this.vo.showAcEndTip();
                    return;
                }
                if (!this.vo.isOpenActivity()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyRoundTip0"));
                    return;
                }
                // this._maskImg.visible = false;
                Api.crossServerHegemonyVoApi.setMainSelectData(this._uiData);
                Api.crossServerHegemonyVoApi.setMainSearchDetail(true);
                // console.log(this._uiData);
                NetManager.request(NetRequestConst.REQUEST_ACHEGEMONY_GETACHEALLIANCEINFO, { allianceid: Number(this._uiData.aid), activeId: this.vo.aidAndCode });
                break;
        }
    };
    AcCrossServerHegemonyMainScrollList.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcCrossServerHegemonyMainScrollList.prototype.getSpaceY = function () {
        return 5;
    };
    AcCrossServerHegemonyMainScrollList.prototype.dispose = function () {
        // this._nodeContainer = null;
        // this._maskImg = null;
        this._rowIdx = 0;
        this._uiData = undefined;
        this._aid = "";
        this._code = "";
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyMainScrollList;
}(ScrollListItem));
__reflect(AcCrossServerHegemonyMainScrollList.prototype, "AcCrossServerHegemonyMainScrollList");
//# sourceMappingURL=AcCrossServerHegemonyMainScrollList.js.map