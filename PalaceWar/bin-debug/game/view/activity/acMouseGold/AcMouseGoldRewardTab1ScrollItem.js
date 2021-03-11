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
var AcMouseGoldRewardTab1ScrollItem = /** @class */ (function (_super) {
    __extends(AcMouseGoldRewardTab1ScrollItem, _super);
    function AcMouseGoldRewardTab1ScrollItem() {
        var _this = _super.call(this) || this;
        _this.itemParam = null;
        return _this;
    }
    Object.defineProperty(AcMouseGoldRewardTab1ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseGoldRewardTab1ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseGoldRewardTab1ScrollItem.prototype, "aid", {
        get: function () {
            return this.itemParam.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseGoldRewardTab1ScrollItem.prototype, "code", {
        get: function () {
            return this.itemParam.code;
        },
        enumerable: true,
        configurable: true
    });
    AcMouseGoldRewardTab1ScrollItem.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcMouseGoldRewardTab1ScrollItem.prototype.initItem = function (index, data, itemParam) {
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
            titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acSkyArmorDetailRank" + (index + 1), this.getTypeCode()));
        }
        else {
            titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acSkyArmorDetailRank4", this.getTypeCode()), ["" + data.minRank, "" + data.maxRank]);
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
        // if (index == 0){
        //     stY = 220;
        // }
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
    AcMouseGoldRewardTab1ScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcMouseGoldRewardTab1ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcMouseGoldRewardTab1ScrollItem.prototype.dispose = function () {
        this.itemParam = null;
        _super.prototype.dispose.call(this);
    };
    return AcMouseGoldRewardTab1ScrollItem;
}(ScrollListItem));
//# sourceMappingURL=AcMouseGoldRewardTab1ScrollItem.js.map