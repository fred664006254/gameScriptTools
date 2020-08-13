var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 仇人
 */
var AcGroupWifeBattleVisitViewTab2 = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleVisitViewTab2, _super);
    function AcGroupWifeBattleVisitViewTab2(data) {
        var _this = _super.call(this) || this;
        _this.einList = [];
        _this._scrollList = null;
        _this._bg = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcGroupWifeBattleVisitViewTab2.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND, this.sendList, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY), this.freshlist, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_REVENGE), this.challengeCallback, this);
        this._bg = BaseBitmap.create("public_9_probiginnerbg");
        this._bg.width = 516;
        this._bg.height = 618;
        this._bg.x = 25;
        this._bg.y = 55;
        this.addChild(this._bg);
        AcGroupWifeBattleVisitViewTab1.AtkaceType = 1;
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY, {
            activeId: this.acTivityId
        });
    };
    AcGroupWifeBattleVisitViewTab2.prototype.challengeCallback = function (evt) {
        var view = this;
        if (evt.data.ret < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleTip3-" + view.getUiCode()));
            view.sendList();
        }
        //NetManager.request(NetRequestConst.REQUEST_ATKRACE_GETMODEL, {});
    };
    Object.defineProperty(AcGroupWifeBattleVisitViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleVisitViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleVisitViewTab2.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleVisitViewTab2.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleVisitViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleVisitViewTab2.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcGroupWifeBattleVisitViewTab2.prototype.sendList = function () {
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY, {
            activeId: this.acTivityId
        });
    };
    AcGroupWifeBattleVisitViewTab2.prototype.freshlist = function (evt) {
        if (evt.data.ret == false) {
            return;
        }
        if (evt.data.data.data) {
            var einfo = evt.data.data.data.einfo;
            if (einfo) {
                if (this._scrollList) {
                    this._scrollList.dispose();
                    this._scrollList = null;
                }
                this.einList = einfo;
                if (this.einList.length > 0) {
                    AcGroupWifeBattleVisitViewTab1.AtkaceType = 1;
                    if (AcGroupWifeBattleVisitViewTab1.AtkaceType == 1) {
                        this.showList();
                    }
                }
                else {
                    this.shownoDataTxt();
                }
            }
        }
    };
    AcGroupWifeBattleVisitViewTab2.prototype.shownoDataTxt = function () {
        //没有仇人消息
        var noDataTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_WHITE);
        noDataTxt.text = LanguageManager.getlocal("atkracedes2");
        noDataTxt.x = 220; //rankImg.x+60
        if (PlatformManager.checkIsEnLang()) {
            noDataTxt.x = 570 / 2 - noDataTxt.width / 2;
        }
        noDataTxt.y = 300; //rankImg.y+10;
        this.addChild(noDataTxt);
    };
    AcGroupWifeBattleVisitViewTab2.prototype.showList = function () {
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, 610);
        this._scrollList = ComponentManager.getScrollList(AcGroupWifeBattleVisitTab2Item, this.einList, rect, this.code);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(-35, 60);
    };
    AcGroupWifeBattleVisitViewTab2.prototype.dispose = function () {
        this.einList = [];
        this._bg = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND, this.sendList, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY), this.freshlist, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_REVENGE), this.challengeCallback, this);
        _super.prototype.dispose.call(this);
        AcGroupWifeBattleVisitViewTab1.AtkaceType = 1;
    };
    return AcGroupWifeBattleVisitViewTab2;
}(PopupViewTab));
//# sourceMappingURL=AcGroupWifeBattleVisitViewTab2.js.map