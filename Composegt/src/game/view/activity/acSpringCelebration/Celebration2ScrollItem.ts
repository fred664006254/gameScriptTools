
class Celebration2ScrollItem  extends ScrollListItem
{
	 
 
	private _goBtn3:BaseButton =null;
	private _data:any = null;
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

		let spring_arrow:BaseBitmap = BaseBitmap.create("spring_arrow");  
		spring_arrow.x =140;
		spring_arrow.y = 35;
		this.addChild(spring_arrow);  
		 
		
		let itemCfg = Config.ItemCfg.getItemCfgById(Number(data.needItem));
		let icon = GameData.getItemIcon(itemCfg,false);
		this.addChild(icon) 
		icon.x=20;
		icon.y=10;
		var _data:any = itemCfg.id;
		icon.addTouch(this.openItemDes,this,_data); 
		
		let needIconTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		needIconTxt.text= data.needNum+"";
		needIconTxt.x = icon.x+70;
		needIconTxt.y = icon.y+80; 
		needIconTxt.width=30;
		needIconTxt.textAlign ="right";
		this.addChild(needIconTxt); 

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

		//兑换
		this._goBtn3 =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"exchange",this.collectHandler,this);
		this._goBtn3.x = 420;
		this._goBtn3.y = 45; 
		this.addChild(this._goBtn3); 
		
		//当前进度（0／1）
		let needTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		needTxt.text = LanguageManager.getlocal("springExchangedes",[1+"",data.limit+""]);
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
			let currNum = Api.itemVoApi.getItemNumInfoVoById(this._data.needItem);
			if(currNum>=this._data.needNum)
			{ 
				App.DisplayUtil.changeToNormal(this._goBtn3); 
			}
			else
			{
				App.DisplayUtil.changeToGray(this._goBtn3);
			}
		}

		if(this._needTxt)
		{		
			let exchangeNum = springCelebrateVo.getExchangeNum(this._data.key);
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

	private openItemDes (evt:egret.TouchEvent,_data):void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,_data);
	}

	public collectHandler():void
	{	
		let springCelebrateVo = <AcSpringCelebrateVo>Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID,AcSpringCelebrateView.CODE); 
		if(springCelebrateVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}

		let currNum = Api.itemVoApi.getItemNumInfoVoById(this._data.needItem);
		if(currNum>=this._data.needNum)
		{ 
			NetManager.request(NetRequestConst.ACTIVITY_GETSPRINGITEMB,{"activeId":AcSpringCelebrateView.AID+"-"+AcSpringCelebrateView.CODE,"exchangeId":""+this._data.key});
			return;
		}
		else
		{	
			let nameStr =  LanguageManager.getlocal("itemName_"+this._data.needItem);
			App.CommonUtil.showTip(	LanguageManager.getlocal("acSpringceItemDes",[nameStr]));
			return;
		} 
	}
   
	public getSpaceY():number
	{
		return 10;
	}
	
	public dispose():void
    {
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_SPRING_ITEM,this.update,this);  
		this._goBtn3=null;
		this._data =null;
		this._needTxt = null;
 		super.dispose();
	}
}