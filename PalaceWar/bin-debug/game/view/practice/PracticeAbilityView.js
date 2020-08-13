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
 * 修身资质UI
 * author yanyuling
 * date 2018/04/16
 * @class PracticeAbilityView
 */
var PracticeAbilityView = (function (_super) {
    __extends(PracticeAbilityView, _super);
    function PracticeAbilityView() {
        var _this = _super.call(this) || this;
        _this._attrType = 0;
        _this._refreshTxtList = [];
        return _this;
    }
    PracticeAbilityView.prototype.initView = function () {
        PlayerBottomUI.getInstance().visible = false;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK), this.refreshTxt, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK), this.refreshListAfterUnlock, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED, this.refreshAfrerIdx, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._attrType = this.param.data.type;
        var topbg = BaseBitmap.create("playerpromo_abitopbg");
        topbg.y = -15;
        topbg.height = 140;
        this._nodeContainer.addChild(topbg);
        var totalTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        totalTxt.text = LanguageManager.getlocal("servantInfo_title", ["100"]);
        totalTxt.x = topbg.x + topbg.width / 2;
        totalTxt.y = topbg.y + 15;
        this._nodeContainer.addChild(totalTxt);
        this._refreshTxtList.push(totalTxt);
        for (var index = 1; index <= 4; index++) {
            var abiTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            abiTxt.text = LanguageManager.getlocal("servantInfo_attrTxt" + index);
            abiTxt.x = 80;
            abiTxt.y = topbg.y + 60;
            if (index % 2 == 0) {
                abiTxt.x = GameConfig.stageWidth / 2 + 100;
            }
            if (index > 2) {
                abiTxt.y = topbg.y + 90;
            }
            this._nodeContainer.addChild(abiTxt);
            this._refreshTxtList.push(abiTxt);
        }
        // let btHeight =  PlayerBottomUI.getInstance().showHeight;
        var btHeight = 0;
        var bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = topbg.y + topbg.height;
        bottomBg.height = GameConfig.stageHeigth - bottomBg.y - this.container.y - btHeight + 10;
        this._nodeContainer.addChild(bottomBg);
        var innerBg = BaseBitmap.create("public_9_bg32");
        innerBg.width = GameConfig.stageWidth - 30;
        innerBg.height = bottomBg.height - 100;
        innerBg.x = 15;
        innerBg.y = bottomBg.y + 80;
        this._nodeContainer.addChild(innerBg);
        var tabName = ["servantInfo_speciality1", "servantInfo_speciality2", "servantInfo_speciality3", "servantInfo_speciality4"];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.setSpace(2);
        tabbarGroup.x = 25;
        tabbarGroup.y = bottomBg.y + 24;
        this._nodeContainer.addChild(tabbarGroup);
        this._tabbarGroup = tabbarGroup;
        var rect = new egret.Rectangle(0, 0, bottomBg.width, innerBg.height - 10);
        this._scrollList = ComponentManager.getScrollList(PracticeAbilityScrollItem, [], rect);
        this._scrollList.setPosition(20, innerBg.y + 5);
        this._nodeContainer.addChild(this._scrollList);
        this.tabBtnClickHandler({ index: this._attrType });
        tabbarGroup.selectedIndex = this._attrType;
        this.refreshTxt();
    };
    PracticeAbilityView.prototype.refreshTxt = function () {
        this.checkRedPoints();
        PlayerBottomUI.getInstance().checkRedPoints();
        var attrV = Api.practiceVoApi.geAbilityValues();
        var totalV = String(attrV[0] + attrV[1] + attrV[2] + attrV[3]);
        this._refreshTxtList[0].text = LanguageManager.getlocal("servantInfo_title", [totalV]);
        this._refreshTxtList[1].text = LanguageManager.getlocal("servantInfo_attrTxt1") + String(attrV[0]);
        this._refreshTxtList[2].text = LanguageManager.getlocal("servantInfo_attrTxt2") + String(attrV[1]);
        this._refreshTxtList[3].text = LanguageManager.getlocal("servantInfo_attrTxt3") + String(attrV[2]);
        this._refreshTxtList[4].text = LanguageManager.getlocal("servantInfo_attrTxt4") + String(attrV[3]);
        this._refreshTxtList[0].anchorOffsetX = this._refreshTxtList[0].width / 2;
    };
    PracticeAbilityView.prototype.refreshListAfterUnlock = function (event) {
        var _this = this;
        var rdata = event.data.data;
        if (rdata.ret != 0) {
            return;
        }
        egret.callLater(function () {
            _this.refreshAfrerIdx();
            _this.refreshTxt();
        }, this);
    };
    PracticeAbilityView.prototype.tabBtnClickHandler = function (params) {
        this._attrType = params.index;
        var list = Config.PracticeCfg.getPracticeShowListByType(this._attrType + 1);
        var list1 = [];
        var list2 = [];
        var list3 = [];
        var list4 = [];
        for (var index = 0; index < list.length; index++) {
            var cfg = list[index];
            if (Api.practiceVoApi.isTaskLvEnable(cfg.id)) {
                list1.push(cfg);
            }
            else {
                if (cfg.wifeId && Api.wifeVoApi.getWifeInfoVoById(cfg.wifeId)) {
                    if (Api.practiceVoApi.getPracticeTaskInfo(cfg.id).f == 2) {
                        list4.push(cfg);
                    }
                    else {
                        list2.push(cfg);
                    }
                }
                else if (cfg.servantId && Api.servantVoApi.getServantObj(cfg.servantId)) {
                    if (Api.practiceVoApi.getPracticeTaskInfo(cfg.id).f == 2) {
                        list4.push(cfg);
                    }
                    else {
                        list2.push(cfg);
                    }
                }
                else {
                    list3.push(cfg);
                }
            }
        }
        list2.sort(function (dataA, dataB) {
            var aVo = Api.practiceVoApi.getPracticeTaskInfo(dataA.id);
            var bVo = Api.practiceVoApi.getPracticeTaskInfo(dataB.id);
            var aSinfo = Api.practiceVoApi.getPracticeTaskAccumulation(aVo);
            var bSinfo = Api.practiceVoApi.getPracticeTaskAccumulation(bVo);
            var aConV = aSinfo.conditionV / aSinfo.conditionNeed;
            var bConV = bSinfo.conditionV / bSinfo.conditionNeed;
            return bConV - aConV;
        });
        this.refreshList(list1.concat(list2).concat(list3).concat(list4));
        // this.refreshList.setScrollTopByIndex(0,false);
        this._scrollList.setScrollTopByIndex(0, 0);
    };
    PracticeAbilityView.prototype.refreshAfrerIdx = function () {
        this.checkRedPoints();
        this.tabBtnClickHandler({ index: this._attrType });
        PlayerBottomUI.getInstance().checkRedPoints();
    };
    PracticeAbilityView.prototype.refreshList = function (data) {
        this._scrollList.refreshData(data);
    };
    PracticeAbilityView.prototype.checkRedPoints = function () {
        var idxList = Api.practiceVoApi.practiceAttrRedList();
        // for (let key in idxList) {
        for (var index = 0; index < 4; index++) {
            var visible = false;
            if (idxList[String(index + 1)]) {
                visible = true;
            }
            if (visible) {
                this._tabbarGroup.addRedPoint(index);
            }
            else {
                this._tabbarGroup.removeRedPoint(index);
            }
        }
    };
    PracticeAbilityView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "playerpromo_abitopbg",
            "servant_bottombg",
            "progress5", "progress3_bg",
            "practice_comp_flag",
        ]);
    };
    PracticeAbilityView.prototype.closeHandler = function () {
        this.hide();
        PlayerBottomUI.getInstance().visible = true;
    };
    PracticeAbilityView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK), this.refreshTxt, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK), this.refreshListAfterUnlock, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED, this.refreshAfrerIdx, this);
        this._nodeContainer = null;
        this._scrollList = null;
        this._attrType = 0;
        this._refreshTxtList = [];
        this._tabbarGroup = null;
        _super.prototype.dispose.call(this);
    };
    return PracticeAbilityView;
}(CommonView));
__reflect(PracticeAbilityView.prototype, "PracticeAbilityView");
//# sourceMappingURL=PracticeAbilityView.js.map