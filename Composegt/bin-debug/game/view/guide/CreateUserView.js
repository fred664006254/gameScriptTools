/**
 * 新创建用户界面
 * author jiangliuyang
 * date 2019/9/20
 * @class CreateUserView
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
var CreateUserView = (function (_super) {
    __extends(CreateUserView, _super);
    function CreateUserView() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this._userNameCount = 0;
        _this._curSex = 1; //1男2女
        _this._lastSex = 1;
        // private _posContainer:BaseDisplayObjectContainer;
        _this._picNum = 1;
        _this._sextype = 0;
        _this._startX = 0;
        _this._startY = 0;
        _this._isUpdate = false;
        _this._isLoad = false;
        _this._loadNum = 0;
        _this._maleLoadNum = 0;
        _this._femaleLoadNum = 0;
        _this._maxLoadNum = 0;
        _this._enterSecond = 20;
        _this._circle1 = null;
        _this._circle2 = null;
        _this._sexIcon = null;
        _this._headList = [];
        _this._curManId = 1;
        _this._curWomanId = 6;
        _this._descIcon1 = null;
        _this._descIcon2 = null;
        _this._descNode1 = null;
        _this._descNode2 = null;
        _this._descMask1 = null;
        _this._descMask2 = null;
        _this._descMask21 = null;
        _this._descMask22 = null;
        _this._sexClip = null;
        _this._isAnimPlaying = false;
        _this._glowDragon = null;
        _this._manHeadList = [];
        _this._womanHeadList = [];
        //头像角度间隔
        _this._headAngle = 24;
        //头像半径
        _this._headRadius = 336;
        _this._headX = 385;
        _this._headY = 360;
        _this._headAnimTime = 100;
        _this._headAllTime = 300;
        _this._flower = null;
        _this._inputTF = null;
        _this._maxLoadHeadNum = 10;
        _this._curLoadHeadNum = 0;
        return _this;
    }
    CreateUserView.prototype.getResourceList = function () {
        var rewardPic = [
            "createuser_bg",
            "createuser_bottom",
            "createuser_btn",
            "createuser_btn1",
            "createuser_btn2",
            "createuser_changetitle",
            "createuser_desc1",
            "createuser_desc2",
            "createuser_flower",
            "createuser_headbg1",
            "createuser_headbg2",
            "createuser_mask",
            "createuser_namebg",
            "createuser_personbg1",
            "createuser_personbg2",
            "createuser_randombtn",
            "createuser_textmask",
            "createuser_title",
            "createuser_changetitle",
            // "guide_uesrheadbg",
            "createuser_headmask",
            "shield_cn",
        ];
        return _super.prototype.getResourceList.call(this).concat(rewardPic);
    };
    CreateUserView.prototype.getCloseBtnName = function () {
        if (!this.param) {
            return null;
        }
        else {
            return _super.prototype.getCloseBtnName.call(this);
        }
    };
    // 背景图名称
    CreateUserView.prototype.getBgName = function () {
        return "createuser_bg";
    };
    CreateUserView.prototype.initView = function () {
        ViewController.getInstance().hideView("LoginView");
        PlatformManager.analyticsNewGuide(2);
        var bottom = BaseBitmap.create("createuser_bottom");
        bottom.x = 0;
        bottom.y = GameConfig.stageHeigth - bottom.height;
        this.addChild(bottom);
        var inputY = bottom.y - 70 - 46 + (1136 - GameConfig.stageHeigth) / (1136 - 960) * 35;
        if (!this.param) {
            //输入框
            var inputBg = BaseBitmap.create("createuser_namebg");
            inputBg.x = this.viewBg.x + this.viewBg.width / 2 - inputBg.width / 2;
            inputBg.y = inputY;
            this.addChild(inputBg);
            var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_SMALL, 200, 46, null);
            inputTF.x = 220;
            inputTF.y = inputBg.y + inputBg.height / 2 - inputTF.height / 2 + 3;
            this.addChild(inputTF);
            this._inputTF = inputTF;
            this._inputTextField = inputTF.getChildByName("textField");
            this._inputTextField.maxChars = this.getNameLength(1);
            this._inputTextField.textAlign = "center";
            this._inputTextField.addTouchTap(this.inputClick, this, null);
            var randomBtn = ComponentManager.getButton("createuser_randombtn", "", this.clickRanomHandler, this);
            randomBtn.x = 420;
            // randomBtn.x = GameConfig.stageWidth/2 - randomBtn.width/2;
            randomBtn.y = inputBg.y + inputBg.height / 2 - randomBtn.height / 2;
            randomBtn.setColor(TextFieldConst.COLOR_BLACK);
            this.addChild(randomBtn);
            this._isUpdate = false;
        }
        else {
            this._isUpdate = true;
        }
        this._circle1 = BaseBitmap.create("createuser_personbg1");
        this._circle2 = BaseBitmap.create("createuser_personbg2");
        this._circle1.x = 0;
        this._circle1.y = 100 + (inputY - 100) / 2 - this._circle1.height / 2;
        this.addChild(this._circle1);
        this._circle2.x = 0;
        this._circle2.y = 100 + (inputY - 100) / 2 - this._circle2.height / 2;
        this.addChild(this._circle2);
        this._circle2.visible = false;
        //角色形象
        var tmpHeadId = 1;
        if (this.param && this.param.data.changeImg && Api.playerVoApi.getPlayePicId() < 5000) {
            tmpHeadId = Api.playerVoApi.getPlayePicId();
        }
        if (tmpHeadId > 10) {
            tmpHeadId = 1;
        }
        this._picNum = tmpHeadId;
        var mask = BaseBitmap.create("createuser_mask");
        mask.x = this._circle1.x;
        mask.y = this._circle1.y;
        this.addChild(mask);
        // let lightMask = BaseBitmap.create("createuser_mask");
        // lightMask.x = this._circle1.x;
        // lightMask.y = this._circle1.y;
        // this.addChild(lightMask);
        if (App.DeviceUtil.CheckWebglRenderMode() && App.CommonUtil.check_dragon()) {
            this._glowDragon = App.DragonBonesUtil.getLoadDragonBones("createuser_glow");
            this._glowDragon.x = this._circle1.x + 410;
            this._glowDragon.y = this._circle1.y + 415;
            if (this._curSex == 1) {
                this._glowDragon.setIdle("nan_glow");
            }
            else {
                this._glowDragon.setIdle("nv_glow");
            }
            // this._glowDragon.mask = lightMask;
            this.addChild(this._glowDragon);
        }
        // let resPath = "palace_db_3201_male";
        // let maleResPath = "palace_db_3201_male";
        // let femaleResPath = "palace_db_3201_female";
        var maleResPath = "chuangjue_male";
        var femaleResPath = "chuangjue_female";
        var maleImgResPath = "chuangjue_male";
        var femaleImgResPath = "chuangjue_female";
        // let t = false;
        if (App.DeviceUtil.CheckWebglRenderMode() && ResourceManager.hasRes(maleResPath + "_ske") && ResourceManager.hasRes(femaleResPath + "_ske") && Api.switchVoApi.checkOpenCreateUserBones()) 
        // if(1==1)
        {
            this._maxLoadNum = 3;
            this._maleLoadNum = 0;
            this._femaleLoadNum = 0;
            var maleLoadComplete = function (container) {
                this._maleLoadNum++;
                console.log(this._maleLoadNum);
                if (this._maleLoadNum == this._maxLoadNum) {
                    if (this._maleHair) {
                        this._maleHair.visible = true;
                    }
                    if (this._maleBody) {
                        this._maleBody.visible = true;
                    }
                    if (this._maleHead) {
                        this._maleHead.visible = true;
                    }
                }
            };
            var maleLoadCompleteD = function (container) {
                if (this._maleBodyTmp) {
                    var temp = this._maleBody;
                    this._maleBody = this._maleBodyTmp;
                    temp.visible = false;
                    this._maleBody.visible = true;
                    if (this._maleHead) {
                        this._maleHead.visible = true;
                    }
                    if (this._maleHair) {
                        this._maleHair.visible = true;
                    }
                }
            };
            var femaleLoadComplete = function (container) {
                this._femaleLoadNum++;
                if (this._femaleLoadNum == this._maxLoadNum) {
                    if (this._femaleHair) {
                        this._femaleHair.visible = true;
                    }
                    if (this._femaleBody) {
                        this._femaleBody.visible = true;
                    }
                    if (this._femaleHead) {
                        this._femaleHead.visible = true;
                    }
                }
            };
            var femaleLoadCompleteD = function (container) {
                if (this._femaleBodyTmp) {
                    var temp = this._femaleBody;
                    this._femaleBody = this._femaleBodyTmp;
                    temp.visible = false;
                    this._femaleBody.visible = true;
                    if (this._femaleHead) {
                        this._femaleHead.visible = true;
                    }
                    if (this._femaleHair) {
                        this._femaleHair.visible = true;
                    }
                }
            };
            this._container = new BaseDisplayObjectContainer();
            this._container.width = 712;
            this._container.height = 668;
            this._container.x = this.viewBg.x + this.viewBg.width / 2 - 382 / 2 + 5 + 52;
            this._container.y = this._circle1.y + 120; //160 + 125;
            this.addChild(this._container);
            this._maleContainer = new BaseDisplayObjectContainer();
            this._maleContainer.width = 712;
            this._maleContainer.height = 668;
            this._container.addChild(this._maleContainer);
            this._femaleContainer = new BaseDisplayObjectContainer();
            this._femaleContainer.width = 712;
            this._femaleContainer.height = 668;
            this._container.addChild(this._femaleContainer);
            //hair
            var hairPic = "user_hair" + tmpHeadId;
            if (tmpHeadId <= 5) {
                hairPic = "user_hair" + 7;
            }
            else if (tmpHeadId >= 5000) {
                hairPic = "user_hair7";
            }
            var rect12 = new egret.Rectangle(); //egret.Rectangle.create();
            rect12.setTo(0, 0, 85, 140);
            this._maleHair = BaseLoadBitmap.create(hairPic, rect12, { callback: maleLoadComplete, callbackThisObj: this });
            this._maleHair.x = 141;
            this._maleHair.y = -3;
            this._maleHair.visible = false;
            this._maleContainer.addChild(this._maleHair);
            this._femaleHair = BaseLoadBitmap.create(hairPic, rect12, { callback: femaleLoadComplete, callbackThisObj: this });
            this._femaleHair.x = 141;
            this._femaleHair.y = -3;
            this._femaleHair.visible = false;
            this._femaleContainer.addChild(this._femaleHair);
            //body
            var rect = new egret.Rectangle(); //egret.Rectangle.create();
            rect.setTo(0, 0, 712, 700);
            this._maleBody = BaseLoadBitmap.create(maleImgResPath, rect, { callback: maleLoadComplete, callbackThisObj: this });
            this._maleBody.setScale(0.98);
            this._maleBody.x = this._maleBody.x + 382 / 2 - 712 * this._maleBody.scaleX / 2 - 2;
            this._maleBody.y = 71;
            this._maleBody.visible = false;
            this._maleContainer.addChild(this._maleBody);
            this._maleBodyTmp = App.DragonBonesUtil.getLoadDragonBones(maleResPath, 0, "idle", maleLoadCompleteD, this);
            this._maleBodyTmp.setScale(1.5);
            this._maleBodyTmp.x = 117 + 136 / 2;
            this._maleBodyTmp.y = 20;
            this._maleBodyTmp.visible = false;
            this._maleContainer.addChild(this._maleBodyTmp);
            this._femaleBody = BaseLoadBitmap.create(femaleImgResPath, rect, { callback: femaleLoadComplete, callbackThisObj: this });
            this._femaleBody.setScale(0.98);
            this._femaleBody.x = this._femaleBody.x + 382 / 2 - 712 * this._femaleBody.scaleX / 2 + 1;
            this._femaleBody.y = 79;
            this._femaleBody.visible = false;
            this._femaleContainer.addChild(this._femaleBody);
            this._femaleBodyTmp = App.DragonBonesUtil.getLoadDragonBones(femaleResPath, 0, "idle", femaleLoadCompleteD, this);
            this._femaleBodyTmp.setScale(1.5);
            this._femaleBodyTmp.x = 117 + 136 / 2;
            this._femaleBodyTmp.y = 20; //37;
            this._femaleBodyTmp.visible = false;
            this._femaleContainer.addChild(this._femaleBodyTmp);
            //head
            var rect1 = new egret.Rectangle(); //egret.Rectangle.create();
            rect1.setTo(0, 0, 136, 143);
            this._maleHead = BaseLoadBitmap.create("user_head" + tmpHeadId, rect1, { callback: maleLoadComplete, callbackThisObj: this });
            this._maleHead.x = 117;
            this._maleHead.visible = false;
            this._maleContainer.addChild(this._maleHead);
            this._femaleHead = BaseLoadBitmap.create("user_head" + tmpHeadId, rect1, { callback: femaleLoadComplete, callbackThisObj: this });
            this._femaleHead.x = 117;
            this._femaleHead.visible = false;
            this._femaleContainer.addChild(this._femaleHead);
        }
        else {
            this._container = new BaseDisplayObjectContainer();
            this._maleContainer = Api.playerVoApi.getPlayerPortrait(3201, tmpHeadId, null, true, true);
            this._femaleContainer = Api.playerVoApi.getPlayerPortrait(3201, tmpHeadId, null, true, false);
            this._container.width = this._maleContainer.width;
            this._container.height = this._maleContainer.height;
            this._container.addChild(this._maleContainer);
            this._container.addChild(this._femaleContainer);
            this.addChild(this._container);
            this._maleBody = this._maleContainer.getChildByName("myBody");
            this._maleHead = this._maleContainer.getChildByName("myHead");
            this._maleHair = this._maleContainer.getChildByName("myHair");
            this._femaleBody = this._femaleContainer.getChildByName("myBody");
            this._femaleHead = this._femaleContainer.getChildByName("myHead");
            this._femaleHair = this._femaleContainer.getChildByName("myHair");
            this._container.x = this.viewBg.x + this.viewBg.width / 2 - 382 / 2 + 5 + 52;
            this._container.y = this._circle1.y + 120; //160 + 125;
        }
        this._container.setScale(1.1);
        this._container.mask = mask;
        this.createHeadList();
        var iniSexIcon = "createuser_btn1";
        // if(picid <=5){
        // 	this._curManId = picid;
        // } else {
        // 	this._curWomanId = picid;
        // }
        if (this.param) {
            // this._curSex = Api.gameinfoVoApi.getSexnum() == 1?2:1;
            var tempPic = Api.playerVoApi.getPlayePicId();
            if (tempPic > 10) {
                tempPic = 1;
            }
            this._curSex = tempPic <= 5 ? 1 : 2;
            if (this._curSex == 1) {
                this._curManId = tempPic;
            }
            else {
                this._curWomanId = tempPic;
            }
        }
        if (this._curSex == 1) {
            iniSexIcon = "createuser_btn1";
            this._manHeadContainer.visible = true;
            this._womanHeadContainer.visible = false;
            this._circle1.visible = true;
            this._circle2.visible = false;
            this._maleContainer.visible = true;
            this._femaleContainer.visible = false;
        }
        else {
            iniSexIcon = "createuser_btn2";
            this._manHeadContainer.visible = false;
            this._womanHeadContainer.visible = true;
            this._circle1.visible = false;
            this._circle2.visible = true;
            this._maleContainer.visible = false;
            this._femaleContainer.visible = true;
        }
        this.initHead();
        this._sexIcon = BaseBitmap.create(iniSexIcon);
        this._sexIcon.x = GameConfig.stageWidth - this._sexIcon.width;
        this._sexIcon.y = this._circle1.y + 543;
        this.addChild(this._sexIcon);
        this._sexIcon.addTouchTap(this.sexIconClick, this);
        // if(!this._sexClip){
        this._sexClip = ComponentManager.getCustomMovieClip("createuser_seleeff", 7, 100);
        this._sexClip.x = this._sexIcon.x - 6;
        this._sexClip.y = this._sexIcon.y - 8;
        this.addChild(this._sexClip);
        this._sexClip.playWithTime(0);
        // }
        if (Api.switchVoApi.checkOpenWxHexiePic()) {
            // this._manIcon.visible = false;
            this._sexIcon.visible = false;
        }
        //创建角色按钮
        var btnStr = "guideCreateUserViewTitle";
        if (this.param && this.param.data.changeImg) {
            btnStr = "sysConfirm";
        }
        var createBtn = ComponentManager.getButton("createuser_btn", btnStr, this.clickCreateHandler, this, null, null, 26);
        createBtn.setColor(TextFieldConst.COLOR_BROWN_NEW);
        createBtn.x = this.viewBg.x + this.viewBg.width / 2 - createBtn.width / 2;
        createBtn.y = bottom.y - createBtn.height / 2 + (1136 - GameConfig.stageHeigth) / (1136 - 960) * 15; //GameConfig.stageHeigth - createBtn.height - 10;//860;
        var createBtnAnim = ComponentManager.getCustomMovieClip("createuser_anim", 10, 100);
        createBtnAnim.x = createBtn.x + createBtn.width / 2 - 190;
        createBtnAnim.y = createBtn.y + createBtn.height / 2 - 101;
        createBtnAnim.playWithTime(-1);
        createBtnAnim.blendMode = egret.BlendMode.ADD;
        this.addChild(createBtnAnim);
        this._headBg = BaseBitmap.create("guide_bottom");
        this._headBg.width = GameConfig.stageWidth;
        this._headBg.setPosition(0, GameConfig.stageHeigth - 100 - this._headBg.height);
        this.addChild(this._headBg);
        this.addChild(createBtn);
        // this._posContainer = new BaseDisplayObjectContainer();
        // this.addChild(this._posContainer);
        // createuser_desc1
        //右侧文字----
        this._descIcon1 = BaseBitmap.create("createuser_desc1");
        this._descNode1 = new BaseDisplayObjectContainer();
        this._descNode1.width = this._descIcon1.width;
        this._descNode1.height = this._descIcon1.height;
        this._descNode1.addChild(this._descIcon1);
        if (PlatformManager.checkIsViSp()) {
            this._descNode1.x = 389 - this._descIcon1.width / 2;
            this._descNode1.y = this._circle1.y + 10;
            this._descMask1 = BaseBitmap.create("createuser_textmask");
            this._descMask1.width = this._descIcon1.height;
            this._descMask1.height = 16;
            this._descMask1.rotation = -90;
            this._descMask1.x = -16;
            this._descMask1.y = this._descIcon1.height;
            this._descNode1.addChild(this._descMask1);
            this._descIcon1.mask = this._descMask1;
        }
        else if (PlatformManager.checkIsKRSp()) {
            this._descNode1.x = 389 - this._descIcon1.width / 2;
            this._descNode1.y = this._circle1.y + 10;
            this._descMask1 = BaseBitmap.create("createuser_textmask");
            this._descMask1.width = this._descIcon1.height;
            this._descMask1.height = 16;
            this._descMask1.rotation = -90;
            this._descMask1.x = -16;
            this._descMask1.y = this._descIcon1.height;
            this._descNode1.addChild(this._descMask1);
            this._descIcon1.mask = this._descMask1;
        }
        else if (PlatformManager.checkIsKRNewSp()) {
            this._descNode1.x = 389 - this._descIcon1.width / 2;
            this._descNode1.y = this._circle1.y + 10;
            this._descMask1 = BaseBitmap.create("createuser_textmask");
            this._descMask1.width = this._descIcon1.height;
            this._descMask1.height = 16;
            this._descMask1.rotation = -90;
            this._descMask1.x = -16;
            this._descMask1.y = this._descIcon1.height;
            this._descNode1.addChild(this._descMask1);
            this._descIcon1.mask = this._descMask1;
        }
        else if (PlatformManager.checkIsJPSp()) {
            this._descNode1.x = GameConfig.stageWidth - this._descIcon1.width;
            this._descNode1.y = this._circle1.y;
            this._descMask1 = BaseBitmap.create("createuser_textmask");
            this._descMask1.width = this._descIcon1.width;
            this._descMask1.height = 16;
            this._descMask1.x = 0;
            this._descMask1.y = -16;
            this._descNode1.addChild(this._descMask1);
            this._descIcon1.mask = this._descMask1;
        }
        else {
            this._descNode1.x = GameConfig.stageWidth - this._descNode1.width;
            this._descNode1.y = this._circle1.y;
            this._descMask1 = BaseBitmap.create("createuser_textmask");
            this._descMask1.width = this._descIcon1.width;
            this._descMask1.height = 16;
            this._descMask1.x = 0;
            this._descMask1.y = -16;
            this._descNode1.addChild(this._descMask1);
            this._descIcon1.mask = this._descMask1;
        }
        this.addChild(this._descNode1);
        //女的右侧文字
        this._descIcon2 = BaseBitmap.create("createuser_desc2");
        this._descNode2 = new BaseDisplayObjectContainer();
        this._descNode2.width = this._descIcon2.width;
        this._descNode2.height = this._descIcon2.height;
        this._descNode2.addChild(this._descIcon2);
        if (PlatformManager.checkIsViSp()) {
            this._descNode2.x = 389 - this._descIcon1.width / 2;
            this._descNode2.y = this._circle1.y + 10;
            this._descMask2 = BaseBitmap.create("createuser_textmask");
            this._descMask2.width = this._descIcon2.height;
            this._descMask2.height = 16;
            this._descMask2.rotation = -90;
            this._descMask2.x = -16;
            this._descMask2.y = this._descIcon2.height;
            this._descNode2.addChild(this._descMask2);
            this._descIcon2.mask = this._descMask2;
        }
        else if (PlatformManager.checkIsKRSp()) {
            this._descNode2.x = 389 - this._descIcon1.width / 2;
            this._descNode2.y = this._circle1.y + 10;
            this._descMask2 = BaseBitmap.create("createuser_textmask");
            this._descMask2.width = this._descIcon2.height;
            this._descMask2.height = 16;
            this._descMask2.rotation = -90;
            this._descMask2.x = -16;
            this._descMask2.y = this._descIcon2.height;
            this._descNode2.addChild(this._descMask2);
            this._descIcon2.mask = this._descMask2;
        }
        else if (PlatformManager.checkIsKRNewSp()) {
            this._descNode2.x = 389 - this._descIcon1.width / 2;
            this._descNode2.y = this._circle1.y + 10;
            this._descMask2 = BaseBitmap.create("createuser_textmask");
            this._descMask2.width = this._descIcon2.height;
            this._descMask2.height = 16;
            this._descMask2.rotation = -90;
            this._descMask2.x = -16;
            this._descMask2.y = this._descIcon2.height;
            this._descNode2.addChild(this._descMask2);
            this._descIcon2.mask = this._descMask2;
        }
        else if (PlatformManager.checkIsJPSp()) {
            this._descNode2.x = GameConfig.stageWidth - this._descIcon1.width;
            this._descNode2.y = this._circle1.y;
            this._descMask2 = BaseBitmap.create("createuser_textmask");
            this._descMask2.width = this._descIcon2.width;
            this._descMask2.height = 16;
            this._descMask2.x = 0;
            this._descMask2.y = -16;
            this._descNode2.addChild(this._descMask2);
            this._descIcon2.mask = this._descMask2;
        }
        else {
            this._descNode2.x = GameConfig.stageWidth - this._descNode2.width;
            this._descNode2.y = this._circle1.y;
            this._descMask2 = BaseBitmap.create("createuser_textmask");
            this._descMask2.width = this._descIcon2.width;
            this._descMask2.height = 16;
            this._descMask2.x = 0;
            this._descMask2.y = -16;
            this._descNode2.addChild(this._descMask2);
            this._descIcon2.mask = this._descMask2;
        }
        this.addChild(this._descNode2);
        this._flower = BaseBitmap.create("createuser_flower");
        this._flower.x = -20;
        this._flower.y = -20;
        this.addChild(this._flower);
        this.flowerAnim();
        if (App.DeviceUtil.CheckWebglRenderMode() && App.CommonUtil.check_dragon()) {
            // this._glowDragon = App.DragonBonesUtil.getLoadDragonBones("createuser_glow");
            // this._glowDragon.x = this._circle1.x + 400;
            // this._glowDragon.y = this._circle1.y + 400;
            // if(this._curSex == 1){
            // 	this._glowDragon.setIdle("nan_glow");
            // } else {
            // 	this._glowDragon.setIdle("nv_glow");
            // }
            // // this._glowDragon.mask = lightMask;
            // this.addChild(this._glowDragon);
            var flowerDragon = App.DragonBonesUtil.getLoadDragonBones("createuser_huaban");
            flowerDragon.x = 100;
            flowerDragon.y = 100;
            flowerDragon.setIdle("huaban");
            this.addChild(flowerDragon);
        }
        if (this._curSex == 1) {
            this._descIcon1.visible = true;
            this._descIcon2.visible = false;
            if (PlatformManager.checkIsViSp()) {
                this._descMask1.height = this._descIcon1.width + 32;
            }
            else if (PlatformManager.checkIsKRSp()) {
                this._descMask1.height = this._descIcon1.width + 32;
            }
            else if (PlatformManager.checkIsKRNewSp()) {
                this._descMask1.height = this._descIcon1.width + 32;
            }
            else if (PlatformManager.checkIsJPSp()) {
                this._descMask1.height = this._descIcon1.height + 32;
            }
            else {
                this._descMask1.height = this._descIcon1.height + 32;
            }
            // if(this._glowDragon){
            // 	this._glowDragon.playDragonMovie("nan_glow",0);
            // }
        }
        else {
            this._descIcon1.visible = false;
            this._descIcon2.visible = true;
            // this._descMask2.height = this._descIcon2.height + 32;
            if (PlatformManager.checkIsViSp()) {
                this._descMask2.height = this._descIcon2.width + 32;
            }
            else if (PlatformManager.checkIsKRSp()) {
                this._descMask2.height = this._descIcon2.width + 32;
            }
            else if (PlatformManager.checkIsKRNewSp()) {
                this._descMask2.height = this._descIcon2.width + 32;
            }
            else if (PlatformManager.checkIsJPSp()) {
                this._descMask2.height = this._descIcon2.height + 32;
            }
            else {
                this._descMask2.height = this._descIcon2.height + 32;
            }
            // if(this._glowDragon){
            // 	this._glowDragon.playDragonMovie("nv_glow",0);
            // }
        }
        if (!this.param) {
            this.clickRanomHandler();
        }
        if (PlatformManager.checkIsWxCfg()) {
            this.showLoop();
            TimerManager.doTimer(1200, 0, this.showLoop, this);
        }
        if (this.param && this.param.data.changeImg) {
        }
        else if (Api.switchVoApi.checkOpenAutoEnterGame()) {
            var wordStr = LanguageManager.getlocal("autoEnterGame", ["20"]);
            this._enterTxt = ComponentManager.getTextField(wordStr, 18);
            this.addChild(this._enterTxt);
            this._enterTxt.textAlign = egret.HorizontalAlign.CENTER;
            // this._enterTxt.setPosition(createBtn.x +this._enterTxt.width/2-this._enterTxt.width/2 ,createBtn.y -20);
            // this._enterTxt.x = 20;
            this._enterTxt.x = GameConfig.stageWidth / 2 - this._enterTxt.width / 2;
            // this._enterTxt.y = GameConfig.stageHeigth - 25 - this._enterTxt.height;
            this._enterTxt.y = this._inputTF.y - this._enterTxt.height - 3;
        }
    };
    CreateUserView.prototype.flowerAnim = function () {
        // let randomT = 500 + Math.floor(Math.random() * 800);
        // let randomR = 2.5 + Math.random();
        // egret.Tween.get(this._flower,{loop:true})
        // .to({rotation:randomR},randomT,egret.Ease.quadOut)
        // .to({rotation:-randomR},randomT*2,egret.Ease.quadInOut)
        // .to({rotation:0},randomT,egret.Ease.quadIn);
        var randomT = 2000 + Math.floor(Math.random() * 800);
        var randomR = 2.5 + Math.random();
        egret.Tween.get(this._flower, { loop: true })
            .to({ rotation: 1.5 * randomR }, randomT, egret.Ease.quadOut)
            .to({ rotation: -0.5 * randomR }, randomT * 2, egret.Ease.quadInOut)
            .to({ rotation: 0 }, randomT, egret.Ease.quadIn);
        var randomTT = 5000 + Math.floor(Math.random() * 800);
        var x = this._flower.x;
        var y = this._flower.y;
        egret.Tween.get(this._flower, { loop: true })
            .to({ x: x + 10, y: y + 5 }, randomTT, egret.Ease.quadOut)
            .to({ x: x - 10, y: y - 5 }, randomTT * 2, egret.Ease.quadInOut)
            .to({ x: x, y: y }, randomTT, egret.Ease.quadIn);
    };
    CreateUserView.prototype.createHeadList = function () {
        this._manHeadContainer = new BaseDisplayObjectContainer();
        this._manHeadContainer.width = this._circle1.width;
        this._manHeadContainer.height = this._circle1.height;
        this._manHeadContainer.x = this._circle1.x;
        this._manHeadContainer.y = this._circle1.y;
        var headMask1 = BaseBitmap.create("createuser_headmask");
        headMask1.width = this._circle1.width / 2 - 50;
        headMask1.height = this._circle1.height;
        this._manHeadContainer.addChild(headMask1);
        this._manHeadContainer.mask = headMask1;
        this._womanHeadContainer = new BaseDisplayObjectContainer();
        this._womanHeadContainer.width = this._circle1.width;
        this._womanHeadContainer.height = this._circle1.height;
        this._womanHeadContainer.x = this._circle1.x;
        this._womanHeadContainer.y = this._circle1.y;
        var headMask2 = BaseBitmap.create("createuser_headmask");
        headMask2.width = this._circle1.width / 2 - 50;
        headMask2.height = this._circle1.height;
        this._womanHeadContainer.addChild(headMask2);
        this._womanHeadContainer.mask = headMask2;
        this.addChild(this._manHeadContainer);
        this.addChild(this._womanHeadContainer);
        for (var index = 0; index < 10; index++) {
            var headNode = this.createHead(index + 1);
            if (index <= 4) {
                this._manHeadContainer.addChild(headNode);
                this._manHeadList.push(headNode);
                headNode.rotation = (2 - index % 5) * this._headAngle;
            }
            else {
                this._womanHeadContainer.addChild(headNode);
                this._womanHeadList.push(headNode);
                headNode.rotation = (2 - index % 5) * this._headAngle;
            }
            headNode.x = this._headX;
            headNode.y = this._headY;
            headNode["head"].rotation = -headNode.rotation;
            this._headList.push(headNode["head"]);
        }
    };
    CreateUserView.prototype.createHead = function (headId) {
        // let radius = 336;
        var headNode = new BaseDisplayObjectContainer();
        headNode.width = 100;
        headNode.height = 100;
        headNode.anchorOffsetX = this._headRadius + headNode.width / 2;
        headNode.anchorOffsetY = headNode.height / 2;
        headNode.addTouchTap(this.changeHeadHandler, this, [headId]);
        var head = new BaseDisplayObjectContainer();
        head.width = 100;
        head.height = 100;
        head.anchorOffsetX = 50;
        head.anchorOffsetY = 50;
        head.x = 50;
        head.y = 50;
        head.visible = false;
        headNode["head"] = head;
        headNode.addChild(head);
        var headBg1 = BaseBitmap.create("createuser_headbg1");
        headBg1.anchorOffsetX = headBg1.width / 2;
        headBg1.anchorOffsetY = headBg1.height / 2;
        headBg1.x = 50;
        headBg1.y = 50;
        head["unselected"] = headBg1;
        head.addChild(headBg1);
        var headBg2 = BaseBitmap.create("createuser_headbg2");
        headBg2.anchorOffsetX = headBg2.width / 2;
        headBg2.anchorOffsetY = headBg2.height / 2;
        headBg2.x = 50;
        headBg2.y = 50;
        headBg2.visible = false;
        head["selected"] = headBg2;
        head.addChild(headBg2);
        var selclip = ComponentManager.getCustomMovieClip("createuser_headeff", 7, 150);
        selclip.x = head.width / 2 - 80;
        selclip.y = head.height / 2 - 80;
        selclip.playWithTime(0);
        selclip.visible = false;
        head["selclip"] = selclip;
        head.addChild(selclip);
        var headPic = "user_head" + headId;
        var userHead = BaseLoadBitmap.create(headPic, null, { callback: this.headLoadComplete, callbackThisObj: this });
        userHead.width = 136;
        userHead.height = 143;
        userHead.scaleX = 0.7;
        userHead.scaleY = 0.7;
        userHead.x = head.width / 2 - userHead.width / 2 * userHead.scaleX;
        userHead.y = -15;
        head.addChild(userHead);
        return headNode;
    };
    CreateUserView.prototype.headLoadComplete = function () {
        // this._maxLoadHeadNum = 10;
        // this._curLoadHeadNum = 0;
        this._curLoadHeadNum++;
        if (this._curLoadHeadNum == this._maxLoadHeadNum) {
            // this._headList
            for (var i = 0; i < this._headList.length; i++) {
                var head = this._headList[i];
                head.visible = true;
            }
        }
    };
    /**
     * 倒计时结束后，自动以当前选中头像，和当前显示的玩家名字生成角色信息。
        若当前显示玩家名字不可用，则再随机一个可用的玩家名字。

        玩家进行任意操作时，倒计时恢复为20秒
     */
    CreateUserView.prototype.resetAutoEnterGame = function () {
        if (Api.switchVoApi.checkOpenAutoEnterGame() && this._enterTxt) {
            this._enterSecond = 20;
            var wordStr = LanguageManager.getlocal("autoEnterGame", [this._enterSecond + ""]);
            this._enterTxt.text = wordStr;
            this._enterTxt.visible = true;
        }
    };
    CreateUserView.prototype.inputClick = function () {
        if (Api.switchVoApi.checkOpenAutoEnterGame() && this._enterTxt) {
            this._enterTxt.visible = false;
            this._enterSecond = 99999;
        }
    };
    CreateUserView.prototype.tick = function () {
        if (Api.switchVoApi.checkOpenAutoEnterGame() && this._enterTxt) {
            var wordStr = LanguageManager.getlocal("autoEnterGame", [this._enterSecond + ""]);
            this._enterTxt.text = wordStr;
            this._enterTxt.x = GameConfig.stageWidth / 2 - this._enterTxt.width / 2;
            this._enterSecond--;
            if (this._enterSecond <= 0) {
                this._enterTxt.visible = false;
                this._enterSecond = 99999;
                this.clickCreateHandler();
            }
        }
    };
    /**
     * 假的进入游戏
     */
    CreateUserView.prototype.showLoop = function () {
        if (!this.container) {
            return;
        }
        var firstName = "";
        // if(PlatformManager.checkIsViSp()){
        // } else {
        firstName = LanguageManager.getlocal("userName_firstName" + App.MathUtil.getRandom(1, 603));
        // }
        var sercondName = LanguageManager.getlocal("userName_secondName" + App.MathUtil.getRandom(1, 3760));
        var userName = firstName + sercondName;
        var idIndex = App.MathUtil.getRandom(1, Number(ServerCfg.selectServer.zid) + 1);
        var zidStr = LanguageManager.getlocal("serverListServerTitle", [String(idIndex)]);
        var wordStr = LanguageManager.getlocal("guideNameTip", [zidStr, userName]);
        var words = ComponentManager.getTextField(wordStr, 20);
        var wordNode = new BaseDisplayObjectContainer();
        var wordBg = BaseBitmap.create("public_9_viewmask");
        wordBg.alpha = 0.5;
        wordNode.width = wordBg.width = words.width + 5;
        wordNode.height = wordBg.height = words.height + 5;
        wordBg.x = 0;
        wordBg.y = 0;
        wordNode.addChild(wordBg);
        words.x = wordNode.x + wordNode.width / 2 - words.width / 2;
        words.y = wordNode.y + wordNode.height / 2 - words.height / 2;
        wordNode.addChild(words);
        // words.setColor(TextFieldConst.COLOR_WHITE);
        wordNode.x = GameConfig.stageWidth / 2 - wordNode.width / 2 + 60;
        wordNode.y = 145;
        this.addChild(wordNode);
        egret.Tween.get(wordNode)
            .to({ y: 85 }, 2800).call(function (wordNode) {
            // BaseBitmap.release(words);
            wordNode.dispose();
            wordNode = null;
        }, this, [wordNode]);
    };
    CreateUserView.prototype.sexIconClick = function () {
        var _this = this;
        if (this._isAnimPlaying) {
            return;
        }
        this._isAnimPlaying = true;
        var picid = 0;
        if (this._curSex == 1) {
            this._curSex = 2;
            this._sexIcon.setRes("createuser_btn2");
            // this._sexIcon.alpha
            egret.Tween.get(this._circle1)
                .set({ alpha: 1 })
                .to({ alpha: 0 }, 300)
                .set({ visible: false });
            egret.Tween.get(this._circle2)
                .set({ visible: true, alpha: 0 })
                .to({ alpha: 1 }, 300);
            //右侧文字
            egret.Tween.get(this._descIcon1)
                .to({ alpha: 0 }, 200)
                .set({ visible: false });
            if (PlatformManager.checkIsViSp()) {
                this._descMask2.height = 16;
                this._descIcon2.visible = true;
                this._descIcon2.alpha = 1;
                egret.Tween.get(this._descMask2)
                    .wait(200)
                    .to({ height: this._descIcon2.width + 32 }, 500);
            }
            else if (PlatformManager.checkIsKRSp()) {
                this._descMask2.height = 16;
                this._descIcon2.visible = true;
                this._descIcon2.alpha = 1;
                egret.Tween.get(this._descMask2)
                    .wait(200)
                    .to({ height: this._descIcon2.width + 32 }, 500);
            }
            else if (PlatformManager.checkIsKRNewSp()) {
                this._descMask2.height = 16;
                this._descIcon2.visible = true;
                this._descIcon2.alpha = 1;
                egret.Tween.get(this._descMask2)
                    .wait(200)
                    .to({ height: this._descIcon2.width + 32 }, 500);
            }
            else if (PlatformManager.checkIsJPSp()) {
                this._descMask2.height = 16;
                this._descIcon2.visible = true;
                this._descIcon2.alpha = 1;
                egret.Tween.get(this._descMask2)
                    .wait(200)
                    .to({ height: this._descIcon2.height + 32 }, 500);
            }
            else {
                this._descMask2.height = 16;
                this._descIcon2.visible = true;
                this._descIcon2.alpha = 1;
                egret.Tween.get(this._descMask2)
                    .wait(200)
                    .to({ height: this._descIcon2.height + 32 }, 500);
            }
            egret.Tween.get(this._circle1)
                .call(function () {
                _this.closeHead(1);
            })
                .wait(800)
                .call(function () {
                _this.openHead(2);
            });
            //////////////
            // this._manHeadContainer.visible = false;
            // this._womanHeadContainer.visible = true;
            picid = this._curWomanId;
            this._sexClip.y = this._sexIcon.y + 58;
            if (this._glowDragon) {
                this._glowDragon.playDragonMovie("nv_glow", 0);
            }
        }
        else {
            this._curSex = 1;
            this._sexIcon.setRes("createuser_btn1");
            egret.Tween.get(this._circle2)
                .set({ alpha: 1 })
                .to({ alpha: 0 }, 300)
                .set({ visible: false });
            egret.Tween.get(this._circle1)
                .set({ visible: true, alpha: 0 })
                .to({ alpha: 1 }, 300);
            //右侧文字
            egret.Tween.get(this._descIcon2)
                .to({ alpha: 0 }, 200)
                .set({ visible: false });
            // this._descMask1.height = 16;
            // this._descIcon1.visible = true;
            // this._descIcon1.alpha = 1;
            // egret.Tween.get(this._descMask1)
            // .wait(200)
            // .to({height:this._descIcon1.height + 32},500)
            if (PlatformManager.checkIsViSp()) {
                this._descMask1.height = 16;
                this._descIcon1.visible = true;
                this._descIcon1.alpha = 1;
                egret.Tween.get(this._descMask1)
                    .wait(200)
                    .to({ height: this._descIcon1.width + 32 }, 500);
            }
            else if (PlatformManager.checkIsKRSp()) {
                this._descMask1.height = 16;
                this._descIcon1.visible = true;
                this._descIcon1.alpha = 1;
                egret.Tween.get(this._descMask1)
                    .wait(200)
                    .to({ height: this._descIcon1.width + 32 }, 500);
            }
            else if (PlatformManager.checkIsKRNewSp()) {
                this._descMask1.height = 16;
                this._descIcon1.visible = true;
                this._descIcon1.alpha = 1;
                egret.Tween.get(this._descMask1)
                    .wait(200)
                    .to({ height: this._descIcon1.width + 32 }, 500);
            }
            else if (PlatformManager.checkIsJPSp()) {
                this._descMask1.height = 16;
                this._descIcon1.visible = true;
                this._descIcon1.alpha = 1;
                egret.Tween.get(this._descMask1)
                    .wait(200)
                    .to({ height: this._descIcon1.height + 32 }, 500);
            }
            else {
                this._descMask1.height = 16;
                this._descIcon1.visible = true;
                this._descIcon1.alpha = 1;
                egret.Tween.get(this._descMask1)
                    .wait(200)
                    .to({ height: this._descIcon1.height + 32 }, 500);
            }
            egret.Tween.get(this._circle1)
                .call(function () {
                _this.closeHead(2);
            })
                .wait(800)
                .call(function () {
                _this.openHead(1);
            });
            picid = this._curManId;
            this._sexClip.y = this._sexIcon.y - 8;
            if (this._glowDragon) {
                this._glowDragon.playDragonMovie("nan_glow", 0);
            }
        }
        //人物形象更换
        var cur = -1;
        if (picid - this._picNum > 0) {
            cur = 1;
        }
        // this._index = index;
        this._picNum = picid;
        var index = (picid - 1);
        var centerX = this.viewBg.x + this.viewBg.width / 2 - 382 / 2 + 5 + 52;
        var centerY = 160 + 125;
        egret.Tween.get(this._container)
            .to({ x: -500 * cur + centerY }, 300, egret.Ease.backIn)
            .set({ x: 500 * cur + centerY })
            .call(this.sexChangeHead, this)
            .to({ x: centerX }, 300, egret.Ease.circOut);
        this.resetAutoEnterGame();
        egret.Tween.get(this)
            .wait(1300)
            .call(function () {
            _this._isAnimPlaying = false;
        });
    };
    //sex=1 展开男的  sex=2展开女
    CreateUserView.prototype.openHead = function (sex) {
        // if(1==1){
        // 	return;
        // }
        var headList = null;
        var curCon = null;
        if (sex == 1) {
            headList = this._manHeadList;
            curCon = this._manHeadContainer;
        }
        else {
            headList = this._womanHeadList;
            curCon = this._womanHeadContainer;
        }
        curCon.visible = true;
        for (var i = 0; i < headList.length; i++) {
            headList[i].rotation = -90; //(2 - i) * this._headAngle;
            if (i == 0) {
                egret.Tween.get(headList[i], { onChange: this.changeAngle, onChangeObj: headList[i] })
                    .wait(this._headAnimTime * i)
                    .to({ rotation: (2 - i) * this._headAngle }, this._headAllTime, egret.Ease.circOut);
            }
            else {
                egret.Tween.get(headList[i], { onChange: this.changeAngle, onChangeObj: headList[i] })
                    .wait(this._headAnimTime * i)
                    .to({ rotation: (2 - i) * this._headAngle }, this._headAllTime, egret.Ease.circOut);
            }
        }
    };
    CreateUserView.prototype.changeAngle = function () {
        this["head"].rotation = -this.rotation;
    };
    //sex=1 关闭男的  sex=2关闭女
    CreateUserView.prototype.closeHead = function (sex) {
        var headList = null;
        var curCon = null;
        if (sex == 1) {
            headList = this._manHeadList;
            curCon = this._manHeadContainer;
        }
        else {
            headList = this._womanHeadList;
            curCon = this._womanHeadContainer;
        }
        for (var i = 0; i < headList.length; i++) {
            headList[i].rotation = (2 - i) * this._headAngle;
            if (i == 0) {
                egret.Tween.get(headList[i], { onChange: this.changeAngle, onChangeObj: headList[i] })
                    .wait(this._headAnimTime * (4 - i))
                    .to({ rotation: -90 }, this._headAllTime) //,egret.Ease.circIn)
                    .call(function () {
                    curCon.visible = false;
                });
            }
            else {
                egret.Tween.get(headList[i], { onChange: this.changeAngle, onChangeObj: headList[i] })
                    .wait(this._headAnimTime * (4 - i))
                    .to({ rotation: -90 }, this._headAllTime); //,egret.Ease.circIn);
            }
        }
    };
    CreateUserView.prototype.initHead = function () {
        for (var i = 0; i < this._headList.length / 2; i++) {
            var head = this._headList[i];
            if (i + 1 == this._curManId) {
                head["selected"].visible = true;
                head["selclip"].visible = true;
                head["unselected"].visible = false;
            }
            else {
                head["selected"].visible = false;
                head["selclip"].visible = false;
                head["unselected"].visible = true;
            }
        }
        for (var j = 5; j < this._headList.length; j++) {
            var head = this._headList[j];
            if (j + 1 == this._curWomanId) {
                head["selected"].visible = true;
                head["selclip"].visible = true;
                head["unselected"].visible = false;
            }
            else {
                head["selected"].visible = false;
                head["selclip"].visible = false;
                head["unselected"].visible = true;
            }
        }
    };
    CreateUserView.prototype.changeHeadHandler = function (evt, picid) {
        if (this._picNum == picid) {
            return;
        }
        if (this._curSex == 1) {
            for (var i = 0; i < this._headList.length / 2; i++) {
                var head = this._headList[i];
                if (i + 1 == picid) {
                    head["selected"].visible = true;
                    head["selclip"].visible = true;
                    head["unselected"].visible = false;
                }
                else {
                    head["selected"].visible = false;
                    head["selclip"].visible = false;
                    head["unselected"].visible = true;
                }
            }
        }
        else {
            for (var j = 5; j < this._headList.length; j++) {
                var head = this._headList[j];
                if (j + 1 == picid) {
                    head["selected"].visible = true;
                    head["selclip"].visible = true;
                    head["unselected"].visible = false;
                }
                else {
                    head["selected"].visible = false;
                    head["selclip"].visible = false;
                    head["unselected"].visible = true;
                }
            }
        }
        // this._picNum = picid;
        if (picid <= 5) {
            this._curManId = picid;
        }
        else {
            this._curWomanId = picid;
        }
        this.resetAutoEnterGame();
        // this._selectBg.x = evt.target.x - 1;
        // this._selectBg.y = evt.target.y - 3;
        var cur = -1;
        if (picid - this._picNum > 0) {
            cur = 1;
        }
        // this._index = index;
        this._picNum = picid;
        var index = (picid - 1);
        var centerX = this.viewBg.x + this.viewBg.width / 2 - 382 / 2 + 5 + 52;
        var centerY = 160 + 125;
        egret.Tween.get(this._container)
            .to({ x: -500 * cur + centerY }, 300, egret.Ease.backIn)
            .set({ x: 500 * cur + centerY })
            .call(this.changeHead, this)
            .to({ x: centerX }, 300, egret.Ease.circOut);
    };
    CreateUserView.prototype.sexChangeHead = function () {
        // if(!this._isLoad)
        // {
        // 	this._isLoad = true;
        // 	return;
        // }
        var dis = 0;
        // if(this._curSex == 2){
        // 	dis = 5;
        // }
        if (this._curSex == 1) {
            this._maleContainer.visible = true;
            this._femaleContainer.visible = false;
        }
        else {
            this._maleContainer.visible = false;
            this._femaleContainer.visible = true;
        }
        // let hairPic = "user_hair" + tmpHeadId;
        // if(tmpHeadId <= 5){
        // 	hairPic = "user_hair" + 7;
        // } else if (tmpHeadId >= 5000) {
        // 	hairPic = "user_hair7";
        // }
        var headPic = "user_head" + (this._picNum + dis);
        var hairPic = "user_hair" + (this._picNum + dis);
        if (this._picNum <= 5) {
            hairPic = "user_hair" + 7;
        }
        // this._myHead.texture = ResourceManager.getRes(headPic);
        // this._myHair.texture = ResourceManager.getRes(hairPic);
        this._maleHead.setload(headPic);
        this._maleHair.setload(hairPic);
        this._femaleHead.setload(headPic);
        this._femaleHair.setload(hairPic);
        // this._myHair.texture = ResourceManager.getRes(hairPic);
    };
    CreateUserView.prototype.changeHead = function () {
        // if(!this._isLoad)
        // {
        // 	this._isLoad = true;
        // 	return;
        // }
        var dis = 0;
        // if(this._curSex == 2){
        // 	dis = 5;
        // }
        var headPic = "user_head" + (this._picNum + dis);
        var hairPic = "user_hair" + (this._picNum + dis);
        if (this._picNum <= 5) {
            hairPic = "user_hair" + 7;
        }
        // this._myHead.texture = ResourceManager.getRes(headPic);
        // this._myHair.texture = ResourceManager.getRes(hairPic);
        this._maleHead.setload(headPic);
        this._maleHair.setload(hairPic);
        this._femaleHead.setload(headPic);
        this._femaleHair.setload(hairPic);
        // this._myHair.texture = ResourceManager.getRes(hairPic);
    };
    CreateUserView.prototype.clickCreateHandler = function () {
        // let picId = this._index+1;
        // if(picId==1&&this._picNum==6&&this._sextype==2)
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("changeImgTip2"));
        // 	this.hide();
        // 	return
        // }
        // if(this._sextype==2&&this._index<5)
        // {
        // 	picId=picId+5;
        // }
        if (this.param && this.param.data.changeImg) {
            if (this._picNum == Api.playerVoApi.getPlayePicId()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("changeImgTip2"));
                this.hide();
            }
            else {
                this.request(NetRequestConst.REQUEST_USER_CHANGEPIC, { pic: this._picNum, sexnum: this._curSex == 1 ? null : 1 });
            }
            return;
        }
        //正则表达式
        var txtStr = this._inputTextField.text.trim();
        if (txtStr.indexOf(" ") != -1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
            return;
        }
        if (!App.StringUtil.userNameCheck(txtStr) && !PlatformManager.checkIsViSp()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip1"));
            return;
        }
        if (txtStr.length < 2 || txtStr.length > this.getNameLength()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip2"));
            return;
        }
        if (Config.ShieldCfg.checkShield(txtStr) == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        if (App.StringUtil.checkCharacter(txtStr) && PlatformManager.checkIsViSp()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
            return;
        }
        if (App.StringUtil.checkChar(txtStr)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        PlatformManager.analytics37Point("custom_loss", "account_creation", 1);
        if (PlatformManager.checkIsMwSp()) {
            this.request(NetRequestConst.REQUEST_USER_CREATEUSER, {
                sexnum: this._curSex == 1 ? null : 1,
                server_name: ServerCfg.selectServer.sname,
                name: txtStr,
                pic: this._picNum
            });
        }
        else {
            this.request(NetRequestConst.REQUEST_USER_CREATEUSER, { name: txtStr, pic: this._picNum, sexnum: this._curSex == 1 ? null : 1 });
        }
    };
    CreateUserView.prototype.getNameLength = function (type) {
        if (type === void 0) { type = 0; }
        if (PlatformManager.checkIsEnSp() || PlatformManager.checkIsViSp()) {
            return GameData.nameLength;
        }
        else {
            //输入限制
            if (type == 1) {
                return 8;
            }
            return 6;
        }
    };
    CreateUserView.prototype.clickRanomHandler = function () {
        this._userNameCount = 0;
        this.randomName();
        this.resetAutoEnterGame();
    };
    CreateUserView.prototype.randomName = function () {
        var firstName = "";
        // if(PlatformManager.checkIsViSp()){
        // } else {
        firstName = LanguageManager.getlocal("userName_firstName" + App.MathUtil.getRandom(1, 603));
        // }
        var sercondName = LanguageManager.getlocal("userName_secondName" + App.MathUtil.getRandom(1, 3761));
        this._userName = firstName + sercondName;
        this._userNameCount++;
        if (this._userNameCount >= 5) {
            this._inputTextField.text = this._userName;
        }
        else {
            this.request(NetRequestConst.REQUEST_USER_CHECKNAME, { name: this._userName });
        }
    };
    CreateUserView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_USER_CHECKNAME) {
            if (data.data.data.nameflag == 0) {
                this._inputTextField.text = this._userName;
            }
            else {
                this.randomName();
            }
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_USER_CREATEUSER) {
            if (PlatformManager.checkIsWxmgSp() && data.data.data.msgres && data.data.data.msgres.data.result == 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
                return;
            }
            if (PlatformManager.checkIsMwSp() && data.data && data.data.data.msgres) {
                if (data.data.data.msgres.result && data.data.data.msgres.result == "verify_fail") {
                    App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
                    return;
                }
            }
            if (data.data.data.nameflag == 0) {
                if (GameData.wbrewards != null) {
                    ViewController.getInstance().openView(ViewConst.POPUP.GETGIFTPOPUPVIEW, { rewards: GameData.wbrewards, f: this.startRookieGuide, o: this });
                }
                else {
                    //玩吧积分礼包
                    if (PlatformManager.getGiftId() == "501" || PlatformManager.getGiftId() == "502") {
                        if (GameData.wbrewardsFlag) {
                            PlatformManager.giftExchange(this.exchangeCallback, this);
                            // this.exchangeCallback("0",{ret:"0"});
                        }
                        else {
                            ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW, { rewards: GameData.wbrewards, code: "2003" });
                        }
                    }
                    else {
                        this.startRookieGuide();
                    }
                }
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError" + data.data.data.nameflag));
                return;
            }
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_USER_CHANGEPIC) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
            App.CommonUtil.showTip(LanguageManager.getlocal("changeImgTip1"));
            this.hide();
        }
        if (data.data.cmd == NetRequestConst.REQUEST_OTHERINFO_GETWBSCOREREWARD) {
            if (data.data.data && data.data.data.rewards) {
                // ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW,{rewards:GameData.wbrewards,code:"0"});
                ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW, { rewards: data.data.data.rewards, f: this.startRookieGuide, o: this, code: "0" });
            }
        }
    };
    CreateUserView.prototype.getTitleBgName = function () {
        //createuser_changetitle
        if (this.param) {
            return "createuser_changetitle";
        }
        else {
            return "createuser_title";
        }
    };
    CreateUserView.prototype.getTitleStr = function () {
        return null;
    };
    CreateUserView.prototype.exchangeCallback = function (code, data) {
        // alert("data"+data.ret);
        if (String(code) == "0") {
            this.request(NetRequestConst.REQUEST_OTHERINFO_GETWBSCOREREWARD, { giftId: PlatformManager.getGiftId() });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW, { rewards: GameData.wbrewards, code: String(data.ret) });
        }
    };
    CreateUserView.prototype.startRookieGuide = function () {
        PlatformManager.analyticsNewGuide(3);
        this.hide();
        if ((PlatformManager.checkIsWxmgSp() || PlatformManager.checkIsQQXYXSp()) && Api.switchVoApi.checkOpenWxHexiePic()) 
        // if(1)
        {
            this.completeGuideLoginGame();
            Api.rookieVoApi.isInGuiding = null;
            Api.rookieVoApi.isGuiding = null;
        }
        else {
            Api.rookieVoApi.isInGuiding = true;
            ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, { idx: "1", f: this.completeGuideLoginGame, o: this });
        }
    };
    CreateUserView.prototype.completeGuideLoginGame = function () {
        LoginManager.completeGuideForLogin();
    };
    CreateUserView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    CreateUserView.prototype.dispose = function () {
        this._maleBody = null;
        this._maleBodyTmp = null;
        this._maleHead = null;
        this._maleHair = null;
        this._maleContainer = null;
        this._femaleBody = null;
        this._femaleBodyTmp = null;
        this._femaleHead = null;
        this._femaleHair = null;
        this._femaleContainer = null;
        this._inputTextField = null;
        this._myBody = null;
        this._myHead = null;
        this._myHair = null;
        this._container = null;
        this._selectBg = null;
        this._index = 0;
        this._userName = null;
        this._userNameCount = 0;
        this._manIcon = null;
        this._womanIcon = null;
        this._curSex = 1; //1男2女
        this._lastSex = 1;
        this._manHeadContainer = null;
        this._womanHeadContainer = null;
        // this._posContainer = null;
        // this._femaleBodyTmp = null;
        // this._maleBodyTmp = null;
        this._picNum = 1;
        this._sextype = 0;
        this._headBg = null;
        this._startX = 0;
        this._startY = 0;
        this._isUpdate = false;
        this._loadNum = 0;
        this._maxLoadNum = 0;
        this._isLoad = false;
        this._enterSecond = 20;
        this._enterTxt = null;
        this._circle1 = null;
        this._circle2 = null;
        this._sexIcon = null;
        this._headList = [];
        this._curManId = 1;
        this._curWomanId = 6;
        this._descIcon1 = null;
        this._descIcon2 = null;
        this._descNode1 = null;
        this._descNode2 = null;
        this._descMask1 = null;
        this._descMask2 = null;
        this._descMask21 = null;
        this._descMask22 = null;
        this._sexClip = null;
        this._isAnimPlaying = false;
        this._glowDragon = null;
        this._manHeadList = [];
        this._womanHeadList = [];
        this._inputTF = null;
        this._maxLoadHeadNum = 10;
        this._curLoadHeadNum = 0;
        _super.prototype.dispose.call(this);
    };
    return CreateUserView;
}(CommonView));
__reflect(CreateUserView.prototype, "CreateUserView");
