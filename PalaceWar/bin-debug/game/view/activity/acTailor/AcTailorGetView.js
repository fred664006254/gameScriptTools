/**
 * 裁缝抽奖获得UI
 * author yanyuling
 * date 2018/03/07
 * @class AcTailorGetView
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
var AcTailorGetView = (function (_super) {
    __extends(AcTailorGetView, _super);
    function AcTailorGetView() {
        return _super.call(this) || this;
    }
    AcTailorGetView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var _maskBmp = BaseBitmap.create("tailor_get_bg");
        this._nodeContainer.addChild(_maskBmp);
        var tailor_get_light = BaseBitmap.create("tailor_get_light");
        tailor_get_light.anchorOffsetX = tailor_get_light.width / 2;
        tailor_get_light.anchorOffsetY = tailor_get_light.height / 2;
        tailor_get_light.x = GameConfig.stageWidth / 2;
        tailor_get_light.y = 20 + tailor_get_light.height / 2;
        egret.Tween.get(tailor_get_light, { loop: true }).to({ rotation: 360 }, 5000);
        this._nodeContainer.addChild(tailor_get_light);
        var tailor_get_light2 = BaseBitmap.create("tailor_get_light");
        tailor_get_light2.anchorOffsetX = tailor_get_light2.width / 2;
        tailor_get_light2.anchorOffsetY = tailor_get_light2.height / 2;
        tailor_get_light2.x = tailor_get_light.x;
        tailor_get_light2.y = tailor_get_light.y;
        egret.Tween.get(tailor_get_light2, { loop: true }).to({ rotation: -360 }, 5000);
        this._nodeContainer.addChild(tailor_get_light2);
        var tailor_get_wordbg = BaseBitmap.create("tailor_get_wordbg");
        tailor_get_wordbg.anchorOffsetX = tailor_get_wordbg.width / 2;
        tailor_get_wordbg.anchorOffsetY = tailor_get_wordbg.height / 2;
        tailor_get_wordbg.x = GameConfig.stageWidth / 2;
        tailor_get_wordbg.y = tailor_get_light.y;
        tailor_get_wordbg.setScale(0);
        egret.Tween.get(tailor_get_wordbg, { loop: false }).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
        this._nodeContainer.addChild(tailor_get_wordbg);
        var tailor_get_word = BaseBitmap.create("tailor_get_word");
        tailor_get_word.anchorOffsetX = tailor_get_word.width / 2;
        tailor_get_word.anchorOffsetY = tailor_get_word.height / 2;
        tailor_get_word.x = GameConfig.stageWidth / 2;
        tailor_get_word.y = tailor_get_wordbg.y;
        tailor_get_word.setScale(0);
        egret.Tween.get(tailor_get_word, { loop: false }).wait(100).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
        this._nodeContainer.addChild(tailor_get_word);
        var rewards = this.param.data.rewards; //6_1212_1
        var buyCost = this.param.data.buyCost;
        var goldNum = 1;
        if (rewards.indexOf("|") != -1) {
            goldNum = 10;
        }
        var getTip = ComponentManager.getTextField(LanguageManager.getlocal("acTailGetTip", [String(goldNum)]), 24);
        getTip.x = GameConfig.stageWidth / 2 - getTip.width / 2;
        getTip.y = GameConfig.stageHeigth / 2 - 50;
        this._nodeContainer.addChild(getTip);
        var sliverIcon = BaseLoadBitmap.create("itemicon1001");
        sliverIcon.x = getTip.x + 100;
        sliverIcon.y = getTip.y - 18;
        sliverIcon.setScale(0.5);
        this._nodeContainer.addChild(sliverIcon);
        var rIcons = GameData.getRewardItemIcons(rewards, true, false);
        var tmpX = 25;
        var scroStartY = getTip.y + 80;
        var waitT = 0;
        if (rIcons.length == 1) {
            var element = rIcons[0];
            element.anchorOffsetX = element.width / 2;
            element.anchorOffsetY = element.height / 2;
            element.x = GameConfig.stageWidth / 2;
            element.y = scroStartY + element.height / 2;
            element.setScale(0);
            waitT = 400;
            egret.Tween.get(element, { loop: false }).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
            this._nodeContainer.addChild(element);
        }
        else {
            for (var index = 0; index < rIcons.length; index++) {
                var element = rIcons[index];
                element.anchorOffsetX = element.width / 2;
                element.anchorOffsetY = element.height / 2;
                element.setScale(0);
                element.x = tmpX + element.width / 2;
                element.y = scroStartY + element.height / 2;
                tmpX += (element.width + 12);
                if (tmpX >= GameConfig.stageWidth) {
                    tmpX = 25;
                    scroStartY += element.height + 20;
                    element.x = tmpX + element.width / 2;
                    element.y = scroStartY + element.height / 2;
                    tmpX += (element.width + 12);
                }
                egret.Tween.get(element, { loop: false }).wait(100 * index).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
                this._nodeContainer.addChild(element);
            }
            waitT = 100 * rIcons.length;
        }
        var okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        okBtn.x = 100;
        okBtn.y = GameConfig.stageHeigth - 85;
        okBtn.alpha = 0;
        egret.Tween.get(okBtn, { loop: false }).wait(waitT).to({ alpha: 1 }, 500);
        this._nodeContainer.addChild(okBtn);
        var btnStr = "";
        var buyAgainBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, btnStr, this.buyAgainHandler, this, [goldNum]);
        buyAgainBtn.x = 400;
        buyAgainBtn.y = okBtn.y;
        this.doWaitAni(buyAgainBtn, waitT);
        this._nodeContainer.addChild(buyAgainBtn);
        var sliver1 = BaseLoadBitmap.create("itemicon1001");
        sliver1.x = buyAgainBtn.x + 65;
        sliver1.y = buyAgainBtn.y + 5;
        sliver1.setScale(0.4);
        this._nodeContainer.addChild(sliver1);
        if (goldNum == 10) {
            btnStr = LanguageManager.getlocal("acTailorBtnTW", ["10"]);
            sliver1.x = buyAgainBtn.x + 60;
        }
        else {
            btnStr = LanguageManager.getlocal("acTailorBtnTW", ["1"]);
        }
        buyAgainBtn.setText(btnStr, false);
        var tenCostIcon = BaseBitmap.create("public_icon1");
        tenCostIcon.x = buyAgainBtn.x + 30;
        tenCostIcon.y = buyAgainBtn.y - 30;
        tenCostIcon.setScale(0.7);
        this.doWaitAni(tenCostIcon, waitT);
        this._nodeContainer.addChild(tenCostIcon);
        var tenCostTxt = ComponentManager.getTextField(String(buyCost), 18);
        tenCostTxt.x = tenCostIcon.x + tenCostIcon.width - 5;
        tenCostTxt.y = tenCostIcon.y + tenCostIcon.height / 2 - tenCostTxt.height / 2 - 5;
        this.doWaitAni(tenCostTxt, waitT);
        this._nodeContainer.addChild(tenCostTxt);
        if (rIcons.length == 10) {
            var tenTip = ComponentManager.getTextField(LanguageManager.getlocal("acTailTenTip"), 18);
            tenTip.x = buyAgainBtn.x + buyAgainBtn.width / 2 - tenTip.width / 2;
            tenTip.y = buyAgainBtn.y + 60;
            this._nodeContainer.addChild(tenTip);
            this.doWaitAni(tenTip, waitT);
        }
        var resIcon1 = BaseBitmap.create("public_icon1");
        resIcon1.x = 120;
        resIcon1.y = 10;
        this._nodeContainer.addChild(resIcon1);
        var goldNumTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerGemStr(), 18);
        goldNumTxt.x = resIcon1.x + 50;
        goldNumTxt.y = resIcon1.y + 15;
        this._nodeContainer.addChild(goldNumTxt);
        var resIcon2 = BaseBitmap.create("tailor_icon2");
        resIcon2.x = 380;
        resIcon2.y = resIcon1.y + 5;
        this._nodeContainer.addChild(resIcon2);
        var skinNumTxt = ComponentManager.getTextField("", 18);
        skinNumTxt.text = Api.itemVoApi.getItemNumInfoVoById("2101").toString();
        skinNumTxt.x = resIcon2.x + 50;
        skinNumTxt.y = goldNumTxt.y;
        this._nodeContainer.addChild(skinNumTxt);
        this.doWaitAni(okBtn, waitT);
        this.doWaitAni(getTip, waitT);
        this.doWaitAni(sliverIcon, waitT);
        this.doWaitAni(sliver1, waitT);
        this.doWaitAni(resIcon1, waitT);
        this.doWaitAni(resIcon2, waitT);
        this.doWaitAni(goldNumTxt, waitT);
        this.doWaitAni(skinNumTxt, waitT);
    };
    AcTailorGetView.prototype.doWaitAni = function (tmpNode, waitT) {
        tmpNode.alpha = 0;
        egret.Tween.get(tmpNode, { loop: false }).wait(waitT).to({ alpha: 1 }, 500);
    };
    AcTailorGetView.prototype.buyAgainHandler = function (param) {
        var _callback = this.param.data.callback;
        var _handler = this.param.data.handler;
        _callback.apply(_handler, [param]);
        this.hide();
    };
    // protected clickHandler()
    // {
    //     super.hide()
    // }
    AcTailorGetView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "tailor_get_light",
            "tailor_get_word",
            "tailor_get_wordbg",
            "tailor_get_bg",
        ]);
    };
    AcTailorGetView.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcTailorGetView;
}(BaseView));
__reflect(AcTailorGetView.prototype, "AcTailorGetView");
//# sourceMappingURL=AcTailorGetView.js.map