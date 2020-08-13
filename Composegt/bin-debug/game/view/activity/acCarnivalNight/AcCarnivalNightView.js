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
var AcCarnivalNightView = (function (_super) {
    __extends(AcCarnivalNightView, _super);
    function AcCarnivalNightView() {
        var _this = _super.call(this) || this;
        // 蝙蝠的缩放值
        _this.lvbuScale = 1;
        _this.atkBtnText = null;
        _this._hitBossHp = 0;
        _this._isLast = false;
        _this._bloodTitle = null;
        _this._isPlay = false;
        return _this;
    }
    Object.defineProperty(AcCarnivalNightView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcCarnivalNightView.AID, AcCarnivalNightView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCarnivalNightView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcCarnivalNightView.AID, AcCarnivalNightView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCarnivalNightView.prototype, "acTivityId", {
        get: function () {
            return AcCarnivalNightView.AID + "-" + AcCarnivalNightView.CODE;
        },
        enumerable: true,
        configurable: true
    });
    AcCarnivalNightView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACTIVITY2S_GETCARNIVALINFO, requestData: { activeId: this.aid + "-" + this.code } };
    };
    AcCarnivalNightView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY2S_GETCARNIVALINFO) {
            if (data.data.data.bathp && data.data.data.bathp >= 0) {
                this._hitBossHp = data.data.data.bathp;
                this._isLast = false;
            }
            else {
                this._hitBossHp = 10000;
                this._isLast = true;
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CARNIVALNIGHT_FRESH_ITEM);
        }
    };
    AcCarnivalNightView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_CARNIVALATTACK, this.getRewardHandler, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CARNIVALNIGHT_FRESH_ITEM, this.refreshData, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETCARNIVALITEMA, this.costRewardHandel, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETCARNIVALITEMU, this.costRewardHandel, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETCARNIVALITEMT, this.taskRewardHandel, this);
        AcCarnivalNightView.AID = this.aid;
        AcCarnivalNightView.CODE = this.code;
        this.width = GameConfig.stageWidth;
        //官报
        if (this.vo.isInActivity()) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACCARNIVALNIGHTREPORTVIEW, { aid: this.aid, code: this.code });
        }
        var titletxt = BaseBitmap.create("carnivalnight_title-" + this.code);
        titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
        titletxt.y = 0;
        this.addChild(titletxt);
        //背景小蝙蝠
        var pos = {
            '1': { x: 53, y: 495 },
            '2': { x: 451, y: 526 },
            '3': { x: 516, y: 473 },
            '4': { x: 483, y: 309 },
            '5': { x: 76, y: 281 },
        };
        for (var i = 1; i <= 5; i++) {
            var smallBat = BaseBitmap.create("carnivalnight_smallbat" + i + "-1");
            this.addChild(smallBat);
            smallBat.setPosition(pos[String(i)].x, pos[String(i)].y);
        }
        this.lvbuNode = new BaseDisplayObjectContainer();
        this.lvbuNode.x = GameConfig.stageWidth / 2;
        this.lvbuNode.setScale(this.lvbuScale);
        this.addChild(this.lvbuNode);
        //活动规则背景图片
        var acruleTxtBg = BaseBitmap.create("carnivalnight_descbg");
        acruleTxtBg.y = 75;
        this.addChild(acruleTxtBg);
        //活动规则文本
        var acruleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCarnivalNightRuleInView"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
        acruleTxt.width = acruleTxtBg.width - 20;
        acruleTxt.x = acruleTxtBg.x + 15;
        acruleTxt.y = acruleTxtBg.y + acruleTxtBg.height / 2 - 22;
        this.addChild(acruleTxt);
        //活动日期        
        var tip1Text = ComponentManager.getTextField(LanguageManager.getlocal("acCarnivalNightTopDate", [this.vo.acTimeAndHour]), 18);
        this.addChild(tip1Text);
        tip1Text.x = acruleTxtBg.x + 15;
        tip1Text.y = acruleTxtBg.y + 7;
        //剩余时间
        var deltaT = this.acVo.et - GameData.serverTime;
        var tip2Text = ComponentManager.getTextField(LanguageManager.getlocal("acCarnivalNightTopTime", [App.DateUtil.getFormatBySecond(deltaT, 8)]), 18);
        //tip2Text.width = 180;
        this.addChild(tip2Text);
        tip2Text.x = GameConfig.stageWidth - tip2Text.width - 15;
        tip2Text.y = acruleTxtBg.y + 7;
        this.countdownTxt = tip2Text;
        if (!this.vo.isInActivity()) {
            this.countdownTxt.text = LanguageManager.getlocal("acCarnivalNightTopTime", [LanguageManager.getlocal('acPunishEnd')]);
        }
        // 蝙蝠boss
        if (App.CommonUtil.check_dragon()) {
            this.lvbuDro = App.DragonBonesUtil.getLoadDragonBones('halloween_bat');
            this.lvbuDro.x = 20;
            this.lvbuDro.y = acruleTxtBg.y + acruleTxtBg.height + 380;
            this.lvbuNode.addChild(this.lvbuDro);
            var tmpthis_1 = this;
            this.lvbuDro.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, function (param1) {
                // this._dbdragon.playDragonMovie('idle',0);
                var animationName = param1.animationName;
                if (animationName == "hit") {
                    tmpthis_1.lvbuDro.playDragonMovie("idle", 0);
                }
            }, this);
        }
        else {
            this.lvbuImg = BaseBitmap.create("carnivalnight_boss-" + this.code);
            this.lvbuImg.x = -this.lvbuImg.width / 2;
            this.lvbuImg.y = -120;
            this.lvbuNode.addChild(this.lvbuImg);
            this.batFaceImg = BaseBitmap.create("carnivalnight_bossface1-" + this.code);
            this.batFaceImg.setPosition(this.lvbuImg.x + 284.5, this.lvbuImg.y + 40);
            this.lvbuNode.addChild(this.batFaceImg);
        }
        // 血条
        this.bloodBar = ComponentManager.getProgressBar("carnivalnight_progress_content", "carnivalnight_progress_bg", 438);
        this.bloodBar.x = GameConfig.stageWidth / 2 - this.bloodBar.width / 2 - 5;
        this.bloodBar.y = acruleTxtBg.y + acruleTxtBg.height + 50;
        this.addChild(this.bloodBar);
        var bloodHead = BaseBitmap.create("carnivalnight_progresshead");
        bloodHead.setPosition(-90, -46);
        this.bloodBar.addChild(bloodHead);
        var bloodTitle = ComponentManager.getTextField(LanguageManager.getlocal("acCarnivalNight_blood_title", [this.vo.theturn + '']), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this.bloodBar.addChild(bloodTitle);
        //bloodTitle.width = 100;
        bloodTitle.textAlign = egret.HorizontalAlign.CENTER;
        bloodTitle.anchorOffsetX = bloodTitle.width / 2;
        bloodTitle.setPosition(bloodHead.x + 55, bloodHead.y + 50);
        this._bloodTitle = bloodTitle;
        var btnMask = BaseBitmap.create('public_alphabg');
        btnMask.width = btnMask.height = 100;
        btnMask.setPosition(bloodHead.x + bloodHead.width - btnMask.width, bloodHead.y + bloodHead.height / 2 - bloodHead.height / 2);
        btnMask.addTouchTap(this.rechargeClick, this, [true]);
        this.bloodBar.addChild(btnMask);
        // 玩家形象
        var lv = Api.playerVoApi.getTitleid() || Api.playerVoApi.getPlayerLevel();
        var userContainer = Api.playerVoApi.getPlayerPortrait(lv, this.cfg.show);
        if (userContainer.width > 700) {
            userContainer.x = GameConfig.stageWidth / 2 - userContainer.width * userContainer.scaleX / 2 + 170;
        }
        else {
            userContainer.x = GameConfig.stageWidth / 2 - userContainer.width * userContainer.scaleX / 2;
        }
        userContainer.y = GameConfig.stageHeigth - 360;
        this.addChild(userContainer);
        userContainer.mask = new egret.Rectangle(0, 0, GameConfig.stageWidth, 300);
        ;
        this.lvbuNode.y = this.bloodBar.y + (userContainer.y - this.bloodBar.y) / 2;
        // 底部背景
        var buttomBg = BaseBitmap.create("carnivalnight_bottombg");
        buttomBg.y = GameConfig.stageHeigth - buttomBg.height;
        this.addChild(buttomBg);
        // 攻击
        this.atkButton = ComponentManager.getButton("carnivalnight_attackbtn", "", this.atkClick, this);
        this.atkButton.x = buttomBg.x + buttomBg.width / 2 - this.atkButton.width / 2 * this.atkButton.scaleX - 3;
        this.atkButton.y = buttomBg.y + buttomBg.height / 2 - this.atkButton.height / 2 * this.atkButton.scaleY + 30;
        this.addChild(this.atkButton);
        this.atkBtnText = ComponentManager.getTextField("acCarnivalNight_attack", TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
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
        var rechargeBtn = ComponentManager.getButton("carnivalnight_taskbtn", "", this.rechargeClick, this);
        rechargeBtn.name = 'taskBtn';
        rechargeBtn.x = GameConfig.stageWidth - 20 - rechargeBtn.width;
        rechargeBtn.y = buttomBg.y - rechargeBtn.height / 2 + 70;
        this.addChild(rechargeBtn);
        var rechargeTxt = BaseBitmap.create("moonnight_taskbtntxt-1");
        rechargeTxt.x = rechargeBtn.x + rechargeBtn.width / 2 - rechargeTxt.width / 2;
        rechargeTxt.y = rechargeBtn.y + 50;
        this.addChild(rechargeTxt);
        // 开始随机说话
        this.refreshData();
        this.refreshRedDot();
    };
    //请求回调
    AcCarnivalNightView.prototype.refreshRedDot = function () {
        var taskBtn = this.getChildByName("taskBtn");
        if (this.vo.isHaveTaskRedDot()) {
            App.CommonUtil.addIconToBDOC(taskBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(taskBtn);
        }
    };
    AcCarnivalNightView.prototype.tick = function () {
        if (this.vo.isInActivity()) {
            var deltaT = this.acVo.et - GameData.serverTime;
            this.countdownTxt.text = LanguageManager.getlocal("acCarnivalNightTopTime", [App.DateUtil.getFormatBySecond(deltaT, 8)]);
            this.countdownTxt.x = GameConfig.stageWidth - this.countdownTxt.width - 15;
        }
        else {
            this.countdownTxt.text = LanguageManager.getlocal("acCarnivalNightTopTime", [LanguageManager.getlocal('acPunishEnd')]);
            this.countdownTxt.x = GameConfig.stageWidth - this.countdownTxt.width - 15;
        }
    };
    // 刷新数据
    AcCarnivalNightView.prototype.refreshData = function () {
        this.atkCountTxt.text = LanguageManager.getlocal("acCarnivalNight_atk_count", [String(this.vo.canatknum)]);
        var percent = this._hitBossHp / this.vo.bossHp;
        percent = Math.min(percent, 1);
        if (this._isLast) {
            percent = 1;
        }
        this.bloodBar.setPercentage(percent, this._isLast ? '' : (Math.floor(percent * 100) + '%'));
        this._bloodTitle.text = LanguageManager.getlocal("acCarnivalNight_blood_title", [this.vo.theturn + '']);
        if (this.vo.canatknum >= 10) {
            this.atkBtnText.text = LanguageManager.getlocal("acChaseBandit_atk_ten");
        }
        else {
            this.atkBtnText.text = LanguageManager.getlocal("acCarnivalNight_attack");
        }
        if (this.vo.isInActivity()) {
            App.DisplayUtil.changeToNormal(this.atkButton);
            App.DisplayUtil.changeToNormal(this.atkBtnText);
        }
        else {
            App.DisplayUtil.changeToGray(this.atkButton);
            App.DisplayUtil.changeToGray(this.atkBtnText);
        }
        this.refreshRedDot();
    };
    AcCarnivalNightView.prototype.atkClick = function () {
        if (this._isPlay) {
            return;
        }
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.vo.canatknum <= 0) {
            this.rechargeClick();
            //App.CommonUtil.showTip(LanguageManager.getlocal("acCarnivalNight_attack_num_notenough"));
            return;
        }
        this._isPlay = true;
        var attackCount = this.vo.canatknum >= 10 ? 1 : 0;
        this.attackLvbuHandle(attackCount);
    };
    //任务界面
    AcCarnivalNightView.prototype.rechargeClick = function (event, param) {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        var viewStr = '';
        if (param) {
            viewStr = ViewConst.POPUP.ACCARNIVALNIGHTTASKTAB3;
        }
        else {
            viewStr = ViewConst.POPUP.ACCARNIVALNIGHTTASKPOPUPVIEW;
        }
        ViewController.getInstance().openView(viewStr, {
            aid: this.aid,
            code: this.code,
        });
    };
    AcCarnivalNightView.prototype.attackLvbuHandle = function (attackCount) {
        var _this = this;
        if (this.lvbuImg) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_CARNIVALATTACK, { "activeId": this.aid + "-" + this.code, "isTenPlay": attackCount });
        }
        else {
            egret.setTimeout(function () {
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_CARNIVALATTACK, { "activeId": _this.aid + "-" + _this.code, "isTenPlay": attackCount });
            }, this, 1000);
            this.lvbuDro.playDragonMovie('hit', 1);
        }
    };
    // 获得奖励
    AcCarnivalNightView.prototype.getRewardHandler = function (event) {
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETCARNIVALINFO, { "activeId": this.aid + "-" + this.code });
        if (event.data.data.cmd === NetRequestConst.REQUEST_ACTIVITY2S_CARNIVALATTACK) {
            if (event.data.data.ret === 0) {
                this._isPlay = false;
                var data = event.data.data.data;
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": data.rewards, "otherRewards": data.otherrewards, "isPlayAni": true });
            }
            else {
                App.CommonUtil.showTip(event.data.data.ret);
            }
        }
    };
    /**
     * 领奖回调
     */
    AcCarnivalNightView.prototype.taskRewardHandel = function (event) {
        var view = this;
        if (event.data.ret) {
            // taskId
            var list = [];
            //let rechargeId = view.vo.selIdx;
            var starnum = event.data.data.data.addnum;
            if (starnum) {
                var icon = "carnivalnight_icon-" + view.getUiCode();
                var starItem = { icon: icon, tipMessage: "+" + String(starnum), type: 0 };
                list.push(starItem);
            }
            var reward = event.data.data.data.rewards;
            var rewardVo = GameData.formatRewardItem(reward);
            for (var key in rewardVo) {
                var item = { icon: rewardVo[key].icon, tipMessage: rewardVo[key].tipMessage, type: rewardVo[key].type };
                list.push(item);
            }
            App.CommonUtil.playRewardFlyAction(list);
            this.refreshRedDot();
        }
    };
    AcCarnivalNightView.prototype.costRewardHandel = function (event) {
        if (event.data.ret) {
            // taskId
            var list = [];
            var reward = event.data.data.data.rewards;
            var rewardVo = GameData.formatRewardItem(reward);
            for (var key in rewardVo) {
                var item = { icon: rewardVo[key].icon, tipMessage: rewardVo[key].tipMessage, type: rewardVo[key].type };
                list.push(item);
            }
            App.CommonUtil.playRewardFlyAction(list);
            this.refreshRedDot();
        }
    };
    //进度奖励
    AcCarnivalNightView.prototype.weathRewardHandle = function (event) {
        if (event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var rewardVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVo);
        }
    };
    AcCarnivalNightView.prototype.getBgName = function () {
        return "carnivalnight_bg-" + this.code;
    };
    AcCarnivalNightView.prototype.getTitleBgName = function () {
        return "carnivalnight_titlebg";
    };
    AcCarnivalNightView.prototype.getTitleStr = function () {
        return "";
    };
    AcCarnivalNightView.prototype.getRuleInfo = function () {
        return "acCarnivalNightRuleInfo";
    };
    AcCarnivalNightView.prototype.getResourceList = function () {
        var code = this.code;
        return _super.prototype.getResourceList.call(this).concat([
            "moonnight_taskbtntxt-1",
            "carnivalnight_progress_content",
            "carnivalnight_bottombg",
            "carnivalnight_progresshead",
            "carnivalnight_progress_bg",
            "carnivalnight_titlebg",
            "carnivalnight_attackbtn",
            "carnivalnight_descbg",
            "carnivalnight_taskbtn",
            "carnivalnight_bg-" + code,
            "carnivalnight_title-" + code,
            "carnivalnight_item-" + code,
            "carnivalnight_boss-" + code,
            "carnivalnight_bosshit-" + code,
            "carnivalnight_bossface1-" + code,
            "carnivalnight_bossface2-" + code,
            "carnivalnight_smallbat1-" + code,
            "carnivalnight_smallbat2-" + code,
            "carnivalnight_smallbat3-" + code,
            "carnivalnight_smallbat4-" + code,
            "carnivalnight_smallbat5-" + code,
        ]);
    };
    AcCarnivalNightView.prototype.dispose = function () {
        this.bloodBar = null;
        this.atkCountTxt = null;
        this.countdownTxt = null;
        this.atkButton = null;
        this.lvbuNode = null;
        this.lvbuImg = null;
        this.atkBtnText = null;
        this._hitBossHp = 0;
        this._isLast = false;
        this._bloodTitle = null;
        this.batFaceImg = null;
        this._isPlay = false;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_CARNIVALATTACK, this.getRewardHandler, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CARNIVALNIGHT_FRESH_ITEM, this.refreshData, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETCARNIVALITEMA, this.costRewardHandel, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETCARNIVALITEMU, this.costRewardHandel, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETCARNIVALITEMT, this.taskRewardHandel, this);
        _super.prototype.dispose.call(this);
    };
    AcCarnivalNightView.AID = null;
    AcCarnivalNightView.CODE = null;
    return AcCarnivalNightView;
}(AcCommonView));
__reflect(AcCarnivalNightView.prototype, "AcCarnivalNightView");
