class AcNewYearSevenDaysViewTab1 extends AcCommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList;
	private _newYearInfoVoList:Array<any>;
	private _progressBar:ProgressBar =null;
	private _arrReward:Array<any>=[];
	private _nodeContainer:BaseDisplayObjectContainer;
	private _myScore:number =0;
	private _needTxt:BaseTextField =null;
	private _maxScore:number =0;
	public static SCOREARR:Array<number> =[];
	private _downTitleLine:BaseBitmap =null;
	private _haveTxtGroup:BaseDisplayObjectContainer;
	private _progressLight:BaseBitmap = null;

	private newYearCfg = [ 
		 {
            id:1,
			acnewyearPosY:0,
		},
		 {
            id:2,
			acnewyearPosY:90,
		},
		 {
            id:3,
			acnewyearPosY:315,
		},
		 {
            id:4,
			acnewyearPosY:390,
		},
		 {
            id:5,
			acnewyearPosY:460,
		},
	 ]

	public constructor(data?) 
	{
        super();
        this.param = data;
		this.initView();
	}
	private get cfg() : Config.AcCfg.NewYearSevenDaysCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcNewYearSevenDaysVo{
        return <AcNewYearSevenDaysVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    protected getUicode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = this.code;
                break;
        }
        return code;
	}
	
	protected initView():void
	{
		this.width = GameConfig.stageWidth;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD),this.updata,this);
  		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT),this.updata,this);

		this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);

		let topdescbg = BaseBitmap.create("newsingledaytab2bg-1");
		topdescbg.height = AcNewYearSevenDaysView.topBgHeight;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topdescbg, this, [0,-3], true);
		this._nodeContainer.addChild(topdescbg);

		let bgName = ResourceManager.hasRes("acnewyear7days_taskitembg-"+this.code) ? "acnewyear7days_taskitembg-"+this.code : "newsingledaytab2bottombg-1";
		let bg = BaseBitmap.create(bgName);
		bg.width = this._nodeContainer.width;
		bg.height = AcNewYearSevenDaysView.topBgHeight;
		this._nodeContainer.addChild(bg);

		//进度条
		let progressImg = "progress3";
		if (this.code == "2"){
			progressImg = "progress5";
		}
		this._progressBar = ComponentManager.getProgressBar(progressImg,"progress3_bg",bg.height - 102);
		this._progressBar.anchorOffsetX = this._progressBar.width / 2;
		this._progressBar.anchorOffsetY = this._progressBar.height / 2;
		this._progressBar.x = bg.x + 40;
		this._progressBar.y = bg.y + bg.height / 2 + 30;
		this._progressBar.setTextSize(18);
		this._progressBar.setPercentage(this._myScore/this._maxScore);
		this._progressBar.rotation = this._progressBar.rotation-90;
		this._nodeContainer.addChild(this._progressBar);

		if (this.code == "2"){
			this._progressBar.y = bg.y + bg.height / 2 + 25;
			this._progressLight = BaseBitmap.create(App.CommonUtil.getResByCode(`acnewyear7days_progresslight`, this.getUicode()));
			this._nodeContainer.addChild(this._progressLight);
			this._progressLight.anchorOffsetX = this._progressLight.width/2;
			this._progressLight.anchorOffsetY = 2;
		}

		this._myScore = this.vo.getScore(); 

		let downTitleLine: BaseBitmap = BaseBitmap.create("public_line3");
		downTitleLine.width = 550;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, downTitleLine ,bg, [0,30]);
		this._downTitleLine =downTitleLine;
		this._nodeContainer.addChild(downTitleLine);
		if (this.code == "2"){
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, downTitleLine ,bg, [0,25]);
		}
 
		this._haveTxtGroup = new BaseDisplayObjectContainer();
		this._nodeContainer.addChild(this._haveTxtGroup);
		
		//当前拥有
		let titleTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("newayearNeednumDes"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
		this._haveTxtGroup.addChild(titleTxt); 

		//中国结
        let chineseknot = BaseBitmap.create(App.CommonUtil.getResByCode(`acnewyear7daysicon`, this.getUicode()));
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, chineseknot, titleTxt, [titleTxt.textWidth - 20, 0]);
		this._haveTxtGroup.addChild(chineseknot);
        
		//中国结 拥有多少个
		let needTxt: BaseTextField = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
		needTxt.setPosition(chineseknot.x+chineseknot.width, titleTxt.y); 
		needTxt.text =this._myScore+"";
		this._needTxt =needTxt;
		this._haveTxtGroup.addChild(needTxt); 
		
		var  curr_arr:Array<any>=this.cfg.itemListCfg.totalScoreReward;
		this._arrReward =[];
		let needScoreArr=[];
		let downbottomImg = ResourceManager.hasRes("acnewyear7days_progressflag-"+this.code) ? "acnewyear7days_progressflag-"+this.code : "acnewyear_bottom";
		for(let key in curr_arr)
		{	if(Number(key))
			{
				let reward : string = curr_arr[key].reward;
				this._arrReward.push(curr_arr[key]);
				let downbottom: BaseBitmap = BaseBitmap.create(downbottomImg);
				downbottom.name = `downbottombg${key}`;
				downbottom.anchorOffsetY = downbottom.height / 2;
				downbottom.y=downTitleLine.y+40+ downbottom.anchorOffsetY + this._progressBar.width - ((curr_arr[key].needScore/curr_arr[5].needScore)*this._progressBar.width);//(Number(key)-1) * ((this._progressBar.width - 15) / 5 + 5);
				downbottom.x=55;
				this._nodeContainer.addChild(downbottom); 
				needScoreArr.push(curr_arr[key].needScore);
				
			}
		}
		AcNewYearSevenDaysViewTab1.SCOREARR = needScoreArr;
		needScoreArr.reverse(); 
		this._maxScore =needScoreArr[0];
		for(var i:number=0;i<needScoreArr.length; i++)
		{	
			let downbottomTxtbg = this._nodeContainer.getChildByName( `downbottombg${i + 1}`);
			let downbottomTxt: BaseTextField = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
			downbottomTxt.text =needScoreArr[needScoreArr.length - i - 1];
			downbottomTxt.width=60;
			downbottomTxt.textAlign =egret.HorizontalAlign.CENTER;  
			this._nodeContainer.addChild(downbottomTxt); 
			if (this.code == "2"){
				App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, downbottomTxt ,downbottomTxtbg, [20, 1]);
			}
			else{
				App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, downbottomTxt ,downbottomTxtbg, [12,0]);
			}
		}

		let bottomBg = BaseBitmap.create(App.CommonUtil.getResByCode(`acnewyear7daytotalbg`, this.getUicode()));
		bottomBg.height=this._progressBar.width + 50;
		bottomBg.x=120;
		bottomBg.y=downTitleLine.y+10;
		this._nodeContainer.addChild(bottomBg); 

		let tmpRect =  new egret.Rectangle(0,0,440,this._progressBar.width - 15);
		if (this.code == "2"){
			bottomBg.height=this._progressBar.width + 40;
			bottomBg.x=150;
			bottomBg.y=downTitleLine.y+25; //30
			tmpRect =  new egret.Rectangle(0,0,440,this._progressBar.width + 5);
		}

		this._arrReward.reverse();
		let scrollList = ComponentManager.getScrollList(AcNewYearSevenDays1ScrollItem,this._arrReward,tmpRect,{code : this.code, height  : (this._progressBar.width - 15) / 5});
		scrollList.y =downTitleLine.y+40;
		scrollList.x = 152;
		this._scrollList = scrollList;     
		this._nodeContainer.addChild(scrollList);

		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._haveTxtGroup, this._downTitleLine);
		if (this.code == "2"){
			scrollList.y = downTitleLine.y+42; //52
			scrollList.x = 160;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._haveTxtGroup, this._downTitleLine, [0, 12]);
		}
		this._progressBar.setPercentage(this._myScore/this._maxScore);
		if (this._progressLight){
			this._progressLight.setPosition(this._progressBar.x, this._progressBar.y + this._progressBar.width/2 - this._progressBar.width * (this._myScore / this._maxScore > 1 ? 1 : this._myScore / this._maxScore))
		}
	}
	private updata(evt:egret.Event):void
	{
		this._myScore = this.vo.getScore(); 
		if(this._progressBar)
		{
			this._progressBar.setPercentage(this._myScore/this._maxScore);
			if (this._progressLight){
				this._progressLight.setPosition(this._progressBar.x, this._progressBar.y + this._progressBar.width/2 - this._progressBar.width * (this._myScore / this._maxScore > 1 ? 1 : this._myScore / this._maxScore))
			}
		}
		if(this._needTxt)
		{
			this._needTxt.text=""+this._myScore;
		}
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._haveTxtGroup, this._downTitleLine);
		if (this.code == "2"){
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._haveTxtGroup, this._downTitleLine, [0, 12]);
		}
		if(	this._scrollList)
		{
			this._scrollList.refreshData(this._arrReward,{code : this.code, height  : (this._progressBar.width - 15) / 5});
			this._scrollList.y =this._downTitleLine.y+40;
			if (this.code == "2"){
				this._scrollList.y = this._downTitleLine.y+42;
			}
		}
		if(evt.data && evt.data.ret && evt.data.data && evt.data.data.data && evt.data.data.data.rewards)
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
		this._arrReward=[];
		this._nodeContainer =null;
		this._myScore=null;
		this._needTxt=null;
		this._maxScore=null;
		AcNewYearSevenDaysViewTab1.SCOREARR =[];  
		this._progressLight = null;
		super.dispose();
	}
}