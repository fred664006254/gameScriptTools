/**
  * 科举答题排行榜
  * author 杨成国
  * date 2019.7.24
  * @class ExamRankPopupView
  */
 class ExamRankPopupView extends PopupView{
    /**排行榜 */
    public _rankScrollList:ScrollList = null;
    /**排行奖励列表 */
    public _rewardScrollList:ScrollList = null;
    public _topContainer:BaseDisplayObjectContainer = null;
    /** 是否为点击tarbar 获取数据 */
    public _isNeedUpdate:boolean = false;
    public _rewardBg:BaseBitmap = null;
    public _rankBg:BaseBitmap = null;
    public constructor(){
        super();
    }

    public initView(){
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EXAM_RANK), this.updateRankData, this);
		let myrankArr = this.param.data.myrankArr;
        let rankArr = this.param.data.rankArr;
        
        // 排行榜的tabbar
        let tabName:string[] = ["examinationSelfRank","examinationRankRewardTitle"];
        let tabbarGroup:TabBarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
        tabbarGroup.setPosition(35+GameData.popupviewOffsetX,15);
        this.addChildToContainer(tabbarGroup);
        // 排行榜的bg 
        // let rankBg = BaseBitmap.create("public_9_probiginnerbg");
        let rankBg = BaseBitmap.create("public_9_bg21");
        rankBg.width = 516;
        rankBg.height = 560;
        rankBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rankBg.width / 2, tabbarGroup.y + tabbarGroup.height);
        this.addChildToContainer(rankBg);
        this._rankBg = rankBg;

        let rewardBg = BaseBitmap.create("public_9_probiginnerbg");
        rewardBg.width = 520;
        rewardBg.height = 570;
        rewardBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardBg.width / 2, tabbarGroup.y + tabbarGroup.height);
        this.addChildToContainer(rewardBg);
        rewardBg.visible = false;
        this._rewardBg = rewardBg;

        //排行榜标题
        let topContainer = new BaseDisplayObjectContainer();
        topContainer.width = rankBg.width;
        topContainer.height = 35;
        topContainer.setPosition(rankBg.x, rankBg.y);
        this.addChildToContainer(topContainer);
        this._topContainer = topContainer;
        // 排行榜的topbg 
        let rankTopBg = BaseBitmap.create("public_9_bg37");
        rankTopBg.width = rankBg.width;
        rankTopBg.height = 35;
        topContainer.addChild(rankTopBg);
        // 排名 
        let rankTF  = ComponentManager.getTextField(LanguageManager.getlocal("examinationRankTitle-1"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        rankTF.setPosition(rankTopBg.x + 35, rankTopBg.y + rankTopBg.height / 2 - rankTF.height / 2);
        topContainer.addChild(rankTF);
        // 玩家昵称 
        let rankPlayNameTF  = ComponentManager.getTextField(LanguageManager.getlocal("examinationPlayerName-1"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        rankPlayNameTF.setPosition(rankTopBg.x + rankTopBg.width / 2 - rankPlayNameTF.width / 2 - 60,rankTF.y);
        topContainer.addChild(rankPlayNameTF);
        // 耗时
        let timeTF  = ComponentManager.getTextField(LanguageManager.getlocal("examinationRankTimeTitle"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        timeTF.setPosition(rankTopBg.x + rankTopBg.width / 2 + 15,rankTF.y);
        topContainer.addChild(timeTF);
        // 积分
        let scoreTF  = ComponentManager.getTextField(LanguageManager.getlocal("examinationScoreTitle-1"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreTF.setPosition(rankTopBg.x + rankTopBg.width - scoreTF.width  - 45, rankTF.y);
        topContainer.addChild(scoreTF);

        //排行榜的ScrollList
		let rect = new egret.Rectangle(0, topContainer.height, rankBg.width, rankBg.height - topContainer.height);
		this._rankScrollList = ComponentManager.getScrollList(ExamRankScrollItem, rankArr, rect);
		this._rankScrollList.setPosition(rankBg.x, rankBg.y + topContainer.height);
		this.addChildToContainer(this._rankScrollList);
		this._rankScrollList.setEmptyTip(LanguageManager.getlocal("examinationRankNotHave"));

        //排行奖励
        let rewardList:any[] = this.cfg.rankRewardList;
		let rewardRect = new egret.Rectangle(0, 0, rankBg.width, rankBg.height);
		this._rewardScrollList = ComponentManager.getScrollList(ExamRankRewardScrollItem, rewardList, rewardRect);
		this._rewardScrollList.setPosition(rankBg.x, rankBg.y + 5);
		this.addChildToContainer(this._rewardScrollList);
		this._rewardScrollList.visible = false;
       
        // 底部的bg 
        let bottomBg = BaseBitmap.create("public_9_bg1");
        bottomBg.width = 516;
        bottomBg.height = 112;
        bottomBg.setPosition(rankBg.x, rankBg.y + rankBg.height + 15);
        this.addChildToContainer(bottomBg);
        
        //昵称
        let nickName = Api.playerVoApi.getPlayerName();
        let rankNiceNameTF = ComponentManager.getTextField(LanguageManager.getlocal("examinationName", [nickName]), TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
        rankNiceNameTF.setPosition(bottomBg.x + 40, bottomBg.y + 20);
        this.addChildToContainer(rankNiceNameTF);
        //总耗时
        let myTimeStr = LanguageManager.getlocal("examinationRankNoTime");
        if (myrankArr.replytime){
            let myTimeNum = myrankArr.replytime/1000;
            myTimeStr = LanguageManager.getlocal("examinationRankTotalTime", [String(myTimeNum.toFixed(3))]);
        }
        let myTimeTF = ComponentManager.getTextField(myTimeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        myTimeTF.setPosition(bottomBg.width - 200, bottomBg.y + 20);
        this.addChildToContainer(myTimeTF);
        //积分
        let myScoreTF = ComponentManager.getTextField(LanguageManager.getlocal("examinationScore",[String(Api.examVoApi.getScore())]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        myScoreTF.setPosition(bottomBg.width - 200, bottomBg.y + bottomBg.height - myScoreTF.height -20);
        this.addChildToContainer(myScoreTF);
        // 我的排名 
        let myRank = myrankArr.myrank;
        if(myRank == null)
        {
        	myRank = LanguageManager.getlocal("examinationNotInRank");
        }
        else if(myRank > 10000)
        {
        	myRank = "10000+";
        }
        let myRankTF = ComponentManager.getTextField(LanguageManager.getlocal("examinationRank",[String(myRank)]),TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTF.setPosition(rankNiceNameTF.x, myScoreTF.y);
        this.addChildToContainer(myRankTF);

        let bottomTip = ComponentManager.getTextField(LanguageManager.getlocal("examinationBottomTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
        bottomTip.setPosition(bottomBg.x + bottomBg.width + 25 - bottomTip.width, bottomBg.y + bottomBg.height + 30);
        this.addChildToContainer(bottomTip);
    }

    public tabBtnClickHandler(params:any){
        if (params.index == 1){
            this.showRankRewardUI();
        }
        else{
            this._isNeedUpdate = true;
            NetManager.request(NetRequestConst.REQUEST_EXAM_RANK,{});
        }
    }

    public showRankUI(){
        this._rewardScrollList.visible = false;
        this._topContainer.visible = true;
        this._rankScrollList.visible = true;
        this._rewardBg.visible = false;
        this._rankBg.visible = true;
    }

    public showRankRewardUI(){
        this._rewardScrollList.visible = true;
        this._topContainer.visible = false;
        this._rankScrollList.visible = false;
        this._rewardBg.visible = true;
        this._rankBg.visible = false;
    }

    public updateRankData(event:egret.Event){
        if (!event.data.ret){
            this._isNeedUpdate = false;
            return;
        }
        if (this._isNeedUpdate == true){
            let data = event.data.data.data.rankArr;
            this._rankScrollList.refreshData(data);
            this.showRankUI();
            this._isNeedUpdate = false;
        }
    }

    /**
	 * 配置文件数据
	 */
	private get cfg(){
        return Config.ExamCfg;
    }

     /**标题 */
	protected getTitleStr():string
	{
		return "examinationRankTitle-1";
	}
	protected getShowHeight():number
	{
		return 830;
    }
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}

     public dispose(){
        this._rankScrollList = null;
        this._rewardScrollList = null;
        this._topContainer = null;
        this._isNeedUpdate = false;
        super.dispose();
     }

 }