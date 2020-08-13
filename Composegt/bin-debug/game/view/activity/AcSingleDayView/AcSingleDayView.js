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
desc : 双十一活动
*/
var AcSingleDayView = (function (_super) {
    __extends(AcSingleDayView, _super);
    function AcSingleDayView() {
        var _this = _super.call(this) || this;
        _this.public_dot1 = null;
        _this.public_dot2 = null;
        _this.public_dot3 = null;
        _this._descTxt = null;
        _this._descTxtBg = null;
        _this._descGroup = null;
        _this._cdtxt = null;
        _this._topBg = null;
        _this._suffix = null;
        _this._count = 0;
        _this._nowDescId = 2;
        return _this;
    }
    Object.defineProperty(AcSingleDayView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDayView.prototype.getBgName = function () {
        return "acsingleday_bg" + this._suffix;
    };
    AcSingleDayView.prototype.init = function () {
        var code = this.param.data;
        if (Number(code) <= 4) {
            this._suffix = "1"; //;
        }
        else {
            this._suffix = code;
        }
        _super.prototype.init.call(this);
        // NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:1, kid:"singleDayAc"});
    };
    AcSingleDayView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            this.viewBg.width = 640;
            this.viewBg.height = 1136;
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.y = GameConfig.stageHeigth - 1136;
        }
    };
    AcSingleDayView.prototype.initView = function () {
        var _this = this;
        var view = this;
        view._nowDescId = 2;
        view._count = 0;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MODEL_ACTIVITY, this.update, this);
        var topbg = BaseBitmap.create('public_9v_bg10');
        topbg.width = GameConfig.stageWidth;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0, view.titleBg.height]);
        view.addChild(topbg);
        view._topBg = topbg;
        var timeDescTxt = ComponentManager.getTextField(LanguageManager.getlocal('acmidAutumnAcInfoTime', [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeDescTxt, topbg, [20, 10]);
        view.addChild(timeDescTxt);
        var ruleTxt = ComponentManager.getTextField(LanguageManager.getlocal('acDoubleSeventhRule'), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, ruleTxt, timeDescTxt, [0, timeDescTxt.textHeight + 5]);
        view.addChild(ruleTxt);
        var ruleDescTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayRule-" + this.param.data), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        ruleDescTxt.width = 500;
        ruleDescTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, ruleDescTxt, ruleTxt, [ruleTxt.textWidth, 0]);
        view.addChild(ruleDescTxt);
        topbg.height = ruleDescTxt.y + ruleDescTxt.textHeight + 10 - topbg.y;
        var cd = view.vo.et - 86400 - GameData.serverTime;
        var cdTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_WARN_RED3);
        cdTxt.text = cd > 0 ? (LanguageManager.getlocal('acSingleDayGetRed3', [App.DateUtil.getFormatBySecond(cd)])) : LanguageManager.getlocal('acPunishEnd');
        cdTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cdTxt, topbg, [20, 10]);
        view.addChild(cdTxt);
        view._cdtxt = cdTxt;
        var mask1 = BaseBitmap.create('acsingleday_bg_mask1');
        mask1.addTouch(function (e) {
            if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
                if (mask1.alpha == 0) {
                    mask1.alpha = 0.3;
                }
                else {
                    mask1.alpha = 0;
                }
            }
            else if (e.type == egret.TouchEvent.TOUCH_CANCEL || e.type == egret.TouchEvent.TOUCH_END) {
                mask1.alpha = 0;
            }
            if (e.type == egret.TouchEvent.TOUCH_END) {
                mask1.alpha = 0;
                ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYBUILD1VIEW, {
                    code: _this.code,
                    aid: _this.aid
                });
                // NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:3, kid:"singleDayAc"});
            }
        }, view, null, true);
        mask1.setScale(5);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, mask1, view.viewBg, [-10, 310]);
        view.addChild(mask1);
        var mask2 = BaseBitmap.create('acsingleday_bg_mask2');
        mask2.addTouch(function (e) {
            if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
                if (mask2.alpha == 0) {
                    mask2.alpha = 0.3;
                }
                else {
                    mask2.alpha = 0;
                }
            }
            else if (e.type == egret.TouchEvent.TOUCH_CANCEL) {
                mask2.alpha = 0;
            }
            if (e.type == egret.TouchEvent.TOUCH_END) {
                mask2.alpha = 0;
                ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYSKINVIEW, {
                    code: _this.code,
                    aid: _this.aid
                });
                // NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:4, kid:"singleDayAc"});
            }
        }, view, null, true);
        mask2.setScale(5);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, mask2, view.viewBg, [-5, 485]);
        view.addChild(mask2);
        var mask3 = BaseBitmap.create('acsingleday_bg_mask3');
        mask3.addTouch(function (e) {
            if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
                if (mask3.alpha == 0) {
                    mask3.alpha = 0.3;
                }
                else {
                    mask3.alpha = 0;
                }
            }
            else if (e.type == egret.TouchEvent.TOUCH_CANCEL) {
                mask3.alpha = 0;
            }
            if (e.type == egret.TouchEvent.TOUCH_END) {
                mask3.alpha = 0;
                ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYBUILD3VIEW, {
                    code: _this.code,
                    aid: _this.aid
                });
                // NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:5, kid:"singleDayAc"});
            }
        }, view, null, true);
        mask3.setScale(5);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, mask3, view.viewBg, [0, 630]);
        view.addChild(mask3);
        mask1.alpha = mask2.alpha = mask3.alpha = 0;
        var buildclip1 = ComponentManager.getCustomMovieClip('buildName', 10, 200);
        buildclip1.width = 182 * 0.73;
        buildclip1.height = 91 * 0.842;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, buildclip1, view.viewBg, [-10, 390]);
        view.addChild(buildclip1);
        buildclip1.playWithTime(-1);
        var buildclip2 = ComponentManager.getCustomMovieClip('buildName', 10, 200);
        buildclip2.width = 182 * 0.78;
        buildclip2.height = 91 * 0.9;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, buildclip2, view.viewBg, [-9, 515]);
        view.addChild(buildclip2);
        buildclip2.playWithTime(-1);
        var buildclip3 = ComponentManager.getCustomMovieClip('buildName', 10, 200);
        buildclip3.width = 182 * 1;
        buildclip3.height = 91 * 1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, buildclip3, view.viewBg, [0, 750]);
        view.addChild(buildclip3);
        buildclip3.playWithTime(-1);
        var buildtxt1 = BaseBitmap.create('acsingleday_bottomname1');
        buildtxt1.setScale(0.6);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, buildtxt1, view.viewBg, [-10, 415]);
        view.addChild(buildtxt1);
        var buildtxt2 = BaseBitmap.create('acsingleday_bottomname2');
        buildtxt2.setScale(0.7);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, buildtxt2, view.viewBg, [-10, 540]);
        view.addChild(buildtxt2);
        var buildtxt3 = BaseBitmap.create('acsingleday_bottomname3');
        buildtxt3.setScale(0.9);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, buildtxt3, view.viewBg, [0, 780]);
        view.addChild(buildtxt3);
        var button = App.CommonUtil.createMainUIIcon('acsingleday_couponIcon', 'acsingleday_couponname');
        button.width = button.height = 80;
        button.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYCOUPONVIEW, {
                code: _this.code,
                aid: _this.aid
            });
        }, view);
        button.anchorOffsetX = button.anchorOffsetY = 0;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, button, view, [30, 60]);
        view.addChild(button);
        var npc = BaseLoadBitmap.create('wife_skin_1011');
        npc.width = 640;
        npc.height = 840;
        npc.setScale(0.4);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, npc, view, [-50, 0]);
        view.addChild(npc);
        var descgroup = new BaseDisplayObjectContainer();
        descgroup.width = 320;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descgroup, npc, [npc.width * npc.scaleX - 60, 66]);
        view.addChild(descgroup);
        descgroup.alpha = 0;
        view._descGroup = descgroup;
        var descTxtBg = BaseBitmap.create('public_9v_bg11');
        descTxtBg.width = 320;
        descTxtBg.anchorOffsetX = descTxtBg.width / 2;
        descTxtBg.scaleX = -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxtBg, descgroup, [0, 0], true);
        descgroup.addChild(descTxtBg);
        view._descTxtBg = descTxtBg;
        var desctTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_BROWN);
        desctTxt.width = 290;
        desctTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, desctTxt, descTxtBg, [0, 15]);
        descgroup.addChild(desctTxt);
        view._descTxt = desctTxt;
        egret.Tween.get(descgroup, { loop: true }).call(function () {
            var period = view.vo.getCurPeriod();
            var desc = '';
            var param = [];
            var code = view.code;
            var rechargeFlag = view.vo.getpublicRedhot2();
            var usegemFlag = view.vo.getpublicRedhot3();
            if (period == 1) {
                if (view.vo.getIsCollectMax()) {
                    var tmp = view.getPeriodText();
                    desc = tmp.desc;
                    param = tmp.param;
                }
                else {
                    desc = "acSingleDayDesc1-" + _this._suffix;
                }
            }
            else {
                var tmp = view.getPeriodText();
                desc = tmp.desc;
                param = tmp.param;
            }
            desctTxt.text = LanguageManager.getlocal(desc, param);
            descTxtBg.height = desctTxt.textHeight + 50;
            descgroup.height = descTxtBg.height + 10;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, desctTxt, descTxtBg, [0, 15]);
        }, view).to({ alpha: 1 }, 2000).wait(3000).to({ alpha: 0 }, 1500).call(function () {
            view._count = 0;
        }, view).wait(7000);
        //红点1
        var public_dot1 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot1);
        ;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, public_dot1, buildtxt1, [buildtxt1.width * buildtxt1.scaleX + 2, -7]);
        this.public_dot1 = public_dot1;
        // //红点2
        // let public_dot2 =BaseBitmap.create("public_dot2");
        // this.addChild(public_dot2); ;
        // public_dot2.x = 280;//this.tabbarGroup.getChildAt(1).x + this.tabbarGroup.getChildAt(1).width-45;
        // public_dot2.y = this.tabbarGroup.y+10; 
        // this.public_dot2 = public_dot2;
        //  //红点3
        // let public_dot3 = BaseBitmap.create("public_dot2");
        // this.addChild(public_dot3); ;
        // public_dot3.x = 430;//this.tabbarGroup.getChildAt(2).x + this.tabbarGroup.getChildAt(2).width-45;
        // public_dot3.y = this.tabbarGroup.y+10; 
        // this.public_dot3 = public_dot3; 
        this.update();
        // ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYSKINVIEW,{aid:this.aid,code:this.code});
        //  ViewController.getInstance().openView(ViewConst.BASE.ACSINGLEDAYENVELOPEVIEW);
        if (LocalStorageManager.get("" + view.acTivityId + Api.playerVoApi.getPlayerID()) == '1') {
        }
        else {
            LocalStorageManager.set("" + view.acTivityId + Api.playerVoApi.getPlayerID(), '1');
            ViewController.getInstance().openView(ViewConst.BASE.ACSINGLEDAYROOKIEVIEW, {
                f: view.avgendCallback,
                o: view,
                aid: view.aid,
                code: view.code
            });
        }
        //云动画
        var cloud1 = BaseBitmap.create('cloud1');
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cloud1, view.viewBg, [-cloud1.width, 300]);
        view.addChild(cloud1);
        egret.Tween.get(cloud1, { loop: true }).wait(5000).to({ x: -cloud1.width }, 15000).call(function () {
            cloud1.x = GameConfig.stageWidth + cloud1.width;
        }, view);
        var cloud3 = BaseBitmap.create('cloud3');
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cloud3, view.viewBg, [-cloud3.width, 450]);
        view.addChild(cloud3);
        egret.Tween.get(cloud3, { loop: true }).to({ x: -cloud3.width }, 15000).call(function () {
            cloud3.x = GameConfig.stageWidth + cloud3.width;
        }, view);
        var cloud2 = BaseBitmap.create('cloud2');
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cloud2, view.viewBg, [-cloud2.width, 600]);
        view.addChild(cloud2);
        egret.Tween.get(cloud2, { loop: true }).to({ x: GameConfig.stageWidth + cloud2.width }, 20000).call(function () {
            cloud2.x = -cloud2.width;
        }, view);
        var cloud4 = BaseBitmap.create('cloud2');
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cloud4, view.viewBg, [-cloud4.width, 650]);
        view.addChild(cloud4);
        egret.Tween.get(cloud4, { loop: true }).to({ x: -cloud4.width }, 20000).call(function () {
            cloud4.x = GameConfig.stageWidth + cloud4.width;
        }, view);
    };
    AcSingleDayView.prototype.avgendCallback = function () {
        var view = this;
    };
    AcSingleDayView.prototype.getRuleInfo = function () {
        return "acSingleDayRuleInfo-" + this._suffix;
    };
    AcSingleDayView.prototype.getRuleParam = function () {
        var vo = this.vo;
        var cfg = this.cfg;
        return [
            (cfg.startTime / 3600).toString(),
            ((cfg.startTime + cfg.luckyPacketCD) / 3600).toString(),
            String(cfg.luckyPacketPurchase / 3600),
            cfg.couponLimit.toString()
        ];
    };
    AcSingleDayView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acsingleday_bottombg",
            "acsingleday_bottomIcon1",
            "acsingleday_bottomIcon2",
            "acsingleday_bottomIcon3",
            "acsingleday_bottomname1",
            "acsingleday_bottomname2",
            "acsingleday_bottomname3",
            "acsingleday_bg" + this._suffix,
            "acsingleday_bg_mask1",
            "acsingleday_bg_mask2",
            "acsingleday_bg_mask3",
            "buildName",
            "cloud1",
            "cloud2",
            "cloud3"
        ]);
    };
    AcSingleDayView.prototype.getPeriodText = function () {
        var view = this;
        var desc = '';
        var param = [];
        var period = view.vo.getCurPeriod();
        var code = view.code;
        var rechargeFlag = view.vo.getpublicRedhot2();
        var usegemFlag = view.vo.getpublicRedhot3();
        if (rechargeFlag && usegemFlag) {
            desc = "acSingleDayDesc" + view._nowDescId + "-" + this._suffix;
            view._nowDescId = 5 - view._nowDescId;
        }
        else if (!(rechargeFlag && usegemFlag)) {
            var rid = App.MathUtil.getRandom(4, 10);
            desc = "acSingleDayDesc" + rid + "-" + code;
            if (rid == 7) {
                desc = "acSingleDayDesc" + rid + "-" + code;
            }
            else {
                desc = "acSingleDayDesc" + rid + "-" + this._suffix;
            }
            // if(rid == 4){
            //     // 已充值 还差
            //     let sub = 0;
            //     let now = view.vo.getChargeNum();
            //     for(let i in view.cfg.recharge){
            //         let unit : Config.AcCfg.SDRechargeItemCfg = view.cfg.recharge[i];
            //         if(now < unit.needGem){
            //             sub = unit.needGem - now;
            //             break;
            //         }
            //     }
            //     if(sub <= 0){
            //         desc = `acSingleDayDesc7-${code}`;
            //     }
            //     else{
            //         param = [now,sub];
            //     }
            // }
            // else if(rid == 5){
            //     //已消费 还差
            //     let sub = 0;
            //     let use = view.vo.getUseGemNum();
            //     for(let i in view.cfg.recharge){
            //         let unit : Config.AcCfg.SDUseGemItemCfg = view.cfg.recharge[i];
            //         if(use < unit.needGem){
            //             sub = unit.needGem - use;
            //             break;
            //         }
            //     }
            //     if(sub <= 0){
            //         desc = `acSingleDayDesc7-${code}`;
            //     }
            //     else{
            //         param = [use,sub];
            //     }
            // }
        }
        else {
            desc = "acSingleDayDesc" + (rechargeFlag ? 2 : 3) + "-" + this._suffix;
        }
        return {
            desc: desc,
            param: param,
        };
    };
    AcSingleDayView.prototype.tick = function () {
        var view = this;
        view.update();
        var cd = view.vo.et - 86400 - GameData.serverTime;
        if (cd > 0) {
            view._cdtxt.text = LanguageManager.getlocal('acSingleDayGetRed3', [App.DateUtil.getFormatBySecond(cd)]);
        }
        else {
            view._cdtxt.text = LanguageManager.getlocal('acPunishEnd');
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view._cdtxt, view._topBg, [20, 10]);
    };
    AcSingleDayView.prototype.update = function () {
        //第一页 红点
        var vo = this.vo;
        if (!vo) {
            return;
        }
        if (this.public_dot1) {
            this.public_dot1.visible = vo.getpublicRedhot();
        }
        //  //第二页 红点
        //  if(this.public_dot2)
        //  {
        //       this.public_dot2.visible =  vo.getpublicRedhot2();
        //  }    
        //  //第三页 红点
        //  if(this.public_dot3)
        //  {
        //       this.public_dot3.visible =  vo.getpublicRedhot3();
        //  }    
    };
    AcSingleDayView.prototype.getTitleStr = function () {
        return "acSingleDay-" + this._suffix + "_Title";
    };
    AcSingleDayView.prototype.dispose = function () {
        var view = this;
        view.public_dot1 = null;
        view.public_dot2 = null;
        view.public_dot3 = null;
        view._descTxt = null;
        view._descTxtBg = null;
        egret.Tween.removeTweens(view._descGroup);
        view._descGroup = null;
        view._count = 0;
        view._nowDescId = 0;
        view._cdtxt = null;
        view._topBg = null;
        this._suffix = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayView;
}(AcCommonView));
__reflect(AcSingleDayView.prototype, "AcSingleDayView");
