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
 * 标签1 册封加成
 * author qianjun
 */
var WifeTalentViewTab1 = (function (_super) {
    __extends(WifeTalentViewTab1, _super);
    function WifeTalentViewTab1() {
        var _this = _super.call(this) || this;
        // 滑动列表
        _this.bottomBg = null;
        //////////////////////////////////
        //才情总览按钮
        _this._allTalentBtn = null;
        //去册封按钮
        _this._plusBtn = null;
        //册封加成描述
        _this._plusDesc = null;
        _this._rankText = null;
        _this._nameText = null;
        _this._scoreText = null;
        _this._descText = null;
        ///////////////////////////////////
        _this._plusDesc2 = null;
        _this._acDesc = null;
        _this._rankText2 = null;
        _this._nameText2 = null;
        _this._scoreText2 = null;
        _this._descText2 = null;
        //去提升按钮
        _this._plusBtn2 = null;
        _this._scrollList1 = null;
        _this._scrollList2 = null;
        _this._acVo = null;
        _this._isHaveBuff = null;
        _this.initView();
        return _this;
    }
    // protected getRequestData():{requestType:string,requestData:any}
    // {
    // 	return {requestType:NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL,requestData:{}};
    // }
    // protected request(requestType:string,requestData:any):void
    // {
    // 	console.log("refreshed----");
    // 	this.initView();
    // }
    WifeTalentViewTab1.prototype.tick = function () {
        if (!this._acVo) {
            this._acVo = this.getAcVo();
        }
        if (!this._acVo) {
            return;
        }
        var t = this._acVo.et - GameData.serverTime - 86400 * 1;
        var isHaveBuff = false;
        if (t > 0) {
            isHaveBuff = true;
        }
        else {
            isHaveBuff = false;
        }
        if (this._isHaveBuff != null && isHaveBuff != this._isHaveBuff) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeTalentUpPopupViewAcOver"));
            NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL, {});
            // this.hide();
        }
        this._isHaveBuff = isHaveBuff;
    };
    WifeTalentViewTab1.prototype.checkHaveBuff = function () {
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
    WifeTalentViewTab1.prototype.getAcVo = function () {
        var modelList = Api.acVoApi.getRanActives();
        for (var i in modelList) {
            var unit = modelList[i];
            if (unit.atype == "22") {
                var t = unit.et - GameData.serverTime - 86400 * 1;
                if (t > 0) {
                    return unit;
                }
            }
        }
        return null;
    };
    WifeTalentViewTab1.prototype.getCfg = function () {
        return Config.WifebattleCfg;
    };
    WifeTalentViewTab1.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acsweetgift_make_infobg-1", "progress3", "progress3_bg", "wifeview_artistryicon",
        ]);
    };
    WifeTalentViewTab1.prototype.modelRefresh = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL, this.modelRefresh, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL, this.hide, this);
        // this._scrollList2 = ComponentManager.getScrollList(WifeTalentPlusPopupScrollItem2, infoList2, scroRect);
        if (this._scrollList2) {
            var infoList2 = [];
            if (Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr) {
                infoList2 = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr;
            }
            infoList2 = infoList2 ? infoList2 : [];
            this._scrollList2.refreshData(infoList2);
        }
    };
    WifeTalentViewTab1.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL, this.modelRefresh, this);
        NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL, {});
        var scrollListBgRect = egret.Rectangle.create();
        scrollListBgRect.setTo(0, 0, 614, 435);
        var view = this;
        var add = 0;
        if (Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd) {
            add = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
        }
        var statusadd = add ? add : 0; //Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
        var titleBg = BaseBitmap.create("wifetalenttopbg");
        titleBg.width = scrollListBgRect.width; //538
        titleBg.scaleY = 150 / 118;
        titleBg.x = GameConfig.stageWidth / 2 - titleBg.width / 2;
        titleBg.y = 15;
        this.addChild(titleBg);
        this["titleBg1"] = titleBg;
        var plusDesc = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewCurPlus1", [(statusadd).toFixed(0)]), 20, TextFieldConst.COLOR_WARN_YELLOW2);
        plusDesc.x = titleBg.x + 35;
        plusDesc.y = titleBg.y + 45;
        this._plusDesc = plusDesc;
        this.addChild(plusDesc);
        var plusDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewTip"), 20, TextFieldConst.COLOR_BROWN);
        plusDesc2.lineSpacing = 8;
        plusDesc2.x = plusDesc.x;
        plusDesc2.y = plusDesc.y + plusDesc.textHeight + 8;
        this.addChild(plusDesc2);
        this._allTalentBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "wifeTalentPlusPopupViewBtn", this.goStatus, this);
        this._allTalentBtn.x = titleBg.x + titleBg.width - 40 - this._allTalentBtn.width;
        this._allTalentBtn.y = titleBg.y + 60;
        this.addChild(this._allTalentBtn);
        var model = Api.wifebattleVoApi.wifebattleVo;
        var allTalentValue = model.info.totaltalent;
        var actadd = 0;
        if (model.info.tmpattr && model.info.tmpattr.actadd) {
            actadd = model.info.tmpattr.actadd;
        }
        var contentBg = BaseBitmap.create("public_9_bg32");
        contentBg.width = scrollListBgRect.width; //538
        contentBg.height = GameConfig.stageHeigth - 170 - titleBg.height * titleBg.scaleY - 23; //666
        contentBg.x = GameConfig.stageWidth / 2 - contentBg.width / 2; //view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
        contentBg.y = titleBg.y + titleBg.height * titleBg.scaleY + 8;
        view.addChild(contentBg);
        var title = BaseBitmap.create("qingyuanitemtitlebg");
        title.width = contentBg.width - 20;
        title.x = contentBg.x + contentBg.width / 2 - title.width / 2;
        title.y = contentBg.y + 10;
        this.addChild(title);
        var scroRect = new egret.Rectangle(0, 0, title.width, contentBg.height - 20 - title.height);
        var infoList = [];
        var wifestatusList = Config.WifestatusCfg.getWifestatusList();
        var maxNum = 0;
        for (var i = 0; i < wifestatusList.length; i++) {
            if (wifestatusList[i].maxNum) {
                maxNum += wifestatusList[i].maxNum;
            }
        }
        var index = 0;
        for (var j = 1; j <= maxNum; j++) {
            var obj = null;
            var effect = Config.WifebattleCfg.talentStatusBuff * j;
            if (effect <= statusadd) {
                if (effect == statusadd) {
                    index = j - 1;
                }
                obj = { level: j, num: j, effect: effect, isused: true };
            }
            else {
                obj = { level: j, num: j, effect: effect, isused: false };
            }
            infoList.push(obj);
        }
        this._scrollList1 = ComponentManager.getScrollList(WifeTalentPlusPopupScrollItem, infoList, scroRect);
        this._scrollList1.x = GameConfig.stageWidth / 2 - this._scrollList1.width / 2;
        this._scrollList1.y = title.y + title.height + 7;
        this.addChild(this._scrollList1);
        // if(this.checkHaveBuff()){
        // 	this._plusDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewAcDesc",[""+rankBuff]),20,TextFieldConst.COLOR_BROWN);
        // 	this._plusDesc2.width = 450;
        // 	this._plusDesc2.x = titleBg2.x + 35;
        // 	this._plusDesc2.y = titleBg2.y + 35;
        // 	this.addChild(this._plusDesc2);
        // 	let acTime = this.getAcVo().getAcLocalTime();
        // 	// this._acDesc = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewAcStr",[acTime]),20,0x46fe3c);
        // 	this._acDesc = ComponentManager.getTextField(acTime,20,TextFieldConst.COLOR_WARN_GREEN);
        // 	this._acDesc.width = 450;
        // 	this._acDesc.x = this._plusDesc2.x;
        // 	this._acDesc.y = this._plusDesc2.y + this._plusDesc2.height + 5;
        // 	this.addChild(this._acDesc);
        // 	let infoList2 = [];
        // 	if(Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr){
        // 		infoList2 = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr;
        // 	}
        // 	infoList2 = infoList2?infoList2:[];
        // 	this._scrollList2 = ComponentManager.getScrollList(WifeTalentPlusPopupScrollItem2, infoList2, scroRect);
        // 	this._scrollList2.x = this.viewBg.width/2 - this._scrollList2.width/2;
        // 	this._scrollList2.y = bg2.y + bg2.height + 5;
        // 	this.addChild(this._scrollList2);
        // }
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewLevel"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(100, title.y + title.height / 2 - rankText.height / 2);
        this.addChild(rankText);
        this._rankText = rankText;
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewNum"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(225, rankText.y);
        this.addChild(nameText);
        this._nameText = nameText;
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewEffect"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(430, rankText.y);
        this.addChild(scoreText);
        this._scoreText = scoreText;
        //--------------------
        // if(this.checkHaveBuff()){
        // 	let rankText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewLevel2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        // 	rankText2.setPosition(100 , bg1.y+bg1.height/2 - rankText2.height/2);
        // 	this.addChild(rankText2);
        // 	this._rankText2 = rankText2
        // 	let nameText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewNum2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        // 	nameText2.setPosition(225 , rankText2.y);
        // 	this.addChild(nameText2);
        // 	this._nameText2 = nameText2
        // 	let scoreText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewEffect2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        // 	scoreText2.setPosition(430 , rankText2.y);
        // 	this.addChild(scoreText2);
        // 	this._scoreText2 = scoreText2
        // 	let descText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewDesc2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
        // 	descText2.x = bottomBg.x + 25;
        // 	descText2.y = bottomBg.y + bottomBg.height/2 - descText2.height/2;
        // 	descText2.textAlign = egret.HorizontalAlign.CENTER;
        // 	this.addChild(descText2);
        // 	this._descText2 = descText2
        // 	let plusBtn2:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"wifeTalentPlusPopupViewBtn2",this.goPlusHandler,this);
        // 	plusBtn2.x = bottomBg.x + bottomBg.width - 20 - plusBtn2.width;
        // 	plusBtn2.y = bottomBg.y + bottomBg.height/2 - plusBtn2.height/2;
        // 	this.addChild(plusBtn2);
        // 	this._plusBtn2 = plusBtn2;
        // }
        this._scrollList1.setScrollTopByIndex(index);
    };
    WifeTalentViewTab1.prototype.goStatus = function () {
        var viewList = ViewController.getInstance().getView(ViewConst.COMMON.WIFESTATUSVIEW);
        if (viewList && viewList._isShow) {
            var WifeTalentView_1 = ViewController.getInstance().getView("WifeTalentView");
            if (WifeTalentView_1) {
                WifeTalentView_1.hide();
            }
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.WIFESTATUSVIEW);
            var WifeTalentView_2 = ViewController.getInstance().getView("WifeTalentView");
            if (WifeTalentView_2) {
                WifeTalentView_2.hide();
            }
            var wifebattle = ViewController.getInstance().getView(ViewConst.COMMON.WIFEBATTLEVIEW);
            if (wifebattle) {
                wifebattle.hide();
            }
        }
    };
    // protected goPlusHandler(){
    // 	if(!this.checkCanJoin()){
    // 		App.CommonUtil.showTip(LanguageManager.getlocal("wifeBattleUpLockDesc"));
    // 		return;
    // 	}
    // 	let viewList = ViewController.getInstance().getView(ViewConst.COMMON.WIFESTATUSVIEW);//hideAllView
    // 	if(viewList){
    // 	}
    // 	else{
    // 		ViewController.getInstance().openView(ViewConst.COMMON.WIFEALLTALENTVIEW);
    // 	}
    // 	//ViewController.getInstance().hideAllView();
    // 	// ViewController.getInstance().openView(ViewConst.COMMON.WIFEALLTALENTVIEW);
    // }
    //检测是否有红颜获得位分
    WifeTalentViewTab1.prototype.checkCanJoin = function () {
        var wifestatusVoObj = Api.wifestatusVoApi.getWifestatusVo().info;
        var unlockCount = Config.WifebattleCfg.unlock_wifeStar;
        var curCount = 0;
        for (var key in wifestatusVoObj) {
            for (var index = 0; index < wifestatusVoObj[key].length; index++) {
                curCount++;
                if (curCount >= unlockCount) {
                    return true;
                }
            }
        }
        return false;
    };
    // protected getRequestData():{requestType:string,requestData:any}
    // {
    // 	// ["activity.getdragonrank"] = "划龙舟活动排行榜",
    // 	// --返回 data.rankArr 所有人排行信息
    // 	// --返回 data.myrankArr 我的排行信息
    // 	return {requestType:NetRequestConst.REQUEST_ACTIVITY_DBRANK,requestData:{activeId : this.acTivityId}};
    // }
    WifeTalentViewTab1.prototype.showBuffLvUI = function (param) {
        ViewController.getInstance().openView(ViewConst.POPUP.WIFETALENTBUFFPOPUPVIEW, param);
    };
    WifeTalentViewTab1.prototype.getShowHeight = function () {
        return 830;
    };
    WifeTalentViewTab1.prototype.getTitleStr = function () {
        return 'wifeTalentPlusPopupViewTitle';
    };
    WifeTalentViewTab1.prototype.refreshList = function () {
    };
    WifeTalentViewTab1.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    WifeTalentViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL, this.modelRefresh, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL, this.hide, this);
        this.bottomBg = null;
        //////////////////////////////////
        //才情总览按钮
        this._allTalentBtn = null;
        //去册封按钮
        this._plusBtn = null;
        //册封加成描述
        this._plusDesc = null;
        this._rankText = null;
        this._nameText = null;
        this._scoreText = null;
        this._descText = null;
        ///////////////////////////////////
        this._plusDesc2 = null;
        this._acDesc = null;
        this._rankText2 = null;
        this._nameText2 = null;
        this._scoreText2 = null;
        this._descText2 = null;
        //去提升按钮
        this._plusBtn2 = null;
        this._scrollList1 = null;
        this._scrollList2 = null;
        this._acVo = null;
        this._isHaveBuff = null;
        _super.prototype.dispose.call(this);
    };
    return WifeTalentViewTab1;
}(ViewTab));
__reflect(WifeTalentViewTab1.prototype, "WifeTalentViewTab1");
//# sourceMappingURL=WifeTalentViewTab1.js.map