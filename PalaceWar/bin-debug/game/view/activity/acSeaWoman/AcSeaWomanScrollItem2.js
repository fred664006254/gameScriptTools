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
var AcSeaWomanScrollItem2 = /** @class */ (function (_super) {
    __extends(AcSeaWomanScrollItem2, _super);
    function AcSeaWomanScrollItem2() {
        var _this = _super.call(this) || this;
        _this._aidAndCode = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcSeaWomanScrollItem2.prototype.initItem = function (index, data, itemParam) {
        this._aidAndCode = itemParam;
        var rewards = data;
        var itembg = BaseBitmap.create("public_popupscrollitembg");
        itembg.y = 13;
        this.addChild(itembg);
        var titleBg = BaseBitmap.create("ackite_processtitlebg-1");
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acSeaWomanRewardTitle" + (index + 1) + '-' + this._aidAndCode.uicode), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var titleTipTF = ComponentManager.getTextField(LanguageManager.getlocal("acSeaWomanRewardTitleTip" + (index + 1) + '-' + this._aidAndCode.uicode), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        titleTipTF.setPosition(titleBg.x + titleBg.width / 2 - titleTipTF.width / 2, titleBg.y + titleBg.height + titleTipTF.height / 2);
        this.addChild(titleTipTF);
        var rewardScale = 0.8;
        var itemHeight = 0;
        for (var i = 0; i < rewards.length; i++) {
            var oneinfo = rewards[i];
            var rewardvo = GameData.formatRewardItem(oneinfo[0])[0];
            // rewardvo.num = oneinfo[1];
            var rewardDB = GameData.getItemIcon(rewardvo, true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(itembg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 15, titleTipTF.y + titleTipTF.height + 5 + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
            this.addChild(rewardDB);
            itemHeight = rewardDB.height * rewardScale + 15;
        }
        var offsetH = Math.ceil(rewards.length / 5) * itemHeight - 40;
        itembg.height += offsetH;
        this.height = itembg.height + itembg.y + 10;
    };
    AcSeaWomanScrollItem2.prototype.getSpaceY = function () {
        return 20;
    };
    AcSeaWomanScrollItem2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcSeaWomanScrollItem2;
}(ScrollListItem));
//# sourceMappingURL=AcSeaWomanScrollItem2.js.map