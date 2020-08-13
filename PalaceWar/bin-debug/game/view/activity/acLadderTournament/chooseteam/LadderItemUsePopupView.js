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
 * author shaoliang
 * date 2019/10/30
 * @class LadderItemUsePopupView
 */
var LadderItemUsePopupView = (function (_super) {
    __extends(LadderItemUsePopupView, _super);
    function LadderItemUsePopupView() {
        var _this = _super.call(this) || this;
        _this._type = 0;
        _this._useNum = 1;
        _this._maxNum = 0;
        _this._numBg = null;
        _this._buffCfg = null;
        _this._buffEffectTF = null;
        return _this;
    }
    ;
    LadderItemUsePopupView.prototype.getTitleStr = function () {
        return "acLadder_useritem_title";
    };
    LadderItemUsePopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE, this.hide, this);
        this._type = this.param.data.type;
        this._buffCfg = Api.laddertournamentVoApi.cfg.buffList["1"];
        var itemId = Number(this._buffCfg.needItem);
        var itemInfoVo = Api.itemVoApi.getItemInfoVoById(itemId);
        var itemName = itemInfoVo.name;
        this._maxNum = Api.itemVoApi.getItemNumInfoVoById(itemId);
        if (this._maxNum > 100) {
            this._maxNum = 100;
        }
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 245;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var temX = 35 + GameData.popupviewOffsetX;
        var temY = 23;
        var temW = 100;
        var temH = 100;
        var itembg = BaseBitmap.create(itemInfoVo.iconBg);
        itembg.x = temX;
        itembg.y = temY;
        this.addChildToContainer(itembg);
        //点击物品增加文字说明 添加物品iconitem
        var itemCfg = Config.ItemCfg.getItemCfgById(Number(itemId));
        if (!itemCfg) {
            itemCfg = GameData.getRewardItemVoByIdAndType(itemId);
        }
        var iconItem = GameData.getItemIcon(itemCfg, true, null, null, itemInfoVo.num);
        iconItem.x = temX;
        iconItem.y = temY;
        this.addChildToContainer(iconItem);
        // let numTF:BaseTextField = ComponentManager.getTextField(itemInfoVo.num.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);;
        // numTF.x = temX + itembg.width - numTF.width - 5;
        // numTF.y = temY + itembg.height - numTF.height - 5;
        // this.addChildToContainer(numTF);
        var bg1 = BaseBitmap.create("public_9_bg1");
        bg1.width = 387;
        bg1.height = temH;
        bg1.x = temX + temW + 10;
        bg1.y = temY;
        this.addChildToContainer(bg1);
        var nameTF = ComponentManager.getTextField(itemName, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTF.setColor(TextFieldConst.COLOR_LIGHT_RED);
        nameTF.x = bg1.x + 8;
        nameTF.y = bg1.y + 8;
        this.addChildToContainer(nameTF);
        var effectDescTF = itemInfoVo.getDescTxt(true);
        effectDescTF.x = nameTF.x;
        effectDescTF.y = nameTF.y + nameTF.height + 5;
        effectDescTF.width = 366;
        this.addChildToContainer(effectDescTF);
        var descBg = BaseBitmap.create("godbless_tip_bg2");
        descBg.setPosition(this.viewBg.width / 2 - descBg.width, itembg.y + itembg.height + 8);
        this.addChildToContainer(descBg);
        var descBg2 = BaseBitmap.create("godbless_tip_bg2");
        descBg2.scaleX = -1;
        descBg2.setPosition(this.viewBg.width / 2 + descBg2.width, descBg.y);
        this.addChildToContainer(descBg2);
        var times = this._buffCfg.effectNum * this._useNum;
        var buffTF = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_buff_item_times", [String(times)]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        buffTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        buffTF.x = this.viewBg.width / 2 - buffTF.width / 2;
        buffTF.y = descBg.y + descBg.height / 2 - buffTF.height / 2;
        this.addChildToContainer(buffTF);
        this._buffEffectTF = buffTF;
        var dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress2_bg", this._maxNum, this.dragCallback, this);
        dragProgressBar.x = temX + 55;
        dragProgressBar.y = bg1.y + bg1.height + 67;
        this.addChildToContainer(dragProgressBar);
        this._numBg = BaseBitmap.create("public_9_bg5");
        this._numBg.width = 90;
        this._numBg.x = bg.x + bg.width - 10 - this._numBg.width;
        this._numBg.y = bg1.y + bg1.height + 60;
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
        var useBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "useBtn", this.useHandler, this);
        useBtn.x = bg.x + bg.width / 2 - useBtn.width / 2;
        useBtn.y = bg.y + bg.height + 15;
        useBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(useBtn);
    };
    LadderItemUsePopupView.prototype.dragCallback = function (curNum) {
        this._useNum = curNum;
        this._selectedNumTF.text = this._useNum + "";
        var numTFW = this._selectedNumTF.width + this._maxNumTF.width;
        this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW) / 2;
        this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
        var times = this._buffCfg.effectNum * this._useNum;
        this._buffEffectTF.text = LanguageManager.getlocal("acLadder_buff_item_times", [String(times)]);
        this._buffEffectTF.x = this.viewBg.width / 2 - this._buffEffectTF.width / 2;
    };
    LadderItemUsePopupView.prototype.useHandler = function (param) {
        if (Api.laddertournamentVoApi.acVo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            this.hide();
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_LT_ADDBUFF, { activeId: Api.laddertournamentVoApi.aidAndCode, team: this._type, rkey: this._buffCfg.id, num: this._useNum });
        this.hide();
    };
    LadderItemUsePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress2_bg", "progress2", "godbless_tip_bg2"
        ]);
    };
    LadderItemUsePopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    LadderItemUsePopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE, this.hide, this);
        this._useNum = 1;
        this._buffCfg = null;
        this._buffEffectTF = null;
        this._selectedNumTF = null;
        this._maxNumTF = null;
        this._maxNum = 0;
        this._numBg = null;
        this._type = 0;
        _super.prototype.dispose.call(this);
    };
    return LadderItemUsePopupView;
}(PopupView));
__reflect(LadderItemUsePopupView.prototype, "LadderItemUsePopupView");
//# sourceMappingURL=LadderItemUsePopupView.js.map