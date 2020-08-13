// TypeScript file

class EnjoyNightRewardScrollItem  extends ScrollListItem
{
 
	private _data=null;
	private _needTxt:BaseTextField =null;
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
		
		let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg14");  
		wordsBg.width = 600;
		
		this.addChild(wordsBg); 

		let bottom2:BaseBitmap = BaseBitmap.create("accarnivalview_tab_red");  
		bottom2.y = 10;
		bottom2.x = 2;
		bottom2.width =285;
		this.addChild(bottom2);   
		let rewarStr = data.getReward; 
		if(data.specialGift)
		{
			let newrewarStr = "1019_0_"+data.specialGift+"_"+this.itemData.uicode+''+"|"+rewarStr;
			rewarStr =newrewarStr;
		}
		this.tempStr = rewarStr;
		let rewardArr =  GameData.formatRewardItem(rewarStr);
		wordsBg.height = 250 + Math.floor((rewardArr.length-1)/5)*122; 


        let scroStartY = 65;
        let tmpX = 14;
        for (var index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true); 
			iconItem.setPosition(12 + (index%5)*117, 65+Math.floor(index/5)*122);
            this.addChild(iconItem);
        }

		this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 422);
        this._progress.setPosition(wordsBg.x + 15, wordsBg.y + wordsBg.height - this._progress.height - 25);
        this.addChild(this._progress);

		 
		//领取
		this._goBtn3 =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.collectHandler,this);
		this._goBtn3.x = 455;
		this._goBtn3.y = this._progress.y+this._progress.height/2-this._goBtn3.height/2;  
		this.addChild(this._goBtn3); 
 
		//当前充值进度（0／1）
		let needTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		needTxt.text =LanguageManager.getlocal("acWorshipChargePopupViewItemTitle-1",[data.needGem+""]);
		
		needTxt.width=bottom2.width;
		needTxt.x = bottom2.x+15;
		needTxt.y = bottom2.y+10;   
		this._needTxt =needTxt;
		this.addChild(needTxt);  
		this.update();  

	} 

	private refreshProgress() {
		var myRechargeNum = this.vo.getRechargeNum();
        let percentTxt = LanguageManager.getlocal("acCarnivalProgressText", [myRechargeNum+"", String(this._data.needGem)]);
        let percent = myRechargeNum / this._data.needGem;
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
		
		if(this._data.needGem<=this.vo.getRechargeNum())
		{   
            this.vo.tmpReward = this.tempStr;
			NetManager.request(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTGETRECHARGERWD,{"activeId":this.itemData.aid+"-"+this.itemData.uicode,"rechargeId":this.taskId});
		}
		else
		{ 	
			if(!this.vo.isInActy())
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}
			ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		} 
	}  

	public update():void
	{	
		if(!this.vo)
		{
			return;
		}  
		
		this.refreshProgress();
		var myRechargeNum = this.vo.getRechargeNum();
		if(this.vo&&this.vo.getRechargeFlag(this.taskId)==false)
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
		else
		{	
			if(myRechargeNum>=this._data.needGem)
			{
				this._goBtn3.setText("taskCollect");
				this._needTxt.text =LanguageManager.getlocal("acWorshipChargePopupViewItemTitle-1",[this._data.needGem+""]);
			}
			else
			{
				this._needTxt.text =LanguageManager.getlocal("acWorshipChargePopupViewItemTitle-1",[this._data.needGem+""]);
				this._goBtn3.setText("vipshopbtn");  
				if(!this.vo.isInActy())
				{
					App.DisplayUtil.changeToGray(this._goBtn3);  
				}
			}	
		}
	}
	private get vo():AcEnjoyNightVo
	{
		 let springCelebrateVo = <AcEnjoyNightVo>Api.acVoApi.getActivityVoByAidAndCode(this.itemData.aid,this.itemData.code); 
		 return  springCelebrateVo;
	} 

	public getSpaceY():number
	{
		return 10;
	}
	
	public dispose():void
    {	
		this._progress = null;
		this._data =null;
		this._needTxt =null;
		this._goBtn3 =null;
		this.taskId =null;
		this.tempStr='';


		super.dispose();
	}
}