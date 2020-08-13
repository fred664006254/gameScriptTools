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
/**
 * 奖池item
 * @author ycg
 */
var AcGoodMatchDetailTab3ScrollItem = /** @class */ (function (_super) {
    __extends(AcGoodMatchDetailTab3ScrollItem, _super);
    function AcGoodMatchDetailTab3ScrollItem() {
        var _this = _super.call(this) || this;
        _this._aid = null;
        _this._code = null;
        return _this;
    }
    Object.defineProperty(AcGoodMatchDetailTab3ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchDetailTab3ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchDetailTab3ScrollItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchDetailTab3ScrollItem.prototype, "aid", {
        get: function () {
            return this._aid;
        },
        enumerable: true,
        configurable: true
    });
    AcGoodMatchDetailTab3ScrollItem.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcGoodMatchDetailTab3ScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this.width = 530;
        //item bg
        var bg = BaseBitmap.create("public_popupscrollitembg");
        bg.x = this.width / 2 - bg.width / 2;
        this.addChild(bg);
        var titleBg = BaseBitmap.create("acgoodmatch_pooltitlebg");
        this.addChild(titleBg);
        titleBg.x = bg.x + 5;
        titleBg.y = 7;
        //title txt
        var titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPoolTitle" + data.id, this.getTypeCode()));
        var titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt.x = titleBg.x + 15;
        titleTxt.y = titleBg.y + titleBg.height / 2 - titleTxt.height / 2;
        this.addChild(titleTxt);
        var rewardIconList = GameData.getRewardItemIcons(data.getRewards, true, true);
        var scale = 0.65;
        var itemHeight = 108;
        var itemWidth = 108;
        var spaceX = 10;
        var spaceY = 10;
        var stX = bg.x + (bg.width - 180 - (itemWidth * scale + spaceX) * 4 + spaceX) / 2 + 14;
        var stY = titleBg.y + titleBg.height + 15;
        var rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = bg.width - 180;
        rewardBg.x = bg.x + 15;
        rewardBg.y = stY - 5;
        this.addChild(rewardBg);
        for (var i = 0; i < rewardIconList.length; i++) {
            var rewardDB = rewardIconList[i];
            rewardDB.setScale(scale);
            rewardDB.setPosition(stX + ((rewardDB.width * scale + spaceX) * (i % 4)), stY + 5 + ((rewardDB.height * scale + spaceY) * Math.floor(i / 4)));
            this.addChild(rewardDB);
        }
        rewardBg.height = (rewardIconList.length % 4 == 0 ? rewardIconList.length / 4 : Math.ceil(rewardIconList.length / 4)) * (itemHeight * scale + spaceY) - spaceY + 20;
        var bgHeight = rewardBg.y + rewardBg.height + 15;
        bg.height = bgHeight;
        var poolId = this.vo.getPoolRewardId();
        if (data.id == poolId) {
            var selectedFlag = BaseBitmap.create("acgoodmatch_selected");
            // selectedFlag.setScale(0.7);
            selectedFlag.setPosition(bg.x + bg.width - selectedFlag.width * selectedFlag.scaleX - 15, bg.y + bg.height / 2 - selectedFlag.height * selectedFlag.scaleY / 2 + 20);
            this.addChild(selectedFlag);
        }
        else {
            var selBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acGoodMatchPoolSelect", this.getTypeCode()), function () {
                if (!_this.vo.isInActivity()) {
                    _this.vo.showAcEndTip();
                    return;
                }
                if (_this.vo.getCurrBallNum() != 16) {
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPoolTip3", _this.getTypeCode())));
                    return;
                }
                NetManager.request(NetRequestConst.REQUEST_ACGOODMATCH_SELECTPOOL, { activeId: _this.vo.aidAndCode, matchtype: data.id });
            }, this);
            selBtn.setPosition(bg.x + bg.width - selBtn.width - 15, bg.y + bg.height / 2 - selBtn.height / 2 + 20);
            this.addChild(selBtn);
            if (this.vo.getCurrBallNum() != 16) {
                App.DisplayUtil.changeToGray(selBtn);
            }
            else {
                App.DisplayUtil.changeToNormal(selBtn);
            }
        }
        this.height = bg.y + bg.height + this.getSpaceY();
    };
    AcGoodMatchDetailTab3ScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcGoodMatchDetailTab3ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcGoodMatchDetailTab3ScrollItem.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        _super.prototype.dispose.call(this);
    };
    return AcGoodMatchDetailTab3ScrollItem;
}(ScrollListItem));
//# sourceMappingURL=AcGoodMatchDetailTab3ScrollItem.js.map