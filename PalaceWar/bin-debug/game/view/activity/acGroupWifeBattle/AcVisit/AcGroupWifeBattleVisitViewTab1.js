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
 * 防守消息
 */
var AcGroupWifeBattleVisitViewTab1 = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleVisitViewTab1, _super);
    function AcGroupWifeBattleVisitViewTab1(data) {
        var _this = _super.call(this) || this;
        _this.defenseList = [];
        _this._scrollList = null;
        _this.noDataTxt = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcGroupWifeBattleVisitViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleVisitViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleVisitViewTab1.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleVisitViewTab1.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleVisitViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleVisitViewTab1.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 516;
        bg.height = 618;
        bg.x = 25;
        bg.y = 55;
        this.addChild(bg);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY), this.freshlist, this);
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY, {
            activeId: this.acTivityId
        });
        AcGroupWifeBattleVisitViewTab1.AtkaceType = 0;
    };
    AcGroupWifeBattleVisitViewTab1.prototype.showList = function () {
        if (this._scrollList == null) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 610);
            this._scrollList = ComponentManager.getScrollList(AcGroupWifeBattleVisitTab1Item, this.defenseList, rect);
            this.addChild(this._scrollList);
            this._scrollList.setPosition(-35, 60);
        }
    };
    AcGroupWifeBattleVisitViewTab1.prototype.freshlist = function (evt) {
        if (evt.data.ret == false) {
            return;
        }
        if (evt.data.data.data && evt.data.data.data.dinfo) {
            if (AcGroupWifeBattleVisitViewTab1.AtkaceType == 0) {
                if (this._scrollList) {
                    this._scrollList.dispose();
                    this._scrollList = null;
                }
                var dinfo = evt.data.data.data.dinfo;
                if (dinfo && dinfo.length >= 1) {
                    this.defenseList = dinfo;
                    this.showList();
                }
                else {
                    //没有数据消息
                    if (this.noDataTxt == null) {
                        this.noDataTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_WHITE);
                        this.noDataTxt.text = LanguageManager.getlocal("atkracedes1");
                        this.noDataTxt.x = 220; //rankImg.x+60
                        if (PlatformManager.checkIsEnLang()) {
                            this.noDataTxt.x = 570 / 2 - this.noDataTxt.width / 2;
                        }
                        this.noDataTxt.y = 300; //rankImg.y+10;
                    }
                    this.addChild(this.noDataTxt);
                }
            }
        }
        // NetManager.request(NetRequestConst.REQUEST_ATKRACE_GETMODEL, {});
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_GETMODEL), this.useCallback, this);
    };
    AcGroupWifeBattleVisitViewTab1.prototype.dispose = function () {
        this.noDataTxt = null;
        this.defenseList = [];
        this._scrollList = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY), this.freshlist, this);
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_GETMODEL), this.useCallback, this);
        AcGroupWifeBattleVisitViewTab1.AtkaceType = 0;
        _super.prototype.dispose.call(this);
    };
    AcGroupWifeBattleVisitViewTab1.AtkaceType = 0;
    return AcGroupWifeBattleVisitViewTab1;
}(PopupViewTab));
//# sourceMappingURL=AcGroupWifeBattleVisitViewTab1.js.map