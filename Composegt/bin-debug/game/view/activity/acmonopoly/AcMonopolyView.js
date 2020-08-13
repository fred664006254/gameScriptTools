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
/**
 * author yanyuling
 */
var AcMonopolyView = (function (_super) {
    __extends(AcMonopolyView, _super);
    function AcMonopolyView() {
        var _this = _super.call(this) || this;
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._ruleText = null;
        _this._isPlaying = false;
        _this._iconList = [];
        _this._selectMask = undefined;
        _this._lastPos = 0;
        _this._finalPosRewards = "";
        return _this;
    }
    Object.defineProperty(AcMonopolyView.prototype, "acVo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcMonopolyView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MONOPOLY_TASK_REFRESH, this.refreshTaskRed, this);
        this.viewBg.y = 40;
        var flipcard_txt = BaseBitmap.create("monopoly_txt1");
        flipcard_txt.x = GameConfig.stageWidth / 2 - flipcard_txt.width / 2;
        flipcard_txt.y = 0;
        this.addChild(flipcard_txt);
        //顶部
        var flipcard_bg06 = BaseBitmap.create("monopoly_bg11");
        // flipcard_bg06.width = GameConfig.stageWidth;//-10;
        // flipcard_bg06.height = 180;
        flipcard_bg06.x = GameConfig.stageWidth / 2 - flipcard_bg06.width / 2;
        flipcard_bg06.y = 70;
        this.addChildToContainer(flipcard_bg06);
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.x = flipcard_bg06.x + 15;
        this._activityTimerText.y = flipcard_bg06.y + 13;
        this._activityTimerText.text = this.acVo.getAcLocalTime(true, "0xffffff");
        this.addChildToContainer(this._activityTimerText);
        var deltaY = 5;
        //倒计时文本 
        var acCDTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        acCDTxt.text = LanguageManager.getlocal("acMonopoly_acCD", [""]);
        acCDTxt.x = this._activityTimerText.x;
        acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + deltaY;
        this.addChildToContainer(acCDTxt);
        this._acCDTxt = acCDTxt;
        //规则
        this._ruleText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), 20);
        this._ruleText.x = this._activityTimerText.x;
        this._ruleText.y = this._acCDTxt.y + this._activityTimerText.height + deltaY;
        this._ruleText.multiline = true;
        this._ruleText.lineSpacing = 3;
        this._ruleText.width = flipcard_bg06.width - this._activityTimerText.x * 2;
        this._ruleText.text = LanguageManager.getlocal("acMonopoly_Rule" + this.code);
        this.addChildToContainer(this._ruleText);
        //底部
        var bottombg = BaseBitmap.create("monopoly_bg3");
        bottombg.x = 0;
        bottombg.y = GameConfig.stageHeigth - bottombg.height - this.container.y;
        ;
        this.addChildToContainer(bottombg);
        // 任务
        var iconBg = BaseBitmap.create("mainui_bottombtnbg");
        iconBg.x = 70;
        iconBg.y = bottombg.y + bottombg.height / 2 - iconBg.height / 2;
        iconBg.addTouchTap(this.taskBtnHandler, this);
        this.addChildToContainer(iconBg);
        // iconBg.visible = false;
        var taskButton = ComponentManager.getButton("punish_reward_icon", "", this.taskBtnHandler, this);
        taskButton.width = taskButton.height = 80;
        taskButton.x = iconBg.x + iconBg.width / 2 - taskButton.width / 2;
        taskButton.y = iconBg.y + iconBg.height / 2 - taskButton.height / 2;
        this.addChildToContainer(taskButton);
        this._taskBtn = taskButton;
        var taskButtonTxt = BaseBitmap.create("acspringouting_taskname-1");
        taskButtonTxt.x = taskButton.x + taskButton.width / 2 - taskButtonTxt.width / 2 + 3;
        taskButtonTxt.y = taskButton.y + 57;
        this.addChildToContainer(taskButtonTxt);
        // 奖励
        var iconBg2 = BaseBitmap.create("mainui_bottombtnbg");
        iconBg2.x = GameConfig.stageWidth - iconBg2.width - iconBg.x;
        iconBg2.y = iconBg.y;
        iconBg.addTouchTap(this.rewardBtnHandler, this);
        this.addChildToContainer(iconBg2);
        var rewardButton = ComponentManager.getButton("acspringouting_taskicon-1", "", this.rewardBtnHandler, this);
        rewardButton.x = iconBg2.x + iconBg2.width / 2 - rewardButton.width / 2;
        rewardButton.y = taskButton.y;
        this.addChildToContainer(rewardButton);
        this._rewardButton = rewardButton;
        var rewardButtonTxt = BaseBitmap.create("activity_reward_txt");
        rewardButtonTxt.x = rewardButton.x + rewardButton.width / 2 - rewardButtonTxt.width / 2 + 3;
        rewardButtonTxt.y = taskButtonTxt.y;
        this.addChildToContainer(rewardButtonTxt);
        //中间骰子
        var monopoly_bg10 = BaseBitmap.create("monopoly_bg10");
        monopoly_bg10.x = bottombg.x + bottombg.width / 2 - monopoly_bg10.width / 2;
        monopoly_bg10.y = bottombg.y + bottombg.height / 2 - monopoly_bg10.height / 2 + 12;
        this.addChildToContainer(monopoly_bg10);
        var stepIcon = BaseBitmap.create("monopoly_icon_btn"); //ComponentManager.getButton("monopoly_icon_btn","",this.stepBtnClick,this);
        stepIcon.addTouchTap(this.stepBtnClick, this);
        this._stepIconBtn = stepIcon;
        stepIcon.width = stepIcon.height = 100;
        stepIcon.x = monopoly_bg10.x + monopoly_bg10.width / 2;
        stepIcon.y = monopoly_bg10.y + monopoly_bg10.height / 2;
        this.addChildToContainer(stepIcon);
        this._stepIconBtn.anchorOffsetX = this._stepIconBtn.width / 2;
        this._stepIconBtn.anchorOffsetY = this._stepIconBtn.height / 2;
        this.dealStepIconAni();
        var lastnumbg = BaseBitmap.create("monopoly_bg8");
        lastnumbg.x = monopoly_bg10.x + monopoly_bg10.width / 2 - lastnumbg.width / 2;
        lastnumbg.y = monopoly_bg10.y + monopoly_bg10.height - lastnumbg.height / 2 - 10;
        this.addChildToContainer(lastnumbg);
        var searchtxt1 = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_QUALITY_YELLOW);
        searchtxt1.text = LanguageManager.getlocal("acMonopoly_txt2");
        searchtxt1.x = lastnumbg.x + lastnumbg.width / 2 - searchtxt1.width / 2;
        searchtxt1.y = lastnumbg.y + lastnumbg.height / 2 - searchtxt1.height / 2;
        this.addChildToContainer(searchtxt1);
        //剩余次数
        this._lastTimesTxt = ComponentManager.getTextField("123", TextFieldConst.FONTSIZE_CONTENT_SMALL); // ,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._lastTimesTxt.text = "0";
        this._lastTimesTxt.anchorOffsetX = this._lastTimesTxt.width / 2;
        this._lastTimesTxt.x = monopoly_bg10.x + monopoly_bg10.width / 2;
        this._lastTimesTxt.y = monopoly_bg10.y - 18;
        this.addChildToContainer(this._lastTimesTxt);
        // let startX = 5;
        // let startY = flipcard_bg06.y + flipcard_bg06.height + 10;
        var startX = 5;
        var startY = 5;
        var cfg = this.acVo.config;
        var diceGrid = cfg.diceGrid;
        var diceMaxNum = cfg.diceMaxNum;
        this._scrollNode = new BaseDisplayObjectContainer();
        var keys = Object.keys(diceGrid);
        var len = keys.length;
        var _loop_1 = function () {
            var rewardvo = undefined;
            var monopoly_bg = BaseBitmap.create("monopoly_bg9");
            if (index == 0) {
                monopoly_bg.texture = ResourceManager.getRes("monopoly_start");
            }
            else if (index == len + 1) {
                monopoly_bg.texture = ResourceManager.getRes("monopoly_end");
            }
            else {
                element = diceGrid[keys[index - 1]];
                rewardvo = GameData.formatRewardItem(element.gridReward)[0];
                monopoly_bg.addTouchTap(function () {
                    ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, rewardvo);
                }, this_1);
            }
            monopoly_bg.x = startX;
            monopoly_bg.y = startY;
            this_1._scrollNode.addChild(monopoly_bg);
            this_1._iconList.push(monopoly_bg);
            if ((index <= 4) || (index > 15 && index <= 20) || (index > 31 && index <= 36)) {
                startX += monopoly_bg.width + 1;
            }
            else if ((index > 4 && index <= 7) || (index > 12 && index <= 15) || (index > 20 && index <= 23) || (index > 28 && index <= 31) || (index > 36 && index <= 39)) {
                startY += monopoly_bg.height + 1;
            }
            else if ((index > 7 && index <= 12) || (index > 23 && index <= 28) || (index > 39 && index <= 44)) {
                startX -= monopoly_bg.width + 1;
            }
            if (rewardvo) {
                var rewardicon = BaseLoadBitmap.create(rewardvo.icon);
                rewardicon.width = rewardicon.height = 100;
                rewardicon.x = monopoly_bg.x + monopoly_bg.width / 2 - rewardicon.width / 2;
                rewardicon.y = monopoly_bg.y + monopoly_bg.height / 2 - rewardicon.height / 2;
                this_1._scrollNode.addChild(rewardicon);
            }
            // let txt = ComponentManager.getTextField(""+index,TextFieldConst.FONTSIZE_CONTENT_SMALL ,TextFieldConst.COLOR_LIGHT_YELLOW);
            // txt.x = monopoly_bg.x + 20 ;
            // txt.y = monopoly_bg.y + 20;
            // this._scrollNode.addChild(txt);
        };
        var this_1 = this, element;
        for (var index = 0; index < len + 2; index++) {
            _loop_1();
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, bottombg.y - flipcard_bg06.y - flipcard_bg06.height - 10);
        this._scrollView = ComponentManager.getScrollView(this._scrollNode, rect);
        this._scrollView.x = 0;
        this._scrollView.y = flipcard_bg06.y + flipcard_bg06.height + 5;
        this._scrollView.bounces = false;
        this._scrollView.horizontalScrollPolicy = "off";
        this.addChildToContainer(this._scrollView);
        var public_alphabg = BaseBitmap.create("public_alphabg");
        public_alphabg.width = this._scrollNode.width;
        public_alphabg.height = this._scrollNode.height;
        ;
        this._scrollNode.addChild(public_alphabg);
        //monopoly_bg4
        var monopoly_bg4 = BaseBitmap.create("monopoly_bg4");
        monopoly_bg4.x = 60;
        monopoly_bg4.y = 150;
        this._scrollNode.addChild(monopoly_bg4);
        var userhead = Api.playerVoApi.getUserCircleHead(Api.playerVoApi.getPlayePicId(), this.acVo.config.diceTitleID);
        userhead.x = monopoly_bg4.x + 40;
        userhead.y = monopoly_bg4.y + 2;
        this._scrollNode.addChild(userhead);
        var txt = ComponentManager.getTextField("" + index, 20);
        txt.text = LanguageManager.getlocal("acMonopoly_headtxt_" + this.code);
        txt.multiline = true;
        txt.lineSpacing = 3;
        txt.width = 210;
        txt.height = monopoly_bg4.height - 40;
        txt.verticalAlign = egret.VerticalAlign.MIDDLE;
        txt.x = monopoly_bg4.x + 160;
        txt.y = monopoly_bg4.y + 10;
        this._scrollNode.addChild(txt);
        this._selectMask = new BaseDisplayObjectContainer();
        this._selectMask.width = 112;
        this._selectMask.height = 112;
        // BaseBitmap.create("monopoly_select");
        this._scrollNode.addChildAt(this._selectMask, 0);
        this._selectHeadNode = new BaseDisplayObjectContainer();
        this._selectHeadNode.width = this._selectMask.width;
        this._selectHeadNode.height = this._selectMask.height;
        var monopoly_bg12 = BaseBitmap.create("monopoly_bg12");
        monopoly_bg12.x = this._selectHeadNode.width / 2 - monopoly_bg12.width / 2;
        monopoly_bg12.y = this._selectHeadNode.height / 2 - monopoly_bg12.height / 2 - 10;
        this._selectHeadNode.addChild(monopoly_bg12);
        this._scrollNode.addChild(this._selectHeadNode);
        var boxClip = ComponentManager.getCustomMovieClip("monopoly_anibox", 7, 150);
        var deltaS = 1.0;
        boxClip.width = 160 * deltaS;
        boxClip.height = 160 * deltaS;
        boxClip.anchorOffsetY = boxClip.height / 2;
        boxClip.anchorOffsetX = boxClip.width / 2;
        boxClip.x = this._selectHeadNode.width / 2;
        boxClip.y = this._selectHeadNode.height / 2;
        // boxClip.blendMode = egret.BlendMode.ADD;
        this._selectMask.addChild(boxClip);
        boxClip.playWithTime(0);
        var headClip = ComponentManager.getCustomMovieClip("monopoly_ani_head", 7, 100);
        var deltaS2 = 1.0;
        headClip.width = 120 * deltaS2;
        headClip.height = 120 * deltaS2;
        headClip.anchorOffsetY = headClip.height / 2;
        headClip.anchorOffsetX = headClip.width / 2;
        headClip.x = this._selectHeadNode.width / 2;
        headClip.y = this._selectHeadNode.height / 2 - 10;
        // headClip.blendMode = egret.BlendMode.ADD;
        this._selectHeadNode.addChild(headClip);
        headClip.playWithTime(0);
        var headimg = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPath());
        var deltaS3 = 0.6;
        headimg.width = 136 * deltaS3;
        headimg.height = 143 * deltaS3;
        headimg.x = monopoly_bg12.x + monopoly_bg12.width / 2 - headimg.width / 2;
        headimg.y = monopoly_bg12.y + monopoly_bg12.height / 2 - headimg.height / 2 - 8;
        this._selectHeadNode.addChild(headimg);
        this._lastPos = this.acVo.position;
        this.adjustSelectPos(this.acVo.position);
        this.refreshTaskRed();
        this.adjustScrolPos();
        this.tick();
    };
    AcMonopolyView.prototype.dealStepIconAni = function () {
        egret.Tween.removeTweens(this._stepIconBtn);
        egret.Tween.get(this._stepIconBtn, { loop: true }).to({ scaleX: 1.1, scaleY: 1.1 }, 200).wait(600).to({ scaleX: 1, scaleY: 1 }, 200);
        egret.Tween.get(this._stepIconBtn, { loop: true }).wait(130).to({ rotation: -20 }, 70).to({ rotation: 16 }, 70).to({ rotation: -14 }, 130).to({ rotation: 12 }, 130).to({ rotation: -10 }, 140).to({ rotation: 8 }, 130).to({ rotation: 0 }, 130);
    };
    AcMonopolyView.prototype.refreshUI = function () {
        this._lastTimesTxt.text = LanguageManager.getlocal("acMonopoly_txt3", ["" + this.acVo.dicenum]);
        this._lastTimesTxt.anchorOffsetX = this._lastTimesTxt.width / 2;
    };
    AcMonopolyView.prototype.doStepAni = function () {
        var endPos = this.acVo.position;
        if (endPos == 0) {
            endPos = this._iconList.length - 1;
        }
        var deltat = 300;
        if (this._lastPos <= endPos) {
            this.adjustSelectPos(this._lastPos);
            this._lastPos += 1;
            egret.Tween.get(this._selectHeadNode, { loop: false }).wait(deltat).call(this.doStepAni, this);
            this.adjustScrolPos(deltat);
        }
        else {
            // let rList = GameData.formatRewardItem(this._finalPosRewards);
            // App.CommonUtil.playRewardFlyAction(rList);
            //添加动画 "monopoly_ani_head","monopoly_anibox",
            var boxClip_1 = ComponentManager.getCustomMovieClip("monopoly_target", 7, 100);
            var deltaS = 1.0;
            boxClip_1.width = 200 * deltaS;
            boxClip_1.height = 200 * deltaS;
            boxClip_1.anchorOffsetY = boxClip_1.height / 2;
            boxClip_1.anchorOffsetX = boxClip_1.width / 2;
            boxClip_1.x = this._selectHeadNode.x + this._selectHeadNode.width / 2;
            boxClip_1.y = this._selectHeadNode.y + this._selectHeadNode.height / 2;
            boxClip_1.blendMode = egret.BlendMode.ADD;
            this._scrollNode.addChild(boxClip_1);
            boxClip_1.playWithTime(1);
            egret.Tween.pauseTweens(this._stepIconBtn);
            var tmpthis_1 = this;
            egret.Tween.get(this, { loop: false }).wait(700).call(function () {
                tmpthis_1._scrollNode.removeChild(boxClip_1);
                boxClip_1 = null;
            }, this).wait(200).call(this.showRewardUI, this);
        }
    };
    AcMonopolyView.prototype.showRewardUI = function () {
        this._isPlaying = false;
        if (this.acVo.position == 0) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACMONOPOLYREWARDPOPUPVIEW, {
                turn: this.acVo.theturn,
                aid: this.aid,
                code: this.code,
                rewards: this._finalPosRewards,
                tarobj: this,
                callback: this.showRewardCallback,
            });
        }
        else {
            this.adjustSelectPos(this.acVo.position);
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": this._finalPosRewards, "otherRewards": null, "isPlayAni": true, callback: this.dealStepIconAni, target: this });
        }
    };
    AcMonopolyView.prototype.showRewardCallback = function () {
        this.dealStepIconAni(); //,this)
        this._lastPos = this.acVo.position;
        this.adjustSelectPos(this.acVo.position);
        this.adjustScrolPos();
    };
    AcMonopolyView.prototype.adjustSelectPos = function (posidx) {
        this._selectHeadNode.x = this._selectMask.x = this._iconList[posidx].x - 5;
        this._selectHeadNode.y = this._selectMask.y = this._iconList[posidx].y - 5;
    };
    AcMonopolyView.prototype.adjustScrolPos = function (deltat) {
        if (deltat === void 0) { deltat = 0; }
        deltat = deltat || 0;
        var toptop = this._scrollView.scrollTop;
        var diffY = toptop + this._selectHeadNode.y;
        if (this._selectHeadNode.y - 30 < toptop) {
            this._scrollView.setScrollTop(0, 300);
        }
        else if (this._selectHeadNode.y - toptop > this._scrollView.height - 20) {
            this._scrollView.setScrollTop(this._scrollNode.height - this._scrollView.height + 150, deltat);
        }
    };
    AcMonopolyView.prototype.stepBtnClick = function () {
        if (this._isPlaying) {
            return;
        }
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.acVo.dicenum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acMonopoly_nettip2'));
            return;
        }
        this._isPlaying = true;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2_MONOPOLY_GET_DICING, this.stepHandlerNetBack, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2_MONOPOLY_GET_DICING, { activeId: this.acVo.aidAndCode });
    };
    AcMonopolyView.prototype.stepHandlerNetBack = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2_MONOPOLY_GET_DICING, this.stepHandlerNetBack, this);
        if (event.data.data.ret === 0) {
            var rdata = event.data.data.data;
            var rewards = rdata.rewards;
            var step_1 = rdata.step;
            // let position = this._lastPos;
            // let max = this._iconList.length;
            // if(position + step > max){
            //     step = max - position;
            // }
            var treasureboxClip_1 = ComponentManager.getCustomMovieClip("treasurebox1-", 12, 80);
            var deltaS2 = 1.0;
            treasureboxClip_1.width = 100 * deltaS2;
            treasureboxClip_1.height = 100 * deltaS2;
            treasureboxClip_1.anchorOffsetX = treasureboxClip_1.width / 2;
            treasureboxClip_1.anchorOffsetY = treasureboxClip_1.height / 2;
            treasureboxClip_1.x = this._stepIconBtn.x;
            treasureboxClip_1.y = this._stepIconBtn.y;
            this.addChildToContainer(treasureboxClip_1);
            treasureboxClip_1.playWithTime(1);
            this._finalPosRewards = rewards;
            // this.dealStepIconAni();
            egret.Tween.removeTweens(this._stepIconBtn);
            var tmpthis_2 = this;
            egret.Tween.get(treasureboxClip_1, { loop: false }).wait(960).call(function () {
                treasureboxClip_1.visible = false;
                tmpthis_2._stepIconBtn.texture = ResourceManager.getRes("treasurebox1-" + (step_1 + 12));
            }, this).wait(100).call(function () {
                tmpthis_2.refreshUI();
                tmpthis_2.doStepAni();
                tmpthis_2.container.removeChild(treasureboxClip_1);
                treasureboxClip_1 = null;
            }, this);
        }
        else {
            this._isPlaying = false;
        }
    };
    AcMonopolyView.prototype.taskBtnHandler = function () {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACMONOPOLYTASKANDREWARDVIEW, { aid: this.aid, code: this.code, showTab: 0 });
    };
    AcMonopolyView.prototype.rewardBtnHandler = function () {
        if (!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACMONOPOLYTASKANDREWARDVIEW, { aid: this.aid, code: this.code, showTab: 1 });
    };
    AcMonopolyView.prototype.tick = function () {
        var deltaT = this.acVo.et - GameData.serverTime;
        var cdStrK = "acMonopoly_acCD";
        if (this.code == "4") {
            cdStrK = "acMonopoly_acCD2";
        }
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [App.DateUtil.getFormatBySecond(deltaT, 8)]);
            return true;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [LanguageManager.getlocal("acMonopoly_acCDEnd")]);
        }
        return false;
    };
    AcMonopolyView.prototype.refreshTaskRed = function () {
        if (this.acVo.isShowTaskRed()) {
            App.CommonUtil.addIconToBDOC(this._taskBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._taskBtn);
        }
        if (this.acVo.isShowRewardRed()) {
            App.CommonUtil.addIconToBDOC(this._rewardButton);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._rewardButton);
        }
        this.refreshUI();
    };
    AcMonopolyView.prototype.getTitleStr = function () {
        return "";
    };
    AcMonopolyView.prototype.getBgName = function () {
        return "monopoly_bg1";
    };
    // 标题背景名称
    AcMonopolyView.prototype.getTitleBgName = function () {
        return "monopoly_bg2";
    };
    AcMonopolyView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "monopoly_bg1", "monopoly_bg2", "monopoly_bg3", "monopoly_bg4",
            "monopoly_bg8", "monopoly_bg9", "monopoly_bg10", "monopoly_bg11",
            "monopoly_end", "monopoly_icon_btn", "monopoly_start", "monopoly_txt1",
            "acspringouting_taskname-1", "punish_reward_icon", "monopoly_bg12", "monopoly_select", "acspringouting_taskicon-1", "acspringouting_taskname-1",
            "activity_reward_txt", "monopoly_ani_head", "monopoly_anibox", "treasurebox1-", "monopoly_target",
        ]);
    };
    AcMonopolyView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MONOPOLY_TASK_REFRESH, this.refreshTaskRed, this);
        this._activityTimerText = null;
        this._acCDTxt = null;
        this._ruleText = null;
        this._lastTimesTxt = null;
        this._isPlaying = false;
        this._taskBtn = null;
        this._scrollNode = null;
        this._iconList = [];
        this._scrollView = null;
        this._selectMask = null;
        this._selectHeadNode = null;
        this._rewardButton = null;
        this._lastPos = 0;
        this._finalPosRewards = null;
        this._stepIconBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcMonopolyView;
}(AcCommonView));
__reflect(AcMonopolyView.prototype, "AcMonopolyView");
