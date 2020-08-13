
class AcGroupWifeBattleMoreItem extends ScrollListItem {


	private id:number =0;
	private _data:any = null;

	private _aidAndCode: string = null;
	public constructor() {
		super();
	}

	protected initItem(index: number, data: any,itemParam:any) 
    {
		
		this.id =data.id; 
		this._data = data;
		this.height =130;
		this._aidAndCode = itemParam;

		let rankinglist_line:BaseBitmap = BaseBitmap.create("rankinglist_line"); 
		rankinglist_line.x =10;
		this.addChild(rankinglist_line); 
		rankinglist_line.y =130;   



		let timerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
		timerTxt.text =App.DateUtil.getFormatBySecond(data.st, 2);
		timerTxt.x = 20;
		timerTxt.y = 15; //describeTxt.y+52;
		this.addChild(timerTxt);
	
		
		//描述    
		let namestr = `${data.aname}${LanguageManager.getlocal(`atkraceyamenid`, [data.auid])}(${Api.mergeServerVoApi.getRankServerName(data.auid)})`;
		let ennamestr = `${data.dname}(${Api.mergeServerVoApi.getRankServerName(data.duid)})`;

		let str = LanguageManager.getlocal("wifeBattleMoreDetail",[namestr,ennamestr,data.atotalwinnum,data.agetpoint]);

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
		NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_FIGHTREVIEW, {logid:this._data.id,activeId:this._aidAndCode});
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