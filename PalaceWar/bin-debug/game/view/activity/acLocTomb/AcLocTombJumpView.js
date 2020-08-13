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
 * 东海皇陵跳转层数
 * author 钱竣
 */
var AcLocTombJumpView = (function (_super) {
    __extends(AcLocTombJumpView, _super);
    function AcLocTombJumpView() {
        var _this = _super.call(this) || this;
        _this._useNum = 1;
        _this._numBg = null;
        _this._dragProgressBar = null;
        return _this;
    }
    Object.defineProperty(AcLocTombJumpView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombJumpView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombJumpView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombJumpView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombJumpView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLocTombJumpView.prototype.getTitleStr = function () {
        return "loctombjump-" + this.code;
    };
    AcLocTombJumpView.prototype.resetBgSize = function () {
        if (this.getBgName() != "public_rule_bg") {
            this.closeBtn.y = this.viewBg.y - 15;
            this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 20);
        }
        else {
            this.closeBtn.y = this.viewBg.y - 18;
            this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 37);
        }
    };
    AcLocTombJumpView.prototype.initView = function () {
        var _this = this;
        var view = this;
        view.viewBg.width = 590;
        view.viewBg.height = 415;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0, 12]);
        var data = view.param.data;
        var maxnum = this.vo.getFloorNum() - 1;
        var kuang = BaseBitmap.create("public_9_bg4");
        kuang.width = 520;
        kuang.height = 170;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, kuang, view.viewBg, [0, 120]);
        view.addChild(kuang);
        var tipbg = BaseBitmap.create("aclotteryview_bar_1");
        tipbg.width = 565;
        view.addChild(tipbg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("loctombjumptip2-" + this.code), 20);
        view.addChild(tipTxt);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, tipbg, view.viewBg, [0, 60]);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, tipbg, [25, 0]);
        view._useNum = data.curFloor;
        var numBg = BaseBitmap.create("public_9_bg5");
        view.addChild(numBg);
        view._numBg = numBg;
        var curfloorTxt = ComponentManager.getTextField(LanguageManager.getlocal("loctombjumpfloor-" + this.code, [data.curFloor]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        view.addChild(curfloorTxt);
        view._selectedNumTF = curfloorTxt;
        numBg.width = curfloorTxt.textWidth + 25;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, numBg, kuang, [0, 25]);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, curfloorTxt, numBg);
        var dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress2_bg", maxnum, this.dragCallback, this, null, 1, 380);
        view.setLayoutPosition(LayoutConst.leftbottom, dragProgressBar, kuang, [70, 35]);
        view.addChild(dragProgressBar);
        view._dragProgressBar = dragProgressBar;
        dragProgressBar.setDragPercent(view._useNum, maxnum, 1);
        var minTxt = ComponentManager.getTextField(LanguageManager.getlocal("loctombfloor-" + this.code, ['1']), 20);
        var maxTxt = ComponentManager.getTextField(LanguageManager.getlocal("loctombfloor-" + this.code, [maxnum.toString()]), 20);
        view.addChild(minTxt);
        view.addChild(maxTxt);
        view.setLayoutPosition(LayoutConst.lefttop, minTxt, kuang, [20, 55]);
        view.setLayoutPosition(LayoutConst.righttop, maxTxt, kuang, [20, 55]);
        var buyBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", function () {
            _this.param.data.callback.apply(_this.param.data.callobj, [_this._useNum]);
            view.hide();
        }, view);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, buyBtn, view.viewBg, [0, 35]);
        view.addChild(buyBtn);
    };
    AcLocTombJumpView.prototype.dragCallback = function (curNum) {
        var view = this;
        view._useNum = Math.max(curNum, 1);
        view._selectedNumTF.text = LanguageManager.getlocal("loctombjumpfloor-" + this.code, [curNum.toString()]);
        view._numBg.width = view._selectedNumTF.textWidth + 25;
        var maxnum = this.vo.getFloorNum() - 1;
        // view._dragProgressBar.setDragPercent(view._useNum, maxnum, 1);
    };
    // protected getContainerY():number
    // {
    // 	return 0;
    // }
    AcLocTombJumpView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress2_bg", "progress2", "aclotteryview_bar_1"
        ]);
    };
    AcLocTombJumpView.prototype.dispose = function () {
        var view = this;
        view._numBg = null;
        view._useNum = 1;
        if (view._selectedNumTF) {
            view._selectedNumTF.dispose();
            view._selectedNumTF = null;
        }
        view._dragProgressBar = null;
        _super.prototype.dispose.call(this);
    };
    return AcLocTombJumpView;
}(PopupView));
__reflect(AcLocTombJumpView.prototype, "AcLocTombJumpView");
//# sourceMappingURL=AcLocTombJumpView.js.map