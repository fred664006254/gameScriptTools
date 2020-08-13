/**
 * 奖励item
 * author qianjun
 * date 2017/11/22
 * @class AcPunishRankRewardScrollItem
 */
class AcMayDayRankRewardScrollItem extends ScrollListItem
{


	private _itemIndex:number;

	private _key :string;
	private _wifeInfoVo: WifeInfoVo;

	//属性1
	private _att1TF:BaseTextField;
	//属性2
	private _att2TF:BaseTextField;
	//属性3
	private _att3TF:BaseTextField;
	private _skillLevelTF:BaseTextField;
	private _cfgData:any;
	private _updBtn:BaseButton;
	public constructor() 
	{
		super();
	}

	public initItem(index:number,data:any):void
	{
		// let cfg = data
		this._cfgData = data;
		this._itemIndex = index;
		this.width = 508;
		// this.height = 106 + this.getSpaceY();

		let key = data.rank[0]

		let rewardList = GameData.formatRewardItem(data.getReward);
		
		if(rewardList)
		{	
			let temX = 0;
			let temScale = 0.85;
			for(let i = 0;i<rewardList.length;i++)
			{
				let icon = GameData.getItemIcon(rewardList[i],true,true);
				// icon.x = 110 + 7*(i + 1) + icon.width*temScale*i;
				var num= i%4;
				icon.x = 110 + 7*(num + 1) + icon.width*temScale*num;
				// icon.y = this.height/2 - icon.height/2;
				icon.y = (icon.height + 5)*(Math.floor((i)/4)) + 15;
				if(rewardList.length <= 4){
					icon.y = (icon.height + 5)*(Math.floor((i)/4)) + 25;
				}
				icon.scaleX = icon.scaleY = temScale;
				this.addChild(icon);
			}
		}
		this.height = this.height*0.85;

		let txt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		if (Number(key) < 4)
		{
			txt.text =LanguageManager.getlocal("acRank_rank"+key);
		}else
		{
			txt.text = txt.text =LanguageManager.getlocal("acRank_rank5",[String(data.rank[0]),String(data.rank[1]) ] );
		}
		txt.x = 20;
		if(PlatformManager.checkIsEnLang()||PlatformManager.checkIsRuLang())
		{
			txt.x = 54 - txt.width / 2;
		}
		txt.y = this.height/2 - txt.height/2 - 7;
		if(rewardList.length <= 4){
			txt.y = txt.y + 10;
		}

		this.addChild(txt);

		let lineSp = BaseBitmap.create("public_line1");
		lineSp.x = this.width/2 - lineSp.width/2;
		lineSp.y = this.height + 0;
		this.addChild(lineSp);
	}

	public getSpaceY():number
	{
		return 5;
	}

	public dispose():void
	{
		
		// this._numTF = null;
		this._itemIndex = null;

		this._key = null;
		this._wifeInfoVo = null;

		//属性1
		this._att1TF = null;
		//属性2
		this._att2TF = null;
		//属性3
		this._att3TF = null;
		this._skillLevelTF = null;
		this._updBtn = null;
		super.dispose();
	}
}