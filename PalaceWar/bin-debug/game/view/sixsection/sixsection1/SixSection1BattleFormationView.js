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
 * 出站阵容
 * date 2020.7.6
 * author ycg
 * @class SixSection1BattleFormationView
 */
var SixSection1BattleFormationView = /** @class */ (function (_super) {
    __extends(SixSection1BattleFormationView, _super);
    function SixSection1BattleFormationView() {
        var _this = _super.call(this) || this;
        _this._chooseNum = null;
        return _this;
    }
    SixSection1BattleFormationView.prototype.getTitlePic = function () {
        return "newcrossatkrace_servanttitle";
    };
    SixSection1BattleFormationView.prototype.getRuleInfo = function () {
        return "sixSection1BattleFormationRuleInfo";
    };
    SixSection1BattleFormationView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "newcrossatkrace_check", "newcrossatkrace_gone", "dailytask_topbg", "commonview_bigframe",
            "arena_bottom_bg", "servant_namebg", "mainlanddetailtitlebg2-1"
        ]);
    };
    SixSection1BattleFormationView.prototype.initView = function () {
        var topBg = BaseBitmap.create("dailytask_topbg");
        topBg.y = -50;
        this.addChildToContainer(topBg);
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1BattleFormationDesc", ["" + Api.sixsection1VoApi.getServantLimit()]), 20, TextFieldConst.COLOR_WHITE);
        desc.width = 600;
        desc.lineSpacing = 4;
        desc.setPosition(20, 0);
        this.addChildToContainer(desc);
        var frame = BaseBitmap.create("commonview_bigframe");
        frame.width = GameConfig.stageWidth;
        frame.height = GameConfig.stageHeigth - 130;
        frame.y = 120;
        this.addChildToContainer(frame);
        var addValues = Api.sixsection1VoApi.getBaseBuff();
        var value1 = Math.floor(addValues[0] * 1000 + 0.5) / 10;
        var atkInfo = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1BattleFormationAdd1", ["" + value1]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.addChildToContainer(atkInfo);
        atkInfo.setPosition(GameConfig.stageWidth / 2 - 40 - atkInfo.width, frame.y - atkInfo.height - 15);
        var value2 = Math.floor(addValues[1] * 1000 + 0.5) / 10;
        var criInfo = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1BattleFormationAdd2", ["" + value2]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.addChildToContainer(criInfo);
        criInfo.setPosition(GameConfig.stageWidth / 2 + 40, atkInfo.y);
        var addBuffBtn = ComponentManager.getButton("sixsection1_addbuffdetailbtn", "", this.addBuffBtnClick, this);
        this.addChildToContainer(addBuffBtn);
        // addBuffBtn.setScale(0.8);
        addBuffBtn.setPosition(criInfo.x + criInfo.width + 7, criInfo.y + criInfo.height / 2 - addBuffBtn.height * addBuffBtn.scaleY / 2);
        // info.setPosition(GameConfig.stageWidth/2 - (addBuffBtn.width * addBuffBtn.scaleX + info.width)/2, desc.y + desc.height + 20 + i * (addBuffBtn.height * addBuffBtn.scaleY + 5))
        // addBuffBtn.setPosition(info.x + info.width, info.y + info.height/2 - addBuffBtn.height * addBuffBtn.scaleY/2);
        // let addBuffBtn = ComponentManager.getButton("sixsection1_addbuffdetailbtn", "", this.addBuffBtnClick, this);
        // addBuffBtn.setPosition(GameConfig.stageWidth/2 - addBuffBtn.width/2, frame.y - addBuffBtn.height - 10);
        // this.addChildToContainer(addBuffBtn);
        var choosebg = BaseBitmap.create("mainlanddetailtitlebg2-1");
        choosebg.width = 306;
        choosebg.setPosition(GameConfig.stageWidth / 2 - choosebg.width / 2, 130 + 10);
        this.addChildToContainer(choosebg);
        var line1 = BaseBitmap.create("public_line3");
        line1.width = 600;
        line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
        line1.y = choosebg.y + choosebg.height / 2 - line1.height / 2;
        this.addChildToContainer(line1);
        // let useServant = Api.sixsection1VoApi.getUseServant();
        // let useNum = Object.keys(useServant).length;
        var choosenum = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1BattleFormationServantnum", ["" + Api.sixsection1VoApi.getServantLimit()]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        choosenum.width = choosebg.width;
        choosenum.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, choosenum, choosebg);
        this.addChildToContainer(choosenum);
        this._chooseNum = choosenum;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 55, (GameConfig.stageHeigth - 416));
        var sids = Api.sixsection1VoApi.getSortServantList();
        var scrollList = ComponentManager.getScrollList(SixSection1BattleFormationScrollItem, sids, rect);
        scrollList.x = 27;
        scrollList.y = choosebg.y + choosebg.height + 10;
        this.addChildToContainer(scrollList);
        var downbg = BaseBitmap.create("arena_bottom_bg");
        downbg.height = 140;
        downbg.y = GameConfig.stageHeigth - downbg.height;
        this.addChild(downbg);
        var dispathBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "sysConfirm", this.enterRackHandler, this, null, 0, null, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, dispathBtn, downbg);
        this.addChild(dispathBtn);
    };
    SixSection1BattleFormationView.prototype.addBuffBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1BATTLEADDVIEW);
    };
    SixSection1BattleFormationView.prototype.enterRackHandler = function () {
        this.hide();
    };
    SixSection1BattleFormationView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SixSection1BattleFormationView;
}(CommonView));
//# sourceMappingURL=SixSection1BattleFormationView.js.map