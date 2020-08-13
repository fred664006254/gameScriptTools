/**
 * 限时活动列表item
 * author dmj
 * date 2017/11/07
 * @class AcLimitedRewardScrollItem
 */
class AcLimitedRewardScrollItem extends ScrollListItem
{

	private _limitedRewardVo:AcLimitedRewardVo = null; 
	private _selectedIndex:number = 0;
	private _openBtn:BaseButton;
	private _lastRed:boolean = null;
	private _acCDTxt:BaseTextField = null;
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any)
    {

		this._limitedRewardVo = data;
		let temW = 618;
		let temH = 148;
		let temX = 150;
		this._selectedIndex = index;

		let bg:BaseBitmap = BaseBitmap.create("public_listbg");
		bg.width = temW;
		bg.height=148
		bg.x = 2;
		this.addChild(bg);

		let leftBg = BaseBitmap.create("public_left");
        leftBg.width = 139;
        leftBg.height = 130;
        leftBg.x =  7;
        leftBg.y =  5;//bg.y + bg.height/2 -leftBg.height/2-3; 
        this.addChild(leftBg);

		let titleBg:BaseBitmap = BaseBitmap.create("activity_charge_red");
		titleBg.x = 145;
		titleBg.y = 19;
		this.addChild(titleBg);

		let iconBg:BaseBitmap = BaseBitmap.create("progress6_bg");
		iconBg.x = 10;
		iconBg.y = temH/2 - iconBg.height/2;
		this.addChild(iconBg);

		let iconSp:BaseBitmap = BaseLoadBitmap.create(this._limitedRewardVo.icon);
		iconSp.x = iconBg.x + iconBg.width/2 - 44;
		iconSp.y = iconBg.y + iconBg.height/2 - 44;
		this.addChild(iconSp);

		let titleNameTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("limitedTitle",[this._limitedRewardVo.getTitleStr]),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		titleNameTF.x = temX;
		titleNameTF.y = titleBg.y + titleBg.height/2 - titleNameTF.height/2;
		this.addChild(titleNameTF);
		
		let timeTF:BaseTextField = ComponentManager.getTextField(App.StringUtil.formatStringColor(this._limitedRewardVo.acTimeAndHour,TextFieldConst.COLOR_WARN_RED),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		timeTF.x = temX;
		timeTF.y = titleNameTF.y + titleNameTF.height + 20;
		this.addChild(timeTF);

		if(!PlatformManager.checkIsWxmgSp())
		{
			this._acCDTxt = ComponentManager.getTextField(this._limitedRewardVo.acLocalCountDown,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._acCDTxt.x = temX;
			this._acCDTxt.y = timeTF.y + timeTF.height + 10;
			this.addChild(this._acCDTxt);
		}
		
		

		let openBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"openActivityTitle",this.clickItemHandler,this);
		openBtn.x = temW - openBtn.width - 15;
		openBtn.y = temH/2 - openBtn.height/2;
		this.addChild(openBtn);
		this._openBtn = openBtn;

		this.checkBtnState();	
		 egret.startTick(this.tick,this);
	}

	private tick(timeStamp:number):boolean
	{	
		if(!PlatformManager.checkIsWxmgSp())
		{
			this._acCDTxt.text = this._limitedRewardVo.acLocalCountDown;
		}
		
		 return false;
	}

	private clickItemHandler():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ACLIMITEDREWARDDETAILPOPUPVIEW,{"aid":this._limitedRewardVo.aid,"code":this._limitedRewardVo.code});
	}

	public checkBtnState():void
	{
		let red = this._limitedRewardVo.red;
		if(this._lastRed == null || this._lastRed != red)
		{
			this._lastRed = red;
			if(red == true)
			{
				this._openBtn.showStatusIcon("public_dot2");
			}
			else
			{
				this._openBtn.removeStatusIcon();
			}
		}
	}

	public getSpaceY():number
	{
		return 10;
	}

	public getSpaceX():number
	{
		return 0;
	}
	
	public dispose():void
    {	
		egret.stopTick(this.tick,this);
		this._limitedRewardVo = null; 
		this._selectedIndex = 0;
		this._openBtn = null;
		this._lastRed = null;
		this._acCDTxt = null;
		super.dispose();
	}
}