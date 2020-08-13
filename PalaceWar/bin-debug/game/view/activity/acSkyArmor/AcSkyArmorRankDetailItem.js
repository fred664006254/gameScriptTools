/**
 * 天魔铠甲排行item
 * author wxz
 * date 2020.6.29
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
var AcSkyArmorRankDetailItem = /** @class */ (function (_super) {
    __extends(AcSkyArmorRankDetailItem, _super);
    function AcSkyArmorRankDetailItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._itemParam = null;
        return _this;
    }
    AcSkyArmorRankDetailItem.prototype.initItem = function (index, data, itemParam) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        this._data = data;
        this._itemParam = itemParam;
        this.width = 520;
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data.uid) {
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }
        var offHeight = 0;
        if (index > 2) {
            var rankbg = BaseBitmap.create("rankbgs_4");
            rankbg.width = 500;
            rankbg.height = 62;
            rankbg.x = this.width / 2 - rankbg.width / 2;
            rankbg.y = 0;
            this.addChild(rankbg);
            offHeight = rankbg.height;
            rankbg.visible = false;
            var rank = ComponentManager.getTextField(String(index + 1), TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            rank.x = 68 - rank.width / 2;
            rank.y = offHeight / 2 - rank.height / 2;
            this.addChild(rank);
        }
        else {
            var rankbg = BaseBitmap.create("rankbgs_" + String(index + 1));
            rankbg.width = 500;
            rankbg.height = 76;
            rankbg.x = this.width / 2 - rankbg.width / 2;
            rankbg.y = 0;
            this.addChild(rankbg);
            offHeight = rankbg.height;
            var rankImg = BaseBitmap.create("rankinglist_rankn" + String(index + 1));
            rankImg.x = 30;
            rankImg.y = 17;
            this.addChild(rankImg);
        }
        var name = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        name.x = 240 - name.width / 2;
        name.y = offHeight / 2 - name.height / 2;
        this.addChild(name);
        var score = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        if (data.value > 0) {
            score.text = App.StringUtil.changeIntToText(data.value, 1);
        }
        else {
            score.text = "0";
        }
        score.x = 440 - score.width / 2;
        score.y = offHeight / 2 - score.height / 2;
        this.addChild(score);
        var lineImg = BaseBitmap.create("rank_line");
        lineImg.width = 510;
        lineImg.height = 2;
        lineImg.x = this.width / 2 - lineImg.width / 2;
        lineImg.y = offHeight - 1;
        this.addChild(lineImg);
    };
    AcSkyArmorRankDetailItem.prototype.userShotCallback = function (event) {
        if (!event.data.ret) {
            return;
        }
        var data = event.data.data.data;
        if (String(data.ruid) == this._data.uid) {
            if (event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT) {
                data["crossZone"] = 1;
                data['zid'] = Api.mergeServerVoApi.getTrueZid();
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        }
    };
    Object.defineProperty(AcSkyArmorRankDetailItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkyArmorRankDetailItem.prototype, "aid", {
        get: function () {
            return this._itemParam.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkyArmorRankDetailItem.prototype, "code", {
        get: function () {
            return this._itemParam.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSkyArmorRankDetailItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcSkyArmorRankDetailItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcSkyArmorRankDetailItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        this._data = null;
        this._itemParam = null;
        _super.prototype.dispose.call(this);
    };
    return AcSkyArmorRankDetailItem;
}(ScrollListItem));
//# sourceMappingURL=AcSkyArmorRankDetailItem.js.map