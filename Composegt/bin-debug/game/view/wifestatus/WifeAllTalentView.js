/**
 * 任务
 * author yanyuling
 * date 2017/10/28
 * @class WifeAllTalentView
 */
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
var WifeAllTalentView = (function (_super) {
    __extends(WifeAllTalentView, _super);
    function WifeAllTalentView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._allTalentTxt = null;
        _this._descTxt = null;
        _this._acTxt = null;
        _this._barWifeTxt = null;
        _this._barStatusTxt = null;
        _this._caiyiTxt = null;
        _this._caiqingTxt = null;
        _this._orderImg = null;
        _this._opTxt = null;
        _this._title = null;
        _this._isOrderDown = true;
        _this._acVo = null;
        _this._isHaveBuff = null;
        return _this;
    }
    WifeAllTalentView.prototype.tick = function () {
        if (!this._acVo) {
            this._acVo = this.getAcVo();
        }
        if (!this._acVo) {
            return;
        }
        var t = this._acVo.et - GameData.serverTime - 86400 * 1;
        var isHaveBuff = false;
        if (t > 0) {
            isHaveBuff = true;
        }
        else {
            isHaveBuff = false;
        }
        if (this._isHaveBuff != null && isHaveBuff != this._isHaveBuff) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeTalentUpPopupViewAcOver"));
            NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL, {});
            // this.hide();
        }
        this._isHaveBuff = isHaveBuff;
    };
    // private tick(){
    //     if(!this._acVo){
    //         this._acVo = this.getAcVo();
    //     }
    //     let t = this._acVo.et - GameData.serverTime  - 86400 * 1;
    //     if(t<0){
    //          App.CommonUtil.showTip(LanguageManager.getlocal("wifeTalentUpPopupViewAcOver"));
    //          this.hide();
    //     } 
    // }
    WifeAllTalentView.prototype.checkHaveBuff = function () {
        // let modelList:AcBaseVo[] = Api.acVoApi.getActivityVoListByAid("wifeBattleRank");
        // return modelList && modelList.length >0;
        var modelList = Api.acVoApi.getActivityVoListByAid("wifeBattleRank");
        if (modelList.length > 0) {
            var t = modelList[0].et - GameData.serverTime - 86400 * 1;
            if (t > 0) {
                return true;
            }
        }
        else {
            return false;
        }
    };
    WifeAllTalentView.prototype.getAcVo = function () {
        var modelList = Api.acVoApi.getActivityVoListByAid("wifeBattleRank");
        if (modelList && modelList.length > 0) {
            return modelList[0];
        }
        else {
            return null;
        }
    };
    WifeAllTalentView.prototype.getCfg = function () {
        var vo = this.getAcVo();
        var aid = vo.aid;
        var code = vo.code;
        return Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
    };
    WifeAllTalentView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL, this.hide, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFEBATTLE_REFRESH, this.refreshList, this);
        var isHaveBuff = false;
        var h = 80;
        if (this.checkHaveBuff()) {
            isHaveBuff = true;
            h = 168;
        }
        var topBg = BaseBitmap.create("public_tc_bg03");
        topBg.width = 615;
        topBg.height = h;
        topBg.x = 640 / 2 - topBg.width / 2;
        topBg.y = 75;
        this.addChild(topBg);
        var topInBg = BaseBitmap.create("public_tc_bg01");
        topInBg.width = topBg.width - 25;
        topInBg.height = topBg.height - 25;
        topInBg.x = 640 / 2 - topInBg.width / 2;
        topInBg.y = topBg.y + topBg.height / 2 - topInBg.height / 2;
        this.addChild(topInBg);
        var model = Api.wifebattleVoApi.wifebattleVo;
        var plusv = model.info.totaltactadd ? model.info.totaltactadd : 0;
        var allTalentStr = null;
        if (plusv == 0) {
            allTalentStr = LanguageManager.getlocal("wifeBattleAllTalentTxt1", [App.StringUtil.changeIntToText(model.info.totaltalent)]);
        }
        else {
            allTalentStr = LanguageManager.getlocal("wifeBattleAllTalentTxt2", [App.StringUtil.changeIntToText(model.info.totaltalent), App.StringUtil.changeIntToText(plusv)]);
        }
        this._allTalentTxt = ComponentManager.getTextField(allTalentStr, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._allTalentTxt.x = topInBg.x + 10;
        this._allTalentTxt.y = topInBg.y + 20;
        this.addChild(this._allTalentTxt);
        if (isHaveBuff) {
            var wifeBattleBuff = this.getCfg().wifeBattleBuff;
            var curlv = 1;
            var nextAdd = 0;
            var artsum = model.info.artsum ? model.info.artsum : 0;
            for (var index = 0; index < wifeBattleBuff.length; index++) {
                var element = wifeBattleBuff[index];
                var artistryRange = element.artistryRange;
                if (artistryRange[0] <= artsum && artsum <= artistryRange[1]) {
                    nextAdd = element.rankBuff;
                    break;
                }
                ++curlv;
            }
            // if(wifeBattleBuff[curlv]){
            // 	nextAdd = wifeBattleBuff[curlv].rankBuff;
            // }
            this._descTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllTalentDesc", ["" + nextAdd]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._descTxt.width = 550;
            this._descTxt.x = topInBg.x + 10;
            this._descTxt.y = this._allTalentTxt.y + this._allTalentTxt.height + 10;
            this.addChild(this._descTxt);
            var acTime = this.getAcVo().getAcLocalTime();
            this._acTxt = ComponentManager.getTextField(acTime, 20, 0x65e74b);
            this._acTxt.width = 550;
            this._acTxt.x = this._descTxt.x;
            this._acTxt.y = this._descTxt.y + this._descTxt.height + 10;
            this.addChild(this._acTxt);
        }
        var bottomBg = BaseBitmap.create("public_tc_bg03");
        bottomBg.width = 615;
        bottomBg.height = GameConfig.stageHeigth - topBg.height - topBg.y - 10 - 14;
        bottomBg.x = 320 - bottomBg.width / 2;
        bottomBg.y = topBg.y + topBg.height + 5;
        this.addChild(bottomBg);
        //边框
        var borderBg = BaseBitmap.create("public_9v_bg03");
        borderBg.width = GameConfig.stageWidth;
        borderBg.height = GameConfig.stageHeigth - 69;
        borderBg.x = 0;
        borderBg.y = 69;
        this.addChild(borderBg);
        var title = BaseBitmap.create("rank_biao");
        title.width = bottomBg.width - 20;
        title.x = bottomBg.x + bottomBg.width / 2 - title.width / 2;
        title.y = bottomBg.y + 15;
        this._title = title;
        this.addChild(title);
        // 		private _barWifeTxt:BaseTextField = null;
        // private _barStatusTxt:BaseTextField = null;
        // private _caiyiTxt:BaseTextField = null;
        // private _caiqingTxt:BaseTextField = null;
        // private _orderImg:BaseBitmap = null;
        // private _opTxt:BaseTextField = null;
        this._barWifeTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarWife"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._barWifeTxt.x = 80 - this._barWifeTxt.height / 2;
        this._barWifeTxt.y = title.y + title.height / 2 - this._barWifeTxt.height / 2;
        this.addChild(this._barWifeTxt);
        this._barStatusTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarStatus"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._barStatusTxt.x = 198 - 19 - this._barStatusTxt.height / 2;
        this._barStatusTxt.y = title.y + title.height / 2 - this._barStatusTxt.height / 2;
        this.addChild(this._barStatusTxt);
        this._caiyiTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarCaiyi"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._caiyiTxt.x = 280 - 23 - this._caiyiTxt.height / 2;
        this._caiyiTxt.y = title.y + title.height / 2 - this._caiyiTxt.height / 2;
        this.addChild(this._caiyiTxt);
        this._caiqingTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarCaiqing"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._caiqingTxt.x = 380 - 16 - this._caiqingTxt.height / 2;
        this._caiqingTxt.y = title.y + title.height / 2 - this._caiqingTxt.height / 2;
        this.addChild(this._caiqingTxt);
        this._opTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarOp"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._opTxt.x = 530 - this._opTxt.height / 2;
        this._opTxt.y = title.y + title.height / 2 - this._opTxt.height / 2;
        this.addChild(this._opTxt);
        this._orderImg = ComponentManager.getButton("wifebattleview_updown", null, this.orderHandler, this, null, 3);
        this._orderImg.scaleY = -1;
        this._orderImg.x = this._caiqingTxt.x + this._caiqingTxt.width - 50;
        this._orderImg.y = title.y + title.height / 2 - this._orderImg.height * this._orderImg.scaleY / 2;
        // this._orderImg.y = title.y + title.height/2 - this._orderImg.height/2;
        this.addChild(this._orderImg);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomBg.height - 15 - 15 - title.height - 10);
        // let list = Api.dailytaskVoApi.getTaskIdListAfterSort();
        var list = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr;
        list = list ? list : [];
        list.sort(function (a, b) {
            return b.talentadd - a.talentadd;
        });
        this._scrollList = ComponentManager.getScrollList(WifeAllTalentScrollItem, list, rect);
        this._scrollList.x = 320 - this._scrollList.width / 2;
        this._scrollList.y = title.y + title.height + 10;
        this.addChild(this._scrollList);
    };
    WifeAllTalentView.prototype.orderHandler = function () {
        this._isOrderDown = !this._isOrderDown;
        if (this._isOrderDown) {
            this._orderImg.scaleY = -1;
        }
        else {
            this._orderImg.scaleY = 1;
        }
        this._orderImg.y = this._title.y + this._title.height / 2 - this._orderImg.height * this._orderImg.scaleY / 2;
        this.refreshList();
    };
    WifeAllTalentView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifebattleview_updown",
            "rank_biao",
            "wifestatus_headbg",
            "wifestatus_namebg"
        ]);
    };
    WifeAllTalentView.prototype.refreshList = function () {
        var model = Api.wifebattleVoApi.wifebattleVo;
        var plusv = model.info.totaltactadd ? model.info.totaltactadd : 0;
        var allTalentStr = null;
        if (plusv == 0) {
            allTalentStr = LanguageManager.getlocal("wifeBattleAllTalentTxt1", [String(model.info.totaltalent)]);
        }
        else {
            allTalentStr = LanguageManager.getlocal("wifeBattleAllTalentTxt2", [String(model.info.totaltalent), String(plusv)]);
        }
        this._allTalentTxt.text = allTalentStr;
        var list = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr;
        list = list ? list : [];
        if (this._isOrderDown) {
            list.sort(function (a, b) {
                return b.talentadd - a.talentadd;
            });
            this._scrollList.refreshData(list);
        }
        else {
            list.sort(function (a, b) {
                return a.talentadd - b.talentadd;
            });
            this._scrollList.refreshData(list);
        }
    };
    WifeAllTalentView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL, this.hide, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFEBATTLE_REFRESH, this.refreshList, this);
        this._scrollList = null;
        this._allTalentTxt = null;
        this._descTxt = null;
        this._acTxt = null;
        this._barWifeTxt = null;
        this._barStatusTxt = null;
        this._caiyiTxt = null;
        this._caiqingTxt = null;
        this._orderImg = null;
        this._opTxt = null;
        this._title = null;
        this._isOrderDown = true;
        this._acVo = null;
        this._isHaveBuff = null;
        _super.prototype.dispose.call(this);
    };
    return WifeAllTalentView;
}(CommonView));
__reflect(WifeAllTalentView.prototype, "WifeAllTalentView");
