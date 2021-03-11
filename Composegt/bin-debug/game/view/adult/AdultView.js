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
 * 媒婆
 * author dky
 * date 2017/10/28
 * @class AdultView
 */
var AdultView = (function (_super) {
    __extends(AdultView, _super);
    function AdultView() {
        var _this = _super.call(this) || this;
        _this._index = 1;
        _this._curTabIdx = 0;
        _this._childId = null;
        _this._childInfoObj = null;
        _this._proTxtList = null;
        _this._childProCfg = null;
        _this._curLevel = 0;
        _this._marryIndex = 0;
        _this._receiveIndex = 0;
        _this._achRedDotSp = null;
        _this._achRedDotSp2 = null;
        _this._shareBtn = null;
        _this._canShare = true;
        //场次分享的时间戳
        _this._shareTime = 0;
        _this._qualityBg = null;
        _this.initflag = false;
        return _this;
    }
    AdultView.prototype.initView = function () {
        // ViewController.getInstance().openView(ViewConst.BASE.ADULTMARRYSUCCESSVIEW, { childId: "c1",confirmCallback: null, handler: this });
        var _this = this;
        Api.rookieVoApi.checkNextStep();
        Api.mainTaskVoApi.checkShowGuide();
        Api.adultVoApi.getAdultMarryNum();
        if (Api.adultVoApi._marryList.length > 0) {
            this._marryData = Api.adultVoApi._marryList;
            this.playMarry();
        }
        if (Api.adultVoApi._refuseData && Api.adultVoApi._refuseData != "") {
            var rewardStr = GameData.getRewardsStr(Api.adultVoApi._refuseData);
            var msg = LanguageManager.getlocal("adultMarryMsg", [rewardStr]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "adultMarryRefuse",
                msg: msg,
                callback: null,
                handler: this
            });
        }
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_REFRESHCHILDMARRY, this.doRefresh, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULTFRESH, this.freshAdult, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_CANCELVISIT), this.cancelVisitCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SUDANFRESH, this.refreshSadun, this);
        this.request(NetRequestConst.REQUEST_RADULT_GETADULTINFO, {});
        var topBg = BaseBitmap.create("public_9v_bg10");
        topBg.width = GameConfig.stageWidth;
        topBg.height = 70;
        topBg.y = -21;
        this.addChildToContainer(topBg);
        //孩子背景
        var childBg = BaseLoadBitmap.create("adult_bg");
        childBg.x = 0;
        childBg.y = topBg.y + topBg.height + 0;
        this.addChildToContainer(childBg);
        //子嗣
        this._proTxtList = [];
        this._adultInfoVo = Api.adultVoApi.getAdultVoList()[0];
        this._adultInfoVoList = Api.adultVoApi.getAdultVoList();
        this._childContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._childContainer);
        //已婚子嗣
        this._childContainer2 = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._childContainer2);
        if (Api.adultVoApi.getAdultNum() > 0) {
            var qualityBg = BaseBitmap.create("adult_namebg");
            qualityBg.x = childBg.x + 10;
            // qualityBg.y = childBg.y + 40 + (PlatformManager.checkIsThSp() ? 76 : 0);
            qualityBg.y = childBg.y + 70;
            // qualityBg.rotation = PlatformManager.checkIsThSp() ? -90 : 0;
            // qualityBg.setScale(1.2);
            this._qualityBg = qualityBg;
            this.addChildToContainer(qualityBg);
            var qualityBB = BaseLoadBitmap.create("adult_q" + (this._adultInfoVo.aquality || 1));
            qualityBB.width = 46 * qualityBg.scaleX;
            qualityBB.height = 156 * qualityBg.scaleY;
            // qualityBB.setScale(1.5);
            qualityBB.x = qualityBg.x + qualityBg.width / 2 * qualityBg.scaleX - qualityBB.width / 2;
            qualityBB.y = qualityBg.y + qualityBg.height / 2 * qualityBg.scaleY - qualityBB.height / 2;
            if (PlatformManager.checkIsTextHorizontal()) {
                qualityBg.rotation = -90;
                // qualityBg.y = childbg.y + childbg.height - 50;
                qualityBB.width = 156 * qualityBg.scaleX;
                qualityBB.height = 46 * qualityBg.scaleY;
                qualityBB.x = qualityBg.x;
                qualityBB.y = qualityBg.y - 45;
            }
            // if(PlatformManager.checkIsThSp()){
            // 	qualityBB.x = qualityBg.x + 2;
            // 	qualityBB.y = qualityBg.y - 45;
            // }
            // else{
            // this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, qualityBB, qualityBg);
            // }
            this.addChildToContainer(qualityBB);
            this._qualityBB = qualityBB;
            //孩子属性容器
            this._child_wordbg = BaseBitmap.create("public_9v_bg11");
            this._child_wordbg.visible = false;
            this._child_wordbg.x = 60;
            this._child_wordbg.y = GameConfig.stageHeigth - this.container.y - 820;
            this._child_wordbg.width = 300;
            this._child_wordbg.height = 78;
            this._childContainer.addChild(this._child_wordbg);
            // this._child_wordbgCor = BaseBitmap.create("public_9_bg25_tail");
            // this._child_wordbgCor.x = 260;
            // this._child_wordbgCor.y = this._child_wordbg.y + this._child_wordbg.height - 3;
            // this._childContainer.addChild(this._child_wordbgCor);
            this._childWordsText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            this._childWordsText.text = LanguageManager.getlocal("childIntimacyDesc");
            this._childWordsText.x = this._child_wordbg.x + 20;
            this._childWordsText.y = this._child_wordbg.y + 20;
            this._childWordsText.width = 280;
            this._childWordsText.height = 80;
            this._childContainer.addChild(this._childWordsText);
            this._child_Icon = BaseLoadBitmap.create("");
            this._child_Icon.width = 332;
            this._child_Icon.height = 375;
            this._child_Icon.x = 40;
            this._child_Icon.y = this._child_wordbg.y + this._child_wordbg.height + 10;
            this._childContainer.addChild(this._child_Icon);
            //子嗣
            this._proTxtList = [];
            this._adultInfoVo = Api.adultVoApi.getAdultVoList()[0];
            this._adultInfoVoList = Api.adultVoApi.getAdultVoList();
            // let childCfg = GameConfig.config.childCfg[this._adultInfoVo.quality.toString()];
            this._shareBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, "sharePopupViewTitle", this.shareToChat, this);
            this._shareBtn.setPosition(135, this._child_wordbg.y + 350);
            this._childContainer.addChild(this._shareBtn);
            this._motherText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            // this._motherText.text = Api.playerVoApi.getPlayerGold().toString();
            this._motherText.x = 30;
            this._motherText.y = 5;
            this._childContainer.addChild(this._motherText);
            this._intimacyText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            // this._intimacyText.text = Api.playerVoApi.getPlayerGold().toString();
            this._intimacyText.x = 300;
            this._intimacyText.y = 5;
            this._childContainer.addChild(this._intimacyText);
            // this._intimacyDescText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            // this._intimacyDescText.text = LanguageManager.getlocal("childIntimacyDesc");
            // this._intimacyDescText.x = GameConfig.stageWidth - this._intimacyDescText.width - 30;
            // this._intimacyDescText.y = 5;
            // this._childContainer.addChild(this._intimacyDescText);
            this._child_infobg = BaseBitmap.create("public_9v_bg10");
            this._child_infobg.width = 200;
            this._child_infobg.height = 375;
            this._child_infobg.x = 375;
            this._child_infobg.y = this._child_wordbg.y + 40;
            this._childContainer.addChild(this._child_infobg);
            // //子嗣属性
            // this._attBg = BaseBitmap.create("public_9_probiginnerbg");
            // this._attBg.width = 182;
            // this._attBg.height = 190;
            // this._attBg.x = this._child_infobg.x + this._child_infobg.width / 2 - this._attBg.width / 2;
            // this._attBg.y = this._child_infobg.y + 50;
            // this._childContainer.addChild(this._attBg);
            var fontSize = 20;
            var offY = 7;
            var deltaY = 37;
            if (PlatformManager.checkIsViSp()) {
                fontSize = 16;
                offY = 9;
                deltaY = 38;
            }
            if (Api.switchVoApi.checkopenSadun()) {
                offY = 1;
                deltaY = 31;
                if (PlatformManager.checkIsViSp()) {
                    fontSize = 16;
                    offY = 3;
                    deltaY = 32;
                }
            }
            offY += 2;
            //子嗣名字
            this._childNameText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WHITE);
            this._childNameText.text = "";
            this._childNameText.x = this._child_infobg.x + this._child_infobg.width / 2 - this._childNameText.width / 2;
            this._childNameText.y = this._child_infobg.y + 10;
            // if(PlatformManager.checkIsViSp()){
            // 	this._childNameText.y = this._child_infobg.y + 24;
            // }
            this._childContainer.addChild(this._childNameText);
            this._childNameText.addTouchTap(this.changeNameHandler, this, null);
            // this.addTouchTap(this.changeNameHandler,this);
            var downTitleLine = BaseBitmap.create("public_huawen_bg");
            downTitleLine.setPosition(this._child_infobg.x + this._child_infobg.width / 2 - downTitleLine.width / 2, this._child_infobg.y + 40);
            this._childContainer.addChild(downTitleLine);
            var por1 = BaseBitmap.create("playerview_pro14");
            por1.x = this._child_infobg.x + 20;
            por1.y = this._child_infobg.y + 50;
            this._childContainer.addChild(por1);
            var por2 = BaseBitmap.create("playerview_pro15");
            por2.x = por1.x;
            por2.y = por1.y + por1.height + offY;
            this._childContainer.addChild(por2);
            var por3 = BaseBitmap.create("playerview_pro1");
            por3.x = por1.x;
            por3.y = por2.y + por2.height + offY;
            this._childContainer.addChild(por3);
            var por4 = BaseBitmap.create("playerview_pro2");
            por4.x = por1.x;
            por4.y = por3.y + por3.height + offY;
            this._childContainer.addChild(por4);
            var por5 = BaseBitmap.create("playerview_pro4");
            por5.x = por1.x;
            por5.y = por4.y + por4.height + offY;
            this._childContainer.addChild(por5);
            var por6 = BaseBitmap.create("playerview_pro5");
            por6.x = por1.x;
            por6.y = por5.y + por5.height + offY;
            this._childContainer.addChild(por6);
            var proX = 410;
            var proY = this._child_infobg.y + 53;
            if (PlatformManager.checkIsViSp()) {
                proY = this._child_infobg.y + 57;
                // deltaY = 31;
            }
            for (var index = 0; index < 6; index++) {
                var proTxt = ComponentManager.getTextField("adultMarryTime", fontSize, TextFieldConst.COLOR_LIGHT_YELLOW);
                proTxt.x = proX;
                proTxt.y = proY;
                this._childContainer.addChild(proTxt);
                proY += deltaY;
                this._proTxtList.push(proTxt);
            }
            this._vigouTimeText = ComponentManager.getTextField(LanguageManager.getlocal("adultMarryTime") + "00:00:00", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
            this._vigouTimeText.x = this._child_infobg.x + this._child_infobg.width / 2 - this._vigouTimeText.width / 2;
            this._vigouTimeText.y = this._child_infobg.y + this._child_infobg.height - 138;
            this._childContainer.addChild(this._vigouTimeText);
            //拜访按钮
            var btnStr = "adultchoosevisitviewTitle";
            if (!Api.adultVoApi.notInVisit(this._adultInfoVo.id)) {
                btnStr = "adultvisit_cancel";
            }
            else if (Api.adultVoApi.isVisited(this._adultInfoVo.id)) {
                btnStr = "adultvisit_visited";
            }
            this._goVisitBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, btnStr, this.nameBtnClickHandler, this);
            this._goVisitBtn.x = this._child_infobg.x + this._child_infobg.width / 2 - this._goVisitBtn.width / 2;
            this._goVisitBtn.y = this._child_infobg.y + this._child_infobg.height - 112;
            this._childContainer.addChild(this._goVisitBtn);
            //联姻按钮
            this._childUpdBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "adultMarry", this.updBtnClickHandler, this);
            this._childUpdBtn.x = this._goVisitBtn.x;
            this._childUpdBtn.y = this._goVisitBtn.y + this._goVisitBtn.height + 6;
            this._childContainer.addChild(this._childUpdBtn);
            if (!Api.switchVoApi.checkopenSadun()) {
                this._goVisitBtn.visible = false;
                // this._childUpdBtn.y = this._goVisitBtn.y + 40 ;
                this._vigouTimeText.y = this._child_infobg.y + this._child_infobg.height - 108;
            }
            this.tick();
        }
        var tabName = ["adultTab1", "adultTab2"];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_NEWTAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.setSpace(2);
        tabbarGroup.x = 5;
        this.addChildToContainer(tabbarGroup);
        //孩子栏位背景
        var childItemBg = BaseBitmap.create("servant_yeqiankuang");
        childItemBg.width = GameConfig.stageWidth;
        // childItemBg.height = GameConfig.stageHeigth - this.container.y - childBg.height - topBg.height -topBg.y ;
        childItemBg.height = 390 - 54;
        childItemBg.x = 0;
        childItemBg.y = GameConfig.stageHeigth - this.container.y - childItemBg.height; // - tabbarGroup.height;
        // childItemBg.y = -15;
        this.addChildToContainer(childItemBg);
        tabbarGroup.y = childItemBg.y - tabbarGroup.height + 1;
        var childItemBg0 = BaseBitmap.create("public_9v_bg02");
        childItemBg0.width = 626;
        childItemBg0.height = childItemBg.height - 20;
        childItemBg0.x = GameConfig.stageWidth / 2 - childItemBg0.width / 2;
        childItemBg0.y = childItemBg.y + 10;
        // childItemBg0.y = -15;
        this.addChildToContainer(childItemBg0);
        var childItemBg2 = BaseBitmap.create("public_listbg");
        childItemBg2.width = 616;
        childItemBg2.height = childItemBg.height - 24;
        childItemBg2.x = GameConfig.stageWidth / 2 - childItemBg2.width / 2;
        childItemBg2.y = childItemBg.y + 12;
        this.addChildToContainer(childItemBg2);
        //初始化孩子席位
        var adultList = Api.adultVoApi.getAdultVoList();
        var listbg = BaseBitmap.create("adult_listbg2");
        listbg.width = childItemBg2.width - 15;
        listbg.height = childItemBg2.height - 80;
        listbg.x = childItemBg.width / 2 - listbg.width / 2;
        listbg.y = childItemBg2.y + 7;
        this.addChildToContainer(listbg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 36, listbg.height - 10);
        this._scrollList = ComponentManager.getScrollList(AdultScrollItem, adultList, rect, undefined, undefined, true);
        this.addChildToContainer(this._scrollList);
        this._scrollList.x = childItemBg.x + childItemBg.width / 2 - this._scrollList.width / 2;
        this._scrollList.y = listbg.y + 5;
        this._scrollList.addTouchTap(this.clickItemHandler, this);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("adultEmptyMsg"), TextFieldConst.COLOR_BLACK);
        this._goChildBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "adultEmptyBtnMsg", this.goChildBtnClick, this);
        this._goChildBtn.x = GameConfig.stageWidth / 2 - this._goChildBtn.width / 2;
        this._goChildBtn.y = this._scrollList.y + this._scrollList.height / 2 + 30;
        // this._goChildBtn .setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(this._goChildBtn);
        if (adultList.length <= 0) {
            this._goChildBtn.visible = true;
        }
        else {
            this._goChildBtn.visible = false;
        }
        this._marryChild_wordbg = BaseBitmap.create("public_9v_bg11");
        // this._marryChild_wordbg.visible = false;
        this._marryChild_wordbg.x = 160;
        this._marryChild_wordbg.y = GameConfig.stageHeigth - this.container.y - 820;
        ;
        this._marryChild_wordbg.width = 300;
        this._marryChild_wordbg.height = 78;
        this._childContainer2.addChild(this._marryChild_wordbg);
        this._marryWordsText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this._marryWordsText.text = LanguageManager.getlocal("adultMarryWord1");
        this._marryWordsText.x = this._marryChild_wordbg.x + 20;
        this._marryWordsText.y = this._marryChild_wordbg.y + 20;
        this._marryWordsText.width = 260;
        this._marryWordsText.height = 80;
        this._childContainer2.addChild(this._marryWordsText);
        // let myIcon = "adult_boy"
        // let otherIcon = "adult_girl"
        // if(Api.adultVoApi.getAdultMarryNum()>0)
        // {
        // 	this._adultMarryInfoVo = Api.adultVoApi.getAdultMarryVoList()[0];
        // 	if(this._adultMarryInfoVo.sex == 2){
        // 	myIcon = "adult_girl"
        // 	otherIcon = "adult_boy"
        // 	this._marryChild_Icon.skewY = 180;
        // 	this._marryChild_Icon2.skewY = 180;
        // }	
        // else{
        // 	this._marryChild_Icon.skewY = 0;
        // 	this._marryChild_Icon2.skewY = 0;
        // }
        // if(Api.switchVoApi.checkOpenAdultImage() && this._adultMarryInfoVo.aquality != 7){
        // 	myIcon = `adult_${this._adultMarryInfoVo.sex}_${this._adultMarryInfoVo.aquality}`;
        // 	otherIcon = `adult_${3 - this._adultMarryInfoVo.sex}_${this._adultMarryInfoVo.aquality}`;
        // 	}
        // }
        this._marryChild_Icon = BaseLoadBitmap.create("");
        this._marryChild_Icon.width = 332;
        this._marryChild_Icon.height = 375;
        this._marryChild_Icon.x = 40;
        this._marryChild_Icon.y = this._marryChild_wordbg.y + this._marryChild_wordbg.height + 10;
        this._childContainer2.addChild(this._marryChild_Icon);
        this._marryChild_Icon2 = BaseLoadBitmap.create("");
        this._marryChild_Icon2.width = 332;
        this._marryChild_Icon2.height = 375;
        this._marryChild_Icon2.x = 260;
        this._marryChild_Icon2.y = this._marryChild_wordbg.y + this._marryChild_wordbg.height + 10;
        this._childContainer2.addChild(this._marryChild_Icon2);
        // let childCfg = GameConfig.config.childCfg[this._adultInfoVo.quality.toString()];
        this._otherNameText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        // this._motherText.text = Api.playerVoApi.getPlayerGold().toString();
        this._otherNameText.x = 30;
        this._otherNameText.y = 5;
        this._childContainer2.addChild(this._otherNameText);
        this._marryBuffText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        // this._intimacyText.text = Api.playerVoApi.getPlayerGold().toString();
        this._marryBuffText.x = 230;
        if (PlatformManager.checkIsViSp()) {
            this._marryBuffText.x = 260;
        }
        this._marryBuffText.y = 5;
        this._childContainer2.addChild(this._marryBuffText);
        this._marryTimeText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._marryTimeText.x = 430;
        this._marryTimeText.y = 5;
        this._childContainer2.addChild(this._marryTimeText);
        //初始化孩子席位
        var adultMarryList = Api.adultVoApi.getAdultMarryVoList();
        var rect1 = egret.Rectangle.create();
        rect1.setTo(0, 0, GameConfig.stageWidth - 36, listbg.height - 10);
        this._scrollList2 = ComponentManager.getScrollList(Adult2ScrollItem, adultMarryList, rect1, undefined, undefined, true);
        this.addChildToContainer(this._scrollList2);
        this._scrollList2.x = childItemBg.x + childItemBg.width / 2 - this._scrollList2.width / 2;
        this._scrollList2.y = listbg.y + 5;
        this._scrollList2.addTouchTap(this.clickItemHandler2, this);
        this._scrollList2.visible = false;
        this._scrollList2.setEmptyTip(LanguageManager.getlocal("adultEmptyMsg2"), TextFieldConst.COLOR_BLACK);
        this._scrollList2.bindMoveCompleteCallback(function () {
            var view = _this;
            var index = _this._index;
            var list = _this._scrollList2;
            var content = list.content;
            if (!_this._scrollList2.checkShowArrow() && _this._scrollList2.scrollTop >= (content.height - _this._scrollList2.height)) {
                index += 50;
            }
            else if (_this._scrollList2.scrollTop == 0) {
                index = Math.max(1, index - 50);
            }
            if (_this._index != index) {
                _this._index = index;
                _this.request(NetRequestConst.REQUEST_ADULT_GETMINFO, { index: index });
            }
        }, this);
        if (Api.adultVoApi.getAdultMarryNum() > 0) {
            this._adultMarryInfoVo = Api.adultVoApi.getAdultMarryVoList()[0];
            this.updMarryChildAttData(this._adultMarryInfoVo);
            this.setSelect2(this._adultMarryInfoVo.id);
        }
        this._childContainer2.visible = false;
        this._scrollList2.visible = false;
        this._marryChild_Icon.anchorOffsetX = this._marryChild_Icon.width / 2;
        this._marryChild_Icon2.anchorOffsetX = this._marryChild_Icon2.width / 2;
        this._marryChild_Icon.x = this._marryChild_Icon.x + this._marryChild_Icon.width / 2;
        this._marryChild_Icon2.x = this._marryChild_Icon2.x + this._marryChild_Icon2.width / 2;
        this.initBottimBtns();
        //从其他界面点过来
        if (this.param && this.param.data.childId) {
            if (this.param.data.childId) {
                var chidlIndex = Api.adultVoApi.getAdultIndexVoById(this.param.data.childId);
                this._scrollList.setScrollTopByIndex(chidlIndex, 0);
                var childInfoVo = this._adultInfoVoList[chidlIndex];
                var id = childInfoVo.id;
                this._adultInfoVo = childInfoVo;
                this.updChildAttData(childInfoVo);
                // this._adultScrollItem =  <ChildScrollItem>this._scrollList.getItemByIndex(chidlIndex);
                this.setSelect(id);
            }
        }
        else {
            if (Api.adultVoApi.getAdultNum() > 0) {
                var childInfoVo = this._adultInfoVoList[0];
                var id = childInfoVo.id;
                this._adultInfoVo = childInfoVo;
                this.updChildAttData(childInfoVo);
                var chidlIndex = Api.adultVoApi.getAdultIndexVoById(id);
                // this._adultScrollItem =  <ChildScrollItem>this._scrollList.getItemByIndex(chidlIndex);
                this.setSelect(id);
            }
        }
    };
    AdultView.prototype.initBottimBtns = function () {
        //提亲请求
        var requestBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "adultMarryRequestViewTitle", this.requestBtnClick, this);
        requestBtn.x = 20;
        requestBtn.y = GameConfig.stageHeigth - requestBtn.height - 20;
        this.addChild(requestBtn);
        var visitBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, "adultvisit", this.visitBtnClick, this);
        visitBtn.x = GameConfig.stageWidth / 2 - visitBtn.width / 2;
        visitBtn.y = requestBtn.y;
        this.addChild(visitBtn);
        var yyuanBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "adultyyuan", this.yyuanBtnClick, this);
        yyuanBtn.x = GameConfig.stageWidth - yyuanBtn.width - requestBtn.x;
        yyuanBtn.y = requestBtn.y;
        this.addChild(yyuanBtn);
        this._achRedDotSp = BaseBitmap.create("public_dot2");
        this._achRedDotSp.x = requestBtn.x + requestBtn.width - this._achRedDotSp.width - 1;
        this._achRedDotSp.y = requestBtn.y - 2;
        this._achRedDotSp.visible = false;
        this.addChild(this._achRedDotSp);
        this._achRedDotSp2 = BaseBitmap.create("public_dot2");
        this._achRedDotSp2.x = visitBtn.x + visitBtn.width - this._achRedDotSp2.width - 1;
        this._achRedDotSp2.y = visitBtn.y - 2;
        this._achRedDotSp2.visible = Api.adultVoApi.getVisitNum() > 0 && Api.switchVoApi.checkopenSadun();
        this.addChild(this._achRedDotSp2);
        if (!Api.switchVoApi.checkopenSadun()) {
            visitBtn.visible = yyuanBtn.visible = false;
        }
        if (this._goVisitBtn) {
            var itemCount = Api.itemVoApi.getItemNumInfoVoById(1411);
            var info = Api.adultVoApi.getAdultInfoVoById(this._adultInfoVo.id);
            var itemUseCount = Api.adultVoApi.getVisitUseByQuality(info.aquality);
            if (Api.adultVoApi.isSadunCanVisit(this._adultInfoVo.id) && itemCount >= itemUseCount) {
                App.CommonUtil.addIconToBDOC(this._goVisitBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._goVisitBtn);
            }
        }
        this.initflag = true;
        this.request(NetRequestConst.REQUEST_RADULT_GETPROPOSEE, null);
        this.request(NetRequestConst.REQUEST_SADUN_GETINFO, null);
    };
    AdultView.prototype.shareToChat = function () {
        var needVip = Api.vipVoApi.getNeedVip("reachLvelUnlock");
        if (Api.playerVoApi.getPlayerLevel() < GameData.chatlevel && Api.playerVoApi.getPlayerVipLevel() < needVip) {
            App.CommonUtil.showTip(LanguageManager.getlocal("reachLvelUnlockDesc2", [Api.playerVoApi.getPlayerOfficeByLevel(GameData.chatlevel), String(needVip)]));
            return;
        }
        var lastShareTime = this._shareTime;
        if (GameData.serverTime - lastShareTime >= GameData.sharechatcd) {
            ViewController.getInstance().openView(ViewConst.POPUP.DINNERSHAREPOPUPVIEW, { f: this.shareCallback, o: this, stype: 3, name: this._adultInfoVo.name, att: this._adultInfoVo.attrVo.attTotal, aquality: this._adultInfoVo.aquality,
                aid: this._adultInfoVo.pro[3], id: this._adultInfoVo.id, et: this._adultInfoVo.pro[0], sex: this._adultInfoVo.sex
                // ,visit:this._adultInfoVo.visit
            });
        }
        else {
            var timeStr = App.DateUtil.getFormatBySecond(GameData.sharechatcd - GameData.serverTime + lastShareTime, 8);
            App.CommonUtil.showTip(LanguageManager.getlocal("dinner_share_time2", [timeStr]));
        }
    };
    AdultView.prototype.shareCallback = function () {
        this._shareTime = GameData.serverTime;
        this.tick();
    };
    // protected getTabbarTextArr():Array<string>
    // {
    // 	return ["adultTab1","adultTab2"
    // 			// ,"itemBtn"
    // 	];
    // }
    // protected getTabbarGroupY():number
    // {
    // 	return 450;
    // 	// return 270;
    // }
    AdultView.prototype.goChildBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW, {});
        this.hide();
    };
    AdultView.prototype.requestBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ADULTMARRYREQUESTVIEW, { confirmCallback: this.requestMarryCallback, confirmCallback2: this.checkRedPoint, handler: this });
    };
    AdultView.prototype.visitBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ADULTVISITREQUESTVIEW);
    };
    AdultView.prototype.yyuanBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ADULTYINYUANRECORDVIEW, { type: 'yyuanrecord', childid: this._adultInfoVo ? this._adultInfoVo.id : null });
    };
    AdultView.prototype.checkRedPoint = function (type) {
        if (type == 1) {
            this._achRedDotSp.visible = true;
        }
        else {
            this._achRedDotSp.visible = false;
        }
    };
    AdultView.prototype.refreshSadun = function () {
        this.updChildAttData(this._adultInfoVo);
        this.refreshItem();
        this._achRedDotSp2.visible = Api.adultVoApi.getVisitNum() > 0 && Api.switchVoApi.checkopenSadun();
        if (this._goVisitBtn && this._adultInfoVo && this._adultInfoVo.id) {
            var itemCount = Api.itemVoApi.getItemNumInfoVoById(1411);
            var info = Api.adultVoApi.getAdultInfoVoById(this._adultInfoVo.id);
            var itemUseCount = Api.adultVoApi.getVisitUseByQuality(info.aquality);
            if (Api.adultVoApi.isSadunCanVisit(this._adultInfoVo.id) && itemCount >= itemUseCount) {
                App.CommonUtil.addIconToBDOC(this._goVisitBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._goVisitBtn);
            }
        }
    };
    AdultView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        if (this._curTabIdx == 0) {
            this._scrollList.visible = true;
            this._childContainer.visible = true;
            this._childContainer2.visible = false;
            this._scrollList2.visible = false;
            if (Api.adultVoApi.getAdultNum() > 0) {
                // this._scrollList2.visible = true;
                if (this._qualityBB) {
                    this._qualityBB.visible = this._qualityBg.visible = true;
                }
                this._childContainer.visible = true;
            }
            else {
                if (this._qualityBB) {
                    this._qualityBB.visible = this._qualityBg.visible = false;
                }
                this._childContainer.visible = false;
            }
            var adultInfoVoList = Api.adultVoApi.getAdultVoList();
            if (adultInfoVoList.length <= 0) {
                this._goChildBtn.visible = true;
            }
            else {
                this._goChildBtn.visible = false;
            }
        }
        else {
            if (this._qualityBB) {
                this._qualityBB.visible = this._qualityBg.visible = this._childContainer.visible = false;
            }
            this._scrollList.visible = false;
            this._goChildBtn.visible = false;
            this.request(NetRequestConst.REQUEST_ADULT_GETMINFO, {
                index: this._index
            });
            if (Api.adultVoApi.getAdultMarryNum() > 0) {
                this._scrollList2.visible = true;
                this._childContainer2.visible = true;
            }
            this._scrollList2.visible = true;
        }
    };
    AdultView.prototype.clickItemHandler = function (event) {
        var index = Number(event.data);
        this._adultInfoVoList = Api.adultVoApi.getAdultVoList();
        if (this._adultInfoVoList) {
            var adultInfoVo = this._adultInfoVoList[index];
            if (adultInfoVo) {
                var id = adultInfoVo.id;
                this._adultInfoVo = adultInfoVo;
                this.updChildAttData(adultInfoVo);
                this.setSelect(id);
            }
        }
        this.tick();
    };
    AdultView.prototype.clickItemHandler2 = function (event) {
        var index = Number(event.data);
        var adultMarryList = Api.adultVoApi.getAdultMarryVoList();
        this._adultMarryInfoVo = adultMarryList[index];
        if (this._adultMarryInfoVo) {
            var id = this._adultMarryInfoVo.id;
            this.updMarryChildAttData(this._adultMarryInfoVo);
            this.setSelect2(id);
            // ViewController.getInstance().openView(ViewConst.BASE.ADULTMARRYSUCCESSVIEW, { childId: id,confirmCallback: null, handler: this });
        }
    };
    AdultView.prototype.tick = function () {
        if (Api.adultVoApi.getAdultNum() <= 0) {
            return;
        }
        if (this._vigouTimeText == null) {
            return;
        }
        var lastTime = 0;
        this._shareBtn.visible = false;
        this._vigouTimeText.visible = false;
        if (this._adultInfoVo && this._adultInfoVo.pro && Api.adultVoApi.getAdultInfoVoById(this._adultInfoVo.id)) {
            lastTime = this._adultInfoVo.pro[0] - GameData.serverTime;
            //分享
            if (lastTime > 0 && this._adultInfoVo.pro[2] == 1) {
                if (Api.switchVoApi.checkOpenAdultShare()) {
                    this._shareBtn.visible = true;
                }
                this._shareTime = Api.adultVoApi.getAdultInfoVoById(this._adultInfoVo.id).shareCd;
                if (GameData.serverTime - this._shareTime >= GameData.sharechatcd) {
                    if (this._canShare == false) {
                        this._canShare = true;
                        App.DisplayUtil.changeToNormal(this._shareBtn);
                    }
                }
                else {
                    if (this._canShare == true) {
                        this._canShare = false;
                        App.DisplayUtil.changeToGray(this._shareBtn);
                    }
                }
            }
            if (lastTime > 0) {
                this._vigouTimeText.text = LanguageManager.getlocal("adultMarryTime") + App.DateUtil.getFormatBySecond(lastTime, 1);
                this._vigouTimeText.visible = true;
            }
            else if (lastTime == 0) {
                this.request(NetRequestConst.REQUEST_RADULT_GETADULTINFO, {});
                this._vigouTimeText.visible = false;
            }
            else {
                this._vigouTimeText.visible = false;
            }
        }
    };
    //扩展子嗣栏位回调
    AdultView.prototype.addChildPos = function () {
        this.request(NetRequestConst.REQUEST_CHILD_ADDPOSNUM, null);
    };
    //刷新选中状态
    AdultView.prototype.setSelect = function (childId) {
        var childIndex = Api.adultVoApi.getAdultIndexVoById(childId);
        if (this._adultScrollItem) {
            if (this._adultScrollItem.getChildByName("select")) {
                this._adultScrollItem.removeChild(this._adultScrollItem.getChildByName("select"));
                var baseBitmap = this._adultScrollItem.getChildByName("select");
                baseBitmap = null;
            }
        }
        this._adultScrollItem = this._scrollList.getItemByIndex(childIndex);
        if (!this._adultScrollItem) {
            return;
        }
        var bg2Index = this._adultScrollItem.getChildIndex(this._adultScrollItem.getChildByName("bg2"));
        var itemBg2 = BaseBitmap.create("public_9_bg29");
        itemBg2.width = 600;
        itemBg2.height = 62;
        // itemBg2.width = 500;
        // itemBg2.height = 50;
        itemBg2.x = this._adultScrollItem.width / 2 - itemBg2.width / 2;
        itemBg2.y = this._adultScrollItem.height / 2 - itemBg2.height / 2;
        itemBg2.name = "select";
        this._adultScrollItem.addChildAt(itemBg2, 2);
        // this._adultScrollItem.addChild(itemBg2);
    };
    //刷新选中状态
    AdultView.prototype.setSelect2 = function (childId) {
        var childIndex = Api.adultVoApi.getAdultMarryIndexVoById(childId);
        if (this._adult2ScrollItem) {
            if (this._adult2ScrollItem.getChildByName("select2")) {
                this._adult2ScrollItem.removeChild(this._adult2ScrollItem.getChildByName("select2"));
                var baseBitmap = this._adult2ScrollItem.getChildByName("select2");
                baseBitmap = null;
            }
        }
        this._adult2ScrollItem = this._scrollList2.getItemByIndex(childIndex);
        var bg2Index = this._adult2ScrollItem.getChildIndex(this._adult2ScrollItem.getChildByName("bg2"));
        var itemBg2 = BaseBitmap.create("public_9_bg29");
        itemBg2.width = 600;
        itemBg2.height = 130;
        // itemBg2.width = 500;
        // itemBg2.height = 50;
        // itemBg2.x =  4;
        // itemBg2.y = 14;
        itemBg2.x = this._adult2ScrollItem.width / 2 - itemBg2.width / 2;
        itemBg2.y = this._adult2ScrollItem.height / 2 - itemBg2.height / 2 - 3;
        itemBg2.name = "select2";
        this._adult2ScrollItem.addChildAt(itemBg2, 3);
        // this._adult2ScrollItem.addChild(itemBg2);
    };
    //刷新子嗣数据
    AdultView.prototype.updChildAttData = function (childInfoVo) {
        var adultList = Api.adultVoApi.getAdultVoList();
        if (adultList.length == 0) {
            if (this._qualityBB) {
                this._qualityBB.visible = this._qualityBg.visible = this._childContainer.visible = false;
            }
            this._scrollList.refreshData(adultList);
        }
        this._goChildBtn.visible = adultList.length == 0;
        if (childInfoVo == null) {
            return;
        }
        this._childProCfg = [
            {
                txt: this.getProStringWithProId(1)
            },
            {
                txt: this.getProStringWithProId(2)
            },
            {
                txt: this.getProStringWithProId(3)
            },
            {
                txt: this.getProStringWithProId(4)
            },
            {
                txt: this.getProStringWithProId(5)
            },
            {
                txt: this.getProStringWithProId(6)
            },
        ];
        this._child_Icon.setload(Api.adultVoApi.getAdultPic(childInfoVo.id));
        var childCfg1 = GameConfig.config.childCfg[childInfoVo.quality.toString()];
        this._qualityBB.setload("adult_q" + (this._adultInfoVo.aquality || 1));
        if (childInfoVo.level == childCfg1.lv) {
            this._child_wordbg.visible = false;
            // this._child_wordbgCor.visible = false;
            this._childWordsText.visible = false;
        }
        else {
            this._childWordsText.text = Api.adultVoApi.getAdultWord(childInfoVo.id);
            this._child_wordbg.visible = true;
            // this._child_wordbgCor.visible = true;
            this._childWordsText.visible = true;
        }
        var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(childInfoVo.motherId);
        this._motherText.text = LanguageManager.getlocal("childMother", [wifeInfoVo.name]);
        this._intimacyText.text = LanguageManager.getlocal("childIntimacy", [wifeInfoVo.intimacy.toString()]);
        var childName = childInfoVo.name;
        if (childName == "") {
            childName = LanguageManager.getlocal("childNeedName");
        }
        else {
            childName = "<font u ='true'>" + childInfoVo.name + "</font>";
        }
        this._childNameText.text = childName;
        this._childNameText.x = this._child_infobg.x + this._child_infobg.width / 2 - this._childNameText.width / 2;
        // if(PlatformManager.checkIsViSp()){
        // 	this._childNameText.y = this._child_infobg.y + 24;
        // }
        var childCfg = GameConfig.config.childCfg[childInfoVo.quality.toString()];
        //刷新等级
        var levelStr = LanguageManager.getlocal("servant_infoLv") + childInfoVo.level + "/" + childCfg.lv;
        if (childInfoVo.level >= childCfg.lv) {
            levelStr = LanguageManager.getlocal("child_levelMax");
        }
        for (var index = 0; index < this._childProCfg.length; index++) {
            var element = this._childProCfg[index];
            var proTxt = this._proTxtList[index];
            proTxt.text = element.txt;
            proTxt.x = this._child_infobg.x + this._child_infobg.width - proTxt.width - 20;
        }
        //刷新按钮
        if (Api.adultVoApi.getAdultIsInMarry(this._adultInfoVo.id)) {
            //取消提亲
            this._childUpdBtn.setText("adultCancelMarry");
        }
        else {
            var btnStr = "adultMarry";
            this._childUpdBtn.setText("adultMarry");
            if (this._childUpdBtn) {
                this._childUpdBtn.visible = true;
            }
            else {
            }
            this._childUpdBtn.setText(btnStr);
        }
        //刷新拜访按钮
        // this._childNameBmp.setRes(Api.adultVoApi.notInVisit(this._adultInfoVo.id) ? 'adultbffont' : 'adultqxbfang');
        if (this._goVisitBtn) {
            if (!Api.adultVoApi.notInVisit(this._adultInfoVo.id)) {
                this._goVisitBtn.setText('adultvisit_cancel');
            }
            else if (Api.adultVoApi.isVisited(this._adultInfoVo.id)) {
                this._goVisitBtn.setText('adultvisit_visited');
            }
            else {
                this._goVisitBtn.setText('adultchoosevisitviewTitle');
            }
            var itemCount = Api.itemVoApi.getItemNumInfoVoById(1411);
            var info = Api.adultVoApi.getAdultInfoVoById(this._adultInfoVo.id);
            var itemUseCount = Api.adultVoApi.getVisitUseByQuality(info.aquality);
            if (Api.adultVoApi.isSadunCanVisit(this._adultInfoVo.id) && itemCount >= itemUseCount) {
                App.CommonUtil.addIconToBDOC(this._goVisitBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._goVisitBtn);
            }
        }
    };
    //刷新已婚子嗣数据
    AdultView.prototype.updMarryChildAttData = function (adultMarryInfo) {
        if (Api.adultVoApi.getAdultMarryNum() <= 0) {
            this._childContainer2.visible = false;
            return;
        }
        if (!adultMarryInfo) {
            return;
        }
        this._childContainer2.visible = true;
        this._otherNameText.text = LanguageManager.getlocal("adultOtherName") + adultMarryInfo.funame;
        this._marryBuffText.text = LanguageManager.getlocal("adultMarryBuff") + adultMarryInfo.ftotal;
        this._marryTimeText.text = App.DateUtil.getFormatBySecond(adultMarryInfo.mts, 2);
        var myIcon = "adult_boy";
        var otherIcon = "adult_girl";
        if (adultMarryInfo.sex == 2) {
            myIcon = "adult_girl";
            otherIcon = "adult_boy";
            this._marryChild_Icon.skewY = 180;
            this._marryChild_Icon2.skewY = 180;
        }
        else {
            this._marryChild_Icon.skewY = 0;
            this._marryChild_Icon2.skewY = 0;
        }
        if (Api.switchVoApi.checkOpenAdultImage() && adultMarryInfo.aquality != 7) {
            myIcon = "adult_" + adultMarryInfo.sex + "_" + adultMarryInfo.aquality;
            otherIcon = "adult_" + (3 - adultMarryInfo.sex) + "_" + adultMarryInfo.aquality;
        }
        // this._marryChild_Icon.texture = ResourceManager.getRes(myIcon);
        // this._marryChild_Icon2.texture = ResourceManager.getRes(otherIcon);
        this._marryChild_Icon.setload(myIcon);
        this._marryChild_Icon2.setload(otherIcon);
    };
    AdultView.prototype.changeNameHandler = function () {
        if (this._adultInfoVo.name != "") {
            ViewController.getInstance().openView(ViewConst.POPUP.NAMEPOPUPVIEW, { type: 3, childId: this._adultInfoVo.id, confirmCallback: this.reNameCallBack, handler: this });
        }
    };
    //取消联姻
    AdultView.prototype.cancelAduHandler = function () {
        var rewardStr = "";
        if (this._adultInfoVo.pro[1] == 1) {
            rewardStr = Config.AdultCfg.getItemCfgById(this._adultInfoVo.aquality).needGem * 0.8 + LanguageManager.getlocal("gemName");
        }
        else if (this._adultInfoVo.pro[1] == 2) {
            var costItemId = Config.AdultCfg.getItemCfgById(this._adultInfoVo.aquality).needItem;
            var itemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));
            var itemListCfg = Config.ItemCfg.getItemCfgById;
            var itemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
            rewardStr = itemCfg.name;
        }
        // let rewardStr = GameData.getRewardsStr(Api.adultVoApi._refuseData);
        var msg = LanguageManager.getlocal("adultMarryCancalMsg", [rewardStr]);
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "adultCancelMarry",
            msg: msg,
            callback: this.doCancel,
            handler: this,
            needCancel: true
        });
    };
    AdultView.prototype.nameBtnClickHandler = function () {
        var _this = this;
        //ADULTCHOOSEVISITVIEW
        //子嗣是否正在拜访
        if (!Api.adultVoApi.getAdultIsInMarry(this._adultInfoVo.id)) {
            if (Api.adultVoApi.isVisited(this._adultInfoVo.id)) {
                App.CommonUtil.showTip(LanguageManager.getlocal('adultisvisited'));
                return;
            }
            if (Api.adultVoApi.isChildCanVisit(this._adultInfoVo.id)) {
                if (!Api.adultVoApi.isCanSendVisit()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal('adultsendmax', [Config.SadunCfg.maxSend.toString()]));
                    return;
                }
                ViewController.getInstance().openView(ViewConst.COMMON.ADULTCHOOSEVISITVIEW, {
                    childId: this._adultInfoVo.id,
                    confirmCallback: this.reNameCallBack,
                    handler: this
                });
            }
            else if (!Api.adultVoApi.notInVisit(this._adultInfoVo.id)) {
                //弹窗确认
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    title: "itemUseConstPopupViewTitle",
                    msg: LanguageManager.getlocal('adultconfirmcancel', [this._adultInfoVo.name, Api.adultVoApi.getSadunInfoByUid(Api.adultVoApi.getChildVisitTarget(this._adultInfoVo.id)).name]),
                    callback: function () {
                        if (Api.adultVoApi.getChildVisitTarget(_this._adultInfoVo.id)) {
                            _this.request(NetRequestConst.REQUEST_SADUN_CANCELVISIT, {
                                childId: _this._adultInfoVo.id,
                                fuid: Api.adultVoApi.getChildVisitTarget(_this._adultInfoVo.id)
                            });
                        }
                        else if (_this._adultInfoVo.visit) {
                            App.CommonUtil.showTip(LanguageManager.getlocal('adultcancelreceive', [Api.adultVoApi.getSadunInfoByUid(_this._adultInfoVo.visit).name, _this._adultInfoVo.name]));
                        }
                        else {
                            App.CommonUtil.showTip(LanguageManager.getlocal('adultcancelrefuse', ['']));
                        }
                    },
                    handler: this,
                    needCancel: true
                });
                //取消拜访
            }
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal('adultisinmarry'));
        }
    };
    AdultView.prototype.doCancel = function () {
        this.request(NetRequestConst.REQUEST_RADULT_CANCELPROPOSE, { childId: this._adultInfoVo.id });
    };
    //起名字回调
    //全服联姻、联姻后请求回调、拜访回调
    AdultView.prototype.reNameCallBack = function (param) {
        this.refreshItem();
        this._adultInfoVo = Api.adultVoApi.getAdultInfoVoById(this._adultInfoVo.id);
        this._adultInfoVoList = Api.adultVoApi.getAdultVoList();
        this.updChildAttData(this._adultInfoVo);
        this.setSelect(this._adultInfoVo.id);
        if (param && param == 'visitSuccess') {
            ViewController.getInstance().openView(ViewConst.BASE.ADULTVISITSUCCESSVIEW, {
                name: Api.adultVoApi.getSadunInfoByUid(Api.adultVoApi.getVisitId()).name,
                type: 'visitSuccess'
            });
        }
    };
    //恢复活力
    AdultView.prototype.useItemConfirmCallbackHandler = function () {
        this.request(NetRequestConst.REQUEST_CHILD_RECOVER, { childId: this._adultInfoVo.id });
    };
    AdultView.prototype.updBtnClickHandler = function () {
        if (Api.adultVoApi.notInVisit(this._adultInfoVo.id)) {
            if (Api.adultVoApi.getAdultIsInMarry(this._adultInfoVo.id)) {
                //取消联姻
                var rewardStr = "";
                if (this._adultInfoVo.pro[1] == 1) {
                    rewardStr = Config.AdultCfg.getItemCfgById(this._adultInfoVo.aquality).needGem * 0.8 + LanguageManager.getlocal("gemName");
                }
                else if (this._adultInfoVo.pro[1] == 2) {
                    var costItemId = Config.AdultCfg.getItemCfgById(this._adultInfoVo.aquality).needItem;
                    var itemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));
                    var itemListCfg = Config.ItemCfg.getItemCfgById;
                    var itemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
                    rewardStr = itemCfg.name;
                }
                // let rewardStr = GameData.getRewardsStr(Api.adultVoApi._refuseData);
                var msg = LanguageManager.getlocal("adultMarryCancalMsg", [rewardStr]);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    title: "adultCancelMarry",
                    msg: msg,
                    callback: this.doCancel,
                    handler: this,
                    needCancel: true
                });
            }
            else {
                ViewController.getInstance().openView(ViewConst.COMMON.ADULTMARRYVIEW, { childId: this._adultInfoVo.id, confirmCallback: this.reNameCallBack, confirmCallback2: this.requestMarryCallback, handler: this });
            }
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal('adultisinvisit'));
        }
    };
    AdultView.prototype.doGuide = function () {
        this.updBtnClickHandler();
    };
    AdultView.prototype.requestMarryCallback = function () {
        var adultList = Api.adultVoApi.getAdultVoList();
        this._scrollList.refreshData(adultList);
        if (Api.adultVoApi.getAdultNum() > 0) {
            this._adultInfoVo = Api.adultVoApi.getAdultVoList()[0];
            this.updChildAttData(this._adultInfoVo);
            this._childContainer.visible = true;
            this.setSelect(this._adultInfoVo.id);
        }
        else {
            this._childContainer.visible = false;
        }
        var adultMarryList = Api.adultVoApi.getAdultMarryVoList();
        this._scrollList2.refreshData(adultMarryList);
        if (Api.adultVoApi.getAdultMarryNum() > 0) {
            this._adultMarryInfoVo = Api.adultVoApi.getAdultMarryVoList()[0];
            this.updMarryChildAttData(this._adultMarryInfoVo);
            this._childContainer2.visible = false;
            this.setSelect2(this._adultMarryInfoVo.id);
            // this._childContainer.visible = true;
        }
        else {
            // this._childContainer2.visible = false;
        }
    };
    //请求回调
    AdultView.prototype.receiveData = function (data) {
        if (!data.data.data) {
            return;
        }
        if (this._adultInfoVo) {
            this._adultInfoVo = Api.adultVoApi.getAdultInfoVoById(this._adultInfoVo.id);
        }
        if (data.data.cmd == NetRequestConst.REQUEST_RADULT_CANCELPROPOSE) {
            this.updChildAttData(this._adultInfoVo);
            this.refreshItem();
            if (data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
            }
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_CHILD_RECOVER) {
            this.updChildAttData(this._adultInfoVo);
            this.refreshItem();
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_RADULT_GETADULTINFO) {
            // this._marryData = ["c1","c16","c13"];
            // this.playMarry();		
            this.updChildAttData(this._adultInfoVo);
            this.refreshItem();
            if (this._scrollList2) {
                var adultMarryList = Api.adultVoApi.getAdultMarryVoList();
                this._scrollList2.refreshData(adultMarryList);
            }
            if (data.data.data.rewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.ADULTMARRYENDFAILRETURNPOPUPVIEW, { rewards: data.data.data.rewards });
            }
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_RADULT_GETPROPOSEE) {
            if (data.data.data.minfo) {
                this._achRedDotSp.visible = true;
            }
            else {
                this._achRedDotSp.visible = false;
            }
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_SADUN_GETINFO) {
            Api.adultVoApi.init_sadun_data(data.data.data);
            this._achRedDotSp2.visible = Api.adultVoApi.getVisitNum() > 0 && Api.switchVoApi.checkopenSadun();
            var itemCount = Api.itemVoApi.getItemNumInfoVoById(1411);
            if (this._adultInfoVo) {
                var info = Api.adultVoApi.getAdultInfoVoById(this._adultInfoVo.id);
                var itemUseCount = Api.adultVoApi.getVisitUseByQuality(info.aquality);
                if (this._goVisitBtn) {
                    if (itemCount >= itemUseCount && this._adultInfoVo && this._adultInfoVo.id && Api.adultVoApi.isSadunCanVisit(this._adultInfoVo.id)) {
                        App.CommonUtil.addIconToBDOC(this._goVisitBtn);
                    }
                    else {
                        App.CommonUtil.removeIconFromBDOC(this._goVisitBtn);
                    }
                }
            }
            if (this.initflag) {
                this.show_last_msg();
                this.request(NetRequestConst.REQUEST_RADULT_GETADULTINFO, {});
                this.initflag = false;
            }
        }
        else if ((data.data.cmd == NetRequestConst.REQUEST_SADUN_READCALLBACK)) {
            Api.adultVoApi.clearReceiveData();
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_ADULT_GETMINFO) {
            var info = data.data.data.minfo;
            if (Object.keys(info).length) {
                Api.adultVoApi.formatMinfo(data.data.data);
                this._scrollList2.visible = true;
                this._childContainer2.visible = true;
                var adultMarryList = Api.adultVoApi.getAdultMarryVoList();
                this._scrollList2.refreshData(adultMarryList);
                this._adultMarryInfoVo = Api.adultVoApi.getAdultMarryVoList()[0];
                this.updMarryChildAttData(this._adultMarryInfoVo);
                this.setSelect2(this._adultMarryInfoVo.id);
                this._scrollList2.scrollTop = 0;
            }
            else {
                this._index = Math.max(1, this._index - 50);
            }
        }
    };
    AdultView.prototype.playMarry = function () {
        var _this = this;
        if (this._marryIndex <= this._marryData.length - 1) {
            var childId = this._marryData[this._marryIndex];
            var adultInfoVo = Api.adultVoApi.getAdultMarryInfoVoById(childId);
            if (adultInfoVo) {
                ViewController.getInstance().openView(ViewConst.BASE.ADULTMARRYSUCCESSVIEW, { childId: childId, confirmCallback: this.playMarry, handler: this });
                this._marryIndex++;
            }
        }
        else {
            if (Api.adultVoApi._refuseData && Api.adultVoApi._refuseData != "") {
                var rewardStr = GameData.getRewardsStr(Api.adultVoApi._refuseData);
                var msg = LanguageManager.getlocal("adultMarryMsg", [rewardStr]);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    title: "adultMarryRefuse",
                    msg: msg,
                    callback: function () {
                        if (Api.adultVoApi.getReceiveData().length > 0) {
                            _this._receiveData = Api.adultVoApi.getReceiveData();
                            _this.playReceive();
                        }
                    },
                    handler: this
                });
            }
            else {
                if (Api.adultVoApi.getReceiveData().length > 0) {
                    this._receiveData = Api.adultVoApi.getReceiveData();
                    this.playReceive();
                }
            }
        }
    };
    AdultView.prototype.show_last_msg = function () {
        var _this = this;
        if (Api.adultVoApi._marryList.length > 0) {
            this._marryData = Api.adultVoApi._marryList;
            this.playMarry();
        }
        else {
            if (Api.adultVoApi._refuseData && Api.adultVoApi._refuseData != "") {
                var rewardStr = GameData.getRewardsStr(Api.adultVoApi._refuseData);
                var msg = LanguageManager.getlocal("adultMarryMsg", [rewardStr]);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    title: "adultMarryRefuse",
                    msg: msg,
                    callback: function () {
                        if (Api.adultVoApi.getReceiveData().length > 0) {
                            _this._receiveData = Api.adultVoApi.getReceiveData();
                            _this.playReceive();
                        }
                    },
                    handler: this
                });
            }
            else {
                if (Api.adultVoApi.getReceiveData().length > 0) {
                    this._receiveData = Api.adultVoApi.getReceiveData();
                    this.playReceive();
                }
                else {
                    if (Api.adultVoApi.getSadunRefuse() && Api.adultVoApi.getSadunRefuse() != "") {
                        var rewardStr = GameData.getRewardsStr(Api.adultVoApi.getSadunRefuse());
                        var msg = LanguageManager.getlocal("adultReceiveMsg", [rewardStr]);
                        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                            title: "adultVisitefuse",
                            msg: msg,
                            callback: function () {
                                var rewards = GameData.formatRewardItem(Api.adultVoApi.getSadunRefuse());
                                if (rewards && rewards.length > 0) {
                                    App.CommonUtil.playRewardFlyAction(rewards);
                                }
                                _this.request(NetRequestConst.REQUEST_SADUN_READCALLBACK, null);
                                Api.adultVoApi.clearSadunRefuse();
                            },
                            handler: this
                        });
                    }
                    else {
                        this.request(NetRequestConst.REQUEST_SADUN_READCALLBACK, null);
                        Api.adultVoApi.clearSadunRefuse();
                    }
                }
            }
        }
    };
    AdultView.prototype.playReceive = function () {
        var _this = this;
        if (this._receiveIndex <= this._receiveData.length - 1) {
            var unit = this._receiveData[this._receiveIndex];
            //Api.adultVoApi.getSadunInfoByUid(Api.adultVoApi.getVisitId()).name
            this._receiveIndex++;
            var infoVo = Api.adultVoApi.getAdultInfoVoById(unit.childid);
            if (!infoVo) {
                this.playReceive();
                return;
            }
            ViewController.getInstance().openView(ViewConst.BASE.ADULTVISITSUCCESSVIEW, {
                wifename: Config.WifeCfg.getWifeCfgById(unit.visitwife).name,
                childname: infoVo ? infoVo.name : "",
                attr: infoVo ? (infoVo.attrVo.attTotal - unit.oldattr) : 0,
                confirmCallback: this.playReceive,
                handler: this,
                type: 'receiveSuccess',
                isreceived: true
            });
            // let dis = Api.adultVoApi.getAdultInfoVoById(unit.childid).attrVo.attTotal - unit.oldattr;
            // let pos = egret.Point.create(320,GameConfig.stageHeigth/2);
            // App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("rankpower")+"+"+dis}],pos);
            // let powerFly = new PowerFly();
            // powerFly.init(dis);
            // LayerManager.msgLayer.addChild(powerFly);
        }
        else {
            if (Api.adultVoApi.getSadunRefuse() && Api.adultVoApi.getSadunRefuse() != "") {
                var rewardStr = GameData.getRewardsStr(Api.adultVoApi.getSadunRefuse());
                var msg = LanguageManager.getlocal("adultReceiveMsg", [rewardStr]);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    title: "adultVisitefuse",
                    msg: msg,
                    callback: function () {
                        var rewards = GameData.formatRewardItem(Api.adultVoApi.getSadunRefuse());
                        if (rewards && rewards.length > 0) {
                            App.CommonUtil.playRewardFlyAction(rewards);
                        }
                        _this.request(NetRequestConst.REQUEST_SADUN_READCALLBACK, null);
                        Api.adultVoApi.clearSadunRefuse();
                    },
                    handler: this
                });
            }
            else {
                this.request(NetRequestConst.REQUEST_SADUN_READCALLBACK, null);
                Api.adultVoApi.clearSadunRefuse();
            }
        }
    };
    //结婚成功刷新列表
    AdultView.prototype.doRefresh = function () {
        var adultList = Api.adultVoApi.getAdultVoList();
        this._adultInfoVo = Api.adultVoApi.getAdultVoList()[0];
        this.updChildAttData(this._adultInfoVo);
        this._scrollList.refreshData(adultList);
        var adultMarryList = Api.adultVoApi.getAdultMarryVoList();
        this._scrollList2.refreshData(adultMarryList);
        if (Api.adultVoApi.getAdultMarryNum() > 0) {
            this._adultMarryInfoVo = Api.adultVoApi.getAdultMarryVoList()[0];
            this.updMarryChildAttData(this._adultMarryInfoVo);
            this.setSelect2(this._adultMarryInfoVo.id);
        }
        this._childContainer2.visible = false;
        this._scrollList2.visible = false;
        if (this._adultInfoVo) {
            this.setSelect(this._adultInfoVo.id);
        }
    };
    //刷新列表属性
    AdultView.prototype.refreshItem = function () {
        if (this._adultInfoVo == null) {
            return;
        }
        var index = Api.adultVoApi.getAdultIndexVoById(this._adultInfoVo.id);
        var childScrollItem = this._scrollList.getItemByIndex(index);
        if (!childScrollItem) {
            return;
        }
        childScrollItem.refreshData(index);
    };
    AdultView.prototype.getProStringWithProId = function (id) {
        if (id == 1) {
            // let childCfg = GameConfig.config.childCfg[this._adultInfoVo.quality.toString()];
            // let levelStr = LanguageManager.getlocal("servant_infoLv") + this._adultInfoVo.level + "/" + childCfg.lv
            var qualityStr = LanguageManager.getlocal("adult_quality" + this._adultInfoVo.aquality);
            return qualityStr;
        }
        if (id == 2) {
            return this._adultInfoVo.attrVo.attTotal.toString();
        }
        if (id == 3) {
            return this._adultInfoVo.attrVo.forceTotal.toString();
        }
        if (id == 4) {
            return this._adultInfoVo.attrVo.brainsTotal.toString();
        }
        if (id == 5) {
            return this._adultInfoVo.attrVo.politicsTotal.toString();
        }
        if (id == 6) {
            return this._adultInfoVo.attrVo.charmTotal.toString();
        }
        return "";
    };
    AdultView.prototype.cancelVisitCallback = function (evt) {
        var view = this;
        var data = evt.data.data;
        if (data.ret >= 0) {
            if (data.data.sadunstat) {
                var str = '';
                switch (data.data.sadunstat) {
                    case 'agree':
                        str = LanguageManager.getlocal('adultcancelreceive', [Api.adultVoApi.getSadunInfoByUid(Api.adultVoApi.getChildVisitTarget(this._adultInfoVo.id)).name, this._adultInfoVo.name]);
                        break;
                    case 'refuse':
                        str = LanguageManager.getlocal('adultcancelrefuse', [Api.adultVoApi.getSadunInfoByUid(Api.adultVoApi.getChildVisitTarget(this._adultInfoVo.id)).name]);
                        break;
                    case 'overtime':
                        str = LanguageManager.getlocal('adultcancelsuccess');
                        break;
                    default:
                        str = LanguageManager.getlocal('adultcancelsuccess');
                        break;
                }
                App.CommonUtil.showTip(str);
                this.request(NetRequestConst.REQUEST_SADUN_GETINFO, null);
            }
            else {
                view.refreshSadun();
                App.CommonUtil.showTip(LanguageManager.getlocal('adultcancelsuccess'));
            }
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal('adultcancelrefuse', [Api.adultVoApi.getSadunInfoByUid(Api.adultVoApi.getChildVisitTarget(this._adultInfoVo.id)).name]));
            this.request(NetRequestConst.REQUEST_SADUN_GETINFO, null);
        }
        var rewards = data.data.refuse;
        if (rewards && rewards.length > 0) {
            var rList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rList);
        }
    };
    AdultView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "childview_pic_1", "servant_bottombg",
            "childview_boyicon", "childview_girlicon",
            "adult_bg", "adult_boy",
            "adult_girl", "adult_lowbg", "adult_namebg",
            "playerview_pro1",
            "playerview_pro2", "servant_1", "servant_wenzibutiao",
            "playerview_pro4",
            "playerview_pro5", "playerview_pro14", "playerview_pro15", "servant_dropBtn_down",
            "progress_type1_yellow2", "progress_type3_bg", "servant_middlebg",
            "adult_listbg2", "adult_listbg3", "servant_yeqiankuang",
        ]);
    };
    AdultView.prototype.getRuleInfo = function () {
        return "adult_description";
    };
    AdultView.prototype.freshAdult = function () {
        // let adultList = Api.adultVoApi.getAdultVoList();
        if (this._adultInfoVo) {
            var id = this._adultInfoVo.id;
            this._adultInfoVo = Api.adultVoApi.getAdultInfoVoById(id);
            if (this._adultInfoVo) {
                this.updChildAttData(this._adultInfoVo);
                var adultList = Api.adultVoApi.getAdultVoList();
                this._scrollList.refreshData(adultList);
                this.setSelect(id);
            }
            else {
                this.doRefresh();
            }
        }
        else {
            this.doRefresh();
        }
    };
    AdultView.prototype.dispose = function () {
        Api.mainTaskVoApi.hideGuide();
        // 未婚滑动列表
        this._scrollList = null;
        // 已婚滑动列表
        this._scrollList2 = null;
        // 列表
        this._adultInfoVoList = null;
        //孩子母亲
        this._motherText = null;
        //亲密度
        this._intimacyText = null;
        //亲密度描述
        // this._intimacyDescText = null;
        //孩子说的话
        this._childWordsText = null;
        //孩m名字
        this._childNameText = null;
        //孩子图片
        this._child_Icon = null;
        //孩子vo
        this._adultInfoVo = null;
        //联姻按钮
        this._childUpdBtn = null;
        //取消联姻按钮
        this._childNameBtn = null;
        //孩子vo
        this._adultMarryInfoVo = null;
        //亲家名字
        this._otherNameText = null;
        //联姻加成
        this._marryBuffText = null;
        //联姻时间
        this._marryTimeText = null;
        //孩子说的话
        this._marryWordsText = null;
        //孩子图片
        this._marryChild_Icon = null;
        //孩子配偶图片
        this._marryChild_Icon2 = null;
        this._curTabIdx = 0;
        // this._nameBg: BaseBitmap;
        // this._attBg = null;
        this._child_infobg = null;
        //活力恢复时间
        this._vigouTimeText = null;
        this._childContainer = null;
        //已婚子嗣
        this._childContainer2 = null;
        this._childId = null;
        this._childInfoObj = null;
        this._proTxtList = null;
        this._childProCfg = null;
        this._curLevel = null;
        this._child_wordbg = null;
        // this._child_wordbgCor = null;
        this._marryChild_wordbg = null;
        // this._marryChild_wordbgCor = null;
        this._adultScrollItem = null;
        this._adult2ScrollItem = null;
        this._achRedDotSp = null;
        this._achRedDotSp2 = null;
        if (this._childNameText) {
            this._childNameText.removeTouchTap();
        }
        this._marryIndex = 0;
        this._receiveIndex = 0;
        this._marryData = null;
        this._goChildBtn = null;
        this._qualityBB = null;
        this._qualityBg = null;
        if (this._shareBtn) {
            App.DisplayUtil.changeToNormal(this._shareBtn);
        }
        this._shareBtn = null;
        this._shareTime = 0;
        this._canShare = true;
        this._goVisitBtn = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_CANCELVISIT), this.cancelVisitCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_REFRESHCHILDMARRY, this.doRefresh, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SUDANFRESH, this.refreshSadun, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULTFRESH, this.freshAdult, this);
        this._index = 1;
        _super.prototype.dispose.call(this);
    };
    return AdultView;
}(CommonView));
__reflect(AdultView.prototype, "AdultView");