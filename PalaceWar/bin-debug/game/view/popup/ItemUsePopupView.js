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
 * 道具使用弹板
 * author dmj
 * date 2017/9/25
 * @class ItemUsePopupView
 */
var ItemUsePopupView = (function (_super) {
    __extends(ItemUsePopupView, _super);
    function ItemUsePopupView() {
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
    Object.defineProperty(ItemUsePopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    ItemUsePopupView.prototype.getFrameName = function () {
        return "popup_frame1";
    };
    ItemUsePopupView.prototype.initView = function () {
        var itemId = this.param.data.itemId;
        var itemInfoVo = Api.itemVoApi.getItemInfoVoById(itemId);
        this._itemvo = itemInfoVo;
        this._useCallback = this.param.data.callback;
        this._handler = this.param.data.handler;
        var itemName = itemInfoVo.name;
        var iconPic = itemInfoVo.icon;
        var effectDesc = itemInfoVo.desc;
        this._maxNum = itemInfoVo.num;
        if (this.param.data.maxNum) {
            this._maxNum = Math.min(this.param.data.maxNum, Api.itemVoApi.getItemNumInfoVoById(itemId));
        }
        if (this._maxNum > 100) {
            this._maxNum = 100;
        }
        if (itemId >= 1013 && itemId <= 1017) {
            var bookroomCfg = GameConfig.config.bookroomCfg;
            this._maxNum = Math.min(bookroomCfg.temporaryMax - Api.bookroomVoApi.geItemNum, this._maxNum);
        }
        if (this._itemvo.target == 7) {
            var arry = this._itemvo.getRewards.split("_");
            if (arry[0] == "31") {
                var obj = Api.servantVoApi.getServantObj(String(this._itemvo.targetId));
                var num = obj.getBookCanLevelUpNum(arry[1]);
                if (this._maxNum > num) {
                    this._maxNum = num;
                }
            }
        }
        if (this.param.data.useTipKey) {
            this._useTipKey = this.param.data.useTipKey;
        }
        if (this.param.data.effectNum) {
            this._effectNum = this.param.data.effectNum;
        }
        var effectTitle = LanguageManager.getlocal("effectTitle");
        var bg = BaseBitmap.create("popupview_itemsbg");
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 0;
        this.addChildToContainer(bg);
        // let temX = 35;
        // let temY = 23;
        // let temW = 100;
        // let temH = 100;
        // let itembg:BaseBitmap = BaseBitmap.create(itemInfoVo.iconBg);
        // itembg.x = temX
        // itembg.y = temY;
        // this.addChildToContainer(itembg);
        //点击物品增加文字说明 添加物品iconitem
        var itemCfg = Config.ItemCfg.getItemCfgById(Number(itemId));
        if (!itemCfg) {
            itemCfg = GameData.getRewardItemVoByIdAndType(itemId);
        }
        var iconItem = GameData.getItemIcon(itemCfg, true, null, null, itemInfoVo.num);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconItem, bg);
        this.addChildToContainer(iconItem);
        // let numLb:BaseTextField = ComponentManager.getTextField( String(itemInfoVo.num),16,TextFieldConst.COLOR_WHITE);
        // numLb.name="numLb";
        // let numbg:BaseBitmap = BaseBitmap.create("public_9_itemnumbg");
        // if (itemInfoVo.num>99)
        // {
        //     numbg.width = numLb.width+18;
        // }
        // numbg.name="numbg";
        // numbg.setPosition(itembg.x+itembg.width-numbg.width-4,itembg.y+itembg.height-numbg.height-4);
        // numLb.setPosition(itembg.x+itembg.width-numLb.width-12, numbg.y+numbg.height/2-numLb.height/2 );
        // this.addChildToContainer(numbg);
        // this.addChildToContainer(numLb);
        // let bg1:BaseBitmap = BaseBitmap.create("public_9_bg1");
        // bg1.width = 387;
        // bg1.height = temH;
        // bg1.x = temX + temW + 10;
        // bg1.y = temY;
        // this.addChildToContainer(bg1);
        var nameTF = ComponentManager.getTextField(itemName, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        var namebg = BaseBitmap.create("public_9_bg95");
        namebg.width = nameTF.width + 80;
        namebg.x = this.viewBg.x + this.viewBg.width / 2 - namebg.width / 2;
        namebg.y = bg.y + bg.height + 10;
        this.addChildToContainer(namebg);
        nameTF.setColor(TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF, namebg);
        this.addChildToContainer(nameTF);
        var effect = ComponentManager.getTextField(LanguageManager.getlocal("effectTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_BLACK);
        effect.setPosition(64, namebg.y + namebg.height + 10);
        this.addChildToContainer(effect);
        this._effect = effect;
        var effectDescStr = itemInfoVo.desc;
        if (this._useTipKey) {
            effectDescStr = LanguageManager.getlocal(this._useTipKey, ["1", "" + itemName, "" + this._effectNum]);
        }
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
    ItemUsePopupView.prototype.dragCallback = function (curNum) {
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
    ItemUsePopupView.prototype.useHandler = function (param) {
        this._useCallback.apply(this._handler, [this._useNum, this.param.data.itemId]);
        this.hide();
    };
    ItemUsePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress20_bg", "progress2", "popupview_itemsbg"
        ]);
    };
    ItemUsePopupView.prototype.getBgExtraHeight = function () {
        return 25;
    };
    ItemUsePopupView.prototype.dispose = function () {
        this._useCallback = null;
        this._useNum = 1;
        if (this._selectedNumTF) {
            this.removeChildFromContainer(this._selectedNumTF);
            this._selectedNumTF.dispose();
            this._selectedNumTF = null;
        }
        if (this._maxNumTF) {
            this.removeChildFromContainer(this._maxNumTF);
            this._maxNumTF.dispose();
            this._maxNumTF = null;
        }
        this._maxNum = 0;
        if (this._numBg) {
            this.removeChildFromContainer(this._numBg);
            this._numBg.dispose();
            this._numBg = null;
        }
        this._handler = null;
        this._itemvo = null;
        this._desc = null;
        this._useTipKey = null;
        this._effectNum = null;
        _super.prototype.dispose.call(this);
    };
    return ItemUsePopupView;
}(PopupView));
__reflect(ItemUsePopupView.prototype, "ItemUsePopupView");
//# sourceMappingURL=ItemUsePopupView.js.map