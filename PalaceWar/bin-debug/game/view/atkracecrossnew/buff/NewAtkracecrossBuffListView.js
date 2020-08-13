/**
 * 群雄跨服 门客数量 buff
 * author shaolaing
 * date 2020/7/2
 * @class NewAtkracecrossBuffListView
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
var NewAtkracecrossBuffListView = /** @class */ (function (_super) {
    __extends(NewAtkracecrossBuffListView, _super);
    function NewAtkracecrossBuffListView() {
        return _super.call(this) || this;
    }
    NewAtkracecrossBuffListView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    NewAtkracecrossBuffListView.prototype.getContainerY = function () {
        return 0;
    };
    NewAtkracecrossBuffListView.prototype.getTitleStr = function () {
        return null;
    };
    NewAtkracecrossBuffListView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dailytask_topbg", "newcrossatkrace_bufficon", "public_scrollitembg",
            "progress19_cloud", "progress17_bg", "progress17", "progress19_bg", "specialview_commoni_namebg"
        ]);
    };
    Object.defineProperty(NewAtkracecrossBuffListView.prototype, "vo", {
        get: function () {
            var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace", this.param.data.code);
            return crossVo;
        },
        enumerable: true,
        configurable: true
    });
    NewAtkracecrossBuffListView.prototype.initView = function () {
        this.setBigFameY(178);
        this.setBigFameCorner(2);
        var topBg = BaseBitmap.create("dailytask_topbg");
        topBg.y = 0;
        this.addChildToContainer(topBg);
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecross_buffdesc"), 24, TextFieldConst.COLOR_WHITE);
        desc.lineSpacing = 5;
        desc.width = 560;
        desc.textAlign = egret.HorizontalAlign.LEFT;
        desc.setPosition(this.viewBg.width / 2 - desc.width / 2, 33);
        this.addChildToContainer(desc);
        var values = this.vo.cfg.getBaseBuff();
        var v2 = Math.floor(values[0] * 1000 + 0.5) / 10;
        var v3 = Math.floor(values[1] * 1000 + 0.5) / 10;
        var value2 = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecross_buff1", [String(v2)]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        value2.setPosition(this.viewBg.width / 2 - value2.width - 40, desc.y + desc.height + 28);
        this.addChildToContainer(value2);
        var value3 = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecross_buff2", [String(v3)]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        value3.setPosition(this.viewBg.width / 2 + 40, value2.y);
        this.addChildToContainer(value3);
        //门客滚顶区域
        var scrollH = GameConfig.stageHeigth - 295;
        var rect = new egret.Rectangle(0, 0, 600, scrollH);
        var list = this.vo.cfg.getBaseBuffList();
        var scrollList = ComponentManager.getScrollList(NewAtkracecrossBuffItem, list, rect);
        scrollList.x = 20;
        scrollList.y = topBg.y + topBg.height + 13;
        this.addChildToContainer(scrollList);
    };
    NewAtkracecrossBuffListView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return NewAtkracecrossBuffListView;
}(CommonView));
//# sourceMappingURL=NewAtkracecrossBuffListView.js.map