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
 * 冲榜列表节点
 * author yanyuling
 * date 2017/11/06
 * @class AcCrossServerHegemonyRankListScrollItem
 */
var AcCrossServerHegemonyRankListScrollItem = (function (_super) {
    __extends(AcCrossServerHegemonyRankListScrollItem, _super);
    function AcCrossServerHegemonyRankListScrollItem() {
        var _this = _super.call(this) || this;
        _this._aid = "";
        _this._code = "";
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonyRankListScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyRankListScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyRankListScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this.width = 520;
        // if(index != 0)
        // {
        //     let bg = BaseBitmap.create("public_line1");
        //     bg.width = 500;
        //     // bg.height = 40;
        //     bg.x = this.width/2 - bg.width/2;  
        //     bg.y = -bg.height/2;
        //     this.addChild(bg); 
        //  }
        this.height = 62;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        this._nodeContainer.x = 0;
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data.uid) {
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }
        else {
            if (data.aid == Api.playerVoApi.getPlayerAllianceId()) {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }
        // if(index >0 && String(data.endflag) == "1"){
        //     tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        // }
        var startY = 16;
        if (index > 2) {
            var guang = BaseBitmap.create("rankbgs_4");
            guang.width = 516;
            guang.height = 62;
            guang.x = this.width / 2 - guang.width / 2;
            this._nodeContainer.addChild(guang);
            var titleTxt1 = ComponentManager.getTextField("", 20, tarColor);
            titleTxt1.text = String(index + 1);
            titleTxt1.x = 40 - titleTxt1.width / 2;
            titleTxt1.y = startY + 4;
            this._nodeContainer.addChild(titleTxt1);
        }
        else {
            var guang = BaseBitmap.create("rankbgs_" + (index + 1));
            guang.width = 516;
            guang.height = 62;
            guang.x = this.width / 2 - guang.width / 2;
            this._nodeContainer.addChild(guang);
            var rankImg = BaseLoadBitmap.create("rankinglist_rankn" + String(index + 1));
            // rankImg.width = 51;
            // rankImg.height = 47;
            rankImg.x = rankImg.width / 2 + 5;
            rankImg.y = 7;
            this._nodeContainer.addChild(rankImg);
        }
        var titleTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        titleTxt2.text = data.name;
        titleTxt2.x = 145 - titleTxt2.width / 2;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        titleTxt3.text = Api.mergeServerVoApi.getAfterMergeSeverName(null, false, Number(data.zid));
        titleTxt3.x = 250 - titleTxt3.width / 2 + 15;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);
        var titleTxt4 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        titleTxt4.text = String(Number(data.score) * this.cfg.flagScoreNum);
        titleTxt4.x = 360 - titleTxt4.width / 2;
        titleTxt4.y = startY;
        this._nodeContainer.addChild(titleTxt4);
        var titleTxt5 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        titleTxt5.text = data.win;
        titleTxt5.x = 470 - titleTxt5.width / 2;
        titleTxt5.y = startY;
        this._nodeContainer.addChild(titleTxt5);
    };
    AcCrossServerHegemonyRankListScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcCrossServerHegemonyRankListScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcCrossServerHegemonyRankListScrollItem.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyRankListScrollItem;
}(ScrollListItem));
__reflect(AcCrossServerHegemonyRankListScrollItem.prototype, "AcCrossServerHegemonyRankListScrollItem");
//# sourceMappingURL=AcCrossServerHegemonyRankListScrollItem.js.map