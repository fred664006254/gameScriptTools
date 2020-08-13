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
//突袭奖励
var AcThreeKingdomsRankViewTab4 = (function (_super) {
    __extends(AcThreeKingdomsRankViewTab4, _super);
    function AcThreeKingdomsRankViewTab4(data) {
        var _this = _super.call(this) || this;
        _this._lockGroup = null;
        _this._juzhou = null;
        _this._list = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsRankViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab4.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab4.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab4.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsRankViewTab4.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsRankViewTab4.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_HEROINFO, this.infoCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_HEROREWARD, this.rewardCallBack, this);
        NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_HEROINFO, {
            activeId: view.acTivityId
        });
        var baseview = ViewController.getInstance().getView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW);
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var code = view.getUiCode();
        var juzhou = BaseBitmap.create(App.CommonUtil.getResByCode("threekingdomsjzhou", code));
        view.addChild(juzhou);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, juzhou, view, [0, 0], true);
        view._juzhou = juzhou;
        //第四周
        var start = view.vo.activeSt + (4 - 1) * (7 * 86400);
        var unit = view.cfg.activeTime[1];
        var tmp = 2;
        var datest = start;
        var dateet = start + 4 * 86400;
        var st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
        var et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
        var timeparam = App.DateUtil.getFormatBySecond(datest, 7) + "-" + App.DateUtil.getFormatBySecond(dateet, 7);
        var timeparam2 = App.DateUtil.getFormatBySecond(st, 12) + "-" + App.DateUtil.getFormatBySecond(et, 12);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRanktip13", code), [timeparam, timeparam2]), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.lineSpacing = 10;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.width = 560;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, juzhou, [0, 18]);
        //排名列表
        var list = ComponentManager.getScrollList(AcThreeKingdomsHeroAttackItem, [], new egret.Rectangle(0, 0, 639, view.height - view._juzhou.height - 20), { code: view.code, bosshp: 0, heroHpList: {} });
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, view._juzhou, [0, view._juzhou.height + 10]);
        view.addChild(list);
        view._list = list;
        var lockGroup = new BaseDisplayObjectContainer();
        lockGroup.width = view.width;
        lockGroup.height = view.height;
        view.addChild(lockGroup);
        var mask = BaseBitmap.create("public_9_viewmask");
        mask.width = view.width;
        mask.height = GameConfig.stageHeigth;
        lockGroup.addChild(mask);
        var lockImg = BaseBitmap.create("threekingdomsprankofficerlock");
        lockGroup.addChild(lockImg);
        var tipbg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        tipbg.width = 560;
        tipbg.height = 85;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipbg, lockGroup, [0, 145], true);
        lockGroup.addChild(tipbg);
        var lockTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRanktip14", code), [timeparam]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        lockTxt.lineSpacing = 6;
        lockTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lockTxt, tipbg);
        lockGroup.addChild(lockTxt);
        //未解锁
        lockGroup.visible = view.vo.getCurWeek() < 4;
        view._lockGroup = lockGroup;
        lockGroup.touchEnabled = true;
        lockGroup.addTouchTap(function () {
        }, view);
        TickManager.addTick(this.tick, this);
        this.tick();
    };
    AcThreeKingdomsRankViewTab4.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    AcThreeKingdomsRankViewTab4.prototype.tick = function () {
        var view = this;
        view._lockGroup.visible = view.vo.getCurWeek() < 4;
        view._list.verticalScrollPolicy = view._lockGroup.visible ? 'off' : 'on';
    };
    AcThreeKingdomsRankViewTab4.prototype.rewardCallBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var rData = evt.data.data.data;
            // if(!rData){
            //     App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            //     return;
            // }
            var rewards = rData.rewards;
            var cfg = view.cfg.recharge[view.vo.lastidx];
            var str = rewards;
            var rewardList = GameData.formatRewardItem(str);
            var pos = this.vo.lastpos;
            App.CommonUtil.playRewardFlyAction(rewardList, pos);
            var item = view._list.getItemByIndex(view.vo.lastidx);
            item.refreshUI();
            this.vo.lastidx = null;
        }
    };
    AcThreeKingdomsRankViewTab4.prototype.infoCallback = function (evt) {
        var view = this;
        var bosshp = view.cfg.heroHp;
        var heroHpList = {};
        if (evt.data.ret) {
            var data = evt.data.data.data;
            bosshp = data.bosshp;
            heroHpList = data.heroHpList;
        }
        var arr = [];
        for (var i = 1; i <= 5; ++i) {
            arr.push(i);
        }
        var today = view.vo.getCurWeek() < 4 ? 1 : Math.min(5, view.vo.getTodayWeek());
        view._list.refreshData(arr, { code: view.code, bosshp: bosshp, heroHpList: heroHpList });
    };
    AcThreeKingdomsRankViewTab4.prototype.update = function () {
        var view = this;
    };
    AcThreeKingdomsRankViewTab4.prototype.dispose = function () {
        var view = this;
        TickManager.removeTick(this.tick, this);
        view._lockGroup.dispose();
        view._lockGroup = null;
        view._juzhou = null;
        view._list = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_HEROINFO, this.infoCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_HEROREWARD, this.rewardCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsRankViewTab4;
}(CommonViewTab));
__reflect(AcThreeKingdomsRankViewTab4.prototype, "AcThreeKingdomsRankViewTab4");
//# sourceMappingURL=AcThreeKingdomsRankViewTab4.js.map