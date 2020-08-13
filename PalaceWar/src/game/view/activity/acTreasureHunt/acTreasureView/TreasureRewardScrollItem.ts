/**
 * 元旦活动 item
 */
class TreasureRewardScrollItem  extends ScrollListItem
{
 
	private _data=null;
	private _needTxt:BaseTextField =null;
	private _goBtn3:BaseButton =null;
	private cu_index :number =0;  
	private taskId:string ="";

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
 	 	// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS),this.update,this); 
		// App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.update,this);
		this._data = data;
		this.itemData  = itemData;
		this.cu_index = Number(data.questType); 
		this.taskId = data.name; 
		
		let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg14");  
		wordsBg.width = 588;
		wordsBg.height = 170; 
		this.addChild(wordsBg); 

		let bottom2:BaseBitmap = BaseBitmap.create("activity_charge_red");  
		bottom2.width =405;
		this.addChild(bottom2);   
		let rewarStr = data.getReward; 
		if(data.specialReward)
		{
			let newrewarStr = "1003_0_"+data.specialReward+"_"+this.itemData.code+''+"|"+rewarStr;
			rewarStr =newrewarStr;
		}
		this.tempStr = rewarStr;
		let rewardArr =  GameData.formatRewardItem(rewarStr);
        let scroStartY = 80;
        let tmpX = 14;
        for (var index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true,true); 
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
			iconItem.setScale(0.78);
            tmpX += (iconItem.width-8);
            if (tmpX > wordsBg.width-128)
            {
                tmpX = 14;
                scroStartY += iconItem.height-5;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width-8);
            } 
            this.addChild(iconItem);
        }
        scroStartY += 130;
        wordsBg.height = scroStartY+20;
        this.height = wordsBg.height; 

		this._progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 376);
        this._progress.setPosition(wordsBg.x+10,this.height-50);
        this.addChild(this._progress);

		 
		//领取
		this._goBtn3 =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"taskCollect",this.collectHandler,this);
		this._goBtn3.x = 410;
		this._goBtn3.y = this.height/2 -this._goBtn3.height/2;//75; 
		this.addChild(this._goBtn3); 
 
		//当前充值进度（0／1）
		let needTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		needTxt.text =LanguageManager.getlocal("acTreasureRewardes",[data.value+""]);
		
		needTxt.width=bottom2.width;
		needTxt.x = bottom2.x+15;
		needTxt.y = bottom2.y+10;   
		this._needTxt =needTxt;
		this.addChild(needTxt);  
		this.update();  

	} 

	private refreshProgress() {
		var myRechargeNum = this.vo.getAinfoV();
        let percentTxt = LanguageManager.getlocal("acCarnivalProgressText", [myRechargeNum+"", String(this._data.value)]);
        let percent = myRechargeNum / this._data.value;
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

		if(!this.vo.isInActy()){
            App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
            return;
        }
		
		if(this._data.value<=this.vo.getAinfoV())
		{ 
			let newRechargeNum = this.taskId;
			this.vo.tmpReward = this.tempStr;
			NetManager.request(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS,{"activeId":this.itemData.aid+"-"+this.itemData.code,"taskId":newRechargeNum});
		}
		else
		{ 
			ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		} 
	}  

	public update():void
	{	
		if(!this.vo)
		{
			return;
		}  
		if(!this.vo.isInActy())
		{
			App.DisplayUtil.changeToGray(this._goBtn3);  
			return; 
		}
		this.refreshProgress();
		var myRechargeNum = this.vo.getAinfoV();
		if(this.vo&&this.vo.getReceiveType(this.taskId)==false)
		{
			if(this._goBtn3.visible==true)
			{
				this._goBtn3.visible=false;	 
				let collectflag = BaseBitmap.create("collectflag");
				collectflag.x = 450;
				collectflag.y = 50;
				collectflag.scaleX=0.7; 
				collectflag.scaleY=0.7;
				this.addChild(collectflag); 
			}
		}
		else
		{	
			if(myRechargeNum>=this._data.value)
			{
				this._goBtn3.setText("taskCollect");
				this._needTxt.text =LanguageManager.getlocal("acTreasureRewardes",[this._data.value+""]);
			}
			else
			{
				this._needTxt.text =LanguageManager.getlocal("acTreasureRewardes",[this._data.value+""]);
				this._goBtn3.setText("vipshopbtn");  
			}	
		}
	}
	private get vo():AcTreasureHuntVo
	{
		 let springCelebrateVo = <AcTreasureHuntVo>Api.acVoApi.getActivityVoByAidAndCode(this.itemData.aid,this.itemData.code); 
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
		this.cu_index =0;
		this.taskId =null;
		this.tempStr='';
		// App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.update,this);
	 	// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS),this.update,this); 
		super.dispose();
	}
}