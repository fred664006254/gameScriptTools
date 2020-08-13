
class WifebattleMoreItem extends ScrollListItem {


	private id:number =0;
	private _data:any = null;
	public constructor() {
		super();
	}

	protected initItem(index: number, data: any) 
    {
		
		this.id =data.id; 
		this._data = data;
		this.height =130;

		let rankinglist_line:BaseBitmap = BaseBitmap.create("atkrace_xian_1"); 
		rankinglist_line.x =10;
		this.addChild(rankinglist_line); 
		rankinglist_line.y =130;   

		// let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		// rankTxt.text = String(index+1);
		// rankTxt.x = 20;
		// rankTxt.y = 15;
		// rankTxt.width = 30;
		// rankTxt.textAlign= TextFieldConst.ALIGH_CENTER;
		// this.addChild(rankTxt);
			
		//名称  
		// let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		// nameTxt.text = data.name;
		// nameTxt.x = rankTxt.x+40;
		// nameTxt.y = rankTxt.y;
		// this.addChild(nameTxt);

		let timerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
		timerTxt.text =App.DateUtil.getFormatBySecond(data.st, 2);
		timerTxt.x = 20;
		timerTxt.y = 15; //describeTxt.y+52;
		this.addChild(timerTxt);
	
		
		//描述    
		let str = LanguageManager.getlocal("wifeBattleMoreDetail",[data.aname,data.dname,data.atotalwinnum,data.agetpoint]);

		let describeTxt  =ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		describeTxt.width = 450;
		describeTxt.lineSpacing = 7;
		describeTxt.x = timerTxt.x; 
		describeTxt.y = timerTxt.y+43;
		
		this.addChild(describeTxt);
		
		//时间  


		//查看按钮
		let lookBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"wifeBattleMoreBtn",this.lookBtnHandler,this);
		lookBtn.setScale(0.85);
		lookBtn.x = GameConfig.stageWidth - lookBtn.width-10;
		lookBtn.y = 60;
		this.addChild(lookBtn);


	}
	//挑战
	private lookBtnHandler(evt:egret.TouchEvent):void
	{
		NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_FIGHTREVIEW, {logid:this._data.id});
		// NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_FIGHTREVIEW, {logid:1});
	}

	public getSpaceY(): number {
		return 1;
	}
	public getSpaceX(): number {
		return 0;
	}
	public dispose(): void {

		this.id =0;
		this._data = null;
		super.dispose();
	}
}