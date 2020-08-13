/**
 * 查看帮会信息
 * author dky
 * date 2017/12/1
 * @class AllianceShowInfoPopupView
 */
class AllianceDetailsPopupView  extends PopupView
{   

	private _allianceInfo:any;
	private _allianceMemberInfo:any;

	public constructor() 
	{
		super();
	}

	public initView():void
	{
		let allianceVo = Api.allianceVoApi.getAllianceVo(); 
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 240;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 25;
		this.addChildToContainer(bg);

		let container = new BaseDisplayObjectContainer();
		
		// this.addChildToContainer(container);

		let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,475,210);
		// 中部可滑动区域
		let scrollView = ComponentManager.getScrollView(container,rect);
		scrollView.setPosition(45+GameData.popupviewOffsetX, 40);
		this.addChildToContainer(scrollView);

		let msgStr = allianceVo.message;  
		if (msgStr == ""||!allianceVo) {
			msgStr = LanguageManager.getlocal("allianceMessageTip");
		}
		let desStr = msgStr;
		let alphabg=BaseBitmap.create("public_alphabg");
		container.addChild(alphabg);
		let info1TF:BaseTextField = ComponentManager.getTextField(desStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info1TF.y=10;
		info1TF.width = 475;   
		container.addChild(info1TF);  

		var _Btn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"sysConfirm",this.oncloseHadler,this);
		_Btn.x = (bg.width-_Btn.width)*0.5+24+GameData.popupviewOffsetX;
		_Btn.y = bg.height+bg.y+30;
		this.addChildToContainer(_Btn);
	} 
	
	private oncloseHadler():void
	{
		this.hide();
	}
	 
	public dispose():void
	{ 
		super.dispose();
	}
}