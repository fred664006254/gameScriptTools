class ChooseroleView extends CommonView
{
	private _inputTextField:BaseTextField;
	private _myBody:BaseLoadBitmap;
	private _myHead:BaseBitmap;
	private _myHair:BaseBitmap;
	private _container:BaseDisplayObjectContainer;
	private _index:number = 0;
	private _userName:string;
	private _userNameCount:number = 0;

	private _manBtn:BaseBitmap = null;
	private _femaleBtn:BaseBitmap = null;
	private _curSex:number = 0; //1男2女

	private _headContainer:BaseDisplayObjectContainer;
	private _chooseHeadBg:BaseBitmap = null;
	private _posContainer:BaseDisplayObjectContainer;
	private _picNum:number=0;
	private _isGone:boolean = false;
	private _headList:any[] = [];
	private _moveIndex:number = 0;
	private _leftBtn:BaseButton = null;
	private _rightBtn:BaseButton = null;
	private _isLeft:boolean = false;
	private _isMoveBtnClick:boolean = false;
	private _isFirstInit:boolean = true;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{	
		//"user_body_full_3001",
		let rewardPic:string[] = ["chooserole_bg","chooserole",
			"user_head1",
			"user_head2","user_head3","user_head4","user_head5","shield_cn","names_cn",
			"user_head6","user_head7","user_head8","user_head9","user_head10",
			"user_hair6","user_hair7","user_hair8","user_hair9","user_hair10",
			"guide_bottom",
		];

		if (App.CommonUtil.check_dragon())
		{
			rewardPic.push("chooserole_db_1_ske");
			rewardPic.push("chooserole_db_1_tex_png");
			rewardPic.push("chooserole_db_1_tex");
		}
		else
		{
			rewardPic.push("chooserole_role");
		}
		if (PlatformManager.checkIsEnLang()){
			rewardPic.push("user_head11");
			rewardPic.push("user_head12");
		}

		return super.getResourceList().concat(rewardPic);
	} 

	protected getCloseBtnName():string
	{
		if (!this.param )
		{
			return null;
		}else
		{
			return ButtonConst.COMMON_CLOSE_1;
		}
	}

	// protected getRuleInfo():string
	// {
	// 	return "guideCreateRuleInfo";
	// }

	protected getTitleStr():string
	{
		return "guideCreateUserViewTitle";
	}

	protected getBgName():string
	{
		return "chooserole_bg";
	}

	private createCallback():void
	{	
		if (this._container)
		{
			this._container.visible = true;
		}
	}

	protected initView():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_SOUND_CATEGORY,this.startRookieGuide,this); 
		PlatformManager.analyticsNewGuide(2);

		let tmpHeadId = 1;
		if(this.param && this.param.data.changeImg){
			tmpHeadId = Api.playerVoApi.getPlayePicId();
		}
		if (App.CommonUtil.check_dragon())
		{
			this._container = Api.playerVoApi.getPlayerPortrait(3001,tmpHeadId,0,true,this.createCallback,this);
			this.addChild(this._container);

			this._myBody = <BaseLoadBitmap>this._container.getChildByName("myBody");
			let dragonBonesBody =App.DragonBonesUtil.getLoadDragonBones("chooserole_db_1",0);
			dragonBonesBody.x = this._myBody.x+182;
			dragonBonesBody.y = this._myBody.y - 69;
			this._container.addChildAt(dragonBonesBody,0);
			this._container.visible = false;
		}
		else
		{
			this._container = Api.playerVoApi.getPlayerPortrait(999999,tmpHeadId);
			this.addChild(this._container);

			this._myBody = <BaseLoadBitmap>this._container.getChildByName("myBody");
			this._myBody.x = this._myBody.x - 42;
			this._myBody.y = this._myBody.y - 16;
		}
		

	
		this._myHead = <BaseBitmap>this._container.getChildByName("myHead");
		this._myHair = <BaseBitmap>this._container.getChildByName("myHair");
		this._container.x = this.viewBg.x + this.viewBg.width/2 - 382/2 + 5;
		this._container.y = 175;

		if (App.CommonUtil.check_dragon())
		{
			
			// this._myBody.alpha = 0;
		}
		// else
		// {
		// 	let body:BaseBitmap = BaseBitmap.create("chooserole_role");
		// 	body.x = this._myBody.x - 42;
		// 	body.y = this._myBody.y - 16;
		// 	this._container.addChildAt(body,0);
		// 	// this._myBody.alpha = 0;
		// }

		if (!this.param ){
        	//输入框
			let inputBg:BaseBitmap = BaseBitmap.create("chooserole_namebg");
			inputBg.x = this.viewBg.x + this.viewBg.width/2 - inputBg.width/2;
			inputBg.y = GameConfig.stageHeigth - 290;
			this.addChild(inputBg);
        
			let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_BROWN,TextFieldConst.FONTSIZE_TITLE_SMALL,200,45,"");
			inputTF.x = this.viewBg.x + this.viewBg.width/2 - inputTF.width/2-15;
			inputTF.y = inputBg.y + inputBg.height/2 - inputTF.height/2;
			this.addChild(inputTF);

			this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
			this._inputTextField.textAlign = egret.HorizontalAlign.CENTER;
			this._inputTextField.verticalAlign = egret.VerticalAlign.MIDDLE;
			if(PlatformManager.checkIsThSp())
			{
				let nametxt:string = "";
				this._inputTextField.addEventListener(egret.TextEvent.CHANGE, function(event:egret.TextEvent){
					let strName = String(event.target.text);
					let strLength = App.StringUtil.getStrLength(strName);
					if(strLength == GameData.nameThLength)
					{
						nametxt = strName;
					}
					if(strLength > GameData.nameThLength)
					{
						this._inputTextField.text = nametxt;
					}
				}, this);
				
			}
			else{
				this._inputTextField.maxChars = this.getNameLength(1);
			}
			
		 
			let randomBtn = ComponentManager.getButton("chooserole_dice","",this.clickRanomHandler,this);
			randomBtn.x = 420;
			randomBtn.y = inputBg.y + inputBg.height/2 - randomBtn.height/2;
			randomBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChild(randomBtn);
		}


		//创建角色按钮
		let btnStr = "guideCreateUserViewTitle"
		if(this.param && this.param.data.changeImg)
		{
			btnStr = "sysConfirm";
		}
		let createBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,btnStr,this.clickCreateHandler,this);
		createBtn.x = this.viewBg.x + this.viewBg.width/2 - createBtn.width/2;
		createBtn.y = GameConfig.stageHeigth - 86;
		createBtn.setColor(TextFieldConst.COLOR_BLACK);		
		this.addChild(createBtn);
		this._posContainer = new BaseDisplayObjectContainer();
		this.addChild(this._posContainer);

		this._manBtn = BaseBitmap.create("");
		this._manBtn.setPosition(40,GameConfig.stageHeigth - 420);
		this.addChild(this._manBtn);
		this._manBtn.addTouchTap(this.manIconClick,this);

		this._femaleBtn = BaseBitmap.create("");
		this._femaleBtn.setPosition(40,GameConfig.stageHeigth - 320);
		this.addChild(this._femaleBtn);
		this._femaleBtn.addTouchTap(this.womanIconClick,this);

		// if (PlatformManager.checkIsRuSp())
		// {
		// 	this._manBtn.visible = false;
		// 	this._femaleBtn.visible = false;
		// }


		this.manIconClick();

		if (!this.param ){
			this.clickRanomHandler();
		}else{
			let playerPic = Api.playerVoApi.getPlayePicId();
			App.LogUtil.log(" chooserole "+playerPic);
			let picArr = this.getHeadPicIndexBySex(2);
			for (let i=0; i < picArr.length; i++){
				if (picArr[i] == Number(playerPic)){

					this.womanIconClick();
					break;
				}
			}	
		}

		let bottomBg:BaseBitmap = BaseBitmap.create("chooserole_bottombg");
		bottomBg.height =225;
		bottomBg.width  = GameConfig.stageWidth;
		bottomBg.setPosition(0,GameConfig.stageHeigth-bottomBg.height-this.container.y);
		this.addChildToContainer(bottomBg);

		this._isGone= true;

		this.viewBg.y += (GameConfig.stageHeigth-1136)*0.18; 
		this._container.y += (GameConfig.stageHeigth-1136)*0.35; 

		let topBg:BaseBitmap = BaseBitmap.create("chooserole_topbg");
		topBg.setPosition(0,0);
		this.addChildAt(topBg,this.getChildIndex(this.viewBg)+1);
		
		//左右切换按钮 英文
		this.showMoveBtn();
	}

	private manIconClick()
	{
		if(this._curSex == 1){
			return;
		}
		this._curSex = 1;

		this._manBtn.texture = ResourceManager.getRes("chooserole_man2");
		this._femaleBtn.texture = ResourceManager.getRes("chooserole_female1");

		this.reFreshUserContainer();
		let idx:number = this._index;
		this._index = null;
		this.changeHeadHandler(null,idx);
	}
	private womanIconClick()
	{
		if(this._curSex == 2){
			return;
		}
		this._curSex = 2;

		this._manBtn.texture = ResourceManager.getRes("chooserole_man1");
		this._femaleBtn.texture = ResourceManager.getRes("chooserole_female2");

		this.reFreshUserContainer();
		let idx:number = this._index;
		this._index = null;
		this.changeHeadHandler(null,idx);
	}

	//头像pic id
	private getHeadPicIndexBySex(sex:number):number[]{
		if (sex == 1){
			if (PlatformManager.checkIsEnLang()){
				return [1, 2, 3, 4, 5, 11];
			}
			return [1, 2, 3, 4, 5];
		}
		else if (sex == 2){
			if (PlatformManager.checkIsEnLang()){
				return [6, 7, 8, 9, 10, 12];
			}
			return [6, 7, 8, 9, 10];
		}
	}

	//头像滑动
	private checkIsNeedMove():boolean{
		if (PlatformManager.checkIsEnLang()){
			return true;
		}
		return false;
	}

	private showMoveBtn():void{
		if (this.checkIsNeedMove()){
			let leftBtn = ComponentManager.getButton("btn_leftpage", "", this.moveBtnClick, this, [0]);
			leftBtn.setPosition(10, GameConfig.stageHeigth - 210 + 55 - leftBtn.height/2);
			this.addChild(leftBtn);
			this._leftBtn = leftBtn;

			let rightBtn = ComponentManager.getButton("btn_leftpage", "", this.moveBtnClick, this, [1]);
			rightBtn.scaleX = -1;
			rightBtn.setPosition(GameConfig.stageWidth - 10, GameConfig.stageHeigth - 210 + 55 - rightBtn.height/2);
			this.addChild(rightBtn);
			this._rightBtn = rightBtn;

			this.freshMoveBtn();
			if (this._moveIndex > 3){
				this.freshMoveHeadList();
			}
		}
	}

	private freshMoveBtn():void{
		let arr = this.getHeadPicIndexBySex(this._curSex);
		let maxNum = arr.length;
		App.LogUtil.log("freshMoveBtn "+this._index + "moveindex "+this._moveIndex);
		if (this._index == 0 && this._moveIndex <= 0){
			this._leftBtn.visible = false;
			this._rightBtn.visible = true;
		}
		else if (this._moveIndex >= maxNum - 1 && this._index == 3){
			this._leftBtn.visible = true;
			this._rightBtn.visible = false;
		}
		else{
			this._leftBtn.visible = true;
			this._rightBtn.visible = true;
		}
	}

	private freshMoveHeadList():void{
		let headArr = this.getHeadPicIndexBySex(this._curSex);
		for (let i=0; i<this._headList.length; i++){
			let headIndex = this._moveIndex + i - 3;
			if (this._isLeft){
				headIndex = this._moveIndex + i;
			}
			this._headList[i].userHead.setRes("user_head" + headArr[headIndex]);
		}
	}

	private moveBtnClick(index:number):void{
		let arr = this.getHeadPicIndexBySex(this._curSex);
		let maxNum = arr.length;
		let selectIndex = this._index;
		App.LogUtil.log("moveBtnClick "+selectIndex + " moveindex "+this._moveIndex);
		this._isMoveBtnClick = true;
		//左
		if (index == 0){
			this._isLeft = true;
			this._moveIndex -= 1;
			if (this._moveIndex < 0){
				this._moveIndex = 0;
			}
			if (this._index == 0){
				this.freshMoveHeadList();
				this.changeHeadHandler(null, 0);
			}
			else{
				this.changeHeadHandler(null, this._index - 1);
			}
		}
		else{
			this._isLeft = false;
			//右
			this._moveIndex += 1;
			if (this._moveIndex >= maxNum){
				this._moveIndex = maxNum - 1;
			}
			App.LogUtil.log("moveBtnClick right "+this._moveIndex);
			if (this._index == 3){
				this.freshMoveHeadList();
				this.changeHeadHandler(null, 3);
			}
			else{
				this.changeHeadHandler(null, this._index + 1);
			}
		}
		this.freshMoveBtn();

	}

	private reFreshUserContainer(){
		if (this._headContainer) {
			this._posContainer.removeChild(this._headContainer);
			this._headContainer = null;
		}
		this._headList = [];
		this._moveIndex = 0;
		this._isMoveBtnClick = false;
		this._isLeft = false;
		this._isFirstInit = true;
		
		this.changeHead();
		this._headContainer = new BaseDisplayObjectContainer();
		this._posContainer.addChild(this._headContainer);
		let dis = 0;

		let index:number = 0;
		
		// if(this._curSex == 1){
		// 	index = 0;
		// }
		// else if(this._curSex == 2){
		// 	index = 5;
		// }
		// let max:number=5;
		// if (this.checkIsEnTest()){
		// 	max = 4;
		// }
		let headPicArr = this.getHeadPicIndexBySex(this._curSex);
		let max = headPicArr.length;
		if (this.checkIsNeedMove()){
			max = 4;
		}

		this._index = index;
		for ( ; index < max; index++) {

			let userHeadBg:BaseBitmap = BaseBitmap.create("chooserole_headbg1");
			userHeadBg.y = GameConfig.stageHeigth-210;
			userHeadBg.x =36+(index%max)*116; 
			if (this.checkIsNeedMove()){
				userHeadBg.x = 85 + (index % max) * 120;
			}
			let headPicArr = this.getHeadPicIndexBySex(this._curSex);
			let headIndex = headPicArr[index];
			// let headPic = "user_head" + (index + 1 + dis);
			let headPic = "user_head" + (headIndex);
			let userHead:BaseBitmap = BaseBitmap.create(headPic);
			userHead.scaleX = 0.8;
			userHead.scaleY = 0.8;
			userHead.x = userHeadBg.x + userHeadBg.width/2 - userHead.width/2*0.8;  
			userHead.y = userHeadBg.y + userHeadBg.height/2 - userHead.height/2*0.8;
			userHeadBg.addTouchTap(this.changeHeadHandler,this,[index]);
 
			// userHeadBg.scaleX=0.76;
			// userHeadBg.scaleY=0.76;
			userHeadBg.name = "headbg"+index;

			this._headContainer.addChild(userHeadBg);
			this._headContainer.addChild(userHead);
			
			let headData:{userHead: BaseBitmap, headBg:BaseBitmap} = {userHead:userHead, headBg: userHeadBg};
			this._headList.push(headData);
		}
		if (this.param && this.param.data.changeImg){
			let pic = Api.playerVoApi.getPlayePicId();
			this._picNum = pic;
			let isFind = false;
			let curIndex:number = 0;
			let isMan:number = 1;
			let headPicArr = this.getHeadPicIndexBySex(1);
			for (let i=0; i < headPicArr.length; i++){
				if (Number(pic) == headPicArr[i]){
					isFind = true;
					isMan = 1;
					curIndex = i;
					break;
				}
			}
			if (!isFind){
				let womheadPicArr = this.getHeadPicIndexBySex(2);
				for (let i=0; i < womheadPicArr.length; i++){
					if (Number(pic) == womheadPicArr[i]){
						isFind = true;
						isMan = 2;
						curIndex = i;
						break;
					}
				}
			}
			if (isFind){
				if (isMan == this._curSex){
					this._index = curIndex;
					if (this.checkIsNeedMove()){
						this._moveIndex = curIndex;
						if (curIndex > 3){
							this._index = 3;
						}
					}
				}
				if (this._leftBtn){
					if (this._moveIndex > 3){
						this.freshMoveHeadList();
					}
				}
			}
			App.LogUtil.log("isFIND "+curIndex+" _index"+this._index);
		}
		App.LogUtil.log("refreshusercon "+this._index);
		if (this.checkIsNeedMove() && this._leftBtn){
			this.freshMoveBtn();
		}
		this._chooseHeadBg = <BaseBitmap>this._headContainer.getChildByName("headbg"+this._index);
		this._chooseHeadBg.texture = ResourceManager.getRes("chooserole_headbg2");
	}
	
	private changeHeadHandler(evt:egret.Event,index:number)
	{	
		let headPicArr = this.getHeadPicIndexBySex(this._curSex);
		let notIndex = headPicArr.length - 1;
		let notPicArr = this.getHeadPicIndexBySex(2);
		let notPicId = notPicArr[0];
		if (this._picNum!=notPicId&&index!=notIndex){
			if (!this._isMoveBtnClick && index == this._index){
				return;
			}
		}
		// if(index == this._index&&this._picNum!=notPicId&&index!=notIndex)
		// {
		// 	return;
		// }

		
		let cur = -1;
		if(index - this._index > 0)
		{
			cur = 1;
		}
		App.LogUtil.log("changeHeadHandler _moveIndex  "+this._moveIndex + " _index "+this._index + " cur index "+index + " firstinit  "+this._isFirstInit);
		if (this.checkIsNeedMove() && (!this._isMoveBtnClick) && (!this._isFirstInit)){
			if(index - this._index > 0)
			{
				this._moveIndex += (index - this._index);
			}
			else{
				this._moveIndex -= (this._index - index);
			}
		}
		if (this._isMoveBtnClick){
			if (this._isLeft){
				cur = -1;
			}
			else{
				cur = 1;
			}
			
		}
		this._index = index;
		if (this.checkIsNeedMove() && (!this._isMoveBtnClick) && (!this._isFirstInit)){
			this.freshMoveBtn();
		}
		this._isMoveBtnClick = false;
		this._isFirstInit = false;

		this._chooseHeadBg.texture = ResourceManager.getRes("chooserole_headbg1");
		this._chooseHeadBg = <BaseBitmap>this._headContainer.getChildByName("headbg"+this._index);
		this._chooseHeadBg.texture = ResourceManager.getRes("chooserole_headbg2");

		if (this._isGone)
		{
			let centerX = this.viewBg.x + this.viewBg.width/2 - 382/2 + 5;
			let centerY = 140;
			egret.Tween.get(this._container)
				.to({x: -500*cur + centerY}, 200)
				.to({x: 500*cur + centerY}, 0)
				.call(this.changeHead,this)
				.to({x: centerX}, 200);
		}

		//test
		let picId = headPicArr[this._index];
		if (this.checkIsNeedMove()){
			picId = headPicArr[this._moveIndex];
		}
		App.LogUtil.log("changeHeadHandler "+picId);
	}
	private changeHead(){
		let dis = 0
		let headPicArr = this.getHeadPicIndexBySex(this._curSex);
		let headIndex = headPicArr[this._index];
		if (this.checkIsNeedMove()){
			if (this._moveIndex > 0){
				headIndex = headPicArr[this._moveIndex];
			}
		}
		// let headPic = "user_head" + (this._index + 1 + dis);
		// let hairPic = "user_hair" + (this._index + 1 + dis);
		let headPic = "user_head" + headIndex;
		let hairPic = "user_hair" + headIndex;
		this._myHead.texture = ResourceManager.getRes(headPic);
		this._myHair.texture = ResourceManager.getRes(hairPic);
	}

	private clickCreateHandler():void
	{	
		// let picId = this._index+1;
		let headPicArr = this.getHeadPicIndexBySex(this._curSex);
		let picId = headPicArr[this._index];
		if (this.checkIsNeedMove()){
			picId = headPicArr[this._moveIndex];
		}

		if(this._index==0&&this._picNum== picId && this._curSex==2)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("changeImgTip2"));
			this.hide();
			return
		}

		// if(this._curSex==2&&this._index<5)
		// {
		// 	picId=picId+5;
		// }
		
		if(this.param && this.param.data.changeImg)
		{
			if(picId == Api.playerVoApi.getPlayePicId())
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("changeImgTip2"));
				this.hide();
			}else
			{
				this.request(NetRequestConst.REQUEST_USER_CHANGEPIC,{pic:picId});	 
			}
			 
			return;
		}
	  
		//正则表达式
		let txtStr:string=this._inputTextField.text;
		
		let length = App.StringUtil.getStrLength(txtStr);
		if(!App.StringUtil.userNameCheck(txtStr))
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip1"));
			return;
		}
		 
		if(PlatformManager.checkIsEnLang()){
			if( length < 2 || length >GameData.usernameEnLength)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip3",["2",GameData.usernameEnLength.toString()]));
				return;
			}
		} 
		else if(PlatformManager.checkIsRuLang()){
			if( length < 2 || length >GameData.usernameRuLength)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip3",["2",GameData.usernameRuLength.toString()]));
				return;
			}
		} 
		else if(PlatformManager.checkIsPtLang()){
			if( length < 2 || length >GameData.usernamePtLength)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip3",["2",GameData.usernamePtLength.toString()]));
				return;
			}
		} else {
			if( length < 2 || length >this.getNameLength())
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip2"));
				return;
			} 
		}

		if(txtStr == "null" || txtStr == "undefined")
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
			return;
		}
	 
		if(Config.ShieldCfg.checkShield(txtStr)==false)
		{
			return;
		}

		this.request(NetRequestConst.REQUEST_USER_CREATEUSER,{name:this._inputTextField.text,pic:picId});
	}

	private getNameLength(type:number=0):number
	{
		if(PlatformManager.checkIsEnLang())
		{
			return GameData.usernameEnLength;
		}
		if(PlatformManager.checkIsRuLang())
		{
			return GameData.usernameRuLength;
		}
		if(PlatformManager.checkIsThSp())
		{
			return GameData.nameThLength;
		}
		if(PlatformManager.checkIsPtLang())
		{
			return GameData.usernameEnLength;
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
	}
	private randomName()
	{
		this._userName = Config.NamesCfg.getRandomName();
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
		if (data && data.ret){
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


				// PlatformManager.analyticsRegister();
				if(Api.switchVoApi.checkOpenShenheGame())
				{
					ViewController.getInstance().openViewByFunName(PlatformCfg.shenheFunctionName);
					this.hide();
					return;
				}
				if(data.data.data.nameflag == 0)
				{	
					if (RookieCfg){
						RookieCfg.setNeedCheck(true);
					}
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
							}
							else{
								ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW,{rewards:GameData.wbrewards,code:"2003"});
							}

						}	
						else
						{	
							if(Api.switchVoApi.checkOpenVoice())
							{	
								ViewController.getInstance().openView(ViewConst.POPUP.VOICEPOPUPVIEW);
							}
							else
							{
								this.startRookieGuide();
							}
						}
					}				
				}
				else
				{
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
					ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW,{rewards:data.data.data.rewards,f:this.startRookieGuide,o:this,code:"0"});
				}
			}
		}
	}


	private exchangeCallback(code:string,data:any):void
	{	
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
		let sex = this._curSex;
		this.hide();
		if (Api.switchVoApi.checkRookieEnStory())
		{
			Api.rookieVoApi.isInGuiding = true;
			ViewController.getInstance().openView(ViewConst.BASE.ROOKIEENSTORYVIEW,{f:this.completeGuideLoginGame,o:this});
		}
		else
		{
			Api.rookieVoApi.isInGuiding = true;
			ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW,{idx:"1",f:this.completeGuideLoginGame,o:this});
			if(Api.switchVoApi.checkOpenBlueWife() && sex == 2){
				// Api.gameinfoVoApi.setSexnum(1);
				// NetManager.request(NetRequestConst.REQUEST_USER_REVERSIONSETTING,{stype:1,sflag:1});
			}
			// else{
			// 	ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW,{idx:"1",f:this.completeGuideLoginGame,o:this});
			// }
		}
	}

	private completeGuideLoginGame():void
	{
		LoginManager.completeGuideForLogin();
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SOUND_CATEGORY,this.startRookieGuide,this); 
	
		this._inputTextField = null;
		this._container = null;
		this._myBody = null;
		this._myHead = null;
		this._index = 0;
		this._headContainer = null;
		this._curSex = 0; //1男2女
		this._picNum=0;

		this._manBtn = null;
		this._femaleBtn = null;
		this._chooseHeadBg = null;
		this._isGone= false;
		this._headList = [];
		this._moveIndex = 0;
		this._leftBtn = null;
		this._rightBtn = null;
		this._isLeft = false;
		this._isMoveBtnClick = false;
		this._isFirstInit = true;

		super.dispose();
	}
}