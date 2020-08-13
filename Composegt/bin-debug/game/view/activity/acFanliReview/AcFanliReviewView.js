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
 * author yanyuling
 */
// class AcFanliReviewMainView extends CommonView {
var AcFanliReviewView = (function (_super) {
    __extends(AcFanliReviewView, _super);
    function AcFanliReviewView() {
        var _this = _super.call(this) || this;
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._ruleText = null;
        _this._inOrderText = null;
        _this._acvo = undefined;
        _this._dialogueBg = null;
        _this._prisonDesTxt = null;
        _this._randTxtSec = 0;
        _this._droWifeIcon = undefined;
        _this._skinImg = undefined;
        _this._shipImg = undefined;
        _this.arrow_rightBtn = undefined;
        _this.arrow_leftBtn = undefined;
        _this._lastRecallNumTxt = null;
        _this._boxList = [];
        _this._lightMaskImgNode = undefined;
        _this._recall_rewards = undefined;
        _this._curProgTxt = undefined;
        return _this;
    }
    Object.defineProperty(AcFanliReviewView.prototype, "vo", {
        // private aid:string;
        // private code:string;
        get: function () {
            if (!this._acvo) {
                this._acvo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            }
            return this._acvo;
        },
        enumerable: true,
        configurable: true
    });
    AcFanliReviewView.prototype.initView = function () {
        if (this.vo.isFirstOpen()) {
            NetManager.request(NetRequestConst.REQUEST_FANLI_GETOPEN_FIRST, { activeId: this.vo.aidAndCode });
            ViewController.getInstance().openView(ViewConst.POPUP.ACFANLIREVIEGUIDSTORY);
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.ACFANLIREVIEWRECALLVIEW);
        }
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FANLIREVIEW_RECALL_ANI_END, this.recallAniBack, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_FANLIREVIEW_RECALL_NUM_REFRESH, this.refreshProgress, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, this.showDBDragon, this);
        this.showDBDragon();
        //底图
        this._dialogueBg = BaseBitmap.create("public_9v_bg11");
        this.addChildToContainer(this._dialogueBg);
        this._dialogueBg.anchorOffsetX = this._dialogueBg.width / 2;
        this._dialogueBg.anchorOffsetY = this._dialogueBg.height / 2;
        this._dialogueBg.scaleX = -1;
        this._dialogueBg.width = 220;
        this._dialogueBg.height = 120;
        this._dialogueBg.x = 560;
        this._dialogueBg.y = 274;
        var dialogSize = TextFieldConst.FONTSIZE_CONTENT_COMMON;
        if (PlatformManager.checkIsViSp()) {
            dialogSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
        }
        this._prisonDesTxt = ComponentManager.getTextField("", dialogSize, TextFieldConst.COLOR_BROWN);
        this._prisonDesTxt.text = LanguageManager.getlocal("acFanliReviewReward_random_txt" + App.MathUtil.getRandom(1, 6));
        this._prisonDesTxt.width = this._dialogueBg.width - 30;
        this._prisonDesTxt.setPosition(430, this._dialogueBg.y - 34);
        this.addChildToContainer(this._prisonDesTxt);
        this._randTxtSec = GameData.serverTime;
        this.showZHUDBdragon();
        this.showTopTxts();
        this.showBottomBg();
        this.refreshProgress();
    };
    AcFanliReviewView.prototype.showTopTxts = function () {
        var cdbg = BaseBitmap.create("fanliReview_bg3");
        cdbg.height = 170;
        cdbg.y = -20;
        this.addChildToContainer(cdbg);
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.x = 30;
        this._activityTimerText.y = cdbg.y + 20;
        this._activityTimerText.text = this.vo.getAcLocalTime(true);
        this.addChildToContainer(this._activityTimerText);
        var deltaY = 8;
        if (PlatformManager.checkIsViSp()) {
            deltaY = 5;
        }
        //倒计时文本 
        var acCDTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [""]);
        acCDTxt.x = this._activityTimerText.x;
        acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + deltaY;
        this.addChildToContainer(acCDTxt);
        this._acCDTxt = acCDTxt;
        //规则
        this._ruleText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), 20);
        this._ruleText.width = GameConfig.stageWidth - 60;
        this._ruleText.multiline = true;
        this._ruleText.lineSpacing = 5;
        this._ruleText.x = 30;
        this._ruleText.y = this._acCDTxt.y + this._activityTimerText.height + deltaY;
        this._ruleText.text = LanguageManager.getlocal("acFanliReviewView_description", ["" + this.vo.cfg.cost]);
        this.addChildToContainer(this._ruleText);
    };
    AcFanliReviewView.prototype.showBottomBg = function () {
        var fanliReview_blackbg = BaseBitmap.create("fanliReview_blackbg");
        fanliReview_blackbg.x = 0;
        fanliReview_blackbg.y = GameConfig.stageHeigth - this.container.y - 310;
        this.addChildToContainer(fanliReview_blackbg);
        var infoBtn = ComponentManager.getButton("fanliReview_ckeckBtn", "", this.showSkinDetails, this);
        infoBtn.setPosition(20, fanliReview_blackbg.y + 30);
        this.addChildToContainer(infoBtn);
        this._bottomnodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._bottomnodeContainer);
        // this._bottomnodeContainer.y = GameConfig.stageHeigth - this.container.y - 310;
        this._lightMaskImgNode = new BaseDisplayObjectContainer();
        var _btmbg1 = BaseBitmap.create("fanliReview_bt_bg1_1");
        _btmbg1.x = 0;
        _btmbg1.y = fanliReview_blackbg.y + 140;
        this._bottomnodeContainer.addChild(_btmbg1);
        this._lightMaskImgNode.y = _btmbg1.y;
        var _btmbg2 = BaseBitmap.create("fanliReview_bt_bg1_2");
        _btmbg2.x = GameConfig.stageWidth;
        _btmbg2.y = _btmbg1.y;
        this._bottomnodeContainer.addChild(_btmbg2);
        var _btmbg3 = BaseBitmap.create("fanliReview_bt_bg2_1");
        _btmbg3.x = 0;
        _btmbg3.y = 0;
        this._lightMaskImgNode.addChild(_btmbg3);
        var _btmbg4 = BaseBitmap.create("fanliReview_bt_bg2_2");
        _btmbg4.x = GameConfig.stageWidth;
        _btmbg4.y = 0;
        this._lightMaskImgNode.addChild(_btmbg4);
        this._bottomnodeContainer.addChild(this._lightMaskImgNode);
        this._shipImg = BaseBitmap.create("fanliReview_ship");
        this._shipImg.x = _btmbg1.x + _btmbg1.width / 2 - this._shipImg.width / 2;
        this._shipImg.y = _btmbg1.y + _btmbg1.height / 2 - this._shipImg.height / 2 + 50;
        this._bottomnodeContainer.addChild(this._shipImg);
        var arrow_leftBtn = ComponentManager.getButton("fanliReview_arrow", "", this.switchHandler, this, ["left"]);
        arrow_leftBtn.x = 5;
        arrow_leftBtn.y = fanliReview_blackbg.y + 175;
        this.addChildToContainer(arrow_leftBtn);
        var arrow_rightBtn = ComponentManager.getButton("fanliReview_arrow", "", this.switchHandler, this, ["right"]);
        arrow_rightBtn.scaleX = -1;
        var tarRightPosX = GameConfig.stageWidth - arrow_leftBtn.x;
        arrow_rightBtn.x = tarRightPosX;
        arrow_rightBtn.y = arrow_leftBtn.y;
        this.addChildToContainer(arrow_rightBtn);
        this.arrow_rightBtn = arrow_rightBtn;
        this.arrow_leftBtn = arrow_leftBtn;
        var fanliReview_recall = ComponentManager.getButton("fanliReview_recall", "", this.recallBtnHandler, this);
        fanliReview_recall.x = GameConfig.stageWidth - fanliReview_recall.width;
        fanliReview_recall.y = fanliReview_blackbg.y + 30;
        this.addChildToContainer(fanliReview_recall);
        this._lastRecallNumTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._lastRecallNumTxt.text = LanguageManager.getlocal("acFanliReviewReward_recall_txt", ["" + 1]);
        this._lastRecallNumTxt.x = GameConfig.stageWidth - 75 - this._lastRecallNumTxt.width / 2;
        this._lastRecallNumTxt.y = fanliReview_recall.y + fanliReview_recall.height;
        this.addChildToContainer(this._lastRecallNumTxt);
        var fanliReview_progress = BaseBitmap.create("fanliReview_progress");
        fanliReview_progress.x = GameConfig.stageWidth / 2 - fanliReview_progress.width / 2;
        fanliReview_progress.y = _btmbg1.y - fanliReview_progress.height + 15;
        this.addChildToContainer(fanliReview_progress);
        var tipTxt1 = ComponentManager.getTextField("", 18, 0xd0aa66);
        this._curProgTxt = tipTxt1;
        this._curProgTxt.text = LanguageManager.getlocal("acFanliReviewReward_recall_txt2");
        tipTxt1.x = fanliReview_progress.x + fanliReview_progress.width / 2 - tipTxt1.width / 2 - 20;
        tipTxt1.y = fanliReview_progress.y + fanliReview_progress.height / 2 - tipTxt1.height / 2;
        this.addChildToContainer(tipTxt1);
        //下方进度数字和书籍
        var cfg = this.vo.cfg;
        var ReviewNum = cfg.ReviewNum;
        for (var index = 0; index < ReviewNum.length; index++) {
            var element = ReviewNum[index];
            var bookIcon = BaseBitmap.create("fanliReview_book2");
            bookIcon.anchorOffsetX = bookIcon.width;
            bookIcon.anchorOffsetY = bookIcon.height / 2;
            bookIcon.x = GameConfig.stageWidth * 2 * element.needNum / 100 + 10;
            var progress_txt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_WHITE);
            if (index == ReviewNum.length) {
                progress_txt.text = "0%";
                progress_txt.x = 10;
            }
            else {
                progress_txt.text = element.needNum + "%";
                progress_txt.anchorOffsetX = progress_txt.width;
                progress_txt.x = GameConfig.stageWidth * 2 * element.needNum / 100;
            }
            progress_txt.y = fanliReview_blackbg.y + fanliReview_blackbg.height - 36;
            this._bottomnodeContainer.addChild(progress_txt);
            // if(index == 4){
            // 	progress_txt.x = GameConfig.stageWidth*2 * element.needNum/100 - progress_txt.width - 50;
            // }
            progress_txt.anchorOffsetX = progress_txt.width;
            progress_txt.x = bookIcon.x - bookIcon.width + 5;
            bookIcon.y = progress_txt.y + progress_txt.height / 2 - 5;
            this._bottomnodeContainer.addChild(bookIcon);
            bookIcon.addTouchTap(this.getBoxReward, this, [index]);
            this._boxList.push(bookIcon);
        }
    };
    AcFanliReviewView.prototype.refreshProgress = function () {
        var stageinfo = this.vo.stageinfo;
        var lotterysnum = this.vo.lotterysnum;
        var cfg = this.vo.cfg;
        var ReviewNum = cfg.ReviewNum;
        this._lastRecallNumTxt.text = LanguageManager.getlocal("acFanliReviewReward_recall_txt", ["" + this.vo.lotterynum]);
        for (var index = 0; index < ReviewNum.length; index++) {
            var element = ReviewNum[index];
            var box = this._boxList[index];
            if (element.needNum <= lotterysnum) {
                App.DisplayUtil.changeToNormal(box);
                egret.Tween.removeTweens(box);
                if (!this.vo.stageinfo["" + (index + 1)]) {
                    box.texture = ResourceManager.getRes("fanliReview_book");
                    egret.Tween.get(box, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                }
                else {
                    box.texture = ResourceManager.getRes("fanliReview_book2");
                }
            }
            else {
                App.DisplayUtil.changeToGray(box);
            }
        }
        var rate = lotterysnum / cfg.ReviewItemNum;
        rate = rate > 1 ? 1 : rate;
        // rate = Number(rate.toFixed(2));
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth * 2 * rate, 131);
        this._lightMaskImgNode.mask = rect;
        if (rate >= 0.5) {
            this.switchHandler("right");
        }
        else {
            this.switchHandler("left");
        }
        var tarX = GameConfig.stageWidth * 2 * rate - this._shipImg.width / 2 - 20;
        if (rate == 1) {
            tarX = GameConfig.stageWidth * 2 * rate - this._shipImg.width;
        }
        else if (rate == 0) {
            tarX = -this._shipImg.width + 20;
        }
        this._curProgTxt.text = LanguageManager.getlocal("acFanliReviewReward_recall_txt2", [(rate * 100).toFixed(0) + "%"]);
        this._shipImg.x = tarX;
        if (this.vo.isRightRed()) {
            App.CommonUtil.addIconToBDOC(this.arrow_rightBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this.arrow_rightBtn);
        }
        if (this.vo.isLeftRed()) {
            App.CommonUtil.addIconToBDOC(this.arrow_leftBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this.arrow_leftBtn);
        }
    };
    AcFanliReviewView.prototype.switchHandler = function (param) {
        if (param == "right") {
            this._bottomnodeContainer.x = -GameConfig.stageWidth;
            this.arrow_rightBtn.visible = false;
            this.arrow_leftBtn.visible = true;
        }
        if (param == "left") {
            this._bottomnodeContainer.x = 0;
            this.arrow_rightBtn.visible = true;
            this.arrow_leftBtn.visible = false;
        }
    };
    AcFanliReviewView.prototype.showDBDragon = function () {
        var skinId = this.vo.cfg.getServantSkinId();
        var serSkincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        var servantId = serSkincfg.servantId;
        var boneName = undefined;
        if (serSkincfg && serSkincfg.bone) {
            boneName = serSkincfg.bone + "_ske";
        }
        if (!Api.switchVoApi.checkServantCloseBone() && boneName && servantId && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            if (this._skinImg) {
                this._skinImg.visible = false;
            }
            if (this._droWifeIcon) {
                this._droWifeIcon.dispose();
                this._droWifeIcon = null;
            }
            this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(serSkincfg.bone);
            this._droWifeIcon.visible = true;
            this._droWifeIcon.setScale(0.9);
            this._droWifeIcon.anchorOffsetY = this._droWifeIcon.height;
            this._droWifeIcon.anchorOffsetX = this._droWifeIcon.width / 2 * this._droWifeIcon.scaleX;
            this._droWifeIcon.x = GameConfig.stageWidth / 2 - 20;
            this._droWifeIcon.y = GameConfig.stageHeigth - this.container.y - 120;
            this.container.addChildAt(this._droWifeIcon, 2);
        }
        else {
            if (!this._skinImg) {
                var skinW = 640;
                var skinH = 482;
                var tarScale = 1.0;
                // let serCfg = Config.ServantCfg.getServantItemById(servantId);
                // let skinImgPath = serCfg.fullIcon;
                var serSkincfg_1 = Config.ServantskinCfg.getServantSkinItemById(skinId);
                var skinImgPath = serSkincfg_1.body;
                this._skinImg = BaseLoadBitmap.create(skinImgPath);
                this._skinImg.width = skinW;
                this._skinImg.height = skinH;
                this._skinImg.setScale(tarScale);
                this._skinImg.anchorOffsetY = this._skinImg.height;
                this._skinImg.anchorOffsetX = this._skinImg.width / 2;
                this._skinImg.x = GameConfig.stageWidth / 2;
                this._skinImg.y = GameConfig.stageHeigth - this.container.y - 130; // 180 ;
                this.addChildToContainer(this._skinImg);
            }
        }
    };
    AcFanliReviewView.prototype.showZHUDBdragon = function () {
        var zhuyepiao = App.DragonBonesUtil.getLoadDragonBones("zhuyepiao");
        zhuyepiao.x = GameConfig.stageWidth / 2;
        // zhuyepiao.y = GameConfig.stageHeigth/2;
        this.addChildToContainer(zhuyepiao);
    };
    AcFanliReviewView.prototype.recallNetResp = function (event) {
        var _this = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_FANLI_GETREWARD, this.recallNetResp, this);
        if (event.data.data.ret == 0) {
            // ViewController.getInstance().openView("AcFanliRecallView");
            this._recall_rewards = event.data.data.data.rewards;
            var cloud1_1 = BaseBitmap.create("fanliReview_cloud6");
            cloud1_1.x = -cloud1_1.width;
            cloud1_1.y = GameConfig.stageHeigth / 2 - 150;
            this.addChildToContainer(cloud1_1);
            var cloud2_1 = BaseLoadBitmap.create("fanliReview_cloud4");
            cloud2_1.x = GameConfig.stageWidth;
            cloud2_1.y = cloud1_1.y - 80;
            this.addChildToContainer(cloud2_1);
            var cloud3_1 = BaseBitmap.create("fanliReview_cloud5");
            cloud3_1.x = GameConfig.stageWidth;
            cloud3_1.y = cloud1_1.y + 100;
            this.addChildToContainer(cloud3_1);
            cloud1_1.scaleX = cloud1_1.scaleY = cloud2_1.scaleX = cloud2_1.scaleY = cloud3_1.scaleX = cloud3_1.scaleY = 2.0;
            egret.Tween.get(cloud1_1).to({ x: 50 }, 1500).to({ alpha: 0 }, 500);
            egret.Tween.get(cloud2_1).to({ x: 100 }, 1500).to({ alpha: 0 }, 500);
            egret.Tween.get(cloud3_1).to({ x: 150 }, 1500).to({ alpha: 0 }, 500).call(this.recallAniBack, this).call(function () {
                _this.container.removeChild(cloud1_1);
                _this.container.removeChild(cloud2_1);
                _this.container.removeChild(cloud3_1);
            }, this);
        }
    };
    AcFanliReviewView.prototype.recallAniBack = function () {
        this.refreshProgress();
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
            "rewards": this._recall_rewards,
            "otherRewards": null,
            "isPlayAni": true,
            showTip: null,
            callback: null,
            target: this,
        });
        // this._recall_rewards = null;
    };
    AcFanliReviewView.prototype.recallBtnHandler = function () {
        if (!this.vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this.vo.lotterynum <= 0) {
            var message = LanguageManager.getlocal("acFanliReviewReward_recall_netTip4", ["" + this.vo.cfg.cost]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: message,
                callback: function () {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                },
                handler: this,
                needCancel: true
            });
            return;
        }
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_FANLI_GETREWARD, this.recallNetResp, this);
        NetManager.request(NetRequestConst.REQUEST_FANLI_GETREWARD, { activeId: this.vo.aidAndCode, });
    };
    AcFanliReviewView.prototype.boxRewardNetResp = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_FANLI_GETREWARD, this.boxRewardNetResp, this);
        if (event.data.data.ret == 0) {
            this.refreshProgress();
            var data = event.data.data.data;
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                "rewards": data.rewards,
                "otherRewards": null,
                "isPlayAni": true,
                showTip: null,
                callback: null,
                target: this
            });
        }
    };
    AcFanliReviewView.prototype.getBoxReward = function (event, boxId) {
        if (!this.vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var lotterysnum = this.vo.lotterysnum;
        var cfg = this.vo.cfg;
        var ReviewNum = cfg.ReviewNum;
        var element = ReviewNum[boxId];
        //不可领取
        if (element.needNum > lotterysnum) {
            // App.CommonUtil.showTip(LanguageManager.getlocal("acFanliReviewReward_recall_netTip2"));
            ViewController.getInstance().openView(ViewConst.POPUP.ACFANLIREVIEWPOPUPVIEW, { aid: this.aid, code: this.code, boxid: boxId + 1 });
            return;
        }
        if (boxId == 4 && !Api.servantVoApi.getServantObj("1034")) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acFanliReviewReward_recall_netTip3"));
            return;
        }
        //已领取
        if (this.vo.stageinfo[boxId + 1]) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACFANLIREVIEWSTORYVIEW, { aid: this.aid, code: this.code, sid: boxId + 1, });
            return;
        }
        var tmpThis = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACFANLIREVIEWSTORYVIEW, {
            aid: this.aid,
            code: this.code, sid: boxId + 1,
            callBack: function () {
                App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_FANLI_GETBOXREWARD, tmpThis.boxRewardNetResp, tmpThis);
                NetManager.request(NetRequestConst.REQUEST_FANLI_GETBOXREWARD, { activeId: tmpThis.vo.aidAndCode, gid: boxId + 1 });
            },
            obj: tmpThis,
        });
    };
    AcFanliReviewView.prototype.showSkinDetails = function () {
        var ReviewReward = this.vo.cfg.ReviewReward;
        var skinId = ReviewReward.split("_")[1];
        if (this._droWifeIcon) {
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.SERVANTSKINCHANGEVIEW, { servantId: 1034, skinId: skinId, isDisplay: true });
    };
    AcFanliReviewView.prototype.tick = function () {
        if (!this._acCDTxt || !this._prisonDesTxt) {
            return;
        }
        if (GameData.serverTime - this._randTxtSec >= 6) {
            var tmpThis_1 = this;
            egret.Tween.get(this._prisonDesTxt, { loop: false }).to({ alpha: 0 }, 300).call(function () {
                tmpThis_1._prisonDesTxt.text = LanguageManager.getlocal("acFanliReviewReward_random_txt" + App.MathUtil.getRandom(1, 6));
            }, this).to({ alpha: 1 }, 300);
            this._randTxtSec = GameData.serverTime;
        }
        var deltaT = this.vo.et - GameData.serverTime;
        var cdStrK = "acFanliReviewReward_acCD";
        if (this.code == "4") {
            cdStrK = "acFanliReviewReward_acCD2";
        }
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [App.DateUtil.getFormatBySecond(deltaT, 8)]);
            return true;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [LanguageManager.getlocal("acFanliReviewReward_acCDEnd")]);
        }
        return false;
    };
    AcFanliReviewView.prototype.getSoundBgName = function () {
        return "music_bookroom";
    };
    AcFanliReviewView.prototype.getBgName = function () {
        return "fanliReview_bg";
    };
    AcFanliReviewView.prototype.getTitleStr = function () {
        return "acFanliReviewMainViewTitle1";
    };
    AcFanliReviewView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "fanliReview_bg", "fanliReview_bg2", "fanliReview_bg3",
            "fanliReview_close", "fanliReview_icon", "fanliReview_namebg", "fanliReview_txt1",
            "fanliReview_bt_bg1_1", "fanliReview_bt_bg1_2", "fanliReview_bt_bg2_1", "fanliReview_bt_bg2_2", "fanliReview_ship",
            "fanliReview_recall", "fanliReview_arrow", "fanliReview_blackbg", "fanliReview_book", "fanliReview_book2",
            "fanliReview_cloud1", "fanliReview_cloud2", "fanliReview_cloud3", "fanliReview_progress", "fanliReview_ckeckBtn",
            "fanliReview_cloud4", "fanliReview_cloud5", "fanliReview_cloud6", "guideGrayBg",
        ]);
    };
    AcFanliReviewView.prototype.getRuleInfo = function () {
        return "acFanliReviewViewRule" + this.code;
    };
    AcFanliReviewView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FANLIREVIEW_RECALL_ANI_END, this.recallAniBack, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FANLIREVIEW_RECALL_NUM_REFRESH, this.refreshProgress, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, this.showDBDragon, this);
        this._activityTimerText = null;
        this._acCDTxt = null;
        this._inOrderText = null;
        this._ruleText = null;
        this._acvo = null;
        this._dialogueBg = null;
        this._prisonDesTxt = null;
        this._randTxtSec = 0;
        if (this._droWifeIcon) {
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }
        this._skinImg = null;
        this._bottomnodeContainer = null;
        this.arrow_rightBtn = null;
        this.arrow_leftBtn = null;
        this._lastRecallNumTxt = null;
        this._boxList = [];
        this._lightMaskImgNode = undefined;
        this._recall_rewards = null;
        // this.aid = "";
        // this.code = "";
        _super.prototype.dispose.call(this);
    };
    return AcFanliReviewView;
}(AcCommonView));
__reflect(AcFanliReviewView.prototype, "AcFanliReviewView");
//回忆模式
var AcFanliRecallView = (function (_super) {
    __extends(AcFanliRecallView, _super);
    function AcFanliRecallView() {
        return _super.call(this) || this;
    }
    AcFanliRecallView.prototype.initView = function () {
        var _this = this;
        var _blackBg = BaseBitmap.create("public_9_black"); //("guideGrayBg");
        _blackBg.alpha = 0.75;
        _blackBg.height = GameConfig.stageHeigth;
        _blackBg.width = GameConfig.stageWidth;
        this.addChild(_blackBg);
        var conNode = new BaseDisplayObjectContainer();
        this.addChild(conNode);
        var servant = BaseLoadBitmap.create("servant_full_1034");
        servant.width = 640;
        servant.height = 482;
        servant.x = GameConfig.stageWidth / 2 - servant.width / 2;
        servant.y = GameConfig.stageHeigth / 2 - servant.height / 2;
        conNode.addChild(servant);
        var cloud1 = BaseBitmap.create("fanliReview_cloud4");
        cloud1.x = -30;
        cloud1.y = servant.y + servant.height - 150;
        conNode.addChild(cloud1);
        var cloud2 = BaseLoadBitmap.create("fanliReview_cloud6");
        cloud2.x = -30;
        cloud2.y = cloud1.y + 100;
        conNode.addChild(cloud2);
        var cloud3 = BaseBitmap.create("fanliReview_cloud5");
        cloud3.x = GameConfig.stageWidth - cloud3.width + 20;
        cloud3.y = cloud1.y - 50;
        conNode.addChild(cloud3);
        var fanliReview_txt1 = BaseBitmap.create("fanliReview_txt1");
        fanliReview_txt1.x = GameConfig.stageWidth / 2 - fanliReview_txt1.width / 2;
        fanliReview_txt1.y = servant.y + servant.height - fanliReview_txt1.height + 60;
        conNode.addChild(fanliReview_txt1);
        var tmpThis = this;
        this.addTouchTap(function () {
            egret.Tween.get(cloud1).to({ alpha: 0, x: -cloud1.width - 50 }, 500);
            egret.Tween.get(cloud2).to({ alpha: 0, x: -cloud2.width - 50 }, 500);
            egret.Tween.get(cloud3).to({ alpha: 0, x: GameConfig.stageWidth }, 500);
            egret.Tween.get(_this).wait(500).to({ alpha: 0 }, 500).call(tmpThis.tapHandler, tmpThis);
            ;
        }, this);
    };
    AcFanliRecallView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "fanliReview_cloud4", "fanliReview_cloud5", "fanliReview_cloud6", "guideGrayBg", "fanliReview_txt1",
        ]);
    };
    AcFanliRecallView.prototype.tapHandler = function () {
        this.hide();
    };
    AcFanliRecallView.prototype.getBgName = function () {
        return null;
    };
    AcFanliRecallView.prototype.getTitleStr = function () {
        return null;
    };
    AcFanliRecallView.prototype.getButtomLineBg = function () {
        return null;
    };
    AcFanliRecallView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcFanliRecallView.prototype.getTitleBgName = function () {
        return null;
    };
    AcFanliRecallView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcFanliRecallView;
}(BaseView));
__reflect(AcFanliRecallView.prototype, "AcFanliRecallView");
