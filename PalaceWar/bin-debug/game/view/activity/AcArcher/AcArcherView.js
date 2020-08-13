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
  * 黄忠活动
  * author 张朝阳
  * date 2018/6/19
  * @class AcArcherView
  */
var AcArcherView = (function (_super) {
    __extends(AcArcherView, _super);
    function AcArcherView() {
        var _this = _super.call(this) || this;
        /**
         * 杀敌数
         */
        _this._numTF = null;
        /**
         * 杀敌数的进度
         */
        _this._progress = null;
        /**
         * 进度条的宽度
         */
        _this._progressWidth = 372;
        /**
         * 杀敌数bg
         */
        _this._numBg = null;
        /**
         * 射一箭btn
         */
        _this._singleBtn = null;
        /**
         * 射手
         */
        _this._archerBM = null;
        /**
         * 箭
         */
        _this._arrowBM = null;
        /**
         * 敌人受伤
         */
        _this._hurtBM = null;
        _this._rechargebtn = null;
        /**
         * 黄忠活动ID
         */
        _this.activeId = null;
        /**
         * 防止连续点击操作
         */
        _this.isSendMessage = false;
        /**
         * 一个的现实文本
         */
        _this._singleTF = null;
        return _this;
    }
    Object.defineProperty(AcArcherView.prototype, "cfg", {
        /**
         * 配置文件数据
         */
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACARCHER, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArcherView.prototype, "vo", {
        /**
         * 服务器返回数据
         */
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACARCHER, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcArcherView.prototype.getContainerY = function () {
        return 5;
    };
    /**获取资源数组 */
    AcArcherView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["acarcherview_BottomBg", "acarcherview_many", "acarcherview_single",
            "acarcherview_Recharge_btn", "acarcherview_Recharge_btn_down", "acarcherview_Rank_btn", "acarcherview_Rank_btn_down",
            "acturantable_task_box1_1", "acturantable_task_box1_2", "acturantable_task_box1_3",
            "acturantable_task_box2_1", "acturantable_task_box2_2", "acturantable_task_box2_3",
            "forpeople_top", "acarcherview_buttombg", "progress11_bg", "progress11", "acarcherview_BoxBg", "acarcherview_numBg",
            "acturantable_taskbox_light", "empshop_tag", "accarnivalview_tab_red", "progress5", "progress3_bg",
            "rank_1", "rank_2", "rank_3", "punish_ani54_0", "punish_ani54", "acarcherview_archer", "acarcherview_bg", "acarcherview_hurt", "acarcherview_wall",
            "acarcherview_info", "acarcherview_infobtn_down", "acarcherview_infobtn",]);
    };
    /**入口函数 */
    AcArcherView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.updateRedDot, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETARCHERITEAMB, this.updateRedDot, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETARCHERLOTTERY), this.buyBtnHandler, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETARCHERITEAMA), this.rewardBoxHandler, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETARCHERRANK), this.rankBtnHandler, this);
        this.activeId = this.aid + "-" + this.code;
        //背景图
        var centerbg = BaseBitmap.create("acarcherview_bg");
        centerbg.setPosition(0, GameConfig.stageHeigth - centerbg.height - 120);
        this.addChildToContainer(centerbg);
        //顶部背景
        var topBg = BaseBitmap.create("forpeople_top");
        topBg.setPosition(0, this.getContainerY() - 13);
        this.addChildToContainer(topBg);
        //活动时间
        var ac_timeTF = ComponentManager.getTextField(LanguageManager.getlocal("AcArcherViewTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        ac_timeTF.setPosition(15, topBg.y + 15);
        this.addChildToContainer(ac_timeTF);
        //活动奖励
        var ac_rewardTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcherViewKillRewardTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        ac_rewardTF.setPosition(ac_timeTF.x, ac_timeTF.y + ac_timeTF.height + 15);
        this.addChildToContainer(ac_rewardTF);
        //奖励背景
        var rewardBg = BaseBitmap.create("public_itemmask");
        rewardBg.width = 500;
        rewardBg.height = 103;
        rewardBg.setPosition(GameConfig.stageWidth - rewardBg.width - 20, ac_timeTF.y + ac_timeTF.height + 10);
        this.addChildToContainer(rewardBg);
        //奖励item
        var rewardPoolcfg = this.cfg.lotteryPool;
        var rewardPool = [];
        for (var key in rewardPoolcfg) {
            rewardPool.push(rewardPoolcfg[key][0]);
        }
        var rIcons = GameData.getRewardItemIcons(rewardPool.join("|"), true);
        var scrolNode = new BaseDisplayObjectContainer();
        for (var i = 0; i < rIcons.length; i++) {
            rIcons[i].setScale(0.85);
            rIcons[i].setPosition(rIcons[i].width * i, 0);
            scrolNode.addChild(rIcons[i]);
        }
        var rect = new egret.Rectangle(rewardBg.x + 10, rewardBg.y + 5, rewardBg.width - 20, rewardBg.height);
        var scrollview = ComponentManager.getScrollView(scrolNode, rect);
        scrollview.bounces = false;
        this.addChildToContainer(scrollview);
        //受伤变红
        this._hurtBM = BaseBitmap.create("acarcherview_hurt");
        this._hurtBM.setPosition(269, centerbg.y + 513);
        this.addChildToContainer(this._hurtBM);
        this._hurtBM.setVisible(false);
        //城墙
        var wallBM = BaseBitmap.create("acarcherview_wall");
        wallBM.setPosition(topBg.x, GameConfig.stageHeigth - wallBM.height - 108);
        //黄忠
        this._archerBM = BaseBitmap.create("acarcherview_archer");
        this._archerBM.anchorOffsetX = this._archerBM.width / 2;
        this._archerBM.anchorOffsetY = this._archerBM.height / 2;
        // this._archerBM.setScale(0.8); //层级
        this._archerBM.setPosition(wallBM.x + this._archerBM.width / 2, wallBM.y - this._archerBM.height / 2 + 80);
        this.addChildToContainer(this._archerBM);
        this.addChildToContainer(wallBM);
        //箭
        this._arrowBM = BaseBitmap.create("punish_ani54");
        this._arrowBM.setPosition(this._hurtBM.x + this._hurtBM.width / 2 - this._arrowBM.width / 2, GameConfig.stageHeigth + this._hurtBM.height);
        this.addChildToContainer(this._arrowBM);
        this._arrowBM.setScale(5);
        //排行榜按钮
        var rankBtn = ComponentManager.getButton("acarcherview_Rank_btn", null, this.clickRank, this);
        rankBtn.setPosition(20, topBg.y + topBg.height + 10);
        this.addChildToContainer(rankBtn);
        //充值按钮
        this._rechargebtn = ComponentManager.getButton("acarcherview_Recharge_btn", null, this.clickRecharge, this);
        this._rechargebtn.setPosition(rankBtn.x - 6, rankBtn.y + rankBtn.height + 15);
        this.addChildToContainer(this._rechargebtn);
        var infoBtn = ComponentManager.getButton("acarcherview_infobtn", null, this.clickInfo, this);
        infoBtn.setPosition(rankBtn.x - 8, this._rechargebtn.y + this._rechargebtn.height + 15);
        this.addChildToContainer(infoBtn);
        //杀敌数bg
        this._numBg = BaseBitmap.create("acarcherview_numBg");
        this._numBg.setPosition(GameConfig.stageWidth - this._numBg.width - 10, rankBtn.y + 10);
        this.addChildToContainer(this._numBg);
        //杀敌数 //服务器
        this._numTF = ComponentManager.getTextField(String(this.vo.getArcherNum()), TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
        this._numTF.setPosition(this._numBg.x + this._numBg.width / 2 - this._numTF.width / 2, this._numBg.y + 15);
        this.addChildToContainer(this._numTF);
        //当前杀敌数文本
        var numTF2 = ComponentManager.getTextField(LanguageManager.getlocal("acArcherViewNowKill"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        numTF2.setPosition(this._numBg.x + this._numBg.width / 2 - numTF2.width / 2, this._numBg.y + this._numBg.height - numTF2.height - 3);
        this.addChildToContainer(numTF2);
        //活动进度条
        this._progress = ComponentManager.getProgressBar("progress11", "progress11_bg", this._progressWidth);
        this._progress.setPosition(GameConfig.stageWidth / 2 - this._progress.width / 2, topBg.y + topBg.height + 60);
        this._progress.setPercentage(this.getProgressPercent()); //服务器
        this.addChildToContainer(this._progress);
        // 初始化宝箱
        this.initBox();
        //底部bg
        var buttomBg = BaseBitmap.create("acarcherview_buttombg");
        buttomBg.setPosition(0, GameConfig.stageHeigth - buttomBg.height - this.container.y);
        this.addChildToContainer(buttomBg);
        //射1箭bg
        var archerOnebg = BaseBitmap.create("itembg_3");
        archerOnebg.setPosition(GameConfig.stageWidth / 4 - archerOnebg.width / 2, buttomBg.y - 50);
        this.addChildToContainer(archerOnebg);
        //射1箭图片
        var archerOneBM = BaseBitmap.create("acarcherview_single");
        archerOneBM.setPosition(archerOnebg.x + archerOnebg.width / 2 - archerOneBM.width / 2, archerOnebg.y + archerOnebg.height / 2 - archerOneBM.height / 2);
        this.addChildToContainer(archerOneBM);
        //射1箭文本
        var archerOneTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcherViewArcherOne"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
        archerOneTF.setPosition(archerOnebg.x + archerOnebg.width / 2 - archerOneTF.width / 2, archerOnebg.y + archerOnebg.height - archerOneTF.height - 2);
        this.addChildToContainer(archerOneTF);
        //射10箭bg
        var archerTenbg = BaseBitmap.create("itembg_3");
        archerTenbg.setPosition(GameConfig.stageWidth * 3 / 4 - archerTenbg.width / 2, buttomBg.y - 50);
        this.addChildToContainer(archerTenbg);
        //射10箭图片
        var archerTenBM = BaseBitmap.create("acarcherview_many");
        archerTenBM.setPosition(archerTenbg.x + archerTenbg.width / 2 - archerTenBM.width / 2, archerTenbg.y + archerTenbg.height / 2 - archerTenBM.height / 2);
        this.addChildToContainer(archerTenBM);
        var discountbg = BaseBitmap.create("empshop_tag");
        discountbg.setPosition(archerTenbg.x, archerTenbg.y);
        this.addChildToContainer(discountbg);
        var discount = "";
        if (PlatformManager.checkIsThSp()) {
            discount = String(100 - this.cfg.discount * 100);
        }
        else {
            discount = String(this.cfg.discount * 10);
        }
        var discountTF = ComponentManager.getTextField(LanguageManager.getlocal("discountTitle", [discount]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        discountTF.setPosition(discountbg.x, discountbg.y + discountbg.height / 2 - 5);
        discountTF.rotation = -45;
        this.addChildToContainer(discountTF);
        if (PlatformManager.checkIsThSp()) {
            discountTF.x -= 15;
            discountTF.y += 15;
        }
        //射10箭文本
        var archerTenTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcherViewArcherTen"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
        archerTenTF.setPosition(archerTenbg.x + archerTenbg.width / 2 - archerTenTF.width / 2, archerTenbg.y + archerTenbg.height - archerTenTF.height - 2);
        this.addChildToContainer(archerTenTF);
        //射1箭的按钮  
        this._singleBtn = ComponentManager.getButton(ButtonConst.BTN_RECHARGE, null, this.singleClick, this);
        this._singleBtn.setPosition(GameConfig.stageWidth / 4 - this._singleBtn.width / 2, archerOneBM.y + archerOneBM.height + 15);
        // this._singleBtn.setText(this.vo.isFree ? "sysFreeDesc":String(this.cfg.cost),this.vo.isFree);
        // this._singleBtn.addTextIcon("public_icon1",1);
        this.addChildToContainer(this._singleBtn);
        var singleIcon = BaseLoadBitmap.create("itemicon1001");
        singleIcon.width = 35;
        singleIcon.height = 35;
        singleIcon.setPosition(this._singleBtn.x + this._singleBtn.width / 2 - singleIcon.width / 2 + 12, this._singleBtn.y + this._singleBtn.height / 2 - singleIcon.height / 2);
        this.addChildToContainer(singleIcon);
        var singleIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemBuy"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        singleIconTF.setPosition(singleIcon.x - singleIconTF.width, singleIcon.y + singleIcon.height / 2 - singleIconTF.height / 2);
        this.addChildToContainer(singleIconTF);
        var singleIconNum = ComponentManager.getTextField("X1", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        singleIconNum.setPosition(singleIcon.x + singleIcon.width, singleIcon.y + singleIcon.height / 2 - singleIconNum.height / 2);
        this.addChildToContainer(singleIconNum);
        var singleStr = String(this.cfg.cost);
        this._singleTF = ComponentManager.getTextField(singleStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._singleTF.setPosition(this._singleBtn.x + this._singleBtn.width / 2, this._singleBtn.y + this._singleBtn.height + 15);
        this.addChildToContainer(this._singleTF);
        //赠送 1 个 银票图片 。itemicon1001  public_icon1
        var singleBM = BaseBitmap.create("public_icon1");
        singleBM.width = 42;
        singleBM.height = 42;
        singleBM.setPosition(this._singleBtn.x + this._singleBtn.width / 2 - singleBM.width, this._singleBtn.y + this._singleBtn.height + 2);
        this.addChildToContainer(singleBM);
        //射10箭的按钮
        var tenBtn = ComponentManager.getButton(ButtonConst.BTN_RECHARGE, null, this.tenClick, this);
        tenBtn.setPosition(GameConfig.stageWidth * 3 / 4 - this._singleBtn.width / 2, archerTenBM.y + archerTenBM.height + 10);
        // tenBtn.setText(String(this.cfg.cost * 10 * this.cfg.discount),false);
        // tenBtn.addTextIcon("public_icon1",1);
        this.addChildToContainer(tenBtn);
        var tenIcon = BaseLoadBitmap.create("itemicon1001");
        tenIcon.width = 35;
        tenIcon.height = 35;
        tenIcon.setPosition(tenBtn.x + tenBtn.width / 2 - tenIcon.width / 2, tenBtn.y + tenBtn.height / 2 - tenIcon.height / 2);
        this.addChildToContainer(tenIcon);
        var tenIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemBuy"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        tenIconTF.setPosition(tenIcon.x - tenIconTF.width, tenIcon.y + tenIcon.height / 2 - tenIconTF.height / 2);
        this.addChildToContainer(tenIconTF);
        var tenIconNum = ComponentManager.getTextField("X10", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        tenIconNum.setPosition(tenIcon.x + tenIcon.width, tenIcon.y + tenIcon.height / 2 - tenIconNum.height / 2);
        this.addChildToContainer(tenIconNum);
        //赠送 10 个 银票的文本
        var tenCost = String(this.cfg.cost * 10 * this.cfg.discount);
        var tenTF = ComponentManager.getTextField(tenCost, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        tenTF.setPosition(tenBtn.x + tenBtn.width / 2, tenBtn.y + tenBtn.height + 15);
        this.addChildToContainer(tenTF);
        //赠送 10 个 银票图片
        var tenBM = BaseBitmap.create("public_icon1");
        tenBM.width = 42;
        tenBM.height = 42;
        tenBM.setPosition(tenBtn.x + tenBtn.width / 2 - tenBM.width, tenBtn.y + tenBtn.height + 2);
        this.addChildToContainer(tenBM);
        this.updateRedDot();
    };
    /**
     * 初始化宝箱
     */
    AcArcherView.prototype.initBox = function () {
        var boxRewardList = this.cfg.lotteryNum;
        // let maxNum:number = this.cfg.rankNeedNum;
        for (var i = 0; i < boxRewardList.length; i++) {
            var num = (i + 1) / boxRewardList.length;
            var scaleNum = 0.7;
            var boxBg = BaseBitmap.create("acarcherview_BoxBg");
            boxBg.setPosition(this._progress.x + this._progressWidth * num - boxBg.width / 2, this._progress.y - boxBg.height);
            boxBg.addTouchTap(this.boxRewardClick, this, [i]);
            this.addChildToContainer(boxBg);
            var boxTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcherViewKillNum", [boxRewardList[i].needNum]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            boxTF.setPosition(this._progress.x + this._progressWidth * num - boxTF.width / 2, this._progress.y + this._progress.height + 15);
            this.addChildToContainer(boxTF);
            var lightBM = BaseBitmap.create("acturantable_taskbox_light");
            lightBM.name = "lightBM" + i;
            lightBM.anchorOffsetX = lightBM.width / 2;
            lightBM.anchorOffsetY = lightBM.height / 2;
            lightBM.setPosition(boxBg.x + boxBg.width / 2, boxBg.y + boxBg.height / 2);
            lightBM.visible = false;
            lightBM.setScale(scaleNum);
            this.addChildToContainer(lightBM);
            var boxtype = "acturantable_task_box1_";
            if (i >= boxRewardList.length / 2) {
                boxtype = "acturantable_task_box2_";
            }
            var type = this.getBoxState(i);
            var boxIcon = BaseBitmap.create(boxtype + String(type));
            boxIcon.name = "boxIcon" + i;
            boxIcon.anchorOffsetX = boxIcon.width / 2;
            boxIcon.anchorOffsetY = boxIcon.height / 2;
            boxIcon.setPosition(boxBg.x + boxBg.width / 2, boxBg.y + boxBg.height / 2);
            boxIcon.setScale(scaleNum);
            this.addChildToContainer(boxIcon);
            if (type == 2) {
                this.playBoxAni(i);
            }
        }
    };
    /**
     * 更新杀敌数
     */
    AcArcherView.prototype.updateView = function () {
        //更新杀敌数
        this._numTF.text = String(this.vo.getArcherNum());
        this._numTF.setPosition(this._numBg.x + this._numBg.width / 2 - this._numTF.width / 2, this._numBg.y + 15);
        //更新进度条
        this._progress.setPercentage(this.getProgressPercent());
        //更新第一次的按钮状态
        // this._singleBtn.removeTextIcon();
        // this._singleBtn.setText(this.vo.isFree ? "sysFreeDesc":String(this.cfg.cost),this.vo.isFree);
        // this._singleBtn.addTextIcon("public_icon1",1);
        this._singleTF.text = this.vo.isFree ? LanguageManager.getlocal("sysFreeDesc") : String(this.cfg.cost);
        //更新宝箱状态
        this.updateBoxStatus();
    };
    /**
     * 更新红点状态
     */
    AcArcherView.prototype.updateRedDot = function () {
        //更新第一次的按钮状态
        // this._singleBtn.removeTextIcon();
        // this._singleBtn.setText(this.vo.isFree ? "sysFreeDesc":String(this.cfg.cost),this.vo.isFree);
        // this._singleBtn.addTextIcon("public_icon1",1);
        this.updateView();
        if (this.vo.isHaveRedDot()) {
            var reddot = this._rechargebtn.getChildByName("reddot");
            if (reddot == null) {
                App.CommonUtil.addIconToBDOC(this._rechargebtn);
                reddot = this._rechargebtn.getChildByName("reddot");
                reddot.x -= 14;
                reddot.y += 6;
            }
            else {
                App.CommonUtil.addIconToBDOC(this._rechargebtn);
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._rechargebtn);
        }
    };
    /**
     * 更新宝箱状态
     */
    AcArcherView.prototype.updateBoxStatus = function () {
        for (var i = 0; i < this.cfg.lotteryNum.length; i++) {
            var state = this.getBoxState(i);
            var box = this.container.getChildByName("boxIcon" + i);
            var light = this.container.getChildByName("lightBM" + i);
            light.visible = false;
            var boxtype = "acturantable_task_box1_";
            if (i >= this.cfg.lotteryNum.length / 2) {
                boxtype = "acturantable_task_box2_";
            }
            if (box instanceof (BaseBitmap)) {
                box.texture = ResourceManager.getRes(boxtype + state);
                egret.Tween.removeTweens(box);
            }
            if (state == 2) {
                this.playBoxAni(i);
            }
        }
    };
    /**
     * 返回抽奖的数据
     */
    AcArcherView.prototype.buyBtnHandler = function (event) {
        var data = event.data.data.data;
        if (event.data.data.ret < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            this.isSendMessage = false;
            return;
        }
        this.updateView();
        var rewards = data.rewards;
        var rewardVo = GameData.formatRewardItem(rewards);
        if (rewardVo[0].num == 1) {
            this.playArcherAni(rewards);
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.ACMAYDAYREWARDPOPUPVIEW, { rewards: rewards, aid: this.aid, code: this.code });
            this.isSendMessage = false;
        }
    };
    /**
     * 播放射箭
     */
    AcArcherView.prototype.playArcherAni = function (rewards) {
        egret.Tween.get(this._archerBM).to({ scaleY: 0.7, scaleX: 0.7 }, 100).to({ scaleY: 1.2, scaleX: 1.2 }, 100).to({ scaleY: 1, scaleX: 1 }, 100).wait(200).call(function () {
            SoundManager.playEffect("effect_punish_5weapon");
            egret.Tween.get(this._arrowBM).to({ y: this._hurtBM.y + this._hurtBM.height / 3, scaleY: 0.3, scaleX: 0.3 }, 500).call(function () {
                this._hurtBM.setVisible(true);
                this._arrowBM.setVisible(false);
                SoundManager.playEffect("effect_punish_5boss");
            }, this).wait(200).call(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACMAYDAYREWARDPOPUPVIEW, { rewards: rewards, aid: this.aid, code: this.code });
                this._arrowBM.setVisible(true);
                this._arrowBM.setPosition(this._hurtBM.x + this._hurtBM.width / 2 - this._arrowBM.width / 2, GameConfig.stageHeigth + this._hurtBM.height);
                this._arrowBM.setScale(5);
                this._hurtBM.setVisible(false);
                this.isSendMessage = false;
            }, this);
        }, this);
    };
    /**
     * 返回领取宝箱的奖励
     */
    AcArcherView.prototype.rewardBoxHandler = function (event) {
        var data = event.data.data.data;
        if (!data) {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        var rewards = data.rewards;
        var rList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rList);
        this.updateBoxStatus();
    };
    /**
     * 射十箭
     */
    AcArcherView.prototype.tenClick = function () {
        if (this.isSendMessage) {
            return;
        }
        if (Api.playerVoApi.getPlayerGem() < this.cfg.cost * 10 * this.cfg.discount) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETARCHERLOTTERY, { activeId: this.activeId, isTenPlay: 1 });
        this.isSendMessage = true;
    };
    /**
     * 射一箭
     */
    AcArcherView.prototype.singleClick = function () {
        if (this.isSendMessage) {
            return;
        }
        if (Api.playerVoApi.getPlayerGem() < this.cfg.cost && !this.vo.isFree) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETARCHERLOTTERY, { activeId: this.activeId, isTenPlay: 0 });
        this.isSendMessage = true;
    };
    /**
     * 点击领取奖励 或者查看奖励
     */
    AcArcherView.prototype.boxRewardClick = function (obj, param) {
        var boxRewardId = param;
        var status = this.getBoxState(boxRewardId);
        if (status == 2) {
            // this.playBoxAni(boxRewardId);
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETARCHERITEAMA, { activeId: this.activeId, lotteryId: (boxRewardId + 1) });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW, { 'type': AcConst.AID_ACARCHER, 'id': boxRewardId, "code": this.code });
        }
    };
    /**
     * 播放动画
     */
    AcArcherView.prototype.playBoxAni = function (id) {
        var light = this.container.getChildByName("lightBM" + id);
        var box = this.container.getChildByName("boxIcon" + id);
        light.visible = true;
        egret.Tween.get(light, { loop: true }).to({ rotation: light.rotation + 360 }, 10000);
        egret.Tween.get(box, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
    };
    /**
     * 获得宝箱的奖励类型
     */
    AcArcherView.prototype.getBoxState = function (index) {
        if (this.cfg.lotteryNum[index].needNum > this.vo.getArcherNum()) {
            return 1;
        }
        else {
            if (this.vo.isBoxReceive(index + 1)) {
                return 3;
            }
            else {
                return 2;
            }
        }
    };
    /**
     * 排行榜按钮
     */
    AcArcherView.prototype.clickRank = function () {
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETARCHERRANK, { activeId: this.activeId });
    };
    /**
     * 	打开排行榜
     */
    AcArcherView.prototype.rankBtnHandler = function (event) {
        var data = event.data.data.data;
        ViewController.getInstance().openView(ViewConst.POPUP.ACARCHERRANKPOPUPVIEW, { "rankArr": data.rankArr, "myrankArr": data.myrankArr, "activeId": this.activeId, "code": this.code });
    };
    /**
     * 黄忠属性
     */
    AcArcherView.prototype.clickInfo = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACARCHERINFOPOPUPVIEW);
    };
    /**
     * 充值界面按钮
     */
    AcArcherView.prototype.clickRecharge = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACARCHERRECHARGEPOPUPVIEW, { "code": this.code });
    };
    /**
     * 获得活动进度
     */
    AcArcherView.prototype.getProgressPercent = function () {
        var num = this.vo.getArcherNum();
        var cutNum = this.cfg.lotteryNum[2].needNum;
        var percentNum = ((this.cfg.lotteryNum.length - 1) / this.cfg.lotteryNum.length) / cutNum;
        if (num <= cutNum) {
            return num * percentNum;
        }
        else {
            return cutNum * percentNum + (num - cutNum) * ((1 / this.cfg.lotteryNum.length) / (this.cfg.lotteryNum[3].needNum - cutNum));
        }
    };
    /**标题 */
    AcArcherView.prototype.getTitleStr = function () {
        return "acArcherViewTitle";
    };
    AcArcherView.prototype.getRuleInfo = function () {
        return "acArcherRule";
    };
    AcArcherView.prototype.getProbablyInfo = function () {
        return "acarcherProbablyInfo" + this.code;
    };
    /**关闭界面 */
    AcArcherView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.updateRedDot, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETARCHERITEAMB, this.updateRedDot, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETARCHERLOTTERY), this.buyBtnHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETARCHERITEAMA), this.rewardBoxHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETARCHERRANK), this.rankBtnHandler, this);
        this._numTF = null;
        this._progress = null;
        this._progressWidth = 372;
        this._numBg = null;
        this._singleBtn = null;
        this.isSendMessage = false;
        this._singleTF = null;
        this.activeId = null;
        _super.prototype.dispose.call(this);
    };
    return AcArcherView;
}(AcCommonView));
__reflect(AcArcherView.prototype, "AcArcherView");
//# sourceMappingURL=AcArcherView.js.map