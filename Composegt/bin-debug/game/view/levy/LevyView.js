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
 * 合成征收界面
 * @author hyd
*/
var LevyView = (function (_super) {
    __extends(LevyView, _super);
    function LevyView() {
        var _this = _super.call(this) || this;
        _this._scollList = null;
        _this._aniContainer = null;
        return _this;
    }
    LevyView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "commonview_redtitle", "commonview_woodbg", "progress_type1_yellow2", "progress_type3_bg",
            "commonview_bottom", "levy_numbg", "levy_star1", "levy_star2",
            "levy_itembg", "levy_lock", "levy_starbg"
        ]);
    };
    LevyView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LEVY_ADD_GOODS, this.updateResNum, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESHVO_LEVY, this.refreshUi, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LEVY_PROGRESS_FULL, this.progressFullHandle, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LEVY_SCOLL_CANTOUCH, this.scrollCanTouch, this);
        var redTitle = BaseBitmap.create("commonview_redtitle");
        this.addChildToContainer(redTitle);
        redTitle.setPosition(GameConfig.stageWidth / 2 - redTitle.width / 2, -23);
        var arr = Api.levyVoApi.getLevyItemList();
        this._scollList = ComponentManager.getScrollList(LevyScrollItem, arr, new egret.Rectangle(0, 0, 636, GameConfig.stageHeigth - 160));
        this.addChild(this._scollList);
        this._scollList.setPosition(GameConfig.stageWidth / 2 - this._scollList.width / 2, 128);
        if (Api.rookieVoApi.isGuiding) {
            this._scollList.verticalScrollPolicy = "off";
        }
        var maxV = 3;
        for (var i = 0; i < maxV; i++) {
            this.getResIcons(i, this, redTitle);
        }
        var bottom = BaseBitmap.create("commonview_bottom");
        bottom.setPosition(0, GameConfig.stageHeigth - bottom.height);
        this.addChild(bottom);
    };
    LevyView.prototype.getResIcons = function (index, container, positionObj) {
        var diffX = 200;
        var type;
        if (index == 0) {
            type = "gold";
        }
        else if (index == 1) {
            type = "food";
        }
        else if (index == 2) {
            type = "soldier";
        }
        else if (index == 3) {
            type = "practice";
        }
        var resBar = ComponentManager.getResBar(ItemEnums[type], true);
        resBar.setPosition(40 + index * diffX, this.container.y + positionObj.y + (positionObj.height - resBar.height) / 2 + 5);
        resBar.isShowAni = true;
        this["_" + type + "bar"] = resBar;
        container.addChild(resBar);
        this["_" + type + "bar"]._levyRate = Api.levyVoApi.getTotalRawAddRate(type);
        var resAddText = ComponentManager.getTextField(Api.levyVoApi.getTotalAddRateStr(type), 18, TextFieldConst.COLOR_WARN_YELLOW2);
        resAddText.setPosition(resBar.x + resBar.width / 2 - resAddText.width / 2 + 10, resBar.y + resBar.height - 17);
        container.addChild(resAddText);
        this["_" + type + "AddText"] = resAddText;
    };
    LevyView.prototype.updateResNum = function () {
        this["_goldbar"].setResNum(Api.playerVoApi.getPlayerGoldStr());
        this["_soldierbar"].setResNum(Api.playerVoApi.getSoldierStr());
        this["_foodbar"].setResNum(Api.playerVoApi.getFoodStr());
    };
    LevyView.prototype.refreshUi = function () {
        if (this._scollList) {
            var arr = Api.levyVoApi.getLevyItemList();
            this._scollList.refreshData(arr);
        }
        var typeArr = ["gold", "food", "soldier"];
        for (var i = 0; i < typeArr.length; i++) {
            var type = typeArr[i];
            if (this["_" + type + "AddText"] && this["_" + type + "bar"]) {
                this["_" + type + "AddText"].text = Api.levyVoApi.getTotalAddRateStr(type);
                this["_" + type + "AddText"].x = this["_" + type + "bar"].x + this["_" + type + "bar"].width / 2 - this["_" + type + "AddText"].width / 2 + 10;
                this["_" + type + "bar"].levyRate = Api.levyVoApi.getTotalRawAddRate(type);
            }
        }
    };
    LevyView.prototype.scrollCanTouch = function () {
        this._scollList.verticalScrollPolicy = "on";
    };
    LevyView.prototype.progressFullHandle = function (event) {
        var levyIndex = event.data.levyIndex;
        var itemRate = Api.levyVoApi.getLevyItemRate(levyIndex);
        var itemY = this._scollList.getItemByIndex(levyIndex).y;
        if (itemY > this._scollList.scrollTop - 200 && itemY < this._scollList.scrollTop - 200 + 800) {
            if (!this._aniContainer) {
                this._aniContainer = new BaseDisplayObjectContainer();
                this._aniContainer.width = GameConfig.stageWidth;
                this._aniContainer.height = GameConfig.stageHeigth;
                this.addChildAt(this._aniContainer, 999);
            }
            if (itemRate.grate) {
                var levyEffect_1 = new LevyEffect();
                levyEffect_1.start("public_icon2", new egret.Point(410, this._scollList.y + itemY - this._scollList.scrollTop + 220), new egret.Point(this["_goldbar"].x, this["_goldbar"].y), this._aniContainer, function () {
                    levyEffect_1.dispose();
                }, this);
            }
            if (itemRate.frate) {
                var levyEffect_2 = new LevyEffect();
                levyEffect_2.start("public_icon3", new egret.Point(410, this._scollList.y + itemY - this._scollList.scrollTop + 220), new egret.Point(this["_foodbar"].x, this["_foodbar"].y), this._aniContainer, function () {
                    levyEffect_2.dispose();
                }, this);
            }
            if (itemRate.srate) {
                var levyEffect_3 = new LevyEffect();
                levyEffect_3.start("public_icon4", new egret.Point(410, this._scollList.y + itemY - this._scollList.scrollTop + 220), new egret.Point(this["_soldierbar"].x, this["_soldierbar"].y), this._aniContainer, function () {
                    levyEffect_3.dispose();
                }, this);
            }
        }
    };
    LevyView.prototype.getTitleStr = function () {
        return "levyViewTitle";
    };
    LevyView.prototype.getBgName = function () {
        return "commonview_woodbg";
    };
    LevyView.prototype.getRequestData = function () {
        return {
            requestType: NetRequestConst.REQUEST_LEVY_INDEX,
            requestData: {}
        };
    };
    LevyView.prototype.getRuleInfo = function () {
        return "levyRule";
    };
    LevyView.prototype.hide = function () {
        if (Api.rookieVoApi.curGuideKey == "levy" || Api.rookieVoApi.curGuideKey == "batchcompose" || !Api.rookieVoApi.curGuideKey) {
            Api.rookieVoApi.checkWaitingGuide();
        }
        _super.prototype.hide.call(this);
    };
    LevyView.prototype.dispose = function () {
        this._scollList = null;
        this._aniContainer = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LEVY_ADD_GOODS, this.updateResNum, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESHVO_LEVY, this.refreshUi, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LEVY_PROGRESS_FULL, this.progressFullHandle, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LEVY_SCOLL_CANTOUCH, this.scrollCanTouch, this);
        _super.prototype.dispose.call(this);
    };
    return LevyView;
}(CommonView));
__reflect(LevyView.prototype, "LevyView");
