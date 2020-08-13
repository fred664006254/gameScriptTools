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
 * 结婚列表
 * author dky
 * date 2017/10/28
 * @class AdultMarryView
 */
var AdultMarryView = (function (_super) {
    __extends(AdultMarryView, _super);
    function AdultMarryView() {
        return _super.call(this) || this;
    }
    AdultMarryView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_GETVISITME), this.getvisitCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CLICKMARRY, this.doChooseType, this);
        this._adultInfoVo = Api.adultVoApi.getAdultInfoVoById(this.param.data.childId);
        this.request(NetRequestConst.REQUEST_SADUN_GETVISITME, { aquality: this._adultInfoVo.aquality, sex: this._adultInfoVo.sex });
        this._handler = this.param.data.handler;
        //刷新1条
        this._confirmCallback = this.param.data.confirmCallback;
        //刷新所有
        this._confirmCallback2 = this.param.data.confirmCallback2;
        this.request(NetRequestConst.REQUEST_RADULT_GETALLPROPOSE, { childId: this._adultInfoVo.id });
        var topBg = BaseBitmap.create("public_9v_bg10");
        topBg.width = GameConfig.stageWidth;
        topBg.height = 70;
        topBg.y = -21;
        if (PlatformManager.checkIsTextHorizontal()) {
            topBg.height = 85;
        }
        this.addChildToContainer(topBg);
        var topBg2 = BaseBitmap.create("servant_wenzibutiao");
        topBg2.width = GameConfig.stageWidth;
        // topBg2.height = 70;
        topBg2.y = topBg.y + topBg.height;
        this.addChildToContainer(topBg2);
        var motherText = ComponentManager.getTextField(this._adultInfoVo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        // this._motherText.text = Api.playerVoApi.getPlayerGold().toString();
        motherText.x = 20;
        motherText.y = 5;
        this.addChildToContainer(motherText);
        var myName = LanguageManager.getlocal("adultMarryFather") + Api.playerVoApi.getPlayerName();
        var fatherText = ComponentManager.getTextField(myName, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        // this._motherText.text = Api.playerVoApi.getPlayerGold().toString();
        fatherText.x = 130;
        fatherText.y = 5;
        this.addChildToContainer(fatherText);
        var qualityStr = LanguageManager.getlocal("adult_quality") + LanguageManager.getlocal("adult_quality" + this._adultInfoVo.aquality);
        var qualityText = ComponentManager.getTextField(qualityStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        // this._intimacyText.text = Api.playerVoApi.getPlayerGold().toString();
        qualityText.x = 330;
        if (PlatformManager.checkIsViSp()) {
            qualityText.x = 300;
        }
        qualityText.y = 5;
        this.addChildToContainer(qualityText);
        var attrStr = LanguageManager.getlocal("servant_infoAttr") + this._adultInfoVo.attrVo.attTotal;
        var attTF = ComponentManager.getTextField(attrStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        attTF.x = 500;
        attTF.y = 5;
        this.addChildToContainer(attTF);
        //刷新时间
        var timeBg = BaseBitmap.create("servant_1");
        // timeBg.width = 240;
        // timeBg.height = 40;
        timeBg.x = 10;
        timeBg.y = topBg.y + topBg.height;
        this.addChildToContainer(timeBg);
        //招亲对象
        var marryObjectTF = ComponentManager.getTextField(LanguageManager.getlocal("adultMarryObject"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN);
        marryObjectTF.x = 35;
        marryObjectTF.y = 72;
        this.addChildToContainer(marryObjectTF);
        if (PlatformManager.checkIsTextHorizontal()) {
            motherText.x = 20;
            motherText.y = -5;
            fatherText.x = GameConfig.stageWidth / 2;
            fatherText.y = motherText.y;
            qualityText.x = motherText.x;
            qualityText.y = motherText.y + 28;
            attTF.x = fatherText.x;
            attTF.y = qualityText.y;
            marryObjectTF.y = 72 + 15;
        }
        var timeStr = LanguageManager.getlocal("adultMarryRefreshTime", ["00:00:00"]);
        this._timeTF = ComponentManager.getTextField(timeStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._timeTF.x = 250 - 10;
        this._timeTF.y = marryObjectTF.y + marryObjectTF.height / 2 - this._timeTF.height / 2;
        this.addChildToContainer(this._timeTF);
        var refreshBtn = ComponentManager.getButton("servant_dropBtn_down", "adultMarryRefresh", this.refreshHandler, this);
        refreshBtn.x = 250 + 240 - 20;
        refreshBtn.y = marryObjectTF.y + marryObjectTF.height / 2 - refreshBtn.height / 2;
        refreshBtn.setColor(TextFieldConst.COLOR_WHITE);
        refreshBtn.setBold(false);
        this.addChildToContainer(refreshBtn);
        var bottomBg0 = BaseBitmap.create("public_9v_bg02");
        bottomBg0.width = GameConfig.stageWidth;
        bottomBg0.height = GameConfig.stageHeigth - 300 + 100;
        bottomBg0.x = 0;
        bottomBg0.y = 115;
        this.addChildToContainer(bottomBg0);
        var bottomBg2 = BaseBitmap.create("adult_lowbg");
        bottomBg2.x = GameConfig.stageWidth / 2 - bottomBg2.width / 2;
        this.addChildToContainer(bottomBg2);
        var bottomBg = BaseBitmap.create("public_9v_bg03");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - 300 + 100;
        bottomBg.x = 0;
        bottomBg.y = 115;
        this.addChildToContainer(bottomBg);
        bottomBg2.y = bottomBg.y + bottomBg.height - bottomBg2.height - 10;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 24, GameConfig.stageHeigth - 245);
        this._scrollList = ComponentManager.getScrollList(AdultMarryScrollItem, null, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(bottomBg.x + 10, bottomBg.y + 10);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("adultEmptyTip1"), TextFieldConst.COLOR_LIGHT_YELLOW);
        //全服提亲
        var allMarryBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "adultMarryAll", this.marryAllHandler, this);
        allMarryBtn.x = 20;
        allMarryBtn.y = bottomBg2.y + 12;
        // allMarryBtn.
        this.addChildToContainer(allMarryBtn);
        // allMarryBtn.setColor(TextFieldConst.COLOR_BLACK);
        //招亲NO
        // let marryNumTF = ComponentManager.getTextField(LanguageManager.getlocal("adultMarryNumber"), TextFieldConst.FONTSIZE_TITLE_SMALL);
        // marryNumTF.x = 200;
        // marryNumTF.y = allMarryBtn.y + allMarryBtn.height/2 - marryNumTF.height/2;
        // this.addChildToContainer(marryNumTF);
        //输入框
        // let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,TextFieldConst.FONTSIZE_TITLE_SMALL,140,40,"adult_shurukuang",LanguageManager.getlocal("adultMarryInputHolder"),0xa4917f);
        // inputTF.x = marryNumTF.x + marryNumTF.width + 10;
        // inputTF.y = allMarryBtn.y + allMarryBtn.height/2 - inputTF.height/2;
        // this.addChildToContainer(inputTF);
        // this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
        // this._inputTextField.restrict="0-9";
        // //指定提亲
        // let oneMarryBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"adultMarryOne",this.marryOneHandler,this);
        // oneMarryBtn.x = GameConfig.stageWidth - oneMarryBtn.width - 35;
        // oneMarryBtn.y = allMarryBtn.y;
        // this.addChildToContainer(oneMarryBtn);
        // // oneMarryBtn.setColor(TextFieldConst.COLOR_BLACK);
        //搜索联姻
        var oneMarryBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, "adultMarryOne", this.marryOneHandler, this);
        // this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, oneMarryBtn, bottomBg);
        oneMarryBtn.x = GameConfig.stageWidth / 2 - oneMarryBtn.width / 2;
        oneMarryBtn.y = allMarryBtn.y;
        this.addChildToContainer(oneMarryBtn);
        if (Api.switchVoApi.checkopenSadun()) {
            //亲上加亲
            var sudanMarryBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "adultMarryOnsundan", this.marrySudanHandler, this);
            // this.setLayoutPosition(LayoutConst.rightverticalCenter, sudanMarryBtn, bottomBg, [20,0]);
            sudanMarryBtn.x = GameConfig.stageWidth - oneMarryBtn.width - allMarryBtn.x;
            sudanMarryBtn.y = allMarryBtn.y;
            this.addChildToContainer(sudanMarryBtn);
            // oneMarryBtn.setColor(TextFieldConst.COLOR_BLACK);
        }
        else {
            oneMarryBtn.x = GameConfig.stageWidth - oneMarryBtn.width - allMarryBtn.x;
            // this.setLayoutPosition(LayoutConst.rightverticalCenter, oneMarryBtn, bottomBg, [20,0]);
        }
    };
    //请求回调
    AdultMarryView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_RADULT_GETALLPROPOSE) {
            var arr = [];
            for (var i in data.data.data.pinfo.d) {
                var unit = data.data.data.pinfo.d[i];
                unit.adultinfo = this._adultInfoVo;
                arr.push(unit);
            }
            this._scrollList.refreshData(arr);
            this._nextRefreshTime = data.data.data.pinfo.ft;
            this.tick();
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_RADULT_PROPOSEALL) {
            if (this.param.data.confirmCallback) {
                this.param.data.confirmCallback.apply(this.param.data.handler, []);
            }
            App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip1"));
            this.hide();
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_RADULT_PROPOSE) {
            if (data.data.data.proflag) {
                App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip2"));
                return;
            }
            App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip1"));
            if (this.param.data.confirmCallback) {
                this.param.data.confirmCallback.apply(this.param.data.handler, []);
            }
            this.hide();
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_RADULT_AGREEPROPOSE) {
            this.request(NetRequestConst.REQUEST_SADUN_GETINFO, null);
            if (data.data.data.proflag == 2) {
                App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip5"));
                if (this._adultInfoVo && this._adultInfoVo.id) {
                    this.request(NetRequestConst.REQUEST_RADULT_GETALLPROPOSE, { childId: this._adultInfoVo.id });
                }
                return;
            }
            if (this.param.data.confirmCallback2) {
                this.param.data.confirmCallback2.apply(this.param.data.handler, []);
            }
            var childId = data.data.data.adultId;
            var adultInfoVo = Api.adultVoApi.getAdultMarryInfoVoById(childId);
            if (adultInfoVo) {
                ViewController.getInstance().openView(ViewConst.BASE.ADULTMARRYSUCCESSVIEW, { childId: childId, confirmCallback: null, handler: this });
            }
            // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_REFRESHADULTVIEW,null);
            this.hide();
        }
    };
    AdultMarryView.prototype.tick = function () {
        var lastTime = this._nextRefreshTime - GameData.serverTime;
        if (lastTime > 0) {
            var timeStr = LanguageManager.getlocal("adultMarryRefreshTime", [App.DateUtil.getFormatBySecond(lastTime, 1)]);
            this._timeTF.text = timeStr;
        }
        else {
            this.request(NetRequestConst.REQUEST_RADULT_GETALLPROPOSE, { childId: this._adultInfoVo.id });
        }
    };
    AdultMarryView.prototype.refreshHandler = function () {
        var gem = Api.playerVoApi.getPlayerGem();
        var needGem = Config.AdultCfg.freshGem;
        var message = LanguageManager.getlocal("adultRefreshGem", [App.StringUtil.toString(needGem)]);
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.refreshList, handler: this, icon: "itemicon1", iconBg: "itembg_1", num: gem, msg: message, id: 1, useNum: needGem });
    };
    AdultMarryView.prototype.refreshList = function () {
        this.request(NetRequestConst.REQUEST_RADULT_GETALLPROPOSE, { childId: this._adultInfoVo.id, freshFlag: true });
    };
    //点击某个联姻
    AdultMarryView.prototype.doChooseType = function (event) {
        this._selectChildData = event.data;
        ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { type: 2, childId: this._adultInfoVo.id, confirmCallback: this.selectMarryHander, handler: this });
    };
    //选好了道具
    AdultMarryView.prototype.selectMarryHander = function (type) {
        this.request(NetRequestConst.REQUEST_RADULT_AGREEPROPOSE, { aid: this._selectChildData.id, childId: this._adultInfoVo.id, protype: type });
    };
    AdultMarryView.prototype.marryAllHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { type: 2, childId: this._adultInfoVo.id, confirmCallback: this.chooseAllCallBack, handler: this });
    };
    AdultMarryView.prototype.marryOneHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ADULTSEARCHVIEW, { type: 2, childId: this._adultInfoVo.id, confirmCallback: this.chooseOneCallBack, handler: this });
        // if(this._inputTextField.text.length <= 0 || this._inputTextField.text == LanguageManager.getlocal("adultMarryInputHolder"))
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryEmptyTip"));
        // 	return;
        // }
        // if(Number(this._inputTextField.text) == Api.playerVoApi.getPlayerID())
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip3") );
        // 	return;
        // }
        // this.request(NetRequestConst.REQUEST_RADULT_PROPOSE, { childId: this._adultInfoVo.id });
    };
    AdultMarryView.prototype.marrySudanHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ADULTYINYUANRECORDVIEW, { type: 'marry', childid: this._adultInfoVo.id, confirmCallback: this.chooseOneCallBack, handler: this });
    };
    AdultMarryView.prototype.chooseAllCallBack = function (type) {
        PlatformManager.analytics37Point("custom_active", "marriage_temple", 1);
        this.request(NetRequestConst.REQUEST_RADULT_PROPOSEALL, { childId: this._adultInfoVo.id, protype: type });
    };
    AdultMarryView.prototype.chooseOneCallBack = function (fuid) {
        var _this = this;
        // App.LogUtil.log(type);
        //this.request(NetRequestConst.REQUEST_RADULT_PROPOSE, { childId: this._adultInfoVo.id ,fuid:fuid, protype:type});
        var view = ViewController.getInstance().getView('AdultSearchView');
        if (view) {
            view.hide();
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { type: 2, childId: this._adultInfoVo.id, confirmCallback: function (type) {
                PlatformManager.analytics37Point("custom_active", "marriage_temple", 1);
                _this.request(NetRequestConst.REQUEST_RADULT_PROPOSE, { childId: _this._adultInfoVo.id, fuid: fuid, protype: type });
            }, handler: this });
    };
    // protected getTabbarTextArr():Array<string>
    // {
    // 	return ["wifeViewTab1Title",
    // 			"wifeViewTab2Title"
    // 	];
    // }
    // protected getRuleInfo():string
    // {
    // 	return "wife_description";
    // }
    AdultMarryView.prototype.getvisitCallback = function (evt) {
        Api.adultVoApi.setVisitInfo(evt.data.data.data.visitedmelist);
    };
    AdultMarryView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "adult_middlebg",
        ]);
    };
    AdultMarryView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CLICKMARRY, this.doChooseType, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_GETVISITME), this.getvisitCallback, this);
        this._scrollList = null;
        // 列表
        this._adultInfoVoList = null;
        this._inputTextField = null;
        this._adultInfoVo = null;
        this._confirmCallback = null;
        this._confirmCallback2 = null;
        this._handler = null;
        this._timeTF = null;
        //下次刷新时间
        this._nextRefreshTime = null;
        this._selectChildData = null;
        _super.prototype.dispose.call(this);
    };
    return AdultMarryView;
}(CommonView));
__reflect(AdultMarryView.prototype, "AdultMarryView");
