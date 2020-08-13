/*
    author : qianjun
    desc : 魏征活动
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
var AcWeiZhengView = (function (_super) {
    __extends(AcWeiZhengView, _super);
    function AcWeiZhengView() {
        var _this = _super.call(this) || this;
        _this._timeCountTxt = null;
        _this._timebg = null;
        _this._taskbtn1 = null;
        _this._taskbtn2 = null;
        _this._taskbtn3 = null;
        _this._light = null;
        _this._nowday = 1;
        _this._rechatgebtn = null;
        _this._progressBar = null;
        _this._exchangeBtn = null;
        _this._exchangeIcon = null;
        _this._tipGroup = null;
        _this._exchangeTxt = null;
        return _this;
    }
    // 标题背景名称
    AcWeiZhengView.prototype.getTitleBgName = function () {
        return "weizhengtitle-" + this.getUiCode();
    };
    AcWeiZhengView.prototype.getTitleStr = function () {
        return null;
    };
    AcWeiZhengView.prototype.getRuleInfo = function () {
        return "acWeiZhengRule-" + this.getUiCode();
    };
    Object.defineProperty(AcWeiZhengView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeiZhengView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeiZhengView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcWeiZhengView.prototype.initBg = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
        }
    };
    AcWeiZhengView.prototype.getUiCode = function () {
        var code = "";
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
    AcWeiZhengView.prototype.getBgName = function () {
        var code = this.getUiCode();
        return "weizhengbg-" + code;
    };
    AcWeiZhengView.prototype.getResourceList = function () {
        var view = this;
        var code = view.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "acweizheng" + code, "weizhengbg-" + code, "acliangbiographyview_common_acbg", "progress3", "progress3_bg", "specialview_commoni_namebg"
        ]);
    };
    AcWeiZhengView.prototype.initView = function () {
        var view = this;
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEIZHENG_EXCHANGE), this.rewardCallBack, this);
        //top背景图
        var topbg = BaseBitmap.create("acliangbiographyview_common_acbg");
        topbg.width = GameConfig.stageWidth;
        view.addChildAt(topbg, this.getChildIndex(this.container));
        var timeTxt = ComponentManager.getTextField("" + view.vo.getAcLocalTime(true), 20);
        timeTxt.width = 600;
        timeTxt.lineSpacing = 5;
        view.addChild(timeTxt);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWeiZhengTip1-" + code), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 600;
        tipTxt.lineSpacing = 5;
        view.addChild(tipTxt);
        topbg.height = timeTxt.textHeight + 5 + tipTxt.textHeight + 18;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0, view.titleBg.height - 7]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, topbg, [20, 10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, timeTxt, [0, timeTxt.textHeight + 5]);
        //倒计时位置 
        var timebg = BaseBitmap.create("public_9_bg61");
        view.addChild(timebg);
        timebg.y = (topbg.y + topbg.height - 14);
        view._timebg = timebg;
        var str = view.vo.isInActy() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
        var tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        view.addChild(tip2Text);
        view._timeCountTxt = tip2Text;
        tip2Text.y = timebg.y + 6;
        timebg.width = tip2Text.width + 50;
        timebg.x = GameConfig.stageWidth - timebg.width - 12;
        tip2Text.x = timebg.x + (timebg.width - tip2Text.width) * 0.5;
        //底部书桌
        var bottom = BaseBitmap.create("weizhengdesk-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottom, view);
        //中部形象
        var skinbone = view.cfg.getSkinBone(view.getUiCode());
        var boneName = undefined;
        var wife = null;
        if (skinbone) {
            boneName = skinbone + "_ske";
        }
        var obj = {
            1: 'servant',
        };
        var isDragon = (!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon();
        if (isDragon) {
            wife = App.DragonBonesUtil.getLoadDragonBones(skinbone);
            if (obj[view.getUiCode()] == "wife") {
                wife.width = 354;
                wife.height = 611;
                wife.setAnchorOffset(-138.5, -610);
                if (PlatformManager.checkIsTextHorizontal()) {
                    wife.setAnchorOffset(-138.5, -650);
                }
                wife.setScale(0.9);
            }
            else {
                // wife.scaleX = 1.05;
                // wife.scaleY = 1.05;
                // wife.width = 431;
                // wife.height = 524;
                wife.y = bottom.y;
                wife.x = 320;
            }
        }
        else {
            wife = BaseLoadBitmap.create("skin_full_" + view.cfg.getSkinId(code));
            wife.width = 405;
            wife.height = 467;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, wife, bottom, [0, bottom.height - 20]);
        }
        view.addChild(wife);
        wife.addTouchTap(function () {
            var item = GameData.formatRewardItem(view.cfg.claim[0].costShu)[0];
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONSKINVIEW, {
                skinId: view.cfg.getSkinId(view.getUiCode()),
                needTxt: "acWeiZhengTip9-" + code,
                need: item.num
            });
        }, view);
        //气泡提示
        var bubbleTopGroup = new BaseDisplayObjectContainer();
        view.addChild(bubbleTopGroup);
        bubbleTopGroup.alpha = 0;
        var descBg = BaseBitmap.create('public_9_bg42');
        view.addChild(descBg);
        bubbleTopGroup.addChild(descBg);
        var arrowBM = BaseBitmap.create("public_9_bg13_tail");
        arrowBM.anchorOffsetX = arrowBM.width / 2;
        arrowBM.anchorOffsetY = arrowBM.height / 2;
        bubbleTopGroup.addChild(arrowBM);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWeiZhengServantTip0-" + code), 20, TextFieldConst.COLOR_BLACK);
        descTxt.lineSpacing = 5;
        bubbleTopGroup.addChild(descTxt);
        descBg.width = descTxt.textWidth + 40;
        descBg.height = descTxt.textHeight + 36;
        bubbleTopGroup.width = descBg.width;
        bubbleTopGroup.height = descBg.height + arrowBM.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, bubbleTopGroup, [0, 0], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [arrowBM.anchorOffsetX + 15, arrowBM.anchorOffsetY + descBg.height - 13]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, bubbleTopGroup, view, [8, bottom.y - 500]);
        var count = 1;
        egret.Tween.get(bubbleTopGroup, { loop: true }).to({ alpha: 1 }, 700).wait(5000).to({ alpha: 0 }, 700).call(function () {
            ++count;
            descTxt.text = LanguageManager.getlocal("acWeiZhengServantTip" + count % 5 + "-" + code);
        }, view).wait(5000);
        //底部任务
        view.addChild(bottom);
        var nowday = view.vo.getNowDay();
        view._nowday = nowday;
        var _loop_1 = function (i) {
            var btn = ComponentManager.getButton("weizhengdesktask" + i + "-" + code, "", function () {
                //打开弹窗
                ViewController.getInstance().openView(ViewConst.POPUP.ACWEIZHENGTASKVIEW, {
                    aid: view.aid,
                    code: view.code,
                    day: i
                });
            }, view);
            view.addChild(btn);
            view["_taskbtn" + i] = btn;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, btn, bottom, [155 + (i - 1) * (btn.width + 20), 0]);
            btn.setGray(i < nowday);
            if (nowday == i && view.vo.isInActy()) {
                var light = BaseBitmap.create("public_9_bg63");
                light.width = 125;
                light.height = 188;
                light.setPosition(btn.x - 17, btn.y - 15);
                view.addChild(light);
                egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
                view._light = light;
            }
        };
        for (var i = 1; i <= 3; ++i) {
            _loop_1(i);
        }
        //充值任务
        var rechargebtn = ComponentManager.getButton("weizhengrecharge-" + code, "", function () {
            //打开充值弹窗
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEIZHENGRECHARGEVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        view.addChild(rechargebtn);
        rechargebtn.setScale(0.5);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rechargebtn, bottom);
        view._rechatgebtn = rechargebtn;
        if (view.vo.getpublicRedhot2()) {
            App.CommonUtil.addIconToBDOC(rechargebtn);
            var reddot = rechargebtn.getChildByName("reddot");
            if (reddot) {
                reddot.setScale(2);
                reddot.x = 200;
                reddot.y = 0;
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(rechargebtn);
        }
        var txt = BaseBitmap.create("weizhengrechargetxt-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, txt, rechargebtn, [0, 10]);
        view.addChild(txt);
        //进度条
        var progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 455);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progress, bottom, [30, -progress.height - 50]);
        view._progressBar = progress;
        view.addChild(progress);
        var icon = BaseLoadBitmap.create("");
        icon.width = icon.height = 100;
        view._exchangeIcon = icon;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, progress, [-icon.width / 2, 0]);
        view.addChild(icon);
        var sid = view.cfg.getSkinId(view.getUiCode());
        var scfg = Config.ServantskinCfg.getServantSkinItemById(sid);
        var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "exchange", function () {
            if (view.vo.isEnd) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            var haveskin = !scfg.canExchangeItem();
            var item = GameData.formatRewardItem(view.cfg.claim[haveskin ? 1 : 0].costShu)[0];
            var num = Api.itemVoApi.getItemNumInfoVoById(item.id);
            if ((!haveskin && item.num > num) || (haveskin && num == 0)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acChristmasViewTip1"));
                return;
            }
            //兑换
            NetManager.request(NetRequestConst.REQUEST_WEIZHENG_EXCHANGE, {
                activeId: view.acTivityId,
            });
        }, view);
        view.addChild(exchangeBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, exchangeBtn, progress, [progress.width + 6, 0]);
        view._exchangeBtn = exchangeBtn;
        view.addChild(exchangeBtn);
        var haveskin = !scfg.canExchangeItem(); //view.vo.haveSkin(code);
        var item = GameData.formatRewardItem(view.cfg.claim[haveskin ? 1 : 0].costShu)[0];
        var num = Api.itemVoApi.getItemNumInfoVoById(item.id);
        if ((haveskin && num == 0) || (!haveskin && item.num > num)) {
            exchangeBtn.setGray(true);
        }
        else {
            exchangeBtn.setGray(false);
        }
        var tipGroup = new BaseDisplayObjectContainer();
        view.addChild(tipGroup);
        view._tipGroup = tipGroup;
        var tipBg = BaseBitmap.create("specialview_commoni_namebg");
        var exchangeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWeiZhengTip2-" + code, []), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._exchangeTxt = exchangeTxt;
        tipBg.width = exchangeTxt.textWidth + 30;
        tipGroup.addChild(tipBg);
        tipGroup.addChild(exchangeTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, exchangeTxt, tipBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipGroup, progress, [0, progress.height]);
        view.freshView();
    };
    AcWeiZhengView.prototype.tick = function () {
        var view = this;
        var str = view.vo.isInActy() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
        view._timebg.x = GameConfig.stageWidth - view._timebg.width - 12;
        view._timeCountTxt.x = view._timebg.x + (view._timebg.width - view._timeCountTxt.width) * 0.5;
    };
    AcWeiZhengView.prototype.freshView = function () {
        var view = this;
        var code = view.getUiCode();
        var day = view.vo.getNowDay();
        if (day != view._nowday) {
            if (!view.vo.isInActy()) {
                egret.Tween.removeTweens(view._light);
                view._light.dispose();
                view._light = null;
            }
            for (var i = 1; i < 4; ++i) {
                if (day == i && view._light) {
                    var btn = view["_taskbtn" + i];
                    if (view._light) {
                        view._light.x = btn.x - 17;
                        view._light.y = btn.y - 15;
                    }
                }
            }
        }
        view._nowday = day;
        for (var i = 1; i < 4; ++i) {
            var btn = view["_taskbtn" + i];
            btn.setGray(i != day);
            if (view.vo.canDayRewardLq(i)) {
                App.CommonUtil.addIconToBDOC(btn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(btn);
            }
        }
        //进度刷新
        var sid = view.cfg.getSkinId(view.getUiCode());
        var scfg = Config.ServantskinCfg.getServantSkinItemById(sid);
        var haveskin = !scfg.canExchangeItem(); //view.vo.haveSkin(code);
        if (haveskin) {
            var change = GameData.formatRewardItem(view.cfg.claim[haveskin ? 1 : 0].getReward)[0];
            view._exchangeIcon.setload(change.icon);
        }
        var item = GameData.formatRewardItem(view.cfg.claim[haveskin ? 1 : 0].costShu)[0];
        var num = Api.itemVoApi.getItemNumInfoVoById(item.id);
        view._progressBar.setPercentage(num / item.num, num + " / " + item.num);
        view._exchangeTxt.text = LanguageManager.getlocal("acWeiZhengTip2-" + code, [num.toString()]);
        view._tipGroup.visible = haveskin;
        //红点
        if (view.vo.getpublicRedhot2()) {
            App.CommonUtil.addIconToBDOC(view._rechatgebtn);
            var reddot = view._rechatgebtn.getChildByName("reddot");
            if (reddot) {
                reddot.setScale(2);
                reddot.x = 200;
                reddot.y = 0;
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._rechatgebtn);
        }
        if ((haveskin && num == 0) || (!haveskin && item.num > num)) {
            view._exchangeBtn.setGray(true);
        }
        else {
            view._exchangeBtn.setGray(false);
        }
    };
    /**
     * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
     */
    AcWeiZhengView.prototype.getReportTipData = function () {
        var key = AcConst.AID_WEIZHENG + "-" + this.code + "report-" + Api.playerVoApi.getPlayerID() + "-" + this.vo.st;
        var storage = LocalStorageManager.get(key);
        if (!storage) {
            LocalStorageManager.set(key, "1");
            return { title: { key: "acWeiZhengreporttitle-" + this.getUiCode() }, msg: { key: "acWeiZhengreportmsg-" + this.getUiCode() } };
        }
        else {
            return null;
        }
    };
    AcWeiZhengView.prototype.rewardCallBack = function (evt) {
        var view = this;
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        var cfg = view.cfg.recharge[view.vo.lastidx];
        var str = rewards;
        var rewardList = GameData.formatRewardItem(str);
        var pos = this.vo.lastpos;
        App.CommonUtil.playRewardFlyAction(rewardList, new egret.Point(view._exchangeBtn.x + 70, view._exchangeBtn.y));
    };
    AcWeiZhengView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_WEIZHENG_EXCHANGE), this.rewardCallBack, this);
        view._timeCountTxt = null;
        view._timebg = null;
        view._taskbtn1 = null;
        view._taskbtn2 = null;
        view._taskbtn3 = null;
        if (view._light) {
            egret.Tween.removeTweens(view._light);
            view._light.dispose();
            view._light = null;
        }
        view._light = null;
        view._nowday = 1;
        view._rechatgebtn = null;
        view._progressBar = null;
        view._exchangeBtn = null;
        view._exchangeIcon.dispose();
        view._exchangeIcon = null;
        view._tipGroup.dispose();
        view._tipGroup = null;
        view._exchangeTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcWeiZhengView;
}(AcCommonView));
__reflect(AcWeiZhengView.prototype, "AcWeiZhengView");
//# sourceMappingURL=AcWeiZhengView.js.map