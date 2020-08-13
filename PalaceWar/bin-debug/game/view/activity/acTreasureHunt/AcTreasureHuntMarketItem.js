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
 * 集市奖励item
 * author qianjun
 */
var AcTreasureHuntMarketItem = (function (_super) {
    __extends(AcTreasureHuntMarketItem, _super);
    function AcTreasureHuntMarketItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcTreasureHuntMarketItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntMarketItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntMarketItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntMarketItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_TREASUREHUNT;
        },
        enumerable: true,
        configurable: true
    });
    AcTreasureHuntMarketItem.prototype.initItem = function (index, data, itemParam) {
        var view = this;
        view.width = 544;
        view.height = 222;
        view._code = itemParam;
        var bg = BaseBitmap.create("treasurenpcbg-" + view.code);
        bg.width = view.width;
        bg.height = view.height;
        view.addChild(bg);
        var npc = BaseLoadBitmap.create(data.npcId);
        if (data.npcId.indexOf("wife") > -1) {
            npc.setScale(460 / 640 * 0.45);
            npc.x = 30;
        }
        else {
            npc.setScale(0.45);
            npc.x = 50;
        }
        npc.y = 10;
        view.addChild(npc);
        //["npcID"]="story_npc_8",
        //["specificPool"]={{"6_1201_1",2},{"6_1202_1",2},{"6_1203_1",2},{"6_1204_1",1},{"6_1205_1",1},{"6_1411_1",1}},
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTreasureMarketTip-" + view.code), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, bg, [245 + (285 - tipTxt.textWidth) / 2, 55]);
        var row = Math.min(Math.ceil(data.specificPool.length / 3), 4);
        var tmpX = 245 + (285 - Math.min(data.specificPool.length, 3) * 108 * 0.7 - (Math.min(data.specificPool.length, 3) - 1) * 8) / 2;
        for (var i in data.specificPool) {
            var reward = data.specificPool[i];
            var rIcon = GameData.getRewardItemIcons(reward[0], true, false);
            var icon = rIcon[0];
            var idx = Number(i);
            icon.setScale(0.7);
            icon.x = tmpX + (idx % 3) * (108 * 0.7 + 8);
            icon.y = tipTxt.y + tipTxt.textHeight + 15;
            view.addChild(icon);
        }
    };
    AcTreasureHuntMarketItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcTreasureHuntMarketItem.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcTreasureHuntMarketItem;
}(ScrollListItem));
__reflect(AcTreasureHuntMarketItem.prototype, "AcTreasureHuntMarketItem");
//# sourceMappingURL=AcTreasureHuntMarketItem.js.map