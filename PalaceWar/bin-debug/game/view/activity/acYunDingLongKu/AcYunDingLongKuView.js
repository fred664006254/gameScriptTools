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
  * 客栈活动
  * @author 张朝阳
  * date 2019/6/4
  * @class AcYunDingLongKuView
  */
var AcYunDingLongKuView = (function (_super) {
    __extends(AcYunDingLongKuView, _super);
    // private 
    function AcYunDingLongKuView() {
        var _this = _super.call(this) || this;
        _this._wifeNpc = null;
        _this._mybody = null;
        _this._maskbg = null;
        _this._acCDTxt = null;
        _this._myselfBM = null;
        _this._buttombg = null;
        _this._findNumTF = null;
        _this._progress = null;
        _this._npcContainer = null;
        _this._swordBtn = null;
        _this._swordTxt = null;
        // private _swordBM: BaseBitmap = null;
        _this._crossbowDB = null;
        _this._crossbowHitDB = null;
        _this._cannonDB = null;
        _this._cannonHitDB = null;
        _this._knifeBtn = null;
        _this._knifeTxt = null;
        // private _knifeBM: BaseBitmap = null;
        _this._topTipTF = null;
        _this._topTipBg = null;
        _this._speakStr = null;
        _this._speakTF = null;
        _this._speakTail = null;
        _this._speakBg = null;
        _this._wifeBM = null;
        _this._messageLength = 0;
        _this._isPlayWifeSpeak = false;
        _this._startViewContainer = null;
        _this._endViewContainer = null;
        _this._enemyNpcBM = null;
        _this._enemyNpcDragonBone = null;
        _this._isPlayAni = false;
        _this._handleRewars = null;
        _this._containerInfo = null;
        _this._isKnife = false;
        _this._isNpcHurt = false;
        _this._timer = 0;
        /**宝箱相关 */
        _this._boxInfoList = [];
        return _this;
    }
    AcYunDingLongKuView.prototype.getContainerY = function () {
        return 14;
    };
    AcYunDingLongKuView.prototype.initView = function () {
        var _this = this;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (vo.isFriestLogin()) {
            ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, {
                idx: "acYunDingLongKu_1-1", f: function () {
                    if (vo.isFriestLogin()) {
                        _this.request(NetRequestConst.REQUST_ACTIVITY_GETTWINITMARRYFLAG, { activeId: vo.aidAndCode });
                    }
                }, o: this
            });
        }
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_YUNDINGLONGKUBUYITEM, this.playNpcHandle, this);
        var bg = BaseLoadBitmap.create("acyundinglongkuview_bg-" + this.getUiCode());
        bg.width = 660;
        bg.height = 1156;
        bg.setPosition(-10, GameConfig.stageHeigth - bg.height - 104 + 10);
        this.addChildToContainer(bg);
        this._startViewContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._startViewContainer);
        this._endViewContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._endViewContainer);
        this._wifeNpc = BaseLoadBitmap.create("acyundinglongkuview_wifenpc-" + this.getUiCode());
        this._wifeNpc.width = 439;
        this._wifeNpc.height = 613;
        this._wifeNpc.setPosition(bg.x + 201 + 10, bg.y + bg.height - 98 - this._wifeNpc.height - 10);
        this._endViewContainer.addChild(this._wifeNpc);
        var playerLv = Api.playerVoApi.getPlayerLevel();
        this._mybody = Api.playerVoApi.getPlayerPortrait(playerLv, Api.playerVoApi.getPlayePicId());
        this._mybody.setScale(1.2);
        this._mybody.setPosition(bg.x + 13 + 10, bg.y + bg.height - this._mybody.height - 10);
        this._endViewContainer.addChild(this._mybody);
        this._maskbg = BaseLoadBitmap.create("acyundinglongkuview_maskbg-" + this.getUiCode());
        this._maskbg.width = 640;
        this._maskbg.height = 282;
        this._maskbg.setPosition(bg.x + 10, bg.y + bg.height - 98 - this._maskbg.height - 10);
        this._endViewContainer.addChild(this._maskbg);
        var topbg = BaseLoadBitmap.create("forpeople_top");
        topbg.width = 640;
        topbg.height = 160;
        topbg.setPosition(0, this.getContainerY() - 135);
        this.addChildToContainer(topbg);
        var topTxt = ComponentManager.getTextField(LanguageManager.getlocal("acYunDingLongKuViewTop-" + this.code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        topTxt.setPosition(topbg.x + topbg.width / 2 - topTxt.width / 2, topbg.y + topbg.height - topTxt.height - 9);
        this.addChildToContainer(topTxt);
        // 倒计时
        var countDownBg = BaseBitmap.create("public_searchdescbg");
        countDownBg.setPosition(GameConfig.stageWidth / 2 - countDownBg.width / 2, topTxt.y + topTxt.height + 8);
        this.addChildToContainer(countDownBg);
        var acCDTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.addChildToContainer(acCDTxt);
        this._acCDTxt = acCDTxt;
        var deltaT = vo.getAcResidueTime();
        if (deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [LanguageManager.getlocal("acAlliance_acCDEnd")]);
        }
        acCDTxt.setPosition(GameConfig.stageWidth / 2 - acCDTxt.width / 2, countDownBg.y + countDownBg.height / 2 - acCDTxt.height / 2);
        // this._myselfBM = BaseLoadBitmap.create("acmarryview_myself");
        // this._myselfBM.width = 309;
        // this._myselfBM.height = 400;
        // this._myselfBM.setPosition(bg.x + bg.width / 2 - this._myselfBM.width / 2, bg.y + bg.height - this._myselfBM.height);
        // this._startViewContainer.addChild(this._myselfBM);
        this._npcContainer = new BaseDisplayObjectContainer();
        this._startViewContainer.addChild(this._npcContainer);
        this._enemyNpcBM = BaseLoadBitmap.create("punish_boss9");
        this._enemyNpcBM.width = 640;
        this._enemyNpcBM.height = 590;
        this._enemyNpcBM.anchorOffsetX = this._enemyNpcBM.width / 2;
        this._enemyNpcBM.anchorOffsetY = this._enemyNpcBM.height;
        this._enemyNpcBM.setPosition(bg.x + bg.width / 2, bg.y + bg.height - 98 - 200 - 10);
        this._npcContainer.addChild(this._enemyNpcBM);
        if (App.CommonUtil.check_dragon() && ResourceManager.hasRes("acpunishview_dragon_ske")) {
            this._enemyNpcBM.setVisible(false);
            this._enemyNpcDragonBone = App.DragonBonesUtil.getLoadDragonBones('acpunishview_dragon', 0, "idle");
            this._enemyNpcDragonBone.x = this._enemyNpcBM.x;
            this._enemyNpcDragonBone.y = this._enemyNpcBM.y + 220;
            this._npcContainer.addChild(this._enemyNpcDragonBone);
        }
        var npcTalkTail = BaseBitmap.create("public_9_bg13_tail");
        npcTalkTail.setPosition(this._enemyNpcBM.x + this._enemyNpcBM.width / 2 - 250, this._enemyNpcBM.y - this._enemyNpcBM.height + 150);
        this._npcContainer.addChild(npcTalkTail);
        var npcTalkBg = BaseBitmap.create("public_9_bg13");
        npcTalkBg.width = 280;
        var npcTalkTxt = ComponentManager.getTextField(LanguageManager.getlocal("acMarryViewNpcLoginTalk1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        npcTalkTxt.width = 260;
        npcTalkBg.height = 35 + npcTalkTxt.height;
        npcTalkBg.setPosition(npcTalkTail.x - 40, npcTalkTail.y - npcTalkBg.height + 3);
        npcTalkTxt.setPosition(npcTalkBg.x + npcTalkBg.width / 2 - npcTalkTxt.width / 2, npcTalkBg.y + npcTalkBg.height / 2 - npcTalkTxt.height / 2);
        this._npcContainer.addChild(npcTalkBg);
        this._npcContainer.addChild(npcTalkTxt);
        npcTalkBg.setVisible(false);
        npcTalkTxt.setVisible(false);
        npcTalkTail.setVisible(false);
        this._containerInfo = { npcTalkTail: npcTalkTail, npcTalkBg: npcTalkBg, npcTalkTxt: npcTalkTxt };
        this._crossbowHitDB = App.DragonBonesUtil.getLoadDragonBones("acydlkview_crossbowhiteffect", 1, "hit");
        this._crossbowHitDB.setPosition(this._enemyNpcBM.x, this._enemyNpcBM.y - this._enemyNpcBM.height / 2);
        this._startViewContainer.addChild(this._crossbowHitDB);
        this._crossbowHitDB.setVisible(false);
        this._cannonHitDB = App.DragonBonesUtil.getLoadDragonBones("acydlkview_cannonhiteffect", 1, "hit");
        this._cannonHitDB.setPosition(this._enemyNpcBM.x, this._enemyNpcBM.y - this._enemyNpcBM.height / 2);
        this._startViewContainer.addChild(this._cannonHitDB);
        this._cannonHitDB.setVisible(false);
        //大炮龙骨
        this._crossbowDB = App.DragonBonesUtil.getLoadDragonBones("acydlkview_crossboweffect", 0, "idle");
        this._crossbowDB.setPosition(bg.x + 95 + 10, bg.y + bg.height - 110 - 10);
        this._startViewContainer.addChild(this._crossbowDB);
        //大炮龙骨
        this._cannonDB = App.DragonBonesUtil.getLoadDragonBones("acydlkview_cannoneffect", 0, "idle");
        this._cannonDB.setPosition(bg.x + bg.width - 55 - 10, bg.y + bg.height - 110 - 10);
        this._startViewContainer.addChild(this._cannonDB);
        this._buttombg = BaseLoadBitmap.create("wifeview_bottombg");
        this._buttombg.width = 640;
        this._buttombg.height = 98;
        this._buttombg.setPosition(bg.x + bg.width / 2 - this._buttombg.width / 2, bg.y + bg.height - this._buttombg.height - 10);
        this.addChildToContainer(this._buttombg);
        var numBg = BaseBitmap.create("common_numbg");
        numBg.setPosition(this._buttombg.x - 2, this._buttombg.y + this._buttombg.height / 2 - numBg.height / 2);
        this.addChildToContainer(numBg);
        var numTF = ComponentManager.getTextField(LanguageManager.getlocal("acYunDingLongKuViewScoreTitle-" + this.code), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        numTF.setPosition(numBg.x + numBg.width / 2 - numTF.width / 2, numBg.y + numBg.height - numTF.height - 5);
        this.addChildToContainer(numTF);
        this._findNumTF = ComponentManager.getTextField("999", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._findNumTF.width = 50;
        this._findNumTF.textAlign = egret.HorizontalAlign.CENTER;
        this._findNumTF.setPosition(numBg.x + numBg.width / 2 - this._findNumTF.width / 2, numBg.y + 12);
        this.addChildToContainer(this._findNumTF);
        this._progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 500);
        this._progress.setPosition(this._buttombg.x + 103, this._buttombg.y + this._buttombg.height - this._progress.height - 40);
        this.addChildToContainer(this._progress);
        var swordCfg = cfg.battleUseItemCfgList[0];
        this._swordBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, null, this.swordBtnClick, this);
        this._swordBtn.setPosition(this._buttombg.x + 45, this._buttombg.y - this._swordBtn.height - 10);
        this._swordBtn.setText(String(swordCfg.gemCost), false);
        this._swordBtn.addTextIcon("public_icon1");
        this._startViewContainer.addChild(this._swordBtn);
        this._swordTxt = ComponentManager.getTextField(LanguageManager.getlocal("acYunDingLongKuCrossbowAddScore-" + this.code, [String(swordCfg.getScore)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._swordTxt.setPosition(this._swordBtn.x + this._swordBtn.width / 2 - this._swordTxt.width / 2, this._swordBtn.y - this._swordTxt.height - 5);
        var swordtxtbg = BaseBitmap.create("acyundinglongkuview_common_bg");
        swordtxtbg.width = this._swordTxt.width + 20;
        swordtxtbg.setPosition(this._swordTxt.x + this._swordTxt.width / 2 - swordtxtbg.width / 2, this._swordTxt.y + this._swordTxt.height / 2 - swordtxtbg.height / 2);
        this._startViewContainer.addChild(swordtxtbg);
        this._startViewContainer.addChild(this._swordTxt);
        // this._swordBM = BaseBitmap.create("acyundinglongkuview_crossbow-" + this.getUiCode());
        // this._swordBM.setPosition(this._swordBtn.x + this._swordBtn.width / 2 - this._swordBM.width / 2, this._swordTxt.y - this._swordBM.height);
        // this._startViewContainer.addChild(this._swordBM)
        var knifeCfg = cfg.battleUseItemCfgList[1];
        this._knifeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, null, this.knifeBtnClick, this);
        this._knifeBtn.setPosition(this._buttombg.x + this._buttombg.width - this._knifeBtn.width - 45, this._swordBtn.y);
        this._knifeBtn.setText(String(knifeCfg.gemCost), false);
        this._knifeBtn.addTextIcon("public_icon1");
        this._startViewContainer.addChild(this._knifeBtn);
        this._knifeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acYunDingLongKuCannonAddScore-" + this.code, [String(knifeCfg.getScore)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._knifeTxt.setPosition(this._knifeBtn.x + this._knifeBtn.width / 2 - this._knifeTxt.width / 2, this._swordTxt.y);
        var knifetxtbg = BaseBitmap.create("acyundinglongkuview_common_bg");
        knifetxtbg.width = this._knifeTxt.width + 50;
        knifetxtbg.setPosition(this._knifeTxt.x + this._knifeTxt.width / 2 - knifetxtbg.width / 2, this._knifeTxt.y + this._knifeTxt.height / 2 - knifetxtbg.height / 2);
        this._startViewContainer.addChild(knifetxtbg);
        this._startViewContainer.addChild(this._knifeTxt);
        // this._knifeBM = BaseBitmap.create("acyundinglongkuview_cannon-" + this.getUiCode());
        // this._knifeBM.setPosition(this._knifeBtn.x + this._knifeBtn.width / 2 - this._knifeBM.width / 2, this._knifeTxt.y - this._knifeBM.height);
        // this._startViewContainer.addChild(this._knifeBM);
        this._topTipBg = BaseBitmap.create("public_searchdescbg");
        this._topTipTF = ComponentManager.getTextField(LanguageManager.getlocal("acYunDingLongKuViewTopTip-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._topTipBg.width = this._topTipTF.width + 50;
        this._topTipBg.setPosition(topbg.x + topbg.width / 2 - this._topTipBg.width / 2, bg.y + bg.height - 240 - 10);
        this._endViewContainer.addChild(this._topTipBg);
        this._topTipTF.setPosition(this._topTipBg.x + this._topTipBg.width / 2 - this._topTipTF.width / 2, this._topTipBg.y + this._topTipBg.height / 2 - this._topTipTF.height / 2);
        this._endViewContainer.addChild(this._topTipTF);
        var rewardInfoBtn = ComponentManager.getButton("acmarryview_common_btn", null, function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACYUNDINGLONGKUREWARDPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        rewardInfoBtn.setPosition(topbg.x + 15, topbg.y + topbg.height + 15);
        this.addChildToContainer(rewardInfoBtn);
        this.initBox();
        this.tick();
        // 分数超过最高的分数
        if (vo.getNpcId()) {
            this.startView();
        }
        else {
            this.endView();
        }
    };
    /**
    * 初始化宝箱
    */
    AcYunDingLongKuView.prototype.initBox = function () {
        var _this = this;
        this._boxInfoList = [];
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var boxCfg = cfg.battleItemCfgList;
        var maxNum = boxCfg[boxCfg.length - 1].killPoint;
        var _loop_1 = function (i) {
            var boxItemCfg = boxCfg[i];
            var offestX = 0;
            if (i == boxCfg.length - 1) {
                offestX = -10;
            }
            var posX = this_1._progress.x + (boxItemCfg.killPoint / maxNum) * this_1._progress.width;
            var boxLight = BaseBitmap.create("acturantable_taskbox_light");
            boxLight.anchorOffsetX = boxLight.width / 2;
            boxLight.anchorOffsetY = boxLight.height / 2;
            boxLight.setPosition(posX + offestX, this_1._progress.y + this_1._progress.height / 2);
            this_1.addChildToContainer(boxLight);
            var box = BaseBitmap.create("common_box_1");
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            box.setScale(0.75);
            box.setPosition(boxLight.x, boxLight.y);
            this_1.addChildToContainer(box);
            box.addTouchTap(function (even) {
                ViewController.getInstance().openView(ViewConst.POPUP.ACYUNDINGLONGKUBOXINFOPOPUPVIEW, { "code": _this.code, "aid": _this.aid, boxCfg: boxItemCfg });
            }, this_1);
            var boxDesc = ComponentManager.getTextField(LanguageManager.getlocal("acYunDingLongKuViewScore-" + this_1.code, [String(boxItemCfg.killPoint)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            boxDesc.setPosition(posX - boxDesc.width / 2 + offestX, this_1._progress.y + this_1._progress.height + 10);
            this_1.addChildToContainer(boxDesc);
            if (i == boxCfg.length - 1) {
                this_1._speakStr = LanguageManager.getlocal("acYunDingLongKuSpeakTip-" + this_1.code, [String(boxItemCfg.killPoint)]);
                this_1._speakTF = ComponentManager.getTextField(this_1._speakStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
                this_1._speakTail = BaseBitmap.create("public_9_bg25_tail");
                this_1._speakBg = BaseBitmap.create("public_9_bg25");
                this_1._speakBg.width = this_1._speakTF.width + 40;
                var posX_1 = box.x;
                if (posX_1 + this_1._speakBg.width + 5 > GameConfig.stageWidth) {
                    posX_1 = GameConfig.stageWidth - this_1._speakBg.width - 15;
                }
                this_1._speakBg.setPosition(posX_1, box.y - box.height / 2 - this_1._speakBg.height - this_1._speakTail.height + 5);
                //  this._speakBg.setPosition(posX,box.y);
                this_1.addChildToContainer(this_1._speakBg);
                this_1._speakTF.setPosition(this_1._speakBg.x + this_1._speakBg.width / 2 - this_1._speakTF.width / 2, this_1._speakBg.y + this_1._speakBg.height / 2 - this_1._speakTF.height / 2);
                this_1.addChildToContainer(this_1._speakTF);
                this_1._speakTail.skewY = 180;
                this_1._speakTail.setPosition(box.x, this_1._speakBg.y + this_1._speakBg.height - 3);
                this_1.addChildToContainer(this_1._speakTail);
                this_1._wifeBM = BaseLoadBitmap.create("wife_half_222");
                var scale = 0.30;
                this_1._wifeBM.height = 205;
                this_1._wifeBM.width = 196;
                this_1._wifeBM.setScale(scale);
                this_1._wifeBM.setPosition(this_1._speakBg.x - this_1._wifeBM.width * scale / 2, this_1._speakBg.y + this_1._speakBg.height - this_1._wifeBM.height * scale);
                this_1.addChildToContainer(this_1._wifeBM);
                // egret.Tween.get(this._speakBg, { loop: true }).call(() => {
                // 	this._speakTF.text = "";
                // 	this._speakTail.setVisible(true);
                // 	this._wifeBM.setVisible(true);
                // 	this._speakTF.setVisible(true);
                // 	this._speakBg.setVisible(true);
                // 	this._messageLength = 0;
                // 	egret.Tween.get(this._speakTF, { loop: true }).wait(150).call(() => {
                // 		this._speakTF.text = this._speakStr.substr(0, this._messageLength);
                // 		this._messageLength++;
                // 	}, this);
                // }, this).wait(this._speakStr.length * 150 + 2000).call(() => {
                // 	this._speakTail.setVisible(false);
                // 	this._wifeBM.setVisible(false);
                // 	this._speakTF.setVisible(false);
                // 	this._speakBg.setVisible(false);
                // 	this._messageLength = 0;
                // 	egret.Tween.removeTweens(this._speakTF);
                // }, this).wait(10000);
            }
            var boxInfo = { "box": box, "boxLight": boxLight };
            this_1._boxInfoList.push(boxInfo);
        };
        var this_1 = this;
        for (var i = 0; i < boxCfg.length; i++) {
            _loop_1(i);
        }
        this.refreshBox();
    };
    /**
 * 初始化ui
 */
    AcYunDingLongKuView.prototype.startView = function () {
        this._startViewContainer.setVisible(true);
        this._endViewContainer.setVisible(false);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    };
    /**
 * 最后的UI
 */
    AcYunDingLongKuView.prototype.endView = function () {
        // let vo = <AcYunDingLongKuVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        // if ((!vo.getNpcId())) {
        // 	let idx = "acMarry_2_1";
        // 	if (this.code != "1") {
        // 		idx = "acMarry_2_1-" + this.code;
        // 	}
        // 	ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, { idx: idx });
        // }
        this._startViewContainer.setVisible(false);
        this._endViewContainer.setVisible(true);
    };
    /**
     * 刷新宝箱
     */
    AcYunDingLongKuView.prototype.refreshBox = function () {
        var _this = this;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var boxCfg = cfg.battleItemCfgList;
        var maxNum = boxCfg[boxCfg.length - 1].killPoint;
        for (var i = 0; i < this._boxInfoList.length; i++) {
            var boxItemCfg = boxCfg[i];
            if (vo.getScore() >= boxItemCfg.killPoint) {
                if (vo.getBoxFlag(boxItemCfg.id)) {
                    this._boxInfoList[i].box.setRes("common_box_3");
                    this._boxInfoList[i].boxLight.setVisible(false);
                    if (i == this._boxInfoList.length - 1) {
                        egret.Tween.removeTweens(this._speakBg);
                        egret.Tween.removeTweens(this._speakTF);
                        this._speakTF.setVisible(false);
                        this._speakTail.setVisible(false);
                        this._speakBg.setVisible(false);
                        this._wifeBM.setVisible(false);
                    }
                    egret.Tween.removeTweens(this._boxInfoList[i].box);
                    egret.Tween.removeTweens(this._boxInfoList[i].boxLight);
                }
                else {
                    this._boxInfoList[i].box.setRes("common_box_2");
                    this._boxInfoList[i].boxLight.setVisible(true);
                    egret.Tween.get(this._boxInfoList[i].boxLight, { loop: true }).to({ rotation: this._boxInfoList[i].boxLight.rotation + 360 }, 10000);
                    egret.Tween.get(this._boxInfoList[i].box, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                    if (i == this._boxInfoList.length - 1 && this._isPlayWifeSpeak == false) {
                        this._isPlayWifeSpeak = true;
                        egret.Tween.removeTweens(this._speakBg);
                        egret.Tween.removeTweens(this._speakTF);
                        egret.Tween.get(this._speakBg, { loop: true }).call(function () {
                            _this._speakTF.text = "";
                            _this._speakTail.setVisible(true);
                            _this._wifeBM.setVisible(true);
                            _this._speakTF.setVisible(true);
                            _this._speakBg.setVisible(true);
                            _this._messageLength = 0;
                            egret.Tween.get(_this._speakTF, { loop: true }).wait(150).call(function () {
                                _this._speakTF.text = _this._speakStr.substr(0, _this._messageLength);
                                _this._messageLength++;
                            }, _this);
                        }, this).wait(this._speakStr.length * 150 + 2000).call(function () {
                            _this._speakTail.setVisible(false);
                            _this._wifeBM.setVisible(false);
                            _this._speakTF.setVisible(false);
                            _this._speakBg.setVisible(false);
                            _this._messageLength = 0;
                            egret.Tween.removeTweens(_this._speakTF);
                        }, this).wait(10000);
                    }
                }
            }
            else {
                this._boxInfoList[i].box.setRes("common_box_1");
                this._boxInfoList[i].boxLight.setVisible(false);
                egret.Tween.removeTweens(this._boxInfoList[i].box);
                egret.Tween.removeTweens(this._boxInfoList[i].boxLight);
                if (i == this._boxInfoList.length - 1) {
                    egret.Tween.removeTweens(this._speakBg);
                    egret.Tween.removeTweens(this._speakTF);
                    this._speakTF.setVisible(false);
                    this._speakTail.setVisible(false);
                    this._speakBg.setVisible(false);
                    this._wifeBM.setVisible(false);
                }
            }
        }
        this._progress.setPercentage(vo.getScore() / maxNum);
        this._findNumTF.text = String(vo.getScore());
    };
    AcYunDingLongKuView.prototype.swordBtnClick = function () {
        if (this._isPlayAni) {
            return;
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var deltaT = vo.et - GameData.serverTime - 86400 * 1;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var cost = cfg.battleUseItemCfgList[0].gemCost;
        if (Api.playerVoApi.getPlayerGem() < cost) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        this._isKnife = false;
        // this.playWeaponAni();
        this.request(NetRequestConst.REQUST_ACTIVITY_YUNDINGLONGKUBUYITEM, { activeId: vo.aidAndCode, mType: 1 });
    };
    AcYunDingLongKuView.prototype.knifeBtnClick = function () {
        if (this._isPlayAni) {
            return;
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var deltaT = vo.et - GameData.serverTime - 86400 * 1;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var cost = cfg.battleUseItemCfgList[1].gemCost;
        if (Api.playerVoApi.getPlayerGem() < cost) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        this._isKnife = true;
        this.request(NetRequestConst.REQUST_ACTIVITY_YUNDINGLONGKUBUYITEM, { activeId: vo.aidAndCode, mType: 2 });
        // this.playWeaponAni();
    };
    /**刷新ui */
    AcYunDingLongKuView.prototype.refreshView = function () {
        this.refreshBox();
    };
    /**击打npc 回调 */
    AcYunDingLongKuView.prototype.playNpcHandle = function (event) {
        if (event.data.ret) {
            this._handleRewars = event.data.data.data.rewards;
            this.playWeaponAni();
            // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
            //     rewards: this._handleRewars, isPlayAni: true, callback: () => {
            //         this._isNpcHurt = false;
            //         this._isPlayAni = false;
            //         let vo = <AcYunDingLongKuVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            //         if (vo.getNpcId()) {
            //             this.startView();
            //         }
            //         else {
            //             this.endView();
            //         }
            //     }, handler: this
            // });
        }
    };
    // /**
    //  * 武器动画
    //  */
    AcYunDingLongKuView.prototype.playWeaponAni = function () {
        var _this = this;
        this._isNpcHurt = true;
        this._isPlayAni = true;
        this._containerInfo.npcTalkTail.setVisible(false);
        this._containerInfo.npcTalkBg.setVisible(false);
        this._containerInfo.npcTalkTxt.setVisible(false);
        egret.Tween.removeTweens(this);
        if (this._isKnife) {
            this._cannonDB.playDragonMovie("attack", 1);
            this._cannonDB.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function (event) {
                if (event.animationName == "attack" && _this._isKnife == true) {
                    _this._cannonHitDB.playDragonMovie('idle', 0);
                    _this._cannonHitDB.setVisible(true);
                    _this._cannonHitDB.stop();
                    _this._cannonHitDB.playDragonMovie('hit', 1);
                    _this.playEnemyAni(8, 36, 330);
                }
            }, this);
        }
        else {
            this._crossbowDB.playDragonMovie("attack", 1);
            this._crossbowDB.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function (event) {
                if (event.animationName == "attack" && _this._isKnife == false) {
                    _this._crossbowDB.playDragonMovie('idle', 0);
                    _this._crossbowHitDB.setVisible(true);
                    _this._crossbowHitDB.stop();
                    _this._crossbowHitDB.playDragonMovie('hit', 1);
                    _this.playEnemyAni(4, 20, 260);
                }
            }, this);
        }
    };
    AcYunDingLongKuView.prototype.playEnemyAni = function (value, sum, waitTime) {
        var _this = this;
        if (this._enemyNpcDragonBone) {
            this._enemyNpcDragonBone.stop();
            this._enemyNpcDragonBone.playDragonMovie("hit", 1);
        }
        else {
            this._enemyNpcBM.setload("punish_boss9_hit");
        }
        var offest = 0;
        var posX = this.x;
        var posY = this.y;
        var num = 0;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).wait(waitTime).call(function () {
            egret.Tween.removeTweens(_this);
            egret.Tween.get(_this, { loop: true }).call(function () {
                var random = value * Math.random();
                var op = Math.random() > 0.5 ? -1 : 1;
                offest = random * op;
                _this.setPosition(posX + offest, posY + offest);
                num++;
                if (num >= sum) {
                    egret.Tween.removeTweens(_this);
                    _this.setPosition(posX, posY);
                    if (_this._enemyNpcDragonBone) {
                        _this._enemyNpcDragonBone.stop();
                        _this._enemyNpcDragonBone.playDragonMovie("idle", 0);
                    }
                    else {
                        _this._enemyNpcBM.setload("punish_boss9");
                    }
                    var vo = Api.acVoApi.getActivityVoByAidAndCode(_this.aid, _this.code);
                    // if (this._isKnife) {
                    //     this.request(NetRequestConst.REQUST_ACTIVITY_YUNDINGLONGKUBUYITEM, { activeId: vo.aidAndCode, mType: 2 });
                    // }
                    // else {
                    //     this.request(NetRequestConst.REQUST_ACTIVITY_YUNDINGLONGKUBUYITEM, { activeId: vo.aidAndCode, mType: 1 });
                    // }
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                        rewards: _this._handleRewars, isPlayAni: true, callback: function () {
                            _this._isNpcHurt = false;
                            _this._isPlayAni = false;
                            var vo = Api.acVoApi.getActivityVoByAidAndCode(_this.aid, _this.code);
                            if (vo.getNpcId()) {
                                _this.startView();
                            }
                            else {
                                _this.endView();
                            }
                        }, handler: _this
                    });
                    // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { rewards: this._handleRewars, isPlayAni: true });
                    // this._isNpcHurt = false;
                    // this._isPlayAni = false;
                }
            }, _this).wait(3);
        }, this);
    };
    AcYunDingLongKuView.prototype.tick = function () {
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
        if (vo.getNpcId()) {
            if (this._isNpcHurt) {
                if (!this._isPlayAni) {
                    this._timer++;
                    if (this._timer > 5) {
                        this._isNpcHurt = false;
                        this._timer = 0;
                    }
                    else {
                        this._containerInfo.npcTalkTail.setVisible(true);
                        this._containerInfo.npcTalkBg.setVisible(true);
                        this._containerInfo.npcTalkTxt.setVisible(true);
                        var npcTalkTxtStr = "acYunDingLongKuViewNpcHurtTalk-" + this.code;
                        this._containerInfo.npcTalkTxt.text = LanguageManager.getlocal(npcTalkTxtStr);
                        this._containerInfo.npcTalkBg.height = 35 + this._containerInfo.npcTalkTxt.height;
                        this._containerInfo.npcTalkBg.setPosition(this._containerInfo.npcTalkTail.x - 40, this._containerInfo.npcTalkTail.y - this._containerInfo.npcTalkBg.height + 3);
                        this._containerInfo.npcTalkTxt.setPosition(this._containerInfo.npcTalkBg.x + this._containerInfo.npcTalkBg.width / 2 - this._containerInfo.npcTalkTxt.width / 2, this._containerInfo.npcTalkBg.y + this._containerInfo.npcTalkBg.height / 2 - this._containerInfo.npcTalkTxt.height / 2);
                    }
                }
            }
            else {
                if (!this._isPlayAni) {
                    this._timer++;
                    if (this._timer <= 10) {
                        this._containerInfo.npcTalkTail.setVisible(false);
                        this._containerInfo.npcTalkBg.setVisible(false);
                        this._containerInfo.npcTalkTxt.setVisible(false);
                    }
                    else if (this._timer > 10 && this._timer <= 15) {
                        this._containerInfo.npcTalkTail.setVisible(true);
                        this._containerInfo.npcTalkBg.setVisible(true);
                        this._containerInfo.npcTalkTxt.setVisible(true);
                        var npcTalkTxtStr = "acYunDingLongKuViewNpcLoginTalk-" + this.code;
                        this._containerInfo.npcTalkTxt.text = LanguageManager.getlocal(npcTalkTxtStr);
                        this._containerInfo.npcTalkBg.height = 35 + this._containerInfo.npcTalkTxt.height;
                        this._containerInfo.npcTalkBg.setPosition(this._containerInfo.npcTalkTail.x - 40, this._containerInfo.npcTalkTail.y - this._containerInfo.npcTalkBg.height + 3);
                        this._containerInfo.npcTalkTxt.setPosition(this._containerInfo.npcTalkBg.x + this._containerInfo.npcTalkBg.width / 2 - this._containerInfo.npcTalkTxt.width / 2, this._containerInfo.npcTalkBg.y + this._containerInfo.npcTalkBg.height / 2 - this._containerInfo.npcTalkTxt.height / 2);
                    }
                    else if (this._timer > 15) {
                        this._containerInfo.npcTalkTail.setVisible(false);
                        this._containerInfo.npcTalkBg.setVisible(false);
                        this._containerInfo.npcTalkTxt.setVisible(false);
                        this._timer = 0;
                    }
                }
            }
        }
    };
    AcYunDingLongKuView.prototype.getRuleInfo = function () {
        return "acYunDingLongKuRuleInfo-" + this.code;
    };
    AcYunDingLongKuView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["common_numbg", "progress7", "progress7_bg", "acyundinglongkuview_cannon-" + this.getUiCode(),
            "acyundinglongkuview_crossbow-" + this.getUiCode(), "acmarryview_common_btn", "acturantable_taskbox_light", "common_box_1", "common_box_2",
            "common_box_3", "acyundinglongkuview_common_bg"
        ]);
    };
    AcYunDingLongKuView.prototype.getProbablyInfo = function () {
        return "";
    };
    AcYunDingLongKuView.prototype.getUiCode = function () {
        // if (this.code == "2") {
        //     return "1"
        // }
        return this.code;
    };
    AcYunDingLongKuView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_YUNDINGLONGKUBUYITEM, this.playNpcHandle, this);
        this._wifeNpc = null;
        this._mybody = null;
        this._maskbg = null;
        this._acCDTxt = null;
        this._myselfBM = null;
        this._buttombg = null;
        this._findNumTF = null;
        this._progress = null;
        this._npcContainer = null;
        this._swordBtn = null;
        this._swordTxt = null;
        // this._swordBM = null;
        this._knifeBtn = null;
        this._knifeTxt = null;
        // this._knifeBM = null;
        this._topTipTF = null;
        this._topTipBg = null;
        this._speakStr = null;
        this._speakTF = null;
        this._speakTail = null;
        this._speakBg = null;
        this._wifeBM = null;
        this._messageLength = 0;
        this._isPlayWifeSpeak = false;
        this._startViewContainer = null;
        this._endViewContainer = null;
        this._enemyNpcBM = null;
        this._enemyNpcDragonBone = null;
        this._isPlayAni = false;
        this._handleRewars = null;
        this._containerInfo = null;
        this._isKnife = false;
        this._isNpcHurt = false;
        this._timer = 0;
        this._crossbowDB = null;
        this._crossbowHitDB = null;
        this._cannonDB = null;
        this._cannonHitDB = null;
        _super.prototype.dispose.call(this);
    };
    return AcYunDingLongKuView;
}(AcCommonView));
__reflect(AcYunDingLongKuView.prototype, "AcYunDingLongKuView");
//# sourceMappingURL=AcYunDingLongKuView.js.map