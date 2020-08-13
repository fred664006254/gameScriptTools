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
var ChallengeAutoRewardsPopupView = (function (_super) {
    __extends(ChallengeAutoRewardsPopupView, _super);
    function ChallengeAutoRewardsPopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._infoList = [];
        _this._scrollContiner = undefined;
        _this._fightBtn = null;
        _this._containerTab = [];
        _this._curShowIdx = 0;
        _this._scrollView = null;
        _this._oldSoldier = 0;
        _this._oldCid = 0;
        _this._oldKill = 0;
        return _this;
    }
    ChallengeAutoRewardsPopupView.prototype.getTitleStr = function () {
        return "challengeAutoFight";
    };
    ChallengeAutoRewardsPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            // "public_tc_bg01","public_listbg"
            "popupview_bg3"
        ]);
    };
    ChallengeAutoRewardsPopupView.prototype.getRequestData = function () {
        this._oldSoldier = Api.playerVoApi.getSoldier();
        this._oldCid = Api.challengeVoApi.getCurChannelId();
        this._oldKill = Api.challengeVoApi.getCurKilledNum();
        return { requestType: NetRequestConst.REQUEST_CHALLENGE_AUTOATTACK, requestData: {} };
    };
    ChallengeAutoRewardsPopupView.prototype.receiveData = function (data) {
        var tempRewards = data.data.data.rewardsArr;
        var allKey = Object.keys(tempRewards);
        //剩余士兵
        var curSoldier = this._oldSoldier;
        //奖励数组
        var awardArray = [];
        //第几场战斗
        var fightNum = 0;
        for (var i = 0; i < allKey.length; i++) {
            var key = allKey[i];
            var val = tempRewards[key];
            var cid = Number(key);
            var challengeCfg = ChallengeCfg.getChallengeCfgById(cid);
            var atk2 = challengeCfg.atk;
            var soldier2 = challengeCfg.soldier;
            if (cid == this._oldCid) {
                soldier2 -= this._oldKill;
            }
            var atk1 = Api.playerVoApi.getAtk();
            var soldier1 = curSoldier;
            var report = Api.conquestVoApi.getBattleResult2(atk1, soldier1, atk2, soldier2);
            curSoldier = report.left1;
            var curRewards = [];
            if (val && val.length > 0) {
                curRewards = GameData.formatRewardItem(val);
            }
            for (var n = 0; n < curRewards.length; n++) {
                var curVo = curRewards[n];
                var hadVo = false;
                for (var k in awardArray) {
                    var vo = awardArray[k];
                    if (vo.id == curVo.id && vo.type == curVo.type) {
                        hadVo = true;
                        vo.num += curVo.num;
                        break;
                    }
                }
                if (hadVo == false) {
                    awardArray.push(curVo);
                }
            }
            fightNum++;
            var smallId = ((cid - Api.challengeVoApi.smallNum) % 41) % 8;
            //结算
            if (smallId == 0 || (i + 1) == allKey.length) {
                // let bcid:number = Math.floor(cid / 41) + 1;
                // let mcid:number = Math.floor((cid-1) % 41 / 8 ) + 1;
                var bcid = Api.challengeVoApi.getBigChannelIdByCid2(cid);
                var mcid = Api.challengeVoApi.getMiddleChannelById(cid);
                var tempArray = awardArray.concat();
                this._infoList.push({ "bigId": bcid, "midId": mcid, "fightCont": fightNum, "curSd": curSoldier, "awardArray": tempArray });
                awardArray.length = 0;
                fightNum = 0;
            }
        }
    };
    // 关闭按钮图标名称
    ChallengeAutoRewardsPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    ChallengeAutoRewardsPopupView.prototype.initView = function () {
        //手动调用士兵限时礼包强弹
        Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.SOLDIER_EMPTY);
        Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.SOLDIER_EMPTY2);
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        var bg = BaseBitmap.create("popupview_bg3");
        bg.height = 730;
        bg.x = this.viewBg.width / 2 - bg.width / 2;
        bg.y = -3;
        this.addChildToContainer(bg);
        var grayBg = BaseBitmap.create("public_tc_bg01");
        grayBg.width = 518;
        grayBg.height = 602 + 15;
        grayBg.setPosition(this.viewBg.width / 2 - grayBg.width / 2, 18);
        this.addChildToContainer(grayBg);
        grayBg.visible = false;
        this._fightBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.confirmClick, this);
        this._fightBtn.setPosition(this.viewBg.width / 2 - this._fightBtn.width / 2, grayBg.y + grayBg.height + 20);
        this.addChildToContainer(this._fightBtn);
        // this._fightBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._fightBtn.visible = false;
        this._scrollContiner = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        rect.setTo(55, grayBg.y + 10, this.viewBg.width, grayBg.height - 20);
        this._scrollView = ComponentManager.getScrollView(this._scrollContiner, rect);
        this.addChildToContainer(this._scrollView);
        this._scrollView.horizontalScrollPolicy = "off";
        for (var i = 0; i < this._infoList.length; i++) {
            var c = this.getRewardInfoContainer(this._infoList[i]);
            this._containerTab.push(c);
        }
        var finialKey;
        if (Api.playerVoApi.getSoldier() == 0) {
            finialKey = "challengeRewardEnd2";
        }
        else {
            finialKey = "challengeRewardEnd1";
        }
        var finalContainer = new BaseDisplayObjectContainer();
        var finalText = ComponentManager.getTextField(LanguageManager.getlocal(finialKey), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        finalText.setPosition(this.viewBg.width / 2 - finalText.width / 2, 10);
        finalContainer.addChild(finalText);
        finalText.height = finalText.height + 10;
        if (Api.playerVoApi.getSoldier() == 0) {
            finalText.setColor(TextFieldConst.COLOR_WARN_RED_NEW);
        }
        this._containerTab.push(finalContainer);
        this.showContainerAnim();
    };
    ChallengeAutoRewardsPopupView.prototype.showContainerAnim = function () {
        if (this._containerTab.length > this._curShowIdx) {
            var tempContainer = this._containerTab[this._curShowIdx];
            this._scrollContiner.addChild(tempContainer);
            tempContainer.y = this._curShowIdx * 197; //192
            this._scrollView.setScrollTop(this._scrollView.getMaxScrollTop(), 300);
            this._curShowIdx++;
            tempContainer.x = -600 - 25; //-550;
            egret.Tween.get(tempContainer).wait(500).to({ x: -30 - 25 }, 300);
            egret.Tween.get(this._scrollContiner).wait(600).call(this.showContainerAnim, this);
        }
        else {
            this._fightBtn.visible = true;
            this._scrollView.touchEnabled = true;
            this._scrollContiner.touchEnabled = true;
        }
    };
    ChallengeAutoRewardsPopupView.prototype.getRewardInfoContainer = function (info) {
        var bgContainer = new BaseDisplayObjectContainer();
        var rewardBg = BaseBitmap.create("public_listbg3");
        rewardBg.width = 520;
        rewardBg.height = 190;
        rewardBg.setPosition(this.viewBg.width / 2 - rewardBg.width / 2, 0);
        bgContainer.addChild(rewardBg);
        //this._infoList.push({"bigId":bcid,"midId":mcid,"fightCont":fightNum,"curSd":curSoldier,"awardArray":tempArray});
        var bcid = 1;
        var mcid = Api.challengeVoApi.getCurMiddleChannelId();
        var targetStr = LanguageManager.getlocal("challengeTitle" + info.bigId);
        var targetText = ComponentManager.getTextField(LanguageManager.getlocal("challengeRewardTitle", [String(info.bigId), targetStr, String(info.midId)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        targetText.setPosition(rewardBg.x + 30, 18);
        bgContainer.addChild(targetText);
        // let lineImg2 = BaseLoadBitmap.create("rank_line");
        // lineImg2.width = 500;
        // lineImg2.height = 2;
        // lineImg2.x = this.viewBg.width/2 - lineImg2.width/2;
        // lineImg2.y = targetText.y + targetText.height + 7;
        // bgContainer.addChild(lineImg2);
        var nn = App.StringUtil.changeIntToText(info.curSd);
        var fightText = ComponentManager.getTextField(LanguageManager.getlocal("challengeRewardFight", [String(info.fightCont), String(nn)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        fightText.setPosition(targetText.x, targetText.y + targetText.height + 10);
        bgContainer.addChild(fightText);
        // let lineImg = BaseLoadBitmap.create("rank_line");
        // lineImg.width = 500;
        // lineImg.height = 2;
        // lineImg.x = this.viewBg.width/2 - lineImg.width/2;
        // lineImg.y = fightText.y + fightText.height + 7;
        // bgContainer.addChild(lineImg);
        var awardText = ComponentManager.getTextField(LanguageManager.getlocal("challengeReward"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        awardText.setPosition(targetText.x, rewardBg.height - 80);
        bgContainer.addChild(awardText);
        //奖励
        var xPos = awardText.x + awardText.width + 10;
        for (var k in info.awardArray) {
            var vo = info.awardArray[k];
            var icon = GameData.getItemIcon(vo, true);
            icon.setPosition(xPos, rewardBg.height - 110);
            icon.setScale(0.83);
            bgContainer.addChild(icon);
            xPos += 113;
        }
        return bgContainer;
    };
    ChallengeAutoRewardsPopupView.prototype.confirmClick = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj, []);
        }
        this.hide();
    };
    // 计算背景高度时使用，在container高度的基础上添加该高度
    ChallengeAutoRewardsPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    ChallengeAutoRewardsPopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        this._infoList.length = 0;
        if (this._scrollContiner) {
            egret.Tween.removeTweens(this._scrollContiner);
        }
        this._scrollContiner = undefined;
        this._fightBtn = null;
        this._containerTab.length = 0;
        this._curShowIdx = 0;
        this._scrollView = null;
        this._oldSoldier = 0;
        this._oldCid = 0;
        this._oldKill = 0;
        _super.prototype.dispose.call(this);
    };
    return ChallengeAutoRewardsPopupView;
}(PopupView));
__reflect(ChallengeAutoRewardsPopupView.prototype, "ChallengeAutoRewardsPopupView");
