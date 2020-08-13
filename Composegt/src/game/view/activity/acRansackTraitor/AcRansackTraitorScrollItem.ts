/**
 * 门客信息,突破技能
 * author yanyuling
 * date 2017/11/21
 * @class ServantInfoFourItemScrollItem
 */

class AcRansackTraitorScrollItem extends BaseDisplayObjectContainer
{
    public static servantId = "";
	private _auarKey:string = "";
	private _levelupTipStr = "";
	private _itemList:RewardItemVo[] = [];
	private _isRequsting:boolean = false;

	public constructor() 
	{
		super();
	}
	public init(data:string):void
	{
	// }
	// protected initItem(index:number,data:any)
    // {
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA),this.refreshAfterLv,this);
        let auarKey = data;
		this._auarKey = auarKey;

        let bottomBg = BaseBitmap.create("public_9v_bg09");
        bottomBg.width = 500;
        bottomBg.height = 133;
        bottomBg.y = 0;
        this.addChild(bottomBg);
		
		let leftBg = BaseBitmap.create("public_left");
        leftBg.width = 129;
        leftBg.height = bottomBg.height-15;
        leftBg.x =  5.5;
        leftBg.y =  5.5; 
        this.addChild(leftBg); 


		let auraList = Config.ServantCfg.getServantItemById(AcRansackTraitorScrollItem.servantId).aura || [];
		let skin_auraList = [];

		let auraIcon = undefined;
		if(auraList[this._auarKey] ){
			auraIcon = auraList[this._auarKey].auraIcon;
		}else if(skin_auraList[this._auarKey]){
			auraIcon = skin_auraList[this._auarKey].auraIcon
		}
		let icon = BaseLoadBitmap.create("servant_aura_Icon"+ auraIcon);
		icon.x = 14;
		icon.y = leftBg.y+6.5;
		icon.width = icon.height = 108;
		this.addChild(icon);
		
		let servantNameBg =  BaseBitmap.create("servant_biaoti2");
        this.addChild(servantNameBg);
		servantNameBg.visible = false;
        servantNameBg.x = icon.x + icon.width + 30;
        servantNameBg.y = 5;
        servantNameBg.width= 185; 

        let skillName = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        skillName.textColor = TextFieldConst.COLOR_BROWN;
        skillName.x = icon.x + icon.width + 30;
        skillName.y = icon.y+3;
		skillName.name = "skillName";
        this.addChild(skillName);

		let curValueTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        curValueTxt.x = skillName.x;
        curValueTxt.y = skillName.y + 35;
        this.addChild(curValueTxt);
		curValueTxt.name = "curValueTxt";

        let nextValueTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        nextValueTxt.x = skillName.x;
        nextValueTxt.y = curValueTxt.y + 25;
        this.addChild(nextValueTxt);
		nextValueTxt.name = "nextValueTxt";
		
		let upNeedTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        upNeedTxt.x = skillName.x;
        upNeedTxt.y = nextValueTxt.y + 25;
        this.addChild(upNeedTxt);
		upNeedTxt.name = "upNeedTxt";

		this.refreshAfterLv(); 
	}

	protected refreshAfterLv(event?:egret.Event)
	{	
		let servantId = AcRansackTraitorScrollItem.servantId;
		let servantcfg = Config.ServantCfg.getServantItemById(servantId);
		let auraList = servantcfg.aura || [];
		let skin_auraList = [];

		let curData = undefined;
		let auraV = 0;
		if(auraList[this._auarKey] ){
			curData = auraList[this._auarKey];
		}else if(skin_auraList[this._auarKey]){
			curData = skin_auraList[this._auarKey]
		}

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
		
		let add1 = ""
		let addNum1 = "";
		let addNum2 = "";
		let nextLvAdd = 1;

		if(curData.growAtt < 1){
			addNum1 = (curData.growAtt*100* auraV) + "%"
			addNum2 = (curData.growAtt*100*( auraV +nextLvAdd)) + "%"
		}else{
			addNum1 = (curData.growAtt* auraV ).toString();
			addNum2 = (curData.growAtt*( auraV + nextLvAdd)).toString();
		}
		add1 = addNum1;
		str1  = LanguageManager.getlocal("servant_fourlevelupTxt1",[ attStr + addNum1]);
		str2  = LanguageManager.getlocal("servant_fourlevelupTxt2",[attStr + addNum2]);
		
		let goBtnAvaiable = false;
		let isAtTopLv = false;
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
		// else if (curData.lvUpDemand){
		// 	if(auraV >= curData.maxLv){
		// 		isAtTopLv = true;
		// 		str3 = "";
		// 		this._levelupTipStr = LanguageManager.getlocal("servant_skilllevelupTip2");
		// 		str2  = LanguageManager.getlocal("servant_fourlevelupTxt2",[ LanguageManager.getlocal("servant_fourlevelupTxt5")]);
		// 	}else
		// 	{
		// 		let tmpStr = "";
		// 		let lvUpDemand = curData.lvUpDemand;
		// 		for (let index = 0; index < lvUpDemand.length; index++) {
		// 			let aurInfo  = lvUpDemand[index].split("_");
		// 			let preinfo = auraList[aurInfo[0]];
		// 			tmpStr += LanguageManager.getlocal("servant_fourPeopleaura"+preinfo.auraIcon ) + LanguageManager.getlocal("ransackTraitor_txt5",[aurInfo[1]]);
		// 		}
		// 		str3 = LanguageManager.getlocal("servant_fourlevelupTxt7",[tmpStr]) ;
		// 	}
		// }
		else{
			this._levelupTipStr = "";
			goBtnAvaiable = true;
			if(auraV >= curData.maxLv){
				isAtTopLv = true;
				str3 = "";
				this._levelupTipStr = LanguageManager.getlocal("servant_skilllevelupTip2");
				str2  = LanguageManager.getlocal("servant_fourlevelupTxt2",[ LanguageManager.getlocal("servant_fourlevelupTxt5")]);
			}else
			{
				let itemList:RewardItemVo[] = GameData.formatRewardItem(curData.growNeed2);
				this._itemList = itemList;
				let item:RewardItemVo = this._itemList[0];
				// for (var index = 0; index < itemList.length; index++) {
					// let item:RewardItemVo = itemList[index];
					let ownNum = Api.itemVoApi.getItemNumInfoVoById(item.id);
					str3 += item.name + "("+ ownNum +"/" +item.num+ ")  ";
					if (ownNum < item.num && this._levelupTipStr == "")
					{
						this._levelupTipStr = LanguageManager.getlocal("servant_bookUpTip1");
						if(skin_auraList[this._auarKey]){
							this._levelupTipStr = LanguageManager.getlocal("servant_skilllevelupTip3");
						}
						str3 = LanguageManager.getlocal("servant_fourlevelupTxt3",[str3]) ;
					}else
					{
						str3 = LanguageManager.getlocal("servant_fourlevelupTxt6",[str3]) ;
					}
				// }
			}
		}

        let nameStr = LanguageManager.getlocal("servant_fourPeopleaura" + curData.auraIcon) + " Lv : "+ auraV ;
		
        skillName.text = nameStr;
		curValueTxt.text = str2;//"";// str1;
		nextValueTxt.text = "";//str2;
		upNeedTxt.text = "";// str3;
    }

	protected doRequest()
	{
		let servantId = ServantInfoFourItemScrollItem.servantId;
		let auarKey = this._auarKey;
		this._isRequsting = true;
		NetManager.request(NetRequestConst.REQUEST_SERVANT_UPAURA,{auraId:auarKey,servantId:servantId})
		
	}
    protected goBtnHandler()
    {
		if (this._levelupTipStr != "")
		{
			App.CommonUtil.showTip(this._levelupTipStr);
			return;
		}

		let itemInfo = this._itemList[0];
		let itemcfg = Config.ItemCfg.getItemCfgById(itemInfo.id)
		let tmpStr = itemInfo.name + "*" + itemInfo.num + " ";

		let message: string = LanguageManager.getlocal("servant_fourlevelupTxt4", [tmpStr]);
		let mesObj = {
			 confirmCallback: this.doRequest, 
			 handler: this, 
			 icon:  itemcfg.icon, 
			 iconBg: itemcfg.iconBg, 
			 num: Api.itemVoApi.getItemNumInfoVoById(itemInfo.id), 
			 msg: message ,
			 id : itemInfo.id,
			 useNum : itemInfo.num
		};
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj );		
		
	}
    public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA),this.refreshAfterLv,this);
        this._auarKey =  null;
		this._isRequsting = false;
		super.dispose();
	}
}