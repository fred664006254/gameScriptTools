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
 * desc : 兔宝活动 帮会排行
 */
var AcRabbitComingARankItem = (function (_super) {
    __extends(AcRabbitComingARankItem, _super);
    function AcRabbitComingARankItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcRabbitComingARankItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingARankItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingARankItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingARankItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_RABBITCOMING;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingARankItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcRabbitComingARankItem.prototype.getUiCode = function () {
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
    AcRabbitComingARankItem.prototype.initItem = function (index, data, itemparam) {
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
        var allianceboss = ComponentManager.getTextField(LanguageManager.getlocal("acRank_alliance_masterget1"), 22, TextFieldConst.COLOR_BROWN);
        view.addChild(allianceboss);
        var str = data.getReward1;
        var rewardArr = GameData.formatRewardItem(str);
        var bossgroup = new BaseDisplayObjectContainer();
        bossgroup.width = 400;
        bossgroup.height = Math.ceil(rewardArr.length / 4) * 87 + (Math.ceil(rewardArr.length / 4) - 1) * 8;
        view.addChild(bossgroup);
        var scroStartY = 0;
        var tmpX = 0;
        for (var index_1 = 0; index_1 < rewardArr.length; index_1++) {
            var iconItem = GameData.getItemIcon(rewardArr[index_1], true, true);
            iconItem.width = iconItem.height = 108;
            iconItem.setScale(0.8);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 7);
            if (tmpX > bossgroup.width - 8) {
                tmpX = 0;
                scroStartY += (iconItem.height * iconItem.scaleX) + 8;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * iconItem.scaleX + 7);
            }
            bossgroup.addChild(iconItem);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, bossgroup, bg, [0, 45]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, allianceboss, bossgroup, [-allianceboss.width - 15, 0]);
        var lineImg = BaseBitmap.create("public_line1");
        lineImg.width = 500;
        lineImg.height = 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, lineImg, bg, [0, bossgroup.y + bossgroup.height + 7]);
        view.addChild(lineImg);
        var memberTxt = ComponentManager.getTextField(LanguageManager.getlocal("acRank_alliance_memberget"), 22, TextFieldConst.COLOR_BROWN);
        view.addChild(memberTxt);
        var str2 = data.getReward2;
        var rewardArr2 = GameData.formatRewardItem(str2);
        var memgroup = new BaseDisplayObjectContainer();
        memgroup.width = 400;
        memgroup.height = Math.ceil(rewardArr.length / 4) * 87 + (Math.ceil(rewardArr.length / 4) - 1) * 8;
        view.addChild(memgroup);
        var scroStartY2 = 0;
        var tmpX2 = 0;
        for (var index_2 = 0; index_2 < rewardArr2.length; index_2++) {
            var iconItem = GameData.getItemIcon(rewardArr2[index_2], true, true);
            iconItem.width = iconItem.height = 108;
            iconItem.setScale(0.8);
            iconItem.x = tmpX2;
            iconItem.y = scroStartY2;
            tmpX2 += (iconItem.width * iconItem.scaleX + 7);
            if (tmpX2 > memgroup.width - 8) {
                tmpX2 = 0;
                scroStartY2 += (iconItem.height * iconItem.scaleX) + 8;
                iconItem.x = tmpX2;
                iconItem.y = scroStartY2;
                tmpX2 += (iconItem.width * iconItem.scaleX + 7);
            }
            memgroup.addChild(iconItem);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, memgroup, bg, [0, lineImg.y + lineImg.height + 7]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, memberTxt, memgroup, [-allianceboss.width - 15, 0]);
        bg.height = memgroup.y + memgroup.height + 20;
        view.height = bg.height;
    };
    AcRabbitComingARankItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcRabbitComingARankItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcRabbitComingARankItem.prototype.dispose = function () {
        // this._lastReqIdx = null;
        _super.prototype.dispose.call(this);
    };
    return AcRabbitComingARankItem;
}(ScrollListItem));
__reflect(AcRabbitComingARankItem.prototype, "AcRabbitComingARankItem");
//# sourceMappingURL=AcRabbitComingARankItem.js.map