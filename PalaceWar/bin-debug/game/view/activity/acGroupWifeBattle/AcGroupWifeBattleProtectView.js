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
var AcGroupWifeBattleProtectView = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleProtectView, _super);
    function AcGroupWifeBattleProtectView() {
        var _this = _super.call(this) || this;
        _this._timesTxt = null;
        _this._itemNumTxt = null;
        _this._list = null;
        return _this;
    }
    AcGroupWifeBattleProtectView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    Object.defineProperty(AcGroupWifeBattleProtectView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleProtectView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleProtectView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleProtectView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleProtectView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleProtectView.prototype.getTitleStr = function () {
        return "acGroupWifeBattleProtectTitle-" + this.getUiCode();
    };
    AcGroupWifeBattleProtectView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEGROUND_CHEER), view.prankCallback, view);
        var code = view.getUiCode();
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 750;
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, 250);
        view.addChild(bg);
        var timeskey = 10 > 0 ? "acGroupWifeBattleProtectTimes-" + code : "acGroupWifeBattleProtectNoTimes-" + code;
        var timestxt = ComponentManager.getTextField(LanguageManager.getlocal(timeskey, ["2", "10"]), 22, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timestxt, bg, [10, -timestxt.height - 10]);
        view.addChild(timestxt);
        view._timesTxt = timestxt;
        var itemNumtxt = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleProtectItemNum-" + code, ["10"]), 22, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, itemNumtxt, bg, [10, -itemNumtxt.height - 10]);
        view.addChild(itemNumtxt);
        view._itemNumTxt = itemNumtxt;
        var arr = [];
        arr[0] = { name: "123", rank: 1, score: 20, ispro: false, times: 3 };
        arr[1] = { name: "234", rank: 3, score: 20, ispro: true, times: 2, pid: "111222333" };
        arr[2] = { name: "345", rank: 4, score: 20, ispro: false, times: 0 };
        arr[3] = { name: "678", rank: 5, score: 20, ispro: false, times: 3 };
        arr[4] = { name: "345", rank: 6, score: 30, ispro: false, times: 3 };
        arr[5] = { name: "456", rank: 2, score: 20, ispro: false, times: 3 };
        arr[6] = { name: "789", rank: 3, score: 20, ispro: false, times: 2 };
        arr[7] = { name: "890", rank: 2, score: 20, ispro: false, times: 5 };
        var param = { mytimes: 5, itemnum: 2, aid: this.vo.aid, code: this.vo.code };
        var rect = new egret.Rectangle(0, 0, 520, bg.height - 10);
        var list = ComponentManager.getScrollList(AcGroupWifeBattleProtectItem, arr, rect, param);
        list.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        list.setPosition(bg.x + bg.width / 2 - rect.width / 2, bg.y + 5);
        view.addChild(list);
        view._list = list;
        view.freshview();
    };
    AcGroupWifeBattleProtectView.prototype.freshview = function () {
        var view = this;
        var code = view.getUiCode();
    };
    AcGroupWifeBattleProtectView.prototype.prankCallback = function (evt) {
        var view = this;
        if (evt.data.ret && evt.data.data.data) {
            view.freshview();
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCheerSucess"));
            var baseview = ViewController.getInstance().getView('AcBattleGroundCheerSelectView');
            baseview.hide();
        }
    };
    AcGroupWifeBattleProtectView.prototype.getShowHeight = function () {
        return 900;
    };
    AcGroupWifeBattleProtectView.prototype.dispose = function () {
        var view = this;
        view._timesTxt = null;
        view._itemNumTxt = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEGROUND_CHEER), view.prankCallback, view);
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleProtectView;
}(PopupView));
//# sourceMappingURL=AcGroupWifeBattleProtectView.js.map