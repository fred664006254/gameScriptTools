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
 * 道具详情弹板
 * author dmj
 * date 2017/9/19
 * @class ItemInfoPopupView
 */
var AcSingleDay2019GiftItemsPopupView = (function (_super) {
    __extends(AcSingleDay2019GiftItemsPopupView, _super);
    function AcSingleDay2019GiftItemsPopupView() {
        var _this = _super.call(this) || this;
        _this.itemTxt = null;
        return _this;
    }
    Object.defineProperty(AcSingleDay2019GiftItemsPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019GiftItemsPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019GiftItemsPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019GiftItemsPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019GiftItemsPopupView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDay2019GiftItemsPopupView.prototype.getBgName = function () {
        return "newsingledaytab4gift" + this.param.data.id + "showbg-" + this.getUiCode();
    };
    AcSingleDay2019GiftItemsPopupView.prototype.getUiCode = function () {
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
    AcSingleDay2019GiftItemsPopupView.prototype.getTitleStr = function () {
        return null;
    };
    AcSingleDay2019GiftItemsPopupView.prototype.initView = function () {
        var moveY = 0;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 50;
        this.addChildToContainer(bg);
        var titleStr = LanguageManager.getlocal(this.param.data.titleName);
        var titleTf = ComponentManager.getTextField(titleStr, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
        titleTf.setPosition(this.viewBg.x + this.viewBg.width / 2 - titleTf.width / 2, this.viewBg.y + 14);
        this.addChildToContainer(titleTf);
        var getReward = this.param.data.reward;
        var rewardArr = GameData.formatRewardItem(getReward);
        var scroStartY = bg.y + 15;
        var len = Math.min(4, rewardArr.length);
        var tmpX = (bg.width - len * 108 - (len - 1) * 7) / 2;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true);
            iconItem.x = bg.x + tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 7);
            if (tmpX > bg.width - 8) {
                tmpX = (bg.width - len * 108 - (len - 1) * 7) / 2;
                scroStartY += (iconItem.height * iconItem.scaleX) + 10;
                iconItem.x = bg.x + tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * iconItem.scaleX + 7);
            }
            this.addChildToContainer(iconItem);
        }
        scroStartY += 106;
        bg.height = scroStartY - 35;
        this.viewBg.height = bg.height + 100;
    };
    AcSingleDay2019GiftItemsPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcSingleDay2019GiftItemsPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcSingleDay2019GiftItemsPopupView.prototype.dispose = function () {
        this.itemTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDay2019GiftItemsPopupView;
}(PopupView));
__reflect(AcSingleDay2019GiftItemsPopupView.prototype, "AcSingleDay2019GiftItemsPopupView");
//# sourceMappingURL=AcSingleDay2019GiftItemsPopupView.js.map