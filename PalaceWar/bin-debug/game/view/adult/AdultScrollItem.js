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
 * 成年子嗣栏位
 * author dky
 * date 2017/10/28
 * @class AdultScrollItem
 */
var AdultScrollItem = (function (_super) {
    __extends(AdultScrollItem, _super);
    function AdultScrollItem() {
        return _super.call(this) || this;
    }
    AdultScrollItem.prototype.initItem = function (index, adultInfoVo) {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addTick, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTick, this);
        // this._childIndex = posIndex;
        this.width = 604;
        this.height = 60 + this.getSpaceY();
        var adultVoList = Api.adultVoApi.getAdultVoList();
        // let adultPosNum = Api.adultVoApi.getChildPosNum()
        //1孩子 2空闲 3扩展
        var itemType = 1;
        // if(posIndex+1 <= adultVoList.length){
        // 	itemType = 1
        // }else if(posIndex+1 > adultVoList.length && posIndex+1 <= adultPosNum){
        // 	itemType = 2
        // }
        // let adultInfoVo = adultVoList[posIndex];
        this._itemBg = BaseBitmap.create("public_9_bg27");
        this._itemBg.width = this.width;
        this._itemBg.height = this.height - 5;
        this._itemBg.x = this.width / 2 - this._itemBg.width / 2;
        this._itemBg.y = this.height / 2 - this._itemBg.height / 2;
        this.addChild(this._itemBg);
        var childSexPic = "childview_boyicon";
        if (adultInfoVo.sex == 2) {
            childSexPic = "childview_girlicon";
        }
        var childIcon = BaseBitmap.create(childSexPic);
        childIcon.x = 22;
        childIcon.y = this.height / 2 - childIcon.height / 2;
        this.addChild(childIcon);
        var itemBg2 = BaseBitmap.create("public_9_bg26");
        itemBg2.width = this.width - 80;
        itemBg2.height = this.height - 25;
        itemBg2.x = this.width / 2 - itemBg2.width / 2 + 20;
        itemBg2.y = this.height / 2 - itemBg2.height / 2;
        itemBg2.name = "bg2";
        this.addChild(itemBg2);
        var childName = adultInfoVo.name;
        var nameColor = TextFieldConst.COLOR_WHITE;
        if (childName == "") {
            childName = LanguageManager.getlocal("childNeedName");
            nameColor = TextFieldConst.COLOR_WARN_RED;
        }
        this._nameTF = ComponentManager.getTextField(childName, TextFieldConst.FONTSIZE_TITLE_SMALL);
        this._nameTF.textColor = nameColor;
        this._nameTF.x = 70;
        this._nameTF.y = this.height / 2 - this._nameTF.height / 2;
        this.addChild(this._nameTF);
        var qualityStr = LanguageManager.getlocal("adult_quality") + LanguageManager.getlocal("adult_quality" + adultInfoVo.aquality);
        this._qualityTF = ComponentManager.getTextField(qualityStr, TextFieldConst.FONTSIZE_TITLE_SMALL);
        this._qualityTF.textColor = nameColor;
        this._qualityTF.x = 220;
        this._qualityTF.y = this.height / 2 - this._qualityTF.height / 2;
        this.addChild(this._qualityTF);
        var attrStr = LanguageManager.getlocal("servant_infoAttr") + adultInfoVo.attrVo.attTotal;
        this._attrTF = ComponentManager.getTextField(attrStr, TextFieldConst.FONTSIZE_TITLE_SMALL);
        this._attrTF.textColor = nameColor;
        this._attrTF.x = 410;
        this._attrTF.y = this.height / 2 - this._attrTF.height / 2;
        this.addChild(this._attrTF);
        if (adultInfoVo.visit) {
            this._attrTF.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
        }
        this._inMarryBB = BaseBitmap.create((adultInfoVo.pro && adultInfoVo.pro[1] == 3) ? "adultvisiting" : "adult_inmarry");
        //提亲中 的image  英文为长条在每个格子的右上角
        if (PlatformManager.checkIsTextHorizontal()) {
            this._inMarryBB.x = this.width - this._inMarryBB.width - 5;
            this._inMarryBB.y = this.height / 2 - this._inMarryBB.height / 2 - 22;
        }
        else {
            this._inMarryBB.x = this.width - this._inMarryBB.width - 3;
            this._inMarryBB.y = this.height / 2 - this._inMarryBB.height / 2;
        }
        this.addChild(this._inMarryBB);
        var lastTime = 0;
        if (adultInfoVo.pro && adultInfoVo.pro[0]) {
            lastTime = adultInfoVo.pro[0] - GameData.serverTime;
        }
        if (lastTime > 0) {
            this._inMarryBB.visible = true;
        }
        else {
            this._inMarryBB.visible = false;
        }
    };
    AdultScrollItem.prototype.eventHandler = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._itemBg.texture = ResourceManager.getRes("public_9_bg28_down");
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this._itemBg.texture = ResourceManager.getRes("public_9_bg28");
                break;
            case egret.TouchEvent.TOUCH_END:
                this._itemBg.texture = ResourceManager.getRes("public_9_bg28");
                break;
        }
    };
    AdultScrollItem.prototype.refreshData = function (index) {
        this._childIndex = index;
        var adultVoList = Api.adultVoApi.getAdultVoList();
        var childInfoVo = adultVoList[index];
        var childName = childInfoVo.name;
        this._nameTF.text = childName;
        if (childInfoVo) {
            var lastTime = 0;
            if (childInfoVo.pro && childInfoVo.pro[0]) {
                this._inMarryBB.setRes(childInfoVo.pro[1] == 3 ? "adultvisiting" : "adult_inmarry");
                lastTime = childInfoVo.pro[0] - GameData.serverTime;
            }
            if (lastTime > 0) {
                this._inMarryBB.visible = true;
            }
            else {
                this._inMarryBB.visible = false;
            }
        }
    };
    AdultScrollItem.prototype.tick = function () {
        // if(this.parent)
        // {
        // let adultVoList:AdultInfoVo[] = Api.adultVoApi.getAdultVoList();
        var childInfoVo = this._adultInfo;
        if (childInfoVo) {
            var lastTime = 0;
            if (childInfoVo.pro && childInfoVo.pro[0]) {
                lastTime = childInfoVo.pro[0] - GameData.serverTime;
            }
            if (lastTime > 0) {
                this._inMarryBB.visible = true;
            }
            else {
                this._inMarryBB.visible = false;
            }
        }
        // }
    };
    AdultScrollItem.prototype.addTick = function () {
        TickManager.addTick(this.tick, this);
    };
    AdultScrollItem.prototype.removeTick = function () {
        TickManager.removeTick(this.tick, this);
    };
    AdultScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AdultScrollItem.prototype.dispose = function () {
        // 名字文本
        this._nameTF = null;
        // 等级文本
        this._qualityTF = null;
        // 状态文本
        this._attrTF = null;
        this._childIndex = null;
        this._itemBg.removeTouch();
        this._itemBg = null;
        this._inMarryBB = null;
        this._adultInfo = null;
        _super.prototype.dispose.call(this);
    };
    return AdultScrollItem;
}(ScrollListItem));
__reflect(AdultScrollItem.prototype, "AdultScrollItem");
//# sourceMappingURL=AdultScrollItem.js.map