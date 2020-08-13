/*
author : yanyuling
desc : 周年庆特惠转盘活动
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
var AcOneYearPackView = (function (_super) {
    __extends(AcOneYearPackView, _super);
    function AcOneYearPackView() {
        var _this = _super.call(this) || this;
        _this._isCircleRun = false;
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._ruleText = null;
        _this._circleGroup = null;
        //底部进度条
        _this._progress = null;
        //转盘
        _this._turnTable = null;
        //向上的指针
        _this._upArrow = null;
        //转到奖励的光
        // private _selectLight: BaseBitmap = null;
        _this._turnGroup = null;
        _this._turnGroup2 = null;
        _this._selMask = undefined;
        _this._tickettxt = undefined;
        _this._lucktxt2 = undefined;
        _this._taskHand = null;
        _this._boxImg = null;
        _this._oldLuckValue = 0;
        _this._guanghuanBM = undefined;
        _this._curRewardBoxId = '';
        _this._rewardItem = 0;
        return _this;
    }
    AcOneYearPackView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GETPACKREWARD), this.buyBtnHandlerCaller, this);
        App.MessageHelper.addEventListener(MessageConst.MESAAGE_ONEPACK_VO_CHANGE, this.refreshUIInfo, this);
        var titletxt = BaseBitmap.create("oneyearpack_titletxt");
        titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
        // titletxt.y = 5;
        this.addChild(titletxt);
        //顶部背景图片
        var forpeople_top = BaseLoadBitmap.create('oneyearpack_topbg');
        forpeople_top.width = 640;
        forpeople_top.height = 146;
        this.addChildToContainer(forpeople_top);
        forpeople_top.y = 75;
        var flag = BaseBitmap.create("oneyear_flag");
        flag.x = GameConfig.stageWidth - flag.width - 60;
        flag.y = 35;
        this.addChild(flag);
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.x = 15;
        this._activityTimerText.y = 109 - 20;
        this._activityTimerText.text = this.acVo.getAcLocalTime(true);
        this.addChildToContainer(this._activityTimerText);
        var deltaY = 5;
        //倒计时文本 
        var acCDTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [""]);
        // acCDTxt.x = forpeople_top.x + forpeople_top.width - 220;//this._activityTimerText.x;
        // acCDTxt.y = this._activityTimerText.y ;//this._activityTimerText.y + this._activityTimerText.height + deltaY;
        acCDTxt.x = this._activityTimerText.x;
        acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + deltaY;
        this.addChildToContainer(acCDTxt);
        this._acCDTxt = acCDTxt;
        //规则
        this._ruleText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._ruleText.x = this._activityTimerText.x;
        this._ruleText.multiline = true;
        this._ruleText.lineSpacing = 4;
        this._ruleText.width = GameConfig.stageWidth - this._ruleText.x * 2;
        this._ruleText.y = this._acCDTxt.y + this._activityTimerText.height + deltaY;
        this._ruleText.text = LanguageManager.getlocal("acOneYearPackDesc-" + this.code, ["" + this.cfg.cost]);
        this.addChildToContainer(this._ruleText);
        //进度条
        this._progress = ComponentManager.getProgressBar("oneyearpack_progress", "oneyearpack_progressbg", 400);
        this._progress.x = GameConfig.stageWidth / 2 - this._progress.width / 2 + 10;
        this._progress.y = forpeople_top.y + forpeople_top.height + 50;
        // 
        this.addChildToContainer(this._progress);
        var lucknumbg = BaseBitmap.create("oneyearpack_luck_numng");
        lucknumbg.x = this._progress.x - lucknumbg.width + 10;
        lucknumbg.y = this._progress.y + this._progress.height / 2 - lucknumbg.height / 2 - 7;
        this.addChildToContainer(lucknumbg);
        var lucktxt1 = ComponentManager.getTextField("", 16, TextFieldConst.COLOR_WHITE);
        lucktxt1.text = LanguageManager.getlocal("acOneYearPack_lucktxt", [""]);
        lucktxt1.x = lucknumbg.x + lucknumbg.width / 2 - lucktxt1.width / 2 - 5;
        lucktxt1.y = lucknumbg.y + 30;
        this.addChildToContainer(lucktxt1);
        var luckicon = BaseBitmap.create("oneyearpack_luckIcon");
        luckicon.x = lucktxt1.x - 7;
        luckicon.y = lucktxt1.y + 20;
        this.addChildToContainer(luckicon);
        var lucktxt2 = ComponentManager.getTextField("100", 16, TextFieldConst.COLOR_WHITE);
        // lucktxt1.text = LanguageManager.getlocal("acFourPeople_acCD", [""]);
        lucktxt2.x = luckicon.x + luckicon.width + 0;
        lucktxt2.y = luckicon.y + 3;
        this.addChildToContainer(lucktxt2);
        this._lucktxt2 = lucktxt2;
        var boxImg = BaseBitmap.create("oneyearpack_box");
        boxImg.anchorOffsetX = boxImg.width / 2;
        boxImg.anchorOffsetY = boxImg.height / 2;
        boxImg.name = "boxImg";
        boxImg.x = this._progress.x + this._progress.width + boxImg.width / 2 - 23;
        boxImg.y = this._progress.y + this._progress.height / 2 + 5;
        boxImg.addTouchTap(this.boxPreviewBtnHandler, this);
        this._boxImg = boxImg;
        this._guanghuanBM = BaseBitmap.create("acturantable_taskbox_light");
        this._guanghuanBM.width *= 1.5;
        this._guanghuanBM.height *= 1.5;
        this._guanghuanBM.anchorOffsetX = this._guanghuanBM.width / 2;
        this._guanghuanBM.anchorOffsetY = this._guanghuanBM.height / 2;
        this._guanghuanBM.x = boxImg.x;
        this._guanghuanBM.y = boxImg.y;
        egret.Tween.get(this._guanghuanBM, { loop: true }).to({ rotation: this._guanghuanBM.rotation + 360 }, 10000);
        this._guanghuanBM.visible = false;
        this._guanghuanBM.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._guanghuanBM);
        this.addChildToContainer(boxImg);
        var ticketnumbg = BaseBitmap.create("oneyearpack_numbg");
        ticketnumbg.x = boxImg.x - boxImg.width / 2 - 20;
        ticketnumbg.y = boxImg.y + boxImg.height / 2 + 10;
        this.addChildToContainer(ticketnumbg);
        var ticketimg = BaseBitmap.create("oneyearpack_ticket");
        ticketimg.setScale(0.4);
        ticketimg.x = ticketnumbg.x + 20;
        ticketimg.y = ticketnumbg.y + ticketnumbg.height / 2 - ticketimg.height / 2 * ticketimg.scaleY;
        this.addChildToContainer(ticketimg);
        var tickettxt = ComponentManager.getTextField("999", 18, TextFieldConst.COLOR_WHITE);
        tickettxt.x = ticketimg.x + 50;
        tickettxt.y = ticketnumbg.y + ticketnumbg.height / 2 - tickettxt.height / 2 + 1;
        this.addChildToContainer(tickettxt);
        this._tickettxt = tickettxt;
        //bottomBg
        var bottomBg = BaseBitmap.create("oneyearpack_bottombg");
        // bottomBg.height = 120 + (adaptiveVal>1 ? (adaptiveVal-1) * 100 : 0);
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
        this.addChildToContainer(bottomBg);
        var visitBg = BaseBitmap.create("mainui_bottombtnbg");
        visitBg.x = GameConfig.stageWidth - visitBg.width - 20;
        visitBg.y = bottomBg.y - visitBg.height - 20;
        this.addChildToContainer(visitBg);
        //查看奖励
        var ckjliBtn = ComponentManager.getButton('oneyearpack_previeIcon', "", this.skinPreviewBtnHandler, this);
        ckjliBtn.x = visitBg.x + visitBg.width / 2 - ckjliBtn.width / 2;
        ckjliBtn.y = visitBg.y + visitBg.height / 2 - ckjliBtn.height / 2;
        this.addChildToContainer(ckjliBtn);
        var ckjllFont = BaseBitmap.create('oneyearpack_previewtxt');
        ckjllFont.x = visitBg.x + visitBg.width / 2 - ckjllFont.width / 2;
        ckjllFont.y = visitBg.y + visitBg.height - ckjllFont.height;
        this.addChildToContainer(ckjllFont);
        //转盘父节点
        this._circleGroup = new BaseDisplayObjectContainer();
        this._circleGroup.width = GameConfig.stageWidth;
        this._circleGroup.height = 550;
        this._circleGroup.x = 0;
        this._circleGroup.y = (bottomBg.y - this._progress.y - 40) / 2 + this._progress.y + 40 - this._circleGroup.height / 2;
        // this._progress.y + 15 + (numBg.y - this._progress.y + 15)/2 - this._circleGroup.height/2;
        this.addChildToContainer(this._circleGroup);
        //bottom里面的组件
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
        //转动一次按钮文字
        var onceBtnIcon = BaseBitmap.create("oneyearpack_ticket");
        onceBtnIcon.setScale(0.4);
        onceBtnIcon.x = onceBtn.x + onceBtn.width / 2 - onceBtnIcon.width * onceBtnIcon.scaleY;
        onceBtnIcon.y = onceBtn.y - onceBtnIcon.scaleY * onceBtnIcon.height;
        this.addChildToContainer(onceBtnIcon);
        var onceBtnIconDescText = ComponentManager.getTextField("x1", 28, TextFieldConst.COLOR_LIGHT_YELLOW);
        onceBtnIconDescText.x = onceBtnIcon.x + onceBtnIcon.width * onceBtnIcon.scaleX;
        onceBtnIconDescText.y = onceBtnIcon.y + onceBtnIcon.height / 2 * onceBtnIcon.scaleY - onceBtnIconDescText.height / 2 + 7;
        this.addChildToContainer(onceBtnIconDescText);
        var tenBtnIcon = BaseBitmap.create("oneyearpack_ticket");
        tenBtnIcon.setScale(onceBtnIcon.scaleX);
        tenBtnIcon.x = tenBtn.x + tenBtn.width / 2 - tenBtnIcon.width * onceBtnIcon.scaleY;
        tenBtnIcon.y = onceBtnIcon.y;
        this.addChildToContainer(tenBtnIcon);
        var tenBtnIconDescText = ComponentManager.getTextField("x10", 28, TextFieldConst.COLOR_LIGHT_YELLOW);
        tenBtnIconDescText.x = tenBtnIcon.x + 100 * tenBtnIcon.scaleX;
        tenBtnIconDescText.y = onceBtnIconDescText.y;
        this.addChildToContainer(tenBtnIconDescText);
        //转盘
        var circleBg = BaseBitmap.create("oneyearpack_circle2");
        circleBg.x = this._circleGroup.width / 2 - circleBg.width / 2;
        circleBg.y = this._circleGroup.height / 2 - circleBg.height / 2;
        this._circleGroup.addChild(circleBg);
        //转盘
        this._turnTable = BaseBitmap.create("oneyearpack_circle1");
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
        var sel_mask = BaseBitmap.create("oneyearpack_selectmask");
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
        this._upArrow = BaseBitmap.create("oneyearpack_arrow");
        this._upArrow.anchorOffsetX = this._upArrow.width / 2;
        this._upArrow.anchorOffsetY = 20; //this._upArrow.height;
        this._upArrow.x = this._circleGroup.width / 2;
        this._upArrow.y = circleBg.y; // circleBg.y - 20 ;//this._circleGroup.height;
        this._circleGroup.addChild(this._upArrow);
        var midCircle = BaseBitmap.create("oneyearpack_circle_center");
        midCircle.x = this._circleGroup.width / 2 - midCircle.width / 2;
        midCircle.y = this._circleGroup.height / 2 - midCircle.height / 2;
        this._circleGroup.addChild(midCircle);
        var flower1 = BaseBitmap.create("oneyearpack_flower1");
        flower1.x = circleBg.x + 15;
        flower1.y = circleBg.y + circleBg.height - flower1.height - 10;
        this._circleGroup.addChild(flower1);
        var flower2 = BaseBitmap.create("oneyearpack_flower2");
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
            rewardTab.push(cfg.lotteryPool[key].reward);
        }
        var centerX = this._turnGroup.width / 2;
        var centerY = this._turnGroup.height / 2;
        var rIcons = GameData.formatRewardItem(rewardTab.join("|"));
        for (var i = 0; i < total; ++i) {
            //计算角度
            var angle = 360 / total * rad * i;
            //加物品icon
            var tmpItemvo = rIcons[i];
            var itemicon = BaseLoadBitmap.create(tmpItemvo.icon);
            itemicon.width = itemicon.height = 100;
            itemicon.setScale(0.6);
            itemicon.anchorOffsetX = itemicon.width / 2;
            itemicon.anchorOffsetY = itemicon.height / 2;
            // let itemX = (radius + 30) * Math.sin(angle + 360 / total * rad / 2) / 2;
            // let itemY = (radius + 30) * Math.cos(angle + 360 / total * rad / 2) / 2;
            var itemX = (radius) * Math.sin(angle) / 2;
            var itemY = (radius) * Math.cos(angle) / 2;
            itemicon.x = centerX + itemX; // + (itemX > 0 ? -1 : 1) * itemicon.width * Math.sin(angle + 360 / total * rad / 2) / 2;
            itemicon.y = centerY - itemY; // + (itemY > 0 ? -1 : 1) * itemicon.height * Math.cos(angle + 360 / total * rad / 2) / 2;
            itemicon.name = "item" + i;
            this._turnGroup2.addChild(itemicon);
            itemicon.addTouchTap(function (event, item) {
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, item);
            }, this, [tmpItemvo]);
            var tmpcon = new BaseDisplayObjectContainer();
            var luckicon_1 = BaseBitmap.create("oneyearpack_luckIcon");
            tmpcon.addChild(luckicon_1);
            var lucktxt2_1 = ComponentManager.getBitmapText("+" + cfg.lotteryPool["" + (i + 1)].luckValue, "oneyearpack_fnt"); //ComponentManager.getTextField("+100", 16, TextFieldConst.COLOR_WHITE);
            lucktxt2_1.x = luckicon_1.x + luckicon_1.width + 2;
            lucktxt2_1.y = luckicon_1.y + 3;
            tmpcon.addChild(lucktxt2_1);
            tmpcon.anchorOffsetX = tmpcon.width / 2;
            tmpcon.anchorOffsetY = tmpcon.height / 2;
            tmpcon.rotation = 360 / total * i;
            tmpcon.x = centerX + itemX * 1.44;
            tmpcon.y = centerY - itemY * 1.44;
            this._turnGroup2.addChild(tmpcon);
        }
        // punish_reward_icon
        this.showFirstDialog();
        this.refreshUIInfo();
        this.tick();
    };
    AcOneYearPackView.prototype.refreshUIInfo = function () {
        if (this.vo.stagenum == 0) {
            this._progress.setPercentage(this.vo.score / this.cfg.luckExchangePoint1);
        }
        else {
            this._progress.setPercentage(this.vo.score / this.cfg.luckExchangePoint2);
        }
        this._tickettxt.text = "" + Api.itemVoApi.getItemNumInfoVoById(this.cfg.drawItemID);
        this._lucktxt2.text = "" + this.vo.score;
        this._guanghuanBM.visible = false;
        egret.Tween.removeTweens(this._boxImg);
        if (this._progress.getPercent() >= 1.0) {
            egret.Tween.get(this._boxImg, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
            this._guanghuanBM.visible = true;
        }
    };
    AcOneYearPackView.prototype.boxPreviewBtnHandler = function () {
        if (this._taskHand) {
            this._taskHand.visible = false;
            egret.Tween.removeTweens(this._taskHand);
        }
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var stagenum = this.vo.stagenum; // Api.itemVoApi.getItemNumInfoVoById(this.cfg.drawItemID);
        if (stagenum == 0 && this.vo.score < this.cfg.luckExchangePoint1) {
            var data = [this.cfg.luckExchangePoint1, this.cfg.luckExchangePoint2, this.cfg.packItemID];
            ViewController.getInstance().openView(ViewConst.POPUP.ACONEYEARPACKBOXPREVIEWPOPUPVIEW, { data: data });
            return;
        }
        if (stagenum > 0 && this.vo.score < this.cfg.luckExchangePoint2) {
            var data = [this.cfg.luckExchangePoint2, this.cfg.luckExchangePoint2, this.cfg.packItemID];
            ViewController.getInstance().openView(ViewConst.POPUP.ACONEYEARPACKBOXPREVIEWPOPUPVIEW, { data: data });
            return;
        }
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETPACK_BOXREWARD, this.boxHandlerCaller, this);
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETPACK_BOXREWARD, { activeId: this.acVo.aidAndCode });
    };
    AcOneYearPackView.prototype.boxHandlerCaller = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETPACK_BOXREWARD, this.boxHandlerCaller, this);
        if (event.data.data.ret == 0) {
            var data = event.data.data.data;
            var rewards = data.rewards || '';
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "isPlayAni": true });
        }
        this.refreshUIInfo();
        // let rewardList =  GameData.formatRewardItem(rewards);
        // App.CommonUtil.playRewardFlyAction(rewardList);
    };
    AcOneYearPackView.prototype.skinPreviewBtnHandler = function () {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var wskincfg = Config.WifeskinCfg.getWifeCfgById(this.cfg.packItemID);
        ViewController.getInstance().openView(ViewConst.COMMON.ACONEYEARPACKSKINVIEW, { aid: this.aid, code: this.code });
    };
    //购买按钮点击
    AcOneYearPackView.prototype.buyBtnHandler = function (num) {
        var _this = this;
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._isCircleRun) {
            return;
        }
        // if(this.vo.et - GameData.serverTime - 86400 * 1 <= 0){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("buy_error"));
        //     return;
        // }
        var drawItemID = this.cfg.drawItemID;
        var itemnum = Api.itemVoApi.getItemNumInfoVoById(drawItemID);
        if (itemnum < num) {
            var msg = LanguageManager.getlocal("acOneYearPack_item_notenough-" + this.code);
            // App.CommonUtil.showTip(msg);
            var title = "itemUseConstPopupViewTitle";
            if (PlatformManager.checkHideIconByIP()) {
                msg = LanguageManager.getlocal("acOneYearPack_TipMsg_hideByIp-" + this.code, ["" + Api.playerVoApi.getPlayerGem()]);
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
        this._oldLuckValue = this.vo.score;
        this._selMask.visible = false;
        var view = this;
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETPACKREWARD, { activeId: this.acVo.aidAndCode, lotterynum: num });
    };
    //转盘动画
    AcOneYearPackView.prototype.buyBtnHandlerCaller = function (event) {
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
        var reward_arr = rewards.split('|');
        var tipMsg = LanguageManager.getlocal("acOneYearPack_addluckyvalue", ["" + (this.vo.score - this._oldLuckValue)]);
        if (reward_arr.length == 1) {
            this._isCircleRun = true;
            this._rewardItem = this.cfg.getSelectItemIdx(rewards) - 1;
            var total_1 = this.cfg.lotteryPoolLength;
            var turnRotation = 360 * 8 - 360 / total_1 * this._rewardItem;
            var turnTime = 5000 + Math.floor(Math.random() * 2000);
            var view_1 = this;
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
                .wait(1800)
                .call(function () {
                view_1._upArrow.rotation = 0;
                _this._isCircleRun = false;
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "isPlayAni": true, showTip: tipMsg });
            });
        }
        else {
            this.refreshUIInfo();
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "isPlayAni": true, showTip: tipMsg });
        }
    };
    AcOneYearPackView.prototype.showEffect = function () {
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
    AcOneYearPackView.prototype.tick = function () {
        var deltaT = this.acVo.acCountDown;
        var cdStrK = "acFanliReviewReward_acCD";
        if (this._acCDTxt && deltaT) {
            if (GameData.serverTime < this.vo.et) {
                this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [deltaT]);
            }
            else {
                this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
            }
            return true;
        }
        return false;
    };
    AcOneYearPackView.prototype.showFirstDialog = function () {
        if (!this.vo.getOpened()) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG, { "activeId": this.vo.aidAndCode, flagkey: "opened", value: 1 });
            this.checkHand();
        }
    };
    AcOneYearPackView.prototype.checkHand = function () {
        var posX = this._boxImg.x + 0;
        var posY = this._boxImg.y + 0;
        this._taskHand = BaseBitmap.create("guide_hand");
        this._taskHand.x = posX;
        this._taskHand.y = posY;
        this._taskHand.setScale(0.5);
        this.addChildToContainer(this._taskHand);
        egret.Tween.get(this._taskHand, { loop: true })
            .to({ y: posY - 5, scaleX: 0.4, scaleY: 0.4 }, 500)
            .to({ y: posY, scaleX: 0.5, scaleY: 0.5 }, 500);
    };
    Object.defineProperty(AcOneYearPackView.prototype, "cfg", {
        get: function () {
            return this.acVo.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcOneYearPackView.prototype, "vo", {
        get: function () {
            return this.acVo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcOneYearPackView.prototype, "acTivityId", {
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
    AcOneYearPackView.prototype.getBgName = function () {
        return "oneyearpack_bg";
    };
    AcOneYearPackView.prototype.getTitleBgName = function () {
        return "oneyearpack_titlebg";
    };
    AcOneYearPackView.prototype.getTitleStr = function () {
        return null;
    };
    // protected  getUiCode():string
    // {
    //     return Number(this.code ) > 1 ? this.code : "";
    // }
    AcOneYearPackView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "oneyearpack_arrow", "oneyearpack_bg", "oneyearpack_bottombg",
            "oneyearpack_box", "oneyearpack_circle_center", "oneyearpack_circle1",
            "oneyearpack_circle2", "oneyearpack_flag1", "oneyearpack_flower1",
            "oneyearpack_flower2", "oneyearpack_luck_numng", "oneyearpack_luckIcon", "oneyearpack_numbg",
            ,
            "oneyearpack_previewtxt", "oneyearpack_progress", "oneyearpack_progressbg", "oneyearpack_selectmask",
            "oneyearpack_ticket", "oneyearpack_titlebg", "oneyearpack_titletxt", "oneyearpack_topbg", "oneyearpack_fnt",
            "punish_reward_icon", "guide_hand", "acturantable_taskbox_light", "oneyear_flag", "oneyearpack_previeIcon"
        ]);
    };
    AcOneYearPackView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GETPACKREWARD), this.buyBtnHandlerCaller, this);
        App.MessageHelper.removeEventListener(MessageConst.MESAAGE_ONEPACK_VO_CHANGE, this.refreshUIInfo, this);
        this._progress = null;
        this._isCircleRun = false;
        this._turnTable = null;
        this._upArrow = null;
        this._activityTimerText = null;
        this._acCDTxt = null;
        this._ruleText = null;
        this._circleGroup = null;
        this._turnGroup = null;
        this._selMask = undefined;
        this._tickettxt = undefined;
        this._lucktxt2 = undefined;
        this._turnGroup2 = null;
        this._taskHand = null;
        this._boxImg = null;
        this._oldLuckValue = 0;
        this._guanghuanBM = null;
        _super.prototype.dispose.call(this);
    };
    return AcOneYearPackView;
}(AcCommonView));
__reflect(AcOneYearPackView.prototype, "AcOneYearPackView");
