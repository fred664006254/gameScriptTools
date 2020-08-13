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
var AcSingleDayEnvelopeView = (function (_super) {
    __extends(AcSingleDayEnvelopeView, _super);
    function AcSingleDayEnvelopeView() {
        var _this = _super.call(this) || this;
        _this._checkBox1 = undefined;
        _this._checkBox2 = undefined;
        _this._inputTextField1 = null;
        _this._inputTextField2 = null;
        return _this;
    }
    AcSingleDayEnvelopeView.prototype.initView = function () {
        // this.envelopDetails();
        this.dispatchEnvelop();
    };
    AcSingleDayEnvelopeView.prototype.envelopDetails = function () {
        var bg = BaseLoadBitmap.create("acsingleday_envelope_bg2");
        bg.width = 479;
        bg.height = 557;
        bg.x = GameConfig.stageWidth / 2 - bg.width / 2;
        bg.y = GameConfig.stageHeigth / 2 - bg.height / 2;
        this.addChild(bg);
        var titleImg = BaseBitmap.create("acsingleday_envelope_wordimg");
        titleImg.x = GameConfig.stageWidth / 2 - titleImg.width / 2;
        titleImg.y = bg.y - titleImg.height / 2 - 20;
        this.addChild(titleImg);
        this.closeBtn.x = bg.x + bg.width - this.closeBtn.width + 10;
        this.closeBtn.y = bg.y - 20;
        this.swapChildren(bg, this.closeBtn);
        var txt1 = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDay_envelope_detailTxt1", ["" + 100]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt1.setPosition(bg.x + bg.width / 2 - txt1.width / 2, bg.y + 58);
        this.addChild(txt1);
        var head = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(), Api.playerVoApi.getPlayerPtitle());
        head.x = bg.x + bg.width / 2 - head.width / 2;
        head.y = txt1.y + 35;
        this.addChild(head);
        var txt2 = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDay_envelope_detailTxt2", ["wo"]), 20);
        txt2.setPosition(bg.x + bg.width / 2 - txt2.width / 2, head.y + head.height + 10);
        this.addChild(txt2);
        var txt3 = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDay_envelope_detailTxt3", ["1/3", "100"]), 20, TextFieldConst.COLOR_BROWN);
        txt3.setPosition(bg.x + bg.width / 2 - txt3.width / 2, txt2.y + 35);
        this.addChild(txt3);
        var markLeft = BaseBitmap.create("acsingleday_line");
        markLeft.x = bg.x + bg.width / 2 - markLeft.width / 2;
        markLeft.y = txt3.y + 35;
        this.addChild(markLeft);
        var tipbg = BaseBitmap.create("acsingleday_envelope_txtbg");
        tipbg.width = bg.width - 150;
        tipbg.x = GameConfig.stageWidth / 2 - tipbg.width / 2;
        tipbg.y = bg.y + bg.height - 115;
        this.addChild(tipbg);
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDay_envelope_tip2"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt2.setPosition(GameConfig.stageWidth / 2 - tipTxt2.width / 2, tipbg.y + tipbg.height / 2 - tipTxt2.height / 2);
        this.addChild(tipTxt2);
    };
    AcSingleDayEnvelopeView.prototype.dispatchEnvelop = function () {
        var bg = BaseLoadBitmap.create("acsingleday_envelope_bg1");
        bg.width = 479;
        bg.height = 557;
        bg.x = GameConfig.stageWidth / 2 - bg.width / 2;
        bg.y = GameConfig.stageHeigth / 2 - bg.height / 2;
        this.addChild(bg);
        var titleImg = BaseBitmap.create("acsingleday_envelope_wordimg");
        titleImg.x = GameConfig.stageWidth / 2 - titleImg.width / 2;
        titleImg.y = bg.y - titleImg.height / 2 - 20;
        this.addChild(titleImg);
        this.closeBtn.x = bg.x + bg.width - this.closeBtn.width + 10;
        this.closeBtn.y = bg.y - 20;
        this.swapChildren(bg, this.closeBtn);
        var txt1 = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDay_envelope_txt1"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt1.setPosition(bg.x + bg.width / 2 - txt1.width / 2, bg.y + 58);
        this.addChild(txt1);
        var checkBox1 = ComponentManager.getCheckBox(LanguageManager.getlocal("acSingleDay_envelope_txt2"));
        checkBox1.x = bg.x + bg.width / 2 - checkBox1.width - 10;
        checkBox1.y = txt1.y + 35;
        this.addChild(checkBox1);
        this._checkBox1 = checkBox1;
        var checkBox2 = ComponentManager.getCheckBox(LanguageManager.getlocal("acSingleDay_envelope_txt3"));
        checkBox2.x = bg.x + bg.width / 2 + 20;
        checkBox2.y = checkBox1.y;
        this.addChild(checkBox2);
        this._checkBox2 = checkBox2;
        var markLeft = BaseBitmap.create("acsingleday_line");
        markLeft.x = bg.x + bg.width / 2 - markLeft.width / 2;
        markLeft.y = checkBox1.y + checkBox1.height + 5;
        this.addChild(markLeft);
        // let markRight = BaseBitmap.create("public_v_huawen02");
        // markRight.anchorOffsetX = 4;
        // markRight.x = markLeft.x + 0;
        // markRight.y = markLeft.y;
        // this.addChild(markRight);
        // let totalTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDay_envelope_txt4"),20,TextFieldConst.COLOR_BROWN);
        // totalTxt.setPosition(bg.x + 130  ,markLeft.y + 25);
        // this.addChild(totalTxt);
        // let countTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDay_envelope_txt5"),20,TextFieldConst.COLOR_BROWN);
        // countTxt.setPosition(totalTxt.x   ,totalTxt.y + 45);
        // this.addChild(countTxt);
        // let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,20,150,40,"public_tc_srkbg05","",TextFieldConst.COLOR_WHITE);
        // inputTF.x = bg.x + bg.width/2;
        // inputTF.y = totalTxt.y + totalTxt.height/2 - inputTF.height/2 ;
        // this.addChild(inputTF);
        // this._inputTextField1 = <BaseTextField>inputTF.getChildByName("textField");
        // this._inputTextField1.restrict = "0-9";
        // this._inputTextField1.maxChars = 40;
        // let inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,20,150,40,"public_tc_srkbg05","",TextFieldConst.COLOR_WHITE);
        // inputTF2.x = inputTF.x ;
        // inputTF2.y = countTxt.y + countTxt.height/2 - inputTF2.height/2;
        // this.addChild(inputTF2);
        // this._inputTextField2 = <BaseTextField>inputTF2.getChildByName("textField");
        // this._inputTextField2.restrict = "0-9";
        // this._inputTextField2.maxChars = 40;
        var itemDescTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDay_envelope_tip1"), 20, TextFieldConst.COLOR_BROWN);
        itemDescTxt.multiline = true;
        itemDescTxt.lineSpacing = 5;
        itemDescTxt.setPosition(GameConfig.stageWidth / 2 - itemDescTxt.width / 2, markLeft.y + 20);
        this.addChild(itemDescTxt);
        var tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDay_envelope_tip1"), 20, TextFieldConst.COLOR_WARN_GREEN);
        tipTxt1.setPosition(GameConfig.stageWidth / 2 - tipTxt1.width / 2, bg.y + 240);
        this.addChild(tipTxt1);
        var tipbg = BaseBitmap.create("acsingleday_envelope_txtbg");
        tipbg.width = bg.width - 150;
        tipbg.x = GameConfig.stageWidth / 2 - tipbg.width / 2;
        tipbg.y = bg.y + bg.height - 100;
        this.addChild(tipbg);
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDay_envelope_tip2"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt2.setPosition(GameConfig.stageWidth / 2 - tipTxt2.width / 2, tipbg.y + tipbg.height / 2 - tipTxt2.height / 2);
        this.addChild(tipTxt2);
        var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acSingleDay_envelope_btntxt", this.dispatchBtnHandler, this);
        btn.x = GameConfig.stageWidth / 2 - btn.width / 2;
        btn.y = bg.y + bg.height - 210;
        this.addChild(btn);
    };
    AcSingleDayEnvelopeView.prototype.dispatchBtnHandler = function () {
    };
    AcSingleDayEnvelopeView.prototype.getTitleStr = function () {
        return "";
    };
    // 关闭按钮图标名称
    AcSingleDayEnvelopeView.prototype.getCloseBtnName = function () {
        return "btn_lantern";
    };
    AcSingleDayEnvelopeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acsingleday_envelope_txtbg",
            "acsingleday_envelope_wordimg",
            "acsingleday_line",
        ]);
    };
    AcSingleDayEnvelopeView.prototype.dispose = function () {
        this._checkBox1 = null;
        this._checkBox2 = null;
        this._inputTextField1 = null;
        this._inputTextField2 = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayEnvelopeView;
}(BaseView));
__reflect(AcSingleDayEnvelopeView.prototype, "AcSingleDayEnvelopeView");
//# sourceMappingURL=AcSingleDayEnvelopeView.js.map