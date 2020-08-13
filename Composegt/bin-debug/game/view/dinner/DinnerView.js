/**
 * author shaoliang
 * date 2017/10/31
 * @class DinnerView
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
var DinnerView = (function (_super) {
    __extends(DinnerView, _super);
    function DinnerView() {
        var _this = _super.call(this) || this;
        _this._scrollContainer = null;
        _this._dinnerTimeText = null;
        _this._dinnerCountText = null;
        _this._enterDinnerText = null;
        _this._isHasMyDinner = false;
        _this._deskTab = {};
        _this._needShowOpenedType = null;
        return _this;
    }
    DinnerView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dinner_rank",
            "wifeview_bottombg",
            "dinner_line",
            "rank_display_namebg",
        ]);
    };
    DinnerView.prototype.getRequestData = function () {
        return null;
        // return {requestType:NetRequestConst.REQUEST_DINNER_CANVIEWDINNER,requestData:{}};
    };
    DinnerView.prototype.receiveData = function (data) {
    };
    DinnerView.prototype.initView = function () {
        var _this = this;
        Api.rookieVoApi.checkNextStep();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_CANVIEWDINNER), this.requiestCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_DINNER, this.resetDeskAndText, this);
        if (Api.dinnerVoApi.getEndTime() > 0 && Api.dinnerVoApi.getEndTime() > 0) {
            this._isHasMyDinner = true;
        }
        else {
            this._isHasMyDinner = false;
        }
        this.container.y = this.getTitleButtomY();
        this._scrollContainer = new BaseDisplayObjectContainer();
        var bottomBg = BaseBitmap.create("public_9_wordbg"); //wifeview_bottombg
        bottomBg.scaleY = 98 / 184;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, (GameConfig.stageHeigth - this.getTitleButtomY() - 98)); //bottomBg.height));
        // 中部可滑动区域
        var scrollView = ComponentManager.getScrollView(this._scrollContainer, rect);
        scrollView.bounces = false;
        this.addChildToContainer(scrollView);
        var bg = BaseLoadBitmap.create("dinner_bg");
        this._scrollContainer.addChild(bg);
        //进入宴会 
        var clickArea = BaseBitmap.create("public_9_bg8");
        clickArea.width = 240;
        clickArea.height = 240;
        clickArea.setPosition(GameConfig.stageWidth / 2 - clickArea.width / 2, 120);
        this._scrollContainer.addChild(clickArea);
        clickArea.addTouchTap(this.enterDinnerHandler, this);
        clickArea.alpha = 0;
        var dinnerRoof = ComponentManager.getButton("dinner_roof", null, this.enterDinnerHandler, this, null, 1);
        dinnerRoof.setPosition(GameConfig.stageWidth / 2 - dinnerRoof.width / 2 + 7, 309);
        this._scrollContainer.addChild(dinnerRoof);
        var dinnerTipContainer = new BaseDisplayObjectContainer();
        this._scrollContainer.addChild(dinnerTipContainer);
        var interDinner = BaseBitmap.create("dinner_tip");
        interDinner.setPosition(GameConfig.stageWidth / 2 - interDinner.width / 2, 256); //256  
        dinnerTipContainer.addChild(interDinner);
        var nameY = dinnerTipContainer.y;
        var moveCall = function () {
            egret.Tween.get(dinnerTipContainer).to({ y: nameY + 5 }, 1000).to({ y: nameY - 5 }, 1000).call(moveCall, _this);
        };
        moveCall();
        this._enterDinnerText = ComponentManager.getTextField(LanguageManager.getlocal(""), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._enterDinnerText.y = interDinner.y + 10;
        dinnerTipContainer.addChild(this._enterDinnerText);
        this.resetTextInfo();
        if (!Api.switchVoApi.checkOpenShenhe()) {
            //排行榜
            var rankBg = BaseBitmap.create("dinner_black_circle");
            rankBg.setPosition(12, 10);
            this._scrollContainer.addChild(rankBg);
            var rankBtn = ComponentManager.getButton("dinner_rank", null, this.rankClickHandler, this);
            // rankBtn.setPosition(rankBg.x+8,rankBg.y);
            rankBtn.x = rankBg.x + rankBg.width / 2 - rankBtn.width / 2;
            rankBtn.y = rankBg.y;
            this._scrollContainer.addChild(rankBtn);
        }
        //打鼓
        var drumBtn1 = ComponentManager.getButton("dinner_drum", null, this.exchangeClickHandler, this, null, 1);
        drumBtn1.setPosition(106, 338); //(106,338);
        this._scrollContainer.addChild(drumBtn1);
        var exchangeIcon = BaseBitmap.create("dinner_exchange");
        exchangeIcon.setPosition(drumBtn1.width / 2 - exchangeIcon.width / 2 - 2, 18);
        drumBtn1.addChild(exchangeIcon);
        var drumBtn2 = ComponentManager.getButton("dinner_drum", null, this.messageClickHandler, this, null, 1);
        drumBtn2.setPosition(GameConfig.stageWidth - 106 - drumBtn2.width, drumBtn1.y);
        this._scrollContainer.addChild(drumBtn2);
        var messageIcon = BaseBitmap.create("dinner_message");
        messageIcon.setPosition(drumBtn2.width / 2 - messageIcon.width / 2 - 2, 30);
        drumBtn2.addChild(messageIcon);
        // if(PlatformManager.checkIsKRSp())
        // {
        // 	exchangeIcon.y = exchangeIcon.y + 17;
        // 	messageIcon.y = messageIcon.y + 17;
        // 	exchangeIcon.x = exchangeIcon.x + 2;
        // 	messageIcon.x = messageIcon.x + 2;
        // }
        //底部 固定区域
        var bottomContainer = new BaseDisplayObjectContainer();
        bottomContainer.y = rect.height;
        this.addChildToContainer(bottomContainer);
        bottomContainer.addChild(bottomBg);
        var dinnerTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("dinnerTimes"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        dinnerTimeDesc.setPosition(25, bottomBg.height * bottomBg.scaleY / 2 - dinnerTimeDesc.height - 5);
        bottomContainer.addChild(dinnerTimeDesc);
        this._dinnerTimeText = ComponentManager.getTextField(this.getDinnerTimesStr(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        this._dinnerTimeText.setPosition(dinnerTimeDesc.x + dinnerTimeDesc.width + 15, bottomBg.height * bottomBg.scaleY / 2 - this._dinnerTimeText.height - 5);
        bottomContainer.addChild(this._dinnerTimeText);
        var dinnerCountDesc = ComponentManager.getTextField(LanguageManager.getlocal("dinnerAllCount"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        dinnerCountDesc.setPosition(25, bottomBg.height * bottomBg.scaleY / 2 + 5);
        bottomContainer.addChild(dinnerCountDesc);
        this._dinnerCountText = ComponentManager.getTextField(this.getDinnerCountStr(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        this._dinnerCountText.setPosition(dinnerCountDesc.x + dinnerCountDesc.width + 15, bottomBg.height * bottomBg.scaleY / 2 + 5);
        bottomContainer.addChild(this._dinnerCountText);
        // let dinnerInquireDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("codeInquireDinner"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
        // dinnerInquireDesc.setPosition(455 - dinnerInquireDesc.width, bottomBg.height * bottomBg.scaleY/2 - dinnerInquireDesc.height/2);
        // bottomContainer.addChild(dinnerInquireDesc);
        var inquirBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "codeToDinner", this.inquirClickHandler, this);
        inquirBtn.setPosition(GameConfig.stageWidth - 18 - inquirBtn.width, bottomBg.height * bottomBg.scaleY / 2 - inquirBtn.height / 2);
        // inquirBtn.setColor(TextFieldConst.COLOR_BLACK);
        bottomContainer.addChild(inquirBtn);
        this.showAllDesk();
        //发请求
        if (Api.dinnerVoApi.getListInfoLength() > 0) {
            TimerManager.doTimer(300, 1, this.sendRequiest, this);
        }
        else {
            this.sendRequiest();
        }
    };
    DinnerView.prototype.sendRequiest = function () {
        NetManager.request(NetRequestConst.REQUEST_DINNER_CANVIEWDINNER, {});
    };
    DinnerView.prototype.requiestCallback = function (p) {
        if (p.data.ret == true) {
            Api.dinnerVoApi.setListInfo(p.data.data.data.vdinfo);
            this.resetTextInfo();
            this._dinnerTimeText.text = this.getDinnerTimesStr();
            this.showAllDesk();
            if (p.data.data.data.totalNum != null) {
                Api.dinnerVoApi.setTotalNum(p.data.data.data.totalNum);
                if (this._dinnerCountText) {
                    this._dinnerCountText.text = this.getDinnerCountStr();
                }
            }
            if (this._isHasMyDinner == true) {
                App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL), this.getDetailCallback, this);
                NetManager.request(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL, { "getuid": Api.playerVoApi.getPlayerID() });
            }
        }
    };
    DinnerView.prototype.getDetailCallback = function (p) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL), this.getDetailCallback, this);
        if (p.data.ret == true) {
            if (p.data.data.data.dinnerReport) {
                Api.dinnerVoApi.formatData(p.data.data.data.dinnerdetail);
                ViewController.getInstance().openView(ViewConst.BASE.DINNERFINISHVIEW, { "info": p.data.data.data.dinnerReport, "baodi": p.data.data.data.baodiNum });
                this.resetTextInfo();
            }
            if (p.data.data.data.resReport && p.data.data.data.resReport.length > 0) {
                ViewController.getInstance().openView(ViewConst.POPUP.DINNERMESSAGEPOPUPVIEW, { info: p.data.data.data.resReport });
            }
            // this.resetTextInfo();
        }
    };
    DinnerView.prototype.requiestCallback2 = function (p) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL), this.requiestCallback2, this);
        if (p.data.ret == true) {
            if (p.data.data.data.dinnerReport) {
                Api.dinnerVoApi.formatData(p.data.data.data.dinnerdetail);
                ViewController.getInstance().openView(ViewConst.BASE.DINNERFINISHVIEW, { "info": p.data.data.data.dinnerReport, "baodi": p.data.data.data.baodiNum });
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_DINNER);
                this.resetTextInfo();
            }
            else {
                var data = { "info": p.data.data.data, "uid": Api.playerVoApi.getPlayerID() };
                if (this._needShowOpenedType != null) {
                    data["needOpen"] = { "type": this._needShowOpenedType };
                    this._needShowOpenedType = null;
                }
                ViewController.getInstance().openView(ViewConst.COMMON.DINNERDETAILVIEW, data);
            }
            // this.resetTextInfo();
        }
    };
    DinnerView.prototype.showAllDesk = function () {
        var result = 0;
        for (var i = 0; i < 6; i++) {
            var voInfo = Api.dinnerVoApi.getListInfo(i);
            var desk = this._deskTab[i];
            if (voInfo && !desk) {
                result += this.showDesk(i, 1, voInfo);
            }
            else if (!voInfo && desk) {
                result += this.showDesk(i, 3);
            }
            else if (voInfo && desk) {
                if (voInfo.uid == desk.uid && voInfo.dtype == desk.dtype) {
                    desk.setCurNum(voInfo.num);
                }
                else {
                    result += this.showDesk(i, 2, voInfo);
                }
            }
        }
        if (result > 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("dinner_refreshed"));
        }
    };
    // type 1:直接显示  2 替换显示 3 移除
    DinnerView.prototype.showDesk = function (idx, type, info) {
        if (type == 1) {
            this.initDesk(idx, info);
            return 0;
        }
        else if (type == 2) {
            var offSetX = 250;
            if (idx % 2 == 0) {
                offSetX = -250;
            }
            var desk1 = this._deskTab[idx];
            egret.Tween.get(desk1).to({ x: desk1.x + offSetX }, 200).call(this.delCallback, this, [desk1]);
            var desk2 = this.initDesk(idx, info);
            desk2.x += offSetX;
            egret.Tween.get(desk2).wait(200).to({ x: desk2.x - offSetX }, 200);
            return 1;
        }
        else if (type == 3) {
            var offSetX = 250;
            if (idx % 2 == 0) {
                offSetX = -250;
            }
            var desk = this._deskTab[idx];
            egret.Tween.get(desk).to({ x: desk.x + offSetX }, 200).call(this.delCallback2, this, [idx]);
            return 1;
        }
    };
    DinnerView.prototype.delCallback2 = function (idx) {
        var desk = this._deskTab[idx];
        this._scrollContainer.removeChild(desk);
        this._deskTab[idx] = null;
    };
    DinnerView.prototype.delCallback = function (desk) {
        this._scrollContainer.removeChild(desk);
    };
    DinnerView.prototype.initDesk = function (idx, info) {
        var desk = new DinnerDesk();
        desk.init(info, this.clickDesk, this, idx);
        if (idx < 2) {
            desk.setScale(0.86);
            desk.y = 708 - desk.height;
            desk.x = (95 + 300 * (idx % 2));
        }
        else if (idx < 4) {
            desk.setScale(0.93);
            desk.y = 894 - desk.height;
            desk.x = (55 + 360 * (idx % 2));
        }
        else {
            // desk.y = 1080 - desk.height;
            desk.y = 1110 - desk.height;
            desk.x = (15 + 421 * (idx % 2));
        }
        this._scrollContainer.addChild(desk);
        this._deskTab[idx] = desk;
        return desk;
    };
    DinnerView.prototype.getDinnerTimesStr = function () {
        var num = Config.DinnerCfg.getGoToFeastNum() - Api.dinnerVoApi.getDayNum();
        if (num < 0) {
            num = 0;
        }
        return num + "/" + Config.DinnerCfg.getGoToFeastNum();
    };
    DinnerView.prototype.getDinnerCountStr = function () {
        var num = Api.dinnerVoApi.getTotalNum();
        if (num < 0) {
            num = 0;
        }
        return num.toString();
    };
    /**
     * 进入宴会
     */
    DinnerView.prototype.enterDinnerHandler = function () {
        //手动调用宴会强弹
        Api.limitedGiftVoApi.manualOpenDinnerWin();
        if (this._isHasMyDinner) {
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL), this.requiestCallback2, this);
            NetManager.request(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL, { "getuid": Api.playerVoApi.getPlayerID() });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.HOLDDINNERPOPUPVIEW, { f: this.createDinnerCallback, o: this });
        }
        //test code
        // ViewController.getInstance().openView(ViewConst.POPUP.DINNEREXCHANGEPOPUPVIEW, {});
        // let info:any = {dtype:1,num:2,score:123,point:321,jinfo:[{"join_time":1510028530,"uid":1000788,"dtype":2,"name":"夹谷思嘉","pic":3},{"join_time":1510028719,"uid":1000566,"dtype":2,"name":"相里斌蔚","pic":3},{"join_time":1510042954,"pic":4,"dtype":2,"name":"郦元纬","uid":1000534}]};
        // ViewController.getInstance().openView(ViewConst.BASE.DINNERFINISHVIEW, {"info":info});
    };
    /**
     * 编号查找
     */
    DinnerView.prototype.inquirClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.DINNERFINDPOPUPVIEW, {});
        //test
        // ViewController.getInstance().openView(ViewConst.BASE.DINNERFINISHVIEW, null);
        //test code
        // ViewController.getInstance().openView(ViewConst.BASE.DINNEROPENEDVIEW, { type:1,o:this,f:this.enterDinnerHandler});
        // this._needShowOpenedType = 2;
        // this.enterDinnerHandler();
    };
    /**
     * 排行榜
     */
    DinnerView.prototype.rankClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.DINNERRANKPOPUPVIEW, {});
    };
    /**
     * 积分兑换
     */
    DinnerView.prototype.exchangeClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.DINNEREXCHANGEPOPUPVIEW, {});
    };
    DinnerView.prototype.doGuide = function () {
        this.exchangeClickHandler();
    };
    /**
     * 消息
     */
    DinnerView.prototype.messageClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.DINNERMSGPOPUPVIEW, null);
    };
    /**
     * 点桌子，进入宴会
     */
    DinnerView.prototype.clickDesk = function (idx) {
        var info = Api.dinnerVoApi.getListInfo(idx);
        if (info.uid == Api.playerVoApi.getPlayerID()) {
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL), this.requiestCallback2, this);
            NetManager.request(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL, { "getuid": Api.playerVoApi.getPlayerID() });
        }
        else {
            ViewController.getInstance().openView(ViewConst.BASE.GOTODINNEREDVIEW, { "info": info });
        }
    };
    /**
     * 举办宴会成功回掉
     */
    DinnerView.prototype.createDinnerCallback = function (idx) {
        if (Api.dinnerVoApi.getEndTime() > 0 && Api.dinnerVoApi.getEndTime() > 0) {
            this._isHasMyDinner = true;
        }
        else {
            this._isHasMyDinner = false;
        }
        this.resetTextInfo();
        // this.showAllDesk();
        this.sendRequiest();
        this._needShowOpenedType = idx;
        this.enterDinnerHandler();
        //ViewController.getInstance().openView(ViewConst.BASE.DINNEROPENEDVIEW, { type:idx,o:this,f:this.enterDinnerHandler});		
    };
    DinnerView.prototype.resetDeskAndText = function () {
        this.sendRequiest();
        this.resetTextInfo();
        this._dinnerTimeText.text = this.getDinnerTimesStr();
    };
    DinnerView.prototype.resetTextInfo = function () {
        if (Api.dinnerVoApi.getEndTime() > 0 && Api.dinnerVoApi.getDtype() > 0) {
            this._isHasMyDinner = true;
        }
        else {
            this._isHasMyDinner = false;
        }
        if (this._isHasMyDinner == true) {
            this._enterDinnerText.text = LanguageManager.getlocal("interDinner");
        }
        else {
            this._enterDinnerText.text = LanguageManager.getlocal("clickHoldDinner");
        }
        this._enterDinnerText.x = GameConfig.stageWidth / 2 - this._enterDinnerText.width / 2;
    };
    DinnerView.prototype.getRuleParam = function () {
        return [Api.playerVoApi.getPlayerOfficeByLevel(Config.DinnerCfg.getJoinLv()), Config.DinnerCfg.getNeedVip() + ""];
    };
    // 规则说明内容  跨服宴会开关后需要更换
    DinnerView.prototype.getRuleInfo = function () {
        //是否显示服务器
        if (Api.switchVoApi.checkCrossDinner()) {
            var ruleStr = this.getClassName().toLowerCase().replace("view", "") + "RuleInfo_Cross";
            if (LanguageManager.checkHasKey(ruleStr)) {
                return ruleStr;
            }
            else {
                var ruleStr_1 = this.getClassName().toLowerCase().replace("view", "") + "RuleInfo";
                if (LanguageManager.checkHasKey(ruleStr_1)) {
                    return ruleStr_1;
                }
                else {
                }
            }
            return "";
        }
        else {
            var ruleStr = this.getClassName().toLowerCase().replace("view", "") + "RuleInfo";
            if (LanguageManager.checkHasKey(ruleStr)) {
                return ruleStr;
            }
            else {
            }
            return "";
        }
    };
    DinnerView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_CANVIEWDINNER), this.requiestCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_DINNER, this.resetDeskAndText, this);
        this._scrollContainer = null;
        this._dinnerTimeText = null;
        this._dinnerCountText = null;
        this._enterDinnerText = null;
        this._isHasMyDinner = false;
        this._deskTab = {};
        this._needShowOpenedType = null;
        _super.prototype.dispose.call(this);
    };
    return DinnerView;
}(CommonView));
__reflect(DinnerView.prototype, "DinnerView");
