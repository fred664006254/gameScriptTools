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
 * 区服活动排名
 * author qianjun
 */
var AcConquerMainLandAddPreviewView = (function (_super) {
    __extends(AcConquerMainLandAddPreviewView, _super);
    // 滑动列表
    function AcConquerMainLandAddPreviewView() {
        return _super.call(this) || this;
    }
    AcConquerMainLandAddPreviewView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcConquerMainLandAddPreviewView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandAddPreviewView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandAddPreviewView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandAddPreviewView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandAddPreviewView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandAddPreviewView.prototype.isHaveTitle = function () {
        return true;
    };
    AcConquerMainLandAddPreviewView.prototype.initView = function () {
        var view = this;
        var code = view.getUiCode();
        var contentBg = BaseBitmap.create("public_9v_bg12");
        contentBg.width = view.getShowWidth();
        contentBg.height = view.getShowHeight() - 188;
        contentBg.x = view.viewBg.x + view.viewBg.width / 2 - contentBg.width / 2;
        contentBg.y = 75;
        view.addChildToContainer(contentBg);
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acConquerAddPreviewTopName1-" + code), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = this.x + 120;
        titleTxt1.y = this.y + 30;
        view.addChildToContainer(titleTxt1);
        var titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acConquerAddPreviewTopName2-" + code), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt2.x = this.x + 220;
        titleTxt2.y = titleTxt1.y;
        view.addChildToContainer(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acConquerAddPreviewTopName3-" + code), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt3.x = this.x + 400;
        titleTxt3.y = titleTxt1.y;
        view.addChildToContainer(titleTxt3);
        var rankList = view.cfg.servantAttBuff;
        var arr = [];
        for (var i in rankList) {
            var unit = rankList[i];
            unit.pos = [
                { width: titleTxt1.textWidth, x: titleTxt1.x - 30 },
                { width: titleTxt2.textWidth, x: titleTxt2.x - 30 },
                { width: titleTxt3.textWidth, x: titleTxt3.x - 30 },
            ];
            arr.push(unit);
        }
        // let rankInfo = view.vo.getRankInfo();
        // if(rankInfo.rankList && rankInfo.rankList.length){
        // 	rankList = rankInfo.rankList;
        // }
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, contentBg.width, contentBg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcConquerMainLandAddPreviewItem, arr, rect2, { aid: this.aid, code: this.code });
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, contentBg, [0, 0]);
        view.addChildToContainer(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"), TextFieldConst.COLOR_BROWN_NEW);
    };
    AcConquerMainLandAddPreviewView.prototype.getShowWidth = function () {
        return 530;
    };
    AcConquerMainLandAddPreviewView.prototype.getShowHeight = function () {
        return 798;
    };
    AcConquerMainLandAddPreviewView.prototype.getTitleStr = function () {
        return 'acConquerAddPreviewViewTitle-' + this.code;
    };
    AcConquerMainLandAddPreviewView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcConquerMainLandAddPreviewView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandAddPreviewView;
}(PopupView));
__reflect(AcConquerMainLandAddPreviewView.prototype, "AcConquerMainLandAddPreviewView");
