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
 * author jiangly
 * date 2018/10/15
 * @class AcCrossServerHegemonySelectPlanScrollItem
 */
var AcCrossServerHegemonySelectPlanScrollItem = (function (_super) {
    __extends(AcCrossServerHegemonySelectPlanScrollItem, _super);
    function AcCrossServerHegemonySelectPlanScrollItem() {
        return _super.call(this) || this;
    }
    AcCrossServerHegemonySelectPlanScrollItem.prototype.initItem = function (index, data, itemParam) {
        // 		id: 1
        // item: "2201"
        // moreguest: 1
        // powerdown: 0
        // powerup: 0
        // wins: 0
        this.width = 510;
        var bg = BaseBitmap.create("public_9_bg94");
        bg.width = this.width;
        bg.height = 140;
        this.addChild(bg);
        // console.log(index,data,itemParam);
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(data.itemID) || 0;
        var itemCfg = Config.ItemCfg.getItemCfgById(data.itemID);
        var itemDB = GameData.getItemIcon(itemCfg, false, false, false, itemNum);
        itemDB.setPosition(bg.x + 15, bg.y + bg.height / 2 - itemDB.height / 2);
        this.addChild(itemDB);
        // if(itemNum && itemNum > 0)
        // {
        // 	let itemNumTxt = ComponentManager.getTextField(String(itemNum),TextFieldConst.FONTSIZE_CONTENT_SMALL);
        // 	itemNumTxt.setPosition(itemDB.x + itemDB.width - 6 - itemNumTxt.width, itemDB.y + itemDB.height - 6 - itemNumTxt.height);
        // 	this.addChild(itemNumTxt)
        // }
        var itemNameTxt = ComponentManager.getTextField(itemCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WARN_GREEN4);
        itemNameTxt.setPosition(itemDB.x + itemDB.width + 15, bg.y + 20);
        this.addChild(itemNameTxt);
        var itemDescTxt = ComponentManager.getTextField(itemCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        // if(PlatformManager.checkIsKRSp() || PlatformManager.checkIsJPSp() || PlatformManager.checkIsViSp()||PlatformManager.checkIsKRNewSp()){
        // 	itemDescTxt.size = 18;
        // }
        itemDescTxt.width = 220;
        itemDescTxt.lineSpacing = 3;
        itemDescTxt.setPosition(itemNameTxt.x, itemNameTxt.y + itemNameTxt.height + 10);
        this.addChild(itemDescTxt);
        var useBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "useBtn", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYUSEPLANPOPUPVIEW, { "itemCfg": itemCfg, "itemNum": itemNum, "cfgId": data.id, aid: itemParam.aid, code: itemParam.code, matchId: itemParam.matchId, servantInfo: itemParam.servantInfo });
        }, this, null, null, null, TextFieldConst.COLOR_BLACK);
        useBtn.setPosition(bg.x + bg.width - useBtn.width - 5, bg.y + bg.height / 2 - useBtn.height / 2);
        this.addChild(useBtn);
        var useBM = BaseBitmap.create("awused");
        useBM.setPosition(useBtn.x + useBtn.width / 2 - useBM.width / 2, useBtn.y + useBtn.height / 2 - useBM.height / 2);
        this.addChild(useBM);
        // let myInfo = Api.allianceWarVoApi.getMyInfo();
        var myInfo = Api.crossServerHegemonyVoApi.getMyInfo();
        // console.log("myInfo--->",myInfo);
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
    AcCrossServerHegemonySelectPlanScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcCrossServerHegemonySelectPlanScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonySelectPlanScrollItem;
}(ScrollListItem));
__reflect(AcCrossServerHegemonySelectPlanScrollItem.prototype, "AcCrossServerHegemonySelectPlanScrollItem");
//# sourceMappingURL=AcCrossServerHegemonySelectPlanScrollItem.js.map