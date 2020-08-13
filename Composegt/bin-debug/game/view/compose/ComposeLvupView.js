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
var ComposeLvupView = (function (_super) {
    __extends(ComposeLvupView, _super);
    function ComposeLvupView() {
        var _this = _super.call(this) || this;
        _this._getNewMvPlaying = false;
        return _this;
    }
    ComposeLvupView.prototype.initView = function () {
        var _this = this;
        SoundManager.playEffect(SoundConst.EFFECT_DOUBLESEVEN3_CLICKBTN);
        Api.rookieVoApi.checkNextStep();
        var maxLv = this.getMaxLv();
        var drag;
        var titleBg;
        var lightbg;
        if (App.CommonUtil.check_dragon()) {
            drag = App.DragonBonesUtil.getLoadDragonBones("jiesuoxindengji", 1, "birth");
            drag.setPosition(0, 0);
            this.addChildToContainer(drag);
            // drag.setPosition(0,1150-(1136-GameConfig.stageHeigth));
            drag.setDragonBoneEventListener(dragonBones.AnimationEvent.COMPLETE, function () {
                drag.playDragonMovie("idle", 0);
            }, this);
        }
        else {
            titleBg = BaseBitmap.create("composelvuptitle_text");
            this.addChildToContainer(titleBg);
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 280, 280);
            lightbg = BaseLoadBitmap.create("composelvuplightbg", rect);
            this.addChildToContainer(lightbg);
        }
        var scale = 1;
        var persion = BaseLoadBitmap.create(Config.MapinfoCfg.getPersonResBig(maxLv - 1), ComposeStatus.renBigSize);
        persion.setScale(scale);
        persion.setPosition((GameConfig.stageWidth - persion.width * persion.scaleX) * 0.5, GameConfig.stageHeigth / 2 - persion.height * persion.scaleY);
        this.addChildToContainer(persion);
        this._personImg = persion;
        var persionPosY = persion.x;
        var persion2 = BaseLoadBitmap.create(Config.MapinfoCfg.getPersonResBig(maxLv - 1), ComposeStatus.renBigSize);
        persion2.setScale(scale);
        persion2.setPosition(persion.x, persion.y);
        this.addChildToContainer(persion2);
        egret.Tween.get(persion).to({ x: persionPosY - 50 * scale }, 250).to({ x: persionPosY }, 100).call(function () {
            persion && egret.Tween.removeTweens(persion);
            persion.setload(Config.MapinfoCfg.getPersonResBig(maxLv), ComposeStatus.renBigSize);
            var effect = ComponentManager.getCustomMovieClip("compose_com", 8);
            effect.setScale(1 * scale);
            effect.setPosition(persion.x - 63 * scale, persion.y - 80 * scale);
            _this.addChildToContainer(effect);
            effect.setEndCallBack(function () {
                effect && effect.dispose();
            }, _this);
            effect.playWithTime(1);
        }, this);
        egret.Tween.get(persion2).to({ x: persionPosY + 50 * scale }, 250).to({ x: persionPosY }, 100).call(function () {
            persion2 && persion2.dispose();
        }, this);
        drag && drag.setPosition(GameConfig.stageWidth * 0.5, persion.y + (persion.height * persion.scaleY) * 0.5);
        lightbg && lightbg.setPosition((GameConfig.stageWidth - lightbg.width) * 0.5 - 25, persion.y + (persion.height - lightbg.height) * 0.5 + 70);
        titleBg && titleBg.setPosition((GameConfig.stageWidth - titleBg.width) * 0.5, persion.y - titleBg.height);
        var nameBg = BaseBitmap.create("public_lockbg");
        nameBg.setPosition((GameConfig.stageWidth - nameBg.width) * 0.5, persion.y - nameBg.height);
        this.addChildToContainer(nameBg);
        var nameStr = Config.PersoninfoCfg.getPersonLocalNameByLv(maxLv);
        var lvStr = Config.PersoninfoCfg.getPersonLocalLvByLv(maxLv);
        var nameTf = ComponentManager.getTextField(nameStr + "  " + lvStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTf.setPosition(nameBg.x + (nameBg.width * nameBg.scaleX - nameTf.width) * 0.5, nameBg.y + (nameBg.height * nameBg.scaleY - nameTf.height) * 0.5);
        this.addChildToContainer(nameTf);
        var bg = BaseBitmap.create("composelvupbg");
        bg.setPosition((GameConfig.stageWidth - bg.width) * 0.5, persion.y + persion.height * persion.scaleY + 50);
        this.addChildToContainer(bg);
        var lvbg = BaseBitmap.create("public_ts_bg01");
        lvbg.width = 260;
        lvbg.setPosition((GameConfig.stageWidth - lvbg.width) * 0.5, bg.y + 42);
        this.addChildToContainer(lvbg);
        var lvtxt = ComponentManager.getTextField(LanguageManager.getlocal("unlockRewardTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        lvtxt.setPosition(lvbg.x + (lvbg.width - lvtxt.width) * 0.5, lvbg.y + (lvbg.height - lvtxt.height) * 0.5);
        this.addChildToContainer(lvtxt);
        var closeTxt = ComponentManager.getTextField(LanguageManager.getlocal("clickToClose"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        closeTxt.setPosition((GameConfig.stageWidth - closeTxt.width) * 0.5, bg.y + bg.height + 40);
        this.addChildToContainer(closeTxt);
        var cfg = Config.PersoninfoCfg.getPersonCfgByLv(maxLv);
        if (cfg) {
            var rewardsstr = cfg.firstReward;
            if (rewardsstr) {
                var scale_1 = 0.45;
                var rewardVoArr = GameData.formatRewardItem(rewardsstr);
                var l = rewardVoArr.length;
                var startY = lvbg.y + lvbg.height + 23 + (100 * scale_1 * (4 - l) / 2);
                for (var i = 0; i < l; i++) {
                    var vo = rewardVoArr[i];
                    var icon = BaseLoadBitmap.create(vo.icon);
                    icon.setScale(scale_1);
                    this.addChildToContainer(icon);
                    var txt = ComponentManager.getBitmapText("+" + vo.num, TextFieldConst.FONTNAME_ITEMTIP);
                    icon.setPosition(bg.x + (bg.width - 60 - txt.width) * 0.5, startY + (100 * scale_1) * i);
                    txt.setPosition(icon.x + 60, icon.y + (50 - txt.height) / 2);
                    this.addChildToContainer(txt);
                }
                var tmpRewards = this.getRewards();
                var rewardList = GameData.formatRewardItem(tmpRewards || rewardsstr);
                App.CommonUtil.playRewardFlyAction(rewardList);
            }
        }
        this.addTouchTap(this.onTouchTap, this);
    };
    ComposeLvupView.prototype.onTouchTap = function () {
        // this.onGetNewServant("1001");
        // const _lv = this.getMaxLv();
        // let _cfg = Config.PersoninfoCfg.getPersonCfgByLv(_lv);
        // if (_cfg && _cfg.unlockServent) {
        if (this.param.data.unlockServant) {
            // todo 有新解锁的门客
            this.onGetNewServant(this.param.data.unlockServant);
        }
        else {
            this.hide();
        }
    };
    ComposeLvupView.prototype.onGetNewServant = function (sid) {
        var _this = this;
        if (this._getNewMvPlaying)
            return;
        this._getNewMvPlaying = true;
        this._personImg.anchorOffsetX = this._personImg.width / 2;
        this._personImg.anchorOffsetY = this._personImg.height / 2;
        this._personImg.x += this._personImg.anchorOffsetX;
        this._personImg.y += this._personImg.anchorOffsetY;
        egret.Tween.get(this._personImg)
            .to({ scaleX: 1.3, scaleY: 1.3 }, 200)
            .to({ scaleX: 0.8, scaleY: 0.8 }, 600)
            .wait(200)
            .to({ scaleX: 1.6, scaleY: 1.6 }, 200)
            .to({ scaleX: 1.1, scaleY: 1.1 }, 600)
            .wait(200)
            .to({ scaleX: 4, scaleY: 4, alpha: 0.2 }, 200)
            .call(function () {
            // ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, [sid]);
            var servantCfg = GameConfig.config.servantCfg[sid];
            if (servantCfg.getStoryID) {
                // 有故事的人
                ViewController.getInstance().openView(ViewConst.COMMON.SEARCHSTORYVIEW, {
                    storyId: servantCfg.getStoryID,
                    newServant: true,
                    callback: function (unlockServant) {
                        ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, unlockServant);
                    },
                    target: _this,
                    params: [sid]
                });
            }
            else {
                // 没故事的人
                ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, [sid]);
            }
            _this.hide();
        });
    };
    ComposeLvupView.prototype.getMaxLv = function () {
        return this.param ? this.param.data.lv : Api.composemapVoApi.getMaxLv();
    };
    ComposeLvupView.prototype.getRewards = function () {
        return this.param ? this.param.data.rewards : "";
    };
    ComposeLvupView.prototype.getResourceList = function () {
        var resList = [
            "composelvupbg",
        ];
        if (!App.CommonUtil.check_dragon()) {
            resList.push("composelvuptitle_text");
        }
        return _super.prototype.getResourceList.call(this).concat(resList);
    };
    ComposeLvupView.prototype.getTitleStr = function () {
        return null;
    };
    ComposeLvupView.prototype.getCloseBtnName = function () {
        return null;
    };
    ComposeLvupView.prototype.dispose = function () {
        this._getNewMvPlaying = false;
        var lv = this.getMaxLv();
        Api.rookieVoApi.checkNextStep();
        _super.prototype.dispose.call(this);
        if (lv == 5) {
            Api.rookieVoApi.curGuideKey = "levelup";
            Api.rookieVoApi.insertWaitingGuide({ "idx": "levelup_1" });
            Api.rookieVoApi.checkWaitingGuide();
        }
        else if (lv == 6) {
            Api.rookieVoApi.curGuideKey = "challenge";
            Api.rookieVoApi.insertWaitingGuide({ "idx": "challenge_1" });
            Api.rookieVoApi.checkWaitingGuide();
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_UNLOCK_CELL);
        }
        else if (Config.DinnerCfg.getNeedLv() == lv) {
            Api.rookieVoApi.curGuideKey = "dinner";
            Api.rookieVoApi.insertWaitingGuide({ "idx": "dinner_1" }, true);
        }
        else if (Api.searchVoApi.getUnlockPersonLimit() == lv) {
            //寻访分阶段引导
            Api.rookieVoApi._waitingGuide.length = 0;
            Api.rookieVoApi.curGuideKey = "search";
            Api.rookieVoApi.insertWaitingGuide({ "idx": "search_1" }, true);
            if (PlatformManager.isShowNewAnalytics()) {
                PlatformManager.analyticsUnlockSearch();
            }
        }
    };
    return ComposeLvupView;
}(BaseView));
__reflect(ComposeLvupView.prototype, "ComposeLvupView");
