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
var AcCrossRankPopupView = /** @class */ (function (_super) {
    __extends(AcCrossRankPopupView, _super);
    function AcCrossRankPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcCrossRankPopupView.prototype, "Vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossRankPopupView.prototype.initView = function () {
        var listBg1 = BaseLoadBitmap.create("public_scrolllistbg");
        listBg1.width = 526;
        listBg1.height = 606;
        this.addChildToContainer(listBg1);
        listBg1.setPosition((this.getShowWidth() - listBg1.width) / 2, 0);
        var listBg2 = BaseLoadBitmap.create("public_popupscrollitembg");
        listBg2.width = 510;
        listBg2.height = 606 - 16 - 4;
        this.addChildToContainer(listBg2);
        listBg2.setPosition(listBg1.x + 8, listBg1.y + 12);
        var titleBg = BaseLoadBitmap.create("public_9_bg33");
        this.addChildToContainer(titleBg);
        titleBg.width = 510;
        titleBg.height = 34;
        titleBg.setPosition(listBg2.x, listBg2.y - 4);
        var _t1 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText11"), 22, 0xfcf3b4);
        this.addChildToContainer(_t1);
        _t1.setPosition(titleBg.x + 44, titleBg.y + 6);
        var _t2 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText12"), 22, 0xfcf3b4);
        this.addChildToContainer(_t2);
        _t2.setPosition(titleBg.x + 174 - 25, titleBg.y + 6);
        var _t3 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText21"), 22, 0xfcf3b4);
        this.addChildToContainer(_t3);
        _t3.setPosition(titleBg.x + 399 - 115, titleBg.y + 6);
        var _t4 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText13"), 22, 0xfcf3b4);
        this.addChildToContainer(_t4);
        _t4.setPosition(titleBg.x + 399 - 20, titleBg.y + 6);
        var _msgBg = BaseLoadBitmap.create("public_9_bg1");
        this.addChildToContainer(_msgBg);
        _msgBg.width = 526;
        _msgBg.height = 108;
        _msgBg.setPosition((this.getShowWidth() - _msgBg.width) / 2, listBg1.height + 4);
        var _nickLabel = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText14", [Api.playerVoApi.getPlayerName()]), 24, 0xfcf3b4);
        this.addChildToContainer(_nickLabel);
        _nickLabel.setPosition(_msgBg.x + 20, _msgBg.y + 26);
        var _zidLabel = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText22", [ServerCfg.selectServer.zid]), 24, 0xfcf3b4);
        this.addChildToContainer(_zidLabel);
        _zidLabel.setPosition(_msgBg.x + 300 - 40, _msgBg.y + 26);
        var _scoreLabel = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText15", ["" + this.Vo.risePower]), 24, 0xfcf3b4);
        this.addChildToContainer(_scoreLabel);
        _scoreLabel.setPosition(_msgBg.x + 300 - 40, _msgBg.y + 62);
        this._rankLabel = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText16", ['']), 24, 0xfcf3b4);
        this.addChildToContainer(this._rankLabel);
        this._rankLabel.setPosition(_msgBg.x + 20, _msgBg.y + 62);
        this.noRankTip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText17"), 24, 0xffffff);
        this.addChildToContainer(this.noRankTip);
        this.noRankTip.width = this.getShowWidth();
        this.noRankTip.textAlign = TextFieldConst.ALIGH_CENTER;
        this.noRankTip.setPosition(0, this.getShowHeight() * 0.3);
        this.noRankTip.setVisible(false);
        var list_w = 498;
        var list_h = 544;
        var reqParam = {
            requestType: NetRequestConst.REQUEST_ACCROSSONESERVER_GETRANK,
            requestParam: {
                activeId: this.param.data.aid + "-" + this.param.data.code,
                index: 1
            }
        };
        this._listview = ComponentManager.getRankScrollList(AcCrossRankItem, [], new egret.Rectangle(0, 0, list_w, list_h), { index: 0 }, reqParam);
        this.addChildToContainer(this._listview);
        this._listview.setPosition((this.getShowWidth() - list_w) / 2, 8 + 34);
        this._listview.setRequestIndex(1);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACCROSSONESERVER_GETRANK), this.refreshList, this);
        this.Vo.getRankInfo(1);
    };
    AcCrossRankPopupView.prototype.refreshList = function (e) {
        var _this = this;
        var _listDB = [];
        var _index = e.data.data.data.index || 1;
        if (e.data.ret && e.data.data.data && e.data.data.data.rankArr && e.data.data.data.rankArr.map) {
            _listDB = e.data.data.data.rankArr.map(function (v, i) {
                return {
                    aid: _this.param.data.aid,
                    code: _this.param.data.code,
                    rank: (_index - 1) * 100 + i + 1,
                    uid: v.uid,
                    nick: v.name,
                    zid: v.zid,
                    score: v.value
                };
            });
        }
        if (_index == 1 && _listDB.length == 0) {
            this._listview.visible = false;
        }
        else {
            this._listview.visible = true;
            this._listview.refreshRankData(_listDB, { index: _index });
        }
        this.noRankTip.setVisible(_index == 1 && _listDB.length == 0);
        var __myrank = LanguageManager.getlocal("acCrossOneServerText18");
        if (e.data.ret && e.data.data.data && e.data.data.data.myrankArr) {
            var _db = e.data.data.data;
            if (_db.myrankArr.myrank) {
                __myrank = "" + _db.myrankArr.myrank;
            }
        }
        this._rankLabel.text = LanguageManager.getlocal("acCrossOneServerText16", [__myrank]);
    };
    AcCrossRankPopupView.prototype.getTitleStr = function () {
        return "acCrossOneServerText3";
    };
    AcCrossRankPopupView.prototype.getShowHeight = function () {
        return 820;
    };
    AcCrossRankPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.container.y = this.viewBg.y + 72;
    };
    AcCrossRankPopupView.prototype.dispose = function () {
        this._listview = null;
        this._rankLabel = null;
        this.noRankTip = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACCROSSONESERVER_GETRANK), this.refreshList, this);
        _super.prototype.dispose.call(this);
    };
    return AcCrossRankPopupView;
}(PopupView));
//# sourceMappingURL=AcCrossRankPopup.js.map