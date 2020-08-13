class ComposeNeedLvupView extends PopupView
{
    constructor()
    {
        super();
    }
    protected initView():void
    {
        let txt=BaseBitmap.create("composenlvup_txt");
        txt.setPosition(this.viewBg.x+(this.viewBg.width-txt.width)*0.5+10,this.viewBg.y+60);
        this.addChildToContainer(txt);

        let nextTxt=ComponentManager.getBitmapText(Api.playerVoApi.getPlayerMinLevelStr((Api.playerVoApi.getPlayerMinLevelId()+1)), "office_fnt");
        nextTxt.setPosition(txt.x+220,txt.y+79);
        this.addChildToContainer(nextTxt);

        let playerContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
        this.addChildToContainer(playerContainer);
        
        let player=Api.playerVoApi.getMyPortrait();
        player.anchorOffsetX=player.width/2;
        player.setPosition(this.viewBg.x+180,this.viewBg.y+240);
        player.setScale(0.4);
        playerContainer.addChild(player);

        let arrow=BaseBitmap.create("composeneedlvuparrow");
        arrow.setPosition(this.viewBg.x+(this.viewBg.width-arrow.width)*0.5,320);
        playerContainer.addChild(arrow);

        let nextPlayer=Api.playerVoApi.getMyNextLvPortrait();
        nextPlayer.anchorOffsetX=nextPlayer.width/2;
        nextPlayer.setPosition(this.viewBg.x+450,this.viewBg.y+200);
        nextPlayer.setScale(0.6);
        playerContainer.addChild(nextPlayer);
        let mask=egret.Rectangle.create();
        mask.setTo(0,0,this.viewBg.width,467);
        playerContainer.mask=mask;


        //赚速
		let playerview_newpro2 = BaseBitmap.create("playerview_newpro2");
		playerview_newpro2.x = 140+2;
		playerview_newpro2.y = 475;
		this.addChildToContainer(playerview_newpro2);
	
		let progressBar2 = ComponentManager.getProgressBar("progress_type3_yellow2","progress_type3_bg",287);
		progressBar2.x = playerview_newpro2.x+playerview_newpro2.width+10-2;
		progressBar2.y = playerview_newpro2.y+(playerview_newpro2.height-progressBar2.height)*0.5;
		this.addChildToContainer(progressBar2);

        //政绩
		let playerview_pro7 = BaseBitmap.create("playerview_newpro1");
		playerview_pro7.x = 140;
		playerview_pro7.y = 530;
		this.addChildToContainer(playerview_pro7);

		let progressBar = ComponentManager.getProgressBar("progress_type1_yellow2","progress_type3_bg",287);
		progressBar.x = playerview_pro7.x+playerview_pro7.width+10;
		progressBar.y = playerview_pro7.y+(playerview_pro7.height-progressBar.height)*0.5;
		this.addChildToContainer(progressBar);

		let expTipTxt =  ComponentManager.getTextField("",18,TextFieldConst.COLOR_WHITE);
		let curMinLv = Api.playerVoApi.getPlayerMinLevelId();
		let nextLvCfg =  Config.MinlevelCfg.getCfgByMinLevelId(curMinLv+1);
		if (nextLvCfg)
        {
            progressBar.setPercentage( Api.playerVoApi.getPlayerExp()/ nextLvCfg.exp,LanguageManager.getlocal("playerview_exp") + Api.playerVoApi.getPlayerExp() + " / "+ nextLvCfg.exp);
			progressBar2.setPercentage( Api.mainTaskVoApi.getHistoryMaxLevyRate() / nextLvCfg.needRate,LanguageManager.getlocal("playerview_rate") + App.StringUtil.changeIntToText3(Api.mainTaskVoApi.getHistoryMaxLevyRate())  + " / "+ App.StringUtil.changeIntToText3(nextLvCfg.needRate));

        }
        else
        {
            progressBar.setPercentage(1,LanguageManager.getlocal("promotion_topLevel"));
            progressBar2.setPercentage(1,LanguageManager.getlocal("playerview_maxrate"));

        }

		expTipTxt.x = progressBar.x + progressBar.width/2 - expTipTxt.width/2 ;
        expTipTxt.y = progressBar.y + progressBar.height / 2 -expTipTxt.height/2 ;
        this.addChildToContainer(expTipTxt);

        let needTxt=ComponentManager.getTextField(LanguageManager.getlocal("composeNeedLvupDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
        needTxt.width = 480;
        needTxt.setPosition(95,progressBar.y+progressBar.height+25);
        this.addChildToContainer(needTxt);

        let conBtnKey = "composeGoChallenge";
        if(Api.mainTaskVoApi.getHistoryMaxLevyRate() < nextLvCfg.needRate){
            conBtnKey = "composeGoCompose";
        }
		if (nextLvCfg && Api.playerVoApi.getPlayerExp() >=  nextLvCfg.exp && Api.mainTaskVoApi.getHistoryMaxLevyRate() >= nextLvCfg.needRate){
            conBtnKey = "composeGoUpLv";
        }
        let conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,conBtnKey,()=>{

            if(conBtnKey == "composeGoChallenge"){
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_SHOWUNLOCK);
            }else if(conBtnKey == "composeGoCompose"){
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND);	
            }else{
                PlayerBottomUI.getInstance().show();
            }
            this.hide();
        },this);
		conBtn.x = this.viewBg.x+(this.viewBg.width-conBtn.width)*0.5+10;
		conBtn.y = needTxt.y+needTxt.height;
        this.addChildToContainer(conBtn);
        
        if(MainUI.getInstance().getUnlockIndex()>=9)
        {
            let jumpDailyTaskBtn=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"dailyTaskViewTitle",()=>{
                Api.dailytaskVoApi.go();
                this.hide();
            },this);
            conBtn.x = this.viewBg.x+(this.viewBg.width-conBtn.width)*0.5+10-100;
		    conBtn.y = needTxt.y+needTxt.height;
            jumpDailyTaskBtn.x = this.viewBg.x+(this.viewBg.width-jumpDailyTaskBtn.width)*0.5+10+100;
            jumpDailyTaskBtn.y = needTxt.y+needTxt.height;
            this.addChildToContainer(jumpDailyTaskBtn);
        }
    }

    protected getTitleStr():string
    {
        return null;
    }
    
    protected getCloseBtnName():string
	{
		return "btn_win_closebtn";
    }
    
    protected getBgName():string
	{
		return "composeneedlvupviewbg";
    }
    
    protected resetBgSize():void
	{
        super.resetBgSize();
        this.closeBtn.y = this.viewBg.y+5;
    }

    protected getResourceList():string[]
    {
        let resArr=[
            "composenlvup_txt",
            "composeneedlvuparrow",
            "progress_type3_bg",
            "progress_type1_yellow2",
            "playerview_newpro1",
            "progress_type3_yellow2",
            "playerview_newpro2"
        ];
        return super.getResourceList().concat(resArr);
    }
    public dispose():void
    {
        super.dispose();
    }
}