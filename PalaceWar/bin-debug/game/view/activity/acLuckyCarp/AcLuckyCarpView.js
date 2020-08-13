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
  * 锦鲤活动
  * author 张朝阳
  * date 2019/2/11
  * @class AcLuckyCarpView
  */
var AcLuckyCarpView = (function (_super) {
    __extends(AcLuckyCarpView, _super);
    function AcLuckyCarpView() {
        var _this = _super.call(this) || this;
        _this._word3 = null;
        _this._rewardbtn = null;
        _this._rewardTF = null;
        _this._rewardBox = null;
        _this._rewardTipBM = null;
        _this._timeTF = null;
        _this._head = null;
        _this._handleDate = null;
        _this._isUpdateView = true;
        _this._achieveTF = null;
        return _this;
    }
    AcLuckyCarpView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETLUCKYCARPREWARD, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETLUCKYCAINFO, this.infoHandle, this);
        var bg = BaseLoadBitmap.create("acluckycarpbg-" + this.code);
        this.addChildToContainer(bg);
        var titlebg = BaseLoadBitmap.create("acluckycarptitilebg-" + this.code);
        titlebg.width = 640;
        titlebg.height = 92;
        this.addChildToContainer(titlebg);
        var buttombg = BaseLoadBitmap.create("acluckycarpbuttombg-" + this.code);
        buttombg.width = 639;
        buttombg.height = 511;
        buttombg.setPosition(GameConfig.stageWidth / 2 - buttombg.width / 2, GameConfig.stageHeigth - buttombg.height);
        this.addChildToContainer(buttombg);
        var desc1 = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyCarpViewDesc1-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        desc1.width = 500;
        desc1.lineSpacing = 5;
        desc1.setPosition(buttombg.x + 50, buttombg.y + 50);
        this.addChildToContainer(desc1);
        var desc2 = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyCarpViewDesc2-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        desc2.width = 550;
        desc2.lineSpacing = 5;
        desc2.setPosition(buttombg.x + 50, desc1.y + desc1.height + 5);
        this.addChildToContainer(desc2);
        var desc3 = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyCarpViewDesc3-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        desc3.setPosition(buttombg.x + buttombg.width / 2 - desc3.width / 2, desc2.y + desc2.height + 5);
        this.addChildToContainer(desc3);
        //头像的bg
        var headbg = BaseLoadBitmap.create("acluckycarpheadbg-" + this.code);
        headbg.width = 351;
        headbg.height = 336;
        var headbgPosY = titlebg.y + titlebg.height + ((buttombg.y - titlebg.y - titlebg.height) / 2) - headbg.height / 2;
        headbg.setPosition(GameConfig.stageWidth / 2 - headbg.width / 2, headbgPosY);
        //光1
        var effectLight1 = BaseLoadBitmap.create("acluckycarpview_effect_light1");
        effectLight1.width = 293;
        effectLight1.height = 295;
        effectLight1.anchorOffsetX = effectLight1.width / 2;
        effectLight1.anchorOffsetY = effectLight1.height / 2;
        effectLight1.setPosition(headbg.x + headbg.width / 2, headbg.y + headbg.height / 2);
        this.addChildToContainer(effectLight1);
        egret.Tween.get(effectLight1, { loop: true }).to({ rotation: 360 }, 19000).call(function () {
            effectLight1.rotation = 0;
        }, this);
        effectLight1.blendMode = egret.BlendMode.ADD;
        //光2
        var effectLight2 = BaseLoadBitmap.create("acluckycarpview_effect_light2");
        effectLight2.width = 293;
        effectLight2.height = 295;
        effectLight2.anchorOffsetX = effectLight2.width / 2;
        effectLight2.anchorOffsetY = effectLight2.height / 2;
        effectLight2.setPosition(headbg.x + headbg.width / 2, headbg.y + headbg.height / 2);
        this.addChildToContainer(effectLight2);
        egret.Tween.get(effectLight2, { loop: true }).to({ rotation: -360 }, 19000).call(function () {
            effectLight2.rotation = 0;
        }, this);
        effectLight2.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(headbg);
        //头像
        this._head = Api.playerVoApi.getPlayerCircleHead(999);
        this._head.setPosition(headbg.x + headbg.width / 2 - this._head.width / 2 + 5, headbg.y + headbg.height / 2 - this._head.height / 2 + 15);
        this.addChildToContainer(this._head);
        //光环
        var effectCircle = BaseLoadBitmap.create("acluckycarpview_effect_circle");
        effectCircle.width = 174;
        effectCircle.height = 166;
        effectCircle.anchorOffsetX = effectCircle.width / 2;
        effectCircle.anchorOffsetY = effectCircle.height / 2;
        effectCircle.setPosition(headbg.x + headbg.width / 2, headbg.y + headbg.height / 2 + 18);
        this.addChildToContainer(effectCircle);
        egret.Tween.get(effectCircle, { loop: true }).to({ rotation: -360 }, 4000).call(function () {
            effectCircle.rotation = 0;
        }, this);
        effectCircle.blendMode = egret.BlendMode.ADD;
        var effectContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(effectContainer);
        effectContainer.width = 174;
        effectContainer.height = 166;
        effectContainer.anchorOffsetX = effectContainer.width / 2;
        effectContainer.anchorOffsetY = effectContainer.height / 2;
        effectContainer.setPosition(headbg.x + headbg.width / 2, headbg.y + headbg.height / 2 + 18);
        egret.Tween.get(effectContainer, { loop: true }).to({ rotation: 360 }, 7500).call(function () {
            effectContainer.rotation = 0;
        }, this);
        var effectPoint1 = BaseBitmap.create("acluckycarpview_effect_lightpoint");
        effectPoint1.anchorOffsetX = effectPoint1.width / 2;
        effectPoint1.anchorOffsetY = effectPoint1.height / 2;
        effectPoint1.setPosition(20, 83);
        effectContainer.addChild(effectPoint1);
        egret.Tween.get(effectPoint1, { loop: true }).to({ rotation: 360 }, 8000).call(function () {
            effectPoint1.rotation = 0;
        }, this);
        effectPoint1.blendMode = egret.BlendMode.ADD;
        var effectPoint2 = BaseBitmap.create("acluckycarpview_effect_lightpoint");
        effectPoint2.anchorOffsetX = effectPoint2.width / 2;
        effectPoint2.anchorOffsetY = effectPoint2.height / 2;
        effectPoint2.setPosition(154, 83);
        effectContainer.addChild(effectPoint2);
        egret.Tween.get(effectPoint2, { loop: true }).to({ rotation: 360 }, 8000).call(function () {
            effectPoint2.rotation = 0;
        }, this);
        effectPoint2.blendMode = egret.BlendMode.ADD;
        //美术字1
        var word1 = BaseLoadBitmap.create("acluckycarpword1-" + this.code);
        word1.width = 426;
        word1.height = 60;
        word1.setPosition(GameConfig.stageWidth / 2 - word1.width / 2, headbg.y - word1.height + 60);
        this.addChildToContainer(word1);
        //美术字3
        this._word3 = BaseLoadBitmap.create("acluckycarpword3-" + this.code);
        this._word3.width = 318;
        this._word3.height = 46;
        this._word3.setPosition(GameConfig.stageWidth / 2 - this._word3.width / 2, headbg.y + headbg.height - 10);
        this.addChildToContainer(this._word3);
        this._achieveTF = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyCarpViewAchieveTip-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._achieveTF.setPosition(this._word3.x + this._word3.width / 2 - this._achieveTF.width / 2, this._word3.y + this._word3.height / 2 - this._achieveTF.height / 2);
        this.addChildToContainer(this._achieveTF);
        //水波纹特效
        var clip = ComponentManager.getCustomMovieClip("acluckycarpview_effect", 10, 100);
        clip.setScale(2);
        var clipBM = BaseBitmap.create("acluckycarpview_effect1");
        clip.setPosition(headbg.x + headbg.width / 2 - clipBM.width, headbg.y + headbg.height / 2 - clipBM.width);
        this.addChildToContainer(clip);
        clip.playWithTime(-1);
        clip.blendMode = egret.BlendMode.ADD;
        //支持骨骼
        if (App.CommonUtil.check_dragon()) {
            var dragonBones_1 = App.DragonBonesUtil.getLoadDragonBones("acluckycarpview_fish");
            dragonBones_1.setPosition(headbg.x + headbg.width / 2, headbg.y + headbg.height - 150);
            this.addChildToContainer(dragonBones_1);
        }
        else {
            var effectFish_1 = BaseLoadBitmap.create("acluckycarpview_effect_fish");
            effectFish_1.width = 296;
            effectFish_1.height = 271;
            effectFish_1.anchorOffsetX = effectFish_1.width / 2;
            effectFish_1.anchorOffsetY = effectFish_1.height / 2;
            effectFish_1.setPosition(headbg.x + headbg.width / 2, headbg.y + headbg.height / 2 + 10);
            this.addChildToContainer(effectFish_1);
            egret.Tween.get(effectFish_1, { loop: true }).to({ rotation: -360 }, 7500).call(function () {
                effectFish_1.rotation = 0;
            }, this);
        }
        var tipBg1 = BaseBitmap.create("acluckycarpviewcommonwordbg");
        tipBg1.width = 574;
        tipBg1.setPosition(GameConfig.stageWidth - tipBg1.width - 15, buttombg.y + 200);
        this.addChildToContainer(tipBg1);
        this._rewardbtn = ComponentManager.getButton("acluckycarprewardbtn", null, this.rewardBtnClick, this);
        this._rewardbtn.setPosition(tipBg1.x - this._rewardbtn.width / 2, tipBg1.y + tipBg1.height / 2 - this._rewardbtn.height / 2);
        this.addChildToContainer(this._rewardbtn);
        this._rewardTF = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyCarpViewRewardTip1-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._rewardTF.setPosition(this._rewardbtn.x + this._rewardbtn.width + 10, tipBg1.y + tipBg1.height / 2 - this._rewardTF.height / 2);
        this.addChildToContainer(this._rewardTF);
        var word2 = BaseLoadBitmap.create("acluckycarpword2-" + this.code);
        word2.height = 43;
        word2.width = 205;
        word2.setPosition(buttombg.x + buttombg.width / 2 - word2.width / 2, tipBg1.y + tipBg1.height);
        this.addChildToContainer(word2);
        this._rewardBox = BaseBitmap.create("acluckycarpbox2");
        this._rewardBox.setPosition(buttombg.x + buttombg.width / 2 - 80, word2.y + word2.height - 15);
        this.addChildToContainer(this._rewardBox);
        this._rewardBox.addTouchTap(this.rewardInfoClick, this);
        this._rewardTipBM = BaseBitmap.create("acluckycarpreward");
        this._rewardTipBM.setPosition(buttombg.x + buttombg.width / 2 - this._rewardTipBM.width / 2, this._rewardBox.y + this._rewardBox.height - this._rewardTipBM.height - 15);
        this.addChildToContainer(this._rewardTipBM);
        var tipBg2 = BaseBitmap.create("acluckycarpviewcommonwordbg");
        tipBg2.width = 434;
        tipBg2.setPosition(GameConfig.stageWidth / 2 - tipBg2.width / 2, this._rewardBox.y + this._rewardBox.height);
        this.addChildToContainer(tipBg2);
        this._timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyCarpViewTime-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeTF.setPosition(GameConfig.stageWidth / 2 - this._timeTF.width / 2, tipBg2.y + tipBg2.height / 2 - this._timeTF.height / 2);
        this.addChildToContainer(this._timeTF);
        this.refreshView();
        this.tick();
    };
    /**UI 刷新 */
    AcLuckyCarpView.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (vo.getChargeNum() < cfg.rechargeReward.needGem) {
            var offsetNum = cfg.rechargeReward.needGem - vo.getChargeNum();
            this._rewardTF.text = LanguageManager.getlocal("acLuckyCarpViewRewardTip1-" + this.code, [String(offsetNum)]);
            App.CommonUtil.removeIconFromBDOC(this._rewardbtn);
        }
        else {
            this._rewardTF.text = LanguageManager.getlocal("acLuckyCarpViewRewardTip2-" + this.code);
            if (vo.isReceive()) {
                App.CommonUtil.removeIconFromBDOC(this._rewardbtn);
            }
            else {
                App.CommonUtil.addIconToBDOC(this._rewardbtn);
            }
        }
        var posX = this._head.x;
        var posY = this._head.y;
        var depth = this.container.getChildIndex(this._head);
        this.container.removeChild(this._head);
        this._head.dispose();
        this._head = null;
        if (vo.checkIsInEndShowTime()) {
            this._word3.setVisible(false);
            this._achieveTF.setVisible(true);
            if (this._handleDate.someone.uid) {
                this._achieveTF.text = LanguageManager.getlocal("acLuckyCarpViewAchieveTip-" + this.code, [this._handleDate.someone.name]);
                this._head = Api.playerVoApi.getPlayerCircleHead(this._handleDate.someone.pic, this._handleDate.someone.ptitle);
                this._rewardBox.setRes("acluckycarpbox2");
            }
            else {
                this._achieveTF.text = LanguageManager.getlocal("acLuckyCarpViewAchieveTip2-" + this.code);
                this._head = Api.playerVoApi.getPlayerCircleHead(999);
                this._rewardBox.setRes("acluckycarpbox1");
            }
            this._head.setPosition(posX, posY);
            this.container.addChildAt(this._head, depth);
            this._achieveTF.setPosition(this._word3.x + this._word3.width / 2 - this._achieveTF.width / 2, this._word3.y + this._word3.height / 2 - this._achieveTF.height / 2);
            this._rewardTF.text = LanguageManager.getlocal("acLuckyCarpViewRewardTip3-" + this.code);
        }
        else {
            this._word3.setVisible(true);
            this._achieveTF.setVisible(false);
            this._rewardBox.setRes("acluckycarpbox1");
            this._head = Api.playerVoApi.getPlayerCircleHead(999);
            this._head.setPosition(posX, posY);
            this.container.addChildAt(this._head, depth);
        }
    };
    AcLuckyCarpView.prototype.tick = function () {
        if (this._isUpdateView) {
            var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            if (vo.checkIsInEndShowTime()) {
                this._timeTF.text = LanguageManager.getlocal("acLuckyCarpViewTimeTip-" + this.code);
                this.request(NetRequestConst.REQUEST_ACTIVITY_GETLUCKYCAINFO, { activeId: vo.aidAndCode });
                this._isUpdateView = false;
                if (this._handleDate.someone.uid == null) {
                    this._timeTF.text = LanguageManager.getlocal("acLuckyCarpViewTimeTip2-" + this.code);
                }
            }
            else {
                this._timeTF.text = LanguageManager.getlocal("acLuckyCarpViewTime-" + this.code, [vo.acCountDown]);
            }
            this._timeTF.x = GameConfig.stageWidth / 2 - this._timeTF.width / 2;
        }
    };
    /**查看奖励info */
    AcLuckyCarpView.prototype.rewardInfoClick = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.ACLUCKYCARPREWARDVIEW, { code: this.code, aid: this.aid, handleDate: this._handleDate });
    };
    /**奖励按钮 */
    AcLuckyCarpView.prototype.rewardBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACLUCKYCARPREWARDPOPUPVIEW, { code: this.code, aid: this.aid });
    };
    AcLuckyCarpView.prototype.infoHandle = function (event) {
        if (event.data.ret) {
            this._handleDate = event.data.data.data;
            this.refreshView();
        }
    };
    AcLuckyCarpView.prototype.getRequestData = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_GETLUCKYCAINFO, requestData: { activeId: vo.aidAndCode } };
    };
    AcLuckyCarpView.prototype.receiveData = function (data) {
        if (data.ret) {
            this._handleDate = data.data.data;
        }
    };
    AcLuckyCarpView.prototype.getRuleInfo = function () {
        return "acLuckyCarpViewRule-" + this.code;
    };
    AcLuckyCarpView.prototype.getTitleBgName = function () {
        return null;
    };
    AcLuckyCarpView.prototype.getTitleStr = function () {
        return null;
    };
    AcLuckyCarpView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acluckycarpview-" + this.code, "acluckycarpviewcommonwordbg", "progress7_bg", "progress7", "acluckycarpview_effect_lightpoint", "acluckycarpview_effect"
        ]);
    };
    AcLuckyCarpView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETLUCKYCARPREWARD, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETLUCKYCAINFO, this.infoHandle, this);
        this._word3 = null;
        this._rewardTF = null;
        this._rewardbtn = null;
        this._rewardBox = null;
        this._rewardTipBM = null;
        this._timeTF = null;
        this._head = null;
        this._handleDate = null;
        this._isUpdateView = true;
        _super.prototype.dispose.call(this);
    };
    return AcLuckyCarpView;
}(AcCommonView));
__reflect(AcLuckyCarpView.prototype, "AcLuckyCarpView");
//# sourceMappingURL=AcLuckyCarpView.js.map