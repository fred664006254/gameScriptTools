/**
 * 韩国协议
 * author dukunayng
 * date 2017/10/28
 * @class KRAgreementView
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
var KRAgreementView = (function (_super) {
    __extends(KRAgreementView, _super);
    function KRAgreementView() {
        return _super.call(this) || this;
    }
    KRAgreementView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        return rewardPic.concat(["public_9_wordbg", "public_line3"
        ]);
    };
    KRAgreementView.prototype.getTitleBgName = function () {
        return null;
    };
    KRAgreementView.prototype.getTitleStr = function () {
        return null;
    };
    KRAgreementView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    KRAgreementView.prototype.initView = function () {
        var t = BaseBitmap.create("public_9_wordbg");
        t.height = 750,
            t.setPosition(GameConfig.stageWidth / 2 - t.width / 2, GameConfig.stageHeigth / 2 - t.height / 2),
            this.addChild(t);
        var e = ComponentManager.getTextField("이용약관 및 개인정보 취급방침 동의", TextFieldConst.FONTSIZE_BUTTON_COMMON);
        e.textColor = TextFieldConst.COLOR_LIGHT_YELLOW,
            e.x = GameConfig.stageWidth / 2 - e.width / 2,
            e.y = t.y + 30, this.addChild(e);
        var i = BaseBitmap.create("public_9_bg30");
        i.width = 600, i.height = 250, i.setPosition(20, t.y + 70),
            this.addChild(i);
        var a = BaseBitmap.create("public_line3");
        a.width = 480,
            a.x = GameConfig.stageWidth / 2 - a.width / 2, a.y = i.y + 20,
            this.addChild(a);
        var n = ComponentManager.getTextField("게임 이용 약관", TextFieldConst.FONTSIZE_BUTTON_COMMON);
        n.textColor = TextFieldConst.COLOR_LIGHT_YELLOW,
            n.x = GameConfig.stageWidth / 2 - n.width / 2, n.y = a.y - 3,
            this.addChild(n),
            this._checkBox1 = ComponentManager.getCheckBox("게임 이용 약관 동의"),
            this._checkBox1.setPosition(200, i.y + i.height + 10),
            this._checkBox1.name = "onekeyCheckBox",
            this.addChild(this._checkBox1),
            this._checkBox1.addTouchTap(this.selectHandler1, this);
        var o = BaseBitmap.create("public_9_bg30");
        o.width = 600, o.height = 250,
            o.setPosition(20, i.y + i.height + 50),
            this.addChild(o);
        var s = BaseBitmap.create("public_line3");
        s.width = 480,
            s.x = GameConfig.stageWidth / 2 - s.width / 2,
            s.y = o.y + 20, this.addChild(s);
        var r = ComponentManager.getTextField("개인 정보 취급 방침", TextFieldConst.FONTSIZE_BUTTON_COMMON);
        r.textColor = TextFieldConst.COLOR_LIGHT_YELLOW,
            r.x = GameConfig.stageWidth / 2 - r.width / 2, r.y = s.y - 3,
            this.addChild(r),
            this._checkBox2 = ComponentManager.getCheckBox("개인 정보 취급 방침 동의"),
            this._checkBox2.setPosition(200, o.y + o.height + 10),
            this._checkBox2.name = "onekeyCheckBox",
            this.addChild(this._checkBox2),
            this._checkBox2.addTouchTap(this.selectHandler2, this);
        var h = ResourceManager.getRes("kragreement").text1_1, l = ResourceManager.getRes("kragreement").text2;
        var conTainer1 = new BaseDisplayObjectContainer;
        var textTF1 = ComponentManager.getTextField(h, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        textTF1.y = 3, textTF1.width = 540,
            textTF1.lineSpacing = 5,
            conTainer1.addChild(textTF1);
        var h2 = ResourceManager.getRes("kragreement").text1_2;
        var textTF11 = ComponentManager.getTextField(h2, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        textTF11.y = textTF1.y + textTF1.height + 5, textTF11.width = 540,
            textTF11.lineSpacing = 5;
        conTainer1.addChild(textTF11);
        var h3 = ResourceManager.getRes("kragreement").text1_3;
        var textTF12 = ComponentManager.getTextField(h3, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        textTF12.y = textTF11.y + textTF11.height + 5, textTF12.width = 540,
            textTF12.lineSpacing = 5;
        conTainer1.addChild(textTF12);
        // conTainer1.height=textTF1.height+6;
        var c = 10;
        var rect1 = egret.Rectangle.create();
        rect1.setTo(0, 0, textTF1.width, 180 + c + 5);
        var _ = ComponentManager.getScrollView(conTainer1, rect1);
        this.addChild(_), _.setPosition((GameConfig.stageWidth - _.width) / 2, i.y + 40);
        var conTainer2 = new BaseDisplayObjectContainer;
        var textTF2 = ComponentManager.getTextField(l, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        textTF2.y = 3,
            textTF2.width = 540,
            textTF2.lineSpacing = 5,
            conTainer2.addChild(textTF2),
            conTainer2.height = textTF2.height + 6;
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, textTF2.width, 180 + c + 5);
        var m = ComponentManager.getScrollView(conTainer2, rect2);
        this.addChild(m),
            m.setPosition((GameConfig.stageWidth - m.width) / 2, o.y + 40),
            this._callBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "callBtn", this.clickCallBtn, this),
            this._callBtn.x = GameConfig.stageWidth / 2 - this._callBtn.width / 2,
            this._callBtn.y = this._checkBox2.y + this._checkBox2.height + 10,
            this._callBtn.setText("확인", !1), this.addChild(this._callBtn),
            this._callBtn.setColor(TextFieldConst.COLOR_BLACK), this._callBtn.setEnable(!1);
    };
    KRAgreementView.prototype.selectHandler1 = function () {
        this._checkBox1.checkSelected() && this._checkBox2.checkSelected() ? this._callBtn.setEnable(!0) : this._callBtn.setEnable(!1);
    };
    KRAgreementView.prototype.selectHandler2 = function () {
        this._checkBox1.checkSelected() && this._checkBox2.checkSelected() ? this._callBtn.setEnable(!0) : this._callBtn.setEnable(!1);
    };
    KRAgreementView.prototype.clickCallBtn = function () {
        LocalStorageManager.set("isShowKRAgreement", "true");
        if (this.param.data.confirmCallback) {
            this.param.data.confirmCallback.apply(this.param.data.handler, []);
        }
        this.dispose();
    };
    KRAgreementView.prototype.touchTap = function () {
        this.hide();
    };
    KRAgreementView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return KRAgreementView;
}(BaseView));
__reflect(KRAgreementView.prototype, "KRAgreementView");
