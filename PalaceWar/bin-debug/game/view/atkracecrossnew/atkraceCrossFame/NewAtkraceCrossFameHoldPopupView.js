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
/**
* 江湖名望 席位争夺
* date 2020.7.9
* author ycg
* @name NewAtkraceCrossFameHoldPopupView
*/
var NewAtkraceCrossFameHoldPopupView = /** @class */ (function (_super) {
    __extends(NewAtkraceCrossFameHoldPopupView, _super);
    function NewAtkraceCrossFameHoldPopupView() {
        var _this = _super.call(this) || this;
        _this._titleData = null;
        _this._seatIndex = 0;
        _this._data = null;
        _this._holdData = null;
        _this._roleContainer = null;
        _this._allianceContainer = null;
        _this._roleInfoContainer = null;
        _this._holdFlag = null;
        _this._effect = null;
        _this._holdBtn = null;
        _this._holdNum = null;
        _this._holdTip = null;
        _this._bottomBg = null;
        return _this;
    }
    Object.defineProperty(NewAtkraceCrossFameHoldPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewAtkraceCrossFameHoldPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewAtkraceCrossFameHoldPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    NewAtkraceCrossFameHoldPopupView.prototype.getTitleStr = function () {
        var data = this.param.data.data.baseCfg;
        return "newatkrackcross_fameTitleName" + (data.index + 1);
    };
    NewAtkraceCrossFameHoldPopupView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat("public_popupscrollitembg", "commonview_smalltitlebg", "newcrossatkrace_officebg", "newcrossatkrace_officerbg", "newcrossatkrace_holdtxt", "newcrossatkrace_notholdtxt").concat(list);
    };
    NewAtkraceCrossFameHoldPopupView.prototype.getRequestData = function () {
        var view = this;
        App.LogUtil.log("getRequsetdata ", this.param.data.uid);
        if (this.param.data.uid) {
            return { requestType: NetRequestConst.REQUEST_RANKG_USERSHOT, requestData: {
                    ruid: this.param.data.uid
                } };
        }
        return null;
    };
    NewAtkraceCrossFameHoldPopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            console.log("receivedata ", data.data.data);
            this._data = data.data.data;
        }
    };
    NewAtkraceCrossFameHoldPopupView.prototype.initView = function () {
        this._titleData = this.param.data.data;
        this._seatIndex = this.param.data.index;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTORATTACK, this.holdBtnRequestCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTOREXTRA, this.addFightNumCallback, this);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 670;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 5;
        this.addChildToContainer(bg);
        var topBg = BaseBitmap.create("newcrossatkrace_officebg");
        this.addChildToContainer(topBg);
        topBg.x = bg.x + bg.width / 2 - topBg.width / 2;
        topBg.y = bg.y + 4;
        var roleContainer = new BaseDisplayObjectContainer();
        roleContainer.width = topBg.width;
        roleContainer.height = 413;
        roleContainer.x = topBg.x;
        roleContainer.y = topBg.y;
        var mask = new egret.Rectangle(0, 0, topBg.width, 413);
        roleContainer.mask = mask;
        this.addChildToContainer(roleContainer);
        this._roleContainer = roleContainer;
        var role = this.getRoleContainer({ title: 3102 });
        role.x = -20;
        role.y = 20;
        roleContainer.addChild(role);
        role.name = "role";
        //名字
        var roleInfoContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(roleInfoContainer);
        this._roleInfoContainer = roleInfoContainer;
        roleInfoContainer.width = topBg.width;
        roleInfoContainer.height = topBg.height;
        roleInfoContainer.setPosition(topBg.x, topBg.y);
        var nameBg = BaseBitmap.create("public_9_bg91");
        nameBg.y = roleInfoContainer.height - 10 - nameBg.height;
        roleInfoContainer.addChild(nameBg);
        nameBg.name = "nameBg";
        var name = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        nameBg.width = nameBg.width > name.width + 50 ? nameBg.width : name.width + 50;
        nameBg.x = roleInfoContainer.width / 2 - nameBg.width / 2;
        name.setPosition(nameBg.x + nameBg.width / 2 - name.width / 2, nameBg.y + nameBg.height / 2 - name.height / 2);
        roleInfoContainer.addChild(name);
        name.name = "name";
        //官品
        var levelBg = BaseBitmap.create("newcrossatkrace_officerbg");
        levelBg.y = nameBg.y - levelBg.height - 2;
        levelBg.x = roleInfoContainer.width / 2 - levelBg.width / 2;
        roleInfoContainer.addChild(levelBg);
        levelBg.name = "levelBg";
        var level = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        level.setPosition(levelBg.x + levelBg.width / 2 - level.width / 2, levelBg.y + levelBg.height / 2 - level.height / 2 + 10);
        roleInfoContainer.addChild(level);
        level.name = "level";
        //是否占有
        var holdFlagImg = "newcrossatkrace_holdtxt";
        // if (0){
        //     holdFlagImg = "sixsection1_notholdtxt";
        // }
        var holdFlag = BaseBitmap.create(holdFlagImg);
        holdFlag.x = topBg.x + topBg.width / 2 - holdFlag.width / 2;
        holdFlag.y = levelBg.y - holdFlag.height;
        this.addChildToContainer(holdFlag);
        this._holdFlag = holdFlag;
        //bottom
        var bottomBg = BaseBitmap.create("public_popupscrollitembg");
        bottomBg.height = bg.height - topBg.height - 20;
        bottomBg.setPosition(bg.x + bg.width / 2 - bottomBg.width / 2, topBg.y + topBg.height + 5);
        this.addChildToContainer(bottomBg);
        this._bottomBg = bottomBg;
        var allianInfoCon = new BaseDisplayObjectContainer();
        this.addChildToContainer(allianInfoCon);
        this._allianceContainer = allianInfoCon;
        var allianInfoBg = BaseBitmap.create("commonview_smalltitlebg");
        allianInfoBg.width = bottomBg.width - 40;
        allianInfoCon.width = allianInfoBg.width;
        allianInfoCon.height = allianInfoBg.height;
        allianInfoCon.x = bottomBg.x + bottomBg.width / 2 - allianInfoBg.width / 2;
        allianInfoCon.y = bottomBg.y + 15;
        allianInfoCon.addChild(allianInfoBg);
        allianInfoBg.name = "allianceInfoBg";
        var allianceName = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        allianceName.setPosition(allianInfoBg.x + 55, allianInfoBg.y + allianInfoBg.height / 2 - allianceName.height / 2);
        allianInfoCon.addChild(allianceName);
        allianceName.name = "allianceName";
        var power = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        power.setPosition(allianInfoBg.x + allianInfoBg.width - 55 - power.width, allianceName.y);
        allianInfoCon.addChild(power);
        power.name = "power";
        //名望效果
        var effectTitle = ComponentManager.getTextField(LanguageManager.getlocal("newatkrackcross_fameHoldEffectTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        effectTitle.setPosition(bottomBg.x + 30, allianInfoCon.y + allianInfoCon.height + 20);
        this.addChildToContainer(effectTitle);
        var baseCfg = this._titleData.baseCfg;
        App.LogUtil.log("basecfg " + baseCfg.baseBuff);
        var effect = ComponentManager.getTextField(LanguageManager.getlocal("newatkrackcross_fameHoldEffect", [String(Math.floor(baseCfg.baseBuff * 100 + 0.5)), String(Math.floor(baseCfg.addBuff * 100 + 0.5))]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        effect.width = bg.width - effectTitle.x - effectTitle.width - 15;
        effect.lineSpacing = 5;
        effect.setPosition(bottomBg.x + 30 + effectTitle.width, allianInfoCon.y + allianInfoCon.height + 20);
        this.addChildToContainer(effect);
        this._effect = effect;
        //抢夺按钮
        var holdBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "newatkrackcross_fameHoldBtnName", this.holdBtnClick, this);
        holdBtn.setPosition(bottomBg.x + bottomBg.width / 2 - holdBtn.width / 2, bottomBg.y + bottomBg.height - holdBtn.height - 40);
        this.addChildToContainer(holdBtn);
        this._holdBtn = holdBtn;
        //抢夺次数
        // let holdNumStr = "sixSection1HoldTitleNum1";
        // if (0){
        //     holdNumStr = "sixSection1HoldTitleNum2";
        // }
        var holdNum = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        holdNum.setPosition(bottomBg.x + bottomBg.width / 2 - holdNum.width / 2, holdBtn.y + holdBtn.height + 10);
        this.addChildToContainer(holdNum);
        this._holdNum = holdNum;
        this.refreshUI();
    };
    NewAtkraceCrossFameHoldPopupView.prototype.refreshUI = function () {
        var role = this._roleContainer.getChildByName("role");
        var levelBg = this._roleInfoContainer.getChildByName("levelBg");
        var level = this._roleInfoContainer.getChildByName("level");
        var nameBg = this._roleInfoContainer.getChildByName("nameBg");
        var name = this._roleInfoContainer.getChildByName("name");
        var allBg = this._allianceContainer.getChildByName("allianceInfoBg");
        var allName = this._allianceContainer.getChildByName("allianceName");
        var power = this._allianceContainer.getChildByName("power");
        var titleCfg = this._titleData.baseCfg;
        if (this._data || this._holdData) {
            if (role) {
                role.dispose();
                role = null;
            }
            this._roleInfoContainer.visible = true;
            this._roleContainer.visible = true;
            allName.visible = true;
            power.visible = true;
            if (this._data) {
                var titleData = { title: this._data.title, level: this._data.level, pic: this._data.pic };
                role = this.getRoleContainer(titleData);
            }
            else {
                var title = Api.playerVoApi.getTitleInfo();
                var titleData = { title: title, level: Api.playerVoApi.getPlayerLevel(), pic: Api.playerVoApi.getPlayePicId() };
                role = this.getRoleContainer(titleData);
            }
            role.setScale(0.8);
            role.x = -10;
            role.y = 70;
            this._roleContainer.addChild(role);
            role.name = "role";
            this._holdFlag.setRes("newcrossatkrace_holdtxt");
            var lv = 1;
            var nameStr = "";
            var svNameStr = "";
            var allNameStr = "";
            var powerNum = 0;
            if (this._holdData) {
                this._holdBtn.visible = false;
                this._holdNum.visible = false;
                lv = Api.playerVoApi.getPlayerLevel();
                nameStr = Api.playerVoApi.getPlayerName();
                svNameStr = Api.mergeServerVoApi.getAfterMergeSeverName();
                allNameStr = Api.playerVoApi.getPlayerAllianceName();
                powerNum = Api.playerVoApi.getPlayerPower();
            }
            else {
                lv = this._data.level;
                nameStr = this._data.name;
                svNameStr = Api.mergeServerVoApi.getAfterMergeSeverName(this._data.ruid);
                allNameStr = this._data.gname;
                powerNum = this._data.power;
                if (this._data.ruid == Api.playerVoApi.getPlayerID()) {
                    this._holdBtn.visible = false;
                    this._holdNum.visible = false;
                }
                else {
                    this._holdNum.visible = true;
                    this._holdBtn.visible = true;
                }
            }
            if (!allNameStr) {
                allNameStr = LanguageManager.getlocal("sixSection1HoldNothing");
            }
            level.text = LanguageManager.getlocal("officialTitle" + lv);
            level.x = levelBg.x + levelBg.width / 2 - level.width / 2;
            level.y = levelBg.y + levelBg.height / 2 - level.height / 2 + 4;
            name.text = nameStr + "(" + svNameStr + ")";
            nameBg.width = nameBg.width > name.width + 50 ? nameBg.width : name.width + 50;
            nameBg.x = this._roleInfoContainer.width / 2 - nameBg.width / 2;
            name.x = nameBg.x + nameBg.width / 2 - name.width / 2;
            name.y = nameBg.y + nameBg.height / 2 - name.height / 2;
            allName.text = LanguageManager.getlocal("newatkrackcross_fameHoldAllianceName", ["" + allNameStr]);
            allName.y = allBg.y + allBg.height / 2 - allName.height / 2;
            power.text = LanguageManager.getlocal("newatkrackcross_fameHoldAlliancePower", [App.StringUtil.changeIntToText(powerNum)]);
            power.x = allBg.x + allBg.width - 55 - power.width;
            power.y = allName.y;
        }
        else {
            this._roleContainer.visible = false;
            this._roleInfoContainer.visible = false;
            allName.visible = false;
            power.visible = false;
            this._holdBtn.visible = true;
            this._holdNum.visible = true;
            this._holdFlag.setRes("newcrossatkrace_notholdtxt");
        }
        // this._effect.text = LanguageManager.getlocal("newatkrackcross_fameHoldEffect", [""+Math.floor(titleCfg.baseBuff * 100)]);
        //抢夺次数
        // let freeNumStr = "newatkrackcross_fameHoldNum1";
        // if (this.vo.getFameCanUseNum() <= 0){
        //     freeNumStr = "newatkrackcross_fameHoldNum2";
        // }
        // this._holdNum.text = LanguageManager.getlocal(freeNumStr, [""+this.vo.getFameCanUseNum(), ""+this.vo.getFameMaxNum()]);
        // this._holdNum.x = this._bottomBg.x + this._bottomBg.width/2 - this._holdNum.width/2;
        this.refreshHoldNum();
    };
    NewAtkraceCrossFameHoldPopupView.prototype.refreshHoldNum = function () {
        var freeNumStr = "newatkrackcross_fameHoldNum1";
        if (this.vo.getFameCanUseNum() <= 0) {
            freeNumStr = "newatkrackcross_fameHoldNum2";
        }
        this._holdNum.text = LanguageManager.getlocal(freeNumStr, ["" + this.vo.getFameCanUseNum(), "" + this.vo.getFameMaxNum()]);
        this._holdNum.x = this._bottomBg.x + this._bottomBg.width / 2 - this._holdNum.width / 2;
    };
    //头衔抢夺
    NewAtkraceCrossFameHoldPopupView.prototype.holdBtnClick = function () {
        // if (1){
        //     let attacklog = {"type":"director","fightst":1595828912,"winuid":1006568,"loseuid":1006518,"fuinfo":{"topTitle":{"sortKey":"3001","sortValue":3},"uid":1006518,"level":20,"exp":971241349,"name":"钟仪芳","pic":1,"title":{"clv":2,"clothes":"3001","title":"6005","tlv":2}},"x":3,"y":5,"uinfo":{"topTitle":{"sortKey":"3151","sortValue":1},"uid":1006568,"level":11,"exp":35160,"name":"冒星火","pic":2,"title":{"clothes":"3108","clv":1,"title":"3108","tlv":1}}};
        var _this = this;
        //     let win = 0;
        //     if (attacklog.winuid == Api.playerVoApi.getPlayerID()){
        //         win = 1;
        //     }
        //     let info:any[] = [attacklog.uinfo, attacklog.fuinfo];
        //     ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1TITLEBATTLEVIEW, {info: info, wcode: win});
        //     return;
        // }
        if (!this.vo.isInActivity()) {
            this.vo.showAcEndTip();
            return;
        }
        //判断抢夺次数
        var freeNum = this.vo.getFameCanUseNum();
        if (freeNum < 1) {
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                msg: LanguageManager.getlocal("newatkrackcross_fameBuyHoldNumTip", ["" + this.vo.getFameFightCost()]),
                touchMaskClose: true,
                title: "itemUseConstPopupViewTitle",
                callback: function () {
                    _this.holdCost();
                },
                handle: this,
                needClose: 1,
                needCancel: true,
                confirmTxt: "sysConfirm"
            });
        }
        else {
            this.holdBtnEnter();
        }
    };
    //增加次数
    NewAtkraceCrossFameHoldPopupView.prototype.holdCost = function () {
        var cost = this.vo.getFameFightCost();
        if (cost > Api.playerVoApi.getPlayerGem()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("newatkrackcross_fameBuyTip1"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTOREXTRA, { activeId: this.vo.aidAndCode });
    };
    NewAtkraceCrossFameHoldPopupView.prototype.addFightNumCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        this._holdNum.text = LanguageManager.getlocal("newatkrackcross_fameHoldNum1", ["" + this.vo.getFameCanUseNum(), "" + this.vo.getFameMaxNum()]);
        this._holdNum.x = this._bottomBg.x + this._bottomBg.width / 2 - this._holdNum.width / 2;
    };
    NewAtkraceCrossFameHoldPopupView.prototype.holdBtnEnter = function () {
        var uid = null;
        if (this.param && this.param.data && this.param.data.uid) {
            uid = this.param.data.uid;
        }
        NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTORATTACK, { x: this._titleData.lineNum, y: this._seatIndex + 1, fuid: uid, activeId: this.vo.aidAndCode });
    };
    //抢夺请求回调
    NewAtkraceCrossFameHoldPopupView.prototype.holdBtnRequestCallback = function (evt) {
        //ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1TITLEBATTLEVIEW, {});
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        if (rData.lastDirector) {
            var lineNum = rData.lastDirector.x;
            App.LogUtil.log("fameMapCallback " + lineNum);
            if (lineNum) {
                Api.atkracecrossVoApi.setClearFameMapInfo(lineNum);
                var baseView = ViewController.getInstance().getView("NewAtkraceCrossFamePopupView");
                if (baseView) {
                    baseView.freshMapData(lineNum);
                }
            }
        }
        Api.atkracecrossVoApi.setFameMapInfo(rData.map);
        // if (rData.list && rData.list.length > 0){
        //     Api.sixsection1VoApi.setLogList(rData.list);
        // }
        this.refreshHoldNum();
        console.log("holdBtnRequestCallback ", rData);
        if (rData.atkgNstat == 5) {
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1HoldTitleDataChange"));
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ATKRACECROSSNEW_FAMESEAT_REFRESH, { lineNum: this._titleData.lineNum, index: this._seatIndex });
            this.hide();
            return;
        }
        if (rData.atkgNstat == 2 || rData.atkgNstat == 3) {
            var win = 0;
            if (rData.attacklog.winuid == Api.playerVoApi.getPlayerID()) {
                win = 1;
            }
            // ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1TITLEBATTLEVIEW, {info: info, wcode: win});
            ViewController.getInstance().openView(ViewConst.COMMON.NEWATKRACECROSSFAMEBATTLEVIEW, {
                "pklogs": rData.attacklog.pklogs,
                "finfo": rData.attacklog.fuinfo,
                "minfo": rData.attacklog.uinfo,
                "winuid": rData.attacklog.winuid
            });
        }
        if (rData.atkgNstat == 1 || rData.atkgNstat == 2) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ATKRACECROSSNEW_FAMESEAT_REFRESH, { lineNum: this._titleData.lineNum, index: this._seatIndex });
            this._data = null;
            this._holdData = Api.atkracecrossVoApi.getFameMapInfoByFloor(this._titleData.lineNum);
            this.refreshUI();
        }
        else if (rData.atkgNstat == 3) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ATKRACECROSSNEW_FAMESEAT_REFRESH, { lineNum: this._titleData.lineNum, index: this._seatIndex, isNum: 1 });
        }
    };
    NewAtkraceCrossFameHoldPopupView.prototype.getRoleContainer = function (data) {
        if (!data) {
            return null;
        }
        var titleData = App.CommonUtil.getTitleData(data.title);
        var curLevel = 1;
        if (titleData.clv) {
            curLevel = titleData.clv;
        }
        var titleconfig = null;
        var curTitleId = null;
        if (titleData.clothes) {
            titleconfig = Config.TitleCfg.getTitleCfgById(titleData.clothes);
            curTitleId = titleData.clothes;
        }
        if (titleconfig && titleconfig.isTitle == 1 && (titleconfig.titleType == 1 || titleconfig.titleType == 2 || titleconfig.titleType == 7)) {
            curTitleId = titleData.clothes;
            curLevel = titleData.tlv;
            if (curLevel == 0) {
                curLevel = 1;
            }
        }
        var userContainer = null;
        App.LogUtil.log("EmperorOutFirstAniView:curTitleId " + curTitleId);
        if (curTitleId) {
            userContainer = new BaseDisplayObjectContainer();
            userContainer.name = "userContainer";
            this.addChildToContainer(userContainer);
            var role = null;
            var tcfg = Config.TitleCfg.getTitleCfgById(curTitleId);
            var resPath = "palace_db_" + curTitleId + (tcfg.titleType == 7 ? "_" + Api.playerVoApi.getUserSex(data.pic) : "");
            if ((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon() && ResourceManager.hasRes(resPath + "_ske")) {
                App.LogUtil.log("aaa dragonbone ");
                role = App.CommonUtil.getPlayerDragonRole(curTitleId, data.pic, curLevel, true);
                role.x = 340; //w432, h508
                role.y = 35;
                userContainer.addChild(role);
                role.name = 'role';
                userContainer.height = 790;
            }
            else {
                role = Api.playerVoApi.getPlayerPortrait(Number(curTitleId), data.pic, null, null, null, null, null, true);
                role.y = -30;
                var isnew = Api.playerVoApi.getNewPalaceRole(curTitleId);
                if (isnew) {
                    role.x = 0;
                }
                else {
                    role.x = 155;
                }
                userContainer.addChild(role);
                userContainer.height = 765;
            }
        }
        else {
            userContainer = new BaseDisplayObjectContainer();
            // let role = Api.playerVoApi.getPlayerPortrait(Number(data.level), data.pic,0,false,null,null,curLevel);
            var role = Api.playerVoApi.getPlayerPortrait(Number(data.level), data.pic, 0, false, null, null, curLevel, true);
            role.width = 300;
            role.y = -30;
            role.x = 190;
            userContainer.name = "userContainer";
            userContainer.addChild(role);
            userContainer.height = 765;
        }
        return userContainer;
    };
    NewAtkraceCrossFameHoldPopupView.prototype.getShowHeight = function () {
        return 760;
    };
    NewAtkraceCrossFameHoldPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTORATTACK, this.holdBtnRequestCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWATKRACECROSS_DIRECTOREXTRA, this.addFightNumCallback, this);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);
        this._data = null;
        this._holdData = null;
        this._titleData = null;
        this._seatIndex = null;
        this._roleContainer = null;
        this._allianceContainer = null;
        this._roleInfoContainer = null;
        this._holdFlag = null;
        this._effect = null;
        this._holdBtn = null;
        this._holdNum = null;
        this._holdTip = null;
        _super.prototype.dispose.call(this);
    };
    return NewAtkraceCrossFameHoldPopupView;
}(PopupView));
//# sourceMappingURL=NewAtkraceCrossFameHoldPopupView.js.map