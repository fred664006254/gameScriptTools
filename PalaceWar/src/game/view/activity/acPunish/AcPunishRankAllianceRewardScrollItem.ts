/**
 * 惩戒女囚Item
 * author dky
 * date 2017/11/22
 * @class AcPunishRankAllianceRewardScrollItem
 */
class AcPunishRankAllianceRewardScrollItem extends ScrollListItem
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
		this.width = 513;
		// this.height = 106 + this.getSpaceY();

		let itemBg2:BaseBitmap = BaseBitmap.create("public_9_cell_title");
		itemBg2.width = this.width ;
		itemBg2.height = 34;
		itemBg2.x = 0;
		itemBg2.y = 0;
		// itemBg2.height = 218;
		this.addChild(itemBg2);

		let line1 = BaseBitmap.create("public_line3");
		line1.width = 480;
		line1.x = this.width/2 - line1.width/2;
		line1.y = 10;
		this.addChild(line1);

		let key = data.rank[0]

		let txt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		if (Number(key) < 4)
		{
			txt.text =LanguageManager.getlocal("acRank_rank"+key);
		}else
		{
			txt.text = txt.text =LanguageManager.getlocal("acRank_rank5",[String(data.rank[0]),String(data.rank[1]) ] );
		}
		txt.x = this.width/2 - txt.width/2;
		txt.y = 5;
		this.addChild(txt);

		let rank1TF = ComponentManager.getTextField(LanguageManager.getlocal("acRank_alliance_masterget1"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rank1TF.x = 10;
		rank1TF.y = 80;
		this.addChild(rank1TF);

		

		let rewardList = GameData.formatRewardItem(data.reward1);
		// let rewardList = GameData.formatRewardItem("6_1004_6|6_1302_5|6_1301_5|6_1303_5|6_1004_6|6_1302_5");
		
		
		let container = new BaseDisplayObjectContainer();
		if(rewardList)
		{	
			let temX = 0;
			let temScale = 0.85;
			for(let i = 0;i<rewardList.length;i++)
			{
				let icon = GameData.getItemIcon(rewardList[i],true,true);
				var num= i%4;
				icon.x = 110 + 7*(num + 1) + icon.width*temScale*num;
				icon.y = (icon.height + 5)*(Math.floor((i)/4));
				icon.scaleX = icon.scaleY = temScale;
				container.addChild(icon);
			}
		}
		this.addChild(container);
		container.y = 50;
		container.height = container.height *0.85

		let lineSp = BaseBitmap.create("public_line1");
		lineSp.x = this.width/2 - lineSp.width/2;
		lineSp.y = container.y + container.height - 20;
		this.addChild(lineSp);

		let rank2TF = ComponentManager.getTextField(LanguageManager.getlocal("acRank_alliance_memberget"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rank2TF.x = 10;
		rank2TF.y = container.y + container.height + 60;
		this.addChild(rank2TF);

		let rewardList2 = GameData.formatRewardItem(data.reward2);
		// let rewardList2 = GameData.formatRewardItem("6_1004_6|6_1302_5|6_1301_5|6_1303_5|6_1004_6|6_1302_5");
		let container2 = new BaseDisplayObjectContainer();
		if(rewardList2)
		{	
			let temX = 0;
			let temScale = 0.85;
			for(let i = 0;i<rewardList2.length;i++)
			{
				let icon = GameData.getItemIcon(rewardList2[i],true,true);
				var num= i%4;
				icon.x = 110 + 7*(num + 1) + icon.width*temScale*num;
				icon.y = (icon.height + 5)*(Math.floor((i)/4));
				icon.scaleX = icon.scaleY = temScale;
				container2.addChild(icon);
			}
		}
		this.addChild(container2);
		container2.y = container.y + container.height + 10;
		container2.height = container2.height *0.85

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