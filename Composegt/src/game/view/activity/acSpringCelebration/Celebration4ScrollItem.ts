
class Celebration4ScrollItem  extends ScrollListItem
{
	
	private _goBtn3:BaseButton =null;
	private _data:any =[];
	private _needTxt:BaseTextField = null;

	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any)
    {
	 	App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_SPRING_ITEM,this.update,this);  
		this._data =data;

		let wordsBg:BaseBitmap = BaseBitmap.create("public_9v_bg04");  
		wordsBg.width = 606;
		wordsBg.height = 126; 
		this.addChild(wordsBg);  

		let spring_arrow:BaseBitmap = BaseBitmap.create("spring_sign");  
		spring_arrow.x =140;
		spring_arrow.y = 35;
		this.addChild(spring_arrow); 
		 
		let contentList:Array<RewardItemVo> = GameData.formatRewardItem(data.needItem);
		var iconBg:BaseBitmap = BaseBitmap.create("itembg_7");
		this.addChild(iconBg); 
		iconBg.x=20;
		iconBg.y=10;
		
		let needIcon = BaseLoadBitmap.create("itemicon"+1)
		needIcon.scaleX =needIcon.scaleY = 0.78;
		needIcon.x = iconBg.x+15;
		needIcon.y = iconBg.y+10;
		this.addChild(needIcon); 
		
		let needIconTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		needIconTxt.text = data.cost;
		needIconTxt.x = iconBg.x+50;
		needIconTxt.y = iconBg.y+80; 
		needIconTxt.width=50;
		needIconTxt.textAlign ="right";
		this.addChild(needIconTxt); 

		let cornerSp:BaseBitmap = BaseBitmap.create("shopview_corner");
		// cornerSp.x = 3;
		// cornerSp.y = 1;
		this.addChild(cornerSp);

		let discountTF:BaseTextField = ComponentManager.getTextField("",18,TextFieldConst.COLOR_LIGHT_YELLOW);
		discountTF.x = 9;
		discountTF.y = 25;
		discountTF.rotation = -40;
		let num =data.discount*10;
		discountTF.text = LanguageManager.getlocal("discountTitle",[num+""]); 

		this.addChild(discountTF);

		let tagnum = 10 - data.discount * 10;
		if(PlatformManager.checkIsKRSp() || PlatformManager.checkIsJPSp()||PlatformManager.checkIsKRNewSp()){
			discountTF.x = 5;
			discountTF.y = 30;
			discountTF.text = LanguageManager.getlocal('discountTitle', [tagnum.toString()]);
		}
		if(PlatformManager.checkIsViSp()){
			discountTF.text = `-${tagnum * 10}%`;
		}

		let iconList: BaseDisplayObjectContainer[] = GameData.getRewardItemIcons(data.getReward,true);
		if (iconList&&iconList.length>0) {
			//额外赠送ICON
			let startX: number = 220;
			let startY: number = 10;
			let l: number = iconList.length;
			var _icon :BaseDisplayObjectContainer;
			for (let i: number = 0; i < l; i++) {
				let icon: BaseDisplayObjectContainer = iconList[i];
				// icon.scaleX =0.78;
				// icon.scaleY =0.78;
				icon.setPosition(startX + i * (icon.width*icon.scaleX + 12), startY);
				this.addChild(icon); 
			}
		}

		//领取
		this._goBtn3 =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"exchange",this.collectHandler,this);
		this._goBtn3.x = 420;
		this._goBtn3.y = 45; 
		this.addChild(this._goBtn3); 
		
		//当前进度（0／1）
		let needTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		needTxt.text =LanguageManager.getlocal("springExchangedes",[1+"",data.limit+""]);
		needTxt.x = this._goBtn3.x-30;
		needTxt.y = this._goBtn3.y-25;
		needTxt.width =this._goBtn3.width+55;
		needTxt.textAlign = "center";
		this._needTxt = needTxt;
		this.addChild(needTxt);
		
		this.update();

	}  

	private update():void
	{
		let springCelebrateVo = <AcSpringCelebrateVo>Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID,AcSpringCelebrateView.CODE); 
		if(!springCelebrateVo)
		{
			return;
		}

		if(this._goBtn3)
		{	 
			
			if(Api.playerVoApi.getPlayerGem()>=this._data.cost)
			{ 
				App.DisplayUtil.changeToNormal(this._goBtn3); 
			}
			else
			{
				App.DisplayUtil.changeToGray(this._goBtn3);
			}
		}

		if(springCelebrateVo.isExchange()==true)
		{
			App.DisplayUtil.changeToGray(this._goBtn3);
			this._goBtn3.touchEnabled =false; 
		}  
			 
		if(this._needTxt)
		{		
			let exchangeNum = springCelebrateVo.getExchange4Num(this._data.key);
			this._needTxt.text = LanguageManager.getlocal("springExchangedes",[exchangeNum+"",this._data.limit+""]);

			if(exchangeNum==this._data.limit)
			{
				this._goBtn3.setText("acSpringOutofstock");
				App.DisplayUtil.changeToGray(this._goBtn3);
				this._goBtn3.touchEnabled =false;
				this._goBtn3.y=45;
				this._needTxt.visible =false;
			}
		}
	}  

	public collectHandler():void
	{	
		let springCelebrateVo = <AcSpringCelebrateVo>Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID,AcSpringCelebrateView.CODE); 
		if(springCelebrateVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		if(springCelebrateVo.isExchange()==true)
		{ 
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_SPRING_ITEM);
			return;
		}

		if(Api.playerVoApi.getPlayerGem()>=this._data.cost)
		{
			NetManager.request(NetRequestConst.ACTIVITY_GETSPRINGITEMD,{"activeId":AcSpringCelebrateView.AID+"-"+AcSpringCelebrateView.CODE,"shopId":""+this._data.key});
			return; 
		}
		else
		{ 
			App.CommonUtil.showTip(LanguageManager.getlocal("springAcerNotenoughdes"));
			return;
		} 
	}
   
	public getSpaceY():number
	{
		return 10;
	}
	
	public dispose():void
    {
		this._needTxt=null;
		this._data=null;
		this._goBtn3 =null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_SPRING_ITEM,this.update,this);  
		super.dispose();
	}
}