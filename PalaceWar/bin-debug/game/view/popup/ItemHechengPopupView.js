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
 * 道具使用弹板
 * author shaoliang
 * date 2020/7/1
 * @class ItemHechengPopupView
 */
var ItemHechengPopupView = /** @class */ (function (_super) {
    __extends(ItemHechengPopupView, _super);
    function ItemHechengPopupView() {
        var _this = _super.call(this) || this;
        _this._useNum = 1;
        _this._maxNum = 0;
        _this._itemvo = null;
        _this._desc = null;
        _this._effect = null;
        _this._useBtn = null;
        _this._useTipKey = null;
        _this._effectNum = 0;
        return _this;
    }
    Object.defineProperty(ItemHechengPopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    ItemHechengPopupView.prototype.getFrameName = function () {
        return "popup_frame1";
    };
    ItemHechengPopupView.prototype.initView = function () {
        var itemId = this.param.data.itemId;
        var itemInfoVo = Api.itemVoApi.getItemInfoVoById(itemId);
        this._itemvo = itemInfoVo;
        var itemName = itemInfoVo.name;
        var iconPic = itemInfoVo.icon;
        var effectDesc = itemInfoVo.desc;
        this._maxNum = Math.floor(itemInfoVo.num / itemInfoVo.costHecheng);
        if (this.param.data.maxNum) {
            this._maxNum = this.param.data.maxNum;
        }
        if (this._maxNum > 100) {
            this._maxNum = 100;
        }
        if (this.param.data.useTipKey) {
            this._useTipKey = this.param.data.useTipKey;
        }
        if (this.param.data.effectNum) {
            this._effectNum = this.param.data.effectNum;
        }
        var bg = BaseBitmap.create("popupview_itemsbg");
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 0;
        this.addChildToContainer(bg);
        //点击物品增加文字说明 添加物品iconitem
        var itemCfg = Config.ItemCfg.getItemCfgById(Number(itemId));
        if (!itemCfg) {
            itemCfg = GameData.getRewardItemVoByIdAndType(itemId);
        }
        var iconItem = GameData.getItemIcon(itemCfg, true, null, null, itemInfoVo.num);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconItem, bg);
        this.addChildToContainer(iconItem);
        var nameTF = ComponentManager.getTextField(itemName, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        var namebg = BaseBitmap.create("public_9_bg95");
        namebg.width = nameTF.width + 80;
        namebg.x = this.viewBg.x + this.viewBg.width / 2 - namebg.width / 2;
        namebg.y = bg.y + bg.height + 10;
        this.addChildToContainer(namebg);
        nameTF.setColor(TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF, namebg);
        this.addChildToContainer(nameTF);
        var effect = ComponentManager.getTextField(LanguageManager.getlocal("effectTitle2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_BLACK);
        effect.setPosition(64, namebg.y + namebg.height + 10);
        this.addChildToContainer(effect);
        this._effect = effect;
        var rewardvo = GameData.formatRewardItem(itemInfoVo.getRewards)[0];
        var effectDescStr = LanguageManager.getlocal("itemHecheng_desc", [String(itemInfoVo.costHecheng), itemInfoVo.name, rewardvo.name]);
        // if (this._useTipKey){
        // 	effectDescStr = LanguageManager.getlocal(this._useTipKey, ["1", ""+itemName, ""+this._effectNum]);
        // }
        var effectDescTF = ComponentManager.getTextField(effectDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
        effectDescTF.lineSpacing = 4;
        effectDescTF.x = effect.x + effect.width;
        effectDescTF.y = effect.y;
        effectDescTF.width = this.viewBg.width - effect.x - effect.width - 60;
        if (this._useTipKey) {
            effect.visible = false;
            effectDescTF.width = this.viewBg.width - 60 - 40;
            effectDescTF.textAlign = TextFieldConst.ALIGH_CENTER;
            effectDescTF.x = this.viewBg.x + this.viewBg.width / 2 - effectDescTF.width / 2;
        }
        this.addChildToContainer(effectDescTF);
        this._desc = effectDescTF;
        var descH = effectDescTF.y + effectDescTF.height;
        if (descH < 80) {
            descH = 80;
        }
        var dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress20_bg", this._maxNum, this.dragCallback, this);
        dragProgressBar.x = 115;
        dragProgressBar.y = descH + 30;
        this.addChildToContainer(dragProgressBar);
        this._numBg = BaseBitmap.create("public_9_bg5");
        this._numBg.width = 90;
        this._numBg.x = bg.x + bg.width - 20 - this._numBg.width;
        this._numBg.y = effectDescTF.y + effectDescTF.height + 20;
        this.addChildToContainer(this._numBg);
        this._selectedNumTF = ComponentManager.getTextField(this._useNum + "", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
        this._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
        this._selectedNumTF.y = this._numBg.y + this._numBg.height / 2 - this._selectedNumTF.height / 2;
        this.addChildToContainer(this._selectedNumTF);
        this._maxNumTF = ComponentManager.getTextField("/" + this._maxNum.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT;
        this._maxNumTF.y = this._numBg.y + this._numBg.height / 2 - this._maxNumTF.height / 2;
        this.addChildToContainer(this._maxNumTF);
        var numTFW = this._selectedNumTF.width + this._maxNumTF.width;
        this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW) / 2;
        this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
        var line = BaseBitmap.create("public_cut_line");
        line.x = bg.x + bg.width / 2 - line.width / 2;
        line.y = dragProgressBar.y + 40;
        this.addChildToContainer(line);
        var useBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, "useBtn", this.useHandler, this);
        useBtn.x = bg.x + bg.width / 2 - useBtn.width / 2;
        useBtn.y = dragProgressBar.y + 58;
        useBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(useBtn);
        this._useBtn = useBtn;
    };
    ItemHechengPopupView.prototype.dragCallback = function (curNum) {
        this._useNum = curNum;
        this._selectedNumTF.text = this._useNum + "";
        var numTFW = this._selectedNumTF.width + this._maxNumTF.width;
        this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW) / 2;
        this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
        if (this._useTipKey) {
            this._desc.text = LanguageManager.getlocal(this._useTipKey, ["" + this._useNum, "" + this._itemvo.name, "" + (this._effectNum * this._useNum)]);
            this._desc.x = this.viewBg.x + this.viewBg.width / 2 - this._desc.width / 2;
        }
    };
    ItemHechengPopupView.prototype.useHandler = function (param) {
        NetManager.request(NetRequestConst.REQUEST_ITEM_HECHENG, { itemId: this.param.data.itemId, num: this._useNum });
        this.hide();
    };
    ItemHechengPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress20_bg", "progress2", "popupview_itemsbg"
        ]);
    };
    ItemHechengPopupView.prototype.getBgExtraHeight = function () {
        return 25;
    };
    ItemHechengPopupView.prototype.dispose = function () {
        this._useNum = 1;
        this._selectedNumTF = null;
        this._maxNumTF = null;
        this._maxNum = 0;
        this._numBg = null;
        this._itemvo = null;
        this._desc = null;
        this._useTipKey = null;
        this._effectNum = null;
        _super.prototype.dispose.call(this);
    };
    return ItemHechengPopupView;
}(PopupView));
//# sourceMappingURL=ItemHechengPopupView.js.map