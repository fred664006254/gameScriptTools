
/**
 * 一键公务奖励面板 
 */
class AffairWordRewardPopupView  extends PopupView
{
	 
	private dropTxt:BaseTextField =null;
	private affTxt:BaseTextField =null;
	private nameArr:Array<string> =[];
	public constructor() 
	{
		super();
	}

	protected initView():void
	{


		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 528;
		bg.height = 303;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9; 
		this.addChildToContainer(bg); 

		
		//处理了多少次公务
		this.affTxt= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK); 
		this.affTxt.x= 70;
		this.affTxt.y =35;
		this.affTxt.text = LanguageManager.getlocal("affairWordRewardDes",[this.param.data.affNum]); 
		this.addChildToContainer(this.affTxt)

		let rewards:string = this.param.data.rewards;  
		let rewardsArr:Array<RewardItemVo> = GameData.formatRewardItem(rewards); 
		for(var i:number =0; i<rewardsArr.length; i++)
		{
			var currVo:RewardItemVo =rewardsArr[i];
			let str = currVo.name+"+"+currVo.num;  
			this.dropTxt= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK); 
			this.dropTxt.width = 200;  
			this.dropTxt.text =str;
			this.dropTxt.setPosition(this.affTxt.x,45+this.dropTxt.y+this.dropTxt.height+30*i); 
			this.addChildToContainer(this.dropTxt);
		}

		//奖励文字  
        let confirmButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"skinLvupOkBtn",this.hide,this);
     	confirmButton.x = bg.x + bg.width/2 - confirmButton.width/2;
		confirmButton.y = bg.y + bg.height + 15;
		confirmButton.setColor(TextFieldConst.COLOR_BROWN);
		this.addChildToContainer(confirmButton);

	}
	 
	 
	public dispose():void
	{ 
		this.affTxt= null;
		this.nameArr =[];
		this.dropTxt =null;
		super.dispose();
	}
}
