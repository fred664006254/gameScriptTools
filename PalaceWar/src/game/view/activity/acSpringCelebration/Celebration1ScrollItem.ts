/**
 * 春季送礼 item
 */
class Celebration1ScrollItem  extends ScrollListItem
{
 
	private _data=null;
	private _needTxt:BaseTextField =null;
	private _goBtn3:BaseButton =null;
	private cu_index :number =0;  

	public constructor() 
	{
		super();
	}
	protected initItem(index:number,data:any)
    {	
 		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_SPRING_ITEM,this.update,this);  
	
		this._data = data;
		this.cu_index = Number(data.key); 
		
		let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg14");  
		wordsBg.width = 598;
		wordsBg.height = 170; 
		this.addChild(wordsBg); 

		let bottom2:BaseBitmap = BaseBitmap.create("activity_charge_red");  
		bottom2.width =405;
		this.addChild(bottom2);  

		//活动期间充值
		let taskTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		taskTxt.text =LanguageManager.getlocal("acSpringCelebrationRechargedes",[data.needGem+""]);
		taskTxt.width=bottom2.width;
		taskTxt.x = bottom2.x+15;
		taskTxt.y = bottom2.y+10; 
		this.addChild(taskTxt); 
		bottom2.width =taskTxt.textWidth+35;
	
		let iconList: BaseDisplayObjectContainer[] = GameData.getRewardItemIcons(data.getReward,true);
		if (iconList&&iconList.length>0) {
			
			//额外赠送ICON
			let startX: number = 20;
			let startY: number = 50;
			let l: number = iconList.length;
			var _icon :BaseDisplayObjectContainer;
			for (let i: number = 0; i < l; i++) {
				let icon: BaseDisplayObjectContainer = iconList[i]; 
				icon.setPosition(startX + i * (icon.width*icon.scaleX + 12), startY);
				this.addChild(icon); 
			}
		}

		 
		//领取
		this._goBtn3 =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"taskCollect",this.collectHandler,this);
		this._goBtn3.x = 420;
		this._goBtn3.y = 75; 
		this.addChild(this._goBtn3); 
 
		//当前充值进度（0／1）
		let needTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
		needTxt.width= this._goBtn3.width+50;
		needTxt.x = this._goBtn3.x-20;
		needTxt.y = this._goBtn3.y-30;
		needTxt.textAlign = "center";
		this._needTxt =needTxt;
		this.addChild(needTxt); 

		this.update(); 
 
	}
	
	 
	private collectHandler(evt:egret.TouchEvent):void
	{
		
	   let springCelebrateVo = <AcSpringCelebrateVo>Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID,AcSpringCelebrateView.CODE); 

		

	   if(springCelebrateVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		
		if(this._data.needGem<=springCelebrateVo.getAinfoV())
		{ 
			let newRechargeNum = this.cu_index;
			NetManager.request(NetRequestConst.ACTIVITY_GETSPRINGITEMA,{"activeId":AcSpringCelebrateView.AID+"-"+AcSpringCelebrateView.CODE,"rechargeId":newRechargeNum});
		}
		else
		{
			if(springCelebrateVo.isExchange()==true)
			{ 
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_SPRING_ITEM);
				return;
			}
			ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		} 
	}  

	public update():void
	{	
		let tmpVo = <AcSpringCelebrateVo>Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID,AcSpringCelebrateView.CODE); 
		if(!tmpVo)
		{
			return;
		}  
		var myRechargeNum = tmpVo.getAinfoV();
		if(tmpVo&&tmpVo.getReceiveType(this.cu_index)==false)
		{
			if(this._goBtn3.visible==true)
			{
				this._goBtn3.visible=false;	
				this._needTxt.visible =false;
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
			if(myRechargeNum>=this._data.needGem)
			{
				this._goBtn3.setText("taskCollect");
				this._needTxt.text =LanguageManager.getlocal("springcelebrationNeedStr",[myRechargeNum+"",this._data.needGem+""]);
			}
			else
			{
				this._needTxt.text =LanguageManager.getlocal("springcelebrationNeedStr2",[myRechargeNum+"",this._data.needGem+""]);
				this._goBtn3.setText("vipshopbtn"); 
				
				if(tmpVo.isExchange()==true)
				{
					App.DisplayUtil.changeToGray(this._goBtn3);
					this._goBtn3.touchEnabled =false;
				}
			}	
		}

	}

	public getSpaceY():number
	{
		return 10;
	}
	
	public dispose():void
    {	
		this._data =null;
		this._needTxt =null;
		this._goBtn3 =null;
		this.cu_index =0;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_SPRING_ITEM,this.update,this); 
		super.dispose();
	}
}