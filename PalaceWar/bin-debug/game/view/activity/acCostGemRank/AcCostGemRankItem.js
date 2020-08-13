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
var AcCostGemRankItem = (function (_super) {
    __extends(AcCostGemRankItem, _super);
    function AcCostGemRankItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcCostGemRankItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCostGemRankItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCostGemRankItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCostGemRankItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_COSTGEMRANK;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCostGemRankItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcCostGemRankItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcCostGemRankItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 627;
        view.height = 237;
        //创建ui
        //背景图片
        var code = view.getUiCode();
        var bgName = ResourceManager.hasRes("costgemrank_rewarditembg-" + code) ? "costgemrank_rewarditembg-" + code : "newsingledaytab2bottombg-1";
        var bg = BaseBitmap.create(bgName);
        this.addChild(bg);
        bg.x = view.width / 2 - bg.width / 2;
        //消费红色标头   改变领取状态的时候需要更改这个图片
        var detailbgName = ResourceManager.hasRes("costgemrank__taskItemtitlebg-" + code) ? "costgemrank__taskItemtitlebg-" + code : "acmidautumnview_titlebg";
        var detailBgImg = BaseBitmap.create(detailbgName);
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
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
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
    AcCostGemRankItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcCostGemRankItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcCostGemRankItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCostGemRankItem;
}(ScrollListItem));
__reflect(AcCostGemRankItem.prototype, "AcCostGemRankItem");
//# sourceMappingURL=AcCostGemRankItem.js.map