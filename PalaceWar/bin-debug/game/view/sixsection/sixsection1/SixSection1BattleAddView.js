/**
 * 门客加成
 * author shaolaing
 * date 2020/7/2
 * @class SixSection1BattleAddView
 */
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
var SixSection1BattleAddView = /** @class */ (function (_super) {
    __extends(SixSection1BattleAddView, _super);
    function SixSection1BattleAddView() {
        return _super.call(this) || this;
    }
    SixSection1BattleAddView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    SixSection1BattleAddView.prototype.getContainerY = function () {
        return 0;
    };
    SixSection1BattleAddView.prototype.getTitlePic = function () {
        return "newatkracecrossbufflistviewtitle";
    };
    SixSection1BattleAddView.prototype.getTitleStr = function () {
        return null;
    };
    SixSection1BattleAddView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dailytask_topbg", "newcrossatkrace_bufficon", "public_scrollitembg",
            "progress19_cloud", "progress17_bg", "progress17", "progress19_bg", "specialview_commoni_namebg", "newatkracecrossbufflistviewtitle"
        ]);
    };
    SixSection1BattleAddView.prototype.initView = function () {
        this.setBigFameY(178);
        this.setBigFameCorner(2);
        var topBg = BaseBitmap.create("dailytask_topbg");
        topBg.y = 0;
        this.addChildToContainer(topBg);
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1BattleAdd_buffInfo"), 24, TextFieldConst.COLOR_WHITE);
        desc.lineSpacing = 5;
        desc.width = 560;
        desc.textAlign = egret.HorizontalAlign.LEFT;
        desc.setPosition(this.viewBg.width / 2 - desc.width / 2, 33);
        this.addChildToContainer(desc);
        var values = Api.sixsection1VoApi.getBaseBuff();
        var v2 = Math.floor(values[0] * 1000 + 0.5) / 10;
        var v3 = Math.floor(values[1] * 1000 + 0.5) / 10;
        var value2 = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1BattleDetail_buff1", [String(v2)]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        value2.setPosition(this.viewBg.width / 2 - value2.width - 40, desc.y + desc.height + 28);
        this.addChildToContainer(value2);
        var value3 = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1BattleDetail_buff2", [String(v3)]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        value3.setPosition(this.viewBg.width / 2 + 40, value2.y);
        this.addChildToContainer(value3);
        //门客滚顶区域
        var scrollH = GameConfig.stageHeigth - 295;
        var rect = new egret.Rectangle(0, 0, 600, scrollH);
        var list = Api.sixsection1VoApi.getBaseBuffList();
        var scrollList = ComponentManager.getScrollList(SixSection1BattleAddScrollItem, list, rect);
        scrollList.x = 20;
        scrollList.y = topBg.y + topBg.height + 13;
        this.addChildToContainer(scrollList);
    };
    SixSection1BattleAddView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SixSection1BattleAddView;
}(CommonView));
//# sourceMappingURL=SixSection1BattleAddView.js.map