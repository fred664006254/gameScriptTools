/**
 * author yanyuling
 * @class acXingcunTreeView
 */
class AcXingcunView  extends BaseView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private aid:string = undefined;
    private _curSeIcon:BaseBitmap;
    private _seBoxId:number=1;
    private _bttipTxt:BaseTextField;
    private _taskBtn:BaseButton;
    private _colTxts:BaseTextField[] = [];
    private _iconBgs:BaseBitmap[] = [];
    private _droWifeIcon:BaseLoadDragonBones=undefined;
	private _skinImg:BaseLoadBitmap=undefined;
    private _selBox:BaseBitmap=undefined;
    private _rewardBoxs:BaseDisplayObjectContainer[] =[];
    private _xingcunTxt1:BaseTextField;
	public constructor() 
	{
		super();
        this.aid=App.StringUtil.firstCharToLower(this.getClassName().replace("Ac","").replace("View",""));
	}
	protected get code():string
	{
		if(this.param && this.param.data){
			return this.param.data;
		} else {
			return "";
		}
	}

	protected get acVo():AcXingcunVo
	{
        this.aid=App.StringUtil.firstCharToLower(this.getClassName().replace("Ac","").replace("View",""));
		return <AcXingcunVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
	}
    protected getTitleStr():string
	{
		return null;
	}
    public initView()
    {  
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_XINGCUN_ITEM,this.eventCollectHandlerCallBack,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_XINGCUN_TASK_REFRESH,this.refreshGetNum,this);
        this._nodeContainer = new  BaseDisplayObjectContainer();
		this.addChild(this._nodeContainer);
        
        this.showDBDragon();

        let wishtree_bg = BaseBitmap.create("xingcun_bg1");
        wishtree_bg.y = GameConfig.stageHeigth/2  - 100;
        if(wishtree_bg.y + wishtree_bg.height+50 >= GameConfig.stageHeigth){
            wishtree_bg.y = GameConfig.stageHeigth - 50 - wishtree_bg.height;
        }
        wishtree_bg.x = GameConfig.stageWidth/2 - wishtree_bg.width/2;
        this._nodeContainer.addChild(wishtree_bg);
       
        if(this._skinImg){
            this._skinImg.y = wishtree_bg.y - this._skinImg.height + 120;
            if(this._skinImg.y <= 0){
                this._skinImg.y = 20;
            }
        }
        if(this._droWifeIcon){
            // this._droWifeIcon.y = GameConfig.stageHeigth - this.container.y - 120;
            this._droWifeIcon.y =  wishtree_bg.y + 250;
        }
       

        let xingcun_name_flag = BaseBitmap.create("xingcun_name_flag");
        xingcun_name_flag.y = wishtree_bg.y - xingcun_name_flag.height - 10;
        xingcun_name_flag.x = 30;
        this._nodeContainer.addChild(xingcun_name_flag);

        let closeBtn =  ComponentManager.getButton("xingcun_closebtn","",this.hide,this);
        closeBtn.x = GameConfig.stageWidth - closeBtn.width - 10;
        closeBtn.y = 20;
        this._nodeContainer.addChild(closeBtn);

        let taskBtn =  ComponentManager.getButton("xingcun_btn","xingcunBtnTxt1",this.taskBtnHandler,this);
        taskBtn.x = GameConfig.stageWidth/2 - taskBtn.width/2;
        taskBtn.y = wishtree_bg.y + wishtree_bg.height -taskBtn.height/2 -20;
        taskBtn.setColor(TextFieldConst.COLOR_BROWN);
        this._nodeContainer.addChild(taskBtn);
        this._taskBtn = taskBtn;

        let xingcun_titlebg2 = BaseBitmap.create("xingcun_titlebg2");
        xingcun_titlebg2.width = 300;
        xingcun_titlebg2.y = wishtree_bg.y + 180;
        xingcun_titlebg2.x = GameConfig.stageWidth/2 - xingcun_titlebg2.width/2;
        this._nodeContainer.addChild(xingcun_titlebg2);

        this._bttipTxt = ComponentManager.getTextField("",18,0xfedb39);
        this._bttipTxt.text  = LanguageManager.getlocal("xingcunTxt2",[""+this.acVo.sumnum]);
        this._bttipTxt.x = xingcun_titlebg2.x + xingcun_titlebg2.width/2 ;
        this._bttipTxt.anchorOffsetX =  this._bttipTxt.width/2;
        this._bttipTxt.y = xingcun_titlebg2.y + xingcun_titlebg2.height/2 - this._bttipTxt.height/2;
        this._nodeContainer.addChild(this._bttipTxt);

        let _ruleBtn = ComponentManager.getButton("btn_rule","",this.clickRuleBtnHandler,this);
        _ruleBtn.setScale(0.8);
        _ruleBtn.x = xingcun_titlebg2.x + xingcun_titlebg2.width + 2;
        _ruleBtn.y = xingcun_titlebg2.y + xingcun_titlebg2.height/2 - _ruleBtn.height/2*0.8;                                                                ;
        this.addChild(_ruleBtn);

        let diffday = this.acVo.diffday;
        let completeTaskReward = this.acVo.config.completeTaskReward;
        for (var index = 0; index < 6; index++) {
            let iconbg = BaseBitmap.create("xingcun_iconbg2");
            if(index == 1 || index == 4){
                iconbg.x = GameConfig.stageWidth/2 - iconbg.width/2;
            }else if(index == 0 || index == 3){
                iconbg.x = GameConfig.stageWidth/2 - iconbg.width/2 - 162;
            }else{
                iconbg.x = GameConfig.stageWidth/2 + iconbg.width/2 + 15;
            }
            if(index <3){
                iconbg.y = wishtree_bg.y +220;
            }else{
                iconbg.y = wishtree_bg.y +370;
            }
            this._nodeContainer.addChild(iconbg);
            let rewardIcon = GameData.getRewardItemIcons(completeTaskReward[""+(index+1)].reward,false,true)[0];
            rewardIcon.setScale(0.8);
            rewardIcon.x = iconbg.x + iconbg.width/2 - rewardIcon.width/2*rewardIcon.scaleX;
            rewardIcon.y = iconbg.y + iconbg.height/2 - rewardIcon.height/2*rewardIcon.scaleY - 15;
            this._nodeContainer.addChild(rewardIcon);

            let blackbg = BaseBitmap.create("xingcun_blackbg"); 
            blackbg.x = iconbg.x + iconbg.width/2 - blackbg.width/2;
            blackbg.y = iconbg.y + iconbg.height - blackbg.height - 5;
            this._nodeContainer.addChild(blackbg);

            iconbg.addTouchTap(this.switchIcon,this,[index+1]);
            if(diffday == index+1){
                iconbg.texture = ResourceManager.getRes("xingcun_iconbg");
                this._seBoxId = diffday;
                this._curSeIcon = iconbg;
            }

            let collecttxt = ComponentManager.getTextField("0",18,TextFieldConst.COLOR_LIGHT_YELLOW);
            collecttxt.text  = LanguageManager.getlocal("xingcunTxt1");
            collecttxt.x = blackbg.x + blackbg.width/2;
            collecttxt.y = blackbg.y + blackbg.height/2 - collecttxt.height/2;
            this._nodeContainer.addChild(collecttxt);
            this._colTxts.push(collecttxt);
            this._iconBgs.push(iconbg);
            this._rewardBoxs.push(rewardIcon);
        }
        
        this._selBox = BaseBitmap.create("xingcun_iconbg_select");
        this._nodeContainer.addChild(this._selBox);
        
        let btntipbg = BaseBitmap.create("xingcun_titlebg4");
        btntipbg.width = 350;
        btntipbg.y = taskBtn.y - 40;
        btntipbg.x = GameConfig.stageWidth/2 - btntipbg.width/2;
        this._nodeContainer.addChild(btntipbg);

        let xingcunTxt = ComponentManager.getTextField("",18,0xfdf3b5);
        let cdst = this.acVo.acTimeAndHour; 
        xingcunTxt.text  = LanguageManager.getlocal("acWifeBathingViewAcTime-1",[cdst]);
        xingcunTxt.x = btntipbg.x + btntipbg.width/2 ;
        xingcunTxt.y = btntipbg.y + btntipbg.height/2 - 9;
        this._nodeContainer.addChild(xingcunTxt);
        this._xingcunTxt1 = xingcunTxt;
        this._xingcunTxt1.anchorOffsetX = this._xingcunTxt1.width/2;
        // this.tick();
        this._selBox.x = this._iconBgs[this._seBoxId-1].x-5;
        this._selBox.y = this._iconBgs[this._seBoxId-1].y-5;
        this.refreshGetNum();
        // this.switchIcon()
    }

    private showDBDragon()
	{
        let servantId = this.acVo.config.getRewardSerId();
        let boneName = "servant_full2_"+ servantId+ "_ske";
        let dagonBonesName = "servant_full2_"+ servantId ;
        if(  !Api.switchVoApi.checkServantCloseBone() && boneName && servantId && RES.hasRes(boneName)&&App.CommonUtil.check_dragon() ){
            if(this._skinImg){
                this._skinImg.visible = false;
            }
            if(this._droWifeIcon){
                this._droWifeIcon.dispose();
                this._droWifeIcon = null;
            }
            this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
            this._droWifeIcon.visible = true; 
            this._droWifeIcon.setScale(0.9);
            this._droWifeIcon.anchorOffsetY = this._droWifeIcon.height;
            this._droWifeIcon.anchorOffsetX = this._droWifeIcon.width/2 *this._droWifeIcon.scaleX;
            this._droWifeIcon.x = GameConfig.stageWidth/2;
            // this._droWifeIcon.y = GameConfig.stageHeigth - this.container.y - 120;
            this.addChildToContainer(this._droWifeIcon);
        }else{
			if(!this._skinImg){
				let skinW =640;
				let skinH = 482;
				let tarScale = 1.0;
				let serCfg = Config.ServantCfg.getServantItemById(servantId);
				let skinImgPath = serCfg.fullIcon;
				this._skinImg = BaseLoadBitmap.create(skinImgPath);
				this._skinImg.width = skinW;
				this._skinImg.height = skinH;
				this._skinImg.setScale(tarScale);
				// this._skinImg.anchorOffsetY = this._skinImg.height;
				this._skinImg.anchorOffsetX = this._skinImg.width/2;
				this._skinImg.x = GameConfig.stageWidth/2;
				this.addChildToContainer(this._skinImg);
			}
		}
	}

    private refreshGetNum()
    {
        this._bttipTxt.text  = LanguageManager.getlocal("xingcunTxt2",[""+this.acVo.sumnum]);
        this._bttipTxt.anchorOffsetX =  this._bttipTxt.width/2;
        this.refreshBtnRed();

        for (let index = 0; index < this._colTxts.length; index++) {
            let txt = this._colTxts[index];
            let box = this._iconBgs[index];
             if(this.acVo.isAllCollect(index+1))
            {
                txt.text = LanguageManager.getlocal("xingcun_dayTask_collect_txt1");
                box.texture = ResourceManager.getRes("xingcun_iconbg");
                this._rewardBoxs[index].visible = false;
            }else{
                this._rewardBoxs[index].visible = true;
                box.texture = ResourceManager.getRes("xingcun_iconbg2");
                if(index+1 < this.acVo.diffday){
                    txt.text = LanguageManager.getlocal("xingcun_dayTask_collect_txt2");
                }else{
                    txt.text = LanguageManager.getlocal("xingcun_dayTask_collect_txt3");
                }
            }
            if(index+1 == this.acVo.diffday){
                txt.text = LanguageManager.getlocal("xingcun_dayTask_collect_txt4");
            }
            if(index == this.acVo.diffday){
                txt.text = LanguageManager.getlocal("xingcun_dayTask_collect_txt5");
            }
            txt.anchorOffsetX = txt.width/2;
        }
    }
    private switchIcon(event: egret.TouchEvent, args: any)
    {
        let target =<BaseBitmap> event.target;
        if(this._curSeIcon == target ){
            return;
        }
        // target.texture = ResourceManager.getRes("xingcun_iconbg");
        this._curSeIcon = target;
        this._seBoxId = args;
        this._selBox.x = this._iconBgs[this._seBoxId-1].x-5;
        this._selBox.y = this._iconBgs[this._seBoxId-1].y-5;
        this.refreshBtnRed();
    }
    private refreshBtnRed()
    {
        if(this.acVo.isAllCollect(this._seBoxId))
        {
            this._taskBtn.setText("xingcunBtnTxt3");
            App.DisplayUtil.changeToGray(this._taskBtn);
            App.CommonUtil.removeIconFromBDOC(this._taskBtn);
        }else{
            App.DisplayUtil.changeToNormal(this._taskBtn);
            if(this.acVo.isCollectEnable(this._seBoxId)){
                this._taskBtn.setText("xingcunBtnTxt2");
            }else{
                this._taskBtn.setText("xingcunBtnTxt1");
            }

            if(this.acVo.isCollectEnable(this._seBoxId))
            {
                App.CommonUtil.addIconToBDOC(this._taskBtn,null,false,-10);
            }else{
                App.CommonUtil.removeIconFromBDOC(this._taskBtn);
            }
        }
    }

    private taskBtnHandler()
    {
        if(this._seBoxId > this.acVo.diffday ){
            App.CommonUtil.showTip(LanguageManager.getlocal("xingcun_dayTask_collect_txt6"));
             return;
        }
        // if(this.acVo.isAllCollect(this._seBoxId)){
        //     return;
        // }
        if(this.acVo.isBigIconCollectEnable(this._seBoxId))
        {
            let _ftype = 1;
            
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_XINGCUN_ITEM,{activeId:this.acVo.aidAndCode,taskId:"1",thedays:this._seBoxId,ftype:_ftype})
        }else{
            ViewController.getInstance().openView(ViewConst.POPUP.ACXINGCUNTASKPOPUPVIEW,{aid:this.aid,code:this.code,day: this._seBoxId});

        }
    }

    protected eventCollectHandlerCallBack(event:egret.Event)
    {
        let rData = event.data.data.data;
        let ret = event.data.data.ret
        if (ret != 0 )
        {
            return;
        }
        let rewardList =  GameData.formatRewardItem(rData.rewards);
        App.CommonUtil.playRewardFlyAction(rewardList);
        Api.servantVoApi.checkServantChangeRewards(rData.cfrewards,rData.rewards,rData.otherrewards);
    }
   
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "xingcun_btn","xingcun_day1","xingcun_day2",
            "xingcun_day3", "xingcun_day4","xingcun_day5", "xingcun_day6", "xingcun_titlebg1",
            "xingcun_big_icon","xingcun_bg2", "xingcun_closebtn", "xingcun_blackbg", "xingcun_name_flag",
            "xingcun_contentbg1", "xingcun_iconbg", "xingcun_iconbg2","xingcun_titlebg2","xingcun_bg1","xingcun_titlebg4",
            "xingcun_iconbg_select",
		]);
	}

    public dispose():void
	{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_XINGCUN_ITEM,this.eventCollectHandlerCallBack,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_XINGCUN_TASK_REFRESH,this.refreshGetNum,this);
        this.aid = null;
        this._nodeContainer = null;
        this._curSeIcon = null;
        this._seBoxId = 1;
        this._taskBtn = null;
        if(this._droWifeIcon){
			this._droWifeIcon.dispose();
			this._droWifeIcon = null;
		}
        this._skinImg = null;
        this._selBox = null;
        this._iconBgs = [];
        this._colTxts = [];
        this._rewardBoxs = [];
		super.dispose();
	}


	protected getBgName():string
	{
		return null;
	}

	protected getButtomLineBg():string
	{
		return null;
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected getTitleBgName():string
	{
		return null;
	}

    protected getRuleInfo():string
	{
		return "xingcunRuleInfo";
	}

    private clickRuleBtnHandler(param:any):void
	{
        let cdst = this.acVo.acTimeAndHour; 
		ViewController.getInstance().openView(ViewConst.POPUP.RULEINFOPOPUPVIEW,LanguageManager.getlocal(this.getRuleInfo(),[cdst]));
	}
}