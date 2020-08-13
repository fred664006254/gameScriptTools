var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ChooseroleView = /** @class */ (function (_super) {
    __extends(ChooseroleView, _super);
    function ChooseroleView() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this._userNameCount = 0;
        _this._manBtn = null;
        _this._femaleBtn = null;
        _this._curSex = 0; //1男2女
        _this._chooseHeadBg = null;
        _this._picNum = 0;
        _this._isGone = false;
        _this._headList = [];
        _this._moveIndex = 0;
        _this._leftBtn = null;
        _this._rightBtn = null;
        _this._isLeft = false;
        _this._isMoveBtnClick = false;
        _this._isFirstInit = true;
        return _this;
    }
    ChooseroleView.prototype.getResourceList = function () {
        //"user_body_full_3001",
        var rewardPic = ["chooserole_bg", "chooserole",
            "user_head1",
            "user_head2", "user_head3", "user_head4", "user_head5", "shield_cn", "names_cn",
            "user_head6", "user_head7", "user_head8", "user_head9", "user_head10",
            "user_hair6", "user_hair7", "user_hair8", "user_hair9", "user_hair10",
            "guide_bottom",
        ];
        if (App.CommonUtil.check_dragon()) {
            rewardPic.push("chooserole_db_1_ske");
            rewardPic.push("chooserole_db_1_tex_png");
            rewardPic.push("chooserole_db_1_tex");
        }
        else {
            rewardPic.push("chooserole_role");
        }
        if (PlatformManager.checkIsEnLang()) {
            rewardPic.push("user_head11");
            rewardPic.push("user_head12");
        }
        return _super.prototype.getResourceList.call(this).concat(rewardPic);
    };
    ChooseroleView.prototype.getCloseBtnName = function () {
        if (!this.param) {
            return null;
        }
        else {
            return ButtonConst.COMMON_CLOSE_1;
        }
    };
    // protected getRuleInfo():string
    // {
    // 	return "guideCreateRuleInfo";
    // }
    ChooseroleView.prototype.getTitleStr = function () {
        return "guideCreateUserViewTitle";
    };
    ChooseroleView.prototype.getBgName = function () {
        return "chooserole_bg";
    };
    ChooseroleView.prototype.createCallback = function () {
        if (this._container) {
            this._container.visible = true;
        }
    };
    ChooseroleView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SOUND_CATEGORY, this.startRookieGuide, this);
        PlatformManager.analyticsNewGuide(2);
        var tmpHeadId = 1;
        if (this.param && this.param.data.changeImg) {
            tmpHeadId = Api.playerVoApi.getPlayePicId();
        }
        if (App.CommonUtil.check_dragon()) {
            this._container = Api.playerVoApi.getPlayerPortrait(3001, tmpHeadId, 0, true, this.createCallback, this);
            this.addChild(this._container);
            this._myBody = this._container.getChildByName("myBody");
            var dragonBonesBody = App.DragonBonesUtil.getLoadDragonBones("chooserole_db_1", 0);
            dragonBonesBody.x = this._myBody.x + 182;
            dragonBonesBody.y = this._myBody.y - 69;
            this._container.addChildAt(dragonBonesBody, 0);
            this._container.visible = false;
        }
        else {
            this._container = Api.playerVoApi.getPlayerPortrait(999999, tmpHeadId);
            this.addChild(this._container);
            this._myBody = this._container.getChildByName("myBody");
            this._myBody.x = this._myBody.x - 42;
            this._myBody.y = this._myBody.y - 16;
        }
        this._myHead = this._container.getChildByName("myHead");
        this._myHair = this._container.getChildByName("myHair");
        this._container.x = this.viewBg.x + this.viewBg.width / 2 - 382 / 2 + 5;
        this._container.y = 175;
        if (App.CommonUtil.check_dragon()) {
            // this._myBody.alpha = 0;
        }
        // else
        // {
        // 	let body:BaseBitmap = BaseBitmap.create("chooserole_role");
        // 	body.x = this._myBody.x - 42;
        // 	body.y = this._myBody.y - 16;
        // 	this._container.addChildAt(body,0);
        // 	// this._myBody.alpha = 0;
        // }
        if (!this.param) {
            //输入框
            var inputBg = BaseBitmap.create("chooserole_namebg");
            inputBg.x = this.viewBg.x + this.viewBg.width / 2 - inputBg.width / 2;
            inputBg.y = GameConfig.stageHeigth - 290;
            this.addChild(inputBg);
            var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_BROWN, TextFieldConst.FONTSIZE_TITLE_SMALL, 200, 45, "");
            inputTF.x = this.viewBg.x + this.viewBg.width / 2 - inputTF.width / 2 - 15;
            inputTF.y = inputBg.y + inputBg.height / 2 - inputTF.height / 2;
            this.addChild(inputTF);
            this._inputTextField = inputTF.getChildByName("textField");
            this._inputTextField.textAlign = egret.HorizontalAlign.CENTER;
            this._inputTextField.verticalAlign = egret.VerticalAlign.MIDDLE;
            if (PlatformManager.checkIsThSp()) {
                var nametxt_1 = "";
                this._inputTextField.addEventListener(egret.TextEvent.CHANGE, function (event) {
                    var strName = String(event.target.text);
                    var strLength = App.StringUtil.getStrLength(strName);
                    if (strLength == GameData.nameThLength) {
                        nametxt_1 = strName;
                    }
                    if (strLength > GameData.nameThLength) {
                        this._inputTextField.text = nametxt_1;
                    }
                }, this);
            }
            else {
                this._inputTextField.maxChars = this.getNameLength(1);
            }
            var randomBtn = ComponentManager.getButton("chooserole_dice", "", this.clickRanomHandler, this);
            randomBtn.x = 420;
            randomBtn.y = inputBg.y + inputBg.height / 2 - randomBtn.height / 2;
            randomBtn.setColor(TextFieldConst.COLOR_BLACK);
            this.addChild(randomBtn);
        }
        //创建角色按钮
        var btnStr = "guideCreateUserViewTitle";
        if (this.param && this.param.data.changeImg) {
            btnStr = "sysConfirm";
        }
        var createBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, btnStr, this.clickCreateHandler, this);
        createBtn.x = this.viewBg.x + this.viewBg.width / 2 - createBtn.width / 2;
        createBtn.y = GameConfig.stageHeigth - 86;
        createBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChild(createBtn);
        this._posContainer = new BaseDisplayObjectContainer();
        this.addChild(this._posContainer);
        this._manBtn = BaseBitmap.create("");
        this._manBtn.setPosition(40, GameConfig.stageHeigth - 420);
        this.addChild(this._manBtn);
        this._manBtn.addTouchTap(this.manIconClick, this);
        this._femaleBtn = BaseBitmap.create("");
        this._femaleBtn.setPosition(40, GameConfig.stageHeigth - 320);
        this.addChild(this._femaleBtn);
        this._femaleBtn.addTouchTap(this.womanIconClick, this);
        // if (PlatformManager.checkIsRuSp())
        // {
        // 	this._manBtn.visible = false;
        // 	this._femaleBtn.visible = false;
        // }
        this.manIconClick();
        if (!this.param) {
            this.clickRanomHandler();
        }
        else {
            var playerPic = Api.playerVoApi.getPlayePicId();
            App.LogUtil.log(" chooserole " + playerPic);
            var picArr = this.getHeadPicIndexBySex(2);
            for (var i = 0; i < picArr.length; i++) {
                if (picArr[i] == Number(playerPic)) {
                    this.womanIconClick();
                    break;
                }
            }
        }
        var bottomBg = BaseBitmap.create("chooserole_bottombg");
        bottomBg.height = 225;
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.setPosition(0, GameConfig.stageHeigth - bottomBg.height - this.container.y);
        this.addChildToContainer(bottomBg);
        this._isGone = true;
        this.viewBg.y += (GameConfig.stageHeigth - 1136) * 0.18;
        this._container.y += (GameConfig.stageHeigth - 1136) * 0.35;
        var topBg = BaseBitmap.create("chooserole_topbg");
        topBg.setPosition(0, 0);
        this.addChildAt(topBg, this.getChildIndex(this.viewBg) + 1);
        //左右切换按钮 英文
        this.showMoveBtn();
    };
    ChooseroleView.prototype.manIconClick = function () {
        if (this._curSex == 1) {
            return;
        }
        this._curSex = 1;
        this._manBtn.texture = ResourceManager.getRes("chooserole_man2");
        this._femaleBtn.texture = ResourceManager.getRes("chooserole_female1");
        this.reFreshUserContainer();
        var idx = this._index;
        this._index = null;
        this.changeHeadHandler(null, idx);
    };
    ChooseroleView.prototype.womanIconClick = function () {
        if (this._curSex == 2) {
            return;
        }
        this._curSex = 2;
        this._manBtn.texture = ResourceManager.getRes("chooserole_man1");
        this._femaleBtn.texture = ResourceManager.getRes("chooserole_female2");
        this.reFreshUserContainer();
        var idx = this._index;
        this._index = null;
        this.changeHeadHandler(null, idx);
    };
    //头像pic id
    ChooseroleView.prototype.getHeadPicIndexBySex = function (sex) {
        if (sex == 1) {
            if (PlatformManager.checkIsEnLang()) {
                return [1, 2, 3, 4, 5, 11];
            }
            return [1, 2, 3, 4, 5];
        }
        else if (sex == 2) {
            if (PlatformManager.checkIsEnLang()) {
                return [6, 7, 8, 9, 10, 12];
            }
            return [6, 7, 8, 9, 10];
        }
    };
    //头像滑动
    ChooseroleView.prototype.checkIsNeedMove = function () {
        if (PlatformManager.checkIsEnLang()) {
            return true;
        }
        return false;
    };
    ChooseroleView.prototype.showMoveBtn = function () {
        if (this.checkIsNeedMove()) {
            var leftBtn = ComponentManager.getButton("btn_leftpage", "", this.moveBtnClick, this, [0]);
            leftBtn.setPosition(10, GameConfig.stageHeigth - 210 + 55 - leftBtn.height / 2);
            this.addChild(leftBtn);
            this._leftBtn = leftBtn;
            var rightBtn = ComponentManager.getButton("btn_leftpage", "", this.moveBtnClick, this, [1]);
            rightBtn.scaleX = -1;
            rightBtn.setPosition(GameConfig.stageWidth - 10, GameConfig.stageHeigth - 210 + 55 - rightBtn.height / 2);
            this.addChild(rightBtn);
            this._rightBtn = rightBtn;
            this.freshMoveBtn();
            if (this._moveIndex > 3) {
                this.freshMoveHeadList();
            }
        }
    };
    ChooseroleView.prototype.freshMoveBtn = function () {
        var arr = this.getHeadPicIndexBySex(this._curSex);
        var maxNum = arr.length;
        App.LogUtil.log("freshMoveBtn " + this._index + "moveindex " + this._moveIndex);
        if (this._index == 0 && this._moveIndex <= 0) {
            this._leftBtn.visible = false;
            this._rightBtn.visible = true;
        }
        else if (this._moveIndex >= maxNum - 1 && this._index == 3) {
            this._leftBtn.visible = true;
            this._rightBtn.visible = false;
        }
        else {
            this._leftBtn.visible = true;
            this._rightBtn.visible = true;
        }
    };
    ChooseroleView.prototype.freshMoveHeadList = function () {
        var headArr = this.getHeadPicIndexBySex(this._curSex);
        for (var i = 0; i < this._headList.length; i++) {
            var headIndex = this._moveIndex + i - 3;
            if (this._isLeft) {
                headIndex = this._moveIndex + i;
            }
            this._headList[i].userHead.setRes("user_head" + headArr[headIndex]);
        }
    };
    ChooseroleView.prototype.moveBtnClick = function (index) {
        var arr = this.getHeadPicIndexBySex(this._curSex);
        var maxNum = arr.length;
        var selectIndex = this._index;
        App.LogUtil.log("moveBtnClick " + selectIndex + " moveindex " + this._moveIndex);
        this._isMoveBtnClick = true;
        //左
        if (index == 0) {
            this._isLeft = true;
            this._moveIndex -= 1;
            if (this._moveIndex < 0) {
                this._moveIndex = 0;
            }
            if (this._index == 0) {
                this.freshMoveHeadList();
                this.changeHeadHandler(null, 0);
            }
            else {
                this.changeHeadHandler(null, this._index - 1);
            }
        }
        else {
            this._isLeft = false;
            //右
            this._moveIndex += 1;
            if (this._moveIndex >= maxNum) {
                this._moveIndex = maxNum - 1;
            }
            App.LogUtil.log("moveBtnClick right " + this._moveIndex);
            if (this._index == 3) {
                this.freshMoveHeadList();
                this.changeHeadHandler(null, 3);
            }
            else {
                this.changeHeadHandler(null, this._index + 1);
            }
        }
        this.freshMoveBtn();
    };
    ChooseroleView.prototype.reFreshUserContainer = function () {
        if (this._headContainer) {
            this._posContainer.removeChild(this._headContainer);
            this._headContainer = null;
        }
        this._headList = [];
        this._moveIndex = 0;
        this._isMoveBtnClick = false;
        this._isLeft = false;
        this._isFirstInit = true;
        this.changeHead();
        this._headContainer = new BaseDisplayObjectContainer();
        this._posContainer.addChild(this._headContainer);
        var dis = 0;
        var index = 0;
        // if(this._curSex == 1){
        // 	index = 0;
        // }
        // else if(this._curSex == 2){
        // 	index = 5;
        // }
        // let max:number=5;
        // if (this.checkIsEnTest()){
        // 	max = 4;
        // }
        var headPicArr = this.getHeadPicIndexBySex(this._curSex);
        var max = headPicArr.length;
        if (this.checkIsNeedMove()) {
            max = 4;
        }
        this._index = index;
        for (; index < max; index++) {
            var userHeadBg = BaseBitmap.create("chooserole_headbg1");
            userHeadBg.y = GameConfig.stageHeigth - 210;
            userHeadBg.x = 36 + (index % max) * 116;
            if (this.checkIsNeedMove()) {
                userHeadBg.x = 85 + (index % max) * 120;
            }
            var headPicArr_1 = this.getHeadPicIndexBySex(this._curSex);
            var headIndex = headPicArr_1[index];
            // let headPic = "user_head" + (index + 1 + dis);
            var headPic = "user_head" + (headIndex);
            var userHead = BaseBitmap.create(headPic);
            userHead.scaleX = 0.8;
            userHead.scaleY = 0.8;
            userHead.x = userHeadBg.x + userHeadBg.width / 2 - userHead.width / 2 * 0.8;
            userHead.y = userHeadBg.y + userHeadBg.height / 2 - userHead.height / 2 * 0.8;
            userHeadBg.addTouchTap(this.changeHeadHandler, this, [index]);
            // userHeadBg.scaleX=0.76;
            // userHeadBg.scaleY=0.76;
            userHeadBg.name = "headbg" + index;
            this._headContainer.addChild(userHeadBg);
            this._headContainer.addChild(userHead);
            var headData = { userHead: userHead, headBg: userHeadBg };
            this._headList.push(headData);
        }
        if (this.param && this.param.data.changeImg) {
            var pic = Api.playerVoApi.getPlayePicId();
            this._picNum = pic;
            var isFind = false;
            var curIndex = 0;
            var isMan = 1;
            var headPicArr_2 = this.getHeadPicIndexBySex(1);
            for (var i = 0; i < headPicArr_2.length; i++) {
                if (Number(pic) == headPicArr_2[i]) {
                    isFind = true;
                    isMan = 1;
                    curIndex = i;
                    break;
                }
            }
            if (!isFind) {
                var womheadPicArr = this.getHeadPicIndexBySex(2);
                for (var i = 0; i < womheadPicArr.length; i++) {
                    if (Number(pic) == womheadPicArr[i]) {
                        isFind = true;
                        isMan = 2;
                        curIndex = i;
                        break;
                    }
                }
            }
            if (isFind) {
                if (isMan == this._curSex) {
                    this._index = curIndex;
                    if (this.checkIsNeedMove()) {
                        this._moveIndex = curIndex;
                        if (curIndex > 3) {
                            this._index = 3;
                        }
                    }
                }
                if (this._leftBtn) {
                    if (this._moveIndex > 3) {
                        this.freshMoveHeadList();
                    }
                }
            }
            App.LogUtil.log("isFIND " + curIndex + " _index" + this._index);
        }
        App.LogUtil.log("refreshusercon " + this._index);
        if (this.checkIsNeedMove() && this._leftBtn) {
            this.freshMoveBtn();
        }
        this._chooseHeadBg = this._headContainer.getChildByName("headbg" + this._index);
        this._chooseHeadBg.texture = ResourceManager.getRes("chooserole_headbg2");
    };
    ChooseroleView.prototype.changeHeadHandler = function (evt, index) {
        var headPicArr = this.getHeadPicIndexBySex(this._curSex);
        var notIndex = headPicArr.length - 1;
        var notPicArr = this.getHeadPicIndexBySex(2);
        var notPicId = notPicArr[0];
        if (this._picNum != notPicId && index != notIndex) {
            if (!this._isMoveBtnClick && index == this._index) {
                return;
            }
        }
        // if(index == this._index&&this._picNum!=notPicId&&index!=notIndex)
        // {
        // 	return;
        // }
        var cur = -1;
        if (index - this._index > 0) {
            cur = 1;
        }
        App.LogUtil.log("changeHeadHandler _moveIndex  " + this._moveIndex + " _index " + this._index + " cur index " + index + " firstinit  " + this._isFirstInit);
        if (this.checkIsNeedMove() && (!this._isMoveBtnClick) && (!this._isFirstInit)) {
            if (index - this._index > 0) {
                this._moveIndex += (index - this._index);
            }
            else {
                this._moveIndex -= (this._index - index);
            }
        }
        if (this._isMoveBtnClick) {
            if (this._isLeft) {
                cur = -1;
            }
            else {
                cur = 1;
            }
        }
        this._index = index;
        if (this.checkIsNeedMove() && (!this._isMoveBtnClick) && (!this._isFirstInit)) {
            this.freshMoveBtn();
        }
        this._isMoveBtnClick = false;
        this._isFirstInit = false;
        this._chooseHeadBg.texture = ResourceManager.getRes("chooserole_headbg1");
        this._chooseHeadBg = this._headContainer.getChildByName("headbg" + this._index);
        this._chooseHeadBg.texture = ResourceManager.getRes("chooserole_headbg2");
        if (this._isGone) {
            var centerX = this.viewBg.x + this.viewBg.width / 2 - 382 / 2 + 5;
            var centerY = 140;
            egret.Tween.get(this._container)
                .to({ x: -500 * cur + centerY }, 200)
                .to({ x: 500 * cur + centerY }, 0)
                .call(this.changeHead, this)
                .to({ x: centerX }, 200);
        }
        //test
        var picId = headPicArr[this._index];
        if (this.checkIsNeedMove()) {
            picId = headPicArr[this._moveIndex];
        }
        App.LogUtil.log("changeHeadHandler " + picId);
    };
    ChooseroleView.prototype.changeHead = function () {
        var dis = 0;
        var headPicArr = this.getHeadPicIndexBySex(this._curSex);
        var headIndex = headPicArr[this._index];
        if (this.checkIsNeedMove()) {
            if (this._moveIndex > 0) {
                headIndex = headPicArr[this._moveIndex];
            }
        }
        // let headPic = "user_head" + (this._index + 1 + dis);
        // let hairPic = "user_hair" + (this._index + 1 + dis);
        var headPic = "user_head" + headIndex;
        var hairPic = "user_hair" + headIndex;
        this._myHead.texture = ResourceManager.getRes(headPic);
        this._myHair.texture = ResourceManager.getRes(hairPic);
    };
    ChooseroleView.prototype.clickCreateHandler = function () {
        // let picId = this._index+1;
        var headPicArr = this.getHeadPicIndexBySex(this._curSex);
        var picId = headPicArr[this._index];
        if (this.checkIsNeedMove()) {
            picId = headPicArr[this._moveIndex];
        }
        if (this._index == 0 && this._picNum == picId && this._curSex == 2) {
            App.CommonUtil.showTip(LanguageManager.getlocal("changeImgTip2"));
            this.hide();
            return;
        }
        // if(this._curSex==2&&this._index<5)
        // {
        // 	picId=picId+5;
        // }
        if (this.param && this.param.data.changeImg) {
            if (picId == Api.playerVoApi.getPlayePicId()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("changeImgTip2"));
                this.hide();
            }
            else {
                this.request(NetRequestConst.REQUEST_USER_CHANGEPIC, { pic: picId });
            }
            return;
        }
        //正则表达式
        var txtStr = this._inputTextField.text;
        var length = App.StringUtil.getStrLength(txtStr);
        if (!App.StringUtil.userNameCheck(txtStr)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip1"));
            return;
        }
        if (PlatformManager.checkIsEnLang()) {
            if (length < 2 || length > GameData.usernameEnLength) {
                App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip3", ["2", GameData.usernameEnLength.toString()]));
                return;
            }
        }
        else if (PlatformManager.checkIsRuLang()) {
            if (length < 2 || length > GameData.usernameRuLength) {
                App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip3", ["2", GameData.usernameRuLength.toString()]));
                return;
            }
        }
        else if (PlatformManager.checkIsPtLang()) {
            if (length < 2 || length > GameData.usernamePtLength) {
                App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip3", ["2", GameData.usernamePtLength.toString()]));
                return;
            }
        }
        else {
            if (length < 2 || length > this.getNameLength()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip2"));
                return;
            }
        }
        if (txtStr == "null" || txtStr == "undefined") {
            App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
            return;
        }
        if (Config.ShieldCfg.checkShield(txtStr) == false) {
            return;
        }
        this.request(NetRequestConst.REQUEST_USER_CREATEUSER, { name: this._inputTextField.text, pic: picId });
    };
    ChooseroleView.prototype.getNameLength = function (type) {
        if (type === void 0) { type = 0; }
        if (PlatformManager.checkIsEnLang()) {
            return GameData.usernameEnLength;
        }
        if (PlatformManager.checkIsRuLang()) {
            return GameData.usernameRuLength;
        }
        if (PlatformManager.checkIsThSp()) {
            return GameData.nameThLength;
        }
        if (PlatformManager.checkIsPtLang()) {
            return GameData.usernameEnLength;
        }
        else {
            //输入限制
            if (type == 1) {
                return 8;
            }
            return 6;
        }
    };
    ChooseroleView.prototype.clickRanomHandler = function () {
        this._userNameCount = 0;
        this.randomName();
    };
    ChooseroleView.prototype.randomName = function () {
        this._userName = Config.NamesCfg.getRandomName();
        this._userNameCount++;
        if (this._userNameCount >= 5) {
            this._inputTextField.text = this._userName;
        }
        else {
            this.request(NetRequestConst.REQUEST_USER_CHECKNAME, { name: this._userName });
        }
    };
    ChooseroleView.prototype.receiveData = function (data) {
        if (data && data.ret) {
            if (data.data.cmd == NetRequestConst.REQUEST_USER_CHECKNAME) {
                if (data.data.data.nameflag == 0) {
                    this._inputTextField.text = this._userName;
                }
                else {
                    this.randomName();
                }
            }
            else if (data.data.cmd == NetRequestConst.REQUEST_USER_CREATEUSER) {
                // PlatformManager.analyticsRegister();
                if (Api.switchVoApi.checkOpenShenheGame()) {
                    ViewController.getInstance().openViewByFunName(PlatformCfg.shenheFunctionName);
                    this.hide();
                    return;
                }
                if (data.data.data.nameflag == 0) {
                    if (RookieCfg) {
                        RookieCfg.setNeedCheck(true);
                    }
                    if (GameData.wbrewards != null) {
                        ViewController.getInstance().openView(ViewConst.POPUP.GETGIFTPOPUPVIEW, { rewards: GameData.wbrewards, f: this.startRookieGuide, o: this });
                    }
                    else {
                        //玩吧积分礼包
                        if (PlatformManager.getGiftId() == "501" || PlatformManager.getGiftId() == "502") {
                            if (GameData.wbrewardsFlag) {
                                PlatformManager.giftExchange(this.exchangeCallback, this);
                            }
                            else {
                                ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW, { rewards: GameData.wbrewards, code: "2003" });
                            }
                        }
                        else {
                            if (Api.switchVoApi.checkOpenVoice()) {
                                ViewController.getInstance().openView(ViewConst.POPUP.VOICEPOPUPVIEW);
                            }
                            else {
                                this.startRookieGuide();
                            }
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
                    ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW, { rewards: data.data.data.rewards, f: this.startRookieGuide, o: this, code: "0" });
                }
            }
        }
    };
    ChooseroleView.prototype.exchangeCallback = function (code, data) {
        if (String(code) == "0") {
            this.request(NetRequestConst.REQUEST_OTHERINFO_GETWBSCOREREWARD, { giftId: PlatformManager.getGiftId() });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW, { rewards: GameData.wbrewards, code: String(data.ret) });
        }
    };
    ChooseroleView.prototype.startRookieGuide = function () {
        PlatformManager.analyticsNewGuide(3);
        var sex = this._curSex;
        this.hide();
        if (Api.switchVoApi.checkRookieEnStory()) {
            Api.rookieVoApi.isInGuiding = true;
            ViewController.getInstance().openView(ViewConst.BASE.ROOKIEENSTORYVIEW, { f: this.completeGuideLoginGame, o: this });
        }
        else {
            Api.rookieVoApi.isInGuiding = true;
            ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, { idx: "1", f: this.completeGuideLoginGame, o: this });
            if (Api.switchVoApi.checkOpenBlueWife() && sex == 2) {
                // Api.gameinfoVoApi.setSexnum(1);
                // NetManager.request(NetRequestConst.REQUEST_USER_REVERSIONSETTING,{stype:1,sflag:1});
            }
            // else{
            // 	ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW,{idx:"1",f:this.completeGuideLoginGame,o:this});
            // }
        }
    };
    ChooseroleView.prototype.completeGuideLoginGame = function () {
        LoginManager.completeGuideForLogin();
    };
    ChooseroleView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SOUND_CATEGORY, this.startRookieGuide, this);
        this._inputTextField = null;
        this._container = null;
        this._myBody = null;
        this._myHead = null;
        this._index = 0;
        this._headContainer = null;
        this._curSex = 0; //1男2女
        this._picNum = 0;
        this._manBtn = null;
        this._femaleBtn = null;
        this._chooseHeadBg = null;
        this._isGone = false;
        this._headList = [];
        this._moveIndex = 0;
        this._leftBtn = null;
        this._rightBtn = null;
        this._isLeft = false;
        this._isMoveBtnClick = false;
        this._isFirstInit = true;
        _super.prototype.dispose.call(this);
    };
    return ChooseroleView;
}(CommonView));
//# sourceMappingURL=ChooseroleView.js.map