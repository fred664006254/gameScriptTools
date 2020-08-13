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
    WifebattleStudyPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFEBATTLE_YONGLEUP), this.upgradeCallback, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var txtBg = BaseBitmap.create("public_tc_bg02");
        txtBg.x = this.viewBg.width / 2 - txtBg.width / 2;
        txtBg.y = 15;
        this._nodeContainer.addChild(txtBg);
        var exp = Api.wifebattleVoApi.wifebattleVo.info.ylinfo ? Api.wifebattleVoApi.wifebattleVo.info.ylinfo.upexp : 0;
        this._tipTxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._tipTxt1.text = LanguageManager.getlocal("wifeBattleStudy_tipTxt1", [String(exp)]);
        this._tipTxt1.x = this.viewBg.width / 2 - 40 - this._tipTxt1.width;
        this._tipTxt1.y = txtBg.y + txtBg.height / 2 - this._tipTxt1.height / 2 + 2;
        this._nodeContainer.addChild(this._tipTxt1);
        this._tipTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.itemCostID);
        this._tipTxt.text = LanguageManager.getlocal("wifeBattleStudy_tipTxt", [String(itemNum)]);
        this._tipTxt.x = this.viewBg.width / 2 + 40; //this.viewBg.width/2 - this._tipTxt.width/2;
        this._tipTxt.y = txtBg.y + txtBg.height / 2 - this._tipTxt.height / 2 + 2;
        this._nodeContainer.addChild(this._tipTxt);
        var bottomBg = BaseBitmap.create("public_tc_bg01");
        bottomBg.width = 540;
        bottomBg.height = 610 + 27;
        bottomBg.name = "bottomBg";
        // bottomBg.height = 240;
        bottomBg.x = this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = this._tipTxt.y + this._tipTxt.height + 30;
        this._nodeContainer.addChild(bottomBg);
        // let dataList =  Config.StudyatkCfg.getStudyatkList();
        var dataList = Config.WifebattleCfg.getWifeStudyCfgList();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 530, 600 + 10);
        var scrollList = ComponentManager.getScrollList(WifebattleStudyScrollItem, dataList, rect);
        scrollList.x = bottomBg.x + 5;
        scrollList.y = bottomBg.y + 5 + 7;
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
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.itemCostID);
        this._tipTxt.text = LanguageManager.getlocal("wifeBattleStudy_tipTxt", [String(itemNum)]);
        var exp = Api.wifebattleVoApi.wifebattleVo.info.ylinfo ? Api.wifebattleVoApi.wifebattleVo.info.ylinfo.upexp : 0;
        this._tipTxt1.text = LanguageManager.getlocal("wifeBattleStudy_tipTxt1", [String(exp)]);
        this._tipTxt1.x = this.viewBg.width / 2 - 40 - this._tipTxt1.width;
        this._tipTxt.x = this.viewBg.width / 2 + 40;
        if (event) {
            var rData = event.data.data;
            if (rData.ret == 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal('wifeBattleStudy_successTip', [WifebattleStudyPopupView.lastUpgradeId]));
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal('wifeBattleStudy_failedTip', [WifebattleStudyPopupView.lastUpgradeId]));
            }
        }
    };
    WifebattleStudyPopupView.prototype.getShowHeight = function () {
        return 851.5;
    };
    // protected getBgExtraHeight():number
    // {
    // 	return -130;
    // }
    // protected getBgExtraHeight():number
    // {
    // 	return 70;
    // }
    WifebattleStudyPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_unlock",
        ]);
    };
    WifebattleStudyPopupView.prototype.hide = function () {
        AcCrossServerWifeBattleView.isOpenWin = false;
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
