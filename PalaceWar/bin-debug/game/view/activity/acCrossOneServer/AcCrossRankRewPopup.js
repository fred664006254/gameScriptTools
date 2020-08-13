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
var AcCrossRankRewPopupView = /** @class */ (function (_super) {
    __extends(AcCrossRankRewPopupView, _super);
    function AcCrossRankRewPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcCrossRankRewPopupView.prototype, "Vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossRankRewPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACCROSSONESERVER_GETRANK), this.refreshMyRank, this);
        var listBg = BaseLoadBitmap.create("public_scrolllistbg");
        listBg.width = 526;
        listBg.height = 606;
        this.addChildToContainer(listBg);
        listBg.setPosition((this.getShowWidth() - listBg.width) / 2, 0);
        var _msgBg = BaseLoadBitmap.create("public_9_bg1");
        this.addChildToContainer(_msgBg);
        _msgBg.width = 526;
        _msgBg.height = 108;
        _msgBg.setPosition((this.getShowWidth() - _msgBg.width) / 2, listBg.height + 4);
        this.scoreLabel = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText8", ["" + this.Vo.risePower]), 24, 0xfcf3b4);
        this.addChildToContainer(this.scoreLabel);
        this.scoreLabel.setPosition(_msgBg.x + 20, _msgBg.y + 25);
        this.rankLabel = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText9", [""]), 24, 0xfcf3b4);
        this.addChildToContainer(this.rankLabel);
        this.rankLabel.setPosition(_msgBg.x + 20, _msgBg.y + 62);
        this.Vo.getRankInfo(1);
        this.lookRankBtn = ComponentManager.getButton("btn2_small_yellow", "acCrossOneServerText10", this.lookRank, this);
        this.addChildToContainer(this.lookRankBtn);
        this.lookRankBtn.setPosition(_msgBg.x + 378, _msgBg.y + 32);
        this.refreshList();
    };
    AcCrossRankRewPopupView.prototype.lookRank = function () {
        if (this.Vo.isEnd) {
            this.Vo.showAcEndTip();
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSRANKPOPUPVIEW, {
            aid: this.param.data.aid,
            code: this.param.data.code
        });
    };
    AcCrossRankRewPopupView.prototype.refreshMyRank = function (e) {
        var __myrank = LanguageManager.getlocal("acCrossOneServerText18");
        if (e.data.ret && e.data.data.data && e.data.data.data.myrankArr) {
            var _db = e.data.data.data;
            if (_db.myrankArr.myrank) {
                __myrank = "" + _db.myrankArr.myrank;
            }
        }
        this.rankLabel.text = LanguageManager.getlocal("acCrossOneServerText9", [__myrank]);
    };
    AcCrossRankRewPopupView.prototype.formatData = function () {
        var _this = this;
        this._list_db = [];
        this._list_db = this.Vo.config.awardList.map(function (v) {
            return {
                aid: _this.param.aid,
                code: _this.param.code,
                rewards: v.getReward,
                rank: v.rank
            };
        });
    };
    AcCrossRankRewPopupView.prototype.refreshList = function () {
        this.formatData();
        if (!this._listview) {
            var list_w = 510;
            var list_h = 606 - 16;
            this._listview = ComponentManager.getScrollList(AcCrossRankRewItem, [], new egret.Rectangle(0, 0, list_w, list_h));
            this.addChildToContainer(this._listview);
            this._listview.setPosition((this.getShowWidth() - list_w) / 2, 8);
        }
        this._listview.refreshData(this._list_db);
    };
    AcCrossRankRewPopupView.prototype.getTitleStr = function () {
        return "acCrossOneServerText4";
    };
    AcCrossRankRewPopupView.prototype.getShowHeight = function () {
        return 820;
    };
    AcCrossRankRewPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.container.y = this.viewBg.y + 72;
    };
    AcCrossRankRewPopupView.prototype.dispose = function () {
        this._listview = null;
        this._list_db = null;
        this.scoreLabel = null;
        this.rankLabel = null;
        this.lookRankBtn = null;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACCROSSONESERVER_GETRANK), this.refreshMyRank, this);
        _super.prototype.dispose.call(this);
    };
    return AcCrossRankRewPopupView;
}(PopupView));
//# sourceMappingURL=AcCrossRankRewPopup.js.map