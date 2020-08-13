/**
 *  奖励
 * date 2017/11/14
 * @class DinnerRewardView
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
var DinnerRewardView = (function (_super) {
    __extends(DinnerRewardView, _super);
    function DinnerRewardView() {
        var _this = _super.call(this) || this;
        _this._isOpend = false;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    DinnerRewardView.prototype.getResourceList = function () {
        return ["dinner_reward_box", "promotion_officerbg1"];
    };
    DinnerRewardView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    DinnerRewardView.prototype.getTitleBgName = function () {
        return null;
    };
    DinnerRewardView.prototype.getTitleStr = function () {
        return null;
    };
    DinnerRewardView.prototype.getCloseBtnName = function () {
        return null;
    };
    DinnerRewardView.prototype.touchTap = function () {
        if (!this._isOpend) {
            return;
        }
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        this.hide();
    };
    DinnerRewardView.prototype.initView = function () {
        this._isOpend = false;
        this.addTouchTap(this.touchTap, this, null);
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        var body = Api.playerVoApi.getPlayerPortrait(this.param.data.level, this.param.data.pic);
        body.setScale(1.3);
        body.setPosition(GameConfig.stageWidth / 2 - body.width / 2 * body.scaleX, GameConfig.stageHeigth / 2 - 230);
        this.addChildToContainer(body);
        var nameBg = BaseBitmap.create("promotion_officerbg1");
        nameBg.setPosition(GameConfig.stageWidth / 2 - nameBg.width / 2, GameConfig.stageHeigth / 2 + 360);
        this.addChildToContainer(nameBg);
        var nameText = ComponentManager.getTextField(this.param.data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(nameBg.x + nameBg.width / 2 - nameText.width / 2, nameBg.y + nameBg.height / 2 - nameText.height / 2);
        this.addChildToContainer(nameText);
        this.container.alpha = 0;
        egret.Tween.get(this.container).to({ alpha: 1 }, 300).wait(500).call(this.showView, this);
    };
    DinnerRewardView.prototype.showView = function () {
        this._isOpend = true;
        //对话框
        var wordsBg = BaseBitmap.create("public_9_bg25");
        wordsBg.width = 504;
        wordsBg.height = 104;
        wordsBg.setPosition(GameConfig.stageWidth / 2 - wordsBg.width / 2, GameConfig.stageHeigth / 2 - 380);
        this.addChildToContainer(wordsBg);
        var wordsCornerBg = BaseBitmap.create("public_9_bg25_tail");
        wordsCornerBg.x = wordsBg.x + wordsBg.width / 2 + 120;
        wordsCornerBg.y = wordsBg.y + wordsBg.height - 3;
        this.addChildToContainer(wordsCornerBg);
        var wordsText = ComponentManager.getTextField(LanguageManager.getlocal("dinnerRewardTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        wordsText.width = 466;
        wordsText.lineSpacing = 6;
        wordsText.setPosition(wordsBg.x + wordsBg.width / 2 - wordsText.width / 2, wordsBg.y + wordsBg.height / 2 - wordsText.height / 2);
        this.addChildToContainer(wordsText);
        var box = BaseBitmap.create("dinner_reward_box");
        box.setPosition(GameConfig.stageWidth / 2 - box.width / 2, GameConfig.stageHeigth / 2 + 5);
        this.addChildToContainer(box);
        var pos = egret.Point.create(GameConfig.stageWidth / 2, box.y + box.height / 2 - 30);
        var awards = [];
        awards.push({ tipMessage: LanguageManager.getlocal("dinnerGetScore") + "+" + this.param.data.point });
        if (!Api.switchVoApi.checkCloseDinnerNewFunc()) {
            awards.push({ tipMessage: LanguageManager.getlocal("dinnerScore") + "+" + this.param.data.point });
        }
        if (this.param.data.reward && typeof (this.param.data.reward) == "string" && this.param.data.reward != "") {
            var rewardVo = GameData.formatRewardItem(this.param.data.reward);
            for (var k in rewardVo) {
                var vo = rewardVo[k];
                awards.push({ icon: vo.icon, tipMessage: "+" + vo.num });
            }
        }
        App.CommonUtil.playRewardFlyAction(awards, pos);
    };
    DinnerRewardView.prototype.dispose = function () {
        this._isOpend = false;
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return DinnerRewardView;
}(CommonView));
__reflect(DinnerRewardView.prototype, "DinnerRewardView");
//# sourceMappingURL=DinnerRewardView.js.map