/*
author : qinajun
date : 2018.4.14
desc : 转盘活动viewtab1 活动好礼
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
var AcMayDayViewTab1 = (function (_super) {
    __extends(AcMayDayViewTab1, _super);
    function AcMayDayViewTab1() {
        var _this = _super.call(this) || this;
        _this._nodeGroup = null;
        //圆盘
        _this._scrollList = null;
        _this._circleGroup = null;
        //排行榜按钮
        _this._rankBtn = null;
        //底部进度条
        _this._progress = null;
        _this._curRewardBoxId = '';
        //转盘点击
        _this._isCircleRun = false;
        _this._rewardItem = 0;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcMayDayViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMayDayViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMayDayViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcMayDayViewTab1.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMA), this.rewardBoxClickhandlerCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYLOTTERY), this.buyBtnHandlerCaller, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESHTURNTABLE, this.fresh_table, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM, this.fresh_free, this);
        var view = this;
        var offY = GameConfig.stageHeigth - 221 - 241 - 120;
        var style = Number(view.code) > 8;
        var bottombg = null;
        if (style) {
            view.width = GameConfig.stageWidth;
            view.height = GameConfig.stageHeigth - 196;
            bottombg = BaseBitmap.create("acmaydaytab1bg_" + view.code);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bottombg, view);
            view.addChild(bottombg);
        }
        var _nodeGroup = new BaseDisplayObjectContainer();
        _nodeGroup.y = 0;
        var centerX = 398 / 2;
        var centerY = 399 / 2;
        view.addChild(_nodeGroup);
        view._nodeGroup = _nodeGroup;
        var circleGroup = new BaseDisplayObjectContainer();
        circleGroup.width = 398;
        circleGroup.height = 399;
        circleGroup.anchorOffsetX = centerX;
        circleGroup.anchorOffsetY = centerY;
        if (style) {
            _nodeGroup.height = view.height;
            _nodeGroup.width = GameConfig.stageWidth;
        }
        else {
            _nodeGroup.x = 0;
            _nodeGroup.y = -175 + centerY + (offY - 399) / 2;
            circleGroup.x = 30 + centerX;
            circleGroup.y = 20;
        }
        //转盘
        var bg = !style ? "acturntable_bg" : "acturntable_bg_" + this.code;
        var turnTable = BaseBitmap.create(bg);
        view._nodeGroup.addChild(turnTable);
        view._nodeGroup.addChild(circleGroup);
        view._circleGroup = circleGroup;
        var cfg = this.cfg;
        var rewardsArr = GameData.formatRewardItem(cfg.getReward);
        var buy_arr = [1, 10];
        var price = cfg.cost;
        for (var i in buy_arr) {
            var num = buy_arr[i];
            var itemCfg = GameData.getRewardItemVoByIdAndType(1);
            //添加按钮 
            var btn = ComponentManager.getButton('btn_upgrade_yellow', "", this.buyBtnHandler, this, [num]);
            if (style) {
                App.DisplayUtil.setLayoutPosition(num == 1 ? LayoutConst.leftbottom : LayoutConst.rightbottom, btn, view._nodeGroup, [85, 60], true);
            }
            else {
                btn.x = num == 1 ? 110 : (GameConfig.stageWidth - 151 - 140);
                btn.y = view._circleGroup.height / 2 + 60;
            }
            var textSize = PlatformManager.checkIsRuSp() ? 14 : 20;
            btn.setEnable((this.vo.et > GameData.serverTime + 86400 * 1));
            view._nodeGroup.addChild(btn);
            //购买文字
            var buytext = ComponentManager.getTextField(LanguageManager.getlocal('acPunishBuyItemBuy'), textSize, TextFieldConst.COLOR_BLACK);
            buytext.x = btn.x + (num == 1 ? 23.3 : 13.3);
            buytext.y = btn.y + 16;
            view._nodeGroup.addChild(buytext);
            var itemicon = BaseLoadBitmap.create(itemCfg.icon);
            itemicon.setScale(0.4);
            itemicon.y = btn.y + 55;
            var descText = ComponentManager.getTextField((num * price * (num == 1 ? 1 : cfg.discount)).toString(), 18, TextFieldConst.COLOR_BLACK);
            if (style) {
                descText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            }
            itemicon.name = 'item1';
            itemicon.x = btn.x + (151 - 100 * itemicon.scaleX - descText.textWidth) / 2;
            descText.name = 'desc1';
            descText.x = itemicon.x + 100 * 0.4;
            if (num == 1) {
                var freeText = ComponentManager.getTextField(LanguageManager.getlocal('sysFreeDesc'), 18, TextFieldConst.COLOR_BLACK);
                freeText.name = 'freetxt';
                if (style) {
                    freeText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                }
                freeText.x = btn.x + (151 - 36) / 2;
                freeText.y = itemicon.y + 13;
                view._nodeGroup.addChild(freeText);
            }
            else {
                // itemicon.x = btn.x + (151 - 200) / 2 + 44;
                // let oldPrice = ComponentManager.getTextField(LanguageManager.getlocal('acMayDayOldProce'), 18,TextFieldConst.COLOR_BLACK);
                // oldPrice.x = btn.x + (151 - 200) / 2;
                // oldPrice.y = itemicon.y + 13;
                // view._nodeGroup.addChild(oldPrice);
                // let oldPriceNum = ComponentManager.getTextField((price * num).toString(), 18, TextFieldConst.COLOR_BLACK);
                // oldPriceNum.x = itemicon.x + 43;
                // oldPriceNum.y = itemicon.y + 13;
                // view._nodeGroup.addChild(oldPriceNum);
                // let line = BaseBitmap.create('shopview_line');
                // line.x = oldPrice.x - ((114 - 119) / 2);
                // line.y = oldPrice.y + oldPrice.textHeight / 2 - 4.5;
                // view._nodeGroup.addChild(line);
                // let newIcon = BaseLoadBitmap.create(itemCfg.icon);
                // newIcon.setScale(0.4);
                // newIcon.x = oldPriceNum.x + 40 + 8;
                // newIcon.y = btn.y + 55;
                // view._nodeGroup.addChild(newIcon);
                // descText.x = newIcon.x + 40;
            }
            view._nodeGroup.addChild(itemicon);
            descText.y = itemicon.y + 13;
            view._nodeGroup.addChild(descText);
            //shopview_line
            //购买物品图标
            var buyItem = BaseLoadBitmap.create(rewardsArr[0].icon);
            buyItem.setScale(0.4);
            buyItem.x = btn.x + (num == 1 ? 66 : 59);
            buyItem.y = btn.y + 6;
            view._nodeGroup.addChild(buyItem);
            //添加购买次数
            var buynumtext = ComponentManager.getTextField("x" + num, 20, TextFieldConst.COLOR_BLACK);
            buynumtext.x = buytext.x + 53 + 100 * 0.4 - (num == 1 ? 2.3 : 1.3);
            buynumtext.y = btn.y + 16;
            view._nodeGroup.addChild(buynumtext);
            //添加转动次数
            var turnText = ComponentManager.getTextField(LanguageManager.getlocal('AcTurnDesc', [num.toString()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
            if (style) {
                turnText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            }
            turnText.x = btn.x + (151 - turnText.textWidth) / 2;
            turnText.y = btn.y - turnText.textHeight;
            view._nodeGroup.addChild(turnText);
            //推荐图标
            if (num == 10) {
                if (style) {
                    var discountimg = BaseBitmap.create("acmaydaydiscount");
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, discountimg, btn);
                    view._nodeGroup.addChild(discountimg);
                }
                else {
                    var tuiJian = BaseBitmap.create('acturntable_tjbg');
                    tuiJian.x = btn.x + btn.width + 5;
                    tuiJian.y = btn.y - 7;
                    view._nodeGroup.addChild(tuiJian);
                    var tjText = ComponentManager.getTextField(LanguageManager.getlocal('AcTurnTjDesc'), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
                    tjText.x = tuiJian.x + 11;
                    tjText.y = tuiJian.y + 25;
                    view._nodeGroup.addChild(tjText);
                }
            }
        }
        var descbg = null;
        if (style) {
            //acturntabletop_descbg
            //购买区域
            descbg = BaseBitmap.create('public_9_bg49');
            descbg.width = 610;
            descbg.height = 138;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, descbg, view._nodeGroup, [0, 155], true);
            view._nodeGroup.addChild(descbg);
            bottombg.mask = new egret.Rectangle(0, 0, bottombg.width, (descbg.y - bottombg.y));
        }
        //排行榜按钮
        var rankBtn = ComponentManager.getButton(style ? 'acmaydayrank' : 'acturntable_rankicon', '', view.rankClick, this);
        view._nodeGroup.addChild(rankBtn);
        view._rankBtn = rankBtn;
        //作圆
        var total = cfg.lotteryPool.length;
        var rad = Math.PI / 180;
        var radius = view._circleGroup.height / 2;
        var rewardTab = [];
        for (var key in cfg.lotteryPool) {
            rewardTab.push(cfg.lotteryPool[key][0]);
        }
        var rIcons = GameData.getRewardItemIcons(rewardTab.join("|"), true, false);
        for (var i = 0; i < total; ++i) {
            //计算角度
            var angle = 360 / total * rad * i;
            //画直线
            var line = BaseBitmap.create('acturntable_line');
            line.width = (327 / 2);
            line.rotation = 90 + 360 / total * i;
            line.x = centerX;
            line.y = centerY;
            view._circleGroup.addChild(line);
            //加物品icon
            var itemicon = rIcons[i];
            itemicon.setScale(0.6);
            itemicon.anchorOffsetX = itemicon.width / 2;
            itemicon.anchorOffsetY = itemicon.height / 2;
            var itemX = (radius + 30) * Math.sin(angle + 360 / total * rad / 2) / 2;
            var itemY = (radius + 30) * Math.cos(angle + 360 / total * rad / 2) / 2;
            itemicon.x = centerX + itemX; // + (itemX > 0 ? -1 : 1) * itemicon.width * Math.sin(angle + 360 / total * rad / 2) / 2;
            itemicon.y = centerY - itemY; // + (itemY > 0 ? -1 : 1) * itemicon.height * Math.cos(angle + 360 / total * rad / 2) / 2;
            itemicon.name = "item" + i;
            view._circleGroup.addChild(itemicon);
        }
        //添加指针
        var point = BaseBitmap.create(!style ? 'acturntable_point' : 'acturntable_point2');
        point.anchorOffsetX = 137 / 2;
        point.anchorOffsetY = 157 / 2;
        point.x = view._circleGroup.x;
        point.y = view._circleGroup.y - 9;
        view._nodeGroup.addChild(point);
        //当前次数
        var numBg = BaseBitmap.create("acmaydaynumbg");
        numBg.y = -190;
        numBg.x = GameConfig.stageWidth - 172 - 50;
        view._nodeGroup.addChild(numBg);
        var curnturnText = ComponentManager.getTextField(LanguageManager.getlocal('acMayDayCurnNum', [this.vo.getTurnTotal().toString()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        curnturnText.x = numBg.x + (172 - curnturnText.textWidth) / 2;
        curnturnText.y = numBg.y + 7;
        curnturnText.name = 'curnTurn';
        view._nodeGroup.addChild(curnturnText);
        //进度
        var progress = null;
        if (style) {
            curnturnText.text = LanguageManager.getlocal('acMayDayCurnNum2', [this.vo.getTurnTotal().toString()]);
            curnturnText.lineSpacing = 5;
            curnturnText.textAlign = egret.HorizontalAlign.CENTER;
            progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 422);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, progress, descbg, [155, 27]);
        }
        else {
            progress = ComponentManager.getProgressBar("progress10", "progress10_bg", 354);
            progress.x = GameConfig.stageWidth - progress.height - 168;
            progress.y = 220;
            progress.rotation = -90;
        }
        progress.setPercentage(view.getProgressPercent());
        view._nodeGroup.addChild(progress);
        view._progress = progress;
        //初始化宝箱
        var rewardList = cfg.lotteryNum;
        var rkeys = Object.keys(rewardList);
        var startY = this._progress.y;
        var perHeight = 354 / 4;
        for (var index = 0; index < rewardList.length; index++) {
            var tmprcfg = rewardList[index];
            var perY = startY - (index + 1) * perHeight;
            var arrowImg = BaseBitmap.create("acturantable_task_arrow");
            if (style) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, arrowImg, progress, [index == 3 ? (410) : (index + 1) * (85), -arrowImg.height]);
            }
            else {
                arrowImg.rotation = 90;
                arrowImg.x = this._progress.x + this._progress.height + arrowImg.height - 5;
                arrowImg.y = perY - arrowImg.width / 2 + 10;
            }
            view._nodeGroup.addChild(arrowImg);
            var rStatus = this.getBoxStatusById(rkeys[index]);
            var imgres = "acturantable_task_box1_";
            if (index > 1) {
                imgres = "acturantable_task_box2_";
            }
            var boxImg = BaseBitmap.create(imgres + String(rStatus));
            boxImg.anchorOffsetX = 53 / 2;
            boxImg.anchorOffsetY = 51 / 2;
            boxImg.name = "boxImg" + rkeys[index];
            if (style) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, boxImg, arrowImg, [0, -boxImg.height]);
            }
            else {
                boxImg.x = arrowImg.x + 53 / 2;
                boxImg.y = perY + 10;
            }
            var lightImg = BaseBitmap.create("acturantable_taskbox_light");
            lightImg.anchorOffsetX = 40;
            lightImg.anchorOffsetY = 40;
            if (style) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lightImg, boxImg);
            }
            else {
                lightImg.x = arrowImg.x + 20;
                lightImg.y = perY + 4;
            }
            lightImg.name = "lightImg" + rkeys[index];
            lightImg.visible = false;
            view._nodeGroup.addChild(lightImg);
            view._nodeGroup.addChild(boxImg);
            boxImg.addTouchTap(this.rewardBoxClickhandler, this, [rkeys[index]]);
            var rewardCfg = cfg.getBoxRewardById(rkeys[index]);
            var need = rewardCfg.needNum;
            var numTxt = ComponentManager.getTextField(LanguageManager.getlocal("AcTurnDesc", [need.toString()]), 18, 0x3e1f0f);
            if (style) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numTxt, arrowImg, [0, arrowImg.height + 1 + progress.height]);
                numTxt.textColor = TextFieldConst.COLOR_WHITE;
            }
            else {
                numTxt.x = boxImg.x + 32;
                numTxt.y = perY - numTxt.height / 2 + 10;
            }
            view._nodeGroup.addChild(numTxt);
        }
        if (style) {
            var distance = (bottombg.mask.height - turnTable.height - 30) / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, turnTable, view._nodeGroup, [0, distance], true);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, circleGroup, turnTable, [0, 10]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, point, turnTable);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, curnturnText, point, [0, 10]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rankBtn, descbg, [30, 0]);
        }
        else {
            turnTable.x = 30;
            turnTable.y = -180;
            rankBtn.x = 10;
            rankBtn.y = -180;
        }
        view.fresh_free();
        view.refreshProfress();
    };
    //奖励宝箱点击
    AcMayDayViewTab1.prototype.rewardBoxClickhandler = function (obj, param) {
        if (this._isCircleRun) {
            return;
        }
        var boxRewardId = param;
        var status = this.getBoxStatusById(boxRewardId);
        /**
         *  1未完成 2可领取 3已领取
         */
        if (status == 2) {
            this._curRewardBoxId = boxRewardId;
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMA, { activeId: this.acTivityId, lotteryId: Number(boxRewardId) + 1 });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW, { 'type': this.aid, 'code': this.code, 'id': boxRewardId });
        }
    };
    //判断宝箱状态 1未完成 2可领取 3已经领取
    AcMayDayViewTab1.prototype.getBoxStatusById = function (boxId) {
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
    AcMayDayViewTab1.prototype.fresh_free = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var icon = view._nodeGroup.getChildByName('item1');
        var text = view._nodeGroup.getChildByName('desc1');
        var freetext = view._nodeGroup.getChildByName('freetxt');
        icon.visible = text.visible = !view.vo.isFree();
        freetext.visible = view.vo.isFree();
    };
    //处理进度条进度值
    AcMayDayViewTab1.prototype.getProgressPercent = function () {
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
    AcMayDayViewTab1.prototype.refreshProfress = function () {
        var view = this;
        var curnturnText = this._nodeGroup.getChildByName('curnTurn');
        if (Number(view.code) > 8) {
            curnturnText.text = LanguageManager.getlocal('acMayDayCurnNum2', [this.vo.getTurnTotal().toString()]);
        }
        else {
            curnturnText.textColor = TextFieldConst.COLOR_BROWN;
            if (this.vo.getTurnTotal() > 0) {
                curnturnText.text = LanguageManager.getlocal('acMayDayCurnNum_2', [this.vo.getTurnTotal().toString()]);
            }
            else {
                curnturnText.text = LanguageManager.getlocal('acMayDayCurnNum_1', [this.vo.getTurnTotal().toString()]);
            }
        }
        var newPro = this.getProgressPercent();
        var oldPro = this._progress.getPercent();
        egret.Tween.get(this._progress, { loop: false }).to({ percent: newPro }, (newPro - oldPro) * 5000);
        var rewardList = this.cfg.lotteryNum;
        var rkeys = Object.keys(rewardList);
        for (var index = 0; index < rkeys.length; index++) {
            var tmpK = String(rkeys[index]);
            var boxImg = this._nodeGroup.getChildByName("boxImg" + tmpK);
            var lightImg = this._nodeGroup.getChildByName("lightImg" + tmpK);
            var rStatus = this.getBoxStatusById(tmpK);
            var imgres = "acturantable_task_box1_";
            if (index > 1) {
                imgres = "acturantable_task_box2_";
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
    AcMayDayViewTab1.prototype.getSheepType = function () {
        return 1;
    };
    //购买按钮点击
    AcMayDayViewTab1.prototype.buyBtnHandler = function (num) {
        if (this._isCircleRun) {
            return;
        }
        if (this.vo.et - GameData.serverTime - 86400 * 1 <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_error"));
            return;
        }
        var view = this;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYLOTTERY, { activeId: this.acTivityId, isTenPlay: num == 10 ? 1 : 0 });
    };
    //转盘动画
    AcMayDayViewTab1.prototype.buyBtnHandlerCaller = function (event) {
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
        var view = this;
        view.fresh_free();
        view.refreshProfress();
        var rewards = data.rewards || '';
        var reward_arr = rewards.split('|');
        if (reward_arr.length == 2) {
            view._isCircleRun = true;
            var total = this.cfg.lotteryPool.length;
            reward_arr.splice(reward_arr.indexOf(this.cfg.getReward), 1);
            view._rewardItem = this.cfg.getSelectItemIdx(reward_arr[0]);
            var rad = Math.PI / 180;
            var endRotation = 360 / total * view._rewardItem;
            //100ms 360度
            egret.Tween.get(view._circleGroup, { onChange: function () {
                    var total = _this.cfg.lotteryPool.length;
                    for (var i = 0; i < total; ++i) {
                        var item = view._circleGroup.getChildByName("item" + i);
                        if (item) {
                            item.rotation = 0 - view._circleGroup.rotation;
                        }
                    }
                } }).
                to({ rotation: 9000 }, 1500).
                to({ rotation: 9360 }, 100).
                to({ rotation: 9720 }, 200).
                to({ rotation: 10080 }, 400).
                to({ rotation: 10440 - (endRotation + 360 / total / 2) }, 800).wait(500).
                call(function () {
                view._isCircleRun = false;
                ViewController.getInstance().openView(ViewConst.POPUP.ACMAYDAYREWARDPOPUPVIEW, { rewards: rewards, aid: view.aid, code: view.code });
            }, this);
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.ACMAYDAYREWARDPOPUPVIEW, { rewards: rewards, aid: view.aid, code: view.code });
        }
    };
    AcMayDayViewTab1.prototype.rankClick = function () {
        // this._acVo.et = GameData.serverTime + 10;
        if (this._isCircleRun) {
            return;
        }
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACTMAYDAYRANKPOPUPVIEW, { aid: this.aid, code: this.code });
    };
    //宝箱奖励领取回调
    AcMayDayViewTab1.prototype.rewardBoxClickhandlerCallBack = function (event) {
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
        var boxImg = this._nodeGroup.getChildByName("boxImg" + this._curRewardBoxId);
        var pos = boxImg.localToGlobal(boxImg.width / 2, 50);
        App.CommonUtil.playRewardFlyAction(rList, pos);
        this.refreshProfress();
    };
    AcMayDayViewTab1.prototype.refreshWhenSwitchBack = function () {
        var view = this;
        view.fresh_table();
    };
    AcMayDayViewTab1.prototype.fresh_table = function () {
        var view = this;
        view._circleGroup.rotation = 0;
        var total = this.cfg.lotteryPool.length;
        for (var i = 0; i < total; ++i) {
            var item = view._circleGroup.getChildByName("item" + i);
            if (item) {
                item.rotation = 0;
            }
        }
    };
    AcMayDayViewTab1.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMA), this.rewardBoxClickhandlerCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYLOTTERY), this.buyBtnHandlerCaller, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESHTURNTABLE, this.fresh_table, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM, this.fresh_free, this);
        egret.Tween.removeTweens(view._circleGroup);
        egret.Tween.removeTweens(this._progress);
        for (var index = 0; index < 4; index++) {
            var boxImg = this._nodeGroup.getChildByName("boxImg" + index);
            var lightImg = this._nodeGroup.getChildByName("lightImg" + index);
            egret.Tween.removeTweens(boxImg);
            egret.Tween.removeTweens(lightImg);
        }
        view._rankBtn.removeTouchTap();
        view._rankBtn.dispose();
        view._circleGroup.removeTouchTap();
        view._circleGroup.removeChildren();
        view._nodeGroup.removeChildren();
        view._rankBtn = null;
        view._progress = null;
        view._nodeGroup = null;
        view._circleGroup = null;
        _super.prototype.dispose.call(this);
    };
    return AcMayDayViewTab1;
}(AcCommonViewTab));
__reflect(AcMayDayViewTab1.prototype, "AcMayDayViewTab1");
//# sourceMappingURL=AcMayDayViewTab1.js.map