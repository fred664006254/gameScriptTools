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
desc : 幸运翻牌活动
*/
var AcLuckyDrawView = (function (_super) {
    __extends(AcLuckyDrawView, _super);
    function AcLuckyDrawView() {
        var _this = _super.call(this) || this;
        _this._cdText = null;
        _this._chargeBtn = null;
        _this._getOneBtn = null;
        _this._getAllBtn = null;
        _this._oneBtnGroup = null;
        _this._progressBubbleGroup = null;
        _this._bottomBg = null;
        _this._progressBar = null;
        _this._startPercent = 0;
        _this._maxLength = 1;
        _this._curLuckyTxt = null;
        _this._numDescTF = null;
        _this._boxRewardImg = null;
        _this._boxLightBM = null;
        _this._lightBall = null;
        _this._progressBg = null;
        _this._progressTF = null;
        _this._progressBM = null;
        _this._progressLight = null;
        /**鞭炮的 Container*/
        _this._bangerContainer = null;
        _this._bangerInfo = [];
        _this._log = null;
        _this._loopTopBg = null;
        _this._isSecond = false;
        _this._isPlay = false;
        /**红点 */
        _this._redDot = null;
        _this._midBtnGroup = null;
        _this._numTxt = null;
        _this._costNumTxt2 = null;
        _this._freeTxt = null;
        _this.timebg = null;
        _this.tip2Text = null;
        return _this;
    }
    Object.defineProperty(AcLuckyDrawView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLuckyDrawView.prototype.preInit = function () {
        _super.prototype.preInit.call(this);
        var view = this;
        if (this.getTypecode == 5) {
            var localkey = this.acTivityId + this.vo.et + Api.playerVoApi.getPlayerID();
            var lastTime = 0;
            var timeStr = LocalStorageManager.get(localkey);
            if (timeStr && timeStr != "") {
                lastTime = Number(timeStr);
            }
            if (!App.DateUtil.checkIsToday(lastTime)) {
                LocalStorageManager.set(localkey, String(GameData.serverTime));
                ViewController.getInstance().openView(ViewConst.BASE.ACLUCKYDRAWPREVIEW, {
                    aid: view.aid,
                    code: view.code,
                });
            }
        }
    };
    /**
     * 重写区
    */
    AcLuckyDrawView.prototype.getRuleInfo = function () {
        if (this.getTypecode == 5) {
            if (Api.switchVoApi.checkServantRefuseBattle()) {
                return "acLuckyDrawRuleInfo-5_2";
            }
            else {
                return "acLuckyDrawRuleInfo-5";
            }
        }
        return "acLuckyDrawRuleInfo-" + this.code;
    };
    AcLuckyDrawView.prototype.getTitleStr = function () {
        return null;
    };
    AcLuckyDrawView.prototype.getTitleBgName = function () {
        return "luckydrawtitle-" + this.getUiCode();
    };
    AcLuckyDrawView.prototype.getProbablyInfo = function () {
        return "acLuckyDrawProbablyInfo-" + this.code;
    };
    AcLuckyDrawView.prototype.getBgName = function () {
        return "luckydrawbg-" + this.getUiCode();
    };
    Object.defineProperty(AcLuckyDrawView.prototype, "getTypecode", {
        get: function () {
            var code = 1;
            switch (Number(this.code)) {
                case 1:
                case 2:
                    code = 1;
                    break;
                case 5:
                case 6:
                    code = 5;
                    break;
            }
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcLuckyDrawView.prototype.getResourceList = function () {
        var view = this;
        var code = view.getUiCode();
        var effectcode = view.getTypecode;
        var arr = [];
        arr.push("dragonboatitem" + code);
        if (this.getTypecode == 5) {
            arr.push("acwealthcarpview_skineffect");
            arr.push("acnationalday_common_rewardtxt");
            arr.push("luckdrawawardnamebg-" + code);
            arr.push("luckdrawscrollbg1-" + code);
            arr.push("luckdrawscrollbg2-" + code);
            arr.push("luckdraw_pretitle-" + code);
        }
        return _super.prototype.getResourceList.call(this).concat([
            "luckydrawwordbg", "luckydrawbg-" + code, "luckdrawprogressbg-" + code, "luckydraw-" + code, "arena_bottom", "acwealthcomingview_progresslight",
            "progress12", "progress12_bg", "acwealthcomingview_numbg", "acwealthcomingview_box_1", "acwealthcomingview_box_light", "acwealthcomingview_lightball", "acwealthcomingview_box_2",
            "boxboomeffect", "boxrewardfly-" + effectcode, "ldcardcircle1-" + effectcode, "ldcardcircle2-" + effectcode, "ldcardhighlight-" + effectcode, "ldcardlight1-" + effectcode, "ldcardlight2-" + effectcode, "ldcardscan",
            "ldcardparticle", "ldcardparticle_json", "luckdrawnpc-" + code
        ]).concat(arr);
    };
    /**
     * 自定义实现
    */
    AcLuckyDrawView.prototype.initView = function () {
        var _this = this;
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var code = view.code;
        /***顶部信息***/
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM, view.freshView, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWLOTTERY), view.pickCallBack, view);
        var topBg = BaseBitmap.create("luckydrawwordbg");
        if (this.getTypecode == 5) {
            topBg = BaseLoadBitmap.create("luckdrawdescbg-5");
        }
        topBg.width = GameConfig.stageWidth;
        view.addChild(topBg);
        //活动日期
        var tip1Text = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawTopTip1-" + code, [view.vo.acTimeAndHour]), 18);
        view.addChild(tip1Text);
        var str = '';
        if (view.vo.isInActivity()) {
            str = App.DateUtil.getFormatBySecond(view.vo.getCountDown());
        }
        else {
            str = "<font color=0x21eb39>" + LanguageManager.getlocal("acPunishEnd") + "</font>";
        }
        var tip3Text = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawTopTip3-" + code), 18);
        tip3Text.lineSpacing = 5;
        tip3Text.width = 610;
        view.addChild(tip3Text);
        topBg.height = tip1Text.textHeight + tip3Text.textHeight + 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.titleBg, [0, view.titleBg.height - 10]);
        //倒计时位置 
        var timebg = BaseBitmap.create("public_9_bg61");
        view.addChild(timebg);
        timebg.x = 380;
        timebg.y = (topBg.y + topBg.height - timebg.height) * 0.5 + 97;
        this.timebg = timebg;
        var tip2Text = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawTopTip2-" + code, [str]), 20);
        view.addChild(tip2Text);
        view._cdText = tip2Text;
        tip2Text.x = timebg.x + 25;
        tip2Text.y = timebg.y + 4;
        timebg.width = tip2Text.width + 50;
        if (timebg.width < 270) {
            timebg.width = 270;
            timebg.x = 350;
            tip2Text.x = this.timebg.x + (timebg.width - tip2Text.width) * 0.5;
        }
        this.tip2Text = tip2Text;
        // let tmpH = tip1Text.textHeight + tip2Text.textHeight + tip3Text.textHeight;
        // let tmpY = Math.max(0, topBg.height - tmpH) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip1Text, topBg, [10, 17]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip2Text, tip1Text, [0,tip1Text.textHeight + 10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip3Text, tip1Text, [0, tip1Text.textHeight + 10]);
        if (this.getTypecode == 5) {
            //  topBg.height = tip1Text.textHeight  + tip3Text.textHeight + 50;
            //     this.timebg.dispose();
            //     this.c = null;
            //     tip1Text.size = 18;
            //     tip2Text.size = 18;
            //     tip3Text.lineSpacing = 2;
            //     App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip1Text, topBg, [10,12]);
            //     App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip2Text, tip1Text, [0,tip1Text.textHeight + 3]);
            //     App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip3Text, tip2Text, [0,tip2Text.textHeight + 3]);
        }
        /***中部展示***/
        //龙骨
        var skinbone = view.cfg.getSkinBone(view.code);
        var boneName = undefined;
        var wife = null;
        if (skinbone) {
            boneName = skinbone + "_ske";
        }
        var obj = {
            1: 'wife',
            2: 'servant',
            3: 'wife',
            4: 'servant',
            5: 'wife',
            6: 'wife',
            7: 'wife',
            8: 'wife',
        };
        var isDragon = (!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon();
        // isDragon = false;
        if (isDragon) {
            wife = App.DragonBonesUtil.getLoadDragonBones(skinbone);
            if (obj[view.code] == "wife") {
                wife.width = 354;
                wife.height = 611;
                wife.setAnchorOffset(-138.5, -610);
                if (PlatformManager.checkIsTextHorizontal()) {
                    wife.setAnchorOffset(-138.5, -650);
                }
                wife.setScale(0.9);
                if (view.code == "7" || view.code == "8") {
                    wife.setScale(0.8);
                }
            }
            else {
                wife.width = 431;
                wife.height = 524;
                wife.setAnchorOffset(wife.width / 2, wife.height / 2);
                wife.scaleX = -1.05;
                wife.scaleY = 1.05;
            }
        }
        else {
            if (this.getTypecode == 5) {
                var wcfg = Config.WifeCfg.getWifeCfgById(this.cfg.wife);
                wife = BaseLoadBitmap.create(wcfg.body);
                wife.width = 365;
                wife.height = 486;
            }
            else {
                wife = BaseBitmap.create("luckdrawnpc-" + this.getUiCode());
            }
        }
        view.addChild(wife);
        //气泡提示
        var bubbleTopGroup = new BaseDisplayObjectContainer();
        view.addChild(bubbleTopGroup);
        var descBg = BaseBitmap.create('public_9_bg42');
        view.addChild(descBg);
        bubbleTopGroup.addChild(descBg);
        var arrowBM = BaseBitmap.create("public_9_bg13_tail");
        arrowBM.anchorOffsetX = arrowBM.width / 2;
        arrowBM.anchorOffsetY = arrowBM.height / 2;
        bubbleTopGroup.addChild(arrowBM);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawAwardTip1-" + view.code, [view.cfg.getTotalProgress().toString(), view.cfg.getSkinName(view.code)]), 20, TextFieldConst.COLOR_BLACK);
        descTxt.lineSpacing = 5;
        bubbleTopGroup.addChild(descTxt);
        descBg.width = descTxt.textWidth + 40;
        descBg.height = descTxt.textHeight + 36;
        bubbleTopGroup.width = descBg.width;
        bubbleTopGroup.height = descBg.height + arrowBM.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, bubbleTopGroup, [0, 0], true);
        if (PlatformManager.checkIsThSp()) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, bubbleTopGroup, [25, 0], true);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [arrowBM.anchorOffsetX + 15, arrowBM.anchorOffsetY + descBg.height - 13]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg);
        //egret.Tween.get(bubbleTopGroup,{loop : true}).to({alhpa : })
        /***底部按钮***/
        var bottombg = BaseBitmap.create("arena_bottom");
        bottombg.height = 140;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view);
        view.addChild(bottombg);
        view._bottomBg = bottombg;
        var oneBtnGroup = new BaseDisplayObjectContainer();
        oneBtnGroup.height = bottombg.height;
        view.addChild(oneBtnGroup);
        view._oneBtnGroup = oneBtnGroup;
        var oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acLuckyDrawBtn" + 1 + "-" + view.code, function () {
            if (view._isPlay) {
                return;
            }
            if (!view.vo.isInActy()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (view.vo.getLuckyCoin() < 1 && !view.vo.isFree()) {
                // ViewController.getInstance().openView(ViewConst.COMMON.ACLUCKYDRAWCHARGEVIEW, {
                //     aid: this.aid, 
                //     code: this.code, 
                // });
                ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWPOPUPVIEW2, {
                    aid: _this.aid,
                    code: _this.code,
                });
                return;
            }
            //翻牌一次
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWLOTTERY, {
                activeId: view.vo.aidAndCode,
                isBatch: 0
            });
        }, view);
        view._getOneBtn = oneBtn;
        // oneBtnGroup.width = 151;
        // oneBtnGroup.addChild(oneBtn);
        view.addChild(oneBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, oneBtn, bottombg, [85, 32]);
        //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, oneBtn, oneBtnGroup, [0,0], true);
        var costNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawTip4-" + code, ['1']), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        oneBtnGroup.addChild(costNumTxt);
        var icon = BaseLoadBitmap.create("luckdrawluckyicon2-" + this.getUiCode());
        icon.width = icon.height = 50;
        oneBtnGroup.addChild(icon);
        var costNum = ComponentManager.getTextField("1", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        oneBtnGroup.addChild(costNum);
        oneBtnGroup.width = icon.width + costNumTxt.textWidth + costNum.textWidth - 3;
        oneBtnGroup.height = icon.height;
        oneBtnGroup.visible = !view.vo.isFree();
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, oneBtnGroup, oneBtn, [0, -oneBtnGroup.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costNumTxt, oneBtnGroup, [0, 0], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, costNumTxt, [costNumTxt.width - 3, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costNum, icon, [50, 0]);
        var allBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acLuckyDrawBtn2-" + view.code, function () {
            if (view._isPlay) {
                return;
            }
            if (!view.vo.isInActy()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (view.vo.getLuckyCoin() == 0) {
                //App.CommonUtil.showTip(LanguageManager.getlocal(`acLuckyDrawTip1-${view.code}`));
                // ViewController.getInstance().openView(ViewConst.COMMON.ACLUCKYDRAWCHARGEVIEW, {
                //     aid: this.aid, 
                //     code: this.code, 
                // });  
                ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWPOPUPVIEW2, {
                    aid: _this.aid,
                    code: _this.code,
                });
                return;
            }
            // if(view.vo.getLuckyCoin() < view.cfg.autoDraw){
            //     App.CommonUtil.showTip(LanguageManager.getlocal(`acLuckyDrawTip1-${view.code}`));
            //     return;
            // }
            //一键翻牌
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWLOTTERY, {
                activeId: view.vo.aidAndCode,
                isBatch: view.vo.getLuckyCoin() == 1 ? 0 : 1
            });
            //view.pickCallBack();
        }, view);
        view._getAllBtn = allBtn;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, allBtn, bottombg, [85, 32]);
        view.addChild(allBtn);
        var icon2 = BaseLoadBitmap.create("luckdrawluckyicon2-" + this.getUiCode());
        icon2.width = icon2.height = 50;
        icon2.name = "itemicon2";
        view.addChild(icon2);
        var costTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawTip4-" + code, [String(Math.min(10, view.vo.getLuckyCoin()))]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(costTxt2);
        var costNumTxt2 = ComponentManager.getTextField(String(Math.min(10, Math.max(view.vo.getLuckyCoin(), 1))), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(costNumTxt2);
        view._costNumTxt2 = costNumTxt2;
        var tmpX2 = (allBtn.width - icon2.width - costNumTxt2.textWidth - costTxt2.textWidth + 3) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, costTxt2, allBtn, [tmpX2, -costTxt2.height - 13]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon2, costTxt2, [costTxt2.width - 3, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costNumTxt2, icon2, [50, 0]);
        var freeTxt = ComponentManager.getTextField(LanguageManager.getlocal("sysFreeDesc"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(freeTxt);
        freeTxt.visible = view.vo.isFree();
        view._freeTxt = freeTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, freeTxt, oneBtn, [0, -freeTxt.height - 10]);
        // if(view.vo.getLuckyCoin() >= view.cfg.autoDraw){
        //     allBtn.visible = true;
        // }
        // else{
        //     allBtn.visible = false;
        // }
        /***底部进度***/
        var progressbg = BaseBitmap.create("luckdrawprogressbg-" + view.getUiCode());
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbg, bottombg, [0, -progressbg.height]);
        view.addChild(progressbg);
        view._progressBg = progressbg;
        if (isDragon) {
            if (obj[view.code] == "wife") {
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, wife, progressbg, [0, progressbg.height]);
            }
            else {
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, progressbg, [-80, wife.height / 2]);
            }
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, wife, progressbg, [0, progressbg.height]);
        }
        //查看按钮
        if (this.getTypecode == 5) {
            var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            // this._effect.setScale(2);
            var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
            skinTxtEffect.setPosition(topBg.x + 130 - skinTxtEffectBM.width / 2, progressbg.y - 30 - skinTxtEffectBM.height / 2);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            this.addChild(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);
            var skinTxt = BaseBitmap.create("acnationalday_common_rewardtxt");
            skinTxt.anchorOffsetX = skinTxt.width / 2;
            skinTxt.anchorOffsetY = skinTxt.height / 2;
            skinTxt.setPosition(topBg.x + 130, progressbg.y - 30);
            this.addChild(skinTxt);
            skinTxt.name = "skinTxt";
            egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
            var skinTxteffect = BaseBitmap.create("acnationalday_common_rewardtxt");
            skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
            skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
            skinTxteffect.setPosition(topBg.x + 130, progressbg.y - 30);
            this.addChild(skinTxteffect);
            skinTxteffect.blendMode = egret.BlendMode.ADD;
            skinTxteffect.alpha = 0;
            egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            //透明点击区域
            var touchPos = BaseBitmap.create("public_alphabg");
            touchPos.width = 180;
            touchPos.height = 120;
            touchPos.setPosition(topBg.x, progressbg.y - 120);
            touchPos.name = "touch";
            view.addChild(touchPos);
            touchPos.addTouchTap(function () {
                var servantSkinId = _this.cfg.servant;
                var wifeId = _this.cfg.wife;
                var servantTopMsg = LanguageManager.getlocal("acLuckyDrawServantTopInfo-" + _this.getTypecode, [String(_this.cfg.getServantNeed())]);
                var wifeTopMsg = LanguageManager.getlocal("acLuckyDrawWifeTopInfo-" + _this.getTypecode, [String(_this.cfg.getWifeNeed())]);
                var servantBg = "skin_detailbg1";
                var wifeBg = null; //"acthrowstone_wife_preview_bg";
                // let data = [
                //     {id:""+wifeId, type:"wife", topMsg:wifeTopMsg, bgName:wifeBg,scale:0.6},
                //     {id:""+servantSkinId, type:"servant", topMsg:servantTopMsg, bgName:servantBg,scale:0.8},
                // ];
                // ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONCLOTHESPOPUPVIEW, data);
                var servantType = Config.ServantCfg.formatRewardItemVoStr(servantSkinId);
                var wifeType = Config.WifeCfg.formatRewardItemVoStr(wifeId);
                var data = { data: [
                        { idType: wifeType, topMsg: wifeTopMsg, bgName: wifeBg, scale: 0.6 },
                        { idType: servantType, topMsg: servantTopMsg, bgName: servantBg, scale: 0.8 }
                    ] };
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
            }, ViewController);
        }
        else {
            var ckBtn = ComponentManager.getButton("luckydrawckan-" + this.getUiCode(), '', function () {
                if (view._isPlay) {
                    return;
                }
                //查看奖励展示
                ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWSKINPOPUPVIEW, {
                    aid: view.aid,
                    code: view.code
                });
            }, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, ckBtn, progressbg, [5, -ckBtn.height - 5]);
            view.addChild(ckBtn);
        }
        //次数this._bg
        var numbg = BaseBitmap.create("acwealthcomingview_numbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numbg, progressbg, [12, 0]);
        view.addChild(numbg);
        //进度条
        var progressbar = ComponentManager.getProgressBar("progress12", "progress12_bg", 450);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, progressbar, progressbg, [numbg.width, 0]);
        var v = view.cfg.getTotalProgress();
        view._startPercent = Math.min(1, view.vo.getLuckyProgress() / v); //this._maxLength * view.vo.getLuckyProgress() / cfg.luckyProcess;
        progressbar.setPercentage(view._startPercent);
        view._progressBar = progressbar;
        view.addChild(progressbar);
        //财运TF
        var numDescTF = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawLucky-" + code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        if (PlatformManager.checkIsEnLang()) {
            numDescTF.size = 16;
        }
        numDescTF.setPosition(numbg.x + numbg.width / 2 - numDescTF.width / 2, numbg.y + 28);
        view.addChild(numDescTF);
        view._numDescTF = numDescTF;
        //数量TF
        view._curLuckyTxt = ComponentManager.getTextField(view.vo.getLuckyProgress().toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        view._curLuckyTxt.width = 60;
        view._curLuckyTxt.textAlign = egret.HorizontalAlign.CENTER;
        view._curLuckyTxt.setPosition(numDescTF.x + numDescTF.width / 2 - view._curLuckyTxt.width / 2, numDescTF.y + numDescTF.height + 2);
        view.addChild(view._curLuckyTxt);
        //奖励宝箱
        this._boxRewardImg = BaseBitmap.create("acwealthcomingview_box_1");
        this._boxRewardImg.anchorOffsetX = this._boxRewardImg.width / 2;
        this._boxRewardImg.anchorOffsetY = this._boxRewardImg.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, this._boxRewardImg, progressbg, [12, -8]);
        this.addChild(this._boxRewardImg);
        this._boxRewardImg.addTouchTap(function () {
            if (view._isPlay) {
                return;
            }
            // ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWREWARDPOPUPVIEW, {
            //     aid: this.aid, 
            //     code: this.code, 
            // });
            ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWPOPUPVIEW, {
                aid: _this.aid,
                code: _this.code,
            });
        }, this);
        //宝箱光 584 816  582.5 810
        this._boxLightBM = BaseBitmap.create("acwealthcomingview_box_light");
        this._boxLightBM.anchorOffsetX = this._boxLightBM.width / 2 - 1.5;
        this._boxLightBM.anchorOffsetY = this._boxLightBM.height / 2 + this._boxRewardImg.width / 2 - 2 + 3;
        this._boxLightBM.setPosition(this._boxRewardImg.x, this._boxRewardImg.y);
        this.addChild(this._boxLightBM);
        this._boxLightBM.alpha = 0;
        this._redDot = BaseBitmap.create("public_dot2");
        this._redDot.setPosition(this._boxRewardImg.x + this._boxRewardImg.width / 2 - this._redDot.width / 2, this._boxRewardImg.y - this._boxRewardImg.height + this._redDot.height / 2);
        this.addChild(this._redDot);
        if (view.vo.getpublicRedhot3()) {
            this._boxRewardImg.setRes("acwealthcomingview_box_2");
            this._redDot.visible = true;
        }
        else {
            this._boxRewardImg.setRes("acwealthcomingview_box_1");
            this._redDot.visible = false;
        }
        //文字
        var boxWordBM = BaseBitmap.create("luckydrawrewardword-" + view.getUiCode());
        boxWordBM.setPosition(this._boxRewardImg.x - boxWordBM.width / 2, this._boxRewardImg.y - boxWordBM.height / 2);
        this.addChild(boxWordBM);
        this._lightBall = BaseBitmap.create("acwealthcomingview_lightball");
        this._lightBall.anchorOffsetX = this._lightBall.width / 2;
        this._lightBall.anchorOffsetY = this._lightBall.height / 2;
        this._lightBall.blendMode = egret.BlendMode.ADD;
        this.addChild(this._lightBall);
        this._lightBall.alpha = 0;
        //进度文本
        var curJindu = view.vo.getCurjindu();
        var next = view.cfg.getTotalProgress();
        var progressstr = view.vo.getLuckyProgress() + "/" + next;
        if (view.vo.getLuckyProgress() >= view.cfg.getTotalProgress()) {
            progressstr = LanguageManager.getlocal("acLuckyDrawTip3-" + code);
        }
        this._progressTF = ComponentManager.getTextField(progressstr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._progressTF.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2, this._progressBar.y + this._progressBar.height + 7);
        this.addChild(this._progressTF);
        this._progressBM = BaseBitmap.create("luckydrawslider-" + this.getUiCode());
        this._progressBM.anchorOffsetX = this._progressBM.width / 2;
        this._progressBM.anchorOffsetY = this._progressBM.height;
        this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * this._startPercent, this._progressBar.y);
        this.addChild(this._progressBM);
        this._progressLight = BaseBitmap.create("acwealthcomingview_progresslight");
        this._progressLight.anchorOffsetX = this._progressLight.width;
        this._progressLight.anchorOffsetY = this._progressLight.height / 2;
        this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * this._startPercent, this._progressBar.y + this._progressBar.height / 2);
        this.addChild(this._progressLight);
        this._progressLight.setVisible(false);
        //按钮
        var midBtnGroup = new BaseDisplayObjectContainer();
        midBtnGroup.width = 401;
        midBtnGroup.height = 350;
        view.addChild(midBtnGroup);
        view._midBtnGroup = midBtnGroup;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, midBtnGroup, topBg, [10, (progressbg.y - topBg.y - topBg.height - midBtnGroup.height) / 2 + topBg.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bubbleTopGroup, topBg, [140, topBg.height + 7]);
        bubbleTopGroup.y = midBtnGroup.y - bubbleTopGroup.height + 10;
        midBtnGroup.addTouchTap(function () {
            if (view._isPlay) {
                return;
            }
            //公告面板
            ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWCARDPOOLVIEW, {
                aid: view.aid,
                code: view.code,
            });
        }, view);
        for (var i = 0; i < view.cfg.drawTimes.length; ++i) {
            var btnGroup = new BaseDisplayObjectContainer();
            midBtnGroup.addChild(btnGroup);
            var btn = BaseBitmap.create("luckydrawcard3-" + this.getUiCode());
            btn.name = "midBtn" + i;
            btnGroup.width = btn.width;
            btnGroup.height = btn.height;
            btnGroup.anchorOffsetX = btnGroup.width / 2;
            btnGroup.anchorOffsetY = btnGroup.height / 2;
            btnGroup.x = (i % 3) * (btnGroup.width + 10) + btnGroup.anchorOffsetX;
            btnGroup.y = Math.floor(i / 3) * (btnGroup.height) + btnGroup.anchorOffsetY;
            btnGroup.name = "midBtnGroup" + i;
            btnGroup.addChild(btn);
        }
        //幸运币数字
        var numBg = BaseBitmap.create("luckydrawiconbg-" + this.getUiCode());
        view.addChild(numBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numBg, midBtnGroup, [0, midBtnGroup.height + ((progressbg.y - midBtnGroup.y - midBtnGroup.height - numBg.height) / 2)]);
        var numTxt = ComponentManager.getTextField(view.vo.getLuckyCoin().toString(), 20);
        view.addChild(numTxt);
        view._numTxt = numTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numTxt, numBg);
        var icon3 = BaseLoadBitmap.create("luckdrawluckyicon2-" + this.getUiCode());
        icon3.width = icon3.height = 50;
        view.addChild(icon3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon3, numBg, [65, 0]);
        var rechargeBtn = ComponentManager.getButton("mainui_btn1", "", function () {
            if (view._isPlay) {
                return;
            }
            //打开充值
            // ViewController.getInstance().openView(ViewConst.COMMON.ACLUCKYDRAWCHARGEVIEW, {
            //     aid: this.aid, 
            //     code: this.code, 
            // });
            ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWPOPUPVIEW2, {
                aid: _this.aid,
                code: _this.code,
            });
        }, view);
        rechargeBtn.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rechargeBtn, numBg, [70, 0]);
        if (view.vo.getpublicRedhot2()) {
            App.CommonUtil.addIconToBDOC(rechargeBtn);
            var reddot = rechargeBtn.getChildByName("reddot");
            if (reddot) {
                reddot.x = 25;
                reddot.y = -10;
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(rechargeBtn);
        }
        view._chargeBtn = rechargeBtn;
        view.addChild(rechargeBtn);
        this._bangerContainer = new BaseDisplayObjectContainer();
        this.addChild(this._bangerContainer);
        this.initBanger();
        this.refreshBanger(this._startPercent);
        view.setChildIndex(view.titleBg, 9999);
        view.setChildIndex(view.closeBtn, 9999);
        view.setChildIndex(view._ruleBtn, 9999);
        this.tick();
    };
    AcLuckyDrawView.prototype.pickCallBack = function (evt) {
        var view = this;
        //物品奖励
        var data = evt.data.data.data;
        if (data) {
            if (data.isBatch) {
                ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWRESULTVIEW, {
                    aid: view.aid,
                    code: view.code,
                    batchList: data.batchList,
                    o: view,
                    f: function () {
                        var endPercent = Math.min(1, view.vo.getLuckyProgress() / view.cfg.getTotalProgress());
                        view.playProgressBarAni(view._startPercent, endPercent, 0.005);
                    },
                });
            }
            else {
                view._isPlay = true;
                var length_1 = data.showList.length;
                var getAll = length_1 == 6 && (data.showList[length_1 - 1][1] == data.showList[0][1]);
                view.cardMovie(data.showList, 0, getAll, data.rewards); //App.MathUtil.getRandom(1,6)
            }
        }
        else {
        }
    };
    /**
     * 卡牌翻牌动画 card 1红 2绿  special 高级卡牌特效
    */
    AcLuckyDrawView.prototype.cardMovie = function (data, btnIdx, allGet, rewards) {
        var view = this;
        var card = data[btnIdx][1] + 1;
        var endIdx = data.length - 1;
        var reward = data[btnIdx][0];
        var itemvo = GameData.formatRewardItem(reward)[0];
        var btnGroup = view._midBtnGroup.getChildByName("midBtnGroup" + btnIdx);
        var btn = btnGroup.getChildByName("midBtn" + btnIdx);
        var rewardArr = GameData.getRewardItemIcons(reward);
        var itemIcon = rewardArr[0];
        itemIcon.setScale(0.4);
        itemIcon.alpha = 0;
        itemIcon.x = 72;
        itemIcon.y = 120;
        btnGroup.addChild(itemIcon);
        itemIcon.name = "itemIcon" + btnIdx;
        var special = true;
        if (view.cfg.isSpecial(reward)) {
            if (!allGet && btnIdx == endIdx) {
                special = false;
            }
        }
        else {
            special = false;
        }
        if (special) {
            view._midBtnGroup.setChildIndex(btnGroup, 9999);
            //光刺
            var cardCircle_1 = BaseBitmap.create("ldcardcircle" + card + "-" + view.getTypecode);
            cardCircle_1.blendMode = egret.BlendMode.ADD;
            cardCircle_1.anchorOffsetX = cardCircle_1.width / 2;
            cardCircle_1.anchorOffsetY = cardCircle_1.height / 2;
            cardCircle_1.setScale(0.45);
            cardCircle_1.x = 60;
            cardCircle_1.y = 90;
            btnGroup.addChildAt(cardCircle_1, 0);
            egret.Tween.get(cardCircle_1).to({ scaleX: 0.93, scaleY: 0.93 }, 330).wait(1330).call(function () {
                egret.Tween.removeTweens(cardCircle_1);
                btnGroup.removeChild(cardCircle_1);
                cardCircle_1 = null;
            }, view);
            egret.Tween.get(cardCircle_1).to({ rotation: 90 }, 1660);
            var _loop_1 = function (i) {
                var cardlight = BaseBitmap.create("ldcardlight" + card + "-" + view.getTypecode);
                cardlight.blendMode = egret.BlendMode.ADD;
                cardlight.anchorOffsetX = cardlight.width / 2;
                cardlight.anchorOffsetY = cardlight.height / 2;
                cardlight.alpha = 0;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardlight, btn);
                btnGroup.addChild(cardlight);
                cardlight.setScale(1.45);
                egret.Tween.get(cardlight).wait(i * 260).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 400).to({ alpha: 0 }, 260).call(function () {
                    egret.Tween.removeTweens(cardlight);
                    btnGroup.removeChild(cardlight);
                    cardlight = null;
                }, view);
            };
            //聚集
            for (var i = 0; i < 4; ++i) {
                _loop_1(i);
            }
            var tmpX = btnGroup.x;
            var tmpY = btnGroup.y;
            egret.Tween.get(btnGroup).wait(200)
                .set({ x: tmpX - 0.1, y: tmpY + 1.3 }).wait(60)
                .set({ x: tmpX + 1.6, y: tmpY - 1.3 }).wait(60)
                .set({ x: tmpX - 2.9, y: tmpY - 0.6 }).wait(60)
                .set({ x: tmpX, y: tmpY - 0.8 }).wait(60)
                .set({ x: tmpX + 1.2, y: tmpY - 3.9 }).wait(60)
                .set({ x: tmpX - 3.1, y: tmpY - 1.1 }).wait(60)
                .set({ x: tmpX - 1.8, y: tmpY + 1 }).wait(60)
                .set({ x: tmpX + 0.7, y: tmpY - 1.5 }).wait(60)
                .set({ x: tmpX - 3.5, y: tmpY - 4.2 }).wait(60)
                .set({ x: tmpX - 3.3, y: tmpY - 1.3 }).wait(60)
                .set({ x: tmpX + 1.9, y: tmpY - 2.8 }).wait(60)
                .set({ x: tmpX - 3, y: tmpY + 0.8 }).wait(60)
                .set({ x: tmpX - 1.5, y: tmpY + 1 }).wait(60)
                .set({ x: tmpX + 1.2, y: tmpY - 0.3 }).wait(60)
                .set({ x: tmpX - 2.3, y: tmpY }).wait(60)
                .set({ x: tmpX, y: tmpY }).wait(60)
                .to({ scaleX: 0.1, scaleY: 2.5 }, 200).
                call(function () {
                btnGroup.scaleX = -0.1;
                btn.setRes("luckydrawcard" + card + "-" + view.getUiCode());
                itemIcon.alpha = 1;
            }, view).
                to({ scaleX: 0.85, scaleY: 0.85 }, 130).
                to({ scaleX: 1.15, scaleY: 1.15 }, 70).
                to({ scaleX: 1, scaleY: 1 }, 260).wait(btnIdx == endIdx ? 1500 : 840)
                .call(function () {
                egret.Tween.removeTweens(btnGroup);
                egret.Tween.removeTweens(scanEffect_1);
                btnGroup.removeChild(scanEffect_1);
                scanEffect_1 = null;
                if (btnIdx == endIdx) {
                    view.endMovie(allGet, endIdx, rewards);
                }
                else {
                    view.cardMovie(data, btnIdx + 1, allGet, rewards);
                }
            }, view);
            egret.Tween.get(btnGroup).wait(1160).wait(200).to({ alpha: 0 }, 10).to({ alpha: 1 }, 10);
            //卡牌高亮透明度动画
            var highlight_1 = BaseBitmap.create("ldcardhighlight-" + view.getTypecode);
            highlight_1.blendMode = egret.BlendMode.ADD;
            highlight_1.alpha = 0;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, highlight_1, btn);
            btnGroup.addChild(highlight_1);
            egret.Tween.get(highlight_1).wait(1160).wait(330).set({ alpha: 1 }).wait(130).to({ alpha: 0 }, 330).call(function () {
                egret.Tween.removeTweens(highlight_1);
                btnGroup.removeChild(highlight_1);
                highlight_1 = null;
            }, view);
            //卡牌光晕透明度动画
            var cardbg = BaseBitmap.create("ldcardlight" + card + "-" + view.getTypecode);
            cardbg.blendMode = egret.BlendMode.ADD;
            cardbg.alpha = 0;
            cardbg.name = "ldcardlight" + btnIdx;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardbg, btn);
            btnGroup.addChild(cardbg);
            egret.Tween.get(cardbg).wait(1160).wait(330).set({ alpha: 1 });
            //爆点光刺
            var boomeffect_1 = BaseBitmap.create("ldcardcircle" + card + "-" + view.getTypecode);
            boomeffect_1.blendMode = egret.BlendMode.ADD;
            boomeffect_1.anchorOffsetX = boomeffect_1.width / 2;
            boomeffect_1.anchorOffsetY = boomeffect_1.height / 2;
            boomeffect_1.alpha = 0;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boomeffect_1, btn);
            btnGroup.addChild(boomeffect_1);
            boomeffect_1.setScale(1.6);
            egret.Tween.get(boomeffect_1).wait(1160).wait(330).set({ alpha: 1 }).to({ scaleX: 0, scaleY: 0 }, 130).call(function () {
                egret.Tween.removeTweens(boomeffect_1);
                btnGroup.removeChild(boomeffect_1);
                boomeffect_1 = null;
            }, view);
            //翻牌时扩散动画
            var cardlight1_1 = BaseBitmap.create("ldcardlight" + card + "-" + view.getTypecode);
            cardlight1_1.blendMode = egret.BlendMode.ADD;
            cardlight1_1.anchorOffsetX = cardlight1_1.width / 2;
            cardlight1_1.anchorOffsetY = cardlight1_1.height / 2;
            cardlight1_1.alpha = 0;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardlight1_1, btn);
            btnGroup.addChild(cardlight1_1);
            cardlight1_1.setScale(1.08);
            egret.Tween.get(cardlight1_1).wait(1160).wait(330).to({ scaleX: 1.8, scaleY: 1.8 }, 200);
            egret.Tween.get(cardlight1_1).wait(1160).wait(330).set({ alpha: 0.8 }).to({ alpha: 0 }, 250).call(function () {
                egret.Tween.removeTweens(cardlight1_1);
                btnGroup.removeChild(cardlight1_1);
                cardlight1_1 = null;
            }, view);
            var cardlight2_1 = BaseBitmap.create("ldcardlight" + card + "-" + view.getTypecode);
            cardlight2_1.blendMode = egret.BlendMode.ADD;
            cardlight2_1.anchorOffsetX = cardlight2_1.width / 2;
            cardlight2_1.anchorOffsetY = cardlight2_1.height / 2;
            cardlight2_1.alpha = 0;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardlight2_1, btn);
            btnGroup.addChild(cardlight2_1);
            cardlight1_1.setScale(0.85);
            egret.Tween.get(cardlight2_1).wait(1160).wait(330).to({ scaleX: 1.8, scaleY: 1.8 }, 330);
            egret.Tween.get(cardlight2_1).wait(1160).wait(330).set({ alpha: 1 }).to({ alpha: 0 }, 400).call(function () {
                egret.Tween.removeTweens(cardlight2_1);
                btnGroup.removeChild(cardlight2_1);
                cardlight2_1 = null;
            }, view);
            //卡牌后面旋转光刺
            var circleeffect = BaseBitmap.create("ldcardcircle" + card + "-" + view.getTypecode);
            circleeffect.blendMode = egret.BlendMode.ADD;
            circleeffect.anchorOffsetX = circleeffect.width / 2;
            circleeffect.anchorOffsetY = circleeffect.height / 2;
            circleeffect.alpha = 0;
            circleeffect.name = "circleeffect1";
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, circleeffect, btn);
            btnGroup.addChildAt(circleeffect, 0);
            circleeffect.setScale(1);
            egret.Tween.get(circleeffect).wait(1160).wait(330).set({ alpha: 1 }).to({ rotation: 360 }, 18000);
            var circleeffect2 = BaseBitmap.create("ldcardcircle" + card + "-" + view.getTypecode);
            circleeffect2.blendMode = egret.BlendMode.ADD;
            circleeffect2.anchorOffsetX = circleeffect2.width / 2;
            circleeffect2.anchorOffsetY = circleeffect2.height / 2;
            circleeffect2.alpha = 0;
            circleeffect2.name = "circleeffect2";
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, circleeffect2, btn);
            btnGroup.addChildAt(circleeffect2, 0);
            circleeffect2.setScale(0.85);
            egret.Tween.get(circleeffect2).wait(1160).wait(330).set({ alpha: 1 }).to({ rotation: -360 }, 13000);
            //扫光
            var scanEffect_1 = ComponentManager.getCustomMovieClip("ldcardscan", 8, 60);
            scanEffect_1.width = 124;
            scanEffect_1.height = 163;
            scanEffect_1.anchorOffsetX = scanEffect_1.width / 2;
            scanEffect_1.anchorOffsetY = scanEffect_1.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scanEffect_1, btn);
            scanEffect_1.alpha = 0;
            btnGroup.addChild(scanEffect_1);
            egret.Tween.get(scanEffect_1).wait(1160).wait(1000).set({ alpha: 1 }).call(function () {
                scanEffect_1.playWithTime(1);
            }, view);
            //粒子效果
            var lizi_1 = App.ParticleUtil.getParticle("ldcardparticle");
            lizi_1.x = -700;
            lizi_1.y = -250;
            btnGroup.addChild(lizi_1);
            egret.Tween.get(lizi_1).wait(1160).wait(330).call(function () {
                lizi_1.start();
            }, view).wait(300).call(function () {
                egret.Tween.removeTweens(lizi_1);
                lizi_1.stop();
                btnGroup.removeChild(lizi_1);
                lizi_1 = null;
            }, view);
            btnGroup.setChildIndex(itemIcon, 9999);
        }
        else {
            //卡牌背面动画
            egret.Tween.get(btnGroup).
                to({ scaleX: 0.1, scaleY: 1.5 }, 130).
                call(function () {
                btnGroup.scaleX = -0.1;
                itemIcon.alpha = 1;
                btn.setRes("luckydrawcard" + card + "-" + view.getUiCode());
            }, view).
                to({ scaleX: 0.9, scaleY: 0.9 }, 130).
                to({ scaleX: 1.03, scaleY: 1.03 }, 70).wait(btnIdx == endIdx ? 1000 : 0).
                call(function () {
                if (btnIdx == endIdx) {
                    view.endMovie(allGet, endIdx, rewards);
                }
                else {
                    view.cardMovie(data, btnIdx + 1, allGet, rewards);
                }
            }, view).
                to({ scaleX: 1, scaleY: 1 }, 260);
            egret.Tween.get(btnGroup).wait(130).to({ alpha: 0 }, 10).to({ alpha: 1 }, 10);
            //卡牌高亮透明度动画
            var highlight_2 = BaseBitmap.create("ldcardhighlight-" + view.getTypecode);
            highlight_2.blendMode = egret.BlendMode.ADD;
            highlight_2.alpha = 0;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, highlight_2, btn);
            btnGroup.addChild(highlight_2);
            egret.Tween.get(highlight_2).wait(260).set({ alpha: 1 }).to({ alpha: 0 }, 330).call(function () {
                egret.Tween.removeTweens(highlight_2);
                btnGroup.removeChild(highlight_2);
                highlight_2 = null;
            }, view);
            //卡牌光晕透明度动画
            var cardbg_1 = BaseBitmap.create("ldcardlight" + card + "-" + view.getTypecode);
            cardbg_1.blendMode = egret.BlendMode.ADD;
            cardbg_1.alpha = 0;
            cardbg_1.name = "ldcardlight" + btnIdx;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardbg_1, btn);
            btnGroup.addChild(cardbg_1);
            egret.Tween.get(cardbg_1).wait(260).set({ alpha: 1 }).wait(330).to({ alpha: 0 }, 330).
                call(function () {
                egret.Tween.removeTweens(cardbg_1);
                //最后一张卡不同颜色 播放完释放
                // if(btnIdx == endIdx){
                //     btnGroup.removeChild(cardbg);
                //     cardbg = null;
                // }
            }, view);
            btnGroup.setChildIndex(itemIcon, 9999);
        }
    };
    AcLuckyDrawView.prototype.endMovie = function (allGet, endIdx, reward) {
        var view = this;
        var final = allGet ? endIdx : endIdx - 1;
        var _loop_2 = function (i) {
            var midbtnGroup = view._midBtnGroup.getChildByName("midBtnGroup" + i);
            egret.Tween.get(midbtnGroup).to({ scaleX: 1.04, scaleY: 1.04 }, 330).to({ scaleX: 1, scaleY: 1 }, 800).call(function () {
                egret.Tween.removeTweens(midbtnGroup);
                if (i == final) {
                    //移出光晕
                    var cardbg_2 = midbtnGroup.getChildByName("ldcardlight" + i);
                    if (cardbg_2) {
                        egret.Tween.removeTweens(cardbg_2);
                        midbtnGroup.removeChild(cardbg_2);
                        cardbg_2 = null;
                    }
                    var itemIcon = midbtnGroup.getChildByName("itemIcon" + i);
                    midbtnGroup.removeChild(itemIcon);
                    itemIcon = null;
                    //复原卡牌
                    ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWREWARDSHOWVIEW, {
                        rewards: reward,
                        aid: view.aid,
                        code: view.code,
                        callobj: view,
                        callback: function () {
                            view.resetMidBtn();
                            var endPercent = Math.min(1, view.vo.getLuckyProgress() / view.cfg.getTotalProgress());
                            view.playProgressBarAni(view._startPercent, endPercent, 0.005);
                        }
                    });
                }
            }, view);
            var cardbg = midbtnGroup.getChildByName("ldcardlight" + i);
            if (cardbg) {
                egret.Tween.get(cardbg).to({ alpha: 1 }, 330).to({ alpha: 0 }, 800).call(function () {
                    if (cardbg) {
                        egret.Tween.removeTweens(cardbg);
                        midbtnGroup.removeChild(cardbg);
                        cardbg = null;
                    }
                }, view);
            }
        };
        for (var i = 0; i <= final; ++i) {
            _loop_2(i);
        }
    };
    AcLuckyDrawView.prototype.resetMidBtn = function () {
        var view = this;
        for (var i = 0; i <= 5; ++i) {
            var btnGroup = view._midBtnGroup.getChildByName("midBtnGroup" + i);
            btnGroup.alpha = 1;
            btnGroup.scaleX = btnGroup.scaleY = 1;
            var tmpBtn = btnGroup.getChildByName("midBtn" + i);
            if (tmpBtn) {
                tmpBtn.setRes("luckydrawcard3-" + view.getUiCode());
            }
            var lasttemIcon = btnGroup.getChildByName("itemIcon" + i);
            if (lasttemIcon) {
                btnGroup.removeChild(lasttemIcon);
            }
            var cardbg = btnGroup.getChildByName("ldcardlight" + i);
            if (cardbg) {
                egret.Tween.removeTweens(cardbg);
                btnGroup.removeChild(cardbg);
                cardbg = null;
            }
            var circleeffect = btnGroup.getChildByName("circleeffect1");
            if (circleeffect) {
                egret.Tween.removeTweens(circleeffect);
                btnGroup.removeChild(circleeffect);
                circleeffect = null;
            }
            var circleeffect2 = btnGroup.getChildByName("circleeffect2");
            if (circleeffect2) {
                egret.Tween.removeTweens(circleeffect2);
                btnGroup.removeChild(circleeffect2);
                circleeffect2 = null;
            }
        }
    };
    AcLuckyDrawView.prototype.freshView = function () {
        var view = this;
        view._numTxt.text = view.vo.getLuckyCoin().toString();
        //进度条
        if (view.vo.getpublicRedhot3()) {
            this._boxRewardImg.setRes("acwealthcomingview_box_2");
            this._redDot.visible = true;
        }
        else {
            this._boxRewardImg.setRes("acwealthcomingview_box_1");
            this._redDot.visible = false;
        }
        //好感度
        view._curLuckyTxt.text = view.vo.getLuckyProgress().toString();
        view._curLuckyTxt.x = view._numDescTF.x + view._numDescTF.width / 2 - view._curLuckyTxt.width / 2;
        //数字显示
        var curJindu = view.vo.getCurjindu();
        var next = view.cfg.getTotalProgress();
        var progressstr = view.vo.getLuckyProgress() + "/" + next;
        if (view.vo.getLuckyProgress() >= view.cfg.getTotalProgress()) {
            progressstr = LanguageManager.getlocal("acLuckyDrawTip3-" + view.code);
        }
        view._progressTF.text = progressstr;
        view._progressTF.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2, this._progressBar.y + this._progressBar.height + 7);
        this.refreshBanger(this._startPercent);
        //按钮
        view._costNumTxt2.text = String(Math.min(10, Math.max(view.vo.getLuckyCoin(), 1)));
        if (view.vo.getpublicRedhot2()) {
            App.CommonUtil.addIconToBDOC(view._chargeBtn);
            var reddot = view._chargeBtn.getChildByName("reddot");
            if (reddot) {
                reddot.x = 25;
                reddot.y = -10;
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._chargeBtn);
        }
        //App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon2, costNumTxt2, [costNumTxt2.width + 5,0]);
    };
    /**初始化鞭炮相关 */
    AcLuckyDrawView.prototype.initBanger = function () {
        var _this = this;
        var view = this;
        for (var i = 0; i < this._bangerInfo.length; i++) {
            this._bangerContainer.removeChild(this._bangerInfo[i].bangerBM);
            this._bangerInfo[i].bangerBM.dispose();
        }
        this._bangerInfo.length = 0;
        var procsscfg = view.cfg.achievement;
        var v = view.cfg.getTotalProgress();
        var _loop_3 = function (i) {
            // if(Number(i) == procsscfg.length - 1){
            // }
            var value = procsscfg[i].needNum;
            var p = value / v;
            var bangerBM = BaseBitmap.create("luckydrawbox2-" + view.getUiCode());
            bangerBM.anchorOffsetX = bangerBM.width / 2;
            bangerBM.anchorOffsetY = bangerBM.height / 2;
            bangerBM.setPosition(this_1._progressBar.x + this_1._progressBar.width * this_1._maxLength * p, this_1._progressBar.y + this_1._progressBar.height / 2 - 7);
            this_1._bangerContainer.addChild(bangerBM);
            bangerBM.addTouchTap(function () {
                if (view._isPlay) {
                    return;
                }
                //奖励预览
                // ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWREWARDPOPUPVIEW, {
                //     aid: this.aid, 
                //     code: this.code, 
                //     id: Number(i)
                // });
                _this.vo.showId = Number(i);
                ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYDRAWPOPUPVIEW, {
                    aid: _this.aid,
                    code: _this.code,
                });
            }, this_1);
            var isPlayAni = view.vo.getLuckyProgress() >= value ? false : true;
            this_1._bangerInfo.push({ id: i, bangerBM: bangerBM, value: procsscfg[i].value, isPlayAni: isPlayAni, percent: Math.round(this_1._maxLength * p * 1000) });
        };
        var this_1 = this;
        for (var i in procsscfg) {
            _loop_3(i);
        }
    };
    AcLuckyDrawView.prototype.refreshBangerHandele = function () {
        this.refreshBanger(this._startPercent);
    };
    /**刷新 鞭炮 */
    AcLuckyDrawView.prototype.refreshBanger = function (percent) {
        var view = this;
        var percentTmp = Math.round(percent * 1000);
        for (var i = 0; i < this._bangerInfo.length; i++) {
            if (percentTmp >= this._bangerInfo[i].percent) {
                if (this.vo.isGetJinduAward(this._bangerInfo[i].id)) {
                    this._bangerInfo[i].bangerBM.setRes("luckydrawbox3-" + view.getUiCode());
                }
                else {
                    this._bangerInfo[i].bangerBM.setRes("luckydrawbox1-" + view.getUiCode());
                }
                if (this._bangerInfo[i].isPlayAni) {
                    this._bangerInfo[i].isPlayAni = false;
                    //播放动画
                    this.playBangerAni(this._bangerInfo[i].bangerBM, this._bangerInfo[i].bangerBM.x, this._bangerInfo[i].bangerBM.y, this._boxRewardImg.x, this._boxRewardImg.y - this._boxRewardImg.height / 2);
                }
            }
            else {
                this._bangerInfo[i].bangerBM.setRes("luckydrawbox2-" + view.getUiCode());
            }
        }
    };
    /**鞭炮的动画 */
    AcLuckyDrawView.prototype.playBangerAni = function (bangerBM, startPosX, startPosY, endPosX, endPosY) {
        var _this = this;
        //bangerBM.setVisible(false);
        var boomEffect = ComponentManager.getCustomMovieClip("boxboomeffect", 8, 70);
        boomEffect.anchorOffsetX = 65;
        boomEffect.anchorOffsetY = 60;
        var boom = BaseBitmap.create("boxrewardfly-" + this.getTypecode);
        boomEffect.setScale(1.25);
        boom.setScale(1.25);
        boomEffect.setPosition(startPosX - boom.width * 1.25 / 2, startPosY - boom.height * 1.25 / 2);
        this.addChild(boomEffect);
        boomEffect.playWithTime(1);
        boomEffect.setEndCallBack(function () {
            _this.removeChild(boomEffect);
            boomEffect.dispose();
            _this._lightBall.setPosition(startPosX, startPosY);
            _this._lightBall.alpha = 1;
            _this._lightBall.setScale(0.1);
            _this._lightBall.rotation = 0;
            var distanceX = endPosX - startPosX;
            var distanceY = endPosY - startPosY;
            egret.Tween.get(_this._lightBall).to({
                rotation: 360 * 0.14,
                scaleX: 0.8,
                scaleY: 0.8,
                x: startPosX + distanceX * 0.3,
                y: startPosY + distanceY * 0.3
            }, 140).to({
                rotation: 360 * 0.54,
                scaleX: 1,
                scaleY: 1,
                x: startPosX + distanceX * 1,
                y: startPosY + distanceY * 1
            }, 400).call(function () {
                if (_this.vo.getpublicRedhot3()) {
                    _this._boxRewardImg.setRes("acwealthcomingview_box_2");
                }
                else {
                    _this._boxRewardImg.setRes("acwealthcomingview_box_1");
                }
                _this._redDot.visible = false;
                _this._boxRewardImg.setScale(1.1);
                _this._boxLightBM.setScale(1.1);
                _this._boxLightBM.alpha = 1;
                egret.Tween.get(_this._boxRewardImg).to({
                    scaleX: 1,
                    scaleY: 1,
                }, 750).call(function () {
                    if (_this.vo.getpublicRedhot3()) {
                        _this._redDot.visible = true;
                    }
                    else {
                        _this._redDot.visible = false;
                    }
                    egret.Tween.removeTweens(_this._boxRewardImg);
                    // bangerBM.setVisible(true);
                    var startPercentTmp = Math.round(_this._startPercent * 1000);
                    var maxLengthTmp = Math.round(_this._maxLength * 1000);
                    console.log("startPercentTmp:  " + startPercentTmp);
                    console.log("maxLengthTmp:  " + maxLengthTmp);
                }, _this);
                egret.Tween.get(_this._boxLightBM).to({
                    scaleX: 1,
                    scaleY: 1,
                    alpha: 0,
                }, 750).call(function () {
                    egret.Tween.removeTweens(_this._boxLightBM);
                }, _this);
            }, _this).to({
                scaleX: 1.3,
                scaleY: 1,
                rotation: 360 * 1,
                alpha: 0,
            }, 460).call(function () {
                egret.Tween.removeTweens(_this._lightBall);
            }, _this);
        }, this);
    };
    /**
     * 进度条的动画
     */
    AcLuckyDrawView.prototype.playProgressBarAni = function (startPercent, endPercent, speed) {
        var _this = this;
        this._isPlay = true;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        //每次初始化
        this._progressBar.setPercentage(startPercent);
        egret.Tween.removeTweens(this._progressBar);
        this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * startPercent, this._progressBar.y);
        this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * startPercent, this._progressBar.y + this._progressBar.height / 2);
        var startTemp = Math.round(startPercent * 1000);
        var endTemp = Math.round(endPercent * 1000);
        var maxTemp = Math.round(this._maxLength * 1000);
        var everyTimeValue = speed;
        var op = true;
        egret.Tween.get(this._progressBar, { loop: true }).wait(0.1).call(function () {
            _this._progressLight.setVisible(true);
            if (op) {
                //增量动画
                startPercent += everyTimeValue;
                _this.refreshBanger(startPercent);
                startTemp = Math.round(startPercent * 1000);
                if (startTemp > endTemp) {
                    egret.Tween.removeTweens(_this._progressBar);
                    _this._progressLight.setVisible(false);
                    if (startTemp > maxTemp) {
                        _this._isPlay = false;
                        egret.Tween.removeTweens(_this._progressBar);
                        _this._progressLight.setVisible(false);
                        return;
                    }
                    else {
                        _this._isPlay = false;
                    }
                    return;
                }
            }
            if (startTemp > maxTemp) {
                _this.refreshBanger(startPercent);
                egret.Tween.removeTweens(_this._progressBar);
                _this._progressLight.setVisible(false);
                _this._isPlay = false;
                return;
            }
            _this.refreshBanger(startPercent);
            _this._progressBar.setPercentage(startPercent);
            _this._progressBM.setPosition(_this._progressBar.x + _this._progressBar.width * startPercent, _this._progressBar.y);
            _this._progressLight.setPosition(_this._progressBar.x + _this._progressBar.width * startPercent, _this._progressBar.y + _this._progressBar.height / 2);
            _this._startPercent = startPercent;
            _this._isPlay = false;
        }, this);
    };
    AcLuckyDrawView.prototype.hide = function () {
        var view = this;
        if (view._isPlay) {
            return;
        }
        _super.prototype.hide.call(this);
    };
    AcLuckyDrawView.prototype.tick = function () {
        var view = this;
        if (view._cdText) {
            var str = '';
            if (view.vo.isInActivity()) {
                str = App.DateUtil.getFormatBySecond(view.vo.getCountDown());
            }
            else {
                str = "<font color=0x21eb39>" + LanguageManager.getlocal("acPunishEnd") + "</font>";
            }
            view._cdText.text = LanguageManager.getlocal("acLuckyDrawTopTip2-" + view.code, [str]);
            if (this.timebg) {
                this.timebg.width = view._cdText.width + 50;
                this.timebg.x = 350;
                this.tip2Text.x = this.timebg.x + (this.timebg.width - this._cdText.width) * 0.5;
            }
        }
        view._freeTxt.visible = view.vo.isFree();
        view._oneBtnGroup.visible = !view.vo.isFree();
        // if(view.vo.getLuckyCoin() >= view.cfg.autoDraw){
        //     view._getAllBtn.visible = true;
        // }
        // else{
        //     view._getAllBtn.visible = false;
        // }
        // if(view.vo.isGetJinduAward(view.cfg.achievement.length - 1)){
        //     if(view._progressBubbleGroup){
        //         view._progressBubbleGroup.alpha = 0;
        //         egret.Tween.removeTweens(view._progressBubbleGroup);
        //         view._progressBubbleGroup.dispose();
        //         view._progressBubbleGroup = null;
        //     }
        // }
    };
    AcLuckyDrawView.prototype.getUiCode = function () {
        if (this.code == "3") {
            return "1";
        }
        else if (this.code == "4") {
            return "2";
        }
        else if (this.code == "6") {
            return "5";
        }
        return _super.prototype.getUiCode.call(this);
    };
    /**
     * 关闭释放
    */
    AcLuckyDrawView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM, view.freshView, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWLOTTERY), view.pickCallBack, view);
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this); 
        view._cdText = null;
        view._chargeBtn = null;
        view._getOneBtn = null;
        view._getAllBtn = null;
        view._oneBtnGroup.dispose();
        view._oneBtnGroup = null;
        view._bottomBg = null;
        view._startPercent = 0;
        view._maxLength = 1;
        view._curLuckyTxt = null;
        view._boxRewardImg = null;
        view._boxLightBM = null;
        view._lightBall = null;
        view._progressBg = null;
        view._progressTF = null;
        view._progressBM = null;
        view._progressLight = null;
        /**鞭炮的 Container*/
        view._bangerContainer.dispose();
        view._bangerContainer = null;
        view._bangerInfo = [];
        view._redDot = null;
        view._midBtnGroup.dispose();
        view._midBtnGroup = null;
        if (view._progressBubbleGroup) {
            egret.Tween.removeTweens(view._progressBubbleGroup);
            view._progressBubbleGroup.dispose();
            view._progressBubbleGroup = null;
        }
        view._numDescTF = null;
        view._numTxt = null;
        view._costNumTxt2 = null;
        view._freeTxt = null;
        this.tip2Text = null;
        // private _log: any = null;
        // private _loopTopBg: BaseBitmap = null;
        // private _isSecond: boolean = false;
        // private _isPlay: boolean = false;
        _super.prototype.dispose.call(this);
    };
    return AcLuckyDrawView;
}(AcCommonView));
__reflect(AcLuckyDrawView.prototype, "AcLuckyDrawView");
//# sourceMappingURL=AcLuckyDrawView.js.map