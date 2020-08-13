
class AcCrossServerHegemonyFlagRulePopupView extends PopupView
{
	// private _useCallback:Function;
	// private _handler:any;
	private _bgHeight:number = 0
	public constructor() 
	{
		super();
	}

	private _callback = null;
	private get cfg() : Config.AcCfg.CrossServerHegemonyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
	}
	
	protected get uiType():string
	{
		return "2";
	}

	// 打开该面板时，需要传参数msg
	public initView():void
	{
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg93");
		bg.width = 520;
		bg.height = 560;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 15;
		this.addChildToContainer(bg);

		this._bgHeight = bg.height;
		
		let msgNode = new BaseDisplayObjectContainer();
		msgNode.width = 460;
		let rect = new egret.Rectangle(0,0,460,this._bgHeight - 40);
		let scrollView = ComponentManager.getScrollView(msgNode,rect);
		scrollView.x = this.viewBg.width/2 - scrollView.width/2;
		scrollView.y = bg.y + bg.height / 2 - scrollView.height/2;//msgTF1.y + msgTF1.height + 20;
		this.addChildToContainer(scrollView);

		

		let messageStr:string = this.param.data.msg;
        let msgTF1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagRule1"),20,TextFieldConst.COLOR_BROWN);
		msgTF1.width = 460;
		msgTF1.lineSpacing = 7;
		msgTF1.x = msgNode.width/2 - msgTF1.width/2;
		msgTF1.y = 5;
		msgNode.addChild(msgTF1);


		let scoreRebate = this.cfg.flagScoreRebate;
		let startY = msgTF1.y + msgTF1.height + 20;
		for(let i = scoreRebate.length - 1 ; i >= 0; i --){

			let rebateCfg = scoreRebate[i];
			if(rebateCfg.multiplying <= 0){
				continue;
			}
			let msgStr = LanguageManager.getlocal("acCrossServerHegemonyFlagRule2",[String(rebateCfg.rank[0]),String(rebateCfg.rank[1]),String(rebateCfg.multiplying * this.cfg.flagScoreNum)]);
			if(rebateCfg.rank[0] == rebateCfg.rank[1] && rebateCfg.rank[1] == 1){
				msgStr = LanguageManager.getlocal("acCrossServerHegemonyFlagRule5",[String(rebateCfg.multiplying * this.cfg.flagScoreNum)]);
			} 
			let msgTF = ComponentManager.getTextField(msgStr,20,TextFieldConst.COLOR_BROWN);
			msgTF.width = 460;
			
			msgTF.x = 0;
			msgTF.y = startY;
			startY += msgTF.height + 7;
			msgNode.addChild(msgTF);
		}
		// msgNode.height = startY;


		let line = BaseBitmap.create("public_line1");
		line.width = 460;
		line.x = msgNode.width/2 - line.width/2;
		line.y = startY + 10;
		msgNode.addChild(line);

        // let msgTF2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagRule2"),20,TextFieldConst.COLOR_BROWN_NEW);
		// msgTF2.width = 460;
		// msgTF2.lineSpacing = 7;
		// msgTF2.x = this.viewBg.x + this.viewBg.width/2 - msgTF2.width/2;
		// msgTF2.y = msgTF1.y + msgTF1.height + 35;
		// this.addChildToContainer(msgTF2);

        let msgTF3:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagRule3"),22,TextFieldConst.COLOR_BROWN);
		msgTF3.width = 460;
		msgTF3.lineSpacing = 5;
		msgTF3.x = msgNode.width/2 - msgTF3.width/2;
		msgTF3.y = line.y + line.height + 20;
		msgNode.addChild(msgTF3);

        let msgTF4:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagRule4"),20,TextFieldConst.COLOR_BROWN);
		msgTF4.width = 460;
		msgTF4.lineSpacing = 7;
		msgTF4.x = msgNode.width/2 - msgTF4.width/2;
		msgTF4.y = line.y + line.height + 55;
		msgNode.addChild(msgTF4);

		msgNode.height = msgTF4.y + msgTF4.height + 5;
		
		let touchPanel = BaseBitmap.create("public_alphabg");
		touchPanel.width = msgNode.width;
		touchPanel.height = msgNode.height;
		msgNode.addChild(touchPanel);
	}



	protected resetBgSize():void
	{
		// this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,this._bgHeight + 30);
		super.resetBgSize();
		
	}

	protected isTouchMaskClose():boolean
	{
		return (this.param&&this.param.data&&this.param.data.touchMaskClose)?true:false;
	}



	public hide()
	{
		// if(this.param.data.callback){
		// 	this.param.data.callback.apply();
		// }
		super.hide()
	}
	// protected getParent():egret.DisplayObjectContainer
	// {
	// 	if (this.param.data.inLayer) {
	// 		return this.param.data.inLayer;
	// 	} else {
	// 		return super.getParent();
	// 	}
	// }
	public dispose():void
	{
		this._callback = null;
		super.dispose();
	}
}