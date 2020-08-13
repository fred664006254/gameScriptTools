/**
 * 群雄跨服 门客数量 buff
 * author shaolaing
 * date 2020/6/18
 * @class NewAtkracecrossBuffView
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
var NewAtkracecrossBuffView = /** @class */ (function (_super) {
    __extends(NewAtkracecrossBuffView, _super);
    function NewAtkracecrossBuffView() {
        return _super.call(this) || this;
    }
    NewAtkracecrossBuffView.prototype.getBgName = function () {
        return "newcrossatkrace_buffbg";
    };
    NewAtkracecrossBuffView.prototype.getResourceList = function () {
        var resArr = ["newcrossatkrace_buffbg", "newcrossatkrace_bufftitle", "commonview_smalltitlebg"];
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    NewAtkracecrossBuffView.prototype.getTitleStr = function () {
        return null;
    };
    Object.defineProperty(NewAtkracecrossBuffView.prototype, "vo", {
        get: function () {
            var crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace", this.param.data.code);
            return crossVo;
        },
        enumerable: true,
        configurable: true
    });
    NewAtkracecrossBuffView.prototype.initView = function () {
        var titlepic = BaseBitmap.create("newcrossatkrace_bufftitle");
        titlepic.setPosition(this.viewBg.width / 2 - titlepic.width / 2, -17);
        this.addChildToContainer(titlepic);
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecrossBuff_desc"), 20, TextFieldConst.COLOR_BROWN);
        desc.lineSpacing = 4;
        desc.width = 400;
        desc.textAlign = egret.HorizontalAlign.CENTER;
        desc.setPosition(this.viewBg.width / 2 - desc.width / 2, 80);
        this.addChildToContainer(desc);
        var numbg = BaseBitmap.create("commonview_smalltitlebg");
        numbg.width = 360;
        numbg.setPosition(this.viewBg.width / 2 - numbg.width / 2, desc.y + desc.height + 16);
        this.addChildToContainer(numbg);
        var servantNum = Api.servantVoApi.getServantCount();
        var lv60plus = Api.servantVoApi.getServantCountLevel60Plus();
        var numstr = LanguageManager.getlocal("newatkracecrossBuff_servantNum", [String(servantNum)]);
        var numtext = ComponentManager.getTextField(numstr, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numtext, numbg);
        this.addChildToContainer(numtext);
        var v1 = Api.servantVoApi.getServantCount() - 30;
        var values = this.vo.cfg.getBaseBuff();
        var v2 = Math.floor(values[0] * 100 + 0.5);
        var v3 = Math.floor(values[1] * 100 + 0.5);
        var v4 = 0.1 * 100;
        var value1 = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecrossBuff1", [String(v1)]), 20, TextFieldConst.COLOR_BROWN3);
        value1.setPosition(this.viewBg.width / 2 - value1.width / 2, numtext.y + 45);
        this.addChildToContainer(value1);
        var value2 = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecrossBuff2", [String(v2)]), 20, TextFieldConst.COLOR_BROWN3);
        value2.setPosition(this.viewBg.width / 2 - value2.width / 2, value1.y + 35);
        this.addChildToContainer(value2);
        var value3 = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecrossBuff3", [String(v3)]), 20, TextFieldConst.COLOR_BROWN3);
        value3.setPosition(this.viewBg.width / 2 - value3.width / 2, value2.y + 35);
        this.addChildToContainer(value3);
        //  let value4 = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecrossBuff4",[String(v4)]),20,TextFieldConst.COLOR_BROWN3);
        // value4.setPosition(this.viewBg.width/2-value4.width/2,value3.y+35);
        // this.addChildToContainer(value4);
        var sureBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, "activityPopSureTip", this.hide, this);
        sureBtn.setPosition(GameConfig.stageWidth / 2 - sureBtn.width / 2, GameConfig.stageHeigth / 2 + 200);
        this.addChild(sureBtn);
    };
    return NewAtkracecrossBuffView;
}(PopupView));
//# sourceMappingURL=NewAtkracecrossBuffView.js.map