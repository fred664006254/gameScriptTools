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
var EmperorwarBattleResultView = (function (_super) {
    __extends(EmperorwarBattleResultView, _super);
    function EmperorwarBattleResultView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._infoContainer = null;
        return _this;
    }
    EmperorwarBattleResultView.prototype.getTitleBgName = function () {
        return null;
    };
    EmperorwarBattleResultView.prototype.getTitleStr = function () {
        return null;
    };
    EmperorwarBattleResultView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    EmperorwarBattleResultView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        if (this.param.data.result == 1) {
            rewardPic = rewardPic.concat(["emperor_win_light", "emperor_battle_win_bg", "emperor_battle_win_1", "emperor_battle_win_2"]);
            ;
        }
        else {
            rewardPic = rewardPic.concat(["emperor_battle_lost", "emperor_battle_lost_bg", "emperor_battle_lost_bg2"]);
            ;
        }
        return rewardPic;
    };
    EmperorwarBattleResultView.prototype.initView = function () {
        this.addTouchTap(this.touchTap, this, null);
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        var result = this.param.data.result;
        var battleBg2;
        var picStr;
        var bgStr;
        if (result == 1) {
            picStr = "emperor_battle_win_1";
            bgStr = "emperor_battle_win_bg";
            battleBg2 = BaseBitmap.create("emperor_win_light");
            battleBg2.anchorOffsetX = battleBg2.width / 2;
            battleBg2.anchorOffsetY = battleBg2.height / 2;
            battleBg2.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
            this.addChildToContainer(battleBg2);
        }
        else {
            picStr = "emperor_battle_lost";
            bgStr = "emperor_battle_lost_bg";
        }
        var battleBg = BaseBitmap.create(bgStr);
        battleBg.setPosition(GameConfig.stageWidth / 2 - battleBg.width / 2, GameConfig.stageHeigth / 2 - battleBg.height / 2);
        this.addChildToContainer(battleBg);
        battleBg.name = "battleBg";
        var battleresult = BaseBitmap.create(picStr);
        battleresult.setPosition(GameConfig.stageWidth / 2 - battleresult.width / 2, GameConfig.stageHeigth / 2 - battleresult.height / 2);
        this.addChildToContainer(battleresult);
        this._infoContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._infoContainer);
        var countDownBg = BaseBitmap.create("public_searchdescbg");
        countDownBg.height = 82;
        countDownBg.setPosition(GameConfig.stageWidth / 2 - countDownBg.width / 2 + 20, battleresult.y + battleresult.height + 55);
        this._infoContainer.addChild(countDownBg);
        if (this.param.data.result == 1) {
            countDownBg.y += 40;
        }
        var nameStrTab = this.param.data.names;
        var name1 = ComponentManager.getTextField(nameStrTab[0], TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        name1.setPosition(GameConfig.stageWidth / 2 - 10 - name1.width, countDownBg.y + 18);
        this._infoContainer.addChild(name1);
        var name2 = ComponentManager.getTextField(nameStrTab[1], TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_RED);
        name2.setPosition(GameConfig.stageWidth / 2 - 10 - name2.width, name1.y + name1.height + 5);
        this._infoContainer.addChild(name2);
        var resoult1 = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarFightWin"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        resoult1.setPosition(GameConfig.stageWidth / 2 + 10, countDownBg.y + 18);
        this._infoContainer.addChild(resoult1);
        var resoult2 = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarFightFail"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        resoult2.setPosition(resoult1.x, name2.y);
        this._infoContainer.addChild(resoult2);
        var closeText = ComponentManager.getTextField(LanguageManager.getlocal("clickToClose"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        closeText.textAlign = egret.HorizontalAlign.CENTER;
        closeText.setPosition((GameConfig.stageWidth - closeText.width) / 2, GameConfig.stageHeigth - 50);
        this._infoContainer.addChild(closeText);
        this._infoContainer.visible = false;
        if (result == 1) {
            //胜利动画
            battleBg2.name = "battleBg2";
            battleBg.visible = false;
            battleBg2.setScale(0.01);
            battleBg.visible = false;
            battleresult.visible = false;
            battleresult.y = GameConfig.stageHeigth / 2 - battleresult.height;
            var battleresult2_1 = BaseBitmap.create("emperor_battle_win_2");
            battleresult2_1.setPosition(GameConfig.stageWidth / 2 - battleresult2_1.width / 2, GameConfig.stageHeigth / 2);
            this.addChildToContainer(battleresult2_1);
            battleresult.visible = false;
            battleresult2_1.visible = false;
            var originalScale2 = 4;
            var oldx2 = battleresult.x;
            var oldy2 = battleresult.y;
            battleresult.setScale(originalScale2);
            battleresult.setPosition(oldx2 - (originalScale2 - 1) / 2 * battleresult.width, oldy2 - (originalScale2 - 1) / 2 * battleresult.height);
            var originalScale3 = 4;
            var oldx3 = battleresult2_1.x;
            var oldy3 = battleresult2_1.y;
            battleresult2_1.setScale(originalScale3);
            battleresult2_1.setPosition(oldx3 - (originalScale3 - 1) / 2 * battleresult2_1.width, oldy3 - (originalScale3 - 1) / 2 * battleresult2_1.height);
            var originalScale = 4;
            var oldx_1 = battleBg.x;
            var oldy_1 = battleBg.y;
            battleBg.setScale(originalScale);
            battleBg.setPosition(oldx_1 - (originalScale - 1) / 2 * battleBg.width, oldy_1 - (originalScale - 1) / 2 * battleBg.height);
            var that_1 = this;
            if (PlatformManager.checkIsEnSp()) {
                oldy2 = oldy2 + 20;
            }
            egret.Tween.get(battleBg2).to({ scaleX: 1, scaleY: 1 }, 500).call(function () {
                egret.Tween.get(battleBg2, { loop: true }).to({ rotation: 360 }, 3000);
                battleBg.visible = true;
                egret.Tween.get(battleBg).to({ scaleX: 1, scaleY: 1, x: oldx_1, y: oldy_1 }, 400);
            }).wait(500).call(function () {
                battleresult.visible = true;
                egret.Tween.get(battleresult).to({ scaleX: 1, scaleY: 1, x: oldx2, y: oldy2 }, 400);
            }).wait(200).call(function () {
                battleresult2_1.visible = true;
                egret.Tween.get(battleresult2_1).to({ scaleX: 1, scaleY: 1, x: oldx3, y: oldy3 }, 400);
            }).wait(300).call(function () {
                that_1._infoContainer.visible = true;
            });
        }
        else {
            battleBg2 = BaseBitmap.create("emperor_battle_lost_bg2");
            battleBg2.setPosition(GameConfig.stageWidth / 2 - battleBg2.width / 2, GameConfig.stageHeigth / 2 - battleBg2.height / 2);
            this.addChildToContainer(battleBg2);
            battleBg2.name = "battleBg2";
            battleBg.visible = false;
            //失败动画
            battleresult.alpha = 0;
            var originalScale = 4;
            var oldx = battleBg2.x;
            var oldy = battleBg2.y;
            battleBg2.setScale(originalScale);
            battleBg2.setPosition(oldx - (originalScale - 1) / 2 * battleBg2.width, oldy - (originalScale - 1) / 2 * battleBg2.height);
            var that_2 = this;
            egret.Tween.get(battleBg2).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 400).call(function () {
                battleBg2.visible = false;
                battleBg.visible = true;
                if (PlatformManager.checkIsEnSp()) {
                    battleBg.y = battleBg.y - 20;
                }
            }).wait(100).call(function () {
                egret.Tween.get(battleresult).to({ alpha: 1 }, 400);
            }).wait(300).call(function () {
                that_2._infoContainer.visible = true;
            });
        }
    };
    EmperorwarBattleResultView.prototype.touchTap = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        this.hide();
    };
    EmperorwarBattleResultView.prototype.dispose = function () {
        egret.Tween.removeTweens(this.container.getChildByName("battleBg"));
        if (this.container.getChildByName("battleBg2")) {
            egret.Tween.removeTweens(this.container.getChildByName("battleBg2"));
        }
        this._callbackF = null;
        this._obj = null;
        this._infoContainer = null;
        _super.prototype.dispose.call(this);
    };
    return EmperorwarBattleResultView;
}(BaseView));
__reflect(EmperorwarBattleResultView.prototype, "EmperorwarBattleResultView");
//# sourceMappingURL=EmperorwarBattleResultView.js.map