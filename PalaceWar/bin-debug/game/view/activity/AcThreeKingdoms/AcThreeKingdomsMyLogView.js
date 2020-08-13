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
 * 三国我的战报
 * author qianjun
 * date 2017/11/24
 * @class ConfirmPopupView
 * 参数 ：title,msg,callback,handler  needCancel
 *
 */
var AcThreeKingdomsMyLogView = (function (_super) {
    __extends(AcThreeKingdomsMyLogView, _super);
    function AcThreeKingdomsMyLogView() {
        var _this = _super.call(this) || this;
        _this._battlelog = [];
        return _this;
    }
    AcThreeKingdomsMyLogView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    AcThreeKingdomsMyLogView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    Object.defineProperty(AcThreeKingdomsMyLogView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsMyLogView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsMyLogView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsMyLogView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsMyLogView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcThreeKingdomsMyLogView.prototype.getRequestData = function () {
        return {
            requestType: NetRequestConst.REQUEST_THREEKINGDOMS_GETLIST,
            requestData: {
                activeId: this.vo.aidAndCode,
            }
        };
    };
    AcThreeKingdomsMyLogView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.data) {
                var list = data.data.data.attacklist;
                if (list.length) {
                    this.vo.listred = false;
                    if (list.length != this._battlelog.length) {
                        this.vo.listred = true;
                    }
                    this._battlelog = list;
                }
            }
        }
    };
    // 打开该面板时，需要传参数msg
    AcThreeKingdomsMyLogView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 618;
        bg.x = 45;
        bg.y = 20; // GameConfig.stageHeigth - bg.height-240;
        this.addChildToContainer(bg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 520, 610);
        var scrollList = ComponentManager.getScrollList(AcThreeKingdomsMyBattleLogItem, this._battlelog, rect, this.code);
        this.addChildToContainer(scrollList);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, bg);
        scrollList.setEmptyTip(LanguageManager.getlocal("atkracedes3"));
    };
    AcThreeKingdomsMyLogView.prototype.resetBgSize = function () {
        // this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,this._bgHeight + 30);
        _super.prototype.resetBgSize.call(this);
    };
    // protected getShowWidth():number{
    //     return 640;
    // }
    AcThreeKingdomsMyLogView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcThreeKingdomsMyLogView.prototype.getTitleStr = function () {
        return "acthreekingdomsmylog";
    };
    AcThreeKingdomsMyLogView.prototype.dispose = function () {
        var view = this;
        view._battlelog = [];
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsMyLogView;
}(PopupView));
__reflect(AcThreeKingdomsMyLogView.prototype, "AcThreeKingdomsMyLogView");
//# sourceMappingURL=AcThreeKingdomsMyLogView.js.map