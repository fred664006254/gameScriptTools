/**
  * 海滨伊人 次数领奖
  * @author shaoliang
  * date 2020/7/9
  * @class SeaWomanRewardNode
  */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SeaWomanRewardNode = /** @class */ (function (_super) {
    __extends(SeaWomanRewardNode, _super);
    function SeaWomanRewardNode() {
        var _this = _super.call(this) || this;
        _this._cfg = null;
        _this._code = null;
        _this._timeText = null;
        _this._showtype = 1; //1 不能领奖 。2.能领奖 。3，已领奖
        _this._clip = null;
        return _this;
    }
    SeaWomanRewardNode.prototype.init = function (data, code, f, o) {
        var _this = this;
        this._cfg = data;
        this._code = code;
        var rewardbg1 = BaseBitmap.create("seawoman_reawardbg1-" + code);
        rewardbg1.setPosition(0, 35);
        this.addChild(rewardbg1);
        var rewardbg2 = BaseBitmap.create("seawoman_reawardbg2-" + code);
        rewardbg2.setPosition(rewardbg1.width / 2 - rewardbg2.width / 2, 0);
        this.addChild(rewardbg2);
        var timeText = ComponentManager.getTextField(String(data.needNum), 18, TextFieldConst.COLOR_WHITE);
        timeText.width = 50;
        timeText.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, timeText, rewardbg2);
        this.addChild(timeText);
        this.addTouchTap(function () {
            f.apply(o, [_this._cfg.id]);
        }, this);
    };
    SeaWomanRewardNode.prototype.setShowType = function (type) {
        if (type == this._showtype) {
            return;
        }
        this._showtype = type;
        if (this._clip) {
            this._clip.dispose();
            this._clip = null;
        }
        if (type == 2) {
            var clip = ComponentManager.getCustomMovieClip("seawoman_effect_haixing", 15, 80);
            clip.setPosition(-10, 20);
            clip.playWithTime(0);
            clip.blendMode = egret.BlendMode.ADD;
            this.addChildAt(clip, 1);
            this._clip = clip;
        }
        else if (type == 3) {
            App.DisplayUtil.changeToGray(this);
        }
    };
    SeaWomanRewardNode.prototype.dispose = function () {
        this._cfg = null;
        this._code = null;
        this._timeText = null;
        this._clip = null;
        this._showtype = 1;
        _super.prototype.dispose.call(this);
    };
    return SeaWomanRewardNode;
}(BaseDisplayObjectContainer));
//# sourceMappingURL=SeaWomanRewardNode.js.map