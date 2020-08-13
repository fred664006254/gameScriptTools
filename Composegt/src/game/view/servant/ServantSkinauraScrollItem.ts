/**
 * 门客皮肤头像
 * author yanyuling
 * date 2018/3/5
 * @class ServantSkinauraScrollItem
 */

class ServantSkinauraScrollItem extends BaseDisplayObjectContainer
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

	public init(skinId:string|number,auraId:string|number,serId:string)
    {
		this._auarKey = ""+auraId;
		let servantId = serId;//ServantInfoFourItemScrollItem.servantId;
		let servantObj = Api.servantVoApi.getServantObj(servantId);
		let servantcfg = Config.ServantCfg.getServantItemById(servantId);

        let bottomBg = BaseBitmap.create("public_9v_bg09");
        bottomBg.width = 582;
        bottomBg.height = 138;
        bottomBg.y = 0;
        this.addChild(bottomBg);
		
		let leftBg = BaseBitmap.create("public_left");
        leftBg.width = 109;
        leftBg.height = bottomBg.height-19;
        leftBg.x =  5.5;
        leftBg.y =  5.5; 
        this.addChild(leftBg); 

		let skin_auraList = Config.ServantskinCfg.getServantSkinItemById(skinId).aura || [];
		let auraIcon = skin_auraList[this._auarKey].auraIcon
		let icon = BaseLoadBitmap.create("servant_aura_Icon"+ auraIcon);
		icon.x = 4;
		icon.y = leftBg.y+6.5;
		icon.width = icon.height = 108;
		this.addChild(icon);

		let servantNameBg =  BaseBitmap.create("servant_biaoti2");
        this.addChild(servantNameBg)
        servantNameBg.x = icon.x + icon.width + 20;
        servantNameBg.y = 5;
        servantNameBg.width= 185; 

        let skillName = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        skillName.textColor = TextFieldConst.COLOR_BROWN_NEW;
        skillName.x = servantNameBg.x + servantNameBg.width/2 ;
        skillName.y = icon.y+3;
		skillName.name = "skillName";
        this.addChild(skillName);

		let curValueTxt =  ComponentManager.getTextField("",18,TextFieldConst.COLOR_BROWN_NEW);
        curValueTxt.x = leftBg.x + leftBg.width +15;//skillName.x;
        curValueTxt.y = skillName.y + 35;
        this.addChild(curValueTxt);
		curValueTxt.name = "curValueTxt";

        let nextValueTxt =  ComponentManager.getTextField("",18,TextFieldConst.COLOR_BROWN_NEW);
        nextValueTxt.x = curValueTxt.x;
        nextValueTxt.y = curValueTxt.y + 25;
        this.addChild(nextValueTxt);
		nextValueTxt.name = "nextValueTxt";
		
		let upNeedTxt =  ComponentManager.getTextField("",18,TextFieldConst.COLOR_BROWN_NEW);
        upNeedTxt.x = curValueTxt.x;
        upNeedTxt.y = nextValueTxt.y + 25;
        this.addChild(upNeedTxt);
		upNeedTxt.name = "upNeedTxt";
		
		let auraList = servantcfg.aura || [];
		let curData  = skin_auraList[this._auarKey];
		let auraV = 1;
		if( Api.servantVoApi.isOwnSkinOfSkinId(""+skinId) ){
			auraV = servantObj.getSkinAuraLevel(this._auarKey);
		}

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
			}
		}
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
		skillName.anchorOffsetX = skillName.width/2 ;
		curValueTxt.text = str1;
		nextValueTxt.text = str2;
		upNeedTxt.text = str3;

    }

    public dispose():void
	{
        this._auarKey =  null;
		this._isRequsting = false;
		super.dispose();
	}
}