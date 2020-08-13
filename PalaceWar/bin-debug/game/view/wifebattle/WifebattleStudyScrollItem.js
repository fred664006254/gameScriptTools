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
        //let curLv = Api.wifebattleVoApi.wifebattleVo.info.ylinfo?Api.wifebattleVoApi.wifebattleVo.info.ylinfo.lv:0;
        // let studyItemCfg:Config.WifebattleStudyItemCfg = Config.WifebattleCfg.getWifeStudyCfgById(curLv + 1);
        this._data = data;
        this._idx = index;
        var cfgData = data;
        var ability = GameConfig.config.abilityCfg[cfgData.abilityID];
        var bg = BaseBitmap.create("wifebattleyonglelistbg");
        bg.scaleX = (bg.width - 20) / bg.width;
        this.height = bg.height + this.getSpaceY();
        this.addChild(bg);
        // let leftBg = BaseBitmap.create("public_left");
        // leftBg.width = 110;
        // leftBg.height = 120.5;
        // leftBg.x = 11.5;
        // leftBg.y = 5.5;
        // this.addChild(leftBg);
        var servantcfg = Config.ServantCfg.getServantItemById(data.servantID);
        var attrIcon = BaseLoadBitmap.create(servantcfg.halfIcon);
        attrIcon.width = 180;
        attrIcon.height = 177;
        attrIcon.setScale(0.68);
        attrIcon.x = bg.x + 5;
        attrIcon.y = bg.y + bg.height / 2 - attrIcon.height * attrIcon.scaleY / 2;
        this.addChild(attrIcon);
        var namebg = BaseBitmap.create("wifebattleyongletitlebg");
        this.addChild(namebg);
        namebg.x = 140;
        namebg.y = 20;
        // wifeBattleStudy_name
        var name = LanguageManager.getlocal("wifeBattleStudy_name", [String(Number(this._data.id) + 1), LanguageManager.getlocal("servant_attrNameTxt" + data.abilityID), servantcfg.name]);
        var strCfg = [
            {
                txt: LanguageManager.getlocal("wifeBattleStudy_expplus", [servantcfg.name, LanguageManager.getlocal("servant_attrNameTxt" + data.abilityID)])
            },
            {
                txt: LanguageManager.getlocal("wifeBattleStudy_needtxt", [String(TextFieldConst.COLOR_WARN_RED2), data.unlock.toString()])
            },
            {
                txt: LanguageManager.getlocal("wifeBattleStudy_unlock", [cfgData.unlock.toString()])
            }
        ];
        // let startX = nameBg.x;
        // let startY = nameBg.y + nameBg.height/2;
        var nameTF = ComponentManager.getTextField(name, 20, TextFieldConst.COLOR_QUALITY_GREEN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF, namebg);
        this.addChild(nameTF);
        // this._unlockTF = ComponentManager.getTextField(strCfg[2].txt,20,TextFieldConst.COLOR_WARN_RED);
        // this._unlockTF.x = nameTF.x + nameTF.width + 10;
        // this._unlockTF.y = nameTF.y + nameTF.height/2 - this._unlockTF.height/2;
        // this.addChild(this._unlockTF); 
        var bookTxt1 = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        bookTxt1.text = strCfg[0].txt;
        bookTxt1.x = namebg.x;
        bookTxt1.y = namebg.y + namebg.height + 10;
        bookTxt1.name = "bookTxt" + 0;
        this.addChild(bookTxt1);
        var bookTxt2 = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        bookTxt2.text = strCfg[1].txt;
        bookTxt2.x = bookTxt1.x;
        bookTxt2.y = bookTxt1.y + bookTxt1.height + 10;
        bookTxt2.name = "bookTxt" + 1;
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
        //wifebattleyonglestudybtn
        var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "wifeBattleStudyBtn", this.btnHandler, this);
        btn.x = bg.x + bg.width * bg.scaleX - btn.width - 10;
        btn.y = bg.y + bg.height - btn.height - 20;
        if (PlatformManager.checkIsTextHorizontal()) {
            // btn.x = bg.x + bg.width*bg.scaleX -btn.width - 13;
            // btn.y = bg.y + bg.height/2 - btn.height/2 - 32;
            btn.x = bg.x + bg.width * bg.scaleX - btn.width - 10;
            btn.y = bg.y + bg.height - btn.height - 20;
        }
        if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()) {
            btn.y = bg.y + bg.height - btn.height - 10;
        }
        btn.visible = false;
        btn.name = "btn";
        this.addChild(btn);
        this._btn = btn;
        var icon = BaseBitmap.create("wifebattleyonglestudybtn");
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, btn, [0, -icon.height]);
        this.addChild(icon);
        icon.name = "icon";
        if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, btn, [0, -icon.height - 10]);
        }
        var have = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.costItem);
        var needTxt = ComponentManager.getTextField(cfgData.costNum + "/<font color=" + (have >= cfgData.costNum ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED2) + ">" + have + "</font>", 18, TextFieldConst.COLOR_BLACK);
        this.addChild(needTxt);
        needTxt.name = "needTxt";
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, needTxt, icon, [icon.width, 0]);
        var flagImg = BaseBitmap.create("wifebattleview_study");
        flagImg.width = 131;
        flagImg.height = 86;
        flagImg.x = bg.x + bg.width * bg.scaleX - flagImg.width - 10;
        flagImg.y = bg.y + bg.height / 2 - flagImg.height / 2;
        this.addChild(flagImg);
        this._flagImg = flagImg;
        var mask = BaseBitmap.create("public_9_viewmask");
        mask.width = bg.width * bg.scaleX;
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
        this._unlockImg.x = bg.x + bg.width * bg.scaleX - this._unlockImg.width - 10;
        this._unlockImg.y = bg.y + bg.height / 2 - this._unlockImg.height / 2;
        this.addChild(this._unlockImg);
        this.refreshUI();
    };
    WifebattleStudyScrollItem.prototype.refreshUI = function () {
        // let lv = Api.studyatkVoApi.getStudySkillInfoLv();
        var statusNum = Api.wifestatusVoApi.getStatusWifeNum();
        var itemHaveNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.costItem);
        var curLv = Api.wifebattleVoApi.wifebattleVo.info.ylinfo ? Api.wifebattleVoApi.wifebattleVo.info.ylinfo.lv : 0;
        var needStatusNum = this._data.unlock;
        var itemNeedNum = this._data.costNum;
        var isUnlock = false;
        if (statusNum >= needStatusNum) {
            isUnlock = true;
        }
        var needTxt = this.getChildByName("needTxt");
        var icon = this.getChildByName("icon");
        if (isUnlock) {
            if (curLv >= (Number(this._data.id) + 1)) {
                this._flagImg.visible = true;
                this._btn.visible = false;
                needTxt.visible = false;
                icon.visible = false;
                App.CommonUtil.removeIconFromBDOC(this._btn);
            }
            else {
                this._flagImg.visible = false;
                this._btn.visible = true;
                needTxt.visible = true;
                icon.visible = true;
                if (curLv == (Number(this._data.id))) {
                    App.DisplayUtil.changeToNormal(this._btn);
                    if (itemHaveNum >= itemNeedNum) {
                        App.CommonUtil.addIconToBDOC(this._btn);
                    }
                }
                else {
                    App.DisplayUtil.changeToGray(this._btn);
                    App.CommonUtil.removeIconFromBDOC(this._btn);
                }
            }
            this._unlockImg.visible = false;
            this._mask.visible = false;
        }
        else {
            this._flagImg.visible = false;
            this._btn.visible = false;
            App.CommonUtil.removeIconFromBDOC(this._btn);
            this._unlockImg.visible = true;
            this._mask.visible = true;
            needTxt.visible = false;
            icon.visible = false;
        }
        var color1 = "";
        var color2 = "";
        if (itemHaveNum >= itemNeedNum) {
            color1 = String(TextFieldConst.COLOR_BROWN);
        }
        else {
            color1 = String(TextFieldConst.COLOR_WARN_RED2);
        }
        if (statusNum >= needStatusNum) {
            color2 = String(TextFieldConst.COLOR_BROWN);
        }
        else {
            color2 = String(TextFieldConst.COLOR_WARN_RED2);
        }
        var bookTxt1 = this.getChildByName("bookTxt1");
        bookTxt1.text = LanguageManager.getlocal("wifeBattleStudy_needtxt", [color2, this._data.unlock.toString()]);
        needTxt.text = itemNeedNum + "/<font color=" + (itemHaveNum >= itemNeedNum ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED2) + ">" + itemHaveNum + "</font>";
        var tmpx = (this._btn.width - needTxt.width - icon.width - 8) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, this._btn, [tmpx, -icon.height]);
        if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, this._btn, [tmpx, -icon.height - 10]);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, needTxt, icon, [icon.width, 0]);
        this._btn.setGray(itemHaveNum < itemNeedNum);
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
        // let itemNum = Api.wifebattleVoApi.getScore();
        var curLv = Api.wifebattleVoApi.wifebattleVo.info.ylinfo ? Api.wifebattleVoApi.wifebattleVo.info.ylinfo.lv : 0;
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.costItem);
        // let cfgData = Config.StudyatkCfg.getStudyatkCfgById(String(this._idx +1));
        if (itemNum < this._data.costNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal('wifeBattleStudy_upgradeTip'));
            return;
        }
        if (curLv < (Number(this._data.id))) {
            App.CommonUtil.showTip(LanguageManager.getlocal('wifeBattleStudy_upgradeTip2'));
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
            if (WifebattleStudyPopupView.lastUpgradeId == this._data.id) {
                var servantcfg = Config.ServantCfg.getServantItemById(this._data.servantID);
                ViewController.getInstance().openView(ViewConst.POPUP.WIFEBATTLEYONGLESUCCESSVIEW, {
                    sid: this._data.servantID,
                    text: LanguageManager.getlocal("wifeBattleStudy_expplus2", [LanguageManager.getlocal("servant_attrNameTxt" + this._data.abilityID)])
                });
                // 	SoundManager.playEffect(SoundConst.EFFECT_UPD); 
                // 	let upgradeClip = ComponentManager.getCustomMovieClip("servant_upgrade_frame",5,100);
                // 	upgradeClip.width = 213;
                // 	upgradeClip.height = 208;
                // 	upgradeClip.setScale(0.6);
                // 	App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, upgradeClip, this._btn, [0, -10]);
                // 	this.addChild(upgradeClip);
                // 	upgradeClip.playWithTime(-1);
                // //egret.Tween.get(servant_upgrade_word,{loop:false}).to({y:this._levelbg.y - 150},800).to({alpha:0},100);
                // 	let upBg = BaseBitmap.create("wifebattleyonglestudytxt")  ;
                // 	upBg.setScale(0.5);
                // 	this.addChild(upBg);
                // 	App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, upBg, this._btn, [0, 0]);
                // 	egret.Tween.get(upBg).to({y:this._btn.y - 30},700).call(
                // 		function(upBg:BaseBitmap){
                // 			BaseBitmap.release(upBg);
                // 			upBg = null;
                // 		},
                // 		this,
                // 		[upBg]
                // 	)
                // 	egret.Tween.get(this,{loop:false}).wait(500).call(function(){
                // 		//字体刷新加个延时
                // 		this.removeChild(upgradeClip);
                // 		upgradeClip = null;
                // 	});
            }
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
        this._unlockImg = null;
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    WifebattleStudyScrollItem.lastUpgradeBookId = "";
    WifebattleStudyScrollItem.lastUpgradeIdx = -1;
    return WifebattleStudyScrollItem;
}(ScrollListItem));
__reflect(WifebattleStudyScrollItem.prototype, "WifebattleStudyScrollItem");
//# sourceMappingURL=WifebattleStudyScrollItem.js.map