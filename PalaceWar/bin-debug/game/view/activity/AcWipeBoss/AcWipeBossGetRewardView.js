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
var AcWipeBossGetRewardView = (function (_super) {
    __extends(AcWipeBossGetRewardView, _super);
    function AcWipeBossGetRewardView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcWipeBossGetRewardView.prototype, "api", {
        get: function () {
            return Api.wipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossGetRewardView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossGetRewardView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWipeBossGetRewardView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var tailorCfg = this.cfg;
        var re_data = this.param.data.reward;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM, {
            activeId: this.vo.aidAndCode,
        });
        var tailor_get_light = BaseBitmap.create("tailor_get_light");
        tailor_get_light.anchorOffsetX = tailor_get_light.width / 2;
        tailor_get_light.anchorOffsetY = tailor_get_light.height / 2;
        tailor_get_light.x = GameConfig.stageWidth / 2;
        tailor_get_light.y = 40 + tailor_get_light.height / 2;
        egret.Tween.get(tailor_get_light, { loop: true }).to({ rotation: 360 }, 5000);
        this.addChild(tailor_get_light);
        var tailor_get_light2 = BaseBitmap.create("tailor_get_light");
        tailor_get_light2.anchorOffsetX = tailor_get_light2.width / 2;
        tailor_get_light2.anchorOffsetY = tailor_get_light2.height / 2;
        tailor_get_light2.x = tailor_get_light.x;
        tailor_get_light2.y = tailor_get_light.y;
        egret.Tween.get(tailor_get_light2, { loop: true }).to({ rotation: -360 }, 5000);
        this.addChild(tailor_get_light2);
        var tailor_get_wordbg = BaseBitmap.create("tailor_get_wordbg");
        tailor_get_wordbg.anchorOffsetX = tailor_get_wordbg.width / 2;
        tailor_get_wordbg.anchorOffsetY = tailor_get_wordbg.height / 2;
        tailor_get_wordbg.x = GameConfig.stageWidth / 2;
        tailor_get_wordbg.y = tailor_get_light.y;
        tailor_get_wordbg.setScale(0);
        egret.Tween.get(tailor_get_wordbg, { loop: false }).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
        this.addChild(tailor_get_wordbg);
        var tailor_get_word = BaseBitmap.create("tailor_get_word");
        tailor_get_word.anchorOffsetX = tailor_get_word.width / 2;
        tailor_get_word.anchorOffsetY = tailor_get_word.height / 2;
        tailor_get_word.x = GameConfig.stageWidth / 2;
        tailor_get_word.y = tailor_get_wordbg.y;
        tailor_get_word.setScale(0);
        egret.Tween.get(tailor_get_word, { loop: false }).wait(100).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
        this.addChild(tailor_get_word);
        //"6_1150_4|6_1710_1";
        var rewardTab = re_data.split('|');
        var bottomBg = BaseBitmap.create("public_9_wordbg2");
        bottomBg.height = rewardTab.length > 4 ? 380 : 220;
        bottomBg.name = "bottomBg";
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = tailor_get_wordbg.y + tailor_get_wordbg.height + 50;
        this.addChildToContainer(bottomBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bottomBg.width, bottomBg.height - 10);
        var rewardNode = new BaseDisplayObjectContainer();
        var tmpX = (GameConfig.stageWidth - 5 * 108 - 4 * 12) / 2;
        for (var i in rewardTab) {
            var unit = rewardTab[i];
            if (unit.indexOf('1001') > -1) {
                rewardTab.splice(i, 1);
                break;
            }
        }
        var scroStartY = (bottomBg.height - (Math.ceil(rewardTab.length / 5) * 106 + (Math.ceil(rewardTab.length / 5) - 1) * 20)) / 2; //15;
        var rIcons = GameData.getRewardItemIcons(rewardTab.join("|"), true, false);
        var waitT = 0;
        if (rIcons.length == 1) {
            var element = rIcons[0];
            element.anchorOffsetX = element.width / 2;
            element.anchorOffsetY = element.height / 2;
            element.x = GameConfig.stageWidth / 2;
            element.y = scroStartY + element.height / 2; // + 40;
            element.setScale(0);
            waitT = 400;
            egret.Tween.get(element, { loop: false }).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
            rewardNode.addChild(element);
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
                    tmpX = (GameConfig.stageWidth - 5 * 108 - 4 * 12) / 2;
                    scroStartY += element.height + 20;
                    element.x = tmpX + element.width / 2;
                    element.y = scroStartY + element.height / 2;
                    tmpX += (element.width + 12);
                }
                egret.Tween.get(element, { loop: false }).wait(100 * index).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
                rewardNode.addChild(element);
            }
            waitT = 100 * rIcons.length;
        }
        var scrollView = ComponentManager.getScrollView(rewardNode, rect);
        scrollView.horizontalScrollPolicy = "off";
        scrollView.x = bottomBg.x;
        scrollView.y = bottomBg.y + 5;
        this.addChildToContainer(scrollView);
        var okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        okBtn.x = (GameConfig.stageWidth - okBtn.width) / 2;
        okBtn.y = bottomBg.y + bottomBg.height + 50;
        okBtn.alpha = 0;
        egret.Tween.get(okBtn, { loop: false }).wait(waitT).to({ alpha: 1 }, 500);
        this.addChild(okBtn);
        this.doWaitAni(okBtn, waitT);
    };
    AcWipeBossGetRewardView.prototype.doWaitAni = function (tmpNode, waitT) {
        tmpNode.alpha = 0;
        egret.Tween.get(tmpNode, { loop: false }).wait(waitT).to({ alpha: 1 }, 500);
    };
    AcWipeBossGetRewardView.prototype.getShowHeight = function () {
        var re_data = this.param.data;
        //"6_1150_4|6_1710_1";
        var rewardTab = re_data.split('|');
        return rewardTab.length > 4 ? 528 : 300;
    };
    AcWipeBossGetRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "tailor_get_light",
            "tailor_get_word",
            "tailor_get_wordbg",
            "tailor_get_bg",
        ]);
    };
    AcWipeBossGetRewardView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcWipeBossGetRewardView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcWipeBossGetRewardView;
}(BaseView));
__reflect(AcWipeBossGetRewardView.prototype, "AcWipeBossGetRewardView");
//# sourceMappingURL=AcWipeBossGetRewardView.js.map