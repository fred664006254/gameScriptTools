
class WelfareViewFunctionScrollltem extends ScrollListItem {

	private _getBtn: BaseButton =null;
	private _unlockKey:string =null;

	public constructor() 
	{
		super();
	}

	protected initItem(index: number, data: any) 
    {	
		var functionBg:BaseBitmap =null;
		if(data.gameName=="prison"&&Api.switchVoApi.checkOpenNewPrison())
		{
			functionBg = BaseLoadBitmap.create("functionPreview"+data.key+"_2");  
		} 
		else
		{
			if(Api.switchVoApi.checkIsInBlueWife() && RES.hasRes(`functionPreview${data.key}_blueType`)){
				functionBg = BaseLoadBitmap.create(`functionPreview${data.key}_blueType`);
			}
			else{
				functionBg = BaseLoadBitmap.create("functionPreview"+data.key);  
			}			
		} 
		
		functionBg.x=0;
		functionBg.y=0;
		this.addChild(functionBg);
		this._unlockKey = data.key;
		
		let bottom:BaseBitmap = BaseBitmap.create("funtionbottom");  
		bottom.x=0;
		bottom.y=193;//-39;
		this.addChild(bottom); 

	 	//描述
		let describeTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		describeTxt.width=480;
		describeTxt.x = 10;
		describeTxt.y =bottom.y+5;
		describeTxt.text = LanguageManager.getlocal("functionModuleDes"+data.key)
		this.addChild(describeTxt);

		//描述2
		let describeTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		describeTxt2.width=480;
		describeTxt2.x = 10;
		describeTxt2.y =bottom.y+35;
		let str =LanguageManager.getlocal("unlockDes"+data.key);
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
		let str2:string = this.getStr(data.key);
		describeTxt3.text =str2;
		this.addChild(describeTxt3);


		let getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.clickGetBtnHandler,this);
		this._getBtn = getBtn;
		this._getBtn.setPosition(335,290);
		this.addChild(this._getBtn);

		let iconList: BaseDisplayObjectContainer[] = GameData.getRewardItemIcons(data.reward,true,false);
		if (iconList&&iconList.length>0) {
			
			// //额外赠送ICON
			let startX: number = 20;
			let startY: number = 280;
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
		if(modelName == `wifeBattle`){
			modelName = `wifebattle`
		}
		if(Api[modelName+"VoApi"]&&Api[modelName+"VoApi"].isShowNpc)
		{
			let isShowNpc:boolean=Api[modelName+"VoApi"].isShowNpc();
			if(isShowNpc==true)
			{
				let arr = Api.otherInfoVoApi.getUnlockList();
				if(arr[Number(data.key)]==1)
				{
					let hasGetSp = BaseBitmap.create("signin_had_get");
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
				describeTxt3.textColor =TextFieldConst.COLOR_WARN_RED;
			}
		}
		 
	}
	private refreshBtnState():void
	{
		if(this._getBtn)
		{
			let hasGetSp = BaseBitmap.create("signin_had_get");
			hasGetSp.x = this._getBtn.x;
			hasGetSp.y = this._getBtn.y;
			this.addChild(hasGetSp);
			this._getBtn.visible =false;
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
		//sadun 亲家 5
		//friend 好友 6 
		//search  寻访 7 
		//council  内阁
		//studyatk	wife

		let str:string ="";
		if(soId==2)
		{
			//红颜	wife
			let level = Api.playerVoApi.getPlayerLevel();
			let officStr = LanguageManager.getlocal("officialTitle"+level);
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+officStr]);
			return	str;
		}
		if(soId==1)
		{
			//当前打到第几章	prison
			let currId:number =Api.challengeVoApi.getCurBigChannelId();
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+currId]);
			return	str;
		}
		if(soId==3)
		{
			//子嗣	child
			let childNum = Api.childVoApi.getCnum();
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+childNum]);
			return	str;
		}
		if(soId==4)
		{
			//联姻	adult
			let num = Api.adultVoApi.getAdultMarryNum();
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+num]);
			return	str;
		}
		if(soId==5)
		{	//寻访	
			let level = Api.playerVoApi.getPlayerLevel();
			let officStr = LanguageManager.getlocal("officialTitle"+level);
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+officStr]);
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
		if(soId==7)
		{
			//酒楼
			let level = Api.playerVoApi.getPlayerLevel();
			let officStr = LanguageManager.getlocal("officialTitle"+level);
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+officStr]);
			return	str;
		}
		if(soId==8)
		{
			//联盟
			let level = Api.playerVoApi.getPlayerLevel();
			let officStr = LanguageManager.getlocal("officialTitle"+level);
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+officStr]);
			return	str;
		}
		if(soId==9)
		{
			//演武场
			let level = Api.playerVoApi.getPlayerLevel();
			let officStr = LanguageManager.getlocal("officialTitle"+level);
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+officStr]);
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
		if(soId==12)
		{		 
			let achVo =Api.achievementVoApi.getAchievementInfoVoById("403")  
			let level = Api.playerVoApi.getPlayerLevel(); 
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+achVo.v]);
			return	str;
			
		}
		if(soId==13)
		{
			//好友
			let level = Api.playerVoApi.getPlayerLevel();
			let officStr = LanguageManager.getlocal("officialTitle"+level);
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+officStr]);
			return	str;
		}
		if(soId==14)
		{
			//内阁
			let level = Api.playerVoApi.getPlayerLevel();
			let officStr = LanguageManager.getlocal("officialTitle"+level);
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+officStr]);
			return	str;
		}
		else if(soId==15)
		{
			
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+Api.servantVoApi.getServantCount()]);
			return	str;
		}
		else if(soId==16)
		{
			
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+Api.wifeVoApi.getWifeNum()]);
			return	str;
		}
		else if(soId==17)
		{	
			let str = ""
			if (Config.ServantweaponCfg.lvNeed > Api.playerVoApi.getPlayerLevel())
			{
				str +=  LanguageManager.getlocal("functionCurrentDes17_1",[LanguageManager.getlocal("officialTitle"+Api.playerVoApi.getPlayerLevel())]); 
			}
			else
			{
				str +=  LanguageManager.getlocal("functionCurrentDes17_4",[LanguageManager.getlocal("officialTitle"+Api.playerVoApi.getPlayerLevel())]); 
			}
			str += LanguageManager.getlocal("douhao");
			if (Config.GamepaceCfg.getWeaponPace() > Api.otherInfoVoApi.getServerOpenDay())
			{	
				let day = Config.GamepaceCfg.getWeaponPace() - Api.otherInfoVoApi.getServerOpenDay();
				str += LanguageManager.getlocal("functionCurrentDes17_2",[String(day)]);
			}
			else
			{
				str += LanguageManager.getlocal("functionCurrentDes17_3");
			}
			return	str;
		}
		else if(soId==18)
		{
			
			str = LanguageManager.getlocal("functionCurrentDes"+soId,[""+Api.wifestatusVoApi.getStatusWifeNum()]);
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

		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD),this.useCallback,this);
	
		this._getBtn =null;
		this._unlockKey =null;
		super.dispose();
	}
}