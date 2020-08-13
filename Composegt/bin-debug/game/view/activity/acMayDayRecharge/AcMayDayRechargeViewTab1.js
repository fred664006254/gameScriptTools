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
 * 充值转盘
 * @author 赵占涛
 */
var AcMayDayRechargeViewTab1 = (function (_super) {
    __extends(AcMayDayRechargeViewTab1, _super);
    function AcMayDayRechargeViewTab1() {
        var _this = _super.call(this) || this;
        // public _isCircleRun: boolean = false;
        //圆盘
        _this._scrollList = null;
        _this._circleGroup = null;
        //底部进度条
        _this._progress = null;
        _this._timerText = null;
        _this._curnturnText = null;
        //转盘
        _this._turnTable = null;
        //向上的指针
        _this._upArrow = null;
        //转到奖励的光
        // private _selectLight: BaseBitmap = null;
        _this._turnGroup = null;
        _this._findNumTF = null;
        _this._curRewardBoxId = '';
        //转盘点击
        _this._rewardItem = 0;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcMayDayRechargeViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayRechargeView.AID, AcMayDayRechargeView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMayDayRechargeViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMayDayRechargeView.AID, AcMayDayRechargeView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMayDayRechargeViewTab1.prototype, "acTivityId", {
        get: function () {
            return AcMayDayRechargeView.AID + "-" + AcMayDayRechargeView.CODE;
        },
        enumerable: true,
        configurable: true
    });
    AcMayDayRechargeViewTab1.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYRECHARGEITEMA), this.rewardBoxClickhandlerCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYRECHARGELOTTERY), this.buyBtnHandlerCaller, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAYRECHARGE_FRESHTURNTABLE, this.fresh_table, this);
        var timeBg = BaseBitmap.create("acnewyear_middlebg");
        timeBg.x = GameConfig.stageWidth / 2 - timeBg.width / 2;
        timeBg.y = 0;
        this.addChild(timeBg);
        var vo = this.vo;
        var stTxt = App.DateUtil.getFormatBySecond(vo.st, 7);
        var etTxt = App.DateUtil.getFormatBySecond(vo.et - 86400 * 1, 7);
        this._timerText = ComponentManager.getTextField(LanguageManager.getlocal("AcTurnTableViewTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._timerText.x = timeBg.x + timeBg.width / 2 - this._timerText.width / 2;
        this._timerText.y = timeBg.y + timeBg.height / 2 - this._timerText.height / 2;
        this.addChild(this._timerText);
        //大背景图
        var bg = BaseLoadBitmap.create("acturntable_beijingtu");
        bg.width = 624;
        bg.height = 914;
        bg.x = GameConfig.stageWidth / 2 - bg.width / 2;
        bg.y = timeBg.y + timeBg.height;
        this.addChild(bg);
        //适配值
        var adaptiveVal = GameConfig.stageHeigth / 960;
        //进度条
        this._progress = ComponentManager.getProgressBar("dailytask_dt_02", "dailytask_dt_01", 377);
        this._progress.x = bg.x + 170;
        this._progress.y = bg.y + 60 + (adaptiveVal > 1 ? (adaptiveVal - 1) * 100 : 0);
        this._progress.setPercentage(this.getProgressPercent());
        this.addChild(this._progress);
        // 当前总次数
        var numTotalBg = BaseBitmap.create("common_numbg");
        numTotalBg.setPosition(30, this._progress.y + this._progress.height - numTotalBg.height + 5);
        this.addChild(numTotalBg);
        var numTF = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnNumTitle"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        numTF.setPosition(numTotalBg.x + numTotalBg.width / 2 - numTF.width / 2, numTotalBg.y + 52 - numTF.height / 2);
        this.addChild(numTF);
        this._findNumTF = ComponentManager.getTextField("999", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._findNumTF.width = 50;
        this._findNumTF.textAlign = egret.HorizontalAlign.CENTER;
        this._findNumTF.setPosition(numTotalBg.x + numTotalBg.width / 2 - this._findNumTF.width / 2, numTotalBg.y + 20 - this._findNumTF.height / 2);
        this.addChild(this._findNumTF);
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
            var rewardCfg = this.cfg.getBoxRewardById(rkeys[index]);
            var need = rewardCfg.needNum;
            numTxt = ComponentManager.getTextField(need.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            numTxt.x = progressBg.x + progressBg.width / 2 - numTxt.width / 2;
            numTxt.y = progressBg.y + progressBg.height / 2 - numTxt.height / 2;
            this.addChild(numTxt);
        }
        //bottomBg
        var bottomBg = BaseBitmap.create("public_bottombg1");
        bottomBg.height = 120 + (adaptiveVal > 1 ? (adaptiveVal - 1) * 100 : 0);
        bottomBg.y = GameConfig.stageHeigth - 69 - 94 - bottomBg.height;
        //当前次数
        var numBg = BaseBitmap.create("prisonview_1");
        numBg.x = GameConfig.stageWidth / 2 - numBg.width / 2;
        numBg.y = bottomBg.y - numBg.height + 15;
        //转盘父节点
        this._circleGroup = new BaseDisplayObjectContainer();
        this._circleGroup.width = GameConfig.stageWidth;
        this._circleGroup.height = 550;
        this._circleGroup.x = 0;
        this._circleGroup.y = this._progress.y + 15 + (numBg.y - this._progress.y + 15) / 2 - this._circleGroup.height / 2;
        this.addChild(this._circleGroup);
        this.addChild(numBg);
        this.addChild(bottomBg);
        this._curnturnText = ComponentManager.getTextField(LanguageManager.getlocal('acMayDayRechargeCurnNum', [this.vo.lotterynum.toString()]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._curnturnText.x = GameConfig.stageWidth / 2 - this._curnturnText.width / 2;
        this._curnturnText.y = numBg.y + numBg.height / 2 - this._curnturnText.height / 2;
        this.addChild(this._curnturnText);
        //背景图片
        var borderBg = BaseBitmap.create("public_9v_bg03");
        borderBg.width = GameConfig.stageWidth;
        borderBg.height = GameConfig.stageHeigth - 69 - 94 + 15;
        borderBg.y = 0;
        this.addChild(borderBg);
        //bottom里面的组件
        //按钮上物品显示
        // let itemCfg = GameData.getRewardItemVoByIdAndType(1,1001);
        //购买区域
        var rewardsArr = GameData.formatRewardItem(this.cfg.getReward);
        //转动一次按钮
        var onceBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_BLUE, "acMayDayRecharge_lottery1", this.buyBtnHandler, this, [1]);
        //转动十次按钮
        var tenBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acMayDayRecharge_lottery10", this.buyBtnHandler, this, [10]);
        //抽十次的描述文字
        var tofacebookgetnum = ComponentManager.getTextField(LanguageManager.getlocal("acMayDayRecharge_tofacebookgetnum"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tofacebookgetnum.x = bottomBg.width / 2 - tofacebookgetnum.width / 2;
        tofacebookgetnum.y = bottomBg.y + 20;
        //设置位置
        onceBtn.x = bottomBg.x + 60;
        onceBtn.y = tofacebookgetnum.y + tofacebookgetnum.height + 5;
        tenBtn.x = bottomBg.x + bottomBg.width - tenBtn.width - 60;
        tenBtn.y = onceBtn.y;
        this.addChild(onceBtn);
        this.addChild(tenBtn);
        this.addChild(tofacebookgetnum);
        this.refreshProfress();
        //转盘
        var circleBg = BaseBitmap.create("acturntable_bg2");
        circleBg.x = this._circleGroup.width / 2 - circleBg.width / 2;
        circleBg.y = this._circleGroup.height / 2 - circleBg.height / 2;
        this._circleGroup.addChild(circleBg);
        //转盘
        this._turnTable = BaseBitmap.create("acturntable_bg");
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
        // this._selectLight = BaseBitmap.create("acturntable_on");
        // this._selectLight.anchorOffsetX = this._selectLight.width/2;
        // this._selectLight.anchorOffsetY = this._selectLight.height;
        // this._selectLight.x = this._circleGroup.width/2;
        // this._selectLight.y = this._circleGroup.height/2 -3;
        // this._selectLight.visible = false;
        // this._circleGroup.addChild(this._selectLight);
        var midCircle = BaseBitmap.create("acturntable_pointcircle");
        midCircle.x = this._circleGroup.width / 2 - midCircle.width / 2;
        midCircle.y = this._circleGroup.height / 2 - midCircle.height / 2;
        this._circleGroup.addChild(midCircle);
        this._upArrow = BaseBitmap.create("acturntable_point");
        this._upArrow.anchorOffsetX = this._upArrow.width / 2;
        this._upArrow.anchorOffsetY = 120;
        this._upArrow.x = this._circleGroup.width / 2;
        this._upArrow.y = this._circleGroup.height / 2;
        this._circleGroup.addChild(this._upArrow);
        var cfg = this.cfg;
        var total = cfg.lotteryPool.length;
        var rad = Math.PI / 180;
        var radius = this._turnGroup.height / 1.7;
        var rewardTab = [];
        for (var key in cfg.lotteryPool) {
            rewardTab.push(cfg.lotteryPool[key][0]);
        }
        var centerX = this._turnGroup.width / 2;
        var centerY = this._turnGroup.height / 2;
        var rIcons = GameData.getRewardItemIcons(rewardTab.join("|"), true, false);
        for (var i = 0; i < total; ++i) {
            //计算角度
            var angle = 360 / total * rad * i;
            //加物品icon
            var itemicon = rIcons[i];
            itemicon.setScale(0.6);
            itemicon.anchorOffsetX = itemicon.width / 2;
            itemicon.anchorOffsetY = itemicon.height / 2;
            var itemX = (radius + 30) * Math.sin(angle + 360 / total * rad / 2) / 2;
            var itemY = (radius + 30) * Math.cos(angle + 360 / total * rad / 2) / 2;
            itemicon.x = centerX - itemX; // + (itemX > 0 ? -1 : 1) * itemicon.width * Math.sin(angle + 360 / total * rad / 2) / 2;
            itemicon.y = centerY - itemY; // + (itemY > 0 ? -1 : 1) * itemicon.height * Math.cos(angle + 360 / total * rad / 2) / 2;
            itemicon.name = "item" + i;
            this._turnGroup.addChild(itemicon);
        }
        // /转盘
        // this._turnTable = null;
        // //中间的圆圈
        // this._midCircle = null;
        // //向上的指针
        // this._upArrow = null;
        // //转到奖励的光
        // this._selectLight = null;
    };
    //奖励宝箱点击
    AcMayDayRechargeViewTab1.prototype.rewardBoxClickhandler = function (obj, param) {
        if (AcMayDayRechargeView._isCircleRun) {
            return;
        }
        var boxRewardId = param;
        var status = this.getBoxStatusById(boxRewardId);
        /**
         *  1未完成 2可领取 3已领取
         */
        if (status == 2) {
            this._curRewardBoxId = boxRewardId;
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYRECHARGEITEMA, { activeId: this.acTivityId, lotteryId: Number(boxRewardId) + 1 });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW, { 'type': AcMayDayRechargeView.AID, 'id': boxRewardId });
        }
    };
    //判断宝箱状态 1未完成 2可领取 3已经领取
    AcMayDayRechargeViewTab1.prototype.getBoxStatusById = function (boxId) {
        var cfg = this.cfg;
        var vo = this.vo;
        var rStatus = 1;
        if (vo.isGetTurnProgress(Number(boxId) + 1)) {
            rStatus = 3;
        }
        else {
            var tmpRew = cfg.getBoxRewardById(boxId);
            if (tmpRew.needNum <= vo.getTurnTotal()) {
                rStatus = 2;
            }
        }
        return rStatus;
    };
    //处理进度条进度值
    AcMayDayRechargeViewTab1.prototype.getProgressPercent = function () {
        var curTurn = this.vo.getTurnTotal();
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
    //每次领取奖励后，刷新进度条以及宝箱状态
    AcMayDayRechargeViewTab1.prototype.refreshProfress = function () {
        this._findNumTF.text = String(this.vo.getTurnTotal());
        this._curnturnText.text = LanguageManager.getlocal('acMayDayRechargeCurnNum', [this.vo.lotterynum.toString()]);
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
    // 页签类型
    AcMayDayRechargeViewTab1.prototype.getSheepType = function () {
        return 1;
    };
    //购买按钮点击
    AcMayDayRechargeViewTab1.prototype.buyBtnHandler = function (num) {
        if (AcMayDayRechargeView._isCircleRun) {
            return;
        }
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.vo.lotterynum < num) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acMayDayRecharge_lotterynum_notenough'));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYRECHARGELOTTERY, { activeId: this.acTivityId, lotterynum: num });
    };
    //转盘动画
    AcMayDayRechargeViewTab1.prototype.buyBtnHandlerCaller = function (event) {
        var _this = this;
        var data = event.data.data.data;
        if (!data) {
            App.CommonUtil.showTip(LanguageManager.getlocal("requestLoadErrorTip"));
            return;
        }
        if (event.data.data.ret < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("requestLoadErrorTip") + event.data.data.ret);
            return;
        }
        this.refreshProfress();
        var rewards = data.rewards || '';
        var reward_arr = rewards.split('|');
        if (reward_arr.length == 2) {
            AcMayDayRechargeView._isCircleRun = true;
            reward_arr.splice(reward_arr.indexOf(this.cfg.getReward), 1);
            this._rewardItem = this.cfg.getSelectItemIdx(reward_arr[0]);
            var total = 8;
            var endRotation = 360 / 16 + 360 / 8 * this._rewardItem;
            var turnRotation = endRotation + (4 + Math.floor(Math.random() * 3)) * 360; //0<=n<1   3 ,4 ,5
            var turnTime = 5000 + Math.floor(Math.random() * 2000);
            var view_1 = this;
            // egret.Tween.get(this._upArrow,{loop:true,onChange:()=>{
            //     view._upArrow.rotation
            // }})
            // .to({rotation: 8},200);
            egret.Tween.get(this._turnGroup, { onChange: function () {
                    view_1._upArrow.rotation = Math.sin(view_1._turnGroup.rotation);
                    var total = _this.cfg.lotteryPool.length;
                    for (var i = 0; i < total; ++i) {
                        var item = view_1._turnGroup.getChildByName("item" + i);
                        if (item) {
                            item.rotation = 0 - view_1._turnGroup.rotation;
                        }
                    }
                } })
                .to({ rotation: turnRotation }, turnTime, egret.Ease.quartInOut)
                .call(function () {
                // view._selectLight.visible = true;
                view_1._upArrow.rotation = 0;
            })
                .wait(500)
                .call(function () {
                AcMayDayRechargeView._isCircleRun = false;
                ViewController.getInstance().openView(ViewConst.POPUP.ACMAYDAYRECHARGEREWARDPOPUPVIEW, rewards);
            });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.ACMAYDAYRECHARGEREWARDPOPUPVIEW, rewards);
        }
    };
    //宝箱奖励领取回调
    AcMayDayRechargeViewTab1.prototype.rewardBoxClickhandlerCallBack = function (event) {
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
    AcMayDayRechargeViewTab1.prototype.refreshWhenSwitchBack = function () {
        var view = this;
        view.fresh_table();
    };
    AcMayDayRechargeViewTab1.prototype.fresh_table = function () {
        var view = this;
        // view._selectLight.visible = false;
        view._turnGroup.rotation = 0;
        var total = this.cfg.lotteryPool.length;
        for (var i = 0; i < total; ++i) {
            var item = view._turnGroup.getChildByName("item" + i);
            if (item) {
                item.rotation = 0;
            }
        }
    };
    AcMayDayRechargeViewTab1.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYRECHARGEITEMA), this.rewardBoxClickhandlerCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYRECHARGELOTTERY), this.buyBtnHandlerCaller, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAYRECHARGE_FRESHTURNTABLE, this.fresh_table, this);
        egret.Tween.removeTweens(view._turnGroup);
        egret.Tween.removeTweens(this._progress);
        for (var index = 0; index < 4; index++) {
            var boxImg = this.getChildByName("boxImg" + index);
            var lightImg = this.getChildByName("lightImg" + index);
            egret.Tween.removeTweens(boxImg);
            egret.Tween.removeTweens(lightImg);
        }
        view._turnGroup.removeTouchTap();
        view._circleGroup.removeTouchTap();
        view._circleGroup.removeChildren();
        view._progress = null;
        view._circleGroup = null;
        this._timerText = null;
        this._curnturnText = null;
        AcMayDayRechargeView._isCircleRun = false;
        //转盘
        this._turnTable = null;
        //向上的指针
        this._upArrow = null;
        //转到奖励的光
        // this._selectLight = null;
        this._turnGroup = null;
        this._findNumTF = null;
        _super.prototype.dispose.call(this);
    };
    return AcMayDayRechargeViewTab1;
}(CommonViewTab));
__reflect(AcMayDayRechargeViewTab1.prototype, "AcMayDayRechargeViewTab1");
