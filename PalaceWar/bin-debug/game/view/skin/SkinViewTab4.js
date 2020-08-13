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
 * 碎片兑换
 * author qianjun
 * date 2018/08/13
 * @class SkinView
 */
var SkinViewTab4 = (function (_super) {
    __extends(SkinViewTab4, _super);
    function SkinViewTab4() {
        var _this = _super.call(this) || this;
        _this._curMyTabIdx = -1;
        _this.initView();
        return _this;
    }
    SkinViewTab4.prototype.initView = function () {
        if (Api.rookieVoApi.curGuideKey == "skin") {
            this._curMyTabIdx = 1;
        }
        // ViewController.getInstance().openView(ViewConst.COMMON.SKINLEVELUPVIEW,{skinId:"1011"});
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SKIN_MAKE), view.makeCallback, view);
        var skinView = ViewController.getInstance().getView("SkinView");
        view.width = GameConfig.stageWidth;
        view.height = skinView.getTabViewHeight();
        //我的皮肤列表部分
        view._myNodeContainer = new BaseDisplayObjectContainer();
        view.addChild(this._myNodeContainer);
        var tabList = [];
        if (Api.switchVoApi.checkOpenServantSkin()) {
            tabList.push("skinViewMyTab1");
        }
        if (!Api.switchVoApi.checkCloseWifeskin()) {
            tabList.push("skinViewMyTab2");
        }
        var tabbarGroup = ComponentManager.getTabBarGroup("skin_mytab1", tabList, this.tabBtnClickHandler2, this);
        tabbarGroup.x = GameConfig.stageWidth / 2 - tabbarGroup.width / 2;
        tabbarGroup.y = 10;
        this._myNodeContainer.addChild(tabbarGroup);
        this._tabbarGroup = tabbarGroup;
        if (this._curMyTabIdx != -1) {
            this._tabbarGroup.selectedIndex = this._curMyTabIdx;
        }
        var bottombg = BaseBitmap.create("arena_bottom");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view);
        this.addChild(bottombg);
        var tipText = ComponentManager.getTextField(LanguageManager.getlocal("skin_tip3"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipText, bottombg);
        this.addChild(tipText);
        var rectH2 = view.height - tabbarGroup.y - tabbarGroup.height - bottombg.height - 10;
        var rect2 = new egret.Rectangle(0, 0, GameConfig.stageWidth, rectH2);
        this._myScrollList = ComponentManager.getScrollList(SkinExchangeScrollItem, [], rect2);
        this._myScrollList.y = tabbarGroup.y + tabbarGroup.height + 1;
        this._myScrollList.setEmptyTip(LanguageManager.getlocal("skin_notOwnTip4"));
        this._myNodeContainer.addChild(this._myScrollList);
        this.refreshRankList();
        TickManager.addTick(this.tick, this);
        this.tick();
    };
    SkinViewTab4.prototype.refreshRankList = function () {
        if (this._curMyTabIdx == -1) {
            this.tabBtnClickHandler2({ index: 0 });
        }
        else {
            this.tabBtnClickHandler2({ index: this._curMyTabIdx });
        }
    };
    SkinViewTab4.prototype.tabBtnClickHandler2 = function (params) {
        this._curMyTabIdx = params.index;
        var list = [];
        var uiTypeV = 1;
        if (this._curMyTabIdx == 0) {
            if (Api.switchVoApi.checkOpenServantSkin()) {
                list = Config.ServantskinCfg.getServantSkinList();
                uiTypeV = 1;
            }
            else {
                list = Config.WifeskinCfg.getWifeCfgList();
                uiTypeV = 2;
            }
        }
        else {
            list = Config.WifeskinCfg.getWifeCfgList();
            uiTypeV = 2;
        }
        list.sort(function (dataA, dataB) {
            dataA["uiType"] = uiTypeV;
            dataB["uiType"] = uiTypeV;
            return Number(dataA.id) - Number(dataB.id);
        });
        var ownList = [];
        var notOwnList = [];
        var serverOpenTime = Api.skinVoApi.getShowTime();
        // serverOpenTime = 501;
        var noObjList = [];
        for (var index = 0; index < list.length; index++) {
            var tmp = list[index];
            var id = tmp.id;
            if (uiTypeV == 1) {
                if (typeof tmp.displayTime != "undefined" && serverOpenTime >= tmp.displayTime) {
                    if (!Api.servantVoApi.getServantObj(tmp.servantId)) {
                        noObjList.push(tmp);
                    }
                    else if (Api.servantVoApi.isOwnSkinOfSkinId(id)) {
                        ownList.push(tmp);
                    }
                    else {
                        notOwnList.push(tmp);
                    }
                }
            }
            else if (uiTypeV == 2) {
                if (typeof tmp.displayTime != "undefined" && serverOpenTime >= tmp.displayTime) {
                    if (!Api.wifeVoApi.getWifeInfoVoById(tmp.wifeId)) {
                        noObjList.push(tmp);
                    }
                    else if (Api.wifeSkinVoApi.isOwnSkinOfSkinId(id)) {
                        ownList.push(tmp);
                    }
                    else {
                        notOwnList.push(tmp);
                    }
                }
            }
        }
        notOwnList = notOwnList.concat(noObjList).concat(ownList);
        this._myScrollList.refreshData(notOwnList);
        if (uiTypeV == 2 && Api.rookieVoApi.curGuideKey == "skin") {
            var guideIdx = 0;
            for (var i = 0; i < notOwnList.length; i++) {
                var tmp = notOwnList[i];
                var id = tmp.id;
                if (id == "2211") {
                    guideIdx = i;
                    this._myScrollList.setScrollTopByIndex(guideIdx);
                    break;
                }
            }
        }
    };
    SkinViewTab4.prototype.makeCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            if (evt.data.data.data) {
                var data = evt.data.data.data;
                var itemvo = GameData.formatRewardItem(data.rewards)[0];
                var cfg = null;
                if (data.skinType == 1) {
                    cfg = Config.WifeskinCfg.getWifeCfgById(itemvo.id);
                    ViewController.getInstance().openView(ViewConst.POPUP.SKINGETVIEW, {
                        rewards: cfg,
                    });
                }
                else {
                    // cfg = Config.ServantskinCfg.getServantSkinItemById(itemvo.id);
                    App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(data.rewards));
                }
                this.refreshRankList();
            }
        }
    };
    SkinViewTab4.prototype.tick = function () {
        var view = this;
        if (Api.skinVoApi.checkServantExchange()) {
            view._tabbarGroup.addRedPoint(0);
        }
        else {
            view._tabbarGroup.removeRedPoint(0);
        }
        var index = Api.switchVoApi.checkOpenServantSkin() ? 1 : 0;
        if (Api.skinVoApi.checkWifeExchange()) {
            view._tabbarGroup.addRedPoint(index);
        }
        else {
            view._tabbarGroup.removeRedPoint(index);
        }
    };
    SkinViewTab4.prototype.dispose = function () {
        TickManager.removeTick(this.tick, this);
        this._myNodeContainer = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SKIN_MAKE), this.makeCallback, this);
        this._myScrollList = null;
        this._curMyTabIdx = -1;
        this._tabbarGroup = null;
        _super.prototype.dispose.call(this);
    };
    return SkinViewTab4;
}(CommonViewTab));
__reflect(SkinViewTab4.prototype, "SkinViewTab4");
//# sourceMappingURL=SkinViewTab4.js.map