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
* buff item
* date 2020.
* author ycg
* @name SixSection1SelectServantScrollItem2
*/
var SixSection1SelectServantScrollItem2 = (function (_super) {
    __extends(SixSection1SelectServantScrollItem2, _super);
    function SixSection1SelectServantScrollItem2() {
        var _this = _super.call(this) || this;
        _this._gemIcon = null;
        _this._gemNum = null;
        _this._selNum = null;
        _this._currNum = 0;
        _this._data = null;
        return _this;
    }
    SixSection1SelectServantScrollItem2.prototype.initItem = function (index, data, param) {
        this.width = 510;
        this._data = data;
        var bg = BaseBitmap.create("public_popupscrollitembg");
        this.addChild(bg);
        var buffIconImg = "atkrace_icon_1_1";
        if (data.buffType == 2) {
            buffIconImg = "atkrace_icon_2_2";
        }
        else if (data.buffType == 3) {
            buffIconImg = "atkrace_icon_3_1";
        }
        var deltaScale = 1;
        var buffIcon = BaseLoadBitmap.create(buffIconImg);
        buffIcon.width = 107;
        buffIcon.height = 106;
        buffIcon.setScale(deltaScale);
        buffIcon.x = bg.x + 20;
        buffIcon.y = bg.y + 10;
        this.addChild(buffIcon);
        var nameBg = BaseBitmap.create("public_titlebg");
        nameBg.setPosition(buffIcon.x + buffIcon.width * deltaScale + 8, buffIcon.y);
        this.addChild(nameBg);
        var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantBuff" + data.buffType), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTxt.x = nameBg.x + 5;
        nameTxt.y = nameBg.y + nameBg.height / 2 - nameTxt.height / 2;
        this.addChild(nameTxt);
        var effectTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantBuffNum" + data.buffType, ["" + (data.buffValue * 100) + "%"]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        effectTxt.setPosition(nameTxt.x, nameBg.y + nameBg.height + 10);
        this.addChild(effectTxt);
        var needTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantBuffNeed"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        needTxt.setPosition(effectTxt.x, effectTxt.y + effectTxt.height + 10);
        this.addChild(needTxt);
        var gemIcon = BaseLoadBitmap.create("itemicon1");
        gemIcon.width = 100;
        gemIcon.height = 100;
        this.addChild(gemIcon);
        this._gemIcon = gemIcon;
        gemIcon.setScale(0.4);
        gemIcon.setPosition(needTxt.x + needTxt.width, needTxt.y - 10);
        var needGem = data.cost[0];
        var gemNum = ComponentManager.getTextField("" + needGem, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        gemNum.setPosition(gemIcon.x + gemIcon.width * gemIcon.scaleX, needTxt.y);
        this.addChild(gemNum);
        this._gemNum = gemNum;
        var selBg = BaseBitmap.create("public_9_bg26");
        selBg.width = 100;
        this.addChild(selBg);
        selBg.setPosition(bg.x + bg.width - selBg.width - 25, bg.y + bg.height / 2 - selBg.height / 2 + 10);
        var selNum = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
        selNum.anchorOffsetX = selNum.width / 2;
        selNum.setPosition(selBg.x + selBg.width / 2, selBg.y + selBg.height / 2 - selNum.height / 2);
        this.addChild(selNum);
        this._selNum = selNum;
        var decrBtn = ComponentManager.getButton("sixsectionmainui_decreasebtn", "", this.selBtnClick, this, [0]);
        decrBtn.setPosition(selBg.x - decrBtn.width / 2 + 10, selBg.y + selBg.height / 2 - decrBtn.height / 2 - 3);
        this.addChild(decrBtn);
        var addBtn = ComponentManager.getButton("sixsectionmainui_addbtn", "", this.selBtnClick, this, [1]);
        addBtn.setPosition(selBg.x + selBg.width - addBtn.width / 2 - 10, selBg.y + selBg.height / 2 - addBtn.height / 2 - 3);
        this.addChild(addBtn);
    };
    SixSection1SelectServantScrollItem2.prototype.selBtnClick = function (index) {
        //减少 0 增加 1
        if (index == 0) {
            if (this._currNum < 1) {
                return;
            }
            this._currNum -= 1;
        }
        else {
            //增加
            if (this._currNum + 1 > this._data.maxNum) {
                App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1SelectServantBuffMaxTip"));
                return;
            }
            // let currNum = this._currNum + 1;
            // let needCost = this._data.cost[currNum-1];
            // if (currNum < 1){
            //     needCost = this._data.fristCost;
            // }
            // let pGem = Api.playerVoApi.getPlayerGem();
            // if (pGem < needCost){
            //     App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1SelectServantRechargeTip"));
            //     return;
            // }
            this._currNum += 1;
        }
        this._selNum.text = this._currNum + "";
        this._selNum.anchorOffsetX = this._selNum.width / 2;
        this._gemIcon.visible = false;
        if (this._currNum >= this._data.maxNum) {
            this._gemNum.text = LanguageManager.getlocal("sixSection1SelectServantBuffNeedMax");
            this._gemNum.x = this._gemIcon.x;
        }
        else {
            var cost = this._data.cost[this._currNum];
            this._gemNum.text = "" + cost;
            this._gemIcon.visible = true;
            this._gemNum.x = this._gemIcon.x + this._gemIcon.width * this._gemIcon.scaleX;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SIXSECTION1_SELSERVANT_REFRESH, { type: "buff", buffType: this._data.buffType, num: this._currNum });
    };
    SixSection1SelectServantScrollItem2.prototype.getSpaceX = function () {
        return 5;
    };
    SixSection1SelectServantScrollItem2.prototype.getSpaceY = function () {
        return 5;
    };
    SixSection1SelectServantScrollItem2.prototype.dispose = function () {
        this._gemIcon = null;
        this._gemNum = null;
        this._selNum = null;
        this._currNum = 0;
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return SixSection1SelectServantScrollItem2;
}(ScrollListItem));
__reflect(SixSection1SelectServantScrollItem2.prototype, "SixSection1SelectServantScrollItem2");
//# sourceMappingURL=SixSection1SelectServantScrollItem2.js.map