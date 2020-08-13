/**
  * 情定鹊桥 次数领奖
  * @author shaoliang
  * date 2020/7/16
  * @class BirdBridgeRewardNode
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
var BirdBridgeRewardNode = /** @class */ (function (_super) {
    __extends(BirdBridgeRewardNode, _super);
    function BirdBridgeRewardNode() {
        var _this = _super.call(this) || this;
        _this._cfg = null;
        _this._code = null;
        _this._bg = null;
        _this._showtype = 1; //1 不能领奖 。2.能领奖 。3，已领奖
        _this._clip = null;
        return _this;
    }
    BirdBridgeRewardNode.prototype.init = function (data, code, f, o) {
        var _this = this;
        this._cfg = data;
        this._code = code;
        var line = BaseBitmap.create("birdbridge_line-" + code);
        this.addChild(line);
        var rewardbg1 = BaseBitmap.create("birdbridge_crane2-" + code);
        rewardbg1.setPosition(0, 25);
        this.addChild(rewardbg1);
        this._bg = rewardbg1;
        line.x = rewardbg1.width / 2 - line.width / 2;
        var rewardbg2 = BaseBitmap.create("birdbridge_numbg-" + code);
        rewardbg2.setPosition(rewardbg1.x + rewardbg1.width / 2 - rewardbg2.width / 2, rewardbg1.y + rewardbg1.height);
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
    BirdBridgeRewardNode.prototype.setShowType = function (type) {
        if (type == this._showtype) {
            return;
        }
        this._showtype = type;
        if (this._clip) {
            this._clip.dispose();
            this._clip = null;
        }
        //85 63
        if (type == 2) {
            var clip = ComponentManager.getCustomMovieClip("birdbridge_effect_crane", 15, 80);
            clip.setPosition(-24, -24);
            clip.playWithTime(0);
            clip.blendMode = egret.BlendMode.ADD;
            this.addChild(clip);
            this._clip = clip;
        }
        else if (type == 3) {
            this._bg.texture = ResourceManager.getRes("birdbridge_crane3-" + this._code);
        }
    };
    BirdBridgeRewardNode.prototype.dispose = function () {
        this._cfg = null;
        this._code = null;
        this._bg = null;
        this._clip = null;
        this._showtype = 1;
        _super.prototype.dispose.call(this);
    };
    return BirdBridgeRewardNode;
}(BaseDisplayObjectContainer));
//# sourceMappingURL=BirdBridgeRewardNode.js.map