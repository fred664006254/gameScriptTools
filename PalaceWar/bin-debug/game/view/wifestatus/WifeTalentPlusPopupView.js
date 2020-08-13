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
 * 才情加成
 * author jiangliuyang
 */
var WifeTalentPlusPopupView = (function (_super) {
    __extends(WifeTalentPlusPopupView, _super);
    function WifeTalentPlusPopupView() {
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
    WifeTalentPlusPopupView.prototype.tick = function () {
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
    WifeTalentPlusPopupView.prototype.checkHaveBuff = function () {
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
    WifeTalentPlusPopupView.prototype.getAcVo = function () {
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
    WifeTalentPlusPopupView.prototype.getCfg = function () {
        return Config.WifebattleCfg;
    };
    WifeTalentPlusPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acsweetgift_make_infobg-1", "progress3", "progress3_bg",
        ]);
    };
    WifeTalentPlusPopupView.prototype.modelRefresh = function () {
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
    WifeTalentPlusPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL, this.modelRefresh, this);
        NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL, {});
        var scrollListBgRect = egret.Rectangle.create();
        scrollListBgRect.setTo(0, 0, 528, 435);
        var view = this;
        var add = 0;
        if (Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd) {
            add = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
        }
        var statusadd = add ? add : 0; //Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
        var titleBg = BaseBitmap.create("acsweetgift_make_infobg-1");
        titleBg.width = scrollListBgRect.width; //538
        titleBg.scaleY = 100 / 188;
        titleBg.x = this.viewBg.width / 2 - titleBg.width / 2;
        titleBg.y = 10;
        this.addChildToContainer(titleBg);
        this["titleBg1"] = titleBg;
        var plusDesc = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewCurPlus1", [(statusadd).toFixed(0)]), 20, TextFieldConst.COLOR_BROWN);
        plusDesc.x = titleBg.x + 35;
        plusDesc.y = titleBg.y + 35;
        this._plusDesc = plusDesc;
        this.addChildToContainer(plusDesc);
        this._allTalentBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "wifeTalentPlusPopupViewAllBtn", this.goPlusHandler, this);
        this._allTalentBtn.x = titleBg.x + titleBg.width - 40 - this._allTalentBtn.width;
        this._allTalentBtn.y = titleBg.y + titleBg.height * titleBg.scaleY / 2 - this._allTalentBtn.height / 2;
        this.addChildToContainer(this._allTalentBtn);
        var model = Api.wifebattleVoApi.wifebattleVo;
        var allTalentValue = model.info.totaltalent;
        var actadd = 0;
        if (model.info.tmpattr && model.info.tmpattr.actadd) {
            actadd = model.info.tmpattr.actadd;
        }
        var rankBuff = 0;
        var titleBg2 = undefined;
        // if(this.checkHaveBuff()){
        // 	let rcfg = Config.WifebattleCfg;
        // 	let wifeBattleBuff = rcfg.wifeBattleBuff;
        // 	let curlv = 1;
        // 	let maxV = 0;
        // 	let artsum = model.info.artsum?model.info.artsum:0;
        // 	for (let index = 0; index < wifeBattleBuff.length; index++) {
        // 		let element = wifeBattleBuff[index];
        // 		let artistryRange = element.artistryRange;
        // 		if(artistryRange[0]<=artsum && artsum <= artistryRange[1])
        // 		{
        // 			rankBuff = element.rankBuff;
        // 			maxV = artistryRange[1];
        // 			break;
        // 		}
        // 		++curlv;
        // 	}
        // 	let nextAdd = 0;
        // 	let lvStr = ""
        // 	let lvStr2 = ""
        // 	let percV = 0;
        // 	let percStr = ""
        // 	if(wifeBattleBuff[curlv]){
        // 		nextAdd = wifeBattleBuff[curlv].rankBuff;
        // 		lvStr = LanguageManager.getlocal("wifeTalent_bufftxt1",[""+curlv ])  ;
        // 		lvStr2 = LanguageManager.getlocal("wifeTalent_bufftxt2",["1",""+nextAdd]);
        // 		percV = artsum /maxV;
        // 		percStr = artsum+"/"+ maxV ;
        // 	}else{
        // 		let paramStr = LanguageManager.getlocal("wifeSkillMaxShow");
        // 		lvStr = LanguageManager.getlocal("wifeTalent_bufftxt1",[paramStr])  ;
        // 		lvStr2 = "";
        // 		percV = 1.0;
        // 		percStr =paramStr;
        // 	}
        // 	// if(curlv == )
        // 	maxV +=1;
        // 	//才情当前等级txt1
        // 	let lvtxt1 = ComponentManager.getTextField(lvStr,18,TextFieldConst.COLOR_BROWN);
        // 	lvtxt1.setPosition(80 , 20);
        // 	this.addChildToContainer(lvtxt1);
        // 	let lvtxt2 = ComponentManager.getTextField(lvStr2 ,18,TextFieldConst.COLOR_BROWN);
        // 	lvtxt2.setPosition(lvtxt1.x + lvtxt1.width + 30 , lvtxt1.y);
        // 	this.addChildToContainer(lvtxt2);
        // 	let progressBar = ComponentManager.getProgressBar("progress_type3_yellow","progress_type3_bg",480);
        // 	progressBar.x = this.viewBg.width / 2 - progressBar.width/2;
        // 	progressBar.y = lvtxt2.y + 30;
        // 	progressBar.setTextSize(18);
        // 	progressBar.setPercentage( percV);
        // 	progressBar.setText( percStr);
        // 	this.addChildToContainer(progressBar);
        // 	let ruleBtn = ComponentManager.getButton("btn_rule","",this.showBuffLvUI,this,[wifeBattleBuff]);
        // 	ruleBtn.setScale(0.65);
        // 	ruleBtn.x = progressBar.x + progressBar.width - ruleBtn.width+10;
        // 	ruleBtn.y = lvtxt2.y - 10;
        // 	this.addChildToContainer(ruleBtn);
        // 	titleBg2 = BaseBitmap.create("acsweetgift_make_infobg-1");
        // 	titleBg2.width = titleBg.width; //538
        // 	titleBg2.height = titleBg.height; //666
        // 	titleBg2.scaleY = titleBg.scaleY; //666
        // 	titleBg2.x = this.viewBg.width / 2 - titleBg2.width/2;//view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
        // 	titleBg2.y = progressBar.y + progressBar.height + 5;
        // 	view.addChildToContainer(titleBg2);
        // 	this["lvtxt1"] = lvtxt1;
        // 	this["lvtxt2"] = lvtxt2;
        // 	this["ruleBtn"] = ruleBtn;
        // 	this["progressBar"] = progressBar;
        // 	this["titleBg2"] = titleBg2;
        // 	titleBg.y = 10;
        // }
        var bg2 = BaseBitmap.create("public_line3");
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewTab1"), 22, TextFieldConst.COLOR_BLACK);
        bg2.width = tipTxt.textWidth + 290;
        bg2.x = this.viewBg.width / 2 - bg2.width / 2;
        bg2.y = titleBg.y + titleBg.height * titleBg.scaleY + 10;
        this.addChildToContainer(bg2);
        tipTxt.x = this.viewBg.width / 2 - tipTxt.width / 2;
        tipTxt.y = bg2.y + (bg2.height - tipTxt.height) / 2;
        this.addChildToContainer(tipTxt);
        var contentBg = BaseBitmap.create("public_9_bg36");
        contentBg.width = scrollListBgRect.width; //538
        contentBg.height = 485; //666
        contentBg.x = this.viewBg.width / 2 - contentBg.width / 2; //view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
        contentBg.y = tipTxt.y + tipTxt.textHeight + 10;
        view.addChildToContainer(contentBg);
        var bg1 = BaseBitmap.create("public_9_bg33");
        bg1.width = contentBg.width;
        bg1.height = 30;
        bg1.x = this.viewBg.width / 2 - titleBg.width / 2;
        bg1.y = contentBg.y;
        this.addChildToContainer(bg1);
        var bottomBg = BaseBitmap.create("public_9_bg1");
        bottomBg.width = bg1.width;
        ;
        bottomBg.height = 92;
        bottomBg.setPosition(contentBg.x, contentBg.y + contentBg.height + 9);
        view.bottomBg = bottomBg;
        this.addChildToContainer(bottomBg);
        var scroRect = new egret.Rectangle(0, 0, contentBg.width, contentBg.height - 15 - bg1.height);
        var infoList = [];
        var wifestatusList = Config.WifestatusCfg.getWifestatusList();
        var maxNum = 0;
        for (var i = 0; i < wifestatusList.length; i++) {
            if (wifestatusList[i].maxNum) {
                maxNum += wifestatusList[i].maxNum;
            }
        }
        for (var j = 1; j <= maxNum; j++) {
            var obj = null;
            var effect = Config.WifebattleCfg.talentStatusBuff * j;
            if (effect <= statusadd) {
                obj = { level: j, num: j, effect: effect, isused: true };
            }
            else {
                obj = { level: j, num: j, effect: effect, isused: false };
            }
            infoList.push(obj);
        }
        this._scrollList1 = ComponentManager.getScrollList(WifeTalentPlusPopupScrollItem, infoList, scroRect);
        this._scrollList1.x = this.viewBg.width / 2 - this._scrollList1.width / 2;
        this._scrollList1.y = bg1.y + bg1.height + 5;
        this.addChildToContainer(this._scrollList1);
        // if(this.checkHaveBuff()){
        // 	this._plusDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewAcDesc",[""+rankBuff]),20,TextFieldConst.COLOR_BROWN);
        // 	this._plusDesc2.width = 450;
        // 	this._plusDesc2.x = titleBg2.x + 35;
        // 	this._plusDesc2.y = titleBg2.y + 35;
        // 	this.addChildToContainer(this._plusDesc2);
        // 	let acTime = this.getAcVo().getAcLocalTime();
        // 	// this._acDesc = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewAcStr",[acTime]),20,0x46fe3c);
        // 	this._acDesc = ComponentManager.getTextField(acTime,20,TextFieldConst.COLOR_WARN_GREEN);
        // 	this._acDesc.width = 450;
        // 	this._acDesc.x = this._plusDesc2.x;
        // 	this._acDesc.y = this._plusDesc2.y + this._plusDesc2.height + 5;
        // 	this.addChildToContainer(this._acDesc);
        // 	let infoList2 = [];
        // 	if(Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr){
        // 		infoList2 = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr;
        // 	}
        // 	infoList2 = infoList2?infoList2:[];
        // 	this._scrollList2 = ComponentManager.getScrollList(WifeTalentPlusPopupScrollItem2, infoList2, scroRect);
        // 	this._scrollList2.x = this.viewBg.width/2 - this._scrollList2.width/2;
        // 	this._scrollList2.y = bg2.y + bg2.height + 5;
        // 	this.addChildToContainer(this._scrollList2);
        // }
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewLevel"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(100 + GameData.popupviewOffsetX, bg1.y + bg1.height / 2 - rankText.height / 2);
        this.addChildToContainer(rankText);
        this._rankText = rankText;
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewNum"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(225 + GameData.popupviewOffsetX, rankText.y);
        this.addChildToContainer(nameText);
        this._nameText = nameText;
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewEffect"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(430 + GameData.popupviewOffsetX, rankText.y);
        this.addChildToContainer(scoreText);
        this._scoreText = scoreText;
        var descText = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        descText.x = bottomBg.x + 25;
        descText.y = bottomBg.y + bottomBg.height / 2 - descText.height / 2;
        descText.textAlign = egret.HorizontalAlign.CENTER;
        this.addChildToContainer(descText);
        this._descText = descText;
        var plusBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "wifeTalentPlusPopupViewBtn", this.goStatus, this);
        plusBtn.x = bottomBg.x + bottomBg.width - 20 - plusBtn.width;
        plusBtn.y = bottomBg.y + bottomBg.height / 2 - plusBtn.height / 2;
        this.addChildToContainer(plusBtn);
        this._plusBtn = plusBtn;
        //--------------------
        // if(this.checkHaveBuff()){
        // 	let rankText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewLevel2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        // 	rankText2.setPosition(100 , bg1.y+bg1.height/2 - rankText2.height/2);
        // 	this.addChildToContainer(rankText2);
        // 	this._rankText2 = rankText2
        // 	let nameText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewNum2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        // 	nameText2.setPosition(225 , rankText2.y);
        // 	this.addChildToContainer(nameText2);
        // 	this._nameText2 = nameText2
        // 	let scoreText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewEffect2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        // 	scoreText2.setPosition(430 , rankText2.y);
        // 	this.addChildToContainer(scoreText2);
        // 	this._scoreText2 = scoreText2
        // 	let descText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewDesc2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
        // 	descText2.x = bottomBg.x + 25;
        // 	descText2.y = bottomBg.y + bottomBg.height/2 - descText2.height/2;
        // 	descText2.textAlign = egret.HorizontalAlign.CENTER;
        // 	this.addChildToContainer(descText2);
        // 	this._descText2 = descText2
        // 	let plusBtn2:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"wifeTalentPlusPopupViewBtn2",this.goPlusHandler,this);
        // 	plusBtn2.x = bottomBg.x + bottomBg.width - 20 - plusBtn2.width;
        // 	plusBtn2.y = bottomBg.y + bottomBg.height/2 - plusBtn2.height/2;
        // 	this.addChildToContainer(plusBtn2);
        // 	this._plusBtn2 = plusBtn2;
        // }
        //--------------------
        var wifestatusView = ViewController.getInstance().getView(ViewConst.COMMON.WIFESTATUSVIEW);
        if (wifestatusView && wifestatusView.isShow()) {
            plusBtn.visible = false;
            descText.x = bottomBg.x + bottomBg.width / 2 - descText.width / 2;
        }
    };
    WifeTalentPlusPopupView.prototype.goStatus = function () {
        ViewController.getInstance().hideAllView();
        ViewController.getInstance().openView(ViewConst.COMMON.WIFESTATUSVIEW);
    };
    WifeTalentPlusPopupView.prototype.goPlusHandler = function () {
        // let viewList = ViewController.getInstance().getView(ViewConst.COMMON.WIFESTATUSVIEW);//hideAllView
        // ViewController.getInstance().hideAllView();
        if (!this.checkCanJoin()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeBattleUpLockDesc"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.WIFEALLTALENTVIEW);
        this.hide();
        // this.hide();
    };
    //检测是否有红颜获得位分
    WifeTalentPlusPopupView.prototype.checkCanJoin = function () {
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
    WifeTalentPlusPopupView.prototype.showBuffLvUI = function (param) {
        ViewController.getInstance().openView(ViewConst.POPUP.WIFETALENTBUFFPOPUPVIEW, param);
    };
    WifeTalentPlusPopupView.prototype.getShowHeight = function () {
        return 830;
    };
    WifeTalentPlusPopupView.prototype.getTitleStr = function () {
        return 'wifeTalentPlusPopupViewTitle';
    };
    WifeTalentPlusPopupView.prototype.refreshList = function () {
    };
    WifeTalentPlusPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    WifeTalentPlusPopupView.prototype.dispose = function () {
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
    return WifeTalentPlusPopupView;
}(PopupView));
__reflect(WifeTalentPlusPopupView.prototype, "WifeTalentPlusPopupView");
//# sourceMappingURL=WifeTalentPlusPopupView.js.map