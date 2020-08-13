
class WelfareViewFunctionScrollltem extends ScrollListItem {

	private _getBtn: BaseButton =null;
	private _unlockKey:string =null;
	private _data:any;

	public constructor() 
	{
		super();
	}

	protected initItem(index: number, data: any) 
    {	
		this._data = data;
		var functionBg:BaseBitmap =null;
		if(data.gameName=="prison"&&Api.switchVoApi.checkOpenNewPrison())
		{
			functionBg = BaseLoadBitmap.create("functionPreview"+data.sortId+"_2");  
		} 
		else
		{
			if(Api.switchVoApi.checkIsInBlueWife()&&ResourceManager.hasRes("functionPreview"+data.sortId+"_blueType"))
			{
				functionBg = BaseLoadBitmap.create("functionPreview"+data.sortId+"_blueType");  
			}else{
				functionBg = BaseLoadBitmap.create("functionPreview"+data.sortId);  
			}
			
		} 

		functionBg.x=5;
		functionBg.y=0;
		this.addChild(functionBg);
		this._unlockKey = data.key;
		
		let bottom:BaseBitmap = BaseBitmap.create("funtionbottom");  
		bottom.x=0;
		bottom.width = 492;
		bottom.height = 173;
		bottom.y=200;//-39;
		this.addChild(bottom); 

	 	//描述
		let describeTxt = ComponentManager.getTextField("",19,TextFieldConst.COLOR_LIGHT_YELLOW);
		describeTxt.width=480;
		describeTxt.x = 10;
		describeTxt.y =bottom.y+8;
		describeTxt.text = LanguageManager.getlocal("funciontDes"+data.sortId)
		this.addChild(describeTxt);

		//描述2
		let describeTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		describeTxt2.width=450;
		describeTxt2.x = 10;
		describeTxt2.y =bottom.y+35;
		let str =LanguageManager.getlocal("unlockDes"+data.sortId);
		describeTxt2.text=str;
		this.addChild(describeTxt2);

		//当前文本
		let currTex = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		currTex.x = 10;
		currTex.y = bottom.y+60;
		let currStr = LanguageManager.getlocal("functionCurrDes"); 
		currTex.text =currStr +" ";
		this.addChild(currTex);

		//描述3
		let describeTxt3 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		describeTxt3.width=450;
		describeTxt3.x = currTex.x+currTex.width+2;
		describeTxt3.y = bottom.y+60;
		let str2:string = this.getStr(data.sortId);
		describeTxt3.text =str2;
		this.addChild(describeTxt3);


		let getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.clickGetBtnHandler,this);
		this._getBtn = getBtn;
		this._getBtn.setPosition(350,290);
		this.addChild(this._getBtn);

		let iconList: BaseDisplayObjectContainer[] = GameData.getRewardItemIcons(data.reward,true,false);
		if (iconList&&iconList.length>0) {
			
			// //额外赠送ICON
			let startX: number = 20;
			let startY: number = 283;
			let l: number = iconList.length;
			var _icon :BaseDisplayObjectContainer;
			for (let i: number = 0; i < l; i++) {
				let icon: BaseDisplayObjectContainer = iconList[i];
				icon.scaleX =0.74;
				icon.scaleY =0.74;
				icon.setPosition(startX + i * (icon.width*icon.scaleX + 12), startY);
				this.addChild(icon); 
				_icon =icon;
			} 
		}

		let modelName =data.gameName;
		if(Api[modelName+"VoApi"]&&Api[modelName+"VoApi"].isShowNpc)
		{
			let isShowNpc:boolean=Api[modelName+"VoApi"].isShowNpc();
			if(isShowNpc==true)
			{
				let arr = Api.otherInfoVoApi.getUnlockList();
				if(arr[Number(data.key)]==1)
				{
					let hasGetSp = BaseBitmap.create("collectflag");
					hasGetSp.x = this._getBtn.x;
					hasGetSp.y = this._getBtn.y;
					this.addChild(hasGetSp);
					this._getBtn.visible =false;
				}
				else
				{
					this._getBtn.visible = true;
				} 
				let str = LanguageManager.getlocal("functionCurrDes2");
				describeTxt3.text = str;//"已解锁";
				describeTxt3.textColor =TextFieldConst.COLOR_WARN_GREEN;
			}
			else
			{
				this._getBtn.touchEnabled =false;
				App.DisplayUtil.changeToGray(this._getBtn);
				describeTxt3.textColor =TextFieldConst.COLOR_WARN_RED3;
			}
		}
	}
	private refreshBtnState():void
	{

		let arr = Api.otherInfoVoApi.getUnlockList();
		
		if(this._getBtn)
		{
			if(arr[Number(this._data.key)]==1)
			{
				let hasGetSp = BaseBitmap.create("collectflag");
				hasGetSp.x = this._getBtn.x;
				hasGetSp.y = this._getBtn.y;
				this.addChild(hasGetSp);
				this._getBtn.visible =false;
			}
			else
			{
				this._getBtn.visible = true;
			} 
		}
		
	}

	private clickGetBtnHandler(evt:egret.TouchEvent):void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD),this.useCallback,this);
		NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD,{"unlockKey":this._unlockKey});
	}
	private useCallback(evt:egret.Event):void
	{
		if(evt.data.ret)
		{
			App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(evt.data.data.data.rewards));
			this.refreshBtnState();
		}
	}
	private getStr(soId:number):string
	{
		let str:string ="";
		if(soId==1)
		{
			//红颜
			let level = Api.playerVoApi.getPlayerLevel();
			let officStr = LanguageManager.getlocal("officialTitle"+level);
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+officStr]);
			return	str;
		}
		if(soId==3)
		{
			//当前打到第几章
			let currId:number =Api.challengeVoApi.getCurBigChannelId();
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+currId]);
			return	str;
		}
		if(soId==2)
		{
			//子嗣
			let childNum = Api.childVoApi.getCnum();
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+childNum]);
			return	str;
		}
		if(soId==4)
		{
			//联姻
			let num = Api.adultVoApi.getAdultMarryNum();
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+num]);
			return	str;
		}
		if(soId==5)
		{	//寻访
			let level = Api.composemapVoApi.getMaxLv();
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+level]);
			return	str;
		}
		if(soId==6)
		{
			//当前打到第几章  "{1}个门客且{2}门客等级大于等于60"
			let str1 = Api.servantVoApi.getServantCount();
			let str2 = Api.servantVoApi.getServantCountLevel60Plus();
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+str1,str2+""]);
			return	str;
		}
		if(soId==7||soId==8||soId==9)
		{
			//7酒楼 8联盟 9演武场
			let level = Api.composemapVoApi.getMaxLv();
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+level]);
			return	str;
		}if(soId==10)
		{
			//征伐
			let currId:number =Api.challengeVoApi.getCurBigChannelId();
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+currId]);
			return	str;
		}
		if(soId==11)
		{
			//商贸
			let level = Api.playerVoApi.getPlayerLevel();
			let officStr = LanguageManager.getlocal("officialTitle"+level);
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+officStr]);
			return	str;
		}
		return	str;
	}
	public getSpaceY(): number {
		return 1;
	}
	public getSpaceX(): number {
		return 0;
	}
	public dispose(): void 
	{
		this._getBtn =null;
		this._unlockKey =null;
		this._data=null;
		super.dispose();
	}
}