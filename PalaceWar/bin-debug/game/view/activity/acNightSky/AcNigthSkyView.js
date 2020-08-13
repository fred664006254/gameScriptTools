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
* 夜观天象
* date 2020.6.15
* author ycg
* @name AcNightSkyView
*/
var AcNightSkyView = (function (_super) {
    __extends(AcNightSkyView, _super);
    function AcNightSkyView() {
        var _this = _super.call(this) || this;
        _this._bg1 = null;
        _this._bg2 = null;
        _this._temp = null;
        _this._infoBg = null;
        _this._bottomBg = null;
        _this._timeBg = null;
        _this._timeTxt = null;
        _this._playBtn = null;
        _this._playBtnIdleEffect = null;
        _this._playBtnClickEffect = null;
        _this._toolNumTf = null;
        _this._checkFlag = null;
        _this._isTenPlay = false;
        _this._detailBtn = null;
        _this._innerCircle = null;
        _this._outerCircle = null;
        _this._circleEffect = null;
        _this._boxStarList = [];
        _this._isPlay = false;
        _this._rewardData = null;
        _this._lightStarEffect = null;
        _this._lightOverEffect = null;
        _this._starLine = null;
        _this._starMap = null;
        _this._processNum = null;
        _this._rechargeTip = null;
        _this._freeDesc = null;
        _this._lightStarList = [];
        _this._detailBtnRed = null;
        _this._specailNum = null;
        _this._specailBg = null;
        _this._shootStarContainer = null;
        return _this;
    }
    Object.defineProperty(AcNightSkyView.prototype, "starPos", {
        get: function () {
            return [
                { x: 70, y: 97, isBig: false },
                { x: 100, y: 74, isBig: true },
                { x: 130, y: 97, isBig: true },
                { x: 108, y: 130, isBig: false },
                { x: 64, y: 165, isBig: true },
                { x: 20, y: 174, isBig: true },
                { x: 58, y: 198, isBig: false },
                { x: 82, y: 194, isBig: true },
                { x: 87, y: 224, isBig: false },
                { x: 54, y: 239, isBig: true },
                { x: 139, y: 202, isBig: true },
                { x: 160, y: 178, isBig: true },
                { x: 185, y: 191, isBig: false },
                { x: 188, y: 230, isBig: true },
                { x: 155, y: 259, isBig: true },
                { x: 188, y: 148, isBig: true },
                { x: 252, y: 161, isBig: true },
                { x: 284, y: 161, isBig: true },
                { x: 221, y: 106, isBig: false },
                { x: 198, y: 80, isBig: false },
            ];
        },
        enumerable: true,
        configurable: true
    });
    AcNightSkyView.prototype.getBgName = function () {
        return App.CommonUtil.getResByCode("acnightsky_bg", this.getTypeCode());
    };
    AcNightSkyView.prototype.getTitleStr = function () {
        return null;
    };
    AcNightSkyView.prototype.getTitleBgName = function () {
        return App.CommonUtil.getResByCode("acnightsky_titlebg", this.getTypeCode());
    };
    AcNightSkyView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcNightSkyView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    AcNightSkyView.prototype.getRuleInfo = function () {
        return App.CommonUtil.getCnByCode("acNightSkyRuleInfo", this.getTypeCode());
    };
    AcNightSkyView.prototype.getRuleInfoParam = function () {
        return ["" + this.cfg.needGem];
    };
    AcNightSkyView.prototype.getProbablyInfo = function () {
        return App.CommonUtil.getCnByCode("acNightSkyProbablyInfo", this.getTypeCode());
    };
    AcNightSkyView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcNightSkyView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNightSkyView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    // protected initBg():void{
    // 	let bgName:string=this.getBgName();
    // 	let bgContent = new BaseDisplayObjectContainer();
    // 	bgContent.height = 1136;
    // 	bgContent.x = 640;
    // 	bgContent.y = GameConfig.stageHeigth/2 - 1136/2;
    // 	this.addChild(bgContent);
    // 	this._bg1 = BaseBitmap.create(bgName);
    // 	this._bg2 = BaseBitmap.create(bgName);
    // 	bgContent.addChild(this._bg1);
    //     bgContent.addChild(this._bg2);
    //     this._bg1.x = 0;
    //     this._bg1.y = 0;
    //     this._bg2.x = - this._bg2.width;
    //     this._bg2.y = 0;
    //     egret.Tween.get(this._bg1, {loop: true}).to({x: GameConfig.stageWidth}, 3000).to({x: -this._bg1.width}).to({x: 0}, 3000);
    //     egret.Tween.get(this._bg2, {loop: true}).to({x: GameConfig.stageWidth}, 6000).to({x: -this._bg2.width});
    // 	this._bg1.x = -this._bg1.width;
    //     this._bg1.y = 0;
    // 	this._bg2.x = -this._bg1.width * 2;
    // 	this._bg2.y = 0; 
    // 	this._temp = {t:0};
    // 	egret.Tween.get(this._temp,{onChange:()=>{
    // 		bgContent.x += 0.2;
    // 		if(this._bg1.x + bgContent.x > 640){
    // 			this._bg1.x = this._bg2.x - this._bg1.width;
    // 		}
    // 		if(this._bg2.x + bgContent.x > 640){
    // 			this._bg2.x = this._bg1.x - this._bg2.width;
    // 		}
    // 	},onChangeObj:this,loop:true})
    // 	.to({t:1},1000);
    // }
    AcNightSkyView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACNIGHTSKY_PLAY, this.lotteryCallback, this);
        var bgName = this.getBgName();
        this._bg1 = BaseBitmap.create(bgName);
        this._bg2 = BaseBitmap.create(bgName);
        this.addChildToContainer(this._bg1);
        this.addChildToContainer(this._bg2);
        this._bg1.x = 0;
        this._bg1.y = 0;
        this._bg2.x = -this._bg2.width + 1;
        this._bg2.y = 0;
        // egret.Tween.get(this._bg1, {loop: true}).to({x: GameConfig.stageWidth}, 45000).to({x: -this._bg1.width}).to({x: 0}, 45000);
        // egret.Tween.get(this._bg2, {loop: true}).to({x: GameConfig.stageWidth}, 90000).to({x: -this._bg2.width});
        egret.Tween.get(this._bg1, { loop: true }).to({ x: GameConfig.stageWidth }, 45000)
            .to({ x: -this._bg1.width + 1 }).to({ x: 0 }, 45000);
        egret.Tween.get(this._bg2, { loop: true }).to({ x: GameConfig.stageWidth }, 90000).to({ x: -this._bg2.width + 1 });
        var shootStarContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(shootStarContainer);
        this._shootStarContainer = shootStarContainer;
        this.initCircle();
        this.refreshLightStar();
        var infoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnightsky_infobg", this.getTypeCode()));
        infoBg.setPosition(GameConfig.stageWidth / 2 - infoBg.width / 2, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(infoBg);
        this._infoBg = infoBg;
        //活动时间   
        var dateText = ComponentManager.getTextField(LanguageManager.getlocal("acComm_time", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        dateText.x = infoBg.x + 203;
        dateText.y = infoBg.y + 10;
        this.addChildToContainer(dateText);
        //活动文本
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNightSkyInfo", this.getUiCode()), ["" + this.cfg.needGem]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = 430;
        descTxt.lineSpacing = 4;
        descTxt.x = dateText.x;
        descTxt.y = dateText.y + dateText.height + 5;
        this.addChildToContainer(descTxt);
        var rechargeTip = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNightSkyRechargeInfo", this.getUiCode()), ["" + this.vo.getNeedRecharge()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rechargeTip.setPosition(descTxt.x, infoBg.y + infoBg.height - rechargeTip.height - 15);
        this.addChildToContainer(rechargeTip);
        this._rechargeTip = rechargeTip;
        //预览
        //衣装预览
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        skinTxtEffect.setPosition(infoBg.x, infoBg.y + infoBg.height - 100);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acnightsky_exchange_txt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
        this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxt1 = BaseBitmap.create("acnightsky_exchange_txt");
        skinTxt1.anchorOffsetX = skinTxt1.width / 2;
        skinTxt1.anchorOffsetY = skinTxt1.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
        this.addChildToContainer(skinTxt1);
        skinTxt1.blendMode = egret.BlendMode.ADD;
        skinTxt1.alpha = 0;
        egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        skinTxt1.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACNIGHTSKYDETAILPOPUPVIEWTAB3, { aid: _this.aid, code: _this.code });
        }, this);
        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height / 2;
        this.addChildToContainer(this._timeBg);
        this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 40 + this._timeTxt.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 10;
        this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
        this.addChildToContainer(this._timeTxt);
        //特殊物品剩余数量
        var specialBg = BaseBitmap.create("public_9_bg80");
        this.addChildToContainer(specialBg);
        this._specailBg = specialBg;
        var specialItemVo = this.vo.getShowSkinData();
        var specialIcon = BaseLoadBitmap.create(specialItemVo.icon);
        specialIcon.width = 100;
        specialIcon.height = 100;
        specialIcon.setScale(0.6);
        specialIcon.setPosition(0, infoBg.y + infoBg.height);
        this.addChildToContainer(specialIcon);
        var specailData = Api.itemVoApi.getItemInfoVoById(specialItemVo.id);
        var currSpecailNum = 0;
        if (specailData) {
            currSpecailNum = specailData.num;
        }
        var specialRemainNum = this.cfg.specialLimit - this.vo.getSpecialTotalNum();
        var specailNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNightSkySpecialItemNum", this.getTypeCode()), ["" + currSpecailNum, "" + specialRemainNum]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        specailNum.setPosition(specialIcon.x + specialIcon.width * specialIcon.scaleX, specialIcon.y + 24);
        this.addChildToContainer(specailNum);
        this._specailNum = specailNum;
        specialBg.width = specailNum.width + 50;
        specialBg.setPosition(specailNum.x - 30, specailNum.y + specailNum.height / 2 - specialBg.height / 2);
        //bottom
        var bottomBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnightsky_bottom", this.getTypeCode()));
        bottomBg.x = 0;
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
        this.addChildToContainer(bottomBg);
        this._bottomBg = bottomBg;
        //观星按钮
        var playBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("acnightsky_centerbtn", this.getTypeCode()), null, this.playBtnClick, this);
        playBtn.x = GameConfig.stageWidth / 2 - playBtn.width * playBtn.scaleX / 2;
        playBtn.y = bottomBg.y - playBtn.height + 25;
        this.addChildToContainer(playBtn);
        this._playBtn = playBtn;
        this._playBtnIdleEffect = ComponentManager.getCustomMovieClip("acnightsky_btnidle", 13, 70);
        this._playBtnIdleEffect.x = playBtn.x + playBtn.width * playBtn.scaleX / 2 - 126 / 2;
        this._playBtnIdleEffect.y = playBtn.y + playBtn.height * playBtn.scaleY / 2 - 127 / 2;
        this.addChildToContainer(this._playBtnIdleEffect);
        this._playBtnIdleEffect.playWithTime(-1);
        //check box 
        var checkBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnightsky_tenbg", this.getTypeCode()));
        checkBg.x = GameConfig.stageWidth / 2 - checkBg.width / 2;
        checkBg.y = bottomBg.y + bottomBg.height - checkBg.height - 5;
        this.addChildToContainer(checkBg);
        var checkFlag = BaseBitmap.create("acnightsky_ckbox2");
        this.addChildToContainer(checkFlag);
        this._checkFlag = checkFlag;
        checkFlag.addTouchTap(this.checkFlagCallback, this);
        var checkInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNightSkyPlayTen", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(checkInfo);
        checkFlag.setPosition(checkBg.x + checkBg.width / 2 - (checkFlag.width + checkInfo.width) / 2, checkBg.y + checkBg.height / 2 - checkFlag.height / 2);
        checkInfo.setPosition(checkFlag.x + checkFlag.width + 3, checkFlag.y + checkFlag.height / 2 - checkInfo.height / 2);
        //观星剩余次数
        var toolNum = this.vo.getToolNum();
        this._toolNumTf = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNightSkyRemainUseNum", this.getTypeCode()), ["" + toolNum]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._toolNumTf.x = GameConfig.stageWidth / 2 - this._toolNumTf.width / 2;
        this._toolNumTf.y = checkBg.y - this._toolNumTf.height;
        this.addChildToContainer(this._toolNumTf);
        var freeDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNightSkyPlayFree", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        freeDesc.setPosition(GameConfig.stageWidth / 2 - freeDesc.width / 2, this._toolNumTf.y);
        this.addChildToContainer(freeDesc);
        this._freeDesc = freeDesc;
        if (this.vo.isFree()) {
            this._freeDesc.visible = true;
            this._toolNumTf.visible = false;
        }
        else {
            this._freeDesc.visible = false;
            this._toolNumTf.visible = true;
        }
        //活动详情
        var detailBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("acnightsky_detailbtn", this.getTypeCode()), "", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACNIGHTSKYDETAILPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        detailBtn.setPosition(bottomBg.x + 50, bottomBg.y - detailBtn.height / 2);
        this.addChildToContainer(detailBtn);
        this._detailBtn = detailBtn;
        var detailRed = BaseBitmap.create("public_dot2");
        detailRed.setPosition(detailBtn.x + detailBtn.width - detailRed.width - 5, detailBtn.y + 2);
        this.addChildToContainer(detailRed);
        this._detailBtnRed = detailRed;
        detailRed.visible = false;
        //充值
        var rechargeBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("acnightsky_rechargebtn", this.getTypeCode()), "", function () {
            if (!_this.vo.isInActivity()) {
                _this.vo.showAcEndTip();
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }, this);
        rechargeBtn.setPosition(GameConfig.stageWidth - rechargeBtn.width - 50, detailBtn.y);
        this.addChildToContainer(rechargeBtn);
        if (this.vo.isCanExchange() || this.vo.isCangetAchieveReward()) {
            this._detailBtnRed.visible = true;
        }
        else {
            this._detailBtnRed.visible = false;
        }
        if (!this.vo.isFree() && toolNum <= 0 || (this._isTenPlay && toolNum < 10)) {
            App.DisplayUtil.changeToGray(this._playBtn);
            this._playBtnIdleEffect.visible = false;
        }
        else {
            App.DisplayUtil.changeToNormal(this._playBtn);
            this._playBtnIdleEffect.visible = true;
        }
        this.showShootStar();
        this.refreshBoxStar();
        //STORY view
        ViewController.getInstance().openView(ViewConst.COMMON.ACNIGHTSKYSTORYVIEW, { aid: this.aid, code: this.code });
    };
    AcNightSkyView.prototype.initCircle = function () {
        this._innerCircle = BaseBitmap.create(App.CommonUtil.getResByCode("acnightsky_innercircle", this.getTypeCode()));
        this._outerCircle = BaseBitmap.create(App.CommonUtil.getResByCode("acnightsky_outercircle", this.getTypeCode()));
        this._innerCircle.anchorOffsetX = this._innerCircle.width / 2;
        this._innerCircle.anchorOffsetY = this._innerCircle.height / 2;
        this._innerCircle.x = GameConfig.stageWidth / 2;
        this._innerCircle.y = GameConfig.stageHeigth / 2 + 10;
        this._outerCircle.anchorOffsetX = this._outerCircle.width / 2;
        this._outerCircle.anchorOffsetY = this._outerCircle.height / 2;
        this._outerCircle.x = GameConfig.stageWidth / 2;
        this._outerCircle.y = GameConfig.stageHeigth / 2 + 10;
        this.addChildToContainer(this._innerCircle);
        this.addChildToContainer(this._outerCircle);
        if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && RES.hasRes("acstargazer_zhuan_ske")) {
            this._circleEffect = App.DragonBonesUtil.getLoadDragonBones("acstargazer_zhuan");
            this._circleEffect.x = this._innerCircle.x;
            this._circleEffect.y = this._innerCircle.y;
            this._circleEffect.setScale(0.8);
            this.addChildToContainer(this._circleEffect);
            this._circleEffect.visible = false;
        }
        egret.Tween.get(this._innerCircle, { loop: true })
            .to({ rotation: -360 }, 60000);
        egret.Tween.get(this._outerCircle, { loop: true })
            .to({ rotation: 360 }, 60000);
        // //星象名字
        // let starName = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNightSkyName", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        // starName.setPosition(this._innerCircle.x - starName.width/2, this._innerCircle.y - this._innerCircle.height/2 + 25);
        // this.addChildToContainer(starName);
        //点亮次数
        var currProNum = this.vo.getProcessNum();
        var processNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNightSkyProcessNum", this.getTypeCode()), ["" + currProNum]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        processNum.setPosition(this._innerCircle.x - processNum.width / 2, this._innerCircle.y + this._innerCircle.height / 2 - 55 - processNum.height);
        this.addChildToContainer(processNum);
        this._processNum = processNum;
        var starMap = new BaseDisplayObjectContainer();
        this.addChildToContainer(starMap);
        this._starMap = starMap;
        var starIcon = BaseBitmap.create(App.CommonUtil.getResByCode("acnightsky_starimg_" + this.getTypeCode(), this.getTypeCode()));
        starMap.width = starIcon.width;
        starMap.height = starIcon.height;
        starMap.addChild(starIcon);
        starMap.setPosition(GameConfig.stageWidth / 2 - starMap.width / 2, this._innerCircle.y - starMap.height / 2);
        var starPos = this.starPos;
        for (var i = 0; i < starPos.length; i++) {
            var pos = starPos[i];
            var starImg = "acnightsky_star1";
            if (!pos.isBig) {
                starImg = "acnightsky_star2";
            }
            var star = BaseBitmap.create(App.CommonUtil.getResByCode(starImg, this.getTypeCode()));
            star.x = pos.x;
            star.y = pos.y;
            starMap.addChild(star);
            star.visible = false;
            this._lightStarList.push(star);
        }
        var starCfg = this.cfg.getAchieveCfg();
        var angle = 315;
        var perAngle = 30;
        var radius = this._innerCircle.width / 2 + 40;
        for (var i = 0; i < starCfg.length; i++) {
            var boxStarCon = new BaseDisplayObjectContainer();
            this.addChildToContainer(boxStarCon);
            var boxStar = BaseBitmap.create(App.CommonUtil.getResByCode("acnightsky_processstar", this.getTypeCode()));
            boxStarCon.width = boxStar.width;
            boxStarCon.height = boxStar.height;
            boxStarCon.addChild(boxStar);
            boxStarCon.anchorOffsetX = boxStarCon.width / 2;
            boxStarCon.anchorOffsetY = boxStarCon.height / 2;
            boxStarCon.x = this._innerCircle.x + radius * Math.sin((angle - perAngle * i) * Math.PI / 180);
            boxStarCon.y = this._innerCircle.y - radius * Math.cos((angle - perAngle * i) * Math.PI / 180);
            boxStar.anchorOffsetX = boxStar.width / 2;
            boxStar.anchorOffsetY = boxStar.height / 2;
            boxStar.x = boxStar.width / 2;
            boxStar.y = boxStar.height / 2;
            var boxEff = ComponentManager.getCustomMovieClip("acnightsky_stareff", 10, 70);
            boxEff.width = 156;
            boxEff.height = 142;
            boxEff.$anchorOffsetX = boxEff.width / 2;
            boxEff.anchorOffsetY = boxEff.height / 2;
            boxEff.x = boxStar.x;
            boxEff.y = boxStar.y;
            boxStarCon.addChild(boxEff);
            boxEff.playWithTime(0);
            boxEff.visible = false;
            var needBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnightsky_numbg", this.getTypeCode()));
            boxStarCon.addChild(needBg);
            needBg.setPosition(boxStarCon.width / 2 - needBg.width / 2, 96);
            var needNum = ComponentManager.getTextField("" + starCfg[i].needNum, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            needNum.setPosition(needBg.x + needBg.width / 2 - needNum.width / 2, needBg.y + needBg.height / 2 - needNum.height / 2);
            boxStarCon.addChild(needNum);
            var alpha = BaseBitmap.create("pubic_alphabg");
            alpha.width = boxStarCon.width;
            alpha.height = needBg.y + needBg.height;
            boxStarCon.addChild(alpha);
            boxStarCon.addTouchTap(this.boxStarClick, this, [i]);
            this._boxStarList.push({ boxContainer: boxStarCon, star: boxStar, starEff: boxEff });
        }
    };
    AcNightSkyView.prototype.refreshBoxStar = function () {
        var data = this.cfg.getAchieveCfg();
        var currNum = this.vo.getProcessNum();
        var boxList = this._boxStarList;
        var star = null;
        for (var i = 0; i < boxList.length; i++) {
            star = boxList[i].star;
            // star.rotation = 0;
            star.alpha = 1;
            // egret.Tween.removeTweens(star);
            boxList[i].starEff.visible = false;
            if (this.vo.isGetAchieveRewardById(data[i].id)) {
                App.DisplayUtil.changeToGray(star);
            }
            else {
                App.DisplayUtil.changeToNormal(star);
                if (data[i].needNum <= currNum) {
                    // egret.Tween.get(star, {loop: true}).to({rotation: 6, alpha: 0}, 500).to({rotation: -6}, 1000).to({rotation: 0}, 500);
                    // egret.Tween.get(star, {loop: true}).to({alpha: 0.3}, 500).to({alpha: 1}, 500);
                    boxList[i].starEff.visible = true;
                }
            }
        }
    };
    AcNightSkyView.prototype.refreshLightStar = function () {
        var data = this._lightStarList;
        var num = this.vo.getSpecialNum();
        for (var i = 0; i < data.length; i++) {
            if (num >= (i + 1)) {
                data[i].visible = true;
            }
            else {
                data[i].visible = false;
            }
        }
    };
    AcNightSkyView.prototype.boxStarClick = function (evt, index) {
        var data = this.cfg.getAchieveCfg();
        var id = data[index].id;
        ViewController.getInstance().openView(ViewConst.POPUP.ACNIGHTSKYDETAILPOPUPVIEW, { aid: this.aid, code: this.code, id: id });
    };
    //是否选择十连
    AcNightSkyView.prototype.checkFlagCallback = function () {
        this._isTenPlay = !this._isTenPlay;
        var checkFlagImg = "acnightsky_ckbox2";
        if (this._isTenPlay) {
            checkFlagImg = "acnightsky_ckbox1";
        }
        this._checkFlag.setRes(checkFlagImg);
        var toolNum = this.vo.getToolNum();
        if (!this.vo.isFree() && toolNum <= 0 || (this._isTenPlay && toolNum < 10)) {
            App.DisplayUtil.changeToGray(this._playBtn);
            this._playBtnIdleEffect.visible = false;
        }
        else {
            App.DisplayUtil.changeToNormal(this._playBtn);
            this._playBtnIdleEffect.visible = true;
        }
    };
    //play btn
    AcNightSkyView.prototype.playBtnClick = function () {
        if (!this.vo.isInActivity()) {
            this.vo.showAcEndTip();
            return;
        }
        if (this._isPlay) {
            return;
        }
        var toolNum = this.vo.getToolNum();
        if ((!this._isTenPlay && (toolNum > 0 || this.vo.isFree())) || (this._isTenPlay && toolNum >= 10)) {
            this._isPlay = true;
            var tenFlag = 0;
            if (this._isTenPlay && toolNum >= 10) {
                tenFlag = 1;
            }
            var isFree = 0;
            if (this.vo.isFree()) {
                isFree = 1;
                tenFlag = 0;
            }
            NetManager.request(NetRequestConst.REQUEST_ACNIGHTSKY_PLAY, { activeId: this.vo.aidAndCode, isTenPlay: tenFlag, isFree: isFree });
        }
        else {
            this.showRechargeTip();
        }
    };
    AcNightSkyView.prototype.lotteryCallback = function (evt) {
        var _this = this;
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        this._rewardData = rData;
        this.showViewMask();
        if (!this._playBtnClickEffect) {
            this._playBtnClickEffect = ComponentManager.getCustomMovieClip("acnightsky_btnclick", 12, 70);
            this._playBtnClickEffect.x = this._playBtn.x + this._playBtn.width * this._playBtn.scaleX / 2 - 126 / 2;
            this._playBtnClickEffect.y = this._playBtn.y + this._playBtn.height * this._playBtn.scaleY / 2 - 127 / 2;
            this.addChildToContainer(this._playBtnClickEffect);
            this._playBtnClickEffect.setEndCallBack(function () {
                _this._playBtnClickEffect.visible = false;
            }, this);
        }
        this._playBtnClickEffect.visible = true;
        this._playBtnClickEffect.playWithTime(1);
        if (rData.specialNum > 0) {
            if (this._circleEffect) {
                this._circleEffect.visible = true;
                this._circleEffect.playDragonMovie("zhuan", 1);
                this._circleEffect.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                    _this._circleEffect.visible = false;
                }, this);
            }
            this.showStarLine(true);
        }
        else {
            this.showStarLine(false);
        }
    };
    //isLight 是否点亮星星
    AcNightSkyView.prototype.showStarLine = function (isLight) {
        var _this = this;
        var pos = null;
        if (isLight) {
            var index = this.vo.getSpecialNum() - 1;
            var maxNum = this._lightStarList.length;
            if (this.vo.getSpecialNum() >= maxNum) {
                index = App.MathUtil.getRandom(0, maxNum);
            }
            pos = this.starPos[index];
        }
        else {
            var partList = [
                { x: 0, y: this._infoBg.y + this._infoBg.height + 20, width: 120, height: this._playBtn.y - this._infoBg.y - this._infoBg.height - 60 },
                { x: GameConfig.stageWidth - 120, y: this._infoBg.y + this._infoBg.height + 20, width: 120, height: this._playBtn.y - this._infoBg.y - this._infoBg.height - 60 },
            ];
            var part = partList[Math.floor(Math.random() * partList.length)];
            pos = { x: part.x + part.width * Math.random(), y: part.y + part.height * Math.random(), isBig: false };
        }
        if (!this._lightStarEffect) {
            this._lightStarEffect = ComponentManager.getCustomMovieClip("acnightsky_lightstart", 9, 70);
            this.addChildToContainer(this._lightStarEffect);
            this._lightStarEffect.setEndCallBack(function () {
                _this._lightStarEffect.visible = false;
            }, this);
        }
        this._lightStarEffect.x = this._playBtn.x + this._playBtn.width * this._playBtn.scaleX / 2 - 150 / 2;
        this._lightStarEffect.y = this._playBtn.y + this._playBtn.height * this._playBtn.scaleY / 2 - 145;
        this._lightStarEffect.visible = true;
        this._lightStarEffect.playWithTime(1);
        var startPosX = this._playBtn.x + this._playBtn.width * this._playBtn.scaleX / 2;
        var startPosY = this._playBtn.y + this._playBtn.height * this._playBtn.scaleY / 2;
        var off = 0;
        if (pos.isBig) {
            off = 20 / 2;
        }
        else {
            off = 16 / 2;
        }
        var overPosX = 0;
        var overPosY = 0;
        if (isLight) {
            overPosX = this._starMap.x + pos.x + off;
            overPosY = this._starMap.y + pos.y + off;
        }
        else {
            overPosX = pos.x;
            overPosY = pos.y;
        }
        if (!this._starLine) {
            this._starLine = BaseBitmap.create("acnightsky_starline");
            this.addChildToContainer(this._starLine);
        }
        this._starLine.alpha = 1;
        this._starLine.visible = true;
        this._starLine.anchorOffsetX = 94;
        this._starLine.anchorOffsetY = 293;
        this._starLine.x = startPosX;
        this._starLine.y = startPosY;
        var bet = -180 / Math.PI * Math.atan((startPosX - overPosX) / (startPosY - overPosY));
        this._starLine.rotation = bet;
        //94 57  ---- 94 293
        var len = Math.sqrt(Math.pow(startPosX - overPosX, 2) + Math.pow(startPosY - overPosY, 2));
        // this._starLine.scaleY = len /(300 -70);
        var baseScaleY = 0.3;
        var lineA = 1;
        if (isLight) {
            lineA = 1;
        }
        else {
            lineA = 0.5;
        }
        var maxScaleY = len / (293 - 57);
        this._starLine.scaleY = baseScaleY;
        egret.Tween.get(this._starLine)
            .to({ scaleY: maxScaleY }, 150)
            .set({ anchorOffsetX: 94, anchorOffsetY: 57, x: overPosX, y: overPosY })
            .call(function () {
            var starImg = App.CommonUtil.getResByCode("acstargazer_star2", _this.getTypeCode());
            if (pos.isBig) {
                starImg = App.CommonUtil.getResByCode("acstargazer_star1", _this.getTypeCode());
            }
            if (isLight) {
                _this.refreshLightStar();
            }
            if (!_this._lightOverEffect) {
                _this._lightOverEffect = ComponentManager.getCustomMovieClip("acnightsky_lightover", 7, 70);
                _this.addChildToContainer(_this._lightOverEffect);
                _this._lightOverEffect.setEndCallBack(function () {
                    _this._lightOverEffect.visible = false;
                }, _this);
            }
            if (isLight) {
                _this._lightOverEffect.alpha = 1;
            }
            else {
                _this._lightOverEffect.alpha = 0.5;
            }
            _this._lightOverEffect.x = overPosX - 217 / 2;
            _this._lightOverEffect.y = overPosY - 219 / 2;
            _this._lightOverEffect.visible = true;
            _this._lightOverEffect.playWithTime(1);
        })
            .to({ scaleY: baseScaleY, alpha: lineA }, 150)
            .to({ alpha: 0 }, 40)
            .call(function () {
            _this._starLine.visible = false;
        })
            .wait(500)
            .call(this.showReward, this);
    };
    AcNightSkyView.prototype.showReward = function () {
        var _this = this;
        var view = this;
        var rData = view._rewardData;
        if (rData) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rData.rewards, "isPlayAni": true, "callback": function () {
                    _this.refreshBoxStar();
                    view._isPlay = false;
                    view.hideViewMask();
                } });
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
            }
        }
        else {
            view._isPlay = false;
            view.hideViewMask();
        }
    };
    AcNightSkyView.prototype.refreshView = function () {
        if (this.vo.isFree()) {
            this._freeDesc.visible = true;
            this._toolNumTf.visible = false;
        }
        else {
            this._freeDesc.visible = false;
            this._toolNumTf.visible = true;
        }
        var toolNum = this.vo.getToolNum();
        this._toolNumTf.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNightSkyRemainUseNum", this.getTypeCode()), ["" + toolNum]);
        this._toolNumTf.x = GameConfig.stageWidth / 2 - this._toolNumTf.width / 2;
        var currProNum = this.vo.getProcessNum();
        this._processNum.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNightSkyProcessNum", this.getTypeCode()), ["" + currProNum]);
        this._processNum.x = this._innerCircle.x - this._processNum.width / 2;
        if (this.vo.isCanExchange() || this.vo.isCangetAchieveReward()) {
            this._detailBtnRed.visible = true;
        }
        else {
            this._detailBtnRed.visible = false;
        }
        this._rechargeTip.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNightSkyRechargeInfo", this.getUiCode()), ["" + this.vo.getNeedRecharge()]);
        if (!this._isPlay) {
            this.refreshBoxStar();
        }
        if (!this.vo.isFree() && toolNum <= 0 || (this._isTenPlay && toolNum < 10)) {
            App.DisplayUtil.changeToGray(this._playBtn);
            this._playBtnIdleEffect.visible = false;
        }
        else {
            App.DisplayUtil.changeToNormal(this._playBtn);
            this._playBtnIdleEffect.visible = true;
        }
        var specialItemVo = this.vo.getShowSkinData();
        var specailData = Api.itemVoApi.getItemInfoVoById(specialItemVo.id);
        var currSpecailNum = 0;
        if (specailData) {
            currSpecailNum = specailData.num;
        }
        var specialRemainNum = this.cfg.specialLimit - this.vo.getSpecialTotalNum();
        this._specailNum.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNightSkySpecialItemNum", this.getTypeCode()), ["" + currSpecailNum, "" + specialRemainNum]);
        this._specailBg.width = this._specailNum.width + 50;
    };
    //流星相关
    AcNightSkyView.prototype.showShootStar = function () {
        var _this = this;
        egret.Tween.get(this._shootStarContainer, { loop: false }).wait(2000).call(function () {
            var randNum = App.MathUtil.getRandom(0, _this.shootStarCfg.length);
            var randScale = App.MathUtil.getRandom(13, 19);
            var shootStar = ComponentManager.getCustomMovieClip("acnightsky_shootstar", 17, 70);
            shootStar.width = 44;
            shootStar.height = 289;
            shootStar.setPosition(_this.shootStarCfg[randNum].x, _this.shootStarCfg[randNum].y);
            shootStar.rotation = _this.shootStarCfg[randNum].rotation;
            shootStar.setScale(randScale / 10);
            _this._shootStarContainer.addChild(shootStar);
            shootStar.playWithTime(1);
            shootStar.setEndCallBack(function () {
                shootStar.dispose();
            }, _this);
        }, this).wait(6000).call(this.showShootStar, this);
    };
    Object.defineProperty(AcNightSkyView.prototype, "shootStarCfg", {
        get: function () {
            return [
                { x: 499, y: 452, rotation: 40 },
                { x: 598, y: 271, rotation: 50 },
                { x: 508, y: 489, rotation: 60 },
                { x: 18, y: 377, rotation: -40 },
                { x: 83, y: 232, rotation: -60 }
            ];
        },
        enumerable: true,
        configurable: true
    });
    AcNightSkyView.prototype.tick = function () {
        this._timeTxt.text = LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]);
        this._timeBg.width = 40 + this._timeTxt.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 10;
        this._timeTxt.x = this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2;
    };
    AcNightSkyView.prototype.showRechargeTip = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            msg: LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNightSkyRechargeTip", this.getTypeCode())),
            touchMaskClose: true,
            title: "itemUseConstPopupViewTitle",
            callback: function () {
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            },
            handle: this,
            needClose: 1,
            needCancel: true,
            confirmTxt: "taskGoBtn",
        });
    };
    //mask
    AcNightSkyView.prototype.showViewMask = function () {
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "viewMaskTouchPos";
        touchPos.touchEnabled = true;
    };
    AcNightSkyView.prototype.hideViewMask = function () {
        var touchPos = this.getChildByName("viewMaskTouchPos");
        if (touchPos) {
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    };
    AcNightSkyView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat("acnightskycode" + this.getTypeCode(), "acnightskycode1", "acnightsky_exchange_txt", "public_dot2").concat(list);
    };
    AcNightSkyView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACNIGHTSKY_PLAY, this.lotteryCallback, this);
        if (this._bg1) {
            egret.Tween.removeTweens(this._bg1);
        }
        if (this._bg2) {
            egret.Tween.removeTweens(this._bg2);
        }
        if (this._temp) {
            egret.Tween.removeTweens(this._temp);
        }
        if (this._innerCircle) {
            egret.Tween.removeTweens(this._innerCircle);
        }
        if (this._outerCircle) {
            egret.Tween.removeTweens(this._outerCircle);
        }
        if (this._starLine) {
            egret.Tween.removeTweens(this._starLine);
        }
        if (this._shootStarContainer) {
            egret.Tween.removeTweens(this._shootStarContainer);
        }
        this._bg1 = null;
        this._bg2 = null;
        this._temp = null;
        this._infoBg = null;
        this._bottomBg = null;
        this._timeBg = null;
        this._timeTxt = null;
        this._playBtn = null;
        this._playBtnIdleEffect = null;
        this._playBtnClickEffect = null;
        this._toolNumTf = null;
        this._checkFlag = null;
        this._isTenPlay = false;
        this._detailBtn = null;
        this._innerCircle = null;
        this._outerCircle = null;
        this._circleEffect = null;
        this._boxStarList = [];
        this._isPlay = false;
        this._rewardData = null;
        this._lightStarEffect = null;
        this._lightOverEffect = null;
        this._starLine = null;
        this._starMap = null;
        this._processNum = null;
        this._rechargeTip = null;
        this._lightStarList = [];
        this._detailBtnRed = null;
        this._specailNum = null;
        this._specailBg = null;
        this._shootStarContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcNightSkyView;
}(AcCommonView));
__reflect(AcNightSkyView.prototype, "AcNightSkyView");
//# sourceMappingURL=AcNigthSkyView.js.map