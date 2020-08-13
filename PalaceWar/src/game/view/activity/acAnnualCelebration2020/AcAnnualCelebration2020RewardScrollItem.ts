// TypeScript file

class AcAnnualCelebration2020RewardScrollItem  extends ScrollListItem
{
 
	private _data=null;
	private _goBtn3:BaseButton =null;
	private taskId:number = 0;

	private itemData:any =null;
	private tempStr="";
	/**
    * 充值进度条
    */
    private _progress: ProgressBar = null;
	public constructor() 
	{
		super();
	}
	protected initItem(index:number,data:any,itemData:any)
    {	

		this._data = data;
		this.itemData  = itemData;
		this.taskId = data.id; 
		
		let wordsBg:BaseBitmap = BaseBitmap.create("newsingledaytab2bottombg-1");  
		// wordsBg.width = 600;
		
		this.addChild(wordsBg); 
		let view = this;
		let bottom2:BaseBitmap = BaseBitmap.create("acmidautumnview_titlebg");  
		
		bottom2.width = view.width-20;
		bottom2.y = 6;
		bottom2.x = 10;
		this.addChild(bottom2);   

		let line = BaseBitmap.create(`public_line3`);
		view.addChild(line);

		let maxcircle = this.cfg.getMaxCircle();
		let roundTxt = ComponentManager.getTextField(LanguageManager.getlocal(data.id >= maxcircle ? `acTreasureRoundNum2-1` : `acTreasureRoundNum-1`, [data.needNum]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		line.width = roundTxt.textWidth + 280;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, bottom2);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, roundTxt, line);
		view.addChild(roundTxt);

		let rewarStr = data.getReward; 
		
		this.tempStr = rewarStr;
		let rewardArr =  GameData.formatRewardItem(rewarStr);
		wordsBg.height = 240 + Math.floor((rewardArr.length-1)/5)*122; 

		let posx = 15;
        for (var index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true); 
			iconItem.setPosition(12+posx + (index%5)*117, 55+Math.floor(index/5)*122);
            this.addChild(iconItem);
        }

		this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 422);
        this._progress.setPosition(wordsBg.x + 15+posx, wordsBg.y + wordsBg.height - this._progress.height - 25);
        this.addChild(this._progress);

		 
		//领取
		this._goBtn3 =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.collectHandler,this);
		this._goBtn3.x = 455+posx;
		this._goBtn3.y = this._progress.y+this._progress.height/2-this._goBtn3.height/2;  
		this.addChild(this._goBtn3); 
		
		this.update();  
	} 

	public update():void
	{	
		if(!this.vo)
		{
			return;
		}  
		
		
		var myRechargeNum = this.vo.getCircleNum();

		let maxcircle = this.cfg.getMaxCircle();
		if (this.taskId >= maxcircle)
		{
			this.taskId = this.vo.getMaxGetIndex();
			if (!this.vo.getCircleFlag(this.taskId))
			{
				this.taskId+=1;
			}
		}
		this.refreshProgress();

		if(this.vo&&this.vo.getCircleFlag(this.taskId)==false)
		{
			if(this._goBtn3.visible==true)
			{
				this._goBtn3.visible=false;	 
				let collectflag = BaseBitmap.create("collectflag");
				collectflag.x = this._goBtn3.x;
				collectflag.y = this._goBtn3.y-30;
				collectflag.scaleX=0.7; 
				collectflag.scaleY=0.7;
				this.addChild(collectflag); 
			}
		}
		if(myRechargeNum<this.taskId)
		{
			App.DisplayUtil.changeToGray(this._goBtn3);  
		}
	}

	private refreshProgress() {
		var myRechargeNum = this.vo.getCircleNum();
        let percentTxt = LanguageManager.getlocal("acPunishStoreUseNum-12", [myRechargeNum+"", String(this.taskId)]);
        let percent = myRechargeNum / this.taskId;
    
		
		this._progress.setText(percentTxt)
        this._progress.setPercentage(percent);
    }

	private collectHandler(evt:egret.TouchEvent):void
	{ 
	   if(this.vo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		
		if(this.taskId<=this.vo.getCircleNum())
		{   
            this.vo.tmpReward = this.tempStr;
			NetManager.request(NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020CIRCLE,{"activeId":this.itemData.aid+"-"+this.itemData.uicode,"circleId":this.taskId});
		}
		else
		{ 	
			if(!this.vo.isInActy())
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}
			App.CommonUtil.showTip(LanguageManager.getlocal("acAC2020_taskcannot"));
			// ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		} 
	}  

	private get vo():AcAnnualCelebration2020Vo
	{
		 let springCelebrateVo = <AcAnnualCelebration2020Vo>Api.acVoApi.getActivityVoByAidAndCode(this.itemData.aid,this.itemData.code); 
		 return  springCelebrateVo;
	} 

	private get cfg() : Config.AcCfg.AnnualCelebration2020Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.itemData.aid, this.itemData.code);
	}

	public getSpaceY():number
	{
		return 10;
	}
	
	public dispose():void
    {	
		this._progress = null;
		this._data =null;
		this._goBtn3 =null;
		this.taskId =null;
		this.tempStr='';


		super.dispose();
	}
}