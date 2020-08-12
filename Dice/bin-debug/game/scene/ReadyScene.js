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
var ReadyScene = /** @class */ (function (_super) {
    __extends(ReadyScene, _super);
    function ReadyScene() {
        var _this = _super.call(this) || this;
        _this._MyCardTabName = "MyCardTeamType";
        _this._mycardgroup = null;
        _this._teamid = 1;
        // war order
        _this._warOrder = null;
        _this._isBegin = false;
        _this.huangguan = null;
        _this.freegetall = null;
        _this.warbox = null;
        _this.getall = null;
        _this.tiao = null;
        _this.waritem = null;
        // battle
        _this.battle = null;
        _this.pveTip = {};
        _this.bossIcon = null;
        _this.bossTile = null;
        _this.tileName = null;
        _this.lastBossIndex = 0;
        _this.bossTab = null;
        _this.sNum = 0;
        _this.laseCardNum = 0;
        _this.wacthad1 = null;
        _this.huo = null;
        _this.dtime1 = 600;
        _this.dtime2 = 3000;
        _this._taskdbArr = [];
        _this._extendtip = null;
        _this._battleType = 0;
        _this._findTime = 0;
        _this._findTimeCount = -1;
        _this._findNum = 1;
        _this._end = false;
        return _this;
    }
    ReadyScene.prototype.dispose = function () {
        var view = this;
        egret.Tween.removeTweens(this.warbox);
        console.log(new Date());
        view._teamid = 1;
        view._mycardgroup = null;
        this.tiao = null;
        this.waritem = null;
        this.freegetall = null;
        this.getall = null;
        this.warbox = null;
        this.huo = null;
        this.huangguan = null;
        this.battle = null;
        this.laseCardNum = 0;
        this.lastBossIndex = 0;
        this.wacthad1 = null;
        this.taskNum1 = null;
        this.taskNumBg1 = null;
        this.sNum = 0;
        this.bossTab = null;
        this.tileName = null;
        this.bossIcon = null;
        this.bossTile = null;
        this.warOrderNum = null;
        this.warProgress = null;
        this.inviteRedPiont = null;
        this.menuRedPiont = null;
        this.trideName = null;
        this.userName = null;
        this.infoCapNum = null;
        this.taskBtn = null;
        this.taskNumBg = null;
        this.taskNum = null;
        this.taskProgress = null;
        this.pveBtnTxt = null;
        this.pvpBtn = null;
        this.pveTip = null;
        this.pveBtn = null;
        this.warCrown = null;
        this.warHaveBuyGroup = null;
        view.warRewardGroup = null;
        view._isBegin = false;
        view._warOrder = null;
        for (var i in view._taskdbArr) {
            var unit = view._taskdbArr[i];
            if (unit) {
                unit.dispose();
                unit = null;
            }
        }
        view._taskdbArr = null;
        this._extendtip = null;
        this.firstRecEnterBtn = null;
        this.firstRecEnterBtnLabel = null;
        this.firstRecEnterBtnLight = null;
        view._findTime = 0;
        if (view._findTimeCount != -1) {
            egret.clearTimeout(view._findTimeCount);
            view._findTimeCount = -1;
        }
        view._findNum = 1;
        _super.prototype.dispose.call(this);
    };
    ReadyScene.prototype.init = function () {
        _super.prototype.init.call(this);
        this.name = "ReadyScene";
        var view = this;
        view.width = GameConfig.stageWidth;
        this.nameInfoView(view);
        //协同宝箱部分
        var task = view.taskView();
        // 任务部分
        var taskBtn = ComponentMgr.getButton("ab_task_icon_bg", "", function () {
            ViewController.getInstance().openView(ViewConst.TASK_POPUPVIEW, {});
        }, this);
        this.addChild(taskBtn);
        taskBtn.x = task.x + task.width;
        taskBtn.y = task.y + 1;
        var icon = BaseBitmap.create("real_task_icon");
        taskBtn.addChild(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, icon, taskBtn, [0, 0]);
        icon.y = -13;
        var txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
        txt.stroke = 2;
        txt.strokeColor = ColorEnums.black;
        taskBtn.addChild(txt);
        txt.text = LangMger.getlocal("readytask");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, txt, taskBtn, [0, 0]);
        txt.y = 75;
        var redbg = BaseBitmap.create("public_reward_tip_bg");
        redbg.x = -9;
        redbg.y = -4;
        taskBtn.addChild(redbg);
        this.taskNumBg1 = redbg;
        var resNum = ComponentMgr.getTextField("1", TextFieldConst.SIZE_20, ColorEnums.white, false);
        resNum.width = redbg.width;
        resNum.textAlign = egret.HorizontalAlign.CENTER;
        resNum.x = redbg.x;
        resNum.y = redbg.y + (redbg.height - resNum.height) / 2;
        resNum.stroke = 1;
        //resNum.strokeColor = 
        taskBtn.addChild(resNum);
        this.taskNum1 = resNum;
        // 战令部分
        var warOrder = view.warOrderView();
        warOrder.anchorOffsetX = warOrder.width / 2;
        warOrder.anchorOffsetY = warOrder.height / 2;
        warOrder.x = taskBtn.x + task.width + warOrder.anchorOffsetX;
        warOrder.y = taskBtn.y + warOrder.anchorOffsetY;
        view.addChild(warOrder);
        view._warOrder = warOrder;
        //选取卡组部分
        var group = view.createCardGroup();
        var autoX = GameConfig.stageHeigth - group.y - group.height - 117;
        autoX = autoX / 2;
        var battle = view.battleView();
        battle.x = 0;
        battle.y = group.y + group.height + autoX - battle.height / 2;
        view.addChild(battle);
        view.refresh();
        var tab = Api.LineVoApi.getCurLine() - 1;
        if (tab) {
            view.clickTabbarHandler({ index: tab, no: true });
            view.selectedTabIndex = tab;
            view.tabbarGroup.selectedIndex = tab;
        }
        this.refreshFirstRecBtn();
        // this.openNoticePopupView();
        //弹出每日签到
        if (Api.SwitchVoApi.checkOpenSign()) {
            if (Api.GameinfoVoApi.getIsFinishNewGuide()) {
                if (!Api.SigninfoVoApi.gethasSign()) {
                    this.freshSignRedPiont();
                    ViewController.getInstance().openView(ViewConst.SINGINPOPUPVIEW, {});
                }
            }
            return;
        }
    };
    /**
     * 打开公告
     */
    ReadyScene.prototype.openNoticePopupView = function () {
        var isDaliy = true;
        var __isDaliyTip = parseInt(App.CommonUtil.getLocalStorageWithUid(LocalStorageConst.LOCAL_NOTICE_NOT_TIP));
        if (!__isDaliyTip) {
            isDaliy = false;
        }
        else {
            var _now = Math.floor(new Date().getTime() / 1000);
            isDaliy = App.DateUtil.isSameDay(_now, __isDaliyTip);
        }
        if (!isDaliy) {
            ViewController.getInstance().openView(ViewConst.NOTICEPOPUPVIEW, {});
        }
    };
    ReadyScene.prototype.openSignView = function () {
        if (Api.GameinfoVoApi.getIsFinishNewGuide() && Api.SwitchVoApi.checkOpenSign()) {
            this.freshSignRedPiont();
            if (!Api.SigninfoVoApi.gethasSign()) {
                ViewController.getInstance().openView(ViewConst.SINGINPOPUPVIEW, {});
            }
        }
    };
    ReadyScene.prototype.getMsgConstEventArr = function () {
        return [
            MsgConst.MODEL_USERINFO, MsgConst.MODEL_DAILYTASK, MsgConst.MODEL_GAMEINFO, MsgConst.MODEL_MYMAIL, MsgConst.FLY_EFFECT, MsgConst.FINISH_GUIDE_BUBBLE,
            MsgConst.MODEL_SIGNINFO, "loadtoshowddddd", MsgConst.MODEL_INVITEFRIEND, MsgConst.MODEL_ACHIEVEMENT
        ];
    };
    ReadyScene.prototype.getNetConstEventArr = function () {
        return [
            NetConst.USER_OPENCARDBOX, NetConst.ADVERTISE_WATCH, NetConst.SIGNINFO_SIGN, NetConst.BATTLE_FIND
        ];
    };
    ReadyScene.prototype.msgEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case MsgConst.MODEL_USERINFO:
            case MsgConst.MODEL_GAMEINFO:
                view.refresh();
                break;
            case MsgConst.MODEL_INVITEFRIEND:
                view.redPiont();
                break;
            case MsgConst.MODEL_DAILYTASK:
            case MsgConst.MODEL_ACHIEVEMENT:
                view.freshTask();
                break;
            case MsgConst.MODEL_MYMAIL:
                view.freshMailRedPiont();
                break;
            case MsgConst.FLY_EFFECT:
                view.playeffect();
                break;
            case MsgConst.FINISH_GUIDE_BUBBLE:
                view.openSignView();
                view.guidebubble();
                break;
            case MsgConst.MODEL_SIGNINFO:
                view.refreshFirstRecBtn();
                break;
            case "loadtoshowddddd":
                view.shownn();
                break;
            default:
                break;
        }
    };
    ReadyScene.prototype.netEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case NetConst.USER_OPENCARDBOX:
                view.openCardBox(evt);
                break;
            case NetConst.ADVERTISE_WATCH:
                view.wacthAdsuccess(evt);
                break;
            case NetConst.SIGNINFO_SIGN:
                view.freshSignRedPiont();
                break;
            case NetConst.BATTLE_FIND:
                view.findResult(evt);
                break;
            default:
                break;
        }
    };
    ReadyScene.prototype.findResult = function (e) {
        if (Api.GameinfoVoApi.checlIsInGuideId(1)) {
            var isSuccess = false;
            //type 1对战 2协同
            var type = 1;
            var rdata = e.data;
            if (rdata.ret) {
                var result = rdata.data.data.matchFlag;
                if (result) {
                    if (result == 1) {
                        if (rdata.data.data.randSeed) {
                            BattleStatus.randSeed = rdata.data.data.randSeed;
                        }
                        if (type == 2) {
                            Api.UserinfoVoApi.setFreshCard(false);
                        }
                        isSuccess = true;
                        if (Api.GameinfoVoApi.checlIsInGuideId(1)) {
                            App.CommonUtil.sendNewGuideId(1);
                            Api.GameinfoVoApi.setCurGudingId(2);
                            App.MsgHelper.removeEvt(NetConst.BATTLE_FIND, this.findResult, this);
                        }
                        Api.BattleVoApi.startBattle(type + '');
                    }
                    else if (result == 2) {
                        isSuccess = true;
                        App.CommonUtil.showTip(LangMger.getlocal("warcreateroomtip8"));
                    }
                }
            }
            if (!isSuccess) {
                var t = egret.getTimer() - this._findTime;
                if (t >= 980) {
                    this.find();
                }
                else {
                    this._findTimeCount = egret.setTimeout(this.find, this, 1000 - t);
                }
            }
        }
    };
    ReadyScene.prototype.guidebubble = function () {
        var _this = this;
        //最高等级是2级以下账号，在对战模式和协作模式那里，出间歇性文字气泡
        var maxScore = Api.UserinfoVoApi.getMaxScore();
        var needScore = Config.LevelCfg.getLevelNeedScore(2);
        if (maxScore <= needScore && Api.GameinfoVoApi.getIsFinishNewGuide()) {
            var left_1 = true;
            egret.Tween.get(this, { loop: true }).wait(5000).call(function () {
                maxScore = Api.UserinfoVoApi.getMaxScore();
                if (maxScore <= needScore) {
                    var btn = left_1 ? _this.pvpBtn : _this.pveBtn;
                    var point = new egret.Point(btn.localToGlobal().x + btn.width / 2 + (left_1 ? -40 : 0), btn.localToGlobal().y - 20);
                    var exttip = new ExtendTip("ready_bubble"); //ready_bubble
                    exttip.init(LangMger.getlocal("readybattletip" + (left_1 ? 1 : 2)), point, false, 300, egret.HorizontalAlign.CENTER, 3000);
                    if (left_1) {
                        exttip.bg.scaleX = 1;
                        exttip.bg.x = 0;
                    }
                    else {
                        exttip.bg.scaleX = -1;
                        exttip.bg.x = exttip.bg.width;
                    }
                    _this.addChild(exttip);
                    left_1 = !left_1;
                }
                else {
                    egret.Tween.removeTweens(_this);
                }
                var hand = _this.battle.getChildByName("hand");
                if (Api.UserinfoVoApi.getSumb() < 4) {
                    if (!hand) {
                        hand = BaseBitmap.create("guide_hand");
                        hand.touchEnabled = false;
                        hand.name = "hand";
                        _this.battle.addChild(hand);
                        hand.setPosition(_this.pvpBtn.x + _this.pvpBtn.width / 2, _this.pvpBtn.y + _this.pvpBtn.height / 2 - 20);
                        egret.Tween.get(hand, { loop: true })
                            .to({ scaleX: 0.9, scaleY: 0.9 }, 500)
                            .to({ scaleX: 1, scaleY: 1 }, 500);
                    }
                }
                else {
                    if (hand) {
                        hand.dispose();
                        hand = null;
                    }
                }
            }).wait(5000);
        }
    };
    ReadyScene.prototype.warOrderHandler = function (event) {
        var view = this;
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                view._isBegin = true;
                view.scaleState();
                SoundMgr.playEffect(SoundConst.EFFECT_CLICK);
                break;
            case egret.TouchEvent.TOUCH_END:
                if (view._isBegin) {
                    view._isBegin = false;
                    view.scaleState();
                    ViewController.getInstance().openView(ViewConst.ROYALPASSVIEW, {});
                }
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                view._isBegin = false;
                view.scaleState();
                break;
        }
    };
    ReadyScene.prototype.scaleState = function () {
        var view = this;
        var lastScaleX = view.scaleX;
        var lastScaleY = view.scaleY;
        if (view._isBegin == true) {
            view._warOrder.scaleX *= 0.9;
            view._warOrder.scaleY *= 0.9;
        }
        else {
            view._warOrder.scaleX /= 0.9;
            view._warOrder.scaleY /= 0.9;
        }
        // view._warOrder.x+=(view._warOrder.width*lastScaleX-view._warOrder.width*view._warOrder.scaleX)/2;
        // view._warOrder.y+=(view._warOrder.height*lastScaleY-view._warOrder.height*view._warOrder.scaleY)/2;
    };
    // tick 处理
    ReadyScene.prototype.tick = function () {
        this.sNum++;
        if (this.sNum >= 5) {
            this.lastBossIndex++;
            this.lastBossIndex = this.lastBossIndex % Config.MonsterCfg.getBossNum();
            this.bossTabOnclick({ index: this.lastBossIndex });
        }
        if (!PlatMgr.checkIsIOSShenheSp() && this.wacthad1) {
            if (!Api.GameinfoVoApi.getIsGuiding()) {
                this.wacthad1.visible = Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_3) && !Api.GameinfoVoApi.getADhuo();
                this.wacthad1.setGray(!Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_3));
                // Api.AdvertiseVoApi.setPlayHuo(!Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_3));
                this.huo.visible = Api.GameinfoVoApi.getADhuo();
            }
            else {
                this.wacthad1.visible = false;
            }
        }
        if (this.pveTip["dtime"]) {
            this.pveTip["dtime"].text = "" + App.DateUtil.getFormatBySecond(Api.ShopVoApi.getTodayRefresLimitTime());
        }
        if (this.pveTip["wacthAD"]) {
            this.pveTip["wacthAD"].visible = true && Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_4) && (Api.GameinfoVoApi.getOperationNum() <= 0);
            this.pveTip["wacthAD"].setGray(!Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_4));
        }
    };
    // 播放动效
    ReadyScene.prototype.playeffect = function () {
        var _this = this;
        Api.UserinfoVoApi.setFreshCard(true);
        App.CommonUtil.showCollectEffect("task_power", new egret.Point(320, 567), new egret.Point(60, 200), function () {
            _this.freshTask();
        });
    };
    // 刷新整个界面
    ReadyScene.prototype.refresh = function () {
        if (this.userName) {
            this.userName.text = Api.UserinfoVoApi.getName();
            this.redPiont();
        }
        if (this.trideName) {
            this.trideName.text = (Api.UserinfoVoApi.getMygname() == "") ? LangMger.getlocal("readyscene_no_tribe") : Api.UserinfoVoApi.getMygname();
        }
        if (this.infoCapNum) {
            this.infoCapNum.text = App.StringUtil.formatIntToStringWith3figure(Api.UserinfoVoApi.getScore(), 3);
        }
        this.freshTask();
        if (this.warProgress) {
            var score = Api.UserinfoVoApi.getScore();
            var curid = Config.RoyalpassCfg.getNowProgressId(score);
            var prevNeed = Config.RoyalpassCfg.getPrevNeedByScore(score);
            var nextNeed = Api.GameinfoVoApi.getRoyalFirstNotReward(Api.UserinfoVoApi.getMaxScore()); // Config.RoyalpassCfg.getNextNeedByScore(score);
            var maxlevel = !nextNeed;
            var isgetall = Api.GameinfoVoApi.isGetAllRoyalPassReard();
            var isgetRoyalpass = Api.GameinfoVoApi.getIsBuyRoyalPass();
            var str = "";
            var per = 0;
            if (isgetall || maxlevel) {
                str = score + "/" + nextNeed;
                if (isgetall) {
                    this.tiao.visible = this.warProgress.visible = this.warbox.visible = false;
                    this.freegetall.visible = !isgetRoyalpass;
                    this.waritem.visible = !isgetRoyalpass;
                    this.getall.visible = isgetRoyalpass;
                    // this.warProgress.setText(LangMger.getlocal(isgetRoyalpass ? `royalpassgetall` : `royalpassgmore`));
                    // this.warProgress.setTextSize(TextFieldConst.SIZE_18);
                }
                per = 1;
            }
            else {
                this.tiao.visible = this.warProgress.visible = this.warbox.visible = true;
                this.waritem.visible = true;
                this.freegetall.visible = false;
                this.getall.visible = false;
                str = score + "/" + nextNeed;
                per = score / nextNeed;
                // str = `${score - prevNeed}/${nextNeed - prevNeed}`;
                // per =  score >= prevNeed ? ((score - prevNeed)/(nextNeed - prevNeed)) : 0;
                this.warProgress.setText("");
            }
            this.warOrderNum.text = str;
            this.warProgress.setPercentage(per);
            this.warHaveBuyGroup.visible = isgetRoyalpass;
            this.huangguan.visible = this.warCrown.visible = !this.warHaveBuyGroup.visible;
            this.warRewardGroup.visible = Api.GameinfoVoApi.checkRedPoint();
            if (Api.GameinfoVoApi.checkRedPoint()) {
                // 第一下 0.1秒从0向左16度 然后0.1秒向右摆30度，然后0.1秒向左摆26度，然后0.2秒向右摆20度，然后0.2秒向左摆15度，然后0.2秒向右摆10度，然后用0.2秒向左摆5度回到0.
                egret.Tween.get(this.warbox, { loop: true })
                    .to({ rotation: 16 }, 100)
                    .to({ rotation: -14 }, 100)
                    .to({ rotation: 12 }, 100)
                    .to({ rotation: -8 }, 200)
                    .to({ rotation: 7 }, 200)
                    .to({ rotation: -3 }, 200)
                    .to({ rotation: 0 }, 200)
                    .wait(200);
            }
            else {
                egret.Tween.removeTweens(this.warbox);
            }
        }
        if (this.pveBtnTxt) {
            this.pveBtnTxt.text = Api.GameinfoVoApi.getOperationNum() + "/" + Config.TogetherCfg.getOperationMaxNum();
            if (Api.GameinfoVoApi.getOperationNum() > 0) {
                this.pveTip["pvp2"].visible = false;
                this.pveTip["wacthAD"].visible = false;
                this.pveBtnTxt.setColor(ColorEnums.white);
                this.pveBtnTxt.strokeColor = ColorEnums.strokeBlue;
                // } else if (!Api.GameinfoVoApi.getIsBuyAssitance()) {
                // 	this.pveBtnTxt.setColor(ColorEnums.red2);
                // 	this.pveBtnTxt.strokeColor = ColorEnums.white;
                // 	this.pveTip["tipIcon"].texture = ResMgr.getRes("shopassisticon");
                // 	this.pveTip["tipTxt"].text = LangMger.getlocal("opration_better");
                // 	this.pveTip["mask_op"].visible = true;
                // 	this.pveTip["tipIcon"].visible = true;
                // 	this.pveTip["tipTxt"].visible = true;
                // 	this.pveTip["wacthAD"].visible = false;
                // 	this.pveTip["tipIcon"].scaleX = this.pveTip["tipIcon"].scaleY = 0.7;
                // 	App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this.pveTip["tipIcon"], this.pveTip["mask_op"], [0,0]);
                // 	App.DisplayUtil.setLayoutPosition(LayoutConst.verticalCenter, this.pveTip["tipTxt"], this.pveTip["mask_op"], [0,0]);
                // 	this.pveTip["tipTxt"].x = this.pveTip["tipIcon"].x + this.pveTip["tipIcon"].width * 0.7;
            }
            else {
                this.pveBtnTxt.setColor(ColorEnums.red2);
                this.pveBtnTxt.strokeColor = ColorEnums.white;
                this.pveTip["dtime"].text = "" + App.DateUtil.getFormatBySecond(Api.ShopVoApi.getTodayRefresLimitTime());
                this.pveTip["pvp2"].visible = true;
                this.pveTip["wacthAD"].visible = true && Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_4);
                this.pveTip["wacthAD"].setGray(!Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_4));
                if (PlatMgr.checkIsIOSShenheSp()) {
                    this.pveTip["wacthAD"].visible = false;
                }
            }
        }
        if (this.tileName) {
            this.tileName.text = LangMger.getlocal("dice_battle_skin_title_" + Api.LineVoApi.getCurSkin());
        }
        if (this.wacthad1) {
            if (Api.GameinfoVoApi.getIsGuiding()) {
                this.wacthad1.visible = false;
            }
            else {
                this.wacthad1.visible = Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_3) && !Api.GameinfoVoApi.getADhuo();
                this.wacthad1.setGray(!Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_3));
                this.battle.setChildIndex(this.wacthad1, this.battle.getChildIndex(this.pvpBtn) + 1);
                this.huo.visible = Api.GameinfoVoApi.getADhuo();
                //IOS提审时不显示广告按钮
                if (PlatMgr.checkIsIOSShenheSp()) {
                    this.wacthad1.visible = false;
                }
            }
            // this.wacthad1.visible = Api.GameinfoVoApi.getIsGuiding();	
        }
    };
    // 协同宝箱刷新
    ReadyScene.prototype.freshTask = function () {
        var _this = this;
        if (!Api.UserinfoVoApi.getFreshCard()) {
            return;
        }
        var boxnum = Api.UserinfoVoApi.getCardBox(); //  Api.UserinfoVoApi.getCardBox() +
        if (this.taskNum) {
            if (boxnum > 0) {
                this.taskNum.text = String((boxnum > 99) ? 99 : boxnum);
                ;
                // this.taskBtn.setBtnBitMap("task_yellow");
                this.taskNum.visible = true;
                this.taskNumBg.visible = true;
                for (var i in this._taskdbArr) {
                    var unit = this._taskdbArr[i];
                    if (unit) {
                        unit.visible = true;
                    }
                }
            }
            else {
                this.taskBtn.setBtnBitMap("ab_task_icon_bg");
                this.taskNum.visible = false;
                this.taskNumBg.visible = false;
                for (var i in this._taskdbArr) {
                    var unit = this._taskdbArr[i];
                    if (unit) {
                        unit.visible = false;
                    }
                }
            }
        }
        if (this.taskProgress) {
            var curcap = Api.UserinfoVoApi.getPorgressInfo().curCard;
            curcap = (curcap > 999) ? 999 : curcap;
            var view_1 = this;
            if (curcap > 99 || Api.UserinfoVoApi.getPorgressInfo().needcard > 99) {
                view_1.taskProgress.setTextSize(TextFieldConst.SIZE_20);
            }
            else {
                view_1.taskProgress.setTextSize(TextFieldConst.SIZE_24);
            }
            if (Api.UserinfoVoApi.getStatus() == 1) {
                this.laseCardNum = curcap;
                this.taskProgress.setPercentage(Api.UserinfoVoApi.getPorgressInfo().por, curcap + "/" + Api.UserinfoVoApi.getPorgressInfo().needcard);
                Api.UserinfoVoApi.setStatus(2);
            }
            else {
                App.CommonUtil.changeNumTween(this.laseCardNum > curcap ? 0 : this.laseCardNum, curcap, 500, function (num) {
                    view_1.taskProgress.setText(num + "/" + Api.UserinfoVoApi.getPorgressInfo().needcard);
                });
                var por = this.taskProgress.getPercent();
                if (por > Api.UserinfoVoApi.getPorgressInfo().por) {
                    this.taskProgress.setPercentage(0);
                }
                this.taskProgress.tweenTo(Api.UserinfoVoApi.getPorgressInfo().por, 1500, null, function () {
                    _this.taskProgress.setPercentage(Api.UserinfoVoApi.getPorgressInfo().por);
                }, this);
                // this.taskProgress.setPercentage(Api.UserinfoVoApi.getPorgressInfo().por);
                this.laseCardNum = curcap;
            }
        }
        if (this.taskNum1) {
            var tasknum = Api.DailytaskVoApi.getDailyBox() + Api.AchievementVoApi.getAchCanRewardNum();
            if (tasknum > 0) {
                this.taskNum1.text = String((tasknum > 99) ? 99 : tasknum);
                // this.taskBtn.setBtnBitMap("task_yellow");
                this.taskNum1.visible = true;
                this.taskNumBg1.visible = true;
            }
            else {
                this.taskNum1.visible = false;
                this.taskNumBg1.visible = false;
            }
        }
    };
    // 刷新邮件红点
    ReadyScene.prototype.freshMailRedPiont = function () {
        this.menuRedPiont.visible = Api.MymailVoApi.hasUnreadMail();
        Api.RedpointVoApi.setRedPointStatus("mymail", Api.MymailVoApi.hasUnreadMail());
    };
    ReadyScene.prototype.redPiont = function () {
        this.inviteRedPiont.visible = Api.InviteFriendVoApi.checkRedPoint();
        this.menuRedPiont.visible = Api.RedpointVoApi.checkRedPoint("mysign") || Api.RedpointVoApi.checkRedPoint("mymail");
    };
    // 刷新签到红点
    ReadyScene.prototype.freshSignRedPiont = function () {
        if (Api.SwitchVoApi.checkOpenSign()) {
            if (Api.GameinfoVoApi.getIsFinishNewGuide()) {
                this.menuRedPiont.visible = Api.SigninfoVoApi.getSignHsa();
                Api.RedpointVoApi.setRedPointStatus("mysign", Api.SigninfoVoApi.getSignHsa());
            }
            return;
        }
    };
    ReadyScene.prototype.nameInfoView = function (view) {
        // view 容器
        var nameView = new BaseDisplayObjectContainer();
        nameView.width = GameConfig.stageWidth - 10;
        nameView.x = 5;
        nameView.y = 80;
        view.addChild(nameView);
        var userInfoBtn = ComponentMgr.getButton("ab_userinfo_bg", "", this.infoOnclickHandler, this);
        nameView.addChild(userInfoBtn);
        userInfoBtn.x = 0;
        userInfoBtn.y = 0;
        // userInfoBtn.setBtnSize(480, 71);
        var tribe = BaseBitmap.create("ab_tribe_icon");
        userInfoBtn.addChild(tribe);
        tribe.x = 20;
        tribe.y = 7;
        var txtcon = new BaseDisplayObjectContainer();
        txtcon.x = tribe.x + tribe.width + 20;
        txtcon.height = userInfoBtn.height;
        txtcon.y = 0;
        userInfoBtn.addChild(txtcon);
        // 名字
        var nameText = ComponentMgr.getTextField("这是玩家名字", TextFieldConst.SIZE_20, ColorEnums.white);
        nameText.x = 0;
        nameText.y = 9; //(tribe.height / 2 - nameText.height) / 2 + 2;
        nameText.bold = true;
        txtcon.addChild(nameText);
        this.userName = nameText;
        // 公会
        var levelText = ComponentMgr.getTextField("Lv.999", TextFieldConst.SIZE_20, ColorEnums.white);
        levelText.x = nameText.x;
        levelText.y = 40; //userInfoBtn.height / 2 + ( userInfoBtn.height / 2 - levelText.height) / 2 - 3;
        txtcon.addChild(levelText);
        levelText.bold = true;
        this.trideName = levelText;
        txtcon.width = userInfoBtn.width / 2;
        //杯数
        var capTextBg = BaseBitmap.create("ab_cap_num_bg");
        capTextBg.width = 92;
        capTextBg.height = 27;
        userInfoBtn.addChild(capTextBg);
        capTextBg.y = 22; //(userInfoBtn.height - capTextBg.height) / 2 - 2;
        capTextBg.x = 266; //userInfoBtn.width - capTextBg.width - 10;
        var cap = BaseBitmap.create("trophy_icon");
        cap.setScale(0.42);
        cap.x = 247; //capTextBg.x + capTextBg.width - cap.width * cap.scaleX- 5;
        cap.y = 13; //userInfoBtn.y + (userInfoBtn.height - cap.height * cap.scaleY) / 2;
        userInfoBtn.addChild(cap);
        var capTxt = ComponentMgr.getTextField("1", TextFieldConst.SIZE_CONTENT_COMMON, ColorEnums.white);
        capTxt.width = capTextBg.width;
        capTxt.x = capTextBg.x + 5;
        capTxt.y = capTextBg.y + 1;
        capTxt.textAlign = egret.HorizontalAlign.CENTER;
        userInfoBtn.addChild(capTxt);
        this.infoCapNum = capTxt;
        var mailBtn = ComponentMgr.getButton("ab_btn_icon_bg", "", this.inviteBtnClickHandler, this);
        mailBtn.x = userInfoBtn.x + userInfoBtn.width + 24;
        mailBtn.y = userInfoBtn.y;
        nameView.addChild(mailBtn);
        var mailIcon = BaseBitmap.create("ab_inviteicon");
        if (!Api.SwitchVoApi.checkOpenInviteFriend()) {
            App.DisplayUtil.changeToGray(mailIcon);
        }
        mailBtn.addChild(mailIcon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, mailIcon, mailBtn, [0, -5]);
        this.inviteRedPiont = BaseBitmap.create("red_point");
        mailBtn.addChild(this.inviteRedPiont);
        this.inviteRedPiont.x = mailIcon.x + mailIcon.width - this.inviteRedPiont.width;
        this.inviteRedPiont.y = -8;
        this.inviteRedPiont.visible = Api.InviteFriendVoApi.checkRedPoint();
        var mailtxt = ComponentMgr.getTextField(LangMger.getlocal("invitefriendTab1"), TextFieldConst.SIZE_24, ColorEnums.white);
        mailBtn.addChild(mailtxt);
        mailtxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, mailtxt, mailBtn, [0, 10]);
        var menuBtn = ComponentMgr.getButton("ab_btn_icon_bg", "", this.settingBtnClickHandler, this);
        menuBtn.x = mailBtn.x + mailBtn.width + 19;
        menuBtn.y = userInfoBtn.y;
        nameView.addChild(menuBtn);
        var menuIcon = BaseBitmap.create("ab_settingicon");
        menuBtn.addChild(menuIcon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, menuIcon, menuBtn, [0, -5]);
        this.menuRedPiont = BaseBitmap.create("red_point");
        menuBtn.addChild(this.menuRedPiont);
        this.menuRedPiont.x = menuIcon.x + menuIcon.width - this.menuRedPiont.width;
        this.menuRedPiont.y = -8;
        this.menuRedPiont.visible = false;
        var menutxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_32, ColorEnums.white);
        menuBtn.addChild(menutxt);
        menutxt.width = menuBtn.width;
        menutxt.textAlign = egret.HorizontalAlign.CENTER;
        menutxt.text = LangMger.getlocal("readyscene_menu");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, menutxt, menuBtn, [0, 10]);
    };
    // 创建首冲按钮
    ReadyScene.prototype.createFirstRecBtn = function (isRew) {
        if (isRew === void 0) { isRew = false; }
        var view = this;
        if (!this.firstRecEnterBtn) {
            this.firstRecEnterBtn = ComponentMgr.getButton("firstrec_enter_icon", "", this.onFirstRecTap, this);
            view.addChild(this.firstRecEnterBtn);
            this.firstRecEnterBtn.anchorOffsetX = 39;
            this.firstRecEnterBtn.anchorOffsetY = 44;
            this.firstRecEnterBtn.x = 55;
            if (this._mycardgroup) {
                this.firstRecEnterBtn.y = this._mycardgroup.y + this._mycardgroup.height + 64;
            }
            else {
                this.firstRecEnterBtn.y = GameConfig.stageHeigth * 0.6 - 60;
            }
            this.firstRecEnterBtnLabel = BaseLoadBitmap.create('firstrec_enter_label');
            view.addChild(this.firstRecEnterBtnLabel);
            this.firstRecEnterBtnLabel.x = this.firstRecEnterBtn.x - 29;
            this.firstRecEnterBtnLabel.y = this.firstRecEnterBtn.y + 36;
        }
        egret.Tween.removeTweens(this.firstRecEnterBtn);
        if (isRew) {
            if (!this.firstRecEnterBtnLight) {
                this.firstRecEnterBtnLight = BaseLoadBitmap.create("firstrec_enter_light");
                this.firstRecEnterBtn.addChild(this.firstRecEnterBtnLight);
                this.firstRecEnterBtnLight.x = -15;
                this.firstRecEnterBtnLight.y = -18;
                egret.Tween
                    .get(this.firstRecEnterBtnLight, { loop: true })
                    .to({ alpha: 0 }, 2000)
                    .to({ alpha: 1 }, 2000);
            }
            egret.Tween
                .get(this.firstRecEnterBtn, { loop: true })
                .to({ rotation: 30 }, 50)
                .to({ rotation: -30 }, 100)
                .to({ rotation: 30 }, 100)
                .to({ rotation: -30 }, 100)
                .to({ rotation: 30 }, 100)
                .to({ rotation: -30 }, 100)
                .to({ rotation: 0 }, 50)
                .wait(1000);
        }
        else {
            egret.Tween
                .get(this.firstRecEnterBtn, { loop: true })
                .to({ rotation: 30 }, 50)
                .to({ rotation: -30 }, 100)
                .to({ rotation: 30 }, 100)
                .to({ rotation: -30 }, 100)
                .to({ rotation: 30 }, 100)
                .to({ rotation: -30 }, 100)
                .to({ rotation: 0 }, 50)
                .wait(5000);
        }
    };
    // 隐藏首冲按钮
    ReadyScene.prototype.hideFirstRecBtn = function () {
        if (this.firstRecEnterBtnLight) {
            this.firstRecEnterBtnLight.dispose();
            this.firstRecEnterBtnLight = null;
        }
        if (this.firstRecEnterBtn) {
            this.firstRecEnterBtnLabel.dispose();
            this.firstRecEnterBtnLabel = null;
            this.firstRecEnterBtn.dispose();
            this.firstRecEnterBtn = null;
        }
    };
    ReadyScene.prototype.onFirstRecTap = function () {
        ViewController.getInstance().openView(ViewConst.FIRSTRECPOPUPVIEW, {});
    };
    // 刷新首冲按钮状态
    ReadyScene.prototype.refreshFirstRecBtn = function () {
        if (!Api.SwitchVoApi.checkOpenFirstRecharge()) {
            this.hideFirstRecBtn();
            return;
        }
        var __status = Api.SigninfoVoApi.isFirstRecharge();
        switch (__status) {
            case 0:
                this.createFirstRecBtn(false);
                break;
            case 1:
                this.createFirstRecBtn(true);
                break;
            default:
                this.hideFirstRecBtn();
                break;
        }
    };
    ReadyScene.prototype.taskView = function () {
        var _this = this;
        // task 主容器
        var taskBtn = ComponentMgr.getButton("ab_task_icon_bg", "", function () {
            ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW, {
                title: LangMger.getlocal("boxname_1006"),
                handler: _this,
                needCancel: false,
                callback: function () {
                    if (Api.UserinfoVoApi.getCardBox() >= 1) {
                        Api.UserinfoVoApi.setFreshInfo(false, new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2));
                        NetManager.request(NetConst.USER_OPENCARDBOX, {});
                    }
                    else {
                        App.CommonUtil.showTip(LangMger.getlocal("syspowerNotEnough"));
                    }
                },
                needClose: 1,
                boxId: "1006",
                isbuy: false
            });
            if (Api.GameinfoVoApi.checlIsInStepId(31)) {
                App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
            }
        }, this);
        this.addChild(taskBtn);
        taskBtn.x = 15;
        taskBtn.y = 165;
        this.taskBtn = taskBtn;
        var scale = 0.4;
        // let box:BaseLoadBitmap = BaseLoadBitmap.create(res);
        var box = BaseBitmap.create("ab_task_icon");
        // box.width = 266;
        // box.height = 194;
        // box.x = 0 + (taskBtn.width - box.width * scale) / 2;
        box.y = -8;
        box.x = 0;
        taskBtn.addChild(box);
        if (App.CommonUtil.check_dragon()) {
            var tasklight = App.DragonBonesUtil.getLoadDragonBones("royalpass_klj_1");
            taskBtn.addChild(tasklight);
            tasklight.blendMode = egret.BlendMode.ADD;
            this._taskdbArr.push(tasklight);
            tasklight.x = 61;
            tasklight.y = 63;
        }
        ;
        var redbg = BaseBitmap.create("public_reward_tip_bg");
        redbg.x = -9;
        redbg.y = -4;
        taskBtn.addChild(redbg);
        this.taskNumBg = redbg;
        var resNum = ComponentMgr.getTextField("1", TextFieldConst.SIZE_20, ColorEnums.white, false);
        resNum.width = redbg.width;
        resNum.stroke = 1;
        resNum.textAlign = egret.HorizontalAlign.CENTER;
        resNum.x = redbg.x;
        resNum.y = redbg.y + (redbg.height - resNum.height) / 2;
        taskBtn.addChild(resNum);
        this.taskNum = resNum;
        var progress = ComponentMgr.getProgressBar("ab_task_bar", "ab_task_progress", taskBtn.width - 20);
        progress.x = 4;
        progress.y = 73; //79 + (46 - progress.height) / 2 - 3;
        taskBtn.addChild(progress);
        this.taskProgress = progress;
        progress.setPercentage(0);
        var energyIcon = BaseBitmap.create("task_power");
        energyIcon.x = -3;
        energyIcon.y = 72;
        energyIcon.setScale(0.8);
        taskBtn.addChild(energyIcon);
        return taskBtn;
    };
    ReadyScene.prototype.warOrderView = function () {
        var warOrder = new BaseDisplayObjectContainer();
        warOrder.width = 470;
        warOrder.height = 117;
        var warOrderBg = BaseBitmap.create("ab_war_bg");
        warOrder.addChild(warOrderBg);
        warOrderBg.addTouch(this.warOrderHandler, this);
        var all = new BaseDisplayObjectContainer();
        warOrder.addChild(all);
        this.waritem = all;
        var cap = BaseBitmap.create("trophy_icon");
        cap.setScale(0.42);
        warOrder.addChild(cap);
        cap.x = 10;
        cap.y = 11;
        var bigBird = BaseBitmap.create("ab_war_order_icon");
        all.addChild(bigBird);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, bigBird, warOrderBg, [7, 0]);
        var txt = ComponentMgr.getTextField("1", TextFieldConst.SIZE_CONTENT_COMMON, ColorEnums.white);
        txt.x = cap.x + cap.width * cap.scaleX;
        txt.y = cap.y + (cap.height * cap.scaleX - txt.height) / 2;
        warOrder.addChild(txt);
        this.warOrderNum = txt;
        var progress = ComponentMgr.getProgressBar("ab_readyscene_war_progress", "war_order_bar", 203);
        progress.setProgressMode();
        progress.x = cap.x;
        progress.y = warOrderBg.height / 2 + (warOrderBg.height / 2 - progress.height) / 2 - 5;
        all.addChild(progress);
        this.warProgress = progress;
        var freegetall = BaseBitmap.create("freegetallreward");
        warOrder.addChild(freegetall);
        freegetall.x = progress.x;
        freegetall.y = progress.y - 10;
        freegetall.visible = false;
        this.freegetall = freegetall;
        var getall = BaseBitmap.create("royalgetall");
        warOrder.addChild(getall);
        getall.x = 80;
        getall.y = 54;
        getall.visible = false;
        this.getall = getall;
        var tiao = ComponentMgr.getCustomMovieClip("tiao", 10);
        tiao.blendMode = egret.BlendMode.ADD;
        tiao.playWithTime(0);
        all.addChild(tiao);
        tiao.x = progress.x - 10;
        tiao.y = progress.y - 9;
        this.tiao = tiao;
        var box = BaseBitmap.create("ab_task_icon");
        box.name = "warbox";
        box.anchorOffsetX = box.width / 2;
        box.anchorOffsetY = box.height / 2;
        box.rotation = 0;
        this.warbox = box;
        all.addChild(box);
        box.setScale(0.5);
        box.setPosition(progress.x + progress.width, progress.y + progress.height / 2);
        var titlebit = BaseBitmap.create("royalreadyname");
        all.addChild(titlebit);
        titlebit.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, titlebit, bigBird, [0, 0]);
        titlebit.y = 10;
        var crown = BaseBitmap.create("crown");
        all.addChild(crown);
        crown.setScale(0.8);
        this.warCrown = crown;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, crown, titlebit, [0, 0]);
        crown.y = 39;
        var huangguan = ComponentMgr.getCustomMovieClip("huangguan", 10, 100);
        huangguan.blendMode = egret.BlendMode.ADD;
        huangguan.playWithTime(0);
        all.addChild(huangguan);
        huangguan.x = crown.x - 10;
        huangguan.y = crown.y - 10;
        this.huangguan = huangguan;
        var group = new BaseDisplayObjectContainer();
        all.addChild(group);
        this.warHaveBuyGroup = group;
        var haveTxt = ComponentMgr.getTextField(LangMger.getlocal("royalpasshaveget"), TextFieldConst.SIZE_28, 0xFFEF43);
        haveTxt.stroke = 2;
        haveTxt.strokeColor = 0x892300;
        group.addChild(haveTxt);
        haveTxt.width = bigBird.width;
        haveTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, group, crown, [0, 0]);
        var rewardGroup = new BaseDisplayObjectContainer();
        warOrder.addChild(rewardGroup);
        rewardGroup.width = 309;
        rewardGroup.height = 125;
        this.warRewardGroup = rewardGroup;
        rewardGroup.touchEnabled = false;
        // let rewardbg = BaseBitmap.create(`war_order_bg2`);
        // rewardGroup.addChild(rewardbg);
        if (App.CommonUtil.check_dragon()) {
            var tasklight = App.DragonBonesUtil.getLoadDragonBones("royalpass_klj_3");
            tasklight.touchEnabled = false;
            rewardGroup.addChild(tasklight);
            tasklight.blendMode = egret.BlendMode.ADD;
            tasklight.x = 150;
            tasklight.y = 55;
        }
        // let getTxt = ComponentMgr.getTextField(LangMger.getlocal(`royalpasscanget`), TextFieldConst.SIZE_18, 0x4FFF42);
        // getTxt.stroke = 2;
        // getTxt.strokeColor = 0;
        // rewardGroup.addChild(getTxt);
        // getTxt.setPosition(180, 20);
        var getTip = BaseBitmap.create("readyscenecanrewardtip");
        rewardGroup.addChild(getTip);
        getTip.setPosition(166, 14);
        return warOrder;
    };
    // 战场的东西
    ReadyScene.prototype.battleView = function () {
        var battle = new BaseDisplayObjectContainer();
        battle.width = GameConfig.stageWidth;
        this.battle = battle;
        var bg = BaseBitmap.create("ab_boss_bg");
        bg.x = (battle.width - bg.width) / 2;
        battle.addChild(bg);
        var boss_tile = BaseBitmap.create("ab_boss_tile_bg");
        battle.addChild(boss_tile);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, boss_tile, bg, [0, 10]);
        var bossIcon = BaseLoadBitmap.create("boss_icon_1001");
        battle.addChild(bossIcon);
        bossIcon.setScale(0.82);
        this.bossIcon = bossIcon;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bossIcon, boss_tile, [0, 25]);
        var title = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
        battle.addChild(title);
        title.width = boss_tile.width - 118;
        title.textAlign = egret.HorizontalAlign.CENTER;
        title.text = LangMger.getlocal("dice_battle_skin_title_" + Api.LineVoApi.getCurSkin());
        title.x = boss_tile.x + (boss_tile.width - title.width) / 2;
        title.y = boss_tile.y + 36;
        title.stroke = 1.5;
        this.tileName = title;
        var ruleBtn = ComponentMgr.getButton("ab_public_rulebtn", "", this.ruleBtnOnclick, this);
        battle.addChild(ruleBtn);
        ruleBtn.x = title.x + title.width;
        ruleBtn.y = boss_tile.y + 32;
        // boss 下面的小按钮
        var bossArr = Config.MonsterCfg.getBossKeys();
        var tem = [];
        for (var index = 0; index < bossArr.length; index++) {
            tem[index] = "";
        }
        var bossTab = ComponentMgr.getTabBarGroup("boss_tab_btn", tem, this.bossTabOnclick, this, bossArr);
        battle.addChild(bossTab);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bossTab, bg, [0, -bossTab.height - 10]);
        this.bossTab = bossTab;
        var pveBtn = ComponentMgr.getButton("ab_readyscene_fight_btn", "", this.clickHandler, this, [1]);
        pveBtn.setPosition(60, bg.height + 60);
        battle.addChild(pveBtn);
        pveBtn.name = "pveBtn";
        this.pvpBtn = pveBtn;
        pveBtn.setBtnTouchOnbg();
        var huo = ComponentMgr.getCustomMovieClip("huo", 10, 80);
        huo.playWithTime(0);
        pveBtn.addChild(huo);
        huo.x = -54;
        huo.y = -76;
        huo.visible = false;
        this.huo = huo;
        var pveIcon = BaseBitmap.create("pvp_btn_icon");
        pveBtn.addChild(pveIcon);
        pveIcon.anchorOffsetY = pveIcon.height / 2;
        pveIcon.x = (pveBtn.width - pveIcon.width) / 2;
        pveIcon.y = 10;
        var pveTxt = ComponentMgr.getTextField(LangMger.getlocal("fight_model"), TextFieldConst.SIZE_40, ColorEnums.white);
        pveTxt.width = pveBtn.width;
        pveTxt.textAlign = egret.HorizontalAlign.CENTER;
        pveBtn.addChild(pveTxt);
        pveTxt.y = 55; //81 + (69 - pveTxt.height) / 2;
        pveTxt.strokeColor = ColorEnums.btnStrokeOrange;
        var pveAd = ComponentMgr.getButton("readywatchad1", "", this.wacthADOnclick, this, [AdConst.ADV_3]);
        battle.addChild(pveAd);
        pveAd.x = pveBtn.x - 26;
        pveAd.y = pveBtn.y - 42;
        pveAd.setGray(!Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_3));
        pveAd.visible = false;
        this.wacthad1 = pveAd;
        // if(App.CommonUtil.check_dragon()){
        // 	let dz1 = App.DragonBonesUtil.getLoadDragonBones(`royalpass_dz_1`);
        // 	pveBtn.addChild(dz1);
        // 	dz1.setPosition(pveBtn.width/2,68);
        // 	dz1.blendMode = egret.BlendMode.ADD;
        // 	let dz2 = App.DragonBonesUtil.getLoadDragonBones(`royalpass_dz_2`);
        // 	pveBtn.addChild(dz2);
        // 	dz2.setPosition(pveBtn.width/2,26);
        // }
        var pvpBtn = ComponentMgr.getButton("ab_readyscene_operation_btn", "", this.clickHandler, this, [2]);
        pvpBtn.setPosition(GameConfig.stageWidth - 60 - pvpBtn.width, pveBtn.y);
        battle.addChild(pvpBtn);
        var pvpIcon = BaseBitmap.create("pve_btn_icon");
        pvpBtn.addChild(pvpIcon);
        pvpIcon.anchorOffsetY = pvpIcon.height / 2;
        pvpIcon.x = (pvpBtn.width - pvpIcon.width) / 2;
        pvpIcon.y = 10;
        var pvpTxt = ComponentMgr.getTextField(LangMger.getlocal("operation_model_title"), TextFieldConst.SIZE_40, ColorEnums.white);
        pvpBtn.addChild(pvpTxt);
        pvpTxt.y = 55; //81 + (69 - pvpTxt.height) / 2;
        pvpTxt.strokeColor = ColorEnums.btnStrokeBlue;
        var pvpNumTxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_40, ColorEnums.white);
        pvpBtn.addChild(pvpNumTxt);
        pvpNumTxt.width = pvpTxt.width;
        pvpNumTxt.textAlign = egret.HorizontalAlign.CENTER;
        pvpNumTxt.text = Api.GameinfoVoApi.getOperationNum() + "/" + Config.TogetherCfg.getOperationMaxNum();
        pvpNumTxt.y = pvpTxt.y + pvpTxt.height;
        pvpTxt.strokeColor = ColorEnums.btnStrokeBlue;
        pvpTxt.x = (pvpBtn.width - pvpTxt.width) / 2;
        pvpNumTxt.x = pvpTxt.x;
        var pvp2 = new BaseDisplayObjectContainer();
        pvpBtn.addChild(pvp2);
        // 提示购买协同次数
        var mask_op = BaseBitmap.create("watchadopmask");
        pvp2.addChild(mask_op);
        // mask_op.width = pvpBtn.width;
        // mask_op.alpha = 0.5
        // mask_op.height = 70;
        mask_op.x = 0;
        mask_op.y = -30;
        // mask_op.visible = false;
        // icon
        var tipIcon = BaseBitmap.create("public_icon1");
        pvp2.addChild(tipIcon);
        tipIcon.setPosition(74, 82);
        // tipIcon.visible = false;
        // 文字
        var tipTxt = ComponentMgr.getTextField(" " + Config.TogetherCfg.getNeedGem(), TextFieldConst.SIZE_22, ColorEnums.white);
        tipTxt.stroke = 2;
        pvp2.addChild(tipTxt);
        tipTxt.setPosition(110, 93);
        // tipTxt.visible = false;
        // 倒计时
        var dtime = ComponentMgr.getTextField('00:00:00', TextFieldConst.SIZE_22, ColorEnums.white);
        pvp2.addChild(dtime);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dtime, mask_op, [0, 56]);
        // sb 文字提示
        var dtTip = ComponentMgr.getTextField(LangMger.getlocal("readypvptiponcd"), TextFieldConst.SIZE_22, ColorEnums.white);
        pvp2.addChild(dtTip);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, dtTip, mask_op, [0, 0]);
        dtTip.y = dtime.y + dtime.height + 5;
        // 观看广告按钮
        var wacthAD = ComponentMgr.getButton("readywatchad2", "", this.wacthADOnclick, this, [AdConst.ADV_4]);
        battle.addChild(wacthAD);
        wacthAD.x = pvpBtn.x + 153;
        wacthAD.y = pvpBtn.y - 42;
        wacthAD.visible = false;
        this.pveTip["pvp2"] = pvp2;
        this.pveTip["dtime"] = dtime;
        this.pveTip["wacthAD"] = wacthAD;
        this.pveBtnTxt = pvpNumTxt;
        this.pveBtn = pvpBtn;
        this.guidebubble();
        return battle;
    };
    ReadyScene.prototype.ruleBtnOnclick = function (param) {
        ViewController.getInstance().openView(ViewConst.MONSTERINFOVIEW);
    };
    ReadyScene.prototype.bossTabOnclick = function (param) {
        var _this = this;
        // 点击boss 下面的按钮的回调
        var bossKeys = Config.MonsterCfg.getBossKeys();
        var view = this;
        egret.Tween.removeTweens(this.bossIcon);
        var t = egret.Tween.get(this.bossIcon);
        t.to({ alpha: 0 }, this.dtime1)
            .call(function () {
            _this.bossIcon.setload("boss_icon_" + bossKeys[param['index']], null, {
                callback: function () {
                    App.MsgHelper.dispEvt("loadtoshowddddd");
                },
                callbackThisObj: view
            });
            _this.sNum = 0;
            _this.lastBossIndex = param.index;
            // this.bossIcon.alpha = 0;
            _this.bossTab.selectedIndex = _this.lastBossIndex;
            egret.Tween.removeTweens(_this.bossIcon);
        }, this);
        // .to({alpha: 1}, this.dtime2);
        // NOTE: 修改切换效果，透明度消失 100 => 60 消失, 出现 0 => 100;
    };
    ReadyScene.prototype.shownn = function () {
        var _this = this;
        this.bossIcon.alpha = 0;
        this.sNum = 0;
        var t = egret.Tween.get(this.bossIcon);
        t.to({ alpha: 1 }, this.dtime2)
            .call(function () {
            _this.sNum = 0;
            egret.Tween.removeTweens(_this.bossIcon);
        });
    };
    ReadyScene.prototype.wacthADOnclick = function (param) {
        var re = App.CommonUtil.watchAd(param);
    };
    ReadyScene.prototype.wacthAdsuccess = function (evt) {
        // 看成功后的回调
        if (evt.data && evt.data.ret) {
            var type = Api.AdvertiseVoApi.getAdtype();
            switch (type) {
                case AdConst.ADV_3:
                    Api.AdvertiseVoApi.setPlayHuo(true);
                    this.huo.visible = Api.GameinfoVoApi.getADhuo();
                    this.wacthad1.visible = false;
                    break;
                case AdConst.ADV_4:
                    this.pveTip["wacthAD"].setGray(true);
                    break;
                case AdConst.ADV_5:
                    var rewards = evt.data.data.data.rewards;
                    ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW, {
                        rewards: rewards,
                        title: LangMger.getlocal("sysGetReward"),
                        isBoxBuy: false,
                        specialBoxId: "1007",
                        handler: this,
                        needCancel: true,
                        closecallback: function () {
                            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                        }
                    });
                    break;
                default:
                    break;
            }
        }
    };
    ReadyScene.prototype.openCardBox = function (event) {
        var data = event.data.data.data;
        var rewards = data.rewards;
        var ret = event.data.ret;
        if (ret) {
            ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW, {
                rewards: rewards,
                title: LangMger.getlocal("sysGetReward"),
                isBoxBuy: false,
                specialBoxId: "1006",
                handler: this,
                needCancel: true,
                closecallback: function () {
                    App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                }
            });
        }
    };
    ReadyScene.prototype.createCardGroup = function () {
        var view = this;
        var group = new BaseDisplayObjectContainer();
        group.width = 587;
        group.height = 254;
        view.addChild(group);
        view._mycardgroup = group;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, group, view, [0, 300]);
        var card_bg = BaseBitmap.create("ab_card_bg");
        // card_bg.width = group.width;
        // card_bg.height = group.height;
        card_bg.setPosition(0, 60);
        group.addChild(card_bg);
        // let tabbg = BaseBitmap.create(`card_group_tab_bg`);
        // tabbg.width = 260;
        // tabbg.height = 36;
        // group.addChild(tabbg);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tabbg, card_bg, [0,20]);
        // view.setChildIndex(view.tabbarGroup, view.getChildIndex(group));
        view.changeTab(view._MyCardTabName);
        view.setTabBarPosition();
        return group;
    };
    ReadyScene.prototype.initTabbarGroup = function () {
        var view = this;
        var tabBarTextArr = view.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            view.tabbarGroup = ComponentMgr.getTabBarGroup(view.getTabbarName(), tabBarTextArr, view.clickTabbarHandler, view, null, '', 0, false, 235, 68);
            view.addChild(view.tabbarGroup);
            view.tabbarGroup.selectedIndex = this._selectedTabIndex;
            view.tabbarGroup.setColor(ColorEnums.white, ColorEnums.cardSel);
        }
    };
    ReadyScene.prototype.getTabPos = function () {
        var x = 0;
        var y = 0;
        if (this._mycardgroup) {
            x = this._mycardgroup.x + 12;
            y = this._mycardgroup.y + 70;
        }
        return {
            x: x,
            y: y
        };
    };
    ReadyScene.prototype.clickTabbarHandler = function (data) {
        var view = this;
        App.LogUtil.log("index: " + data.index);
        var index = Number(data.index);
        view.lastSelectedTabIndex = view.selectedTabIndex;
        view.selectedTabIndex = index;
        view._teamid = index + 1;
        if (!data.no) {
            NetManager.request(NetConst.DICE_CHOOSELINE, {
                lineNo: view._teamid
            });
        }
        view.changeTab(view._MyCardTabName);
    };
    ReadyScene.prototype.changeTab = function (name) {
        if (!name) {
            name = this._MyCardTabName;
        }
        var tabveiwClass = egret.getDefinitionByName(name + "Tab" + (this.selectedTabIndex + 1));
        var pos = this.getTabPos();
        if (tabveiwClass) {
            var commViewTab = this.tabViewData[this.selectedTabIndex];
            if (commViewTab) {
                commViewTab.setPosition(pos.x, pos.y);
                this.addChild(commViewTab);
                commViewTab.refreshWhenSwitchBack();
            }
            else {
                var tabView = new tabveiwClass();
                this.tabViewData[this.selectedTabIndex] = tabView;
                // tabView["param"]=this.param;
                tabView.setPosition(pos.x, pos.y);
                this.addChild(tabView);
            }
            if (this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex] && this.lastSelectedTabIndex != this.selectedTabIndex) {
                this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
            }
        }
    };
    ReadyScene.prototype.setTabBarPosition = function () {
        var view = this;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, view._mycardgroup, [0, 16]);
        for (var i = 0; i < 3; ++i) {
            var tab = view.tabbarGroup.getTabBar(i);
            var txt = tab.getChildByName("btnTxt");
            txt.width = 65; // 给的按钮图片有透明区，左右不对称
            txt.textAlign = egret.HorizontalAlign.CENTER;
            txt.bold = true;
            txt.setPosition(0, 10);
            // tab.setTextPos(26.5,10);
            // tab.setTextOffY(-15);
            tab.x = i * 80;
        }
    };
    ReadyScene.prototype.getTabbarTextArr = function () {
        return ["1", "2", "3"];
    };
    // 页签图名称
    ReadyScene.prototype.getTabbarName = function () {
        return "ab_tab_btn";
    };
    ReadyScene.prototype.inviteBtnClickHandler = function () {
        if (Api.SwitchVoApi.checkOpenInviteFriend()) {
            ViewController.getInstance().openView(ViewConst.INVITEFRIENDPOPUPVIEW);
        }
        else {
            App.CommonUtil.showTip(LangMger.getlocal("mainui_inpro_des"));
        }
        //ViewController.getInstance().openView(ViewConst.MAILPOPUPVIEW);
    };
    ReadyScene.prototype.settingBtnClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.MENUPOPUPVIEW, {});
    };
    ReadyScene.prototype.infoOnclickHandler = function () {
        ViewController.getInstance().openView(ViewConst.USERINFO_POPUPVIEW, {});
    };
    ReadyScene.prototype.clickHandler = function (battleType) {
        this._battleType = battleType;
        var type = battleType;
        //1对战 2协同
        if (type == 1) {
            // if(!this.pvpBtn.touchEnabled){
            // 	this.pvpBtn.touchEnabled = true;
            // 	App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
            // 	return;
            // }
            if (Api.GameinfoVoApi.checlIsInGuideId(1)) {
                this.find();
                App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
                //App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
            }
            else {
                ViewController.getInstance().openView(ViewConst.WARCHOOSEPOPUPVIEW, {
                    type: type
                });
            }
        }
        else {
            if (Api.GameinfoVoApi.getOperationNum() > 0) {
                ViewController.getInstance().openView(ViewConst.WARCHOOSEPOPUPVIEW, {
                    type: type
                });
                // } else if (!Api.GameinfoVoApi.getIsBuyAssitance()) {
                // 	App.MsgHelper.dispEvt(MsgConst.GOSHOP, {index:ShopConst.SHOP_SPECIALVIP_INDEX});
            }
            else {
                var costGem = Config.TogetherCfg.getNeedGem();
                if (Api.UserinfoVoApi.getGem() < Config.TogetherCfg.getNeedGem()) {
                    App.CommonUtil.gemNotEnough(1);
                }
                else {
                    ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                        title: LangMger.getlocal("buy_operation_title"),
                        msg: LangMger.getlocal("buy_operation_des", [String(costGem), String(Config.TogetherCfg.getOperationMaxNum())]),
                        handler: this,
                        needCancel: false,
                        callback: function () {
                            //发消息去买
                            NetManager.request(NetConst.USER_RESETJNUM, {});
                        },
                        needClose: 1,
                        confirmTxt: String(costGem),
                        iconURL: "ab_mainui_gem"
                    });
                }
            }
        }
    };
    ReadyScene.prototype.find = function () {
        if (this._end) {
            if (this._findTimeCount != -1) {
                egret.clearTimeout(this._findTimeCount);
                this._findTimeCount = -1;
            }
            return;
        }
        //type 1对战 2协同
        var type = 1;
        if (this._findTimeCount != -1) {
            egret.clearTimeout(this._findTimeCount);
            this._findTimeCount = -1;
        }
        this._findTime = egret.getTimer();
        NetManager.request(NetConst.BATTLE_FIND, {
            findType: type,
            findNum: this._findNum
        });
        this._findNum++;
    };
    ReadyScene.prototype.getResourceList = function () {
        return [];
    };
    ReadyScene.prototype.refreshAfterShow = function (bool) {
        if (bool === void 0) { bool = false; }
        _super.prototype.refreshAfterShow.call(this, bool);
        this.lastSelectedTabIndex = -1;
        if (this.tabbarGroup) {
            var tab = Api.LineVoApi.getCurLine() - 1;
            this.clickTabbarHandler({ index: tab, no: true });
            this.selectedTabIndex = tab;
            this.tabbarGroup.selectedIndex = tab;
        }
        this.refresh();
        if (Api.GameinfoVoApi.checlIsInGuideId(16)) {
            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
        }
    };
    ReadyScene.prototype.getBgName = function () {
        return "public_ab_scenebg";
    };
    return ReadyScene;
}(BaseScene));
//# sourceMappingURL=ReadyScene.js.map