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
 * 财神祝福
 * author ycg
 * date 2020.2.13
 * @class AcBlessingOfMammonView
 */
var AcBlessingOfMammonView = (function (_super) {
    __extends(AcBlessingOfMammonView, _super);
    function AcBlessingOfMammonView() {
        var _this = _super.call(this) || this;
        _this._acTimeTf = null;
        _this._acTimeBg = null;
        _this._chargeNum = null;
        _this._boxList = [];
        _this._boxListContainer = null;
        _this._scrollView = null;
        _this._isBoxClick = false;
        _this._flyMoneyBone = null;
        _this._numBg = null;
        _this._isCanMove = true;
        return _this;
    }
    AcBlessingOfMammonView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACBLESSINGOFMAMMON_GETREWARD, this.getRewardCallback, this);
        var descContainer = new BaseDisplayObjectContainer();
        descContainer.width = GameConfig.stageWidth;
        descContainer.height = 190;
        descContainer.setPosition(0, GameConfig.stageHeigth - descContainer.height);
        // this.addChildToContainer(descContainer);
        var descBgName = ResourceManager.hasRes("acblessingofmammon_bottombg-" + this.getTypeCode()) ? "acblessingofmammon_bottombg-" + this.getTypeCode() : "acliangbiographyview_common_acbg";
        var descBg = BaseBitmap.create(descBgName);
        if (this.getTypeCode() == "5") {
            descBg.height = 200;
            descContainer.height = descBg.height;
            descContainer.setPosition(0, GameConfig.stageHeigth - descContainer.height);
        }
        else {
            descBg.width = GameConfig.stageWidth;
            descBg.height = 190;
            descBg.scaleY = -1;
            descBg.setPosition(0, descContainer.height);
        }
        descContainer.addChild(descBg);
        //活动说明
        var maxExtraNum = this.vo.getMaxExtraReward();
        var acDescStr = LanguageManager.getlocal("acBlessingOfMommonInfo-" + this.getTypeCode(), ["" + maxExtraNum]);
        if (this.getTypeCode() == "3" || this.getTypeCode() == "5" || this.getTypeCode() == "6") {
            var skinNeedData = this.vo.getSpecialRewardNeed();
            acDescStr = LanguageManager.getlocal("acBlessingOfMommonInfo-" + this.getTypeCode(), ["" + maxExtraNum, "" + skinNeedData.needNum]);
        }
        var acDesc = ComponentManager.getTextField(acDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.width = 600;
        acDesc.lineSpacing = 6;
        descContainer.addChild(acDesc);
        //倒计时
        if (this.getTypeCode() == "5") {
            this._acTimeBg = BaseBitmap.create("public_9_bg61");
            descContainer.addChild(this._acTimeBg);
        }
        var acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acBlessingOfMommonTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descContainer.addChild(acTimeTf);
        this._acTimeTf = acTimeTf;
        //活动时间
        var acDate = ComponentManager.getTextField(LanguageManager.getlocal("acBlessingOfMommonTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descContainer.addChild(acDate);
        if (this.getTypeCode() == "5") {
            if (this._acTimeBg) {
                this._acTimeBg.width = acTimeTf.width + 60;
                this._acTimeBg.setPosition(GameConfig.stageWidth - this._acTimeBg.width - 10, 0);
                acTimeTf.setPosition(this._acTimeBg.x + this._acTimeBg.width / 2 - acTimeTf.width / 2, this._acTimeBg.y + this._acTimeBg.height / 2 - acTimeTf.height / 2);
            }
            acDate.setPosition(descBg.x + 20, descBg.y + 33 + (descBg.height - acDesc.height - acDate.height - 60) / 2);
            acDesc.setPosition(acDate.x, acDate.y + acDate.height + 5);
        }
        else {
            acDesc.setPosition(20, (descBg.height - acDesc.height - acTimeTf.height - acDate.height - 10) / 2);
            acDate.setPosition(acDesc.x, acDesc.y + acDesc.height + 5);
            acTimeTf.setPosition(acDesc.x, acDate.y + acDate.height + 5);
        }
        //let role acwealthcomingview_forcewealth
        var specialData = this.vo.getSpecialRewardNeed();
        App.LogUtil.log(" specialData " + specialData.skinId);
        if (specialData && specialData.skinId) {
            var skinCfg = Config.ServantskinCfg.getServantSkinItemById(specialData.skinId);
            var skinBoneName = skinCfg.bone + "_ske";
            if ((!Api.switchVoApi.checkCloseBone()) && skinBoneName && RES.hasRes(skinBoneName) && App.CommonUtil.check_dragon()) {
                var skin = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                skin.anchorOffsetY = skin.height;
                skin.setScale(0.95);
                skin.setPosition(230, descContainer.y - 40);
                if (this.getTypeCode() == "5") {
                    skin.y = descContainer.y + 5;
                }
                this.addChildToContainer(skin);
            }
            else {
                var skinImg = BaseLoadBitmap.create(skinCfg.body);
                skinImg.width = 405;
                skinImg.height = 467;
                skinImg.anchorOffsetY = skinImg.height;
                skinImg.setScale(1.2);
                skinImg.x = -40;
                skinImg.y = descContainer.y - 25;
                if (this.getTypeCode() == "5") {
                    skinImg.y = descContainer.y + 5;
                }
                this.addChildToContainer(skinImg);
            }
        }
        else {
            var skinBone = "acwealthcomingview_culturewealth";
            var skinBoneName = skinBone + "_ske";
            if ((!Api.switchVoApi.checkCloseBone()) && skinBoneName && RES.hasRes(skinBoneName) && App.CommonUtil.check_dragon()) {
                var skin = App.DragonBonesUtil.getLoadDragonBones(skinBone);
                skin.anchorOffsetY = skin.height;
                // skin.setScale(0.8);
                skin.setPosition(150, descContainer.y - 140);
                this.addChildToContainer(skin);
            }
        }
        // this.addChildToContainer(descContainer);
        //衣装预览
        if (specialData && specialData.skinId) {
            var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect.width = 208;
            skinTxtEffect.height = 154;
            skinTxtEffect.setPosition(descContainer.x + 100, descContainer.y - 190);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            this.addChildToContainer(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);
            var skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxt.anchorOffsetX = skinTxt.width / 2;
            skinTxt.anchorOffsetY = skinTxt.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
            this.addChildToContainer(skinTxt);
            egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
            var skinTxt1 = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxt1.anchorOffsetX = skinTxt1.width / 2;
            skinTxt1.anchorOffsetY = skinTxt1.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
            this.addChildToContainer(skinTxt1);
            skinTxt1.blendMode = egret.BlendMode.ADD;
            skinTxt1.alpha = 0;
            egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 0.9, scaleY: 0.9 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            skinTxt1.addTouchTap(function () {
                var skinId = Config.ServantskinCfg.formatRewardItemVoStr(specialData.skinId);
                ;
                var topMsg = LanguageManager.getlocal("acBlessingOfMommonSkinTopMsg-" + _this.getTypeCode(), ["" + specialData.needNum]);
                var data = { data: [
                        { idType: skinId, topMsg: topMsg, bgName: "acthreekingdomrecharge_skinbg", scale: 0.8, offY: 2 },
                    ] };
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
            }, this);
        }
        //已充值数量
        var numBgImg = ResourceManager.hasRes("acblessingofmammon_chargenumbg-" + this.getTypeCode()) ? "acblessingofmammon_chargenumbg-" + this.getTypeCode() : "acblessingofmammon_chargenumbg-1";
        var numBg = BaseBitmap.create(numBgImg);
        numBg.setPosition(GameConfig.stageWidth / 2 - numBg.width / 2, descContainer.y - numBg.height - 15);
        // this.addChildToContainer(numBg);
        this._numBg = numBg;
        // let currCharge = this.vo.getCurrRecharge();
        var currData = this.vo.getCurrProcessIndex();
        var chargeNumStr = LanguageManager.getlocal("acBlessingOfMommonChargeAllInfo-" + this.getTypeCode());
        App.LogUtil.log("currData.index " + currData.index + " needGem " + currData.needGem);
        if (currData.index || currData.index == 0) {
            var chargeName = LanguageManager.getlocal("acBlessingOfMommonBoxName_" + (currData.index + 1) + "-" + this.getTypeCode());
            if (specialData && specialData.skinId && specialData.index == currData.index) {
                var specialCfg = Config.ServantskinCfg.getServantSkinItemById(specialData.skinId);
                chargeName = specialCfg.name;
            }
            chargeNumStr = LanguageManager.getlocal("acBlessingOfMommonChargeInfo-" + this.getTypeCode(), ["" + currData.needGem, chargeName]);
        }
        var chargeNum = ComponentManager.getTextField(chargeNumStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        chargeNum.anchorOffsetX = chargeNum.width / 2;
        chargeNum.setPosition(numBg.x + numBg.width / 2, numBg.y + numBg.height / 2 - chargeNum.height / 2);
        if (this.getTypeCode() == "3" || this.getTypeCode() == "5" || this.getTypeCode() == "6") {
            numBg.y = descContainer.y - numBg.height;
            chargeNum.y = numBg.y + numBg.height - chargeNum.height - 14;
        }
        else if (this.getTypeCode() == "1") {
            numBg.width = chargeNum.width + 240;
            numBg.x = GameConfig.stageWidth / 2 - numBg.width / 2;
            chargeNum.x = numBg.x + numBg.width / 2;
        }
        // this.addChildToContainer(chargeNum);
        this._chargeNum = chargeNum;
        //box
        var boxListContainer = new BaseDisplayObjectContainer();
        boxListContainer.width = GameConfig.stageWidth / 2 + 40;
        this._boxListContainer = boxListContainer;
        var rectHeight = numBg.y - this.titleBg.height - 20;
        var boxScroRect = new egret.Rectangle(0, 0, boxListContainer.width, rectHeight);
        var scrollView = ComponentManager.getScrollView(boxListContainer, boxScroRect);
        scrollView.setPosition(GameConfig.stageWidth - boxListContainer.width - 10, this.titleBg.y + this.titleBg.height + 10);
        scrollView.horizontalScrollPolicy = 'off';
        scrollView.bounces = false;
        this.addChildToContainer(scrollView);
        this._scrollView = scrollView;
        var boxData = this.cfg.getBoxListCfg();
        var boxLength = boxData.length;
        this._boxList = [];
        for (var i = 0; i < boxData.length; i++) {
            var boxContainer = new BaseDisplayObjectContainer();
            var boxImgIndex = i % 4 + 1;
            if (this.getTypeCode() == "5") {
                boxImgIndex = i % 8 + 1;
            }
            var boxImg = ResourceManager.hasRes("acblessingofmammon_box" + boxImgIndex + "-" + this.getTypeCode()) ? "acblessingofmammon_box" + boxImgIndex + "-" + this.getTypeCode() : "acblessingofmammon_box" + boxImgIndex + "-1";
            if (specialData && specialData.skinId && specialData.index == boxLength - 1 - i) {
                boxImg = ResourceManager.hasRes("acblessingofmammon_bigbox-" + this.getTypeCode()) ? "acblessingofmammon_bigbox-" + this.getTypeCode() : "acblessingofmammon_bigbox-3";
            }
            var box = null;
            var boxAni = null;
            if (this.getTypeCode() == "1") {
                box = BaseBitmap.create(boxImg);
                boxContainer.width = box.width;
                boxContainer.height = box.height;
                boxContainer.addChild(box);
                boxContainer.anchorOffsetX = boxContainer.width / 2;
                boxContainer.anchorOffsetY = boxContainer.height / 2;
                boxAni = ComponentManager.getCustomMovieClip("acblessingmammon_fuzi", 8, 70);
                boxAni.width = 228;
                boxAni.height = 229;
                boxAni.anchorOffsetX = boxAni.width / 2;
                boxAni.anchorOffsetY = boxAni.height / 2;
                boxContainer.addChild(boxAni);
                boxAni.setPosition(box.x + box.width / 2, box.y + box.height / 2);
                boxAni.blendMode = egret.BlendMode.ADD;
                boxAni.playWithTime(0);
            }
            else if (this.getTypeCode() == "3" || this.getTypeCode() == "5" || this.getTypeCode() == "6") {
                var tableImg = ResourceManager.hasRes("acblessingofmammon_table-" + this.getTypeCode()) ? "acblessingofmammon_table-" + this.getTypeCode() : "acblessingofmammon_table-3";
                var table = BaseBitmap.create(tableImg);
                boxContainer.width = table.width;
                boxContainer.height = 180;
                boxContainer.addChild(table);
                table.y = boxContainer.height - table.height;
                box = BaseBitmap.create(boxImg);
                box.setPosition(table.x + table.width / 2 - box.width / 2, table.y + table.height - box.height - 11);
                if (this.getTypeCode() == "5") {
                    box.y = table.y + table.height - box.height + 13;
                }
                //可领取特效
                if (specialData && specialData.skinId && specialData.index == boxLength - 1 - i) {
                    if (this.getTypeCode() == "3") {
                        boxAni = ComponentManager.getCustomMovieClip("acblessingmammon_yingzhengget", 16, 70);
                        boxAni.width = 344;
                        boxAni.height = 339;
                        boxAni.anchorOffsetX = boxAni.width / 2;
                        boxAni.anchorOffsetY = boxAni.height / 2;
                        boxContainer.addChild(boxAni);
                        boxAni.setPosition(box.x + box.width / 2, box.y + box.height / 2);
                        boxAni.blendMode = egret.BlendMode.ADD;
                        boxAni.playWithTime(0);
                    }
                }
                boxContainer.addChild(box);
                //自身特效
                if (specialData && specialData.skinId && specialData.index == boxLength - 1 - i) {
                    if (this.getTypeCode() == "3") {
                        var boxEff = ComponentManager.getCustomMovieClip("acblessingmammon_yingzhengeff", 16, 70);
                        boxEff.width = 192;
                        boxEff.height = 189;
                        boxEff.anchorOffsetX = boxEff.width / 2;
                        boxEff.anchorOffsetY = boxEff.height / 2;
                        boxContainer.addChild(boxEff);
                        boxEff.setPosition(box.x + box.width / 2, box.y + box.height / 2 - 5);
                        boxEff.blendMode = egret.BlendMode.ADD;
                        boxEff.playWithTime(0);
                    }
                    else if (this.getTypeCode() == "5" || this.getTypeCode() == "6") {
                        //可领取特效
                        boxAni = ComponentManager.getCustomMovieClip("acblessingmammon_shuideng", 10, 70);
                        boxAni.width = 300;
                        boxAni.height = 300;
                        boxAni.anchorOffsetX = boxAni.width / 2;
                        boxAni.anchorOffsetY = boxAni.height / 2;
                        boxContainer.addChild(boxAni);
                        boxAni.setPosition(box.x + box.width / 2, box.y + box.height / 2);
                        boxAni.blendMode = egret.BlendMode.ADD;
                        boxAni.playWithTime(0);
                    }
                }
                else {
                    //可领取特效
                    if (this.getTypeCode() == "3") {
                        boxAni = ComponentManager.getCustomMovieClip("acblessingmammon_yuxi", 12, 70);
                        boxAni.width = 300;
                        boxAni.height = 300;
                        boxAni.anchorOffsetX = boxAni.width / 2;
                        boxAni.anchorOffsetY = boxAni.height / 2;
                        boxContainer.addChild(boxAni);
                        boxAni.setPosition(box.x + box.width / 2, box.y + box.height / 2);
                        boxAni.blendMode = egret.BlendMode.ADD;
                        boxAni.playWithTime(0);
                    }
                    else if (this.getTypeCode() == "5" || this.getTypeCode() == "6") {
                        boxAni = ComponentManager.getCustomMovieClip("acblessingmammon_shuideng", 10, 70);
                        boxAni.width = 300;
                        boxAni.height = 300;
                        boxAni.anchorOffsetX = boxAni.width / 2;
                        boxAni.anchorOffsetY = boxAni.height / 2;
                        boxContainer.addChild(boxAni);
                        boxAni.setPosition(box.x + box.width / 2, box.y + box.height / 2);
                        boxAni.blendMode = egret.BlendMode.ADD;
                        boxAni.playWithTime(0);
                    }
                }
            }
            var isSpecial = false;
            var index = boxLength - 1 - i;
            var nameStr = LanguageManager.getlocal("acBlessingOfMommonBoxName_" + (index + 1) + "-" + this.getTypeCode());
            if (specialData && specialData.skinId && specialData.index == boxLength - 1 - i) {
                isSpecial = true;
                var skinCfg = Config.ServantskinCfg.getServantSkinItemById(specialData.skinId);
                nameStr = skinCfg.name;
            }
            boxContainer.setPosition(boxListContainer.width - boxContainer.width / 2 - 20, boxContainer.height / 2 + i * (boxContainer.height - 25));
            if (this.getTypeCode() == "1") {
                boxContainer.y = boxContainer.height / 2 + i * (boxContainer.height - 25) + 15;
            }
            if (i % 2 == 1) {
                boxContainer.x = 20 + boxContainer.width / 2;
            }
            if (this.getTypeCode() == "3" || this.getTypeCode() == "6") {
                boxContainer.setPosition(boxListContainer.width - boxContainer.width - 20, i * (boxContainer.height + 25));
                if (i % 2 == 1) {
                    boxContainer.x = 20;
                }
            }
            else if (this.getTypeCode() == "5") {
                boxContainer.setPosition(boxListContainer.width - boxContainer.width - 10, i * (boxContainer.height + 15) + 15);
                if (i % 2 == 1) {
                    boxContainer.x = 10;
                }
            }
            //line
            var line = null;
            if (i != boxLength - 1) {
                var lineImg = ResourceManager.hasRes("acblessingofmammon_line_1-" + this.getTypeCode()) ? "acblessingofmammon_line_1-" + this.getTypeCode() : "acblessingofmammon_line_1-1";
                line = BaseBitmap.create(lineImg);
                boxListContainer.addChild(line);
                if (i % 2 == 1) {
                    line.scaleX = -1;
                    line.setPosition(boxContainer.x + 30 + line.width, boxContainer.y + 30);
                    if (this.getTypeCode() == "3" || this.getTypeCode() == "6") {
                        line.setPosition(boxContainer.x + boxContainer.width / 2 + line.width, boxContainer.y + boxContainer.height + 12);
                    }
                    else if (this.getTypeCode() == "5") {
                        line.setPosition(boxContainer.x + boxContainer.width / 2 + line.width, boxContainer.y + boxContainer.height + 18);
                    }
                }
                else {
                    line.setPosition(boxContainer.x - 40 - boxContainer.width / 2, boxContainer.y + 37);
                    if (this.getTypeCode() == "3" || this.getTypeCode() == "6") {
                        line.setPosition(boxContainer.x, boxContainer.y + boxContainer.height + 12);
                    }
                    else if (this.getTypeCode() == "5") {
                        line.setPosition(boxContainer.x, boxContainer.y + boxContainer.height + 18);
                    }
                }
            }
            boxListContainer.addChild(boxContainer);
            //box light
            var light = null;
            var boxBlack = null;
            if (this.getTypeCode() == "1") {
                //black
                boxBlack = BaseBitmap.create("public_9_black");
                boxBlack.width = 127;
                boxBlack.height = 127;
                boxBlack.alpha = 0.6;
                boxBlack.anchorOffsetX = boxBlack.width / 2;
                boxBlack.anchorOffsetY = boxBlack.height / 2;
                boxBlack.setPosition(boxContainer.width / 2, boxContainer.height / 2);
                boxBlack.rotation = 45;
                boxContainer.addChild(boxBlack);
                boxBlack.visible = false;
            }
            var extraContainer = this.getExtraRewardContainer(boxData[boxData.length - 1 - i].id);
            boxContainer.addChild(extraContainer);
            extraContainer.setPosition(55, -17);
            if (this.getTypeCode() == "3" || this.getTypeCode() == "6") {
                extraContainer.x = 75;
            }
            else if (this.getTypeCode() == "5") {
                extraContainer.x = 70;
                extraContainer.y = -30;
            }
            if (PlatformManager.checkIsEnLang()) {
                if (this.getTypeCode() == "1") {
                    extraContainer.y = 0;
                }
            }
            //已领取
            var collectFlag = BaseBitmap.create("collectflag");
            collectFlag.setScale(0.55);
            if (this.getTypeCode() == "3" || this.getTypeCode() == "5" || this.getTypeCode() == "6") {
                collectFlag.setScale(0.7);
            }
            collectFlag.setPosition(boxContainer.width / 2 - collectFlag.width * collectFlag.scaleX / 2, boxContainer.height / 2 - collectFlag.height * collectFlag.scaleY / 2);
            boxContainer.addChild(collectFlag);
            collectFlag.visible = true;
            //name
            var nameBgImg = ResourceManager.hasRes("acblessingofmammon_boxnamebg-" + this.getTypeCode()) ? "acblessingofmammon_boxnamebg-" + this.getTypeCode() : "acblessingofmammon_boxnamebg-1";
            var nameBg = BaseBitmap.create(nameBgImg);
            boxListContainer.addChild(nameBg);
            var name_1 = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            nameBg.width = name_1.width + 40;
            nameBg.setPosition(boxContainer.x - nameBg.width / 2, boxContainer.y + boxContainer.height / 2 - nameBg.height + 15);
            name_1.setPosition(nameBg.x + nameBg.width / 2 - name_1.width / 2, nameBg.y + nameBg.height / 2 - name_1.height / 2);
            if (this.getTypeCode() == "3" || this.getTypeCode() == "6") {
                nameBg.setPosition(boxContainer.x + boxContainer.width / 2 - nameBg.width / 2, boxContainer.y + boxContainer.height - nameBg.height + 15);
                name_1.setPosition(nameBg.x + nameBg.width / 2 - name_1.width / 2, nameBg.y + nameBg.height / 2 - name_1.height / 2);
            }
            else if (this.getTypeCode() == "5") {
                name_1.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
                nameBg.setPosition(boxContainer.x + boxContainer.width / 2 - nameBg.width / 2, boxContainer.y + boxContainer.height - nameBg.height + 20);
                name_1.setPosition(nameBg.x + nameBg.width / 2 - name_1.width / 2, nameBg.y + nameBg.height / 2 - name_1.height / 2 + 2);
            }
            boxListContainer.addChild(name_1);
            boxContainer.addTouchTap(this.boxClick, this, [index]);
            var boxItem = { boxContainer: boxContainer, light: light, black: boxBlack, collect: collectFlag, line: line, isSpecial: isSpecial, box: box, boxAni: boxAni, extraContainer: extraContainer };
            this._boxList[index] = boxItem;
        }
        if (this.getTypeCode() == "1") {
            boxListContainer.height -= 20;
        }
        else if (this.getTypeCode() == "3") {
            boxListContainer.height -= 105;
        }
        else if (this.getTypeCode() == "5") {
            boxListContainer.height -= 70;
        }
        else if (this.getTypeCode() == "6") {
            boxListContainer.height -= 70;
        }
        scrollView.scrollTop = boxListContainer.height - scrollView.height;
        App.LogUtil.log("scrollView.scrollTop " + scrollView.scrollTop);
        var flyMoneyBone = "acblessingofmammon_flymoney";
        var flyMoneyName = flyMoneyBone + "_ske";
        if (this.getTypeCode() == "1" || this.getTypeCode() == "3" || this.getTypeCode() == "5" || this.getTypeCode() == "6") {
            var flyAct = "fuzi";
            if (this.getTypeCode() == "3" || this.getTypeCode() == "5" || this.getTypeCode() == "6") {
                flyAct = "yuanbao";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && flyMoneyName && RES.hasRes(flyMoneyName) && App.CommonUtil.check_dragon()) {
                var flyDragon = App.DragonBonesUtil.getLoadDragonBones(flyMoneyBone, 0, flyAct);
                flyDragon.setPosition(0, 0);
                this.addChildToContainer(flyDragon);
                flyDragon.visible = false;
                this._flyMoneyBone = flyDragon;
            }
        }
        if (this.vo.isShowRewardRedDot()) {
            if (this._flyMoneyBone) {
                this._flyMoneyBone.visible = true;
            }
        }
        else {
            if (this._flyMoneyBone) {
                this._flyMoneyBone.visible = false;
            }
        }
        this.addChildToContainer(descContainer);
        this.addChildToContainer(numBg);
        this.addChildToContainer(chargeNum);
        this.freshBox();
        this.moveScrollView();
    };
    AcBlessingOfMammonView.prototype.getExtraRewardContainer = function (id) {
        var container = new BaseDisplayObjectContainer();
        var bg = BaseBitmap.create("acblessingofmammon_backmoneybg");
        container.addChild(bg);
        container.width = bg.width;
        container.height = bg.height;
        var extraData = this.vo.getExtraRewardNum(id); // 50 30  109
        var rewardNum = ComponentManager.getBitmapText("" + extraData.max, "acblessingmammon_fnt1", TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_BIG);
        rewardNum.setPosition(bg.x + 47, 17);
        if (!Api.switchVoApi.checkOpenBMFont()) {
            var rewardStr = rewardNum;
            rewardStr.bold = true;
            rewardNum.setPosition(bg.x + 45, 22);
        }
        container.addChild(rewardNum);
        return container;
    };
    AcBlessingOfMammonView.prototype.boxClick = function (target, index) {
        App.LogUtil.log("boxClick " + index);
        var data = this.cfg.getBoxListCfg();
        var currCharge = this.vo.getCurrRecharge();
        if (!this.vo.isGetChargeRewardById(data[index].id) && (currCharge >= Number(data[index].needGem))) {
            //领取
            App.LogUtil.log("boxClick 1");
            if (this._isBoxClick) {
                return;
            }
            if (!this.vo.isStart) {
                this.vo.showAcEndTip();
                return;
            }
            this._isBoxClick = true;
            NetManager.request(NetRequestConst.REQUEST_ACBLESSINGOFMAMMON_GETREWARD, { activeId: this.vo.aidAndCode, rkey: data[index].id });
        }
        else {
            App.LogUtil.log("boxClick 2");
            ViewController.getInstance().openView(ViewConst.POPUP.ACBLESSINGOFMAMMONREWARDPOPUPVEW, { aid: this.aid, code: this.code, data: data[index] });
        }
    };
    AcBlessingOfMammonView.prototype.freshBox = function () {
        var data = this.cfg.getBoxListCfg();
        var currCharge = this.vo.getCurrRecharge();
        for (var i = 0; i < data.length; i++) {
            var boxItem = this._boxList[i];
            var nexBoxItem = this._boxList[i + 1];
            App.CommonUtil.removeIconFromBDOC(boxItem.boxContainer);
            App.LogUtil.log("freshbox " + boxItem.isSpecial);
            if (this.vo.isGetChargeRewardById(data[i].id)) {
                if (nexBoxItem && nexBoxItem.line) {
                    var lineImg = ResourceManager.hasRes("acblessingofmammon_line_1-" + this.getTypeCode()) ? "acblessingofmammon_line_1-" + this.getTypeCode() : "acblessingofmammon_line_1-1";
                    nexBoxItem.line.setRes(lineImg);
                }
                boxItem.collect.visible = true;
                if (boxItem.boxAni) {
                    boxItem.boxAni.visible = false;
                }
                if (this.getTypeCode() == "1") {
                    boxItem.black.visible = true;
                }
            }
            else {
                if (currCharge >= Number(data[i].needGem)) {
                    App.LogUtil.log("index: " + i + "  box isspecail " + boxItem.isSpecial);
                    if (nexBoxItem && nexBoxItem.line) {
                        var lineImg = ResourceManager.hasRes("acblessingofmammon_line_2-" + this.getTypeCode()) ? "acblessingofmammon_line_2-" + this.getTypeCode() : "acblessingofmammon_line_2-1";
                        nexBoxItem.line.setRes(lineImg);
                    }
                    boxItem.collect.visible = false;
                    if (boxItem.boxAni) {
                        boxItem.boxAni.visible = true;
                    }
                    if (this.getTypeCode() == "1") {
                        boxItem.black.visible = false;
                    }
                    App.CommonUtil.addIconToBDOC(boxItem.boxContainer);
                    var reddot = boxItem.boxContainer.getChildByName("reddot");
                    // reddot.setPosition(boxItem.boxContainer.width/4 *3 - reddot.width/2, boxItem.boxContainer.height/4 - reddot.height/2);
                    // if (this.getTypeCode() == "3" || this.getTypeCode() == "5"){
                    //     reddot.setPosition(boxItem.boxContainer.width - 40 - reddot.width/2, reddot.height/2 + 10);
                    // }
                    reddot.setPosition(boxItem.extraContainer.x + 85, boxItem.extraContainer.y + 70);
                }
                else {
                    if (nexBoxItem && nexBoxItem.line) {
                        var lineImg = ResourceManager.hasRes("acblessingofmammon_line_1-" + this.getTypeCode()) ? "acblessingofmammon_line_1-" + this.getTypeCode() : "acblessingofmammon_line_1-1";
                        nexBoxItem.line.setRes(lineImg);
                    }
                    boxItem.collect.visible = false;
                    if (boxItem.boxAni) {
                        boxItem.boxAni.visible = false;
                    }
                    if (this.getTypeCode() == "1") {
                        boxItem.black.visible = false;
                    }
                }
            }
        }
        var currData = this.vo.getCurrProcessIndex();
        var currIndex = currData.index;
        if (currIndex) {
            var boxItem = this._boxList[currIndex];
            if (boxItem.line) {
                var lineImg = ResourceManager.hasRes("acblessingofmammon_line_2-" + this.getTypeCode()) ? "acblessingofmammon_line_2-" + this.getTypeCode() : "acblessingofmammon_line_2-1";
                boxItem.line.setRes(lineImg);
            }
        }
    };
    AcBlessingOfMammonView.prototype.moveScrollView = function () {
        var offHeight = 175; //155
        if (this.getTypeCode() == "3" || this.getTypeCode() == "5" || this.getTypeCode() == "6") {
            offHeight = 245; //205
        }
        if (!this._isCanMove) {
            return;
        }
        var currData = this.vo.getCurrProcessIndex();
        var currId = currData.index;
        var scrollPosY = 0;
        App.LogUtil.log("currId0 : " + currId);
        var rewardIndex = this.vo.getCurrRewardIndex();
        if (rewardIndex || rewardIndex == 0) {
            currId = rewardIndex;
        }
        // if (currId == null && currId != 0){
        //     currId = this.vo.getCurrRewardIndex();
        // }
        App.LogUtil.log("currId1 : " + currId);
        if (currId || currId == 0) {
            if (currId < 3) {
                scrollPosY = this._boxListContainer.height - this._scrollView.height;
            }
            else {
                scrollPosY = this._boxListContainer.height - this._scrollView.height - offHeight * (currId - 2);
                if (scrollPosY < 0) {
                    scrollPosY = 0;
                }
            }
        }
        App.LogUtil.log("scrollPosy: " + scrollPosY);
        var time = Math.abs(this._scrollView.scrollTop - scrollPosY);
        if (scrollPosY >= 0 && time > 0) {
            var view_1 = this;
            view_1._isCanMove = false;
            egret.Tween.get(view_1._scrollView).call(function () { view_1.showViewMask(); }).wait(200).to({ scrollTop: scrollPosY }, time / 2).call(function () {
                view_1.hideViewMask();
                view_1._isCanMove = true;
                egret.Tween.removeTweens(view_1._scrollView);
            }, view_1);
        }
    };
    AcBlessingOfMammonView.prototype.getRewardCallback = function (event) {
        var _this = this;
        if (!event.data.ret) {
            this._isBoxClick = false;
            return;
        }
        var rData = event.data.data.data;
        // let rInfo = this.vo.getFormatRewards(rData.rewards);
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rData.rewards, "otherRewards": rData.otherrewards, "isPlayAni": true, "callback": function () {
                _this._isBoxClick = false;
                _this.freshBox();
                _this.moveScrollView();
            } });
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
    };
    AcBlessingOfMammonView.prototype.refreshView = function () {
        var currData = this.vo.getCurrProcessIndex();
        var specialData = this.vo.getSpecialRewardNeed();
        var chargeNumStr = LanguageManager.getlocal("acBlessingOfMommonChargeAllInfo-" + this.getTypeCode());
        if (currData.index || currData.index == 0) {
            var chargeName = LanguageManager.getlocal("acBlessingOfMommonBoxName_" + (currData.index + 1) + "-" + this.getTypeCode());
            if (specialData && specialData.skinId && specialData.index == currData.index) {
                var specialCfg = Config.ServantskinCfg.getServantSkinItemById(specialData.skinId);
                chargeName = specialCfg.name;
            }
            chargeNumStr = LanguageManager.getlocal("acBlessingOfMommonChargeInfo-" + this.getTypeCode(), ["" + currData.needGem, chargeName]);
        }
        this._chargeNum.text = chargeNumStr;
        this._chargeNum.anchorOffsetX = this._chargeNum.width / 2;
        if (this.getTypeCode() == "1") {
            this._numBg.width = this._chargeNum.width + 240;
            this._numBg.x = GameConfig.stageWidth / 2 - this._numBg.width / 2;
            this._chargeNum.x = this._numBg.x + this._numBg.width / 2;
        }
        if (!this._isBoxClick) {
            this.freshBox();
            this.moveScrollView();
        }
        if (this.vo.isShowRewardRedDot()) {
            if (this._flyMoneyBone) {
                this._flyMoneyBone.visible = true;
            }
        }
        else {
            if (this._flyMoneyBone) {
                this._flyMoneyBone.visible = false;
            }
        }
    };
    //mask
    AcBlessingOfMammonView.prototype.showViewMask = function () {
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "yiyibusheTouchPos";
        touchPos.touchEnabled = true;
    };
    AcBlessingOfMammonView.prototype.hideViewMask = function () {
        var touchPos = this.getChildByName("yiyibusheTouchPos");
        if (touchPos) {
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    };
    AcBlessingOfMammonView.prototype.tick = function () {
        this._acTimeTf.text = LanguageManager.getlocal("acBlessingOfMommonTimeCountDown", [this.vo.getCountDown()]);
        if (this._acTimeBg) {
            this._acTimeBg.width = this._acTimeTf.width + 60;
            this._acTimeBg.x = GameConfig.stageWidth - this._acTimeBg.width - 10;
            this._acTimeTf.x = this._acTimeBg.x + this._acTimeBg.width / 2 - this._acTimeTf.width / 2;
        }
    };
    Object.defineProperty(AcBlessingOfMammonView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBlessingOfMammonView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcBlessingOfMammonView.prototype.getBgName = function () {
        return ResourceManager.hasRes("acblessingofmammon_bg-" + this.getTypeCode()) ? "acblessingofmammon_bg-" + this.getTypeCode() : "acblessingofmammon_bg-1";
    };
    AcBlessingOfMammonView.prototype.getTitleBgName = function () {
        return ResourceManager.hasRes("acblessingofmammon_titlebg-" + this.getTypeCode()) ? "acblessingofmammon_titlebg-" + this.getTypeCode() : "acblessingofmammon_titlebg-1";
    };
    AcBlessingOfMammonView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcBlessingOfMammonView.prototype.getTitleStr = function () {
        return "";
    };
    AcBlessingOfMammonView.prototype.getRuleInfo = function () {
        return "acBlessingOfMommonRuleInfo-" + this.getTypeCode();
    };
    AcBlessingOfMammonView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        else if (this.code == "4") {
            return "3";
        }
        else if (this.code == "7") {
            return "6";
        }
        return this.code;
    };
    AcBlessingOfMammonView.prototype.getResourceList = function () {
        var list = [];
        if (this.getTypeCode() != "1") {
            list = ["acblessingofmammoncode1"];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "acliangbiographyview_common_acbg", "collectflag", "acwealthcarpview_servantskintxt", "acblessingofmammon_backmoneybg", "acblessingmammon_fnt1",
            "acblessingofmammoncode" + this.getTypeCode(),
            "acblessingofmammon_bg-" + this.getTypeCode(),
            "acblessingofmammon_titlebg-" + this.getTypeCode(),
        ]).concat(list);
    };
    AcBlessingOfMammonView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACBLESSINGOFMAMMON_GETREWARD, this.getRewardCallback, this);
        this._acTimeTf = null;
        this._chargeNum = null;
        this._boxList = [];
        this._boxListContainer = null;
        this._scrollView = null;
        this._isBoxClick = false;
        this._flyMoneyBone = null;
        this._numBg = null;
        this._isCanMove = true;
        this._acTimeBg = null;
        _super.prototype.dispose.call(this);
    };
    return AcBlessingOfMammonView;
}(AcCommonView));
__reflect(AcBlessingOfMammonView.prototype, "AcBlessingOfMammonView");
//# sourceMappingURL=AcBlessingOfMammonView.js.map