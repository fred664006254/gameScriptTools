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
        //背景图片
        var borderBg = BaseBitmap.create("public_9v_bg03");
        borderBg.width = GameConfig.stageWidth;
        borderBg.height = GameConfig.stageHeigth - 69;
        borderBg.y = 69;
        this.addChild(borderBg);
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
            if (Api.palaceVoApi.getRoleInfoByTitleId(titleId)) {
                resList.push(titleId);
            }
        }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth - 28, GameConfig.stageHeigth - this.container.y);
        var scrollList = ComponentManager.getScrollList(PalaceRoleInfoItem2, resList, rect);
        // PalaceRoleInfoItem2.buildingId = buildingId;
        scrollList.x = GameConfig.stageWidth / 2 - scrollList.width / 2;
        scrollList.y = -15;
        this._nodeContainer.addChild(scrollList);
    };
    PalaceHouseGroupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "palace_perbg",
        ]);
    };
    // 标题背景名称
    PalaceHouseGroupView.prototype.getTitleStr = function () {
        return "palace_buildingName" + this.param.data.buildingId;
    };
    PalaceHouseGroupView.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return PalaceHouseGroupView;
}(CommonView));
__reflect(PalaceHouseGroupView.prototype, "PalaceHouseGroupView");
