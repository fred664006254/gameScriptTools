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
 * 元宝消耗冲榜
 * author sjs
 * date 2019/10/25
 * @class AcCrossServerGemExpendScrollItem
 */
var AcCrossServerGemExpendScrollItem = (function (_super) {
    __extends(AcCrossServerGemExpendScrollItem, _super);
    function AcCrossServerGemExpendScrollItem() {
        return _super.call(this) || this;
    }
    AcCrossServerGemExpendScrollItem.prototype.initItem = function (index, acVo) {
        this._acVo = acVo;
        this.width = GameConfig.stageWidth;
        this.height = 250 + this.getSpaceY();
        var bg = BaseBitmap.create("acGemExpendItemBg");
        bg.x = 8;
        this.addChild(bg);
        //第几名
        var txt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
        txt.width = 190;
        txt.x = 300;
        txt.textAlign = "center";
        txt.y = 25;
        this.addChild(txt);
        var rIcons = this._acVo.rewardIcons;
        var tmpX = 200;
        var addH = 10;
        var scroStartY = 55;
        var scaleNum = 0.7;
        var widLendth = 450 + tmpX;
        if (Number(this._acVo.id) < 4) {
            txt.text = LanguageManager.getlocal("acRank_rank" + this._acVo.id);
            var _posContainer = Api.playerVoApi.getPlayerCircleHead(parseInt(this._acVo.pic), "head_circle_bg_4116");
            _posContainer.x = 50;
            _posContainer.y = 70;
            this.addChild(_posContainer);
            var descBg = BaseBitmap.create("acGemExpendItemDescBg");
            descBg.width = 165;
            descBg.height = 55;
            descBg.x = _posContainer.x + 110 / 2 - 165 / 2;
            descBg.y = _posContainer.y + 110;
            this.addChild(descBg);
            var nameAndZid = "";
            if (this._acVo.zid == 0) {
                nameAndZid = LanguageManager.getlocal("palace_history_empty");
            }
            else {
                var serverText = "";
                var qu = Api.mergeServerVoApi.getQuByZid(this._acVo.zid);
                if (qu > 0) {
                    serverText = LanguageManager.getlocal("mergeServer", [String(qu), String(this._acVo.zid)]);
                }
                else {
                    serverText = LanguageManager.getlocal("ranserver2", [String(this._acVo.zid)]);
                }
                nameAndZid = this._acVo.name + "	" + serverText;
            }
            var nameTTF = ComponentManager.getTextField(nameAndZid, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
            nameTTF.x = _posContainer.x + 110 / 2 - nameTTF.width / 2;
            nameTTF.y = descBg.y + 8;
            this.addChild(nameTTF);
            var gemExpendTTF = ComponentManager.getTextField(LanguageManager.getlocal("acLimitedReward-1_Title") + ":" + this._acVo.gemexpend, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
            gemExpendTTF.x = _posContainer.x + 110 / 2 - gemExpendTTF.width / 2;
            gemExpendTTF.y = nameTTF.y + nameTTF.height + 8;
            this.addChild(gemExpendTTF);
        }
        else {
            txt.x = 200;
            txt.text = LanguageManager.getlocal("acRank_rank4", [String(this._acVo.rank[0]), String(this._acVo.rank[1])]);
            tmpX = 35;
            widLendth = widLendth - 35;
        }
        for (var idx = 0; idx < rIcons.length; idx++) {
            var element = rIcons[idx];
            element.setScale(scaleNum);
            element.x = tmpX;
            element.y = scroStartY + 15; //-20;
            tmpX += (element.width * element.scaleX + 8);
            //换行处理
            if (tmpX >= widLendth) {
                tmpX = 200;
                if (Number(this._acVo.id) >= 4) {
                    tmpX = 35;
                }
                addH += element.height + 5;
                scroStartY += element.height * element.scaleY + 15;
                element.x = tmpX;
                element.y = scroStartY + 15;
                tmpX += (element.width * element.scaleX + 8);
            }
            this.addChild(element);
        }
    };
    AcCrossServerGemExpendScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcCrossServerGemExpendScrollItem.prototype.dispose = function () {
        this._intimacyTF = null;
        this._glamourTF = null;
        this._wifeInfoVo = null;
        this._acVo = null;
        this._acCDTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerGemExpendScrollItem;
}(ScrollListItem));
__reflect(AcCrossServerGemExpendScrollItem.prototype, "AcCrossServerGemExpendScrollItem");
