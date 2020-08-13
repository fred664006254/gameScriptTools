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
var NewAtkracecrossBuffItem = /** @class */ (function (_super) {
    __extends(NewAtkracecrossBuffItem, _super);
    function NewAtkracecrossBuffItem() {
        return _super.call(this) || this;
    }
    NewAtkracecrossBuffItem.prototype.initItem = function (index, data) {
        this.width = 600;
        this.height = 148;
        var bg = BaseBitmap.create("public_scrollitembg");
        this.addChild(bg);
        var iconBg = BaseBitmap.create("progress19_bg");
        iconBg.x = 20;
        iconBg.y = bg.height / 2 - iconBg.height / 2;
        this.addChild(iconBg);
        var iconCloud = BaseBitmap.create("progress19_cloud");
        iconCloud.x = 40;
        iconCloud.y = iconBg.y + iconBg.height - iconCloud.height - 8;
        this.addChild(iconCloud);
        var taskIcon = BaseLoadBitmap.create("newcrossatkrace_bufficon");
        taskIcon.width = 88;
        taskIcon.height = 88;
        taskIcon.x = iconBg.x + iconBg.width / 2 - 44;
        taskIcon.y = iconBg.y + iconBg.height / 2 - 44;
        this.addChild(taskIcon);
        //需要资质
        var zizhibg = BaseBitmap.create("specialview_commoni_namebg");
        zizhibg.setScale(0.85);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, zizhibg, iconBg, [0, 5]);
        this.addChild(zizhibg);
        var zizhi = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecross_zizhi", [String(data.needv)]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, zizhi, zizhibg);
        this.addChild(zizhi);
        var nameBg = BaseBitmap.create("public_titlebg");
        nameBg.width = 240;
        nameBg.x = 152;
        nameBg.y = 26;
        this.addChild(nameBg);
        //let onev = {id:k, needv: twobuff.needAbility, lv :level , type : oneValue1>0?1:2, v1:oneValue1, v2 : oneValue2, 
        //maxLv : Object.keys(onebuff).length}
        var nameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalent_bufftxt1", [String(data.lv)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTF.x = nameBg.x + 15;
        nameTF.y = nameBg.y + nameBg.height / 2 - nameTF.height / 2;
        this.addChild(nameTF);
        var vv = data.type == 1 ? data.v1 : data.v2;
        vv = Math.floor(vv * 1000 + 0.5) / 10;
        var strr = LanguageManager.getlocal("newatkracecross_itembuff" + data.type, [String(vv)]);
        var valueTF = ComponentManager.getTextField(strr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        valueTF.x = nameBg.x;
        valueTF.y = nameBg.y + nameBg.height + 12;
        this.addChild(valueTF);
        var expProgress = ComponentManager.getProgressBar("progress17", "progress17_bg", 260);
        expProgress.setPosition(140, valueTF.y + valueTF.height + 10);
        this.addChild(expProgress);
        expProgress.setPercentage(data.lv / data.maxLv);
        var achProStr = data.lv + "/" + data.maxLv;
        var achProTF = ComponentManager.getTextField(achProStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        achProTF.x = expProgress.x + expProgress.width / 2 - achProTF.width / 2;
        achProTF.y = expProgress.y + expProgress.height / 2 - achProTF.height / 2;
        this.addChild(achProTF);
        //领取按钮
        var getBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "allianceBtnCheck", function () {
            ViewController.getInstance().openView(ViewConst.COMMON.NEWATKRACECROSSBUFFDETAILVIEW, {
                info: data
            });
        }, this);
        getBtn.x = 440;
        getBtn.y = 140 / 2 - getBtn.height / 2;
        getBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChild(getBtn);
    };
    NewAtkracecrossBuffItem.prototype.getSpaceY = function () {
        return 5;
    };
    return NewAtkracecrossBuffItem;
}(ScrollListItem));
//# sourceMappingURL=NewAtkracecrossBuffItem.js.map