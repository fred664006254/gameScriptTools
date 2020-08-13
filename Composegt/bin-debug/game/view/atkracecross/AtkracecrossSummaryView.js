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
var AtkracecrossSummaryView = (function (_super) {
    __extends(AtkracecrossSummaryView, _super);
    function AtkracecrossSummaryView() {
        var _this = _super.call(this) || this;
        _this._countDownTime = 0;
        _this._countDownText = null;
        _this._enterBtn = null;
        _this._cdTimeDesc = null;
        _this._cdType = 1; //倒计时类型 1:开始倒计时  2:战斗倒计时   3:领奖倒计时
        _this._openDesc = null;
        _this._isCanJoin = null; // 0 没资格  1 有资格
        _this._crossServerType = null;
        _this.aid = "crossServerAtkRace";
        return _this;
    }
    Object.defineProperty(AtkracecrossSummaryView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AtkracecrossSummaryView.prototype, "code", {
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
    //根据资源名字得到完整资源名字
    AtkracecrossSummaryView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    // protected getRequestData():{requestType:string,requestData:any}
    // {	
    // 	//刷新跨服擂台活动数据
    // 	return {requestType:NetRequestConst.REQUEST_ATKRACECROSS_GETACTIVITYATK,requestData:{}};
    // }
    AtkracecrossSummaryView.prototype.refreshInfo = function () {
        this.request(NetRequestConst.REQUEST_ATKRACECROSS_GETACTIVITYATK, {});
    };
    AtkracecrossSummaryView.prototype.receiveData = function (data) {
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
        if (crossVo.info && crossVo.info.iscanjoin == 1) {
            this._isCanJoin = 1;
            if (LanguageManager.checkHasKey("atkraceCrossOpenDesc2-" + this.cfg.getCrossServerType())) {
                this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc2-" + this.cfg.getCrossServerType());
            }
            else {
                this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc2");
            }
            var canJoinImg = BaseLoadBitmap.create("atkracecross_canjoin-" + this.cfg.getCrossServerType());
            canJoinImg.width = 241;
            canJoinImg.height = 91;
            canJoinImg.x = -5;
            this.addChildToContainer(canJoinImg);
            if (PlatformManager.hasSpcialCloseBtn()) {
                this.closeBtn.y = 80;
            }
        }
        else {
            // this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc3");
            this._isCanJoin = 0;
            if (LanguageManager.checkHasKey("atkraceCrossOpenDesc3-" + this.cfg.getCrossServerType())) {
                this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc3-" + this.cfg.getCrossServerType());
            }
            else {
                this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc3");
            }
        }
    };
    AtkracecrossSummaryView.prototype.getResourceList = function () {
        var baseRes = ["atkracecross_title", "btn_enter_race", "atkracecross_timebg"];
        // return super.getResourceList().concat([
        // "atkracecross_bg","atkracecross_title","btn_enter_race","atkracecross_timebg"
        // ]);
        var resList = null;
        if (this.cfg.specialReward) {
            resList = baseRes.concat([
                "atkracecross_bg_special",
                "atkracecross_namebg",
                "atkracecross_showbtnbg",
                // "atkracecross_showbtnicon",
                this.getDefaultRes("atkracecross_showbtnicon", "10"),
                "atkracecross_showbtntxt",
                "atkracecross_threetip",
                "atkracecross_threetipflower"
            ]);
        }
        else {
            resList = baseRes.concat([
                "atkracecross_bg"
            ]);
        }
        return _super.prototype.getResourceList.call(this).concat(resList);
    };
    AtkracecrossSummaryView.prototype.getBgName = function () {
        if (this.cfg.specialReward) {
            return "atkracecross_bg_special";
        }
        else {
            return "atkracecross_bg";
        }
    };
    AtkracecrossSummaryView.prototype.createSpecial = function (y) {
        var rewardItemVo = GameData.formatRewardItem(this.cfg.specialReward);
        if (rewardItemVo[0].type == 8) {
            //门客
            var dragon = null;
            if (RES.hasRes("servant_full2_" + rewardItemVo[0].id + "_ske") && App.CommonUtil.check_dragon()) {
                dragon = App.DragonBonesUtil.getLoadDragonBones("servant_full2_" + rewardItemVo[0].id);
                dragon.setScale(1);
                dragon.x = 320;
                dragon.y = 1136 - 168 + 35;
                this.servantContainer.addChild(dragon);
            }
            else {
                var bm = null;
                // let skinW =640;
                // let skinH = 482;
                // let tarScale = 1;
                // bm = BaseLoadBitmap.create("servant_full_" + rewardItemVo[0].id);
                var skinW = 640;
                var skinH = 840;
                var tarScale = 0.8;
                bm = BaseLoadBitmap.create("wife_full_" + rewardItemVo[0].id);
                bm.width = skinW;
                bm.height = skinH;
                bm.setScale(tarScale);
                bm.x = 320 - skinW * tarScale / 2;
                bm.y = y + 20;
                this.servantContainer.addChild(bm);
            }
            var servantCfg = Config.ServantCfg.getServantItemById(rewardItemVo[0].id);
            if (PlatformManager.checkIsViSp()) {
                var name_1 = ComponentManager.getTextField(servantCfg.name, 24, TextFieldConst.COLOR_BLACK);
                var nameBg = BaseBitmap.create("atkracecross_namebg");
                nameBg.height = name_1.width + 50;
                nameBg.anchorOffsetX = 26;
                nameBg.anchorOffsetY = nameBg.height / 2;
                nameBg.rotation = -90;
                nameBg.x = 10 + nameBg.height / 2;
                nameBg.y = GameConfig.stageHeigth / 2 - nameBg.width / 2;
                this.servantContainer.addChild(nameBg);
                name_1.x = nameBg.x - name_1.width / 2;
                name_1.y = nameBg.y - name_1.height / 2;
                this.servantContainer.addChild(name_1);
            }
            else {
                var nameBg = BaseBitmap.create("atkracecross_namebg");
                nameBg.x = 30;
                nameBg.y = GameConfig.stageHeigth / 2 - nameBg.height / 2;
                this.servantContainer.addChild(nameBg);
                var name_2 = ComponentManager.getTextField(servantCfg.name, 24, TextFieldConst.COLOR_BLACK);
                name_2.width = 24;
                name_2.x = nameBg.x + nameBg.width / 2 - name_2.width / 2 - 10;
                name_2.y = nameBg.y + nameBg.height / 2 - name_2.height / 2;
                this.servantContainer.addChild(name_2);
            }
        }
        var tip = BaseBitmap.create("atkracecross_threetip");
        tip.x = GameConfig.stageWidth / 2 - tip.width / 2;
        tip.y = y;
        this.servantContainer.addChild(tip);
        var tipFlower = BaseBitmap.create("atkracecross_threetipflower");
        tipFlower.x = tip.x + 60;
        tipFlower.y = tip.y + 52;
        this.servantContainer.addChild(tipFlower);
        var btn = ComponentManager.getButton("atkracecross_showbtnbg", null, this.detailBtnClick, this);
        btn.x = GameConfig.stageWidth - 10 - btn.width;
        btn.y = tip.y + tip.height;
        this.servantContainer.addChild(btn);
        var btnIcon = BaseBitmap.create(this.getDefaultRes("atkracecross_showbtnicon", "10"));
        btnIcon.x = btn.width / 2 - btnIcon.width / 2;
        btnIcon.y = btn.height / 2 - btnIcon.height / 2;
        btn.addChild(btnIcon);
        var btnTxt = BaseBitmap.create("atkracecross_showbtntxt");
        btnTxt.x = btn.width / 2 - btnTxt.width / 2;
        btnTxt.y = btn.height - btnTxt.y - 40;
        btn.addChild(btnTxt);
    };
    AtkracecrossSummaryView.prototype.detailBtnClick = function () {
        var rewardItemVo = GameData.formatRewardItem(this.cfg.specialReward);
        ViewController.getInstance().openView(ViewConst.COMMON.SERVANTWIFEDETAILVIEW, { servantId: rewardItemVo[0].id, wifeId: rewardItemVo[0].id });
    };
    AtkracecrossSummaryView.prototype.getTitleBgName = function () {
        return null;
    };
    AtkracecrossSummaryView.prototype.getTitleStr = function () {
        return null;
    };
    // 关闭按钮图标名称
    AtkracecrossSummaryView.prototype.getCloseBtnName = function () {
        return ButtonConst.POPUP_CLOSE_BTN_1;
    };
    // 初始化背景
    AtkracecrossSummaryView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 1136);
            this.viewBg = BaseLoadBitmap.create(bgName, rect);
            this.viewBg.setPosition(0, (GameConfig.stageHeigth - this.viewBg.height) * 0.1);
            this.addChild(this.viewBg);
        }
    };
    AtkracecrossSummaryView.prototype.initView = function () {
        if (this.cfg.specialReward) {
            this.servantContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this.servantContainer);
        }
        this._crossServerType = this.cfg.getCrossServerType();
        AtkracecrossSummaryView.curCrossServerType = this._crossServerType;
        this.viewBg.y = GameConfig.stageHeigth - this.viewBg.height;
        var titlePic = null;
        if (ResourceManager.hasRes("atkracecross_title-" + this.cfg.getCrossServerType())) {
            titlePic = BaseLoadBitmap.create("atkracecross_title-" + this.cfg.getCrossServerType());
            titlePic.width = 528;
            titlePic.height = 153;
            titlePic.setPosition(GameConfig.stageWidth / 2 - titlePic.width / 2, 10);
        }
        else {
            titlePic = BaseLoadBitmap.create("atkracecross_title");
            titlePic.width = 518;
            titlePic.height = 150;
            titlePic.setPosition(GameConfig.stageWidth / 2 - titlePic.width / 2, 10);
        }
        this.addChildToContainer(titlePic);
        //顶部
        var topBg = BaseBitmap.create("public_v_bg01");
        topBg.height = 128;
        topBg.setPosition(GameConfig.stageWidth / 2 - topBg.width / 2, 152);
        this.addChildToContainer(topBg);
        if (this.cfg.specialReward) {
            this.createSpecial(topBg.y + topBg.height);
        }
        //进入擂台按钮
        this._enterBtn = ComponentManager.getButton("btn_enter_race", null, this.enterRackHandler, this, null, 0);
        this._enterBtn.setPosition(GameConfig.stageWidth / 2 - this._enterBtn.width / 2, 550);
        if (this.cfg.specialReward) {
            this._enterBtn.setPosition(GameConfig.stageWidth / 2 - this._enterBtn.width / 2, GameConfig.stageHeigth - 158 - this._enterBtn.height);
        }
        this.addChildToContainer(this._enterBtn);
        //底部
        var bottomBg = BaseBitmap.create("public_bottombg1");
        bottomBg.height = 168;
        bottomBg.setPosition(GameConfig.stageWidth / 2 - bottomBg.width / 2, GameConfig.stageHeigth - bottomBg.height);
        this.addChildToContainer(bottomBg);
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
        var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime", [crossVo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeDesc.x = 24;
        timeDesc.y = bottomBg.y + 30;
        this.addChildToContainer(timeDesc);
        var qualiStr = "atkracecrossQualification";
        if (LanguageManager.checkHasKey("atkracecrossQualification-" + this._crossServerType)) {
            qualiStr = "atkracecrossQualification-" + this._crossServerType;
        }
        var qualification = ComponentManager.getTextField(LanguageManager.getlocal(qualiStr), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        qualification.x = timeDesc.x;
        qualification.y = timeDesc.y + 35;
        qualification.width = GameConfig.stageWidth - qualification.x * 2;
        qualification.lineSpacing = 6;
        this.addChildToContainer(qualification);
        var timeNumber = 7200;
        var timeNumber2 = 3600 * 24;
        if (crossVo.st > GameData.serverTime - timeNumber) {
            this._enterBtn.visible = false;
            this._cdType = 1;
            this._countDownTime = timeNumber - GameData.serverTime + crossVo.st;
        }
        else if (crossVo.et > GameData.serverTime + timeNumber2) {
            this._cdType = 2;
            this._countDownTime = crossVo.et - GameData.serverTime - timeNumber2;
        }
        else {
            this._cdType = 3;
            this._countDownTime = crossVo.et - GameData.serverTime;
        }
        //test code 
        // this._cdType = 2;
        // this._countDownTime = 10;
        this._cdTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossCDTime" + this._cdType), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._cdTimeDesc.y = topBg.y + 12;
        this.addChildToContainer(this._cdTimeDesc);
        //倒计时
        this._countDownText = ComponentManager.getTextField(this.getCountTimeStr(), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xe50404);
        this._cdTimeDesc.x = GameConfig.stageWidth / 2 - this._cdTimeDesc.width / 2 - this._countDownText.width / 2;
        this._countDownText.setPosition(this._cdTimeDesc.x + this._cdTimeDesc.width, this._cdTimeDesc.y);
        this.addChildToContainer(this._countDownText);
        var leftLine = BaseBitmap.create("public_v_huawen01");
        leftLine.x = this._cdTimeDesc.x - 20 - leftLine.width;
        leftLine.y = this._countDownText.y + this._countDownText.height / 2 - leftLine.height / 2; // + 3;
        var rightLine = BaseBitmap.create("public_v_huawen01");
        rightLine.scaleX = -1;
        rightLine.x = this._countDownText.x + this._countDownText.width + 20 + rightLine.width;
        rightLine.y = this._countDownText.y + this._countDownText.height / 2 - rightLine.height / 2; //+ 3;
        this.addChildToContainer(leftLine);
        this.addChildToContainer(rightLine);
        if (this._cdType == 3) {
            this._countDownText.visible = false;
            this._cdTimeDesc.textColor = TextFieldConst.COLOR_WARN_RED;
            this._cdTimeDesc.x = GameConfig.stageWidth / 2 - this._cdTimeDesc.width / 2;
        }
        this._openDesc = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        this._openDesc.width = 600;
        this._openDesc.setPosition(GameConfig.stageWidth / 2 - this._openDesc.width / 2, this._countDownText.y + 50);
        this._openDesc.lineSpacing = 6;
        this._openDesc.textAlign = egret.HorizontalAlign.CENTER;
        this.addChildToContainer(this._openDesc);
        if (crossVo.st > GameData.serverTime - 300) {
            // this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc1");
            if (LanguageManager.checkHasKey("atkraceCrossOpenDesc1-" + this.cfg.getCrossServerType())) {
                this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc1-" + this.cfg.getCrossServerType());
            }
            else {
                this._openDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc1");
            }
            TimerManager.doTimer(crossVo.st - GameData.serverTime + 300, 1, this.refreshInfo, this);
        }
        else {
            this.refreshInfo();
        }
    };
    AtkracecrossSummaryView.prototype.enterRackHandler = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_INDEX), this.enterCallback, this);
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
        NetManager.request(NetRequestConst.REQUEST_ATKRACECROSS_INDEX, { activeId: crossVo.aidAndCode });
    };
    AtkracecrossSummaryView.prototype.enterCallback = function (data) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_INDEX), this.enterCallback, this);
        if (this._isCanJoin == 0) {
            var zonerankinfos = data.data.data.data.zonerankinfos;
            if (zonerankinfos && zonerankinfos[0]) {
            }
            else {
                return;
            }
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSVIEW, { crossServerType: this.cfg.getCrossServerType() });
    };
    AtkracecrossSummaryView.prototype.tick = function () {
        if (this._countDownText) {
            this._countDownTime--;
            this._countDownText.text = this.getCountTimeStr();
            if (this._countDownTime < 0) {
                this.refreshEnterBtn();
            }
        }
    };
    AtkracecrossSummaryView.prototype.refreshEnterBtn = function () {
        this._cdType += 1;
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
        var timeNumber = 7200;
        var timeNumber2 = 3600 * 24;
        if (this._cdType == 2) {
            this._enterBtn.visible = true;
            this._countDownTime = crossVo.et - GameData.serverTime - timeNumber2;
        }
        else if (this._cdType == 3) {
            this._countDownTime = crossVo.et - GameData.serverTime;
            this._countDownText.visible = false;
            this._cdTimeDesc.textColor = TextFieldConst.COLOR_WARN_RED;
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND);
        }
        else if (this._cdType == 4) {
            ViewController.getInstance().hideAllView();
            var tipStr = "atkracecrossEndTip";
            if (LanguageManager.checkHasKey("atkracecrossEndTip-" + this._crossServerType)) {
                tipStr = "atkracecrossEndTip-" + this._crossServerType;
            }
            App.CommonUtil.showTip(LanguageManager.getlocal(tipStr));
            return;
        }
        this._cdTimeDesc.text = LanguageManager.getlocal("atkracecrossCDTime" + this._cdType);
        this._countDownText.text = this.getCountTimeStr();
        if (this._cdType == 3) {
            this._cdTimeDesc.x = GameConfig.stageWidth / 2 - this._cdTimeDesc.width / 2;
        }
    };
    AtkracecrossSummaryView.prototype.getCountTimeStr = function () {
        var time = this._countDownTime;
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AtkracecrossSummaryView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_INDEX), this.enterCallback, this);
        TimerManager.remove(this.refreshInfo, this);
        this._countDownTime = 0;
        this._countDownText = null;
        this._enterBtn = null;
        this._cdTimeDesc = null;
        this._openDesc = null;
        this._isCanJoin = null;
        this._crossServerType = null;
        AtkracecrossSummaryView.curCrossServerType = null;
        this.servantContainer = null;
        _super.prototype.dispose.call(this);
    };
    AtkracecrossSummaryView.curCrossServerType = null;
    return AtkracecrossSummaryView;
}(CommonView));
__reflect(AtkracecrossSummaryView.prototype, "AtkracecrossSummaryView");
