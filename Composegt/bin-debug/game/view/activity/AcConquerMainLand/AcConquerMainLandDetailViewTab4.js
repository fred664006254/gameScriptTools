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
//
var AcConquerMainLandDetailViewTab4 = (function (_super) {
    __extends(AcConquerMainLandDetailViewTab4, _super);
    //private _countDownText:BaseTextField = null;
    function AcConquerMainLandDetailViewTab4(param) {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this.pos = [];
        _this._progressBar = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcConquerMainLandDetailViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab4.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab4.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab4.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab4.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandDetailViewTab4.prototype.getListType = function () {
        return 2;
    };
    AcConquerMainLandDetailViewTab4.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED, this.update, this);
        var code = view.uiCode;
        var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var viewbg = BaseBitmap.create("public_listbg3");
        viewbg.width = this.width - 20;
        viewbg.height = view.height - 10;
        viewbg.setPosition(10, 0);
        view.addChild(viewbg);
        var listbg = BaseBitmap.create("public_9v_bg12");
        listbg.width = viewbg.width - 30;
        listbg.height = viewbg.height - 300;
        listbg.setPosition(viewbg.x + 15, viewbg.y + 10);
        view.addChild(listbg);
        var officeBg = BaseBitmap.create("public_ts_bg01");
        officeBg.width = listbg.width - 20;
        officeBg.x = listbg.x + listbg.width / 2 - officeBg.width / 2;
        officeBg.y = listbg.y + 15;
        this.addChild(officeBg);
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("servantViewTitle"), 22, TextFieldConst.COLOR_BROWN_NEW);
        titleTxt1.x = this.x + 120;
        titleTxt1.y = this.y + 30;
        view.addChild(titleTxt1);
        var titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandPowerAdd-" + code), 22, TextFieldConst.COLOR_BROWN_NEW);
        titleTxt2.x = this.x + 240;
        titleTxt2.y = titleTxt1.y;
        view.addChild(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainServantNum-" + code), 22, TextFieldConst.COLOR_BROWN_NEW);
        titleTxt3.x = this.x + 440;
        titleTxt3.y = titleTxt1.y;
        view.addChild(titleTxt3);
        this.pos = [
            { width: titleTxt1.textWidth, x: titleTxt1.x - 5 },
            { width: titleTxt2.textWidth, x: titleTxt2.x - 5 },
            { width: titleTxt3.textWidth, x: titleTxt3.x - 5 },
        ];
        var tmpRect = new egret.Rectangle(0, 0, listbg.width - 10, listbg.height - officeBg.height - 20);
        var scrollList = ComponentManager.getScrollList(AcConquerMainLandServantInfoListItem, this.getServantIdList(), tmpRect, { code: view.code, pos: this.pos });
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, officeBg.height + 10]);
        view.addChild(scrollList);
        view._list = scrollList;
        scrollList.bounces = false;
        var bottomBg = BaseBitmap.create("public_9v_bg12");
        bottomBg.width = listbg.width;
        bottomBg.height = 265;
        bottomBg.setPosition(listbg.x, listbg.y + listbg.height + 5);
        view.addChild(bottomBg);
        var tip1 = ComponentManager.getTextField('', 18, TextFieldConst.COLOR_BROWN_NEW);
        tip1.width = bottomBg.width;
        tip1.textAlign = egret.HorizontalAlign.CENTER;
        tip1.text = LanguageManager.getlocal("acConquerMainAddLevel-" + code, [this.vo.getBuffLevel() + '']);
        tip1.setPosition(bottomBg.x + bottomBg.width / 2 - tip1.width / 2, bottomBg.y + 20);
        this.addChild(tip1);
        var tip2 = ComponentManager.getTextField('', 18, TextFieldConst.COLOR_BROWN_NEW);
        tip2.width = bottomBg.width;
        tip2.textAlign = egret.HorizontalAlign.CENTER;
        tip2.text = LanguageManager.getlocal("acConquerMainNextAddLevelTip-" + code, [this.vo.getPowerAddBuff(this.vo.getBuffLevel() + 1) + '']);
        tip2.setPosition(bottomBg.x + bottomBg.width / 2 - tip2.width / 2, tip1.y + tip1.height + 8);
        this.addChild(tip2);
        var progressBar = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", bottomBg.width - 120);
        var precent = this.vo.getNextAddCurNum() / this.vo.getNextAddNeedNum();
        var prgstr = LanguageManager.getlocal("acConquerMainAddLevelNum-" + code, [this.vo.getBuffLevel() + '']) + ("(" + this.vo.getNextAddCurNum() + "/" + this.vo.getNextAddNeedNum() + ")");
        if (this.vo.getBuffLevel() == this.cfg.maxBuffLevel) {
            precent = 1;
            prgstr = LanguageManager.getlocal("wifeSkillMaxShow");
        }
        progressBar.setPercentage(precent, prgstr, TextFieldConst.COLOR_LIGHT_YELLOW);
        progressBar.setPosition(bottomBg.x + bottomBg.width / 2 - progressBar.width / 2, tip2.y + tip2.height + 15);
        this.addChild(progressBar);
        this._progressBar = progressBar;
        var previewBtn = ComponentManager.getButton("btn_lookdetail", '', function () {
            ViewController.getInstance().openView("AcConquerMainLandAddPreviewView", {
                aid: view.param.data.aid,
                code: view.param.data.code,
            });
        }, this);
        previewBtn.setPosition(progressBar.x + progressBar.width - previewBtn.width - 10, progressBar.y - previewBtn.height - 15);
        this.addChild(previewBtn);
        var tip3 = ComponentManager.getTextField('', 18, TextFieldConst.COLOR_BROWN_NEW);
        tip3.width = bottomBg.width;
        tip3.textAlign = egret.HorizontalAlign.LEFT;
        tip3.lineSpacing = 5;
        tip3.text = LanguageManager.getlocal("acConquerMainAddLevelTip-" + code, [this.vo.getPowerAddBuff() + '']);
        tip3.setPosition(progressBar.x + 8, progressBar.y + progressBar.height + 15);
        this.addChild(tip3);
        var txt1 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acConquerMainLandServantStrength', function () {
            if (view.vo.getCurPeriod() == 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNotStart-1"));
                return;
            }
            if (!view.vo.isCanJoin()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + code));
                return;
            }
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
        }, this);
        view.addChild(txt1);
        txt1.setPosition(this.x + this.width - txt1.width - 80, this.y + this.height - txt1.height - 50);
        var txt2 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'shopViewTitle', function () {
            if (view.vo.getCurPeriod() == 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNotStart-1"));
                return;
            }
            //打开商店
            if (!view.vo.isCanJoin()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + code));
                return;
            }
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB2);
        }, view, null);
        view.addChild(txt2);
        txt2.setPosition(this.x + 80, this.y + this.height - txt2.height - 50);
    };
    AcConquerMainLandDetailViewTab4.prototype.update = function () {
        var view = this;
        var precent = this.vo.getNextAddCurNum() / this.vo.getNextAddNeedNum();
        var prgstr = LanguageManager.getlocal("acConquerMainAddLevelNum-" + this.code, [this.vo.getBuffLevel() + '']) + ("(" + this.vo.getNextAddCurNum() + "/" + this.vo.getNextAddNeedNum() + ")");
        if (this.vo.getBuffLevel() == this.cfg.maxBuffLevel) {
            precent = 1;
            prgstr = LanguageManager.getlocal("wifeSkillMaxShow");
        }
        this._progressBar.setPercentage(precent, prgstr, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._list.refreshData(this.getServantIdList(), { code: this.code, pos: this.pos });
    };
    AcConquerMainLandDetailViewTab4.prototype.getServantIdList = function () {
        var _this = this;
        var servantIdList = Api.servantVoApi.getServantInfoIdListWithSort(1);
        servantIdList.sort(function (a, b) {
            var aPrp = _this.vo.getServantAcPower(a);
            var bPrp = _this.vo.getServantAcPower(b);
            if (aPrp > bPrp) {
                return -1;
            }
            else {
                return 1;
            }
        });
        return servantIdList;
    };
    AcConquerMainLandDetailViewTab4.prototype.rewardCallback = function (evt) {
        var view = this;
        var data = evt.data.data.data;
    };
    AcConquerMainLandDetailViewTab4.prototype.dispose = function () {
        var view = this;
        view._list = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED, this.update, this);
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandDetailViewTab4;
}(CommonViewTab));
__reflect(AcConquerMainLandDetailViewTab4.prototype, "AcConquerMainLandDetailViewTab4");
