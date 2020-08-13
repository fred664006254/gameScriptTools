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
 * author:qianjun
 * desc:奖励弹窗
*/
var EmperorWarRewardView = (function (_super) {
    __extends(EmperorWarRewardView, _super);
    function EmperorWarRewardView() {
        var _this = _super.call(this) || this;
        _this._topBg = null;
        return _this;
    }
    EmperorWarRewardView.prototype.getTabbarTextArr = function () {
        return [
            "emperorWarRewardViewTab1",
            "emperorWarRewardViewTab2",
            "emperorWarRewardViewTab3",
        ];
    };
    EmperorWarRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "emparena_bottom", "emptquan",
            "prestige_prerogative1", "prestige_prerogative2", "prestige_prerogative3", "prestige_prerogative1_down", "prestige_prerogative2_down", "prestige_prerogative3_down",
            "crossservantawardbbg", "empblueline", "empservantbottom", "prestige_prerogative4", "prestige_prerogative4_down", "empservantrole", "progress7_bg", "progress7", "servant_star", "empservantrole2"
        ]);
    };
    Object.defineProperty(EmperorWarRewardView.prototype, "api", {
        get: function () {
            return Api.emperorwarVoApi;
        },
        enumerable: true,
        configurable: true
    });
    EmperorWarRewardView.prototype.initView = function () {
        var view = this;
        var emparena_bottom = BaseBitmap.create("emparena_bottom");
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view);
        view.addChild(emparena_bottom);
        var topBg = BaseBitmap.create("public_9_bg22");
        topBg.width = GameConfig.stageWidth + 18;
        topBg.height = emparena_bottom.y - view.tabbarGroup.y - view.tabbarGroup.height;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view, [0, view.tabbarGroup.y + view.tabbarGroup.height - 5]);
        var index = view.getChildIndex(view.tabbarGroup);
        view.addChildAt(topBg, index - 1);
        view._topBg = topBg;
        var cheerForinfo = view.api.getBmDataByKV('uid', view.api.getZhuweiID());
        var ttaitext = '';
        if (cheerForinfo) {
            var taotai = view.api.type == 5 ? (cheerForinfo.status < 5) : false;
            ttaitext = taotai ? LanguageManager.getlocal("emperorWarTtai") : "";
        }
        var name = cheerForinfo ? cheerForinfo.name : LanguageManager.getlocal('nothing');
        var desc1 = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarCheerFor", [name, ttaitext]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, desc1, emparena_bottom, [10, 0]);
        view.addChild(desc1);
        var desc2 = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossActivityRewardTxt5"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_QUALITY_YELLOW);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, desc2, emparena_bottom, [10, 0]);
        view.addChild(desc2);
        var cfg = Config.EmperorwarCfg;
        if (!Api.servantVoApi.getServantObj(String(cfg.servant))) {
            var curNum = Api.itemVoApi.getItemNumInfoVoById(cfg.itemNeed);
            if (curNum >= cfg.exchangeNum) {
                view.tabbarGroup.addRedPoint(2);
            }
            else {
                view.tabbarGroup.removeRedPoint(2);
            }
        }
        else {
            view.tabbarGroup.removeRedPoint(2);
        }
    };
    EmperorWarRewardView.prototype.tick = function () {
        var view = this;
        var cfg = Config.EmperorwarCfg;
        if (!Api.servantVoApi.getServantObj(String(cfg.servant))) {
            var curNum = Api.itemVoApi.getItemNumInfoVoById(cfg.itemNeed);
            if (curNum >= cfg.exchangeNum) {
                view.tabbarGroup.addRedPoint(2);
            }
            else {
                view.tabbarGroup.removeRedPoint(2);
            }
        }
        else {
            view.tabbarGroup.removeRedPoint(2);
        }
    };
    EmperorWarRewardView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        view._topBg.visible = data.index != 2;
        _super.prototype.clickTabbarHandler.call(this, data);
    };
    EmperorWarRewardView.prototype.getViewBg = function () {
        var view = this;
        return view._topBg;
    };
    EmperorWarRewardView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return EmperorWarRewardView;
}(CommonView));
__reflect(EmperorWarRewardView.prototype, "EmperorWarRewardView");
//# sourceMappingURL=EmperorWarRewardView.js.map