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
var AcCrossRankItem = /** @class */ (function (_super) {
    __extends(AcCrossRankItem, _super);
    function AcCrossRankItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcCrossRankItem.prototype, "Vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.data.aid, this.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossRankItem.prototype, "localColor", {
        get: function () {
            return this.data.uid == Api.playerVoApi.getPlayerID() ? 0xfbd13d : 0x3e1f0f;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossRankItem.prototype.initItem = function (index, data, param) {
        this.data = data;
        this.width = 498;
        this.height = 78;
        var _bgName = "rankbgs_" + (this.data.rank <= 3 ? this.data.rank : 4);
        var _bg = BaseLoadBitmap.create(_bgName);
        _bg.width = this.width;
        _bg.height = this.height;
        this.addChild(_bg);
        if (this.data.rank <= 3) {
            var _rankIcon = BaseLoadBitmap.create("rankinglist_rankn" + this.data.rank);
            this.addChild(_rankIcon);
            _rankIcon.anchorOffsetX = 74 / 2;
            _rankIcon.anchorOffsetY = 42 / 2;
            _rankIcon.setPosition(52, this.height / 2);
        }
        else {
            var _rankIcon = ComponentManager.getTextField("" + this.data.rank, 20, this.localColor);
            _rankIcon.width = 104;
            _rankIcon.textAlign = TextFieldConst.ALIGH_CENTER;
            this.addChild(_rankIcon);
            _rankIcon.setPosition(0, 29);
        }
        var _nickLabel = ComponentManager.getTextField("" + this.data.nick, 20, this.localColor);
        _nickLabel.width = 154;
        _nickLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(_nickLabel);
        _nickLabel.setPosition(104, 29);
        var _zidLabel = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText20", ["" + this.data.zid]), 20, this.localColor);
        _zidLabel.width = 80;
        _zidLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(_zidLabel);
        _zidLabel.setPosition(104 + 154, 29);
        var _scoreLabel = ComponentManager.getTextField("" + this.data.score, 20, this.localColor);
        _scoreLabel.width = 160;
        _scoreLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(_scoreLabel);
        _scoreLabel.setPosition(104 + 154 + 80, 29);
    };
    AcCrossRankItem.prototype.dispose = function () {
        this.data = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossRankItem;
}(ScrollListItem));
//# sourceMappingURL=AcCrossRankItem.js.map