class DailybossRewardListItem extends ScrollListItem
{	
	private _nameTxt:BaseTextField;
	private _valueTxt:BaseTextField;
	private _titleIcon:BaseDisplayObjectContainer;

	public constructor() {
		super();
	}

	protected initItem(index:number,data:{level:number,bossLv?:number,title:any,uid:string|number,name:string,myrank?:number,rewards?:string}):void
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

		if(data.title && data.title.title)
		{	
			let titleinfo = null;
			if(index == -1){
				titleinfo = Api.playerVoApi.getTitleInfo();
			}
			else{
				titleinfo = App.CommonUtil.getTitleData(data.title);
			}
			if(titleinfo.title != ''){
				let titleIcon = App.CommonUtil.getTitlePic(data.title);
				titleIcon.setScale(0.6);
				titleIcon.setPosition(nameTxt.x + nameTxt.width + 10,nameTxt.y -7);
				this.addChild(titleIcon);
				this._titleIcon=titleIcon;
			}
		}
		else
		{
			if (data.level)
			{
				let officerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,color)
                officerTxt.text = LanguageManager.getlocal("officialTitle"+ data.level);
                
                officerTxt.x = nameTxt.x + nameTxt.width + 22;
                officerTxt.y = nameTxt.y;
                this.addChild(officerTxt);
			}
		}
		this.width = 500;
		this.height = 36;
	}

	public refresh(index:number,data:{level:number,value:number,title:string|number,uid:string|number,name:string,myrank?:number|string})
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
				this._titleIcon.dispose();
				this._titleIcon = null;
			}
			let titleinfo = App.CommonUtil.getTitleData(data.title);
			if(titleinfo.title != ''){
				let titleIcon = App.CommonUtil.getTitlePic(data.title);
				titleIcon.setScale(0.6);
				titleIcon.setPosition(this._nameTxt.x + this._nameTxt.width + 10,this._nameTxt.y -7);
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