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
 * 选择计策的item
 * author 张朝阳
 * date 2018/10/15
 * @class AllianceWarSelectPlanScrollItem
 */
var AllianceWarSelectPlanScrollItem = (function (_super) {
    __extends(AllianceWarSelectPlanScrollItem, _super);
    function AllianceWarSelectPlanScrollItem() {
        return _super.call(this) || this;
    }
    AllianceWarSelectPlanScrollItem.prototype.initItem = function (index, data, itemParam) {
        // 		id: 1
        // item: "2201"
        // moreguest: 1
        // powerdown: 0
        // powerup: 0
        // wins: 0
        this.width = 510;
        var bg = BaseBitmap.create("public_9_bg44");
        bg.width = this.width;
        bg.height = 130;
        this.addChild(bg);
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(data.item);
        var itemCfg = Config.ItemCfg.getItemCfgById(data.item);
        var itemDB = GameData.getItemIcon(itemCfg);
        itemDB.setPosition(bg.x + 15, bg.y + bg.height / 2 - itemDB.height / 2);
        this.addChild(itemDB);
        if (itemNum && itemNum > 0) {
            var numbg = BaseBitmap.create("public_9_itemnumbg");
            this.addChild(numbg);
            var itemNumTxt = ComponentManager.getTextField(String(itemNum), 16);
            itemNumTxt.setPosition(itemDB.x + itemDB.width - 6 - itemNumTxt.width, itemDB.y + itemDB.height - 6 - itemNumTxt.height);
            this.addChild(itemNumTxt);
            if (itemNum > 99) {
                numbg.width = itemNumTxt.width + 18;
            }
            numbg.name = "numbg";
            numbg.setPosition(itemDB.x + itemDB.width - numbg.width - 4, itemDB.y + itemDB.height - numbg.height - 4);
            itemNumTxt.setPosition(itemDB.x + itemDB.width - itemNumTxt.width - 12, numbg.y + numbg.height / 2 - itemNumTxt.height / 2);
        }
        var itemNameTxt = ComponentManager.getTextField(itemCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        itemNameTxt.setPosition(itemDB.x + itemDB.width + 15, bg.y + 15);
        this.addChild(itemNameTxt);
        var itemDescTxt = ComponentManager.getTextField(itemCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_WHITE);
        itemDescTxt.width = 220;
        itemDescTxt.lineSpacing = 3;
        itemDescTxt.setPosition(itemNameTxt.x, itemNameTxt.y + itemNameTxt.height + 10);
        this.addChild(itemDescTxt);
        var useBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "useBtn", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWARUSEPLANPOPUPVIEW, { "itemCfg": itemCfg, "itemNum": itemNum, "cfgId": data.id });
        }, this);
        useBtn.setPosition(bg.x + bg.width - useBtn.width - 7, bg.y + bg.height / 2 - useBtn.height / 2);
        this.addChild(useBtn);
        var useBM = BaseBitmap.create("awused");
        useBM.setPosition(useBtn.x + useBtn.width / 2 - useBM.width / 2, useBtn.y + useBtn.height / 2 - useBM.height / 2);
        this.addChild(useBM);
        var myInfo = Api.allianceWarVoApi.getMyInfo();
        if (myInfo && myInfo['stra']) {
            if (myInfo['stra'] == data.id) {
                useBM.setVisible(true);
                useBtn.setVisible(false);
            }
            else {
                useBM.setVisible(false);
                useBtn.setVisible(true);
                useBtn.setEnable(false);
            }
            return;
        }
        else {
            useBM.setVisible(false);
            useBtn.setVisible(true);
            // if(itemNum && itemNum > 0)
            // {
            // 	useBtn.setEnable(true);
            // }
            // else
            // {
            // 	useBtn.setEnable(false);
            // }
        }
    };
    AllianceWarSelectPlanScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AllianceWarSelectPlanScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AllianceWarSelectPlanScrollItem;
}(ScrollListItem));
__reflect(AllianceWarSelectPlanScrollItem.prototype, "AllianceWarSelectPlanScrollItem");
//# sourceMappingURL=AllianceWarSelectPlanScrollItem.js.map