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
 * 出巡确认
 * date 2019.12.10
 * author ycg
 * @class EmperorOutStartPopupView
 */
var EmperorOutStartPopupView = (function (_super) {
    __extends(EmperorOutStartPopupView, _super);
    function EmperorOutStartPopupView() {
        var _this = _super.call(this) || this;
        _this._startTip = null;
        _this._btnContainer = null;
        _this._duringContainer = null;
        _this._endContainer = null;
        return _this;
    }
    EmperorOutStartPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_OUTING, this.outingCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETBARRAGE_LIST, this.getBarrageListCallback, this);
        var viewBg = BaseBitmap.create("decree_popbg");
        viewBg.height = 600;
        viewBg.setPosition(GameConfig.stageWidth / 2 - viewBg.width / 2, GameConfig.stageHeigth / 2 - viewBg.height / 2);
        this.addChildToContainer(viewBg);
        this.closeBtn.y = viewBg.y - 10;
        this.closeBtn.x = viewBg.x + viewBg.width - 80;
        var title = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutStartTitle"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WHITE);
        title.setPosition(viewBg.x + viewBg.width / 2 - title.width / 2, viewBg.y + 20);
        this.addChildToContainer(title);
        var bg = BaseBitmap.create("emperorachieve_startbg");
        bg.setPosition(viewBg.x + viewBg.width / 2 - bg.width / 2, viewBg.y + 68);
        this.addChildToContainer(bg);
        var descBg = BaseBitmap.create("emperorachieve_startdescbg");
        descBg.setPosition(viewBg.x + viewBg.width / 2 - descBg.width / 2, bg.y + bg.height + 10);
        this.addChildToContainer(descBg);
        var ruleTitle = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutStartRuleTitle"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN);
        ruleTitle.setPosition(viewBg.x + viewBg.width / 2 - ruleTitle.width / 2, descBg.y + 18);
        this.addChildToContainer(ruleTitle);
        var descLine = BaseBitmap.create("public_line3");
        descLine.width += (ruleTitle.width + 20);
        descLine.setPosition(descBg.x + descBg.width / 2 - descLine.width / 2, ruleTitle.y + 1);
        this.addChildToContainer(descLine);
        var outTime = Api.emperorAchieveVoApi.localOutTime();
        var ruleInfo = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutStartRuleInfo", ["" + outTime.st, "" + outTime.et]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        // ruleInfo.textAlign = TextFieldConst.ALIGH_CENTER;
        ruleInfo.width = descBg.width - 30;
        ruleInfo.lineSpacing = 5;
        ruleInfo.setPosition(descBg.x + descBg.width / 2 - ruleInfo.width / 2, ruleTitle.y + ruleTitle.height + 10);
        this.addChildToContainer(ruleInfo);
        var btnContainer = new BaseDisplayObjectContainer();
        btnContainer.width = viewBg.height;
        btnContainer.setPosition(viewBg.x, viewBg.y + viewBg.height - 100);
        this.addChildToContainer(btnContainer);
        var cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.hide, this);
        cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
        cancelBtn.x = 100;
        cancelBtn.y = 0;
        btnContainer.addChild(cancelBtn);
        //确认巡街
        var conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "emperorOutStartOutBtnName", function () {
            NetManager.request(NetRequestConst.REQUEST_EMPERORACHIEVE_OUTING, null);
        }, this);
        conBtn.setColor(TextFieldConst.COLOR_BLACK);
        conBtn.x = viewBg.width - conBtn.width - 100;
        conBtn.y = 0;
        btnContainer.addChild(conBtn);
        btnContainer.visible = false;
        this._btnContainer = btnContainer;
        //时间未到
        var startTip = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutStartNotOpenTip", ["" + outTime.st, "" + outTime.et]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        startTip.setPosition(descBg.x + descBg.width / 2 - startTip.width / 2, descBg.y + descBg.height + 50);
        this.addChildToContainer(startTip);
        startTip.visible = false;
        this._startTip = startTip;
        //进行中
        var duringOutContainer = new BaseDisplayObjectContainer();
        duringOutContainer.setPosition(viewBg.x, descBg.y + descBg.height + 20);
        this.addChildToContainer(duringOutContainer);
        var duringTip = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutStartingTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        duringTip.setPosition(viewBg.width / 2 - duringTip.width / 2, 0);
        duringOutContainer.addChild(duringTip);
        //前往查看
        var goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "emperorOutStartGoBtnName", function () {
            var playerId = Api.playerVoApi.getPlayerID();
            ViewController.getInstance().openView(ViewConst.COMMON.EMPEROROUTVIEW, { uid: playerId });
        }, this);
        goBtn.setPosition(duringTip.x + duringTip.width / 2 - goBtn.width / 2, duringTip.y + duringTip.height + 15);
        duringOutContainer.addChild(goBtn);
        duringOutContainer.visible = false;
        this._duringContainer = duringOutContainer;
        //已结束
        var endContainer = new BaseDisplayObjectContainer();
        endContainer.setPosition(viewBg.x, descBg.y + descBg.height + 20);
        this.addChildToContainer(endContainer);
        var endTip = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutStartEndTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        endTip.setPosition(viewBg.width / 2 - endTip.width / 2, 0);
        endContainer.addChild(endTip);
        //请安列表
        var wishBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "emperorOutStartWishListBtnName", function () {
            // if (!Api.emperorAchieveVoApi.isInOutTime()){
            var playerUid = Api.playerVoApi.getPlayerID();
            NetManager.request(NetRequestConst.REQUEST_EMPERORACHIEVE_GETBARRAGE_LIST, { fuid: playerUid });
            // }
            // this.hide();
        }, this);
        wishBtn.setPosition(endTip.x + endTip.width / 2 - wishBtn.width / 2, endTip.y + endTip.height + 15);
        endContainer.addChild(wishBtn);
        endContainer.visible = false;
        this._endContainer = endContainer;
        App.LogUtil.log("outingst: " + this.emperorApi.emperorAchieveVo.outingst);
        this.freshView();
        // endContainer.visible = true;
    };
    EmperorOutStartPopupView.prototype.outingCallback = function (evt) {
        if (evt && evt.data && evt.data.ret) {
            this.freshView();
            var playerId = Api.playerVoApi.getPlayerID();
            ViewController.getInstance().openView(ViewConst.COMMON.EMPEROROUTVIEW, { uid: playerId });
        }
    };
    EmperorOutStartPopupView.prototype.tick = function () {
        this.freshView();
    };
    EmperorOutStartPopupView.prototype.freshView = function () {
        var outSt = this.emperorApi.emperorAchieveVo.outingst;
        if (outSt == 0) {
            this._duringContainer.visible = false;
            this._endContainer.visible = false;
            if (this.emperorApi.isInOutTime()) {
                this._btnContainer.visible = true;
                this._startTip.visible = false;
            }
            else {
                this._btnContainer.visible = false;
                this._startTip.visible = true;
            }
        }
        else {
            this._btnContainer.visible = false;
            this._startTip.visible = false;
            if (App.DateUtil.checkIsToday(outSt) && Api.emperorAchieveVoApi.isInOuting(outSt)) {
                this._duringContainer.visible = true;
                this._endContainer.visible = false;
            }
            else {
                this._duringContainer.visible = false;
                this._endContainer.visible = true;
            }
        }
    };
    //请安列表
    EmperorOutStartPopupView.prototype.getBarrageListCallback = function (evt) {
        if (evt && evt.data && evt.data.ret) {
            var rData = evt.data.data.data;
            var dataList = rData.barrageList;
            var _data = [];
            for (var key in dataList) {
                if (dataList[key]) {
                    _data.push(dataList[key]);
                }
            }
            if (_data.length > 0) {
                var playerUid = Api.playerVoApi.getPlayerID();
                ViewController.getInstance().openView(ViewConst.POPUP.EMPEROROUTWISHPOPUPVIEW, { data: _data, uid: playerUid });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("emperorOutWishListNotHave"));
                return;
            }
        }
        this.hide();
    };
    Object.defineProperty(EmperorOutStartPopupView.prototype, "emperorApi", {
        get: function () {
            return Api.emperorAchieveVoApi;
        },
        enumerable: true,
        configurable: true
    });
    EmperorOutStartPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "decree_popbg"
        ]);
    };
    EmperorOutStartPopupView.prototype.getTitleStr = function () {
        return "";
    };
    EmperorOutStartPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    EmperorOutStartPopupView.prototype.getBgName = function () {
        return null;
    };
    EmperorOutStartPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_OUTING, this.outingCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETBARRAGE_LIST, this.getBarrageListCallback, this);
        this._startTip = null;
        this._duringContainer = null;
        this._btnContainer = null;
        this._endContainer = null;
        _super.prototype.dispose.call(this);
    };
    return EmperorOutStartPopupView;
}(PopupView));
__reflect(EmperorOutStartPopupView.prototype, "EmperorOutStartPopupView");
//# sourceMappingURL=EmperorOutStartPopupView.js.map