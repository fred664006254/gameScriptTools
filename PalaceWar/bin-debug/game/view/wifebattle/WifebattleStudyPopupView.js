/**
 * 永乐大典
 * author jiangliuyang
 * @class StudyatkBookPopupView
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
var WifebattleStudyPopupView = (function (_super) {
    __extends(WifebattleStudyPopupView, _super);
    function WifebattleStudyPopupView() {
        return _super.call(this) || this;
    }
    WifebattleStudyPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            'wifebattleyonglelistbg', "wifebattleyongletitlebg", "wifebattleyonglestudybtn", "countrywarrewardview_itembg",
        ]);
    };
    WifebattleStudyPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFEBATTLE_YONGLEUP), this.upgradeCallback, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var txtBg = BaseBitmap.create("countrywarrewardview_itembg");
        txtBg.x = this.viewBg.width / 2 - txtBg.width / 2;
        txtBg.y = 15;
        this._nodeContainer.addChild(txtBg);
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.costItem);
        this._tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleStudy_score", [itemNum.toString()]), 20, TextFieldConst.COLOR_WHITE);
        this._tipTxt1.setPosition(txtBg.x + 60, txtBg.y + (txtBg.height - this._tipTxt1.height) / 2);
        this._nodeContainer.addChild(this._tipTxt1);
        this._tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleStudy_unlock", [Api.wifestatusVoApi.getStatusWifeNum().toString()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._tipTxt.setPosition(txtBg.x + txtBg.width - this._tipTxt.width - 60, txtBg.y + (txtBg.height - this._tipTxt1.height) / 2);
        this._nodeContainer.addChild(this._tipTxt);
        var bottomBg = BaseBitmap.create("public_9_bg4");
        bottomBg.width = 542 - 20;
        bottomBg.height = 720;
        bottomBg.name = "bottomBg";
        // bottomBg.height = 240;
        bottomBg.x = this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = txtBg.y + txtBg.height + 10;
        this._nodeContainer.addChild(bottomBg);
        // let dataList =  Config.StudyatkCfg.getStudyatkList();
        var dataList = Config.WifebattleCfg.getWifeStudyCfgList();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 532 - 20, bottomBg.height - 10);
        var scrollList = ComponentManager.getScrollList(WifebattleStudyScrollItem, dataList, rect);
        scrollList.x = bottomBg.x + 5;
        scrollList.y = bottomBg.y + 3;
        this._scrollList = scrollList;
        this._nodeContainer.addChild(scrollList);
        this.scrollPos();
        this.upgradeCallback(null);
    };
    WifebattleStudyPopupView.prototype.scrollPos = function () {
        // let idx  = Api.studyatkVoApi.getStudySkillInfoLv() ;
        var idx = Api.wifebattleVoApi.wifebattleVo.info.ylinfo ? Api.wifebattleVoApi.wifebattleVo.info.ylinfo.lv : 0;
        this._scrollList.setScrollTopByIndex(idx);
    };
    WifebattleStudyPopupView.prototype.upgradeCallback = function (event) {
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.costItem);
        this._tipTxt1.text = LanguageManager.getlocal("wifeBattleStudy_score", [String(itemNum)]);
        var exp = Api.wifebattleVoApi.wifebattleVo.info.ylinfo ? Api.wifebattleVoApi.wifebattleVo.info.ylinfo.upexp : 0;
        //this._tipTxt1.text = LanguageManager.getlocal("wifeBattleStudy_tipTxt1",[String(exp)]);
        // this._tipTxt1.x = this.viewBg.width/2 - 40 - this._tipTxt1.width;
        // this._tipTxt.x = this.viewBg.width/2 + 40;
        if (event) {
            var rData = event.data.data;
            if (rData.ret == 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal('wifeBattleStudy_successTip', ["" + (Number(WifebattleStudyPopupView.lastUpgradeId) + 1)]));
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal('wifeBattleStudy_failedTip', ["" + (Number(WifebattleStudyPopupView.lastUpgradeId) + 1)]));
            }
        }
    };
    WifebattleStudyPopupView.prototype.getShowHeight = function () {
        return 851.5 + 8;
    };
    WifebattleStudyPopupView.prototype.getShowWidth = function () {
        return 580;
    };
    // protected getBgExtraHeight():number
    // {
    // 	return -130;
    // }
    // protected getBgExtraHeight():number
    // {
    // 	return 70;
    // }
    WifebattleStudyPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    WifebattleStudyPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFEBATTLE_YONGLEUP), this.upgradeCallback, this);
        this._nodeContainer = null;
        this._scrollList = null;
        this._tipTxt = null;
        this._tipTxt1 = null;
        WifebattleStudyPopupView.lastUpgradeId = null;
        _super.prototype.dispose.call(this);
    };
    WifebattleStudyPopupView.lastUpgradeId = "0";
    return WifebattleStudyPopupView;
}(PopupView));
__reflect(WifebattleStudyPopupView.prototype, "WifebattleStudyPopupView");
//# sourceMappingURL=WifebattleStudyPopupView.js.map