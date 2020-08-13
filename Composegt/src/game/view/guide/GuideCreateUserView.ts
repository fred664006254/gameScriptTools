/**
 * 创建用户界面
 * author dukunayng
 * date 2017/10/16
 * @class GuideCreateUserView
 */

class GuideCreateUserView extends CommonView
{

	private _inputTextField:BaseTextField;
	private _myBody:BaseLoadBitmap | BaseLoadDragonBones;
	private _myHead:BaseLoadBitmap;
	private _myHair:BaseLoadBitmap;
	private _container:BaseDisplayObjectContainer;
	private _selectBg:BaseBitmap;
	private _index:number = 0;
	private _userName:string;
	private _userNameCount:number = 0;

	private _manIcon:BaseBitmap;
	private _womanIcon:BaseBitmap;
	private _curSex:number = 1; //1男2女
	private _lastSex:number = 1;

	private _manHeadContainer:BaseDisplayObjectContainer;
	private _womanHeadContainer:BaseDisplayObjectContainer;

	private _posContainer:BaseDisplayObjectContainer;
	private _picNum:number=1;
	private _sextype:number =0;
	private _headBg:BaseBitmap;
	private _startX : number = 0;
	private _startY : number = 0;
	private _isUpdate: boolean = false;
	private _isLoad: boolean = false;

	private _loadNum: number = 0;
	private _maxLoadNum :number = 0;
	private _enterSecond:number = 20;
	private _enterTxt:BaseTextField;

	public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		let rewardPic:string[] = ["guide_createuserbg","user_body_full_3001","dinner_jz_01","guide_uesrheadbg",
		// "user_head2","user_head3","user_head4","user_head5",
		// "user_head6","user_head7","user_head8","user_head9","user_head10",
		// "user_hair6","user_hair7","user_hair8","user_hair9","user_hair10",
		// "user_head1",
		"shield_cn",
		// "guide_manicon_2","guide_womanicon_2",
		"guide_bottom","guide_manicon","guide_womanicon","guide_namebg"
		];

