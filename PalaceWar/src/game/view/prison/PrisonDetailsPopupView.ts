class PrisonDetailsPopupView extends PopupView
{
    //囚犯详情
     public constructor() 
	{
		super();
	}
    private prisonPenaltyConsumptionTxt:BaseTextField =null;
    private prisonPunishmentOnlineTxt:BaseTextField =null;
    private prisonProbabilityTxt:BaseTextField =null;
    private dropTxt:BaseTextField =null;
    private nameArr:Array<string>=[];
    private itemNameStr:string ='';
    private PrisonItemCfg:any =null;
    private index:number =0;
    private prisonNameTex:BaseTextField =null;
    private officeTex:BaseTextField =null;

    protected getTitleStr():string
	{ 
        if(Api.switchVoApi.checkOpenNewPrison())
        {
            return "prisonDetailsPopupViewTitle_laoyiType";
        }
        else
        {
            return "prisonDetailsPopupViewTitle";
        }
	}
	protected initView():void
	{
    
        var num = this.param.data-20;
        this.PrisonItemCfg =Config.PrisonCfg.getIndexPrisonItemCfg(num);
        this.index = this.param.data;

        let public_9_bg4 = BaseBitmap.create("public_9_bg4"); 
        public_9_bg4.x=public_9_bg4.x+25+GameData.popupviewOffsetX;
        public_9_bg4.y=public_9_bg4.y+20;
        public_9_bg4.width=520;
        public_9_bg4.height=300;
        this.addChildToContainer(public_9_bg4);
       
        let public_9_wifebg = BaseLoadBitmap.create("searchbinfowifebg"); 
        public_9_wifebg.x=public_9_wifebg.x+35+GameData.popupviewOffsetX;
        public_9_wifebg.y=public_9_wifebg.y+55;
        this.addChildToContainer(public_9_wifebg);

         
        // var newIndex = this.index+20;
        let prisonHead:BaseBitmap = BaseLoadBitmap.create("story_npc_"+this.param.data);
        prisonHead.x+=35+GameData.popupviewOffsetX;
        prisonHead.y+=25;
        prisonHead.scaleX =0.5;
        prisonHead.scaleY =0.5;
        this.addChildToContainer(prisonHead);


        let public_9_probiginnerbg = BaseBitmap.create("public_9_probiginnerbg"); 
        public_9_probiginnerbg.width =256;
        public_9_probiginnerbg.height =258;
        public_9_probiginnerbg.x=270+GameData.popupviewOffsetX;
        public_9_probiginnerbg.y=45;
        this.addChildToContainer(public_9_probiginnerbg);

        //创建滚动窗口内容面板
        let scrollPanel = new BaseDisplayObjectContainer();

        

        //惩罚消耗
        this.prisonPenaltyConsumptionTxt= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
	    this.prisonPenaltyConsumptionTxt.text = LanguageManager.getlocal("prisonPenaltyConsumption",[this.PrisonItemCfg.cost+""]);
		// this.prisonPenaltyConsumptionTxt.setPosition(public_9_probiginnerbg.x+10,public_9_probiginnerbg.height/4+10);  
		// this.addChildToContainer(this.prisonPenaltyConsumptionTxt);
        this.prisonPenaltyConsumptionTxt.setPosition(10,public_9_probiginnerbg.height/4+10 - 45);
        scrollPanel.addChild(this.prisonPenaltyConsumptionTxt);

        //惩罚上限
        this.prisonPunishmentOnlineTxt= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
        if(this.PrisonItemCfg.num== 0)
        {
            var str = LanguageManager.getlocal("prisonerInfinite");
            this.prisonPunishmentOnlineTxt.text = LanguageManager.getlocal("prisonPunishmentOnline",[str]);
        }
        else
        {
           this.prisonPunishmentOnlineTxt.text = LanguageManager.getlocal("prisonPunishmentOnline",[this.PrisonItemCfg.num]);
        }
		// this.prisonPunishmentOnlineTxt.setPosition(this.prisonPenaltyConsumptionTxt.x,public_9_probiginnerbg.height/4+40);
		// this.addChildToContainer(this.prisonPunishmentOnlineTxt);
        this.prisonPunishmentOnlineTxt.setPosition(this.prisonPenaltyConsumptionTxt.x,public_9_probiginnerbg.height/4+40);
		scrollPanel.addChild(this.prisonPunishmentOnlineTxt);

        //有几率获得
        this.prisonProbabilityTxt= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		this.prisonProbabilityTxt.text = LanguageManager.getlocal("dailyTask_rewardTip");
		// this.prisonProbabilityTxt.setPosition(this.prisonPenaltyConsumptionTxt.x,this.prisonPunishmentOnlineTxt.y+40);
		// this.addChildToContainer(this.prisonProbabilityTxt);
        this.prisonProbabilityTxt.setPosition(this.prisonPenaltyConsumptionTxt.x,this.prisonPunishmentOnlineTxt.y+40);
		scrollPanel.addChild(this.prisonProbabilityTxt);

        
        //奖励文字 
        this.dropTxt= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
        this.nameArr=[];
        this.dropTxt.width =public_9_probiginnerbg.width-11;
        // this.dropTxt.height =public_9_probiginnerbg.height;
        this.dropTxt.text = this.getItemStr();

		// this.dropTxt.setPosition(this.prisonPenaltyConsumptionTxt.x,this.prisonPunishmentOnlineTxt.y+70);
		// this.addChildToContainer(this.dropTxt);
        this.dropTxt.setPosition(this.prisonPenaltyConsumptionTxt.x,this.prisonPunishmentOnlineTxt.y+70);
		scrollPanel.addChild(this.dropTxt);
        scrollPanel.height = this.dropTxt.y + this.dropTxt.height + 10;

        //创建滚动窗口
        let rect = new egret.Rectangle(0,0,256, 258);
        let scrollView = ComponentManager.getScrollView(scrollPanel,rect);
        scrollView.horizontalScrollPolicy = "off";
        
        //填充scrollview 触发点击
        let touchPanel = BaseBitmap.create("public_9_probiginnerbg");
        touchPanel.alpha = 0;
        touchPanel.width = scrollPanel.width;
        touchPanel.height = scrollPanel.height;
        touchPanel.x = 0;
        touchPanel.y = 0;
        scrollPanel.addChild(touchPanel);

        scrollView.x = 270+GameData.popupviewOffsetX;
        scrollView.y = 45;
        this.addChildToContainer(scrollView);
        // scrollView.setPosition(this.prisonPenaltyConsumptionTxt.x,this.prisonPunishmentOnlineTxt.y+70);

        // this.addChildToContainer(scrollView);
        //添加滚动条
        // let rect = new egret.Rectangle(0,0,256, 258);
        // let scrollView = ComponentManager.getScrollView(this.dropTxt,rect);

        //名字底图
        let nameBottom = BaseLoadBitmap.create("prisonview_namebg"); 
        nameBottom.width =200;
        nameBottom.height =52;
        nameBottom.x=public_9_wifebg.x+10;
        nameBottom.y=260;
        this.addChildToContainer(nameBottom);


        //囚犯名字
        this.prisonNameTex= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
       
        this.prisonNameTex.text = LanguageManager.getlocal("prisonerName"+num);
		this.prisonNameTex.setPosition(nameBottom.width/2+nameBottom.x-this.prisonNameTex.width/2,nameBottom.y+6);
		this.addChildToContainer(this.prisonNameTex);
        
        //囚犯官职
        this.officeTex= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
        this.officeTex.text = LanguageManager.getlocal("prisonerOffice"+num);
		this.officeTex.setPosition(nameBottom.width/2+nameBottom.x- this.officeTex.width/2,nameBottom.y+30);
		this.addChildToContainer(this.officeTex);
    }
    //获取拼接文字
    public getItemStr():string
    {
      
        this.nameArr =[];
        this.itemNameStr ="";
        for(var i:number=0;i<this.PrisonItemCfg.drop.length;i++)
        {
             var rewardVo:RewardItemVo= GameData.getRewardItemVoByIdAndType(this.PrisonItemCfg.drop[i]);
            if(this.nameArr.indexOf(rewardVo.name)==-1)
            {
                this.nameArr.push(rewardVo.name);
            }
        }
        for(var j:number =0;j<this.nameArr.length;j++)
        {
           this.itemNameStr = this.itemNameStr.concat(this.nameArr[j]+".");
        }
        return this.itemNameStr;
    }

     protected getShowHeight():number
	 {
		return 400;
	 }

    public dispose(): void 
    {
        this.prisonPenaltyConsumptionTxt=null;
        this.prisonPunishmentOnlineTxt =null;
        this.dropTxt =null;
        this.nameArr=[];
        this.itemNameStr ="";
        this.PrisonItemCfg =null;
        this.index =0;
        super.dispose();
    }
}