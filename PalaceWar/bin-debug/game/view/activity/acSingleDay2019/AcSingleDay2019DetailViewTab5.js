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
var AcSingleDay2019DetailViewTab5 = (function (_super) {
    __extends(AcSingleDay2019DetailViewTab5, _super);
    function AcSingleDay2019DetailViewTab5(data) {
        var _this = _super.call(this) || this;
        _this._list1 = null;
        _this._list2 = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcSingleDay2019DetailViewTab5.prototype.getUiCode = function () {
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
    Object.defineProperty(AcSingleDay2019DetailViewTab5.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab5.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab5.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab5.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019DetailViewTab5.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDay2019DetailViewTab5.prototype.refreshWhenSwitchBack = function () {
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRANK, {
            activeId: this.acTivityId,
        });
    };
    AcSingleDay2019DetailViewTab5.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_SDNEWBUY), view.buyShopCallback, view);
        var baseview = ViewController.getInstance().getView('AcSingleDay2019DetailView');
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var code = view.getUiCode();
        var container = new BaseDisplayObjectContainer();
        container.width = 640;
        //礼包、道具
        var tmp = [];
        var tmp2 = [];
        var shop2 = view.cfg.shop2List;
        for (var i in shop2) {
            var unit = shop2[i];
            if (unit.type == 1) {
                //礼包
                tmp.push(unit);
            }
            else {
                //道具
                tmp2.push(unit);
            }
        }
        var tablebg = BaseBitmap.create("newsingledaytab2bg-" + code);
        container.addChild(tablebg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tablebg, view);
        var tmpRect = new egret.Rectangle(0, 0, 640, 215 * tmp.length);
        var scrollList = ComponentManager.getScrollList(AcSingleDay2019GiftItem, tmp, tmpRect, view.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0, 5]);
        container.addChild(scrollList);
        scrollList.bounces = false;
        view._list1 = scrollList;
        // let topdescbg2 = BaseBitmap.create(`newsingledaytab3tag${code}-2`);
        // container.addChild(topdescbg2);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topdescbg2, listbg1, [0,listbg1.height+5]);
        var listbg2 = BaseBitmap.create("newsingledaytab2bottombg-" + code);
        listbg2.height = Math.ceil(tmp2.length / 3) * 300;
        container.addChild(listbg2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg2, scrollList, [0, scrollList.height + 5]);
        var tmpRect2 = new egret.Rectangle(0, 0, 627, listbg2.height - 10);
        var scrollList2 = ComponentManager.getScrollList(AcSingleDay2019ShopItem, tmp2, tmpRect2, view.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList2, listbg2, [0, 5]);
        container.addChild(scrollList2);
        scrollList2.bounces = false;
        view._list2 = scrollList2;
        tablebg.height = container.height;
        var scrollviewRect = new egret.Rectangle(0, 0, 640, view.height - 10);
        var scrollview = ComponentManager.getScrollView(container, scrollviewRect);
        view.addChild(scrollview);
        var line = BaseBitmap.create("newsingledaytab1line-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, view, [0, -10]);
        view.addChild(line);
    };
    AcSingleDay2019DetailViewTab5.prototype.buyShopCallback = function (evt) {
        var view = this;
        if (view.vo.lasttype == 2) {
            var data = evt.data.data.data;
            if (!data) {
                App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
                return;
            }
            var rewards = data.rewards;
            var idx = view.vo.lastidx;
            var type = view.vo.buytype;
            var item = null;
            if (type == 1) {
                //礼包
                item = view._list1.getItemByIndex(idx);
            }
            else if (type == 2) {
                //道具
                item = view._list2.getItemByIndex(idx);
            }
            item.refresh();
            var rewardList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardList, view.vo.lastpos);
        }
    };
    AcSingleDay2019DetailViewTab5.prototype.dispose = function () {
        var view = this;
        view._list1 = null;
        view._list2 = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_SDNEWBUY), view.buyShopCallback, view);
        _super.prototype.dispose.call(this);
    };
    return AcSingleDay2019DetailViewTab5;
}(CommonViewTab));
__reflect(AcSingleDay2019DetailViewTab5.prototype, "AcSingleDay2019DetailViewTab5");
//# sourceMappingURL=AcSingleDay2019DetailViewTab5.js.map