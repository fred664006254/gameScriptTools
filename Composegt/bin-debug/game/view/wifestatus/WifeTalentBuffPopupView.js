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
var WifeTalentBuffPopupView = (function (_super) {
    __extends(WifeTalentBuffPopupView, _super);
    function WifeTalentBuffPopupView() {
        var _this = _super.call(this) || this;
        _this._rankText = null;
        _this._nameText = null;
        _this._scoreText = null;
        _this._descText = null;
        _this._scrollList1 = null;
        return _this;
    }
    WifeTalentBuffPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    WifeTalentBuffPopupView.prototype.initView = function () {
        var uidata = this.param.data;
        var scrollListBgRect = egret.Rectangle.create();
        scrollListBgRect.setTo(0, 0, 518, 541);
        var view = this;
        var contentBg = BaseBitmap.create("public_tc_bg01");
        contentBg.width = 540; //538
        contentBg.height = 600; //666
        contentBg.x = this.viewBg.width / 2 - contentBg.width / 2; //view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
        contentBg.y = 20;
        view.addChildToContainer(contentBg);
        var bg1 = BaseBitmap.create("public_tc_bg03");
        bg1.width = contentBg.width - 20;
        bg1.height = contentBg.height - 20;
        bg1.x = contentBg.x + 10;
        bg1.y = contentBg.y + 10;
        this.addChildToContainer(bg1);
        var bg2 = BaseBitmap.create("public_up3");
        bg2.width = bg1.width - 10;
        bg2.height = 30;
        bg2.x = this.viewBg.width / 2 - bg2.width / 2;
        bg2.y = bg1.y + 5;
        this.addChildToContainer(bg2);
        var model = Api.wifebattleVoApi.wifebattleVo;
        var artsum = model.info.artsum ? model.info.artsum : 0;
        var scroRect = new egret.Rectangle(0, 0, bg2.width, bg1.height - 12 - bg2.height - 10);
        this._scrollList1 = ComponentManager.getScrollList(WifeTalentBuffScrollItem, uidata, scroRect, artsum);
        this._scrollList1.x = this.viewBg.width / 2 - this._scrollList1.width / 2;
        this._scrollList1.y = bg2.y + bg2.height + 5;
        this.addChildToContainer(this._scrollList1);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalent_bufftxt3"), 20, TextFieldConst.COLOR_BROWN_NEW);
        rankText.setPosition(120 - rankText.width / 2, bg2.y + bg2.height / 2 - rankText.height / 2);
        this.addChildToContainer(rankText);
        this._rankText = rankText;
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalent_bufftxt4"), 20, TextFieldConst.COLOR_BROWN_NEW);
        nameText.setPosition(250 - nameText.width / 2, rankText.y);
        this.addChildToContainer(nameText);
        this._nameText = nameText;
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalent_bufftxt5"), 20, TextFieldConst.COLOR_BROWN_NEW);
        scoreText.setPosition(460 - scoreText.width / 2, rankText.y);
        this.addChildToContainer(scoreText);
        this._scoreText = scoreText;
    };
    WifeTalentBuffPopupView.prototype.getTitleParams = function () {
        return [""];
    };
    WifeTalentBuffPopupView.prototype.dispose = function () {
        this._rankText = null;
        this._nameText = null;
        this._scoreText = null;
        this._descText = null;
        this._scrollList1 = null;
        _super.prototype.dispose.call(this);
    };
    return WifeTalentBuffPopupView;
}(PopupView));
__reflect(WifeTalentBuffPopupView.prototype, "WifeTalentBuffPopupView");
