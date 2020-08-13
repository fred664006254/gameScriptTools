class WelfareViewRealname extends WelfareViewTab
{
 
	private authenticationState:number=0; //0未认证 1已认证
	private authenticationStateText:BaseTextField =null; 
	private authenticationBtn:BaseButton =null;
	private receiveBtn:BaseButton =null;
	private hasGetSp:BaseBitmap =null;
	private _isReceive:boolean=false;//true  未领取
	
	public constructor() 
	{
		super();
	}

	protected init():void
	{
		super.init();
		this.authenticationState=PlatformManager.client.checkPerson()?1:0;

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETAUTHOR3KREWARD),this.useCallback,this);	
	
		let temW = 491;
		let str ="";
		if(this.authenticationState==1)
		{
			str ="realnamedes7";
		}
		else
		{
			str ="realnamedes1";
		}
		
        //实名认证状态
        let authenticationStateText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(str),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		authenticationStateText.x = 10;
		authenticationStateText.y = 180;
		this.addChild(authenticationStateText);
		this.authenticationStateText= authenticationStateText;

		//认证描述
        let realnameDes:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("realnamedes2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		realnameDes.x = 30;
		realnameDes.y = 230;
		realnameDes.width =440;
		this.addChild(realnameDes);


		let bg= BaseBitmap.create("public_9_bg21");
		bg.width = 450;
		bg.height = 300;
		bg.x = 20; 
		bg.y = 280;
		this.addChild(bg);

		//描述长的
        let realnameDes2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("realnamedes3"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		realnameDes2.x = 30;
		realnameDes2.width= 430;
		realnameDes2.y = 300;
		realnameDes2.lineSpacing =5;
		this.addChild(realnameDes2);

	
		let line1 = BaseBitmap.create("public_line3");
		line1.width = temW - 10;
		line1.x = temW/2 - line1.width/2;
		line1.y = bg.y+bg.height+20;
		this.addChild(line1);
		
		//实名认证奖励
		let nameTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("realnamedes4"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		nameTF.x = line1.x + line1.width/2 - nameTF.width/2;
		nameTF.y = line1.y;
		this.addChild(nameTF);

		let temScale = 0.8;
		let spaceW = 15;
		let spaceH = 10;
		let rewardList = GameData.formatRewardItem(Config.GameprojectCfg.rewardID3K); 
		let totalNum = rewardList.length;

		let bg2= BaseBitmap.create("public_9_bg21");
		bg2.width = 450;
		bg2.x = 20; 
		bg2.y =line1.y+30;
		this.addChild(bg2);
		let iconHeight:number=0;
		for(let i = 0;i<rewardList.length;i++)
		{
			let icon =GameData.getItemIcon(rewardList[i],true,true);
			icon.scaleX = icon.scaleY = temScale;
			icon.x = bg.x + bg.width/2 + (icon.width*temScale)*(i - totalNum/2)+ spaceW*(i - (totalNum-1)/2);
			icon.y = line1.y+ 50;
			this.addChild(icon);
			iconHeight=icon.height;
		}
		bg2.height = iconHeight+20;

		let str2:string ="";
		if(this.authenticationState==1)
		{
			str2 ="realnamedes8";

		}else
		{
			str2 ="realnamedes5";
		}
		//去认证
		let authenticationBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, str2, this.authenticationBtnHandler, this);
		authenticationBtn.setPosition(70, bg2.y+bg2.height + 30);
		this.addChild(authenticationBtn);
		this.authenticationBtn= authenticationBtn;

		//领取
		let receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "realnamedes6", this.receiveBtnHandler, this);
		receiveBtn.setPosition(280, bg2.y+bg2.height+ 30);
		this.addChild(receiveBtn);
		this.receiveBtn= receiveBtn;
		this.receiveBtn.visible =false;
		
		//已领取
		let hasGetSp = BaseBitmap.create("signin_had_get");
		hasGetSp.x = receiveBtn.x;
		hasGetSp.y = receiveBtn.y+5;
		this.addChild(hasGetSp);
		this.hasGetSp =hasGetSp;
		this.hasGetSp.visible =false;
		
		this.isReceive();//是否领取状态

	}
	private isReceive():void
	{
		this._isReceive=Api.otherInfoVoApi.checkrealnamerewards();
		if(this._isReceive==true)
		{
			this.receiveBtn.visible =true;
			if(this.authenticationState==1)
			{
				this.receiveBtn.touchEnabled=true;
				App.DisplayUtil.changeToNormal(this.receiveBtn);
			}
			else
			{
				this.receiveBtn.touchEnabled=false;
				App.DisplayUtil.changeToGray(this.receiveBtn);
			}
			
		}
		else
		{
			this.receiveBtn.visible =false;
			this.hasGetSp.visible =true;
		}
	}
	private is3kuseCallback(event:egret.Event=null):void
	{

	}
	private useCallback(event:egret.Event=null):void
	{
		if(event.data.data.data.rewards)
		{
			let curr_point = new egret.Point(GameConfig.stage.width/2,GameConfig.stageHeigth/2+100);
			App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(event.data.data.data.rewards),curr_point);
			this.isReceive();

		}
		 
	}
	private rest():void
	{
		this.isReceive();
		this.restStr();
	}
	private restStr():void
	{
		let str ="";
		if(this.authenticationState==1)
		{
			str ="realnamedes1";
			 
		}
		else
		{
			str ="realnamedes7";
		
		}
		if(this.authenticationBtn)
		{
			if(this.authenticationState==1)
			{
				let str2 ="realnamedes8";
				this.authenticationBtn.touchEnabled =false;
				this.authenticationBtn.setText(str2);
			}
		
		}
		if(this.authenticationStateText)
		{
			this.authenticationStateText.text =LanguageManager.getlocal(str);
		}
		
	}

	//去认证
	private authenticationBtnHandler(evt:egret.TouchEvent):void
	{	
		//已经认证过的不给反馈
		if(	this.authenticationState==1)
		{
			return
		}
		PlatformManager.client.showPersonView(()=>{
			console.log("认证结果");
			this.rest();
		});
	}

	//领取
	private receiveBtnHandler(evt:egret.TouchEvent):void
	{
     	NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETAUTHOR3KREWARD,null);
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETAUTHOR3KREWARD),this.useCallback,this);	
		this.authenticationState=0;
		this.authenticationStateText=null;
		this.authenticationBtn =null;
		this.receiveBtn=null;
		this.hasGetSp=null;
		this._isReceive=false;
		super.dispose();
	}
}