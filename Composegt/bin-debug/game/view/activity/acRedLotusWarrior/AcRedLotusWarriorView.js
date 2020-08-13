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
 * 红莲活动
 * @author jiangliuyang
 */
var AcRedLotusWarriorView = (function (_super) {
    __extends(AcRedLotusWarriorView, _super);
    function AcRedLotusWarriorView() {
        var _this = _super.call(this) || this;
        _this._npcBM = null;
        _this._npcEffect = null;
        //敌人图片
        _this._enemyList = [];
        /**士兵1 */
        _this._assaultList1 = [];
        /**士兵2 */
        _this._assaultList2 = [];
        /**士兵1 */
        _this._assaultList3 = [];
        _this._enemyContainer = null;
        _this._isShake = false;
        _this._npcClip1 = null;
        _this._npcClip2 = null;
        _this._buttomBg = null;
        _this._isPlayAni = false;
        _this._rewards = null;
        _this._otherRewards = null;
        _this._showTip = null;
        _this._isWin = false;
        _this._talkContainer = null;
        _this._skinContainer = null;
        _this._userItem = null;
        _this._userItemBM = null;
        _this._centerBg = null;
        _this._centerText = null;
        // 吕布的缩放值
        _this.lvbuScale = 1;
        _this._randomTalkContainer = null;
        _this._randomTalkBg = null;
        _this._randomTalkText = null;
        // 吕布的x
        _this.lvbuX = 0;
        // 吕布的y
        _this.lvbuY = 0;
        _this._enemyPosCfg = [
            { x: 242 + 20, y: 393 + 70, width: 151, height: 122 },
            { x: 353 + 20, y: 406 + 70, width: 154, height: 130 },
            { x: 462 + 20, y: 426 + 70, width: 159, height: 129 },
            { x: 94 + 20, y: 435 + 70, width: 193, height: 142 },
            { x: 236 + 20, y: 473 + 70, width: 187, height: 135 },
            { x: 385 + 20, y: 494 + 70, width: 198, height: 150 },
        ];
        // /**特效配置1 */
        // private _assaultCfg1: { x: number, y: number, alpha: number, scale: number }[] = [
        // 	{ x: -217, y: 313, alpha: 0, scale: 1 },
        // 	{ x: -137, y: 295, alpha: 0, scale: 1 },
        // 	{ x: -39, y: 294, alpha: 0, scale: 1 },
        // 	{ x: 11, y: 246, alpha: 0, scale: 1 },
        // 	{ x: 103, y: 238, alpha: 0, scale: 1 },
        // ]; 
        /**特效配置1 */
        _this._assaultCfg1 = [
            { x: -217 + 100, y: 313, alpha: 0, scale: 1 },
            { x: -137 + 100, y: 295, alpha: 0, scale: 1 },
            { x: -39 + 100, y: 294, alpha: 0, scale: 1 },
            { x: 11 + 100, y: 246, alpha: 0, scale: 1 },
        ];
        /**特效配置2 */
        _this._assaultCfg2 = [
            { x: -180 + 100, y: 345, alpha: 1, scale: 0.985 },
            { x: -101 + 100, y: 327, alpha: 1, scale: 0.985 },
            { x: -3 + 100, y: 326, alpha: 1, scale: 0.985 },
            { x: 47 + 100, y: 278, alpha: 1, scale: 0.985 },
        ];
        /**特效配置3 */
        _this._assaultCfg3 = [
            { x: 184 + 100, y: 605, alpha: 1, scale: 0.87 },
            { x: 264 + 100, y: 587, alpha: 1, scale: 0.87 },
            { x: 362 + 100, y: 586, alpha: 1, scale: 0.87 },
            { x: 412 + 100, y: 538, alpha: 1, scale: 0.87 },
        ];
        /**特效配置4 */
        _this._assaultCfg4 = [
            { x: 298 + 100, y: 689, alpha: 1, scale: 0.84 },
            { x: 378 + 100, y: 671, alpha: 1, scale: 0.84 },
            { x: 476 + 100, y: 670, alpha: 1, scale: 0.84 },
            { x: 526 + 100, y: 622, alpha: 1, scale: 0.84 },
        ];
        /**特效配置5 */
        _this._assaultCfg5 = [
            { x: 413 + 100, y: 762, alpha: 0, scale: 0.8 },
            { x: 493 + 100, y: 754, alpha: 0, scale: 0.8 },
            { x: 591 + 100, y: 753, alpha: 0, scale: 0.8 },
            { x: 641 + 100, y: 705, alpha: 0, scale: 0.8 },
        ];
        _this.code3CastleposCfg = [
            { "x": 424, "y": 696, img: "acredlotuswarrior_ground1", scalex: 1, scaley: 1, arrx: -70, arry: 90 },
            { "x": 321, "y": 504, img: "acredlotuswarrior_ground1", scalex: -1, scaley: 1, arrx: 220, arry: 140 },
            { "x": 427, "y": 360, img: "acredlotuswarrior_ground1", scalex: 1, scaley: 1, arrx: -20, arry: 110 },
            { "x": 330, "y": 216, img: "acredlotuswarrior_ground1", scalex: -1, scaley: 1, arrx: 230, arry: 100 },
            { "x": 49, "y": 241, img: "acredlotuswarrior_ground2", scalex: -1, scaley: -1, arrx: 310, arry: 70 },
        ];
        _this._code3RedFlag = undefined; //code3的旗子
        _this._code3NumFnt = undefined;
        /**李白部分 诗,code 5、6 */
        _this._wine = null;
        _this._wineBG = null;
        _this._poemContainer = null;
        _this._brush = null;
        _this._paper1 = null;
        _this._paper2 = null;
        _this._paper1_mask = null;
        _this._paper2_mask = null;
        _this._poemText1 = null;
        _this._poemText2 = null;
        _this._redi_timesbg = null;
        _this._wineLight = null;
        _this.height1 = 1;
        _this.height2 = 1;
        _this.ctrl = 0;
        return _this;
    }
    Object.defineProperty(AcRedLotusWarriorView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRedLotusWarriorView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    // 标题背景名称
    AcRedLotusWarriorView.prototype.getTitleBgName = function () {
        return this.getDefaultRes("acredlotuswarrior_title", this.defcode);
    };
    AcRedLotusWarriorView.prototype.getTitleStr = function () {
        return null;
    };
    // 关闭按钮图标名称
    AcRedLotusWarriorView.prototype.getCloseBtnName = function () {
        if (this.defcode == "3") {
            return "btn_win_closebtn";
        }
        else if (this.defcode == "7") {
            return "btn_win_closebtn";
        }
        else {
            return this.getDefaultRes("acredlotuswarrior_closebtn");
        }
        // return this.defcode == "3" ? "btn_win_closebtn" : this.getDefaultRes("acredlotuswarrior_closebtn");
    };
    Object.defineProperty(AcRedLotusWarriorView.prototype, "activityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcRedLotusWarriorView.prototype.initBg = function () {
        var bigBg = BaseLoadBitmap.create(this.getDefaultRes("acredlotuswarrior_bg", this.defcode));
        bigBg.height = 1136;
        bigBg.width = 640;
        bigBg.touchEnabled = true;
        bigBg.y = GameConfig.stageHeigth - 1136;
        this._bigBg = bigBg;
        this.addChild(bigBg);
    };
    Object.defineProperty(AcRedLotusWarriorView.prototype, "defcode", {
        get: function () {
            var defcode = this.code;
            if (this.code == "1" || this.code == "2") {
                defcode = "1";
            }
            else if (this.code == "3" || this.code == "4") {
                defcode = "3";
            }
            else if (this.code == "5" || this.code == "6") {
                defcode = "5";
            }
            else if (this.code == "7") {
                defcode = "7";
            }
            return defcode;
        },
        enumerable: true,
        configurable: true
    });
    AcRedLotusWarriorView.prototype.initView = function () {
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_MACHAOANI, this.playBgAni, this);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_MACHAOTAbANI, this.playEnemyShakeAni, this);
        App.MessageHelper.addNetMessage(NetRequestConst.ACTIVITY_REDLOTUSWARRIORNUMREWARD, this.receiveBoxHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.ACTIVITY_REDLOTUSWARRIORATTACKTHEBOSS, this.getRewardHandler, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REDLOTUSWARRIOR_REFRESHVO, this.refreshData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, this.showDBDragon, this);
        if (this.defcode == "3") {
            var title_img = BaseBitmap.create("acredlotuswarrior_title_word");
            title_img.width = 214;
            title_img.height = 73;
            title_img.y = 2;
            title_img.x = GameConfig.stageWidth / 2 - title_img.width / 2;
            this.addChild(title_img);
        }
        else if (this.defcode == "5") {
            var title_img = BaseBitmap.create("acredlotuswarrior_title_word5");
            // title_img.width = 1;
            // title_img.height = 73;
            title_img.y = 2;
            title_img.x = GameConfig.stageWidth / 2 - title_img.width / 2;
            this.addChild(title_img);
        }
        else if (this.defcode == "7") {
            var title_img = BaseBitmap.create("acredlotuswarrior_title_word7");
            title_img.y = 2;
            title_img.x = GameConfig.stageWidth / 2 - title_img.width / 2;
            this.addChild(title_img);
        }
        if (this.defcode == "7") {
            this.lvbuNode = new BaseDisplayObjectContainer();
            this.lvbuNode.width = 640;
            this.lvbuNode.height = 482;
            this.lvbuNode.anchorOffsetX = 320;
            this.lvbuNode.setScale(this.lvbuScale);
            this.lvbuNode.x = 320; //GameConfig.stageWidth/2;
            this.lvbuNode.y = GameConfig.stageHeigth / 2 - this.lvbuNode.height * this.lvbuScale + 230;
            this.lvbuX = this.lvbuNode.x;
            this.lvbuY = this.lvbuNode.y;
            this.addChild(this.lvbuNode);
            // 吕布
            if (App.DeviceUtil.CheckWebglRenderMode() && App.CommonUtil.check_dragon()) {
                this.boneNode = App.DragonBonesUtil.getLoadDragonBones(Config.ServantskinCfg.getServantSkinItemById(this.cfg.zhentianSkinId).bone);
                this.boneNode.x = 320;
                this.boneNode.y = this.lvbuNode.height - 60;
                this.lvbuNode.addChild(this.boneNode);
                this.boneNode.setScale(0.65);
                var maskShape = BaseBitmap.create("public_9v_bg01");
                maskShape.width = 640;
                maskShape.height = 800;
                // maskShape.scaleY = -1.3;
                maskShape.x = this.lvbuNode.width / 2 - maskShape.width / 2;
                maskShape.y = this.lvbuNode.height - maskShape.height;
                this.lvbuNode.addChild(maskShape);
                this.boneNode.mask = maskShape;
            }
            else {
                this.lvbuImg = BaseLoadBitmap.create(Config.ServantskinCfg.getServantSkinItemById(this.cfg.zhentianSkinId).body); //this.cfg.zhentianSkinId  10341
                this.lvbuImg.width = 640;
                this.lvbuImg.height = 482;
                this.lvbuImg.setScale(0.8);
                this.lvbuImg.x = 320 - this.lvbuImg.width * 0.8 / 2;
                this.lvbuImg.y = this.lvbuNode.height - this.lvbuImg.height * 0.8 - 70;
                this.lvbuNode.addChild(this.lvbuImg);
                var maskShape = BaseBitmap.create("acredlotuswarrior_sermask");
                // maskShape.scaleY = 1.3;
                maskShape.width = 640;
                maskShape.height = 800;
                maskShape.x = this.lvbuNode.width / 2 - maskShape.width / 2;
                maskShape.y = this.lvbuNode.height - maskShape.height;
                this.lvbuNode.addChild(maskShape);
                this.lvbuImg.mask = maskShape;
            }
            //            private _centerBg:BaseBitmap = null;
            // private _centerText:BaseBitmap = null;
            this._centerBg = BaseBitmap.create("acredlotuswarrior_centerbg-7");
            this._centerBg.x = this.lvbuNode.width / 2 - this._centerBg.width / 2;
            this._centerBg.y = this.lvbuNode.height - 85;
            this.lvbuNode.addChild(this._centerBg);
            this._centerText = BaseBitmap.create("acredlotuswarrior_center-7");
            this._centerText.x = this._centerBg.x + this._centerBg.width / 2 - this._centerText.width / 2;
            this._centerText.y = this._centerBg.y + this._centerBg.height / 2 - this._centerText.height / 2;
            this.lvbuNode.addChild(this._centerText);
            if (App.DeviceUtil.CheckWebglRenderMode() && App.CommonUtil.check_dragon()) {
                this._userItem = App.DragonBonesUtil.getLoadDragonBones("acredlotuswarrior_qteffect");
                this._userItem.x = 495;
                this._userItem.y = GameConfig.stageHeigth; //300//70;
                this.addChild(this._userItem);
            }
            else {
                this._userItemBM = BaseBitmap.create("acredlotuswarrior_useritem-7");
                this._userItemBM.x = 455;
                this._userItemBM.y = GameConfig.stageHeigth - this._userItemBM.height + 70; //300//70;
                this.addChild(this._userItemBM);
            }
        }
        //活动规则背景图片
        var acruleTxtBg = null;
        if (this.code == "7") {
            acruleTxtBg = BaseBitmap.create("acredlotuswarrior_detailbg-3");
            acruleTxtBg.y = 72;
            acruleTxtBg.height = 122;
            this.addChild(acruleTxtBg);
        }
        else {
            acruleTxtBg = BaseBitmap.create(this.getDefaultRes("acredlotuswarrior_detailbg", this.defcode));
            acruleTxtBg.y = 72;
            acruleTxtBg.height = 122;
            this.addChild(acruleTxtBg);
        }
        //活动时间   
        var actimeText = ComponentManager.getTextField(LanguageManager.getlocal("acRedLotusWarrior_acTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        actimeText.x = 10;
        actimeText.y = acruleTxtBg.y + 10;
        this.addChild(actimeText);
        var deltaT = this.acVo.et - GameData.serverTime;
        var timeStr = "";
        if (deltaT > 0) {
            timeStr = LanguageManager.getlocal("acRedLotusWarrior_acCd", [App.DateUtil.getFormatBySecond(deltaT, 8)]);
        }
        else {
            timeStr = LanguageManager.getlocal("acRedLotusWarrior_acCd", [LanguageManager.getlocal("acSpringOutingTimeEnd")]);
        }
        //剩余时间
        this.acCdTxt = ComponentManager.getTextField(timeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        // this.acCdTxt.x = actimeText.x + actimeText.width + 20;
        this.acCdTxt.x = GameConfig.stageWidth - 10 - this.acCdTxt.width;
        this.acCdTxt.y = actimeText.y;
        this.addChild(this.acCdTxt);
        if (this.defcode == "3") {
            this._code3RedFlag = BaseBitmap.create("acredlotuswarrior_flag");
            this.initCode3Castle();
            this.addChild(this._code3RedFlag);
            this._code3NumFnt = ComponentManager.getBitmapText("0", "prestige_fnt");
            this._code3NumFnt.x = this._code3RedFlag.x + this._code3RedFlag.width / 2;
            this._code3NumFnt.y = this._code3RedFlag.y + this._code3RedFlag.height / 2 - this._code3RedFlag.height / 2 - 10;
            this.addChild(this._code3NumFnt);
        }
        else if (this.defcode == "5") {
            // this.initPoems();
        }
        else if (this.defcode == "7") {
        }
        else {
            this.initEnemy();
        }
        //活动规则文本
        var acruleTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_desc"), [String(this.cfg.cost), "1", String(this.cfg.helmetItemNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        // acruleTxt.textAlign = egret.HorizontalAlign.CENTER;
        acruleTxt.width = 620;
        acruleTxt.lineSpacing = 5;
        acruleTxt.x = actimeText.x;
        acruleTxt.y = actimeText.y + actimeText.height + 5;
        this.addChild(acruleTxt);
        var createPoem = false;
        //第三套为吕布皮肤，表现形式不一样
        if (this.defcode != "3") {
            // 血条
            var progressStr = this.defcode == '5' ? 'acredlotuswarrior-5_progress' : 'progress_blood';
            this.bloodBar = ComponentManager.getProgressBar(progressStr, progressStr + "bg", 500);
            this.bloodBar.x = GameConfig.stageWidth / 2 - this.bloodBar.width / 2;
            this.bloodBar.y = acruleTxtBg.y + acruleTxtBg.height + 30; //+ (GameConfig.stageHeigth - 960) * 0.4;
            if (this.defcode != '5') {
                this.bloodBar.y += (GameConfig.stageHeigth - 960) * 0.4;
            }
            else {
                this.bloodBar.x += 25;
            }
            if (this.defcode == "7") {
                this.bloodBar.y = acruleTxtBg.y + acruleTxtBg.height + 30;
            }
            this.addChild(this.bloodBar);
            //已经攻击次数
            this.numBg = BaseBitmap.create(this.getDefaultRes("acredlotuswarrior_numbg"));
            this.numBg.x = this.bloodBar.x - this.numBg.width + 20;
            this.addChild(this.numBg);
            var _y = this.bloodBar.y + this.bloodBar.height / 2 - this.numBg.height / 2;
            if (this.defcode == "5") {
                this.numBg.y = _y + 20;
                createPoem = true;
                this.numText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_progress"), [String(this.vo.chipnum < this.cfg.helmetItemNum ? this.vo.chipnum : this.cfg.helmetItemNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
                this.numText.width = TextFieldConst.FONTSIZE_CONTENT_SMALL * 2;
                this.numText.x = this.numBg.x + 24; //this.numBg.width / 2 - this.numText.width / 2;
                this.numText.y = this.numBg.y + 26; //23//48;
                this.numText.textAlign = egret.HorizontalAlign.CENTER;
            }
            else if (this.defcode == "7") {
                this.numBg.y = _y;
                this.initAssault();
                this.numText = ComponentManager.getTextField(String(this.vo.chipnum + "%"), 20, 0xffedb4);
                // this.numText = ComponentManager.getTextField(String(this.cfg.helmetItemNum - this.vo.chipnum < 0 ? 0 : this.cfg.helmetItemNum - this.vo.chipnum), 20, 0xffedb4);
                this.numText.x = this.numBg.x + this.numBg.width / 2 - this.numText.width / 2;
                this.numText.y = this.numBg.y + 48;
            }
            else {
                this.numBg.y = _y;
                this.initAssault();
                this.numText = ComponentManager.getTextField(String(this.cfg.helmetItemNum - this.vo.chipnum < 0 ? 0 : this.cfg.helmetItemNum - this.vo.chipnum), 20, 0xffedb4);
                this.numText.x = this.numBg.x + this.numBg.width / 2 - this.numText.width / 2;
                this.numText.y = this.numBg.y + 48;
            }
            this.addChild(this.numText);
            this.initBox();
        }
        this._skinContainer = new BaseDisplayObjectContainer();
        this.addChild(this._skinContainer);
        this.showDBDragon();
        // 1040
        // if(!Api.switchVoApi.checkServantCloseBone()  && RES.hasRes("servant_full2_"+this.cfg.zhentianSkinId+"_ske") && App.CommonUtil.check_dragon() ){
        //     this._npcBM=App.DragonBonesUtil.getLoadDragonBones("servant_full2_"+this.cfg.zhentianSkinId);
        //     this._npcBM.setScale(0.6);
        //     this._npcBM.x = GameConfig.stageWidth - 100;
        //     this._npcBM.y = GameConfig.stageHeigth - 50;
        //     this.addChild(this._npcBM);
        //     if(RES.hasRes("servant_skineffect_fg_"+this.cfg.zhentianSkinId+"_ske")){
        //         this._npcEffect=App.DragonBonesUtil.getLoadDragonBones("servant_skineffect_fg_"+this.cfg.zhentianSkinId);
        //         this._npcEffect.setScale(0.6);
        //         this._npcEffect.x = GameConfig.stageWidth - 100;
        //         this._npcEffect.y = GameConfig.stageHeigth - 50;
        //         this.addChild(this._npcEffect);
        //     }
        // }else{
        //     let skinW =640;
        //     let skinH = 482;
        //     let tarScale = 1.0;
        //     let serCfg = Config.ServantCfg.getServantItemById(this.cfg.zhentianSkinId);
        //     let skinImgPath = serCfg.fullIcon;
        //     this._npcBM = BaseLoadBitmap.create(skinImgPath);
        //     this._npcBM.width = skinW;
        //     this._npcBM.height = skinH;
        //     this._npcBM.setScale(tarScale);
        //     this._npcBM.x = GameConfig.stageWidth/2 - 100;
        //     this._npcBM.y = GameConfig.stageHeigth - this._npcBM.height;
        //     this.addChild(this._npcBM);
        // }
        // 
        // 底部背景
        var buttomBg = BaseBitmap.create(this.getDefaultRes("acredlotuswarrior_btnbg", this.defcode));
        buttomBg.y = GameConfig.stageHeigth - buttomBg.height;
        this.addChild(buttomBg);
        this._buttomBg = buttomBg;
        if (this.defcode == "3") {
            var buttommask = BaseBitmap.create("acredlotuswarrior_bottom");
            buttommask.y = GameConfig.stageHeigth - buttommask.height;
            this.addChild(buttommask);
            this._buttomBg.visible = false;
        }
        // 攻击
        this.atkButton = ComponentManager.getButton(this.getDefaultRes("acredlotuswarrior_btn"), null, this.atkClick, this);
        this.atkButton.y = buttomBg.y - 15;
        this.addChild(this.atkButton);
        if (this.defcode == '5') {
            var atkb = this.atkButton;
            atkb.x = 230;
            atkb.y = buttomBg.y - 92;
            //饮酒光效
            var light = BaseBitmap.create("dailytask_box_light");
            light.anchorOffsetX = light.width / 2;
            light.anchorOffsetY = light.height / 2;
            light.scaleX = light.scaleY = 3;
            light.x = atkb.x + atkb.width / 2 - 15;
            light.y = atkb.y + atkb.height / 2 + 10;
            var ind = this.getChildIndex(atkb);
            this.addChildAt(light, ind);
            egret.Tween.get(light, { loop: true }).to({ rotation: light.rotation + 360 }, 10000);
            this._wineLight = light;
            var poemIocn = void 0;
            if (this.vo.attacknum >= 10) {
                poemIocn = BaseBitmap.create("acredlotuswarrior_name2-5");
            }
            else {
                poemIocn = BaseBitmap.create("acredlotuswarrior_name-5");
            }
            poemIocn.x = (GameConfig.stageWidth - poemIocn.width) >> 1;
            poemIocn.y = this.atkButton.y + 218;
            this.addChild(poemIocn);
            this._poemIocn = poemIocn;
            var redi_timesbg = BaseBitmap.create("acredlotuswarrior_residual_times-5");
            redi_timesbg.x = 10;
            redi_timesbg.y = poemIocn.y + (poemIocn.height - redi_timesbg.height) - 2;
            this.addChild(redi_timesbg);
            this._redi_timesbg = redi_timesbg;
            this.atkCountTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_atkvalue"), [String(this.vo.attacknum)]), 18, TextFieldConst.COLOR_WARN_YELLOW);
            this.atkCountTxt.x = redi_timesbg.x + 15;
            this.atkCountTxt.y = redi_timesbg.y + 4;
            this.addChild(this.atkCountTxt);
        }
        else if (this.defcode == "3") {
            //平定
            this.atkButton.x = GameConfig.stageWidth / 2 - this.atkButton.width / 2; //buttomBg.x + buttomBg.width / 2 - this.atkButton.width / 2;
            this.atkButton.y = GameConfig.stageHeigth - this.atkButton.height - 10;
            this.btnText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_btn")), 30, TextFieldConst.COLOR_BROWN);
            this.btnText.x = this.atkButton.x + this.atkButton.width / 2 - this.btnText.width / 2;
            this.btnText.y = this.atkButton.y + 23;
            this.addChild(this.btnText);
            //可攻击次数
            this.atkCountTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_atkvalue"), [String(this.vo.attacknum)]), 18, TextFieldConst.COLOR_BROWN);
            this.atkCountTxt.x = this.atkButton.x + this.atkButton.width / 2 - this.atkCountTxt.width / 2;
            this.atkCountTxt.y = this.btnText.y + this.btnText.height + 2;
            this.addChild(this.atkCountTxt);
        }
        else if (this.defcode == "7") {
            this.atkButton.x = buttomBg.x + buttomBg.width / 2 - this.atkButton.width / 2;
            this.btnText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_btn")), 30, TextFieldConst.COLOR_BROWN);
            this.btnText.x = this.atkButton.x + this.atkButton.width / 2 - this.btnText.width / 2;
            this.btnText.y = this.atkButton.y + this.atkButton.height / 2 - this.btnText.height / 2;
            this.addChild(this.btnText);
            //可攻击次数
            this.atkCountTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_atkvalue"), [String(this.vo.attacknum)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            this.atkCountTxt.x = this.atkButton.x + this.atkButton.width / 2 - this.atkCountTxt.width / 2;
            this.atkCountTxt.y = this.btnText.y + this.btnText.height + 27;
            this.addChild(this.atkCountTxt);
        }
        else {
            this.atkButton.x = buttomBg.x + buttomBg.width / 2 - this.atkButton.width / 2;
            this.btnText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_btn")), 30, TextFieldConst.COLOR_BROWN);
            this.btnText.x = this.atkButton.x + this.atkButton.width / 2 - this.btnText.width / 2;
            this.btnText.y = this.atkButton.y + 23;
            this.addChild(this.btnText);
            //可攻击次数
            this.atkCountTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_atkvalue"), [String(this.vo.attacknum)]), 18, TextFieldConst.COLOR_BROWN);
            this.atkCountTxt.x = this.atkButton.x + this.atkButton.width / 2 - this.atkCountTxt.width / 2;
            this.atkCountTxt.y = this.btnText.y + this.btnText.height + 2;
            this.addChild(this.atkCountTxt);
        }
        if (this.code == "2") {
            var off = BaseLoadBitmap.create("acredlotuswarrior_off");
            off.width = 150;
            off.height = 122;
            off.x = this.atkButton.x - 50;
            off.y = this.atkButton.y - 70;
            this.addChild(off);
        }
        var infoBtn = ComponentManager.getButton("acredlotuswarrior_infobtn", null, this.infoBtnListener, this);
        infoBtn.x = GameConfig.stageWidth - infoBtn.width - 10;
        infoBtn.y = GameConfig.stageHeigth - infoBtn.height - 25;
        this.addChild(infoBtn);
        this.refreshData();
        this.checkIsWin();
        if (this.defcode == "7") {
            this.randomSay();
        }
        else {
            this._talkContainer = new BaseDisplayObjectContainer();
            var talkBg = BaseBitmap.create(this.getDefaultRes("acredlotuswarrior_talkbg"));
            talkBg.x = 0;
            talkBg.y = 0;
            this._talkContainer.width = talkBg.width;
            this._talkContainer.height = talkBg.height;
            this._talkContainer.addChild(talkBg);
            var talkText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_talk")), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
            // talkText.width = 300;
            talkText.x = talkBg.width / 2 - talkText.width / 2;
            talkText.y = 55 - talkText.height / 2;
            this._talkContainer.addChild(talkText);
            this._talkContainer.x = 70;
            this._talkContainer.y = GameConfig.stageHeigth - 375;
            this.addChild(this._talkContainer);
            this._talkContainer.visible = false;
            if (this.defcode == "3") {
                // talkBg.scaleX = -1;
                this._talkContainer.x = 170;
                this._talkContainer.y = GameConfig.stageHeigth - 450;
                talkText.x = talkBg.x + talkBg.width / 2 - talkText.width / 2;
            }
        }
        if (createPoem) {
            this.initPoems();
        }
        if (this.defcode == "7") {
            // if (AcBuildingWorshipView.reportShowed[this.code] == 0) {
            if (this.vo.chipnum < this.cfg.helmetItemNum) {
                ViewController.getInstance().openView(ViewConst.BASE.ACREDLOTUSWARRIORREPORTVIEW, { aid: this.aid, code: this.code });
            }
            // AcBuildingWorshipView.reportShowed[this.code] = 1;
            // }
        }
    };
    AcRedLotusWarriorView.prototype.attackHandle = function () {
        var _this = this;
        this.randomAtkSay();
        var moveTime1 = 60;
        var moveTime2 = 260;
        var scaleTo = 0.85;
        var moveX = this.lvbuNode.x + this.lvbuNode.width / 2 - this.lvbuNode.width * 0.85 / 2;
        var moveY = GameConfig.stageHeigth - 600;
        var moveTo = egret.Point.create(moveX, moveY);
        console.log(moveTo.x);
        egret.Tween.get(this.lvbuNode)
            .wait(720)
            .call(function () {
            _this.showCode7Ani();
        }, this)
            .wait(80)
            .to({ x: this.lvbuNode.x, y: this.lvbuNode.y - 100 }, 300) //后移	
            .to({ y: moveTo.y, scaleX: scaleTo, scaleY: scaleTo, }, moveTime1)
            .call(this.playShake7, this)
            .to({ x: this.lvbuX, y: this.lvbuY, scaleX: this.lvbuScale, scaleY: this.lvbuScale }, moveTime2)
            .call(this.stopShake, this);
        // egret.Tween.get(this.lvbuNode)
        // .to({x : this.lvbuX, y : this.lvbuY - 50},100)//后移		
        // .to({x:this.lvbuX,y:this.lvbuY},120)    
        // let moveTime1:number = 60;
        // let moveTime2:number = 260;
        // let scaleTo:number = 0.75;
        // let moveY = GameConfig.stageHeigth;
        // let moveTo:egret.Point = egret.Point.create( this.lvbuNode.x + (1-scaleTo)*this.lvbuNode.width/2 ,moveY);
        // egret.Tween.get(this.lvbuNode)
        // .wait(7000)
        // .to({x : this.lvbuNode.x, y : this.lvbuNode.y - 100},300)//后移		
        // .call( this.showCode7Ani,this);
        // .to({x:moveTo.x,y:moveTo.y,scaleX:scaleTo,scaleY:scaleTo,},moveTime1)
        // .call(()=>{
        //     this.beAttackHand(false);
        // },this)
        // .to({x:this.lvbuX,y:this.lvbuY,scaleX : this.lvbuScale, scaleY : this.lvbuScale},moveTime2)
        // .call(()=>{
        //     this.attackWanjiaHandle();
        // });
    };
    AcRedLotusWarriorView.prototype.randomAtkSay = function () {
        if (!this._randomTalkContainer) {
            this._randomTalkContainer = new BaseDisplayObjectContainer();
            this.addChild(this._randomTalkContainer);
            this._randomTalkBg = BaseBitmap.create("acredlotuswarrior_talkbg-7");
            this._randomTalkBg.scaleX = 0.65;
            this._randomTalkBg.scaleY = 0.65;
            this._randomTalkContainer.addChild(this._randomTalkBg);
            this._randomTalkBg.x = GameConfig.stageWidth / 2 + 90;
            this._randomTalkBg.y = GameConfig.stageHeigth / 2 - 220;
        }
        var randomTalkTextId = Math.floor(Math.random() * 5) + 1;
        var randomTalkTextKey = "acRedLotusWarrior_talkA" + randomTalkTextId + "-7";
        if (!this._randomTalkText) {
            this._randomTalkText = ComponentManager.getTextField(LanguageManager.getlocal(randomTalkTextKey), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._randomTalkContainer.addChild(this._randomTalkText);
        }
        if (this._randomTalkText) {
            this._randomTalkText.text = LanguageManager.getlocal(randomTalkTextKey);
        }
        this._randomTalkText.x = this._randomTalkBg.x + 20;
        this._randomTalkText.y = this._randomTalkBg.y + 20;
        egret.Tween.removeTweens(this._randomTalkContainer);
        this._randomTalkContainer.visible = false;
        egret.Tween.get(this._randomTalkContainer)
            .set({ visible: true })
            .to({ alpha: 1 }, 200)
            .wait(1000)
            .to({ alpha: 0 }, 200)
            .set({ visible: false });
        // .call(()=>{
        //     egret.Tween.removeTweens(this._randomTalkContainer);
        //     this.randomSay();
        // },this);  
    };
    AcRedLotusWarriorView.prototype.randomSay = function () {
        var _this = this;
        if (!this._randomTalkContainer) {
            this._randomTalkContainer = new BaseDisplayObjectContainer();
            this.addChild(this._randomTalkContainer);
            this._randomTalkBg = BaseBitmap.create("acredlotuswarrior_talkbg-7");
            this._randomTalkBg.scaleX = 0.65;
            this._randomTalkBg.scaleY = 0.65;
            this._randomTalkContainer.addChild(this._randomTalkBg);
            this._randomTalkBg.x = GameConfig.stageWidth / 2 + 90;
            this._randomTalkBg.y = GameConfig.stageHeigth / 2 - 220;
        }
        var randomTalkTextId = Math.floor(Math.random() * 5) + 1;
        var randomTalkTextKey = "acRedLotusWarrior_talk" + randomTalkTextId + "-7";
        if (!this._randomTalkText) {
            this._randomTalkText = ComponentManager.getTextField(LanguageManager.getlocal(randomTalkTextKey), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._randomTalkContainer.addChild(this._randomTalkText);
        }
        if (this._randomTalkText) {
            this._randomTalkText.text = LanguageManager.getlocal(randomTalkTextKey);
        }
        this._randomTalkText.x = this._randomTalkBg.x + 20;
        this._randomTalkText.y = this._randomTalkBg.y + 20;
        egret.Tween.get(this._randomTalkContainer)
            .set({ visible: true })
            .to({ alpha: 1 }, 200)
            .wait(3000)
            .to({ alpha: 0 }, 200)
            .set({ visible: false })
            .wait(3000)
            .call(function () {
            egret.Tween.removeTweens(_this._randomTalkContainer);
            _this.randomSay();
        }, this);
    };
    AcRedLotusWarriorView.prototype.getSoundBgName = function () {
        return SoundConst.MUSIC_ALLIANCEBOSSBATTLE;
    };
    AcRedLotusWarriorView.prototype.showDBDragon = function () {
        if (this.defcode == "7") {
            return;
        }
        if (!Api.switchVoApi.checkServantCloseBone() && RES.hasRes("servant_full2_" + this.cfg.zhentianSkinId + "_ske") && App.CommonUtil.check_dragon()) {
            if (this._npcBM == null) {
                var _npcBM_1 = App.DragonBonesUtil.getLoadDragonBones("servant_full2_" + this.cfg.zhentianSkinId);
                this._npcBM = _npcBM_1;
                _npcBM_1.setScale(0.6);
                this._skinContainer.addChild(_npcBM_1);
                if (this.defcode == "3") {
                    // this._npcBM.setScale(0.5);
                    _npcBM_1.x = 120;
                    _npcBM_1.y = GameConfig.stageHeigth - 100;
                }
                else if (this.defcode == "5") {
                    _npcBM_1.setScale(0.8);
                    _npcBM_1.x = ((GameConfig.stageWidth - _npcBM_1.width) >> 1) - 28;
                    _npcBM_1.y = GameConfig.stageHeigth - 170;
                    _npcBM_1.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, function () {
                        _npcBM_1.playDragonMovie('idle', 0);
                    }, this);
                }
                else {
                    _npcBM_1.x = GameConfig.stageWidth - 100;
                    _npcBM_1.y = GameConfig.stageHeigth - 50;
                }
            }
            if (RES.hasRes("servant_skineffect_fg_" + this.cfg.zhentianSkinId + "_ske")) {
                if (this._npcEffect == null) {
                    this._npcEffect = App.DragonBonesUtil.getLoadDragonBones("servant_skineffect_fg_" + this.cfg.zhentianSkinId);
                    this._npcEffect.setScale(0.6);
                    this._npcEffect.x = GameConfig.stageWidth - 100;
                    this._npcEffect.y = GameConfig.stageHeigth - 50;
                    this._skinContainer.addChild(this._npcEffect);
                }
            }
        }
        else {
            var skinW = 640;
            var skinH = 482;
            var tarScale = 1.0;
            // let serCfg = Config.ServantCfg.getServantItemById(this.cfg.zhentianSkinId);
            var serSkincfg = Config.ServantskinCfg.getServantSkinItemById(this.cfg.zhentianSkinId);
            var skinImgPath = serSkincfg.body;
            if (this._npcBM == null) {
                this._npcBM = BaseLoadBitmap.create(skinImgPath);
                this._npcBM.width = skinW;
                this._npcBM.height = skinH;
                this._npcBM.setScale(tarScale);
                this._npcBM.x = GameConfig.stageWidth / 2 - 100;
                this._npcBM.y = GameConfig.stageHeigth - this._npcBM.height;
                this._skinContainer.addChild(this._npcBM);
                if (this.defcode == "3") {
                    // this._npcBM.setScale(0.8);
                    this._npcBM.x = -200;
                    this._npcBM.y = GameConfig.stageHeigth - this._npcBM.height * 0.8 - 80;
                }
                else if (this.defcode == '5') {
                    this._npcBM.x = (GameConfig.stageWidth - skinW) >> 1;
                    this._npcBM.y = GameConfig.stageHeigth - skinH - 200;
                }
            }
        }
    };
    AcRedLotusWarriorView.prototype.checkIsWin = function () {
        // if(this.code == "3"){return;}
        var isWin = false;
        if (this.vo.chipnum >= this.cfg.helmetItemNum) {
            isWin = true;
        }
        if (!this._isWin && isWin) {
            this._isWin = true;
            for (var i = 0; i < this._enemyList.length; i++) {
                this._enemyContainer.removeChild(this._enemyList[i]);
            }
            this.atkButton.setEnable(false);
            if (this.defcode != '5') {
                this.btnText.text = LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_btn"));
                this.btnText.x = this.atkButton.x + this.atkButton.width / 2 - this.btnText.width / 2;
                this.btnText.y = this.atkButton.y + this.atkButton.height / 2 - this.btnText.height / 2;
                App.DisplayUtil.changeToGray(this.btnText);
                if (this.defcode != "7") {
                    var win = BaseBitmap.create(this.getDefaultRes("acredlotuswarrior_win"));
                    win.x = GameConfig.stageWidth / 2 - win.width / 2;
                    win.y = GameConfig.stageHeigth / 2 - win.height / 2;
                    this.addChild(win);
                }
            }
            else {
                if (this._redi_timesbg) {
                    this.removeChild(this._redi_timesbg);
                }
                if (this._wineLight) {
                    egret.Tween.removeTweens(this._wineLight);
                    this.removeChild(this._wineLight);
                }
                if (this._poemIocn) {
                    App.DisplayUtil.changeToGray(this._poemIocn);
                    if (this.vo.attacknum >= 10) {
                        this._poemIocn.setRes("acredlotuswarrior_name2-5");
                    }
                    else {
                        this._poemIocn.setRes("acredlotuswarrior_name-5");
                    }
                }
            }
            this.atkCountTxt.visible = false;
            if (!Api.switchVoApi.checkServantCloseBone() && RES.hasRes("servant_full2_" + this.cfg.zhentianSkinId + "_ske") && App.CommonUtil.check_dragon()) {
                if (this.defcode != "3" && this.defcode != "7") {
                    this._npcBM.x = GameConfig.stageWidth / 2;
                }
                if (RES.hasRes("servant_skineffect_fg_" + this.cfg.zhentianSkinId + "_ske")) {
                    this._npcEffect.x = GameConfig.stageWidth / 2;
                }
            }
            else {
                if (this.defcode != "3" && this.defcode != "7") {
                    this._npcBM.x = GameConfig.stageWidth / 2 - this._npcBM.width / 2 * this._npcBM.scaleX;
                }
            }
        }
    };
    AcRedLotusWarriorView.prototype.npcTalk = function () {
        this._talkContainer.visible = true;
        egret.Tween.get(this._talkContainer)
            .wait(1200)
            .set({ visible: false });
    };
    // private screenShake(){
    //     if(this._isShake){
    //         return;
    //     }
    //     let posX = this.x;
    //     let posY= this.y;
    //     egret.Tween.get(this._bigBg, { loop: true }).call(() => {
    //         let randomX = 10 * Math.random() - 5;
    //         let randomY = 10 * Math.random() - 5;
    //         this.x = posX + randomX;
    //         this.y = posY + randomY;
    //     }, this).wait(20);
    // }
    AcRedLotusWarriorView.prototype.playShake7 = function () {
        var _this = this;
        if (this._isShake) {
            return;
        }
        this._isShake = true;
        var posX = this.x;
        var posY = this.y;
        egret.Tween.get(this._bigBg, { loop: true }).call(function () {
            var randomX = 10 * Math.random() - 10;
            var randomY = 10 * Math.random() - 10;
            _this.x = posX + randomX;
            _this.y = posY + randomY;
        }, this).wait(30);
    };
    AcRedLotusWarriorView.prototype.playShake = function () {
        var _this = this;
        if (this._isShake) {
            return;
        }
        this.npcTalk();
        this._isShake = true;
        var posX = this.x;
        var posY = this.y;
        egret.Tween.get(this._bigBg, { loop: true }).call(function () {
            var randomX = 10 * Math.random() - 5;
            var randomY = 10 * Math.random() - 5;
            _this.x = posX + randomX;
            _this.y = posY + randomY;
        }, this).wait(20);
    };
    AcRedLotusWarriorView.prototype.stopShake = function () {
        this._isShake = false;
        this.x = 0;
        this.y = 0;
        egret.Tween.removeTweens(this._bigBg);
    };
    // private playEnemyShakeAni(event: egret.Event) {
    // 	let offest = event.data.offest;
    // 	let type = event.data.type;
    // 	let posX = 0;
    // 	let posY = 0;
    // 	this._enemyContainer.setPosition(posX + offest, posY + offest);
    // }
    /**初始化敌兵 */
    AcRedLotusWarriorView.prototype.initEnemy = function () {
        this._enemyContainer = new BaseDisplayObjectContainer();
        this.addChild(this._enemyContainer);
        this._npcClip1 = ComponentManager.getCustomMovieClip("acredlotuswarrioridle", 5, 300);
        this._npcClip1.setPosition(186, GameConfig.stageHeigth - 472);
        this._enemyContainer.addChild(this._npcClip1);
        this._npcClip1.playWithTime(-1);
        this._npcClip2 = ComponentManager.getCustomMovieClip("acredlotuswarrioratk", 2, 100);
        this._npcClip2.setPosition(189, GameConfig.stageHeigth - 477);
        this._enemyContainer.addChild(this._npcClip2);
        this._npcClip2.playWithTime(1);
        this._npcClip2.setVisible(false);
        for (var i = 0; i < this._enemyPosCfg.length; i++) {
            var posCfg = this._enemyPosCfg[i];
            var enemy = BaseLoadBitmap.create(this.getDefaultRes("acredlotuswarrior_enemy" + String(i + 1)));
            // enemy.setPosition(posCfg.x, GameConfig.stageHeigth - posCfg.height - posCfg.y);
            enemy.setPosition(this._bigBg.x + posCfg.x, this._bigBg.y + posCfg.y);
            this._enemyContainer.addChild(enemy);
            enemy.name = String(i);
            this._enemyList.push(enemy);
        }
    };
    /**初始化诗文部分 */
    AcRedLotusWarriorView.prototype.initPoems = function () {
        var _this = this;
        //碰酒暗背景
        var _wineBG = new BaseShape, gra = _wineBG.graphics;
        this.addChild(_wineBG);
        this._wineBG = _wineBG;
        _wineBG.touchEnabled = true;
        _wineBG.visible = false;
        gra.beginFill(0x000000, 0.4);
        gra.drawRect(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth);
        gra.endFill();
        //诗文及碰酒部分
        var container = new BaseDisplayObjectContainer;
        this._poemContainer = container;
        this.addChild(container);
        container.visible = false;
        container.y = 295;
        container.x = 418;
        //创建纸
        var paper1 = BaseBitmap.create('acredlotuswarrior_poem_bg');
        this._paper1 = paper1;
        container.addChild(paper1);
        paper1.visible = false;
        container.width = paper1.width;
        container.height = paper1.height * 2;
        var paper2 = BaseBitmap.create('acredlotuswarrior_poem_bg');
        this._paper2 = paper2;
        container.addChild(paper2);
        paper2.visible = false;
        paper2.rotation = 180;
        paper2.x = 214;
        paper2.y = 438;
        //创建笔
        var brush = BaseBitmap.create('acredlotuswarrior_poem_brush');
        this._brush = brush;
        container.addChild(brush);
        brush.visible = false;
        //创建诗句文本,
        var poemtext1 = BaseBitmap.create('acredlotuswarrior_poem1');
        container.addChild(poemtext1);
        this._poemText1 = poemtext1;
        var poemtext2 = BaseBitmap.create('acredlotuswarrior_poem1');
        container.addChild(poemtext2);
        this._poemText2 = poemtext2;
        //创建碰酒动画
        if (App.CommonUtil.check_dragon()) {
            var wine_1 = App.DragonBonesUtil.getLoadDragonBones('jiubei');
            this._wine = wine_1;
            wine_1.visible = false;
            wine_1.setScale(0.8);
            wine_1.x = ((GameConfig.stageWidth - wine_1.width) >> 1) - 33;
            wine_1.y = GameConfig.stageHeigth - 175;
            wine_1.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, function () {
                if (wine_1.getLastFrameName() == 'appear') {
                    wine_1.visible = false;
                    _this.showPaper();
                }
                wine_1.playDragonMovie('idle', 0);
            }, this);
            this.addChild(wine_1);
        }
    };
    /**初始化骑兵 */
    AcRedLotusWarriorView.prototype.initAssault = function () {
        this._assaultList1.length = 0;
        this._assaultList2.length = 0;
        this._assaultList3.length = 0;
        for (var j = 0; j < 3; j++) {
            for (var i = 0; i < this._assaultCfg1.length; i++) {
                var assaultCfg = this._assaultCfg1[i];
                var assault = ComponentManager.getCustomMovieClip("acredlotuswarrioraulteffect", 5, 70);
                assault.anchorOffsetX = 227;
                assault.anchorOffsetY = 40;
                assault.rotation = -35;
                assault.alpha = assaultCfg.alpha;
                assault.setPosition(assaultCfg.x, GameConfig.stageHeigth - assaultCfg.y);
                this.addChild(assault);
                assault.playWithTime(-1);
                var key = "_assaultList" + String(Number(j) + 1);
                this[key].push(assault);
            }
        }
    };
    /**
     * 宝箱的返回数据
     */
    AcRedLotusWarriorView.prototype.receiveBoxHandle = function (event) {
        var ret = event.data.ret;
        var data = event.data.data.data;
        if (ret) {
            var rewards = data.rewards;
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "isPlayAni": true });
            this.refreshData();
        }
    };
    AcRedLotusWarriorView.prototype.initCode3Castle = function () {
        var _this = this;
        var CastleposCfg = this.code3CastleposCfg;
        // acredlotuswarrior_ground1
        var max = this.vo.maxHelmetNeedNum();
        var helmetNum = this.cfg.helmetNum;
        var _loop_1 = function (i) {
            var helmetObj = helmetNum[i];
            var flagType = i == helmetNum.length - 1 ? 2 : 1; //i < helmetNum.length/2 ? 1:2;
            var flagObj = new BaseDisplayObjectContainer();
            flagObj.width = 58;
            flagObj.height = 58;
            flagObj.name = "flag" + i;
            flagObj.x = CastleposCfg[i].x;
            flagObj.y = CastleposCfg[i].y;
            this_1.addChild(flagObj);
            var flagBg = BaseBitmap.create(CastleposCfg[i].img);
            flagBg.x = 0;
            flagBg.y = 0;
            flagBg.name = "flagBg";
            flagObj.addChild(flagBg);
            var flag_arrow = BaseBitmap.create("acredlotuswarrior_arrow2");
            flag_arrow.x = CastleposCfg[i].arrx;
            flag_arrow.y = CastleposCfg[i].arry;
            flag_arrow.scaleX = CastleposCfg[i].scalex;
            flag_arrow.scaleY = CastleposCfg[i].scaley;
            flag_arrow.name = "flag_arrow";
            flagObj.addChild(flag_arrow);
            flagObj["flagBg"] = flagBg;
            flagObj["flag_arrow"] = flag_arrow;
            if (this_1.vo.checkBoxCollected(i)) {
                flagBg.texture = ResourceManager.getRes(CastleposCfg[i].img + "_1");
                //已经领取了
            }
            else {
                flagBg.texture = ResourceManager.getRes(CastleposCfg[i].img);
            }
            if (this_1.vo.chipnum >= helmetObj.needNum) {
                flag_arrow.texture = ResourceManager.getRes("acredlotuswarrior_arrow1");
            }
            else {
                flag_arrow.texture = ResourceManager.getRes("acredlotuswarrior_arrow2");
            }
            if (i == 0) {
                this_1._clickHand = BaseBitmap.create("guide_hand");
                this_1._clickHand.x = flagBg.width / 2;
                this_1._clickHand.y = flagBg.height / 2;
                flagObj.addChild(this_1._clickHand);
                this_1._clickHand.visible = false;
                egret.Tween.get(this_1._clickHand, { loop: true })
                    .to({ scaleX: 0.9, scaleY: 0.9 }, 500)
                    .to({ scaleX: 1, scaleY: 1 }, 500);
            }
            // this.vo.chipnum / this.cfg.helmetItemNum
            var curidx = i;
            flagObj.addTouchTap(function () {
                if (!_this.vo.isAcTimeOut()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                    return;
                }
                var voNum = _this.vo.chipnum;
                var isRevice = _this.vo.checkBoxCollected(curidx);
                var needNum = helmetObj.needNum;
                if (needNum <= voNum) {
                    if (!isRevice) {
                        //判断如果没有门客 不能领取
                        // if(curidx == helmetNum.length - 1 && !Api.servantVoApi.getServantObj(String(this.cfg.sevantID))){
                        //     App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_noservent")));
                        //     return;
                        // }
                        NetManager.request(NetRequestConst.ACTIVITY_REDLOTUSWARRIORNUMREWARD, { activeId: _this.activityId, levelId: curidx + 1 });
                        return;
                    }
                }
                var rewardList = helmetObj.getReward;
                var itemcfg = {
                    needNum: needNum,
                    getReward: rewardList
                };
                //最后一个宝箱 现实门课皮肤
                if (curidx == helmetNum.length - 1) {
                    itemcfg = {
                        needNum: helmetObj.needNum,
                        getReward: _this.cfg.helmetReward + "|" + helmetObj.getReward
                    };
                }
                var islast = 0;
                if (curidx == helmetNum.length - 1) {
                    islast = 1;
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ACREDLOTUSWARRIORREWARDINFOPOPUPVIEW, { "code": _this.code, "aid": _this.aid, "itemCfg": itemcfg, islast: islast });
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < helmetNum.length; i++) {
            _loop_1(i);
        }
    };
    //进度条物品箱
    AcRedLotusWarriorView.prototype.initBox = function () {
        var _this = this;
        var max = this.vo.maxHelmetNeedNum();
        var helmetNum = this.cfg.helmetNum;
        var _loop_2 = function (i) {
            var helmetObj = helmetNum[i];
            var flagType = i == helmetNum.length - 1 ? 2 : 1; //i < helmetNum.length/2 ? 1:2;
            var str = '', showBG = true;
            if (this_2.defcode == '5') {
                flagType = '';
                showBG = false;
                if (i == helmetNum.length - 1) {
                    str = '1';
                }
            }
            if (this_2.defcode == "7") {
                showBG = false;
            }
            var flagObj = new BaseDisplayObjectContainer();
            flagObj.width = 58;
            flagObj.height = 58;
            flagObj.name = "flag" + i;
            flagObj.x = this_2.bloodBar.x + this_2.bloodBar.width * (helmetObj.needNum / max) - flagObj.width / 2;
            flagObj.y = this_2.bloodBar.y + this_2.bloodBar.height / 2 - flagObj.height / 2;
            this_2.addChild(flagObj);
            var flagBg = BaseBitmap.create(this_2.getDefaultRes("acredlotuswarrior_flagbg"));
            flagBg.x = 0;
            flagBg.y = 0;
            flagBg.name = "flagBg";
            flagObj.addChild(flagBg);
            flagBg.visible = showBG;
            flagObj["light"] = BaseBitmap.create("dailytask_box_light");
            flagObj["light"].anchorOffsetX = flagObj["light"].width / 2;
            flagObj["light"].anchorOffsetY = flagObj["light"].height / 2;
            flagObj["light"].x = flagObj.width / 2;
            flagObj["light"].y = flagObj.height / 2;
            flagObj.addChild(flagObj["light"]);
            // console.log(this.getDefaultRes("acredlotuswarrior_flag" + str + flagType,this.defcode));
            flagObj["flag"] = BaseBitmap.create(this_2.getDefaultRes("acredlotuswarrior_flag" + str + flagType, this_2.defcode));
            flagObj["flag"].x = flagObj.width / 2 - flagObj["flag"].width / 2;
            flagObj["flag"].y = flagObj.height / 2 - flagObj["flag"].height / 2;
            flagObj["flag"].name = "flag";
            if (this_2.defcode == "7" && flagType == 1) {
                flagObj["flag"].scaleX = 0.8;
                flagObj["flag"].scaleY = 0.8;
                flagObj["flag"].x = flagObj.width / 2 - flagObj["flag"].width * 0.8 / 2;
                flagObj["flag"].y = flagObj.height / 2 - flagObj["flag"].height * 0.8 / 2 - 10;
            }
            if (this_2.defcode == "7" && flagType == 2) {
                flagObj["flag"].x = flagObj.width / 2 - flagObj["flag"].width * 0.8 / 2;
                flagObj["flag"].y = flagObj.height / 2 - flagObj["flag"].height * 0.8 / 2 - 20;
                flagObj["light"].scaleX = 1.2;
                flagObj["light"].scaleY = 1.2;
            }
            flagObj.addChild(flagObj["flag"]);
            // console.log(this.defcode);
            // console.log(this.getDefaultRes("acredlotuswarrior_flagbreak" + flagType,this.defcode));
            flagObj["flagbreak"] = BaseBitmap.create(this_2.getDefaultRes("acredlotuswarrior_flagbreak" + flagType, this_2.defcode));
            flagObj["flagbreak"].x = flagObj.width / 2 - flagObj["flagbreak"].width / 2;
            flagObj["flagbreak"].y = flagObj.height / 2 - flagObj["flagbreak"].height / 2;
            flagObj["flagbreak"].name = "flagbreak";
            flagObj.addChild(flagObj["flagbreak"]);
            if (this_2.defcode == "7" && flagType == 1) {
                flagObj["flagbreak"].scaleX = 0.8;
                flagObj["flagbreak"].scaleY = 0.8;
                flagObj["flagbreak"].x = flagObj.width / 2 - flagObj["flagbreak"].width * 0.8 / 2;
                flagObj["flagbreak"].y = flagObj.height / 2 - flagObj["flagbreak"].height * 0.8 / 2 - 10;
            }
            if (this_2.defcode == "7" && flagType == 2) {
                flagObj["flagbreak"].x = flagObj.width / 2 - flagObj["flagbreak"].width * 0.8 / 2;
                flagObj["flagbreak"].y = flagObj.height / 2 - flagObj["flagbreak"].height * 0.8 / 2 - 20;
            }
            if (this_2.vo.checkBoxCollected(i)) {
                //已经领取了
                flagObj["light"].visible = false;
                egret.Tween.removeTweens(flagObj["light"]);
                flagObj["flag"].visible = false;
                flagObj["flagbreak"].visible = true;
            }
            else {
                if (this_2.vo.chipnum >= helmetObj.needNum) {
                    flagObj["light"].visible = true;
                    egret.Tween.get(flagObj["light"], { loop: true }).to({ rotation: flagObj["light"].rotation + 360 }, 10000);
                }
                else {
                    egret.Tween.removeTweens(flagObj["light"]);
                    flagObj["light"].visible = false;
                }
                flagObj["flag"].visible = true;
                flagObj["flagbreak"].visible = false;
            }
            var curidx = i;
            flagObj.addTouchTap(function () {
                if (!_this.vo.isAcTimeOut()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                    return;
                }
                var voNum = _this.vo.chipnum;
                var isRevice = _this.vo.checkBoxCollected(curidx);
                var needNum = helmetObj.needNum;
                if (needNum <= voNum) {
                    if (!isRevice) {
                        //判断如果没有门客 不能领取
                        // if(curidx == helmetNum.length - 1 && !Api.servantVoApi.getServantObj(String(this.cfg.sevantID))){
                        //     App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_noservent")));
                        //     return;
                        // }
                        NetManager.request(NetRequestConst.ACTIVITY_REDLOTUSWARRIORNUMREWARD, { activeId: _this.activityId, levelId: curidx + 1 });
                        return;
                    }
                }
                var rewardList = helmetObj.getReward;
                var itemcfg = {
                    needNum: helmetObj.needNum,
                    getReward: helmetObj.getReward
                };
                //最后一个宝箱 现实门课皮肤
                if (curidx == helmetNum.length - 1) {
                    itemcfg = {
                        needNum: helmetObj.needNum,
                        getReward: _this.cfg.helmetReward + "|" + helmetObj.getReward
                    };
                }
                var islast = 0;
                if (curidx == helmetNum.length - 1) {
                    islast = 1;
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ACREDLOTUSWARRIORREWARDINFOPOPUPVIEW, { "code": _this.code, "aid": _this.aid, "itemCfg": itemcfg, islast: islast });
            }, this_2);
        };
        var this_2 = this;
        for (var i = 0; i < helmetNum.length; i++) {
            _loop_2(i);
        }
    };
    AcRedLotusWarriorView.prototype.infoBtnListener = function () {
        // let ReviewReward = this.cfg.ReviewReward;
        // let skinId = ReviewReward.split("_")[1];
        if (this._npcBM) {
            this._npcBM.dispose();
            this._npcBM = null;
        }
        if (this._npcEffect) {
            this._npcEffect.dispose();
            this._npcEffect = null;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.SERVANTSKINCHANGEVIEW, { servantId: this.cfg.sevantID, skinId: this.cfg.zhentianSkinId, isDisplay: true });
    };
    AcRedLotusWarriorView.prototype.tick = function () {
        var deltaT = this.acVo.et - GameData.serverTime;
        var timeStr = "";
        if (deltaT > 0) {
            timeStr = LanguageManager.getlocal("acRedLotusWarrior_acCd", [App.DateUtil.getFormatBySecond(deltaT, 8)]);
        }
        else {
            timeStr = LanguageManager.getlocal("acRedLotusWarrior_acCd", [LanguageManager.getlocal("acSpringOutingTimeEnd")]);
        }
        this.acCdTxt.text = timeStr;
        this.acCdTxt.x = GameConfig.stageWidth - 10 - this.acCdTxt.width;
    };
    // 刷新数据
    AcRedLotusWarriorView.prototype.refreshData = function () {
        var helmetNum = this.cfg.helmetNum;
        this.atkCountTxt.text = LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_atkvalue"), [String(this.vo.attacknum)]);
        if (this.defcode != '5') {
            if (this.vo.attacknum >= 10) {
                this.btnText.text = LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_btnten"));
            }
            else {
                this.btnText.text = LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_btn"));
            }
            this.btnText.x = this.atkButton.x + this.atkButton.width / 2 - this.btnText.width / 2;
            this.atkCountTxt.x = this.atkButton.x + this.atkButton.width / 2 - this.atkCountTxt.width / 2;
            // } else {
            //     this.atkCountTxt.text = LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_atkvalue"), [String(this.vo.attacknum)]);
        }
        else {
            if (this._poemIocn) {
                if (this.vo.attacknum >= 10) {
                    this._poemIocn.setRes("acredlotuswarrior_name2-5");
                }
                else {
                    this._poemIocn.setRes("acredlotuswarrior_name-5");
                }
            }
        }
        if (this.defcode == "3") {
            this._code3NumFnt.text = (this.vo.chipnum / this.cfg.helmetItemNum * 100).toFixed(0) + "%";
            for (var i = 0; i < helmetNum.length; i++) {
                var flagObj = this.getChildByName("flag" + i);
                var flagBg = flagObj["flagBg"];
                var flag_arrow = flagObj["flag_arrow"];
                var helmetObj = helmetNum[i];
                var poscfg = this.code3CastleposCfg[i];
                var needNum = helmetObj.needNum;
                if (this.vo.chipnum < helmetObj.needNum && i == 0) {
                    var deltaV = this.vo.chipnum / helmetObj.needNum;
                    this._code3RedFlag.x = poscfg.x + poscfg.arrx + 100 * deltaV * poscfg.scalex - 5;
                    this._code3RedFlag.y = poscfg.y + poscfg.arry + 60 * poscfg.scaley * (1 - deltaV) - this._code3RedFlag.height + 12;
                }
                if (this.vo.chipnum <= helmetObj.needNum && i > 0 && this.vo.chipnum > helmetNum[i - 1].needNum) {
                    var deltaV = (this.vo.chipnum - helmetNum[i - 1].needNum) / (helmetObj.needNum - helmetNum[i - 1].needNum);
                    this._code3RedFlag.x = poscfg.x + poscfg.arrx + 100 * deltaV * poscfg.scalex - 5;
                    this._code3RedFlag.y = poscfg.y + poscfg.arry + 60 * poscfg.scaley * (1 - deltaV) - this._code3RedFlag.height + 12;
                }
                var xia_cus = flagObj.getChildByName("xia_cus"); //  CustomMovieClip
                var shang_cus = flagObj.getChildByName("shang_cus"); //  CustomMovieClip
                if (this.vo.chipnum >= helmetObj.needNum) {
                    flag_arrow.texture = ResourceManager.getRes("acredlotuswarrior_arrow1");
                }
                else {
                    flag_arrow.texture = ResourceManager.getRes("acredlotuswarrior_arrow2");
                }
                var iscollect = this.vo.checkBoxCollected(i);
                if (i == 0) {
                    this._clickHand.visible = this.vo.chipnum >= helmetObj.needNum && !iscollect;
                }
                if (iscollect) {
                    flagBg.texture = ResourceManager.getRes(this.code3CastleposCfg[i].img + "_1");
                    //已经领取了
                    if (xia_cus) {
                        flagObj.removeChild(xia_cus);
                        xia_cus = null;
                    }
                    if (shang_cus) {
                        flagObj.removeChild(shang_cus);
                        shang_cus = null;
                    }
                    flagObj["xia_cus"] = null;
                    flagObj["shang_cus"] = null;
                }
                else {
                    flagBg.texture = ResourceManager.getRes(this.code3CastleposCfg[i].img);
                    if (this.vo.chipnum >= helmetObj.needNum && !xia_cus && !shang_cus) {
                        var xiapath = "XYDxia_";
                        var shangpath = "XYDshang_";
                        var tarw = 260;
                        var tarh = 180;
                        if (i >= helmetNum.length - 1) {
                            xiapath = "DYDxia_";
                            shangpath = "DYDshang_";
                            tarw = 408;
                            tarh = 300;
                        }
                        shang_cus = ComponentManager.getCustomMovieClip(shangpath, 8, 120);
                        shang_cus.x = flagBg.x + flagBg.width / 2 - tarw / 2 - 12;
                        shang_cus.y = flagBg.y + flagBg.height / 2 - tarh / 2 + 11;
                        flagObj.addChild(shang_cus);
                        shang_cus.name = "shang_cus";
                        flagObj["shang_cus"] = shang_cus;
                        xia_cus = ComponentManager.getCustomMovieClip(xiapath, 8, 120);
                        xia_cus.x = flagBg.x + flagBg.width / 2 - tarw / 2 - 12;
                        xia_cus.y = flagBg.y + flagBg.height / 2 - tarh / 2 + 11;
                        flagObj.addChildAt(xia_cus, 0);
                        flagObj["xia_cus"] = xia_cus;
                        xia_cus.name = "xia_cus";
                        xia_cus.blendMode = egret.BlendMode.ADD;
                        shang_cus.blendMode = egret.BlendMode.ADD;
                        xia_cus.playWithTime(0);
                        shang_cus.playWithTime(0);
                    }
                    else {
                        flagObj["xia_cus"] = null;
                        flagObj["shang_cus"] = null;
                    }
                }
            }
            this._code3NumFnt.x = this._code3RedFlag.x + this._code3RedFlag.width / 2 - this._code3NumFnt.width / 2 - 10;
            this._code3NumFnt.y = this._code3RedFlag.y + this._code3RedFlag.height / 2 - this._code3NumFnt.height / 2;
            return;
        }
        this.bloodBar.setPercentage(this.vo.chipnum / this.cfg.helmetItemNum);
        for (var i = 0; i < helmetNum.length; i++) {
            var flagObj = this.getChildByName("flag" + i);
            if (this.vo.checkBoxCollected(i)) {
                flagObj["light"].visible = false;
                egret.Tween.removeTweens(flagObj["light"]);
                flagObj["flag"].visible = false;
                flagObj["flagbreak"].visible = true;
            }
            else {
                if (this.vo.chipnum >= helmetNum[i].needNum) {
                    flagObj["light"].visible = true;
                    egret.Tween.get(flagObj["light"], { loop: true }).to({ rotation: flagObj["light"].rotation + 360 }, 10000);
                }
                else {
                    egret.Tween.removeTweens(flagObj["light"]);
                    flagObj["light"].visible = false;
                }
                flagObj["flag"].visible = true;
                flagObj["flagbreak"].visible = false;
            }
        }
        //  ComponentManager.getTextField(String(this.vo.chipnum + "%"), 20, 0xffedb4);
        if (this.defcode == "5") {
            this.numText.text = LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_progress"), [String(this.vo.chipnum < this.cfg.helmetItemNum ? this.vo.chipnum : this.cfg.helmetItemNum)]);
        }
        else if (this.defcode == "7") {
            this.numText.text = String(this.vo.chipnum + "%");
            this.numText.x = this.numBg.x + this.numBg.width / 2 - this.numText.width / 2;
        }
        else {
            this.numText.text = String(this.cfg.helmetItemNum - this.vo.chipnum < 0 ? 0 : this.cfg.helmetItemNum - this.vo.chipnum);
            this.numText.x = this.numBg.x + this.numBg.width / 2 - this.numText.width / 2;
        }
        // if (this.defcode != '5') {
        //     this.numText.text = String(this.cfg.helmetItemNum - this.vo.chipnum < 0 ? 0 : this.cfg.helmetItemNum - this.vo.chipnum);
        //     this.numText.x = this.numBg.x + this.numBg.width / 2 - this.numText.width / 2;
        // } else {
        //     this.numText.text = LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_progress"), [String(this.vo.chipnum < this.cfg.helmetItemNum ? this.vo.chipnum : this.cfg.helmetItemNum)]);
        // }
    };
    AcRedLotusWarriorView.prototype.atkClick = function () {
        if (this._isPlayAni) {
            return;
        }
        if (!this.vo.isAcTimeOut()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        //已经胜利了
        if (this.vo.chipnum >= this.cfg.helmetItemNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_win")));
            return;
        }
        if (this.vo.attacknum <= 0) {
            // App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_notenough")));
            // return;
            var message = LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_countnotenough"), ["" + this.cfg.cost]);
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
        this._isPlayAni = true;
        var attackCount = this.vo.attacknum >= 10 ? 10 : 1;
        // this.playAssaultAni();
        NetManager.request(NetRequestConst.ACTIVITY_REDLOTUSWARRIORATTACKTHEBOSS, { activeId: this.aid + "-" + this.code, attack: attackCount });
    };
    // 获得奖励
    AcRedLotusWarriorView.prototype.getRewardHandler = function (event) {
        if (event.data.data.cmd === NetRequestConst.ACTIVITY_REDLOTUSWARRIORATTACKTHEBOSS) {
            if (event.data.data.ret === 0) {
                var data = event.data.data.data;
                // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                //     "rewards":data.rewards,
                //     "otherRewards":data.otherrewards,
                //     "isPlayAni":true, 
                //     showTip:data.critnum>0?LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_Baoji")):null
                // });
                this._rewards = data.rewards;
                this._otherRewards = data.otherrewards;
                this._showTip = data.critnum > 0 ? LanguageManager.getlocal(this.getDefaultCn("acRedLotusWarrior_Baoji")) : null;
                if (this.defcode == "3") {
                    this.showCode3Ani();
                }
                else if (this.defcode == "5") {
                    // 碰酒念诗
                    this.wineAndPoem();
                }
                else if (this.defcode == "7") {
                    this.attackHandle();
                }
                else {
                    this.playAssaultAni();
                }
            }
            else {
                App.CommonUtil.showTip(event.data.data.ret);
            }
        }
    };
    AcRedLotusWarriorView.prototype.showCode7Ani = function () {
        var _this = this;
        if (App.DeviceUtil.CheckWebglRenderMode() && App.CommonUtil.check_dragon()) {
            this._userItem.playDragonMovie("attack", 1);
            this._userItem.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                // this.recallAniBack();
                _this._isPlayAni = false;
                _this.checkIsWin();
                _this.randomSay();
                _this._userItem.playDragonMovie('idle', 0);
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                    "rewards": _this._rewards,
                    "otherRewards": _this._otherRewards,
                    "isPlayAni": true,
                    showTip: _this._showTip
                });
            }, this);
        }
        else {
            egret.Tween.get(this._userItemBM)
                .wait(900)
                .call(function () {
                _this._isPlayAni = false;
                _this.checkIsWin();
                _this.randomSay();
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                    "rewards": _this._rewards,
                    "otherRewards": _this._otherRewards,
                    "isPlayAni": true,
                    showTip: _this._showTip
                });
            });
        }
        // this._isPlayAni = false;
    };
    AcRedLotusWarriorView.prototype.showCode3Ani = function () {
        this._isPlayAni = false;
        this.npcTalk(); //step1
        //step2 序列帧
        var taridx = this.getChildIndex(this._skinContainer);
        var _luanziClip = ComponentManager.getCustomMovieClip("redlotus_yanwu", 21, 100); //redlotus_yanwu 21
        _luanziClip.setScale(2.5);
        _luanziClip.setPosition(GameConfig.stageWidth / 2 - 256 / 2 * _luanziClip.scaleX, GameConfig.stageHeigth / 2 - 380 / 2 * _luanziClip.scaleX - 100);
        this.addChildAt(_luanziClip, taridx);
        _luanziClip.playWithTime(0);
        var tmpthis = this;
        egret.Tween.get(_luanziClip, { loop: false }).wait(2100).set({ alpha: 0 }).wait(500).call(this.checkIsWin, this).call(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                "rewards": tmpthis._rewards,
                "otherRewards": tmpthis._otherRewards,
                "isPlayAni": true,
                showTip: tmpthis._showTip
            });
            tmpthis.removeChild(_luanziClip);
        }, this);
    };
    /**动画 */
    AcRedLotusWarriorView.prototype.playAssaultAni = function () {
        var _this = this;
        SoundManager.playEffect("effect_battleshort");
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOANI, { type: 1 });
        // this._isShake = true;
        this._npcClip2.setVisible(true);
        this._npcClip1.setVisible(false);
        this._npcClip2.playWithTime(1);
        egret.Tween.removeTweens(this);
        egret.Tween.get(this)
            .call(this.playEachAssaultAni, this, ["_assaultList1"])
            .wait(330)
            .call(this.playEachAssaultAni, this, ["_assaultList2"])
            .wait(330)
            .call(this.playEachAssaultAni, this, ["_assaultList3"])
            .call(function () {
            egret.Tween.removeTweens(_this);
        }, this);
    };
    /**
     * 十连抽动画
     */
    AcRedLotusWarriorView.prototype.playEachAssaultAni = function (key) {
        for (var i = 0; i < this[key].length; i++) {
            this.playOneAssaultAni(key, i);
        }
    };
    /**一个士兵的动画 */
    AcRedLotusWarriorView.prototype.playOneAssaultAni = function (key, index) {
        var _this = this;
        this[key][index].x = this._assaultCfg1[index].x;
        this[key][index].y = GameConfig.stageHeigth - this._assaultCfg1[index].y;
        this[key][index].alpha = this._assaultCfg1[index].alpha;
        this[key][index].scaleX = this._assaultCfg1[index].scale;
        this[key][index].scaleY = this._assaultCfg1[index].scale;
        egret.Tween.removeTweens(this[key][index]);
        egret.Tween.get(this[key][index])
            .to({
            x: this._assaultCfg2[index].x,
            y: GameConfig.stageHeigth - this._assaultCfg2[index].y,
            alpha: this._assaultCfg2[index].alpha,
            scaleX: this._assaultCfg2[index].scale,
            scaleY: this._assaultCfg2[index].scale,
        }, 50)
            .to({
            x: this._assaultCfg3[index].x,
            y: GameConfig.stageHeigth - this._assaultCfg3[index].y,
            alpha: this._assaultCfg3[index].alpha,
            scaleX: this._assaultCfg3[index].scale,
            scaleY: this._assaultCfg3[index].scale,
        }, 400)
            .call(function () {
            _this.playShake();
            //大幅度震动
            // if (this._isShake) {
            //     // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOANI, { type: 2 });
            //     this.playBgAni(2);
            //     this._isShake = false;
            // }
            for (var i = 0; i < 3; i++) {
                _this.playOneEmenyAni(i);
            }
        }, this)
            .to({
            x: this._assaultCfg4[index].x,
            y: GameConfig.stageHeigth - this._assaultCfg4[index].y,
            alpha: this._assaultCfg4[index].alpha,
            scaleX: this._assaultCfg4[index].scale,
            scaleY: this._assaultCfg4[index].scale,
        }, 150)
            .call(function () {
            // if (index == this._assaultList3.length - 1 && key == "_assaultList3") {
            //     // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOANI, { type: 3 });
            //     this.playBgAni(3);
            // }
            for (var i = 3; i < 6; i++) {
                _this.playOneEmenyAni(i);
            }
        }, this)
            .to({
            x: this._assaultCfg5[index].x,
            y: GameConfig.stageHeigth - this._assaultCfg5[index].y,
            alpha: this._assaultCfg5[index].alpha,
            scaleX: this._assaultCfg5[index].scale,
            scaleY: this._assaultCfg5[index].scale,
        }, 150)
            .call(function () {
            egret.Tween.removeTweens(_this[key][index]);
            if (index == _this._assaultList3.length - 1 && key == "_assaultList3") {
                _this._isPlayAni = false;
                // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOANI, { type: 4 });
                // this.playBgAni(4);
                _this._npcClip1.setVisible(true);
                _this._npcClip2.setVisible(false);
                _this.checkIsWin();
                _this.stopShake();
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                    "rewards": _this._rewards,
                    "otherRewards": _this._otherRewards,
                    "isPlayAni": true,
                    showTip: _this._showTip
                });
            }
        }, this);
    };
    /**一个敌人的动画 */
    AcRedLotusWarriorView.prototype.playOneEmenyAni = function (index) {
        var _this = this;
        var posX = this._enemyList[index].x;
        var posY = this._enemyList[index].y;
        egret.Tween.removeTweens(this._enemyList[index]);
        egret.Tween.get(this._enemyList[index]).call(function () {
            var hurtEffect = ComponentManager.getCustomMovieClip("acredlotuswarriorhurteffect", 8, 70);
            hurtEffect.anchorOffsetX = 125;
            hurtEffect.anchorOffsetY = 120;
            hurtEffect.rotation = 360 * Math.random();
            hurtEffect.setPosition(posX + _this._enemyList[index].width / 2, posY + _this._enemyList[index].height / 2);
            _this.addChild(hurtEffect);
            hurtEffect.playWithTime(1);
            hurtEffect.setEndCallBack(function () {
                _this.removeChild(hurtEffect);
                hurtEffect.dispose();
                hurtEffect = null;
            }, _this);
        }, this).to({
            x: posX + 15,
            y: posY - 12,
        }, 30).to({
            x: posX,
            y: posY,
        }, 300).call(function () {
            egret.Tween.removeTweens(_this._enemyList[index]);
        }, this);
    };
    /**碰酒念诗 */
    AcRedLotusWarriorView.prototype.wineAndPoem = function () {
        if (this._wine) {
            this._wine.visible = true;
            this._wine.playDragonMovie('appear', 1);
            this._wineLight.visible = this.atkButton.visible = false;
        }
        else {
            this.showPaper();
        }
        if (egret.is(this._npcBM, 'BaseLoadDragonBones')) {
            var ani = this._npcBM;
            ani.playDragonMovie('appear', 1);
        }
    };
    AcRedLotusWarriorView.prototype.showPaper = function () {
        this._wineLight.visible = this.atkButton.visible = true;
        this.checkIsWin();
        //纸展开
        var _poemContainer = this._poemContainer, _paper1 = this._paper1, _paper2 = this._paper2;
        _poemContainer.alpha = 1;
        _paper2.visible = _paper1.visible = _poemContainer.visible = true;
        this._poemText1.visible = this._poemText2.visible = false;
        //创建俩遮罩，显示背景纸
        var shape1 = new BaseShape, shape2 = new BaseShape;
        _poemContainer.addChild(shape1);
        _poemContainer.addChild(shape2);
        shape1.graphics.beginFill(0x000000);
        shape1.graphics.drawRect(0, -10, 214, 235); //229
        shape1.graphics.endFill();
        shape2.graphics.beginFill(0x000000);
        shape2.graphics.drawRect(0, 219, 214, 229);
        shape2.graphics.endFill();
        this._paper1_mask = shape1;
        this._paper2_mask = shape2;
        _paper1.mask = shape1;
        _paper2.mask = shape2;
        _paper1.y = 180;
        _paper2.y = 258;
        egret.setTimeout(this.addFrameFun, this, 50);
    };
    AcRedLotusWarriorView.prototype.addFrameFun = function () {
        var _paper1 = this._paper1;
        if (_paper1.y > 0) {
            _paper1.y -= 20;
            egret.setTimeout(this.addFrameFun, this, 50);
        }
        else {
            _paper1.y = 0;
            egret.setTimeout(this.wirtePoemtext, this, 300);
        }
        var _paper2 = this._paper2;
        if (_paper2.y < 438) {
            _paper2.y += 20;
        }
        else {
            _paper2.y = 438;
        }
    };
    AcRedLotusWarriorView.prototype.wirtePoemtext = function () {
        var _poemContainer = this._poemContainer;
        //取消纸的遮罩
        if (!this._paper1_mask) {
            return;
        }
        if (!this._paper2_mask) {
            return;
        }
        _poemContainer.removeChild(this._paper1_mask);
        _poemContainer.removeChild(this._paper2_mask);
        this._paper1.mask = null;
        this._paper2.mask = null;
        this._poemText1.visible = this._poemText2.visible = true;
        var ind = (~~(Math.random() * 100)) % 8 + 1;
        this._poemText1.setRes("acredlotuswarrior_poem" + ind);
        this._poemText2.setRes("acredlotuswarrior_poem" + ind);
        //创建俩遮罩
        var shape1 = new BaseShape, shape2 = new BaseShape;
        _poemContainer.addChild(shape1);
        _poemContainer.addChild(shape2);
        shape1.graphics.beginFill(0x000000);
        shape1.graphics.drawRect(107, 0, 107, 1);
        shape1.graphics.endFill();
        shape2.graphics.beginFill(0x000000);
        shape2.graphics.drawRect(0, 0, 107, 1);
        shape2.graphics.endFill();
        this._poemText1.mask = shape1;
        this._poemText2.mask = shape2;
        this.shape1 = shape1;
        this.shape2 = shape2;
        //第一句诗
        this.height1 = this.height2 = 1;
        egret.setTimeout(this.showpoem1, this, 40);
    };
    AcRedLotusWarriorView.prototype.showpoem1 = function () {
        var brush = this._brush;
        if (brush.visible == false) {
            brush.visible = true;
            brush.x = 110;
            this.ctrl = 0;
        }
        this.height1 += 15;
        this.ctrl++;
        if (this.height1 >= 437) {
            this.height1 = 437;
            //写第二句
            egret.setTimeout(this.showpoem2, this, 70);
            brush.y = this.height2 - brush.height;
            brush.x = 65;
            this.ctrl = 0;
        }
        else {
            brush.y = this.height1 - brush.height;
            if (this.ctrl % 3 == 0) {
                brush.x = brush.x == 110 ? 140 : 110;
            }
            egret.setTimeout(this.showpoem1, this, 40);
        }
        var shape = this.shape1;
        shape.graphics.clear();
        shape.graphics.beginFill(0x000000);
        shape.graphics.drawRect(107, 0, 107, this.height1);
        shape.graphics.endFill();
    };
    AcRedLotusWarriorView.prototype.showpoem2 = function () {
        var brush = this._brush;
        this.height2 += 15;
        this.ctrl++;
        if (this.height2 >= 437) {
            this.height2 = 437;
            //写完了
            egret.setTimeout(this.closePoem, this, 1000);
        }
        else {
            brush.y = this.height2 - brush.height;
            if (this.ctrl % 3 == 0) {
                brush.x = brush.x == 65 ? 95 : 65;
            }
            egret.setTimeout(this.showpoem2, this, 40);
        }
        var shape = this.shape2;
        shape.graphics.clear();
        shape.graphics.beginFill(0x000000);
        shape.graphics.drawRect(0, 0, 107, this.height2);
        shape.graphics.endFill();
    };
    AcRedLotusWarriorView.prototype.closePoem = function () {
        egret.Tween.removeTweens(this._poemContainer);
        egret.Tween.get(this._poemContainer).to({ alpha: 0 }, 300); //.call(this.showReward, this);
        this.showReward();
    };
    AcRedLotusWarriorView.prototype.showReward = function () {
        var _poemContainer = this._poemContainer;
        _poemContainer.visible =
            this._paper1.visible =
                this._poemText1.visible =
                    this._brush.visible =
                        this._poemText2.visible = false;
        _poemContainer.removeChild(this.shape1);
        _poemContainer.removeChild(this.shape2);
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
            "rewards": this._rewards,
            "otherRewards": this._otherRewards,
            "isPlayAni": true,
            showTip: this._showTip
        });
        this._isPlayAni = false;
    };
    // 获得宝箱奖励
    AcRedLotusWarriorView.prototype.getNumRewardHandler = function (event) {
        if (event.data.data.cmd === NetRequestConst.REQUEST_ACTIVITY_HULAONUMREWARD) {
            if (event.data.data.ret === 0) {
                var data = event.data.data.data;
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": data.rewards, "otherRewards": data.otherrewards, "isPlayAni": true });
            }
            else {
                App.CommonUtil.showTip(event.data.data.ret);
            }
        }
    };
    AcRedLotusWarriorView.prototype.getResourceList = function () {
        var resTab = [];
        if (this.defcode == "3") {
            resTab = [
                "acredlotuswarrior_arrow1", "acredlotuswarrior_arrow2",
                "acredlotuswarrior_flag", "acredlotuswarrior_ground1_1", "acredlotuswarrior_ground1", "acredlotuswarrior_ground2_1",
                "acredlotuswarrior_ground2", "acredlotuswarrior_percent", "acredlotuswarrior_title_word", "acredlotuswarrior_bottom", "prestige_fnt",
            ];
        }
        else if (this.defcode == "5") {
            resTab = ['acredlotuswarrior_title_word5', 'acredlotuswarrior_residual_times-5',
                'acredlotuswarrior_flag-5', 'acredlotuswarrior_flag-6', 'acredlotuswarrior_flagbreak-5', 'acredlotuswarrior_flagbreak-6',
                'acredlotuswarrior_name-5', 'acredlotuswarrior_name2-5', 'acredlotuswarrior_flag1-5',
                'acredlotuswarrior-5_progress', 'acredlotuswarrior-5_progressbg',
                'acredlotuswarrior_poem_bg', 'acredlotuswarrior_poem1', 'acredlotuswarrior_poem2',
                'acredlotuswarrior_poem3', 'acredlotuswarrior_poem4', 'acredlotuswarrior_poem5',
                'acredlotuswarrior_poem6', 'acredlotuswarrior_poem7', 'acredlotuswarrior_poem8',
                'acredlotuswarrior_poem_brush'
            ];
        }
        else if (this.code == "7") {
            resTab = [
                "acredlotuswarrior_title_word7",
                "acredlotuswarrior_useritem-7",
                "acredlotuswarrior_center-7",
                "acredlotuswarrior_centerbg-7",
                "acredlotuswarrior_detailbg-3",
                "acredlotuswarrior_sermask"
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            this.getDefaultRes("acredlotuswarrior_btn"),
            this.getDefaultRes("acredlotuswarrior_btnbg", this.defcode),
            this.getDefaultRes("acredlotuswarrior_closebtn"),
            this.getDefaultRes("acredlotuswarrior_detailbg", this.defcode),
            this.getDefaultRes("acredlotuswarrior_flagbg"),
            this.getDefaultRes("acredlotuswarrior_flag1", this.defcode),
            this.getDefaultRes("acredlotuswarrior_flag2", this.defcode),
            this.getDefaultRes("acredlotuswarrior_flagbreak1", this.defcode),
            this.getDefaultRes("acredlotuswarrior_flagbreak2", this.defcode),
            this.getDefaultRes("acredlotuswarrior_numbg"),
            this.getDefaultRes("acredlotuswarrior_talkbg"),
            this.getDefaultRes("acredlotuswarrior_title", this.defcode),
            this.getDefaultRes("acredlotuswarrior_win"),
            "progress_blood",
            "progress_bloodbg",
            "acredlotuswarrior_infobtn",
            "dailytask_box_light", "guide_hand",
        ]).concat(resTab);
    };
    AcRedLotusWarriorView.prototype.hide = function () {
        if (!this._isPlayAni) {
            _super.prototype.hide.call(this);
        }
    };
    AcRedLotusWarriorView.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_MACHAOTAbANI, this.playEnemyShakeAni, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_REDLOTUSWARRIORNUMREWARD, this.receiveBoxHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_REDLOTUSWARRIORATTACKTHEBOSS, this.getRewardHandler, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REDLOTUSWARRIOR_REFRESHVO, this.refreshData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, this.showDBDragon, this);
        this.bloodBar = null;
        this.acCdTxt = null;
        this.atkButton = null;
        this.numBg = null;
        this.numText = null;
        this.atkCountTxt = null;
        this.btnText = null;
        this._npcBM = null;
        this._npcEffect = null;
        this._bigBg = null;
        this._enemyList = [];
        this._assaultList1 = [];
        this._assaultList2 = [];
        this._assaultList3 = [];
        this._enemyContainer = null;
        this._isShake = false;
        this._npcClip1 = null;
        this._npcClip2 = null;
        this._buttomBg = null;
        this._isPlayAni = false;
        this._rewards = null;
        this._otherRewards = null;
        this._showTip = null;
        this._isWin = false;
        this._skinContainer = null;
        this._clickHand = null;
        this._wine = null;
        this._wineBG = null;
        if (this._poemContainer) {
            egret.Tween.removeTweens(this._poemContainer);
        }
        this._poemContainer = null;
        this._brush = null;
        this._paper1 = null;
        this._paper2 = null;
        this._paper1_mask = null;
        this._paper2_mask = null;
        this._poemText1 = null;
        this._poemText2 = null;
        this.shape1 = null;
        this.shape2 = null;
        this._redi_timesbg = null;
        if (this._wineLight) {
            egret.Tween.removeTweens(this._wineLight);
        }
        this._wineLight = null;
        this._poemIocn = null;
        this._userItem = null;
        if (this._userItemBM) {
            egret.Tween.removeTweens(this._userItemBM);
        }
        this._userItemBM = null;
        if (this._clickHand) {
            egret.Tween.removeTweens(this._clickHand);
        }
        this._clickHand = null;
        if (this._talkContainer) {
            egret.Tween.removeTweens(this._talkContainer);
        }
        this._talkContainer = null;
        this._centerBg = null;
        this._centerText = null;
        // 吕布容器
        if (this.lvbuNode) {
            egret.Tween.removeTweens(this.lvbuNode);
        }
        this.lvbuNode = null;
        this.boneNode = null;
        this.lvbuImg = null;
        if (this._randomTalkContainer) {
            egret.Tween.removeTweens(this._randomTalkContainer);
        }
        this._randomTalkContainer = null;
        this._randomTalkBg = null;
        this._randomTalkText = null;
        // 吕布的x
        this.lvbuX = 0;
        // 吕布的y
        this.lvbuY = 0;
        _super.prototype.dispose.call(this);
    };
    return AcRedLotusWarriorView;
}(AcCommonView));
__reflect(AcRedLotusWarriorView.prototype, "AcRedLotusWarriorView");
