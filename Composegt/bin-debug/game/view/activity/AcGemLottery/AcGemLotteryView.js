/*
* 双十一转盘活动
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
var AcGemLotteryView = (function (_super) {
    __extends(AcGemLotteryView, _super);
    function AcGemLotteryView() {
        var _this = _super.call(this) || this;
        _this._isCircleRun = false;
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._ruleText = null;
        _this._circleGroup = null;
        //转盘
        _this._turnTable = null;
        //向上的指针
        _this._upArrow = null;
        //转到奖励的光
        // private _selectLight: BaseBitmap = null;
        _this._turnGroup = null;
        _this._turnGroup2 = null;
        _this._selMask = undefined;
        _this._rewardItem = 0;
        _this._havenumTxt = null;
        _this._lotteryDro = null;
        return _this;
    }
    AcGemLotteryView.prototype.initView = function () {
        var _this = this;
        var code = this.code;
        var aid = this.aid;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GEMLOTTERYDRAW, this.buyBtnHandlerCaller, this);
        App.MessageHelper.addEventListener(MessageConst.MESAAGE_GEMLOTTERY_FRESH_ITEM, this.refreshUIInfo, this);
        var titletxt = BaseBitmap.create("gemlottery_title-" + code);
        titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
        // titletxt.y = 5;
        this.addChild(titletxt);
        //顶部背景图片
        var forpeople_top = BaseLoadBitmap.create('gemlottery_descbg');
        this.addChildToContainer(forpeople_top);
        forpeople_top.y = 70;
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.x = 15;
        this._activityTimerText.y = forpeople_top.y + 15;
        this._activityTimerText.text = this.acVo.getAcLocalTime(true);
        this.addChildToContainer(this._activityTimerText);
        //倒计时文本 
        var acCDTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        acCDTxt.text = LanguageManager.getlocal("acFanliReviewReward_acCD", [""]);
        acCDTxt.x = GameConfig.stageWidth - acCDTxt.width - 15;
        acCDTxt.y = this._activityTimerText.y;
        this.addChildToContainer(acCDTxt);
        this._acCDTxt = acCDTxt;
        //规则
        this._ruleText = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._ruleText.x = this._activityTimerText.x;
        this._ruleText.multiline = true;
        this._ruleText.lineSpacing = 4;
        this._ruleText.width = GameConfig.stageWidth - this._ruleText.x * 2;
        this._ruleText.y = this._acCDTxt.y + this._acCDTxt.height + 10;
        this._ruleText.text = LanguageManager.getlocal("acGemLotteryDesc-" + this.code, ["" + this.cfg.cost]);
        this.addChildToContainer(this._ruleText);
        //bottomBg
        var bottomBg = BaseBitmap.create("gemlottery_bottombg");
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
        this.addChildToContainer(bottomBg);
        //转盘父节点
        this._circleGroup = new BaseDisplayObjectContainer();
        this._circleGroup.width = GameConfig.stageWidth;
        this._circleGroup.height = 550;
        this._circleGroup.x = 0;
        this._circleGroup.y = 250;
        // this._progress.y + 15 + (numBg.y - this._progress.y + 15)/2 - this._circleGroup.height/2;
        this.addChildToContainer(this._circleGroup);
        //bottom里面的组件
        //抽奖次数
        this._havenumTxt = ComponentManager.getTextField(LanguageManager.getlocal('acMayDayRechargeCurnNum', [this.vo.havenum + '']), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._havenumTxt.setPosition(bottomBg.x + bottomBg.width / 2 - this._havenumTxt.width / 2, bottomBg.y + 35);
        this.addChildToContainer(this._havenumTxt);
        //转动一次按钮
        var onceBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_BLUE, "acMayDayRecharge_lottery1", this.buyBtnHandler, this, [1]);
        onceBtn.x = bottomBg.x + 60;
        onceBtn.y = bottomBg.y + bottomBg.height / 2 - 10;
        this.addChildToContainer(onceBtn);
        //转动十次按钮
        var tenBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acMayDayRecharge_lottery10", this.buyBtnHandler, this, [10]);
        tenBtn.x = bottomBg.x + bottomBg.width - tenBtn.width - 60;
        tenBtn.y = onceBtn.y;
        this.addChildToContainer(tenBtn);
        //转盘
        var circleBg = BaseBitmap.create("gemlottery_circle2");
        circleBg.x = this._circleGroup.width / 2 - circleBg.width / 2;
        circleBg.y = this._circleGroup.height / 2 - circleBg.height / 2;
        this._circleGroup.addChild(circleBg);
        //转盘
        this._turnTable = BaseBitmap.create("gemlottery_circle1");
        this._turnTable.anchorOffsetX = this._turnTable.width / 2;
        this._turnTable.anchorOffsetY = this._turnTable.height / 2;
        this._turnGroup = new BaseDisplayObjectContainer();
        this._turnGroup.width = this._turnTable.width;
        this._turnGroup.height = this._turnTable.height;
        this._turnGroup.anchorOffsetX = this._turnGroup.width / 2;
        this._turnGroup.anchorOffsetY = this._turnGroup.height / 2;
        this._turnTable.x = this._turnGroup.width / 2;
        this._turnTable.y = this._turnGroup.height / 2;
        this._turnGroup.x = this._circleGroup.width / 2;
        this._turnGroup.y = this._circleGroup.height / 2;
        this._turnGroup.addChild(this._turnTable);
        this._circleGroup.addChild(this._turnGroup);
        var sel_mask = BaseBitmap.create("gemlottery_selectmask");
        sel_mask.anchorOffsetX = sel_mask.width / 2;
        sel_mask.x = this._circleGroup.width / 2;
        sel_mask.y = circleBg.y + 30;
        sel_mask.visible = false;
        this._circleGroup.addChild(sel_mask);
        this._selMask = sel_mask;
        this._turnGroup2 = new BaseDisplayObjectContainer();
        this._turnGroup2.width = this._turnGroup.width;
        this._turnGroup2.height = this._turnGroup.height;
        this._turnGroup2.anchorOffsetX = this._turnGroup.anchorOffsetX;
        this._turnGroup2.anchorOffsetY = this._turnGroup.anchorOffsetY;
        this._turnGroup2.x = this._turnGroup.x;
        this._turnGroup2.y = this._turnGroup.y;
        this._circleGroup.addChild(this._turnGroup2);
        var arrowHead = BaseBitmap.create("gemlottery_arrowhead");
        arrowHead.anchorOffsetX = arrowHead.width / 2;
        arrowHead.x = this._circleGroup.width / 2;
        arrowHead.y = circleBg.y - 30;
        this._circleGroup.addChild(arrowHead);
        this._upArrow = BaseBitmap.create("gemlottery_arrow");
        this._upArrow.anchorOffsetX = this._upArrow.width / 2;
        this._upArrow.anchorOffsetY = 20;
        this._upArrow.x = this._circleGroup.width / 2;
        this._upArrow.y = arrowHead.y + arrowHead.height + 12;
        this._circleGroup.addChild(this._upArrow);
        this._upArrow.visible = false;
        var midCircle = BaseBitmap.create("gemlottery_circlecenter");
        midCircle.x = this._circleGroup.width / 2 - midCircle.width / 2;
        midCircle.y = this._circleGroup.height / 2 - midCircle.height / 2;
        this._circleGroup.addChild(midCircle);
        var flower1 = BaseBitmap.create("gemlottery_flower1");
        flower1.x = circleBg.x + 15;
        flower1.y = circleBg.y + circleBg.height - flower1.height - 10;
        this._circleGroup.addChild(flower1);
        var flower2 = BaseBitmap.create("gemlottery_flower2");
        flower2.x = circleBg.x + circleBg.width - flower2.width + 15;
        flower2.y = flower1.y - flower2.height;
        this._circleGroup.addChild(flower2);
        var cfg = this.cfg;
        var total = this.cfg.lotteryPoolLength;
        var rad = Math.PI / 180;
        var radius = this._turnGroup.height / 2;
        var rewardTab = [];
        for (var index = 1; index <= total; index++) {
            var key = "" + index;
            rewardTab.push(cfg.lotteryBasePool[key].reward);
        }
        var centerX = this._turnGroup.width / 2;
        var centerY = this._turnGroup.height / 2;
        var rIcons = GameData.formatRewardItem(rewardTab.join("|"));
        for (var i = 0; i < total; ++i) {
            //计算角度
            var angle = 360 / total * rad * i;
            //加物品icon
            var tmpItemvo = rIcons[i];
            var itemicon = BaseBitmap.create("gemlottery_gem" + cfg.lotteryBasePool[String(i + 1)].icon);
            itemicon.anchorOffsetX = itemicon.width / 2;
            itemicon.anchorOffsetY = itemicon.height / 2;
            var itemX = (radius) * Math.sin(angle) / 2;
            var itemY = (radius) * Math.cos(angle) / 2;
            itemicon.x = centerX + itemX;
            itemicon.y = centerY - itemY;
            itemicon.name = "item" + i;
            if (i == 0) {
                itemicon.setScale(0.9);
            }
            this._turnGroup2.addChild(itemicon);
            // itemicon.addTouchTap((event:egret.TouchEvent,item:string|number|RewardItemVo)=>{
            // 	ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,item);
            // },this,[ tmpItemvo ]);
            var tmpcon = new BaseDisplayObjectContainer();
            var luckicon = BaseBitmap.create("gemlottery_gemsmall");
            tmpcon.addChild(luckicon);
            var lucktxt2 = ComponentManager.getBitmapText("+" + tmpItemvo.num, "oneyearpack_fnt"); //ComponentManager.getTextField("+100", 16, TextFieldConst.COLOR_WHITE);
            lucktxt2.x = luckicon.x + luckicon.width + 2;
            lucktxt2.y = luckicon.y + 3;
            tmpcon.addChild(lucktxt2);
            tmpcon.anchorOffsetX = tmpcon.width / 2;
            tmpcon.anchorOffsetY = tmpcon.height / 2;
            tmpcon.rotation = 360 / total * i;
            tmpcon.x = centerX + itemX * 1.44;
            tmpcon.y = centerY - itemY * 1.44;
            this._turnGroup2.addChild(tmpcon);
        }
        if (App.CommonUtil.check_dragon()) {
            this._lotteryDro = App.DragonBonesUtil.getLoadDragonBones('luckywheel', 1, '', function () {
                _this._lotteryDro.stop();
                _this._lotteryDro.visible = false;
            });
            this._lotteryDro.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, this.hideAni, this);
            this.addChild(this._lotteryDro);
            this._lotteryDro.setPosition(GameConfig.stageWidth / 2, 550);
        }
        this.refreshUIInfo();
        this.tick();
    };
    AcGemLotteryView.prototype.getRuleParam = function () {
        return [this.cfg.backPayNum + ''];
    };
    AcGemLotteryView.prototype.refreshUIInfo = function () {
        this._havenumTxt.text = LanguageManager.getlocal('acMayDayRechargeCurnNum', [this.vo.havenum + '']);
    };
    //购买按钮点击
    AcGemLotteryView.prototype.buyBtnHandler = function (num) {
        var _this = this;
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._isCircleRun) {
            return;
        }
        var havenum = this.vo.havenum;
        if (havenum < num) {
            var msg = LanguageManager.getlocal("acGemLottery_item_notenough-" + this.code);
            var title = "itemUseConstPopupViewTitle";
            if (PlatformManager.checkHideIconByIP()) {
                msg = LanguageManager.getlocal("acGemLottery_TipMsg_hideByIp-" + this.code);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: msg, title: title, needCancel: true, confirmTxt: "sysConfirm", handler: this, callback: null,
                });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: msg, title: title, needCancel: true, confirmTxt: "acArcadeGameViewGoCharge-" + this.code, handler: this, callback: function () {
                        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW, { code: _this.code, aid: _this.aid });
                    }
                });
            }
            return;
        }
        this._upArrow.visible = true;
        this._selMask.visible = false;
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GEMLOTTERYDRAW, { activeId: this.acVo.aidAndCode, stype: num });
    };
    //转盘动画
    AcGemLotteryView.prototype.buyBtnHandlerCaller = function (event) {
        var _this = this;
        var data = event.data.data.data;
        if (!data) {
            App.CommonUtil.showTip(LanguageManager.getlocal("requestLoadErrorTip"));
            return;
        }
        if (event.data.data.ret == -3) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        // this.refreshUIInfo();
        var rewards = data.rewards || '';
        if (data.poolk) {
            this._isCircleRun = true;
            this._rewardItem = (Number(data.poolk) || 1) - 1;
            var total_1 = this.cfg.lotteryPoolLength;
            var turnRotation = 360 * 8 - 360 / total_1 * this._rewardItem;
            var turnTime = 5000 + Math.floor(Math.random() * 2000);
            var view_1 = this;
            var type = this.cfg.lotteryBasePool[String(data.poolk)].icon;
            egret.Tween.get(this._turnGroup, { onChange: function () {
                    view_1._upArrow.rotation = Math.sin(view_1._turnGroup.rotation);
                    for (var i = 0; i < total_1; ++i) {
                        var item = view_1._turnGroup2.getChildByName("item" + i);
                        if (item) {
                            item.rotation = 0 - view_1._turnGroup.rotation;
                        }
                    }
                    view_1._turnGroup2.rotation = view_1._turnGroup.rotation;
                } })
                .to({ rotation: turnRotation }, turnTime, egret.Ease.quartInOut)
                .call(this.showEffect, this)
                .call(this.refreshUIInfo, this)
                .call(this.playAni, this, [type])
                .wait(1800)
                .call(function () {
                view_1._upArrow.rotation = 0;
                _this._isCircleRun = false;
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { rewards: rewards, isPlayAni: true, callback: _this.hideAni, target: _this });
            });
        }
        else {
            this.refreshUIInfo();
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { rewards: rewards, isPlayAni: true });
        }
    };
    AcGemLotteryView.prototype.hideAni = function () {
        if (this._lotteryDro) {
            this._lotteryDro.stop();
            this._lotteryDro.visible = false;
        }
    };
    AcGemLotteryView.prototype.playAni = function (type) {
        if (this._lotteryDro) {
            type = Number(type);
            this._lotteryDro.visible = true;
            this._lotteryDro.stop();
            if (type < 3) {
                this._lotteryDro.playDragonMovie('idle_shao', 1);
            }
            else {
                this._lotteryDro.playDragonMovie('idle_duo', 1);
            }
        }
    };
    AcGemLotteryView.prototype.showEffect = function () {
        var skinClip = ComponentManager.getCustomMovieClip("zpzj_", 17, 100);
        var deltaS2 = 1;
        skinClip.width = 277 * deltaS2;
        skinClip.height = 289 * deltaS2;
        skinClip.anchorOffsetY = skinClip.height / 2;
        skinClip.anchorOffsetX = skinClip.width / 2;
        skinClip.blendMode = egret.BlendMode.ADD;
        skinClip.x = this._circleGroup.width / 2 + 3; // this._selMask.x ;//+ this._selMask.width/2;
        skinClip.y = this._selMask.y + this._selMask.height / 2 + 13;
        var _circleGroup = this._circleGroup;
        skinClip.playWithTime(1);
        egret.Tween.get(skinClip, { loop: false }).wait(1700).call(function () {
            _circleGroup.removeChild(skinClip);
            skinClip = null;
        }, this);
        var idx = this._circleGroup.getChildIndex(this._upArrow);
        this._circleGroup.addChildAt(skinClip, idx);
    };
    AcGemLotteryView.prototype.tick = function () {
        if (this.vo.isInActivity()) {
            var deltaT = this.acVo.et - GameData.serverTime;
            this._acCDTxt.text = LanguageManager.getlocal("acFanliReviewReward_acCD", [App.DateUtil.getFormatBySecond(deltaT, 8)]);
            this._acCDTxt.x = GameConfig.stageWidth - this._acCDTxt.width - 15;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acFanliReviewReward_acCD", [LanguageManager.getlocal('acPunishEnd')]);
            this._acCDTxt.x = GameConfig.stageWidth - this._acCDTxt.width - 15;
        }
    };
    Object.defineProperty(AcGemLotteryView.prototype, "cfg", {
        get: function () {
            return this.acVo.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGemLotteryView.prototype, "vo", {
        get: function () {
            return this.acVo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGemLotteryView.prototype, "acTivityId", {
        get: function () {
            return this.acVo.aidAndCode;
        },
        enumerable: true,
        configurable: true
    });
    // protected getRuleInfo(): string {
    //     return "acArcadeRuleInfo-" + this.code;
    // }
    // protected getRuleParam():string[]
    // {
    //     let cfg = this.acVo.config;
    // 	return [""+cfg.cost,""+cfg.addPrize,""+cfg.totalNum];
    // }
    AcGemLotteryView.prototype.getBgName = function () {
        return "gemlottery_bg";
    };
    AcGemLotteryView.prototype.getTitleBgName = function () {
        return "gemlottery_titlebg";
    };
    AcGemLotteryView.prototype.getTitleStr = function () {
        return null;
    };
    // protected  getUiCode():string
    // {
    //     return Number(this.code ) > 1 ? this.code : "";
    // }
    AcGemLotteryView.prototype.getResourceList = function () {
        var code = this.code;
        return _super.prototype.getResourceList.call(this).concat([
            "gemlottery_title-" + code,
            "gemlottery_arrow", "gemlottery_arrowhead", "gemlottery_bg", "gemlottery_bottombg",
            "gemlottery_circlecenter", "gemlottery_circle1", "gemlottery_circle2", "gemlottery_flower1",
            "gemlottery_flower2", "gemlottery_gemsmall", "gemlottery_selectmask",
            "gemlottery_titlebg", "gemlottery_descbg", "oneyearpack_fnt", "punish_reward_icon",
            "gemlottery_gem1", "gemlottery_gem2", "gemlottery_gem3", "gemlottery_gem4"
        ]);
    };
    AcGemLotteryView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GEMLOTTERYDRAW, this.buyBtnHandlerCaller, this);
        App.MessageHelper.removeEventListener(MessageConst.MESAAGE_GEMLOTTERY_FRESH_ITEM, this.refreshUIInfo, this);
        this._isCircleRun = false;
        this._turnTable = null;
        this._upArrow = null;
        this._activityTimerText = null;
        this._acCDTxt = null;
        this._ruleText = null;
        this._circleGroup = null;
        this._turnGroup = null;
        this._selMask = undefined;
        this._turnGroup2 = null;
        this._havenumTxt = null;
        this._lotteryDro = null;
        _super.prototype.dispose.call(this);
    };
    return AcGemLotteryView;
}(AcCommonView));
__reflect(AcGemLotteryView.prototype, "AcGemLotteryView");
