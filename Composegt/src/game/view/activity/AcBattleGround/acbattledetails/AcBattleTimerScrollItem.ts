/**跨服时间list
 * anthor  
 */

class AcBattleTimerScrollItem extends ScrollListItem {

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
	private static lasttimer =null
	public constructor() {
		super();
	}
	protected initItem(index: number, data: any,_data:any) 
	{
		
		this._code = _data.code;
		var  need:number = _data.need;
		let  nameStr = "battlelistbg1"; 
		if(index%2==0)
		{
			nameStr ='battlelistbg2'
		}
		let bit:BaseBitmap =BaseBitmap.create(nameStr);
		bit.x=-5;
		this.addChild(bit);

		if(data.btmLine ==need)
		{
			let bit2:BaseBitmap =BaseBitmap.create("battlelisttouch");
			bit2.x=-5;
			this.addChild(bit2);	
		}
	   
	
	
		//index 排名
		let rankNum = index+1;
		let renkDesc = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
	 	renkDesc.text = rankNum+"";
		renkDesc.y = bit.y +bit.height/2-renkDesc.height/2;
		renkDesc.x = 45;
		this.addChild(renkDesc);

	
		//时间  
		let time1 :string  = App.DateUtil.getFormatBySecond(this.vo.versionst,10);
		var nextSt = this.vo.versionst + data.time;
		let time2 :string  =   App.DateUtil.getFormatBySecond(nextSt,10);

		let timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acBattleTimeend3",[time1,time2]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
	 	timeDesc.y = renkDesc.y;
		timeDesc.x = 130;
		this.addChild(timeDesc); 

		var curPeriod:number = this.vo.getCurperiod();
		var str ="";
		if(curPeriod==1)
		{
			str = "acBattleTimeend3";
		} 
		if(curPeriod>=3||data.btmLine>need&&need!=0)
		{
			str = "acBattleTimeend";
		} 
		else if(need==0)
		{
			str = "acBattleTimeend3";
		}
		else if(data.btmLine==need){

			str = "acBattleTimeend2";
		}
		else
		{
			str = "acBattleTimeend4";
		}

		if(index==0)
		{ 
			timeDesc.text  = LanguageManager.getlocal(str,[time1 ,time2]);
		}
		if(index>0)
		{
			let nextSt2 =this.vo.versionst+_data.arr[index-1].time;
			var time23 :string  =  App.DateUtil.getFormatBySecond(nextSt2,10); 
			timeDesc.text  = LanguageManager.getlocal(str,[time23 ,time2]);
		}

	 

	
		//淘汰  
		let teliminateDesc = ComponentManager.getTextField(LanguageManager.getlocal("eliminate",[data.btmLine]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
	 	teliminateDesc.y = renkDesc.y;
		teliminateDesc.x = 526-35;
		teliminateDesc.width =75;
		teliminateDesc.textAlign =TextFieldConst.ALIGH_CENTER;
		this.addChild(teliminateDesc);
		if(data.btmLine==1)
		{
			teliminateDesc.text = data.btmLine+"";
		}

		if(data.btmLine>need&&curPeriod>=2)
		{
			renkDesc.alpha =0.5;
			timeDesc.alpha =0.5;
			teliminateDesc.alpha =0.5; 
		}
	}  

	private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, this._code);
    }
	public getSpaceY(): number {
		return -5;
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