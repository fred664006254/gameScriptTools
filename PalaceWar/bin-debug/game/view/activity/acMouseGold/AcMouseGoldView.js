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
* 鼠来招财
* date 2020.6.29
* author wxz
* @name AcMouseGoldView
*/
var AcMouseGoldView = /** @class */ (function (_super) {
    __extends(AcMouseGoldView, _super);
    function AcMouseGoldView() {
        var _this = _super.call(this) || this;
        _this._timeBg = null;
        _this._timeTxt = null;
        _this._scrollView = null;
        _this._proContainer = null;
        _this._freeDesc = null;
        _this._timesTxt = null;
        _this._bgNameTxt = null;
        _this._boxList = [];
        _this._lightList = [];
        _this._isPlay = false;
        _this._isMove = false;
        _this._processContainer = null;
        _this._processNum = null;
        _this._progressBar = null;
        _this._proLight = null;
        _this._rewardData = null;
        _this._detailBtn = null;
        _this._rechargeTip = null;
        _this._cellConArr = null;
        _this._smallTxtArr = null;
        _this._tipsTxt = null;
        _this._allBtn = null;
        _this._tempMap = null;
        _this._bgResNameArr = ["discussviewbg", "homescene_17001273", "atkracecross_bg2", "acskysound_bg-1",
            "acdrinktea_bg-1", "chooserole_bg", "homescene_17009017"];
        return _this;
    }
    AcMouseGoldView.prototype.getBgName = function () {
        return this._bgResNameArr[this.vo.layer % this._bgResNameArr.length];
    };
    AcMouseGoldView.prototype.getTitleStr = function () {
        return null;
    };
    AcMouseGoldView.prototype.getTitleBgName = function () {
        return App.CommonUtil.getResByCode("acmousegold_title", this.getUiCode());
    };
    AcMouseGoldView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcMouseGoldView.prototype.getRuleInfo = function () {
        return App.CommonUtil.getCnByCode("acMouseGoldRuleInfo", this.getUiCode());
    };
    AcMouseGoldView.prototype.getRuleInfoParam = function () {
        return ["" + this.cfg.needGem];
    };
    AcMouseGoldView.prototype.getProbablyInfo = function () {
        return App.CommonUtil.getCnByCode("acMouseGoldProbablyInfo", this.getUiCode());
    };
    AcMouseGoldView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    AcMouseGoldView.prototype.getReportTipData = function () {
        return { title: { key: App.CommonUtil.getCnByCode("acMouseGoldReportTitle", this.getUiCode()) }, msg: { key: App.CommonUtil.getCnByCode("acMouseGoldReportMsg", this.getUiCode()) } };
    };
    AcMouseGoldView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat("acmousegoldcode1", "acmousegoldcode" + this.getUiCode(), "acwealthcarpview_servantskintxt", this._bgResNameArr[this.vo.layer % this._bgResNameArr.length]).concat(list);
    };
    AcMouseGoldView.prototype.getUiCode = function () {
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
    Object.defineProperty(AcMouseGoldView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseGoldView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseGoldView.prototype, "progressOffX", {
        //进度 间距
        get: function () {
            return 90;
        },
        enumerable: true,
        configurable: true
    });
    AcMouseGoldView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_FLOP, this.flopCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_GETSPEREWARD, this.getSpRewardCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_NEXT, this.nextCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_FLOPALL, this.flopAllCallback, this);
        var bottomMask = BaseBitmap.create("acmousegold_maskbg");
        bottomMask.setPosition(GameConfig.stageWidth / 2 - bottomMask.width / 2, 120);
        this.addChildToContainer(bottomMask);
        this.container.setChildIndex(bottomMask, 1);
        var infoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousegold_infobg", this.getUiCode()));
        infoBg.setPosition(this.titleBg.x + this.titleBg.width / 2 - infoBg.width / 2, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(infoBg);
        //活动时间
        var dateText = ComponentManager.getTextField(LanguageManager.getlocal("acComm_time", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        dateText.x = infoBg.x + 30;
        dateText.y = infoBg.y + 16;
        this.addChildToContainer(dateText);
        var change = this.cfg.exchange.needItem;
        //活动文本
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldInfo", this.getUiCode()), ["" + this.cfg.needGem, change.split("_")[2]]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        descTxt.width = 580;
        descTxt.lineSpacing = 4;
        descTxt.x = dateText.x;
        descTxt.y = dateText.y + dateText.height + 5;
        this.addChildToContainer(descTxt);
        var rechargeTip = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRechargeInfo", this.getUiCode()), ["" + this.vo.getNeedRecharge()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rechargeTip.setPosition(descTxt.x, infoBg.y + infoBg.height - rechargeTip.height - 23);
        this.addChildToContainer(rechargeTip);
        this._rechargeTip = rechargeTip;
        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = infoBg.y + infoBg.height - 17 - this._timeBg.height / 2;
        this.addChildToContainer(this._timeBg);
        this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 260;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 20;
        this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
        this.addChildToContainer(this._timeTxt);
        //进度条上方
        var progressZshi = BaseBitmap.create(App.CommonUtil.getResByCode("acmousegold_progresszshi", this.getUiCode()));
        progressZshi.setPosition(infoBg.x + infoBg.width / 2 - progressZshi.width / 2, infoBg.y + infoBg.height);
        this.addChildToContainer(progressZshi);
        //进度条底
        var proBottom = BaseBitmap.create(App.CommonUtil.getResByCode("acmousegold_probottom", this.getUiCode()));
        proBottom.setPosition(0, progressZshi.y + progressZshi.height - 5);
        this.addChildToContainer(proBottom);
        //进度条
        var proContainer = new BaseDisplayObjectContainer();
        proContainer.height = 160;
        this._proContainer = proContainer;
        var scrollView = ComponentManager.getScrollView(proContainer, new egret.Rectangle(0, 0, GameConfig.stageWidth - 63, proContainer.height));
        scrollView.setPosition(63, infoBg.y + infoBg.height - 35 + 12);
        // this.addChildToContainer(scrollView);
        scrollView.bounces = false;
        this._scrollView = scrollView;
        //详情按钮
        var detailBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("acmousegold_detailbtn", this.getUiCode()), "", function () {
            if (!_this.vo.isStart) {
                App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSEGOLDREWARDPOPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        detailBtn.setPosition(10, infoBg.y + infoBg.height - 8);
        // this.addChildToContainer(detailBtn);
        this._detailBtn = detailBtn;
        //进度条相关
        this.initProContainer();
        //bottom
        var bottomBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousegold_bot", this.getUiCode()));
        bottomBg.setPosition(GameConfig.stageWidth / 2 - bottomBg.width / 2, GameConfig.stageHeigth - bottomBg.height);
        //衣装
        var skinId = this.cfg.show;
        App.LogUtil.log("skinId: " + skinId);
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var boneName = null;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        var wife = null;
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            wife.setScale(0.9);
            wife.anchorOffsetY = wife.height;
            wife.anchorOffsetX = wife.width / 2;
            wife.x = bottomBg.x + bottomBg.width / 4 - 20;
            wife.y = bottomBg.y + 80;
        }
        else {
            wife = BaseLoadBitmap.create(skinCfg.body);
            wife.width = 640;
            wife.height = 840;
            wife.setScale(0.7);
            wife.anchorOffsetY = wife.height;
            wife.anchorOffsetX = wife.width / 2;
            wife.x = bottomBg.x + bottomBg.width / 4;
            wife.y = bottomBg.y + 120;
        }
        this.addChildToContainer(wife);
        //lightBg
        var lightBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousegold_cellkuang", this.getUiCode()));
        lightBg.setPosition(GameConfig.stageWidth - lightBg.width, bottomBg.y - lightBg.height + 30);
        this._cellConArr = [];
        var allCellCon = new BaseDisplayObjectContainer();
        for (var i = 0; i < 20; i++) {
            var con = new BaseDisplayObjectContainer();
            var bgimg = BaseBitmap.create("acmousegold_cell1");
            bgimg.name = "bgimg_" + i;
            bgimg.touchEnabled = true;
            bgimg.addTouchTap(this.clickBgImg, this);
            con.addChild(bgimg);
            var x = i % 4;
            var y = Math.floor(i / 4);
            bgimg.x = x * bgimg.width;
            bgimg.y = y * bgimg.height;
            allCellCon.addChild(con);
            this._cellConArr.push(con);
        }
        allCellCon.x = lightBg.x + 20;
        allCellCon.y = lightBg.y + 5;
        this.addChildToContainer(allCellCon);
        this.addChildToContainer(lightBg);
        var topbg = BaseBitmap.create("acmousegold_txtbg3");
        topbg.height = 28;
        topbg.width += 50;
        topbg.x = lightBg.x + lightBg.width / 2 - topbg.width / 2;
        topbg.y = lightBg.y - topbg.height + 5;
        this.addChildToContainer(topbg);
        var layer = (this.vo.layer % this._bgResNameArr.length) + 1;
        var bgNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acMouseGoldBgName" + layer), 22, TextFieldConst.COLOR_WARN_YELLOW);
        bgNameTxt.x = topbg.x + 10;
        bgNameTxt.y = topbg.y + topbg.height / 2 - bgNameTxt.height / 2;
        this.addChildToContainer(bgNameTxt);
        this._bgNameTxt = bgNameTxt;
        var times = this.vo.getToolNum();
        var timesTxt = ComponentManager.getTextField(LanguageManager.getlocal("acMouseGoldTimesTxt", [times + ""]), 20, TextFieldConst.COLOR_WHITE);
        timesTxt.x = bgNameTxt.x + bgNameTxt.width + 10;
        timesTxt.y = bgNameTxt.y + 1;
        this.addChildToContainer(timesTxt);
        this._timesTxt = timesTxt;
        var freeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acMouseGoldFreeTimeTxt"), 18, TextFieldConst.COLOR_WARN_GREEN);
        freeTxt.x = timesTxt.x + timesTxt.width + 3;
        freeTxt.y = timesTxt.y;
        this.addChildToContainer(freeTxt);
        this._freeDesc = freeTxt;
        var botbg = BaseBitmap.create("acmousegold_txtbg2");
        botbg.x = lightBg.x + lightBg.width / 2 - botbg.width / 2;
        botbg.y = lightBg.y + lightBg.height + 5;
        this.addChildToContainer(botbg);
        var specialTxt = ComponentManager.getTextField(LanguageManager.getlocal("acMouseGoldSpecialNumTxt"), 20, TextFieldConst.COLOR_WHITE);
        specialTxt.x = botbg.x + 45;
        specialTxt.y = botbg.y + botbg.height / 2 - specialTxt.height / 2 + 2;
        this.addChildToContainer(specialTxt);
        var special = this.cfg.special;
        this._smallTxtArr = [];
        for (var i = 0; i < special.length; i++) {
            var itemcfg = Config.ItemCfg.getItemCfgById(special[i].split("_")[1]);
            var smallIcon = BaseLoadBitmap.create(itemcfg.icon);
            smallIcon.setScale(0.4);
            smallIcon.x = 400 + i * (60);
            smallIcon.y = botbg.y + botbg.height / 2 - smallIcon.height * smallIcon.scaleY / 2 - 20;
            this.addChildToContainer(smallIcon);
            var numObj = this.vo.getMapItems();
            var num = numObj[special[i]] ? numObj[special[i]] : 0;
            var smallTxt = ComponentManager.getTextField(String(num), 16, TextFieldConst.COLOR_WHITE);
            smallTxt.x = smallIcon.x + 30;
            smallTxt.y = smallIcon.y + 20;
            this.addChildToContainer(smallTxt);
            this._smallTxtArr.push(smallTxt);
        }
        this.addChildToContainer(bottomBg);
        this.addChildToContainer(scrollView);
        this.addChildToContainer(detailBtn);
        var tipsTxt = ComponentManager.getTextField(LanguageManager.getlocal("acMouseGoldViewTip"), 18, TextFieldConst.COLOR_WHITE);
        tipsTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        tipsTxt.setPosition(lightBg.x + lightBg.width / 2 - tipsTxt.width / 2 - 15, GameConfig.stageHeigth - tipsTxt.height - 10);
        this.addChildToContainer(tipsTxt);
        this._tipsTxt = tipsTxt;
        var allBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acMouseGoldViewTipBtn", function () {
            if (!_this.vo.isInActivity() || !_this.vo.isStart) {
                App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                return;
            }
            var cost = _this.vo.getAllCost();
            if (cost == 0) {
                _this._isPlay = true;
                _this.showViewMask();
                _this.vo.tempMap = _this.vo.map;
                _this.request(NetRequestConst.REQUEST_ACMOUSEGOLD_FLOPALL, { activeId: _this.vo.aidAndCode });
                return;
            }
            var times = _this.vo.getToolNum();
            if (times >= cost) {
                _this._isPlay = true;
                _this.showViewMask();
                _this.vo.tempMap = _this.vo.map;
                _this.request(NetRequestConst.REQUEST_ACMOUSEGOLD_FLOPALL, { activeId: _this.vo.aidAndCode });
            }
            else {
                _this.showRechargeTip();
            }
        }, this);
        allBtn.setPosition(lightBg.x + lightBg.width / 2 - allBtn.width / 2, tipsTxt.y - allBtn.height - 5);
        this.addChildToContainer(allBtn);
        this._allBtn = allBtn;
        //衣装预览
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        skinTxtEffect.setPosition(bottomBg.x + 20, bottomBg.y - 25);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
        this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxt1 = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt1.anchorOffsetX = skinTxt1.width / 2;
        skinTxt1.anchorOffsetY = skinTxt1.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
        this.addChildToContainer(skinTxt1);
        skinTxt1.blendMode = egret.BlendMode.ADD;
        skinTxt1.alpha = 0;
        egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        skinTxt1.addTouchTap(function () {
            if (_this.vo.isStart) {
                ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSEGOLDREWARDPOPVIEWTAB4, { aid: _this.aid, code: _this.code });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            }
        }, this);
        this.refreshView();
    };
    AcMouseGoldView.prototype.clickBgImg = function (e) {
        var _this = this;
        var namestr = (e.currentTarget).name;
        var index = parseInt(namestr.split("_")[1]);
        if (this.vo.checkCanClick(index)) {
            var data = this.vo.getMapDataById(index + 1);
            if (data) {
                if (!data.flag) {
                    if (!this.vo.isInActivity() || !this.vo.isStart) {
                        App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                        return;
                    }
                    var times = this.vo.getToolNum();
                    if (times > 0 || this.vo.isFree()) {
                        this._isPlay = true;
                        this.request(NetRequestConst.REQUEST_ACMOUSEGOLD_FLOP, { activeId: this.vo.aidAndCode, pos: index + 1 });
                    }
                    else {
                        this.showRechargeTip();
                    }
                }
                else {
                    if (data.itemid && !data.isget) {
                        if (!this.vo.isStart) {
                            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                            return;
                        }
                        this._isPlay = true;
                        this.request(NetRequestConst.REQUEST_ACMOUSEGOLD_GETSPEREWARD, { activeId: this.vo.aidAndCode, pos: index + 1 });
                    }
                    if (data.door) {
                        if (!this.vo.isInActivity() || !this.vo.isStart) {
                            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                            return;
                        }
                        var special = this.cfg.special;
                        for (var i = 0; i < special.length; i++) {
                            var numObj = this.vo.getMapItems();
                            var num = numObj[special[i]] ? numObj[special[i]] : 0;
                            if (num > 0) {
                                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                                    msg: LanguageManager.getlocal("acMouseGoldNextRewardTip"),
                                    touchMaskClose: true,
                                    title: "itemUseConstPopupViewTitle",
                                    callback: function () {
                                        _this._isPlay = true;
                                        _this.showViewMask();
                                        _this.request(NetRequestConst.REQUEST_ACMOUSEGOLD_NEXT, { activeId: _this.vo.aidAndCode, pos: index + 1 });
                                    },
                                    handle: this,
                                    needClose: 1,
                                    needCancel: true,
                                    confirmTxt: "taskGoBtn"
                                });
                                return;
                            }
                        }
                        this._isPlay = true;
                        this.showViewMask();
                        this.request(NetRequestConst.REQUEST_ACMOUSEGOLD_NEXT, { activeId: this.vo.aidAndCode, pos: index + 1 });
                    }
                }
            }
        }
    };
    //进度相关
    AcMouseGoldView.prototype.initProContainer = function () {
        var _this = this;
        var data = this.cfg.getAchieveCfg();
        var len = data.length;
        var proW = this.progressOffX * len;
        this._proContainer.width = proW + 105;
        var progressBar = ComponentManager.getProgressBar(App.CommonUtil.getResByCode("acmousegold_progress", this.getUiCode()), App.CommonUtil.getResByCode("acmousegold_progressbg", this.getUiCode()), proW);
        progressBar.setPosition(40, 53 - 12);
        this._progressBar = progressBar;
        var proLight = BaseBitmap.create(App.CommonUtil.getResByCode("acmousegold_progresslight", this.getUiCode()));
        proLight.anchorOffsetX = 17;
        proLight.anchorOffsetY = proLight.height / 2;
        proLight.y = progressBar.y + progressBar.height / 2;
        proLight.x = progressBar.x;
        this._proLight = proLight;
        //当前进度
        var processContainer = new BaseDisplayObjectContainer();
        this._processContainer = processContainer;
        var processBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousegold_bubble", this.getUiCode()));
        processContainer.width = processBg.width;
        processContainer.height = processBg.height;
        processContainer.addChild(processBg);
        processContainer.x = progressBar.x - processContainer.width / 2;
        var currProcessNum = this.vo.getProcessNum();
        var processNum = ComponentManager.getTextField(LanguageManager.getlocal("acMouseGoldProcessNum", ["" + currProcessNum]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        processNum.setPosition(processContainer.width / 2 - processNum.width / 2, 10);
        processContainer.addChild(processNum);
        this._processNum = processNum;
        var curId = 0;
        var _loop_1 = function (i) {
            var boxCon = new BaseDisplayObjectContainer();
            var boxImg = "acmousegold_box";
            var box = BaseBitmap.create(App.CommonUtil.getResByCode(boxImg, this_1.getUiCode()));
            boxCon.addChild(box);
            box.name = "box" + i;
            boxCon.width = box.width;
            boxCon.anchorOffsetX = boxCon.width / 2;
            box.anchorOffsetX = box.width / 2;
            boxCon.height = box.y + box.height;
            var proNum = ComponentManager.getTextField(data[i].specialnum + "", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            proNum.anchorOffsetX = proNum.width / 2;
            boxCon.addChild(proNum);
            proNum.setPosition(0, box.y + box.height - 5);
            proNum.name = "proNum" + i;
            boxCon.setPosition(progressBar.x + (i + 1) * this_1.progressOffX + boxCon.width / 2, this_1._progressBar.y + this_1._progressBar.height - 2);
            this_1._proContainer.addChild(boxCon);
            boxCon.addTouchTap(function () {
                //进度
                if (!_this.vo.isStart) {
                    App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                    return;
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSEGOLDREWARDPOPVIEWTAB2, { aid: _this.aid, code: _this.code, id: data[i].id });
            }, this_1);
            this_1._boxList[i] = boxCon;
            if (curId == 0 && this_1.vo.getProcessNum() < data[i].specialnum) {
                curId = i;
            }
        };
        var this_1 = this;
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
        this._proContainer.addChild(progressBar);
        this._proContainer.addChild(proLight);
        this._proContainer.addChild(processContainer);
        this._isMove = true;
        this._scrollView.scrollLeft = this._proContainer.width - this._scrollView.width;
        this.showViewMask();
        var posX = Math.min(Math.max(0, (curId + 1 - 4) * this.progressOffX), this._proContainer.width - this._scrollView.width);
        egret.Tween.get(this._scrollView).wait(500).to({ scrollLeft: posX }, (this._scrollView.scrollLeft - posX)).call(function () {
            _this.hideViewMask();
            egret.Tween.removeTweens(_this._scrollView);
            _this._isMove = false;
        }, this);
    };
    //刷新进度
    AcMouseGoldView.prototype.refreshProContainer = function () {
        var currProNum = this.vo.getProcessNum();
        var data = this.cfg.getAchieveCfg();
        for (var i = 0; i < data.length; i++) {
            var group = this._boxList[i];
            var eff = group.getChildByName("eff" + i);
            var box = group.getChildByName("box" + i);
            var proNum = group.getChildByName("proNum" + i);
            if (this.vo.isGetAchieveRewardById(data[i].id)) {
                if (eff) {
                    eff.dispose();
                    eff = null;
                }
                App.DisplayUtil.changeToGray(box);
            }
            else {
                App.DisplayUtil.changeToNormal(box);
                if (currProNum >= data[i].specialnum) {
                    if (!eff) {
                        eff = ComponentManager.getCustomMovieClip("mousegoldach", 10);
                        eff.name = "eff" + i;
                        group.addChildAt(eff, group.getChildIndex(proNum));
                        eff.width = 160;
                        eff.height = 160;
                        eff.playWithTime(-1);
                        eff.x = -eff.width * eff.scaleX / 2;
                        eff.y = box.y + box.height / 2 - eff.height * eff.scaleY / 2;
                        eff.blendMode = egret.BlendMode.ADD;
                    }
                }
                else {
                    if (eff) {
                        eff.dispose();
                        eff = null;
                    }
                }
            }
        }
        var curProIndex = this.vo.getCurrProIndex();
        if (curProIndex == -1) {
            this._progressBar.setPercentage(1);
        }
        else {
            var currNum = curProIndex == 0 ? 0 : data[curProIndex - 1].specialnum;
            var nextNum = data[curProIndex].specialnum;
            var offX = 0;
            if (curProIndex == 0) {
                offX = (currProNum - currNum) * this.progressOffX / (nextNum - currNum);
            }
            else {
                offX = curProIndex * this.progressOffX + (currProNum - currNum) * this.progressOffX / (nextNum - currNum);
            }
            this._progressBar.setPercentage(offX / this._progressBar.width);
        }
        this._proLight.x = this._progressBar.x + this._progressBar.width * this._progressBar.getPercent();
        this._processContainer.x = this._progressBar.x + this._progressBar.width * this._progressBar.getPercent() - this._processContainer.width / 2;
        this._processNum.text = LanguageManager.getlocal("acMouseGoldProcessNum", ["" + currProNum]);
        this._processNum.x = this._processContainer.width / 2 - this._processNum.width / 2;
    };
    AcMouseGoldView.prototype.playLightAni = function () {
        this.showViewMask();
    };
    AcMouseGoldView.prototype.refreshView = function () {
        if (this._isPlay) {
            return;
        }
        var times = this.vo.getToolNum();
        this._timesTxt.text = LanguageManager.getlocal("acMouseGoldTimesTxt", [times + ""]);
        if (this.vo.isFree()) {
            this._freeDesc.visible = true;
            this._freeDesc.x = GameConfig.stageWidth - this._freeDesc.width - 30;
            this._timesTxt.x = this._freeDesc.x - this._timesTxt.width - 3;
        }
        else {
            this._freeDesc.visible = false;
            this._timesTxt.x = GameConfig.stageWidth - this._timesTxt.width - 30;
        }
        var layer = (this.vo.layer % this._bgResNameArr.length) + 1;
        this._bgNameTxt.text = LanguageManager.getlocal("acMouseGoldBgName" + layer);
        this._bgNameTxt.x = this._timesTxt.x - this._bgNameTxt.width - 10;
        this._tipsTxt.visible = this.vo.layer >= 2;
        this._allBtn.visible = this.vo.layer >= 2;
        var special = this.cfg.special;
        for (var i = 0; i < special.length; i++) {
            var numObj = this.vo.getMapItems();
            var num = numObj[special[i]] ? numObj[special[i]] : 0;
            this._smallTxtArr[i].text = String(num);
        }
        this.refreshProContainer();
        if (this.vo.isCangetAchieveReward() || this.vo.isCanExchange()) {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
        this._rechargeTip.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRechargeInfo", this.getUiCode()), ["" + this.vo.getNeedRecharge()]);
        this.freshMap();
    };
    AcMouseGoldView.prototype.freshMap = function (isNext) {
        if (isNext === void 0) { isNext = false; }
        var len = this._cellConArr.length;
        for (var i = 0; i < len; i++) {
            var bgimg = this._cellConArr[i].getChildByName("bgimg_" + i);
            var itemicon = this._cellConArr[i].getChildByName("itemicon");
            var kuang1 = this._cellConArr[i].getChildByName("kuang1");
            var kuang2 = this._cellConArr[i].getChildByName("kuang2");
            var door = this._cellConArr[i].getChildByName("door");
            var itemEff = this._cellConArr[i].getChildByName("itemEff");
            var data = void 0;
            if (isNext) {
                data = this.vo.getTempMapDataById(i + 1);
            }
            else {
                data = this.vo.getMapDataById(i + 1);
            }
            if (data.flag == 0) {
                bgimg.setRes("acmousegold_cell1");
                if (itemicon) {
                    itemicon.dispose();
                    itemicon = null;
                }
                if (door) {
                    door.dispose();
                    door = null;
                }
                if (itemEff) {
                    itemEff.dispose();
                    itemEff = null;
                }
                if (this.vo.checkCanClick(i)) {
                    if (!kuang1) {
                        kuang1 = BaseBitmap.create("acmousegold_cell3");
                        kuang1.name = "kuang1";
                        kuang1.setPosition(bgimg.x, bgimg.y);
                        this._cellConArr[i].addChild(kuang1);
                    }
                    if (!kuang2) {
                        kuang2 = BaseBitmap.create("acmousegold_cell3");
                        kuang2.name = "kuang2";
                        kuang2.setPosition(bgimg.x, bgimg.y);
                        this._cellConArr[i].addChild(kuang2);
                    }
                    egret.Tween.get(kuang1, { loop: true }).to({ alpha: 0.7 }, 400).to({ alpha: 1 }, 400);
                    egret.Tween.get(kuang2, { loop: true }).to({ alpha: 0.2 }, 400).to({ alpha: 0.5 }, 400);
                }
                else {
                    if (kuang1) {
                        kuang1.dispose();
                        kuang1 = null;
                    }
                    if (kuang2) {
                        kuang2.dispose();
                        kuang2 = null;
                    }
                }
            }
            else {
                bgimg.setRes("acmousegold_cell2");
                if (kuang1) {
                    kuang1.dispose();
                    kuang1 = null;
                }
                if (kuang2) {
                    kuang2.dispose();
                    kuang2 = null;
                }
                if (data.itemid) {
                    if (!data.isget) {
                        if (!itemEff) {
                            var itemEff_1 = ComponentManager.getCustomMovieClip("mousegoldaward", 10, 100);
                            itemEff_1.name = "itemEff";
                            itemEff_1.playWithTime(-1);
                            itemEff_1.setPosition(bgimg.x - 12.5, bgimg.y - 12.5);
                            this._cellConArr[i].addChild(itemEff_1);
                        }
                    }
                    else {
                        if (itemEff) {
                            itemEff.dispose();
                            itemEff = null;
                        }
                    }
                    if (!itemicon) {
                        var cfg = Config.ItemCfg.getItemCfgById(data.itemid.split("_")[1]);
                        itemicon = BaseLoadBitmap.create(cfg.icon);
                        itemicon.width = 100;
                        itemicon.height = 100;
                        itemicon.setScale(0.8);
                        itemicon.name = "itemicon";
                        itemicon.x = bgimg.x + bgimg.width / 2 - itemicon.width * itemicon.scaleX / 2;
                        itemicon.y = bgimg.y + bgimg.height / 2 - itemicon.height * itemicon.scaleY / 2;
                        this._cellConArr[i].addChild(itemicon);
                    }
                    if (data.isget) {
                        App.DisplayUtil.changeToGray(itemicon);
                    }
                    else {
                        App.DisplayUtil.changeToNormal(itemicon);
                    }
                }
                if (data.door) {
                    if (!door) {
                        door = BaseBitmap.create("acmousegold_nexticon");
                        door.setScale(0.8);
                        door.name = "door";
                        door.x = bgimg.x + bgimg.width / 2 - door.width * door.scaleX / 2;
                        door.y = bgimg.y + bgimg.height / 2 - door.height * door.scaleY / 2;
                        this._cellConArr[i].addChild(door);
                    }
                }
            }
        }
    };
    AcMouseGoldView.prototype.tick = function () {
        this._timeTxt.text = LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]);
        this._timeTxt.x = this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2;
    };
    AcMouseGoldView.prototype.showRechargeTip = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            msg: LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRechargeTip", this.getUiCode())),
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
    AcMouseGoldView.prototype.showViewMask = function () {
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "viewMaskTouchPos";
        touchPos.touchEnabled = true;
    };
    AcMouseGoldView.prototype.hideViewMask = function () {
        var touchPos = this.getChildByName("viewMaskTouchPos");
        if (touchPos) {
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    };
    AcMouseGoldView.prototype.flopCallback = function (event) {
        var rData = event.data.data.data;
        if (!event.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if (rData.rewards) {
            var rewardVoList = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
        }
        this._isPlay = false;
        this.refreshView();
    };
    AcMouseGoldView.prototype.getSpRewardCallback = function (event) {
        var rData = event.data.data.data;
        if (!event.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if (rData.rewards) {
            var rewardVoList = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
        }
        this._isPlay = false;
        this.refreshView();
    };
    AcMouseGoldView.prototype.flopAllCallback = function (event) {
        var _this = this;
        var rData = event.data.data.data;
        if (!event.data.ret) {
            this.hideViewMask();
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if (rData.rewards) {
            var rewardVoList = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
        }
        this.freshMap(true);
        var t = egret.setTimeout(function () {
            egret.clearTimeout(t);
            _this.showNext();
        }, this, 600);
    };
    AcMouseGoldView.prototype.nextCallback = function (event) {
        var rData = event.data.data.data;
        if (!event.data.ret) {
            this.hideViewMask();
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        this.showNext();
    };
    AcMouseGoldView.prototype.showNext = function () {
        var _this = this;
        var yunLeft = BaseBitmap.create("acmousegold_yun1");
        yunLeft.setPosition(-yunLeft.width, 0);
        this.addChild(yunLeft);
        var yunRight = BaseBitmap.create("acmousegold_yun2");
        yunRight.setPosition(GameConfig.stageWidth, 0);
        this.addChild(yunRight);
        egret.Tween.get(yunLeft).to({ x: 0 }, 600).call(function () {
            egret.Tween.removeTweens(yunLeft);
        }, this);
        egret.Tween.get(yunRight).to({ x: GameConfig.stageWidth - yunRight.width }, 600).call(function () {
            egret.Tween.removeTweens(yunRight);
            _this._isPlay = false;
            _this.refreshView();
            _this.changeBg();
            var prebg = BaseBitmap.create("acmousegold_txtbg1");
            prebg.width = 420;
            prebg.setPosition(GameConfig.stageWidth / 2 - prebg.width / 2, GameConfig.stageHeigth / 2 - prebg.height / 2);
            _this.addChild(prebg);
            var layer = (_this.vo.layer % _this._bgResNameArr.length) + 1;
            var name = LanguageManager.getlocal("acMouseGoldBgName" + layer);
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acMouseGoldNextShowTip", [name]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            tipTxt.setPosition(GameConfig.stageWidth / 2 - tipTxt.width / 2, GameConfig.stageHeigth / 2 - tipTxt.height / 2);
            _this.addChild(tipTxt);
            var t = egret.setTimeout(function () {
                prebg.dispose();
                prebg = null;
                tipTxt.dispose();
                tipTxt = null;
                egret.Tween.get(yunLeft).to({ x: -yunLeft.width }, 600).call(function () {
                    egret.Tween.removeTweens(yunLeft);
                    yunLeft.dispose();
                    yunLeft = null;
                }, _this);
                egret.Tween.get(yunRight).to({ x: GameConfig.stageWidth }, 600).call(function () {
                    egret.Tween.removeTweens(yunRight);
                    yunRight.dispose();
                    yunRight = null;
                    _this.hideViewMask();
                }, _this);
            }, _this, 1500);
        }, this);
    };
    AcMouseGoldView.prototype.changeBg = function () {
        var newBg = BaseLoadBitmap.create(this._bgResNameArr[this.vo.layer % this._bgResNameArr.length]);
        this.addChild(newBg);
        var prebg = this.getChildByName("newBg");
        if (prebg) {
            prebg.name = "";
            this.setChildIndex(newBg, this.getChildIndex(prebg) + 1);
            prebg.dispose();
            prebg = null;
        }
        else {
            this.setChildIndex(newBg, this.getChildIndex(this.viewBg) + 1);
        }
        newBg.name = "newBg";
    };
    AcMouseGoldView.prototype.dispose = function () {
        this.hideViewMask();
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_FLOP, this.flopCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_GETSPEREWARD, this.getSpRewardCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_NEXT, this.nextCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_FLOPALL, this.flopAllCallback, this);
        this._timeBg = null;
        this._timeTxt = null;
        this._scrollView = null;
        this._proContainer = null;
        this._freeDesc = null;
        this._timesTxt = null;
        this._bgNameTxt = null;
        this._boxList = [];
        this._lightList = [];
        this._isPlay = false;
        this._isMove = false;
        this._processContainer = null;
        this._processNum = null;
        this._progressBar = null;
        this._proLight = null;
        this._rewardData = null;
        this._detailBtn = null;
        this._rechargeTip = null;
        this._tipsTxt = null;
        this._allBtn = null;
        for (var i = 0; i < this._smallTxtArr.length; i++) {
            this._smallTxtArr[i] = null;
        }
        this._smallTxtArr = null;
        for (var i = 0; i < this._cellConArr.length; i++) {
            this._cellConArr[i] = null;
        }
        this._cellConArr = null;
        _super.prototype.dispose.call(this);
    };
    return AcMouseGoldView;
}(AcCommonView));
//# sourceMappingURL=AcMouseGoldView.js.map