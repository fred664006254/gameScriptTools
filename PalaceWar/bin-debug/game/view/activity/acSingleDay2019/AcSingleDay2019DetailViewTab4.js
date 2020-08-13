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
/*
author : qinajun
*/
var AcSingleDay2019DetailViewTab4 = (function (_super) {
    __extends(AcSingleDay2019DetailViewTab4, _super);
    function AcSingleDay2019DetailViewTab4(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcSingleDay2019DetailViewTab4.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcSingleDay2019DetailViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab4.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab4.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab4.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDay2019DetailViewTab4.prototype.refreshWhenSwitchBack = function () {
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRANK, {
            activeId: this.acTivityId,
        });
    };
    AcSingleDay2019DetailViewTab4.prototype.initView = function () {
        var view = this;
        var baseview = ViewController.getInstance().getView('AcSingleDay2019DetailView');
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var code = view.getUiCode();
        var container = new BaseDisplayObjectContainer();
        container.width = 640;
        var topdescbg = BaseBitmap.create("newsingledaytab3tag" + code + "-2");
        container.addChild(topdescbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topdescbg, view, [0, 10], true);
        //头像框
        var tmp = [];
        var tmp2 = [];
        var shop1 = view.cfg.shop1List;
        for (var i in shop1) {
            var unit = shop1[i];
            var rewardvo = GameData.formatRewardItem(unit.item)[0];
            if (rewardvo.type == 11) {
                //头像框
                var cfg = Config.TitleCfg.getTitleCfgById(rewardvo.id);
                if (cfg && cfg.isTitle == 3) {
                    //皮肤
                    tmp2.push(unit);
                }
                else {
                    tmp.push(unit);
                }
            }
            else {
                //皮肤
                tmp2.push(unit);
            }
        }
        var tablebg = BaseBitmap.create("newsingledaytab2bg-" + code);
        view.addChild(tablebg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tablebg, topdescbg);
        tablebg.height = view.height;
        var listbg1 = BaseBitmap.create("newsingledaytab2bottombg-" + code);
        listbg1.height = Math.ceil(tmp2.length / 2) * 450;
        container.addChild(listbg1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg1, topdescbg, [0, topdescbg.height + 5]);
        var tmpRect = new egret.Rectangle(0, 0, 610, listbg1.height - 10);
        var scrollList = ComponentManager.getScrollList(AcSingleDay2019SkinItem, tmp2, tmpRect, view.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg1, [0, 5]);
        container.addChild(scrollList);
        scrollList.bounces = false;
        if (tmp.length) {
            var topdescbg2 = BaseBitmap.create("newsingledaytab3tag" + code + "-1");
            container.addChild(topdescbg2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topdescbg2, listbg1, [0, listbg1.height + 5]);
            var listbg2 = BaseBitmap.create("newsingledaytab2bottombg-" + code);
            listbg2.height = Math.ceil(tmp.length / 2) * 450;
            container.addChild(listbg2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg2, topdescbg2, [0, topdescbg2.height + 5]);
            var tmpRect2 = new egret.Rectangle(0, 0, 610, listbg2.height - 10);
            var scrollList2 = ComponentManager.getScrollList(AcSingleDay2019SkinItem, tmp, tmpRect2, view.code);
            view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList2, listbg2, [0, 5]);
            container.addChild(scrollList2);
            scrollList2.bounces = false;
        }
        var scrollviewRect = new egret.Rectangle(0, 0, 640, view.height - 10);
        var scrollview = ComponentManager.getScrollView(container, scrollviewRect);
        view.addChild(scrollview);
        var line = BaseBitmap.create("newsingledaytab1line-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, view, [0, -10]);
        view.addChild(line);
    };
    AcSingleDay2019DetailViewTab4.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDay2019DetailViewTab4;
}(CommonViewTab));
__reflect(AcSingleDay2019DetailViewTab4.prototype, "AcSingleDay2019DetailViewTab4");
//# sourceMappingURL=AcSingleDay2019DetailViewTab4.js.map