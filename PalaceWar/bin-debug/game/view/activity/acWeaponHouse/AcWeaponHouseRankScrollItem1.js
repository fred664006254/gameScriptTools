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
 * 排行榜奖励item
 * @author yangtao
 */
var AcWeaponHouseRankScrollItem1 = (function (_super) {
    __extends(AcWeaponHouseRankScrollItem1, _super);
    function AcWeaponHouseRankScrollItem1() {
        var _this = _super.call(this) || this;
        _this.itemParam = null;
        return _this;
    }
    Object.defineProperty(AcWeaponHouseRankScrollItem1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseRankScrollItem1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseRankScrollItem1.prototype, "aid", {
        get: function () {
            return this.itemParam.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseRankScrollItem1.prototype, "code", {
        get: function () {
            return this.itemParam.code;
        },
        enumerable: true,
        configurable: true
    });
    AcWeaponHouseRankScrollItem1.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcWeaponHouseRankScrollItem1.prototype.initItem = function (index, data, itemParam) {
        this.itemParam = itemParam;
        this.width = 530;
        //item bg
        var bg = BaseBitmap.create("public_popupscrollitembg");
        bg.x = this.width / 2 - bg.width / 2;
        this.addChild(bg);
        var titleBgImg = "ackite_ranktitlebg4-1";
        if (index < 3) {
            titleBgImg = "ackite_ranktitlebg" + (index + 1) + "-1";
        }
        //title bg
        var titleBg = BaseBitmap.create(titleBgImg);
        this.addChild(titleBg);
        titleBg.x = bg.x + bg.width / 2 - titleBg.width / 2;
        bg.y = titleBg.y;
        if (index < 3) {
            bg.y = titleBg.y + 22;
        }
        //title txt
        var titleTxtStr = "";
        if (index < 3) {
            titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeDetailRank" + (index + 1), this.getTypeCode()));
        }
        else {
            titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeDetailRank4", this.getTypeCode()), ["" + data.downLimit, "" + data.upLimit]);
        }
        var titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BROWN);
        titleTxt.x = this.width / 2 - titleTxt.width / 2;
        titleTxt.y = titleBg.y + 5;
        if (index < 3) {
            titleTxt.y = titleBg.y + 27;
        }
        this.addChild(titleTxt);
        var rewardIconList = GameData.getRewardItemIcons(data.getReward, true, true);
        var scale = 0.8;
        var itemHeight = 108;
        var itemWidth = 108;
        var spaceX = 10;
        var spaceY = 10;
        var stX = bg.x + (bg.width - (itemWidth * scale + spaceX) * 5 + spaceX) / 2;
        var stY = bg.y + 60;
        var offHeight = 20;
        if (index < 3) {
            offHeight = 0;
        }
        var rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = bg.width - 20;
        rewardBg.x = bg.x + bg.width / 2 - rewardBg.width / 2;
        rewardBg.y = stY - 10;
        this.addChild(rewardBg);
        for (var i = 0; i < rewardIconList.length; i++) {
            var rewardDB = rewardIconList[i];
            rewardDB.setScale(scale);
            rewardDB.setPosition(stX + ((rewardDB.width * scale + spaceX) * (i % 5)), stY + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
            this.addChild(rewardDB);
        }
        var bgHeight = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + stY + offHeight + 10;
        if (bgHeight > bg.height) {
            bg.height = bgHeight;
        }
        rewardBg.height = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + 20;
        this.height = bg.y + bg.height + this.getSpaceY();
    };
    AcWeaponHouseRankScrollItem1.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcWeaponHouseRankScrollItem1.prototype.getSpaceY = function () {
        return 5;
    };
    AcWeaponHouseRankScrollItem1.prototype.dispose = function () {
        this.itemParam = null;
        _super.prototype.dispose.call(this);
    };
    return AcWeaponHouseRankScrollItem1;
}(ScrollListItem));
__reflect(AcWeaponHouseRankScrollItem1.prototype, "AcWeaponHouseRankScrollItem1");
//# sourceMappingURL=AcWeaponHouseRankScrollItem1.js.map