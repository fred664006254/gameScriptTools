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
var AcRedPackView = (function (_super) {
    __extends(AcRedPackView, _super);
    function AcRedPackView() {
        var _this = _super.call(this) || this;
        _this.residueTitle = null;
        _this.residueCount = null;
        _this.title = null;
        _this.goldbg = null;
        _this.goldText = null;
        _this.descText = null;
        _this.timerText = null;
        //抢按钮
        _this.goButton = null;
        //领取按钮
        _this.getButton = null;
        _this.circle = null;
        _this.bottomText = null;
        _this.sendgemnum = 0;
        _this.loginfo = null;
        _this.isRefreshData = false;
        // private aid:string = null;
        _this._isClose = false;
        _this._vo = null;
        _this._scrollView = null;
        return _this;
        // this.aid=App.StringUtil.firstCharToLower(this.getClassName().replace("Ac","").replace("View",""));
    }
    Object.defineProperty(AcRedPackView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRedPackView.prototype, "cfg", {
        get: function () {
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            return cfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRedPackView.prototype, "aid", {
        get: function () {
            return App.StringUtil.firstCharToLower(this.getClassName().replace("Ac", "").replace("View", ""));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRedPackView.prototype, "code", {
        get: function () {
            if (this.param && this.param.data) {
                return this.param.data;
            }
            else {
                return "";
            }
        },
        enumerable: true,
        configurable: true
    });
    AcRedPackView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACREDPACK_REFRESHVO, this.refreshUI, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_GETREDPACKGIFT), this.goBtnCallback, this);
        this._isClose = this.vo.isClose;
        //剩余元宝
        this.residueTitle = BaseBitmap.create("redpack_count");
        this.addChildToContainer(this.residueTitle);
        this.container.width = 640;
        //剩余元宝数量
        this.residueCount = ComponentManager.getBitmapText("0".toString(), "activity_fnt", TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_BIG);
        this.residueCount.setScale(0.8);
        // if(PlatformManager.checkIsThSp()){
        //     this.residueCount["size"] = 50;
        //     this.residueCount["bold"] = true;
        //     this.residueCount.y -= 10;
        // }
        this.addChildToContainer(this.residueCount);
        //恭喜大人抢到
        this.title = BaseBitmap.create("redpack_title");
        this.title.x = this.viewBg.width / 2 - this.title.width / 2;
        this.title.y = this.viewBg.y + 80;
        this.addChildToContainer(this.title);
        //元宝背景
        this.goldbg = BaseBitmap.create("redpack_goldbg1");
        this.goldbg.x = this.viewBg.width / 2 - this.goldbg.width / 2;
        this.goldbg.y = this.viewBg.y + 185;
        this.addChildToContainer(this.goldbg);
        //元宝数量
        this.goldText = ComponentManager.getBitmapText("0".toString(), "activity_fnt", TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_BIG);
        this.goldText.x = this.goldbg.x + 150;
        this.goldText.y = this.goldbg.y + 35;
        // if(PlatformManager.checkIsThLang()){
        //     this.goldText["size"] = 70;
        //     this.goldText["bold"] = true;
        // }
        if (!Api.switchVoApi.checkOpenBMFont()) {
            var goldText = this.goldText;
            goldText.bold = true;
            this.goldText.y = this.goldbg.y + 55;
            var residueCount = this.residueCount;
            residueCount.bold = true;
            residueCount.setScale(1);
        }
        this.addChildToContainer(this.goldText);
        // 抢按钮
        this.goButton = ComponentManager.getButton("redpack_getbtn", null, this.goHandler, this);
        this.goButton.x = this.viewBg.width / 2 - this.goButton.width / 2 - 9;
        this.goButton.y = this.viewBg.y + 235;
        this.addChildToContainer(this.goButton);
        this.circle = BaseBitmap.create("redpack_circle");
        this.circle.anchorOffsetX = this.circle.width / 2;
        this.circle.anchorOffsetY = this.circle.height / 2;
        this.circle.x = this.goButton.x + this.goButton.width / 2 + 15;
        this.circle.y = this.goButton.y + this.goButton.height / 2;
        egret.Tween.get(this.circle, { loop: true }).to({ rotation: this.circle.rotation - 360 }, 10000);
        this.addChildToContainer(this.circle);
        // 领取按钮
        this.getButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acRedPackGetBtn", this.getHandler, this, null, null, 24);
        this.getButton.x = this.viewBg.width / 2 - this.getButton.width / 2;
        this.getButton.y = this.viewBg.y + 355;
        this.getButton.setColor(TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(this.getButton);
        //描述
        this.descText = ComponentManager.getTextField(LanguageManager.getlocal("acRedPackDesc"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.descText.textAlign = egret.HorizontalAlign.CENTER;
        this.descText.lineSpacing = 5;
        this.descText.x = this.viewBg.width / 2 - this.descText.width / 2;
        this.descText.y = this.viewBg.y + 430 - 8;
        // if(PlatformManager.checkIsThSp()){
        //     this.descText.y -= 10;
        // }
        this.addChildToContainer(this.descText);
        var t = this.vo.getAcResidueTime();
        if (t < 0) {
            t = 0;
        }
        var timeTxt = App.DateUtil.getFormatBySecond(t, 1);
        this.timerText = ComponentManager.getTextField(LanguageManager.getlocal("acRedPackTime", [timeTxt]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.timerText.x = this.viewBg.width / 2 - this.timerText.width / 2 + 10;
        this.timerText.y = this.viewBg.y + 494 - 7;
        // if(PlatformManager.checkIsThSp()){
        //     this.timerText.y -= 10;
        // }
        this.addChildToContainer(this.timerText);
        this.bottomText = ComponentManager.getTextField(LanguageManager.getlocal("acRedPackBottom"), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.bottomText.x = this.viewBg.width / 2 - this.bottomText.width / 2;
        this.bottomText.y = this.viewBg.y + 780 - 10;
        this.addChildToContainer(this.bottomText);
        this.initScroll();
        this.refreshUI();
        this.tick();
    };
    AcRedPackView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_GETREDPACKINDEX, requestData: { activeId: this.aid + "-" + this.code } };
    };
    AcRedPackView.prototype.receiveData = function (data) {
        if (!data.ret) {
            App.CommonUtil.showTip(data.data.ret);
        }
        if (data.data.cmd == NetRequestConst.REQUEST_GETREDPACKINDEX) {
            this.loginfo = data.data.data.loginfo;
            this.sendgemnum = Number(data.data.data.sendgemnum);
            if (this.isRefreshData) {
                this.isRefreshData = false;
                if (!this.sendgemnum) {
                    this.sendgemnum = 0;
                }
                var count = this.cfg.getTotalGem() >= this.sendgemnum ? this.cfg.getTotalGem() - this.sendgemnum : 0;
                this.residueCount.text = count + "";
            }
            if (this.viewBg) {
                if (this._scrollView) {
                    this._scrollView.dispose();
                    this._scrollView = null;
                }
                this.initScroll();
            }
        }
    };
    AcRedPackView.prototype.initScroll = function () {
        var content = new BaseDisplayObjectContainer();
        content.width = 450;
        content.height = 210;
        var alphabg = BaseBitmap.create("public_alphabg");
        alphabg.width = content.width;
        alphabg.height = content.height;
        content.addChild(alphabg);
        var infoObj = null;
        var startY = 20;
        if (!this.loginfo || !this.loginfo.length) {
            var emptyText = ComponentManager.getTextField(LanguageManager.getlocal("acRedPackEmpty"), 22, 0xe7d98f);
            emptyText.x = content.width / 2 - emptyText.width / 2;
            emptyText.y = content.height / 2 - emptyText.height / 2;
            content.addChild(emptyText);
        }
        for (var i = 0; i < this.loginfo.length; i++) {
            infoObj = this.loginfo[i];
            var nameText = ComponentManager.getTextField(LanguageManager.getlocal("acRedPackLoop", [infoObj["lname"], infoObj["gemnum"].toString()]), 22, 0xe7d98f);
            nameText.x = 40;
            nameText.y = startY + 30 * i;
            content.addChild(nameText);
        }
        if (startY + 30 * this.loginfo.length + 30 > 220) {
            content.height = startY + 30 * this.loginfo.length + 30;
            alphabg.height = content.height;
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 450, 220);
        var c = ComponentManager.getScrollView(content, rect);
        c.x = this.viewBg.width / 2 - c.width / 2;
        c.y = this.viewBg.y + 535;
        c.bounces = false;
        c.horizontalScrollPolicy = "off";
        this.addChildToContainer(c);
        this._scrollView = c;
    };
    AcRedPackView.prototype.refreshUI = function () {
        this._isClose = this.vo.isClose;
        if (!this.sendgemnum) {
            this.sendgemnum = 0;
        }
        var count = this.cfg.getTotalGem() >= this.sendgemnum ? this.cfg.getTotalGem() - this.sendgemnum : 0;
        this.residueCount.text = count + "";
        this.residueTitle.x = GameConfig.stageWidth / 2 - (this.residueTitle.width + 10 + this.residueCount.width) / 2;
        this.residueCount.x = this.residueTitle.x + this.residueTitle.width + 10;
        var n = this.vo.getAddgem();
        n = n >= 0 ? n : 0;
        this.goldText.text = n + "";
        if (this._isClose) {
            this.viewBg.setload("redpack_close1");
            this.residueTitle.x = this.viewBg.width / 2 - this.residueTitle.width / 2 + 7;
            this.residueCount.x = this.viewBg.width / 2 - this.residueCount.textWidth / 2 + 15;
            this.residueTitle.y = this.viewBg.y + 115;
            this.residueCount.y = this.residueTitle.y + this.residueTitle.height / 2 - this.residueCount.height * this.residueCount.scaleY / 2 + 55;
            this.title.visible = false;
            this.goldbg.visible = false;
            this.goldText.visible = false;
            this.goButton.visible = true;
            this.circle.visible = true;
            this.getButton.visible = false;
            this.descText.visible = false;
            this.closeBtn.x = this.viewBg.width - this.closeBtn.width - 10;
            this.closeBtn.y = this.viewBg.y + 120;
            if (count == 0) {
                this.goButton.setEnable(false);
                this.circle.visible = false;
            }
        }
        else {
            this.viewBg.setload("redpack_open1");
            this.residueTitle.y = this.viewBg.y + 10;
            this.residueCount.y = this.residueTitle.y + this.residueTitle.height / 2 - this.residueCount.height * this.residueCount.scaleY / 2 + 5;
            if (!Api.switchVoApi.checkOpenBMFont()) {
                this.residueCount.y = this.residueTitle.y + this.residueTitle.height / 2 - this.residueCount.height * this.residueCount.scaleY / 2 + 15;
            }
            this.title.visible = true;
            this.goldbg.visible = true;
            this.goldText.visible = true;
            this.goButton.visible = false;
            this.circle.visible = false;
            this.getButton.visible = true;
            this.descText.visible = true;
            if (this.vo.btnStatus == 0) {
                this.getButton.setEnable(true);
                this.getButton.setText("acRedPackGetBtn");
            }
            else if (this.vo.btnStatus == 1) {
                this.getButton.setEnable(true);
                this.getButton.setText("acRedPackGetBtn");
            }
            else {
                this.getButton.setEnable(false);
                this.getButton.setText("acRedPackGetOverBtn");
            }
            this.closeBtn.x = this.viewBg.width - this.closeBtn.width - 10;
            this.closeBtn.y = this.viewBg.y + 43;
        }
    };
    AcRedPackView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("redpack_close1");
        this.viewBg.width = 640;
        this.viewBg.height = 896;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    /**
     * 重新一下关闭按钮
     * 仅适用于新的分享
     */
    AcRedPackView.prototype.getCloseBtnName = function () {
        return ButtonConst.POPUP_CLOSE_BTN_2;
    };
    /**
     * 重置背景的高度 主要设置 btn的位置
     * 仅适用于新的分享
     */
    AcRedPackView.prototype.resetBgSize = function () {
        this.closeBtn.setScale(0.9);
        if (this._isClose) {
            this.closeBtn.x = this.viewBg.width - this.closeBtn.width - 10;
            this.closeBtn.y = this.viewBg.y + 120;
        }
        else {
            this.closeBtn.x = this.viewBg.width - this.closeBtn.width - 10;
            this.closeBtn.y = this.viewBg.y + 43;
        }
    };
    AcRedPackView.prototype.getTitleStr = function () {
        return null;
    };
    AcRedPackView.prototype.goHandler = function () {
        var t = this.vo.et - GameData.serverTime;
        if (t < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this.vo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acRedPackShowTips1"));
            return;
        }
        if (!this.sendgemnum) {
            this.sendgemnum = 0;
        }
        var count = this.cfg.getTotalGem() >= this.sendgemnum ? this.cfg.getTotalGem() - this.sendgemnum : 0;
        if (count <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acRedPackZero"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_GETREDPACKGIFT, { activeId: this.aid + "-" + this.code, opentype: 1 });
    };
    AcRedPackView.prototype.goBtnCallback = function (event) {
        if (event.data.data.ret == 0) {
            var num = event.data.data.data.addgem;
            var n = num && num >= 0 ? num : 0;
            this.vo.setAddgem(n);
            this.goldText.text = n + "";
            var err = event.data.data.data.errorTag ? Number(event.data.data.data.errorTag) : 0;
            if (err == 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acRedPackZero"));
                this.isRefreshData = true;
                var equestData = this.getRequestData();
                this.request(equestData.requestType, equestData.requestData);
            }
            else {
                //0-->跳转充值 1-->可领取 2-->已经领取
                if (this.vo.btnStatus == 0) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACREDPACKRESULTVIEW, { aid: this.aid, code: this.code, parentNode: this });
                }
                else if (this.vo.btnStatus == 1) {
                    App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_GETREDPACKGIFT), this.goBtnCallback, this);
                    App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_GETREDPACKGIFT), this.getBtnCallback, this);
                    NetManager.request(NetRequestConst.REQUEST_GETREDPACKGIFT, { activeId: this.aid + "-" + this.code, opentype: 2 });
                }
            }
        }
    };
    AcRedPackView.prototype.getHandler = function () {
        var t = this.vo.et - GameData.serverTime;
        if (t < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        //0-->跳转充值 1-->可领取 2-->已经领取
        if (this.vo.btnStatus == 0) {
            if (this.vo.checkIsInEndShowTime()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acRedPackShowTips2"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACREDPACKRESULTVIEW, { aid: this.aid, code: this.code, parentNode: this });
        }
        else if (this.vo.btnStatus == 1) {
            App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_GETREDPACKGIFT), this.goBtnCallback, this);
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_GETREDPACKGIFT), this.getBtnCallback, this);
            NetManager.request(NetRequestConst.REQUEST_GETREDPACKGIFT, { activeId: this.aid + "-" + this.code, opentype: 2 });
        }
    };
    AcRedPackView.prototype.getBtnCallback = function (event) {
        if (event.data.data.ret == 0) {
            var num = event.data.data.data.addgem;
            var n = num ? num : 0;
            if (n > 0) {
                var p = new egret.Point(this.getButton.x + this.getButton.width / 2, this.getButton.y + this.getButton.height / 2);
                var rewardList = GameData.formatRewardItem("1_1001_" + n);
                App.CommonUtil.playRewardFlyAction(rewardList, p);
                this.sendgemnum += num;
                this.refreshUI();
                NetManager.request(NetRequestConst.REQUEST_GETREDPACKINDEX, { activeId: this.aid + "-" + this.code });
            }
        }
    };
    AcRedPackView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "activity_fnt", "redpack_circle", "redpack_count",
            "redpack_getbtn", "redpack_goldbg1", "redpack_title"
        ]);
    };
    AcRedPackView.prototype.tick = function () {
        var t = this.vo.getAcResidueTime();
        if (t < 0) {
            t = 0;
            TickManager.removeTick(this.tick, this);
            this.timerText.text = LanguageManager.getlocal("acPunishEnd");
            this.timerText.x = this.viewBg.width / 2 - this.timerText.width / 2 + 10;
        }
        else {
            var t_1 = this.vo.getAcResidueTime();
            if (t_1 < 0) {
                t_1 = 0;
            }
            var timeTxt = App.DateUtil.getFormatBySecond(t_1, 1);
            this.timerText.text = LanguageManager.getlocal("acRedPackTime", [timeTxt]);
            this.timerText.x = this.viewBg.width / 2 - this.timerText.width / 2 + 10;
        }
        if (this.vo.checkIsInEndShowTime()) {
            this.timerText.text = LanguageManager.getlocal("acPunishEnd");
            this.timerText.x = this.viewBg.width / 2 - this.timerText.width / 2 + 10;
            if (this.goButton.visible) {
                this.goButton.setGray(true);
                this.circle.visible = false;
            }
            if (this.getButton.visible) {
                if (this.vo.btnStatus == 1) {
                    this.getButton.setGray(false);
                }
                else {
                    this.getButton.setGray(true);
                }
            }
        }
    };
    AcRedPackView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACREDPACK_REFRESHVO, this.refreshUI, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_GETREDPACKGIFT), this.goBtnCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_GETREDPACKGIFT), this.getBtnCallback, this);
        this.residueTitle = null;
        this.residueCount = null;
        this.title = null;
        this.goldbg = null;
        this.goldText = null;
        this.descText = null;
        this.timerText = null;
        if (this._scrollView) {
            this._scrollView.dispose();
            this._scrollView = null;
        }
        //抢按钮
        this.goButton = null;
        //领取按钮
        this.getButton = null;
        this.bottomText = null;
        this.sendgemnum = 0;
        this.loginfo = null;
        egret.Tween.removeTweens(this.circle);
        this.circle = null;
        this._isClose = false;
        this.isRefreshData = false;
        this._vo = null;
        _super.prototype.dispose.call(this);
    };
    return AcRedPackView;
}(PopupView));
__reflect(AcRedPackView.prototype, "AcRedPackView");
//# sourceMappingURL=AcRedPackView.js.map