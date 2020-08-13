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
 * 20190401
 * 奸臣皮肤兑换
 */
var AcRansackTraitorPopupView = (function (_super) {
    __extends(AcRansackTraitorPopupView, _super);
    function AcRansackTraitorPopupView() {
        return _super.call(this) || this;
    }
    AcRansackTraitorPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 528;
        bg.height = 292 + 25;
        bg.setPosition((this.viewBg.width - bg.width) / 2, 10);
        this.addChildToContainer(bg);
        var rbg = BaseBitmap.create("public_tc_bg03");
        rbg.width = bg.width - 20;
        rbg.height = 170;
        rbg.setPosition(bg.x + 10, bg.y + bg.height - 10 - rbg.height);
        this.addChildToContainer(rbg);
        var txt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt.text = LanguageManager.getlocal("ransackTraitor_gettxt2");
        if (this.param.data.idFind) {
            txt.text = LanguageManager.getlocal("ransackTraitor_gettxt1");
        }
        txt.y = rbg.y / 2 + bg.y / 2 - txt.height / 2;
        txt.x = bg.x + bg.width / 2 - txt.width / 2;
        this.addChildToContainer(txt);
        var txt2 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        txt2.text = LanguageManager.getlocal("ransackTraitor_gettxt3");
        txt2.y = rbg.y + 15;
        txt2.x = rbg.x + 15;
        this.addChildToContainer(txt2);
        var _rewardContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(_rewardContainer);
        var rewards = this.param.data.rewards;
        var rewardArr = GameData.formatRewardItem(rewards);
        var startX = 10;
        var startY = 10;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            startX = 10 + index % 4 * (iconItem.width + 13);
            if (index > 0 && index % 4 == 0) {
                startX = 10;
                startY += iconItem.height + 10;
            }
            iconItem.x = startX;
            iconItem.y = startY;
            _rewardContainer.addChild(iconItem);
        }
        rbg.height = txt2.y + _rewardContainer.height + 40 - rbg.y;
        bg.height = rbg.y + rbg.height + 10;
        // _rewardContainer.width += 20;
        var rect = new egret.Rectangle(0, 0, rbg.width - 20, rbg.y + rbg.height - txt2.y - 30);
        var scrView = ComponentManager.getScrollView(_rewardContainer, rect);
        scrView.horizontalScrollPolicy = "off";
        // scrView.verticalScrollPolicy = "on";
        scrView.x = rbg.x + 10;
        scrView.y = txt2.y + 25;
        this.addChildToContainer(scrView);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.hide, this);
        confirmBtn.x = bg.x + bg.width / 2 - confirmBtn.width / 2;
        confirmBtn.y = bg.y + bg.height + 15;
        this.addChildToContainer(confirmBtn);
    };
    AcRansackTraitorPopupView.prototype.hide = function () {
        if (this.param.data.findAll) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACRANKSACKTRAITOREXCHANGEPOPUPVIEW, { "aid": this.param.data.aid, "code": this.param.data.code });
        }
        _super.prototype.hide.call(this);
    };
    AcRansackTraitorPopupView.prototype.getTitleStr = function () {
        return "itemUseConstPopupViewTitle";
    };
    AcRansackTraitorPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcRansackTraitorPopupView;
}(PopupView));
__reflect(AcRansackTraitorPopupView.prototype, "AcRansackTraitorPopupView");
