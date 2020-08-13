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
var AcCrossRankRewItem = /** @class */ (function (_super) {
    __extends(AcCrossRankRewItem, _super);
    function AcCrossRankRewItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcCrossRankRewItem.prototype, "Vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.data.aid, this.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossRankRewItem.prototype.initItem = function (index, data, param) {
        this.data = data;
        this.width = 510;
        var l = this.data.rewards.split("|").length;
        this.height = Math.floor((l - 1) / 5) * 95 + 185;
        var _bg = BaseLoadBitmap.create("public_popupscrollitembg");
        this.addChild(_bg);
        _bg.height = this.height - 25;
        _bg.y = 25;
        var _icons = GameData.getRewardItemIcons(this.data.rewards, true, true);
        for (var i = 0; i < _icons.length; i++) {
            var _icon = _icons[i];
            this.addChild(_icon);
            _icon.setPosition(i % 5 * 92 + 30, Math.floor(i / 5) * 95 + 72);
            _icon.setScale(84 / _icon.width);
        }
        this.initTitle();
    };
    AcCrossRankRewItem.prototype.initTitle = function () {
        var rankBgName = "ackite_ranktitlebg" + (this.data.rank[0] <= 3 ? this.data.rank[0] : 4) + "-1";
        var rankBg = BaseLoadBitmap.create(rankBgName);
        var rankText = "";
        this.addChild(rankBg);
        if (this.data.rank[0] <= 3) {
            rankBg.width = 502;
            rankBg.setPosition((this.width - 502) / 2, 0);
            rankText = "" + this.data.rank[0];
        }
        else {
            rankBg.width = 222;
            rankBg.setPosition((this.width - 222) / 2, 20);
            rankText = this.data.rank[0] + "-" + this.data.rank[1];
        }
        var rankLabel = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText7", [rankText]), 22, 0x3e1f0f);
        this.addChild(rankLabel);
        rankLabel.width = this.width;
        rankLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        rankLabel.setPosition(0, 30);
    };
    AcCrossRankRewItem.prototype.dispose = function () {
        this.data = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossRankRewItem;
}(ScrollListItem));
//# sourceMappingURL=AcCrossRankRewItem.js.map