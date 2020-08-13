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
var WelfareViewOfficialWeChat = (function (_super) {
    __extends(WelfareViewOfficialWeChat, _super);
    function WelfareViewOfficialWeChat() {
        return _super.call(this) || this;
    }
    WelfareViewOfficialWeChat.prototype.init = function () {
        _super.prototype.init.call(this);
        var temW = 491;
        var temH = this.bottomBg.height + this.bottomBg.y;
        var bg1 = BaseBitmap.create("public_9v_bg04");
        bg1.width = temW - 40;
        bg1.height = 40;
        bg1.x = temW / 2 - bg1.width / 2;
        bg1.y = this.bottomBg.y + 30;
        this.addChild(bg1);
        // wechatdes1 微信描述
        var publicdes = ComponentManager.getTextField(LanguageManager.getlocal("wechatdes1"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN);
        publicdes.x = bg1.x + bg1.width / 2 - publicdes.width / 2;
        publicdes.y = bg1.y + bg1.height / 2 - publicdes.height / 2;
        this.addChild(publicdes);
        var line1 = BaseBitmap.create("public_line3");
        line1.width = temW - 100;
        line1.x = temW / 2 - line1.width / 2;
        line1.y = this.bottomBg.y + 90;
        this.addChild(line1);
        var nameTF = ComponentManager.getTextField(LanguageManager.getlocal("officialWeChat"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nameTF.x = line1.x + line1.width / 2 - nameTF.width / 2;
        nameTF.y = line1.y + line1.height / 2 - nameTF.height / 2;
        this.addChild(nameTF);
        var bg = BaseBitmap.create("public_9v_bg04");
        bg.width = temW - 40;
        bg.height = 100;
        bg.x = temW / 2 - bg.width / 2;
        bg.y = line1.y + 35;
        this.addChild(bg);
        //复制按钮
        var copyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "copyDes", this.copyBtnHandler, this);
        copyBtn.setPosition(bg.x + 150, bg.y + 130);
        this.addChild(copyBtn);
        //关注描述长
        var publicdes2 = ComponentManager.getTextField(LanguageManager.getlocal("wechatdes"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        publicdes2.x = bg1.x + 55;
        publicdes2.width = 491;
        publicdes2.y = GameConfig.stageHeigth - 150;
        this.addChild(publicdes2);
        var temScale = 0.8;
        var spaceW = 15;
        var spaceH = 10;
        var rewardList = GameData.formatRewardItem(Config.GameprojectCfg.reward3K);
        var totalNum = rewardList.length;
        for (var i = 0; i < rewardList.length; i++) {
            var icon = GameData.getItemIcon(rewardList[i], true, true);
            icon.scaleX = icon.scaleY = temScale;
            icon.x = bg.x + bg.width / 2 + (icon.width * temScale) * (i - totalNum / 2) + spaceW * (i - (totalNum - 1) / 2);
            icon.y = bg.y + 7;
            this.addChild(icon);
        }
    };
    WelfareViewOfficialWeChat.prototype.copyBtnHandler = function () {
        if (App.DeviceUtil.IsHtml5()) {
            var str = LanguageManager.getlocal("officialWeChatcontentdes");
            var input = document.createElement("input");
            input.value = str;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length),
                document.execCommand('Copy');
            document.body.removeChild(input);
            App.CommonUtil.showTip(LanguageManager.getlocal("followSuccessdes"));
        }
    };
    return WelfareViewOfficialWeChat;
}(WelfareViewTab));
__reflect(WelfareViewOfficialWeChat.prototype, "WelfareViewOfficialWeChat");
