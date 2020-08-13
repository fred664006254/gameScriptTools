var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 连连看
 */
var AcFindSameGameView = /** @class */ (function (_super) {
    __extends(AcFindSameGameView, _super);
    function AcFindSameGameView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._timeTxt = null;
        _this.resetFlag = false;
        /** 玩家无操作提示玩家的定时任务的句柄 */
        _this.tipHandler = false;
        _this._checkBox = null;
        _this._costTxt = null;
        _this._butTimesTxt = null;
        _this._timesTxt = null;
        _this._xcTimesTxt = null;
        _this._clickHand = null;
        _this._buyBtn = null;
        _this._isTen = false;
        return _this;
    }
    Object.defineProperty(AcFindSameGameView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcFindSameView.AID, AcFindSameView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFindSameGameView.prototype, "acVo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcFindSameView.AID, AcFindSameView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    //规则
    AcFindSameGameView.prototype.getRuleInfo = function () {
        return "findSameRuleInfo-1";
    };
    AcFindSameGameView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    AcFindSameGameView.prototype.getBgName = function () {
        return this.getDefaultRes("findsame_bg_main");
    };
    //根据资源名字得到完整资源名字
    AcFindSameGameView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcFindSameGameView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            this.viewBg.width = 640;
            this.viewBg.height = 1136;
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.viewBg.setPosition(0, GameConfig.stageHeigth - this.viewBg.height);
            this.addChild(this.viewBg);
        }
    };
    AcFindSameGameView.prototype.getTitleBgName = function () {
        // return this.getDefaultRes(`findsame_title`);
        return null;
    };
    AcFindSameGameView.prototype.freshTimesTxt = function () {
        this._leftTimes = this.acVo.getTimes() + this.acVo.getFree();
        this._timesTxt.text = LanguageManager.getlocal("findsame_gametimes2", [String(this._leftTimes)]);
        var pos = this._leftTimes < 10 ? 60 : (this._leftTimes > 100 ? 70 : 65);
        this._timesTxt.setPosition(this._thisWidth / 2 - this._timesTxt.width / 2 + pos, this._timesTxt.y);
        this._xcTimesTxt.text = LanguageManager.getlocal("findsame_game_num", [String(this.acVo.getProcess())]);
    };
    AcFindSameGameView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshRed, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_FINDSAME_GETRECHARGE, this.refreshRed, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_FINDSAME_GETACHIEVEMENT, this.refreshRed, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_FINDSAME_GETTASK, this.refreshRed, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_FINDSAME_ATTACK, this.refreshRed, this);
        //下部背景
        var mainBottom = BaseBitmap.create(this.getDefaultRes("findsame_game_botbg"));
        mainBottom.y = GameConfig.stageHeigth - mainBottom.height;
        this.addChild(mainBottom);
        var titleBg = BaseBitmap.create(this.getDefaultRes("findsame_title"));
        this.addChildToContainer(titleBg);
        titleBg.x = titleBg.y = 0;
        var havebg = BaseBitmap.create("luckydrawiconbg-1");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, havebg, titleBg, [0, -(havebg.height + 15)]);
        this.addChildToContainer(havebg);
        var xcTimesTxt = ComponentManager.getTextField(LanguageManager.getlocal("findsame_game_num", [String(this.acVo.getProcess())]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        xcTimesTxt.setPosition(havebg.x + havebg.width / 2 - xcTimesTxt.width / 2, havebg.y + havebg.height / 2 - xcTimesTxt.height / 2 + 3);
        this.addChildToContainer(xcTimesTxt);
        this._xcTimesTxt = xcTimesTxt;
        // 各个层
        this.cellLayer = new BaseDisplayObjectContainer();
        this.addChild(this.cellLayer);
        this.selectLayer = new BaseDisplayObjectContainer();
        this.addChild(this.selectLayer);
        this.lineLayer = new BaseDisplayObjectContainer();
        this.addChild(this.lineLayer);
        this.boomLayer = new BaseDisplayObjectContainer();
        this.addChild(this.boomLayer);
        this._leftTimes = this.acVo.getTimes() + this.acVo.getFree();
        var timesTxt = ComponentManager.getTextField(LanguageManager.getlocal("findsame_gametimes2", [String(this._leftTimes)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        var pos = this._leftTimes < 10 ? 60 : (this._leftTimes > 100 ? 70 : 65);
        timesTxt.setPosition(this.width / 2 - timesTxt.width / 2 + pos, mainBottom.y + mainBottom.height - timesTxt.height - 35);
        this._thisWidth = this.width;
        this.addChild(timesTxt);
        this._timesTxt = timesTxt;
        var itemImg = BaseBitmap.create("findsame_icon5");
        itemImg.setScale(0.3);
        this.addChild(itemImg);
        itemImg.setPosition(this.width / 2 - itemImg.width * itemImg.scaleX / 2 + 30, timesTxt.y);
        var timesTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("findsame_gametimes1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        timesTxt1.setPosition(itemImg.x - timesTxt1.width, timesTxt.y);
        this.addChild(timesTxt1);
        var buyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.onBtnClick, this);
        buyBtn.setPosition(this.width / 2 - buyBtn.width / 2, timesTxt.y - buyBtn.height - 10);
        this.addChild(buyBtn);
        this._buyBtn = buyBtn;
        this._checkBox = ComponentManager.getCheckBox("");
        this._checkBox.setPosition(buyBtn.x + 20, buyBtn.y - this._checkBox.height - 5);
        this.addChild(this._checkBox);
        this._checkBox.addTouchTap(this.onCheckClick, this);
        var tenTitle = ComponentManager.getTextField(LanguageManager.getlocal("acFindSameBuyTen"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tenTitle.setPosition(this._checkBox.x + this._checkBox.width + 5, this._checkBox.y + this._checkBox.height / 2 - tenTitle.height / 2);
        this.addChild(tenTitle);
        var txt1 = ComponentManager.getTextField(LanguageManager.getlocal("findsame_gamebuytimes"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        txt1.setPosition(buyBtn.x + buyBtn.width / 2 - txt1.width / 2, buyBtn.y + buyBtn.height - txt1.height - 3);
        this.addChild(txt1);
        this._butTimesTxt = txt1;
        var cost = this.cfg.cost;
        var txt2 = ComponentManager.getTextField("" + cost, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        txt2.setPosition(buyBtn.x + 85, buyBtn.y + 10);
        this.addChild(txt2);
        this._costTxt = txt2;
        var icon = BaseBitmap.create("itemicon1");
        icon.setScale(0.3);
        icon.setPosition(buyBtn.x + 45, buyBtn.y + 2);
        this.addChild(icon);
        //活动详情
        var detailBtnBg = ResourceManager.hasRes("ac_findsame_detailbtn-" + this.getUiCode()) ? "ac_findsame_detailbtn-" + this.getUiCode() : "ac_findsame_detailbtn-1";
        var detailBtn = ComponentManager.getButton(detailBtnBg, "", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACFINDSAMEREWARDPOPVIEW, { aid: _this.acVo.aid, code: _this.acVo.code });
        }, this, null);
        detailBtn.setPosition(10, 100);
        this.addChild(detailBtn);
        this._detailBtn = detailBtn;
        this.refreshRed();
        this.mapArrBtn = {};
        this.refreshGrid();
        this.resetFlag = false;
        this.initEffect();
        this.cellLayer.x = 3;
        this.cellLayer.y = -15;
    };
    AcFindSameGameView.prototype.onCheckClick = function () {
        if (this._checkBox.checkSelected()) {
            this._costTxt.text = String(this.cfg.cost * 10);
            App.CommonUtil.showTip(LanguageManager.getlocal("acFindSameBuyTenTips1"));
            this._butTimesTxt.text = LanguageManager.getlocal("findsame_gamebuytimes10");
        }
        else {
            this._costTxt.text = String(this.cfg.cost);
            App.CommonUtil.showTip(LanguageManager.getlocal("acFindSameBuyTenTips2"));
            this._butTimesTxt.text = LanguageManager.getlocal("findsame_gamebuytimes");
        }
    };
    AcFindSameGameView.prototype.refreshRed = function () {
        if (this.acVo.isCangetAchieveReward() || this.acVo.isCangetChargeReward() || this.acVo.isShowTaskRewardRedDot()) {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            var detailRed = this._detailBtn.getChildByName("reddot");
            if (detailRed) {
                detailRed.setPosition(70, 0);
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
        this.freshTimesTxt();
    };
    AcFindSameGameView.prototype.onBtnClick = function () {
        if (!this.acVo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.acVo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var haveNumber = Api.playerVoApi.getPlayerGem();
        var cost = this.cfg.cost;
        this._isTen = this._checkBox.checkSelected();
        if (this._isTen) {
            cost = this.cfg.cost * 10;
        }
        if (haveNumber < cost) {
            var message = LanguageManager.getlocal("findsame_game_notbuy");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                msg: message,
                title: "itemUseConstPopupViewTitle",
                touchMaskClose: true,
                callback: function () {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW, { rechargeId: cost });
                },
                handler: this,
                needClose: 1,
                needCancel: true
            });
            return;
        }
        this.request(NetRequestConst.REQUEST_FINDSAME_BUYNUM, {
            activeId: this.param.data.aid + "-" + this.param.data.code,
            isTenPlay: this._isTen ? 1 : 0
        });
    };
    AcFindSameGameView.prototype.initEffect = function () {
        // 选中框
        var selectedEffect0 = ComponentManager.getCustomMovieClip("findsame_select_", 12, 100);
        selectedEffect0.width = 140;
        selectedEffect0.height = 140;
        selectedEffect0.visible = false;
        selectedEffect0.blendMode = egret.BlendMode.ADD;
        this.selectLayer.addChild(selectedEffect0);
        var selectedEffect1 = ComponentManager.getCustomMovieClip("findsame_select_", 12, 100);
        selectedEffect1.width = 140;
        selectedEffect1.height = 140;
        selectedEffect1.visible = false;
        selectedEffect1.blendMode = egret.BlendMode.ADD;
        this.selectLayer.addChild(selectedEffect1);
        this.selectedEffect = [selectedEffect0, selectedEffect1];
        // 提示框
        var tipEffect0 = ComponentManager.getCustomMovieClip("findsame_select_", 12, 100);
        tipEffect0.width = 140;
        tipEffect0.height = 140;
        tipEffect0.visible = false;
        tipEffect0.blendMode = egret.BlendMode.ADD;
        this.selectLayer.addChild(tipEffect0);
        var tipEffect1 = ComponentManager.getCustomMovieClip("findsame_select_", 12, 100);
        tipEffect1.width = 140;
        tipEffect1.height = 140;
        tipEffect1.visible = false;
        tipEffect1.blendMode = egret.BlendMode.ADD;
        this.selectLayer.addChild(tipEffect1);
        this.tipEffect = [tipEffect0, tipEffect1];
        // 消除特效（碎片）
        var xiaochuEffect0 = ComponentManager.getCustomMovieClip("findsame_xiaochu_", 11, 100);
        xiaochuEffect0.width = 120;
        xiaochuEffect0.height = 120;
        xiaochuEffect0.visible = false;
        this.boomLayer.addChild(xiaochuEffect0);
        var xiaochuEffect1 = ComponentManager.getCustomMovieClip("findsame_xiaochu_", 11, 100);
        xiaochuEffect1.width = 120;
        xiaochuEffect1.height = 120;
        xiaochuEffect1.visible = false;
        this.boomLayer.addChild(xiaochuEffect1);
        this.xiaochuEffect = [xiaochuEffect0, xiaochuEffect1];
        // 连接线
        this.lineEffect = [];
        this.confirmLineCount(10);
        // 321倒计时
        if (this.acVo.st + 3 > GameData.serverTime) {
            var _loop_1 = function () {
                var effect321 = ComponentManager.getBitmapText("", "activity_fnt", 30);
                effect321.text = String(i);
                effect321.anchorOffsetX = effect321.width / 2;
                effect321.anchorOffsetY = effect321.height / 2;
                effect321.x = GameConfig.stageWidth / 2;
                effect321.y = GameConfig.stageHeigth / 2;
                effect321.setScale(5);
                effect321.alpha = 0;
                this_1.addChild(effect321);
                egret.Tween.get(effect321)
                    .wait((3 - i) * 1000)
                    .to({ scaleX: 2, scaleY: 2, alpha: 1 }, 8 / 30 * 1000)
                    .wait(14 / 30 * 1000)
                    .to({ alpha: 0 }, 8 / 30 * 1000)
                    .call(function () {
                    effect321.parent.removeChild(effect321);
                });
            };
            var this_1 = this;
            // 如果这一局的开始时间在当前时间之前，则认为是第一次进来，则显示321倒计时
            for (var i = 3; i >= 1; i--) {
                _loop_1();
            }
        }
    };
    /** 确保有count个连接线段 */
    AcFindSameGameView.prototype.confirmLineCount = function (count) {
        for (var index = this.lineEffect.length; index < count; index++) {
            var oneLine = ComponentManager.getCustomMovieClip("findsame_lianxian_", 5, 50);
            oneLine.width = 260;
            oneLine.height = 150;
            oneLine.visible = false;
            oneLine.anchorOffsetX = oneLine.width / 2;
            oneLine.anchorOffsetY = oneLine.height / 2;
            oneLine.blendMode = egret.BlendMode.ADD;
            this.lineLayer.addChild(oneLine);
            var onePar = ComponentManager.getCustomMovieClip("findsame_par_", 13, 50);
            onePar.width = 260;
            onePar.height = 150;
            onePar.visible = false;
            onePar.anchorOffsetX = onePar.width / 2;
            onePar.anchorOffsetY = onePar.height / 2;
            onePar.blendMode = egret.BlendMode.ADD;
            this.lineLayer.addChild(onePar);
            this.lineEffect[index] = { line: oneLine, par: onePar };
        }
    };
    /** 播放连线特效 */
    AcFindSameGameView.prototype.playLineEffect = function (points) {
        var _this = this;
        var allCount = 0;
        for (var i = 0; i < points.length - 1; i++) {
            allCount += Math.abs(points[i].x - points[i + 1].x) + Math.abs(points[i].y - points[i + 1].y);
        }
        console.log("need all line count", allCount);
        this.confirmLineCount(allCount);
        // 相临点数组
        var twoPointArr = [];
        for (var i = 0; i < points.length - 1; i++) {
            var startPoint = points[i];
            var endPoint = points[i + 1];
            var points2 = this.getAllPointByTwoPoint(startPoint, endPoint);
            for (var j = 0; j < points2.length - 1; j++) {
                twoPointArr.push([points2[j], points2[j + 1]]);
            }
        }
        var _loop_2 = function (i) {
            var startPoint = twoPointArr[i][0];
            var endPoint = twoPointArr[i][1];
            var centerPoint = { x: (startPoint.x + endPoint.x) / 2, y: (startPoint.y + endPoint.y) / 2 };
            var effectPos = this_2.getCellPos(centerPoint.x, centerPoint.y);
            var effect = this_2.lineEffect[i];
            effect.line.x = effectPos.x;
            effect.line.y = effectPos.y;
            effect.par.x = effectPos.x;
            effect.par.y = effectPos.y;
            if (startPoint.x == endPoint.x) {
                effect.line.rotation = 90;
                effect.par.rotation = 90;
            }
            else {
                effect.line.rotation = 0;
                effect.par.rotation = 0;
            }
            effect.line.visible = true;
            effect.line.playWithTime(1);
            effect.line.setEndCallBack(function () {
                effect.line.visible = false;
                effect.par.visible = true;
                effect.par.playWithTime(1);
                effect.par.setEndCallBack(function () {
                    effect.par.visible = false;
                }, _this);
            }, this_2);
        };
        var this_2 = this;
        // 根据相临点数组，播放所有的单段动画
        for (var i = 0; i < twoPointArr.length; i++) {
            _loop_2(i);
        }
    };
    /** 根据两个点，列出这条线段上的所有点, 会升序排列 */
    AcFindSameGameView.prototype.getAllPointByTwoPoint = function (p1, p2) {
        var rets = [];
        if (p1.x == p2.x) {
            for (var y = Math.min(p1.y, p2.y); y <= Math.max(p1.y, p2.y); y++) {
                rets.push({ x: p1.x, y: y });
            }
        }
        else if (p1.y == p2.y) {
            for (var x = Math.min(p1.x, p2.x); x <= Math.max(p1.x, p2.x); x++) {
                rets.push({ x: x, y: p1.y });
            }
        }
        else {
            console.log("两个点不在一条直线上");
        }
        return rets;
    };
    AcFindSameGameView.prototype.tick = function () {
    };
    AcFindSameGameView.prototype.playCellGone = function (pos1, pos2) {
        egret.Tween.get(this.mapArrBtn[pos1])
            .to({ alpha: 0 }, 500);
        egret.Tween.get(this.mapArrBtn[pos2])
            .to({ alpha: 0 }, 500);
    };
    AcFindSameGameView.prototype.cellClick = function (x, y) {
        var _this = this;
        console.log(x, y);
        if (!this.acVo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.acVo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this.acVo.st + 3 > GameData.serverTime) {
            console.log("倒计时未结束");
            return;
        }
        this.regTipCell();
        if (this._leftTimes <= 0) {
            var message = LanguageManager.getlocal("findsame_notstart");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                msg: message,
                title: "itemUseConstPopupViewTitle",
                touchMaskClose: true,
                callback: function () {
                    if (!_this._clickHand) {
                        _this._clickHand = BaseBitmap.create("guide_hand");
                        _this._buyBtn.parent.addChild(_this._clickHand);
                        _this._clickHand.setPosition(_this._buyBtn.x + _this._buyBtn.width / 2 - 10, _this._buyBtn.y + _this._buyBtn.height / 2 - 5);
                        egret.Tween.get(_this._clickHand, { loop: true })
                            .to({ scaleX: 0.9, scaleY: 0.9 }, 500)
                            .to({ scaleX: 1, scaleY: 1 }, 500);
                    }
                    _this._clickHand.visible = true;
                },
                cancelcallback: function () {
                    if (_this._clickHand) {
                        _this._clickHand.visible = false;
                    }
                },
                closecallback: function () {
                    if (_this._clickHand) {
                        _this._clickHand.visible = false;
                    }
                },
                handler: this,
                needClose: 1,
                needCancel: true
            });
            // App.CommonUtil.showTip(LanguageManager.getlocal("findsame_notstart"));
            return;
        }
        var pos = x + y * this.cfg.GRID_WIDTH;
        if (this.selected) {
            var selectedPos_1 = this.selected.x + this.selected.y * this.cfg.GRID_WIDTH;
            var linked = this.acVo.checkLink(this.selected, { x: x, y: y });
            if (linked == false) {
                // 不连通
                this.selected = { x: x, y: y };
                this.setSelectEffect(0, this.selected);
            }
            else {
                // 连通
                // this.setSelectEffect(1, { x: x, y: y });
                this.playXiaochuEffect(this.selected, { x: x, y: y });
                this.playLineEffect([this.selected, linked[0], linked[1], { x: x, y: y }]);
                this.playCellGone(selectedPos_1, pos);
                this.setSelectEffectGone(0);
                delete this.acVo.map.arr[selectedPos_1];
                delete this.acVo.map.arr[pos];
                this.mapArrBtn[selectedPos_1].parent.removeChild(this.mapArrBtn[selectedPos_1]);
                this.mapArrBtn[pos].parent.removeChild(this.mapArrBtn[pos]);
                delete this.mapArrBtn[selectedPos_1];
                delete this.mapArrBtn[pos];
                setTimeout(function () {
                    var reset = 0;
                    if (Object.keys(_this.acVo.map.arr).length > 0) { // 如果还没结束
                        _this.nextCanLink = _this.acVo.scanForLink();
                        console.log("nextCanLink", _this.nextCanLink);
                        if (!_this.nextCanLink) {
                            reset = 1; // 重置
                            _this.resetFlag = true;
                            // App.CommonUtil.showTip(LanguageManager.getlocal("findsame_game_cannot"));
                        }
                    }
                    _this.request(NetRequestConst.REQUEST_FINDSAME_ATTACK, {
                        activeId: _this.param.data.aid + "-" + _this.param.data.code,
                        pos1: pos,
                        pos2: selectedPos_1,
                        reset: reset
                    });
                }, 500);
                this.selected = null;
            }
        }
        else {
            this.selected = { x: x, y: y };
            this.setSelectEffect(0, this.selected);
        }
    };
    /** 设置选中框 */
    AcFindSameGameView.prototype.setSelectEffect = function (index, p) {
        var cellPos = this.getCellPos(p.x, p.y);
        this.selectedEffect[index].x = cellPos.x - this.selectedEffect[index].width / 2 + 4;
        this.selectedEffect[index].y = cellPos.y - this.selectedEffect[index].height / 2 - 15;
        this.selectedEffect[index].visible = true;
        this.selectedEffect[index].alpha = 1;
        this.selectedEffect[index].playWithTime(0);
    };
    /** 选中框渐 */
    AcFindSameGameView.prototype.setSelectEffectGone = function (index) {
        // egret.Tween.get(this.selectedEffect[0])
        //     .to({ alpha: 0 }, 500)
        // egret.Tween.get(this.selectedEffect[1])
        //     .to({ alpha: 0 }, 500)
        this.selectedEffect[index].visible = false;
        this.selectedEffect[index].stop();
    };
    /** 播放消除碎片 */
    AcFindSameGameView.prototype.playXiaochuEffect = function (p1, p2) {
        var posArr = [p1, p2];
        for (var index = 0; index < this.xiaochuEffect.length; index++) {
            var element = this.xiaochuEffect[index];
            var cellPos = this.getCellPos(posArr[index].x, posArr[index].y);
            element.x = cellPos.x - element.width / 2;
            element.y = cellPos.y - element.height / 2 - 10;
            element.visible = true;
            element.playWithTime(1);
            element.setEndCallBack(function () {
                element.visible = false;
            }, this);
        }
    };
    /** 刷新网格 */
    AcFindSameGameView.prototype.refreshGrid = function () {
        var _this = this;
        if (this.mapArrBtn) {
            for (var key in this.mapArrBtn) {
                if (this.mapArrBtn.hasOwnProperty(key)) {
                    var btn = this.mapArrBtn[key];
                    btn.parent.removeChild(btn);
                }
            }
        }
        this.mapArrBtn = {};
        var _loop_3 = function (x) {
            var _loop_4 = function (y) {
                var pos = x + y * this_3.cfg.GRID_WIDTH;
                var item = this_3.acVo.map.arr[pos];
                if (item) {
                    var buttonBg = ComponentManager.getButton("findsame_cellbg", "", function () {
                        _this.cellClick(x, y);
                    }, this_3);
                    var cellPos = this_3.getCellPos(x, y);
                    buttonBg.x = cellPos.x - 38;
                    buttonBg.y = cellPos.y - 38;
                    this_3.cellLayer.addChild(buttonBg);
                    var icon = BaseBitmap.create("findsame_icon" + item);
                    icon.name = "icon";
                    icon.x = 0;
                    icon.y = 0;
                    buttonBg.addChild(icon);
                    this_3.mapArrBtn[pos] = buttonBg;
                }
            };
            for (var y = 1; y <= this_3.cfg.GRID_HEIGHT; y++) {
                _loop_4(y);
            }
        };
        var this_3 = this;
        for (var x = this.cfg.GRID_WIDTH; x >= 1; x--) {
            _loop_3(x);
        }
        this.nextCanLink = this.acVo.scanForLink();
        console.log("nextCanLink", this.nextCanLink);
        this.regTipCell();
    };
    /** 注册提示框 */
    AcFindSameGameView.prototype.regTipCell = function () {
        var _this = this;
        if (this.tipHandler !== false) {
            clearInterval(this.tipHandler);
        }
        this.tipHandler = setInterval(function () {
            // 提示玩家
            _this.fadeInOutTip(0, _this.nextCanLink[0]);
            _this.fadeInOutTip(1, _this.nextCanLink[1]);
        }, this.cfg.tipsTime * 1000);
    };
    AcFindSameGameView.prototype.fadeInOutTip = function (index, p) {
        var _this = this;
        var cellPos = this.getCellPos(p.x, p.y);
        this.tipEffect[index].x = cellPos.x - this.tipEffect[index].width / 2 + 4;
        this.tipEffect[index].y = cellPos.y - this.tipEffect[index].height / 2 - 15;
        this.tipEffect[index].visible = true;
        this.tipEffect[index].alpha = 0;
        this.tipEffect[index].playWithTime(0);
        this.tipEffect[index].$addListener;
        egret.Tween.get(this.tipEffect[index])
            .to({ alpha: 1 }, 500)
            .to({ alpha: 0 }, 500)
            .to({ alpha: 1 }, 500)
            .to({ alpha: 0 }, 500)
            .call(function () {
            _this.tipEffect[index].visible = false;
            _this.tipEffect[index].stop();
        });
    };
    /** 播放重置动画前半段 */
    AcFindSameGameView.prototype.playResetBefore = function (endCallback) {
        if (this.mapArrBtn) {
            for (var key in this.mapArrBtn) {
                if (this.mapArrBtn.hasOwnProperty(key)) {
                    var icon = this.mapArrBtn[key].getChildByName("icon");
                    egret.Tween.get(icon)
                        .to({ alpha: 0, y: -30 }, 500)
                        .wait(500)
                        .call(endCallback);
                }
            }
        }
    };
    /** 播放重置动画后半段 */
    AcFindSameGameView.prototype.playResetAfter = function (endCallback) {
        if (this.mapArrBtn) {
            for (var key in this.mapArrBtn) {
                if (this.mapArrBtn.hasOwnProperty(key)) {
                    var icon = this.mapArrBtn[key].getChildByName("icon");
                    icon.alpha = 0;
                    icon.y = -30;
                    egret.Tween.get(icon)
                        .to({ alpha: 1, y: 0 }, 500)
                        .call(endCallback);
                }
            }
        }
    };
    //请求回调
    AcFindSameGameView.prototype.receiveData = function (data) {
        var _this = this;
        if (!data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("findsame_opt_fail") + data.data.ret);
        }
        this.freshTimesTxt();
        if (data.ret && data.data.cmd == NetRequestConst.REQUEST_FINDSAME_ATTACK) {
            if (data.data.data.mscore) { // 通关了
                // ViewController.getInstance().openView(ViewConst.POPUP.ACLINKGAMERESULTVIEW, {
                //     score: data.data.data.tscore + data.data.data.mscore,
                //     rewards: data.data.data.rewards,
                //     closeCb:()=>{
                //         this.hide();
                //     }
                // });
            }
            else {
                if (Object.keys(this.acVo.map.arr).length > 0) {
                    if (this.resetFlag) {
                        this.resetFlag = false;
                        this.cellLayer.x = 3;
                        App.CommonUtil.showTip(LanguageManager.getlocal("findsame_game_reset"));
                        egret.Tween.get(this.cellLayer).to({ x: -640 }, 750).call(function () {
                            _this.refreshGrid();
                            _this.cellLayer.x = 640;
                            egret.Tween.get(_this.cellLayer).to({ x: 3 }, 750).call(function () {
                                _this.nextCanLink = _this.acVo.scanForLink();
                                _this.regTipCell();
                            }, _this);
                        }, this);
                    }
                }
                else {
                    this.request(NetRequestConst.REQUEST_FINDSAME_GETMAP, { "activeId": this.acVo.aidAndCode });
                }
            }
            if (data.data.data.rewards) {
                var rewardVoList = GameData.formatRewardItem(data.data.data.rewards);
                App.CommonUtil.playRewardFlyAction(rewardVoList);
            }
        }
        else if (data.ret && data.data.cmd == NetRequestConst.REQUEST_FINDSAME_GETMAP) {
            App.CommonUtil.showTip(LanguageManager.getlocal("findsame_game_reset1"));
            this.cellLayer.x = 640;
            this.refreshGrid();
            egret.Tween.get(this.cellLayer).to({ x: 3 }, 750).call(function () {
                _this.nextCanLink = _this.acVo.scanForLink();
                _this.regTipCell();
            }, this);
            // this.playResetBefore(() => 
            // {
            //     this.refreshGrid();
            //     this.playResetAfter(() => 
            //     {
            //         this.nextCanLink = this.acVo.scanForLink();
            //         this.regTipCell();                    
            //     });
            // })
        }
        else if (data.ret && data.data.cmd == NetRequestConst.REQUEST_FINDSAME_BUYNUM) {
            var rewardVoList = GameData.formatRewardItem(this._isTen ? "1056_0_10" : "1056_0_1");
            var gPoint = this._buyBtn.parent.localToGlobal(this._buyBtn.x, this._buyBtn.y);
            var point = new egret.Point(GameConfig.stageWidth / 2, gPoint.y - 50);
            App.CommonUtil.playRewardFlyAction(rewardVoList, point);
            if (this._clickHand) {
                this._clickHand.visible = false;
            }
        }
    };
    AcFindSameGameView.prototype.getTitleStr = function () {
        return null;
    };
    AcFindSameGameView.prototype.getDefaultResList = function (resArr) {
        var arr = [];
        for (var i = 0; i < resArr.length; i++) {
            var element = resArr[i];
            var defRes = this.getDefaultRes(element);
            arr.push(defRes);
        }
        return arr;
    };
    /** 得到cell的位置（cell的中心位置，各个层次元素根据自身情况自己加偏移） */
    AcFindSameGameView.prototype.getCellPos = function (x, y) {
        var CELL_SIZE = 76;
        var retX = (GameConfig.stageWidth / 2 - CELL_SIZE * this.cfg.GRID_WIDTH / 2) + ((x + 0.5) * CELL_SIZE);
        var retY = (GameConfig.stageHeigth / 2 - CELL_SIZE * this.cfg.GRID_HEIGHT / 2) + ((y + 0.5) * CELL_SIZE);
        return { x: retX, y: retY };
    };
    AcFindSameGameView.prototype.hide = function () {
        // if (this.acVo.inGaming()) {
        //     ViewController.getInstance().hideView(ViewConst.COMMON.ACLINKGAMEVIEW);
        // }
        if (this.tipHandler !== false) {
            clearInterval(this.tipHandler);
        }
        if (this._clickHand) {
            egret.Tween.removeTweens(this._clickHand);
            this._clickHand = null;
        }
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshRed, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_FINDSAME_GETRECHARGE, this.refreshRed, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_FINDSAME_GETACHIEVEMENT, this.refreshRed, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_FINDSAME_GETTASK, this.refreshRed, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_FINDSAME_ATTACK, this.refreshRed, this);
        _super.prototype.hide.call(this);
    };
    AcFindSameGameView.prototype.getResourceList = function () {
        var codeRes = this.getDefaultResList([
            "findsame_game_botbg",
            "findsame_bg_main"
        ]);
        var baseList = [
            "findsame_cellbg",
            "findsame_icon1",
            "findsame_icon2",
            "findsame_icon3",
            "findsame_icon4",
            "findsame_icon5",
            "findsame_icon6",
            "findsame_icon7",
            "findsame_icon8",
            "findsame_icon9",
            "findsame_icon10",
            "findsame_icon11",
            "findsame_icon12",
            "findsame_icon13",
            "findsame_icon14",
            "findsame_icon15",
            "activity_fnt",
            "itemicon1",
            "guide_hand",
            "luckydrawiconbg-1"
        ];
        var codeList = null;
        if (this.code == "1") {
            codeList = [];
        }
        return _super.prototype.getResourceList.call(this).concat(baseList).concat(codeList).concat(codeRes);
    };
    return AcFindSameGameView;
}(AcCommonView));
//# sourceMappingURL=AcFindSameGameView.js.map