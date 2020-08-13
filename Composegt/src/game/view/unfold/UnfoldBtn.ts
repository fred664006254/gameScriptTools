/**
 * 主界面伸缩按钮
 * author jiangliuyang
 * ddate 2018/12/24
 * @class UnfoldBtn
 */
class UnfoldBtn extends BaseDisplayObjectContainer
{

    private _unfoldBtn: BaseButton = null;
    private _unfoldIcon: BaseBitmap = null;
	private _bg: BaseDisplayObjectContainer = null;
	private _unfoldPanelList: BaseDisplayObjectContainer[] = [];
	private static _modelNameList:{name:string,isLock:boolean,orderNum:number}[] = null;
	private static _maxModelIndex = 0;
	

	private static _iconList:BaseDisplayObjectContainer[] = [];

	private static _iconSpaceX = 25;
	private static _iconSpaceY = 0;
	private static _lineBaseCount = 4;
	private static _iconWidth = 80;
	private static _iconHeight = 80;

	private static _animBaseTime = 200;
	private static _animPlusTime = 70;

	private static _baseLock = 4;

	private isOpened:boolean = false;
	private isPlaying:boolean = false;
	private lockNum:number = 0;

	private static unfoldBtn:UnfoldBtn = null;


	private static initNameList():void
	{
		if(UnfoldBtn._modelNameList == null){
			// UnfoldBtn._modelNameList = [
			// 	{name:"share",isLock:true, orderNum:3},
			// 	{name:"welfare",isLock:false,orderNum:2},
			// 	{name:"sign2",isLock:false,orderNum:1},
			// 	{name:"rechargeVip",isLock:false,orderNum:1}
			// ];
			UnfoldBtn._modelNameList = Config.IconorderCfg.getUnfoldList();


			for(let i = 0;i < UnfoldBtn._modelNameList.length; i++){
				let model = UnfoldBtn._modelNameList[i];
				if(model.orderNum > UnfoldBtn._maxModelIndex){
					UnfoldBtn._maxModelIndex = model.orderNum;
				}
			}
		}
	}

	//检测图标是否需要收进	返回false 没有收进
	public static checkInUnfold(checkIcon:BaseDisplayObjectContainer):boolean
	{	
		if(!Api.switchVoApi.checkOpenUnfold()){
			return false;
		}

		UnfoldBtn.initNameList();
		if(UnfoldBtn._iconList == null){
			UnfoldBtn._iconList = [];
		}
		let needIn = false;
		let checkHave = false;

		//遍历需要收取的name 
		for(let i =0;i < UnfoldBtn._modelNameList.length;i++){
			let modelObj = UnfoldBtn._modelNameList[i];
			let modelName = modelObj.name;
			//需要被收取
			if(modelName+"_func" == checkIcon.name){
				//遍历收取栏icon
				for(let j = 0;j< UnfoldBtn._iconList.length; j++){
					let icon = UnfoldBtn._iconList[j];
					//检查收取拦是否存在这个icon test
					//排重
					if(icon["name"] && icon["name"] == checkIcon.name){
						checkHave = true;
						break;
					}
				}
				//如果收取栏没有这个icon  辨识添加
				if(!checkHave){
					
					checkIcon["isLock"] = modelObj.isLock;
					if(modelObj.isLock){
						checkIcon["orderNum"] = modelObj.orderNum;
					} else {
						checkIcon["orderNum"] = modelObj.orderNum + UnfoldBtn._maxModelIndex;
					}
					needIn = true;
				}
				break;
			}
		}
		
		if(needIn){
		
			
			UnfoldBtn._iconList.push(checkIcon);
			if(UnfoldBtn.unfoldBtn != null){
				UnfoldBtn.unfoldBtn.refreshUI();
			}
			
			return true;
		} else {
			return false;
		}
	}
    public constructor()
	{
		super();
		this.init();
	}

