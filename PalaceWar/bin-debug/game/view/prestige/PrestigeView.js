/**
 * author shaoliang
 * date 2018/04/08
 * @class PrestigeView
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
var PrestigeView = (function (_super) {
    __extends(PrestigeView, _super);
    function PrestigeView() {
        var _this = _super.call(this) || this;
        _this._scrollContiner = null;
        _this._pillar = null;
        _this._curSelectedId = 0;
        _this._bottomBg = null;
        _this._addProTxtList = [];
        _this._lastPos = undefined;
        _this._brightLines = [];
        _this._diffDay = undefined;
        _this._canNum = 0;
        _this._curNameBg = null;
        return _this;
    }
    PrestigeView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRESTIGE_UP), this.upCallBackHandler, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRESTIGE_INDEX), this.indexCallBackHandler, this);
        NetManager.request(NetRequestConst.REQUEST_PRESTIGE_INDEX, {});
        this.container.y = this.getTitleButtomY();
        this._scrollContiner = new BaseDisplayObjectContainer();
        var bHeight = PlayerBottomUI.getInstance().showHeight;
        var rect = egret.Rectangle.create();
        var scorllY = 0;
        if (Api.switchVoApi.checkEmperorOpen()) {
            scorllY = 33;
            bHeight += scorllY;
            var pemBg = BaseBitmap.create("mainui_chatbg");
            pemBg.width = GameConfig.stageWidth;
            pemBg.height = scorllY;
            pemBg.x = GameConfig.stageWidth / 2 - pemBg.width / 2;
            this.addChildToContainer(pemBg);
            this._pemTxt = ComponentManager.getTextField("", 20);
            this._pemTxt.x = GameConfig.stageWidth / 2;
            this._pemTxt.y = 5;
            this.addChildToContainer(this._pemTxt);
            this._pemTxt.text = LanguageManager.getlocal("prestige_pemTxt", ["" + Api.prestigeVoApi.getPem()]);
            this._pemTxt.anchorOffsetX = this._pemTxt.width / 2;
        }
        rect.setTo(0, 0, GameConfig.stageWidth, (GameConfig.stageHeigth - this.container.y - 5 - bHeight));
        // prestige_pemTxt
        var scrollView = ComponentManager.getScrollView(this._scrollContiner, rect);
        scrollView.y = scorllY;
        this.addChildToContainer(scrollView);
        scrollView.horizontalScrollPolicy = "off";
        this._scrollView = scrollView;
        var pid = Api.prestigeVoApi.getPid();
        if (pid > 20) {
            this._darkBg = BaseBitmap.create("prestige_bg2");
        }
        else {
            this._darkBg = BaseBitmap.create("prestige_bg3");
        }
        this._preLineNode = new BaseDisplayObjectContainer();
        this._preDomNode = new BaseDisplayObjectContainer();
        this._preNameNode = new BaseDisplayObjectContainer();
        this._scrollContiner.addChild(this._darkBg);
        this._scrollContiner.addChild(this._preLineNode);
        this._scrollContiner.addChild(this._preDomNode);
        this._scrollContiner.addChild(this._preNameNode);
        scrollView.bounces = false;
        var btnX = 0;
        var btnY = 5;
        var kingBtn = ComponentManager.getButton("prestige_stage1Btn", "", this.kingBtnHandler, this, [1]);
        kingBtn.x = btnX;
        this._kingBtn = kingBtn;
        kingBtn.visible = false;
        this.addChildToContainer(kingBtn);
        this._kingBtn2 = ComponentManager.getButton("prestige_stage2Btn", "", this.kingBtnHandler, this, [2]);
        this._kingBtn2.x = btnX;
        this._kingBtn2.visible = false;
        this.addChildToContainer(this._kingBtn2);
        var logBtn = ComponentManager.getButton("prestige_logBtn", "", this.logBtnHandler, this);
        this._logBtn = logBtn;
        logBtn.x = btnX;
        this.addChildToContainer(logBtn);
        var previewBtn = ComponentManager.getButton("prestige_previewBtn", "", this.previewBtnHandler, this);
        this._previewBtn = previewBtn;
        previewBtn.x = btnX;
        this.addChildToContainer(previewBtn);
        this.refreshKingBtn();
        var bottomBg = BaseBitmap.create("prestige_bottombg");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.x = 0;
        bottomBg.y = scrollView.y + scrollView.height - bottomBg.height;
        bottomBg.touchEnabled = true;
        this.addChildToContainer(bottomBg);
        this._bottomBg = bottomBg;
        this._attrAddTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._attrAddTxt.x = bottomBg.x + 10;
        this._attrAddTxt.y = bottomBg.y + +10;
        this.addChildToContainer(this._attrAddTxt);
        this._proTxtNode = new BaseDisplayObjectContainer();
        this._proTxtNode.x = bottomBg.x;
        this._proTxtNode.y = bottomBg.y;
        this.addChildToContainer(this._proTxtNode);
        this._empriorNode = new BaseDisplayObjectContainer();
        this._empriorNode.x = bottomBg.x;
        this._empriorNode.y = bottomBg.y;
        this.addChildToContainer(this._empriorNode);
        var prestige_chair = BaseBitmap.create("prestige_chair");
        prestige_chair.width = 110;
        prestige_chair.height = 110;
        prestige_chair.x = 10;
        prestige_chair.y = bottomBg.height / 2 - prestige_chair.height / 2;
        this._empriorNode.addChild(prestige_chair);
        var chairTxt = ComponentManager.getTextField(LanguageManager.getlocal("restige_qualification"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        chairTxt.x = prestige_chair.x + prestige_chair.width / 2 - chairTxt.width / 2;
        chairTxt.y = prestige_chair.y + prestige_chair.height - 20;
        this._empriorNode.addChild(chairTxt);
        for (var index = 1; index <= 4; index++) {
            var btnPath = "prestige_prerogative" + index;
            var prerogativIcon = ComponentManager.getButton(btnPath, "", this.empriorHandler, this, [index]);
            //  BaseBitmap.create(btnPath);
            prerogativIcon.x = 35 + 90 * index;
            prerogativIcon.y = prestige_chair.y + prestige_chair.height - prerogativIcon.height;
            this._empriorNode.addChild(prerogativIcon);
            prerogativIcon.addTouchTap(this.empriorHandler, this, [index]);
        }
        this._rewardDescTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._rewardDescTxt.x = 150;
        this._rewardDescTxt.multiline = true;
        this._rewardDescTxt.lineSpacing = 15;
        this._rewardDescTxt.y = bottomBg.height / 2 - 10;
        this._proTxtNode.addChild(this._rewardDescTxt);
        for (var index = 0; index < 4; index++) {
            var proTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            proTxt.x = 0;
            proTxt.y = 10 + 25 * index;
            this._proTxtNode.addChild(proTxt);
            this._addProTxtList.push(proTxt);
        }
        this._lightBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "prestige_btnTxt", this.lightHandler, this);
        this._lightBtn.x = bottomBg.x + bottomBg.width - this._lightBtn.width - 10;
        this._lightBtn.y = bottomBg.y + bottomBg.height / 2 - this._lightBtn.height / 2 + 15;
        this.addChildToContainer(this._lightBtn);
        this._curNeedPemTxt = ComponentManager.getTextField("hahahaha", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        // this._curNeedPemTxt.x = this._lightBtn.x;
        this._curNeedPemTxt.anchorOffsetX = this._curNeedPemTxt.width;
        this._curNeedPemTxt.x = bottomBg.x + bottomBg.width - 10;
        this._curNeedPemTxt.y = bottomBg.y + 10;
        this.addChildToContainer(this._curNeedPemTxt);
        var curNameBg = BaseBitmap.create("prestige_titlebg");
        curNameBg.x = bottomBg.x + 2;
        curNameBg.y = bottomBg.y - curNameBg.height;
        this._curNameBg = curNameBg;
        this.addChildToContainer(curNameBg);
        this._curNameTxt = ComponentManager.getTextField("1325", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_YELLOW);
        this._curNameTxt.x = curNameBg.x + curNameBg.width / 2;
        this._curNameTxt.y = curNameBg.y + curNameBg.height / 2;
        this.addChildToContainer(this._curNameTxt);
        this._prestige_advNode = new BaseDisplayObjectContainer();
        this._prestige_advNode.x = GameConfig.stageWidth / 2;
        this._prestige_advNode.y = scrollView.y;
        this._prestige_advNode.visible = false;
        this.addChildToContainer(this._prestige_advNode);
        var prestige_advbg = BaseBitmap.create("prestige_advbg");
        prestige_advbg.x = -prestige_advbg.width / 2;
        this._prestige_advNode.addChild(prestige_advbg);
        this._advBitFnt = ComponentManager.getBitmapText("", "prestige_fnt2");
        this._advBitFnt.x = prestige_advbg.x + prestige_advbg.width / 2;
        this._advBitFnt.anchorOffsetX = this._advBitFnt.width / 2;
        this._advBitFnt.y = prestige_advbg.y + prestige_advbg.height / 2 - 10;
        this._prestige_advNode.addChild(this._advBitFnt);
        this._diffNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._diffNode);
        if (Api.switchVoApi.checkEmperorOpen() && this._diffDay) {
            var timgbg = BaseBitmap.create("prestige_tipbg");
            timgbg.x = GameConfig.stageWidth / 2 - timgbg.width / 2;
            timgbg.y = 35;
            timgbg.height = 70;
            timgbg.name = "timgbg";
            this._diffNode.addChild(timgbg);
            var txt1 = ComponentManager.getTextField("", 20);
            txt1.y = timgbg.y + 15;
            txt1.x = timgbg.x + timgbg.width / 2;
            this._diffNode.addChild(txt1);
            var txt2 = ComponentManager.getTextField("", 20);
            txt2.x = timgbg.x + timgbg.width / 2;
            txt2.y = txt1.y + 26;
            this._diffNode.addChild(txt2);
            txt1.name = "txt1";
            txt2.name = "txt2";
        }
        this.refreshEmpTime();
        this.makeDomstages();
    };
    PrestigeView.prototype.refreshEmpTime = function () {
        if (Api.switchVoApi.checkEmperorOpen() && this._diffDay) {
            var txt1 = this._diffNode.getChildByName("txt1");
            var txt2 = this._diffNode.getChildByName("txt2");
            var timgbg = this._diffNode.getChildByName("timgbg");
            var tarColor2 = TextFieldConst.COLOR_WARN_RED3;
            var tarColor3 = TextFieldConst.COLOR_WARN_RED3;
            if (this._diffDay >= 30) {
                tarColor2 = TextFieldConst.COLOR_WARN_GREEN;
            }
            if (this._canNum >= 8) {
                tarColor3 = TextFieldConst.COLOR_WARN_GREEN;
            }
            txt1.textColor = tarColor2;
            txt2.textColor = tarColor3;
            var isShowTxt2 = false;
            var emVersion = Api.emperorwarVoApi.version;
            if (emVersion) {
                var et = Api.emperorwarVoApi.getet();
                var type = Api.emperorwarVoApi.type;
                //未开启
                if (emVersion > GameData.serverTime) {
                    var _time = Api.emperorwarVoApi.getCountDownTime();
                    txt1.text = LanguageManager.getlocal("prestige_topTipTxt3", [App.DateUtil.getFormatBySecond(_time)]);
                }
                else if (et >= GameData.serverTime && emVersion <= GameData.serverTime) {
                    //进行中
                    txt1.text = LanguageManager.getlocal("prestige_topTipTxt4");
                }
                else if (et < GameData.serverTime) {
                    //已结束
                    var daySecs = 60 * 60 * 24;
                    var nextStartSt = emVersion + daySecs * 14;
                    var diffSecs = nextStartSt - GameData.serverTime;
                    if (diffSecs <= daySecs) {
                        txt1.text = LanguageManager.getlocal("prestige_topTipTxt3", [App.DateUtil.getFormatBySecond(diffSecs)]);
                    }
                    else {
                        var diffDNum = Math.floor(diffSecs / daySecs);
                        txt1.text = LanguageManager.getlocal("prestige_topTipTxt5", ["" + diffDNum]);
                    }
                    // txt1.text = LanguageManager.getlocal("prestige_topTipTxt5");
                }
            }
            else {
                txt1.text = LanguageManager.getlocal("prestige_topTipTxt1", ["" + this._diffDay]);
                isShowTxt2 = true;
            }
            txt1.anchorOffsetX = txt1.width / 2;
            if (isShowTxt2) {
                txt2.text = LanguageManager.getlocal("prestige_topTipTxt2", ["" + this._canNum]);
                txt2.anchorOffsetX = txt2.width / 2;
                timgbg.height = 70;
            }
            else {
                txt2.text = "";
                timgbg.height = 50;
            }
        }
    };
    PrestigeView.prototype.tick = function () {
        this.refreshEmpTime();
        return true;
    };
    PrestigeView.prototype.empriorHandler = function (param) {
        ViewController.getInstance().openView(ViewConst.POPUP.PRESTIGEITEMPOPUPVIEW, { itemId: param });
    };
    PrestigeView.prototype.refreshKingBtn = function (isAfterUp) {
        var btnY = 5;
        var pid = Api.prestigeVoApi.getPid();
        if (pid >= 20) {
            if (isAfterUp) {
                if (pid == 20) {
                    App.DisplayUtil.changeToGray(this._kingBtn);
                    App.DisplayUtil.changeToGray(this._kingBtn2);
                    this._kingBtn2.visible = true;
                    this._kingBtn.visible = false;
                }
                else {
                    this._kingBtn2.visible = false;
                    this._kingBtn.visible = true;
                }
                if (Api.prestigeVoApi.isBallLightUpEnable(this._curSelectedId)) {
                    App.CommonUtil.addIconToBDOC(this._kingBtn2);
                }
                else {
                    App.CommonUtil.removeIconFromBDOC(this._kingBtn2);
                }
            }
            else {
                this._kingBtn.visible = true;
            }
            btnY += this._kingBtn.height + 10;
        }
        this._logBtn.y = btnY;
        btnY += this._logBtn.height + 10;
        this._previewBtn.y = btnY;
    };
    PrestigeView.prototype.makeDomstages = function (isStage1) {
        if (isStage1 === void 0) { isStage1 = false; }
        this._scrollView.setScrollPosition(0, 0, false);
        if (!this._curSelBox) {
            this._curSelBox = BaseBitmap.create("prestige_status_selected2");
            this._curSelBox.visible = false;
        }
        this._preDomNode.removeChildren();
        this._preLineNode.removeChildren();
        this._preNameNode.removeChildren();
        this._brightLines = [];
        this._lastPos = null;
        var preCfg = Config.PrestigeCfg.getPrestigeCfg();
        var specialIdx = 1;
        var pid = Api.prestigeVoApi.getPid();
        var maxNum = 20;
        if (pid < maxNum || isStage1) {
            this._darkBg.texture = ResourceManager.getRes("prestige_bg2");
            this._prestige_advNode.visible = false;
            this._diffNode.visible = true;
            this.titleTF.text = LanguageManager.getlocal("prestigeViewTitle1");
            this.titleTF.x = this.width / 2 - this.titleTF.width / 2;
        }
        else {
            this.titleTF.text = LanguageManager.getlocal("prestigeViewTitle2");
            this.titleTF.x = this.width / 2 - this.titleTF.width / 2;
            this._diffNode.visible = false;
            this._darkBg.texture = ResourceManager.getRes("prestige_bg3");
            var baseNum = Math.ceil((pid + 1) / 20) - 1;
            if (pid == Config.PrestigeCfg.getMax()) {
                baseNum -= 1;
            }
            var numStr = App.StringUtil.changeIntToCharText(baseNum);
            this._advBitFnt.text = LanguageManager.getlocal("prestige_adv", [numStr]);
            this._advBitFnt.anchorOffsetX = this._advBitFnt.width / 2;
            this._advBitFnt.anchorOffsetY = this._advBitFnt.height / 2;
            this._prestige_advNode.visible = true;
        }
        var startIdx = Math.floor(pid / maxNum) * maxNum;
        if (pid == Config.PrestigeCfg.getMax()) {
            startIdx = (Math.floor(pid / maxNum) - 1) * maxNum;
        }
        if (isStage1) {
            startIdx = 0;
        }
        for (var index = startIdx; index < startIdx + maxNum; index++) {
            var key = index; //allKeys[index]
            var cfg = preCfg[key];
            if (cfg && cfg.position) {
                var pos = cfg.position;
                var statusImg = "prestige_status1";
                var toGray = false;
                var touchData = { index: index, data: null, specialIdx: undefined };
                if (cfg.isSpecial) {
                    statusImg = "prestige_status4";
                    if (cfg.getReward) {
                        var rformat = GameData.formatRewardItem(cfg.getReward)[0];
                        touchData.data = rformat;
                        statusImg = "prestige_special" + specialIdx;
                        touchData.specialIdx = specialIdx;
                        specialIdx += 1;
                        if (pid <= index) {
                            toGray = true;
                        }
                    }
                    else {
                        if (cfg.canEmperor == 1) {
                            statusImg = "prestige_special" + specialIdx;
                            touchData.specialIdx = specialIdx;
                            specialIdx += 1;
                            if (pid <= index) {
                                toGray = true;
                            }
                        }
                        else {
                            if (pid == index && cfg.prestige <= Api.prestigeVoApi.getPValue()) {
                                statusImg = "prestige_status5";
                            }
                            else if (pid > index) {
                                statusImg = "prestige_status6";
                            }
                        }
                    }
                }
                else {
                    if (pid == index && cfg.prestige <= Api.prestigeVoApi.getPValue()) {
                        statusImg = "prestige_status2";
                    }
                    else if (pid > index) {
                        statusImg = "prestige_status3";
                    }
                }
                var img = BaseBitmap.create(statusImg);
                if (toGray) {
                    App.DisplayUtil.changeToGray(img);
                }
                // img.x = pos[0] - img.width/2;
                // img.y = pos[1] - img.height/2;
                img.x = pos[0];
                img.y = pos[1];
                this._preDomNode.addChild(img);
                img.name = "domImg" + index;
                if (cfg.isSpecial && (cfg.getReward || cfg.canEmperor == 1)) {
                    var namebg = BaseBitmap.create("wifestatus_namebg");
                    namebg.x = img.x + img.width / 2 - namebg.width / 2;
                    namebg.y = img.y + img.height - 20;
                    this._preNameNode.addChild(namebg);
                    var name_1 = "";
                    if (cfg.canEmperor == 1) {
                        name_1 = LanguageManager.getlocal("prestige_canEmpireTxt");
                    }
                    else {
                        name_1 = touchData.data.name;
                    }
                    var nameTxt = ComponentManager.getTextField(name_1, 18, TextFieldConst.COLOR_QUALITY_YELLOW);
                    nameTxt.x = namebg.x + namebg.width / 2 - nameTxt.width / 2;
                    nameTxt.y = namebg.y + namebg.height / 2 - nameTxt.height / 2;
                    this._preNameNode.addChild(nameTxt);
                }
                img.addTouchTap(this.domImgHandler, this, [touchData]);
                if (this._lastPos) {
                    var shp = new egret.Shape();
                    shp.graphics.lineStyle(5, 0x000000);
                    shp.graphics.moveTo(this._lastPos[0], this._lastPos[1]);
                    shp.graphics.lineTo(pos[0] + img.width / 2, pos[1] + img.height / 2);
                    shp.graphics.endFill();
                    this._preLineNode.addChild(shp);
                    var shp2 = new egret.Shape();
                    shp2.graphics.lineStyle(3, 0xffff00);
                    shp2.graphics.moveTo(this._lastPos[0], this._lastPos[1]);
                    shp2.graphics.lineTo(pos[0] + img.width / 2, pos[1] + img.height / 2);
                    shp2.graphics.endFill();
                    shp2.visible = false;
                    this._preLineNode.addChild(shp2);
                    this._brightLines.push(shp2);
                    if (Api.prestigeVoApi.getPid() > index) {
                        shp2.visible = true;
                    }
                }
                if (isStage1) {
                    if (index == 0) {
                        this.domImgHandler(img, touchData);
                    }
                }
                else {
                    if (pid == Config.PrestigeCfg.getMax()) {
                        this.domImgHandler(img, touchData);
                        this.adaptViewPos();
                    }
                    else {
                        if (pid == Number(cfg.id) - 1) {
                            this.domImgHandler(img, touchData);
                            this.adaptViewPos();
                        }
                    }
                }
                this._lastPos = [pos[0] + img.width / 2, pos[1] + img.height / 2];
            }
        }
        this._preDomNode.addChild(this._curSelBox);
        /**
         * 移动到当前选中 在可是区域内
         */
    };
    PrestigeView.prototype.adaptViewPos = function () {
        var cfg = Config.PrestigeCfg.getPrestigeCfgById(Api.prestigeVoApi.getPid());
        if (!cfg) {
            return;
        }
        var cfgPos = cfg.position;
        var toTop = this._scrollView.scrollTop;
        var curPosY = cfgPos[1] - toTop;
        if (curPosY < 0) {
            this._scrollView.setScrollTop(0, 800);
        }
        else {
            var diffY = curPosY - this._bottomBg.y + this.container.y;
            var bt = this._scrollView.getMaxScrollTop();
            if (diffY > 0 && toTop != bt) {
                this._scrollView.setScrollTop(bt, 800);
            }
        }
    };
    PrestigeView.prototype.domImgHandler = function (obj, param) {
        var index = param.index;
        this._curSelectedId = index;
        if (index <= Api.prestigeVoApi.getPid()) {
            var briLine = this._brightLines[index % 20 - 2];
            if (briLine) {
                briLine.visible = true;
            }
        }
        var cfg = Config.PrestigeCfg.getPrestigeCfgById(index);
        if (cfg.isSpecial) {
            if (cfg.getReward || cfg.canEmperor) {
                var specialIdx = param.specialIdx;
                if (specialIdx && specialIdx == 1) {
                    this._curSelBox.texture = ResourceManager.getRes("prestige_special1_selected");
                }
                else {
                    this._curSelBox.texture = ResourceManager.getRes("prestige_special2_selected");
                }
            }
            else {
                this._curSelBox.texture = ResourceManager.getRes("prestige_status_selected1");
            }
        }
        else {
            this._curSelBox.texture = ResourceManager.getRes("prestige_status_selected2");
        }
        this._curSelBox.x = cfg.position[0];
        this._curSelBox.y = cfg.position[1];
        this._curSelBox.visible = true;
        this.refreshCurStageInfo();
    };
    /**
     * 刷新当前选中节点的信息
     */
    PrestigeView.prototype.refreshCurStageInfo = function () {
        var cfg = Config.PrestigeCfg.getPrestigeCfgById(this._curSelectedId);
        if (Api.prestigeVoApi.isBallLightUpEnable(this._curSelectedId)) {
            App.CommonUtil.addIconToBDOC(this._lightBtn);
            App.CommonUtil.addIconToBDOC(this._kingBtn2);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._lightBtn);
            App.CommonUtil.removeIconFromBDOC(this._kingBtn2);
        }
        if (cfg) {
            if (this._rewardIcon) {
                this.removeChildFromContainer(this._rewardIcon);
                this._rewardIcon = null;
            }
            if (this._clothesContainer) {
                this.removeChildFromContainer(this._clothesContainer);
                this._clothesContainer = null;
            }
            this._empriorNode.visible = false;
            if (cfg.getReward) {
                this._curNameBg.visible = true;
                this._rewardDescTxt.text = LanguageManager.getlocal("prestigeLevelDesc" + cfg.getReward, ["" + cfg.prestige]);
                this._rewardDescTxt.x = 150;
                this._rewardDescTxt.y = this._bottomBg.height / 2 - this._rewardDescTxt.height / 2;
                this._lightBtn.setText("taskCollect");
                this._proTxtNode.x = 20;
                var rewardStr = cfg.getReward;
                var rewardIcon = GameData.getRewardItemIcons(rewardStr, true)[0];
                rewardIcon.setScale(0.8);
                rewardIcon.x = this._bottomBg.x + 70;
                rewardIcon.y = this._bottomBg.y + 15;
                this._rewardIcon = rewardIcon;
                this.addChildToContainer(rewardIcon);
                var rname = GameData.formatRewardItem(rewardStr)[0].name;
                this._curNameTxt.text = rname;
                this._attrAddTxt.text = LanguageManager.getlocal("prestige_attrAdd2");
                var rewardClothId = rewardStr.split("_")[1];
                if (rewardClothId == "3801") {
                    this.showClothesPreview(rewardClothId);
                }
            }
            else if (cfg.canEmperor == 1) {
                this._curNameBg.visible = true;
                this._proTxtNode.x = 20;
                this._attrAddTxt.text = "";
                this._empriorNode.visible = true;
                this._rewardDescTxt.text = LanguageManager.getlocal("prestigeLevelDesc4", ["" + cfg.prestige]);
                this._rewardDescTxt.y = 10;
                this._rewardDescTxt.x = 185;
                this._curNameTxt.text = LanguageManager.getlocal("prestige_canEmpireTxt");
            }
            else {
                this._curNameBg.visible = false;
                this._rewardDescTxt.text = "";
                this._lightBtn.setText("prestige_btnTxt");
                this._attrAddTxt.text = LanguageManager.getlocal("prestige_attrAdd1");
                this._proTxtNode.x = 115;
                this._curNameTxt.text = "";
                // this._curNameTxt.text = LanguageManager.getlocal("prestige_DragonBall",["" + cfg.id]);
            }
            var addType = cfg.addType;
            if (!addType)
                addType = [];
            for (var index = 0; index < this._addProTxtList.length; index++) {
                var attrType = addType[index];
                if (attrType) {
                    this._addProTxtList[index].text = LanguageManager.getlocal("servantInfo_speciality" + attrType) + "+" + cfg.effect;
                    this._addProTxtList[index].visible = true;
                }
                else {
                    this._addProTxtList[index].visible = false;
                }
            }
            this._curNameTxt.anchorOffsetX = this._curNameTxt.width / 2;
            this._curNameTxt.anchorOffsetY = this._curNameTxt.height / 2;
            var txtStr = Api.prestigeVoApi.getPValue() + "/" + cfg.prestige;
            if (Api.prestigeVoApi.getPValue() >= cfg.prestige) {
                this._lightBtn.setEnable(true);
                if (this._curSelectedId >= Api.prestigeVoApi.getPid() + 1) {
                    this._lightBtn.setEnable(false);
                }
                else {
                    this._lightBtn.setEnable(true);
                }
                this._curNeedPemTxt.text = LanguageManager.getlocal("prestige_pemNeed", [txtStr]);
            }
            else {
                this._lightBtn.setEnable(false);
                this._curNeedPemTxt.text = LanguageManager.getlocal("prestige_pemNeed2", [txtStr]);
            }
            this._curNeedPemTxt.anchorOffsetX = this._curNeedPemTxt.width;
            this._lightFlag = this.getLightFlag();
            var visibleV = Number(cfg.id) <= Api.prestigeVoApi.getPid();
            this._lightFlag.visible = visibleV;
            this._lightBtn.visible = !visibleV;
        }
    };
    PrestigeView.prototype.showClothesPreview = function (clothId) {
        //衣装预览
        var clothesContainer = new BaseDisplayObjectContainer();
        clothesContainer.setPosition(this._bottomBg.x + this._bottomBg.width / 2 - 20, this._bottomBg.y + 10);
        this.addChildToContainer(clothesContainer);
        this._clothesContainer = clothesContainer;
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        // this._effect.setScale(2);
        var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffect.setPosition(0, 0);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this._clothesContainer.addChild(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        skinTxt.setPosition(skinTxtEffectBM.x + 105, skinTxtEffectBM.y + 75);
        this._clothesContainer.addChild(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        skinTxteffect.setPosition(skinTxtEffectBM.x + 105, skinTxtEffectBM.y + 75);
        this._clothesContainer.addChild(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        //透明点击区域
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 160;
        touchPos.height = 80;
        touchPos.setPosition(20, 20);
        this._clothesContainer.addChild(touchPos);
        touchPos.addTouchTap(function () {
            var topMsg = LanguageManager.getlocal("prestigeTopMsg");
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONTITLEREWARDPOPUPVIEW, { titleIds: [clothId], bgType: 3, topMsg: topMsg });
        }, this);
    };
    PrestigeView.prototype.getLightFlag = function () {
        var cfg = Config.PrestigeCfg.getPrestigeCfgById(this._curSelectedId);
        var resPath = "prestige_light_flag";
        if (cfg.canEmperor || cfg.getReward) {
            resPath = "achievement_state3";
        }
        if (!this._lightFlag) {
            this._lightFlag = BaseBitmap.create(resPath);
            // this._lightFlag.x = this._bottomBg.x + this._bottomBg.width/2+50;
            // this._lightFlag.y = this._bottomBg.y + this._bottomBg.height/2 ;
            this._lightFlag.x = this._lightBtn.x + this._lightBtn.width / 2;
            this._lightFlag.y = this._lightBtn.y + this._lightBtn.height / 2;
            this.addChildToContainer(this._lightFlag);
        }
        else {
            this._lightFlag.texture = ResourceManager.getRes(resPath);
        }
        this._lightFlag.anchorOffsetX = this._lightFlag.width / 2;
        this._lightFlag.anchorOffsetY = this._lightFlag.height / 2;
        return this._lightFlag;
    };
    PrestigeView.prototype.indexCallBackHandler = function (event) {
        var ret = event.data.data.ret;
        if (ret == true || ret == 0) {
            if (Api.prestigeVoApi.isFirst()) {
                Api.rookieVoApi.curGuideKey = "prestige";
                Api.rookieVoApi.insertWaitingGuide({ "idx": "prestige_1" }, true);
                Api.rookieVoApi.checkWaitingGuide();
            }
        }
    };
    PrestigeView.prototype.upCallBackHandler = function (event) {
        var ret = event.data.data.ret;
        if (ret != 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("prestige_lightTip3"));
            return;
        }
        this.refreshKingBtn(true);
        PlayerBottomUI.getInstance().checkRedPoints();
        var lastcfg = Config.PrestigeCfg.getPrestigeCfgById(this._curSelectedId);
        var sussNode = new BaseDisplayObjectContainer();
        sussNode.x = GameConfig.stageWidth / 2;
        var tarY = GameConfig.stageHeigth / 2 - this.container.y / 2 - 100;
        sussNode.y = tarY;
        var succBg = BaseBitmap.create("prestige_displaybg");
        succBg.anchorOffsetX = succBg.width / 2;
        succBg.anchorOffsetY = succBg.height / 2;
        sussNode.addChild(succBg);
        succBg.setScale(0.7);
        var successImg = BaseBitmap.create("prestige_light_word1");
        successImg.anchorOffsetX = successImg.width / 2;
        successImg.anchorOffsetY = successImg.height / 2;
        // successImg.x = GameConfig.stageWidth/2;
        // successImg.y = succBg.y ;
        sussNode.addChild(successImg);
        sussNode.setScale(0.5);
        egret.Tween.get(sussNode, { loop: false }).to({ scaleX: 1.0, scaleY: 1.0 }, 200).wait(500).call(function () {
            LayerManager.msgLayer.removeChild(sussNode);
            sussNode = null;
        }, this);
        var addType = lastcfg.addType;
        var rewardStr = lastcfg.getReward;
        if (rewardStr && rewardStr != "") {
            var rewardArr = GameData.formatRewardItem(rewardStr);
            App.CommonUtil.playRewardFlyAction(rewardArr);
        }
        if (!addType)
            addType = [];
        var strList = [];
        for (var index = 0; index < addType.length; index++) {
            var attrType = addType[index];
            var str = LanguageManager.getlocal("servantInfo_speciality" + attrType) + "+" + lastcfg.effect;
            strList.push({ tipMessage: str });
        }
        App.CommonUtil.playRewardFlyAction(strList);
        LayerManager.msgLayer.addChild(sussNode);
        this._lightBtn.visible = false;
        this._lightFlag = this.getLightFlag();
        this._lightFlag.visible = false;
        this._lightFlag.setScale(1.5);
        this._lightFlag.visible = true;
        egret.Tween.get(this._lightFlag, { loop: false }).to({ scaleX: 1.0, scaleY: 1.0 }, 200);
        this.refreshDomAfterLight();
        // egret.Tween.get(this._lightFlag,{loop:false}).to({scaleX:1.0,scaleY:1.0},200).wait(300).call(this.refreshDomAfterLight,this);
    };
    PrestigeView.prototype.refreshDomAfterLight = function () {
        var _this = this;
        /**
         * 刷新上次节点的状态
         */
        var lastcfg = Config.PrestigeCfg.getPrestigeCfgById(this._curSelectedId);
        var lastNameStr = "domImg" + this._curSelectedId;
        var lastImg = this._preDomNode.getChildByName(lastNameStr);
        var dbfilePath = "";
        var dbScale = 1.0;
        var toNormal = false;
        var changeTex = "";
        if (lastcfg.isSpecial) {
            if (lastcfg.getReward || lastcfg.canEmperor == 1) {
                toNormal = true;
                // dbfilePath = "djd_dl";
                dbfilePath = "djd_dl_hou";
            }
            else {
                changeTex = "prestige_status6";
                dbfilePath = "xjd_dl";
                dbScale = 1.5;
            }
            // if(lastcfg.canEmperor == 1)
            // {
            // 	dbfilePath = "gnkq_tx";
            // }
        }
        else {
            dbfilePath = "xjd_dl";
            changeTex = "prestige_status3";
        }
        // djd_dl_qian
        // djd_dl_hou
        // dbfilePath = "djd_dl_qian";
        var dgbone = App.DragonBonesUtil.getLoadDragonBones(dbfilePath, 1); // xjd_dl // "djd_dl_tex",  "gnkq_tx_tex",  "xjd_dl_tex",
        dgbone.setScale(dbScale);
        var dgbone2 = undefined;
        if (dbfilePath == "djd_dl_hou") {
            dgbone2 = App.DragonBonesUtil.getLoadDragonBones("djd_dl_qian", 1);
            dgbone2.setScale(dbScale);
        }
        if (lastcfg.canEmperor == 1) {
            var openDg_1 = App.DragonBonesUtil.getLoadDragonBones("gnkq_tx", 1); // xjd_dl // "djd_dl_tex",  "gnkq_tx_tex",  "xjd_dl_tex",
            openDg_1.x = GameConfig.stageWidth / 2;
            openDg_1.y = GameConfig.stageHeigth / 2;
            this.addChildToContainer(openDg_1);
            var tarX = 50;
            var tarY = 50;
            egret.Tween.get(openDg_1, { loop: false }).wait(1000).to({ x: tarX, y: tarY, scaleX: 0.5, scaleY: 0.5 }, 600).call(function () {
                App.DisplayUtil.changeToNormal(_this._kingBtn);
                App.DisplayUtil.changeToNormal(_this._kingBtn2);
                openDg_1.dispose();
                // this.refreshNextDomImg();
            }, this);
        }
        {
            dgbone.x = lastcfg.position[0] + lastImg.width / 2;
            dgbone.y = lastcfg.position[1] + lastImg.height / 2;
            this._preDomNode.addChild(dgbone);
            var lastMidimg_1 = undefined;
            if (dgbone2) {
                dgbone2.x = dgbone.x - 5;
                dgbone2.y = dgbone.y + 5;
                lastMidimg_1 = BaseBitmap.create(lastImg.texture);
                lastMidimg_1.x = lastImg.x;
                lastMidimg_1.y = lastImg.y;
                this._preDomNode.addChild(lastMidimg_1);
                this._preDomNode.addChild(dgbone2);
            }
            egret.Tween.get(dgbone, { loop: false }).wait(1000).call(function () {
                if (toNormal) {
                    App.DisplayUtil.changeToNormal(lastImg);
                }
                if (changeTex != "") {
                    lastImg.texture = ResourceManager.getRes(changeTex);
                }
            }, this).wait(100).call(function () {
                dgbone.dispose();
                if (dgbone2) {
                    dgbone2.dispose();
                    lastMidimg_1.dispose();
                }
                _this.refreshNextDomImg();
            }, this);
        }
    };
    PrestigeView.prototype.refreshNextDomImg = function () {
        var newId = Api.prestigeVoApi.getPid();
        var curImg = this._preDomNode.getChildByName("domImg" + newId);
        if (curImg) {
            var newcfg = Config.PrestigeCfg.getPrestigeCfgById(newId);
            if (newcfg.isSpecial) {
                if (newcfg.getReward || newcfg.canEmperor == 1) {
                    // App.DisplayUtil.changeToNormal(curImg);
                }
                else {
                    curImg.texture = ResourceManager.getRes("prestige_status5");
                }
            }
            else {
                curImg.texture = ResourceManager.getRes("prestige_status2");
            }
            this.domImgHandler(this, { index: newId });
            this.adaptViewPos();
        }
        else {
            if (newId != 20) {
                this.makeDomstages();
            }
            else {
                var briLine = this._brightLines[18];
                if (briLine) {
                    briLine.visible = true;
                }
            }
        }
    };
    PrestigeView.prototype.lightHandler = function () {
        var pid = Api.prestigeVoApi.getPid();
        if (pid > this._curSelectedId) {
            App.CommonUtil.showTip(LanguageManager.getlocal("prestige_lightTip2"));
            return;
        }
        var cfg = Config.PrestigeCfg.getPrestigeCfgById(pid);
        if (Api.prestigeVoApi.getPValue() < cfg.prestige) {
            App.CommonUtil.showTip(LanguageManager.getlocal("prestige_lightTip"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_PRESTIGE_UP, { upid: cfg.id });
    };
    PrestigeView.prototype.kingBtnHandler = function (param) {
        if (param == 1) {
            this._kingBtn.visible = false;
            this._kingBtn2.visible = true;
            this.makeDomstages(true);
        }
        else {
            this._kingBtn2.visible = false;
            this._kingBtn.visible = true;
            this.makeDomstages();
        }
        /**
         * 进入第二阶段，
         */
    };
    PrestigeView.prototype.logBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.PRESTIGELOFPOPUPVIEW, {});
    };
    PrestigeView.prototype.previewBtnHandler = function () {
        // ViewController.getInstance().openView(ViewConst.POPUP.PRESTIGEINFOPOPUPVIEW,{});
        ViewController.getInstance().openView(ViewConst.BASE.PRESTIGEDISPLAYVIEW, {});
    };
    PrestigeView.prototype.prerogativeHandle = function (i) {
        ViewController.getInstance().openView(ViewConst.POPUP.PRESTIGEITEMPOPUPVIEW, { itemId: i });
    };
    PrestigeView.prototype.closeHandler = function () {
        // if (Api.practiceVoApi.isPracticeOPen()  ){ 
        PlayerBottomUI.getInstance().hide(true);
        // }
        _super.prototype.hide.call(this);
    };
    PrestigeView.prototype.receiveData = function (data) {
        if (data.ret && data.data.cmd == NetRequestConst.REQUEST_EMPEROR_GETACTIVE) {
            var activeinfo = data.data.data.activeinfo;
            if (activeinfo) {
                Api.emperorwarVoApi.setActiveInfo(data.data.data);
                this._diffDay = activeinfo.diffday;
                this._canNum = activeinfo.cannum;
            }
        }
    };
    PrestigeView.prototype.getRequestData = function () {
        if (Api.switchVoApi.checkEmperorOpen()) {
            return { requestType: NetRequestConst.REQUEST_EMPEROR_GETACTIVE, requestData: {} };
        }
    };
    PrestigeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "prestige_fnt2", "prestige_advbg", "achievement_state3", "prestige_tipbg",
            "prestige_stage1Btn_down", "prestige_stage1Btn", "prestige_stage2Btn_down", "prestige_stage2Btn",
            "prestige_bg", "prestige_bg2", "prestige_bg3", "prestige_black_bg", "prestige_bottombg", "prestige_chair", "prestige_circle_bg",
            "prestige_circle", "prestige_cur", "prestige_flag1", "prestige_flag2", "prestige_info_bg",
            "prestige_light_flag", "prestige_light_word1", "prestige_light_word2", "prestige_light_word3", "prestige_light", "prestige_line1", "prestige_line2",
            "prestige_logBtn_down", "prestige_logBtn", "prestige_pillar_base", "prestige_pillar1", "prestige_pillar2", "prestige_prerogative1", "prestige_prerogative2", "prestige_prerogative3",
            "prestige_previewBtn_down", "prestige_previewBtn", "prestige_special1_selected", "prestige_special1", "prestige_special2_selected", "prestige_special2",
            "prestige_special3", "prestige_special4", "prestige_status_selected2", "prestige_status_selected1", "prestige_status_selected", "prestige_status1", "prestige_status2",
            "prestige_status3", "prestige_status4", "prestige_status5", "prestige_status6", "prestige_titlebg", "wifestatus_namebg", "prestige_prerogative4",
            "prestige_prerogative1_down", "prestige_prerogative2_down", "prestige_prerogative3_down", "prestige_displaybg", "prestige_prerogative4_down", "acwealthcarpview_servantskintxt"
        ]);
    };
    PrestigeView.prototype.getTitleStr = function () {
        if (Api.prestigeVoApi.getPid() > 20) {
            return "prestigeViewTitle1";
        }
        else {
            return "prestigeViewTitle2";
        }
    };
    PrestigeView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRESTIGE_INDEX), this.indexCallBackHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRESTIGE_UP), this.upCallBackHandler, this);
        ViewController.getInstance().hideView(ViewConst.POPUP.PRESTIGEITEMPOPUPVIEW);
        ViewController.getInstance().hideView(ViewConst.POPUP.ITEMINFOPOPUPVIEW);
        ViewController.getInstance().hideView(ViewConst.POPUP.PRESTIGEINFOPOPUPVIEW);
        ViewController.getInstance().hideView(ViewConst.POPUP.PRESTIGELOFPOPUPVIEW);
        ViewController.getInstance().hideView(ViewConst.BASE.PRESTIGEDISPLAYVIEW);
        ViewController.getInstance().hideView(ViewConst.POPUP.RULEINFOPOPUPVIEW);
        this._scrollContiner = null;
        this._pillar = null;
        this._curSelectedId = 0;
        this._curNameTxt = null;
        this._bottomBg = null;
        this._lightBtn = null;
        this._curNeedPemTxt = null;
        this._addProTxtList = [];
        this._proTxtNode = null;
        this._preLineNode = null;
        this._preDomNode = null;
        this._lastPos = undefined;
        this._lastPos = null;
        this._rewardIcon = null;
        this._lightFlag = null;
        this._darkBg = null;
        this._curSelBox = null;
        this._brightLines = [];
        this._kingBtn2 = null;
        this._headImg = null;
        this._diffDay = null;
        this._canNum = null;
        this._curNameBg = null;
        this._preNameNode = null;
        this._scrollView = null;
        this._logBtn = null;
        this._previewBtn = null;
        this._kingBtn = null;
        this._prestige_advNode = null;
        this._advBitFnt = null;
        this._empriorNode = null;
        this._diffNode = null;
        this._pemTxt = null;
        this._clothesContainer = null;
        _super.prototype.dispose.call(this);
    };
    return PrestigeView;
}(CommonView));
__reflect(PrestigeView.prototype, "PrestigeView");
//# sourceMappingURL=PrestigeView.js.map