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
var Realname3View = (function (_super) {
    __extends(Realname3View, _super);
    function Realname3View() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Realname3View.prototype.initView = function () {
        this.goButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "realnamedes5", this.goButtonClick, this);
        this.addChild(this.goButton);
    };
    Realname3View.prototype.goButtonClick = function () {
        console.log("goButtonClick");
        ViewController.getInstance().openView(ViewConst.POPUP.REALNAME3INPUTVIEW);
        this.hide();
    };
    Realname3View.prototype.getCloseBtnName = function () {
        return "btn_lantern";
    };
    Realname3View.prototype.getTitleBgName = function () {
        return "";
    };
    Realname3View.prototype.initBg = function () {
        this.viewBg = BaseBitmap.create("realname3_bg1");
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    Realname3View.prototype.resetBgSize = function () {
        this.closeBtn.setPosition(this.viewBg.x + 460, this.viewBg.y);
        this.goButton.x = this.viewBg.x + this.viewBg.width / 2 + 96 - this.goButton.width / 2;
        this.goButton.y = this.viewBg.y + this.viewBg.height / 2 + 16 - this.goButton.height / 2;
    };
    Realname3View.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["realname3_bg1"]);
    };
    Realname3View.prototype.getTitleStr = function () {
        return null;
    };
    Realname3View.prototype.dispose = function () {
        this.goButton = null;
        _super.prototype.dispose.call(this);
    };
    return Realname3View;
}(PopupView));
__reflect(Realname3View.prototype, "Realname3View");
