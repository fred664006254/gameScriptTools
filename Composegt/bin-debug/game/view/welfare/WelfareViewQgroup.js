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
var WelfareViewQgroup = (function (_super) {
    __extends(WelfareViewQgroup, _super);
    function WelfareViewQgroup() {
        return _super.call(this) || this;
    }
    WelfareViewQgroup.prototype.init = function () {
        _super.prototype.init.call(this);
        this.bottomBg.visible = false;
        var btBg = BaseBitmap.create("firstrecharge_bottom");
        btBg.x = 0;
        btBg.y = GameConfig.stageHeigth - btBg.height - 80;
        this.addChild(btBg);
        var wordImg = BaseBitmap.create("qgroup_font");
        wordImg.anchorOffsetY = wordImg.height;
        wordImg.x = this.bottomBg.x + this.bottomBg.width / 2 - wordImg.width / 2;
        wordImg.y = btBg.y;
        this.addChild(wordImg);
        var cenX = 245;
        var txt1 = ComponentManager.getTextField(LanguageManager.getlocal("welfareViewQQGroup1", [this._qqNo]), 20);
        txt1.x = cenX - txt1.width / 2;
        txt1.y = wordImg.y - 33;
        this.addChild(txt1);
        var txt2 = ComponentManager.getTextField(LanguageManager.getlocal("welfareViewQQGroup2"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt2.x = cenX - txt2.width / 2;
        txt2.y = btBg.y + 11;
        this.addChild(txt2);
        var temScale = 0.8;
        var spaceW = 15;
        var spaceH = 10;
        var shareShowZJ = Config.GameprojectCfg.shareShowZJ;
        var rIconArr = GameData.getRewardItemIcons(shareShowZJ, true, true);
        var totalNum = rIconArr.length;
        for (var index = 0; index < totalNum; index++) {
            var icon = rIconArr[index];
            icon.scaleX = icon.scaleY = temScale;
            icon.x = btBg.x + btBg.width / 2 + (icon.width * temScale) * (index - totalNum / 2) + spaceW * (index - (totalNum - 1) / 2);
            icon.y = btBg.y + 50;
            this.addChild(icon);
        }
        var copyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "welfareViewQQGroup3", this.copyBtnHandler, this);
        copyBtn.x = cenX - copyBtn.width / 2;
        copyBtn.y = btBg.y + 200;
        this.addChild(copyBtn);
        var txt4 = ComponentManager.getTextField(LanguageManager.getlocal("welfareViewQQGroup4"), 18, TextFieldConst.COLOR_WARN_YELLOW2);
        txt4.width = GameConfig.stageWidth - 220;
        txt4.multiline = true;
        txt4.lineSpacing = 5;
        txt4.x = cenX - txt4.width / 2;
        txt4.y = copyBtn.y + 80;
        this.addChild(txt4);
    };
    WelfareViewQgroup.prototype.copyBtnHandler = function () {
        var input = document.createElement("input");
        input.value = this._qqNo;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length),
            document.execCommand('Copy');
        document.body.removeChild(input);
        App.CommonUtil.showTip(LanguageManager.getlocal("welfareViewQQGroup5"));
    };
    WelfareViewQgroup.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "qgroup_font",
        ]);
    };
    WelfareViewQgroup.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_USER_GETKFCARDMSG, requestData: {} };
    };
    //请求回调
    WelfareViewQgroup.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_USER_GETKFCARDMSG) {
            var rData = data.data.data;
            this._qqNo = rData.msg;
        }
    };
    WelfareViewQgroup.prototype.dispose = function () {
        this._qqNo = null;
        _super.prototype.dispose.call(this);
    };
    return WelfareViewQgroup;
}(WelfareViewTab));
__reflect(WelfareViewQgroup.prototype, "WelfareViewQgroup");
