/*
 *@author: yangtao 
 *@update date: 2020-06-04 11:08:18
 *@version 2.1.0
 */
class SingInItem extends ScrollListItem
{
	// 签到状态
	private _signinfoVo:Config.SiginCfgItem;
	// 背景
	private _bg:BaseBitmap;
	// 是否开始点击
	private _isBegin:boolean;
	// 签到标题
	private _signTitleTF:BaseTextField;
	// 签到获得数量
	private _signNum:BaseTextField;
	// 背景光效
	private _signlight:BaseBitmap;
	private _selectedSp:BaseBitmap = null;
	private _selectedIndex:number;
	private _signID;
	
	public constructor() 
	{
		super();
	}
	protected initItem(index:number,data:any)
    {
		this._selectedIndex = index;

		this._signID = data;
		let temW = 168;
		let temH = 196;
		this.width = temW;
		this.height = temH;

		this.width = temW+6;
		this.height = temH + 10;

		let titleText = ComponentMgr.getTextField('11', TextFieldConst.SIZE_26,ColorEnums.white);
		titleText.stroke = 2;
		if(Api.SigninfoVoApi.getSignWeek()){
			titleText.text = LangMger.getlocal(`sign_day_${Number(data)-7}`);
		}else{
			titleText.text = LangMger.getlocal(`sign_day_${Number(data)}`);
		}

		let bgSkin:string;
		if(Api.SigninfoVoApi.getSignCom(data)){
			bgSkin = "singin_geting_bg";
			titleText.textColor = ColorEnums.red;
			
		}else{
			bgSkin = "singin_get_bg";
			titleText.textColor = ColorEnums.white;
			
		}
		let bg:BaseBitmap = BaseBitmap.create(bgSkin);
		this._bg = bg;
		bg.width = temW;
		bg.height = temH;
		this.addChild(bg);
		bg.addTouchTap(this.tick, this,[data]);
		if(Api.SigninfoVoApi.getSignCom(data)){
			this._signlight = BaseBitmap.create("singin_light");
			this._signlight.anchorOffsetX = this._signlight.width/2;
			this._signlight.anchorOffsetY = this._signlight.height/2;
			this.addChild(this._signlight);
			egret.Tween.get(this._signlight,{loop:true}).to({rotation:360},3000);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,this._signlight,bg); 
		}
		this.addChild(titleText);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,titleText,bg,[0,8]);
		let freerewardvo = GameData.formatRewardItem(Config.SignCfg.getSignInfoByID(data))[0];
		let freeicon : BaseDisplayObjectContainer;
		if(Api.SigninfoVoApi.getSignTou(data)){
			freeicon = GameData.getItemIcon(freerewardvo, 0, true);
		}else{
			freeicon = GameData.getItemIcon(freerewardvo, 0, false);
		}
		this.addChild(freeicon);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,freeicon,bg);
		if(Api.SigninfoVoApi.getSign(data)){
			let signMask = BaseBitmap.create("singin_mask_1");
			this.addChild(signMask);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,signMask,bg);
			App.DisplayUtil.changeToGray(signMask);
			let signGet = BaseBitmap.create("singin_get");
			this.addChild(signGet);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom,signGet,bg,[0,13]);
			freeicon.touchEnabled = false;

		}else{
			let numText = ComponentMgr.getTextField('11', TextFieldConst.SIZE_26,ColorEnums.white);
			numText.text = "x"+freerewardvo.num;
			numText.stroke = 2;
			this.addChild(numText);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom,numText,bg,[0,19]);
		}
	}


	private tick(event:egret.TouchEvent,data):void{
		if(Api.SigninfoVoApi.getSignCom(data)){
			Api.UserinfoVoApi.setFreshInfo(false, new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2));
			NetManager.request(NetConst.SIGNINFO_SIGN, {});
		}
		// if(Api.SigninfoVoApi.getSignTou(data)&&Api.SigninfoVoApi.getSignHsa())
		// {
		// 	let freerewardvo = GameData.formatRewardItem(Config.SignCfg.getSignInfoByID(data))[0];
		// 	if(Api.SigninfoVoApi.getShowBool(freerewardvo.type)){
		// 		ViewController.getInstance().openView(ViewConst.SIGNSHOWPOPVIEW, {
		// 			title : freerewardvo.name,
		// 			handler : null,
		// 			needCancel : false,
		// 			needClose : 1,
		// 			param : freerewardvo,
		// 			costnum :LangMger.getlocal("sysconfirm"),
		// 			// costIcon : `ab_mainui_gem`
		// 		});
		// 	}
		// }

		
		
	}
	private ticks():void{
		this._signlight.rotation+=60;
	}


	public getSpaceY():number
	{
		return 10;
	}

	public getSpaceX():number{
		return 0;
	}

	public dispose():void
    {
		this._bg = null;
		this._signinfoVo = null;
		this._signlight =null;
		//this._mailTitleTF = null;
		super.dispose();
	}
}