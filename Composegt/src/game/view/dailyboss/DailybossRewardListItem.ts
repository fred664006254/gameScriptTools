class DailybossRewardListItem extends ScrollListItem
{	
	private _nameTxt:BaseTextField;
	private _valueTxt:BaseTextField;
	private _titleIcon:BaseLoadBitmap;

	public constructor() {
		super();
	}

	protected initItem(index:number,data:{bossLv?:number,title:string,uid:string|number,name:string,myrank?:number,rewards?:string}):void
	{
		let color:number=(data.myrank==null?TextFieldConst.COLOR_WHITE:TextFieldConst.COLOR_LIGHT_YELLOW);
		let nameTxt:BaseTextField=ComponentManager.getTextField((data.myrank!=null?data.myrank:String(index+1))+"."+data.name,TextFieldConst.FONTSIZE_CONTENT_SMALL,color);
		this.addChild(nameTxt);
		this._nameTxt=nameTxt;
		nameTxt.y=5;

		let rewardvo:RewardItemVo = GameData.formatRewardItem(data.rewards)[0];
		let rewardStr:string = rewardvo.name+"*"+rewardvo.num;
		let valueTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossRankReward",[data.bossLv.toString(),rewardStr]),TextFieldConst.FONTSIZE_CONTENT_SMALL,color);
		valueTxt.setPosition(230,0);
		this.addChild(valueTxt);
		this._valueTxt=valueTxt;
		valueTxt.y=5;

		// if (data.uid == Api.playerVoApi.getPlayerID()) {
            
        //     nameTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        //     valueTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        // }

		// if(data.title)
		// {
		// 	let titleIcon:BaseLoadBitmap = BaseLoadBitmap.create(Config.TitleCfg.getTitleCfgById(data.title).titleIcon3);
		// 	titleIcon.setScale(0.6);
		// 	titleIcon.setPosition(nameTxt.x + nameTxt.width + 10,3);
		// 	this.addChild(titleIcon);
		// 	this._titleIcon=titleIcon;
		// }
		this.width=500;
	}

	public refresh(index:number,data:{value:number,title:string|number,uid:string|number,name:string,myrank?:number|string})
	{
		if(this._nameTxt)
		{
			this._nameTxt.text=(data.myrank!=null?data.myrank:String(index+1))+"."+data.name
		}
		if(this._valueTxt)
		{
			this._valueTxt.text=LanguageManager.getlocal("dailybossDamageValueDesc",[data.value.toString()]);
		}
		if(data.title)
		{
			if(this._titleIcon)
			{
				this._titleIcon.setload(Config.TitleCfg.getTitleCfgById(data.title).titleIcon3);
			}
			else
			{
				let titleIcon:BaseLoadBitmap = BaseLoadBitmap.create(Config.TitleCfg.getTitleCfgById(data.title).titleIcon3);
				titleIcon.setScale(0.6);
				titleIcon.setPosition(220,3);
				this.addChild(titleIcon);
				this._titleIcon=titleIcon;
			}
		}
	}
	public dipose():void
	{
		this._nameTxt=null;
		this._titleIcon=null;
		this._valueTxt=null;

		super.dispose();
	}
}