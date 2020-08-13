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
  * 奖池
  * author ycg
  * date 2020.4.27
  * @class AcWeaponMazeDetailPopupScrollItem3
  */
var AcWeaponMazeDetailPopupScrollItem3 = (function (_super) {
    __extends(AcWeaponMazeDetailPopupScrollItem3, _super);
    function AcWeaponMazeDetailPopupScrollItem3() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aid = null;
        _this._code = null;
        return _this;
    }
    Object.defineProperty(AcWeaponMazeDetailPopupScrollItem3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponMazeDetailPopupScrollItem3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponMazeDetailPopupScrollItem3.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponMazeDetailPopupScrollItem3.prototype, "aid", {
        get: function () {
            return this._aid;
        },
        enumerable: true,
        configurable: true
    });
    AcWeaponMazeDetailPopupScrollItem3.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    /**
     * 初始化itemview
     */
    AcWeaponMazeDetailPopupScrollItem3.prototype.initItem = function (index, data, itemParam) {
        this._itemData = data;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this.width = 530;
        var bg = BaseBitmap.create("public_popupscrollitembg");
        bg.x = this.width / 2 - bg.width / 2;
        this.addChild(bg);
        var leftBg = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_poolbox" + data.type, this.getTypeCode()));
        bg.height = leftBg.height + 30;
        leftBg.x = bg.x + 10;
        leftBg.y = bg.y + bg.height / 2 - leftBg.height / 2;
        this.addChild(leftBg);
        var titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        titleBg.width = bg.width - leftBg.x - leftBg.width - 10;
        titleBg.height = 30;
        this.addChild(titleBg);
        titleBg.x = leftBg.x + leftBg.width + 10;
        titleBg.y = bg.y + 10;
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeDetailPoolItemtitle" + data.type, this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2 + 3);
        this.addChild(titleTF);
        var rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = bg.width - leftBg.x - leftBg.width - 10;
        rewardBg.height = 200;
        rewardBg.x = leftBg.x + leftBg.width + 10;
        rewardBg.y = titleBg.y + titleBg.height + 5;
        this.addChild(rewardBg);
        var rewards = data.rewards;
        var rewardIconList = GameData.getRewardItemIcons(rewards, true, true);
        var scale = 0.8;
        var itemHeight = 108;
        var itemWidth = 108;
        var spaceX = 10;
        var spaceY = 10;
        var stX = rewardBg.x + (rewardBg.width - (itemWidth * scale + spaceX) * 3 + spaceX) / 2;
        var stY = rewardBg.y + 10;
        for (var i = 0; i < rewardIconList.length; i++) {
            var rewardDB = rewardIconList[i];
            rewardDB.setScale(scale);
            rewardDB.setPosition(stX + ((rewardDB.width * scale + spaceX) * (i % 3)), stY + ((rewardDB.height * scale + spaceY) * Math.floor(i / 3)));
            this.addChild(rewardDB);
        }
        this.height = bg.height + this.getSpaceY();
    };
    AcWeaponMazeDetailPopupScrollItem3.prototype.getSpaceY = function () {
        return 5;
    };
    AcWeaponMazeDetailPopupScrollItem3.prototype.dispose = function () {
        this._itemData = null;
        this._aid = null;
        this._code = null;
        _super.prototype.dispose.call(this);
    };
    return AcWeaponMazeDetailPopupScrollItem3;
}(ScrollListItem));
__reflect(AcWeaponMazeDetailPopupScrollItem3.prototype, "AcWeaponMazeDetailPopupScrollItem3");
//# sourceMappingURL=AcWeaponMazeDetailPopupScrollItem3.js.map