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
 * 奖池item
 * @author ycg
 */
var AcMouseComeDetailScrollItem3 = (function (_super) {
    __extends(AcMouseComeDetailScrollItem3, _super);
    function AcMouseComeDetailScrollItem3() {
        var _this = _super.call(this) || this;
        _this._aid = null;
        _this._code = null;
        return _this;
    }
    Object.defineProperty(AcMouseComeDetailScrollItem3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseComeDetailScrollItem3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseComeDetailScrollItem3.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseComeDetailScrollItem3.prototype, "aid", {
        get: function () {
            return this._aid;
        },
        enumerable: true,
        configurable: true
    });
    AcMouseComeDetailScrollItem3.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcMouseComeDetailScrollItem3.prototype.initItem = function (index, data, itemParam) {
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this.width = 530;
        var rewardStx = 0;
        var rewardW = 0;
        if (data.type == 1) {
            //item bg
            var bg = BaseBitmap.create("accshegemony_ranklistbg" + data.id);
            bg.width = this.width - 14;
            bg.height = 190;
            bg.x = this.width / 2 - bg.width / 2;
            this.addChild(bg);
            var titleBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_poolitemtitle" + data.id, this.getTypeCode()));
            this.addChild(titleBg);
            titleBg.width = 260;
            titleBg.x = bg.x;
            titleBg.y = bg.y + 7;
            //title txt
            var titleTxtStr = data.id + "." + LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeDetailPoolItemName" + data.id, this.getTypeCode()));
            var titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            titleTxt.x = titleBg.x + 10;
            titleTxt.y = titleBg.y + titleBg.height / 2 - titleTxt.height / 2;
            this.addChild(titleTxt);
            var lightCon = this.getLigthByType(data.id);
            this.addChild(lightCon);
            if (data.id == 1) {
                lightCon.x = bg.x + 35;
                lightCon.y = titleBg.y + titleBg.height + 55;
            }
            else if (data.id == 2) {
                lightCon.x = bg.x + 80;
                lightCon.y = titleBg.y + titleBg.height + 10;
            }
            else if (data.id == 3) {
                lightCon.x = bg.x + 35;
                lightCon.y = titleBg.y + titleBg.height + 10;
            }
            var arrow = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_rewardarrow", this.getTypeCode()));
            arrow.setPosition(bg.x + bg.width / 2 - arrow.width / 2 - 45, bg.y + bg.height / 2 - arrow.height / 2 + 12);
            this.addChild(arrow);
            var rewardIconList = GameData.getRewardItemIcons(data.getReward, true, true);
            var scale = 0.7;
            var spaceX = 10;
            var spaceY = 10;
            for (var i = 0; i < rewardIconList.length; i++) {
                var rewardDB = rewardIconList[i];
                rewardDB.setScale(scale);
                rewardDB.setPosition(bg.x + bg.width / 2 - 10 + (rewardDB.width * scale + spaceX) * i, titleBg.y + titleBg.height + 40);
                this.addChild(rewardDB);
            }
            this.height = bg.height + this.getSpaceY();
        }
        else {
            var titleBg = BaseBitmap.create("public_textbrownbg");
            this.addChild(titleBg);
            titleBg.x = this.width / 2 - titleBg.width / 2;
            //title txt
            var titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeDetailPoolItemName" + data.id, this.getTypeCode()));
            var titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            titleTxt.x = titleBg.x + titleBg.width / 2 - titleTxt.width / 2;
            titleTxt.y = titleBg.y + titleBg.height / 2 - titleTxt.height / 2;
            this.addChild(titleTxt);
            var rewardIconList = GameData.getRewardItemIcons(data.getReward, true, true);
            var scale = 0.8;
            var itemHeight = 108;
            var itemWidth = 108;
            var spaceX = 15;
            var spaceY = 15;
            var stX = 10 + (this.width - 20 - (itemWidth * scale + spaceX) * 5 + spaceX) / 2;
            var stY = titleBg.y + titleBg.height + 15;
            var offHeight = 10;
            for (var i = 0; i < rewardIconList.length; i++) {
                var rewardDB = rewardIconList[i];
                rewardDB.setScale(scale);
                rewardDB.setPosition(stX + ((rewardDB.width * scale + spaceX) * (i % 5)), stY + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
                this.addChild(rewardDB);
            }
            var bgHeight = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + stY + offHeight;
            this.height = bgHeight + this.getSpaceY();
        }
    };
    AcMouseComeDetailScrollItem3.prototype.getLigthByType = function (id) {
        var container = new BaseDisplayObjectContainer();
        for (var i = 0; i < 3; i++) {
            var light = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_light", this.getTypeCode()));
            light.setScale(0.35);
            container.addChild(light);
            if (id == 1) {
                light.x = (light.width * light.scaleX + 10) * i;
            }
            else if (id == 2) {
                light.y = (light.width * light.scaleY + 10) * i;
            }
            else if (id == 3) {
                light.x = (light.width * light.scaleX + 10) * i;
                light.y = (light.width * light.scaleY + 10) * i;
            }
        }
        return container;
    };
    AcMouseComeDetailScrollItem3.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcMouseComeDetailScrollItem3.prototype.getSpaceY = function () {
        return 5;
    };
    AcMouseComeDetailScrollItem3.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        _super.prototype.dispose.call(this);
    };
    return AcMouseComeDetailScrollItem3;
}(ScrollListItem));
__reflect(AcMouseComeDetailScrollItem3.prototype, "AcMouseComeDetailScrollItem3");
//# sourceMappingURL=AcMouseComeDetailScrollItem3.js.map