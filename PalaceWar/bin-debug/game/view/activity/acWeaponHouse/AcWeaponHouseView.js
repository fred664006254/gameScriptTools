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
* 神兵宝库
* date 2020.6.10
* author yangtao
* @name AcWeaponHouseView
*/
var AcWeaponHouseView = /** @class */ (function (_super) {
    __extends(AcWeaponHouseView, _super);
    function AcWeaponHouseView() {
        var _this = _super.call(this) || this;
        _this._timeBg = null;
        _this._timeTxt = null;
        _this._scrollView = null;
        _this._proContainer = null;
        _this._toolNum = null;
        _this._freeDesc = null;
        _this._onceNeedContainer = null;
        _this._boxList = [];
        _this._lightList = [];
        _this._isPlayTen = false;
        _this._isPlay = false;
        _this._isMove = false;
        _this._processContainer = null;
        _this._processNum = null;
        _this._progressBar = null;
        _this._proLight = null;
        _this._rewardData = null;
        _this._detailBtn = null;
        _this._rechargeTip = null;
        _this.spendexplain = null;
        _this.spendNum = null;
        _this._boxGroup = null;
        _this.items = [[], [], [], []];
        _this.powerTitle = null;
        _this.buyPowerTitle = null;
        _this.checkBox = null;
        _this.moveType = 1;
        _this.lvArr = [];
        _this.map = [];
        _this.running = 0;
        _this.record = 0;
        _this.bestRecord = 0;
        _this._nowscore = null;
        _this._clickHand = null;
        _this.buyBtn = null;
        _this.showHand = null;
        _this.timeDescText = null;
        _this.timeDescBg = null;
        _this._isFrist = false;
        _this._isFirstMove = false;
        _this._addNum = 0; //用于计数引导步数
        _this._time = 50000;
        /** 玩家无操作提示玩家的定时任务的句柄 */
        _this.tipHandler = false;
        _this._moveFlag = false;
        _this._netFlag = false;
        _this._moveCount = 0;
        _this._netCount = 0;
        _this._isShowHand = false;
        return _this;
    }
    AcWeaponHouseView.prototype.getBgName = function () {
        return App.CommonUtil.getResByCode("linkgame_bg_enter", this.getUiCode());
    };
    AcWeaponHouseView.prototype.getTitleStr = function () {
        return null;
    };
    AcWeaponHouseView.prototype.getTitleBgName = function () {
        return App.CommonUtil.getResByCode("ac_weaponhouse_title", this.getUiCode());
    };
    AcWeaponHouseView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcWeaponHouseView.prototype.getRuleInfo = function () {
        return '1';
    };
    AcWeaponHouseView.prototype.getExtraRuleInfo = function () {
        return LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouseRuleInfo", this.getUiCode()), [String(this.cfg.costTime), String(this.cfg.baseScore)]);
    };
    AcWeaponHouseView.prototype.getRuleInfoParam = function () {
        return [""];
    };
    AcWeaponHouseView.prototype.getProbablyInfo = function () {
        return App.CommonUtil.getCnByCode("acWeaponHouseProbablyInfo", this.getUiCode());
    };
    AcWeaponHouseView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    AcWeaponHouseView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat("acliangbiographyview_common_acbg", "palace_bg4", "searchnpc_full92", "public_9_bg11", "acweaponhousecode1", "acweaponhousecode" + this.getUiCode()).concat(list);
    };
    AcWeaponHouseView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcWeaponHouseView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseView.prototype, "progressOffX", {
        //进度 间距
        get: function () {
            return 80;
        },
        enumerable: true,
        configurable: true
    });
    //物品数量
    AcWeaponHouseView.prototype.getLightNum = function () {
        return 9;
    };
    AcWeaponHouseView.prototype.initView = function () {
        var _this = this;
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WEAPONHOUSE_MOVE, this.lotteryCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WEAPONHOUSE_BUYNUM, this.reGameCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WEAPONHOUSE_RESETMAP, this.reCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_END2, this.doGuide, this);
        var infoBg = BaseBitmap.create("acliangbiographyview_common_acbg");
        infoBg.width = GameConfig.stageWidth;
        infoBg.setPosition(this.titleBg.x + this.titleBg.width / 2 - infoBg.width / 2, this.titleBg.y + this.titleBg.height);
        this.addChildToContainer(infoBg);
        this._isFirstMove = true;
        //活动时间   
        var dateText = ComponentManager.getTextField(LanguageManager.getlocal("acComm_time", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        dateText.x = infoBg.x + 30;
        dateText.y = infoBg.y + 10;
        this.addChildToContainer(dateText);
        //活动文本
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouseDescInfo", this.getUiCode())), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        descTxt.width = 580;
        descTxt.lineSpacing = 4;
        descTxt.x = infoBg.x + 30;
        descTxt.y = infoBg.y + infoBg.height + 10 + dateText.height;
        this.addChildToContainer(descTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, infoBg, view.container, [0, -3], true);
        if (PlatformManager.checkIsThSp()) {
            infoBg.height = descTxt.y + descTxt.height + 20 - infoBg.y;
        }
        else {
            infoBg.height = descTxt.height + 5 + 50 + descTxt.height + dateText.height + dateText.height;
        }
        //倒计时
        this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = infoBg.y + infoBg.height - 17 - this._timeBg.height / 2;
        this._timeBg.width = this._timeTxt.width + 40 + 28;
        this.addChildToContainer(this._timeBg);
        this.addChildToContainer(this._timeTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, this._timeBg, infoBg, [40, -10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._timeTxt, this._timeBg);
        //底部按钮背景
        var btnBg = BaseBitmap.create(App.CommonUtil.getResByCode("ac_weaponhouse_btn_bg", this.getUiCode()));
        btnBg.setPosition(this.titleBg.x + this.titleBg.width / 2 - btnBg.width / 2, view.height - btnBg.height);
        this.addChildToContainer(btnBg);
        //棋盘背景  
        this._boxGroup = new BaseDisplayObjectContainer();
        var checker = BaseBitmap.create(App.CommonUtil.getResByCode("ac_weaponhouse_checker_bg", this.getUiCode()));
        this._boxGroup.width = checker.width;
        this._boxGroup.height = checker.height;
        this._boxGroup.setPosition(this.titleBg.x + this.titleBg.width / 2 - this._boxGroup.width / 2, infoBg.y + infoBg.height + 10);
        this.addChildToContainer(this._boxGroup);
        //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._boxGroup, view, [0,infoBg.y + infoBg.height - 7]);
        this._boxGroup.addChild(checker);
        this._boxGroup.touchEnabled = true;
        this._boxGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onclick, this);
        //个人积分
        this._nowscore = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_myScore_title", this.getUiCode()), [this.vo.getScoreNum() + ""]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(this._nowscore);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._nowscore, this._boxGroup, [0, 21]);
        //重置按钮
        var resetBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("ac_weaponhouse_re_btn", this.getUiCode()), "", function () {
            if (!_this.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (_this.vo.checkIsInEndShowTime()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (_this.vo.step < 5) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_stepOpenRe", _this.getUiCode())));
            }
            else {
                var str = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_reTurnPlay_title", _this.getUiCode()));
                view.rePlayBtnClick(str);
            }
        }, view);
        resetBtn.setPosition(this._boxGroup.x - resetBtn.width + 20, this._boxGroup.y);
        this.addChildToContainer(resetBtn);
        //奖励按钮
        this._detailBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("ac_weaponhouse_award_btn", this.getUiCode()), "", function () {
            if (_this.vo.isInAct()) {
                NetManager.request(NetRequestConst.REQUEST_WEAPONHOUSE_GETSCHEDULEALLLIST, { activeId: _this.vo.aidAndCode });
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONHOUSEPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, view);
        this.addChildToContainer(this._detailBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this._detailBtn, btnBg, [5, -93]);
        //排行榜按钮
        var rankBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("ac_weaponhouse_rank_btn", this.getUiCode()), "", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONHOUSERANKPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, view);
        this.addChildToContainer(rankBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, rankBtn, btnBg, [5, -93]);
        //倒计时
        this.timeDescText = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rePhyTime", this.getUiCode()), [this.vo.getDuTime(), "1"]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this.timeDescText.lineSpacing = 5;
        this.timeDescText.width = 230;
        this.timeDescText.textAlign = egret.HorizontalAlign.CENTER;
        this.timeDescBg = BaseBitmap.create("public_9_bg11");
        this.timeDescBg.width = 260;
        this.timeDescBg.height = 42;
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsRuLang()) {
            this.timeDescBg.height = 50;
        }
        this.addChildToContainer(this.timeDescBg);
        this.addChildToContainer(this.timeDescText);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this.timeDescBg, btnBg, [100, -38]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this.timeDescText, this.timeDescBg);
        this.powerTitle = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_phy_title", this.getUiCode()), [this.vo.rePhy() + ""]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(this.powerTitle);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this.powerTitle, btnBg, [130, 28]);
        this.buyPowerTitle = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_buy_title", this.getUiCode()), [this.vo.v + ""]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(this.buyPowerTitle);
        this.buyPowerTitle.setPosition(btnBg.width / 2 + 60, this.powerTitle.y);
        this.checkBox = ComponentManager.getCheckBox("");
        this.addChildToContainer(this.checkBox);
        this.checkBox.addTouchTap(this.onCheckClick, this);
        var tenTitle = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_phyGetTen_title", this.getUiCode())), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(tenTitle);
        this.buyBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("ac_weaponhouse_btn", this.getUiCode()), "", function () {
            var siTen = 0;
            var gemnum = 0;
            if (!_this.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (_this.vo.checkIsInEndShowTime()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (_this.checkBox.checkSelected()) {
                _this.phytext = 100;
                siTen = 1;
                gemnum = _this.vo.showGoldNumTen();
            }
            else {
                _this.phytext = 10;
                siTen = 0;
                gemnum = _this.vo.shouGoldNum();
            }
            if (Api.playerVoApi.getPlayerGem() < gemnum) {
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_Notenoughdes_title", _this.getUiCode())),
                    touchMaskClose: false,
                    title: "itemUseConstPopupViewTitle",
                    callback: function () {
                        //前往充值
                        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                    },
                    handle: _this,
                    needClose: 1,
                    needCancel: true,
                    confirmTxt: "confirmBtn"
                });
            }
            else {
                NetManager.request(NetRequestConst.REQUEST_WEAPONHOUSE_BUYNUM, { activeId: _this.vo.aidAndCode, isTenPlay: siTen });
            }
        }, view);
        this.addChildToContainer(this.buyBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.buyBtn, btnBg, [0, 10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, this.checkBox, this.buyBtn, [-(this.checkBox.width + 10), -10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, tenTitle, this.buyBtn, [-(tenTitle.width + 10), 30]);
        var shoeBg = BaseLoadBitmap.create("itemicon1");
        shoeBg.scaleX = 0.5;
        shoeBg.scaleY = 0.5;
        this.addChildToContainer(shoeBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, shoeBg, this.buyBtn, [-40, 5]);
        this.spendNum = ComponentManager.getTextField("200", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(this.spendNum);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this.spendNum, this.buyBtn, [30, 25]);
        this.spendexplain = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_pay_title", this.getUiCode()), ["10"]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(this.spendexplain);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.spendexplain, this.buyBtn, [0, 20]);
        this.reMapDataGrids();
        this.refreshView();
        this.showStartDialog();
        this.speedNum(1);
        this.showHand = BaseBitmap.create("guide_hand");
        this._boxGroup.addChild(this.showHand);
        this.showHand.visible = false;
        if (this._isFrist) {
            this.isShowTipHand();
        }
    };
    AcWeaponHouseView.prototype.doGuide = function () {
        this.isShowTipHand();
    };
    /**新游戏 */
    AcWeaponHouseView.prototype.resetGrids = function () {
        /**清空 */
        for (var i = 0; i < this.items.length; i++) {
            for (var j = 0; j < this.items[i].length; j++) {
                if (this.items[i][j].item) {
                    this.items[i][j].item.resetItem(String(1));
                    ;
                    this.items[i][j].value = 0;
                    this.removeFromParent(this.items[i][j].item);
                }
            }
        }
        /**新建 */
        for (var i = 0; i < this.items.length; i++) {
            for (var j = 0; j < 4; j++) {
                if (!this.items[i])
                    this.items[i] = [];
                var data = new GridItemData();
                data.value = 0;
                data.i = 0;
                data.j = 0;
                this.items[i][j] = data;
                this.items[i][j].i = i;
                this.items[i][j].j = j;
            }
        }
    };
    /**滑动事件 */
    AcWeaponHouseView.prototype.onclick = function (e) {
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            this._startPoint = new egret.Point(e.stageX, e.stageY);
            this._boxGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onclick, this);
        }
        else if (e.type == egret.TouchEvent.TOUCH_MOVE) {
            this._endPoint = new egret.Point(e.stageX, e.stageY);
            var disX = this._endPoint.x - this._startPoint.x;
            var disY = this._endPoint.y - this._startPoint.y;
            //方向区分不太明确，忽略操作
            if (Math.abs(disX - disY) <= 40 || this._netFlag) {
                return;
            }
            // 0:上, 1:右, 2:下, 3:左
            var direction = Math.abs(disX) > Math.abs(disY) ? (disX > 0 ? 1 : 3) : (disY > 0 ? 2 : 0);
            this.isMove(direction);
            this._boxGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onclick, this);
        }
    };
    // 根据滑动方向生成list的四个数组（方便计算）
    AcWeaponHouseView.prototype.formList = function (dir) {
        var list = [[], [], [], []];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                switch (dir) {
                    case 0:
                        list[i].push(this.items[j][i]);
                        break;
                    case 1:
                        list[i].push(this.items[i][3 - j]);
                        break;
                    case 2:
                        list[i].push(this.items[3 - j][i]);
                        break;
                    case 3:
                        list[i].push(this.items[i][j]);
                        break;
                }
            }
        }
        return list;
    };
    /**
    * 随机创建数字
    * @param size 数量
    */
    AcWeaponHouseView.prototype.addNewGrids = function (size, isFirst) {
        if (isFirst === void 0) { isFirst = false; }
        if (!this.isOver()) {
            if (!isFirst && !this._moveFlag) {
                return;
            }
            for (var i = 0; i < size; i++) {
                var cells = this.selectCell();
                if (!cells) {
                    return;
                }
                /**为2的概率 */
                var num = Math.random() < this.cfg.refreshRatio[0] ? 1 : 2;
                var grid = new AcWeaponHouseItem({ aid: num, code: this.code });
                grid.resetItem(String(num));
                grid.x = cells.disX;
                grid.y = cells.disY;
                this._boxGroup.addChild(grid);
                this.items[cells.i][cells.j].item = grid;
                this.items[cells.i][cells.j].value = num;
            }
            if (this._moveFlag) {
                this.getMapData();
                if (this._isMove) {
                    var sendArr = this.lvArr[this._netCount] ? this.lvArr[this._netCount] : [];
                    this._netCount++;
                    NetManager.request(NetRequestConst.REQUEST_WEAPONHOUSE_MOVE, { activeId: this.vo.aidAndCode, map: this.map, lvArr: sendArr });
                    this.regTipCell(true);
                }
                this._isMove = false;
                this._moveFlag = false;
            }
        }
    };
    //测试
    AcWeaponHouseView.prototype.addNewGrids11 = function (size) {
        if (!this.isOver()) {
            for (var i = 0; i < size; i++) {
                var cells = this.selectCell();
                if (!cells)
                    return;
                /**为2的概率 */
                var num = 11;
                var grid = new AcWeaponHouseItem({ aid: num, code: this.code });
                grid.resetItem(String(num));
                grid.x = cells.disX;
                grid.y = cells.disY;
                this._boxGroup.addChild(grid);
                this.items[cells.i][cells.j].item = grid;
                this.items[cells.i][cells.j].value = num;
            }
        }
    };
    /**随机获取一个格子数据 */
    AcWeaponHouseView.prototype.selectCell = function () {
        var cells = this.usefulCell();
        /**随机获取 */
        if (cells.length) {
            return cells[Math.floor(Math.random() * cells.length)];
        }
    };
    AcWeaponHouseView.prototype.isMove = function (type) {
        if (this.showHand) {
            this.showHand.visible = false;
            egret.Tween.removeTweens(this.showHand);
        }
        this._isMove = false;
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this.vo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this.vo.isFree()) {
            this._moveFlag = true;
            this.doMove(type);
        }
        else {
            this.addGamePhy();
        }
    };
    AcWeaponHouseView.prototype.doMove = function (type) {
        var _this = this;
        if (this.isOver())
            return;
        if (!this.lvArr) {
            this.lvArr = [];
        }
        this.lvArr[this._moveCount] = [];
        this._moveCount++;
        var arr = this.formList(type);
        var nextI;
        for (var i = 0; i < arr.length; i++) {
            var _loop_1 = function (j) {
                nextI = -1;
                for (var m = j + 1; m < arr[i].length; m++) {
                    if (arr[i][m].value != 0) {
                        nextI = m;
                        break;
                    }
                }
                if (nextI !== -1) {
                    var curData = arr[i][j];
                    var nextData = arr[i][nextI];
                    var time = Math.abs(j - nextI) * 60;
                    if (curData.value == 0) {
                        this_1.running += 1;
                        var value = nextData.value;
                        curData.value = value;
                        curData.item = nextData.item;
                        nextData.item = null;
                        nextData.value = 0;
                        j--;
                        this_1._isMove = true;
                        egret.Tween.get(curData.item).to({ x: curData.disX, y: curData.disY }, time).call(function () {
                            _this.running -= 1;
                            if (_this.running <= 0) {
                                _this.addNewGrids(1);
                            }
                        }, this_1);
                    }
                    else if (curData.value == nextData.value) {
                        if ((curData.value == 11) && (nextData.value == 11)) {
                            return out_j_1 = j, "continue";
                        }
                        this_1.running += 1;
                        if (this_1._boxGroup.getChildIndex(nextData.item) < this_1._boxGroup.getChildIndex(curData.item)) {
                            this_1._boxGroup.swapChildren(nextData.item, curData.item);
                        }
                        var nextItem_1 = nextData.item;
                        var curItem = curData.item;
                        var icon = nextItem_1._icon0;
                        var value_1 = nextData.value + 1;
                        nextData.value = 0;
                        nextData.item = null;
                        curData.value = value_1;
                        this_1.lvArr[this_1._netCount].push(value_1);
                        this_1._isMove = true;
                        egret.Tween.get(nextItem_1).to({ x: curData.disX, y: curData.disY }, time).to({ scaleX: 1.2, scaleY: 1.2 }, 100).to({ scaleX: 0.8, scaleY: 0.8 }, 100).to({ scaleX: 1, scaleY: 1 }, 100).call(function (curItem, itemData) {
                            _this.running -= 1;
                            curItem.resetItem(String(value_1)); //.setData(Util.numStyle[value]);
                            _this.removeFromParent(nextItem_1);
                            /**小弹幕 */
                            if (value_1 >= 11) {
                                // let str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acWeaponHouse_SucceedPlay_title`, this.getUiCode()),[value+""]);
                                // ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                                //     msg : str,
                                //     title : "itemUseConstPopupViewTitle",
                                //     touchMaskClose : true,
                                //     callback : ()=>
                                //     {
                                //         this.reGame();
                                //     },
                                //     cancelcallback:()=>
                                //     {
                                //         this.reGame();
                                //     },
                                //     closecallback:()=>
                                //     {
                                //         this.reGame();
                                //     },                
                                //     handler : this,
                                //     needClose : 1,
                                //     needCancel : true
                                // });
                            }
                            if (_this.running <= 0) {
                                _this.addNewGrids(1);
                            }
                        }, this_1, [curItem, nextItem_1]);
                    }
                }
                out_j_1 = j;
            };
            var this_1 = this, out_j_1;
            for (var j = 0; j < arr[i].length; j++) {
                _loop_1(j);
                j = out_j_1;
            }
        }
        if (!this._isMove) {
            this._moveCount--;
        }
    };
    /**游戏是否结束 */
    AcWeaponHouseView.prototype.isOver = function () {
        if (this.usefulCell().length > 0) {
            return false;
        }
        else {
            for (var i = 0; i < this.items.length; i++) // 左右不等
                for (var j = 1; j < this.items[i].length; j++) {
                    if (this.items[i][j].value == this.items[i][j - 1].value && this.items[i][j].value != 11)
                        return false;
                }
            for (var j = 0; j < this.items.length; j++) // 上下不等
                for (var i = 1; i < this.items[j].length; i++) {
                    if (this.items[i][j].value == this.items[i - 1][j].value && this.items[i][j].value != 11)
                        return false;
                }
        }
        /**结束弹窗动画 */
        var str = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rePlay_title", this.getUiCode()));
        this.rePlayBtnClick(str);
        return true;
    };
    /**记录空的格子数据 */
    AcWeaponHouseView.prototype.usefulCell = function () {
        var cells = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.items[i][j] && this.items[i][j].value == 0) {
                    this.items[i][j].j = j;
                    this.items[i][j].i = i;
                    cells.push(this.items[i][j]);
                }
            }
        }
        return cells;
    };
    /**移除组件 */
    AcWeaponHouseView.prototype.removeFromParent = function (child) {
        if (!child || child.parent == null)
            return;
        child.parent.removeChild(child);
    };
    //重置
    AcWeaponHouseView.prototype.rePlayBtnClick = function (str) {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            msg: str,
            touchMaskClose: false,
            title: "itemUseConstPopupViewTitle",
            callback: function () {
                view.reGame();
            },
            handle: this,
            needClose: 1,
            needCancel: true,
            confirmTxt: "confirmBtn"
        });
    };
    AcWeaponHouseView.prototype.reGame = function () {
        this.resetGrids();
        /**重置添加1个随机格子 */
        this.addNewGrids(1, true);
        this.getMapData();
        NetManager.request(NetRequestConst.REQUEST_WEAPONHOUSE_RESETMAP, { activeId: this.vo.aidAndCode, map: this.map });
    };
    AcWeaponHouseView.prototype.reCallback = function () {
        this.regTipCell();
    };
    AcWeaponHouseView.prototype.lotteryCallback = function (evt) {
        this._netFlag = false;
        if (evt.data.ret) {
            var rData = evt.data.data.data;
            var rewards = rData.rewards;
            this._nowscore.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_myScore_title", this.getUiCode()), [this.vo.getScoreNum() + ""]);
            var rewardVoList_1 = GameData.formatRewardItem(rewards);
            var score = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_addScose_title", this.getUiCode()), [rData.score]);
            var item = { icon: "", tipMessage: score, type: 0 };
            var itemList = [];
            itemList.push(item);
            var potion_1 = egret.Point.create(this._boxGroup.x + this._boxGroup.width / 2, this._boxGroup.y);
            App.CommonUtil.playRewardFlyAction(itemList, potion_1);
            egret.setTimeout(function () {
                App.CommonUtil.playRewardFlyAction(rewardVoList_1, potion_1);
            }, this, 300);
            return;
        }
    };
    AcWeaponHouseView.prototype.reGameCallback = function (evt) {
        if (evt.data.ret) {
            if (this._clickHand) {
                this._clickHand.visible = false;
            }
            var phytext = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_addPhy_title", this.getUiCode()), [this.phytext + ""]);
            var item = { icon: "", tipMessage: phytext, type: 0 };
            var itemList = [];
            itemList.push(item);
            var potion = egret.Point.create(this.buyBtn.x + this.buyBtn.width / 2, this.buyBtn.y);
            App.CommonUtil.playRewardFlyAction(itemList, potion);
            if (this.checkBox.checkSelected()) {
                this.speedNum(10);
            }
            else {
                this.speedNum(1);
            }
            return;
        }
    };
    AcWeaponHouseView.prototype.addGamePhy = function () {
        var _this = this;
        var message = LanguageManager.getlocal("findsame_notstart");
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            msg: message,
            title: "itemUseConstPopupViewTitle",
            touchMaskClose: true,
            callback: function () {
                if (!_this._clickHand) {
                    _this._clickHand = BaseBitmap.create("guide_hand");
                    _this._clickHand.rotation = -30;
                    _this.buyBtn.parent.addChild(_this._clickHand);
                    _this._clickHand.setPosition(_this.buyBtn.x + _this.buyBtn.width / 2 - 10, _this.buyBtn.y + _this.buyBtn.height / 2 - 5);
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
    };
    AcWeaponHouseView.prototype.reMapDataGrids = function () {
        //重置数据
        this.resetGrids();
        var mapdata = this.vo.getMapData();
        if (mapdata.length > 0) {
            for (var i = 0; i < mapdata.length; i++) {
                for (var j = 0; j < mapdata[i].length; j++) {
                    if (mapdata[i][j] > 0) {
                        var cells = this.items[i][j];
                        var grid = new AcWeaponHouseItem({ aid: mapdata[i][j], code: this.code });
                        grid.resetItem(String(mapdata[i][j]));
                        grid.x = cells.disX;
                        grid.y = cells.disY;
                        this._boxGroup.addChild(grid);
                        this.items[i][j].item = grid;
                        this.items[i][j].value = mapdata[i][j];
                        this.items[i][j].i = i;
                        this.items[i][j].j = j;
                    }
                }
            }
        }
        else {
            for (var i = 0; i < this.items.length; i++) {
                for (var j = 0; j < this.items[i].length; j++) {
                    if ((i == 2 && j == 1) || (i == 2 && j == 2)) {
                        var cells = this.items[i][j];
                        var grid = new AcWeaponHouseItem({ aid: 1, code: this.code });
                        grid.resetItem(String(1));
                        grid.x = cells.disX;
                        grid.y = cells.disY;
                        this._boxGroup.addChild(grid);
                        this.items[i][j].item = grid;
                        this.items[i][j].value = 1;
                        this.items[i][j].i = i;
                        this.items[i][j].j = j;
                    }
                }
            }
        }
    };
    AcWeaponHouseView.prototype.getMapData = function () {
        var mapData = [];
        for (var i = 0; i < this.items.length; i++) {
            var mapData1 = [];
            for (var j = 0; j < this.items[i].length; j++) {
                mapData1.push(this.items[i][j].value);
            }
            mapData.push(mapData1);
        }
        this.map = mapData;
        ;
    };
    AcWeaponHouseView.prototype.showTipMove = function (dirStart, dirEnd) {
        if (!this.vo.isInActivity()) {
            if (this._isFirstMove) {
                this._isFirstMove = false;
                return;
            }
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this.vo.checkIsInEndShowTime()) {
            if (this._isFirstMove) {
                this._isFirstMove = false;
                return;
            }
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var num = this._boxGroup.numChildren;
        this._boxGroup.setChildIndex(this.showHand, num - 1);
        this.showHand.visible = true;
        this.showHand.alpha = 0;
        this.showHand.setPosition(dirStart.x, dirStart.y);
        egret.Tween.get(this.showHand, { loop: true })
            .to({ alpha: 1 }, 300)
            .to({ x: dirStart.x, y: dirStart.y }, 800)
            .to({ x: dirEnd.x, y: dirEnd.y }, 800)
            .to({ alpha: 0 }, 300);
    };
    AcWeaponHouseView.prototype.isShowTipHand = function () {
        if (this.vo.step < 5) {
            var dir = this.showTipHand();
            var pointStart = new egret.Point();
            var pointEnd = new egret.Point();
            switch (dir) {
                case 0:
                    pointStart.x = this._boxGroup.x + this._boxGroup.width / 4 + 150;
                    pointStart.y = this._boxGroup.y + this._boxGroup.height / 4;
                    pointEnd.x = this._boxGroup.x + this._boxGroup.width / 4 - 150;
                    pointEnd.y = this._boxGroup.y + this._boxGroup.height / 4;
                    break;
                case 1:
                    pointStart.x = this._boxGroup.x + this._boxGroup.width / 4 - 150;
                    pointStart.y = this._boxGroup.y + this._boxGroup.height / 4;
                    pointEnd.x = this._boxGroup.x + this._boxGroup.width / 4 + 150;
                    pointEnd.y = this._boxGroup.y + this._boxGroup.height / 4;
                    break;
                case 2:
                    pointStart.x = this._boxGroup.x + this._boxGroup.width / 4;
                    pointStart.y = this._boxGroup.y + this._boxGroup.height / 4 - 150;
                    pointEnd.x = this._boxGroup.x + this._boxGroup.width / 4;
                    pointEnd.y = this._boxGroup.y + this._boxGroup.height / 4 + 150;
                    break;
                case 3:
                    pointStart.x = this._boxGroup.x + this._boxGroup.width / 4;
                    pointStart.y = this._boxGroup.y + this._boxGroup.height / 4 + 150;
                    pointEnd.x = this._boxGroup.x + this._boxGroup.width / 4;
                    pointEnd.y = this._boxGroup.y + this._boxGroup.height / 4 - 150;
                    break;
            }
            this.showTipMove(pointStart, pointEnd);
        }
    };
    //智能提示方向 0左1右2上3下
    AcWeaponHouseView.prototype.showTipHand = function () {
        var dirNum = 0;
        for (var i = 0; i < this.items.length; i++) {
            for (var j = 0; j < this.items[i].length; j++) {
                if (i <= 1 && j <= 1) {
                    if (this.items[i][j].value > 0) {
                        dirNum = 0;
                        return dirNum;
                    }
                }
                else if (i > 1 && j <= 1) {
                    if (this.items[i][j].value > 0) {
                        dirNum = 1;
                        return dirNum;
                    }
                }
                else if (i <= 1 && j > 1) {
                    if (this.items[i][j].value > 0) {
                        dirNum = 2;
                        return dirNum;
                    }
                }
                else {
                    if (this.items[i][j].value > 0) {
                        dirNum = 3;
                        return dirNum;
                    }
                }
            }
        }
        return dirNum;
    };
    AcWeaponHouseView.prototype.onCheckClick = function () {
        if (this.checkBox.checkSelected()) {
            this.speedNum(10);
            this.spendexplain.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_pay_title", this.getUiCode()), ["100"]);
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_openCheck", this.getUiCode())));
        }
        else {
            this.speedNum(1);
            this.spendexplain.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_pay_title", this.getUiCode()), ["10"]);
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_closeCheck", this.getUiCode())));
        }
    };
    AcWeaponHouseView.prototype.speedNum = function (v) {
        if (v == 10) {
            this.spendNum.text = this.vo.showGoldNumTen() + "";
        }
        else {
            this.spendNum.text = this.vo.shouGoldNum() + "";
        }
    };
    AcWeaponHouseView.prototype.refreshView = function () {
        this.powerTitle.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_phy_title", this.getUiCode()), [this.vo.rePhy() + ""]);
        this.buyPowerTitle.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_buy_title", this.getUiCode()), [this.vo.v + ""]);
        // this.timeDescText.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rePhyTime", this.getUiCode()), [this.vo.getDuTime(),"1"]);
        if (this.checkBox.checkSelected()) {
            this.speedNum(10);
        }
        else {
            this.speedNum(1);
        }
        if (this.vo.getRedPoint()) {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
        if (this.vo.rePhy() >= this.cfg.baseTime || this.vo.checkIsInEndShowTime()) {
            this.timeDescText.visible = false;
            this.timeDescBg.visible = false;
        }
        else {
            this.timeDescText.visible = true;
            this.timeDescBg.visible = true;
        }
    };
    /** 提示框 */
    AcWeaponHouseView.prototype.regTipCell = function (v) {
        var _this = this;
        if (v === void 0) { v = false; }
        if (this.vo.step >= 5) {
            return;
        }
        this._isShowHand = false;
        if (this.tipHandler) {
            clearInterval(this.tipHandler);
        }
        this.tipHandler = setInterval(function () {
            _this._isShowHand = true;
            _this.isShowTipHand();
        }, 5 * 1000);
    };
    AcWeaponHouseView.prototype.refreshUI = function () {
        //this.refreshProContainer();
    };
    AcWeaponHouseView.prototype.tick = function () {
        this._timeTxt.text = LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]);
        this.timeDescText.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rePhyTime", this.getUiCode()), [this.vo.getDuTime(), "1"]);
        this.powerTitle.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_phy_title", this.getUiCode()), [this.vo.rePhy() + ""]);
        // if(this.vo.refresh.num>=this.cfg.baseTime)
        if (this.vo.rePhy() >= this.cfg.baseTime || this.vo.checkIsInEndShowTime()) {
            this.timeDescText.visible = false;
            this.timeDescBg.visible = false;
        }
        else {
            this.timeDescText.visible = true;
            this.timeDescBg.visible = true;
        }
    };
    AcWeaponHouseView.prototype.showRechargeTip = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            msg: LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeRechargeTip", this.getUiCode())),
            touchMaskClose: true,
            title: "itemUseConstPopupViewTitle",
            callback: function () {
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            },
            handle: this,
            needClose: 1,
            needCancel: true,
            confirmTxt: "taskGoBtn"
        });
    };
    //mask
    AcWeaponHouseView.prototype.showViewMask = function () {
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "viewMaskTouchPos";
        touchPos.touchEnabled = true;
    };
    AcWeaponHouseView.prototype.hideViewMask = function () {
        var touchPos = this.getChildByName("viewMaskTouchPos");
        if (touchPos) {
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    };
    AcWeaponHouseView.prototype.showStartDialog = function () {
        var localkey = this.vo.aidAndCode + Api.playerVoApi.getPlayerID() + "dialog";
        var lastTime = 0;
        var timeStr = LocalStorageManager.get(localkey);
        if (timeStr && timeStr != "") {
            lastTime = Number(timeStr);
        }
        if (lastTime == this.vo.et) {
            this._isFrist = true;
            return;
        }
        LocalStorageManager.set(localkey, String(this.vo.et));
        var view = this;
        var keyStr = "startDialog_" + this.getUiCode();
        var startCfg = view.cfg[keyStr];
        var bgName = "palace_bg4";
        ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW, {
            aid: view.aid,
            code: "" + view.getUiCode(),
            AVGDialog: startCfg,
            visitId: "1",
            talkKey: "acWeaponHouseStartTalk_",
            bgName: bgName,
            callBack: this.chessShowView
        });
    };
    AcWeaponHouseView.prototype.chessShowView = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, { idx: "acWeaponHouse_1", f: null, o: view });
    };
    AcWeaponHouseView.prototype.dispose = function () {
        this.hideViewMask();
        this._moveCount = 0;
        this._netCount = 0;
        this.lvArr = null;
        this._timeBg = null;
        this._timeTxt = null;
        this._scrollView = null;
        this._proContainer = null;
        this._toolNum = null;
        this._freeDesc = null;
        this._onceNeedContainer = null;
        this._boxList = [];
        this._lightList = [];
        this._isPlayTen = false;
        this._isPlay = false;
        this._isMove = false;
        this._processContainer = null;
        this._processNum = null;
        this._progressBar = null;
        this._proLight = null;
        this._rewardData = null;
        this._detailBtn = null;
        this._rechargeTip = null;
        this._addNum = 0;
        this.timeDescText = null;
        this.timeDescBg = null;
        this._moveFlag = false;
        this._isShowHand = false;
        this.items = [[], [], [], []];
        if (this._clickHand) {
            egret.Tween.removeTweens(this._clickHand);
            this._clickHand = null;
        }
        if (this.showHand) {
            egret.Tween.removeTweens(this.showHand);
            this.showHand = null;
        }
        if (this.tipHandler) {
            clearInterval(this.tipHandler);
        }
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WEAPONHOUSE_MOVE, this.lotteryCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WEAPONHOUSE_BUYNUM, this.reGameCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WEAPONHOUSE_RESETMAP, this.reCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_END2, this.doGuide, this);
        _super.prototype.dispose.call(this);
    };
    return AcWeaponHouseView;
}(AcCommonView));
//# sourceMappingURL=AcWeaponHouseView.js.map