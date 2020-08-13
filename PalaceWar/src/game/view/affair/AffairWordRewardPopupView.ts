
/**
 * 一键公务奖励面板 
 */
class AffairWordRewardPopupView  extends PopupView
{
	 
	private dropTxt:BaseTextField =null;
	private dropNumTxt:BaseTextField =null;
	private affTxt:BaseTextField =null;
	private nameArr:Array<string> =[];
	public constructor() 
	{
		super();
	}

	protected initView():void
	{


		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 528;
		bg.height = 263;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 39+30; 
		this.addChildToContainer(bg); 

		
		//处理了多少次公务
		// console.log(this.param.data.affNum); 
		this.affTxt= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK); 
		this.affTxt.x = 150+GameData.popupviewOffsetX;
		this.affTxt.y = 12+30;
		this.affTxt.text = LanguageManager.getlocal("affairWordRewardDes",[this.param.data.affNum]); 
		this.addChildToContainer(this.affTxt);

		var restr = this.param.data.rewards;
		let rewards:string = this.param.data.rewards;  
		let rewardsArr:Array<RewardItemVo> = GameData.formatRewardItem(rewards); 
		let lastY:number =0;
		for(var i:number =0; i<rewardsArr.length; i++)
		{
			var currVo:RewardItemVo =rewardsArr[i]; 
			let str = currVo.name;
			let str2 ="+"+currVo.num;
			this.dropTxt= ComponentManager.getTextField(LanguageManager.getlocal("affairtxtdes",[str,str2]),TextFieldConst.FONTSIZE_CONTENT_COMMON); 
			this.dropTxt.width = 200;  
			this.dropTxt.setPosition(222+GameData.popupviewOffsetX,40+this.dropTxt.y+this.dropTxt.height+30*i+30); 
			this.addChildToContainer(this.dropTxt); 
			lastY = this.dropTxt.y;
		}

		bg.height = lastY+9-30;
		//奖励文字  
        let confirmButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"skinLvupOkBtn",this.hide,this);
     	this.setLayoutPosition(LayoutConst.horizontalCenterbottom,confirmButton,bg,[0,22]);
		this.addChildToContainer(confirmButton);
		confirmButton.y = bg.height+confirmButton.height-5+30;

	}

	protected getBgExtraHeight():number
	{
		return 35;
	}
	 
	 
	public dispose():void
	{ 
		this.affTxt= null;
		this.nameArr =[];
		this.dropTxt =null;
		this.dropNumTxt =null;
		super.dispose();
	}
}
