/*
author : qinajun
date : 2018.4.14
desc : 转盘活动viewtab2 累计充值
*/
class AcMayDayViewTab2 extends CommonViewTab
{ 
	private _scrollList:ScrollList = null; 
	private _isSpecial : boolean = false;
	private _seprateNum : number = 0;
	private _timerText = null;
	public constructor() 
	{
		super();
		this.initView();
	}
	
	protected initView():void
	{
		let bottomBg = BaseBitmap.create("public_9v_bg03");
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = GameConfig.stageHeigth - 69 - 94 + 15;
		bottomBg.y = 0; 
		this.addChild(bottomBg);

		let timeBg = BaseBitmap.create("acnewyear_middlebg");
		timeBg.x = GameConfig.stageWidth/2 - timeBg.width/2;
		timeBg.y = 0;
		this.addChild(timeBg);

		let vo = this.vo;
        let stTxt = App.DateUtil.getFormatBySecond(vo.st, 7);
		let etTxt = App.DateUtil.getFormatBySecond(vo.et - 86400 * 1, 7);
        this._timerText = ComponentManager.getTextField(LanguageManager.getlocal(`AcTurnTableViewTime`,[vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
	 	this._timerText.x = timeBg.x + timeBg.width / 2 - this._timerText.width / 2;
		this._timerText.y = timeBg.y + timeBg.height / 2 - this._timerText.height / 2;
        this.addChild(this._timerText);

		let aid = AcMayDayView.AID;
		let code = AcMayDayView.CODE;
		let tmpVo = Api.acVoApi.getActivityVoByAidAndCode(aid);

		let objList = this.cfg.recharge;
		let terList = {};

		
		let keys = Object.keys(objList);
		keys.sort((a:string,b:string)=>{
			return Number(a) - Number(b) ;
		});

 		let tmpRect =  new egret.Rectangle(0,0,610,bottomBg.height - 75);

		let scrollList = ComponentManager.getScrollList(AcMayDay2ScrollItem,keys,tmpRect);
		this._scrollList = scrollList;
		scrollList.setPosition(GameConfig.stageWidth / 2 - this._scrollList.width / 2,timeBg.y + timeBg.height); 
		this.addChild(scrollList);
		
	}

	private get cfg() : Config.AcCfg.MayDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayView.AID, AcMayDayView.CODE);
    }

    private get vo() : AcMayDayVo{
        return <AcMayDayVo>Api.acVoApi.getActivityVoByAidAndCode(AcMayDayView.AID, AcMayDayView.CODE);
	}

	protected getSheepType():number
	{
		return 2;
	}
	
	public dispose():void
	{	 
		this._scrollList =null;
		this._timerText = null;
		super.dispose();
	}
}