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
var AcWeaponHouseRankScrollItem2 = (function (_super) {
    __extends(AcWeaponHouseRankScrollItem2, _super);
    function AcWeaponHouseRankScrollItem2() {
        var _this = _super.call(this) || this;
        _this.itemParam = null;
        return _this;
    }
    Object.defineProperty(AcWeaponHouseRankScrollItem2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseRankScrollItem2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseRankScrollItem2.prototype, "aid", {
        get: function () {
            return this.itemParam.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHouseRankScrollItem2.prototype, "code", {
        get: function () {
            return this.itemParam.code;
        },
        enumerable: true,
        configurable: true
    });
    AcWeaponHouseRankScrollItem2.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcWeaponHouseRankScrollItem2.prototype.initItem = function (index, data, itemParam) {
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
        //帮主获得
        var rewardIconList = GameData.getRewardItemIcons(data.getReward1, true, true);
        var scale = 0.75;
        var itemHeight = 108;
        var itemWidth = 108;
        var spaceX = 10;
        var spaceY = 10;
        var gangtitleTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rankGang_title", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this.addChild(gangtitleTxt);
        gangtitleTxt.x = bg.x + (bg.width - (itemWidth * scale + spaceX) * 5 + spaceX) - 40;
        gangtitleTxt.y = bg.y + 104;
        var stX = bg.x + (bg.width - (itemWidth * scale + spaceX) * 5 + spaceX) / 2 + gangtitleTxt.height - 30;
        var stY = bg.y + 60;
        var offHeight = 20;
        var offy = 20;
        if (index < 3) {
            offHeight = 0;
        }
        var rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = bg.width - 20;
        rewardBg.x = bg.x + bg.width / 2 - rewardBg.width / 2;
        rewardBg.y = stY - 10;
        for (var i = 0; i < rewardIconList.length; i++) {
            var rewardDB = rewardIconList[i];
            rewardDB.setScale(scale);
            rewardDB.setPosition(stX + 100 + ((rewardDB.width * scale + spaceX) * (i % 5)), stY + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
            this.addChild(rewardDB);
        }
        rewardBg.height = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + 20;
        //帮众获得
        var rewardIcononeList = GameData.getRewardItemIcons(data.getReward2, true, true);
        var gangonetitleTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rankOne_title", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this.addChild(gangonetitleTxt);
        gangonetitleTxt.x = bg.x + (bg.width - (itemWidth * scale + spaceX) * 5 + spaceX) - 40;
        gangonetitleTxt.y = bg.y + 104 + itemHeight;
        for (var i = 0; i < rewardIcononeList.length; i++) {
            var rewardDB1 = rewardIcononeList[i];
            rewardDB1.setScale(scale);
            rewardDB1.setPosition(stX + 100 + ((rewardDB1.width * scale + spaceX) * (i % 5)), stY + itemHeight + ((rewardDB1.height * scale + spaceY) * Math.floor(i / 5)));
            this.addChild(rewardDB1);
        }
        var bgHeight = ((rewardIconList.length + rewardIcononeList.length) % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + stY + offHeight + 10 + itemHeight + 20;
        if (bgHeight > bg.height) {
            bg.height = bgHeight;
        }
        this.height = bg.y + bg.height + this.getSpaceY();
    };
    AcWeaponHouseRankScrollItem2.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcWeaponHouseRankScrollItem2.prototype.getSpaceY = function () {
        return 5;
    };
    AcWeaponHouseRankScrollItem2.prototype.dispose = function () {
        this.itemParam = null;
        _super.prototype.dispose.call(this);
    };
    return AcWeaponHouseRankScrollItem2;
}(ScrollListItem));
__reflect(AcWeaponHouseRankScrollItem2.prototype, "AcWeaponHouseRankScrollItem2");
//# sourceMappingURL=AcWeaponHouseRankScrollItem2.js.map