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
author : qianjun
desc : 奇珍异宝
*/
var AcSingleDayBuild3View = (function (_super) {
    __extends(AcSingleDayBuild3View, _super);
    function AcSingleDayBuild3View() {
        var _this = _super.call(this) || this;
        _this.public_dot1 = null;
        _this.public_dot2 = null;
        _this.public_dot3 = null;
        _this._list = null;
        _this._suffix = null;
        return _this;
    }
    Object.defineProperty(AcSingleDayBuild3View.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayBuild3View.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayBuild3View.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDayBuild3View.prototype.getBgName = function () {
        return "public_9_bg20";
    };
    AcSingleDayBuild3View.prototype.getTitleStr = function () {
        return "buildtxt3_" + this._suffix;
    };
    AcSingleDayBuild3View.prototype.init = function () {
        var code = this.param.data.code;
        if (Number(code) <= 4) {
            this._suffix = "1"; //;
        }
        else {
            this._suffix = code;
        }
        _super.prototype.init.call(this);
    };
    AcSingleDayBuild3View.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQYEST_ACTIVITY_SINGLEDAY_BUYSHOP), view.buyShopCallback, view);
        view.width = GameConfig.stageWidth;
        var bg1 = BaseBitmap.create("public_9v_bg02");
        // bg1.y = 5;
        bg1.width = GameConfig.stageWidth;
        bg1.height = GameConfig.stageHeigth - 125 - view.titleBg.y - view.titleBg.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg1, view.titleBg, [0, view.titleBg.height]);
        view.addChild(bg1);
        bg1.alpha = 0;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 580, bg1.height - 25);
        var arr = view.vo.getArr('itemsList');
        var scrollList = ComponentManager.getScrollList(AcSingleDayBuild3Item, arr, rect, view.param.data.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg1, [0, 25]);
        view.addChild(scrollList);
        view._list = scrollList;
        view.initBottom();
    };
    //创建底部通用切换按钮，由 initBottom，bottomBtnHandler 两个接口一起完成
    AcSingleDayBuild3View.prototype.initBottom = function () {
        var btNode = new AcSingleDayBottomNode({ selectIdx: 3, switchCallback: this.bottomBtnHandler, callbackOgj: this });
        btNode.y = -this.container.y;
        this.addChildToContainer(btNode);
    };
    AcSingleDayBuild3View.prototype.buyShopCallback = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        if (!data) {
            App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
            return;
        }
        var rewards = data.rewards;
        var idx = 0;
        for (var i in view.cfg.itemsList) {
            var unit = view.cfg.itemsList[i];
            if (unit.itemID === rewards) {
                idx = Number(i);
                break;
            }
        }
        var item = view._list.getItemByIndex(idx);
        item.refreshItem();
        var rewardList = GameData.formatRewardItem(rewards);
        var pos = item.localToGlobal(106, 200);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcSingleDayBuild3View.prototype.bottomBtnHandler = function (index) {
        if (index == 1) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYBUILD1VIEW, {
                code: this.param.data.code,
                aid: this.param.data.aid
            });
        }
        else if (index == 2) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYSKINVIEW, {
                code: this.param.data.code,
                aid: this.param.data.aid
            });
        }
        else if (index == 3) {
            return;
        }
        this.hide();
    };
    AcSingleDayBuild3View.prototype.getRuleInfo = function () {
        return "acSingleDayRuleInfo-" + this._suffix;
    };
    AcSingleDayBuild3View.prototype.getRuleParam = function () {
        var vo = this.vo;
        var cfg = this.cfg;
        return [
            (cfg.startTime / 3600).toString(),
            ((cfg.startTime + cfg.luckyPacketCD) / 3600).toString(),
            String(cfg.luckyPacketPurchase / 3600),
            cfg.couponLimit.toString()
        ];
    };
    AcSingleDayBuild3View.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "shopview_line", "shopview_corner"
        ]);
    };
    AcSingleDayBuild3View.prototype.update = function () {
        //第一页 红点
        var vo = this.vo;
        if (!vo) {
            return;
        }
        if (this.public_dot1) {
            this.public_dot1.visible = vo.getpublicRedhot1();
        }
        //第二页 红点
        if (this.public_dot2) {
            this.public_dot2.visible = vo.getpublicRedhot2();
        }
        //第三页 红点
        if (this.public_dot3) {
            this.public_dot3.visible = vo.getpublicRedhot3();
        }
    };
    AcSingleDayBuild3View.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQYEST_ACTIVITY_SINGLEDAY_BUYSHOP), view.buyShopCallback, view);
        view.public_dot1 = null;
        view.public_dot2 = null;
        view.public_dot3 = null;
        this._suffix = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayBuild3View;
}(CommonView));
__reflect(AcSingleDayBuild3View.prototype, "AcSingleDayBuild3View");
