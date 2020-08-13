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
 * 才情加成
 * author jiangliuyang
 */
var AcThreeKingdomsBuffPopupView = (function (_super) {
    __extends(AcThreeKingdomsBuffPopupView, _super);
    function AcThreeKingdomsBuffPopupView() {
        var _this = _super.call(this) || this;
        _this._rankText = null;
        _this._nameText = null;
        _this._scoreText = null;
        _this._descText = null;
        _this._scrollList1 = null;
        return _this;
    }
    AcThreeKingdomsBuffPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifetalentlistbg1", "wifetalentlistbg2"
        ]);
    };
    Object.defineProperty(AcThreeKingdomsBuffPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsBuffPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsBuffPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsBuffPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsBuffPopupView.prototype.getUiCode = function () {
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
    Object.defineProperty(AcThreeKingdomsBuffPopupView.prototype, "cityId", {
        get: function () {
            return this.param.data.cityid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsBuffPopupView.prototype, "kingdomid", {
        get: function () {
            return this.param.data.kingdomid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsBuffPopupView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    AcThreeKingdomsBuffPopupView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    AcThreeKingdomsBuffPopupView.prototype.initView = function () {
        var view = this;
        // let uidata = this.param.data;
        var scrollListBgRect = egret.Rectangle.create();
        scrollListBgRect.setTo(0, 0, 518, 541);
        var code = view.getUiCode();
        var contentBg = BaseBitmap.create("public_9_bg36");
        contentBg.width = 528; //538
        contentBg.height = 530; //666
        contentBg.x = this.viewBg.width / 2 - contentBg.width / 2; //view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
        contentBg.y = 20;
        view.addChildToContainer(contentBg);
        var bg2 = BaseBitmap.create("public_9_bg33");
        bg2.width = contentBg.width;
        bg2.height = 30;
        bg2.x = this.viewBg.width / 2 - bg2.width / 2;
        bg2.y = contentBg.y;
        this.addChildToContainer(bg2);
        // let model = Api.wifebattleVoApi.wifebattleVo;
        var armynum = view.vo.getCityKingdomArmy(view.kingdomid, view.cityId, view.vo.getMyKingdoms());
        var uidata = view.kingdomid == 0 ? view.cfg.troop2 : view.cfg.troop1;
        var curlv = 0;
        var maxV = 0;
        for (var index = 0; index < uidata.length; index++) {
            var element = uidata[index];
            if (armynum < (element.needNum * 100000000)) {
                break;
            }
            ++curlv;
        }
        var scroRect = new egret.Rectangle(0, 0, bg2.width, contentBg.height - 12 - bg2.height - 10);
        this._scrollList1 = ComponentManager.getScrollList(AcThreeKingdomsBuffScrollItem, uidata, scroRect, { num: armynum, curlv: curlv });
        this._scrollList1.x = this.viewBg.width / 2 - this._scrollList1.width / 2;
        this._scrollList1.y = bg2.y + bg2.height;
        this.addChildToContainer(this._scrollList1);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip34", code)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(95, bg2.y + bg2.height / 2 - rankText.height / 2);
        this.addChildToContainer(rankText);
        this._rankText = rankText;
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip35", code)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(190, rankText.y);
        this.addChildToContainer(nameText);
        this._nameText = nameText;
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip36", code)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(380, rankText.y);
        this.addChildToContainer(scoreText);
        this._scoreText = scoreText;
        if (curlv) {
            this._scrollList1.setScrollTopByIndex(curlv - 1);
        }
    };
    AcThreeKingdomsBuffPopupView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acThreeKingdomsTip40", this.getUiCode());
    };
    AcThreeKingdomsBuffPopupView.prototype.getTitleParams = function () {
        return [""];
    };
    AcThreeKingdomsBuffPopupView.prototype.dispose = function () {
        this._rankText = null;
        this._nameText = null;
        this._scoreText = null;
        this._descText = null;
        this._scrollList1 = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsBuffPopupView;
}(PopupView));
__reflect(AcThreeKingdomsBuffPopupView.prototype, "AcThreeKingdomsBuffPopupView");
//# sourceMappingURL=AcThreeKingdomsBuffPopupView.js.map