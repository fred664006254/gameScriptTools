/**
 * 永乐大典使用成功，门客弹出UI
 * author qianjun
 */
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
var WiifeBattleYongleSuccessView = (function (_super) {
    __extends(WiifeBattleYongleSuccessView, _super);
    function WiifeBattleYongleSuccessView() {
        return _super.call(this) || this;
    }
    WiifeBattleYongleSuccessView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var bottomBg = BaseBitmap.create("public_9_wordbg");
        bottomBg.height = 290;
        bottomBg.y = (GameConfig.stageHeigth - bottomBg.height) / 2;
        this._nodeContainer.addChild(bottomBg);
        var closeBtn = ComponentManager.getButton("popupview_closebtn1", "", this.hide, this);
        closeBtn.x = this.viewBg.width - closeBtn.width - 15;
        closeBtn.y = bottomBg.y - closeBtn.height / 2;
        this._nodeContainer.addChild(closeBtn);
        // let closeBtn = 
        var titleFlag = BaseBitmap.create("wifebattleyonglestudytxt");
        titleFlag.x = bottomBg.x + bottomBg.width / 2 - titleFlag.width / 2;
        titleFlag.y = bottomBg.y - titleFlag.height / 2 - 10;
        this._nodeContainer.addChild(titleFlag);
        var sbg = BaseBitmap.create("studyatk_servant_bg");
        sbg.x = (GameConfig.stageWidth - sbg.width) / 2;
        sbg.y = bottomBg.y + (bottomBg.height - sbg.height) / 2;
        ;
        this._nodeContainer.addChild(sbg);
        var circleImg = BaseBitmap.create("studyatk_booklv_circle");
        circleImg.anchorOffsetX = circleImg.width / 2;
        circleImg.anchorOffsetY = circleImg.height / 2;
        circleImg.setScale(0.5);
        circleImg.x = sbg.x + sbg.width / 2;
        circleImg.y = sbg.y + sbg.height / 2;
        var light1 = BaseBitmap.create("studyatk_booklv_light1");
        light1.anchorOffsetX = light1.width / 2;
        light1.anchorOffsetY = light1.height / 2;
        light1.x = sbg.x + sbg.width / 2;
        light1.y = sbg.y + sbg.height / 2;
        light1.setScale(1.18);
        this._nodeContainer.addChild(light1);
        var light2 = BaseBitmap.create("studyatk_booklv_light2");
        light2.anchorOffsetX = light2.width / 2;
        light2.anchorOffsetY = light2.height / 2;
        light2.x = light1.x;
        light2.y = light1.y;
        light2.setScale(light1.scaleX);
        this._nodeContainer.addChild(light2);
        this._nodeContainer.addChild(circleImg);
        egret.Tween.get(circleImg, { loop: true }).to({ scaleX: 1.25, scaleY: 1.25 }, 1000).to({ scaleX: 2.0, scaleY: 2.0, alpha: 0 }, 1000).set({ scaleX: 0.5, scaleY: 0.5, alpha: 1 });
        egret.Tween.get(light1, { loop: true }).to({ rotation: 360 }, 15000);
        egret.Tween.get(light2, { loop: true }).to({ rotation: -360 }, 15000);
        var serInfo = null;
        var servantId = this.param.data.sid;
        var resPath = "servant_full_" + servantId;
        var simg = BaseLoadBitmap.create(resPath);
        var mask = egret.Rectangle.create();
        simg.width = 405;
        simg.height = 467;
        mask.setTo(0, 0, 405, 400);
        simg.mask = mask;
        simg.anchorOffsetX = simg.width / 2;
        simg.anchorOffsetY = simg.height / 2;
        simg.setScale(0.4);
        simg.x = sbg.x + sbg.width / 2;
        simg.y = sbg.y + sbg.height / 2 - 10;
        this._nodeContainer.addChild(simg);
        var bookBg = BaseBitmap.create("bookroom_cdbg");
        bookBg.scaleY = 1.7;
        bookBg.x = sbg.x + sbg.width / 2 - bookBg.width / 2;
        bookBg.y = sbg.y + sbg.height - 95;
        this._nodeContainer.addChild(bookBg);
        var tipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WARN_GREEN);
        tipTxt.text = this.param.data.text;
        tipTxt.x = bookBg.x + bookBg.width / 2 - tipTxt.width / 2;
        tipTxt.y = bookBg.y + bookBg.height * bookBg.scaleY / 2 - tipTxt.height / 2;
        this._nodeContainer.addChild(tipTxt);
    };
    WiifeBattleYongleSuccessView.prototype.clickHandler = function () {
        _super.prototype.hide.call(this);
    };
    WiifeBattleYongleSuccessView.prototype.getTitleStr = function () {
        return null;
    };
    WiifeBattleYongleSuccessView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "studyatk_servant_bg", "bookroom_cdbg", "popupview_closebtn1",
            "studyatk_booklv_circle", "studyatk_booklv_light1", "studyatk_booklv_light2", "wifebattleyonglestudytxt",
        ]);
    };
    WiifeBattleYongleSuccessView.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return WiifeBattleYongleSuccessView;
}(BaseView));
__reflect(WiifeBattleYongleSuccessView.prototype, "WiifeBattleYongleSuccessView");
//# sourceMappingURL=WiifeBattleYongleSuccessView.js.map