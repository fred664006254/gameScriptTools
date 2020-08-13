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
 * desc : 兔宝活动 个人排行
 */
var AcRabbitComingPRankItem = (function (_super) {
    __extends(AcRabbitComingPRankItem, _super);
    function AcRabbitComingPRankItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcRabbitComingPRankItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingPRankItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingPRankItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingPRankItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_RABBITCOMING;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingPRankItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcRabbitComingPRankItem.prototype.getUiCode = function () {
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
    AcRabbitComingPRankItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 530;
        view.height = 210;
        //创建ui
        //背景图片
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = view.width;
        bg.height = view.height - 10;
        view.addChild(bg);
        //消费红色标头   改变领取状态的时候需要更改这个图片
        var topbg = BaseBitmap.create("rabitcomingranktitle");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg, [0, 7]);
        view.addChild(topbg);
        var titleStr = null;
        if (data.rank[0] != data.rank[1]) {
            titleStr = LanguageManager.getlocal("acSingleDayBuild1ViewTab4ItemTile2", [data.rank[0].toString(), data.rank[1].toString()]);
        }
        else {
            titleStr = LanguageManager.getlocal("acSingleDayBuild1ViewTab4ItemTile1", [data.rank[0].toString()]);
            topbg.setRes("rabitcomingranktitle" + data.rank[0]);
        }
        var Txt1 = ComponentManager.getTextField(titleStr, 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, Txt1, topbg);
        view.addChild(Txt1);
        var str = data.getReward;
        var rewardArr = GameData.formatRewardItem(str);
        var scroStartY = 50;
        var len = Math.min(5, rewardArr.length);
        var tmpX = (view.width - len * 108 * 0.8 - (len - 1) * 7) / 2;
        for (var index_1 = 0; index_1 < rewardArr.length; index_1++) {
            var iconItem = GameData.getItemIcon(rewardArr[index_1], true, true);
            iconItem.setScale(0.8);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 7);
            if (tmpX > bg.width - 8) {
                tmpX = (view.width - len * 108 * 0.8 - (len - 1) * 7) / 2;
                scroStartY += (iconItem.height * iconItem.scaleX) + 8;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * iconItem.scaleX + 7);
            }
            this.addChild(iconItem);
        }
        scroStartY += (108 * 0.8 + 22);
        bg.height = scroStartY;
        view.height = bg.height;
    };
    AcRabbitComingPRankItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcRabbitComingPRankItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcRabbitComingPRankItem.prototype.dispose = function () {
        // this._lastReqIdx = null;
        _super.prototype.dispose.call(this);
    };
    return AcRabbitComingPRankItem;
}(ScrollListItem));
__reflect(AcRabbitComingPRankItem.prototype, "AcRabbitComingPRankItem");
//# sourceMappingURL=AcRabbitComingPRankItem.js.map