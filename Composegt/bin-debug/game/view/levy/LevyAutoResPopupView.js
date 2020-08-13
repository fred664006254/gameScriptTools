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
var LevyAutoResPopupView = (function (_super) {
    __extends(LevyAutoResPopupView, _super);
    // 滑动列表
    function LevyAutoResPopupView() {
        return _super.call(this) || this;
    }
    LevyAutoResPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    LevyAutoResPopupView.prototype.initView = function () {
        var topBg = BaseBitmap.create("public_9v_bg12");
        topBg.width = 528;
        topBg.height = 110;
        topBg.setPosition(51, 10);
        this.addChildToContainer(topBg);
        var bottomBg = BaseBitmap.create("public_9v_bg12");
        bottomBg.width = topBg.width;
        bottomBg.height = 370;
        bottomBg.setPosition(topBg.x, topBg.y + topBg.height + 10);
        this.addChildToContainer(bottomBg);
        var topTip = ComponentManager.getTextField(LanguageManager.getlocal("levy_autores_toptip", [App.DateUtil.getFormatBySecond(GameData.leavetime, 8)]), 22, TextFieldConst.COLOR_BROWN_NEW);
        topTip.width = topBg.width - 40;
        topTip.textAlign = egret.HorizontalAlign.CENTER;
        topTip.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, topTip, topBg, [0, 0]);
        this.addChildToContainer(topTip);
        if (GameData.islvminCon) {
            var topTip2 = ComponentManager.getTextField(LanguageManager.getlocal("levy_autores_sptip"), 16);
            topTip2.textAlign = TextFieldConst.ALIGH_CENTER;
            topTip2.setPosition(topTip.x + topTip.width / 2 - topTip2.width / 2, topTip.y + topTip.height + 5);
            this.addChildToContainer(topTip2);
        }
        var bottomTitleBg = BaseBitmap.create("public_ts_bg01");
        bottomTitleBg.width = 200;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bottomTitleBg, bottomBg, [0, 20]);
        this.addChildToContainer(bottomTitleBg);
        var bottomTitle = ComponentManager.getTextField(LanguageManager.getlocal("levy_autores_bottomtitle"), 20, TextFieldConst.COLOR_BROWN_NEW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bottomTitle, bottomTitleBg, [0, 0]);
        this.addChildToContainer(bottomTitle);
        //钱粮兵的文件名
        var itemIconArr = [2, 3, 4];
        for (var i = 0; i < GameData.autoRes.length; i++) {
            var itemIcon = GameData.getIconContainer("itemicon" + itemIconArr[i], "itembg_1");
            var spaceX = (bottomBg.width - itemIcon.width * 3) / 4;
            itemIcon.setPosition(bottomBg.x + spaceX + i * (spaceX + itemIcon.width), bottomTitleBg.y + bottomTitleBg.height + 20);
            this.addChildToContainer(itemIcon);
            var nn = App.StringUtil.changeIntToText(GameData.autoRes[i]);
            var numTxt = ComponentManager.getTextField(nn + '', 18, TextFieldConst.COLOR_BROWN_NEW);
            numTxt.setPosition(itemIcon.x + itemIcon.width / 2 - numTxt.width / 2, itemIcon.y + itemIcon.height + 15);
            this.addChildToContainer(numTxt);
        }
        var line = BaseBitmap.create("public_line4");
        line.width = bottomBg.width - 10;
        line.x = bottomBg.x + 5;
        line.y = bottomBg.y + 220;
        this.addChildToContainer(line);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, confirmBtn, bottomBg, [0, 65]);
        this.addChildToContainer(confirmBtn);
        var bottomTip = ComponentManager.getTextField(LanguageManager.getlocal("levy_autores_bottomtip"), 20, TextFieldConst.COLOR_BROWN_NEW);
        bottomTip.textAlign = TextFieldConst.ALIGH_CENTER;
        bottomTip.setPosition(confirmBtn.x + confirmBtn.width / 2 - bottomTip.width / 2, confirmBtn.y + confirmBtn.height + 5);
        this.addChildToContainer(bottomTip);
    };
    LevyAutoResPopupView.prototype.getTitleStr = function () {
        return 'levyAutoResPopupViewTitle';
    };
    LevyAutoResPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    LevyAutoResPopupView.prototype.dispose = function () {
        GameData.autoRes = [0, 0, 0];
        _super.prototype.dispose.call(this);
    };
    return LevyAutoResPopupView;
}(PopupView));
__reflect(LevyAutoResPopupView.prototype, "LevyAutoResPopupView");
