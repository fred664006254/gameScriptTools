var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 排行列表节点
 * author yanyuling
 * date 2017/10/25
 * @class RankScrollItem
 */
var AcCrossServerHegemonyFlagScrollList3 = /** @class */ (function (_super) {
    __extends(AcCrossServerHegemonyFlagScrollList3, _super);
    function AcCrossServerHegemonyFlagScrollList3() {
        var _this = _super.call(this) || this;
        _this._rowIdx = 0;
        _this._uiData = undefined;
        _this._aid = "";
        _this._code = "";
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonyFlagScrollList3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagScrollList3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyFlagScrollList3.prototype.initItem = function (index, data, itemParam) {
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICR_REFRESH_RANKITEM,this.refreshSelectStatus,this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        this._rowIdx = index;
        this._uiData = data;
        this.width = 620;
        // this.height = 124;
        this.addTouch(this.eventHandler, this, null, true);
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data.uid) {
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                tarColor = TextFieldConst.COLOR_WARN_GREEN4;
            }
        }
        else {
            if (data.aid == Api.playerVoApi.getPlayerAllianceId()) {
                tarColor = TextFieldConst.COLOR_WARN_GREEN4;
            }
        }
        if (this._rowIdx < 3) {
            var guang = BaseBitmap.create("accshegemony_ranklistbg" + String(this._rowIdx + 1));
            guang.width = this.width;
            guang.height = 120;
            guang.x = this.width / 2 - guang.width / 2;
            // guang.y = this.height/2 - guang.height/2 - 2;
            this.addChild(guang);
            var rankImg = BaseBitmap.create("accshegemonyprank" + String(this._rowIdx + 1));
            rankImg.setScale(0.8);
            rankImg.x = 70 - rankImg.width / 2 * rankImg.scaleX - 20;
            rankImg.y = 10; //this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }
        else {
            var guang = BaseBitmap.create("accshegemony_ranklistbg");
            guang.width = this.width;
            guang.height = 120;
            guang.x = this.width / 2 - guang.width / 2;
            // guang.y = this.height/2 - guang.height/2 - 2;
            this.addChild(guang);
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
            rankTxt.text = String(this._rowIdx + 1);
            rankTxt.x = 70 - rankTxt.width / 2 - 20;
            rankTxt.y = 23;
            this.addChild(rankTxt);
        }
        // if(index != 0){
        //     let bg = BaseBitmap.create("public_line1");
        //     bg.width = 570;//this.width-20;
        //     bg.x = this.width /2 - bg.width/2;
        //     bg.y = -bg.height/2;
        //     this.addChild(bg);
        // }
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        nameTxt.text = this._uiData.name;
        nameTxt.x = 90;
        nameTxt.y = 20;
        this.addChild(nameTxt);
        var creatorName = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        creatorName.text = LanguageManager.getlocal("acCrossServerHegemonyFlagCreatorName", [this._uiData.creatorname]);
        creatorName.x = 30;
        creatorName.y = 57;
        this.addChild(creatorName);
        var mn = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        mn.text = LanguageManager.getlocal("acCrossServerHegemonyFlagMn", [String(this._uiData.mn), String(this._uiData.maxmn)]);
        mn.x = 220;
        mn.y = 57; //qu.y;
        this.addChild(mn);
        var score = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        score.text = "" + (Number(this._uiData.score) * this.cfg.flagScoreNum);
        score.x = 428 - score.width / 2 + 7;
        score.y = 57;
        this.addChild(score);
        var pscore = this.vo.getFlagNumByAid(this._uiData.aid);
        var plusScore = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        plusScore.text = "" + (pscore * this.cfg.flagScoreNum);
        plusScore.x = 530 - plusScore.width / 2 + 10;
        plusScore.y = 57;
        this.addChild(plusScore);
        var qu = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        // console.log("qu-->",this._uiData.zid,this._uiData)
        // console.log("quStr->",Api.mergeServerVoApi.getAfterMergeSeverName(null,true,Number(this._uiData.zid)));
        qu.text = LanguageManager.getlocal("acCrossServerHegemonyFlagQu", [Api.mergeServerVoApi.getAfterMergeSeverName(null, true, Number(this._uiData.zid))]); //String(this._uiData.score);
        qu.x = creatorName.x;
        qu.y = creatorName.y + creatorName.height + 5;
        this.addChild(qu);
        var power = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        power.text = LanguageManager.getlocal("acCrossServerHegemonyFlagPower", [App.StringUtil.changeIntToText(Number(this._uiData.allpower))]);
        power.x = 220;
        power.y = qu.y;
        this.addChild(power);
        // if ( this._uiData.vip != "0")
        // {
        //     let vipFlag = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(this._uiData.vip).icon);
        //     vipFlag.setScale(0.65);
        //     vipFlag.x =   nameTxt.x + nameTxt.width  ;
        //     vipFlag.y = nameTxt.y ;
        //     this.addChild(vipFlag);
        // }
        // let lineImg = BaseBitmap.create("rank_line");
        // lineImg.x = GameConfig.stageWidth /2 - lineImg.width/2;
        // lineImg.y = this.height;
        // this.addChild(lineImg);
        // let maskImg = BaseBitmap.create("rank_select_mask")
        var maskImg = BaseBitmap.create("public_9_bg29");
        // maskImg.height = 42;
        maskImg.height = 120;
        maskImg.width = this.width + 4;
        maskImg.x = this.width / 2 - maskImg.width / 2;
        maskImg.y = 0;
        maskImg.visible = false;
        this._maskImg = maskImg;
        this.addChild(maskImg);
        this.cacheAsBitmap = true;
    };
    AcCrossServerHegemonyFlagScrollList3.prototype.eventHandler = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._maskImg.visible = true;
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this._maskImg.visible = false;
                break;
            case egret.TouchEvent.TOUCH_END:
                this._maskImg.visible = false;
                // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICR_REFRESH_RANKITEM,this._rowIdx);
                // // NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._uiData.uid});
                // if(this._uiData.zid){
                //     NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT,{ruid:this._uiData.uid,rzid:this._uiData.zid});
                // }else{
                //     NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._uiData.uid});
                // }
                if (!this.vo.isInActivity()) {
                    this.vo.showAcEndTip();
                    return;
                }
                if (this.vo.isShowTime()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyIsShowTimeNoFlag"));
                    return;
                }
                var itemId = this.vo.getToolItemId();
                var num = this.vo.getSpecailToolNum();
                if (num <= 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyNoFlag"));
                    return;
                }
                var canAddFlag = this.vo.checkCanAddFlagNum(this._uiData.aid);
                // let addFlagNum = this.vo.getAddFlagNum();
                if (!canAddFlag) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyAddFlagTooMuch"));
                    return;
                }
                var status_1 = this.vo.getCurStatus();
                if (status_1 >= 11) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyAddFlagTooLast"));
                    return;
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYUSEFLAGPOPUPVIEW, { aid: this._aid, code: this._code, itemId: itemId, allid: this._uiData.aid, aname: this._uiData.name });
                break;
        }
    };
    AcCrossServerHegemonyFlagScrollList3.prototype.refreshSelectStatus = function (event) {
        var idx = event.data;
        if (this._rowIdx != idx) {
            this._maskImg.visible = false;
        }
    };
    // protected userShotCallback(event:egret.Event)
    // {
    //     let rdata = event.data.data;
    //     let ret = rdata.ret;
    //     if(rdata.ret != 0){
    //         App.CommonUtil.showTip("requestLoadErrorTip");
    //         return;
    //     }
    //     if(String(rdata.data.ruid) == this._uiData.uid)
    //     {
    //         if(event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT)
    //         {
    //             // rdata.data["crossZone"] = 1;
    //             rdata.data['zid'] = this._uiData.zid;
    //         }
    //         ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW,rdata.data);
    //     }
    // }
    AcCrossServerHegemonyFlagScrollList3.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    AcCrossServerHegemonyFlagScrollList3.prototype.getSpaceY = function () {
        return 5;
    };
    AcCrossServerHegemonyFlagScrollList3.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICR_REFRESH_RANKITEM,this.refreshSelectStatus,this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        this._maskImg = null;
        this._rowIdx = null;
        this._uiData = null;
        this.cacheAsBitmap = false;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyFlagScrollList3;
}(ScrollListItem));
//# sourceMappingURL=AcCrossServerHegemonyFlagScrollList3.js.map