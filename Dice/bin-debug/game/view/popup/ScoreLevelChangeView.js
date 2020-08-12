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
 * 等级变化动画效果
 * author qianjun
 */
var ScoreLevelChangeView = (function (_super) {
    __extends(ScoreLevelChangeView, _super);
    function ScoreLevelChangeView() {
        return _super.call(this) || this;
    }
    // 打开该面板时，需要传参数msg
    ScoreLevelChangeView.prototype.initView = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var param = view.param.data;
        var type = param.type;
        var prevlevel = param.level;
        //1 上升 2下降
        var scale = 280 / 400;
        // let prevlevelBg = BaseBitmap.create(`public_level_${prevlevel}`);
        var prevlevelBg = BaseLoadBitmap.create("levelicon" + prevlevel);
        view.addChild(prevlevelBg);
        prevlevelBg.anchorOffsetX = prevlevelBg.width / 2;
        prevlevelBg.anchorOffsetY = prevlevelBg.height / 2;
        prevlevelBg.setScale(scale);
        prevlevelBg.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        // let prevlevelBg2 = BaseBitmap.create(`public_level_${prevlevel}`);
        var prevlevelBg2 = BaseLoadBitmap.create("levelicon" + prevlevel);
        view.addChild(prevlevelBg2);
        prevlevelBg2.anchorOffsetX = prevlevelBg2.width / 2;
        prevlevelBg2.anchorOffsetY = prevlevelBg2.height / 2;
        prevlevelBg2.setScale(scale);
        prevlevelBg2.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        prevlevelBg2.alpha = 0;
        prevlevelBg2.blendMode = egret.BlendMode.ADD;
        // let curlevelBg = BaseBitmap.create(`public_level_${Api.UserinfoVoApi.getLevel()}`);
        var curlevelBg = BaseLoadBitmap.create("levelicon" + Api.UserinfoVoApi.getLevel());
        view.addChild(curlevelBg);
        curlevelBg.anchorOffsetX = curlevelBg.width / 2;
        curlevelBg.anchorOffsetY = curlevelBg.height / 2;
        curlevelBg.setScale(scale);
        curlevelBg.alpha = 0;
        curlevelBg.setScale(0.5 * scale);
        // levelBg.setScale(4);
        curlevelBg.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, curlevelBg, view);
        var timeparam = BattleStatus.timeparam;
        egret.Tween.get(prevlevelBg2).wait(20 * timeparam).to({ alpha: 1 }, 27 * timeparam);
        egret.Tween.get(prevlevelBg).to({ scaleX: 0.95 * scale, scaleY: 0.95 * scale }, 20 * timeparam)
            .to({ scaleX: scale, scaleY: scale }, 5 * timeparam)
            .call(function () {
            var db = App.DragonBonesUtil.getLoadDragonBones("royalpass_dj_" + type, 1);
            db.blendMode = egret.BlendMode.ADD;
            view.addChild(db);
            db.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        }, view)
            .to({ scaleX: 0.6 * scale, scaleY: 0.6 * scale }, 5 * timeparam)
            .to({ scaleX: 0.8 * scale, scaleY: 0.8 * scale }, 5 * timeparam)
            .to({ scaleX: 0.55 * scale, scaleY: 0.55 * scale }, 5 * timeparam)
            .to({ scaleX: 0.58 * scale, scaleY: 0.58 * scale }, 3 * timeparam)
            .to({ scaleX: 0.45 * scale, scaleY: 0.45 * scale }, 4 * timeparam).call(function () {
            prevlevelBg.alpha = 0;
            egret.Tween.removeTweens(prevlevelBg);
        }, view);
        egret.Tween.get(prevlevelBg2).to({ scaleX: 0.95 * scale, scaleY: 0.95 * scale }, 20 * timeparam)
            .to({ scaleX: 1 * scale, scaleY: 1 * scale }, 5 * timeparam)
            .to({ scaleX: 0.6 * scale, scaleY: 0.6 * scale }, 5 * timeparam)
            .to({ scaleX: 0.8 * scale, scaleY: 0.8 * scale }, 5 * timeparam)
            .to({ scaleX: 0.55 * scale, scaleY: 0.55 * scale }, 5 * timeparam)
            .to({ scaleX: 0.58 * scale, scaleY: 0.58 * scale }, 3 * timeparam)
            .to({ scaleX: 0.45 * scale, scaleY: 0.45 * scale, alpha: 0 }, 4 * timeparam).call(function () {
            prevlevelBg2.alpha = 0;
            egret.Tween.removeTweens(prevlevelBg2);
        }, view);
        egret.Tween.get(curlevelBg).wait(47 * timeparam).to({ scaleX: 0.75 * scale, scaleY: 1.25 * scale, alpha: 1 }, 3 * timeparam)
            .to({ scaleX: 1.4 * scale, scaleY: 1.2 * scale }, 4 * timeparam)
            .to({ scaleX: 1 * scale, scaleY: 1 * scale }, 11 * timeparam).call(function () {
            egret.Tween.removeTweens(curlevelBg);
        }, view);
        var scaleScore = 0.5;
        var scoreLevelType = BaseBitmap.create("leveluptitle" + type);
        view.addChild(scoreLevelType);
        scoreLevelType.anchorOffsetX = scoreLevelType.width / 2;
        scoreLevelType.anchorOffsetY = scoreLevelType.height / 2;
        scoreLevelType.setScale(scaleScore);
        scoreLevelType.scaleX = 0.5 * scaleScore;
        scoreLevelType.alpha = 0;
        scoreLevelType.setPosition(GameConfig.stageWidth / 2, curlevelBg.y - 200);
        egret.Tween.get(scoreLevelType).wait(49 * timeparam).to({ scaleX: 1.5 * scaleScore, scaleY: 1 * scaleScore, alpha: 1 }, 5 * timeparam)
            .to({ scaleX: 0.9 * scaleScore, scaleY: 1 * scaleScore }, 8 * timeparam)
            .to({ scaleX: 1.1 * scaleScore, scaleY: 1 * scaleScore }, 6 * timeparam)
            .to({ scaleX: 1 * scaleScore, scaleY: 1 * scaleScore }, 6 * timeparam)
            .call(function () {
            egret.Tween.removeTweens(scoreLevelType);
        }, view);
        //let tipTxt = ComponentMgr.getTextField(LangMger.getlocal(``), );
        if (type == 1) {
            SoundMgr.playEffect(SoundConst.EFFECT_TROPHY_UPGRADE);
        }
        else {
            SoundMgr.playEffect(SoundConst.EFFECT_TROPHY_DOWNUPGRADE);
        }
    };
    ScoreLevelChangeView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, group, view);
    };
    ScoreLevelChangeView.prototype.isTouchMaskClose = function () {
        return true;
    };
    ScoreLevelChangeView.prototype.clickConHandler = function (data) {
        var param = this.param;
        // if (!param.data.clickNotAutoHide) {
        // 	this.hide();
        // }
        if (param.data.callback) {
            param.data.callback.apply(param.data.handler, [this]);
        }
    };
    ScoreLevelChangeView.prototype.getBgName = function () {
        return null;
    };
    ScoreLevelChangeView.prototype.getTitleBgName = function () {
        return null;
    };
    ScoreLevelChangeView.prototype.getTitleStr = function () {
        return null;
    };
    ScoreLevelChangeView.prototype.getCloseBtnName = function () {
        return null; //this.param.data.needClose === 1 ? 
    };
    ScoreLevelChangeView.prototype.hide = function () {
        var param = this.param;
        if (param.data.callback) {
            param.data.callback.apply(param.data.handler, [this]);
        }
        _super.prototype.hide.call(this);
    };
    ScoreLevelChangeView.prototype.getResourceList = function () {
        var array = [];
        array.concat(_super.prototype.getResourceList.call(this));
        var param = this.param.data;
        var type = param.type;
        return array.concat([
            "leveluptitle" + type
        ]);
    };
    ScoreLevelChangeView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ScoreLevelChangeView;
}(PopupView));
__reflect(ScoreLevelChangeView.prototype, "ScoreLevelChangeView");
//# sourceMappingURL=ScoreLevelChangeView.js.map