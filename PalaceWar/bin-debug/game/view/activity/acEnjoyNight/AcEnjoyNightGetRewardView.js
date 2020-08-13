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
var AcEnjoyNightGetRewardView = (function (_super) {
    __extends(AcEnjoyNightGetRewardView, _super);
    function AcEnjoyNightGetRewardView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcEnjoyNightGetRewardView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightGetRewardView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightGetRewardView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightGetRewardView.prototype, "uicode", {
        get: function () {
            return this.param.data.uicode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightGetRewardView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcEnjoyNightGetRewardView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var tailorCfg = this.cfg;
        var reward = this.param.data.rewards;
        var extra = this.param.data.extra;
        var tailor_get_light = BaseBitmap.create("tailor_get_light");
        tailor_get_light.anchorOffsetX = tailor_get_light.width / 2;
        tailor_get_light.anchorOffsetY = tailor_get_light.height / 2;
        tailor_get_light.x = GameConfig.stageWidth / 2;
        tailor_get_light.y = 120 + tailor_get_light.height / 2;
        egret.Tween.get(tailor_get_light, { loop: true }).to({ rotation: 360 }, 5000);
        this.addChild(tailor_get_light);
        var tailor_get_light2 = BaseBitmap.create("tailor_get_light");
        tailor_get_light2.anchorOffsetX = tailor_get_light2.width / 2;
        tailor_get_light2.anchorOffsetY = tailor_get_light2.height / 2;
        tailor_get_light2.x = tailor_get_light.x;
        tailor_get_light2.y = tailor_get_light.y;
        egret.Tween.get(tailor_get_light2, { loop: true }).to({ rotation: -360 }, 5000);
        this.addChild(tailor_get_light2);
        var tailor_get_word = BaseBitmap.create("tailor_get_word");
        tailor_get_word.anchorOffsetX = tailor_get_word.width / 2;
        tailor_get_word.anchorOffsetY = tailor_get_word.height / 2;
        tailor_get_word.x = GameConfig.stageWidth / 2;
        tailor_get_word.y = 300;
        tailor_get_word.setScale(0);
        egret.Tween.get(tailor_get_word, { loop: false }).wait(100).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
        this.addChild(tailor_get_word);
        //"6_1150_4|6_1710_1";
        var rewardTab = reward.split('|');
        var bottomBg = BaseBitmap.create("public_9_wordbg");
        bottomBg.height = 230;
        bottomBg.name = "bottomBg";
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = tailor_get_word.y + 40;
        this.addChild(bottomBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bottomBg.width, bottomBg.height - 10);
        var rewardNode = new BaseDisplayObjectContainer();
        var scroStartY = 30;
        var rIcons = GameData.getRewardItemIcons(reward, true, true);
        var waitT = 0;
        if (rIcons.length == 1) {
            var element_1 = rIcons[0];
            element_1.anchorOffsetX = element_1.width / 2;
            element_1.anchorOffsetY = element_1.height / 2;
            element_1.x = GameConfig.stageWidth / 2;
            element_1.y = scroStartY + element_1.height / 2 + 60;
            ; // 
            element_1.setScale(0);
            waitT = 400;
            egret.Tween.get(element_1, { loop: false }).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
            rewardNode.addChild(element_1);
        }
        else {
            var tmpX = (GameConfig.stageWidth - rIcons.length * 108 - (rIcons.length - 1) * 12) / 2;
            for (var index = 0; index < rIcons.length; index++) {
                var element = rIcons[index];
                element.anchorOffsetX = element.width / 2;
                element.anchorOffsetY = element.height / 2;
                element.setScale(0);
                element.x = tmpX + element.width / 2;
                element.y = scroStartY + element.height / 2 + 60;
                ;
                tmpX += (element.width + 12);
                if (tmpX >= GameConfig.stageWidth) {
                    tmpX = (GameConfig.stageWidth - 5 * 108 - 4 * 12) / 2;
                    scroStartY += element.height + 20;
                    element.x = tmpX + element.width / 2;
                    element.y = scroStartY + element.height / 2 + 60;
                    ;
                    tmpX += (element.width + 12);
                }
                egret.Tween.get(element, { loop: false }).wait(100 * index).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
                rewardNode.addChild(element);
            }
            waitT = 100 * rIcons.length;
        }
        var descbg = BaseBitmap.create("public_9_bg47");
        descbg.y = scroStartY - 16;
        descbg.height = 40;
        rewardNode.addChild(descbg);
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightRewardTip", [String(this.param.data.addValue)]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rewardNode.addChild(desc);
        desc.setPosition(GameConfig.stageWidth / 2 - desc.width / 2, descbg.y + descbg.height / 2 - desc.height / 2);
        descbg.width = desc.width + 100;
        descbg.x = desc.x - 50;
        var scrollView = ComponentManager.getScrollView(rewardNode, rect);
        scrollView.horizontalScrollPolicy = "off";
        scrollView.verticalScrollPolicy = "off";
        scrollView.x = bottomBg.x;
        scrollView.y = bottomBg.y + 5;
        this.addChild(scrollView);
        var okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        okBtn.x = (GameConfig.stageWidth - okBtn.width) / 2;
        okBtn.y = bottomBg.y + bottomBg.height + 20;
        okBtn.alpha = 0;
        egret.Tween.get(okBtn, { loop: false }).wait(waitT).to({ alpha: 1 }, 500);
        this.addChild(okBtn);
        this.doWaitAni(okBtn, waitT);
    };
    AcEnjoyNightGetRewardView.prototype.doWaitAni = function (tmpNode, waitT) {
        tmpNode.alpha = 0;
        egret.Tween.get(tmpNode, { loop: false }).wait(waitT).to({ alpha: 1 }, 500);
    };
    AcEnjoyNightGetRewardView.prototype.getShowHeight = function () {
        var re_data = this.param.data;
        //"6_1150_4|6_1710_1";
        var rewardTab = re_data.split('|');
        return rewardTab.length > 4 ? 528 : 300;
    };
    AcEnjoyNightGetRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "tailor_get_light",
            "tailor_get_word",
            "tailor_get_bg",
        ]);
    };
    AcEnjoyNightGetRewardView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcEnjoyNightGetRewardView.prototype.hide = function () {
        if (this.param.data && this.param.data.confirmCallback) {
            this.param.data.confirmCallback.apply(this.param.data.handler, []);
        }
        _super.prototype.hide.call(this);
    };
    AcEnjoyNightGetRewardView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcEnjoyNightGetRewardView;
}(BaseView));
__reflect(AcEnjoyNightGetRewardView.prototype, "AcEnjoyNightGetRewardView");
//# sourceMappingURL=AcEnjoyNightGetRewardView.js.map