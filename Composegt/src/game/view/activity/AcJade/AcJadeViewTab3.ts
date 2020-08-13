
class AcJadeViewTab3 extends AcCommonViewTab {

	private _scrollList:ScrollList = null;
	private _aidAndCode:{"aid":string;"code":string} = null;
    private _fettersList:any = [];
    private _fettersBaseList:any = [];
    private _maskPanel:BaseDisplayObjectContainer = null;
    private _lockPeople: BaseLoadBitmap = null;
    private _lockDialog: BaseDisplayObjectContainer = null;
    private _fettersDataList:any = 
    [
        {x:-40,y:30,scaleX:1,scaleY:1,rotation: -5},
        {x:-20,y:40,scaleX:1,scaleY:1,rotation: 23},
        {x:-40,y:130,scaleX:1,scaleY:1,rotation: -10},
        {x:-30,y:200,scaleX:1,scaleY:1,rotation: -3}
    ];
    public get vo ()
    {
       return <AcJadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
    }
	public constructor() {
		super();
		this.initView();
	}

	public initView()
	{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETJADEITEMA,this.refreshData,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACJADE_REFRESHVO,this.refreshData,this);
		this._aidAndCode = {"aid":this.aid,"code":this.code};
		let rect = new egret.Rectangle(0,0,612,GameConfig.stageHeigth -this.getViewTitleButtomY() - 50 - 47)
        let cfg = <Config.AcCfg.JadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);

        // let taskList = cfg.getTaskList();
		// let vo  = <AcJadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let taskData = this.vo.getSortTask();



		// let vo  = <AcJadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		// let taskData = vo.getSortTask();
		taskData.sort((a:Config.AcCfg.JadeTaskItemCfg,b:Config.AcCfg.JadeTaskItemCfg) =>{return a.sortId - b.sortId});




		this._scrollList = ComponentManager.getScrollList(AcJadeViewTaskScrollItem,taskData,rect,this._aidAndCode);
		this._scrollList.y = 3;
		this._scrollList.x = GameConfig.stageWidth/2 - this._scrollList.width/2;
		this.addChild(this._scrollList);

		
        let bottomBg = BaseBitmap.create("adult_lowbg");
		bottomBg.x = GameConfig.stageWidth/2- bottomBg.width/2;
		bottomBg.y = GameConfig.stageHeigth -486- bottomBg.height-12;
		this.addChild(bottomBg);

        let tabText = ComponentManager.getTextField(LanguageManager.getlocal("acJadeViewBottomTip3_"+this.code),20,0xdc9740);
        tabText.x = bottomBg.x + bottomBg.width/2 - tabText.width/2;
        tabText.y = bottomBg.y + bottomBg.height/2 - tabText.height/2;
        tabText.textAlign =egret.HorizontalAlign.CENTER;
        this.addChild(tabText);

        this.initFetters();
	}
    //初始化锁链
    private initFetters()
    {   
        let lock = this.vo.unlock;
        if(lock == 0 || lock==1)
        {

            if(this._maskPanel == null)
            {
                this._maskPanel = new BaseDisplayObjectContainer();
                this._maskPanel.width = GameConfig.stageWidth;
                this._maskPanel.height = this.height;
                this.addChild(this._maskPanel);
                let mask = BaseBitmap.create("public_9_viewmask");
                mask.width = this._maskPanel.width;
                mask.height = this._maskPanel.height;
                this._maskPanel.addChild(mask);
                this._maskPanel.addTouchTap(()=>{},this);

                let clip:CustomMovieClip = null;
                let bs: BaseLoadBitmap = null;
                //初始化锁链
                for(let i = 0; i < this._fettersDataList.length;i++)
                {
                    clip = ComponentManager.getCustomMovieClip("acjadeview_fetters",10,70);
                    clip.x = this._fettersDataList[i].x;
                    clip.y = this._fettersDataList[i].y;
                    clip.scaleX = this._fettersDataList[i].scaleX;
                    clip.scaleY = this._fettersDataList[i].scaleY;
                    clip.rotation = this._fettersDataList[i].rotation;
                    this._fettersList.push(clip);
                    this._maskPanel.addChild(clip);

                    bs = BaseLoadBitmap.create("acjadeview_fettersB");
                    bs.x = this._fettersDataList[i].x;
                    bs.y = this._fettersDataList[i].y;
                    bs.scaleX = this._fettersDataList[i].scaleX;
                    bs.scaleY = this._fettersDataList[i].scaleY;
                    bs.rotation = this._fettersDataList[i].rotation;
                    this._fettersBaseList.push(bs);
                    this._maskPanel.addChild(bs);

                    // clip.texture = ResourceManager.getRes("acjadeview_fettersB");
                }                

                this._lockDialog = new BaseDisplayObjectContainer();
                this._lockDialog.width = GameConfig.stageWidth;
                this._lockDialog.height = this.height;
                this._maskPanel.addChild(this._lockDialog);

                let lockPeople = BaseLoadBitmap.create("wife_full_304");
                lockPeople.width = 640;
                lockPeople.height = 840;
                lockPeople.setScale(0.5);
                lockPeople.x = -50;
                lockPeople.y = 100 + GameConfig.stageHeigth - 960;
                // lockPeople.y = this._lockDialog.height - lockPeople.height;
                this._lockDialog.addChild(lockPeople);

                let dialogBg = BaseBitmap.create("public_9v_bg11");
                dialogBg.scaleX = -1;
                dialogBg.width = 280;
                dialogBg.height = 170;
                dialogBg.x = GameConfig.stageWidth / 2 + dialogBg.width/2;
                dialogBg.y = 90;
                this._lockDialog.addChild(dialogBg);

              

                let dialogText = ComponentManager.getTextField(LanguageManager.getlocal("acJadeViewLockDesc_"+this.code),20,TextFieldConst.COLOR_BROWN);
                dialogText.width = 250;
                dialogText.x = GameConfig.stageWidth / 2 - dialogText.width/2;
                dialogText.y = dialogBg.y + 20;
                this._lockDialog.addChild(dialogText);

                let rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acCarnivalToChargeBtnText",this.rechargeHandler ,this);
                rechargeBtn.x = GameConfig.stageWidth / 2 - rechargeBtn.width/2;
                rechargeBtn.y = dialogText.y + dialogText.height + 15;
                this._lockDialog.addChild(rechargeBtn);

            }
            if(lock == 1)
            {
                this.playFetters();
            }
        } 
    }
    private rechargeHandler(event:egret.Event)
    {
        ViewController.getInstance().hideView("AcJadeView");
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }
    //播放锁链特效
    private playFetters()
    {
        
        this._lockDialog.visible = false;
        for(let j = 0 ;j < this._fettersBaseList.length; j ++)
        {
             this._maskPanel.removeChild(this._fettersBaseList[j]);
        }

        this._fettersBaseList = [];

        for(let i = 0 ;i < this._fettersList.length; i ++)
        {
           
            this._fettersList[i].playWithTime(1);

        }
        let activityId = this._aidAndCode.aid + "-" + this._aidAndCode.code;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SETJADELOCK,{"activeId":activityId,"lock":3});
        
        // egret.Tween();
        egret.Tween.get(this._maskPanel)
        .wait(1000)
        .call(this.hideMaskPanel,this);
    }
    private hideMaskPanel()
    {
        this._maskPanel.visible = false;
    }
	private refreshData(event:egret.Event)
	{
		if(event)
		{
			if(event.data&&event.data.ret)
			{
				let cmd =  event.data.data.cmd;
				if(cmd == NetRequestConst.REQUEST_ACTIVITY_GETJADEITEMA)
				{
					let data = event.data.data.data;
					let rewards = data.rewards;
					let rList = GameData.formatRewardItem(rewards);
					App.CommonUtil.playRewardFlyAction(rList);
				}
				
			}
		}
		
		let vo  = <AcJadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let taskData = vo.getSortTask();
		taskData.sort((a:Config.AcCfg.JadeTaskItemCfg,b:Config.AcCfg.JadeTaskItemCfg) =>{return a.sortId - b.sortId});
		this._scrollList.refreshData(taskData,this._aidAndCode)
        
        if(this.vo.unlock == 1){
           
            
            this.playFetters();
        }
        // this.initFetters();
	}
	/**
	 * 切换标签
	 */
	public refreshWhenSwitchBack()
	{
		this.refreshData(null);
	}
	public dispose()
	{
		// App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY,this.refreshData,this);
		// App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMB,this.refreshData,this);
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACMIDAUTUMN_TASKANDRECHARGE,this.refreshData,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETJADEITEMA,this.refreshData,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACJADE_REFRESHVO,this.refreshData,this);
	    this._scrollList = null;
        this._aidAndCode = null;
        this._fettersList = [];
        this._fettersBaseList= [];
        this._maskPanel = null;
        this._lockPeople = null;
        this._lockDialog = null;
		super.dispose();
	}
	
}