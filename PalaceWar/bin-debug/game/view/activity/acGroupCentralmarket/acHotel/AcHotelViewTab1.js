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
  * 中秋活动 Tab1
  * @author 张朝阳
  * date 2018/8/28
  * @class AcMidAutumnViewTab1
  */
var AcHotelViewTab1 = (function (_super) {
    __extends(AcHotelViewTab1, _super);
    // private aid:string ="";
    // private code:string =""; 
    function AcHotelViewTab1(param) {
        var _this = _super.call(this) || this;
        _this._findNumTF = null;
        _this._progress = null;
        _this._boxInfoList = [];
        _this._oneNeedNumTF = null;
        _this._isSendMessage = false;
        _this._activityID = null;
        _this._maxBoxNum = 0;
        _this._bg = null;
        _this._type = null;
        _this._speakStr = null;
        _this._speakTF = null;
        _this._speakTail = null;
        _this._speakBg = null;
        _this._servantBM = null;
        _this._messageLength = 0;
        _this._npcBM = null;
        _this._bowlBM = null;
        _this._jarsBM = null;
        /**
         * 记录一下奖励
         */
        _this._nowReward = null;
        _this._acCDTxt = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    AcHotelViewTab1.prototype.initView = function () {
        // this.aid = this.param.data.aid;
        // this.code =this.param.data.code;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELLTTTERY, this.lotteryHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELITEMA, this.receiveBoxHandle, this);
        this._activityID = this.aid + "-" + this.code;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        this._maxBoxNum = cfg.getBoxList()[cfg.getBoxList().length - 1].needNum;
        var bgStr = "achotelview_bg-" + this.getUiCode();
        if (this.code == "1") {
            bgStr = "achotelview_bg";
        }
        var bg = BaseLoadBitmap.create(bgStr);
        // let bg = BaseLoadBitmap.create("achotelview_bg");
        bg.width = 611;
        bg.height = 750;
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth - this.getViewTitleButtomY() - bg.height - 250);
        this.addChild(bg);
        //遮照
        var bgY = bg.y;
        var bglazyHeght = bg.y;
        if (bgY >= 10) {
            bgY = 0;
            bglazyHeght = 0;
        }
        else {
            bgY = Math.abs(bg.y) + 10;
        }
        var maskRect = new egret.Rectangle(0, bgY, bg.width, bg.height - Math.abs(bglazyHeght));
        bg.mask = maskRect;
        var npcBMStr = "achotelview_idle-" + this.getUiCode();
        if (this.code == "1") {
            npcBMStr = "achotelview_idle";
        }
        this._npcBM = BaseBitmap.create(npcBMStr);
        this._npcBM.setPosition(bg.x + bg.width / 2 - this._npcBM.width / 2, bg.y + bg.height - this._npcBM.height - 100);
        this.addChild(this._npcBM);
        var jarsBMStr = "achotelview_jars-" + this.getUiCode();
        if (this.code == "1") {
            jarsBMStr = "achotelview_jars";
        }
        this._jarsBM = BaseBitmap.create(jarsBMStr);
        this._jarsBM.setPosition(bg.x + bg.width - this._jarsBM.width - 90, bg.y + bg.height - this._jarsBM.height / 2 - 90);
        this.addChild(this._jarsBM);
        var bowlBMStr = "achotelview_bowl-" + this.getUiCode();
        if (this.code == "1") {
            bowlBMStr = "achotelview_bowl";
        }
        this._bowlBM = BaseBitmap.create(bowlBMStr);
        this._bowlBM.setPosition(bg.x + 120, bg.y + bg.height - this._bowlBM.height / 2 - 50);
        this.addChild(this._bowlBM);
        if (this.getUiCode() == "2") {
            this._npcBM.setPosition(bg.x + 0, bg.y + bg.height - this._npcBM.height - 78);
            this._jarsBM.setPosition(bg.x + 394, bg.y + bg.height - this._jarsBM.height / 2 - 93);
            this._bowlBM.setPosition(bg.x + 141, bg.y + bg.height - this._bowlBM.height / 2 - 80); //酒杯
            // this._npcBM.setPosition(bg.x + 0, bg.y + 343);
            // this._jarsBM.setPosition(bg.x + 394, bg.y + 729);
            // this._bowlBM.setPosition(bg.x + 141, bg.y + 764);
        }
        if (this.getUiCode() == "3") {
            this._jarsBM.setPosition(bg.x + 394, bg.y + bg.height - this._jarsBM.height / 2 - 93);
            this._bowlBM.setPosition(bg.x + 141, bg.y + bg.height - this._bowlBM.height / 2 - 80); //酒杯
        }
        // 说的话相关
        var talkBg = BaseBitmap.create("public_9_bg25");
        talkBg.width = 240;
        var talkTFKey = this.code == "1" ? "acHotelViewTalk" : "acHotelViewTalk-" + this.code;
        var talkTF = ComponentManager.getTextField(LanguageManager.getlocal(talkTFKey), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        talkTF.width = 200;
        talkBg.height = talkTF.height + 20;
        talkBg.setPosition(bg.x + 374, bg.y + bg.height - 510);
        talkTF.setPosition(talkBg.x + 20, talkBg.y + 10);
        this.addChild(talkBg);
        this.addChild(talkTF);
        var tailBM = BaseBitmap.create("public_9_bg25_tail");
        tailBM.setPosition(talkBg.x + 30, talkBg.y + talkBg.height - 3);
        this.addChild(tailBM);
        var infoStr = this.code == "1" ? "achotelview_infobtn" : "achotelview_infobtn-" + this.getUiCode();
        var infoBtn = ComponentManager.getButton(infoStr, "", this.infoBtnClick, this);
        infoBtn.setPosition(bg.x + 10, bg.y + bg.height - infoBtn.height - 10);
        this.addChild(infoBtn);
        // 进度相关
        var buttombg = BaseBitmap.create("public_9_bg49");
        buttombg.width = 612;
        buttombg.height = 110;
        buttombg.setPosition(bg.x + bg.width / 2 - buttombg.width / 2, bg.y + bg.height);
        this.addChild(buttombg);
        var numBg = BaseBitmap.create("common_numbg");
        numBg.setPosition(buttombg.x - 2, buttombg.y + buttombg.height / 2 - numBg.height / 2);
        this.addChild(numBg);
        var numTFkey = this.code == "1" ? "acHotelNumTitle" : "acHotelNumTitle-" + this.code;
        var numTF = ComponentManager.getTextField(LanguageManager.getlocal(numTFkey), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        numTF.setPosition(numBg.x + numBg.width / 2 - numTF.width / 2, numBg.y + numBg.height - numTF.height - 5);
        this.addChild(numTF);
        this._findNumTF = ComponentManager.getTextField("999", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._findNumTF.width = 50;
        this._findNumTF.textAlign = egret.HorizontalAlign.CENTER;
        this._findNumTF.setPosition(numBg.x + numBg.width / 2 - this._findNumTF.width / 2, numBg.y + 12);
        this.addChild(this._findNumTF);
        this._progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 482);
        this._progress.setPosition(buttombg.x + 103, buttombg.y + buttombg.height - this._progress.height - 25);
        this.addChild(this._progress);
        //一次相关
        var oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.oneBtnClick, this);
        oneBtn.setPosition(85, buttombg.y + buttombg.height + 33);
        this.addChild(oneBtn);
        var btniconid = GameData.formatRewardItem(cfg.hotelGetReward)[0].id;
        var oneBtnIcon = BaseLoadBitmap.create("itemicon" + btniconid);
        oneBtnIcon.width = 35;
        oneBtnIcon.height = 35;
        oneBtnIcon.setPosition(oneBtn.x + oneBtn.width / 2 - oneBtnIcon.width / 2 + 12, oneBtn.y + oneBtn.height / 2 - oneBtnIcon.height / 2);
        this.addChild(oneBtnIcon);
        var oneBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemBuy"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        oneBtnIconTF.setPosition(oneBtnIcon.x - oneBtnIconTF.width, oneBtnIcon.y + oneBtnIcon.height / 2 - oneBtnIconTF.height / 2);
        this.addChild(oneBtnIconTF);
        var oneBtnIconNum = ComponentManager.getTextField("X1", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        oneBtnIconNum.setPosition(oneBtnIcon.x + oneBtnIcon.width, oneBtnIcon.y + oneBtnIcon.height / 2 - oneBtnIconNum.height / 2);
        this.addChild(oneBtnIconNum);
        var oneGemBM = BaseBitmap.create("public_icon1");
        oneGemBM.width = 42;
        oneGemBM.height = 42;
        oneGemBM.setPosition(oneBtn.x + oneBtn.width / 2 - oneGemBM.width, oneBtn.y - oneGemBM.height + 5);
        this.addChild(oneGemBM);
        this._oneNeedNumTF = ComponentManager.getTextField(String(cfg.hotelCost), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._oneNeedNumTF.setPosition(oneGemBM.x + oneGemBM.width, oneGemBM.y + oneGemBM.height / 2 - this._oneNeedNumTF.height / 2);
        this.addChild(this._oneNeedNumTF);
        var findOneTFKey = this.code == "1" ? "acHotelDrinkOne" : "acHotelDrinkOne-" + this.code;
        var findOneTF = ComponentManager.getTextField(LanguageManager.getlocal(findOneTFKey), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        findOneTF.setPosition(oneBtn.x + oneBtn.width / 2 - findOneTF.width / 2, oneBtn.y + oneBtn.height - 3);
        this.addChild(findOneTF);
        //十次相关
        var tenBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.tenBtnClick, this);
        tenBtn.setPosition(GameConfig.stageWidth - tenBtn.width - 90, buttombg.y + buttombg.height + 33);
        this.addChild(tenBtn);
        var tenBtnIcon = BaseLoadBitmap.create("itemicon" + btniconid);
        tenBtnIcon.width = 35;
        tenBtnIcon.height = 35;
        tenBtnIcon.setPosition(tenBtn.x + tenBtn.width / 2 - tenBtnIcon.width / 2 + 12, tenBtn.y + tenBtn.height / 2 - tenBtnIcon.height / 2);
        this.addChild(tenBtnIcon);
        var tenBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemBuy"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        tenBtnIconTF.setPosition(tenBtnIcon.x - tenBtnIconTF.width, tenBtnIcon.y + tenBtnIcon.height / 2 - tenBtnIconTF.height / 2);
        this.addChild(tenBtnIconTF);
        var tenBtnIconNum = ComponentManager.getTextField("X10", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        tenBtnIconNum.setPosition(tenBtnIcon.x + tenBtnIcon.width, tenBtnIcon.y + tenBtnIcon.height / 2 - tenBtnIconNum.height / 2);
        this.addChild(tenBtnIconNum);
        var tenGemBM = BaseBitmap.create("public_icon1");
        tenGemBM.width = 42;
        tenGemBM.height = 42;
        tenGemBM.setPosition(tenBtn.x + tenBtn.width / 2 - tenGemBM.width, tenBtn.y - tenGemBM.height + 5);
        this.addChild(tenGemBM);
        var tenNeedGemTF = ComponentManager.getTextField(String(cfg.hotelCost * 10 * cfg.hotelDiscount), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        tenNeedGemTF.setPosition(tenGemBM.x + tenGemBM.width, tenGemBM.y + tenGemBM.height / 2 - tenNeedGemTF.height / 2);
        this.addChild(tenNeedGemTF);
        var findTenTFKey = this.code == "1" ? "acHotelDrinkTen" : "acHotelDrinkTen-" + this.code;
        var findTenTF = ComponentManager.getTextField(LanguageManager.getlocal(findTenTFKey), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        findTenTF.setPosition(tenBtn.x + tenBtn.width / 2 - findTenTF.width / 2, tenBtn.y + tenBtn.height - 3);
        this.addChild(findTenTF);
        var tipTFKey = this.code == "1" ? "acHotelTip" : "acHotelTip-" + this.code;
        var tipTF = ComponentManager.getTextField(LanguageManager.getlocal(tipTFKey), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        tipTF.textAlign = egret.HorizontalAlign.CENTER;
        tipTF.setPosition(bg.x + bg.width / 2 - tipTF.width / 2, 14);
        this.addChild(tipTF);
        // 倒计时
        var countDownBg = BaseBitmap.create("public_searchdescbg");
        countDownBg.setPosition(GameConfig.stageWidth / 2 - countDownBg.width / 2, bg.y + bg.height - countDownBg.height);
        this.addChild(countDownBg);
        var acCDTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.addChild(acCDTxt);
        this._acCDTxt = acCDTxt;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var deltaT = vo.getAcResidueTime();
        if (deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [LanguageManager.getlocal("acAlliance_acCDEnd")]);
        }
        acCDTxt.setPosition(GameConfig.stageWidth / 2 - acCDTxt.width / 2, countDownBg.y + countDownBg.height / 2 - acCDTxt.height / 2);
        this._bg = bg;
        this.initBox();
        this.refreshView();
        SoundManager.playEffect("effect_servant_" + this.getServantId());
    };
    /**
     * 抽奖的返回数据
     */
    AcHotelViewTab1.prototype.lotteryHandle = function (event) {
        var _this = this;
        var ret = event.data.ret;
        var data = event.data.data.data;
        if (ret) {
            var rewards_1 = data.otherrewards;
            var otherReward_1 = data.noterewards;
            var timer_1 = 700;
            if (this._type == "1") {
                egret.Tween.get(this._npcBM).call(function () {
                    egret.Tween.get(_this._bowlBM).to({ alpha: 0 }, timer_1).call(function () {
                        egret.Tween.removeTweens(_this._bowlBM);
                    }, _this);
                }, this).wait(timer_1).call(function () {
                    var npcBMStr = _this.code == "1" ? "achotelview_bowlani1" : "achotelview_bowlani1-" + _this.getUiCode();
                    _this._npcBM.setRes(npcBMStr);
                }, this).wait(timer_1).call(function () {
                    var npcBMStr = _this.code == "1" ? "achotelview_bowlani2" : "achotelview_bowlani2-" + _this.getUiCode();
                    _this._npcBM.setRes(npcBMStr);
                }, this).wait(timer_1).call(function () {
                    egret.Tween.removeTweens(_this._npcBM);
                    var npcBMStr = _this.code == "1" ? "achotelview_idle" : "achotelview_idle-" + _this.getUiCode();
                    _this._npcBM.setRes(npcBMStr);
                    _this._bowlBM.alpha = 1;
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards_1, "otherRewards": otherReward_1, "isPlayAni": true });
                    _this.refreshView();
                    _this._isSendMessage = false;
                }, this);
            }
            else if (this._type == "2") {
                egret.Tween.get(this._npcBM).call(function () {
                    egret.Tween.get(_this._jarsBM).to({ alpha: 0 }, timer_1).call(function () {
                        egret.Tween.removeTweens(_this._jarsBM);
                    }, _this);
                }, this).wait(timer_1).call(function () {
                    var npcBMStr = _this.code == "1" ? "achotelview_jarsani1" : "achotelview_jarsani1-" + _this.getUiCode();
                    _this._npcBM.setRes(npcBMStr);
                }, this).wait(timer_1).call(function () {
                    var npcBMStr = _this.code == "1" ? "achotelview_jarsani2" : "achotelview_jarsani2-" + _this.getUiCode();
                    _this._npcBM.setRes(npcBMStr);
                }, this).wait(timer_1).call(function () {
                    egret.Tween.removeTweens(_this._npcBM);
                    var npcBMStr = _this.code == "1" ? "achotelview_idle" : "achotelview_idle-" + _this.getUiCode();
                    _this._npcBM.setRes(npcBMStr);
                    _this._jarsBM.alpha = 1;
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards_1, "otherRewards": otherReward_1, "isPlayAni": true });
                    _this.refreshView();
                    _this._isSendMessage = false;
                }, this);
            }
            // let rewards = data.otherrewards;
            // let otherReward = data.noterewards;
            // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,"otherRewards":otherReward,"isPlayAni":true});
            // this.refreshView();
        }
    };
    /**
     * 宝箱的返回数据
     */
    AcHotelViewTab1.prototype.receiveBoxHandle = function (event) {
        var ret = event.data.ret;
        var data = event.data.data.data;
        if (ret) {
            var rewards_2 = data.rewards;
            if (rewards_2 != this._nowReward) {
                var rewardItemvo = GameData.formatRewardItem(this._nowReward)[0];
                var servantReward = Config.ServantCfg.getServantItemById(rewardItemvo.id);
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, {
                    "name": servantReward.name, "touch": servantReward.exchange, "message": "changeOtherRewardTip", "callback": function () {
                        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards_2, "isPlayAni": true });
                    }, "handler": this
                });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards_2, "isPlayAni": true });
            }
            this.refreshView();
        }
        // console.log("1");
    };
    /**
     * 刷新UI
     */
    AcHotelViewTab1.prototype.refreshView = function () {
        this.refreshTF();
        this.refreshBox();
        this.refreshProgress();
    };
    AcHotelViewTab1.prototype.refreshProgress = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var percent = vo.lotteryNum() / this._maxBoxNum;
        this._progress.setPercentage(percent);
    };
    AcHotelViewTab1.prototype.refreshTF = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (vo.isFree) {
            this._oneNeedNumTF.text = LanguageManager.getlocal("sysFreeDesc");
        }
        else {
            this._oneNeedNumTF.text = String(cfg.hotelCost);
        }
        this._findNumTF.text = String(vo.lotteryNum());
    };
    /**
     * 刷新宝箱
     */
    AcHotelViewTab1.prototype.refreshBox = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var boxCfg = cfg.getBoxList();
        for (var i = 0; i < this._boxInfoList.length; i++) {
            var needNum = boxCfg[i].needNum;
            var voNum = vo.lotteryNum();
            var isRevice = vo.boxStatus(boxCfg[i].id);
            if (needNum <= voNum) {
                if (isRevice) {
                    this._boxInfoList[i].box.setRes("common_box_3");
                    this._boxInfoList[i].boxLight.setVisible(false);
                    egret.Tween.removeTweens(this._boxInfoList[i].box);
                    egret.Tween.removeTweens(this._boxInfoList[i].boxLight);
                }
                else {
                    this._boxInfoList[i].box.setRes("common_box_2");
                    this._boxInfoList[i].boxLight.setVisible(true);
                    egret.Tween.get(this._boxInfoList[i].boxLight, { loop: true }).to({ rotation: this._boxInfoList[i].boxLight.rotation + 360 }, 10000);
                    egret.Tween.get(this._boxInfoList[i].box, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                }
            }
            else {
                this._boxInfoList[i].box.setRes("common_box_1");
                this._boxInfoList[i].boxLight.setVisible(false);
                egret.Tween.removeTweens(this._boxInfoList[i].box);
                egret.Tween.removeTweens(this._boxInfoList[i].boxLight);
            }
        }
    };
    /**
     * 初始化宝箱
     */
    AcHotelViewTab1.prototype.initBox = function () {
        var _this = this;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var boxCfg = cfg.getBoxList();
        var maxNum = boxCfg[boxCfg.length - 1].needNum;
        var _loop_1 = function (i) {
            var offestX = 0;
            if (i == 1) {
                offestX = 7;
            }
            else if (i == boxCfg.length - 1) {
                offestX = -10;
            }
            var boxbg = BaseBitmap.create("common_boxbg");
            var posX = this_1._progress.x + (boxCfg[i].needNum / maxNum) * this_1._progress.width;
            boxbg.setPosition(posX - boxbg.width / 2 + offestX, this_1._progress.y - boxbg.height);
            boxbg.name = "1";
            this_1.addChild(boxbg);
            var boxLight = BaseBitmap.create("acturantable_taskbox_light");
            boxLight.anchorOffsetX = boxLight.width / 2;
            boxLight.anchorOffsetY = boxLight.height / 2;
            boxLight.setPosition(boxbg.x + boxbg.width / 2, boxbg.y + boxbg.height / 2);
            this_1.addChild(boxLight);
            var box = BaseBitmap.create("common_box_1");
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            box.setScale(0.75);
            box.setPosition(boxLight.x, boxLight.y);
            this_1.addChild(box);
            box.addTouchTap(function (even) {
                var vo = Api.acVoApi.getActivityVoByAidAndCode(_this.aid, _this.code);
                var voNum = vo.lotteryNum();
                var isRevice = vo.boxStatus(boxCfg[i].id);
                var needNum = boxCfg[i].needNum;
                if (needNum <= voNum) {
                    if (!isRevice) {
                        _this._nowReward = boxCfg[i].getReward;
                        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELITEMA, { "activeId": _this._activityID, "lotteryId": boxCfg[i].id });
                        return;
                    }
                }
                var ishasCode = true;
                if (_this.code == "1") {
                    ishasCode = false;
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ACMIDAUTUMNREWARDINFOPOPUPVIEW, { "code": _this.code, "aid": _this.aid, "itemCfg": boxCfg[i], ishasCode: ishasCode });
            }, this_1);
            var boxDescKey = this_1.code == "1" ? "acHotelBoxNum" : "acHotelBoxNum-" + this_1.code;
            var boxDesc = ComponentManager.getTextField(LanguageManager.getlocal(boxDescKey, [String(boxCfg[i].needNum)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            boxDesc.setPosition(posX - boxDesc.width / 2 + offestX, this_1._progress.y + this_1._progress.height + 3);
            this_1.addChild(boxDesc);
            if (i == boxCfg.length - 1) {
                var speakStr = this_1.code == "1" ? "acHotelSpeakTip" : "acHotelSpeakTip-" + this_1.code;
                this_1._speakStr = LanguageManager.getlocal(speakStr, [String(boxCfg[i].needNum)]);
                this_1._speakTF = ComponentManager.getTextField(this_1._speakStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
                this_1._speakTail = BaseBitmap.create("public_9_bg25_tail");
                this_1._speakBg = BaseBitmap.create("public_9_bg25");
                this_1._speakBg.width = this_1._speakTF.width + 40;
                var posX_1 = box.x;
                if (posX_1 + this_1._speakBg.width + 5 > GameConfig.stageWidth) {
                    posX_1 = GameConfig.stageWidth - this_1._speakBg.width - 15;
                }
                this_1._speakBg.setPosition(posX_1, box.y - box.height / 2 - this_1._speakBg.height - this_1._speakTail.height + 5);
                this_1.addChild(this_1._speakBg);
                this_1._speakTF.setPosition(this_1._speakBg.x + this_1._speakBg.width / 2 - this_1._speakTF.width / 2, this_1._speakBg.y + this_1._speakBg.height / 2 - this_1._speakTF.height / 2);
                this_1.addChild(this_1._speakTF);
                this_1._speakTail.skewY = 180;
                this_1._speakTail.setPosition(box.x, box.y - box.height / 2 - this_1._speakTail.height);
                this_1.addChild(this_1._speakTail);
                this_1._servantBM = BaseLoadBitmap.create("servant_half_" + this_1.getServantId());
                var scale = 0.33;
                this_1._servantBM.height = 177;
                this_1._servantBM.width = 180;
                this_1._servantBM.setScale(scale);
                // this._servantBM.setPosition(this._speakBg.x - this._servantBM.width * scale / 2, this._speakBg.y + this._speakBg.height - this._servantBM.height * scale);
                this_1._servantBM.setPosition(this_1._speakBg.x - this_1._servantBM.width * scale + 17, this_1._speakBg.y + this_1._speakBg.height - this_1._servantBM.height * scale);
                this_1.addChild(this_1._servantBM);
                egret.Tween.get(this_1._speakBg, { loop: true }).call(function () {
                    _this._speakTF.text = "";
                    _this._speakTail.setVisible(true);
                    _this._servantBM.setVisible(true);
                    _this._speakTF.setVisible(true);
                    _this._speakBg.setVisible(true);
                    _this._messageLength = 0;
                    egret.Tween.get(_this._speakTF, { loop: true }).wait(150).call(function () {
                        _this._speakTF.text = _this._speakStr.substr(0, _this._messageLength);
                        _this._messageLength++;
                    }, _this);
                }, this_1).wait(this_1._speakStr.length * 150 + 2000).call(function () {
                    _this._speakTail.setVisible(false);
                    _this._servantBM.setVisible(false);
                    _this._speakTF.setVisible(false);
                    _this._speakBg.setVisible(false);
                    _this._messageLength = 0;
                    egret.Tween.removeTweens(_this._speakTF);
                }, this_1).wait(10000);
            }
            var boxInfo = { "box": box, "boxLight": boxLight };
            this_1._boxInfoList.push(boxInfo);
        };
        var this_1 = this;
        for (var i = 0; i < boxCfg.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * 查看信息
     */
    AcHotelViewTab1.prototype.infoBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACHOTELACINFOPOPUPVIEW, { "code": this.code, "aid": this.aid });
    };
    /**
     * 买一次
     */
    AcHotelViewTab1.prototype.oneBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var deltaT = vo.et - GameData.serverTime - 86400 * 1;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._isSendMessage) {
            return;
        }
        var cost = cfg.hotelCost;
        if (vo.isFree) {
            cost = 0;
        }
        if (Api.playerVoApi.getPlayerGem() < cost) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELLTTTERY, { "activeId": this._activityID, "isTenPlay": 0 });
        this._type = "1";
        this._isSendMessage = true;
    };
    /**
     * 买十次
     */
    AcHotelViewTab1.prototype.tenBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var deltaT = vo.et - GameData.serverTime - 86400 * 1;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._isSendMessage) {
            return;
        }
        var cost = cfg.hotelCost * 10 * cfg.hotelDiscount;
        if (Api.playerVoApi.getPlayerGem() < cost) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELLTTTERY, { "activeId": this._activityID, "isTenPlay": 1 });
        this._type = "2";
        this._isSendMessage = true;
    };
    AcHotelViewTab1.prototype.tick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var deltaT = vo.getAcResidueTime();
        if (this._acCDTxt) {
            if (deltaT > 0) {
                this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            }
            else {
                this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [LanguageManager.getlocal("acAlliance_acCDEnd")]);
            }
        }
    };
    AcHotelViewTab1.prototype.getUiCode = function () {
        // if (this.code == "3") {
        // 	return "2"
        // }
        return this.code;
    };
    /**servantId */
    AcHotelViewTab1.prototype.getServantId = function () {
        var servantId = "1055";
        if (this.code == "1") {
            servantId = "1054";
        }
        else if (this.code == "2" || this.code == "3") {
            servantId = "1055";
        }
        return servantId;
    };
    AcHotelViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELLTTTERY, this.lotteryHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELITEMA, this.receiveBoxHandle, this);
        egret.Tween.removeTweens(this._speakTF);
        egret.Tween.removeTweens(this._speakBg);
        egret.Tween.removeTweens(this._bowlBM);
        egret.Tween.removeTweens(this._npcBM);
        egret.Tween.removeTweens(this._jarsBM);
        this._findNumTF = null;
        this._progress = null;
        this._oneNeedNumTF = null;
        this._isSendMessage = false;
        this._boxInfoList = [];
        this._maxBoxNum = null;
        this._speakStr = null;
        this._speakTF = null;
        this._speakTail = null;
        this._speakBg = null;
        this._servantBM = null;
        this._messageLength = 0;
        this._nowReward = null;
        this._type = null;
        this._npcBM = null;
        this._bowlBM = null;
        this._jarsBM = null;
        this._acCDTxt = null;
        // this.aid = null;
        // this.code = null;
        _super.prototype.dispose.call(this);
    };
    return AcHotelViewTab1;
}(AcCommonViewTab));
__reflect(AcHotelViewTab1.prototype, "AcHotelViewTab1");
//# sourceMappingURL=AcHotelViewTab1.js.map