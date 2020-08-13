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
author : jiang
date : 2018.7.5
desc : 福袋
*/
var AcLuckBagView = (function (_super) {
    __extends(AcLuckBagView, _super);
    function AcLuckBagView() {
        var _this = _super.call(this) || this;
        _this._loopContainer = null;
        _this._timerText = null;
        _this._lastPosX = 0;
        //可抽奖次数
        _this._remainderText = null;
        _this._bottomBg = null;
        _this._curRewardBoxId = 0;
        _this._isPlayAnim = false;
        _this._lastDropIndex = -1;
        _this._progress = null;
        _this._totalTitle = null;
        _this._totalText = null;
        _this._descText1 = null;
        _this._descText2 = null;
        _this._bagList = null;
        return _this;
    }
    Object.defineProperty(AcLuckBagView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckBagView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcLuckBagView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LUCKBAG_REFRESHBAG, this.refreshBag, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LUCKBAG_REFRESHVO, this.updateStatus, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLUCKBAGLOTTERY), this.buyBtnHandlerCaller, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLUCKBAGREWARD), this.rewardBoxClickhandlerCallBack, this);
        AcLuckBagView.AID = this.aid;
        AcLuckBagView.CODE = this.code;
        var cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var showItem = cfgObj.lotteryPool;
        var bg = BaseBitmap.create("acluckbagview_bei");
        bg.x = 0;
        bg.y = 70 + 52 + 90;
        this.addChild(bg);
        this.createBags();
        this._bottomBg = BaseBitmap.create("public_bottombg1");
        this._bottomBg.height = 112;
        this._bottomBg.y = GameConfig.stageHeigth - 69 - this._bottomBg.height;
        this.addChild(this._bottomBg);
        //边框
        var borderBg = BaseBitmap.create("public_9v_bg03");
        borderBg.width = GameConfig.stageWidth;
        borderBg.height = GameConfig.stageHeigth - 69;
        borderBg.y = 69;
        this.addChild(borderBg);
        var timeBg = BaseBitmap.create("dinner_finish_dt01");
        timeBg.width = GameConfig.stageWidth;
        timeBg.height = 52;
        timeBg.x = GameConfig.stageWidth / 2 - timeBg.width / 2;
        timeBg.y = 70;
        this.addChild(timeBg);
        var shadow = BaseBitmap.create("commonview_titlebgshadow");
        shadow.width = GameConfig.stageWidth;
        shadow.height = 8;
        shadow.x = 0;
        shadow.y = 69;
        this.addChild(shadow);
        var stTxt = App.DateUtil.getFormatBySecond(this.vo.st, 9);
        var etTxt = App.DateUtil.getFormatBySecond(this.vo.et, 9);
        this._timerText = ComponentManager.getTextField(LanguageManager.getlocal("acLuckBagViewTime", [stTxt, etTxt]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._timerText.x = timeBg.x + timeBg.width / 2 - this._timerText.width / 2;
        this._timerText.y = timeBg.y + timeBg.height / 2 - this._timerText.height / 2;
        this.addChild(this._timerText);
        var loopBg = BaseBitmap.create("public_v_bg01");
        loopBg.height = 90;
        loopBg.x = 0;
        loopBg.y = timeBg.y + timeBg.height;
        this.addChild(loopBg);
        this._loopContainer = new BaseDisplayObjectContainer();
        this.addChild(this._loopContainer);
        this._loopContainer.width = GameConfig.stageWidth;
        this._loopContainer.height = 100;
        this._loopContainer.x = 0;
        this._loopContainer.y = loopBg.y + loopBg.height / 2 - this._loopContainer.height / 2;
        var rewardStr = "";
        for (var i = 0; i < showItem.length; i++) {
            if (i == showItem.length - 1) {
                rewardStr += showItem[i][0];
            }
            else {
                rewardStr += showItem[i][0] + "|";
            }
        }
        var rewardArr = GameData.formatRewardItem(rewardStr);
        var iconItem = null;
        var itemSpace = 10;
        var baseScale = 0.7;
        var itemWidth = 106;
        var perTime = 2000;
        var perSpeed = (itemSpace + itemWidth * baseScale) / perTime;
        this._lastPosX = itemSpace + (rewardArr.length - 1) * (itemWidth * baseScale + itemSpace);
        for (var index = 0; index < rewardArr.length; index++) {
            iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            iconItem.setScale(baseScale);
            iconItem.x = itemSpace + index * (itemWidth * baseScale + itemSpace);
            iconItem.y = this._loopContainer.height / 2 - iconItem.height * baseScale / 2;
            this._loopContainer.addChild(iconItem);
            egret.Tween.get(iconItem, { loop: true })
                .to({ x: -itemWidth * baseScale }, (index + 1) * perTime)
                .set({ x: this._lastPosX }, iconItem)
                .to({ x: iconItem.x }, (this._lastPosX - iconItem.x) / perSpeed);
            // (rewardArr.length - index) * perTime - itemSpace * perTime / (itemSpace + iconItem.width * baseScale));
        }
        this._totalTitle = ComponentManager.getTextField(LanguageManager.getlocal("acLuckBagViewTotalText"), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._totalTitle.x = 20;
        this._totalTitle.y = loopBg.y + loopBg.height + 20;
        this.addChild(this._totalTitle);
        this._totalText = ComponentManager.getTextField((this.vo.totalCount.toString()), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._totalText.x = this._totalTitle.x + this._totalTitle.width / 2 - this._totalText.width / 2;
        this._totalText.y = this._totalTitle.y + this._totalTitle.height + 5;
        this.addChild(this._totalText);
        //进度条
        this._progress = ComponentManager.getProgressBar("dailytask_dt_02", "dailytask_dt_01", 377);
        this._progress.x = 170;
        this._progress.y = loopBg.y + loopBg.height + 60;
        this._progress.setPercentage(this.getProgressPercent());
        this.addChild(this._progress);
        //初始化宝箱
        var rewardList = this.cfg.lotteryNum;
        var rkeys = Object.keys(rewardList);
        var startX = this._progress.x;
        var perWidth = this._progress.width / 4;
        var progressBg = BaseBitmap.create("dailytask_dt_03");
        var progressBgY = this._progress.y + this._progress.height / 2 - progressBg.height / 2;
        progressBg.x = startX - progressBg.width / 2;
        progressBg.y = progressBgY;
        this.addChild(progressBg);
        var numTxt = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        numTxt.x = progressBg.x + progressBg.width / 2 - numTxt.width / 2;
        numTxt.y = progressBg.y + progressBg.height / 2 - numTxt.height / 2;
        this.addChild(numTxt);
        for (var index = 0; index < rewardList.length; index++) {
            var tmprcfg = rewardList[index];
            // let perY = startY - (index+1) * perHeight;
            progressBg = BaseBitmap.create("dailytask_dt_03");
            progressBg.x = startX + (index + 1) * perWidth - progressBg.width / 2;
            progressBg.y = progressBgY;
            this.addChild(progressBg);
            var rStatus = this.getBoxStatusById(rkeys[index]);
            var imgres = "dailytask_box1_";
            if (index > 1) {
                imgres = "dailytask_box2_";
            }
            var boxImg = BaseBitmap.create(imgres + String(rStatus));
            boxImg.anchorOffsetX = boxImg.width / 2;
            boxImg.anchorOffsetY = boxImg.height / 2;
            boxImg.name = "boxImg" + rkeys[index];
            boxImg.x = progressBg.x + progressBg.width / 2;
            boxImg.y = progressBgY - 23;
            var lightImg = BaseBitmap.create("dailytask_box_light");
            lightImg.anchorOffsetX = 40;
            lightImg.anchorOffsetY = 40;
            lightImg.name = "lightImg" + rkeys[index];
            lightImg.x = boxImg.x;
            lightImg.y = boxImg.y;
            lightImg.visible = false;
            this.addChild(lightImg);
            this.addChild(boxImg);
            boxImg.addTouchTap(this.rewardBoxClickhandler, this, [rkeys[index]]);
            var rewardCfg = this.cfg.getBoxRewardById(Number(rkeys[index]));
            var need = rewardCfg.needNum;
            numTxt = ComponentManager.getTextField(need.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            numTxt.x = progressBg.x + progressBg.width / 2 - numTxt.width / 2;
            numTxt.y = progressBg.y + progressBg.height / 2 - numTxt.height / 2;
            this.addChild(numTxt);
        }
        this._descText1 = ComponentManager.getTextField(LanguageManager.getlocal("acLuckBagViewDesc1", [this.cfg.needGem.toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._descText1.x = GameConfig.stageWidth / 2 - this._descText1.width / 2;
        this._descText1.y = this._progress.y + 50;
        this.addChild(this._descText1);
        this._descText2 = ComponentManager.getTextField(LanguageManager.getlocal("acLuckBagViewDesc2", [this.cfg.needPoint.toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._descText2.x = GameConfig.stageWidth / 2 - this._descText2.width / 2;
        this._descText2.y = this._descText1.y + 30;
        this.addChild(this._descText2);
        this._remainderText = ComponentManager.getTextField(LanguageManager.getlocal("acLuckBagViewRemainder", [this.vo.remainderCount.toString()]), 26, TextFieldConst.COLOR_WHITE);
        this._remainderText.x = this._bottomBg.width / 2 - this._remainderText.width / 2;
        this._remainderText.y = this._bottomBg.y + 30;
        this.addChild(this._remainderText);
        //抽一次按钮
        var onceBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_BLUE, "acLuckBagViewOnceBtnText", this.buyBtnHandler, this, [1]);
        onceBtn.x = this._bottomBg.x + 60;
        onceBtn.y = this._bottomBg.y + 90;
        this.addChild(onceBtn);
        // let onceBtnText = ComponentManager.getTextField(LanguageManager.getlocal("acLuckBagViewOnceBtnText"),26,TextFieldConst.COLOR_BTN_BLUE);
        // onceBtnText.x = onceBtn.width/2-onceBtnText.width/2;
        // onceBtnText.y = onceBtn.height/2-onceBtnText.height/2;
        // onceBtn.addChild(onceBtnText);
        //抽十次按钮
        var tenBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acLuckBagViewTenBtnText", this.buyBtnHandler, this, [10]);
        tenBtn.x = this._bottomBg.x + this._bottomBg.width - tenBtn.width - 60;
        tenBtn.y = onceBtn.y;
        this.addChild(tenBtn);
        // let tenBtnText = ComponentManager.getTextField(LanguageManager.getlocal("acLuckBagViewTenBtnText"),26,TextFieldConst.COLOR_BTN_YELLOW);
        // tenBtnText.x = tenBtn.width/2-tenBtnText.width/2;
        // tenBtnText.y = tenBtn.height/2-tenBtnText.height/2;
        // tenBtn.addChild(tenBtnText);
        this.refreshProfress();
        this.updateStatus();
    };
    AcLuckBagView.prototype.createBags = function () {
        this._bagList = [
            { x: 90, y: 410, bagItem: null, bag: null, line: null },
            { x: 180, y: 420, bagItem: null, bag: null, line: null },
            { x: 270, y: 440, bagItem: null, bag: null, line: null },
            { x: 350, y: 435, bagItem: null, bag: null, line: null },
            { x: 435, y: 415, bagItem: null, bag: null, line: null },
            { x: 560, y: 433, bagItem: null, bag: null, line: null }
        ];
        var bagItem = null;
        var line = null;
        var bag = null;
        // this._bagList = {};
        for (var i = 0; i < this._bagList.length; i++) {
            bagItem = new BaseDisplayObjectContainer();
            line = BaseBitmap.create("acluckbagview_sheng");
            line.height = 80 + Math.floor((Math.random() * 150));
            bagItem.width = line.width;
            bagItem.height = line.height;
            line.x = 0;
            line.y = 0;
            bagItem.addChild(line);
            bagItem.anchorOffsetX = bagItem.width / 2;
            bagItem.anchorOffsetY = 0;
            bagItem.x = this._bagList[i].x;
            bagItem.y = this._bagList[i].y;
            this.addChild(bagItem);
            bag = BaseBitmap.create("acluckbagview_dai");
            bag.anchorOffsetX = bag.width / 2 - 10;
            bag.anchorOffsetY = bag.height / 2;
            bag.x = line.x + line.width / 2;
            bag.y = line.y + line.height + bag.height / 2 - 5;
            bagItem.addChild(bag);
            this._bagList[i].bagItem = bagItem;
            this._bagList[i].bag = bag;
            this._bagList[i].line = line;
            var randomT = 800 + Math.floor(Math.random() * 1000);
            var randomR = 1.5 + Math.random();
            egret.Tween.get(bagItem, { loop: true })
                .to({ rotation: randomR }, randomT, egret.Ease.quadOut)
                .to({ rotation: -randomR }, randomT * 2, egret.Ease.quadInOut)
                .to({ rotation: 0 }, randomT, egret.Ease.quadIn);
        }
    };
    //宝箱奖励领取回调
    AcLuckBagView.prototype.rewardBoxClickhandlerCallBack = function (event) {
        var data = event.data.data.data;
        if (!data) {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        if (Number(this._curRewardBoxId) == 3) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
        }
        var rewards = data.rewards;
        var rList = GameData.formatRewardItem(rewards);
        var boxImg = this.getChildByName("boxImg" + this._curRewardBoxId);
        var pos = boxImg.localToGlobal(boxImg.width / 2, 50);
        App.CommonUtil.playRewardFlyAction(rList, pos);
        this.refreshProfress();
    };
    //判断宝箱状态 1未完成 2可领取 3已经领取
    AcLuckBagView.prototype.getBoxStatusById = function (boxIndex) {
        var cfg = this.cfg;
        var vo = this.vo;
        var rStatus = 1;
        if (vo.isCollected(Number(boxIndex) + 1)) {
            rStatus = 3;
        }
        else {
            var boxCfg = cfg.getBoxRewardById(Number(boxIndex));
            if (boxCfg.needNum <= vo.totalCount) {
                rStatus = 2;
            }
        }
        return rStatus;
    };
    //奖励宝箱点击
    AcLuckBagView.prototype.rewardBoxClickhandler = function (obj, param) {
        var boxRewardId = param;
        var status = this.getBoxStatusById(boxRewardId);
        /**
         *  1未完成 2可领取 3已领取
         */
        if (status == 2) {
            this._curRewardBoxId = boxRewardId;
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETLUCKBAGREWARD, { activeId: this.aid + "-" + this.code, index: Number(boxRewardId) + 1 });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKBAGBOXREWARDPOPUPVIEW, { 'type': this.aid, 'id': boxRewardId });
        }
    };
    //处理进度条进度值
    AcLuckBagView.prototype.getProgressPercent = function () {
        // return 0.5;
        var curTurn = this.vo.totalCount;
        var rewardList = this.cfg.lotteryNum;
        var rkeys = Object.keys(rewardList);
        if (curTurn == 0)
            return 0;
        if (curTurn >= rewardList[String(rkeys.length - 1)].needNum)
            return 100;
        var perV = 1 / rkeys.length;
        for (var index = 0; index < rkeys.length; index++) {
            if (curTurn <= rewardList[String(index)].needNum) {
                var result = perV * index;
                var tmpV1 = 0;
                if (index > 0) {
                    tmpV1 = rewardList[String(index - 1)].needNum;
                }
                var tmpV2 = rewardList[String(index)].needNum;
                result += (curTurn - tmpV1) / (tmpV2 - tmpV1) * perV;
                return result;
            }
        }
    };
    //购买按钮点击
    AcLuckBagView.prototype.buyBtnHandler = function (num) {
        if (this._isPlayAnim) {
            return;
        }
        if (this.vo.et - GameData.serverTime <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_error"));
            return;
        }
        if (num > this.vo.remainderCount) {
            // App.CommonUtil.showTip(LanguageManager.getlocal("acLuckBagLess1"));
            ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKBAGJUMPPOPUPVIEW, { aid: this.aid, code: this.code, callback: this.hide, target: this });
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETLUCKBAGLOTTERY, { activeId: this.aid + "-" + this.code, stype: num == 1 ? 1 : 2 });
    };
    //奖励回调 调用动画
    AcLuckBagView.prototype.buyBtnHandlerCaller = function (event) {
        var _this = this;
        var data = event.data.data.data;
        if (!data) {
            App.CommonUtil.showTip(LanguageManager.getlocal("requestLoadErrorTip"));
            return;
        }
        if (event.data.data.ret == -3) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acLuckBagLess1"));
            return;
        }
        this.refreshProfress();
        var rewards = data.rewards || '';
        var reward_arr = rewards.split('|');
        if (reward_arr.length < 2) {
            //播放福袋掉落动画
            this._isPlayAnim = true;
            // this._bagList {x: 90, y: 410, bagItem:null, bag:null},
            var dropIndex = Math.floor(this._bagList.length * Math.random());
            this._lastDropIndex = dropIndex;
            var bagCfg = this._bagList[dropIndex];
            egret.Tween.removeTweens(bagCfg.bagItem);
            egret.Tween.get(bagCfg.bagItem).to({ rotation: 0 }, 100);
            egret.Tween.get(bagCfg.bag).wait(100)
                .to({ rotation: 10 }, 50)
                .to({ rotation: -8 }, 100)
                .to({ rotation: 6 }, 100)
                .to({ rotation: -4 }, 100)
                .to({ rotation: 2 }, 100)
                .to({ rotation: 0 }, 50)
                .wait(100)
                .to({ y: bagCfg.bag.y + 1000 }, 500, egret.Ease.sineIn)
                .call(function () {
                _this._isPlayAnim = false;
                ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKBAGREWARDPOPUPVIEW, rewards);
            });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKBAGREWARDPOPUPVIEW, rewards);
        }
    };
    //关闭奖励弹出框刷新福袋
    AcLuckBagView.prototype.refreshBag = function () {
        if (this._lastDropIndex == -1) {
            return;
        }
        var bagCfg = this._bagList[this._lastDropIndex];
        egret.Tween.removeTweens(bagCfg.bagItem);
        egret.Tween.removeTweens(bagCfg.bag);
        bagCfg.bag.x = bagCfg.line.x + bagCfg.line.width / 2;
        bagCfg.bag.y = bagCfg.line.y + bagCfg.line.height + bagCfg.bag.height / 2 - 5;
        var randomT = 800 + Math.floor(Math.random() * 1000);
        var randomR = 1.5 + Math.random();
        egret.Tween.get(bagCfg.bagItem, { loop: true })
            .to({ rotation: randomR }, randomT, egret.Ease.quadOut)
            .to({ rotation: -randomR }, randomT * 2, egret.Ease.quadInOut)
            .to({ rotation: 0 }, randomT, egret.Ease.quadIn);
        this._lastDropIndex = -1;
    };
    //每次领取奖励后，刷新进度条以及宝箱状态
    AcLuckBagView.prototype.refreshProfress = function () {
        var newPro = this.getProgressPercent();
        var oldPro = this._progress.getPercent();
        egret.Tween.get(this._progress, { loop: false }).to({ percent: newPro }, (newPro - oldPro) * 5000);
        var rewardList = this.cfg.lotteryNum;
        var rkeys = Object.keys(rewardList);
        for (var index = 0; index < rkeys.length; index++) {
            var tmpK = String(rkeys[index]);
            var boxImg = this.getChildByName("boxImg" + tmpK);
            var lightImg = this.getChildByName("lightImg" + tmpK);
            var rStatus = this.getBoxStatusById(tmpK);
            var imgres = "dailytask_box1_";
            if (index > 1) {
                imgres = "dailytask_box2_";
            }
            if (boxImg instanceof (BaseBitmap)) {
                boxImg.texture = ResourceManager.getRes(imgres + rStatus);
            }
            if (rStatus == 2) {
                lightImg.visible = true;
                egret.Tween.get(lightImg, { loop: true }).to({ rotation: lightImg.rotation + 360 }, 10000);
                egret.Tween.get(boxImg, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
            }
            else {
                lightImg.visible = false;
                egret.Tween.removeTweens(lightImg);
                egret.Tween.removeTweens(boxImg);
            }
        }
    };
    AcLuckBagView.prototype.hide = function () {
        if (!this._isPlayAnim) {
            _super.prototype.hide.call(this);
        }
    };
    AcLuckBagView.prototype.getTitleButtomY = function () {
        return 148;
    };
    AcLuckBagView.prototype.getTitleBgName = function () {
        return "commonview_db_04";
    };
    AcLuckBagView.prototype.getRuleInfo = function () {
        return _super.prototype.getRuleInfo.call(this);
    };
    AcLuckBagView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            // "itemeffect",
            "dailytask_box1_1", "dailytask_box1_2", "dailytask_box1_3",
            "dailytask_box2_1", "dailytask_box2_2", "dailytask_box2_3",
            "dailytask_box_light",
            "dailytask_dt_02",
            "dailytask_dt_01",
            "dailytask_dt_03",
            "dinner_finish_dt01",
            "commonview_titlebgshadow",
            "acluckbagview_bei",
            "acluckbagview_dai",
            "acluckbagview_sheng"
        ]);
    };
    AcLuckBagView.prototype.updateStatus = function () {
        this._totalText.text = this.vo.totalCount.toString();
        this._totalText.x = this._totalTitle.x + this._totalTitle.width / 2 - this._totalText.width / 2;
        this._remainderText.text = LanguageManager.getlocal("acLuckBagViewRemainder", [this.vo.remainderCount.toString()]);
        this._remainderText.x = this._bottomBg.width / 2 - this._remainderText.width / 2;
    };
    AcLuckBagView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LUCKBAG_REFRESHVO, this.updateStatus, this);
        this._loopContainer = null;
        this._timerText = null;
        this._remainderText = null;
        this._bottomBg = null;
        this._curRewardBoxId = 0;
        this._isPlayAnim = false;
        this._lastDropIndex = -1;
        this._progress = null;
        this._totalTitle = null;
        this._totalText = null;
        this._descText1 = null;
        this._descText2 = null;
        this._bagList = null;
        AcLuckBagView.AID = null;
        AcLuckBagView.CODE = null;
        _super.prototype.dispose.call(this);
    };
    AcLuckBagView.AID = null;
    AcLuckBagView.CODE = null;
    return AcLuckBagView;
}(AcCommonView));
__reflect(AcLuckBagView.prototype, "AcLuckBagView");
