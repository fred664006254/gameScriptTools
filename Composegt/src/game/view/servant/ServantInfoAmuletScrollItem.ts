/**
 * 门客信息,突破技能
 * author yanyuling
 * date 2017/11/21
 * @class ServantInfoAmuletScrollItem
 */

class ServantInfoAmuletScrollItem extends ScrollListItem
{
    public static servantId = "";
	private _auarKey:string = "";
	private _levelupTipStr = "";
	private _itemList:RewardItemVo[] = [];
	private _isRequsting:boolean = false;

	private _amuid:string = "";
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any)
    {
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAMUAURA),this.refreshAfterLv,this);
        let auarKey = data;
		this._auarKey = auarKey;
		this._amuid = data;

        let bottomBg = BaseBitmap.create("public_listbg");
        bottomBg.width = 592;
        bottomBg.height = 138;
        bottomBg.y = 0;
        this.addChild(bottomBg);
		
		let leftBg = BaseBitmap.create("public_left");
        leftBg.width = 129;
        leftBg.height = bottomBg.height-19;
        leftBg.x =  5.5;
        leftBg.y =  5.5; 
        this.addChild(leftBg); 


		let auraList = Config.ServantCfg.getServantItemById(ServantInfoFourItemScrollItem.servantId).aura || [];
		let skin_auraList = Api.servantVoApi.getServantObj(ServantInfoFourItemScrollItem.servantId).getAllSkinAuraList();

		// let seramu = Api.amuletVoApi.getAmuListBySerId(ServantInfoFourItemScrollItem.servantId);
		// let amuletList = seramu.amuletList || []
		let amuletcfg = Config.AmuletCfg.getAmucfgIndex(this._amuid);
		let auraIcon = "servant_aura_Icon" + amuletcfg.iconID; 
		// if(auraList[this._auarKey] ){
		// 	auraIcon = auraList[this._auarKey].auraIcon;
		// }else if(skin_auraList[this._auarKey]){
		// 	auraIcon = skin_auraList[this._auarKey].auraIcon
		// }
		let icon = BaseLoadBitmap.create(auraIcon);
		icon.width = icon.height = 100;
		icon.x = 20;
		icon.y = leftBg.y+6.5;
		icon.width = icon.height = 108;
		this.addChild(icon);

		let _ruleBtn = ComponentManager.getButton("btn_rule","",this.lvBtnHandler,this);
		_ruleBtn.x = icon.x + icon.width - _ruleBtn.width/2+10;
		_ruleBtn.y = 3;
		_ruleBtn.setScale(0.5);
		this.addChild(_ruleBtn);

		let servantNameBg =  BaseBitmap.create("servant_biaoti2");
        this.addChild(servantNameBg)
        servantNameBg.x = icon.x + icon.width + 30;
        servantNameBg.y = 5;
        servantNameBg.width= 185; 

        let skillName = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        skillName.textColor = TextFieldConst.COLOR_BROWN_NEW;
        skillName.x = icon.x + icon.width + 50;
        skillName.y = icon.y+3;
		skillName.name = "skillName";
        this.addChild(skillName);

		let curValueTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
        curValueTxt.x = skillName.x;
        curValueTxt.y = skillName.y + 35;
        this.addChild(curValueTxt);
		curValueTxt.name = "curValueTxt";

        let nextValueTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
        nextValueTxt.x = skillName.x;
        nextValueTxt.y = curValueTxt.y + 25;
        this.addChild(nextValueTxt);
		nextValueTxt.name = "nextValueTxt";
		
		let upNeedTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
        upNeedTxt.x = skillName.x;
        upNeedTxt.y = nextValueTxt.y + 25;
        this.addChild(upNeedTxt);
		upNeedTxt.name = "upNeedTxt";

		let goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"servantFour_goBtn",this.goBtnHandler,this);
		goBtn.x = bottomBg.x + bottomBg.width - 140;
		goBtn.y = bottomBg.y + bottomBg.height/2 - goBtn.height/2;
		goBtn.visible = false;
		this.addChild(goBtn);
		goBtn.name = "goBtn"

		let topLvTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillMaxShow"),TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WARN_RED);
		topLvTxt.x = goBtn.x + goBtn.width/2 - topLvTxt.width/2-10;
		topLvTxt.y = goBtn.y + goBtn.height/2 - topLvTxt.height/2-40;
		topLvTxt.visible = false;
		topLvTxt.name = "topLvTxt";
		this.addChild(topLvTxt);

		this.refreshAfterLv(); 
	}

	public lvBtnHandler()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.SERVANTINFOAMULETLVPOPUPVIEW,{amuId:this._amuid});
	}
	protected refreshAfterLv(event?:egret.Event)
	{	
		if(event && !this._isRequsting)
		{
			this._isRequsting = false;
			return;
		}
		let servantId = ServantInfoFourItemScrollItem.servantId;
		let servantObj = Api.servantVoApi.getServantObj(servantId);
		if(event && event.data.data.ret == 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
			if( ! servantObj.isShowRedForAmuletAura() ){
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST);
			}
		}
		
		let servantcfg = Config.ServantCfg.getServantItemById(servantId);
		let auraList = servantcfg.aura || [];
		let skin_auraList = servantObj.getAllSkinAuraList();


		let amuAuraList = servantObj.getAmuletAuraList();
		let auraV =  amuAuraList[this._amuid];
		let amuletcfg = Config.AmuletCfg.getAmucfgIndex(this._amuid);
		let curData = amuletcfg.amuletEffect;
		let amuBasecfg = Config.AmuletaruaCfg.getAmuletAuraItemById(this._amuid);

		let skillName = <BaseTextField>this.getChildByName("skillName");
		let curValueTxt = <BaseTextField>this.getChildByName("curValueTxt");
		let nextValueTxt = <BaseTextField>this.getChildByName("nextValueTxt");
		let upNeedTxt = <BaseTextField>this.getChildByName("upNeedTxt");
		let goBtn = this.getChildByName("goBtn");
		let topLvTxt = this.getChildByName("topLvTxt");

        //是否解锁
		let str1 = ""
		let str2 = ""
		let str3 = ""
		let attStr = ""

		if(curData.att.length == 4){
			attStr = LanguageManager.getlocal("wifeSkillAllAttAdd");
		}else{
			for (var index1 = 0; index1 < curData.att.length; index1++) {
				var element = curData.att[index1];
				if(index1 == 0){
					attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
				}else{
					attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
				}
			}
			attStr = attStr + LanguageManager.getlocal("wifeSkillAttAdd");
		}
		
		let addNum1 = "";
		let addNum2 = "";
		let nextLvAdd = 1;

		this._levelupTipStr = "";
		let attrLvList =  amuBasecfg.attrLvList;
		let attEffect = amuBasecfg.attEffect;
		addNum1 = (attrLvList[auraV-1].attEffect * 100 ).toFixed(1) + "%";

		str1  = LanguageManager.getlocal("servant_fourlevelupTxt1",[ attStr + addNum1]);
		let goBtnAvaiable = false;
		let isAtTopLv = false;
		
		let amuName = LanguageManager.getlocal("servant_amuletAura_" + this._amuid);
		if(curData.growNeed1 && curData.growNeed1.length > 0){
			goBtnAvaiable = false;
			//是否满级,满级则隐藏该行
			if( auraV >= curData.maxLv){
				isAtTopLv = true;
				nextLvAdd = 0;
				str3 = "";
				str2  = LanguageManager.getlocal("servant_fourlevelupTxt2",[ LanguageManager.getlocal("servant_fourlevelupTxt5")]);
			}else
			{
				let auraVStr = "" + auraV;
				let sid = curData.growNeed1[ auraVStr ];
				let str4 = LanguageManager.getlocal("servant_fourPeopleaura"+(curData.auraIcon));
				let tmpStr = LanguageManager.getlocal("servantWife_fourUpCost2",[""+(auraV+1),auraVStr,""+(auraV+1),str4]);
				str3 = LanguageManager.getlocal("servant_fourlevelupTxt7",[tmpStr]);

				// str3 = LanguageManager.getlocal("servant_fourlevelupTxt2",[LanguageManager.getlocal("servant_name"+sid)]);
			}
		}
		else{
			goBtnAvaiable = true;
			
			if(auraV >= attrLvList.length){
				isAtTopLv = true;
				str3 = "";
				str2  = LanguageManager.getlocal("servant_fourlevelupTxt2",[ LanguageManager.getlocal("servant_fourlevelupTxt5")]);
			}else
			{
				addNum2 = ( attrLvList[auraV ].attEffect * 100 ).toFixed(1) + "%";
				str2  = LanguageManager.getlocal("servant_fourlevelupTxt2",[attStr + addNum2]);
				let ownNum = Api.amuletVoApi.getAmuletNum(servantId);
				let lvinfo = attrLvList[auraV-1];
				let nextLvinfo = attrLvList[auraV];
				if (ownNum < nextLvinfo.update )
				{
					this._levelupTipStr = LanguageManager.getlocal("servant_amuletAura_lvtip");
					str3 = LanguageManager.getlocal("servant_fourlevelupTxt8",[amuName, ownNum + "/"+nextLvinfo.update]) ;
				}else{
					str3 = LanguageManager.getlocal("servant_fourlevelupTxt9",[amuName, ownNum + "/"+nextLvinfo.update]) ;
				}
			}
		}

        let nameStr =  LanguageManager.getlocal("servant_fourPeopleaura"+amuletcfg.iconID) + " Lv : "+ auraV ;
		
        skillName.text = nameStr;
		curValueTxt.text = str1;
		nextValueTxt.text = str2;
		upNeedTxt.text = str3;

		if(isAtTopLv){
			topLvTxt.visible = true;
			goBtn.visible = false;
		}else{
			topLvTxt.visible = false;
			if (goBtnAvaiable)
			{
			goBtn.visible = true;
			}else{
				goBtn.visible = false;
			}
		}
    }

	protected doRequest()
	{
		let servantId = ServantInfoFourItemScrollItem.servantId;
		let auarKey = this._auarKey;
		this._isRequsting = true;
		NetManager.request(NetRequestConst.REQUEST_SERVANT_UPAMUAURA,{amuletId:this._amuid})
		
	}
    protected goBtnHandler()
    {
		if (this._levelupTipStr != "")
		{
			App.CommonUtil.showTip(this._levelupTipStr);
			return;
		}
		this.doRequest();	

		// let itemInfo = this._itemList[0];
		// let itemcfg = Config.ItemCfg.getItemCfgById(itemInfo.id)
		// let tmpStr = itemInfo.name + "*" + itemInfo.num + " ";

		// let message: string = LanguageManager.getlocal("servant_fourlevelupTxt4", [tmpStr]);
		// let mesObj = {
		// 	 confirmCallback: this.doRequest, 
		// 	 handler: this, 
		// 	 icon:  itemcfg.icon, 
		// 	 iconBg: itemcfg.iconBg, 
		// 	 num: Api.itemVoApi.getItemNumInfoVoById(itemInfo.id), 
		// 	 msg: message ,
		// 	 id : itemInfo.id,
		// 	 useNum : itemInfo.num
		// };
		// ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj );		
		
	}
    public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAMUAURA),this.refreshAfterLv,this);
        this._auarKey =  null;
		this._isRequsting = false;
		super.dispose();
	}
}