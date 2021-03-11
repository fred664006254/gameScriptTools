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
var AcCrossServerWifeTalentBuffPopupView = (function (_super) {
    __extends(AcCrossServerWifeTalentBuffPopupView, _super);
    function AcCrossServerWifeTalentBuffPopupView() {
        var _this = _super.call(this) || this;
        _this._rankText = null;
        _this._nameText = null;
        _this._scoreText = null;
        _this._descText = null;
        _this._scrollList1 = null;
        return _this;
    }
    AcCrossServerWifeTalentBuffPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifetalentlistbg1", "wifetalentlistbg2"
        ]);
    };
    Object.defineProperty(AcCrossServerWifeTalentBuffPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWifeTalentBuffPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeTalentBuffPopupView.prototype.initView = function () {
        var uidata = this.param.data.data;
        var scrollListBgRect = egret.Rectangle.create();
        scrollListBgRect.setTo(0, 0, 518, 541);
        var view = this;
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
        var model = this.vo.wifebattlecross; //Api.wifebattleVoApi.wifebattleVo;
        var artsum = this.vo.test ? 0 : (model.info.artsum ? model.info.artsum : 0);
        var wifeBattleBuff = this.cfg.wifeBattleBuff;
        var curlv = 1;
        var maxV = 0;
        for (var index = 0; index < wifeBattleBuff.length; index++) {
            var element = wifeBattleBuff[index];
            var artistryRange = element.artistryRange;
            if (artistryRange[0] <= artsum && artsum <= artistryRange[1]) {
                maxV = artistryRange[1];
                break;
            }
            ++curlv;
        }
        var scroRect = new egret.Rectangle(0, 0, bg2.width, contentBg.height - 12 - bg2.height - 10);
        this._scrollList1 = ComponentManager.getScrollList(AcCrossServerWifeAllTalentBuffItem, uidata, scroRect, { num: artsum, curlv: curlv });
        this._scrollList1.x = this.viewBg.width / 2 - this._scrollList1.width / 2;
        this._scrollList1.y = bg2.y + bg2.height;
        this.addChildToContainer(this._scrollList1);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalent_bufftxt3"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(65 + GameData.popupviewOffsetX, bg2.y + bg2.height / 2 - rankText.height / 2);
        this.addChildToContainer(rankText);
        this._rankText = rankText;
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalent_bufftxt4"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(155 + GameData.popupviewOffsetX, rankText.y);
        this.addChildToContainer(nameText);
        this._nameText = nameText;
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalent_bufftxt5"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(335 + GameData.popupviewOffsetX, rankText.y);
        this.addChildToContainer(scoreText);
        this._scoreText = scoreText;
        this._scrollList1.setScrollTopByIndex(curlv - 1);
    };
    AcCrossServerWifeTalentBuffPopupView.prototype.getTitleParams = function () {
        return [""];
    };
    AcCrossServerWifeTalentBuffPopupView.prototype.dispose = function () {
        this._rankText = null;
        this._nameText = null;
        this._scoreText = null;
        this._descText = null;
        this._scrollList1 = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeTalentBuffPopupView;
}(PopupView));
__reflect(AcCrossServerWifeTalentBuffPopupView.prototype, "AcCrossServerWifeTalentBuffPopupView");
//# sourceMappingURL=AcCrossServerWifeTalentBuffPopupView.js.map