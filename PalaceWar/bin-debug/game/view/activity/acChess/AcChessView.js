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
 * 棋社对弈
 * @author weixiaozhe  2020.5.7
 */
var AcChessView = (function (_super) {
    __extends(AcChessView, _super);
    function AcChessView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._topTxtBg = null;
        _this._proText2 = null;
        _this._totalProText = null;
        _this._progressBar = null;
        _this._boxRewardImg = null;
        _this._timeTxt = null;
        _this._icon1 = null;
        _this._costTxt1 = null;
        _this._freeLab = null;
        _this._panPos = null;
        _this._timebgwidth = 0;
        _this._haveTxt = null;
        _this._limitTxt = null;
        _this._proObjArr = null;
        _this._proEffImg1 = [null, null, null, null];
        _this._proEffImg2 = [null, null, null, null];
        _this._chessIconArr = [];
        _this._tempTimes = 0;
        _this._tempCheckerboard = 1;
        _this._isTen = false;
        _this._tempAwards = null;
        _this._waitObjArr = null;
        _this._isQiziEffect = false;
        return _this;
    }
    AcChessView.prototype.initBg = function () {
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
        var topTxtBg = BaseBitmap.create("luckydrawwordbg");
        topTxtBg.width = GameConfig.stageWidth;
        topTxtBg.height = 115;
        topTxtBg.x = GameConfig.stageWidth / 2 - topTxtBg.width / 2;
        topTxtBg.y = 92 - 10;
        this.addChild(topTxtBg);
        this._topTxtBg = topTxtBg;
    };
    AcChessView.prototype.getBgName = function () {
        return "acchess_bg-" + this.TypeCode;
    };
    //规则
    AcChessView.prototype.getRuleInfo = function () {
        return "acChessRuleInfo-" + this.code;
    };
    AcChessView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    Object.defineProperty(AcChessView.prototype, "TypeCode", {
        get: function () {
            if (this.code == "2") {
                return "1";
            }
            return this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcChessView.prototype.getProbablyInfo = function () {
        return "acChessProbablyInfo-" + this.code;
    };
    AcChessView.prototype.getTitleStr = function () {
        return null;
    };
    AcChessView.prototype.getTitleBgName = function () {
        return this.getDefaultRes('acchess_title');
    };
    AcChessView.prototype.initView = function () {
        // this.visible = false;
        var _this = this;
        AcChessView.AID = this.aid;
        AcChessView.CODE = this.code;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshRed, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHESS_GETNUMREWARDS, this.freshProcess, this);
        this.showStartDialog();
        //活动时间   
        var dateText = ComponentManager.getTextField(this.vo.acTimeAndHour, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        dateText.x = this._topTxtBg.x + 10;
        dateText.y = this._topTxtBg.y + 10;
        this.addChild(dateText);
        var timebg = BaseBitmap.create("public_9_bg61");
        timebg.width = 230;
        this.addChild(timebg);
        this.setLayoutPosition(LayoutConst.rightbottom, timebg, this._topTxtBg, [15, -timebg.height / 2 + 3]);
        //剩余时间
        var timeTxt = ComponentManager.getTextField(this.vo.acCountDown, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeTxt.x = timebg.x + timebg.width / 2 - timeTxt.width / 2;
        timeTxt.y = timebg.y + timebg.height / 2 - timeTxt.height / 2;
        this.addChild(timeTxt);
        this._timeTxt = timeTxt;
        this._timebgwidth = timebg.width;
        this._timebgx = timebg.x;
        var needMoney = this.vo.getNeedMoney2();
        var needItem = this.cfg.change.needItem.split("_")[2];
        //活动规则文本
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acChessInfo"), [String(needMoney), needItem]), 18);
        descTxt.width = 610;
        descTxt.lineSpacing = 5;
        descTxt.x = dateText.x;
        descTxt.y = dateText.y + dateText.height + 10;
        this.addChild(descTxt);
        //活动详情
        var detailBtnBg = ResourceManager.hasRes("acchess_detailbtn-" + this.getUiCode()) ? "acchess_detailbtn-" + this.getUiCode() : "acchess_detailbtn-1";
        var detailBtn = ComponentManager.getButton(detailBtnBg, "", function () {
            AcChessView.IS_SHOW_RECHARGE = false;
            ViewController.getInstance().openView(ViewConst.POPUP.ACCHESSREWARDPOPVIEW, { aid: _this.aid, code: _this.code });
        }, this, null);
        detailBtn.setPosition(10, 210);
        this.addChild(detailBtn);
        this._detailBtn = detailBtn;
        var panImg = BaseBitmap.create("chess_pan");
        this.addChild(panImg);
        this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, panImg, this, [0, -110]);
        this._panPos = new egret.Point(panImg.x, panImg.y);
        this.freshQizi();
        var bottomNameImag = BaseBitmap.create("public_resnumbg");
        bottomNameImag.width = 260;
        this.addChild(bottomNameImag);
        this.setLayoutPosition(LayoutConst.horizontalCentertop, bottomNameImag, panImg, [0, -(10 + bottomNameImag.height)]);
        var str = this.cfg.change.needItem;
        var itemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);
        var itemicon = BaseLoadBitmap.create("itemicon" + itemCfg.id);
        itemicon.width = 40;
        itemicon.height = 40;
        itemicon.x = bottomNameImag.x + bottomNameImag.width / 2 - itemicon.width - 75;
        itemicon.y = bottomNameImag.y + bottomNameImag.height / 2 - itemicon.height / 2;
        this.addChild(itemicon);
        var have = Api.itemVoApi.getItemNumInfoVoById(itemCfg.id);
        var haveTxt = ComponentManager.getTextField(String(have), 20, TextFieldConst.COLOR_WARN_YELLOW);
        haveTxt.x = itemicon.x + itemicon.width;
        haveTxt.y = bottomNameImag.y + bottomNameImag.height / 2 - haveTxt.height / 2;
        this.addChild(haveTxt);
        this._haveTxt = haveTxt;
        var limitleft = this.cfg.sepcialLimit - this.vo.slimit;
        var limitstr = limitleft > 0 ? "acChessLimitDesc" : "acChessLimitDesc2";
        var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal(limitstr, [String(limitleft)]), 20, TextFieldConst.COLOR_WARN_YELLOW);
        limitTxt.x = haveTxt.x + haveTxt.width + 2;
        limitTxt.y = bottomNameImag.y + bottomNameImag.height / 2 - limitTxt.height / 2;
        this.addChild(limitTxt);
        this._limitTxt = limitTxt;
        this.showEffect();
        var botbg = BaseBitmap.create("arena_bottom");
        botbg.height = 130;
        botbg.x = GameConfig.stageWidth / 2 - botbg.width / 2;
        botbg.y = GameConfig.stageHeigth - botbg.height;
        this.addChild(botbg);
        // 底部背景--桌子
        var bottomBg = BaseBitmap.create(this.getDefaultRes("acchess_desk"));
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - botbg.height;
        this.addChild(bottomBg);
        var processBg = BaseBitmap.create("acchess_processbg");
        processBg.x = 10;
        processBg.y = bottomBg.y - 25;
        this.addChild(processBg);
        var proText1 = ComponentManager.getTextField(LanguageManager.getlocal("acChess_processtxt"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        var proText2 = ComponentManager.getTextField("0", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._proText2 = proText2;
        proText1.x = processBg.x + processBg.width / 2 - proText1.width / 2;
        proText1.y = processBg.y + 30;
        this.addChild(proText1);
        proText2.width = processBg.width;
        proText2.textAlign = egret.HorizontalAlign.CENTER;
        proText2.x = processBg.x;
        proText2.y = processBg.y + processBg.height - proText2.height - 20;
        this.addChild(proText2);
        //进度条
        var progressbar = ComponentManager.getProgressBar("progress12", "progress12_bg", 470);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progressbar, bottomBg, [processBg.width + processBg.x - 5, 15]);
        this.addChild(progressbar);
        this._progressBar = progressbar;
        this._boxRewardImg = BaseBitmap.create("acchess_qihe1");
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, this._boxRewardImg, bottomBg, [20, -10]);
        this.addChild(this._boxRewardImg);
        this._boxRewardImg.addTouchTap(function () {
            AcChessView.IS_SHOW_PROCESS = 5;
            ViewController.getInstance().openView(ViewConst.POPUP.ACCHESSREWARDPOPVIEWTAB2, {
                aid: _this.aid,
                code: _this.code,
                index: -1
            });
        }, this);
        var boxbotimg = BaseBitmap.create("luckydrawrewardword-2");
        boxbotimg.x = this._boxRewardImg.x + this._boxRewardImg.width / 2 - boxbotimg.width / 2;
        boxbotimg.y = this._boxRewardImg.y + this._boxRewardImg.height - boxbotimg.height / 2;
        this.addChild(boxbotimg);
        this._totalProText = ComponentManager.getTextField(LanguageManager.getlocal("acChessProcessNum", ["0", "0"]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChild(this._totalProText);
        this._totalProText.width = 100;
        this._totalProText.textAlign = egret.HorizontalAlign.CENTER;
        this._totalProText.x = this.width / 2 - this._totalProText.width / 2;
        this._totalProText.y = bottomBg.y + bottomBg.height - this._totalProText.height + 33;
        this.freshProcess();
        // 对弈按钮
        var chessBtn1 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acChess_btn1", this.chessBtnHandle1, this);
        this.addChild(chessBtn1);
        this.setLayoutPosition(LayoutConst.leftbottom, chessBtn1, botbg, [50, 15]);
        var chessBtn10 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acChess_btn10", this.chessBtnHandle10, this);
        this.addChild(chessBtn10);
        this.setLayoutPosition(LayoutConst.rightbottom, chessBtn10, botbg, [50, 15]);
        var icon1 = BaseBitmap.create("itemicon1");
        icon1.setScale(0.4);
        icon1.x = chessBtn1.x + chessBtn1.width / 2 - icon1.width * icon1.scaleX / 2 - 20;
        icon1.y = chessBtn1.y - icon1.height * icon1.scaleY - 10;
        this.addChild(icon1);
        var costTxt1 = ComponentManager.getTextField(String(this.cfg.cost1), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        costTxt1.x = icon1.x + icon1.width * icon1.scaleX;
        costTxt1.y = icon1.y + 13;
        this.addChild(costTxt1);
        var freeLab = ComponentManager.getTextField(LanguageManager.getlocal("acChess_free"), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        freeLab.x = chessBtn1.x + chessBtn1.width / 2 - freeLab.width / 2;
        freeLab.y = icon1.y + 10;
        this.addChild(freeLab);
        this._icon1 = icon1;
        this._costTxt1 = costTxt1;
        this._freeLab = freeLab;
        this.freshFreeLab();
        var icon10 = BaseBitmap.create("itemicon1");
        icon10.setScale(0.4);
        icon10.x = chessBtn10.x + chessBtn10.width / 2 - icon10.width * icon10.scaleX / 2 - 25;
        icon10.y = chessBtn10.y - icon10.height * icon10.scaleY - 10;
        this.addChild(icon10);
        var costTxt10 = ComponentManager.getTextField(String(this.cfg.cost10), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        costTxt10.x = icon10.x + icon10.width * icon10.scaleX;
        costTxt10.y = icon10.y + 13;
        this.addChild(costTxt10);
        if (this.vo.firstOpen != 1) {
            // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG, { "activeId": this.acVo.aid + "-" + this.acVo.code, flagkey: "firstOpen", value: 1 });
        }
        if (this.vo.avgShow != 1) {
            // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG, { "activeId": this.acVo.aid + "-" + this.acVo.code, flagkey: "avgShow", value: 1 });
            // ViewController.getInstance().openView(ViewConst.BASE.ACLINKGAMEAVGVIEW,{
            //     f : this.avgendCallback,
            //     o : this,
            //     idx : 1,
            //     aid : this.aid,
            //     code : this.code
            // });
        }
        this.refreshRed();
    };
    AcChessView.prototype.avgendCallback = function () {
    };
    AcChessView.prototype.freshFreeLab = function () {
        if (this.vo.isfree > 0) {
            this._freeLab.visible = true;
            this._icon1.visible = false;
            this._costTxt1.visible = false;
        }
        else {
            this._freeLab.visible = false;
            this._icon1.visible = true;
            this._costTxt1.visible = true;
        }
    };
    AcChessView.prototype.freshProcess = function () {
        if (this._proObjArr == null) {
            this._proObjArr = [];
        }
        else {
            for (var i = 0; i < this._proObjArr.length; i++) {
                if (this._proObjArr[i]) {
                    this._proObjArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.processHandle, this);
                    if (this._proObjArr[i].parent) {
                        this._proObjArr[i].parent.removeChild(this._proObjArr[i]);
                    }
                    this._proObjArr[i] = null;
                }
            }
            this._proObjArr = [];
        }
        var achItems = this.vo.getSortAchievementCfg(false);
        var len = achItems.length > 5 ? 5 : achItems.length;
        var width = this._progressBar.width;
        var maxNeed = achItems[len - 1].needNum;
        this._proText2.text = String(this.vo.getProcess());
        this._totalProText.text = String(this.vo.getProcess()) + "/" + achItems[achItems.length - 1].needNum;
        this._progressBar.setPercentage(this.vo.getProcess() / maxNeed);
        for (var i = 0; i < len; i++) {
            if (i != len - 1) {
                if (this.vo.isGetAchievementById(String(achItems[i].id))) {
                    var img = BaseBitmap.create("acchess_qibtnnull");
                    img.touchEnabled = true;
                    img.anchorOffsetX = img.width / 2;
                    img.x = achItems[i].needNum / maxNeed * width + this._progressBar.x;
                    img.y = this._progressBar.y;
                    this.addChild(img);
                    img["nameIndex"] = achItems[i].id;
                    img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.processHandle, this);
                    this._proObjArr.push(img);
                    if (this._proEffImg1[i]) {
                        egret.Tween.removeTweens(this._proEffImg1[i]);
                        this._proEffImg1[i].dispose();
                        this._proEffImg1[i] = null;
                    }
                    if (this._proEffImg2[i]) {
                        egret.Tween.removeTweens(this._proEffImg2[i]);
                        this._proEffImg2[i].dispose();
                        this._proEffImg2[i] = null;
                    }
                }
                else if (this.vo.getProcess() >= achItems[i].needNum) {
                    var x = achItems[i].needNum / maxNeed * width + this._progressBar.x;
                    if (!this._proEffImg1[i]) {
                        this._proEffImg1[i] = BaseBitmap.create("chess_glow");
                        this._proEffImg1[i].anchorOffsetX = this._proEffImg1[i].width / 2;
                        this._proEffImg1[i].anchorOffsetY = this._proEffImg1[i].height / 2;
                        this._proEffImg1[i].x = x;
                        this._proEffImg1[i].y = this._progressBar.y + 20;
                        this.addChild(this._proEffImg1[i]);
                        egret.Tween.get(this._proEffImg1[i], { loop: true }).to({ rotation: 360 }, 8000);
                    }
                    var img = BaseBitmap.create("acchess_qibtn");
                    img.touchEnabled = true;
                    img.anchorOffsetX = img.width / 2;
                    img.x = x;
                    img.y = this._progressBar.y;
                    this.addChild(img);
                    img["nameIndex"] = achItems[i].id;
                    img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.processHandle, this);
                    this._proObjArr.push(img);
                    if (!this._proEffImg2[i]) {
                        this._proEffImg2[i] = BaseBitmap.create("chess_guanglow");
                        this._proEffImg2[i].anchorOffsetX = this._proEffImg2[i].width / 2;
                        this._proEffImg2[i].anchorOffsetY = this._proEffImg2[i].height / 2;
                        this._proEffImg2[i].x = x;
                        this._proEffImg2[i].y = this._progressBar.y + 20;
                        this.addChild(this._proEffImg2[i]);
                        egret.Tween.get(this._proEffImg2[i], { loop: true }).to({ alpha: 0.2 }, 1000).to({ alpha: 1 }, 1000);
                    }
                    else {
                        this.setChildIndex(this._proEffImg2[i], this.getChildIndex(img) + 1);
                    }
                }
                else {
                    var img = BaseBitmap.create("acchess_qibtnhui");
                    img.touchEnabled = true;
                    img.anchorOffsetX = img.width / 2;
                    img.x = achItems[i].needNum / maxNeed * width + this._progressBar.x;
                    img.y = this._progressBar.y;
                    this.addChild(img);
                    img["nameIndex"] = achItems[i].id;
                    img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.processHandle, this);
                    this._proObjArr.push(img);
                }
            }
        }
    };
    AcChessView.prototype.processHandle = function (e) {
        var n = (e.currentTarget)["nameIndex"];
        AcChessView.IS_SHOW_PROCESS = n;
        ViewController.getInstance().openView(ViewConst.POPUP.ACCHESSREWARDPOPVIEWTAB2, {
            aid: this.aid,
            code: this.code,
        });
    };
    AcChessView.prototype.freshQizi = function (isFirst, isFinish) {
        if (isFirst === void 0) { isFirst = true; }
        if (isFinish === void 0) { isFinish = false; }
        if (!this._chessIconArr) {
            this._chessIconArr = [];
        }
        var initPos = new egret.Point(this._panPos.x + 12 + 21 / 2, this._panPos.y + 14 + 24 / 2);
        var cellX = 24;
        var cellY = 24;
        var posObj = this.cfg.checkerBoard[this.vo.checkerboard - 1];
        var num = this.vo.getTimes() * 2;
        if (isFinish) {
            posObj = this.cfg.checkerBoard[this._tempCheckerboard - 1];
            // num = this._tempTimes*2+1;
            num = (this._tempTimes + (10 - this.vo.getTimes())) * 2 - 1;
        }
        for (var i = 1; i <= num; i++) {
            if (posObj[i]) {
                if (this._chessIconArr[i - 1] && this._chessIconArr[i - 1].visible) {
                    continue;
                }
                var chessIcon = void 0;
                if (this._chessIconArr[i - 1] && !this._chessIconArr[i - 1].visible) {
                    chessIcon = this._chessIconArr[i - 1];
                    chessIcon.visible = true;
                }
                else {
                    if (i % 2 != 0) {
                        chessIcon = BaseBitmap.create("chess_icon1");
                        chessIcon.anchorOffsetX = chessIcon.width / 2;
                        chessIcon.anchorOffsetY = chessIcon.height / 2;
                        this.addChild(chessIcon);
                    }
                    else {
                        chessIcon = BaseBitmap.create("chess_icon2");
                        chessIcon.anchorOffsetX = chessIcon.width / 2;
                        chessIcon.anchorOffsetY = chessIcon.height / 2;
                        this.addChild(chessIcon);
                    }
                    this._chessIconArr.push(chessIcon);
                }
                var px = initPos.x + cellX * (posObj[i]["coordinate"][0] - 1);
                var py = initPos.y + cellY * (posObj[i]["coordinate"][1] - 1);
                if (isFirst) {
                    chessIcon.x = px;
                    chessIcon.y = py;
                }
                else {
                    chessIcon.alpha = 0;
                    this.showQiziEffect(chessIcon, px, py, isFinish);
                }
            }
        }
    };
    AcChessView.prototype.chessBtnHandle1 = function () {
        this.chessBtnHandle(1);
    };
    AcChessView.prototype.chessBtnHandle10 = function () {
        this.chessBtnHandle(2);
    };
    AcChessView.prototype.chessBtnHandle = function (type) {
        if (this._isQiziEffect) {
            return;
        }
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.vo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var cost = type == 1 ? this.cfg.cost1 : this.cfg.cost10;
        if (type == 1 && this.vo.isfree > 0) {
            cost = 0;
        }
        var have = Api.playerVoApi.getPlayerGem();
        if (have < cost) {
            var message = LanguageManager.getlocal("acChess_notbuy");
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
        this._tempTimes = this.vo.getTimes();
        this._tempCheckerboard = this.vo.checkerboard;
        this._isTen = type != 1;
        this.request(NetRequestConst.REQUEST_CHESS_PLAY, {
            activeId: this.vo.aidAndCode,
            isFree: (this.vo.isfree > 0 && type == 1) ? 1 : 0,
            isTenPlay: type == 1 ? 0 : 1
        });
    };
    //请求回调
    AcChessView.prototype.receiveData = function (data) {
        if (!data.ret) {
            App.CommonUtil.showTip(data.data.ret);
        }
        // ViewController.getInstance().openView(ViewConst.COMMON.ACFINDSAMEGAMEVIEW, { "aid": this.aid, "code": this.code });
        if (data.ret && data.data.cmd == NetRequestConst.REQUEST_CHESS_PLAY) {
            this.freshFreeLab();
            this.freshProcess();
            this.refreshRed();
            if (data.data.data.rewards) {
                this._tempAwards = data.data.data.rewards;
            }
            if (data.data.data.fullFlag) {
                this.freshQizi(false, true);
            }
            else {
                this.freshQizi(false);
            }
        }
    };
    AcChessView.prototype.showQiziEffect = function (qizi, px, py, isFinish) {
        var _this = this;
        if (isFinish === void 0) { isFinish = false; }
        if (this._isQiziEffect) {
            if (this._waitObjArr == null) {
                this._waitObjArr = [];
            }
            this._waitObjArr.push({ qz: qizi, x: px, y: py });
        }
        else {
            this._isQiziEffect = true;
            qizi.alpha = 0;
            qizi.scaleX = qizi.scaleY = 0;
            qizi.x = px;
            qizi.y = py - 60;
            var time = this._isTen ? 150 : 1000;
            egret.Tween.get(qizi).to({ alpha: 1, scaleX: 1, scaleY: 1, y: py }, time).call(function () {
                egret.Tween.removeTweens(qizi);
                if (_this._waitObjArr && _this._waitObjArr.length > 0) {
                    _this._isQiziEffect = false;
                    _this.showQiziEffect(_this._waitObjArr[0].qz, _this._waitObjArr[0].x, _this._waitObjArr[0].y, isFinish);
                    _this._waitObjArr.shift();
                }
                else {
                    _this._isQiziEffect = false;
                    if (isFinish) {
                        _this._isQiziEffect = true;
                        _this.showWin();
                    }
                    else {
                        if (_this._tempAwards) {
                            if (_this._isTen) {
                                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": _this.countRewards(_this._tempAwards), "isPlayAni": true, "callback": null, "handler": null });
                            }
                            else {
                                var rewardVoList = GameData.formatRewardItem(_this._tempAwards);
                                App.CommonUtil.playRewardFlyAction(rewardVoList);
                            }
                        }
                    }
                }
            }, this);
        }
    };
    AcChessView.prototype.countRewards = function (rewards) {
        var strArr = rewards.split("|");
        var obj = {};
        var typeObj = {};
        for (var i = 0; i < strArr.length; i++) {
            var arr = strArr[i].split("_");
            if (obj[arr[1]]) {
                obj[arr[1]] += parseInt(arr[2]);
            }
            else {
                obj[arr[1]] = parseInt(arr[2]);
            }
            typeObj[arr[1]] = arr[0];
        }
        var itemArr = [];
        for (var item in obj) {
            itemArr.push(typeObj[item] + "_" + item + "_" + obj[item]);
        }
        itemArr.sort(function (a, b) {
            if (a.split("_")[1] == "2284" && b.split("_")[1] != "2284") {
                return -1;
            }
            if (a.split("_")[1] != "2284" && b.split("_")[1] == "2284") {
                return 1;
            }
            return 0;
        });
        return itemArr.join("|");
    };
    AcChessView.prototype.showWin = function () {
        var _this = this;
        var img = BaseBitmap.create("acchess_win");
        img.anchorOffsetX = img.width / 2;
        img.anchorOffsetY = img.height / 2;
        img.x = GameConfig.stageWidth / 2;
        img.y = 350;
        this.addChild(img);
        img.alpha = 0;
        img.scaleX = img.scaleY = 0;
        egret.Tween.get(img).to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 2000).call(function () {
            egret.Tween.removeTweens(img);
            if (_this._tempAwards) {
                img.dispose();
                img = null;
                if (_this._isTen) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": _this.countRewards(_this._tempAwards), "isPlayAni": true, "callback": _this.handleGet, "handler": _this });
                }
                else {
                    var rewardVoList = GameData.formatRewardItem(_this._tempAwards);
                    App.CommonUtil.playRewardFlyAction(rewardVoList);
                    _this.handleGet();
                }
            }
            else {
                img.dispose();
                img = null;
                _this.handleGet();
            }
            _this._isQiziEffect = false;
        });
    };
    AcChessView.prototype.handleGet = function () {
        var _this = this;
        var tmpmask = new BaseShape();
        tmpmask.graphics.beginFill(0, 0.6);
        tmpmask.graphics.drawRect(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth);
        tmpmask.graphics.endFill();
        this.addChild(tmpmask);
        tmpmask.touchEnabled = true;
        var img = BaseBitmap.create("chess_qiguan");
        img.anchorOffsetX = img.width / 2;
        img.anchorOffsetY = img.height;
        this.addChild(img);
        img.x = GameConfig.stageWidth / 2;
        img.y = this.height / 2 - 20;
        var effect = ComponentManager.getCustomMovieClip("qiluo_", 8, 100);
        effect.x = 100;
        effect.y = 150;
        this.addChild(effect);
        effect.playWithTime(2);
        egret.Tween.get(img).wait(200).to({ rotation: -2 }, 200).to({ rotation: 2 }, 200).to({ rotation: 0 }, 200).call(function () {
            egret.Tween.removeTweens(img);
            for (var i = 0; i < _this._chessIconArr.length; i++) {
                _this._chessIconArr[i].visible = false;
            }
            _this.freshQizi();
            tmpmask.dispose();
            tmpmask = null;
            img.dispose();
            img = null;
            effect.dispose();
            effect = null;
        });
    };
    AcChessView.prototype.getDefaultResList = function (resArr) {
        var arr = [];
        for (var i = 0; i < resArr.length; i++) {
            var element = resArr[i];
            var defRes = this.getDefaultRes(element);
            arr.push(defRes);
        }
        return arr;
    };
    AcChessView.prototype.getResourceList = function () {
        var codeRes = this.getDefaultResList([
            "acchess_bg",
            "acchess_desk",
            "acchess_title",
            "acchess_detailbtn",
        ]);
        var baseList = [
            "acchess_processbg",
            "acchess_qibtn",
            "acchess_qibtnhui",
            "acchess_qibtnnull",
            "chess_icon1",
            "chess_icon2", "acchess_exchange2",
            "chess_pan", "acchess_qihe1", "acchess_qihe2",
            "luckydrawwordbg", "arena_bottom",
            'progress12', 'progress12_bg',
            "itemicon1", "luckydrawrewardword-2",
            "acsearchproofview_common_skintxt",
            "story_bg6", "acchess_win", "chess_qiguan", "chess_glow", "chess_guanglow",
            "qiluo_1", "qiluo_2", "qiluo_3", "qiluo_4", "qiluo_5", "qiluo_6", "qiluo_7", "qiluo_8",
        ];
        var codeList = null;
        if (this.code == "1") {
            codeList = [];
        }
        return _super.prototype.getResourceList.call(this).concat(baseList).concat(codeList).concat(codeRes);
    };
    AcChessView.prototype.refreshRed = function () {
        if (this.vo.isCangetAchieveReward() || this.vo.isCangetChargeReward() || this.vo.isShowTaskRewardRedDot()) {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            var detailRed = this._detailBtn.getChildByName("reddot");
            if (detailRed) {
                detailRed.setPosition(70, 0);
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
        if (this.vo.showExchangeDot()) {
            App.CommonUtil.addIconToBDOC(this);
            var dot = this.getChildByName("reddot");
            if (dot) {
                dot.setPosition(190, GameConfig.stageHeigth - 275);
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this);
        }
        if (this.vo.isCangetAchieveReward()) {
            this._boxRewardImg.setRes("acchess_qihe2");
        }
        else {
            this._boxRewardImg.setRes("acchess_qihe1");
        }
        var str = this.cfg.change.needItem;
        var itemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);
        var have = Api.itemVoApi.getItemNumInfoVoById(itemCfg.id);
        this._haveTxt.text = String(have);
        var limitleft = this.cfg.sepcialLimit - this.vo.slimit;
        var limitstr = limitleft > 0 ? "acChessLimitDesc" : "acChessLimitDesc2";
        this._limitTxt.text = LanguageManager.getlocal(limitstr, [String(limitleft)]);
        this._limitTxt.x = this._haveTxt.x + this._haveTxt.width + 2;
    };
    AcChessView.prototype.showEffect = function () {
        var _this = this;
        var view = this;
        //门客
        var servantNeedMoney = 10;
        var wifeNeedMoney = 30;
        var servantSkinId = this.cfg.show1;
        var wifeSkinId = this.cfg.show2;
        var skinCfg = Config.ServantskinCfg.getServantSkinItemById(servantSkinId);
        var boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        var servantBaseCon = new BaseDisplayObjectContainer();
        view.addChild(servantBaseCon);
        var fun1 = function () {
            var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect.setPosition(150 - 104, GameConfig.stageHeigth - 320);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            servantBaseCon.addChild(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);
            skinTxtEffect.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACCHESSSKINPOPUPVIEW, {
                    wifeId: wifeSkinId,
                    servantId: servantSkinId,
                    wifeNeedText: "acchessShowWifeTopMsg-" + _this.code,
                    servantNeedText: "acchessShowServentTopMsg-" + _this.code,
                    wifeNeed: "",
                    servantNeed: "",
                    isShowWife: false
                });
            }, _this);
            var skinTxt1 = BaseBitmap.create("acchess_exchange2");
            skinTxt1.setPosition(skinTxtEffect.x + skinTxtEffect.width / 2 - skinTxt1.width / 2 + 105, skinTxtEffect.y + skinTxtEffect.height / 2 - skinTxt1.height / 2 + 77);
            servantBaseCon.addChild(skinTxt1);
            egret.Tween.get(skinTxt1, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
            var skinTxteffect = BaseBitmap.create("acchess_exchange2");
            skinTxteffect.setPosition(skinTxt1.x, skinTxt1.y);
            servantBaseCon.addChild(skinTxteffect);
            skinTxteffect.blendMode = egret.BlendMode.ADD;
            skinTxteffect.alpha = 0;
            egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        };
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            ResourceManager.loadResources(this.getBonesResArr(skinCfg.bone), null, function () {
                var servant = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                servantBaseCon.addChild(servant);
                servant.setScale(0.8);
                servant.setPosition(110, GameConfig.stageHeigth - 230 + _this.resetPosY());
                fun1();
            }, null, this);
        }
        else {
            var servant = BaseLoadBitmap.create(skinCfg.body);
            servantBaseCon.addChild(servant);
            servant.setScale(0.85);
            servant.scaleX = -0.85;
            servant.setPosition(305, GameConfig.stageHeigth - 595 + this.resetPosY());
            fun1();
        }
        //佳人
        var wifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinId);
        if (wifeSkinCfg && wifeSkinCfg.bone) {
            boneName = wifeSkinCfg.bone + "_ske";
        }
        var baseCon = new BaseDisplayObjectContainer();
        view.addChild(baseCon);
        var fun2 = function () {
            var skinTxtEffect2 = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect2.setPosition(480 - 104, GameConfig.stageHeigth - 320);
            skinTxtEffect2.blendMode = egret.BlendMode.ADD;
            baseCon.addChild(skinTxtEffect2);
            skinTxtEffect2.playWithTime(-1);
            skinTxtEffect2.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACCHESSSKINPOPUPVIEW, {
                    wifeId: wifeSkinId,
                    servantId: servantSkinId,
                    wifeNeedText: "acchessShowWifeTopMsg-" + _this.code,
                    servantNeedText: "acchessShowServentTopMsg-" + _this.code,
                    wifeNeed: "" + wifeNeedMoney,
                    servantNeed: "" + servantNeedMoney,
                    isShowWife: true
                });
            }, _this);
            var skinTxt3 = BaseBitmap.create("acsearchproofview_common_skintxt");
            skinTxt3.setPosition(skinTxtEffect2.x + skinTxtEffect2.width / 2 - skinTxt3.width / 2 + 105, skinTxtEffect2.y + skinTxtEffect2.height / 2 - skinTxt3.height / 2 + 75);
            baseCon.addChild(skinTxt3);
            egret.Tween.get(skinTxt3, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
            var skinTxt4 = BaseBitmap.create("acsearchproofview_common_skintxt");
            skinTxt4.setPosition(skinTxt3.x, skinTxt3.y);
            baseCon.addChild(skinTxt4);
            skinTxt4.blendMode = egret.BlendMode.ADD;
            skinTxt4.alpha = 0;
            egret.Tween.get(skinTxt4, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        };
        if (wifeSkinCfg && (!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            ResourceManager.loadResources(this.getBonesResArr(wifeSkinCfg.bone), null, function () {
                var wife = App.DragonBonesUtil.getLoadDragonBones(wifeSkinCfg.bone);
                wife.anchorOffsetX = wife.width / 2;
                wife.anchorOffsetY = wife.height;
                baseCon.addChild(wife);
                wife.setPosition(0, 0);
                wife.setScale(0.65);
                wife.setPosition(525, GameConfig.stageHeigth - 190 + _this.resetPosY());
                fun2();
            }, null, this);
        }
        else {
            var wife = BaseLoadBitmap.create(wifeSkinCfg.body);
            baseCon.addChild(wife);
            wife.anchorOffsetX = wife.width / 2;
            wife.anchorOffsetY = wife.height;
            wife.setPosition(0, 0);
            wife.setScale(0.65);
            wife.setPosition(330, GameConfig.stageHeigth - 650 + this.resetPosY());
            fun2();
        }
    };
    AcChessView.prototype.resetPosY = function () {
        return (1136 - GameConfig.stageHeigth) / 2;
    };
    AcChessView.prototype.getBonesResArr = function (name) {
        return [name + "_ske", name + "_tex_json", name + "_tex_png"];
    };
    AcChessView.prototype.tick = function () {
        this._timeTxt.setString(this.vo.acCountDown);
        this._timeTxt.x = this._timebgx + this._timebgwidth / 2 - this._timeTxt.width / 2;
    };
    Object.defineProperty(AcChessView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChessView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChessView.prototype, "acTivityId", {
        get: function () {
            return AcChessView.AID + "-" + AcChessView.CODE;
        },
        enumerable: true,
        configurable: true
    });
    //根据资源名字得到完整资源名字
    AcChessView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcChessView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcChessView.prototype.showStartDialog = function () {
        var localkey = this.vo.aidAndCode + Api.playerVoApi.getPlayerID() + "dialog";
        var lastTime = 0;
        var timeStr = LocalStorageManager.get(localkey);
        if (timeStr && timeStr != "") {
            lastTime = Number(timeStr);
        }
        if (lastTime == this.vo.et) {
            this.chessShowView();
            return;
        }
        LocalStorageManager.set(localkey, String(this.vo.et));
        var view = this;
        var keyStr = "startDialog_" + this.TypeCode;
        var startCfg = view.cfg[keyStr];
        var bgName = "story_bg6";
        ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW, {
            aid: view.aid,
            code: "" + view.TypeCode,
            AVGDialog: startCfg,
            visitId: "1",
            talkKey: "acChessStartTalk_",
            bgName: bgName,
            callBack: this.chessShowView,
        });
    };
    AcChessView.prototype.chessShowView = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACCHESSSHOWVIEW, {
            aid: this.aid,
            code: "" + this.code,
            pnode: this
        });
    };
    AcChessView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._waitObjArr = null;
        this._isQiziEffect = false;
        this._haveTxt = null;
        this._limitTxt = null;
        if (this._proObjArr) {
            for (var i = 0; i < this._proObjArr.length; i++) {
                if (this._proObjArr[i]) {
                    this._proObjArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.processHandle, this);
                }
                if (this._proObjArr[i].parent) {
                    this._proObjArr[i].parent.removeChild(this._proObjArr[i]);
                }
                this._proObjArr[i] = null;
            }
            this._proObjArr = null;
        }
        for (var i = 0; i < this._proEffImg1.length; i++) {
            if (this._proEffImg1[i]) {
                egret.Tween.removeTweens(this._proEffImg1[i]);
                this._proEffImg1[i].dispose();
                this._proEffImg1[i] = null;
            }
        }
        for (var i = 0; i < this._proEffImg2.length; i++) {
            if (this._proEffImg2[i]) {
                egret.Tween.removeTweens(this._proEffImg2[i]);
                this._proEffImg2[i].dispose();
                this._proEffImg2[i] = null;
            }
        }
        for (var i = 0; i < this._chessIconArr.length; i++) {
            this._chessIconArr[i].dispose();
            this._chessIconArr[i] = null;
        }
        this._chessIconArr = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshRed, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHESS_GETNUMREWARDS, this.freshProcess, this);
    };
    AcChessView.AID = null;
    AcChessView.CODE = null;
    AcChessView.IS_SHOW_RECHARGE = false;
    AcChessView.IS_SHOW_PROCESS = 0;
    return AcChessView;
}(AcCommonView));
__reflect(AcChessView.prototype, "AcChessView");
//# sourceMappingURL=AcChessView.js.map