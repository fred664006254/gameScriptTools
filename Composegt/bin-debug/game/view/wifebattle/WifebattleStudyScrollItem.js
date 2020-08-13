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
 * 永乐大典
 * author jiangliuyang
 * @class WifebattleStudyScrollItem
 */
var WifebattleStudyScrollItem = (function (_super) {
    __extends(WifebattleStudyScrollItem, _super);
    function WifebattleStudyScrollItem() {
        var _this = _super.call(this) || this;
        _this._idx = 0;
        return _this;
    }
    WifebattleStudyScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFEBATTLE_YONGLEUP), this.upgradeCallback, this);
        this._data = data;
        this._idx = index;
        var cfgData = data;
        var ability = GameConfig.config.abilityCfg[cfgData.ability];
        var bg = BaseBitmap.create("public_listbg");
        bg.width = 520;
        bg.height = 139;
        this.height = bg.height + this.getSpaceY();
        bg.x = 5;
        this.addChild(bg);
        var leftBg = BaseBitmap.create("public_left");
        leftBg.width = 110;
        leftBg.height = 120.5;
        leftBg.x = 11.5;
        leftBg.y = 5.5;
        this.addChild(leftBg);
        var attrIcon = BaseLoadBitmap.create("wifebattleview_studyicon");
        attrIcon.width = 100;
        attrIcon.height = 100;
        attrIcon.x = bg.x + 20;
        attrIcon.y = bg.y + bg.height / 2 - attrIcon.height / 2;
        this.addChild(attrIcon);
        // let nameBg = BaseBitmap.create("public_biaoti2");
        // nameBg.x = leftBg.x + leftBg.width + 5;
        // nameBg.y = 15;
        // nameBg.width = 160;
        // this.addChild(nameBg);
        // wifeBattleStudy_name
        var name = LanguageManager.getlocal("wifeBattleStudy_name", [this._data.id]);
        var strCfg = [
            {
                txt: LanguageManager.getlocal("wifeBattleStudy_expplus", [cfgData.wifeSkillExp])
            },
            {
                txt: LanguageManager.getlocal("wifeBattleStudy_needtxt", [App.StringUtil.changeIntToText(cfgData.itemCost)])
            },
            {
                txt: LanguageManager.getlocal("wifeBattleStudy_unlock", [cfgData.wifeStatusNum])
            }
        ];
        // let startX = nameBg.x;
        // let startY = nameBg.y + nameBg.height/2;
        var nameTF = ComponentManager.getTextField(name, 22, TextFieldConst.COLOR_QUALITY_GREEN);
        nameTF.x = 130;
        nameTF.y = 10;
        this.addChild(nameTF);
        this._unlockTF = ComponentManager.getTextField(strCfg[2].txt, 20, TextFieldConst.COLOR_WARN_RED);
        this._unlockTF.x = nameTF.x + nameTF.width + 10;
        this._unlockTF.y = nameTF.y + nameTF.height / 2 - this._unlockTF.height / 2;
        this.addChild(this._unlockTF);
        var bookTxt1 = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        bookTxt1.text = strCfg[0].txt;
        bookTxt1.width = 250;
        bookTxt1.x = nameTF.x;
        bookTxt1.y = nameTF.y + nameTF.height + 10;
        bookTxt1.name = "bookTxt" + 0;
        this.addChild(bookTxt1);
        var bookTxt2 = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        bookTxt2.text = strCfg[1].txt;
        bookTxt2.width = 250;
        bookTxt2.x = bookTxt1.x;
        bookTxt2.y = bookTxt1.y + bookTxt1.height + 10;
        bookTxt2.name = "bookTxt" + 0;
        this.addChild(bookTxt2);
        // for (var index = 1; index < 3; index++) {
        // 	let bookTxt1 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
        // 	bookTxt1.text = strCfg[index].txt;
        // 	bookTxt1.x = startX;
        // 	bookTxt1.y = startY - bookTxt1.height/2;
        // 	bookTxt1.name = "bookTxt"+index
        // 	this.addChild(bookTxt1);
        // 	startY += 28;
        // }
        // let lv = Api.studyatkVoApi.getStudySkillInfoLv();
        // if(lv <= this._idx)
        // {
        // let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"studyatkBook_studyOver",this.btnHandler,this);
        // btn.x = bg.x + bg.width -btn.width - 10;
        // btn.y = bg.y + bg.height/2 - btn.height/2;
        // if(PlatformManager.checkIsTextHorizontal()){
        // 	btn.x = bg.x + bg.width -btn.width - 13;
        // 	btn.y = bg.y + bg.height/2 - btn.height/2 - 32;
        // }
        // btn.visible = false;
        // btn.name = "btn";
        // this.addChild(btn);
        // this._btn = btn;
        // }
        var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "wifeBattleStudyBtn", this.btnHandler, this);
        btn.x = bg.x + bg.width - btn.width - 10;
        btn.y = bg.y + bg.height / 2 - btn.height / 2;
        if (PlatformManager.checkIsTextHorizontal()) {
            btn.x = bg.x + bg.width - btn.width - 13;
            btn.y = bg.y + bg.height / 2 - btn.height / 2 - 32;
        }
        btn.visible = false;
        btn.name = "btn";
        this.addChild(btn);
        this._btn = btn;
        var flagImg = BaseBitmap.create("wifebattleview_study");
        flagImg.width = 131;
        flagImg.height = 86;
        flagImg.x = bg.x + bg.width - flagImg.width - 10;
        flagImg.y = bg.y + bg.height / 2 - flagImg.height / 2;
        this.addChild(flagImg);
        this._flagImg = flagImg;
        var mask = BaseBitmap.create("public_9_viewmask");
        mask.width = bg.width;
        mask.height = bg.height;
        mask.x = bg.x;
        mask.y = bg.y;
        mask.alpha = 0.7;
        mask.name = "mask";
        this.addChild(mask);
        this._mask = mask;
        // }
        this._unlockImg = BaseBitmap.create("public_unlock");
        this._unlockImg.width = 131;
        this._unlockImg.height = 86;
        this._unlockImg.x = bg.x + bg.width - this._unlockImg.width - 10;
        this._unlockImg.y = bg.y + bg.height / 2 - this._unlockImg.height / 2;
        this.addChild(this._unlockImg);
        this.refreshUI();
    };
    WifebattleStudyScrollItem.prototype.refreshUI = function () {
        // let lv = Api.studyatkVoApi.getStudySkillInfoLv();
        var statusNum = Api.wifestatusVoApi.getStatusWifeNum();
        var itemHaveNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.itemCostID);
        var curLv = Api.wifebattleVoApi.wifebattleVo.info.ylinfo ? Api.wifebattleVoApi.wifebattleVo.info.ylinfo.lv : 0;
        var needStatusNum = this._data.wifeStatusNum;
        var itemNeedNum = this._data.itemCost;
        var isUnlock = false;
        if (statusNum >= needStatusNum && curLv >= Number(this._data.id - 1)) {
            isUnlock = true;
        }
        if (isUnlock) {
            if (curLv >= Number(this._data.id)) {
                this._flagImg.visible = true;
                this._btn.visible = false;
            }
            else {
                this._flagImg.visible = false;
                this._btn.visible = true;
            }
            this._unlockImg.visible = false;
            this._unlockTF.visible = false;
            this._mask.visible = false;
        }
        else {
            this._flagImg.visible = false;
            this._btn.visible = false;
            this._unlockImg.visible = true;
            this._unlockTF.visible = true;
            this._mask.visible = true;
        }
        // if(lv == this._idx)
        // {
        // 	this._btn.visible = true;
        // 	this._flagImg.visible = false;
        // 	this.getChildByName("bookTxt2").visible = true;
        // 	if(this._mask)
        // 		this._mask.visible = false;
        // }else if (lv > this._idx)
        // {
        // 	if(this._btn)
        // 		this._btn.visible = false;
        // 	if(this._mask)
        // 		this._mask.visible = false;
        // 	this._flagImg.texture = ResourceManager.getRes("public_grasp");
        // 	this._flagImg.visible = true;
        // 	this.getChildByName("bookTxt2").visible = true;
        // }else if (lv < this._idx)
        // {
        // 	if(this._mask)
        // 		this._mask.visible = true;
        // 	this._btn.visible = false;
        // 	this._flagImg.texture = ResourceManager.getRes("public_unlock");
        // 	this._flagImg.visible = true;
        // 	this.getChildByName("bookTxt2").visible = false;
        // }
    };
    WifebattleStudyScrollItem.prototype.btnHandler = function () {
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.itemCostID);
        // let cfgData = Config.StudyatkCfg.getStudyatkCfgById(String(this._idx +1));
        if (itemNum < this._data.itemCost) {
            App.CommonUtil.showTip(LanguageManager.getlocal('wifeBattleStudy_upgradeTip'));
            return;
        }
        // StudyatkBookScrollItem.lastUpgradeBookId = cfgData.ability;
        // StudyatkBookScrollItem.lastUpgradeIdx = this._idx;
        //test---
        WifebattleStudyPopupView.lastUpgradeId = this._data.id;
        NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_YONGLEUP, {});
    };
    WifebattleStudyScrollItem.prototype.getStars = function (num) {
        var objContainer = new BaseDisplayObjectContainer;
        for (var index = 1; index <= num; index++) {
            var starImg = BaseBitmap.create("servant_star");
            starImg.setScale(0.5);
            starImg.x = (index - 1) * starImg.width * 0.5;
            starImg.y = 0;
            objContainer.addChild(starImg);
        }
        return objContainer;
    };
    WifebattleStudyScrollItem.prototype.upgradeCallback = function (event) {
        var rData = event.data.data;
        if (rData.ret == 0) {
            this.refreshUI();
        }
    };
    // public getSpaceX():number
    // {
    // 	return 0;
    // }
    // public getSpaceY():number
    // {
    // 	return 20;
    // }
    WifebattleStudyScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFEBATTLE_YONGLEUP), this.upgradeCallback, this);
        this._idx = null;
        this._flagImg = null;
        this._btn = null;
        this._mask = null;
        this._unlockTF = null;
        this._unlockImg = null;
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    WifebattleStudyScrollItem.lastUpgradeBookId = "";
    WifebattleStudyScrollItem.lastUpgradeIdx = -1;
    return WifebattleStudyScrollItem;
}(ScrollListItem));
__reflect(WifebattleStudyScrollItem.prototype, "WifebattleStudyScrollItem");
