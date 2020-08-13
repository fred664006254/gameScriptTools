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
 * 情缘绘卷
 * author qianjun
 */
var QingyuanOldView = (function (_super) {
    __extends(QingyuanOldView, _super);
    function QingyuanOldView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        return _this;
    }
    QingyuanOldView.prototype.getResourceList = function () {
        var arr = ["qingyuanbg", "qingyuanred"];
        for (var k in Config.EncounterCfg.encounterList) {
            var unit = Config.EncounterCfg.encounterList[k];
            for (var i in unit.need) {
                var data = unit.need[i];
                var rewardvo = GameData.formatRewardItem(data)[0];
                arr.push(unit.type + "role" + rewardvo.id);
            }
        }
        return _super.prototype.getResourceList.call(this).concat(arr);
    };
    QingyuanOldView.prototype.initBg = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.viewBg = BaseBitmap.create("qingyuanbg");
        view.viewBg.height = view.height;
        view.viewBg.y = GameConfig.stageHeigth - view.viewBg.height;
        view.addChild(this.viewBg);
    };
    QingyuanOldView.prototype.getTitleBgName = function () {
        return null;
    };
    QingyuanOldView.prototype.getTitleStr = function () {
        return null;
    };
    QingyuanOldView.prototype.getRuleInfo = function () {
        return "qingyuanrule";
    };
    QingyuanOldView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL, view.checkRed, view);
        var qingyuantitle = BaseBitmap.create("qingyuantitle");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, qingyuantitle, view);
        view.addChild(qingyuantitle);
        var scroRect = new egret.Rectangle(0, 0, 531, GameConfig.stageHeigth - qingyuantitle.y - qingyuantitle.height - 115);
        var tmp = [];
        for (var j in Config.EncounterCfg.encounterList) {
            var type = Config.EncounterCfg.encounterList[j].type;
            if (Api.switchVoApi.checkOpenQingYuan(type)) {
                tmp.push(Config.EncounterCfg.encounterList[j]);
            }
        }
        tmp.sort(function (a, b) {
            if (a.type < b.type) {
                return 1;
            }
            else {
                return -1;
            }
        });
        var scrollList = ComponentManager.getScrollList(QingyuanItem, tmp, scroRect);
        view.addChild(scrollList);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, qingyuantitle, [0, qingyuantitle.height + 20]);
        view._list = scrollList;
        var zshi1 = BaseBitmap.create("qingyuanzshi1");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, zshi1, view, [0, 60]);
        view.addChild(zshi1);
        var zshi2 = BaseBitmap.create("qingyuanzshi2");
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, zshi2, view, [0, 60]);
        view.addChild(zshi2);
    };
    QingyuanOldView.prototype.checkRed = function () {
        var view = this;
        var list = view._list;
        for (var i in list._scrollListItemArr) {
            var item = list._scrollListItemArr[i];
            if (item) {
                item.refresh();
            }
        }
    };
    QingyuanOldView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL, view.checkRed, view);
        view._list = null;
        _super.prototype.dispose.call(this);
    };
    return QingyuanOldView;
}(CommonView));
__reflect(QingyuanOldView.prototype, "QingyuanOldView");
//# sourceMappingURL=QingyuanOldView.js.map