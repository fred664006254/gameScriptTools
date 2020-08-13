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
//神将突袭 战斗结果
var AcThreeKingdomsHeroAttackResultView = (function (_super) {
    __extends(AcThreeKingdomsHeroAttackResultView, _super);
    function AcThreeKingdomsHeroAttackResultView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcThreeKingdomsHeroAttackResultView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsHeroAttackResultView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsHeroAttackResultView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsHeroAttackResultView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsHeroAttackResultView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcThreeKingdomsHeroAttackResultView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsHeroAttackResultView.prototype.getTitleStr = function () {
        return null;
    };
    AcThreeKingdomsHeroAttackResultView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var tailorCfg = this.cfg;
        var re_data = this.param.data.reward;
        // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM, {
        //     activeId : this.vo.aidAndCode,
        // });	
    };
    AcThreeKingdomsHeroAttackResultView.prototype.getBgName = function () {
        return "public_9_wordbg2";
    };
    AcThreeKingdomsHeroAttackResultView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcThreeKingdomsHeroAttackResultView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var view = this;
        view.viewBg.alpha = 2;
        var tailor_get_light = BaseBitmap.create("tailor_get_light");
        tailor_get_light.anchorOffsetX = tailor_get_light.width / 2;
        tailor_get_light.anchorOffsetY = tailor_get_light.height / 2;
        tailor_get_light.x = GameConfig.stageWidth / 2;
        tailor_get_light.y = view.viewBg.y;
        egret.Tween.get(tailor_get_light, { loop: true }).to({ rotation: 360 }, 5000);
        this.addChildAt(tailor_get_light, 1);
        var tailor_get_light2 = BaseBitmap.create("tailor_get_light");
        tailor_get_light2.anchorOffsetX = tailor_get_light2.width / 2;
        tailor_get_light2.anchorOffsetY = tailor_get_light2.height / 2;
        tailor_get_light2.x = tailor_get_light.x;
        tailor_get_light2.y = tailor_get_light.y;
        egret.Tween.get(tailor_get_light2, { loop: true }).to({ rotation: -360 }, 5000);
        this.addChildAt(tailor_get_light2, 1);
        var tailor_get_wordbg = BaseBitmap.create("threekingdomsheroattacktitlebg");
        tailor_get_wordbg.anchorOffsetX = tailor_get_wordbg.width / 2;
        tailor_get_wordbg.anchorOffsetY = tailor_get_wordbg.height / 2;
        tailor_get_wordbg.x = GameConfig.stageWidth / 2;
        tailor_get_wordbg.y = 0;
        // tailor_get_wordbg.setScale(0);
        // egret.Tween.get(tailor_get_wordbg,{loop:false}).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},50);
        this.addChildToContainer(tailor_get_wordbg);
        var tailor_get_word = BaseBitmap.create("tombfighttitle-1");
        tailor_get_word.anchorOffsetX = tailor_get_word.width / 2;
        tailor_get_word.anchorOffsetY = tailor_get_word.height / 2;
        tailor_get_word.x = GameConfig.stageWidth / 2;
        tailor_get_word.y = tailor_get_wordbg.y - 30;
        // tailor_get_word.setScale(0);
        //egret.Tween.get(tailor_get_word,{loop:false}).wait(100).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},50);
        this.addChildToContainer(tailor_get_word);
        var code = view.getUiCode();
        var heroinfo = view.vo.getHeroAttackNpcPic(view.param.data.iskill);
        //提示
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdomsheroattacktip3", code), [heroinfo.name, view.param.data.damage]), 22);
        tipTxt.width = 590;
        tipTxt.lineSpacing = 10;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.setPosition(view.viewBg.x + (view.viewBg.width - tipTxt.width) / 2, 41);
        this.addChildToContainer(tipTxt);
        //"6_1150_4|6_1710_1";
        //奖励
        var rewardTab = this.param.data.isauto ? this.param.data.rewardsarr : this.param.data.rewards.split('|');
        var len = Math.min(5, rewardTab.length);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, rewardTab.length > 5 ? 230 : 110);
        var rewardNode = new BaseDisplayObjectContainer();
        if (len) {
            var tmpX = (GameConfig.stageWidth - len * 108 - (len - 1) * 15) / 2;
            var scroStartY = 0; //(bottomBg.height - (Math.ceil(rewardTab.length / 5) * 106 + (Math.ceil(rewardTab.length / 5) - 1) * 20)) / 2;//15;
            var rIcons = GameData.getRewardItemIcons(rewardTab.join("|"), true, false);
            var waitT = 0;
            if (rIcons.length == 1) {
                var element = rIcons[0];
                element.anchorOffsetX = element.width / 2;
                element.anchorOffsetY = element.height / 2;
                element.x = GameConfig.stageWidth / 2;
                element.y = scroStartY + element.height / 2; // + 40;
                // element.setScale(0);
                // waitT = 400;
                // egret.Tween.get(element,{loop:false}).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},50);
                rewardNode.addChild(element);
            }
            else {
                for (var index = 0; index < rIcons.length; index++) {
                    var element = rIcons[index];
                    element.anchorOffsetX = element.width / 2;
                    element.anchorOffsetY = element.height / 2;
                    // element.setScale(0);
                    element.x = tmpX + element.width / 2;
                    element.y = scroStartY + element.height / 2;
                    tmpX += (element.width + 15);
                    if (tmpX >= GameConfig.stageWidth) {
                        tmpX = (GameConfig.stageWidth - 5 * 108 - 4 * 15) / 2;
                        scroStartY += element.height + 15;
                        element.x = tmpX + element.width / 2;
                        element.y = scroStartY + element.height / 2;
                        tmpX += (element.width + 15);
                    }
                    //egret.Tween.get(element,{loop:false}).wait(100*index).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},50);
                    rewardNode.addChild(element);
                }
            }
        }
        var scrollView = ComponentManager.getScrollView(rewardNode, rect);
        scrollView.horizontalScrollPolicy = "off";
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollView, tipTxt, [0, tipTxt.textHeight + 15]);
        this.addChildToContainer(scrollView);
        var okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        okBtn.x = (GameConfig.stageWidth - okBtn.width) / 2;
        okBtn.y = scrollView.y + scrollView.height + 20;
        // okBtn.alpha = 0;
        // egret.Tween.get(okBtn,{loop:false}).wait(waitT).to({alpha:1},500);
        this.addChildToContainer(okBtn);
        // this.doWaitAni(okBtn,waitT);
    };
    AcThreeKingdomsHeroAttackResultView.prototype.doWaitAni = function (tmpNode, waitT) {
        tmpNode.alpha = 0;
        egret.Tween.get(tmpNode, { loop: false }).wait(waitT).to({ alpha: 1 }, 500);
    };
    AcThreeKingdomsHeroAttackResultView.prototype.getShowHeight = function () {
        var re_data = this.param.data.isauto ? this.param.data.rewardsarr : this.param.data.rewards.split('|');
        //"6_1150_4|6_1710_1";
        return re_data.length > 5 ? 430 : 330;
    };
    AcThreeKingdomsHeroAttackResultView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "tailor_get_light", "tombfighttitle-1"
        ]);
    };
    AcThreeKingdomsHeroAttackResultView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcThreeKingdomsHeroAttackResultView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsHeroAttackResultView;
}(PopupView));
__reflect(AcThreeKingdomsHeroAttackResultView.prototype, "AcThreeKingdomsHeroAttackResultView");
//# sourceMappingURL=AcThreeKingdomsHeroAttackResultView.js.map