/**
 * 皇宫
 * author yanyuling
 * date 2018/03/27
 * @class PalaceHouseGroupView
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
var PalaceHouseGroupView = (function (_super) {
    __extends(PalaceHouseGroupView, _super);
    function PalaceHouseGroupView() {
        return _super.call(this) || this;
    }
    PalaceHouseGroupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        /**
         * 该建筑下的所有称号列表
         */
        var buildingId = this.param.data.buildingId;
        var idList = GameConfig.config.buildingCfg[buildingId].title;
        var resList = [];
        for (var key in idList) {
            var titleId = idList[key];
            var cfg = Config.TitleCfg.getTitleCfgById(titleId);
            if (cfg.isTitle == 1 && (cfg.titleType == 5 || cfg.titleType == 6) && Api.switchVoApi.isCrossOpen()) {
                if (Api.palaceVoApi.getRoleInfoByTitleId(titleId) && Config.TitleCfg.isTitleOPend(titleId)) {
                    resList.push(titleId);
                }
            }
            else {
                if (Api.palaceVoApi.getRoleInfoByTitleId(titleId) && Config.TitleCfg.isTitleOPend(titleId)) {
                    resList.push(titleId);
                }
            }
        }
        resList.sort(function (a, b) {
            var cfga = Config.TitleCfg.getTitleCfgById(a);
            var cfgb = Config.TitleCfg.getTitleCfgById(b);
            if (cfga.titleType != cfgb.titleType) {
                return cfgb.titleType - cfga.titleType;
            }
            else {
                return Number(cfga.id) - Number(cfgb.id);
            }
        });
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - this.container.y);
        var scrollList = ComponentManager.getScrollList(PalaceRoleInfoItem2, [], rect);
        // PalaceRoleInfoItem2.buildingId = buildingId;
        scrollList.y = -10;
        scrollList.refreshData(resList);
        this._nodeContainer.addChild(scrollList);
    };
    PalaceHouseGroupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    PalaceHouseGroupView.prototype.getRuleInfo = function () {
        var buildingId = this.param.data.buildingId;
        if (buildingId == "61" || buildingId == "63") {
            return "palaceHouseGroupRule-" + buildingId;
        }
        return "";
    };
    PalaceHouseGroupView.prototype.userShotCallback = function (event) {
        if (event && event.data && event.data.ret) {
            var data = event.data.data.data;
            if (event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT) {
                data["crossZone"] = 1;
                data['zid'] = Api.mergeServerVoApi.getTrueZid(Number(data.ruid));
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        }
    };
    // 标题背景名称
    PalaceHouseGroupView.prototype.getTitleStr = function () {
        if (Api.switchVoApi.checkOpenCrossRank() && (this.param.data.buildingId == "61" || this.param.data.buildingId == "63")) {
            return "palace_buildingName2_" + this.param.data.buildingId;
        }
        return "palace_buildingName" + this.param.data.buildingId;
    };
    PalaceHouseGroupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return PalaceHouseGroupView;
}(CommonView));
__reflect(PalaceHouseGroupView.prototype, "PalaceHouseGroupView");
//# sourceMappingURL=PalaceHouseGroupView.js.map