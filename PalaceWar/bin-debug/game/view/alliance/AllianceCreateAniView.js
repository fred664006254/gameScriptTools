/**
 * 创建/加入帮会动画
 * author dukunayng
 * date 2017/10/10
 * @class AllianceCreateAniView
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
var AllianceCreateAniView = (function (_super) {
    __extends(AllianceCreateAniView, _super);
    function AllianceCreateAniView() {
        return _super.call(this) || this;
    }
    AllianceCreateAniView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        return rewardPic.concat(["alliance_create_ani",
            "alliance_joinpic", "alliance_createpic",
        ]);
    };
    AllianceCreateAniView.prototype.getTitleBgName = function () {
        return null;
    };
    AllianceCreateAniView.prototype.getTitleStr = function () {
        return null;
    };
    AllianceCreateAniView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    AllianceCreateAniView.prototype.initView = function () {
        this.addTouchTap(this.touchTap, this, null);
        var picStr = "alliance_createpic";
        if (this.param.data.type == 2) {
            picStr = "alliance_joinpic";
        }
        this._lighePic = BaseBitmap.create("public_rotatelight");
        this._lighePic.scaleX = 3 / 2;
        this._lighePic.scaleY = 3 / 2;
        this._lighePic.anchorOffsetX = this._lighePic.width / 2;
        this._lighePic.anchorOffsetY = this._lighePic.height / 2;
        this._lighePic.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        this.addChild(this._lighePic);
        this._lighePic.visible = false;
        this._lighePic.blendMode = egret.BlendMode.ADD;
        var aniBB = BaseBitmap.create("alliance_create_ani_1");
        var itemClip = ComponentManager.getCustomMovieClip("alliance_create_ani_", 6, 100);
        itemClip.x = GameConfig.stageWidth / 2 - aniBB.width;
        itemClip.y = GameConfig.stageHeigth / 2 - aniBB.height;
        itemClip.setScale(2);
        // itemClip.x = 300;
        // itemClip.y = 400;
        this.addChild(itemClip);
        itemClip.playWithTime(1);
        itemClip.blendMode = egret.BlendMode.ADD;
        // itemClip.play();
        itemClip.setEndCallBack(this.lightAni, this);
        var container = new BaseDisplayObjectContainer();
        this.addChild(container);
        var textBB = BaseBitmap.create(picStr);
        textBB.anchorOffsetX = textBB.width / 2;
        textBB.anchorOffsetY = textBB.height / 2;
        container.x = GameConfig.stageWidth / 2 - container.width / 2;
        container.y = GameConfig.stageHeigth / 2 - container.height / 2;
        container.setScale(0.01);
        container.addChild(textBB);
        egret.Tween.get(container).to({ scaleX: 1, scaleY: 1 }, 200);
    };
    AllianceCreateAniView.prototype.lightAni = function () {
        this._lighePic.visible = true;
        egret.Tween.get(this._lighePic, { loop: true })
            .to({ rotation: 360 }, 8000);
    };
    AllianceCreateAniView.prototype.touchTap = function () {
        this.hide();
    };
    AllianceCreateAniView.prototype.dispose = function () {
        this._lighePic = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceCreateAniView;
}(BaseView));
__reflect(AllianceCreateAniView.prototype, "AllianceCreateAniView");
//# sourceMappingURL=AllianceCreateAniView.js.map