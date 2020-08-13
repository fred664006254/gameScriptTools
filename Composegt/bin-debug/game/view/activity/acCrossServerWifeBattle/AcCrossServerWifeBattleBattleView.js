/**
 * 群芳会对战
 */
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
var AcCrossServerWifeBattleBattleView = (function (_super) {
    __extends(AcCrossServerWifeBattleBattleView, _super);
    function AcCrossServerWifeBattleBattleView() {
        var _this = _super.call(this) || this;
        _this._fightarr = null;
        _this._point = 0;
        _this._rewardnum = 0;
        _this._winflag = 0;
        _this._callback = null;
        _this._target = null;
        //跳过战斗按钮
        _this._stepBtn = null;
        //我的剩余红颜个数
        _this._myWifeCount = null;
        //我的总才情
        _this._myTotalTalent = null;
        //我的卡牌容器
        _this._myCardContainer = null;
        //我的总才情进度条
        _this._myBProgress = null;
        //我的红颜卡牌列表
        _this._myWifeCardList = null;
        //当前红颜皮肤名称背景
        _this._myCurSkinNameBg = null;
        //当前红颜才情进度条
        _this._myCurProgress = null;
        //我的当前红颜名称
        _this._myCurWifeName = null;
        //当前皮肤名称
        _this._myCurSkinName = null;
        //当前才情
        _this._myCurTalent = null;
        //当前红颜形象容器
        _this._myCurWifeContainer = null;
        //敌人
        //敌人的剩余红颜个数
        _this._enemyWifeCount = null;
        //敌人的总才情
        _this._enemyTotalTalent = null;
        //敌人的卡牌容器
        _this._enemyCardContainer = null;
        //敌人的总才情进度条
        _this._enemyBProgress = null;
        //敌人的红颜卡牌列表
        _this._enemyWifeCardList = null;
        //当前敌人红颜皮肤名称背景
        _this._enemyCurSkinNameBg = null;
        //当前敌人红颜才情进度条
        _this._enemyCurProgress = null;
        //敌人的当前红颜名称
        _this._enemyCurWifeName = null;
        //当前敌人皮肤名称
        _this._enemyCurSkinName = null;
        //当前敌人才情
        _this._enemyCurTalent = null;
        //当前敌人红颜形象容器
        _this._enemyCurWifeContainer = null;
        // private _myCardDataList:any[] = null;
        // private _enemyCardDataList:any[]= null;
        _this._myCurIndex = 0;
        _this._enemyCurIndex = 0;
        _this._curRound = 0;
        _this._myNameBg = null;
        _this._enemyNameBg = null;
        _this._myCurWife = null;
        _this._enemyCurWife = null;
        _this._myMaxTalent = 0;
        _this._enemyMaxTalent = 0;
        _this._mySelectCard = null;
        _this._enemySelectCard = null;
        _this._myMaxNum = 0;
        _this._enemyMaxNum = 0;
        _this._myCurWifeStr = null;
        _this._enemyCurWifeStr = null;
        _this._enemyNameY = 0;
        _this._myNameY = 0;
        _this._myAnim = null;
        _this._enemyAnim = null;
        _this._myTalkBg = null;
        _this._myTalkTxt = null;
        _this._enemyTalkBg = null;
        _this._enemyTalkTxt = null;
        _this._isPause = false;
        _this._isReview = false;
        return _this;
    }
    AcCrossServerWifeBattleBattleView.prototype.getCloseBtnName = function () {
        return null;
    };
    // protected isTouchMaskClose():boolean
    // {
    //     return true;
    // }
    AcCrossServerWifeBattleBattleView.prototype.hide = function () {
        if (this._target && this._callback) {
            this._callback.apply(this._target);
        }
        _super.prototype.hide.call(this);
    };
    AcCrossServerWifeBattleBattleView.prototype.initView = function () {
        this.titleTF.visible = false;
        this._fightarr = this.param.data.fightarr;
        this._point = this.param.data.point;
        this._rewardnum = this.param.data.rewardnum;
        this._winflag = this.param.data.winflag;
        this._callback = this.param.data.callback;
        this._target = this.param.data.target;
        this._isReview = this.param.data.isReview;
        this.initBottomView();
        this.initCards();
        this.initCenterView();
    };
    AcCrossServerWifeBattleBattleView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("wifebattlebattleview_bg");
        this.viewBg.width = 640;
        this.viewBg.height = 1136;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    AcCrossServerWifeBattleBattleView.prototype.isShowOpenAni = function () {
        return false;
    };
    /**
     * 显示初始化View
     */
    AcCrossServerWifeBattleBattleView.prototype.initBottomView = function () {
        console.log("initBottomView");
        var myCardsBg = BaseLoadBitmap.create("wifebattlebattleview_playercardbg");
        myCardsBg.width = 640;
        myCardsBg.height = 161;
        myCardsBg.x = 0;
        myCardsBg.y = GameConfig.stageHeigth - myCardsBg.height;
        this.addChild(myCardsBg);
        var myBlackBg = BaseBitmap.create("wifebattlebattleview_blackbg");
        myBlackBg.width = 640;
        myBlackBg.x = 0;
        myBlackBg.y = myCardsBg.y - myBlackBg.height;
        this.addChild(myBlackBg);
        this._myCardContainer = new BaseDisplayObjectContainer();
        this._myCardContainer.width = 640;
        this._myCardContainer.height = 162;
        this._myCardContainer.x = 0;
        this._myCardContainer.y = myCardsBg.y + myCardsBg.height / 2 - this._myCardContainer.height / 2;
        this.addChild(this._myCardContainer);
        this._myWifeCount = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleBattleWifeCount", ["44"]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._myWifeCount.x = 10;
        this._myWifeCount.y = myBlackBg.y + myBlackBg.height / 2 - this._myWifeCount.height / 2;
        this.addChild(this._myWifeCount);
        var myName = ComponentManager.getTextField(this._fightarr.auserinfo.name, 22, 0x70c6fb);
        myName.x = GameConfig.stageWidth - 10 - myName.width;
        myName.y = myBlackBg.y + myBlackBg.height / 2 - myName.height / 2;
        this.addChild(myName);
        this._myBProgress = ComponentManager.getProgressBar("wifebattlebattleview_bprogressbar", "wifebattlebattleview_bprogressbg", 350);
        this._myBProgress.scaleX = -1;
        this._myBProgress.x = GameConfig.stageWidth / 2 - this._myBProgress.width / 2 + this._myBProgress.width;
        this._myBProgress.y = myBlackBg.y + myBlackBg.height / 2 - this._myBProgress.height / 2;
        this._myBProgress.setPercentage(1);
        this.addChild(this._myBProgress);
        this._myTotalTalent = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleBattleTotalTalent", ["555"]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._myTotalTalent.x = GameConfig.stageWidth / 2 - this._myTotalTalent.width / 2;
        this._myTotalTalent.y = myBlackBg.y + myBlackBg.height / 2 - this._myTotalTalent.height / 2;
        this.addChild(this._myTotalTalent);
        //敌人
        var enemyCardsBg = BaseLoadBitmap.create("wifebattlebattleview_playercardbg");
        enemyCardsBg.width = 640;
        enemyCardsBg.height = 161;
        enemyCardsBg.scaleY = -1;
        enemyCardsBg.x = 0;
        enemyCardsBg.y = enemyCardsBg.height;
        this.addChild(enemyCardsBg);
        var enemyBlackBg = BaseBitmap.create("wifebattlebattleview_blackbg");
        enemyBlackBg.width = 640;
        enemyBlackBg.x = 0;
        enemyBlackBg.y = enemyCardsBg.y;
        this.addChild(enemyBlackBg);
        this._enemyCardContainer = new BaseDisplayObjectContainer();
        this._enemyCardContainer.width = 640;
        this._enemyCardContainer.height = 162;
        this._enemyCardContainer.x = 0;
        this._enemyCardContainer.y = enemyCardsBg.height / 2 - this._enemyCardContainer.height / 2;
        this.addChild(this._enemyCardContainer);
        this._enemyWifeCount = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleBattleWifeCount", ["44"]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._enemyWifeCount.x = GameConfig.stageWidth - 10 - this._enemyWifeCount.width;
        this._enemyWifeCount.y = enemyBlackBg.y + enemyBlackBg.height / 2 - this._enemyWifeCount.height / 2;
        this.addChild(this._enemyWifeCount);
        var enemyName = ComponentManager.getTextField(this._fightarr.duserinfo.name, 22, 0xec3e49);
        enemyName.x = 10;
        enemyName.y = enemyBlackBg.y + enemyBlackBg.height / 2 - enemyName.height / 2;
        this.addChild(enemyName);
        this._enemyBProgress = ComponentManager.getProgressBar("wifebattlebattleview_bprogressbar", "wifebattlebattleview_bprogressbg", 350);
        this._enemyBProgress.x = GameConfig.stageWidth / 2 - this._enemyBProgress.width / 2;
        this._enemyBProgress.y = enemyBlackBg.y + enemyBlackBg.height / 2 - this._enemyBProgress.height / 2;
        this._enemyBProgress.setPercentage(1);
        this.addChild(this._enemyBProgress);
        this._enemyTotalTalent = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleBattleTotalTalent", ["6666"]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._enemyTotalTalent.x = GameConfig.stageWidth / 2 - this._enemyTotalTalent.width / 2;
        this._enemyTotalTalent.y = enemyBlackBg.y + enemyBlackBg.height / 2 - this._enemyTotalTalent.height / 2;
        this.addChild(this._enemyTotalTalent);
        this._stepBtn = ComponentManager.getButton("wifebattlebattleview_step", null, this.stepBtnHandler, this);
        this._stepBtn.x = GameConfig.stageWidth - 10 - this._stepBtn.width;
        this._stepBtn.y = enemyBlackBg.y + enemyBlackBg.height + 15;
        this._stepBtn.visible = false;
        this.addChild(this._stepBtn);
        egret.Tween.get(this._stepBtn)
            .wait(5000)
            .set({ visible: true });
    };
    AcCrossServerWifeBattleBattleView.prototype.initCenterView = function () {
        console.log("initCenterView");
        var enemyNameY = 500; //530;
        this._enemyNameY = enemyNameY;
        this._enemyCurWifeContainer = new BaseDisplayObjectContainer();
        this._enemyCurWifeContainer.width = 320;
        this._enemyCurWifeContainer.height = 420;
        // this._enemyCurWifeContainer.setScale(0.5);
        this._enemyCurWifeContainer.x = 0;
        this._enemyCurWifeContainer.y = enemyNameY - this._enemyCurWifeContainer.height + 70;
        this._enemyCurWifeContainer.mask = new egret.Rectangle(0, 0, this._enemyCurWifeContainer.width, this._enemyCurWifeContainer.height);
        this.addChild(this._enemyCurWifeContainer);
        this._enemyCurSkinNameBg = BaseBitmap.create("wifebattlebattleview_skinnamebg");
        if (PlatformManager.checkIsViSp()) {
            this._enemyCurSkinNameBg.width = 279 + 50;
        }
        this._enemyCurSkinNameBg.x = 20;
        this._enemyCurSkinNameBg.y = enemyNameY - this._enemyCurSkinNameBg.height + 30;
        this.addChild(this._enemyCurSkinNameBg);
        this._enemyCurSkinName = ComponentManager.getTextField("skinname111", 20, 0xec3e49);
        this._enemyCurSkinName.x = this._enemyCurSkinNameBg.x + this._enemyCurSkinNameBg.width / 2 - this._enemyCurSkinName.width / 2;
        this._enemyCurSkinName.y = this._enemyCurSkinNameBg.y + this._enemyCurSkinNameBg.height / 2 - this._enemyCurSkinName.height / 2 + 10;
        this.addChild(this._enemyCurSkinName);
        var enemyNameBg = BaseBitmap.create("wifebattlebattleview_wifenamebg");
        if (PlatformManager.checkIsViSp()) {
            enemyNameBg.width = 344 + 50;
        }
        enemyNameBg.x = 0;
        enemyNameBg.y = enemyNameY;
        this.addChild(enemyNameBg);
        this._enemyNameBg = enemyNameBg;
        if (PlatformManager.checkIsViSp()) {
            this._enemyCurProgress = ComponentManager.getProgressBar("wifebattlebattleview_sprogressbar", "wifebattlebattleview_sprogressbg", 220 + 50);
        }
        else {
            this._enemyCurProgress = ComponentManager.getProgressBar("wifebattlebattleview_sprogressbar", "wifebattlebattleview_sprogressbg", 220);
        }
        this._enemyCurProgress.x = enemyNameBg.x + 90;
        this._enemyCurProgress.y = enemyNameBg.y + 60;
        this.addChild(this._enemyCurProgress);
        this._enemyCurTalent = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleBattleTalent", ["3333"]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._enemyCurTalent.x = this._enemyCurProgress.x + this._enemyCurProgress.width / 2 - this._enemyCurTalent.width / 2;
        this._enemyCurTalent.y = this._enemyCurProgress.y + this._enemyCurProgress.height / 2 - this._enemyCurTalent.height / 2;
        this.addChild(this._enemyCurTalent);
        this._enemyCurWifeName = ComponentManager.getTextField("name111", 20, 0xec3e49);
        this._enemyCurWifeName.x = enemyNameBg.x + enemyNameBg.width / 2 - this._enemyCurWifeName.width / 2;
        this._enemyCurWifeName.y = enemyNameBg.y + 37;
        this.addChild(this._enemyCurWifeName);
        var enemyNameFg = BaseBitmap.create("wifebattlebattleview_wifenamefg");
        if (PlatformManager.checkIsViSp()) {
            enemyNameFg.width = 356 + 50;
        }
        enemyNameFg.x = enemyNameBg.x;
        enemyNameFg.y = enemyNameBg.y;
        this.addChild(enemyNameFg);
        //自己
        var myNameY = 650 + (GameConfig.stageHeigth - 960) / (1136 - 960) * 100;
        this._myNameY = myNameY;
        this._myCurWifeContainer = new BaseDisplayObjectContainer();
        this._myCurWifeContainer.width = 320;
        this._myCurWifeContainer.height = 420;
        // this._myCurWifeContainer.setScale(0.5);
        this._myCurWifeContainer.x = GameConfig.stageWidth - 320;
        this._myCurWifeContainer.y = myNameY - this._myCurWifeContainer.height + 70;
        this._myCurWifeContainer.mask = new egret.Rectangle(0, 0, this._myCurWifeContainer.width, this._myCurWifeContainer.height);
        this.addChild(this._myCurWifeContainer);
        this._myCurSkinNameBg = BaseBitmap.create("wifebattlebattleview_skinnamebg");
        if (PlatformManager.checkIsViSp()) {
            this._myCurSkinNameBg.width = 279 + 50;
        }
        this._myCurSkinNameBg.scaleX = -1;
        this._myCurSkinNameBg.x = GameConfig.stageWidth - 20;
        this._myCurSkinNameBg.y = myNameY - this._myCurSkinNameBg.height + 30;
        this.addChild(this._myCurSkinNameBg);
        this._myCurSkinName = ComponentManager.getTextField("skinname111", 20, 0xec3e49);
        this._myCurSkinName.x = this._myCurSkinNameBg.x + this._myCurSkinNameBg.width / 2 - this._myCurSkinName.width / 2 - this._myCurSkinNameBg.width;
        this._myCurSkinName.y = this._myCurSkinNameBg.y + this._myCurSkinNameBg.height / 2 - this._myCurSkinName.height / 2 + 10;
        this.addChild(this._myCurSkinName);
        var myNameBg = BaseBitmap.create("wifebattlebattleview_wifenamebg");
        if (PlatformManager.checkIsViSp()) {
            myNameBg.width = 344 + 50;
        }
        myNameBg.scaleX = -1;
        myNameBg.x = GameConfig.stageWidth;
        myNameBg.y = myNameY;
        this.addChild(myNameBg);
        this._myNameBg = myNameBg;
        if (PlatformManager.checkIsViSp()) {
            this._myCurProgress = ComponentManager.getProgressBar("wifebattlebattleview_sprogressbar", "wifebattlebattleview_sprogressbg", 220 + 50);
        }
        else {
            this._myCurProgress = ComponentManager.getProgressBar("wifebattlebattleview_sprogressbar", "wifebattlebattleview_sprogressbg", 220);
        }
        this._myCurProgress.scaleX = -1;
        this._myCurProgress.x = myNameBg.x - 90;
        this._myCurProgress.y = myNameBg.y + 60;
        this.addChild(this._myCurProgress);
        this._myCurTalent = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleBattleTalent", ["3333"]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._myCurTalent.x = this._myCurProgress.x + this._myCurProgress.width / 2 - this._myCurTalent.width / 2 - this._myCurProgress.width;
        this._myCurTalent.y = this._myCurProgress.y + this._myCurProgress.height / 2 - this._myCurTalent.height / 2;
        this.addChild(this._myCurTalent);
        this._myCurWifeName = ComponentManager.getTextField("name111", 20, 0xec3e49);
        this._myCurWifeName.x = myNameBg.x + myNameBg.width / 2 - this._myCurWifeName.width / 2 - myNameBg.width;
        this._myCurWifeName.y = myNameBg.y + 37;
        this.addChild(this._myCurWifeName);
        var myNameFg = BaseBitmap.create("wifebattlebattleview_wifenamefg");
        if (PlatformManager.checkIsViSp()) {
            myNameFg.width = 356 + 50;
        }
        myNameFg.scaleX = -1;
        myNameFg.x = myNameBg.x;
        myNameFg.y = myNameBg.y;
        this.addChild(myNameFg);
        this._myCurSkinNameBg.visible = false;
        this._myCurSkinName.visible = false;
        this._enemyCurSkinNameBg.visible = false;
        this._enemyCurSkinName.visible = false;
        this.beginRound();
    };
    AcCrossServerWifeBattleBattleView.prototype.beginRound = function () {
        console.log("beginRound---");
        if (this._isPause) {
            return;
        }
        //开始当前回合
        //当前我方初始化
        var curRoundData = this._fightarr.info[this._curRound];
        if (this._curRound == 0) {
            this._myMaxTalent = curRoundData[8];
            this._enemyMaxTalent = curRoundData[9];
        }
        var myWifeCfg = Config.WifeCfg.getWifeCfgById(curRoundData[0]);
        var myWifeInfo = this._fightarr.ainfo[myWifeCfg.id];
        var myWifeSkinCfg = null;
        var myWifeIconStr = myWifeCfg.body; //"wife_full_"+myWifeCfg.id;
        this._myCurSkinNameBg.visible = false;
        this._myCurSkinName.visible = false;
        // if(myWifeInfo.skin  || myWifeInfo.maleskin){
        if ((myWifeInfo.skin && !(myWifeInfo.sexflag && myWifeInfo.sexflag >= 1)) || (myWifeInfo.maleskin && myWifeInfo.sexflag && myWifeInfo.sexflag >= 1)) {
            // myWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(myWifeInfo.skin);
            // myWifeIconStr = myWifeSkinCfg.body//"wife_skin_"+myWifeInfo.skin;
            if (myWifeInfo.sexflag && myWifeInfo.sexflag >= 1) {
                myWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(myWifeInfo.maleskin);
                myWifeIconStr = myWifeSkinCfg.getBody(true); //"wife_skin_"+myWifeInfo.skin;
                this._myCurSkinName.text = myWifeSkinCfg.getName(true);
            }
            else {
                myWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(myWifeInfo.skin);
                myWifeIconStr = myWifeSkinCfg.getBody(false); //"wife_skin_"+myWifeInfo.skin;
                this._myCurSkinName.text = myWifeSkinCfg.getName(false);
            }
            this._myCurSkinNameBg.visible = true;
            this._myCurSkinName.visible = true;
            // this._myCurSkinName.text = myWifeSkinCfg.name;
            this._myCurSkinName.x = this._myCurSkinNameBg.x + this._myCurSkinNameBg.width / 2 - this._myCurSkinName.width / 2 - this._myCurSkinNameBg.width;
        }
        if (PlatformManager.checkIsViSp()) {
            this._myCurWifeName.text = myWifeCfg.getName(myWifeInfo.sexflag && myWifeInfo.sexflag >= 1);
        }
        else {
            this._myCurWifeName.text = myWifeCfg.getName(myWifeInfo.sexflag && myWifeInfo.sexflag >= 1) + "(" + LanguageManager.getlocal("wifestatusTitle" + myWifeInfo.level) + ")";
        }
        this._myCurWifeName.x = this._myNameBg.x + this._myNameBg.width / 2 - this._myCurWifeName.width / 2 - this._myNameBg.width;
        this._myCurTalent.text = LanguageManager.getlocal("wifeBattleBattleTalent", [String(curRoundData[2])]);
        this._myCurTalent.x = this._myCurProgress.x + this._myCurProgress.width / 2 - this._myCurTalent.width / 2 - this._myCurProgress.width;
        this._myCurProgress.setPercentage(curRoundData[2] / myWifeInfo.talent);
        if (!this._myCurWife) {
            this._myCurWife = BaseLoadBitmap.create(myWifeIconStr);
            this._myCurWife.width = 640;
            this._myCurWife.height = 840;
            this._myCurWife.anchorOffsetX = this._myCurWife.width / 2;
            this._myCurWife.anchorOffsetY = this._myCurWife.height / 2;
            this._myCurWifeContainer.addChild(this._myCurWife);
        }
        this._myCurWife.setScale(0.4);
        this._myCurWife.alpha = 1;
        if (this._myCurWifeStr != myWifeIconStr) {
            this._myCurWife.setload(myWifeIconStr);
            this._myCurWife.x = 640 + this._myCurWife.width * this._myCurWife.scaleX / 2;
            this._myCurWife.y = this._myCurWifeContainer.height - this._myCurWife.height * this._myCurWife.scaleY / 2;
            egret.Tween.get(this._myCurWife)
                .to({ x: this._myCurWifeContainer.width / 2 }, 300);
            this._myCurWifeStr = myWifeIconStr;
        }
        //当前敌人
        var enemyWifeCfg = Config.WifeCfg.getWifeCfgById(curRoundData[1]);
        var enemyWifeInfo = this._fightarr.dinfo[enemyWifeCfg.id];
        var enemyWifeSkinCfg = null;
        var enemyWifeIconStr = enemyWifeCfg.getBody(enemyWifeInfo.sexflag && enemyWifeInfo.sexflag >= 1); //"wife_full_"+enemyWifeCfg.id;
        this._enemyCurSkinNameBg.visible = false;
        this._enemyCurSkinName.visible = false;
        var isBlue = false;
        // if(enemyWifeInfo.skin || enemyWifeInfo.maleskin){
        if ((enemyWifeInfo.skin && !(enemyWifeInfo.sexflag && enemyWifeInfo.sexflag >= 1)) || (enemyWifeInfo.maleskin && enemyWifeInfo.sexflag && enemyWifeInfo.sexflag >= 1)) {
            if (enemyWifeInfo.sexflag && enemyWifeInfo.sexflag >= 1) {
                enemyWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(enemyWifeInfo.maleskin);
                enemyWifeIconStr = enemyWifeSkinCfg.getBody(true); //"wife_skin_"+enemyWifeInfo.skin;
                this._enemyCurSkinName.text = enemyWifeSkinCfg.getName(true);
                var isBlue_1 = true;
            }
            else {
                enemyWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(enemyWifeInfo.skin);
                enemyWifeIconStr = enemyWifeSkinCfg.getBody(false); //"wife_skin_"+enemyWifeInfo.skin;
                this._enemyCurSkinName.text = enemyWifeSkinCfg.getName(false);
                var isBlue_2 = false;
            }
            this._enemyCurSkinNameBg.visible = true;
            this._enemyCurSkinName.visible = true;
            // this._enemyCurSkinName.x = this._enemyCurSkinNameBg.x + this._enemyCurSkinNameBg.width/2 - this._enemyCurSkinName.width/2 - this._enemyCurSkinNameBg.width;
            this._enemyCurSkinName.x = this._enemyCurSkinNameBg.x + this._enemyCurSkinNameBg.width / 2 - this._enemyCurSkinName.width / 2;
        }
        if (PlatformManager.checkIsViSp()) {
            this._enemyCurWifeName.text = enemyWifeCfg.getName(enemyWifeInfo.sexflag && enemyWifeInfo.sexflag >= 1);
        }
        else {
            this._enemyCurWifeName.text = enemyWifeCfg.getName(enemyWifeInfo.sexflag && enemyWifeInfo.sexflag >= 1) + "(" + LanguageManager.getlocal("wifestatusTitle" + enemyWifeInfo.level) + ")";
        }
        this._enemyCurWifeName.x = this._enemyNameBg.x + this._enemyNameBg.width / 2 - this._enemyCurWifeName.width / 2;
        this._enemyCurTalent.text = LanguageManager.getlocal("wifeBattleBattleTalent", [String(curRoundData[3])]);
        this._enemyCurTalent.x = this._enemyCurProgress.x + this._enemyCurProgress.width / 2 - this._enemyCurTalent.width / 2;
        this._enemyCurProgress.setPercentage(curRoundData[3] / enemyWifeInfo.talent);
        if (!this._enemyCurWife) {
            this._enemyCurWife = BaseLoadBitmap.create(enemyWifeIconStr);
            this._enemyCurWife.width = 640;
            this._enemyCurWife.height = 840;
            this._enemyCurWife.anchorOffsetX = this._enemyCurWife.width / 2;
            this._enemyCurWife.anchorOffsetY = this._enemyCurWife.height / 2;
            this._enemyCurWifeContainer.addChild(this._enemyCurWife);
        }
        this._enemyCurWife.setScale(0.4);
        this._enemyCurWife.alpha = 1;
        if (this._enemyCurWifeStr != enemyWifeIconStr) {
            this._enemyCurWife.setload(enemyWifeIconStr);
            this._enemyCurWife.x = -640 * this._enemyCurWife.scaleX / 2;
            this._enemyCurWife.y = this._enemyCurWifeContainer.height - this._enemyCurWife.height * this._enemyCurWife.scaleY / 2;
            egret.Tween.get(this._enemyCurWife)
                .to({ x: this._enemyCurWifeContainer.width / 2 }, 300);
            this._enemyCurWifeStr = enemyWifeIconStr;
        }
        //我方数据初始化
        this._myWifeCount.text = LanguageManager.getlocal("wifeBattleBattleWifeCount", [String(curRoundData[6])]);
        this._myTotalTalent.text = LanguageManager.getlocal("wifeBattleBattleTotalTalent", [String(curRoundData[8])]);
        this._myTotalTalent.x = GameConfig.stageWidth / 2 - this._myTotalTalent.width / 2;
        //敌方数据初始化
        this._enemyWifeCount.text = LanguageManager.getlocal("wifeBattleBattleWifeCount", [String(curRoundData[7])]);
        this._enemyTotalTalent.text = LanguageManager.getlocal("wifeBattleBattleTotalTalent", [String(curRoundData[9])]);
        this._enemyTotalTalent.x = GameConfig.stageWidth / 2 - this._enemyTotalTalent.width / 2;
        egret.Tween.get(this)
            .wait(600)
            .call(this.playRound, this);
    };
    AcCrossServerWifeBattleBattleView.prototype.playRound = function () {
        var _this = this;
        console.log("playRound---");
        if (this._isPause) {
            return;
        }
        this.enemyTalk();
        this.myTalk();
        if (!this._myAnim) {
            this._myAnim = ComponentManager.getCustomMovieClip("wifebattlebattle_anim", 13, 70);
            this._myAnim.x = this._myCurWife.x - 180;
            this._myAnim.y = this._myCurWife.y - 180;
            this._myAnim.setEndCallBack(function () {
                _this._myAnim.visible = false;
            }, this);
            this._myCurWifeContainer.addChild(this._myAnim);
        }
        if (!this._enemyAnim) {
            this._enemyAnim = ComponentManager.getCustomMovieClip("wifebattlebattle_anim", 13, 70);
            this._enemyAnim.x = this._enemyCurWife.x - 180;
            this._enemyAnim.y = this._enemyCurWife.y - 180;
            this._enemyAnim.setEndCallBack(function () {
                _this._enemyAnim.visible = false;
            }, this);
            this._enemyCurWifeContainer.addChild(this._enemyAnim);
        }
        egret.Tween.removeTweens(this);
        egret.Tween.get(this)
            .wait(2200)
            .call(function () {
            _this._myAnim.visible = true;
            _this._enemyAnim.visible = true;
            _this._myAnim.playWithTime(1);
            _this._enemyAnim.playWithTime(1);
            SoundManager.playEffect(SoundConst.EFFECT_WIFEBATTLEATK);
        });
        var myAnimX = this._myCurWife.x;
        var myAnimY = this._myCurWife.y;
        var enemyAnimX = this._enemyCurWife.x;
        var enemyAnimY = this._enemyCurWife.y;
        egret.Tween.get(this._myCurWife)
            .wait(2200)
            .to({ x: myAnimX + 7, y: myAnimY + 7 }, 50)
            .to({ x: myAnimX - 7, y: myAnimY - 7 }, 50)
            .to({ x: myAnimX + 7, y: myAnimY - 7 }, 50)
            .to({ x: myAnimX - 7, y: myAnimY + 7 }, 50)
            .to({ x: myAnimX, y: myAnimY });
        egret.Tween.get(this._enemyCurWife)
            .wait(2200)
            .to({ x: enemyAnimX + 7, y: enemyAnimY + 7 }, 50)
            .to({ x: enemyAnimX - 7, y: enemyAnimY - 7 }, 50)
            .to({ x: enemyAnimX + 7, y: enemyAnimY - 7 }, 50)
            .to({ x: enemyAnimX - 7, y: enemyAnimY + 7 }, 50)
            .to({ x: enemyAnimX, y: enemyAnimY });
        // .wait(500)
        egret.Tween.get(this)
            .wait(2400)
            .call(this.overRound, this);
    };
    AcCrossServerWifeBattleBattleView.prototype.enemyTalk = function (type) {
        var _this = this;
        if (!this._enemyTalkBg) {
            this._enemyTalkBg = BaseBitmap.create("wifebattleview_talkbg");
            this._enemyTalkTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
            this._enemyTalkTxt.width = 200;
        }
        var talkStr = null;
        if (type == 1) {
            talkStr = LanguageManager.getlocal("wifeBattleBattleWinTalk");
        }
        else {
            var talkIndex = Math.floor(Math.random() * 20) + 1;
            talkStr = LanguageManager.getlocal("wifeBattleBattleTalk" + talkIndex);
        }
        this._enemyTalkTxt.text = talkStr;
        this._enemyTalkBg.width = this._enemyTalkTxt.width + 40;
        this._enemyTalkBg.height = this._enemyTalkTxt.height + 40 + 20;
        this._enemyTalkBg.scaleX = -1;
        this._enemyTalkBg.x = 200 + this._enemyTalkBg.width;
        this._enemyTalkBg.y = this._enemyNameY - 170 - this._enemyTalkBg.height;
        this.addChild(this._enemyTalkBg);
        this._enemyTalkTxt.x = this._enemyTalkBg.x - this._enemyTalkBg.width + this._enemyTalkBg.width / 2 - this._enemyTalkTxt.width / 2;
        this._enemyTalkTxt.y = this._enemyTalkBg.y + this._enemyTalkBg.height / 2 - this._enemyTalkTxt.height / 2 - 10;
        this.addChild(this._enemyTalkTxt);
        this._enemyTalkBg.visible = false;
        this._enemyTalkTxt.visible = false;
        if (type == 1) {
            if (this._enemyCurWife) {
                var curRoundData = this._fightarr.info[this._curRound];
                egret.Tween.get(this._enemyCurWife)
                    .call(function () {
                    _this._enemyTalkBg.visible = true;
                    _this._enemyTalkTxt.visible = true;
                })
                    .wait(1000)
                    .call(function () {
                    _this._enemyTalkBg.visible = false;
                    _this._enemyTalkTxt.visible = false;
                });
            }
        }
        else {
            if (this._enemyCurWife) {
                var curRoundData = this._fightarr.info[this._curRound];
                //1胜利  2平局  0负
                //干掉失败的形象
                var waitTime = 0;
                if (curRoundData[10] != 1) {
                    waitTime = 1000;
                }
                egret.Tween.get(this._enemyCurWife)
                    .wait(waitTime)
                    .to({ scaleX: 0.5, scaleY: 0.5 }, 100)
                    .call(function () {
                    _this._enemyTalkBg.visible = true;
                    _this._enemyTalkTxt.visible = true;
                    // this._enemyCurWife.scaleX = 0.5;
                    // this._enemyCurWife.scaleY = 0.5;
                })
                    .wait(1000)
                    .call(function () {
                    _this._enemyTalkBg.visible = false;
                    _this._enemyTalkTxt.visible = false;
                    // this._enemyCurWife.scaleX = 0.4;
                    // this._enemyCurWife.scaleY = 0.4;
                })
                    .to({ scaleX: 0.4, scaleY: 0.4 }, 100);
            }
        }
    };
    AcCrossServerWifeBattleBattleView.prototype.myTalk = function (type) {
        var _this = this;
        if (!this._myTalkBg) {
            this._myTalkBg = BaseBitmap.create("wifebattleview_talkbg");
            this._myTalkTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
            this._myTalkTxt.width = 200;
        }
        var talkStr = null;
        if (type == 1) {
            talkStr = LanguageManager.getlocal("wifeBattleBattleWinTalk");
        }
        else {
            var talkIndex = Math.floor(Math.random() * 20) + 1;
            talkStr = LanguageManager.getlocal("wifeBattleBattleTalk" + talkIndex);
        }
        this._myTalkTxt.text = talkStr;
        this._myTalkBg.width = this._myTalkTxt.width + 40;
        this._myTalkBg.height = this._myTalkTxt.height + 40 + 20;
        this._myTalkBg.x = GameConfig.stageWidth - 200 - this._myTalkBg.width;
        this._myTalkBg.y = this._myNameY - 170 - this._myTalkBg.height;
        this.addChild(this._myTalkBg);
        this._myTalkTxt.x = this._myTalkBg.x + this._myTalkBg.width / 2 - this._myTalkTxt.width / 2;
        this._myTalkTxt.y = this._myTalkBg.y + this._myTalkBg.height / 2 - this._myTalkTxt.height / 2 - 10;
        this.addChild(this._myTalkTxt);
        this._myTalkBg.visible = false;
        this._myTalkTxt.visible = false;
        if (type == 1) {
            egret.Tween.get(this._myCurWife)
                .call(function () {
                _this._myTalkBg.visible = true;
                _this._myTalkTxt.visible = true;
            })
                .wait(1000)
                .call(function () {
                _this._myTalkBg.visible = false;
                _this._myTalkTxt.visible = false;
            });
        }
        else {
            if (this._myCurWife) {
                var curRoundData = this._fightarr.info[this._curRound];
                //1胜利  2平局  0负
                //干掉失败的形象
                var waitTime = 0;
                if (curRoundData[10] == 1) {
                    waitTime = 1000;
                }
                egret.Tween.get(this._myCurWife)
                    .wait(waitTime)
                    .to({ scaleX: 0.5, scaleY: 0.5 }, 100)
                    .call(function () {
                    // this._myCurWife.scaleX = 0.5;
                    // this._myCurWife.scaleY = 0.5;
                    _this._myTalkBg.visible = true;
                    _this._myTalkTxt.visible = true;
                })
                    .wait(1000)
                    .call(function () {
                    // this._myCurWife.scaleX = 0.4;
                    // this._myCurWife.scaleY = 0.4;
                    _this._myTalkBg.visible = false;
                    _this._myTalkTxt.visible = false;
                })
                    .to({ scaleX: 0.4, scaleY: 0.4 }, 100);
            }
        }
    };
    AcCrossServerWifeBattleBattleView.prototype.overRound = function () {
        var _this = this;
        if (this._isPause) {
            return;
        }
        console.log("overRound---");
        // this._myAnim.visible = false;
        // this._enemyAnim.visible = false;
        var curRoundData = this._fightarr.info[this._curRound];
        //1胜利  2平局  0负
        //干掉失败的形象
        var timePlus = 0;
        switch (curRoundData[10]) {
            case 0:
                if (this._myCurWife) {
                    egret.Tween.get(this._myCurWife)
                        .wait(600)
                        .to({ alpha: 0 }, 300);
                }
                if (curRoundData[5] + 1 >= Config.WifebattleCfg.battleTime) {
                    timePlus = 1100;
                    egret.Tween.get(this._enemyCurWife)
                        .wait(600)
                        .call(function () { _this.enemyTalk(1); })
                        .wait(1100)
                        .to({ x: -640 * this._enemyCurWife.scaleX / 2 }, 300);
                }
                this._myCurTalent.text = LanguageManager.getlocal("wifeBattleBattleTalent", ["0"]);
                this._myCurTalent.y = this._myCurProgress.y + this._myCurProgress.height / 2 - this._myCurTalent.height / 2;
                this._enemyCurTalent.text = LanguageManager.getlocal("wifeBattleBattleTalent", [String(curRoundData[11])]);
                this._enemyCurTalent.y = this._enemyCurProgress.y + this._enemyCurProgress.height / 2 - this._enemyCurTalent.height / 2;
                var enemyWifeInfo = this._fightarr.dinfo[curRoundData[1]];
                // this._myCurProgress.setPercentage(0);
                // this._enemyCurProgress.setPercentage(curRoundData[11]/enemyWifeInfo.talent);
                this._myCurProgress.tweenTo(0, 500, null, null, null, 1);
                this._enemyCurProgress.tweenTo(curRoundData[11] / enemyWifeInfo.talent, 500, null, null, null, 1);
                break;
            case 1:
                if (this._enemyCurWife) {
                    egret.Tween.get(this._enemyCurWife)
                        .wait(600)
                        .to({ alpha: 0 }, 300);
                }
                if (curRoundData[4] + 1 >= Config.WifebattleCfg.battleTime) {
                    timePlus = 1100;
                    egret.Tween.get(this._myCurWife)
                        .wait(600)
                        .call(function () { _this.myTalk(1); })
                        .wait(1100)
                        .to({ x: 640 + this._myCurWife.width * this._myCurWife.scaleX / 2 }, 300);
                }
                this._myCurTalent.text = LanguageManager.getlocal("wifeBattleBattleTalent", [String(curRoundData[11])]);
                this._myCurTalent.y = this._myCurProgress.y + this._myCurProgress.height / 2 - this._myCurTalent.height / 2;
                this._enemyCurTalent.text = LanguageManager.getlocal("wifeBattleBattleTalent", ["0"]);
                this._enemyCurTalent.y = this._enemyCurProgress.y + this._enemyCurProgress.height / 2 - this._enemyCurTalent.height / 2;
                var myWifeInfo = this._fightarr.ainfo[curRoundData[0]];
                // this._myCurProgress.setPercentage(curRoundData[11]/myWifeInfo.talent);
                // this._enemyCurProgress.setPercentage(0);
                this._myCurProgress.tweenTo(curRoundData[11] / myWifeInfo.talent, 500, null, null, null, 1);
                this._enemyCurProgress.tweenTo(0, 500, null, null, null, 1);
                break;
            case 2:
                if (this._myCurWife) {
                    egret.Tween.get(this._myCurWife)
                        .wait(600)
                        .to({ alpha: 0 }, 300);
                }
                if (this._enemyCurWife) {
                    egret.Tween.get(this._enemyCurWife)
                        .wait(600)
                        .to({ alpha: 0 }, 300);
                }
                this._myCurTalent.text = LanguageManager.getlocal("wifeBattleBattleTalent", ["0"]);
                this._myCurTalent.y = this._myCurProgress.y + this._myCurProgress.height / 2 - this._myCurTalent.height / 2;
                this._enemyCurTalent.text = LanguageManager.getlocal("wifeBattleBattleTalent", ["0"]);
                this._enemyCurTalent.y = this._enemyCurProgress.y + this._enemyCurProgress.height / 2 - this._enemyCurTalent.height / 2;
                // this._myCurProgress.setPercentage(0);
                // this._enemyCurProgress.setPercentage(0);
                this._myCurProgress.tweenTo(0, 500, null, null, null, 1);
                this._enemyCurProgress.tweenTo(0, 500, null, null, null, 1);
                break;
        }
        var nextRoundData = this._fightarr.info[this._curRound + 1];
        if (nextRoundData) {
            //我方数据初始化
            this._myWifeCount.text = LanguageManager.getlocal("wifeBattleBattleWifeCount", [String(nextRoundData[6])]);
            this._myTotalTalent.text = LanguageManager.getlocal("wifeBattleBattleTotalTalent", [String(nextRoundData[8])]);
            this._myTotalTalent.x = GameConfig.stageWidth / 2 - this._myTotalTalent.width / 2;
            // this._myBProgress.setPercentage(nextRoundData[8]/this._myMaxTalent);
            this._myBProgress.tweenTo(nextRoundData[8] / this._myMaxTalent, 500, null, null, null, 1);
            //敌方数据初始化
            this._enemyWifeCount.text = LanguageManager.getlocal("wifeBattleBattleWifeCount", [String(nextRoundData[7])]);
            this._enemyTotalTalent.text = LanguageManager.getlocal("wifeBattleBattleTotalTalent", [String(nextRoundData[9])]);
            this._enemyTotalTalent.x = GameConfig.stageWidth / 2 - this._enemyTotalTalent.width / 2;
            // this._enemyBProgress.setPercentage(nextRoundData[9]/this._enemyMaxTalent);
            this._enemyBProgress.tweenTo(nextRoundData[9] / this._enemyMaxTalent, 500, null, null, null, 1);
        }
        else {
            //1胜利  2平局  0负
            var myWifeCount = curRoundData[6];
            var enemyWifeCount = curRoundData[7];
            var myTotal = 0;
            var enemyTotal = 0;
            var blood = curRoundData[2] > curRoundData[3] ? curRoundData[3] : curRoundData[2];
            myTotal = curRoundData[8] - blood;
            enemyTotal = curRoundData[9] - blood;
            this._myWifeCount.text = LanguageManager.getlocal("wifeBattleBattleWifeCount", [String(myWifeCount)]);
            this._myTotalTalent.text = LanguageManager.getlocal("wifeBattleBattleTotalTalent", [String(myTotal)]);
            this._myTotalTalent.x = GameConfig.stageWidth / 2 - this._myTotalTalent.width / 2;
            // this._myBProgress.setPercentage(myTotal/this._myMaxTalent);
            this._myBProgress.tweenTo(myTotal / this._myMaxTalent, 500, null, null, null, 1);
            //敌方数据初始化
            this._enemyWifeCount.text = LanguageManager.getlocal("wifeBattleBattleWifeCount", [String(enemyWifeCount)]);
            this._enemyTotalTalent.text = LanguageManager.getlocal("wifeBattleBattleTotalTalent", [String(enemyTotal)]);
            this._enemyTotalTalent.x = GameConfig.stageWidth / 2 - this._enemyTotalTalent.width / 2;
            // this._enemyBProgress.setPercentage(enemyTotal/this._enemyMaxTalent);
            this._enemyBProgress.tweenTo(enemyTotal / this._enemyMaxTalent, 500, null, null, null, 1);
        }
        egret.Tween.removeTweens(this);
        egret.Tween.get(this)
            .wait(900 + timePlus)
            .call(this.overRoundCardRun, this);
    };
    AcCrossServerWifeBattleBattleView.prototype.overRoundCardRun = function () {
        console.log("overRoundCardRun");
        if (this._isPause) {
            return;
        }
        var curRoundData = this._fightarr.info[this._curRound];
        var nextRoundData = this._fightarr.info[this._curRound + 1];
        if (curRoundData && nextRoundData) {
            if (curRoundData[0] != nextRoundData[0]) {
                //自己方移动 visible
                // this._mySelectCard
                var tempCard = this._mySelectCard;
                this._mySelectCard = this._myWifeCardList[tempCard["index"] + 1];
                this._myCardContainer.setChildIndex(this._mySelectCard, this._myMaxNum);
                App.DisplayUtil.changeToGray(tempCard);
                tempCard["select"].visible = false;
                tempCard.setScale(0.85);
                tempCard.x = this._myCardContainer.width / 2 - tempCard.width * tempCard.scaleX / 2 + 70 * tempCard["index"];
                tempCard.y = this._myCardContainer.height / 2 - tempCard.height * tempCard.scaleY / 2;
                this._mySelectCard["select"].visible = true;
                this._mySelectCard.setScale(1);
                this._mySelectCard.x = this._myCardContainer.width / 2 - this._mySelectCard.width * this._mySelectCard.scaleX / 2 + 70 * this._mySelectCard["index"];
                this._mySelectCard.y = this._myCardContainer.height / 2 - this._mySelectCard.height * this._mySelectCard.scaleY / 2;
                this._myCardContainer.setChildIndex(tempCard, this._myCardContainer.getChildIndex(this._mySelectCard) - 1);
                // this._myCardContainer.setChildIndex(tempCard,tempCard["index"]);
                egret.Tween.get(this._myCardContainer)
                    .to({ x: this._myCardContainer.x - 70 }, 400);
            }
            if (curRoundData[1] != nextRoundData[1]) {
                var tempCard = this._enemySelectCard;
                this._enemySelectCard = this._enemyWifeCardList[tempCard["index"] + 1];
                this._enemyCardContainer.setChildIndex(this._enemySelectCard, this._enemyMaxNum);
                App.DisplayUtil.changeToGray(tempCard);
                tempCard["select"].visible = false;
                tempCard.setScale(0.85);
                tempCard.x = this._enemyCardContainer.width / 2 - tempCard.width * tempCard.scaleX / 2 - 70 * tempCard["index"];
                tempCard.y = this._enemyCardContainer.height / 2 - tempCard.height * tempCard.scaleY / 2;
                this._enemySelectCard["select"].visible = true;
                this._enemySelectCard.setScale(1);
                this._enemySelectCard.x = this._enemyCardContainer.width / 2 - this._enemySelectCard.width * this._enemySelectCard.scaleX / 2 - 70 * this._enemySelectCard["index"];
                this._enemySelectCard.y = this._enemyCardContainer.height / 2 - this._enemySelectCard.height * this._enemySelectCard.scaleY / 2;
                this._enemyCardContainer.setChildIndex(tempCard, this._enemyCardContainer.getChildIndex(this._enemySelectCard) - 1);
                // this._enemyCardContainer.setChildIndex(tempCard,tempCard["index"]);
                egret.Tween.get(this._enemyCardContainer)
                    .to({ x: this._enemyCardContainer.x + 70 }, 400);
            }
            egret.Tween.removeTweens(this);
            egret.Tween.get(this)
                .wait(600)
                .call(this.playNext, this);
        }
        else {
            this.playOver();
        }
    };
    AcCrossServerWifeBattleBattleView.prototype.playNext = function () {
        this._curRound++;
        this.beginRound();
    };
    AcCrossServerWifeBattleBattleView.prototype.playOver = function () {
        this.stopBattle();
        this.battleOver();
    };
    AcCrossServerWifeBattleBattleView.prototype.initCards = function () {
        var myCardDataList = [];
        this._myWifeCardList = [];
        this._enemyWifeCardList = [];
        for (var key in this._fightarr.ainfo) {
            var info = this._fightarr.ainfo[key];
            var obj = { wifeId: key, idx: info.idx };
            myCardDataList.push(obj);
        }
        myCardDataList = myCardDataList.sort(function (w1, w2) {
            return w1.idx - w2.idx;
        });
        var enemyCardDataList = [];
        for (var key in this._fightarr.dinfo) {
            var info = this._fightarr.dinfo[key];
            var obj = { wifeId: key, idx: info.idx };
            enemyCardDataList.push(obj);
        }
        enemyCardDataList = enemyCardDataList.sort(function (w1, w2) {
            return w1.idx - w2.idx;
        });
        this._myMaxNum = myCardDataList.length;
        this._enemyMaxNum = enemyCardDataList.length;
        var offX = 70;
        var scale = 0.85;
        var curCard = null;
        for (var i = 0; i < enemyCardDataList.length; i++) {
            var enemyCardData = enemyCardDataList[i];
            var card = this.createCard(enemyCardData.wifeId, i, false);
            card.setScale(scale);
            this._enemyCardContainer.addChild(card);
            if (i == 0) {
                this._enemySelectCard = card;
                card.setScale(1);
                card["select"].visible = true;
            }
            card.x = this._enemyCardContainer.width / 2 - card.width * card.scaleX / 2 - offX * i;
            card.y = this._enemyCardContainer.height / 2 - card.height * card.scaleY / 2;
            if (curCard != null) {
                this._enemyCardContainer.setChildIndex(card, this._enemyCardContainer.getChildIndex(curCard));
            }
            // this._enemyCardContainer.addChildAt(card,this._enemyMaxNum - i);
            this._enemyWifeCardList.push(card);
            curCard = card;
        }
        curCard = null;
        for (var i = 0; i < myCardDataList.length; i++) {
            var myCardData = myCardDataList[i];
            var card = this.createCard(myCardData.wifeId, i, true);
            card.setScale(scale);
            this._myCardContainer.addChild(card);
            if (i == 0) {
                this._mySelectCard = card;
                card.setScale(1);
                card["select"].visible = true;
            }
            card.x = this._myCardContainer.width / 2 - card.width * card.scaleX / 2 + offX * i;
            card.y = this._myCardContainer.height / 2 - card.height * card.scaleY / 2;
            if (curCard != null) {
                this._myCardContainer.setChildIndex(card, this._myCardContainer.getChildIndex(curCard));
            }
            // this._myCardContainer.addChildAt(card,this._myMaxNum - i);
            this._myWifeCardList.push(card);
            curCard = card;
        }
    };
    AcCrossServerWifeBattleBattleView.prototype.createCard = function (wifeId, index, isMy) {
        var card = new BaseDisplayObjectContainer();
        card.width = 128;
        card.height = 162;
        var bg = BaseBitmap.create("wifebattlebattleview_cardbg");
        bg.x = 0;
        bg.y = 0;
        card.addChild(bg);
        var info = null;
        if (isMy) {
            info = this._fightarr.ainfo[wifeId];
        }
        else {
            info = this._fightarr.dinfo[wifeId];
        }
        var wifeInfo = Config.WifeCfg.getWifeCfgById(wifeId); //Api.wifeVoApi.getWifeInfoVoById(wifeId);
        var wifeSkinInfo = null;
        var iconStr = null;
        // console.log("wifeId-->",wifeId,"wifeInfo->",wifeInfo);
        // if(wifeId==101){
        //     console.log(info);
        // }
        if ((info.skin && !(info.sexflag && info.sexflag >= 1)) || (info.maleskin && info.sexflag && info.sexflag >= 1)) {
            // iconStr = "wife_skinhalf_"+info.skin;
            if (info.sexflag && info.sexflag >= 1) {
                wifeSkinInfo = Config.WifeskinCfg.getWifeCfgById(info.maleskin);
                iconStr = wifeSkinInfo.getIcon(true);
            }
            else {
                wifeSkinInfo = Config.WifeskinCfg.getWifeCfgById(info.skin);
                iconStr = wifeSkinInfo.getIcon(false);
            }
        }
        else {
            // iconStr = "wife_half_"+wifeId;
            //没有皮肤
            if (info.sexflag && info.sexflag >= 1) {
                iconStr = wifeInfo.getIcon(true);
            }
            else {
                iconStr = wifeInfo.getIcon(false);
            }
        }
        var icon = BaseLoadBitmap.create(iconStr);
        icon.width = 205;
        icon.height = 196;
        icon.setScale(0.7);
        icon.x = card.width / 2 - icon.width * icon.scaleX / 2;
        icon.y = 0;
        card.addChild(icon);
        var mask = BaseBitmap.create("wifebattlebattleview_cardmask");
        card.addChild(mask);
        icon.mask = mask;
        var fg = BaseBitmap.create("wifebattlebattleview_cardfg");
        fg.x = 0;
        fg.y = 0;
        card.addChild(fg);
        var nameSize = 18;
        if (PlatformManager.checkIsViSp()) {
            nameSize = 16;
        }
        var name = ComponentManager.getTextField(wifeInfo.getName(info.sexflag && info.sexflag >= 1), nameSize, TextFieldConst.COLOR_BROWN);
        if (PlatformManager.checkIsViSp()) {
            name.width = 100;
            name.textAlign = egret.HorizontalAlign.CENTER;
            name.y = card.height - 25 - name.height / 2;
        }
        else {
            name.y = card.height - 10 - name.height;
        }
        name.x = card.width / 2 - name.width / 2;
        card.addChild(name);
        var select = BaseBitmap.create("wifebattlebattleview_select");
        select.width = card.width + 10;
        select.height = card.height + 10;
        select.x = -5;
        select.y = -5;
        card.addChild(select);
        card["select"] = select;
        card["index"] = index;
        select.visible = false;
        return card;
    };
    AcCrossServerWifeBattleBattleView.prototype.stepBtnHandler = function () {
        this.stopBattle();
        this.battleOver();
    };
    AcCrossServerWifeBattleBattleView.prototype.stopBattle = function () {
        this._isPause = true;
    };
    AcCrossServerWifeBattleBattleView.prototype.battleOver = function () {
        this.stopBattle();
        ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIFEBATTLERESULTVIEW, {
            point: this._point,
            rewardnum: this._rewardnum,
            winflag: this._winflag,
            callback: this.hide,
            isReview: this._isReview,
            target: this
        });
    };
    AcCrossServerWifeBattleBattleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifebattlebattleview_blackbg",
            "wifebattlebattleview_bprogressbar",
            "wifebattlebattleview_bprogressbg",
            "wifebattlebattleview_cardbg",
            "wifebattlebattleview_cardfg",
            "wifebattlebattleview_flower1",
            "wifebattlebattleview_flower2",
            "wifebattlebattleview_playercardbg",
            "wifebattlebattleview_progresslight",
            "wifebattlebattleview_select",
            "wifebattlebattleview_step",
            "wifebattlebattleview_skinnamebg",
            "wifebattlebattleview_sprogressbar",
            "wifebattlebattleview_sprogressbg",
            "wifebattlebattleview_wifenamebg",
            "wifebattlebattleview_wifenamefg",
            "wifebattlebattleview_cardmask"
        ]);
    };
    AcCrossServerWifeBattleBattleView.prototype.dispose = function () {
        if (this) {
            egret.Tween.removeTweens(this);
        }
        this._fightarr = null;
        this._point = 0;
        this._rewardnum = 0;
        this._winflag = 0;
        this._callback = null;
        this._target = null;
        if (this._stepBtn) {
            egret.Tween.removeTweens(this._stepBtn);
        }
        this._stepBtn = null;
        //我方
        this._myWifeCount = null;
        this._myTotalTalent = null;
        this._myCardContainer = null;
        this._myBProgress = null;
        this._myWifeCardList = null;
        this._myCurSkinNameBg = null;
        this._myCurProgress = null;
        this._myCurWifeName = null;
        this._myCurSkinName = null;
        this._myCurTalent = null;
        this._myCurWifeContainer = null;
        //敌人
        this._enemyWifeCount = null;
        this._enemyTotalTalent = null;
        this._enemyCardContainer = null;
        this._enemyBProgress = null;
        this._enemyWifeCardList = null;
        this._enemyCurSkinNameBg = null;
        this._enemyCurProgress = null;
        this._enemyCurWifeName = null;
        this._enemyCurSkinName = null;
        this._enemyCurTalent = null;
        this._enemyCurWifeContainer = null;
        // this._myCardDataList = null;
        // this._enemyCardDataList= null;
        this._myCurIndex = 0;
        this._enemyCurIndex = 0;
        this._curRound = 0;
        this._myNameBg = null;
        this._enemyNameBg = null;
        if (this._myCurWife) {
            egret.Tween.removeTweens(this._myCurWife);
        }
        this._myCurWife = null;
        if (this._enemyCurWife) {
            egret.Tween.removeTweens(this._enemyCurWife);
        }
        this._enemyCurWife = null;
        this._myMaxTalent = 0;
        this._enemyMaxTalent = 0;
        this._mySelectCard = null;
        this._enemySelectCard = null;
        this._myMaxNum = 0;
        this._enemyMaxNum = 0;
        this._myCurWifeStr = null;
        this._enemyCurWifeStr = null;
        this._enemyNameY = 0;
        this._myNameY = 0;
        this._myAnim = null;
        this._enemyAnim = null;
        this._myTalkBg = null;
        this._myTalkTxt = null;
        this._enemyTalkBg = null;
        this._enemyTalkTxt = null;
        this._isPause = false;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeBattleBattleView;
}(BaseView));
__reflect(AcCrossServerWifeBattleBattleView.prototype, "AcCrossServerWifeBattleBattleView");
