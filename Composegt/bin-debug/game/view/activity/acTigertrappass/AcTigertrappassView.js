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
 * 虎牢关
 * @author 赵占涛
 */
var AcTigertrappassView = (function (_super) {
    __extends(AcTigertrappassView, _super);
    function AcTigertrappassView() {
        var _this = _super.call(this) || this;
        // 吕布的缩放值
        _this.lvbuScale = 1;
        // 吕布的x
        _this.lvbuX = 0;
        // 吕布的y
        _this.lvbuY = 0;
        _this.guanyuScale = 0.4;
        _this.guanyuX = 0;
        _this.guanyuY = 0;
        _this.zhangfeiScale = 0.4;
        _this.zhangfeiX = 0;
        _this.zhangfeiY = 0;
        _this.wanjiaScale = 0.8;
        _this.wanjiaX = 0;
        _this.wanjiaY = 0;
        return _this;
    }
    Object.defineProperty(AcTigertrappassView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcTigertrappassView.AID, AcTigertrappassView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTigertrappassView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcTigertrappassView.AID, AcTigertrappassView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTigertrappassView.prototype, "acTivityId", {
        get: function () {
            return AcTigertrappassView.AID + "-" + AcTigertrappassView.CODE;
        },
        enumerable: true,
        configurable: true
    });
    AcTigertrappassView.prototype.initBg = function () {
        var bigBg = BaseLoadBitmap.create("tigertrappass_bg");
        bigBg.width = GameConfig.stageWidth;
        bigBg.height = GameConfig.stageHeigth;
        bigBg.touchEnabled = true;
        this.addChild(bigBg);
    };
    AcTigertrappassView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_TIGERTRAPPASSINFO, requestData: { activeId: this.aid + "-" + this.code } };
    };
    AcTigertrappassView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_TIGERTRAPPASSATTACKTHEBOSS), this.getRewardHandler, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, this.backFromServantSkin, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshData, this);
        AcTigertrappassView.AID = this.aid;
        AcTigertrappassView.CODE = this.code;
        this.width = GameConfig.stageWidth;
        this.lvbuNode = new BaseDisplayObjectContainer();
        this.lvbuNode.x = GameConfig.stageWidth / 2 + 20;
        this.lvbuNode.setScale(this.lvbuScale);
        this.addChild(this.lvbuNode);
        // 吕布
        if (App.CommonUtil.check_dragon()) {
            this.boneNode = App.DragonBonesUtil.getLoadDragonBones(Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).bone);
            this.boneNode.y = 300;
            this.lvbuNode.addChild(this.boneNode);
            this.boneNode.setScale(0.9);
        }
        else {
            this.lvbuImg = BaseLoadBitmap.create(Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).body);
            this.lvbuImg.x = -300;
            this.lvbuImg.y = -200;
            this.lvbuImg.setScale(0.8);
            this.lvbuNode.addChild(this.lvbuImg);
        }
        var maskShape = BaseBitmap.create("tigertrappass_lvbumask");
        maskShape.scaleY = 1.3;
        maskShape.x = -this.lvbuNode.x;
        maskShape.y = 100;
        this.lvbuNode.addChild(maskShape);
        this.lvbuDie = BaseBitmap.create("tigertrappass_lvbu_die");
        this.lvbuDie.x = -this.lvbuDie.width / 2;
        this.lvbuDie.y = -this.lvbuDie.height / 2;
        this.lvbuDie.visible = false;
        this.lvbuNode.addChild(this.lvbuDie);
        var bigBg2 = BaseLoadBitmap.create("tigertrappass_bg2");
        bigBg2.width = 640;
        bigBg2.height = 388;
        bigBg2.y = GameConfig.stageHeigth - bigBg2.height;
        this.addChild(bigBg2);
        //活动规则背景图片
        var acruleTxtBg = BaseBitmap.create("tigertrappass_topbg");
        acruleTxtBg.y = 67;
        this.addChild(acruleTxtBg);
        //活动规则文本
        var acruleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTigertrappassRuleInView", [String(this.cfg.cost)]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        acruleTxt.textAlign = egret.HorizontalAlign.CENTER;
        acruleTxt.x = acruleTxtBg.x + acruleTxtBg.width / 2 - acruleTxt.width / 2;
        acruleTxt.y = acruleTxtBg.y + acruleTxtBg.height / 2 - acruleTxt.height / 2 - 5;
        this.addChild(acruleTxt);
        //最近消息背景
        var lastMsgBg = BaseBitmap.create("public_9_bg20");
        lastMsgBg.width = GameConfig.stageWidth;
        lastMsgBg.height = 35;
        lastMsgBg.y = acruleTxtBg.y + acruleTxtBg.height - 5;
        this.addChild(lastMsgBg);
        //最近消息背景文本
        this.runText(lastMsgBg.y + lastMsgBg.height / 2 - 13);
        // 血条
        this.bloodBar = ComponentManager.getProgressBar("progress_blood", "progress_bloodbg", 500);
        this.bloodBar.x = GameConfig.stageWidth / 2 - this.bloodBar.width / 2;
        this.bloodBar.y = lastMsgBg.y + 40;
        this.addChild(this.bloodBar);
        for (var i = 0; i < 9; i++) {
            var bloodSplite = BaseBitmap.create("tigertrappass_blood_splite");
            bloodSplite.x = 24 / 2 + (i + 1) * (this.bloodBar.width - 24) / 10;
            this.bloodBar.addChild(bloodSplite);
        }
        this.bloodTxt = ComponentManager.getTextField("100%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.bloodTxt.x = this.bloodBar.width / 2 - this.bloodTxt.width / 2 + 5;
        this.bloodTxt.y = this.bloodBar.height / 2 - this.bloodTxt.height / 2 - 4;
        this.bloodBar.addChild(this.bloodTxt);
        // 查看吕布
        var skinLookBtn = ComponentManager.getButton("tigertrappass_lookbg", "", this.skinLookClick, this);
        skinLookBtn.x = GameConfig.stageWidth / 2 - skinLookBtn.width / 2;
        this.addChild(skinLookBtn);
        var skinLookTxt = BaseBitmap.create("tigertrappass_look");
        skinLookTxt.x = 55 - skinLookTxt.width / 2;
        skinLookTxt.y = skinLookBtn.height / 2 - skinLookTxt.height / 2;
        skinLookBtn.addChild(skinLookTxt);
        var skinTxt = ComponentManager.getTextField(Config.ServantCfg.getServantItemById(Math.floor(Number(this.cfg.skinExchange) / 10)).name + " " + Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).getSkinName(), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        skinTxt.x = skinLookBtn.width / 2 + 30 - skinTxt.width / 2;
        skinTxt.y = skinLookBtn.height / 2 - skinTxt.height / 2;
        skinLookBtn.addChild(skinTxt);
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
        // 关张二人
        var deltaS = 640 / 460;
        var guanyu = BaseLoadBitmap.create("servant_full_2014");
        guanyu.width = 431 * deltaS;
        guanyu.height = 482;
        guanyu.scaleX = this.guanyuScale;
        guanyu.scaleY = this.guanyuScale;
        guanyu.x = 90;
        guanyu.y = GameConfig.stageHeigth - 292;
        this.guanyuX = guanyu.x;
        this.guanyuY = guanyu.y;
        this.addChild(guanyu);
        this.guanyu = guanyu;
        var zhangfei = BaseLoadBitmap.create("servant_full_2015");
        zhangfei.width = 431 * deltaS;
        zhangfei.height = 482;
        zhangfei.scaleX = -this.zhangfeiScale;
        zhangfei.scaleY = this.zhangfeiScale;
        zhangfei.x = GameConfig.stageWidth - 90;
        zhangfei.y = GameConfig.stageHeigth - 292;
        this.zhangfeiX = zhangfei.x;
        this.zhangfeiY = zhangfei.y;
        this.addChild(zhangfei);
        this.zhangfei = zhangfei;
        // 玩家形象
        var userContainer = Api.playerVoApi.getMyPortrait();
        userContainer.scaleX = this.wanjiaScale;
        userContainer.scaleY = this.wanjiaScale;
        // userContainer.x = GameConfig.stageWidth/2 - userContainer.width * userContainer.scaleX /2;
        if (userContainer.width > 700) {
            userContainer.x = this.width / 2 - 130;
        }
        else {
            userContainer.x = this.width / 2 - userContainer.width / 2 * userContainer.scaleX;
        }
        userContainer.y = GameConfig.stageHeigth - 310;
        this.wanjiaX = userContainer.x;
        this.wanjiaY = userContainer.y;
        this.addChild(userContainer);
        this.wanjia = userContainer;
        userContainer.mask = new egret.Rectangle(0, 0, GameConfig.stageWidth, 300);
        ;
        this.lvbuNode.y = this.bloodBar.y + (userContainer.y - this.bloodBar.y) / 2;
        this.lvbuX = this.lvbuNode.x;
        this.lvbuY = this.lvbuNode.y;
        skinLookBtn.y = this.lvbuNode.y + 122;
        // 小火星
        var starBoneNode = App.DragonBonesUtil.getLoadDragonBones("actigertrappass");
        starBoneNode.x = GameConfig.stageWidth / 2;
        starBoneNode.y = GameConfig.stageHeigth;
        this.addChild(starBoneNode);
        // 底部背景
        var buttomBg = BaseBitmap.create("public_bottombg1");
        buttomBg.height = 145;
        buttomBg.y = GameConfig.stageHeigth - buttomBg.height;
        this.addChild(buttomBg);
        // 兑换
        var rewardLookBtn = ComponentManager.getButton("punish_reward_icon", "", this.rewardLookClick, this);
        rewardLookBtn.x = 20;
        rewardLookBtn.y = buttomBg.y + buttomBg.height / 2 - rewardLookBtn.height / 2 + 10;
        this.addChild(rewardLookBtn);
        var rewardLookTxt = BaseBitmap.create("tigertrappass_exchange_txt");
        rewardLookTxt.x = rewardLookBtn.x + rewardLookBtn.width / 2 - rewardLookTxt.width / 2;
        rewardLookTxt.y = rewardLookBtn.y + 50;
        this.addChild(rewardLookTxt);
        this.exchangeButton = rewardLookBtn;
        // 攻击
        this.atkButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "atkrace_property1", this.atkClick, this);
        this.atkButton.x = buttomBg.x + buttomBg.width / 2 - this.atkButton.width / 2 * this.atkButton.scaleX;
        this.atkButton.y = buttomBg.y + buttomBg.height / 2 - this.atkButton.height / 2 * this.atkButton.scaleY + 10;
        this.addChild(this.atkButton);
        //可攻击次数
        this.atkCountTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTigertrappass_atk_count", [String(this.vo.attacknum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.atkCountTxt.x = this.atkButton.x + this.atkButton.width / 2 - this.atkCountTxt.width / 2;
        this.atkCountTxt.y = this.atkButton.y - this.atkCountTxt.height - 3;
        this.addChild(this.atkCountTxt);
        //剩余时间
        this.countdownTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTigertrappass_countdown_time", [this.vo.acCountDown]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.countdownTxt.x = this.atkButton.x + this.atkButton.width / 2 - this.countdownTxt.width / 2;
        this.countdownTxt.y = this.atkButton.y + this.atkButton.height - 3;
        this.countdownTxt.visible = this.vo.isInActivity();
        this.addChild(this.countdownTxt);
        // 充值
        var rechargeBtn = ComponentManager.getButton("ac_luckbag-1_icon", "", this.rechargeClick, this);
        rechargeBtn.x = GameConfig.stageWidth - 20 - rechargeBtn.width;
        rechargeBtn.y = buttomBg.y + buttomBg.height / 2 - rechargeBtn.height / 2 + 10;
        this.addChild(rechargeBtn);
        var rechargeTxt = BaseBitmap.create("acsevenczhi");
        rechargeTxt.x = rechargeBtn.x + rechargeBtn.width / 2 - rechargeTxt.width / 2;
        rechargeTxt.y = rechargeBtn.y + 50;
        this.addChild(rechargeTxt);
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
    };
    AcTigertrappassView.prototype.randomSay = function () {
        var _this = this;
        if (this.vo.attacksum < this.cfg.num) {
            // 随机一个人说话
            var rndMan = Math.floor(Math.random() * 3);
            var rndSay = Math.floor(Math.random() * 3);
            var rndSayBg_1 = BaseBitmap.create("public_9v_bg11");
            var rndSayTxt_1 = ComponentManager.getTextField(LanguageManager.getlocal("acTigertrappass_" + ["lvbu", "guanyu", "zhangfei"][rndMan] + "_say" + (rndSay + 1)), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
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
            else if (rndMan === 2) {
                rndSayBg_1.x = 540 + rndSayBg_1.width / 2;
                rndSayBg_1.y = GameConfig.stageHeigth - 350 - rndSayBg_1.height / 2;
                rndSayBg_1.scaleX = -1;
            }
            this.addChild(rndSayBg_1);
            rndSayTxt_1.x = rndSayBg_1.x + rndSayBg_1.scaleX * rndSayBg_1.width / 2 - rndSayTxt_1.width / 2;
            rndSayTxt_1.y = rndSayBg_1.y + 20;
            this.addChild(rndSayTxt_1);
            egret.Tween.get(rndSayBg_1)
                .wait(2000)
                .call(function () {
                rndSayBg_1.visible = false;
                rndSayTxt_1.visible = false;
            })
                .wait(2000)
                .call(function () {
                _this.randomSay();
                rndSayBg_1.parent.removeChild(rndSayBg_1);
                rndSayTxt_1.parent.removeChild(rndSayTxt_1);
            });
        }
    };
    //请求回调
    AcTigertrappassView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_TIGERTRAPPASSINFO) {
            if (data.data.data && data.data.data.lampInfo) {
                this.lampInfo = data.data.data.lampInfo;
            }
        }
    };
    AcTigertrappassView.prototype.runText = function (y) {
        var strList = new Array();
        for (var index = 0; index < this.lampInfo.length; index++) {
            var str = this.getTipText(this.lampInfo[index]);
            strList.push(str);
        }
        var lampContainer = new LoopLamp(strList);
        lampContainer.y = y;
        this.addChild(lampContainer);
    };
    AcTigertrappassView.prototype.tick = function () {
        this.countdownTxt.text = LanguageManager.getlocal("acTigertrappass_countdown_time", [this.vo.acCountDown]);
        this.countdownTxt.visible = this.vo.isInActivity();
    };
    // 刷新数据
    AcTigertrappassView.prototype.refreshData = function () {
        var lvbuDieFlag = this.vo.attacksum >= this.cfg.num;
        this.atkCountTxt.text = LanguageManager.getlocal("acTigertrappass_atk_count", [String(this.vo.attacknum)]);
        this.atkCountTxt.visible = this.vo.attacksum < this.cfg.num;
        this.bloodBar.setPercentage(1 - (this.vo.attacksum / this.cfg.num));
        this.bloodTxt.text = Math.floor((1 - (this.vo.attacksum / this.cfg.num)) * 100) + "%";
        this.bloodTxt.x = this.bloodBar.width / 2 - this.bloodTxt.width / 2;
        if (lvbuDieFlag) {
            this.atkButton.setText("acTigertrappass_win");
        }
        else if (this.vo.attacknum >= 10) {
            this.atkButton.setText("acTigertrappass_atk_ten");
        }
        else {
            this.atkButton.setText("atkrace_property1");
        }
        if (this.vo.attacksum < this.cfg.num) {
            App.DisplayUtil.changeToNormal(this.atkButton);
        }
        else {
            App.DisplayUtil.changeToGray(this.atkButton);
        }
        var costItemId = this.cfg.needChipid;
        var costItemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));
        if (!Api.servantVoApi.isOwnSkinOfSkinId(String(this.cfg.skinExchange)) && costItemInfo && costItemInfo.num >= this.cfg.needChipNum) {
            App.CommonUtil.addIconToBDOC(this.exchangeButton);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this.exchangeButton);
        }
        this.lvbuDie.visible = lvbuDieFlag;
        if (lvbuDieFlag) {
            App.DisplayUtil.changeToGray(this.boneNode ? this.boneNode : this.lvbuImg);
        }
        else {
            App.DisplayUtil.changeToNormal(this.boneNode ? this.boneNode : this.lvbuImg);
        }
    };
    AcTigertrappassView.prototype.backFromServantSkin = function () {
        if (App.CommonUtil.check_dragon()) {
            this.boneNode = App.DragonBonesUtil.getLoadDragonBones(Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).bone);
            this.boneNode.y = 300;
            this.boneNode.setScale(0.9);
            this.lvbuNode.addChildAt(this.boneNode, 0);
            if (this.vo.attacksum >= this.cfg.num) {
                App.DisplayUtil.changeToGray(this.boneNode);
            }
            else {
                App.DisplayUtil.changeToNormal(this.boneNode);
            }
        }
    };
    AcTigertrappassView.prototype.getTipText = function (data) {
        var tipStr = "";
        if (!data) {
            return "";
        }
        var itemName = "";
        if (data.ltype == 1) {
            var itemcfg = Config.ItemCfg.getItemCfgById(Number(data.item));
            itemName = itemcfg.name;
        }
        else if (data.ltype == 2) {
            itemName = Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).getSkinName();
        }
        tipStr = LanguageManager.getlocal("acTigertrappass_runTxt" + data.ltype, [data.lname, itemName]);
        return tipStr;
    };
    AcTigertrappassView.prototype.skinLookClick = function () {
        if (App.CommonUtil.check_dragon()) {
            this.lvbuNode.removeChild(this.boneNode);
            this.boneNode.stop();
            this.boneNode.dispose();
        }
        ViewController.getInstance().openView(ViewConst.COMMON.SERVANTSKINCHANGEVIEW, { servantId: Math.floor(Number(this.cfg.skinExchange) / 10), skinId: this.cfg.skinExchange, isDisplay: true });
    };
    AcTigertrappassView.prototype.rewardLookClick = function () {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACTIGERTRAPPASSLISTPOPUPVIEW, { "aid": this.aid, "code": this.code });
    };
    AcTigertrappassView.prototype.atkClick = function () {
        var _this = this;
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.vo.attacksum >= this.cfg.num) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acTigertrappass_win"));
            return;
        }
        if (this.vo.attacknum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acTigertrappass_attack_num_notenough"));
            return;
        }
        var attackCount = this.vo.attacknum >= 10 ? 10 : 1;
        this.attackLvbuHandle(function () {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TIGERTRAPPASSATTACKTHEBOSS, { "activeId": _this.aid + "-" + _this.code, "attack": attackCount });
        });
    };
    AcTigertrappassView.prototype.rechargeClick = function () {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcTigertrappassView.prototype.attackWanjiaHandle = function () {
        var _this = this;
        if (this.vo.attacksum < this.cfg.num) {
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
    AcTigertrappassView.prototype.attackLvbuHandle = function (attackCb) {
        var _this = this;
        // 还原吕布位置
        egret.Tween.removeTweens(this.lvbuNode);
        this.lvbuNode.setScale(this.lvbuScale);
        this.lvbuNode.x = this.lvbuX;
        this.lvbuNode.y = this.lvbuY;
        // 还原关羽位置
        egret.Tween.removeTweens(this.guanyu);
        this.guanyu.setScale(this.guanyuScale);
        this.guanyu.x = this.guanyuX;
        this.guanyu.y = this.guanyuY;
        // 还原张飞位置
        egret.Tween.removeTweens(this.zhangfei);
        this.zhangfei.scaleX = -this.zhangfeiScale;
        this.zhangfei.scaleY = this.zhangfeiScale;
        this.zhangfei.x = this.zhangfeiX;
        this.zhangfei.y = this.zhangfeiY;
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
            if ((_this.vo.attacknum < 10 && _this.vo.attacksum + 1 < _this.cfg.num)
                ||
                    (_this.vo.attacknum >= 10 && _this.vo.attacksum + 10 < _this.cfg.num)) {
                _this.attackWanjiaHandle(); // 如果仅能再打一次了，就不再让吕布攻击了
            }
            attackCb();
        });
        egret.Tween.get(this.guanyu)
            .to({ x: this.guanyuX, y: this.guanyuY + 50 }, 300) //后移		
            .to({ x: this.guanyuX + 50, y: this.lvbuY, scaleX: this.guanyuScale, scaleY: this.guanyuScale }, moveTime1)
            .to({ x: this.guanyuX, y: this.guanyuY, scaleX: this.guanyuScale, scaleY: this.guanyuScale }, moveTime2);
        egret.Tween.get(this.zhangfei)
            .to({ x: this.zhangfeiX, y: this.zhangfeiY + 50 }, 300) //后移		
            .to({ x: this.zhangfeiX - 50, y: this.lvbuY, scaleX: -this.zhangfeiScale, scaleY: this.zhangfeiScale }, moveTime1)
            .to({ x: this.zhangfeiX, y: this.zhangfeiY, scaleX: -this.zhangfeiScale, scaleY: this.zhangfeiScale }, moveTime2);
    };
    AcTigertrappassView.prototype.getHitAnimInfo = function () {
        return ["atk_anim_", 8];
    };
    AcTigertrappassView.prototype.beAttackHand = function (attackLvbu) {
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
            egret.Tween.get(this.guanyu)
                .to({ x: this.guanyuX, y: this.guanyuY + 30 }, 100) //后移		
                .to({ x: this.guanyuX, y: this.guanyuY }, 120);
            egret.Tween.get(this.zhangfei)
                .to({ x: this.zhangfeiX, y: this.zhangfeiY + 30 }, 100) //后移		
                .to({ x: this.zhangfeiX, y: this.zhangfeiY }, 120);
            egret.Tween.get(this.wanjia)
                .to({ x: this.wanjiaX, y: this.wanjiaY + 30 }, 100) //后移		
                .to({ x: this.wanjiaX, y: this.wanjiaY }, 120);
        }
    };
    // 受击动画播放完成回调
    AcTigertrappassView.prototype.clipEndCallback = function () {
        App.LogUtil.log("clipEndCallback");
    };
    // 获得奖励
    AcTigertrappassView.prototype.getRewardHandler = function (event) {
        if (event.data.data.cmd === NetRequestConst.REQUEST_ACTIVITY_TIGERTRAPPASSATTACKTHEBOSS) {
            if (event.data.data.ret === 0) {
                var data = event.data.data.data;
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": data.rewards, "otherRewards": data.otherrewards, "isPlayAni": true });
            }
            else {
                App.CommonUtil.showTip(event.data.data.ret);
            }
        }
    };
    AcTigertrappassView.prototype.getSoundBgName = function () {
        return "music_dailyboss";
    };
    AcTigertrappassView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "punish_reward_icon",
            "ac_luckbag-1_icon",
            "acsevenczhi",
            "tigertrappass_topbg",
            "skin_half_10331",
            "progress_blood",
            "progress_bloodbg",
        ]);
    };
    AcTigertrappassView.prototype.dispose = function () {
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
        this.guanyu = null;
        this.guanyuX = 0;
        this.guanyuY = 0;
        this.zhangfei = null;
        this.zhangfeiScale = 0.4;
        this.zhangfeiX = 0;
        this.zhangfeiY = 0;
        this.wanjia = null;
        this.wanjiaX = 0;
        this.wanjiaY = 0;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_TIGERTRAPPASSATTACKTHEBOSS), this.getRewardHandler, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, this.backFromServantSkin, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshData, this);
        _super.prototype.dispose.call(this);
    };
    AcTigertrappassView.AID = null;
    AcTigertrappassView.CODE = null;
    return AcTigertrappassView;
}(AcCommonView));
__reflect(AcTigertrappassView.prototype, "AcTigertrappassView");