	private init():void
	{
		if(UnfoldBtn.unfoldBtn == null){
			UnfoldBtn.unfoldBtn = this;
		}
			
		this.height = UnfoldBtn._iconHeight;
		this._unfoldBtn = ComponentManager.getButton("mainui_unfoldbtn",null,this.unfoldBtnHandler,this);
		this.width = this._unfoldBtn.width;
		this._unfoldBtn.x = this.width/2 - this._unfoldBtn.width/2;
		this._unfoldBtn.y = this.height/2 - this._unfoldBtn.height/2;

		this._unfoldBtn.width = this._unfoldBtn.width;
		this._unfoldBtn.height = this._unfoldBtn.height;
		this.addChild(this._unfoldBtn);


		this._unfoldIcon = BaseBitmap.create("mainui_unfoldicon");
		this._unfoldIcon.anchorOffsetX = this._unfoldIcon.width/2;
		this._unfoldIcon.anchorOffsetY = this._unfoldIcon.height/2;
		this._unfoldIcon.x = this._unfoldBtn.width/2;
		this._unfoldIcon.y = this._unfoldBtn.height/2;
		this._unfoldBtn.addChild(this._unfoldIcon);
		// this.visible = false;
		//启动定时器
		TimerManager.doTimer(1000,0,this.tick,this);
		this.refreshUI();
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_SET_MUI_BTNSROLL,this.setUnfoldBtnHandler,this);

	}

	//根据当前数据重新创建ui
	public refreshUI():void
	{
		if(UnfoldBtn._iconList.length > 0){
			this.visible = true;
			this.sortIcons();
		}
		
	}
	//排序
	public sortIcons():void
	{
		this.lockNum = 0;
		for(let i = 0;i < UnfoldBtn._iconList.length;i++){
			let tmpIcon = UnfoldBtn._iconList[i];
			if(tmpIcon["isLock"]){
				this.lockNum ++;
			}
		}
		UnfoldBtn._iconList.sort((iconA,iconB)=>{

			return iconA["orderNum"] - iconB["orderNum"];
		});
		// console.log("UnfoldBtn._iconList-->",UnfoldBtn._iconList);

		this.initIcons();
	}

	public initIcons():void
	{	
		
		if(this.lockNum > UnfoldBtn._baseLock){
			this.lockNum = UnfoldBtn._baseLock;
		}
		this.isOpened = false;
		if(UnfoldBtn._iconList.length <= 0 ){
			return ;
		}
		
		if(this._bg != null)
		{
			this._bg.removeChildren()
			this.removeChild(this._bg);
			this._bg = null;
			if(this._unfoldIcon){
				this._unfoldIcon.rotation = 0;
			}
			this._unfoldPanelList = [];
		}



		let lineCount = Math.ceil(UnfoldBtn._iconList.length / UnfoldBtn._lineBaseCount);
		
		
		let tmpPanel:BaseDisplayObjectContainer = null;
		let tmpIcon = null;
		let curLine = 0;
		let startX = 0;
		let iconListLength = UnfoldBtn._iconList.length;
		for(let i = 0; i < iconListLength; i++){
			if(i % UnfoldBtn._lineBaseCount == 0){
				curLine ++;
				tmpPanel = new BaseDisplayObjectContainer();
				if(curLine == 1){
					tmpPanel.width = (iconListLength >= UnfoldBtn._lineBaseCount? UnfoldBtn._lineBaseCount : iconListLength) * (UnfoldBtn._iconWidth + UnfoldBtn._iconSpaceX);
					startX = 0;

				} else {
					tmpPanel.width = UnfoldBtn._lineBaseCount * (UnfoldBtn._iconWidth + UnfoldBtn._iconSpaceX);
					
					startX = 0;
					if(UnfoldBtn._lineBaseCount * curLine > iconListLength){
						//当前行不是满的
						startX = (UnfoldBtn._lineBaseCount * curLine - iconListLength) * (UnfoldBtn._iconWidth + UnfoldBtn._iconSpaceX);
					}
				}
				tmpPanel.height = UnfoldBtn._iconHeight;
				this._unfoldPanelList.push(tmpPanel);

			}
		
			tmpIcon = UnfoldBtn._iconList[i];

			tmpIcon.x = startX + (i % UnfoldBtn._lineBaseCount) * (UnfoldBtn._iconWidth + UnfoldBtn._iconSpaceX) + UnfoldBtn._iconHeight/2;
			tmpIcon.y = UnfoldBtn._iconWidth/2;
			tmpPanel.addChild(tmpIcon);

		}

		//背景
		this._bg = new BaseDisplayObjectContainer();
		this._bg.width = UnfoldBtn._lineBaseCount * (UnfoldBtn._iconWidth + UnfoldBtn._iconSpaceX);//this._unfoldPanelList[0].width;
		this._bg.height = this._unfoldPanelList.length * UnfoldBtn._iconHeight + (this._unfoldPanelList.length - 1) * UnfoldBtn._iconHeight;

		this._bg.x = - this._bg.width;
		this._bg.y = this.height - this._bg.height;
		this._bg.mask = new egret.Rectangle(0,0,this._bg.width - 10,this._bg.height);
		this.addChild(this._bg);

		for(let i = 0;i < this._unfoldPanelList.length;i++){
			let panel = this._unfoldPanelList[i];
			if(i == 0){	//第一行  有锁
				panel.x = this._bg.width - this.lockNum * (UnfoldBtn._iconWidth + UnfoldBtn._iconSpaceX);
			} else {
				panel.x = this._bg.width;
			}
			
			panel.y = this._bg.height - panel.height * (i + 1) - UnfoldBtn._iconSpaceY * i;
			this._bg.addChild(panel);
		}
		this.checkRed();
	}
	
	private checkRed(){
		// console.log("checkRed");
		if(UnfoldBtn._iconList.length <= 0){
			return;
		}
		let needRed:boolean = false;
		let lockNum:number = this.lockNum;
		for(let i = 0;i < UnfoldBtn._iconList.length; i ++){
			if(lockNum > 0){
				lockNum --;
				continue;
			}
			let icon = UnfoldBtn._iconList[i];
			if(icon.getChildByName("reddot")){
				let reddot:BaseBitmap = <BaseBitmap>icon.getChildByName("reddot");
				if(reddot.visible == true)
				{
					needRed = true;
					break;
				}
			}
		}	
		if(needRed){
			// App.CommonUtil.addIconToBDOC(this._unfoldBtn,null,null,-1,-2);
			App.CommonUtil.addIconToBDOC(this._unfoldBtn,null,null,6,-6);
		}
	}

	private tick(){

		// console.log("tick------");
		if(this.visible ){
			if(this.isOpened){
				this.cancelRed();
				
			} else {
				this.checkRed();
			}
		}
	}

	private cancelRed(){
		App.CommonUtil.removeIconFromBDOC(this._unfoldBtn);
	}

	private setUnfoldBtnHandler(e:egret.Event):void
	{
		let status=Number(e.data);
		switch(status)
		{
			case 1:
				if(!this.isOpened)
				{
					return;
				}
				break;
			case 2:
				if(this.isOpened)
				{
					return;
				}
				break;
		}
		this.unfoldBtnHandler();
	}

	public unfoldBtnHandler()
	{
		if(this.isPlaying){
			return;
		}
		this.isPlaying = true;
		//是不是开着的
		if(this.isOpened){
			App.MessageHelper.dispatchEvent(MessageConst.MESSGAE_MAINUI_BTNSCROLL,1);
			this.checkRed();
			egret.Tween.get(this._unfoldIcon)
			.to({rotation:this._unfoldIcon.rotation+135}, UnfoldBtn._animBaseTime)
			.call(this.animOver,this);

			let l = this._unfoldPanelList.length;
			for(let i = 0; i < l;i++){
				let tmpPanel = this._unfoldPanelList[i];
				if(this._unfoldPanelList.length == 1){
					egret.Tween.get(tmpPanel)
					.set({x:this._bg.width - tmpPanel.width})
					.wait(i * UnfoldBtn._animPlusTime)
					.to({x:this._bg.width - this.lockNum * (UnfoldBtn._iconWidth + UnfoldBtn._iconSpaceX)}, UnfoldBtn._animBaseTime )
					.call(this.animOver,this);
				} else {
					if(i == l -1 ){ 	//最后一个
						egret.Tween.get(tmpPanel)
						.set({x:0})
						.wait(i * UnfoldBtn._animPlusTime)
						.to({x:this._bg.width}, UnfoldBtn._animBaseTime)
						.call(this.animOver,this);
					} else if(i == 0){
						egret.Tween.get(tmpPanel)
						.set({x:this._bg.width - tmpPanel.width})
						.wait(i * UnfoldBtn._animPlusTime)
						.to({x:this._bg.width - this.lockNum * (UnfoldBtn._iconWidth + UnfoldBtn._iconSpaceX)}, UnfoldBtn._animBaseTime )
						// .to({x:this._bg.width - this.lockNum * (UnfoldBtn._iconWidth + UnfoldBtn._iconSpaceX)}, UnfoldBtn._animBaseTime * (1 - this.lockNum/UnfoldBtn._baseLock))

					} else {
						egret.Tween.get(tmpPanel)
						.set({x:0})
						.wait(i * UnfoldBtn._animPlusTime)
						.to({x:this._bg.width}, UnfoldBtn._animBaseTime )
					}
				}

			}
		} else {
			App.MessageHelper.dispatchEvent(MessageConst.MESSGAE_MAINUI_BTNSCROLL,2);
			this.cancelRed();
			egret.Tween.get(this._unfoldIcon)
			.to({rotation: this._unfoldIcon.rotation - 135}, UnfoldBtn._animBaseTime)
			.call(this.animOver,this);
			for(let i = 0; i < this._unfoldPanelList.length;i++){
				let tmpPanel = this._unfoldPanelList[i];

				if(this._unfoldPanelList.length == 1){
					egret.Tween.get(tmpPanel)
					.set({x: this._bg.width - this.lockNum * (UnfoldBtn._iconWidth + UnfoldBtn._iconSpaceX)})
					.wait(i * UnfoldBtn._animPlusTime)
					.to({x:this._bg.width - tmpPanel.width}, UnfoldBtn._animBaseTime )
					.call(this.animOver,this);
				} else {
					if(i == this._unfoldPanelList.length -1){ 	//最后一个
						egret.Tween.get(tmpPanel)
						.set({x:this._bg.width})
						.to({x:0}, UnfoldBtn._animBaseTime)
						.call(this.animOver,this);
					} else if(i == 0){
						egret.Tween.get(tmpPanel)
						.set({x: this._bg.width - this.lockNum * (UnfoldBtn._iconWidth + UnfoldBtn._iconSpaceX)})
						.wait(i * UnfoldBtn._animPlusTime)
						.to({x:this._bg.width - tmpPanel.width}, UnfoldBtn._animBaseTime )
						// .to({x:this._bg.width - tmpPanel.width}, UnfoldBtn._animBaseTime * (1 - this.lockNum/UnfoldBtn._baseLock))
					} else {
						egret.Tween.get(tmpPanel)
						.set({x:this._bg.width})
						.wait(i * UnfoldBtn._animPlusTime)
						.to({x:0}, UnfoldBtn._animBaseTime )
					}
				}
			}
		}
		this.isOpened = !this.isOpened;
	}
	public static getUnfoldBtnByName(name:string):BaseDisplayObjectContainer
	{
		let l = UnfoldBtn._iconList.length;
		for(let i:number=0;i<l;i++)
		{
			let icon:BaseDisplayObjectContainer = UnfoldBtn._iconList[i];
			if(icon && icon.name &&icon.name.split("_")[0] == name)
			{
				return icon;
			}
		}
		return null;
	}
	private animOver()
	{
		this.isPlaying = false;
	}

    public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SET_MUI_BTNSROLL,this.setUnfoldBtnHandler,this);
		TimerManager.remove(this.tick,this);
    	this._unfoldBtn = null;
    	this._unfoldIcon = null;
		this._bg = null;
		this._unfoldPanelList = [];
		UnfoldBtn._modelNameList = null;
		UnfoldBtn._maxModelIndex = 0;
	

		UnfoldBtn._iconList = [];

		UnfoldBtn._iconSpaceX = 25;
		UnfoldBtn._iconSpaceY = 0;
		UnfoldBtn._lineBaseCount = 4;
		UnfoldBtn._iconWidth = 80;
		UnfoldBtn._iconHeight = 80;

		UnfoldBtn._animBaseTime = 200;
		UnfoldBtn._animPlusTime = 70;

		UnfoldBtn._baseLock = 4;

		this.isOpened = false;
		this.isPlaying = false;
		this.lockNum = 0;
		UnfoldBtn.unfoldBtn = null;

		super.dispose();
	}

}