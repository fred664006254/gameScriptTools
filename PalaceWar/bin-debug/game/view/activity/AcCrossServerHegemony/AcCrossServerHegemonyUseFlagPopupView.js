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
 * 道具使用弹板
 * author dmj
 * date 2017/9/25
 * @class ItemUsePopupView
 */
var AcCrossServerHegemonyUseFlagPopupView = (function (_super) {
    __extends(AcCrossServerHegemonyUseFlagPopupView, _super);
    function AcCrossServerHegemonyUseFlagPopupView() {
        var _this = _super.call(this) || this;
        // private _useCallback:Function;
        // private _handler:any;
        _this._useNum = 1;
        _this._maxNum = 0;
        _this._name = "";
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonyUseFlagPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyUseFlagPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyUseFlagPopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyUseFlagPopupView.prototype.getBgExtraHeight = function () {
        return 25;
    };
    AcCrossServerHegemonyUseFlagPopupView.prototype.getFrameName = function () {
        return "popup_frame1";
    };
    AcCrossServerHegemonyUseFlagPopupView.prototype.initView = function () {
        var itemId = this.param.data.itemId;
        this._name = this.param.data.aname;
        this._maxNum = this.vo.getSpecailToolNum();
        var bg = BaseBitmap.create("popupview_itemsbg");
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 0;
        this.addChildToContainer(bg);
        var itemStr = itemId + "_0_" + this._maxNum + "_" + this.param.data.code;
        var itemArr = GameData.formatRewardItem(itemStr);
        var itemCfg = itemArr[0];
        var iconItem = GameData.getItemIcon(itemCfg, true, null, null, this._maxNum);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconItem, bg);
        this.addChildToContainer(iconItem);
        var nameTF = ComponentManager.getTextField(itemCfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        var namebg = BaseBitmap.create("public_9_bg95");
        namebg.width = 220;
        if (nameTF.width + 80 > 220) {
            namebg.width = nameTF.width + 80;
        }
        namebg.x = this.viewBg.x + this.viewBg.width / 2 - namebg.width / 2;
        namebg.y = bg.y + bg.height + 10;
        this.addChildToContainer(namebg);
        nameTF.setColor(TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF, namebg);
        this.addChildToContainer(nameTF);
        // progress_type1_yellow2   progress_type3_bg
        var dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress20_bg", this._maxNum, this.dragCallback, this, null, 1, 220);
        dragProgressBar.x = bg.x + 70;
        dragProgressBar.y = namebg.y + namebg.height + 20;
        this.addChildToContainer(dragProgressBar);
        var confirmTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyUseFlagConfirm", ["1", this._name, String(this.cfg.flagScoreNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        confirmTxt.x = this.viewBg.width / 2 - confirmTxt.width / 2;
        confirmTxt.y = dragProgressBar.y + dragProgressBar.height + 10;
        confirmTxt.textAlign = egret.HorizontalAlign.CENTER;
        confirmTxt.lineSpacing = 5;
        this.addChildToContainer(confirmTxt);
        this._confirmTxt = confirmTxt;
        var line = BaseBitmap.create("public_cut_line");
        line.width = 500;
        line.x = this.viewBg.width / 2 - line.width / 2;
        line.y = confirmTxt.y + 55;
        this.addChildToContainer(line);
        this._numBg = BaseBitmap.create("public_9_bg5");
        this._numBg.width = 90;
        // this._numBg.height = 40;
        this._numBg.x = bg.x + bg.width - 20 - this._numBg.width;
        this._numBg.y = dragProgressBar.y - 7;
        this.addChildToContainer(this._numBg);
        this._selectedNumTF = ComponentManager.getTextField(this._useNum + "", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
        // this._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
        this._selectedNumTF.y = this._numBg.y + this._numBg.height / 2 - this._selectedNumTF.height / 2;
        this.addChildToContainer(this._selectedNumTF);
        this._maxNumTF = ComponentManager.getTextField("/" + this._maxNum.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        this._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT;
        // this._maxNumTF.x = this._numBg.x + this._numBg.width/2;
        this._maxNumTF.y = this._numBg.y + this._numBg.height / 2 - this._maxNumTF.height / 2;
        this.addChildToContainer(this._maxNumTF);
        var numTFW = this._selectedNumTF.width + this._maxNumTF.width;
        this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW) / 2;
        this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
        var cancelBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_RED, "cancelBtn", this.cancelHandler, this, null, null, null, TextFieldConst.COLOR_BLACK);
        cancelBtn.x = this.viewBg.width / 2 - cancelBtn.width - 40;
        cancelBtn.y = line.y + line.height + 10;
        this.addChildToContainer(cancelBtn);
        var useBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "sysConfirm", this.useHandler, this, null, null, null, TextFieldConst.COLOR_BLACK);
        useBtn.x = this.viewBg.width / 2 + 40;
        useBtn.y = line.y + line.height + 10;
        this.addChildToContainer(useBtn);
    };
    AcCrossServerHegemonyUseFlagPopupView.prototype.dragCallback = function (curNum) {
        this._useNum = curNum;
        this._selectedNumTF.text = this._useNum + "";
        var numTFW = this._selectedNumTF.width + this._maxNumTF.width;
        this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW) / 2;
        this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
        this._confirmTxt.text = LanguageManager.getlocal("acCrossServerHegemonyUseFlagConfirm", [String(this._useNum), this._name, String(this._useNum * this.cfg.flagScoreNum)]);
        this._confirmTxt.x = this.viewBg.width / 2 - this._confirmTxt.width / 2;
    };
    AcCrossServerHegemonyUseFlagPopupView.prototype.useHandler = function (param) {
        NetManager.request(NetRequestConst.REQUEST_ACHEGEMONY_USEWARFLAG, { activeId: this.vo.aidAndCode, allianceid: this.param.data.allid, num: this._useNum });
        this.hide();
    };
    AcCrossServerHegemonyUseFlagPopupView.prototype.cancelHandler = function (param) {
        this.hide();
    };
    AcCrossServerHegemonyUseFlagPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress2", "progress20_bg", "popupview_itemsbg",
        ]);
    };
    AcCrossServerHegemonyUseFlagPopupView.prototype.dispose = function () {
        this._useNum = 1;
        this._selectedNumTF = null;
        this._maxNumTF = null;
        this._maxNum = 0;
        this._numBg = null;
        this._name = null;
        this._confirmTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyUseFlagPopupView;
}(PopupView));
__reflect(AcCrossServerHegemonyUseFlagPopupView.prototype, "AcCrossServerHegemonyUseFlagPopupView");
//# sourceMappingURL=AcCrossServerHegemonyUseFlagPopupView.js.map