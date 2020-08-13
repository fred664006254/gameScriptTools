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
 * 追缴敌寇
 * @author hyd
 * @date 2019/9/23
 */
var AcChaseBanditView = (function (_super) {
    __extends(AcChaseBanditView, _super);
    function AcChaseBanditView() {
        var _this = _super.call(this) || this;
        // 吕布的缩放值
        _this.lvbuScale = 1;
        // 吕布的x
        _this.lvbuX = 0;
        // 吕布的y
        _this.lvbuY = 0;
        _this.wanjiaScale = 1;
        _this.wanjiaX = 0;
        _this.wanjiaY = 0;
        _this.atkBtnText = null;
        return _this;
    }
    Object.defineProperty(AcChaseBanditView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcChaseBanditView.AID, AcChaseBanditView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChaseBanditView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcChaseBanditView.AID, AcChaseBanditView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChaseBanditView.prototype, "acTivityId", {
        get: function () {
            return AcChaseBanditView.AID + "-" + AcChaseBanditView.CODE;
        },
        enumerable: true,
        configurable: true
    });
    AcChaseBanditView.prototype.initBg = function () {
        var bigBg = BaseLoadBitmap.create("chasebandit_bg");
        bigBg.width = GameConfig.stageWidth;
        bigBg.height = GameConfig.stageHeigth;
        bigBg.touchEnabled = true;
        this.addChild(bigBg);
    };
    // protected getRequestData(): { requestType: string, requestData: any } {
    //     return { requestType: NetRequestConst.REQUEST_ACTIVITY_TIGERTRAPPASSINFO, requestData: { activeId: this.aid + "-" + this.code } };
    // }
    AcChaseBanditView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHASEBANDIT_ATKBOSS), this.getRewardHandler, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHASEBANDIT_FRESH_ITEM, this.refreshData, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHASEBANDIT_BOXREWARD, this.weathRewardHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHASEBANDIT_TASKREWARD, this.refreshRedDot, this);
        AcChaseBanditView.AID = this.aid;
        AcChaseBanditView.CODE = this.code;
        this.width = GameConfig.stageWidth;
        var titletxt = BaseBitmap.create("chasebandit_title-" + this.code);
        titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
        titletxt.y = 5;
        this.addChild(titletxt);
        this.lvbuNode = new BaseDisplayObjectContainer();
        this.lvbuNode.x = GameConfig.stageWidth / 2 + 20;
        this.lvbuNode.setScale(this.lvbuScale);
        this.addChild(this.lvbuNode);
        // 贼寇
        this.lvbuImg = BaseLoadBitmap.create("chasebandit_bandit-" + this.code);
        this.lvbuImg.x = -200;
        this.lvbuImg.y = -200;
        this.lvbuNode.addChild(this.lvbuImg);
        // let maskShape = BaseBitmap.create("tigertrappass_lvbumask");
        // maskShape.scaleY = 1.3;
        // maskShape.x = -this.lvbuNode.x;
        // maskShape.y = 100;
        // this.lvbuNode.addChild(maskShape);
        this.lvbuDie = BaseBitmap.create("tigertrappass_lvbu_die");
        this.lvbuDie.x = -this.lvbuDie.width / 2 - 40;
        this.lvbuDie.y = -this.lvbuDie.height / 2;
        //this.lvbuDie.visible = false;
        this.lvbuNode.addChild(this.lvbuDie);
        //活动规则背景图片
        var acruleTxtBg = BaseBitmap.create("chasebandit_topbg");
        acruleTxtBg.y = 75;
        this.addChild(acruleTxtBg);
        //活动规则文本
        var acruleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acChaseBanditRuleInView", [String(this.cfg.cost)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
        acruleTxt.width = acruleTxtBg.width - 20;
        acruleTxt.x = acruleTxtBg.x + 10;
        acruleTxt.y = acruleTxtBg.y + acruleTxtBg.height / 2 - 22;
        this.addChild(acruleTxt);
        //活动日期        
        var tip1Text = ComponentManager.getTextField(LanguageManager.getlocal("acChaseBanditTopDate", [this.vo.acTimeAndHour]), 18);
        this.addChild(tip1Text);
        tip1Text.x = acruleTxtBg.x + 15;
        tip1Text.y = acruleTxtBg.y + 7;
        //剩余时间
        var deltaT = this.acVo.et - GameData.serverTime;
        var timeStr = "";
        if (deltaT > 0) {
            timeStr = LanguageManager.getlocal("acChaseBanditTopTime", [App.DateUtil.getFormatBySecond(deltaT, 8)]);
        }
        else {
            timeStr = LanguageManager.getlocal("acChaseBanditTopTime", [LanguageManager.getlocal("acPunishEnd")]);
        }
        var tip2Text = ComponentManager.getTextField(timeStr, 18);
        this.addChild(tip2Text);
        tip2Text.x = GameConfig.stageWidth - tip2Text.width - 15;
        tip2Text.y = acruleTxtBg.y + 7;
        this.countdownTxt = tip2Text;
        if (!this.vo.isInActivity()) {
            this.countdownTxt.text = LanguageManager.getlocal("acChaseBanditTopTime", [LanguageManager.getlocal('acPunishEnd')]);
        }
        // 血条
        this.bloodBar = ComponentManager.getProgressBar("chasebandit_progress_content", "chasebandit_progress_bg", 500);
        this.bloodBar.x = GameConfig.stageWidth / 2 - this.bloodBar.width / 2 - 5;
        this.bloodBar.y = acruleTxtBg.y + acruleTxtBg.height - 7;
        this.addChild(this.bloodBar);
        for (var i = 0; i < 9; i++) {
            var bloodSplite = BaseBitmap.create("chasebandit_blood_splite");
            bloodSplite.x = 24 / 2 + (i + 1) * (this.bloodBar.width - 24) / 10;
            this.bloodBar.addChild(bloodSplite);
        }
        var bloodTitle = ComponentManager.getTextField(LanguageManager.getlocal("acChaseBandit_blood_title"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        this.bloodBar.addChild(bloodTitle);
        bloodTitle.width = 100;
        bloodTitle.textAlign = egret.HorizontalAlign.CENTER;
        bloodTitle.anchorOffsetX = bloodTitle.width / 2;
        bloodTitle.setPosition(45, this.bloodBar.height / 2 - bloodTitle.height / 2 - 10);
        this.bloodTxt = ComponentManager.getTextField("100", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        this.bloodTxt.width = 100;
        this.bloodTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.bloodTxt.x = bloodTitle.x - this.bloodTxt.width / 2;
        this.bloodTxt.y = bloodTitle.y + 22;
        this.bloodBar.addChild(this.bloodTxt);
        // 宝箱
        for (var i = 0; i < this.cfg.lotteryNum.length; i++) {
            var tmprcfg = this.cfg.lotteryNum[i];
            var rStatus = 1;
            if (this.vo.ainfo.stageinfo[i + 1]) {
                rStatus = 3; // 已领取
            }
            else if (this.vo.ainfo.lotterynum >= tmprcfg.needNum) {
                rStatus = 2;
            }
            var imgres = "dailytask_box1_";
            var bgres = "chasebandit_progress_boxbg1";
            if (i == this.cfg.lotteryNum.length - 1) {
                imgres = "dailytask_box2_";
                bgres = "chasebandit_progress_boxbg2";
            }
            var boxBg = BaseBitmap.create(bgres);
            var boxImg = BaseBitmap.create(imgres + String(rStatus));
            boxBg.anchorOffsetX = 60 / 2;
            boxBg.anchorOffsetY = 63 / 2;
            boxImg.anchorOffsetX = 60 / 2;
            boxImg.anchorOffsetY = 64 / 2;
            boxBg.x = this.bloodBar.x + this.bloodBar.width * (0.15 + 0.85 * (tmprcfg.needNum / this.cfg.getMaxBoxNeedNum())) - 10;
            boxBg.y = this.bloodBar.y + 43;
            boxImg.x = this.bloodBar.x + this.bloodBar.width * (0.15 + 0.85 * (tmprcfg.needNum / this.cfg.getMaxBoxNeedNum())) - 11;
            boxImg.y = this.bloodBar.y + 36;
            boxImg.setScale(0.8);
            boxImg.name = "boxImg" + i;
            var lightImg = BaseLoadBitmap.create("dailytask_box_light");
            lightImg.anchorOffsetX = 80 / 2;
            lightImg.anchorOffsetY = 80 / 2;
            lightImg.x = boxImg.x + 5;
            lightImg.name = "lightImg" + i;
            lightImg.y = boxImg.y;
            lightImg.visible = false;
            this.addChild(boxBg);
            this.addChild(lightImg);
            this.addChild(boxImg);
            boxImg.addTouchTap(this.boxClick, this, [i]);
        }
        // 查看吕布
        var skinLookBg = BaseBitmap.create("chasebandit_lookbg-" + this.code);
        skinLookBg.x = this.x + GameConfig.stageWidth / 2 - skinLookBg.width / 2 - 10;
        this.addChild(skinLookBg);
        var skinLookName = BaseBitmap.create("chasebandit_lookname-" + this.code);
        skinLookName.x = skinLookBg.x + skinLookBg.width / 2 - skinLookName.width / 2;
        this.addChild(skinLookName);
        // 大火苗
        var upgradeClip1 = ComponentManager.getCustomMovieClip("tigertrappass_smoke", 10, 1000 / 15);
        upgradeClip1.y = GameConfig.stageHeigth - 230;
        this.addChild(upgradeClip1);
        upgradeClip1.playWithTime();
        var upgradeClip2 = ComponentManager.getCustomMovieClip("tigertrappass_smoke", 10, 1000 / 15);
        upgradeClip2.scaleX = -1;
        upgradeClip2.x = GameConfig.stageWidth;
        upgradeClip2.y = GameConfig.stageHeigth - 230;
        this.addChild(upgradeClip2);
        upgradeClip2.playWithTime();
        // 玩家形象
        var userContainer = Api.playerVoApi.getPlayerPortrait(Number(this.cfg.superp), Api.playerVoApi.getPlayePicId());
        userContainer.scaleX = this.wanjiaScale;
        userContainer.scaleY = this.wanjiaScale;
        // userContainer.x = GameConfig.stageWidth/2 - userContainer.width * userContainer.scaleX /2;
        if (userContainer.width > 700) {
            userContainer.x = this.width / 2 - 130;
        }
        else {
            userContainer.x = this.width / 2 - userContainer.width / 2 * userContainer.scaleX - 10;
        }
        userContainer.y = GameConfig.stageHeigth - 360;
        this.wanjiaX = userContainer.x;
        this.wanjiaY = userContainer.y;
        this.addChild(userContainer);
        this.wanjia = userContainer;
        userContainer.mask = new egret.Rectangle(0, 0, GameConfig.stageWidth, 300);
        ;
        this.lvbuNode.y = this.bloodBar.y + (userContainer.y - this.bloodBar.y) / 2;
        this.lvbuX = this.lvbuNode.x;
        this.lvbuY = this.lvbuNode.y;
        skinLookBg.y = this.lvbuNode.y + 100;
        skinLookName.y = skinLookBg.y + skinLookBg.height / 2 - skinLookName.height / 2 + 15;
        // 小火星
        var starBoneNode = App.DragonBonesUtil.getLoadDragonBones("actigertrappass");
        starBoneNode.x = GameConfig.stageWidth / 2;
        starBoneNode.y = GameConfig.stageHeigth;
        this.addChild(starBoneNode);
        // 底部背景
        var buttomBg = BaseBitmap.create("chasebandit_atkbtn_bg");
        buttomBg.y = GameConfig.stageHeigth - buttomBg.height;
        this.addChild(buttomBg);
        // 攻击
        this.atkButton = ComponentManager.getButton("chasebandit_atkbtn", "", this.atkClick, this);
        this.atkButton.x = buttomBg.x + buttomBg.width / 2 - this.atkButton.width / 2 * this.atkButton.scaleX;
        this.atkButton.y = buttomBg.y + buttomBg.height / 2 - this.atkButton.height / 2 * this.atkButton.scaleY - 25;
        this.addChild(this.atkButton);
        this.atkBtnText = ComponentManager.getTextField("atkrace_property1", TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
        this.atkBtnText.width = this.atkButton.width - 20;
        this.atkBtnText.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this.atkBtnText, this.atkButton, [0, 4]);
        this.addChild(this.atkBtnText);
        //可攻击次数
        this.atkCountTxt = ComponentManager.getTextField(LanguageManager.getlocal("acChaseBandit_atk_count", [String(this.vo.canatknum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.atkCountTxt.x = this.atkButton.x + this.atkButton.width / 2 - this.atkCountTxt.width / 2;
        this.atkCountTxt.y = this.atkButton.y + this.atkButton.height + 2;
        this.addChild(this.atkCountTxt);
        //任务
        var rechargeBtn = ComponentManager.getButton("chasebandit_taskbtn-" + this.getUiCode(), "", this.rechargeClick, this);
        rechargeBtn.name = 'taskBtn';
        rechargeBtn.x = GameConfig.stageWidth - 20 - rechargeBtn.width;
        rechargeBtn.y = buttomBg.y - rechargeBtn.height / 2;
        this.addChild(rechargeBtn);
        var rechargeTxt = BaseBitmap.create("moonnight_taskbtntxt-1");
        rechargeTxt.x = rechargeBtn.x + rechargeBtn.width / 2 - rechargeTxt.width / 2;
        rechargeTxt.y = rechargeBtn.y + 50;
        this.addChild(rechargeTxt);
        var infoBtn = ComponentManager.getButton("chasebandit_showbtn-" + this.getUiCode(), null, function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACCHASEBANDITREWARDPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        infoBtn.setPosition(rechargeBtn.x - 8, rechargeBtn.y - infoBtn.height - 10);
        this.addChild(infoBtn);
        var infoTxt = BaseBitmap.create("moonnight_showbtntxt-1");
        infoTxt.x = infoBtn.x + infoBtn.width / 2 - infoTxt.width / 2 + 2;
        infoTxt.y = infoBtn.y + 50;
        this.addChild(infoTxt);
        // 受击特效
        this.beAttackClip = ComponentManager.getCustomMovieClip(this.getHitAnimInfo()[0], this.getHitAnimInfo()[1], 70);
        this.beAttackClip.setEndCallBack(this.clipEndCallback, this);
        this.beAttackClip.visible = false;
        this.addChild(this.beAttackClip);
        // 开始攻击玩家
        this.attackWanjiaHandle();
        // 开始随机说话
        this.randomSay();
        this.refreshData();
        this.refreshRedDot();
    };
    AcChaseBanditView.prototype.randomSay = function () {
        if (this.vo.attacknum < this.cfg.num) {
            // 随机一个人说话
            var self_1 = this;
            var rndMan = Math.floor(Math.random() * 2);
            var rndSay = Math.floor(Math.random() * 5) + 1;
            var rndSayBg_1 = BaseBitmap.create("public_9v_bg11");
            var lvbuStr = 'lvbu1';
            if (self_1.vo.attacknum >= this.cfg.num * 7 / 10) {
                lvbuStr = 'lvbu2';
            }
            var rndSayTxt_1 = ComponentManager.getTextField(LanguageManager.getlocal("acChaseBandit_" + [lvbuStr, "me"][rndMan] + "_say" + rndSay), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            rndSayBg_1.width = rndSayTxt_1.width + 30;
            rndSayBg_1.height = rndSayTxt_1.height + 60;
            if (rndMan === 0) {
                rndSayBg_1.x = 500 + rndSayBg_1.width / 2;
                rndSayBg_1.y = 300 - rndSayBg_1.height / 2;
                rndSayBg_1.scaleX = -1;
            }
            else if (rndMan === 1) {
                rndSayBg_1.x = 140 - rndSayBg_1.width / 2;
                rndSayBg_1.y = GameConfig.stageHeigth - 350 - rndSayBg_1.height / 2;
            }
            self_1.addChild(rndSayBg_1);
            rndSayTxt_1.x = rndSayBg_1.x + rndSayBg_1.scaleX * rndSayBg_1.width / 2 - rndSayTxt_1.width / 2;
            rndSayTxt_1.y = rndSayBg_1.y + 20;
            self_1.addChild(rndSayTxt_1);
            egret.Tween.get(rndSayBg_1)
                .wait(2000)
                .call(function () {
                rndSayBg_1.visible = false;
                rndSayTxt_1.visible = false;
            })
                .wait(5000)
                .call(function () {
                self_1.randomSay();
                if (rndSayBg_1) {
                    self_1.removeChild(rndSayBg_1);
                }
                if (rndSayTxt_1) {
                    self_1.removeChild(rndSayTxt_1);
                }
            });
        }
    };
    //请求回调
    AcChaseBanditView.prototype.refreshRedDot = function () {
        var taskBtn = this.getChildByName("taskBtn");
        if (this.vo.isHaveTaskRedDot()) {
            App.CommonUtil.addIconToBDOC(taskBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(taskBtn);
        }
    };
    AcChaseBanditView.prototype.receiveData = function (data) {
        // if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_TIGERTRAPPASSINFO) {
        //     if (data.data.data && data.data.data.lampInfo) {
        //         this.lampInfo = data.data.data.lampInfo;
        //     }
        // }
    };
    AcChaseBanditView.prototype.runText = function (y) {
        var strList = new Array();
        for (var index = 0; index < this.lampInfo.length; index++) {
            var str = this.getTipText(this.lampInfo[index]);
            strList.push(str);
        }
        var lampContainer = new LoopLamp(strList);
        lampContainer.y = y;
        this.addChild(lampContainer);
    };
    AcChaseBanditView.prototype.tick = function () {
        if (this.vo.isInActivity()) {
            var deltaT = this.acVo.et - GameData.serverTime;
            this.countdownTxt.text = LanguageManager.getlocal("acChaseBanditTopTime", [App.DateUtil.getFormatBySecond(deltaT, 8)]);
            this.countdownTxt.x = GameConfig.stageWidth - this.countdownTxt.width - 15;
        }
        else {
            this.countdownTxt.text = LanguageManager.getlocal("acChaseBanditTopTime", [LanguageManager.getlocal('acPunishEnd')]);
            this.countdownTxt.x = GameConfig.stageWidth - this.countdownTxt.width - 15;
        }
    };
    // 刷新数据
    AcChaseBanditView.prototype.refreshData = function () {
        var lvbuDieFlag = this.vo.attacknum >= this.cfg.num;
        this.atkCountTxt.text = LanguageManager.getlocal("acChaseBandit_atk_count", [String(this.vo.canatknum)]);
        this.atkCountTxt.visible = this.vo.attacknum < this.cfg.num;
        //进度条特殊 左边有图 起点在16%的地方
        var percent = 0.15 + (this.vo.attacknum / this.cfg.num) * 0.85;
        this.bloodBar.setPercentage(percent);
        var _atkNum = (this.vo.attacknum > this.cfg.num) ? this.cfg.num : this.vo.attacknum;
        this.bloodTxt.text = _atkNum + '';
        if (lvbuDieFlag) {
            this.atkBtnText.text = LanguageManager.getlocal("acChaseBandit_win");
        }
        else if (this.vo.canatknum >= 10) {
            this.atkBtnText.text = LanguageManager.getlocal("acChaseBandit_atk_ten");
        }
        else {
            this.atkBtnText.text = LanguageManager.getlocal("atkrace_property1");
        }
        if (this.vo.attacknum < this.cfg.num) {
            App.DisplayUtil.changeToNormal(this.atkButton);
            App.DisplayUtil.changeToNormal(this.atkBtnText);
        }
        else {
            App.DisplayUtil.changeToGray(this.atkButton);
            App.DisplayUtil.changeToGray(this.atkBtnText);
        }
        var costItemId = ''; //this.cfg.needChipid;
        var costItemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));
        this.lvbuDie.visible = lvbuDieFlag;
        if (lvbuDieFlag) {
            App.DisplayUtil.changeToGray(this.boneNode ? this.boneNode : this.lvbuImg);
        }
        else {
            App.DisplayUtil.changeToNormal(this.boneNode ? this.boneNode : this.lvbuImg);
        }
        // 宝箱状态
        for (var i = 0; i < this.cfg.lotteryNum.length; i++) {
            var tmprcfg = this.cfg.lotteryNum[i];
            // let tmpRew = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(tmpK);
            var boxImg = this.getChildByName("boxImg" + i);
            var lightImg = this.getChildByName("lightImg" + i);
            var rStatus = 1;
            if (this.vo.ainfo.stageinfo[i + 1]) {
                rStatus = 3; // 已领取
            }
            else if (this.vo.ainfo.lotterynum >= tmprcfg.needNum) {
                rStatus = 2;
            }
            var imgres = "dailytask_box1_";
            if (i == this.cfg.lotteryNum.length - 1) {
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
    AcChaseBanditView.prototype.getTipText = function (data) {
        var tipStr = "";
        if (!data) {
            return "";
        }
        var itemName = "";
        if (data.ltype == 1) {
            var itemcfg = Config.ItemCfg.getItemCfgById(Number(data.item));
            itemName = itemcfg.name;
        }
        tipStr = LanguageManager.getlocal("acChaseBandit_runTxt" + data.ltype, [data.lname, itemName]);
        return tipStr;
    };
    AcChaseBanditView.prototype.atkClick = function () {
        var _this = this;
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.vo.attacknum >= this.cfg.num) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acChaseBandit_win"));
            return;
        }
        if (this.vo.canatknum <= 0) {
            this.rechargeClick();
            //App.CommonUtil.showTip(LanguageManager.getlocal("acChaseBandit_attack_num_notenough"));
            return;
        }
        var attackCount = this.vo.canatknum >= 10 ? 10 : 1;
        this.attackLvbuHandle(function () {
            NetManager.request(NetRequestConst.REQUEST_CHASEBANDIT_ATKBOSS, { "activeId": _this.aid + "-" + _this.code, "gid": attackCount });
        });
    };
    //任务界面
    AcChaseBanditView.prototype.rechargeClick = function () {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACCHASEBANDITCHARGEPOPUPVIEW, {
            aid: this.aid,
            code: this.code,
        });
    };
    AcChaseBanditView.prototype.boxClick = function (event, index) {
        App.LogUtil.log("boxClick", index);
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if ((!this.vo.ainfo.stageinfo[index + 1]) && this.vo.ainfo.lotterynum >= this.cfg.lotteryNum[index].needNum) {
            NetManager.request(NetRequestConst.REQUEST_CHASEBANDIT_BOXREWARD, { "activeId": this.aid + "-" + this.code, "gid": index + 1 });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW, { type: this.aid, activeCode: this.code, id: index });
        }
    };
    AcChaseBanditView.prototype.attackWanjiaHandle = function () {
        var _this = this;
        if (this.vo.attacknum < this.cfg.num) {
            var moveTime1 = 60;
            var moveTime2 = 260;
            var scaleTo = 0.75;
            var moveY = GameConfig.stageHeigth;
            var moveTo_1 = egret.Point.create(this.lvbuNode.x + (1 - scaleTo) * this.lvbuNode.width / 2, moveY);
            egret.Tween.get(this.lvbuNode)
                .wait(7000)
                .to({ x: this.lvbuNode.x, y: this.lvbuNode.y - 100 }, 300) //后移		
                .to({ x: moveTo_1.x, y: moveTo_1.y, scaleX: scaleTo, scaleY: scaleTo, }, moveTime1)
                .call(function () {
                _this.beAttackHand(false);
            }, this)
                .to({ x: this.lvbuX, y: this.lvbuY, scaleX: this.lvbuScale, scaleY: this.lvbuScale }, moveTime2)
                .call(function () {
                _this.attackWanjiaHandle();
            });
        }
    };
    AcChaseBanditView.prototype.attackLvbuHandle = function (attackCb) {
        var _this = this;
        // 还原吕布位置
        egret.Tween.removeTweens(this.lvbuNode);
        this.lvbuNode.setScale(this.lvbuScale);
        this.lvbuNode.x = this.lvbuX;
        this.lvbuNode.y = this.lvbuY;
        // 还原玩家位置
        egret.Tween.removeTweens(this.wanjia);
        this.wanjia.setScale(this.wanjiaScale);
        this.wanjia.x = this.wanjiaX;
        this.wanjia.y = this.wanjiaY;
        var moveTime1 = 60;
        var moveTime2 = 260;
        egret.Tween.get(this.wanjia)
            .to({ x: this.wanjiaX, y: this.wanjiaY + 50 }, 300) //后移		
            .to({ x: this.wanjiaX, y: this.lvbuY, scaleX: this.wanjiaScale, scaleY: this.wanjiaScale }, moveTime1)
            .call(function () {
            _this.beAttackHand(true);
        }, this)
            .to({ x: this.wanjiaX, y: this.wanjiaY, scaleX: this.wanjiaScale, scaleY: this.wanjiaScale }, moveTime2)
            .call(function () {
            if ((_this.vo.canatknum < 10 && _this.vo.attacknum + 1 < _this.cfg.num)
                ||
                    (_this.vo.canatknum >= 10 && _this.vo.attacknum + 10 < _this.cfg.num)) {
                _this.attackWanjiaHandle(); // 如果仅能再打一次了，就不再让吕布攻击了
            }
            attackCb();
        });
    };
    AcChaseBanditView.prototype.getHitAnimInfo = function () {
        return ["atk_anim_", 8];
    };
    AcChaseBanditView.prototype.beAttackHand = function (attackLvbu) {
        this.beAttackClip.visible = true;
        if (attackLvbu) {
            this.beAttackClip.setPosition(GameConfig.stageWidth / 2 - 420 / 2, this.lvbuY - 379 / 2);
        }
        else {
            this.beAttackClip.setPosition(GameConfig.stageWidth / 2 - 420 / 2, this.wanjiaY + 100 - 379 / 2);
        }
        this.beAttackClip.goToAndPlay(0);
        this.beAttackClip.playWithTime(1);
        if (attackLvbu) {
            egret.Tween.get(this.lvbuNode)
                .to({ x: this.lvbuX, y: this.lvbuY - 50 }, 100) //后移		
                .to({ x: this.lvbuX, y: this.lvbuY }, 120);
        }
        else {
            egret.Tween.get(this.wanjia)
                .to({ x: this.wanjiaX, y: this.wanjiaY + 30 }, 100) //后移		
                .to({ x: this.wanjiaX, y: this.wanjiaY }, 120);
        }
    };
    // 受击动画播放完成回调
    AcChaseBanditView.prototype.clipEndCallback = function () {
        App.LogUtil.log("clipEndCallback");
    };
    // 获得奖励
    AcChaseBanditView.prototype.getRewardHandler = function (event) {
        if (event.data.data.cmd === NetRequestConst.REQUEST_CHASEBANDIT_ATKBOSS) {
            if (event.data.data.ret === 0) {
                var data = event.data.data.data;
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": data.rewards, "otherRewards": data.otherrewards, "isPlayAni": true });
            }
            else {
                App.CommonUtil.showTip(event.data.data.ret);
            }
        }
    };
    //进度奖励
    AcChaseBanditView.prototype.weathRewardHandle = function (event) {
        if (event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var rewardVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVo);
        }
    };
    AcChaseBanditView.prototype.getSoundBgName = function () {
        return "music_dailyboss";
    };
    AcChaseBanditView.prototype.getTitleBgName = function () {
        return "chasebandit_titlebg";
    };
    AcChaseBanditView.prototype.getTitleStr = function () {
        return "";
    };
    AcChaseBanditView.prototype.getRuleInfo = function () {
        return "acChaseBanditRuleInfo";
    };
    AcChaseBanditView.prototype.getResourceList = function () {
        var code = this.code;
        return _super.prototype.getResourceList.call(this).concat([
            "punish_reward_icon",
            "acsevenczhi",
            "chasebandit_topbg",
            "skin_half_10331",
            "chasebandit_progress_bg",
            "chasebandit_progress_content",
            "chasebandit_bandit-" + code,
            "chasebandit_lookbg-" + code,
            "chasebandit_lookname-" + code,
            "chasebandit_title-" + code,
            "dailytask_box1_1",
            "dailytask_box1_2",
            "dailytask_box1_3",
            "dailytask_box2_1",
            "dailytask_box2_2",
            "dailytask_box2_3",
            "chasebandit_progress_boxbg1",
            "chasebandit_progress_boxbg2",
            "tigertrappass_lvbu_die",
            "chasebandit_atkbtn_bg",
            "chasebandit_atkbtn",
            "chasebandit_taskbtn-" + code,
            "moonnight_taskbtntxt-1",
            "chasebandit_showbtn-" + code,
            "moonnight_showbtntxt-1",
            "chasebandit_titlebg",
        ]);
    };
    AcChaseBanditView.prototype.dispose = function () {
        this.bloodBar = null;
        this.bloodTxt = null;
        this.atkCountTxt = null;
        this.countdownTxt = null;
        this.lampInfo = null;
        this.atkButton = null;
        this.lvbuNode = null;
        this.boneNode = null;
        this.lvbuImg = null;
        this.lvbuX = 0;
        this.lvbuY = 0;
        this.lvbuDie = null;
        this.beAttackClip = null;
        this.exchangeButton = null;
        this.wanjia = null;
        this.wanjiaX = 0;
        this.wanjiaY = 0;
        this.atkBtnText = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHASEBANDIT_ATKBOSS), this.getRewardHandler, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHASEBANDIT_FRESH_ITEM, this.refreshData, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHASEBANDIT_BOXREWARD, this.weathRewardHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHASEBANDIT_TASKREWARD, this.refreshRedDot, this);
        _super.prototype.dispose.call(this);
    };
    AcChaseBanditView.AID = null;
    AcChaseBanditView.CODE = null;
    return AcChaseBanditView;
}(AcCommonView));
__reflect(AcChaseBanditView.prototype, "AcChaseBanditView");
