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
date : 2018.4.14
desc : 感恩回馈
*/
var AcDailyRechargeView = (function (_super) {
    __extends(AcDailyRechargeView, _super);
    function AcDailyRechargeView() {
        var _this = _super.call(this) || this;
        _this._timecdbg = null;
        _this._timeCountTxt = null;
        _this._list = null;
        return _this;
    }
    Object.defineProperty(AcDailyRechargeView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDailyRechargeView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDailyRechargeView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDailyRechargeView.prototype.getRuleInfo = function () {
        return App.CommonUtil.getCnByCode("AcDailyRechargeRuleInfo", this.getUiCode());
    };
    AcDailyRechargeView.prototype.getTitleStr = function () {
        return null;
    };
    AcDailyRechargeView.prototype.getContainerY = function () {
        return this.titleBg.height;
    };
    AcDailyRechargeView.prototype.isHideTitleBgShadow = function () {
        return false;
    };
    AcDailyRechargeView.prototype.getTitleBgName = function () {
        return this.getResByCode("dailyrechargetitle");
    };
    AcDailyRechargeView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    AcDailyRechargeView.prototype.initView = function () {
        var _this = this;
        var view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_DAILYRECHARGE_GEREWARD, view.rewardCallBack, view);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var topbg = BaseBitmap.create(this.getResByCode("dailychargetop", code));
        view.addChildToContainer(topbg);
        var timebg = BaseBitmap.create(this.getResByCode("dailyrechargetimebg", code));
        view.addChildToContainer(timebg);
        var timeTxt = ComponentManager.getTextField(this.vo.getAcLocalTime(true), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(timeTxt);
        timebg.width = timeTxt.width + 70;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timebg, topbg, [200, 10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, timeTxt, timebg);
        //倒计时位置 
        var timecdbg = BaseBitmap.create("public_9_bg61");
        view.addChildToContainer(timecdbg);
        timecdbg.width = 270;
        timecdbg.y = (topbg.y + topbg.height - 14);
        view._timecdbg = timecdbg;
        var str = view.vo.isInActivity() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
        var tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown(), 17)]), 18);
        view.addChildToContainer(tip2Text);
        view._timeCountTxt = tip2Text;
        tip2Text.y = timecdbg.y + 6;
        timecdbg.x = GameConfig.stageWidth - timecdbg.width - 12;
        tip2Text.x = timecdbg.x + (timecdbg.width - tip2Text.width) * 0.5;
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        // this._effect.setScale(2);
        var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffect.setPosition(20, 140);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        view.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        skinTxt.setPosition(123, 220);
        view.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        skinTxteffect.setPosition(123, 220);
        view.addChildToContainer(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        //透明点击区域
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 180;
        touchPos.height = 176;
        touchPos.setPosition(20, 60);
        view.addChildToContainer(touchPos);
        touchPos.addTouchTap(function () {
            var skinstr = _this.cfg.show;
            var rewardvo = GameData.formatRewardItem(skinstr)[0];
            var topMsg = LanguageManager.getlocal(_this.getCnByCode("AcDailyRechargeTip1", code), [_this.cfg.recharge[1].needGem, String(Object.keys(_this.cfg.recharge).length), rewardvo.name]);
            var data = { data: [
                    { idType: skinstr, topMsg: topMsg, scale: rewardvo.type == 16 ? 0.6 : 0.8 },
                ] };
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
        }, ViewController);
        var list = ComponentManager.getScrollList(AcDailyRechargeItem, view.updateArr(), new egret.Rectangle(0, 0, 600, view.height - view.titleBg.height - topbg.height - 20), view.code);
        view._list = list;
        view.addChildToContainer(list);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, topbg, [0, topbg.height + 20]);
        this.setBigFameY(250);
        this.setBigFameCorner(2);
        view.tick();
        view._list.setScrollTopByIndex(view.vo.getNowDay());
    };
    AcDailyRechargeView.prototype.updateArr = function () {
        var view = this;
        var vo = view.vo;
        if (!vo) {
            return [];
        }
        var arr1 = [];
        var arr = view.cfg.recharge;
        var curday = view.vo.getNowDay();
        for (var i in arr) {
            var unit = arr[i];
            arr1.push(unit);
        }
        return arr1;
    };
    AcDailyRechargeView.prototype.freshView = function () {
        var view = this;
        for (var i = 0; i < 7; ++i) {
            if (i != view.vo.lastidx) {
                var item = view._list.getItemByIndex(i);
                item.update();
            }
        }
    };
    AcDailyRechargeView.prototype.tick = function () {
        var view = this;
        if (view._timeCountTxt) {
            var str = view.vo.isInActivity() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
            view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown(), 17)]);
            if (this._timecdbg) {
                this._timeCountTxt.x = this._timecdbg.x + (this._timecdbg.width - this._timeCountTxt.width) * 0.5;
            }
        }
    };
    AcDailyRechargeView.prototype.rewardCallBack = function (evt) {
        if (evt.data.ret) {
            var rewards = evt.data.data.data.rewards;
            var rewardsstr = GameData.formatRewardItem(rewards);
            var pos = this.vo.lastpos;
            App.CommonUtil.playRewardFlyAction(rewardsstr, pos);
            this.vo.lastpos = null;
            var item = this._list.getItemByIndex(this.vo.lastidx);
            if (item) {
                item.update(true);
            }
            this.vo.lastidx = -1;
            var replacerewards = evt.data.data.data.replacerewards;
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }
        }
    };
    AcDailyRechargeView.prototype.getResourceList = function () {
        var view = this;
        var arr = [];
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "dailychargetop-" + code, "acwealthcarpview_skineffect1", "acwealthcarpview_servantskintxt", "acgiftreturnview_common_skintxt",
            "progress17", "progress17_bg", "collectflag", "ac_firstsightlove_special_itembg"
        ]).concat(arr);
    };
    AcDailyRechargeView.prototype.dispose = function () {
        var view = this;
        view._timecdbg = null;
        view._timeCountTxt = null;
        view._list = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_DAILYRECHARGE_GEREWARD, view.rewardCallBack, view);
        _super.prototype.dispose.call(this);
    };
    return AcDailyRechargeView;
}(AcCommonView));
__reflect(AcDailyRechargeView.prototype, "AcDailyRechargeView");
//# sourceMappingURL=AcDailyRechargeView.js.map