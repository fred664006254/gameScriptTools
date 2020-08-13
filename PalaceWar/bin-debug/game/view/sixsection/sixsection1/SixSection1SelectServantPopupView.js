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
* 选择门客
* date 2020.5.12
* author ycg
* @name SixSection1SelectServantPopupView
*/
var SixSection1SelectServantPopupView = /** @class */ (function (_super) {
    __extends(SixSection1SelectServantPopupView, _super);
    function SixSection1SelectServantPopupView() {
        var _this = _super.call(this) || this;
        _this._seatCfg = null;
        _this._seatIndex = 0;
        _this._tabbarGroup = null;
        _this._tabViewData = {};
        _this._selServantList = [];
        _this._selBuffList = {};
        _this._servantList = [];
        _this._topBg = null;
        _this._servantUseNum = null;
        _this._gemIcon = null;
        _this._gemNum = null;
        _this._talentNum = null;
        _this._totalAttr = null;
        _this._buff1Num = null;
        _this._buff2Num = null;
        _this._buff3Num = null;
        _this._needGemCon = null;
        return _this;
    }
    SixSection1SelectServantPopupView.prototype.getTitleStr = function () {
        return "sixSection1SelectServantTitle";
    };
    SixSection1SelectServantPopupView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat("public_textbrownbg", "discussclose", "discussclose_down", "public_popupscrollitembg", "public_titlebg", "awservantstate1").concat(list);
    };
    // 重置背景的高度,popupview才用
    SixSection1SelectServantPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        if (this._tabViewData) {
            for (var tabidx in this._tabViewData) {
                var tabView = this._tabViewData[tabidx];
                tabView.setPosition(20, this._tabbarGroup.y + this._tabbarGroup.height);
            }
        }
    };
    SixSection1SelectServantPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_SELSERVANT_REFRESH, this.selServantRefresh, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_ATTACK, this.enterSelServantCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);
        this._seatCfg = this.param.data.data;
        this._seatIndex = this.param.data.index;
        App.LogUtil.log("initView " + this.param.data.fuid);
        var topBg = BaseBitmap.create("sixsection1_selservanttopbg");
        topBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topBg.width / 2, 5);
        this.addChildToContainer(topBg);
        this._topBg = topBg;
        var tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarNames(), this.getTabbarTextArrs(), this.clickTabbarHandler, this);
        tabbarGroup.setSpace(0);
        tabbarGroup.setPosition(topBg.x + 10, topBg.y + topBg.height + 5 - 16);
        this.addChildToContainer(tabbarGroup);
        this._tabbarGroup = tabbarGroup;
        this.changeTab();
        var enterBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sixSection1SelectServantEnterUse", this.enterBtnClick, this);
        enterBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 - enterBtn.width / 2, topBg.y + topBg.height + 400 + 50);
        this.addChildToContainer(enterBtn);
        //top
        var topNumBg = BaseBitmap.create("public_textbrownbg");
        topNumBg.setPosition(topBg.x + topBg.width / 2 - topNumBg.width / 2, topBg.y + 10);
        this.addChildToContainer(topNumBg);
        var servantUseNum = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantUseNum", ["" + 0, "" + 0]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        servantUseNum.setPosition(topBg.x + 30, topNumBg.y + 10);
        this.addChildToContainer(servantUseNum);
        this._servantUseNum = servantUseNum;
        var gemIcon = BaseLoadBitmap.create("itemicon1");
        gemIcon.width = 100;
        gemIcon.height = 100;
        this.addChildToContainer(gemIcon);
        gemIcon.setScale(0.5);
        this._gemIcon = gemIcon;
        var gemNum = ComponentManager.getTextField("" + Api.playerVoApi.getPlayerGem(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        gemNum.setPosition(topBg.x + topBg.width - 20 - gemNum.width, servantUseNum.y);
        this.addChildToContainer(gemNum);
        gemIcon.setPosition(gemNum.x - gemIcon.width * gemIcon.scaleX, topBg.y + 5);
        this._gemNum = gemNum;
        //attr
        var talent = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldSeatLookEnemyTalent", ["" + 0]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        talent.setPosition(topBg.x + 30, topNumBg.y + topNumBg.height + 10);
        this.addChildToContainer(talent);
        this._talentNum = talent;
        var totalAttr = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldSeatLookEnemyTotalAttr", ["" + 0]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        totalAttr.setPosition(topBg.x + topBg.width - 30 - totalAttr.width, talent.y);
        this.addChildToContainer(totalAttr);
        this._totalAttr = totalAttr;
        //加成 攻击
        var buffAtk = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantAtkNum", ["0%"]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        buffAtk.setPosition(topBg.x + 30, talent.y + talent.height + 5);
        this.addChildToContainer(buffAtk);
        this._buff1Num = buffAtk;
        var buffCri = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantCriNum", ["0%"]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        buffCri.anchorOffsetX = buffCri.width / 2;
        buffCri.setPosition(topBg.x + topBg.width / 2, buffAtk.y);
        this.addChildToContainer(buffCri);
        this._buff2Num = buffCri;
        var buffBlood = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantBloodNum", ["0%"]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        buffBlood.setPosition(topBg.x + topBg.width - 30 - buffBlood.width, buffAtk.y);
        this.addChildToContainer(buffBlood);
        this._buff3Num = buffBlood;
        for (var i = 0; i < 5; i++) {
            var servant = this.getServantIconContainer(true, i);
            servant.setPosition(topBg.x + 17 + (servant.width + 8) * i, topBg.y + topBg.height / 2 + 5);
            this.addChildToContainer(servant);
            this._servantList[i] = servant;
        }
        //buff加成花费
        var needGemCon = new BaseDisplayObjectContainer();
        this.addChildToContainer(needGemCon);
        this._needGemCon = needGemCon;
        needGemCon.visible = false;
        needGemCon.height = 20;
        needGemCon.setPosition(20, enterBtn.y - 25);
        var needGemTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantNeedMoney"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        needGemTxt.setPosition(0, needGemCon.height / 2 - needGemTxt.height / 2);
        needGemCon.addChild(needGemTxt);
        needGemTxt.name = "gemTxt";
        var needGemIcon = BaseLoadBitmap.create("itemicon1");
        needGemIcon.width = 100;
        needGemIcon.height = 100;
        needGemCon.addChild(needGemIcon);
        needGemIcon.setScale(0.4);
        needGemIcon.setPosition(needGemTxt.x + needGemTxt.width, needGemCon.height / 2 - needGemIcon.height * needGemIcon.scaleY / 2);
        needGemIcon.name = "gemIcon";
        var needGemNum = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        needGemNum.setPosition(needGemIcon.x + needGemIcon.width * needGemIcon.scaleX, needGemTxt.y);
        needGemCon.addChild(needGemNum);
        needGemNum.name = "gemNum";
        this.freshTopInfo("servant");
    };
    //确定派遣
    SixSection1SelectServantPopupView.prototype.enterBtnClick = function () {
        var _this = this;
        App.LogUtil.log("enterBtn ");
        var servantList = [];
        for (var i = 0; i < this._selServantList.length; i++) {
            if (this._selServantList[i] && this._selServantList[i] > 0) {
                servantList.push("" + this._selServantList[i]);
            }
        }
        if (servantList.length < 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1SelectServantNotSelTip"));
            return;
        }
        var buffCfg = Config.Sixsection1Cfg.buff;
        var cost = 0;
        var buffList = [];
        if (Object.keys(this._selBuffList).length > 0) {
            for (var i = 0; i < 3; i++) {
                if (this._selBuffList[i + 1]) {
                    buffList[i] = this._selBuffList[i + 1];
                    // let tmpCost = buffCfg[i].fristCost * this._selBuffList[i+1] + this._selBuffList[i+1] * (this._selBuffList[i+1] - 1) * buffCfg[i].addCost /2;
                    // let tmpCost = buffCfg[i].cost[this._selBuffList[i+1] - 1];
                    // cost += tmpCost;
                    for (var k = 0; k < this._selBuffList[i + 1]; k++) {
                        cost += buffCfg[i].cost[k];
                    }
                }
                else {
                    buffList[i] = 0;
                }
            }
        }
        else {
            buffList = [0, 0, 0];
        }
        if (cost <= 0) {
            var msg = LanguageManager.getlocal("sixSection1HoldSeatNotSelBuffTip");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: msg,
                callback: function () {
                    NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_ATTACK, { x: _this._seatCfg.lineNum, y: _this._seatIndex + 1, sids: servantList, buff: buffList, fuid: _this.param.data.fuid });
                },
                handler: this,
                needCancel: true
            });
            return;
        }
        var pGem = Api.playerVoApi.getPlayerGem();
        if (pGem < cost) {
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1SelectServantRechargeTip"));
            return;
        }
        App.LogUtil.log("selservent fuid " + this.param.data.fuid);
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_ATTACK, { x: this._seatCfg.lineNum, y: this._seatIndex + 1, sids: servantList, buff: buffList, fuid: this.param.data.fuid });
    };
    SixSection1SelectServantPopupView.prototype.enterSelServantCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        this.hide();
    };
    //派遣 选择buff 监听
    SixSection1SelectServantPopupView.prototype.selServantRefresh = function (evt) {
        if (evt && evt.data) {
            if (evt.data.type == "servant") {
                var isFind = false;
                var index = this._selServantList.length > 0 ? this._selServantList.length : 0;
                ;
                for (var i = 0; i < this._selServantList.length; i++) {
                    if (this._selServantList[i] && this._selServantList[i] < 0) {
                        this._selServantList[i] = Number(evt.data.id);
                        isFind = true;
                        index = i;
                        break;
                    }
                }
                if (!isFind) {
                    this._selServantList[index] = Number(evt.data.id);
                }
                this.frefreshServantIconContainer(false, index);
                this.freshTopInfo(evt.data.type);
            }
            else if (evt.data.type == "buff") {
                var data = { buffType: evt.data.buffType, num: evt.data.num };
                if (!this._selBuffList[data.buffType]) {
                    this._selBuffList[data.buffType] = {};
                }
                this._selBuffList[data.buffType] = data.num;
                this.freshTopInfo(evt.data.type, data);
                var buffTxtName = "_buff" + data.buffType + "Num";
                var buffTxt = this[buffTxtName];
                if (buffTxt) {
                    if (data.num > 0) {
                        buffTxt.setColor(TextFieldConst.COLOR_WARN_GREEN);
                        egret.Tween.get(buffTxt, { loop: false }).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 100);
                    }
                    else {
                        buffTxt.setColor(TextFieldConst.COLOR_WHITE);
                    }
                }
            }
        }
    };
    //门客取消
    SixSection1SelectServantPopupView.prototype.servantIconClick = function (evt, index) {
        if (this._selServantList.length > 0 && this._selServantList[index] > 0) {
            var id = this._selServantList[index];
            this._selServantList[index] = -1;
            var commViewTab = this._tabViewData[0];
            if (commViewTab) {
                commViewTab.cancelSelServant(id);
            }
            this.freshTopInfo("servant");
            this.frefreshServantIconContainer(true, index);
        }
    };
    //刷新顶部
    SixSection1SelectServantPopupView.prototype.freshTopInfo = function (type, buffData) {
        if (type == "servant") {
            // let servantInfoVoObj = Api.sixsection1VoApi.getServantInfoIdListWithSort();
            var servantInfoList = Api.sixsection1VoApi.getServantList();
            var talentNum = 0;
            var attrNum = 0;
            var servantNum = 0;
            for (var i = 0; i < this._selServantList.length; i++) {
                if (this._selServantList[i] > 0) {
                    var servantInfo = Api.servantVoApi.getServantObj(this._selServantList[i]);
                    talentNum += servantInfo.getTotalBookValue(1);
                    attrNum += servantInfo.getTotalAttrValye(1);
                    servantNum += 1;
                }
            }
            var useServant = Api.sixsection1VoApi.getUseServant();
            var userNum = Object.keys(useServant).length;
            this._servantUseNum.text = LanguageManager.getlocal("sixSection1SelectServantUseNum", ["" + (servantInfoList.length - servantNum - userNum), "" + servantInfoList.length]);
            this._talentNum.text = LanguageManager.getlocal("sixSection1HoldSeatLookEnemyTalent", ["" + talentNum]);
            this._totalAttr.text = LanguageManager.getlocal("sixSection1HoldSeatLookEnemyTotalAttr", ["" + App.StringUtil.changeIntToText(attrNum)]);
            this._totalAttr.x = this._topBg.x + this._topBg.width - 30 - this._totalAttr.width;
        }
        else {
            this._gemNum.text = "" + Api.playerVoApi.getPlayerGem();
            this._gemNum.x = this._topBg.x + this._topBg.width - 20 - this._gemNum.width;
            this._gemIcon.x = this._gemNum.x - this._gemIcon.width * this._gemIcon.scaleX;
            var buffCfg = Config.Sixsection1Cfg.buff;
            var buff1Num = this._selBuffList["" + buffCfg[0].buffType] ? this._selBuffList["" + buffCfg[0].buffType] * buffCfg[0].buffValue * 100 : 0;
            this._buff1Num.text = LanguageManager.getlocal("sixSection1SelectServantAtkNum", [buff1Num.toFixed(0) + "%"]);
            var buff2Num = this._selBuffList["" + buffCfg[1].buffType] ? this._selBuffList["" + buffCfg[1].buffType] * buffCfg[0].buffValue * 100 : 0;
            this._buff2Num.text = LanguageManager.getlocal("sixSection1SelectServantCriNum", [buff2Num.toFixed(0) + "%"]);
            this._buff2Num.anchorOffsetX = this._buff2Num.width / 2;
            var buff3Num = this._selBuffList["" + buffCfg[2].buffType] ? this._selBuffList["" + buffCfg[2].buffType] * buffCfg[0].buffValue * 100 : 0;
            this._buff3Num.text = LanguageManager.getlocal("sixSection1SelectServantBloodNum", [buff3Num.toFixed(0) + "%"]);
            this._buff3Num.x = this._topBg.x + this._topBg.width - 30 - this._buff3Num.width;
            var buffList = [];
            var cost = 0;
            if (Object.keys(this._selBuffList).length > 0) {
                for (var key in this._selBuffList) {
                    if (!this._selBuffList[key]) {
                        buffList[Number(key) - 1] = 0;
                    }
                    else {
                        var index = Number(key) - 1;
                        buffList[index] = this._selBuffList[key];
                        // let tmpCost = buffCfg[index].fristCost * this._selBuffList[key] + this._selBuffList[key] * (this._selBuffList[key] - 1) * buffCfg[index].addCost /2;
                        for (var i = 0; i < this._selBuffList[key]; i++) {
                            cost += buffCfg[index].cost[i];
                        }
                    }
                }
            }
            else {
                buffList = [0, 0, 0];
            }
            App.LogUtil.log("needGEM " + cost);
            if (cost > 0) {
                this._needGemCon.visible = true;
                var gemTxt = this._needGemCon.getChildByName("gemTxt");
                var gemIcon = this._needGemCon.getChildByName("gemIcon");
                var gemNum = this._needGemCon.getChildByName("gemNum");
                gemNum.text = "" + cost;
                var tW = gemTxt.width + gemIcon.width * gemIcon.scaleX + gemNum.width;
                this._needGemCon.x = this.viewBg.x + this.viewBg.width / 2 - tW / 2;
            }
            else {
                this._needGemCon.visible = false;
            }
        }
    };
    //刷新顶部icon
    SixSection1SelectServantPopupView.prototype.frefreshServantIconContainer = function (isEmpty, index) {
        var container = this._servantList[index];
        var emptyBg = container.getChildByName("emptyBg");
        var iconContainer = container.getChildByName("iconContainer");
        if (isEmpty) {
            iconContainer.visible = false;
            emptyBg.visible = true;
        }
        else {
            var iconBg = iconContainer.getChildByName("servantBg");
            var servantIcon = iconContainer.getChildByName("servantIcon");
            // let attrBg = <BaseLoadBitmap>iconContainer.getChildByName("attrBg");
            // let attr = <BaseTextField>iconContainer.getChildByName("attr");
            iconContainer.visible = true;
            emptyBg.visible = false;
            var id = this._selServantList[index];
            var servantInfoVo = Api.servantVoApi.getServantObj(id);
            iconBg.setload(servantInfoVo.qualityBoxImgPath);
            servantIcon.setload(servantInfoVo.halfImgPath);
            // attr.text = ""+App.StringUtil.changeIntToText(servantInfoVo.total);
            // attr.x = attrBg.x + attrBg.width/2 - attr.width/2;
            // attr.y = attrBg.y + attrBg.height/2 - attr.height/2;
        }
    };
    //顶部门客icon
    SixSection1SelectServantPopupView.prototype.getServantIconContainer = function (isEmpty, index) {
        var container = new BaseDisplayObjectContainer();
        var deltaScale = 0.48;
        container.width = 194 * deltaScale;
        container.height = 192 * deltaScale;
        var emptyBg = BaseLoadBitmap.create("servant_cardbg_0");
        emptyBg.width = 194;
        emptyBg.height = 192;
        emptyBg.setScale(deltaScale);
        container.addChild(emptyBg);
        emptyBg.name = "emptyBg";
        var iconContainer = new BaseDisplayObjectContainer();
        iconContainer.width = container.width;
        iconContainer.height = container.height;
        container.addChild(iconContainer);
        iconContainer.name = "iconContainer";
        var bg = BaseLoadBitmap.create("");
        bg.width = 194;
        bg.height = 192;
        bg.setScale(deltaScale);
        iconContainer.addChild(bg);
        bg.name = "servantBg";
        var servantImg = BaseLoadBitmap.create("");
        servantImg.width = 180;
        servantImg.height = 177;
        servantImg.x = bg.x + bg.width / 2 - servantImg.width / 2 - 5;
        servantImg.y = bg.y + bg.height / 2 - servantImg.height / 2 - 2;
        servantImg.setScale(deltaScale);
        iconContainer.addChild(servantImg);
        servantImg.name = "servantIcon";
        // let attrBg = BaseBitmap.create("public_9_mainicontimebg");
        // attrBg.height = 24;
        // attrBg.width = container.width + 10;
        // attrBg.setPosition(iconContainer.width/2 - attrBg.width/2, container.height - attrBg.height);
        // iconContainer.addChild(attrBg);
        // attrBg.name = "attrBg";
        // let attrTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        // attrTxt.x = attrBg.x + attrBg.width/2 - attrTxt.width/2;
        // attrTxt.y = attrBg.y + attrBg.height/2 - attrTxt.height/2;
        // iconContainer.addChild(attrTxt);
        // attrTxt.name = "attr";
        var decrFlag = BaseBitmap.create("discussclose");
        decrFlag.setPosition(container.width - decrFlag.width, 0);
        iconContainer.addChild(decrFlag);
        decrFlag.name = "decrFlag";
        iconContainer.addTouchTap(this.servantIconClick, this, [index]);
        if (isEmpty) {
            iconContainer.visible = false;
        }
        return container;
    };
    SixSection1SelectServantPopupView.prototype.changeTab = function () {
        var tabveiwClass = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex + 1));
        if (tabveiwClass) {
            var commViewTab = this._tabViewData[this.selectedTabIndex];
            if (commViewTab) {
                this.addChildToContainer(commViewTab);
                commViewTab.refreshWhenSwitchBack();
            }
            else {
                var tabView = new tabveiwClass(this.param);
                tabView.setPosition(20, this._tabbarGroup.y + this._tabbarGroup.height);
                this._tabViewData[this.selectedTabIndex] = tabView;
                tabView["param"] = this.param;
                this.addChildToContainer(tabView);
                // this.param = null;
                // this.addChild(tabView);
            }
            if (this.lastSelectedTabIndex != null && this._tabViewData[this.lastSelectedTabIndex]) {
                this.container.removeChild(this._tabViewData[this.lastSelectedTabIndex]);
            }
        }
    };
    SixSection1SelectServantPopupView.prototype.getTabbarTextArrs = function () {
        return ["sixSection1SelectServantTabName1", "sixSection1SelectServantTabName2"];
    };
    SixSection1SelectServantPopupView.prototype.getTabbarNames = function () {
        return ButtonConst.BTN2_SMALL_TAB;
    };
    SixSection1SelectServantPopupView.prototype.getShowHeight = function () {
        return 810;
    };
    SixSection1SelectServantPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_SELSERVANT_REFRESH, this.selServantRefresh, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_ATTACK, this.enterSelServantCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);
        this._seatCfg = null;
        this._seatIndex = null;
        this._tabbarGroup = null;
        if (this._tabViewData) {
            for (var key in this._tabViewData) {
                var view = this._tabViewData[key];
                if (view) {
                    if (this.container.contains(view)) {
                        this.removeChildFromContainer(view);
                    }
                    view.dispose();
                    view = null;
                }
            }
            this._tabViewData = {};
        }
        this._selServantList = [];
        this._selBuffList = {};
        this._servantList = [];
        this._topBg = null;
        this._servantUseNum = null;
        this._gemIcon = null;
        this._gemNum = null;
        this._talentNum = null;
        this._totalAttr = null;
        this._buff1Num = null;
        this._buff2Num = null;
        this._buff3Num = null;
        this._needGemCon = null;
        _super.prototype.dispose.call(this);
    };
    return SixSection1SelectServantPopupView;
}(PopupView));
//# sourceMappingURL=SixSection1SelectServantPopupView.js.map