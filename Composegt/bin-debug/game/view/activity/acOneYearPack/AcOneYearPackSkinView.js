/*
author : yanyuling
desc : 周年庆特惠转盘活动
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
var AcOneYearPackSkinView = (function (_super) {
    __extends(AcOneYearPackSkinView, _super);
    function AcOneYearPackSkinView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcOneYearPackSkinView.prototype, "cfg", {
        get: function () {
            return this.vo.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcOneYearPackSkinView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcOneYearPackSkinView.prototype.initView = function () {
        var bottomBg = BaseBitmap.create("public_9v_bg03");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - this.container.y - 60;
        bottomBg.x = 0;
        bottomBg.y = -10; //GameConfig.stageHeigth - this.container.y;
        var innerbg = BaseBitmap.create("public_9v_bg02");
        innerbg.width = GameConfig.stageWidth - 10;
        innerbg.height = GameConfig.stageHeigth - this.container.y - 50;
        innerbg.y = bottomBg.y + 5;
        innerbg.x = 5;
        this.addChildToContainer(innerbg);
        var bottom = BaseBitmap.create("chatview_bottom");
        bottom.x = GameConfig.stageWidth / 2 - bottom.width / 2;
        bottom.y = GameConfig.stageHeigth - this.container.y - bottom.height; //-221;
        var wifeSkinShow = this.cfg.wifeSkinShow;
        var keys = Object.keys(wifeSkinShow);
        keys.sort(function (keya, keyb) {
            return Number(keya) - Number(keyb);
        });
        var ids = [];
        for (var index = 0; index < keys.length; index++) {
            ids.push(wifeSkinShow[keys[index]].wifeSkinID);
        }
        var rectH1 = bottom.y + 55; // innerbg.height - 10;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, rectH1);
        var _scrollList = ComponentManager.getScrollList(AcOneYearoackSkinScrollItem, ids, rect);
        _scrollList.y = bottomBg.y;
        _scrollList.x = 10;
        this.addChildToContainer(_scrollList);
        this.addChildToContainer(bottomBg);
        this.addChildToContainer(bottom);
    };
    AcOneYearPackSkinView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_boxbg", "skin_boxbg2", "chatview_bottom",
        ]);
    };
    AcOneYearPackSkinView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcOneYearPackSkinView;
}(CommonView));
__reflect(AcOneYearPackSkinView.prototype, "AcOneYearPackSkinView");
