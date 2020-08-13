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
var AcSingleDaySkinView = (function (_super) {
    __extends(AcSingleDaySkinView, _super);
    function AcSingleDaySkinView() {
        var _this = _super.call(this) || this;
        _this._aid = undefined;
        _this._code = undefined;
        return _this;
    }
    Object.defineProperty(AcSingleDaySkinView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDaySkinView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDaySkinView.prototype.initView = function () {
        this._aid = this.param.data.aid;
        this._code = this.param.data.code;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.y = -15;
        this.addChildToContainer(this._nodeContainer);
        var skinList = this.cfg.skinList;
        var keys = Object.keys(skinList);
        keys.sort(function (dataA, dataB) {
            return Number(dataA) - Number(dataB);
        });
        var values = [];
        for (var index = 0; index < keys.length; index++) {
            var tmpK = keys[index];
            values.push([skinList[tmpK], Number(tmpK) + 1, this._aid, this._code]);
        }
        var rectH2 = GameConfig.stageHeigth - this.container.y - 115;
        var rect2 = new egret.Rectangle(0, 0, GameConfig.stageWidth - 20, rectH2);
        this._myScrollList = ComponentManager.getScrollList(AcSingleDaySkinScrollItem, values, rect2);
        this._myScrollList.bounces = false;
        this._myScrollList.y = 5;
        this._myScrollList.x = 10;
        this._myScrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        this._nodeContainer.addChild(this._myScrollList);
        this.initBottom();
    };
    //创建底部通用切换按钮，由 initBottom，bottomBtnHandler 两个接口一起完成
    AcSingleDaySkinView.prototype.initBottom = function () {
        var btNode = new AcSingleDayBottomNode({ selectIdx: 2, switchCallback: this.bottomBtnHandler, callbackOgj: this });
        btNode.y = -this.container.y;
        this.addChildToContainer(btNode);
    };
    AcSingleDaySkinView.prototype.bottomBtnHandler = function (index) {
        if (index == 1) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYBUILD1VIEW, {
                code: this._code,
                aid: this._aid
            });
        }
        else if (index == 2) {
            return;
        }
        else if (index == 3) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYBUILD3VIEW, {
                code: this._code,
                aid: this._aid
            });
        }
        this.hide();
    };
    AcSingleDaySkinView.prototype.getRuleInfo = function () {
        if (Number(this._code) <= 4) {
            return "acSingleDayRuleInfo-1";
        }
        else {
            return "acSingleDayRuleInfo-" + this._code;
        }
    };
    AcSingleDaySkinView.prototype.getRuleParam = function () {
        var vo = this.vo;
        var cfg = this.cfg;
        return [
            (cfg.startTime / 3600).toString(),
            ((cfg.startTime + cfg.luckyPacketCD) / 3600).toString(),
            String(cfg.luckyPacketPurchase / 3600),
            cfg.couponLimit.toString()
        ];
    };
    AcSingleDaySkinView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acsingleday_skinbg1_1",
            "acsingleday_skinbg1_2",
            "acsingleday_skinbg2_1", "servant_detailBtn", "servant_detailBtn_down",
            "acsingleday_skinbg2_2",
            "acsingleday_skinitemIconbg",
            "acsingleday_skinnamebg",
            "servant_middlebg", "acsingleday_skin_off",
        ]);
    };
    AcSingleDaySkinView.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        this._myScrollList = null;
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDaySkinView;
}(CommonView));
__reflect(AcSingleDaySkinView.prototype, "AcSingleDaySkinView");
