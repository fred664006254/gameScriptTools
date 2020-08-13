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
 * 出站阵容item
 * date 2020.7.6
 */
var SixSection1BattleFormationScrollItem = /** @class */ (function (_super) {
    __extends(SixSection1BattleFormationScrollItem, _super);
    function SixSection1BattleFormationScrollItem() {
        return _super.call(this) || this;
    }
    SixSection1BattleFormationScrollItem.prototype.initItem = function (index, data, param) {
        var sid = data;
        var servantInfoVo = Api.servantVoApi.getServantObj(sid);
        var temW = 105;
        var iconBgBt = BaseLoadBitmap.create(servantInfoVo ? servantInfoVo.qualityBoxImgPath : 'servant_cardbg_0');
        this.addChild(iconBgBt);
        iconBgBt.scaleX = temW / 194;
        iconBgBt.scaleY = temW / 192;
        var iconBt = BaseLoadBitmap.create(servantInfoVo ? servantInfoVo.halfImgPath : 'servant_half_empty');
        iconBt.x = iconBgBt.x + 5;
        iconBt.y = iconBgBt.y + 5;
        this.addChild(iconBt);
        iconBt.scaleX = (temW - 10) / 180;
        iconBt.scaleY = (temW - 10) / 177;
        //兵力数目
        var numbg = BaseBitmap.create("servant_namebg");
        numbg.width = 98;
        numbg.height = 24;
        numbg.setPosition(3, 77);
        this.addChild(numbg);
        var zizhistr = LanguageManager.getlocal("emperorWarBuzhenZzhi", [String(servantInfoVo.getTotalBookValue(1))]);
        var zizhiText = ComponentManager.getTextField(zizhistr, 18, TextFieldConst.COLOR_WHITE);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, zizhiText, numbg);
        this.addChild(zizhiText);
        this.width = temW + this.getSpaceX();
        this.height = temW + this.getSpaceY();
    };
    SixSection1BattleFormationScrollItem.prototype.getSpaceX = function () {
        return 15;
    };
    SixSection1BattleFormationScrollItem.prototype.getSpaceY = function () {
        return 12;
    };
    SixSection1BattleFormationScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SixSection1BattleFormationScrollItem;
}(ScrollListItem));
//# sourceMappingURL=SixSection1BattleFormationScrollItem.js.map