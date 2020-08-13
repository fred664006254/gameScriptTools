class AcNewYearViewTab1 extends AcCommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList;
	private _newYearInfoVoList:Array<any>;
	private _progressBar:ProgressBar =null;
	private _cfgObj=null;
	private _arrReward:Array<any>=[];
	private _nodeContainer:BaseDisplayObjectContainer;
	private _acNewYearVo =null;
	private _myScore:number =0;
	private _needTxt:BaseTextField =null;
	private _maxScore:number =0;
	public static SCOREARR:Array<number> =[];
	private _downTitleLine:BaseBitmap =null;

	private newYearCfg = [ 
		 {
            id:1,
			acnewyearPosY:-165,
		},
		 {
            id:2,
			acnewyearPosY:-5,
		},
		 {
            id:3,
			acnewyearPosY:80,
		},
		 {
            id:4,
			acnewyearPosY:155,
		},
		 {
            id:5,
			acnewyearPosY:225,
		},
	 ]
	public constructor() 
	{
		super(); 
		egret.callLater(this.initView,this);
	}
	 /**
     * 使用的code 仅仅使用资源，cn
     */
   	public get nowCode():string
    {
        if(this.code == "6")
        {
            return "4";
        }
        else
        {
            return this.code;
        }
    }
	protected initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.updata,this);
  		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT),this.updata,this);

		this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);

		let tmpVo  = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR,this.code); 
		this._acNewYearVo = tmpVo;

		this._myScore = this._acNewYearVo.getScore(); 
		this._cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACNEWYEAR,this.code);
		var  curr_arr:Array<any>=this._cfgObj.itemListCfg.totalScoreReward;
		this._arrReward =[];
		let needScoreArr=[];
		for(let key in curr_arr)
		{	if(Number(key))
			{
				let reward : string = curr_arr[key].reward;
				if(reward.indexOf('4013') > -1 && !Api.switchVoApi.checkIsTitleState('4013')){
					curr_arr[key].reward = reward.substring(10,reward.length);
				}
				this._arrReward.push(curr_arr[key]);
				var downbottom: BaseBitmap = BaseBitmap.create("acnewyear_bottom");
				downbottom.y=this.newYearCfg[Number(key)-1].acnewyearPosY;
				downbottom.x=63;
				this._nodeContainer.addChild(downbottom); 
				needScoreArr.push(curr_arr[key].needScore);
				
			}
		}
		AcNewYearViewTab1.SCOREARR = needScoreArr;
		needScoreArr.reverse(); 
		this._maxScore =needScoreArr[0];
		for(var i:number=0;i<needScoreArr.length; i++)
		{	
			let downbottomTxt: BaseTextField = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_LIGHT_YELLOW);
			downbottomTxt.text =needScoreArr[i];
			downbottomTxt.setPosition(downbottom.x+5, this.newYearCfg[i].acnewyearPosY);
			downbottomTxt.width=70;
			downbottomTxt.textAlign ="right";  
			this._nodeContainer.addChild(downbottomTxt); 
		}
	

		let downTitleLine: BaseBitmap = BaseBitmap.create("public_line3");
		downTitleLine.width = 550;
		downTitleLine.setPosition(50,-210); 
		this._downTitleLine =downTitleLine;
		this._nodeContainer.addChild(downTitleLine);
 
		
		//当前拥有
		let titleTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("newayearNeednumDes"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
		titleTxt.setPosition(215, downTitleLine.y-5);  
		this._nodeContainer.addChild(titleTxt); 


		//中国结
        let chineseknot = BaseBitmap.create("acnewyear_chineseknot2_"+this.nowCode);
        chineseknot.x = 320; 
        chineseknot.y =downTitleLine.y-18;
		this._nodeContainer.addChild(chineseknot);
        
		//中国结 拥有多少个
		let needTxt: BaseTextField = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
		needTxt.setPosition(chineseknot.x+60, titleTxt.y); 
		needTxt.text =this._myScore+"";
		this._needTxt =needTxt;
		this._nodeContainer.addChild(needTxt); 
		
		let bottomBg = BaseBitmap.create("public_9_bg43");
		bottomBg.width=492;
		bottomBg.height=506;
		bottomBg.x=140;
		bottomBg.y=downTitleLine.y+30;
		this._nodeContainer.addChild(bottomBg); 

 		let tmpRect =  new egret.Rectangle(0,0,GameConfig.stageWidth,506);
		this._arrReward.reverse();
		let scrollList = ComponentManager.getScrollList(NewYear1ScrollItem,this._arrReward,tmpRect,this.code);
		scrollList.y =downTitleLine.y+40;
		scrollList.x = 150;
		this._scrollList = scrollList;     
		this._nodeContainer.addChild(scrollList);
 

		//进度条
        this._progressBar = ComponentManager.getProgressBar("progress3","progress3_bg",470);
		this._progressBar.x = 30;
		this._progressBar.y = 315;
		this._progressBar.setTextSize(18);
		this._progressBar.setPercentage(this._myScore/this._maxScore);
        this._progressBar.rotation =this._progressBar.rotation-90;
		this._nodeContainer.addChild(this._progressBar); 

		let num = AcNewYearView.topBgHeight -this._nodeContainer.height;
		this._nodeContainer.y=num/2-50; 

	}
	private updata(evt:egret.Event):void
	{
		let tmpVo  = <AcNewYearVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACNEWYEAR,this.code); 
		this._myScore = tmpVo.getScore(); 
		if(this._progressBar)
		{
			this._progressBar.setPercentage(this._myScore/this._maxScore);
		}
		if(this._needTxt)
		{
			this._needTxt.text=""+this._myScore;
		}
		if(	this._scrollList)
		{
			this._scrollList.refreshData(this._arrReward,this.code);
			this._scrollList.y =this._downTitleLine.y+40;
		}
		if(evt.data.data)
		{
			App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(evt.data.data.data.rewards));
		}
	} 
	// 页签类型
	protected getSheepType():number
	{
		return 1;
	}

	public dispose():void
	{	
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.updata,this);
  		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT),this.updata,this);
	
		this._scrollList = null;
		this._newYearInfoVoList = null;
		this._progressBar =null;
		this._cfgObj =null;
		this._arrReward=[];
		this._nodeContainer =null;
		this._acNewYearVo =null;
		this._myScore=null;
		this._needTxt=null;
		this._maxScore=null;
		AcNewYearViewTab1.SCOREARR =[];  
		super.dispose();
	}
}