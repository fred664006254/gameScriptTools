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
 * 红颜
 * author dmj
 * date 2017/10/9
 * @class WifeView
 */
var WifeView = (function (_super) {
    __extends(WifeView, _super);
    function WifeView() {
        var _this = _super.call(this) || this;
        _this._redDotSp = null;
        //自动补充
        _this._autoMakeup = null;
        //省亲
        _this._banishBtn = null;
        _this._isBanish = false;
        _this._wifeBanish = null;
        _this._backBtn = null;
        _this._wifebattle = null;
        _this._lastDropIdx = 1;
        _this.tipContainerArr = [];
        _this._mainTaskHandKey = null;
        //一键传唤
        _this._tipTipTimeOut = -1;
        _this._tipSar = [];
        return _this;
    }
    WifeView.prototype.showGuideAgain = function () {
        return "wife_2";
    };
    WifeView.prototype.clickGuideAgain = function () {
        _super.prototype.clickGuideAgain.call(this);
        this.refreshSort(this._lastDropIdx);
        this._scrollList.setScrollTop(0);
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
    };
    Object.defineProperty(WifeView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    WifeView.prototype.getContainerY = function () {
        return 14;
    };
    WifeView.prototype.getBigFrame = function () {
        return null;
    };
    WifeView.prototype.getTitlePic = function () {
        return Api.switchVoApi.checkIsInBlueWife() ? "wifeviewtitle_blueType" : "wifeviewtitle";
    };
    // protected getTitlePic():string
    // {	
    // 	return null;
    // }
    WifeView.prototype.initView = function () {
        // this.titleTF.text = LanguageManager.getlocal("wifeViewTitle");
        this.titleBmp.setRes(this.getTitlePic());
        this.titleBmp.x = GameConfig.stageWidth / 2 - this.titleBmp.width / 2;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHILD_GUIDE, this.doGuide, this);
        // SoundManager.playEffect(SoundConst.EFFECT_WIFE);
        this.playEffect(SoundConst.EFFECT_WIFE, true);
        RookieCfg.changeRookieCfg();
        Api.rookieVoApi.checkNextStep();
        Api.mainTaskVoApi.isKeepGuide = true;
        Api.mainTaskVoApi.checkShowGuide();
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_CALL), this.callWifeCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_RECOVERENERGY), this.recoverEnergyCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD), this.refreshItem, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL), this.refreshItem, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_LOVE), this.refreshItem, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_EQUIP), this.refreshItem, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFESTATUS, this.checkRedPoint, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFEBATTLE_REFRESHVO, this.checkRedPoint, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING, this.setSexCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, this.freshOpenFunc, this);
        //大背景
        var bigBg = BaseBitmap.create("wife_listbg");
        bigBg.y = GameConfig.stageHeigth - bigBg.height - this.getTitleButtomY();
        this.addChildToContainer(bigBg);
        var bottom = BaseBitmap.create("arena_bottom");
        bottom.height += 20;
        bottom.y = GameConfig.stageHeigth - this.container.y - bottom.height;
        this.addChildToContainer(bottom);
        this._wifVoApi = Api.wifeVoApi;
        this._wifeInfoVoList = this._wifVoApi.getWifeInfoVoList();
        this._dropBtnList = [];
        this._lastDropIdx = Api.otherInfoVoApi.getWifeSortId();
        if (this._wifeInfoVoList.length <= 0) {
            return;
        }
        // let bottomBg = BaseBitmap.create("public_9_bg23");
        // bottomBg.width = GameConfig.stageWidth-10;
        // bottomBg.height = GameConfig.stageHeigth - 230;
        // bottomBg.x = 5;
        // bottomBg.y = 0;
        // this.addChildToContainer(bottomBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 14, GameConfig.stageHeigth - 190);
        var wifeList = new Array();
        wifeList.push(null);
        wifeList = wifeList.concat(this._wifeInfoVoList);
        var key = "";
        switch (Number(this._lastDropIdx)) {
            case 1:
                break;
            case 2:
                key = "intimacy";
                break;
            case 3:
                key = "glamour";
                break;
            case 4:
                key = "artistry";
                break;
        }
        if (key != "") {
            wifeList.sort(function (a, b) {
                if (a && b) {
                    var isexcilea = Api.wifebanishVoApi.getIsWifeBanishing(a.id.toString());
                    var isexcileb = Api.wifebanishVoApi.getIsWifeBanishing(b.id.toString());
                    if (isexcilea && isexcileb) {
                        if (key != "") {
                            return b[key] - a[key];
                        }
                        return -1;
                    }
                    else if (isexcilea) {
                        return 1;
                    }
                    else if (isexcileb) {
                        return -1;
                    }
                    else {
                        if (key != "") {
                            return b[key] - a[key];
                        }
                        return -1;
                    }
                }
            });
        }
        wifeList.push(null);
        // let wife1 = new Array<WifeInfoVo>;
        // [wifeList].concat(this._wifeInfoVoList).concat(wifeList);
        // egret.log(wifeList.length)
        this._scrollList = ComponentManager.getScrollList(WifeScrollItem1, wifeList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(7, -15);
        // this._scrollList.addTouchTap(this.clickItemHandler,this);
        // this._scrollList.setScrollTop(300,0);
        this._dropDownBtn = ComponentManager.getButton("common_select_frame", "", this.dropDownBtnClickHandler, this, [0]);
        this._dropDownBtn.x = 40;
        this._dropDownBtn.y = bottom.y + 7;
        this._dropDownBtn.setColor(ServantView.DROPBTN_COLOR1);
        this.addChildToContainer(this._dropDownBtn);
        this._dropDownBtn.setText("wife_dropTxt" + this._lastDropIdx);
        this._dropBtnList.push(this._dropDownBtn);
        this._dropDownFlag = BaseBitmap.create("common_arrow_1");
        this._dropDownFlag.anchorOffsetY = this._dropDownFlag.height / 2;
        this._dropDownFlag.x = this._dropDownBtn.x + this._dropDownBtn.width - this._dropDownFlag.width - 3;
        this._dropDownFlag.y = this._dropDownBtn.y + this._dropDownBtn.height - this._dropDownFlag.height / 2 - 3;
        this.addChildToContainer(this._dropDownFlag);
        this._dropDownContainer = new BaseDisplayObjectContainer();
        this._dropDownContainer.visible = false;
        this._dropDownContainer.x = this._dropDownBtn.x;
        this._dropDownContainer.y = this._dropDownBtn.y - this._dropDownBtn.height;
        var dropCfg = [
            "wife_dropTxt1", "wife_dropTxt2", "wife_dropTxt3"
        ];
        if (Api.switchVoApi.checkOpenWifeBattle()) {
            dropCfg.push("wife_dropTxt4");
        }
        for (var index = 1; index <= dropCfg.length; index++) {
            var tmpBtn = ComponentManager.getButton("common_select_frame", "", this.dropDownBtnClickHandler, this, [index]);
            this._dropBtnList.push(tmpBtn);
            tmpBtn.setColor(ServantView.DROPBTN_COLOR1);
            tmpBtn.y = -tmpBtn.height * (index - 1) - 3;
            this._dropDownContainer.addChild(tmpBtn);
            tmpBtn.setText(dropCfg[index - 1]);
        }
        var vigorTF = ComponentManager.getTextField(LanguageManager.getlocal("vigorDesc") + ":", 18);
        vigorTF.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        vigorTF.x = 40;
        vigorTF.y = this._scrollList.y + this._scrollList.height + 20;
        this.addChildToContainer(vigorTF);
        this._vigorNumTF = ComponentManager.getTextField(this._wifVoApi.getEnergyNum() + "/" + this._wifVoApi.getEnergyMaxNum(), 18);
        this._vigorNumTF.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        this._vigorNumTF.x = vigorTF.x + vigorTF.width + 15;
        this._vigorNumTF.y = vigorTF.y;
        this.addChildToContainer(this._vigorNumTF);
        var vipTipTxt = ComponentManager.getTextField("", 18);
        vipTipTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        vipTipTxt.x = vigorTF.x;
        vipTipTxt.y = vigorTF.y + 35;
        this.addChildToContainer(vipTipTxt);
        //一件传唤
        var needVip = GameConfig.config.wifebaseCfg.needVip;
        if (Api.playerVoApi.getPlayerVipLevel() >= needVip) {
            // vigorTF.visible = this._vigorNumTF.visible = true;
            // vipTipTxt.text = LanguageManager.getlocal("wifeBatchTxt2");
            var checkbox = ComponentManager.getCheckBox(LanguageManager.getlocal("wifeBatchTxt2"));
            checkbox.x = vipTipTxt.x + vipTipTxt.width + 190;
            checkbox.y = vigorTF.y + 35;
            this.addChildToContainer(checkbox);
            this._checkBox = checkbox;
            this._checkBox.addTouchTap(this.selectHandler, this);
            //自动补充
            this._autoMakeup = ComponentManager.getCheckBox(LanguageManager.getlocal("searchTwoKeyDesc"));
            this._autoMakeup.setPosition(vigorTF.x, vigorTF.y + 35);
            this.addChildToContainer(this._autoMakeup);
            this._autoMakeup.addTouchTap(this.autoMakeupCheck, this);
            var isShow = LocalStorageManager.get(LocalStorageConst.LOCAL_WIFE_AUTO_MAKEUP + Api.playerVoApi.getPlayerID());
            if (isShow && isShow != "") {
                this._autoMakeup.setSelected(true);
            }
        }
        else {
            vipTipTxt.text = LanguageManager.getlocal("wifeBatchTxt", [needVip]);
            // vigorTF.visible = this._vigorNumTF.visible = false;
            vipTipTxt.y = vigorTF.y + 45;
        }
        this._callBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "callBtn", this.clickCallBtn, this);
        this._callBtn.x = GameConfig.stageWidth - this._callBtn.width - 60;
        this._callBtn.y = bottom.y + bottom.height - this._callBtn.height - 13;
        this.addChildToContainer(this._callBtn);
        this._callBtn.setColor(TextFieldConst.COLOR_BLACK);
        vigorTF.x = this._callBtn.x + (this._callBtn.width - vigorTF.width - this._vigorNumTF.width - 15) / 2;
        vigorTF.y = this._callBtn.y - vigorTF.height - 5;
        this._vigorNumTF.x = vigorTF.x + vigorTF.width + 15;
        this._vigorNumTF.y = vigorTF.y;
        if (Api.playerVoApi.getPlayerVipLevel() >= needVip) {
            vipTipTxt.x = this._callBtn.x + (this._callBtn.width - vipTipTxt.width) / 2;
            vipTipTxt.y = vigorTF.y;
        }
        this._recoverBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "recoverVigor", this.clickCallBtn, this);
        this._recoverBtn.x = GameConfig.stageWidth - this._recoverBtn.width - 60;
        this._recoverBtn.y = this._callBtn.y;
        this.addChildToContainer(this._recoverBtn);
        this._recoverBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._recoverBtn.visible = false;
        this.tick();
        var unLockBtn;
        if (Api.switchVoApi.checkCloseText()) {
            unLockBtn = ComponentManager.getButton("wifelookbtn_hexie", null, this.unLockClick, this);
        }
        else {
            unLockBtn = ComponentManager.getButton("wifelookbtn", null, this.unLockClick, this);
        }
        unLockBtn.x = 15;
        unLockBtn.y = 0;
        unLockBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(unLockBtn);
        if (Api.switchVoApi.checkIsInBlueWife()) {
            unLockBtn.setBtnBitMap("wifelookbtn_blueType");
        }
        if (Api.switchVoApi.checkTWShenhe()) {
            unLockBtn.visible = false;
        }
        if (!Api.rookieVoApi.isGuiding && !Api.rookieVoApi.isInGuiding) {
            var taskId = Api.mainTaskVoApi.getCurMainTaskId();
            var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
            if (taskCfg) {
                var taskType = taskCfg.questType;
                if (taskType == 301 || taskType == 401) {
                    var btn = this._callBtn;
                    if (this._wifVoApi.getEnergyNum() <= 0) {
                        btn = this._recoverBtn;
                    }
                    this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(this.container, btn.x + btn.width / 2 - 10, btn.y, [btn], taskType, true, function () {
                        return true;
                    }, this);
                }
            }
        }
        if (Api.switchVoApi.checkOpenWifeStatus()) {
            this._wifeStatusBtn = ComponentManager.getButton(Api.switchVoApi.checkIsInBlueWife() ? "wifestatus_btn_male" : "wifestatus_btn", null, this.wifestatusClick, this);
            this._wifeStatusBtn.x = 15;
            this._wifeStatusBtn.y = unLockBtn.y + unLockBtn.height;
            this._wifeStatusBtn.setColor(TextFieldConst.COLOR_BLACK);
            this.addChildToContainer(this._wifeStatusBtn);
        }
        var servant_mask = BaseBitmap.create("servant_mask");
        servant_mask.width = GameConfig.stageWidth;
        servant_mask.x = 0;
        servant_mask.y = GameConfig.stageHeigth - this.container.y - bottom.height - 140;
        this.addChildToContainer(servant_mask);
        this.addChildToContainer(this._dropDownContainer);
        if (!Api.unlocklist2VoApi.checkShowOpenFunc() && Api.switchVoApi.checkOpenBanish() || (Api.unlocklist2VoApi.checkShowOpenFunc() && (Api.unlocklist2VoApi.checkIsCanShowFunc("wifebanish") || Api.unlocklist2VoApi.checkNeedShowByName("wifebanish")))) {
            this._banishBtn = ComponentManager.getButton("wifebanish_btn", null, this.banishHandle, this);
            this._banishBtn.x = GameConfig.stageWidth - this._banishBtn.width - 5;
            this._banishBtn.y = 95;
            this.addChild(this._banishBtn);
            if (Api.wifeVoApi.getWifeNum() <= Config.BanishCfg.getNumNeed()) {
                App.DisplayUtil.changeToGray(this._banishBtn);
            }
            else {
                if (LocalStorageManager.get(LocalStorageConst.LOCAL_BANISH_REDDOT + Api.playerVoApi.getPlayerID()) != "1" || Api.wifebanishVoApi.checkNpcMessage()) {
                    var redDotSp = BaseBitmap.create("public_dot2");
                    redDotSp.setPosition(this._banishBtn.width - redDotSp.width - 5, 20);
                    this._banishBtn.addChild(redDotSp);
                    redDotSp.name = "reddot";
                }
            }
            if (Api.unlocklist2VoApi.checkShowOpenFunc() && Api.unlocklist2VoApi.checkNeedShowByName("wifebanish")) {
                this._banishBtn.visible = false;
                // App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, this.freshOpenFunc, this);
                Api.unlocklist2VoApi.checkWaitingShowInFunc("wife", "wifebanish");
            }
            else {
                this._banishBtn.visible = true;
            }
        }
        if (Api.switchVoApi.checkOpenWifeBattle()) {
            var group = new BaseDisplayObjectContainer();
            group.width = 158;
            group.height = 153;
            this.addChildToContainer(group);
            var shanzi = BaseBitmap.create("wifebattleshanzi");
            group.addChild(shanzi);
            if (Api.wifebattleVoApi.checkCanJoin()) {
                App.DisplayUtil.changeToNormal(group);
                if (this.checkHaveBuff()) {
                    var clip = ComponentManager.getCustomMovieClip("wifebattleicon", 8);
                    clip.width = 260;
                    clip.height = 200;
                    clip.blendMode = egret.BlendMode.ADD;
                    clip.setPosition((group.width - clip.width) / 2, (group.height - clip.height) / 2);
                    clip.playWithTime(-1);
                    group.addChild(clip);
                }
            }
            else {
                App.DisplayUtil.changeToGray(group);
            }
            group.addTouchTap(function () {
                if (Api.wifebattleVoApi.checkCanJoin()) {
                    ViewController.getInstance().openView(ViewConst.COMMON.WIFEBATTLEVIEW);
                }
                else {
                    App.CommonUtil.showTip(Api.wifebattleVoApi.getLockedString());
                }
            }, this);
            this._wifebattle = group;
            if (Api.unlocklist2VoApi.checkShowOpenFunc()) {
                if (Api.unlocklist2VoApi.checkIsCanShowFunc("wifebattle")) {
                    group.visible = Api.playerVoApi.getPlayerLevel() >= 3;
                }
                else {
                    group.visible = false;
                }
                if (Api.playerVoApi.getPlayerLevel() >= 3) {
                    Api.unlocklist2VoApi.checkWaitingShowInFunc("wife", "wifebattle");
                }
            }
            else {
                group.visible = Api.playerVoApi.getPlayerLevel() >= 3;
            }
            group.x = GameConfig.stageWidth - group.width - 15;
            group.y = GameConfig.stageHeigth - this.container.y - bottom.height - group.height;
        }
        this.checkRedPoint();
    };
    WifeView.prototype.dropDownBtnClickHandler = function (btnIdx) {
        var tmpIdx = this._lastDropIdx;
        for (var index = 1; index < this._dropBtnList.length; index++) {
            this._dropBtnList[index].updateButtonImage(BaseButton.BTN_STATE1);
        }
        this._dropBtnList[this._lastDropIdx].updateButtonImage(BaseButton.BTN_STATE2);
        if (this._dropDownContainer.visible) {
            this._dropDownFlag.scaleY = 1;
            this._dropDownContainer.visible = false;
        }
        else {
            this._dropDownFlag.scaleY = -1;
            this._dropDownContainer.visible = true;
        }
        if (btnIdx > 0) {
            this._dropDownBtn.setText("wife_dropTxt" + btnIdx);
            this._lastDropIdx = btnIdx;
        }
        if (tmpIdx == this._lastDropIdx) {
            return;
        }
        this.refreshSort(btnIdx);
        NetManager.request(NetRequestConst.REQUEST_OTHER_RECORDWIIFESORT, { wsortId: this._lastDropIdx });
        // let keys = Api.servantVoApi.getServantInfoIdListWithSort(btnIdx);
        //
        //NetManager.request(NetRequestConst.REQUEST_OTHER_RECORDSERVANTSORT,{sortId:this._lastDropIdx});	
    };
    WifeView.prototype.refreshSort = function (btnIdx) {
        //排序数据，刷新列表
        this._wifeInfoVoList = this._wifVoApi.getWifeInfoVoList();
        var wifeList = new Array();
        wifeList.push(null);
        wifeList = wifeList.concat(this._wifeInfoVoList);
        var key = "";
        switch (Number(btnIdx)) {
            case 1:
                break;
            case 2:
                key = "intimacy";
                break;
            case 3:
                key = "glamour";
                break;
            case 4:
                key = "artistry";
                break;
        }
        if (key != "") {
            wifeList.sort(function (a, b) {
                if (a && b) {
                    var isexcilea = Api.wifebanishVoApi.getIsWifeBanishing(a.id.toString());
                    var isexcileb = Api.wifebanishVoApi.getIsWifeBanishing(b.id.toString());
                    if (isexcilea && isexcileb) {
                        if (key != "") {
                            return b[key] - a[key];
                        }
                        return -1;
                    }
                    else if (isexcilea) {
                        return 1;
                    }
                    else if (isexcileb) {
                        return -1;
                    }
                    else {
                        if (key != "") {
                            return b[key] - a[key];
                        }
                        return -1;
                    }
                }
            });
        }
        wifeList.push(null);
        this._scrollList.refreshData(wifeList);
    };
    WifeView.prototype.freshOpenFunc = function (evt) {
        if (evt && evt.data) {
            var key = evt.data.key;
            if (key == "wifebanish") {
                if (this._banishBtn) {
                    this._banishBtn.visible = true;
                }
            }
            else if (key == "wifebattle") {
                if (this._wifebattle) {
                    this._wifebattle.visible = true;
                }
            }
        }
    };
    WifeView.prototype.banishHandle = function () {
        if (Api.wifeVoApi.getWifeNum() <= Config.BanishCfg.getNumNeed()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("banish_locked"));
            return;
        }
        if (!this._wifeBanish) {
            this.request(NetRequestConst.REQUEST_WIFE_GETWIFEBANISHMODEL, {});
        }
        else {
            this.banishHandleCallback();
        }
        if (this._guideBtn) {
            if (!this._wifeBanish || this._isBanish) {
                this._guideBtn.visible = false;
            }
            else {
                this._guideBtn.visible = true;
            }
        }
    };
    WifeView.prototype.checkHaveBuff = function () {
        var modelList = Api.acVoApi.getRanActives();
        for (var i in modelList) {
            var unit = modelList[i];
            if (unit.atype == "22") {
                var t = unit.et - GameData.serverTime - 86400 * 1;
                if (t > 0) {
                    return true;
                }
            }
        }
        return false;
    };
    WifeView.prototype.banishHandleCallback = function () {
        if (!this._wifeBanish) {
            this._wifeBanish = new WifeBanish();
            this._wifeBanish.init();
            this._wifeBanish.y = this.container.y;
            this._backBtn = ComponentManager.getButton("wife_back_btn", null, this.banishHandle, this);
            this._backBtn.x = 10;
            this._backBtn.y = 160;
            this.addChild(this._backBtn);
            if (this._banishBtn.getChildByName("reddot")) {
                this._banishBtn.removeChild(this._banishBtn.getChildByName("reddot"));
                LocalStorageManager.set(LocalStorageConst.LOCAL_BANISH_REDDOT + Api.playerVoApi.getPlayerID(), "1");
            }
        }
        this._isBanish = !this._isBanish;
        if (this._isBanish) {
            this.addChildAt(this._wifeBanish, this.getChildIndex(this.container));
            this.removeChild(this.container);
            this._backBtn.visible = true;
            this._banishBtn.visible = false;
            // this.titleTF.text = LanguageManager.getlocal("banishViewTitle2");
            this.titleBmp.setRes("wifeviewtitle_banish");
            this.titleBmp.x = GameConfig.stageWidth / 2 - this.titleBmp.width / 2;
        }
        else {
            this.addChildAt(this.container, this.getChildIndex(this._wifeBanish));
            this.removeChild(this._wifeBanish);
            this._backBtn.visible = false;
            this._banishBtn.visible = true;
            this._wifeInfoVoList = this._wifVoApi.getWifeInfoVoList();
            var wifeList = new Array();
            wifeList.push(null);
            wifeList = wifeList.concat(this._wifeInfoVoList);
            wifeList.push(null);
            this._scrollList.refreshData(wifeList);
            // this.titleTF.text = LanguageManager.getlocal("wifeViewTitle");
            this.titleBmp.setRes(this.getTitlePic());
            this.titleBmp.x = GameConfig.stageWidth / 2 - this.titleBmp.width / 2;
        }
        if (this.titleTF) {
            this.titleTF.x = this.width / 2 - this.titleTF.width / 2;
        }
    };
    WifeView.prototype.receiveData = function (data) {
        if (data.ret) {
            this.banishHandleCallback();
            if (data.data.data.wifeIds && data.data.data.wifeIds.length > 0) {
                var wifeStr = "";
                var wifeIds = data.data.data.wifeIds;
                for (var k in wifeIds) {
                    if (wifeStr != "") {
                        wifeStr += "、";
                    }
                    var cfg = Config.WifeCfg.getWifeCfgById(wifeIds[k]);
                    wifeStr += cfg.name;
                }
                if (wifeIds.length > 1) {
                    wifeStr = LanguageManager.getlocal("banishing_end_decs2", [wifeStr, String(wifeIds.length)]);
                }
                else {
                    wifeStr = LanguageManager.getlocal("banishing_end_decs", [wifeStr]);
                }
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    "msg": wifeStr,
                    "needCancel": false,
                    "title": "banishing_end",
                    "callback": null,
                    "handler": null,
                });
            }
        }
    };
    WifeView.prototype.getResourceList = function () {
        var _resArr = [
            "wifeview_namebg", "wifeview_charmicon", "common_select_frame", "common_select_frame_down", "common_arrow_1",
            "wifeview_vigoricon", "wifeview_unlockmask", "wife_listbg", "wifehome2",
            "arena_bottom", "wifehalfbg", "servantexiletiipbg", 'wifehalfbg2', "wifeview_artistryicon",
            "servant_mask", "wifeview_itembg", "wifeview_lockbg", "wifeview_itembg2", "wifestatus_btn_down", "wifestatus_btn"
        ];
        if (Api.switchVoApi.checkIsInBlueWife()) {
            _resArr.push("wifestatus_btn_male_down");
            _resArr.push("wifestatus_btn_male");
            _resArr.push("wifelookbtn_blueType_down");
            _resArr.push("wifelookbtn_blueType");
        }
        if (Api.switchVoApi.checkCloseText()) {
            _resArr.push("wifelookbtn_hexie_down");
            _resArr.push("wifelookbtn_hexie");
        }
        else {
            _resArr.push("wifelookbtn_down");
            _resArr.push("wifelookbtn");
        }
        if (Api.switchVoApi.checkOpenBanish()) {
            _resArr.push("wifebanish_btn");
            _resArr.push("wifebanish_btn_down");
            _resArr.push("wifeviewtitle_banish");
            if (Api.wifeVoApi.getWifeNum() > Config.BanishCfg.getNumNeed()) {
                _resArr.push("wifebanish");
                _resArr.push("banish_house");
                _resArr.push("bookroom_tipbg");
                _resArr.push("forpeople_top");
                _resArr.push("wife_banishing_bg");
                _resArr.push("dinner_line");
                _resArr.push("wife_banishing_text");
            }
        }
        if (Api.switchVoApi.checkOpenWifeBattle()) {
            _resArr.push("wifebattlebottombg");
            _resArr.push("wifebattleflower1");
            _resArr.push("wifebattleflower2");
            _resArr.push("wifebattlenpc1");
            _resArr.push("wifebattlenpc2");
            _resArr.push("wifebattleshanzi");
            _resArr.push("wifebattletxt");
        }
        if (Api.switchVoApi.checkOpenBlueWife()) {
            _resArr.push("wifechangesex");
        }
        return _super.prototype.getResourceList.call(this).concat(_resArr);
    };
    WifeView.prototype.unLockClick = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.WIFEUNLOCKVIEW);
    };
    WifeView.prototype.wifestatusClick = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.WIFESTATUSVIEW);
        this.hide();
    };
    WifeView.prototype.checkRedPoint = function () {
        //一键册封
        if (Api.wifestatusVoApi.getIsConfer()) {
            if (this._redDotSp == null && this._wifeStatusBtn) {
                this._redDotSp = BaseBitmap.create("public_dot2");
                this._redDotSp.x = this._wifeStatusBtn.x + this._wifeStatusBtn.width - this._redDotSp.width - 30;
                this._redDotSp.y = this._wifeStatusBtn.y + 20;
                this.addChildToContainer(this._redDotSp);
            }
            else {
                if (this._redDotSp) {
                    this._redDotSp.visible = true;
                }
            }
        }
        else {
            if (this._redDotSp) {
                this._redDotSp.visible = false;
            }
        }
        if (this._wifebattle) {
            if (Api.playerVoApi.getPlayerLevel() >= 3) {
                if (Api.unlocklist2VoApi.checkShowOpenFunc()) {
                    if (Api.unlocklist2VoApi.checkIsCanShowFunc("wifebattle")) {
                        this._wifebattle.visible = true;
                    }
                    else {
                        this._wifebattle.visible = false;
                    }
                }
                else {
                    this._wifebattle.visible = true;
                }
                if (Api.wifebattleVoApi.checkCanJoin()) {
                    App.DisplayUtil.changeToNormal(this._wifebattle);
                    if (Api.wifebattleVoApi.checkNpcMessage()) {
                        App.CommonUtil.addIconToBDOC(this._wifebattle);
                    }
                    else {
                        App.CommonUtil.removeIconFromBDOC(this._wifebattle);
                    }
                }
                else {
                    App.DisplayUtil.changeToGray(this._wifebattle);
                }
            }
            else {
                this._wifebattle.visible = false;
            }
        }
    };
    WifeView.prototype.selectHandler = function () {
        if (this._checkBox.checkSelected()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeBatchCallTip2"));
            this._callBtn.setText("wifeBatchTxt2");
        }
        else {
            this._callBtn.setText("callBtn");
        }
    };
    WifeView.prototype.autoMakeupCheck = function () {
        if (this._autoMakeup.checkSelected()) {
            LocalStorageManager.set(LocalStorageConst.LOCAL_WIFE_AUTO_MAKEUP + Api.playerVoApi.getPlayerID(), "true");
        }
        else {
            LocalStorageManager.set(LocalStorageConst.LOCAL_WIFE_AUTO_MAKEUP + Api.playerVoApi.getPlayerID(), "");
        }
    };
    WifeView.prototype.clickCallBtn = function (param) {
        if (WifeView.isMoveing) {
            return;
        }
        Api.rookieVoApi.checkNextStep();
        // todo随机传唤
        if (this._wifVoApi.getEnergyNum() > 0) {
            var batchV = false;
            if (this._checkBox && this._checkBox.checkSelected()) {
                batchV = true;
            }
            NetManager.request(NetRequestConst.REQUEST_WIFE_CALL, { autoFlag: batchV });
        }
        else {
            var itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(GameConfig.config.wifebaseCfg.needItem));
            if (itemInfoVo && itemInfoVo.num > 0) {
                var message = LanguageManager.getlocal("useItemMsg", [itemInfoVo.name + "x1", LanguageManager.getlocal("vigorDesc")]);
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.confirmCallbackHandler, handler: this, icon: itemInfoVo.icon, iconBg: itemInfoVo.iconBg, num: itemInfoVo.num, msg: message, id: Number(GameConfig.config.wifebaseCfg.needItem), useNum: 1 });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("vigorNumNoEnoughMsg"));
            }
        }
    };
    WifeView.prototype.confirmCallbackHandler = function () {
        if (WifeView.isMoveing) {
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_WIFE_RECOVERENERGY, null);
    };
    // private clickItemHandler(event:egret.TouchEvent):void
    // {
    // 	let index:number = Number(event.data);
    // 	let wifeInfoVo = this._wifeInfoVoList[index];
    // 	let id = wifeInfoVo.id;
    // 	// todo打开宠幸妻妾界面
    // 	ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW,{id,handler:this});
    // 	SoundManager.stopEffect(SoundConst.EFFECT_WIFE);
    // 	this._selectWifeId = id;
    // }
    // 随机传唤后端返回数据后
    WifeView.prototype.callWifeCallback = function (event) {
        if (!event.data.ret) {
            return;
        }
        var rdata = event.data.data.data;
        this._loveData = rdata;
        this.tick();
        this.checkAutoMakeup();
        this.refreshSort(this._lastDropIdx);
        //一键传唤
        if (this._checkBox && this._checkBox.checkSelected()) {
            var autoCallWife = rdata.autoCallWife;
            if (this._autoMakeup && this._autoMakeup.checkSelected()) {
                //勾选了一键补充
                var rewardsShowArr = [];
                for (var i = 0; i < autoCallWife.length; ++i) {
                    var unit = autoCallWife[i];
                    var wifeid = unit[0];
                    var num = unit[1];
                    var isbless = unit[2];
                    var wifecfg = Config.WifeCfg.getWifeCfgById(wifeid);
                    rewardsShowArr.push(LanguageManager.getlocal("wifeCallTip" + (isbless ? 2 : 1), [wifecfg.name, num]));
                }
                if (this._tipSar.length <= 0) {
                    this._tipSar = this._tipSar.concat(rewardsShowArr);
                    this.playRewardTip();
                }
                else {
                    this._tipSar = this._tipSar.concat(rewardsShowArr);
                }
            }
            else {
                ViewController.getInstance().openView(ViewConst.BASE.WIFECALLBATCHSUCCESSVIEW, [autoCallWife]);
            }
            // ViewController.getInstance().openView(ViewConst.BASE.ITEMUSESUCCESSVIEW,[rdata.servantArr,this._lastUseNum,this._selectedItemInfoVo.name])
            return;
        }
        var id = this._loveData.callWife[0];
        if (Api.rookieVoApi.isEnRookie()) {
            ViewController.getInstance().openView(ViewConst.BASE.WIFELOVEANIVIEW, { id: id });
            return;
        }
        if (rdata.lucky) {
            TimerManager.doTimer(2000, 1, this.showLucky, this);
        }
        this._scrollList.addEventListener(egret.Event.COMPLETE, this.moveComplete, this);
        this.container.touchChildren = false;
        var index = this.getWifeIndexVoById(id);
        WifeView.isMoveing = true;
        this._scrollIndex = index;
        this._scrollList.setScrollTopByIndex(index, 500);
        var wideItem = this._scrollList.getItemByIndex(index);
        wideItem.refreshData(id);
        if (rdata.rewards) {
            this._rewardData = rdata.rewards;
            // let rewards= GameData.formatRewardItem(rdata.rewards);
            // if(rewards&&rewards.length>0)
            // {
            // 	App.CommonUtil.playRewardFlyAction(rewards);
            // }
        }
    };
    WifeView.prototype.getWifeIndexVoById = function (wifeId) {
        var view = this;
        var idx = 0;
        var list = view._scrollList;
        for (var i in list._dataList) {
            var unit = list._dataList[i];
            if (unit && Number(unit.id) === Number(wifeId)) {
                idx = Number(i);
            }
        }
        return idx;
    };
    WifeView.prototype.refreshItem = function (p) {
        if (!p.data.ret) {
            return;
        }
        if (p.data.ret == true && p.data.data.data.lucky) {
            this.showLucky();
        }
        this.refreshSort(this._lastDropIdx);
        var index = this.getWifeIndexVoById(WifeView.wifeId);
        var wideItem = this._scrollList.getItemByIndex(index);
        if (wideItem && WifeView.wifeId) {
            wideItem.refreshData(WifeView.wifeId);
        }
        // 问候不补充
        // this.checkAutoMakeup();
    };
    // 列表滑动结束后
    WifeView.prototype.moveComplete = function (event) {
        this.container.touchChildren = true;
        this._scrollList.removeEventListener(egret.Event.COMPLETE, this.moveComplete, this);
        var posX = this._scrollList.getItemByIndex(this._scrollIndex).x;
        var posY = this._scrollList.getItemByIndex(this._scrollIndex).y;
        var targetPoint = this._scrollList.getItemByIndex(this._scrollIndex).localToGlobal(0, 0);
        // 播放召唤动画，更新数据
        var index = Number(event.data);
        var wifeInfoVo = this._wifeInfoVoList[index];
        var id = this._loveData.callWife[0];
        var childData = null;
        if (this._loveData.childArr.length > 0) {
            childData = this._loveData.childArr[0];
        }
        // if(this._rewardData)
        // {
        // 	let rewards= GameData.formatRewardItem(this._rewardData);
        // 	if(rewards&&rewards.length>0)
        // 	{
        // 		App.CommonUtil.playRewardFlyAction(rewards);
        // 	}
        // }
        ViewController.getInstance().openView(ViewConst.BASE.WIFELOVEANIVIEW, { id: id, type: 1, x: targetPoint.x, y: targetPoint.y, childData: childData, rewards: this._rewardData });
    };
    WifeView.prototype.showLucky = function () {
        App.CommonUtil.showGodbless("wife");
    };
    // 使用精力丹后端返回数据后
    WifeView.prototype.recoverEnergyCallback = function (event) {
        if (!event.data.ret) {
            return;
        }
        var rdata = event.data.data.data;
        this.tick();
    };
    WifeView.prototype.tick = function () {
        if (this._vigorNumTF == null) {
            return;
        }
        if (this._wifVoApi.getEnergyNum() > 0) {
            this._callBtn.visible = true;
            this._recoverBtn.visible = false;
            this._vigorNumTF.text = this._wifVoApi.getEnergyNum() + "/" + this._wifVoApi.getEnergyMaxNum();
        }
        else {
            this._callBtn.visible = false;
            this._recoverBtn.visible = true;
            this._vigorNumTF.text = App.DateUtil.getFormatBySecond(this._wifVoApi.getRecoverEnergyTime(), 1);
        }
        if (this._wifeBanish) {
            this._wifeBanish.tick();
        }
    };
    // protected getTabbarTextArr():Array<string>
    // {
    // 	return ["wifeViewTab1Title",
    // 			"wifeViewTab2Title"
    // 	];
    // }
    WifeView.prototype.checkAutoMakeup = function () {
        if (this._autoMakeup && this._autoMakeup.checkSelected() && this._wifVoApi.getEnergyNum() <= 0) {
            if (Api.itemVoApi.getItemNumInfoVoById(Number(GameConfig.config.wifebaseCfg.needItem)) > 0) {
                this.confirmCallbackHandler();
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("vigorNumNoEnoughMsg"));
            }
        }
    };
    WifeView.prototype.doGuide = function () {
        this.hide();
    };
    WifeView.prototype.getRuleInfo = function () {
        if (!Api.unlocklist2VoApi.checkShowOpenFunc() && Api.switchVoApi.checkOpenBanish() || (Api.unlocklist2VoApi.checkShowOpenFunc() && (Api.unlocklist2VoApi.checkIsCanShowFunc("wifebanish") || Api.unlocklist2VoApi.checkNeedShowByName("wifebanish")))) {
            return "wife_description_with_banish";
        }
        else {
            return "wife_description";
        }
    };
    WifeView.prototype.getExtraRuleInfo = function () {
        var params = [];
        if (!Api.unlocklist2VoApi.checkShowOpenFunc() && Api.switchVoApi.checkOpenBanish() || (Api.unlocklist2VoApi.checkShowOpenFunc() && (Api.unlocklist2VoApi.checkIsCanShowFunc("wifebanish") || Api.unlocklist2VoApi.checkNeedShowByName("wifebanish")))) {
            params.push(LanguageManager.getlocal("wife_descriptionPart1"));
        }
        else {
            params.push("");
        }
        if (Api.switchVoApi.checkWifeExpExchangeOpen()) {
            params.push(LanguageManager.getlocal("wife_descriptionPart2"));
        }
        else {
            params.push("");
        }
        if (Api.switchVoApi.checkOpenBlueWife()) {
            params.push(LanguageManager.getlocal("wife_descriptionPart3"));
        }
        else {
            params.push("");
        }
        if (Api.switchVoApi.checkOpenWifeBattle()) {
            params.push(LanguageManager.getlocal("wife_descriptionPart4"));
            params.push(LanguageManager.getlocal("wife_descriptionPart5"));
        }
        else {
            params.push("");
            params.push("");
        }
        if (Api.switchVoApi.checkOpenWifeExSkill()) {
            params.push(LanguageManager.getlocal("wife_descriptionPart6"));
        }
        else {
            params.push("");
        }
        return LanguageManager.getlocal("wife_descriptionSpell2", params);
    };
    WifeView.prototype.hide = function () {
        if (Api.rookieVoApi.isInGuiding && !Api.rookieVoApi.isGuiding) {
            return;
        }
        if (Api.rookieVoApi.isInGuiding) {
            // Api.rookieVoApi.checkWaitingGuide();
            Api.rookieVoApi.checkNextStep();
        }
        _super.prototype.hide.call(this);
    };
    WifeView.prototype.setSexCallback = function (event) {
        if (!event.data.ret) {
            return;
        }
        var index = this.getWifeIndexVoById(WifeView.wifeId);
        var wideItem = this._scrollList.getItemByIndex(index);
        if (wideItem && WifeView.wifeId) {
            wideItem.refreshData(WifeView.wifeId);
        }
    };
    WifeView.prototype.playRewardTip = function () {
        if (!this._tipMask) {
            this._tipMask = BaseBitmap.create("public_9_bg8");
            this._tipMask.width = GameConfig.stageWidth;
            this._tipMask.height = GameConfig.stageHeigth;
            this._tipMask.alpha = 0;
            this._tipMask.touchEnabled = false;
            LayerManager.msgLayer.addChild(this._tipMask);
        }
        //一键寻访奖励飘字
        // let strArr:string[]=this.ar;
        var offY = 70;
        var tipContainer = new BaseDisplayObjectContainer();
        var tipBg = BaseBitmap.create("public_itemtipbg2");
        tipContainer.addChild(tipBg);
        this.tipContainerArr.push(tipContainer);
        var tipTxt = ComponentManager.getTextField(this._tipSar.shift(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        tipBg.width = tipBg.width + tipTxt.width;
        tipTxt.setPosition((tipBg.width - tipTxt.width) / 2, (tipBg.height - tipTxt.height) / 2);
        tipContainer.addChild(tipTxt);
        tipContainer.setPosition((GameConfig.stageWidth - tipContainer.width) / 2, (GameConfig.stageHeigth - tipContainer.height) / 2 + offY);
        console.log(tipContainer.y);
        LayerManager.msgLayer.addChild(tipContainer);
        if (this._tipMask["count"] == null) {
            this._tipMask["count"] = 0;
        }
        else {
            tipContainer.y -= 9;
        }
        this._tipMask["count"]++;
        var ths = this;
        egret.Tween.get(tipContainer).to({ y: tipContainer.y - offY * 2 }, 1000).call(function (tipContainer) {
            if (tipContainer) {
                tipContainer.dispose();
            }
            if (ths._tipMask) {
                ths._tipMask["count"]--;
                if (!ths._tipMask["count"]) {
                    BaseBitmap.release(ths._tipMask);
                    ths._tipMask = null;
                    // let rData = Api.wifeVoApi.getWaitShowWife();
                    // if(rData)
                    // { 	
                    // 	ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,{wifeIdList:rData.unlockWife,servantId:rData.unlockServant});
                    // } 
                }
            }
        }, this, [tipContainer]);
        if (this._tipTipTimeOut < 0) {
            this._tipTipTimeOut = egret.setInterval(this.playRewardTip, this, 300, this._tipSar);
        }
        if (this._tipSar.length < 1) {
            if (this._tipTipTimeOut > -1) {
                egret.clearInterval(this._tipTipTimeOut);
                this._tipTipTimeOut = -1;
            }
        }
    };
    WifeView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHILD_GUIDE, this.doGuide, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_WIFESTATUS, this.checkRedPoint, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFEBATTLE_REFRESHVO, this.checkRedPoint, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_CALL), this.callWifeCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_RECOVERENERGY), this.recoverEnergyCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD), this.refreshItem, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL), this.refreshItem, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_LOVE), this.refreshItem, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_EQUIP), this.refreshItem, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING, this.setSexCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, this.freshOpenFunc, this);
        if (this._scrollList) {
            this._scrollList = null;
        }
        if (this._wifeInfoVoList) {
            this._wifeInfoVoList = null;
        }
        if (this._vigorNumTF) {
            this._vigorNumTF = null;
        }
        if (this._wifVoApi) {
            this._wifVoApi = null;
        }
        this._redDotSp = null;
        this._loveData = null;
        WifeView.wifeId = null;
        WifeView.isMoveing = false;
        this._rewardData = null;
        this._wifeStatusBtn = null;
        this._checkBox = null;
        this._banishBtn = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        this._isBanish = false;
        this._backBtn = null;
        this.container.dispose();
        if (this._wifeBanish) {
            this._wifeBanish.dispose();
            this._wifeBanish = null;
        }
        this._autoMakeup = null;
        this._wifebattle = null;
        Api.mainTaskVoApi.isKeepGuide = false;
        Api.mainTaskVoApi.hideGuide();
        this._lastDropIdx = 1;
        if (this.tipContainerArr && this.tipContainerArr.length > 0) {
            for (var i = 0; i < this.tipContainerArr.length; i++) {
                var tipObj = this.tipContainerArr[i];
                egret.Tween.removeTweens(tipObj);
                tipObj.dispose();
                tipObj = null;
                if (i == this.tipContainerArr.length - 1) {
                    egret.clearInterval(this._tipTipTimeOut);
                    this._tipTipTimeOut = -1;
                    this._tipSar = [];
                    this._tipMask = null;
                }
            }
        }
        _super.prototype.dispose.call(this);
    };
    WifeView.isMoveing = false;
    return WifeView;
}(CommonView));
__reflect(WifeView.prototype, "WifeView");
//# sourceMappingURL=WifeView.js.map