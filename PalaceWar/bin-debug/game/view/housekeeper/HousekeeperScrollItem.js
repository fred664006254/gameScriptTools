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
 * 管家节点
 * author shaoliang
 * date 2020/4/23
 * @class HousekeeperScrollItem
 */
var HousekeeperScrollItem = (function (_super) {
    __extends(HousekeeperScrollItem, _super);
    function HousekeeperScrollItem() {
        var _this = _super.call(this) || this;
        _this._type = null;
        _this._checkBox = null;
        _this._isCheck = false;
        //是否有参数
        _this._hasParms = false;
        //下拉菜单
        _this._dropDownContainer = null;
        _this._dropDownBtn = null;
        _this._dropDownFlag = null;
        _this._dropBtnList = [];
        _this._lastDropIdx = 1;
        _this._dropCfg = [];
        //选择按钮
        _this._chooseBtn = null;
        _this._descText = null;
        _this._checkBox1 = null;
        _this._isCheck1 = false;
        _this._checkBox2 = null;
        _this._isCheck2 = false;
        //拖动条
        _this._dragNum = 0;
        _this._dragText1 = null;
        _this._dragText2 = null;
        _this._infoNode = null;
        _this._touchObj = [];
        return _this;
    }
    HousekeeperScrollItem.prototype.initItem = function (index, data) {
        var _this = this;
        this._type = data;
        var node = new BaseDisplayObjectContainer();
        this.addChild(node);
        this._infoNode = node;
        var bg = BaseBitmap.create("public_scrollitembg");
        bg.x = GameConfig.stageWidth / 2 - bg.width / 2;
        node.addChild(bg);
        ;
        var itemNameBg = BaseBitmap.create("public_titlebg");
        itemNameBg.x = bg.x + 6;
        itemNameBg.y = 18;
        itemNameBg.width = 240;
        node.addChild(itemNameBg);
        var namestr = LanguageManager.getlocal("housekeeper_type_" + data);
        var itemNameTF = ComponentManager.getTextField(namestr, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        itemNameTF.x = bg.x + 20;
        itemNameTF.y = itemNameBg.y + itemNameBg.height / 2 - itemNameTF.height / 2;
        node.addChild(itemNameTF);
        this._isCheck = Api.housekeeperVoApi.getIsCheckByType(data);
        var checkbox = BaseBitmap.create(this._isCheck ? "housekeeperview_check2" : "housekeeperview_check1");
        checkbox.setPosition(bg.x + 530, 15);
        this.addChild(checkbox);
        this._checkBox = checkbox;
        checkbox.addTouchTap(this.checkHandle, this);
        var lockStr = null;
        if (this._type == "manage") {
            if (Api.playerVoApi.getPlayerLevel() < Config.ManageCfg.autoNeedLv) {
                lockStr = LanguageManager.getlocal("manageDes");
            }
        }
        else if (this._type == "search") {
            if (!Api.searchVoApi.isShowNpc()) {
                lockStr = LanguageManager.getlocal("emoticonUnlockOffical", [Api.playerVoApi.getPlayerOfficeByLevel(Config.SearchbaseCfg.needLv)]);
            }
        }
        else if (this._type == "prison") {
            if (!Api.prisonVoApi.isShowNpc()) {
                var unlock = Config.PrisonCfg.getIndexPrisonItemCfg(1).unlock / 41;
                lockStr = LanguageManager.getlocal("housekeeper_locked_prison", [String(unlock)]);
            }
        }
        else if (this._type == "conquest") {
            if (!Api.conquestVoApi.isShowNpc()) {
                lockStr = LanguageManager.getlocal("housekeeper_locked_prison", [String(80)]);
            }
            else {
                var data_1 = Api.conquestVoApi.getConquestVo();
                if (data_1.tnum < 50) {
                    lockStr = LanguageManager.getlocal("housekeeper_locked_prison2");
                }
            }
        }
        else if (this._type == "trade") {
            if (!Api.tradeVoApi.isShowNpc()) {
                lockStr = LanguageManager.getlocal("emoticonUnlockOffical", [Api.playerVoApi.getPlayerOfficeByLevel(GameConfig.config.tradebaseCfg.unlock)]);
            }
            else {
                if (!Api.tradeVoApi.isBatchEnable()) {
                    lockStr = LanguageManager.getlocal("tradeBatchTip");
                }
            }
        }
        else if (this._type == "zhenqifang") {
            if (!Api.zhenqifangVoApi.isShowNpc()) {
                lockStr = LanguageManager.getlocal("emoticonUnlockOffical", [Api.playerVoApi.getPlayerOfficeByLevel(Config.ServantweaponCfg.lvNeed)]);
            }
        }
        else if (this._type == "child") {
            if (!Api.childVoApi.isShowNpc()) {
                lockStr = LanguageManager.getlocal("housekeeper_locked_child");
            }
        }
        if (lockStr) {
            var descText = ComponentManager.getTextField(lockStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText.width = 550;
            descText.lineSpacing = 4;
            descText.setPosition(itemNameTF.x, 83 - descText.height / 2);
            node.addChild(descText);
            checkbox.visible = false;
        }
        if (data == "manage" && !lockStr) {
            var descstr = Api.switchVoApi.isPracticeOPen() ? LanguageManager.getlocal("housekeeper_desc_manage") : LanguageManager.getlocal("housekeeper_desc_manage2s");
            var descText = ComponentManager.getTextField(descstr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText.width = 550;
            descText.lineSpacing = 4;
            descText.setPosition(itemNameTF.x, 83 - descText.height / 2);
            node.addChild(descText);
        }
        else if (data == "prison" && !lockStr) {
            var descstr = LanguageManager.getlocal("housekeeper_desc_" + data);
            var descText = ComponentManager.getTextField(descstr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText.width = 550;
            descText.lineSpacing = 4;
            descText.setPosition(itemNameTF.x, 83 - descText.height / 2);
            node.addChild(descText);
        }
        else if (data == "wife") {
            var descstr = LanguageManager.getlocal("housekeeper_desc_" + data);
            var descText = ComponentManager.getTextField(descstr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText.width = 550;
            descText.lineSpacing = 4;
            descText.setPosition(itemNameTF.x, 83 - descText.height / 2);
            node.addChild(descText);
            var parmsstr = Api.housekeeperVoApi.getCheckParms(data);
            this._isCheck1 = (parmsstr == "1");
            var checkbox1 = BaseBitmap.create(this._isCheck1 ? "housekeeperview_check2" : "housekeeperview_check1");
            checkbox1.setPosition(bg.x + 530, descText.y + descText.height / 2 - checkbox1.height / 2);
            node.addChild(checkbox1);
            this._checkBox1 = checkbox1;
            checkbox1.addTouchTap(this.checkHandle1, this);
            this._touchObj.push(checkbox1);
        }
        else if (data == "affair") {
            var descstr = LanguageManager.getlocal("housekeeper_desc_" + data);
            var descText = ComponentManager.getTextField(descstr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText.width = 190;
            descText.lineSpacing = 4;
            descText.setPosition(itemNameTF.x, 83 - descText.height / 2);
            node.addChild(descText);
            var parmsstr = Api.housekeeperVoApi.getCheckParms(data);
            if (parmsstr && parmsstr != "") {
                this._lastDropIdx = Number(parmsstr);
            }
            this.createDrop();
        }
        else if (data == "child" && !lockStr) {
            bg.height = 168;
            var descstr1 = LanguageManager.getlocal("housekeeper_desc_child1");
            var descstr2 = LanguageManager.getlocal("housekeeper_desc_child2");
            var descstr3 = LanguageManager.getlocal("housekeeper_desc_child3");
            var descText1 = ComponentManager.getTextField(descstr1, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText1.setPosition(itemNameTF.x, 60);
            node.addChild(descText1);
            var descText2 = ComponentManager.getTextField(descstr2, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText2.setPosition(itemNameTF.x, 95);
            node.addChild(descText2);
            var descText3 = ComponentManager.getTextField(descstr3, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText3.setPosition(itemNameTF.x, 130);
            node.addChild(descText3);
            var parmsstr = Api.housekeeperVoApi.getCheckParms(data);
            var parmsArr = parmsstr.split("|");
            this._isCheck1 = (parmsArr[0] == "1");
            this._isCheck2 = (parmsArr[1] == "1");
            var checkbox1 = BaseBitmap.create(this._isCheck1 ? "housekeeperview_check2" : "housekeeperview_check1");
            checkbox1.setPosition(bg.x + 530, descText1.y + descText1.height / 2 - checkbox1.height / 2);
            node.addChild(checkbox1);
            this._checkBox1 = checkbox1;
            checkbox1.addTouchTap(this.checkHandle1, this);
            var checkbox2 = BaseBitmap.create(this._isCheck2 ? "housekeeperview_check2" : "housekeeperview_check1");
            checkbox2.setPosition(bg.x + 530, descText2.y + descText2.height / 2 - checkbox2.height / 2);
            node.addChild(checkbox2);
            this._checkBox2 = checkbox2;
            checkbox2.addTouchTap(this.checkHandle2, this);
            this._touchObj.push(checkbox1);
            this._touchObj.push(checkbox2);
            if (parmsArr[2] && parmsArr[2] != "") {
                this._lastDropIdx = Number(parmsArr[2]);
            }
            this.createDrop();
        }
        else if (data == "search" && !lockStr) {
            // let parmsstr = Api.housekeeperVoApi.getCheckParms(data);
            // let parmsArr = parmsstr.split("|");
            // if (parmsArr[0] && parmsArr[0] != "")
            // {
            //     this._dragNum = Number(parmsArr[0]);
            // }
            // else
            // {
            //     this._dragNum = 90;
            // }
            // this._isCheck1 = (parmsArr[1]=="1");
            // this._isCheck2 = (parmsArr[2]=="1");
            this._dragNum = Api.searchVoApi.getAutosetValue();
            this._isCheck1 = Boolean(Api.searchVoApi.getGoldOpen());
            this._isCheck2 = Boolean(Api.searchVoApi.getFoodOpen());
            var descstr1 = LanguageManager.getlocal("housekeeper_desc_search1", [String(this._dragNum)]);
            var descText1 = ComponentManager.getTextField(descstr1, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText1.width = 580;
            descText1.textAlign = egret.HorizontalAlign.CENTER;
            descText1.setPosition(GameConfig.stageWidth / 2 - descText1.width / 2, 50);
            node.addChild(descText1);
            this._dragText1 = descText1;
            var dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress20_bg", 90, this.dragCallback, this, null, null, null, this._dragNum);
            dragProgressBar.x = 179;
            dragProgressBar.y = descText1.y + descText1.height + 10;
            node.addChild(dragProgressBar);
            this._touchObj.push(dragProgressBar);
            var line = BaseBitmap.create("settingview_line");
            line.setPosition(GameConfig.stageWidth / 2 - line.width / 2, 113);
            node.addChild(line);
            var descstr2 = LanguageManager.getlocal("housekeeper_desc_search2");
            var descstr3 = LanguageManager.getlocal("housekeeper_desc_search3");
            var descstr4 = LanguageManager.getlocal("housekeeper_desc_search4", [App.StringUtil.changeIntToText(Api.playerVoApi.getPlayerGold())]);
            var descstr5 = LanguageManager.getlocal("housekeeper_desc_search5", [App.StringUtil.changeIntToText(Api.playerVoApi.getFood())]);
            var descText2 = ComponentManager.getTextField(descstr2, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText2.width = 152;
            descText2.lineSpacing = 3;
            // descText2.textAlign = egret.HorizontalAlign.CENTER;
            descText2.setPosition(bg.x + 30, line.y + 30);
            node.addChild(descText2);
            var descText3 = ComponentManager.getTextField(descstr3, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText3.width = 160;
            descText3.lineSpacing = 3;
            // descText3.textAlign = egret.HorizontalAlign.CENTER;
            descText3.setPosition(bg.x + 365, descText2.y);
            node.addChild(descText3);
            var descText4 = ComponentManager.getTextField(descstr4, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText4.width = 220;
            descText4.lineSpacing = 3;
            // descText4.textAlign = egret.HorizontalAlign.CENTER;
            descText4.setPosition(descText2.x, descText2.y + descText2.height + 10);
            node.addChild(descText4);
            var descText5 = ComponentManager.getTextField(descstr5, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText5.width = 220;
            descText5.lineSpacing = 3;
            // descText5.textAlign = egret.HorizontalAlign.CENTER;
            descText5.setPosition(descText3.x, descText3.y + descText3.height + 10);
            node.addChild(descText5);
            bg.height = Math.max(descText4.y + descText4.height, descText5.y + descText5.height) + 16;
            var checkbox1 = BaseBitmap.create(this._isCheck1 ? "housekeeperview_check2" : "housekeeperview_check1");
            checkbox1.setPosition(descText2.x + descText2.width, descText2.height / 2 + descText2.y - checkbox1.height / 2);
            node.addChild(checkbox1);
            this._checkBox1 = checkbox1;
            checkbox1.addTouchTap(this.checkHandle1, this);
            var checkbox2 = BaseBitmap.create(this._isCheck2 ? "housekeeperview_check2" : "housekeeperview_check1");
            checkbox2.setPosition(descText3.x + descText3.width, checkbox1.y);
            node.addChild(checkbox2);
            this._checkBox2 = checkbox2;
            checkbox2.addTouchTap(this.checkHandle2, this);
            this._touchObj.push(checkbox1);
            this._touchObj.push(checkbox2);
        }
        else if (data == "bookroom") {
            var descText = ComponentManager.getTextField("ABC", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText.setPosition(itemNameTF.x, 83 - descText.height / 2);
            node.addChild(descText);
            this._descText = descText;
            this.resetDesc();
            var choosebtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "allianceWarSelectServantPopupViewTitle", function () {
                ViewController.getInstance().openView(ViewConst.COMMON.HOUSEKEEPERSERVANTPOPUPVIEW, { f: _this.bookroomSaveParms, o: _this });
            }, this);
            choosebtn.setPosition(bg.x + 442, descText.y + descText.height / 2 - choosebtn.height / 2);
            node.addChild(choosebtn);
            this._touchObj.push(choosebtn);
        }
        else if (data == "conquest" && !lockStr) {
            var parmsstr = Api.housekeeperVoApi.getCheckParms(data);
            var parmsArr = parmsstr.split("|");
            var cid = Api.conquestVoApi.getCid();
            if (cid > Config.ConquestCfg.getMaxLength()) {
                cid = Config.ConquestCfg.getMaxLength();
            }
            if (parmsArr[0] && parmsArr[0] != "") {
                this._dragNum = Number(parmsArr[0]);
            }
            else {
                this._dragNum = 1;
            }
            // this._dragNum = Math.max(this._dragNum,cid);
            var descstr1 = LanguageManager.getlocal("housekeeper_desc_conquest1", [String(this._dragNum)]);
            var descText1 = ComponentManager.getTextField(descstr1, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText1.width = 580;
            descText1.textAlign = egret.HorizontalAlign.CENTER;
            descText1.setPosition(GameConfig.stageWidth / 2 - descText1.width / 2, 50);
            node.addChild(descText1);
            this._dragText1 = descText1;
            var maxNum = Config.ConquestCfg.getMaxLength();
            var dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress20_bg", maxNum, this.dragCallback, this, null, 1, null, this._dragNum);
            dragProgressBar.x = 179;
            dragProgressBar.y = descText1.y + descText1.height + 10;
            node.addChild(dragProgressBar);
            this._touchObj.push(dragProgressBar);
            var num1 = 0;
            if (this._dragNum >= Api.conquestVoApi.getCid()) {
                num1 = Api.conquestVoApi.getAttCostNum2(Api.conquestVoApi.getCid(), this._dragNum - Api.conquestVoApi.getCid() + 1);
            }
            var num2 = Api.playerVoApi.getSoldier();
            var cost1 = App.StringUtil.changeIntToText(num1);
            var cost2 = App.StringUtil.changeIntToText(num2);
            var descstr2 = void 0;
            if (num1 > num2) {
                descstr2 = LanguageManager.getlocal("housekeeper_desc_conquest2_2", [cost2.toString()]);
            }
            else {
                descstr2 = LanguageManager.getlocal("housekeeper_desc_conquest2", [cost1.toString(), cost2.toString()]);
            }
            var descText2 = ComponentManager.getTextField(descstr2, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText2.width = 580;
            descText2.textAlign = egret.HorizontalAlign.CENTER;
            descText2.setPosition(GameConfig.stageWidth / 2 - descText2.width / 2, 120);
            node.addChild(descText2);
            this._dragText2 = descText2;
            var line = BaseBitmap.create("settingview_line");
            line.setPosition(GameConfig.stageWidth / 2 - line.width / 2, 143);
            node.addChild(line);
            var descstr3 = LanguageManager.getlocal("housekeeper_desc_conquest3");
            var descText3 = ComponentManager.getTextField(descstr3, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText3.width = 580;
            descText3.textAlign = egret.HorizontalAlign.CENTER;
            descText3.setPosition(GameConfig.stageWidth / 2 - descText3.width / 2, line.y + line.height + 6);
            node.addChild(descText3);
            bg.height = descText3.y + descText3.height + 16;
        }
        else if (data == "trade" && !lockStr) {
            var parmsstr = Api.housekeeperVoApi.getCheckParms(data);
            var parmsArr = parmsstr.split("|");
            if (parmsArr[0] && parmsArr[0] != "") {
                this._dragNum = Number(parmsArr[0]);
            }
            else {
                this._dragNum = 1;
            }
            var cid = Number(Api.tradeVoApi.getCurrentCid());
            if (cid > Config.TradeCfg.getMaxTradeIndex()) {
                cid = Config.TradeCfg.getMaxTradeIndex();
            }
            // this._dragNum = Math.max(this._dragNum,cid);
            var descstr1 = LanguageManager.getlocal("housekeeper_desc_trade1", [String(this._dragNum)]);
            var descText1 = ComponentManager.getTextField(descstr1, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText1.width = 580;
            descText1.textAlign = egret.HorizontalAlign.CENTER;
            descText1.setPosition(GameConfig.stageWidth / 2 - descText1.width / 2, 50);
            node.addChild(descText1);
            this._dragText1 = descText1;
            var maxNum = Config.TradeCfg.getMaxTradeIndex();
            var dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress20_bg", maxNum, this.dragCallback, this, null, 1, null, this._dragNum);
            dragProgressBar.x = 179;
            dragProgressBar.y = descText1.y + descText1.height + 10;
            node.addChild(dragProgressBar);
            this._touchObj.push(dragProgressBar);
            var num1 = 0;
            if (this._dragNum >= Number(Api.tradeVoApi.getCurrentCid())) {
                num1 = Api.tradeVoApi.getAttCostNum2(Number(Api.tradeVoApi.getCurrentCid()), this._dragNum - Number(Api.tradeVoApi.getCurrentCid()) + 1);
            }
            var num2 = Api.playerVoApi.getPlayerGold();
            var cost1 = App.StringUtil.changeIntToText(num1);
            var cost2 = App.StringUtil.changeIntToText(num2);
            var descstr2 = void 0;
            if (num1 > num2) {
                descstr2 = LanguageManager.getlocal("housekeeper_desc_trade2_2", [cost2.toString()]);
            }
            else {
                descstr2 = LanguageManager.getlocal("housekeeper_desc_trade2", [cost1.toString(), cost2.toString()]);
            }
            var descText2 = ComponentManager.getTextField(descstr2, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText2.width = 580;
            descText2.textAlign = egret.HorizontalAlign.CENTER;
            descText2.setPosition(GameConfig.stageWidth / 2 - descText2.width / 2, 120);
            node.addChild(descText2);
            this._dragText2 = descText2;
            var line = BaseBitmap.create("settingview_line");
            line.setPosition(GameConfig.stageWidth / 2 - line.width / 2, 143);
            node.addChild(line);
            var descstr3 = LanguageManager.getlocal("housekeeper_desc_trade3");
            var descText3 = ComponentManager.getTextField(descstr3, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText3.width = 580;
            descText3.textAlign = egret.HorizontalAlign.CENTER;
            descText3.setPosition(GameConfig.stageWidth / 2 - descText3.width / 2, line.y + line.height + 6);
            node.addChild(descText3);
            bg.height = descText3.y + descText3.height + 16;
        }
        else if (data == "zhenqifang" && !lockStr) {
            var descstr1 = LanguageManager.getlocal("housekeeper_desc_zhenqifang1");
            var descstr2 = LanguageManager.getlocal("housekeeper_desc_zhenqifang2");
            var descText1 = ComponentManager.getTextField(descstr1, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText1.setPosition(itemNameTF.x, 60);
            node.addChild(descText1);
            var descText2 = ComponentManager.getTextField(descstr2, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN3);
            descText2.setPosition(itemNameTF.x, 90);
            node.addChild(descText2);
            var parmsstr = Api.housekeeperVoApi.getCheckParms(data);
            var parmsArr = parmsstr.split("|");
            this._isCheck1 = (parmsArr[0] == "1");
            this._isCheck2 = (parmsArr[1] == "1");
            var checkbox1 = BaseBitmap.create(this._isCheck1 ? "housekeeperview_check2" : "housekeeperview_check1");
            checkbox1.setPosition(bg.x + 530, 50);
            node.addChild(checkbox1);
            this._checkBox1 = checkbox1;
            checkbox1.addTouchTap(this.checkHandle1, this);
            var checkbox2 = BaseBitmap.create(this._isCheck2 ? "housekeeperview_check2" : "housekeeperview_check1");
            checkbox2.setPosition(bg.x + 530, 85);
            node.addChild(checkbox2);
            this._checkBox2 = checkbox2;
            checkbox2.addTouchTap(this.checkHandle2, this);
            this._touchObj.push(checkbox1);
            this._touchObj.push(checkbox2);
            bg.height = checkbox2.y + checkbox2.height + 16;
        }
        this.height = bg.height + 5;
        this.checkNode();
    };
    HousekeeperScrollItem.prototype.resetDesc = function () {
        if (this._type == "bookroom") {
            var parm = false;
            if (this._descText.text == "ABC") {
                parm = true;
            }
            var parmsstr = Api.housekeeperVoApi.getCheckParms(this._type, parm);
            var parmsArr = parmsstr.split("|");
            var servantNum = parmsArr.length;
            if (servantNum == 1 && parmsArr[0] == "") {
                servantNum = 0;
            }
            var seatNum = Api.bookroomVoApi.getMaxleng();
            this._descText.text = LanguageManager.getlocal("housekeeper_desc_" + this._type, [String(servantNum), String(seatNum)]);
        }
    };
    HousekeeperScrollItem.prototype.createDrop = function () {
        var posy = 0;
        if (this._type == "affair") {
            this._dropCfg = ["housekeeper_choose_affair1", "housekeeper_choose_affair2", "housekeeper_choose_affair3"];
            posy = 70;
        }
        else if (this._type == "child") {
            this._dropCfg = ["servantInfo_speciality1", "servantInfo_speciality2", "servantInfo_speciality3", "servantInfo_speciality4"];
            posy = 130;
        }
        this._dropDownBtn = ComponentManager.getButton("housekeeperview_drop_btn", "", this.dropDownBtnClickHandler, this, [0], null, 20);
        this._dropDownBtn.setTargetSize(250, 27);
        this._dropDownBtn.x = 230;
        this._dropDownBtn.y = posy;
        this._dropDownBtn.setColor(ServantView.DROPBTN_COLOR1);
        this._infoNode.addChild(this._dropDownBtn);
        this._dropDownBtn.setText(this._dropCfg[this._lastDropIdx - 1], true, true);
        this._dropBtnList.push(this._dropDownBtn);
        this._touchObj.push(this._dropDownBtn);
        this._dropDownFlag = BaseBitmap.create("housekeeperview_droparrow");
        this._dropDownFlag.anchorOffsetY = this._dropDownFlag.height / 2;
        this._dropDownFlag.x = this._dropDownBtn.x + this._dropDownBtn.width - this._dropDownFlag.width - 3;
        this._dropDownFlag.y = this._dropDownBtn.y + this._dropDownBtn.height - this._dropDownFlag.height / 2 - 3;
        this.addChild(this._dropDownFlag);
        this._dropDownContainer = new BaseDisplayObjectContainer();
        this._dropDownContainer.visible = false;
        this._dropDownContainer.x = this._dropDownBtn.x;
        this._dropDownContainer.y = this._dropDownBtn.y + this._dropDownBtn.height;
        this.addChild(this._dropDownContainer);
        for (var index = 1; index <= this._dropCfg.length; index++) {
            var tmpBtn = ComponentManager.getButton("housekeeperview_drop_btn", "", this.dropDownBtnClickHandler, this, [index], null, 20);
            tmpBtn.setTargetSize(250, 27);
            this._dropBtnList.push(tmpBtn);
            tmpBtn.setColor(ServantView.DROPBTN_COLOR1);
            tmpBtn.y = tmpBtn.height * (index - 1) - 3;
            this._dropDownContainer.addChild(tmpBtn);
            tmpBtn.setText(this._dropCfg[index - 1], true, true);
        }
    };
    HousekeeperScrollItem.prototype.dropDownBtnClickHandler = function (btnIdx) {
        var tmpIdx = this._lastDropIdx;
        for (var index = 1; index < this._dropBtnList.length; index++) {
            this._dropBtnList[index].updateButtonImage(BaseButton.BTN_STATE1);
        }
        this._dropBtnList[this._lastDropIdx].updateButtonImage(BaseButton.BTN_STATE2);
        if (this._dropDownContainer.visible) {
            this._dropDownFlag.scaleY = 1;
            this._dropDownContainer.visible = false;
        }
        else {
            this._dropDownFlag.scaleY = -1;
            this._dropDownContainer.visible = true;
            var parent_1 = this.parent;
            parent_1.removeChild(this);
            parent_1.addChild(this);
        }
        if (btnIdx > 0) {
            this._lastDropIdx = btnIdx;
            this._dropDownBtn.setText(this._dropCfg[this._lastDropIdx - 1], true, true);
        }
        if (tmpIdx == this._lastDropIdx) {
            return;
        }
        this.saveParms();
    };
    HousekeeperScrollItem.prototype.checkHandle = function () {
        this._isCheck = !this._isCheck;
        this._checkBox.texture = ResourceManager.getRes(this._isCheck ? "housekeeperview_check2" : "housekeeperview_check1");
        Api.housekeeperVoApi.setCheckType(this._type, this._isCheck ? "1" : "0");
        if (this._hasParms) {
            this.saveParms();
        }
        this.checkNode();
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECK_HOUSEKEEPER);
    };
    HousekeeperScrollItem.prototype.checkHandle1 = function () {
        this._isCheck1 = !this._isCheck1;
        this._checkBox1.texture = ResourceManager.getRes(this._isCheck1 ? "housekeeperview_check2" : "housekeeperview_check1");
        this.saveParms();
    };
    HousekeeperScrollItem.prototype.checkHandle2 = function () {
        this._isCheck2 = !this._isCheck2;
        this._checkBox2.texture = ResourceManager.getRes(this._isCheck2 ? "housekeeperview_check2" : "housekeeperview_check1");
        this.saveParms();
    };
    HousekeeperScrollItem.prototype.saveParms = function () {
        if (this._type == "affair") {
            var value = String(this._lastDropIdx);
            Api.housekeeperVoApi.setCheckParms(this._type, value);
        }
        else if (this._type == "child") {
            var parms1 = this._isCheck1 ? "1" : "0";
            var parms2 = this._isCheck2 ? "1" : "0";
            var parms3 = String(this._lastDropIdx);
            var parmsstr = parms1 + "|" + parms2 + "|" + parms3;
            Api.housekeeperVoApi.setCheckParms(this._type, parmsstr);
        }
        else if (this._type == "wife") {
            var parms1 = this._isCheck1 ? "1" : "0";
            Api.housekeeperVoApi.setCheckParms(this._type, parms1);
        }
        else if (this._type == "search") {
            // let parms1:string = String(this._dragNum);
            // let parms2:string = this._isCheck1 ? "1" : "0";
            // let parms3:string = this._isCheck2 ? "1" : "0";
            // let parmsstr:string = parms1 +"|"+ parms2 + "|" + parms3;
            // Api.housekeeperVoApi.setCheckParms(this._type,parmsstr);
            var foodOpen = this._isCheck2 ? 1 : 0;
            var goldOpen = this._isCheck1 ? 1 : 0;
            NetManager.request(NetRequestConst.REQUEST_SEARCH_SET, { luckynum: this._dragNum, foodopen: foodOpen, goldopen: goldOpen });
        }
        else if (this._type == "conquest" || this._type == "trade") {
            var value = String(this._dragNum);
            Api.housekeeperVoApi.setCheckParms(this._type, value);
        }
        else if (this._type == "zhenqifang") {
            var parms1 = this._isCheck1 ? "1" : "0";
            var parms2 = this._isCheck2 ? "1" : "0";
            var parmsstr = parms1 + "|" + parms2;
            Api.housekeeperVoApi.setCheckParms(this._type, parmsstr);
        }
    };
    HousekeeperScrollItem.prototype.dragCallback = function (curNum) {
        this._dragNum = curNum;
        var descstr1 = LanguageManager.getlocal("housekeeper_desc_" + this._type + "1", [String(this._dragNum)]);
        this._dragText1.text = descstr1;
        if (this._type == "conquest") {
            var num1 = 0;
            if (this._dragNum >= Api.conquestVoApi.getCid()) {
                num1 = Api.conquestVoApi.getAttCostNum2(Api.conquestVoApi.getCid(), this._dragNum - Api.conquestVoApi.getCid() + 1);
            }
            var num2 = Api.playerVoApi.getSoldier();
            var cost1 = App.StringUtil.changeIntToText(num1);
            var cost2 = App.StringUtil.changeIntToText(num2);
            var descstr2 = void 0;
            if (num1 > num2) {
                descstr2 = LanguageManager.getlocal("housekeeper_desc_conquest2_2", [cost2]);
            }
            else {
                descstr2 = LanguageManager.getlocal("housekeeper_desc_conquest2", [cost1, cost2]);
            }
            this._dragText2.text = descstr2;
        }
        else if (this._type == "trade") {
            var num1 = 0;
            if (this._dragNum >= Number(Api.tradeVoApi.getCurrentCid())) {
                num1 = Api.tradeVoApi.getAttCostNum2(Number(Api.tradeVoApi.getCurrentCid()), this._dragNum - Number(Api.tradeVoApi.getCurrentCid()) + 1);
            }
            var num2 = Api.playerVoApi.getPlayerGold();
            var cost1 = App.StringUtil.changeIntToText(num1);
            var cost2 = App.StringUtil.changeIntToText(num2);
            var descstr2 = void 0;
            if (num1 > num2) {
                descstr2 = LanguageManager.getlocal("housekeeper_desc_trade2_2", [cost2.toString()]);
            }
            else {
                descstr2 = LanguageManager.getlocal("housekeeper_desc_trade2", [cost1.toString(), cost2.toString()]);
            }
            this._dragText2.text = descstr2;
        }
        this.saveParms();
    };
    HousekeeperScrollItem.prototype.bookroomSaveParms = function (ids) {
        var value = "";
        for (var i = 0; i < ids.length;) {
            value += ids[i];
            i++;
            if (i < ids.length) {
                value += "|";
            }
        }
        Api.housekeeperVoApi.setCheckParms(this._type, value);
        var servantNum = ids.length;
        var seatNum = Api.bookroomVoApi.getMaxleng();
        this._descText.text = LanguageManager.getlocal("housekeeper_desc_" + this._type, [String(servantNum), String(seatNum)]);
    };
    HousekeeperScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    HousekeeperScrollItem.prototype.checkNode = function () {
        if (this._isCheck) {
            App.DisplayUtil.changeToNormal(this._infoNode);
        }
        else {
            App.DisplayUtil.changeToGray(this._infoNode);
        }
        for (var i = 0; i < this._touchObj.length; i++) {
            this._touchObj[i].touchEnabled = this._isCheck;
        }
    };
    HousekeeperScrollItem.prototype.dispose = function () {
        this._type = null;
        this._checkBox = null;
        this._isCheck = false;
        this._checkBox1 = null;
        this._isCheck1 = false;
        this._checkBox2 = null;
        this._isCheck2 = false;
        this._hasParms = false;
        this._dropDownContainer = null;
        this._dropDownBtn = null;
        this._dropDownFlag = null;
        this._dropBtnList = null;
        this._lastDropIdx = 1;
        this._dropCfg.length = 0;
        this._chooseBtn = null;
        this._descText = null;
        this._infoNode = null;
        this._touchObj.length = 0;
        _super.prototype.dispose.call(this);
    };
    return HousekeeperScrollItem;
}(ScrollListItem));
__reflect(HousekeeperScrollItem.prototype, "HousekeeperScrollItem");
//# sourceMappingURL=HousekeeperScrollItem.js.map