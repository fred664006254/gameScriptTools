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
 * 门客详情 技能信息部分
 * author yanyuling
 * date 2017/11/20
 * @class ServantInfoSkillsItem
 */
var ServantInfoSkillsItem = (function (_super) {
    __extends(ServantInfoSkillsItem, _super);
    function ServantInfoSkillsItem() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._list = null;
        _this._list2 = null;
        return _this;
    }
    ServantInfoSkillsItem.prototype.init = function (servantId, bottomH) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL), this.refreshUIInfo, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL), this.refreshUIInfo, this);
        this._servantId = servantId;
        var cfg = Config.ServantCfg.getServantItemById(servantId);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.width = GameConfig.stageWidth;
        // this.addChild(this._nodeContainer);
        var listbg = BaseBitmap.create("servant_skillbg1");
        listbg.width = 590;
        this._nodeContainer.addChild(listbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, this._nodeContainer);
        //是否有特殊技能
        if (Config.ServantskillCfg.hasSpecialSkill(servantId)) {
            var listbg2 = BaseBitmap.create("servant_skillbg2");
            this._nodeContainer.addChild(listbg2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg2, this._nodeContainer);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, listbg2, [0, listbg2.height + 5]);
            var skillTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_specialskill"), 24, 0x410D00);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skillTxt, listbg2, [0, 19]);
            this._nodeContainer.addChild(skillTxt);
            var skillarr_1 = Config.ServantskillCfg.getSpecialSkill(servantId);
            var skilllist2 = ComponentManager.getScrollList(ServantSkillItem, skillarr_1, new egret.Rectangle(0, 0, Math.min(497, skillarr_1.length * 124), 101), this._servantId);
            this._nodeContainer.addChild(skilllist2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skilllist2, listbg2, [27 / 2, 62]);
            this._list2 = skilllist2;
        }
        var skillarr = [0, 1];
        var skilllist = ComponentManager.getScrollList(ServantSkillItem, skillarr, new egret.Rectangle(0, 0, Math.min(497, skillarr.length * 124), 101), this._servantId);
        this._nodeContainer.addChild(skilllist);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skilllist, listbg, [27 / 2, 0]);
        this._list = skilllist;
        // let baseY = 87;
        // let jineng = BaseBitmap.create("servant_jineng");  
        // this.addChild(jineng);
        // jineng.y = baseY - jineng.height/2;
        // jineng.x = 230;
        // this._skillExpTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_COMMON);  
        // this.addChild(this._skillExpTxt); 
        // let servantObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId)
        // this._skillExpTxt.text =  servantObj.skillExp+"";  
        // // this.setLayoutPosition(LayoutConst.verticalCenter,this._skillExpTxt,public_biaoti);
        // this._skillExpTxt.x = GameConfig.stageWidth/2 - this._skillExpTxt.width/2;
        // this._skillExpTxt.y = baseY - this._skillExpTxt.height/2;
        // let skillCfg = {};
        // let startY = 0;
        // for (var index = 0; index < 2 ; index++) 
        // {
        // 	let bottomBg = BaseBitmap.create("public_listbg3");
        // 	bottomBg.width = 599;
        // 	bottomBg.height = 138;
        // 	// bottomBg.x = 24;
        // 	bottomBg.x = GameConfig.stageWidth/2 - bottomBg.width/2;
        // 	bottomBg.y = startY;
        // 	this._nodeContainer.addChild(bottomBg);
        // 	// let leftBg = BaseBitmap.create("public_left");
        // 	// leftBg.width = 139;
        // 	// leftBg.height = 120;
        // 	// leftBg.x =  30;
        // 	// leftBg.y =  bottomBg.y + bottomBg.height/2 -leftBg.height/2-3; 
        // 	// this._nodeContainer.addChild(leftBg);
        // 	let skillIcon =  BaseLoadBitmap.create("servant_skill_icon" + (index+1));
        // 	skillIcon.width = 108;
        // 	skillIcon.height = 109;
        // 	skillIcon.x = bottomBg.x + 20;
        // 	skillIcon.y = bottomBg.y + bottomBg.height/2 -skillIcon.height/2 ;
        // 	this._nodeContainer.addChild(skillIcon);
        // 	// let servantNameBg =  BaseBitmap.create("servant_biaoti2");
        // 	// this._nodeContainer.addChild(servantNameBg)
        // 	// servantNameBg.x = 173;
        // 	// servantNameBg.y = skillIcon.y+5-10;
        // 	let skillName = ComponentManager.getTextField("",24);
        // 	// skillName.textColor = TextFieldConst.COLOR_QUALITY_ORANGE;
        // 	skillName.text = LanguageManager.getlocal("servant_skillname"+(index+1));
        // 	skillName.x = skillIcon.x + skillIcon.width + 30;
        // 	skillName.y = skillIcon.y+2;  //18
        // 	skillName.textColor =TextFieldConst.COLOR_BROWN;
        // 	this._nodeContainer.addChild(skillName);
        // 	this._txtList.push(skillName);
        // 	// servantNameBg.width = skillName.textWidth+120;
        // 	let curValueTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        // 	curValueTxt.text = LanguageManager.getlocal("servant_skilllevelupTxt1",["100"]);
        // 	curValueTxt.x = skillIcon.x + skillIcon.width + 30;
        // 	curValueTxt.y = skillName.y + 32;
        // 	curValueTxt.textColor =TextFieldConst.COLOR_BROWN;
        // 	this._nodeContainer.addChild(curValueTxt);
        // 	this._txtList.push(curValueTxt);
        // 	let nextValueTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        // 	nextValueTxt.text = LanguageManager.getlocal("servant_skilllevlupTxt2",["100"]);
        // 	nextValueTxt.x = curValueTxt.x;
        // 	nextValueTxt.y = curValueTxt.y + 25;
        // 	nextValueTxt.textColor =TextFieldConst.COLOR_BROWN;
        // 	this._nodeContainer.addChild(nextValueTxt);
        // 	this._txtList.push(nextValueTxt);
        // 	let costValueTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        // 	costValueTxt.text = LanguageManager.getlocal("servant_skilllevelupTxt3",["100"]);
        // 	costValueTxt.x = curValueTxt.x;
        // 	costValueTxt.y = nextValueTxt.y + 25;
        // 	costValueTxt.textColor =TextFieldConst.COLOR_BROWN;
        // 	this._nodeContainer.addChild(costValueTxt);
        // 	this._txtList.push(costValueTxt);
        // 	let upgradeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"servantInfoLevelup",this.servantSkillLevelupHandler,this,[index]);
        // 	upgradeBtn.x = bottomBg.x + bottomBg.width - 165+20;
        // 	upgradeBtn.y = bottomBg.y + bottomBg.height/2 - upgradeBtn.height/2;
        // 	upgradeBtn.scaleX =1;
        // 	upgradeBtn.scaleY =1;
        // 	this._nodeContainer.addChild(upgradeBtn);
        // 	upgradeBtn.name = "upgradeBtn"+(index+1);
        // 	startY += bottomBg.height +5;
        // 	let topLvTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillMaxShow"),TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WARN_RED);
        // 	topLvTxt.x = upgradeBtn.x + upgradeBtn.width/2 - topLvTxt.width/2;
        // 	topLvTxt.y = upgradeBtn.y + upgradeBtn.height/2 - topLvTxt.height/2;
        // 	topLvTxt.visible = false;
        // 	topLvTxt.name = "topLvTxt"+(index+1);
        // 	this._nodeContainer.addChild(topLvTxt);
        // }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomH - 145 - 25);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = 120;
        this.addChild(scrollView);
        // this.refreshUIInfo();
    };
    ServantInfoSkillsItem.prototype.refreshUIInfo = function (event) {
        var servantObj = Api.servantVoApi.getServantObj(this._servantId);
        if (!servantObj) {
            return;
        }
        if (event && event.data.data.ret == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
        }
        if (this._list2) {
            var skillarr = Config.ServantskillCfg.getSpecialSkill(this._servantId);
            this._list2.refreshData(skillarr, this._servantId);
        }
        if (this._list) {
            var skillarr = [0, 1];
            this._list.refreshData(skillarr, this._servantId);
        }
    };
    // protected refreshUIInfo(event?:egret.Event)
    // {
    // 	let servantObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
    // 	if(!servantObj){
    // 		return;
    // 	}
    // 	if(event && event.data.data.ret == 0)
    // 	{
    // 		App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
    // 	}
    // 	let upgradeBtn1 = this._nodeContainer.getChildByName("upgradeBtn1");
    // 	let upgradeBtn2 = this._nodeContainer.getChildByName("upgradeBtn2");
    // 	App.DisplayUtil.changeToNormal(upgradeBtn1);
    // 	App.DisplayUtil.changeToNormal(upgradeBtn2);
    // 	this._upTipStr = "";
    // 	this._lv1TipStr = "";
    // 	this._lv2TipStr = "";
    //     let baseCfg = GameConfig.config.servantbaseCfg
    // 	let skillUpgradeExp:number[] = baseCfg.skillUpgradeExp; 
    // 	let maxLv =  baseCfg.skillLvLimit; 
    // 	this._skillExpTxt.text =  servantObj.skillExp+"";  
    // 	this._skillExpTxt.x = 375;
    // 	let txt4 = LanguageManager.getlocal("servant_skilllevelupTxt4");
    // 	let txt5 = LanguageManager.getlocal("servant_skilllevelupTxt5");
    // 	let skill = Api.servantVoApi.getServantObj(this._servantId).skill;
    // 	let lv1:number= skill[0];
    // 	let lv2:number = skill[1];
    // 	let skillValue1:number = GameConfig.config.servantbaseCfg.skillValue1 *100;
    // 	let skillValue2:number = GameConfig.config.servantbaseCfg.skillValue2 *100;
    // 	if( lv1== maxLv)
    // 	{
    // 		upgradeBtn1.visible = false;
    // 		this._nodeContainer.getChildByName("topLvTxt1").visible = true;
    // 		App.DisplayUtil.changeToGray(upgradeBtn1);
    // 		this._lv1TipStr = LanguageManager.getlocal("servant_skilllevelupTip2");
    // 		this._txtList[3].visible = false
    // 		this._txtList[2].text = LanguageManager.getlocal("servant_skilllevelupTxt2",[LanguageManager.getlocal("servant_skilllLvTop"),""]);
    // 	}else{
    // 		this._txtList[3].text = LanguageManager.getlocal("servant_skilllevelupTxt3",[String(skillUpgradeExp[lv1-1]),txt4]);
    // 		this._txtList[2].text = LanguageManager.getlocal("servant_skilllevelupTxt2",[(skillValue1*(lv1+1)).toFixed(2) +"%",txt4]);
    // 	}
    // 	if( lv2== maxLv)
    // 	{
    // 		upgradeBtn2.visible = false;
    // 		this._nodeContainer.getChildByName("topLvTxt2").visible = true;
    // 		App.DisplayUtil.changeToGray(upgradeBtn2);
    // 		this._lv2TipStr = LanguageManager.getlocal("servant_skilllevelupTip2");
    // 		this._txtList[7].visible = false;
    // 		this._txtList[6].text = LanguageManager.getlocal("servant_skilllevelupTxt2",[LanguageManager.getlocal("servant_skilllLvTop"),""]);
    // 	}else{
    // 		this._txtList[7].text = LanguageManager.getlocal("servant_skilllevelupTxt3",[String(skillUpgradeExp[lv2-1]),txt5]);
    // 		this._txtList[6].text = LanguageManager.getlocal("servant_skilllevelupTxt2",[(skillValue2*(lv2+1)+100).toFixed(0) +"%",txt5]);
    // 	}
    // 	this._txtList[0].text = LanguageManager.getlocal("servant_skillname1") + " Lv: "+String(lv1);
    // 	this._txtList[1].text = LanguageManager.getlocal("servant_skilllevelupTxt1",[(skillValue1*lv1).toFixed(2) +"%",txt4]);
    // 	this._txtList[4].text = LanguageManager.getlocal("servant_skillname2") + " Lv: "+String(lv2);
    // 	this._txtList[5].text = LanguageManager.getlocal("servant_skilllevelupTxt1",[(skillValue2*lv2 +100).toFixed(0) +"%",txt5]);
    // 	// this._txtList[6].text = LanguageManager.getlocal("servant_skilllevelupTxt2",[(skillValue2*(lv2+1)).toFixed(2) +"%",txt5]);
    // 	let skillExp =  servantObj.skillExp;
    // 	if (skillExp < skillUpgradeExp[lv1-1] && this._lv1TipStr == "")
    // 	{
    // 		App.DisplayUtil.changeToGray(upgradeBtn1);
    // 		this._lv1TipStr = LanguageManager.getlocal("servant_skilllevelupTip1");
    // 	}
    // 	if (skillExp < skillUpgradeExp[lv2-1] && this._lv2TipStr == "")
    // 	{
    // 		App.DisplayUtil.changeToGray(upgradeBtn2);
    // 		this._lv2TipStr = LanguageManager.getlocal("servant_skilllevelupTip1");
    // 	}
    // 	// {
    // 	// 	this._nodeContainer.getChildByName("topLvTxt1").visible = false;
    // 	// }
    // }
    // private servantSkillLevelupHandler(params:any)
    // {
    // 	if (this._lv1TipStr != ""  && params == 0)
    // 	{
    // 		App.CommonUtil.showTip(this._lv1TipStr);
    // 		return;
    // 	}
    // 	if (this._lv2TipStr != ""  && params == 1)
    // 	{
    // 		App.CommonUtil.showTip(this._lv2TipStr);
    // 		return;
    // 	}
    // 	// if (this._upTipStr != "")
    // 	// {
    // 	// 	App.CommonUtil.showTip(this._upTipStr);
    // 	// 	return;
    // 	// }
    // 	NetManager.request(NetRequestConst.REQUEST_SERVANT_UPSKILL,{servantId:this
    // 	._servantId,pos:params})
    // }
    ServantInfoSkillsItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL), this.refreshUIInfo, this);
        this._list = null;
        this._servantId = null;
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return ServantInfoSkillsItem;
}(BaseDisplayObjectContainer));
__reflect(ServantInfoSkillsItem.prototype, "ServantInfoSkillsItem");
