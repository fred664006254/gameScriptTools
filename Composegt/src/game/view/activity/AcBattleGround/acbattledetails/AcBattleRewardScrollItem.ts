/** 绝地擂台   帮会列表
 * anthor  
 */

class AcBattleRewardScrollItem extends ScrollListItem {

	// 标题文本
	private titleText: BaseTextField = null;

	//标题背景
	private titleBg: BaseBitmap = null;

	//内容背景
	private descBg: BaseDisplayObjectContainer = null;

	//内容图片
	private descImg: BaseBitmap = null;

	//内容购买按钮
	private descBtn: BaseButton = null;

	//内容时间文本
	private descTimeText: BaseTextField = null;

	//数据
	private _data: any = null;
	private _itemIndex: number = null; 
	private _nodeContainer:BaseDisplayObjectContainer;
	private  _code:any =null;
	public constructor() {
		super();
	}
	protected initItem(index: number, data: any,typedata:any) 
	{
		
		this._code = typedata.code;
		let  nameStr = "battlerankbg";  
		let bg:BaseBitmap =BaseBitmap.create(nameStr);
		bg.width =626;
		bg.y = 0;
		bg.x = 10;
		this.addChild(bg); 

		let fontTitleBg = BaseBitmap.create("battletitle"); 
		fontTitleBg.setPosition(bg.width / 2 - fontTitleBg.width / 2,bg.y +5)
		this.addChild(fontTitleBg); 
		let rankNum =0;	
		var rank1:number = 0;
		var rank2:number = 0;
		if(typedata.type==2)
		{
			rank1 = data.alnRank[0];
			rank2 = data.alnRank[1];
		}
		else
		{ 
			rank1 = data.idvRank[0];
			rank2 = data.idvRank[1];
		}
	
		let  txtDesc2 =  ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
		if(rank1==rank2)
		{
		 
			if(rank1<=3)
			{
				txtDesc2.text  = LanguageManager.getlocal("acRank_rank"+rank1,[rank1+""]);
				txtDesc2.bold =true;
			}
			else
			{
				txtDesc2.text  = LanguageManager.getlocal("acRank_rank6",[rank1+""]);
				txtDesc2.bold =false;
			}

		} 
		else
		{ 
			txtDesc2.text  = LanguageManager.getlocal("acRank_rank5",[rank1+"",+rank2+""]); 
		}
		
		txtDesc2.setPosition(fontTitleBg.x, fontTitleBg.y + fontTitleBg.height+6-33);
		this.addChild(txtDesc2);
		
		fontTitleBg.width = 359+txtDesc2.width+10;
		fontTitleBg.x = (bg.width-fontTitleBg.width)/2;
		txtDesc2.x = fontTitleBg.x+fontTitleBg.width/2- txtDesc2.width/2;  

		let  moveY:number =50;
		let rewardStr = data.getReward;
		let rewardStr2:string =null;
	
		let  posXtype2:number =0;
		//帮会奖励
		if(typedata.type==2)
		{ 
			let rankbg = BaseBitmap.create("battle-rankb"); 
			rankbg.setPosition(bg.x,fontTitleBg.y+fontTitleBg.height+2)
			this.addChild(rankbg); 

			let memberGetTxt = ComponentManager.getTextField("",20,0xfff7e8);
			memberGetTxt.y = rankbg.y+5; //-10;
			memberGetTxt.text = LanguageManager.getlocal("acRank_alliance_masterget1");
			memberGetTxt.x = bg.x + bg.width/2 -memberGetTxt.width/2-10; 
			this.addChild(memberGetTxt); 
			moveY = memberGetTxt.y+35;
			
			rewardStr = data.lordReward;//帮主奖励 ;
			rewardStr2 = data.memberReward;//帮主奖励 ; 
		}
	 

		let rewardVoList = GameData.formatRewardItem(rewardStr);
        let scaleValue = 0.85;
        let offestHeight = 0;
        let startWidth = 11.5;
        for (let i = 0; i < rewardVoList.length; i++) {

            let rewardDB = GameData.getItemIcon(rewardVoList[i],true,true); 
            let rewardDBWidth = rewardDB.width; 
            let posX = 5+bg.x + startWidth  + (((i) % 5) * (rewardDBWidth + startWidth+4));
            let posY = moveY+(Math.floor((i) / 5) * (rewardDB.height+9 ));//* scaleValue + 5));
            rewardDB.setPosition(posX, posY+10);
            this.addChild(rewardDB);
            offestHeight = rewardDB.height; 
        }
		var num =1;
		if(rewardVoList.length % 5==0)
		{
			num =0;
		}
        bg.height += 106 * (Math.floor(rewardVoList.length / 5) + num)+20; //- 25;
		 
		
		// //帮会成员
		if(typedata.type==2)
		{  
			let rankbg2 = BaseBitmap.create("battle-rankb"); 
			rankbg2.setPosition(bg.x,bg.y+ bg.height-15)
			this.addChild(rankbg2); 

			let memberGetTxt = ComponentManager.getTextField("",20,0xfff7e8);
			memberGetTxt.y = rankbg2.y +4// 44; 
			memberGetTxt.text = LanguageManager.getlocal("acRank_alliance_memberget");
			memberGetTxt.x = bg.x + bg.width/2 -memberGetTxt.width/2-10; 
			this.addChild(memberGetTxt); 

			let rewardVoList2 = GameData.formatRewardItem(rewardStr2);
			let scaleValue = 0.85;
			let offestHeight = 0;
			let startWidth = 11.5;
			for (let i = 0; i < rewardVoList2.length; i++) 
			{
				let rewardDB2 = GameData.getItemIcon(rewardVoList2[i],true,true); 
				let rewardDBWidth = rewardDB2.width; 
				let posX = 5+ bg.x + startWidth  + (((i) % 5) * (rewardDBWidth + startWidth));
				let posY = bg.y+ bg.height+20+(Math.floor((i) / 5) * (rewardDB2.height+1 ));//* scaleValue + 5));
				rewardDB2.setPosition(posX, posY+10);
				this.addChild(rewardDB2);
				offestHeight = rewardDB2.height; 
			}
			var num =1;
			if(rewardVoList2.length % 5==0)
			{
				num = 0;
			} 
			bg.height+=  106 * (Math.floor(rewardVoList2.length / 5) + num)+50;
		}  
		this.height = bg.height+2;
	}  

	private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, this._code);
    }
	public getSpaceY(): number {
		return -150;
	}
	public getSpaceX(): number {
		return 0;
	}
	public dispose(): void {
		 
		this.titleText = null;

		//标题背景
		this.titleBg = null;

		//内容背景
		this.descBg = null;

		//内容图片
		this.descImg = null;

		//内容购买按钮
		this.descBtn = null;

		//内容时间文本
		this.descTimeText = null;

		//数据
		this._data  = null;
		this._itemIndex  = null;
		super.dispose();
	}
}