		return super.getResourceList().concat(rewardPic);
	} 

	protected getCloseBtnName():string
	{
		if (!this.param )
		{
			return null;
		}else
		{
			return super.getCloseBtnName();
		}
		
	}
	// 背景图名称
	protected getBgName():string
	{
		return "guide_createuserbg";
	}
	
	protected initView():void
	{

		 ViewController.getInstance().hideView("LoginView");
		// let tipBB:BaseBitmap = BaseBitmap.create("guide_createuserbg");
		// tipBB.setPosition(0,-20);
		// this.addChildToContainer(tipBB);
		PlatformManager.analyticsNewGuide(2);
		let tmpHeadId = 1;
		if(this.param && this.param.data.changeImg && Api.playerVoApi.getPlayePicId() < 5000){
			tmpHeadId = Api.playerVoApi.getPlayePicId();
		}
		let resPath = "palace_db_3201";
		// let t = false;
		if(App.DeviceUtil.CheckWebglRenderMode() && ResourceManager.hasRes(resPath + "_ske") && Api.switchVoApi.checkOpenCreateUserBones())
		{

				this._maxLoadNum = 3;
				this._loadNum = 0;

				let loadComplete=function(container:BaseDisplayObjectContainer):void
				{
					
						this._loadNum ++;
				
						if(this._loadNum == this._maxLoadNum)
						{
							if(this._myHair)
							{
								this._myHair.visible=true;
							}
							if(this._myBody)
							{
								this._myBody.visible = true;
							}
							if(this._myHead)
							{
								this._myHead.visible = true;
							}
						}
					
				}
				this._container = new BaseDisplayObjectContainer();

				this._container.width = 712;
				this._container.height = 668;
				this._container.x = this.viewBg.x + this.viewBg.width/2 - 382/2 + 5;
				this._container.y = 160;
				this.addChild(this._container);
				
				//hair
				let hairPic = "user_hair" + tmpHeadId;
				if(tmpHeadId <= 5){
					hairPic = "user_hair" + 7;
				} else if (tmpHeadId >= 5000) {
					hairPic = "user_hair7";
				}

				let rect12:egret.Rectangle=egret.Rectangle.create();
				rect12.setTo(0,0,85,140);
				this._myHair = BaseLoadBitmap.create(hairPic,rect12,{callback:loadComplete,callbackThisObj:this});
				this._myHair.x = 141;
				this._myHair.y = -3;
				this._myHair.visible = false;
				this._container.addChild(this._myHair);

				//body
				this._myBody = App.DragonBonesUtil.getLoadDragonBones(resPath,0,"idle",loadComplete,this);
				// myBody.x = myBody.x + 382 / 2 -  712/2 -1.5;
				this._myBody.setScale(1.5);
				this._myBody.x = 117 + 136 / 2;
				this._myBody.y = 37;
				this._myBody.visible = false;
				this._container.addChild(this._myBody);

				
				//head
				let rect1:egret.Rectangle=egret.Rectangle.create();
				rect1.setTo(0,0,136,143);
				this._myHead = BaseLoadBitmap.create("user_head" + tmpHeadId,rect1,{callback:loadComplete,callbackThisObj:this});
				// this._myHead.visible=false;
				this._myHead.x = 117;
				this._myHead.name = "myHead";
				this._myHead.visible = false;
				// this.setLayoutPosition(LayoutConst.horizontalCentertop, this._myHead, this, [0, this._container.y - 87]);
				this._container.addChild(this._myHead);


		} else {
			this._container = Api.playerVoApi.getPlayerPortrait(3201,tmpHeadId,null,true);
			this.addChild(this._container);
			this._myBody = <BaseLoadBitmap>this._container.getChildByName("myBody");
			this._myHead = <BaseLoadBitmap>this._container.getChildByName("myHead");
			this._myHair = <BaseLoadBitmap>this._container.getChildByName("myHair");
			this._container.x = this.viewBg.x + this.viewBg.width/2 - 382/2 + 5;
			this._container.y = 160;
		}




		
		

		// this._myBody.texture = ResourceManager.getRes("user_body_full_3201_2");




		if (!this.param ){
        	//输入框
			let inputBg:BaseBitmap = BaseBitmap.create("guide_namebg");
			inputBg.x = this.viewBg.x + this.viewBg.width/2 - inputBg.width/2;
			inputBg.y = GameConfig.stageHeigth - 310;
			this.addChild(inputBg);
        
			let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_BROWN,TextFieldConst.FONTSIZE_TITLE_SMALL,200,45,null);
			inputTF.x = 210//this.viewBg.x + this.viewBg.width/2 - inputTF.width/2;
			inputTF.y = inputBg.y + inputBg.height/2 - inputTF.height/2; 
			this.addChild(inputTF);

			this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
			this._inputTextField.maxChars = this.getNameLength(1);
			this._inputTextField.textAlign = "center";
			this._inputTextField.addTouchTap(this.inputClick,this,null);
		 
			let randomBtn = ComponentManager.getButton("btn_random","",this.clickRanomHandler,this);
			randomBtn.x = 430;
			randomBtn.setScale(1.2);
			randomBtn.y = inputBg.y + inputBg.height/2 - randomBtn.height * 1.3/2;
			
			randomBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChild(randomBtn);
			this._isUpdate = false;
		}
		else{
			this._isUpdate = true;
			
		}

		

		this._manIcon = BaseBitmap.create("guide_manicon");
		this._manIcon.x = 560;
		this._manIcon.y = 450;
		this._manIcon.anchorOffsetX = this._manIcon.width / 2;
		this._manIcon.anchorOffsetY = this._manIcon.width / 2;
		this._manIcon.setScale(0.85);
		this.addChild(this._manIcon);
		this._manIcon.addTouchTap(this.manIconClick,this);

		this._womanIcon = BaseBitmap.create("guide_womanicon");
		this._womanIcon.x = 560;
		this._womanIcon.y = 550;
		this._womanIcon.anchorOffsetX = this._womanIcon.width / 2;
		this._womanIcon.anchorOffsetY = this._womanIcon.width / 2;
		this._womanIcon.setScale(0.75);
		this.addChild(this._womanIcon);
		this._womanIcon.addTouchTap(this.womanIconClick,this);
		if(Api.switchVoApi.checkOpenWxHexiePic())
		{
			// this._manIcon.visible = false;
			this._womanIcon.visible = false;
		}

		let bottomImg = BaseBitmap.create("public_daoju_bg01");
		let flower = BaseBitmap.create("public_daoju_bg02");
		bottomImg.y = GameConfig.stageHeigth - bottomImg.height;
		bottomImg.x = 0;

		this.addChild(bottomImg);

		flower.x = GameConfig.stageWidth - flower.width;
		flower.y = GameConfig.stageHeigth - flower.height;
		this.addChild(flower);




		//创建角色按钮
		let btnStr = "guideCreateUserViewTitle"
		if(this.param && this.param.data.changeImg)
		{
			btnStr = "sysConfirm";
		}
		let createBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,btnStr,this.clickCreateHandler,this);
		createBtn.x = this.viewBg.x + this.viewBg.width/2 - createBtn.width/2;
		createBtn.y = GameConfig.stageHeigth - createBtn.height - 10;//860;
	



	

		this._headBg = BaseBitmap.create("guide_bottom");
		this._headBg.width = GameConfig.stageWidth;
		this._headBg.setPosition(0 ,GameConfig.stageHeigth - 100 - this._headBg.height);
		this.addChild(this._headBg);

		this.addChild(createBtn);
		this._posContainer = new BaseDisplayObjectContainer();
		this.addChild(this._posContainer);

				//人物头像 选中状态
		this._selectBg = BaseBitmap.create("itembg_selected");
		this._selectBg.width = 110;
		this._selectBg.height = 110;

		this._startX = GameConfig.stageWidth / 2 - (108 * 5 + 18 * 4)/2;
		this._startY = this._headBg.y + this._headBg.height/2 - 106/2;

		this._selectBg.x = this._startX - 1;
		this._selectBg.y = this._startY-3;
		this.addChild(this._selectBg);


		if (!this.param){
			this.clickRanomHandler();
			this.reFreshUserContainer();
		}else{
			if(Api.playerVoApi.getPlayePicId() >5)
			{
				if (Api.playerVoApi.getPlayePicId() >= 5000) {
					this._lastSex = 1;
					this.manIconClick();
					this.reFreshUserContainer();
				} else {
					this._lastSex = 2;
					this.womanIconClick();
				}
				
			} else {
				this.reFreshUserContainer();
			}
			this._isUpdate = false;
		}

		
		if(this._curSex==2)
		{
			this._sextype=2;
		}
		else
		{
			this._sextype=1;
		}

		if(PlatformManager.checkIsWxCfg())
		{
			this.showLoop();
			TimerManager.doTimer(900,0,this.showLoop,this);
		}
		// TimerManager.doTimer(2000,1,this.autoEnterGame,this);
		
		if(this.param && this.param.data.changeImg)
		{
			
		}else if(Api.switchVoApi.checkOpenAutoEnterGame())
		{
			let wordStr = LanguageManager.getlocal("autoEnterGame",["20"])
			this._enterTxt = ComponentManager.getTextField(wordStr ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this.addChild(this._enterTxt);
			this._enterTxt.setPosition(createBtn.x +this._enterTxt.width/2-this._enterTxt.width/2 ,createBtn.y -20);

		}
	}
		/**
	 * 倒计时结束后，自动以当前选中头像，和当前显示的玩家名字生成角色信息。
		若当前显示玩家名字不可用，则再随机一个可用的玩家名字。

		玩家进行任意操作时，倒计时恢复为20秒
	 */
	private resetAutoEnterGame ()
	{
		if(Api.switchVoApi.checkOpenAutoEnterGame()&&this._enterTxt)
		{
			this._enterSecond = 20;
			let wordStr = LanguageManager.getlocal("autoEnterGame",[this._enterSecond+""])
			this._enterTxt.text = wordStr
			this._enterTxt.visible = true;
		}
	}
	private inputClick()
	{
		if(Api.switchVoApi.checkOpenAutoEnterGame()&&this._enterTxt)
		{
			this._enterTxt.visible = false;
			this._enterSecond = 99999;
			
		}
		
	}

	public tick():void{
		if(Api.switchVoApi.checkOpenAutoEnterGame()&&this._enterTxt)
		{
			let wordStr = LanguageManager.getlocal("autoEnterGame",[this._enterSecond+""])
			this._enterTxt.text = wordStr
			this._enterSecond --;
			
			if(this._enterSecond<=0)
			{
				this._enterTxt.visible = false;
				this._enterSecond = 99999;
				this.clickCreateHandler()
			}
		}
      
       
    }

	/**
	 * 假的进入游戏
	 */

	 private showLoop()
	 {
		 if(!this.container)
		 {
			return;
		 }
		let firstName = "";
		// if(PlatformManager.checkIsViSp()){
			
		// } else {
		firstName = LanguageManager.getlocal("userName_firstName" + App.MathUtil.getRandom(1,603));
		// }
		
	
		let sercondName = LanguageManager.getlocal("userName_secondName" + App.MathUtil.getRandom(1,3760)) ;
		let userName = firstName + sercondName;

		let idIndex = App.MathUtil.getRandom(1,Number(ServerCfg.selectServer.zid)+1)
		let zidStr = LanguageManager.getlocal("serverListServerTitle",[String(idIndex)]) ;

		let wordStr = LanguageManager.getlocal("guideNameTip",[zidStr,userName])
		let words = ComponentManager.getTextField(wordStr ,TextFieldConst.FONTSIZE_BUTTON_COMMON);
		// words.setColor(TextFieldConst.COLOR_WHITE);
		words.x = GameConfig.stageWidth/2-words.width/2;
		words.y = 60;
		this.addChildToContainer(words);
		egret.Tween.get(words)
		.to({y:-50},3300).call(
			function(words:BaseTextField){
				// BaseBitmap.release(words);
				words.dispose();
				words = null;
			},
			this,
			[words]
		)
	 }

	private manIconClick()
	{
		if(this._curSex == 1){
			return;
		}
		this._curSex = 1;

		// this._manIcon.texture = ResourceManager.getRes("guide_manicon_1");
		// this._womanIcon.texture = ResourceManager.getRes("guide_womanicon_2");
		this.reFreshUserContainer();
		this.resetAutoEnterGame();
	}
	private womanIconClick()
	{
		if(this._curSex == 2){
			return;
		}
		this._curSex = 2;

		// this._manIcon.texture = ResourceManager.getRes("guide_manicon_2");
		// this._womanIcon.texture = ResourceManager.getRes("guide_womanicon_1");
		this.reFreshUserContainer();
		this.resetAutoEnterGame();
	}
	private reFreshUserContainer(){

		if (this._manHeadContainer) {
			this._posContainer.removeChild(this._manHeadContainer);
			this._manHeadContainer = null;	
		}
		this._manHeadContainer = new BaseDisplayObjectContainer();
		this._manHeadContainer.name = "manheadcontainer";
		this._posContainer.addChild(this._manHeadContainer);

		if (this._womanHeadContainer) {
			this._posContainer.removeChild(this._womanHeadContainer);
			this._womanHeadContainer = null;
		}
	
		this._womanHeadContainer = new BaseDisplayObjectContainer();
		this._womanHeadContainer.name = "womanheadcontainer";
		this._posContainer.addChild(this._womanHeadContainer);
		
		this.changeHead();

		



		let dis = 0;

		if(this._curSex == 1){
			this._manIcon.setScale(0.85);
			this._womanIcon.setScale(0.75);
			this._manHeadContainer.visible = true;
			this._womanHeadContainer.visible = false;
			// this._manIcon.texture = ResourceManager.getRes("guide_manicon_1");
			// this._womanIcon.texture = ResourceManager.getRes("guide_womanicon_2");
		}
		else if(this._curSex == 2){
			dis =0;

			this._manIcon.setScale(0.75);
			this._womanIcon.setScale(0.85);
			this._manHeadContainer.visible = false;
			this._womanHeadContainer.visible = true;
			// this._manIcon.texture = ResourceManager.getRes("guide_manicon_2");
			// this._womanIcon.texture = ResourceManager.getRes("guide_womanicon_1");
		}
		
		// let startX = GameConfig.stageWidth / 2 - (108 * 5 + 18 * 4)/2;
		// let startY = this._headBg.y + this._headBg.height/2 - 106/2;       //GameConfig.stageHeigth - 30 - 126 + 10;

		for (var index = 0; index < 10; index++) {

			let userHeadBg:BaseBitmap = BaseBitmap.create("guide_uesrheadbg");

		
			
			if(index>=5)
			{
				let num =index-5;
				userHeadBg.x = this._startX + (userHeadBg.width + 18) * num;
				userHeadBg.y = this._startY;//270+(userHeadBg.height*0.67+18)*num; 
				userHeadBg.name ="2";
			}
			else
			{	userHeadBg.name ="1";
				userHeadBg.x = this._startX + (userHeadBg.width + 18) * index;
				userHeadBg.y = this._startY;
			}
			
			let rect1:egret.Rectangle=egret.Rectangle.create();
			rect1.setTo(0,0,136,143);
			let headPic = "user_head" + (index + 1 + dis);
			let userHead:BaseLoadBitmap = BaseLoadBitmap.create(headPic,rect1);
			userHead.scaleX = 0.75;
			userHead.scaleY = 0.75;
			userHead.x = userHeadBg.x + userHeadBg.width/2 - userHead.width/2*userHead.scaleX;  
			userHead.y = userHeadBg.y + userHeadBg.height/2 - userHead.height/2*userHead.scaleY;


			
			userHeadBg.addTouchTap(this.changeHeadHandler,this,[index+1]);
			if(index>=5){
				this._womanHeadContainer.addChild(userHeadBg);
				this._womanHeadContainer.addChild(userHead);
			} else {
				this._manHeadContainer.addChild(userHeadBg);
				this._manHeadContainer.addChild(userHead);
			}
			// userHeadBg.scaleX=0.76;
			// userHeadBg.scaleY=0.76;
			// if(this._curSex == 1){
			// 	this._manHeadContainer.addChild(userHeadBg);
			// 	this._manHeadContainer.addChild(userHead);
			// }
			// else if(this._curSex == 2){
			// 	this._womanHeadContainer.addChild(userHeadBg);
			// 	this._womanHeadContainer.addChild(userHead);
			// }

			
			if (this.param && this.param.data.changeImg && this._isUpdate){
				let pic = Api.playerVoApi.getPlayePicId();
				
				// if(pic > 5){
				// 	pic = pic - 5;
				// }
				if(pic == index + 1)
				{
					this._picNum=pic;
					this._selectBg.x = userHeadBg.x - 1;
					this._selectBg.y = userHeadBg.y-3;

				}
			}

		}
		if(this._lastSex != this._curSex){
			this._selectBg.visible = !this._selectBg.visible;
		} 
		this._lastSex = this._curSex;
	}
	
	private changeHeadHandler(evt:egret.Event,picid:number)
	{	
		if(!this._selectBg.visible){
			this._selectBg.visible = true;
		}

		this.resetAutoEnterGame()

		// if(evt.currentTarget.name=="2")
		// {
		// 	this._sextype=2;
		// }
		// else
		// {
		// 	this._sextype=1;	
		// }
		// if(index == this._index&&this._picNum!=6&&index!=4)
		// {
		// 	return;
		// }
		
		this._selectBg.x = evt.target.x - 1;
		this._selectBg.y = evt.target.y - 3;
		

		let cur = -1;
		if(picid - this._picNum > 0)
		{
			 cur = 1;
		}
		// this._index = index;

		this._picNum = picid;
		let index = (picid - 1);

		let centerX = this.viewBg.x + this.viewBg.width/2 - 382/2 + 5;
		let centerY = 140;
		egret.Tween.get(this._container)
			.to({x: -500*cur + centerY}, 200)
			.to({x: 500*cur + centerY}, 0)
			.call(this.changeHead,this)
			.to({x: centerX}, 200);
		
	}
	private changeHead(){
		if(!this._isLoad)
		{
			this._isLoad = true;
			return;
		}
		let dis = 0
		// if(this._curSex == 2){
		// 	dis = 5;
		// }
		let headPic = "user_head" + (this._picNum + dis);
		let hairPic = "user_hair" + (this._picNum + dis);
		// this._myHead.texture = ResourceManager.getRes(headPic);
		// this._myHair.texture = ResourceManager.getRes(hairPic);

		this._myHead.setload(headPic);
		this._myHair.setload(hairPic);
		// this._myHair.texture = ResourceManager.getRes(hairPic);
	}


	private clickCreateHandler():void
	{	
		// let picId = this._index+1;

		// if(picId==1&&this._picNum==6&&this._sextype==2)
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("changeImgTip2"));
		// 	this.hide();
		// 	return
		// }

		// if(this._sextype==2&&this._index<5)
		// {
		// 	picId=picId+5;
		// }
		
		if(this.param && this.param.data.changeImg)
		{
			if(this._picNum == Api.playerVoApi.getPlayePicId())
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("changeImgTip2"));
				this.hide();
			}else
			{
				this.request(NetRequestConst.REQUEST_USER_CHANGEPIC,{pic:this._picNum});	 
			}
			 
			return;
		}
		
		//正则表达式
		let txtStr:string=this._inputTextField.text.trim();

		if (txtStr.indexOf(" ") != -1)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
			return;
		}
		if(!App.StringUtil.userNameCheck(txtStr)&&!PlatformManager.checkIsViSp())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip1"));
			return;
		}
		 
		if( txtStr.length < 2 || txtStr.length >this.getNameLength())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip2"));
			return;
		} 
	 
		if(Config.ShieldCfg.checkShield(txtStr)==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
			return;
		}

		if(App.StringUtil.checkCharacter(txtStr)&&PlatformManager.checkIsViSp())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
			return;
		}

		if(App.StringUtil.checkChar(txtStr))
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
			return;
		}
	

		if(PlatformManager.checkIsMwSp())
		{
			this.request(NetRequestConst.REQUEST_USER_CREATEUSER,{ 
				 server_name: ServerCfg.selectServer.sname,
				 name:txtStr,
				 pic:this._picNum
				});
		}
		else{
			if(this._picNum<=5)
			{
				this.request(NetRequestConst.REQUEST_USER_CREATEUSER,{name:txtStr,pic:this._picNum});
			}
			else{
				this.request(NetRequestConst.REQUEST_USER_CREATEUSER,{name:txtStr,pic:this._picNum,sexnum:1});
			}
			
			
		}
	}

	private getNameLength(type:number=0):number
	{
		if(PlatformManager.checkIsEnSp()||PlatformManager.checkIsViSp())
		{
			return GameData.nameLength;
		}
		else
		{	
			//输入限制
			if(type==1)
			{
				return 8;
			}
			return 6; 
		} 
	}
 

	private clickRanomHandler():void
	{
		this._userNameCount = 0;
		this.randomName();
		this.resetAutoEnterGame();																																																															
	}
	private randomName()
	{
		let firstName = "";
		// if(PlatformManager.checkIsViSp()){
			
		// } else {
		firstName = LanguageManager.getlocal("userName_firstName" + App.MathUtil.getRandom(1,603));
		// }
		
	
		let sercondName = LanguageManager.getlocal("userName_secondName" + App.MathUtil.getRandom(1,3761)) ;

		this._userName = firstName + sercondName;
		this._userNameCount ++;
		if(this._userNameCount >= 5){
			this._inputTextField.text = this._userName;
		}
		else{
			this.request(NetRequestConst.REQUEST_USER_CHECKNAME,{name:this._userName});
		}
	}
	
	protected receiveData(data:{ret:boolean,data:any}):void
	{	
		if(data.data.cmd == NetRequestConst.REQUEST_USER_CHECKNAME){

			if(data.data.data.nameflag == 0)
			{
				this._inputTextField.text = this._userName;

			}
			else{
				this.randomName();
			}	
			
		}
		else if(data.data.cmd == NetRequestConst.REQUEST_USER_CREATEUSER){

			if(PlatformManager.checkIsWxmgSp()&& data.data.data.msgres&&data.data.data.msgres.data.result==1)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
				return;
			}

			if(PlatformManager.checkIsMwSp()&&data.data&&data.data.data.msgres)
			{
				if(data.data.data.msgres.result&&data.data.data.msgres.result == "verify_fail")
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
					return;
				}
			}
	 
			if(data.data.data.nameflag == 0)
			{	
				if ( GameData.wbrewards!=null) {
					ViewController.getInstance().openView(ViewConst.POPUP.GETGIFTPOPUPVIEW,{rewards:GameData.wbrewards,f:this.startRookieGuide,o:this});
				}
				else {
					//玩吧积分礼包
					if(PlatformManager.getGiftId() == "501" || PlatformManager.getGiftId() == "502" )
					{
						if(GameData.wbrewardsFlag)
						{
							PlatformManager.giftExchange(this.exchangeCallback,this);
							// this.exchangeCallback("0",{ret:"0"});
							
						}
						else{
							ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW,{rewards:GameData.wbrewards,code:"2003"});
						}

					}	
					else{
						this.startRookieGuide();
					}
					
				}				
			}

			else{
				App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError" + data.data.data.nameflag));
				return;
			}
			
		}else if(data.data.cmd == NetRequestConst.REQUEST_USER_CHANGEPIC){
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
			App.CommonUtil.showTip(LanguageManager.getlocal("changeImgTip1"));
			this.hide();
		}

		if (data.data.cmd == NetRequestConst.REQUEST_OTHERINFO_GETWBSCOREREWARD) {
			if(data.data.data && data.data.data.rewards)
			{
				// ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW,{rewards:GameData.wbrewards,code:"0"});
				ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW,{rewards:data.data.data.rewards,f:this.startRookieGuide,o:this,code:"0"});
			}
		}
	}


	private exchangeCallback(code:string,data:any):void
	{	
		// alert("data"+data.ret);
		if(String(code) == "0"){
			this.request(NetRequestConst.REQUEST_OTHERINFO_GETWBSCOREREWARD,{giftId:PlatformManager.getGiftId()});
		}
		else{
			ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW,{rewards:GameData.wbrewards,code:String(data.ret)});
		}
		
		
	}

	private startRookieGuide():void
	{	

		PlatformManager.analyticsNewGuide(3);
		this.hide();
		if((PlatformManager.checkIsWxmgSp()|| PlatformManager.checkIsQQXYXSp())&&Api.switchVoApi.checkOpenWxHexiePic())
		// if(1)
		{
			this.completeGuideLoginGame();
			Api.rookieVoApi.isInGuiding  = null;
			Api.rookieVoApi.isGuiding = null;

		}else{
			Api.rookieVoApi.isInGuiding = true;
			ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW,{idx:"1",f:this.completeGuideLoginGame,o:this});

		}
		
	}

	private completeGuideLoginGame():void
	{
		LoginManager.completeGuideForLogin();
	}

	public hide()
	{
		super.hide();
	}

	public dispose():void
	{
		this._inputTextField = null;
		this._myBody = null;
		this._myHead = null;
		this._myHair = null;
		this._container = null;
		this._selectBg = null;
		this._index = 0;

		this._userName = null;
		this._userNameCount = 0;
		this._manIcon = null;
		this._womanIcon = null;
		this._curSex = 1; //1男2女
		this._lastSex = 1;
		this._manHeadContainer = null;
		this._womanHeadContainer = null;
		this._posContainer = null;

		this._picNum = 1;
		this._sextype = 0
		this._headBg = null;
		this._startX = 0;
		this._startY = 0;
		this._isUpdate = false;
		this._loadNum = 0;
		this._maxLoadNum = 0;
		this._isLoad = false;
		this._enterSecond = 20;
		super.dispose();


	}

}