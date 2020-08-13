/**
 * 关卡boss战 选择门客cell
 * author shaoliang
 * date 2017/10/10
 * @class BossSelectedScrollItem
 */
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
var BossSelectedScrollItem = (function (_super) {
    __extends(BossSelectedScrollItem, _super);
    function BossSelectedScrollItem() {
        var _this = _super.call(this) || this;
        // 属性文本
        _this._selectedIndex2 = 0;
        return _this;
    }
    BossSelectedScrollItem.prototype.initItem = function (index, data) {
        this._selectedIndex2 = index;
        this._servantInfo = data;
        var bg = BaseBitmap.create("public_listbg3");
        bg.width = 524;
        bg.height = 135;
        this.height = bg.height + this.getSpaceY();
        this.addChild(bg);
        // let leftBg = BaseBitmap.create("public_left");
        // leftBg.width = 129;
        // leftBg.height = 106.5;
        // leftBg.x = 5.5;//17;
        // leftBg.y = 5.5;
        // this.addChild(leftBg);
        var servantInfoVo = Api.servantVoApi.getServantObj(this._servantInfo[0]);
        this.initServantIcon(servantInfoVo);
        this.initServantInfo();
        this.checkUseBtn(bg);
    };
    BossSelectedScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    BossSelectedScrollItem.prototype.checkUseBtn = function (bg) {
        if (this._servantInfo[1] == 1) {
            var useBtn = ComponentManager.getButton(this.getBtnResName(), this.getBtnLocalName(), this.confirmRecoveryHandler, this);
            // useBtn.setColor(TextFieldConst.COLOR_BLACK);
            useBtn.x = bg.width - useBtn.width - 15;
            useBtn.y = bg.height / 2 - useBtn.height * useBtn.scaleY / 2;
            this.addChild(useBtn);
            this._useBtn = useBtn;
        }
        else if (this._servantInfo[1] == 2) {
            var goneIcon = BaseBitmap.create("boss_gotowar");
            goneIcon.setPosition(375, 23);
            this.addChild(goneIcon);
        }
        else {
            var useBtn = ComponentManager.getButton(this.getBtnResName(), this.getBtnLocalName(), this.clickBtnHandler, this);
            // useBtn.setColor(TextFieldConst.COLOR_BLACK);
            useBtn.x = bg.width - useBtn.width - 15;
            useBtn.y = bg.height / 2 - useBtn.height * useBtn.scaleY / 2;
            this.addChild(useBtn);
            this._useBtn = useBtn;
        }
    };
    BossSelectedScrollItem.prototype.confirmRecoveryHandler = function () {
        var itemId = Config.DailybossCfg.needItem;
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(itemId));
        var itemUseCount = 1;
        var itemCount = hasNum;
        var itemCfg = Config.ItemCfg.getItemCfgById(Number(itemId));
        var message = LanguageManager.getlocal("useItemMsg", [itemCfg.name + "x" + itemUseCount, LanguageManager.getlocal("dailybossRecoveryBattleNumDesc")]);
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.recoveryHandler, handler: this, icon: itemCfg.icon, iconBg: itemCfg.iconBg, num: itemCount, useNum: itemUseCount, msg: message, id: itemId });
    };
    BossSelectedScrollItem.prototype.receiveData = function (e) {
        var data = e.data;
        if (data.ret) {
            if (this._useBtn) {
                var _a = this._useBtn, x = _a.x, y = _a.y;
                this._useBtn.dispose();
                var useBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "gotowar", this.clickBtnHandler, this);
                useBtn.setPosition(x, y);
                this.addChild(useBtn);
                this._useBtn = useBtn;
            }
            App.CommonUtil.showTip(LanguageManager.getlocal("dailybossRecoveryBattleSuccessDesc"));
        }
    };
    BossSelectedScrollItem.prototype.recoveryHandler = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHALLENGE_RECOVER, this.receiveData, this);
        NetManager.request(NetRequestConst.REQUEST_CHALLENGE_RECOVER, { servantId: this._servantInfo[0] });
    };
    /** 按钮图片 */
    BossSelectedScrollItem.prototype.getBtnResName = function () {
        if (this._servantInfo[1] == 1) {
            return ButtonConst.BTN_SMALL_ORANGE;
        }
        else {
            return ButtonConst.BTN_SMALL_YELLOW;
        }
    };
    /**按钮文字 */
    BossSelectedScrollItem.prototype.getBtnLocalName = function () {
        if (this._servantInfo[1] == 1) {
            return "manageRecoveryBtn";
        }
        else {
            return "gotowar";
        }
    };
    /**等级按钮事件，可重写 */
    BossSelectedScrollItem.prototype.clickBtnHandler = function (param) {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SELECTED_SERVANT, { "key": this._servantInfo[0] });
    };
    /**重写该方法 */
    BossSelectedScrollItem.prototype.initServantInfo = function () {
        var servantInfoVo = Api.servantVoApi.getServantObj(this._servantInfo[0]);
        // let nameBg = BaseBitmap.create("public_biaoti2");
        // nameBg.x = 160;
        // nameBg.y = 10 ;
        var nameTF = ComponentManager.getTextField(servantInfoVo.servantName, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nameTF.setColor(TextFieldConst.COLOR_BROWN_NEW);
        // nameTF.x = 120;
        // nameTF.y = 15;
        // nameBg.width = 140;
        nameTF.x = 160; //nameBg.x + nameBg.width/2 - nameTF.width/2;
        nameTF.y = 20; //nameBg.y + nameBg.height/2 - nameTF.height/2;
        // this.addChild(nameBg);
        this.addChild(nameTF);
        var levelTF = ComponentManager.getTextField(LanguageManager.getlocal("servant_infoLv") + servantInfoVo.level, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        levelTF.setColor(TextFieldConst.COLOR_BROWN_NEW);
        levelTF.x = nameTF.x; //120;
        levelTF.y = 50;
        this.addChild(levelTF);
        var attrTF = ComponentManager.getTextField(LanguageManager.getlocal("fightForce") + ":" + this._servantInfo[2], TextFieldConst.FONTSIZE_CONTENT_SMALL);
        attrTF.setColor(TextFieldConst.COLOR_BROWN_NEW);
        attrTF.x = levelTF.x;
        attrTF.y = 80;
        this.addChild(attrTF);
    };
    BossSelectedScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHALLENGE_RECOVER, this.receiveData, this);
        this._selectedIndex2 = null;
        this._servantInfo = null;
        this._useBtn = null;
        _super.prototype.dispose.call(this);
    };
    return BossSelectedScrollItem;
}(ServantSelectedScrollItem));
__reflect(BossSelectedScrollItem.prototype, "BossSelectedScrollItem");
