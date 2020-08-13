
/**
 * author yanyuling
 */
class AcMonopolyTaskAndRewardView extends CommonView {

	private _scrollList:ScrollList = null;
    private _scrollRewardList:ScrollList = null;
	private aid:string = null;
	private code:string = null;
	private _aidAndCode:{"aid":string;"code":string} = null;
    private _cdTxt:BaseTextField;
    public get vo ()
    {
       return <AcMonopolyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
    }

	public initView()
	{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MONOPOLY_TASK_REFRESH,this.checkRed,this);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_MONOPOLY_TASKLIST_REFRESH,this.refreshTaskRed,this);
        
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
		this._aidAndCode = {"aid":this.aid,"code":this.code};

        let bg = BaseBitmap.create("public_9v_bg03");
		bg.width = GameConfig.stageWidth;
		bg.height = GameConfig.stageHeigth - this.container.y;
		this.addChildToContainer(bg);

        let buttombg = BaseBitmap.create("adult_lowbg");
		buttombg.y = GameConfig.stageHeigth - this.container.y - buttombg.height;
		buttombg.x = this.width/2 - buttombg.width/2;
		this.addChildToContainer(buttombg);

        this._cdTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._cdTxt.text = LanguageManager.getlocal("acMonopoly_txt4",);
        this._cdTxt.x = buttombg.x+ 40;
        this._cdTxt.y = buttombg.y + buttombg.height/2 - this._cdTxt.height/2;
        this.addChildToContainer(this._cdTxt);

        let tiptxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
        tiptxt.text = LanguageManager.getlocal("acMonopoly_txt5",);
        tiptxt.x = buttombg.x+ buttombg.width - tiptxt.width - 40;
        tiptxt.y = this._cdTxt.y;
        this.addChildToContainer(tiptxt);

		//边框
        let borderBg = BaseBitmap.create("public_9v_bg03");
		borderBg.width=GameConfig.stageWidth;
		borderBg.height=GameConfig.stageHeigth - 69- this.container.y;
		borderBg.y = 69;
		this.addChildToContainer(borderBg);

        let rect = new egret.Rectangle(0,0,bg.width - 20,GameConfig.stageHeigth - 240);
        this._scrollList = ComponentManager.getScrollList(AcMonopolyTaskScrollItem,[],rect);
		this._scrollList.setPosition(10,5);
        this._scrollList.horizontalScrollPolicy = "off";
		this.addChildToContainer(this._scrollList);

        let rect2 = new egret.Rectangle(0,0,bg.width - 20,GameConfig.stageHeigth - 240);
        this._scrollRewardList = ComponentManager.getScrollList(AcMonopolyTurnRewardScrollItem,[],rect2);
		this._scrollRewardList.y = this._scrollList.y;
        this._scrollRewardList.horizontalScrollPolicy = "off";
		this._scrollRewardList.x = this._scrollList.x;
		this.addChildToContainer(this._scrollRewardList);
        
        this.selectedTabIndex = this.param.data.showTab;
        this.tabbarGroup.selectedIndex = this.selectedTabIndex ;
        this.checkRed();
        this.tick();
	}

     public tick(): boolean {
		if(!this.vo.isStart)
        {
            this._cdTxt.text = LanguageManager.getlocal("acPunishEnd");
		    return false;
        }
        let weet = App.DateUtil.getWeeTs(GameData.serverTime);
        let deltaT = weet + 86400 -  GameData.serverTime ;
        if(weet + 86400 > this.vo.et){
            deltaT = this.vo.et -  GameData.serverTime ;
        }
        this._cdTxt.text = LanguageManager.getlocal("acMonopoly_acCD3",[App.DateUtil.getFormatBySecond(deltaT, 8)]);
		return false;
	}
    private checkRed()
    {
        if(this.vo.isShowTaskRed()){
            this.addRedPoint(0);
        }else{
            this.removeRedPoint(0);
        }

        if(this.vo.isShowRewardRed()){
            this.addRedPoint(1);
        }else{
            this.removeRedPoint(1);
        }
        this.refreshTaskRed();
        this.refreshRewardRed();
    }

    protected changeTab():void
	{
		if(this.selectedTabIndex == 0){
            this._scrollRewardList.visible = false;
            this._scrollList.visible = true;
            this.refreshTaskRed();
        }else{
            this._scrollRewardList.visible = true;
            this._scrollList.visible = false;
            this.refreshRewardRed();
        }
	}
    private refreshRewardRed()
    {
        let cfg = <Config.AcCfg.MonopolyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid,this.param.data.code);
        let turnReward = cfg.turnReward;
        let list1 = [];
        let list2 = [];
        let list3 = [];
        let vo = this.vo;
        for (var index = 0; index < turnReward.length; index++) {
            var element = turnReward[index];
            let flag = vo.getTurnFlag(element.id);
            if( flag){
                list2.push(element)
            }else{
                list1.push(element);
            }
        }
        let list = list1.concat(list2);
        this._scrollRewardList.refreshData(list);
    }

    private refreshTaskRed()
    {
        // this.checkRed();
        let cfg = <Config.AcCfg.MonopolyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid,this.param.data.code);
        let task = cfg.task;
        let list1 = [];
        let list2 = [];
        let list3 = [];
        for (var index = 0; index < task.length; index++) {
            var element = task[index];
            let openType = element.openType;
            //任务进度
            let taskNum = this.vo.gettTaskNum(""+element.questType);
            let newTaskNum = element.value;
            if(this.vo.getTaskStatus( "" + (element.id) )){
                list3.push(element)
            }else{
                if(taskNum >= newTaskNum){
                    list1.push(element);
                }else{
                    list2.push(element);
                }
            }
        }
        let list = list1.concat(list2).concat(list3);
        this._scrollList.refreshData(list);
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([ 
            "acchristmasview_1_red","adult_lowbg",
        ]);
	}

    protected getTabbarTextArr():Array<string>
	{
		return [`acMonopoly_tab1`,`acMonopoly_tab2`];
	}
	public dispose()
	{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MONOPOLY_TASK_REFRESH,this.checkRed,this);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MONOPOLY_TASKLIST_REFRESH,this.refreshTaskRed,this);

	    this._scrollList = null;
        this._aidAndCode = null;
        this._scrollRewardList = null;
        this.aid = null;
        this.code = null;
        this._cdTxt = null;
		super.dispose();
	}
	
}