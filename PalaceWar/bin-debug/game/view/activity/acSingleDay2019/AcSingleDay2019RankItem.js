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
 * author : qianjun
 * desc : 排行榜
 */
var AcSingleDay2019RankItem = (function (_super) {
    __extends(AcSingleDay2019RankItem, _super);
    function AcSingleDay2019RankItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcSingleDay2019RankItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019RankItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019RankItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019RankItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_SINGLEDAY2019;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019RankItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDay2019RankItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcSingleDay2019RankItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 627;
        view.height = 237;
        //创建ui
        //背景图片
        var code = view.getUiCode();
        var bg = BaseBitmap.create("newsingledaytab2bottombg-" + code);
        this.addChild(bg);
        //消费红色标头   改变领取状态的时候需要更改这个图片
        var detailBgImg = BaseBitmap.create("acmidautumnview_titlebg");
        detailBgImg.width = 607;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, detailBgImg, bg, [0, 5]);
        this.addChild(detailBgImg);
        var line = BaseBitmap.create("public_line3");
        view.addChild(line);
        var rankstr = "";
        if (Number(index) < 3) {
            rankstr = LanguageManager.getlocal("acRank_rank6", [String(index + 1)]);
        }
        else {
            if (data.minRank < data.maxRank) {
                rankstr = LanguageManager.getlocal("acRank_rank4", [String(data.minRank), String(data.maxRank)]);
            }
            else {
                rankstr = LanguageManager.getlocal("acRank_rank6", [data.minRank.toString()]);
            }
        }
        var roundTxt = ComponentManager.getTextField(rankstr, 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        line.width = 550;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, detailBgImg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, roundTxt, line);
        view.addChild(roundTxt);
        var str = data.getReward;
        var rewardArr = GameData.formatRewardItem(str);
        var row = Math.ceil(rewardArr.length / 5); //行数
        var len = Math.min(5, rewardArr.length);
        var scroStartY = rewardArr.length > 5 ? 55 : 80;
        var tmpX = (view.width - len * 108 - (len - 1) * 7) / 2;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 7);
            if (tmpX > bg.width - 8) {
                tmpX = (view.width - len * 108 - (len - 1) * 7) / 2;
                scroStartY += (iconItem.height * iconItem.scaleX) + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * iconItem.scaleX + 7);
            }
            this.addChild(iconItem);
        }
        scroStartY += 135;
        bg.height = scroStartY;
        this.height = bg.height;
    };
    AcSingleDay2019RankItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcSingleDay2019RankItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcSingleDay2019RankItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcSingleDay2019RankItem;
}(ScrollListItem));
__reflect(AcSingleDay2019RankItem.prototype, "AcSingleDay2019RankItem");
//# sourceMappingURL=AcSingleDay2019RankItem.js.map