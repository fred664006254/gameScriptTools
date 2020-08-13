class ComposeNeedLvupNewView extends PopupView
{
    constructor()
    {
        super();
    }
    protected initView():void
    {

        //上方左侧
        let playerContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
        this.addChildToContainer(playerContainer);
        
        let nextPlayer=Api.playerVoApi.getMyNextLvPortrait();
        nextPlayer.anchorOffsetX=nextPlayer.width/2;
        nextPlayer.setPosition(190,220);
        nextPlayer.setScale(0.65);
        playerContainer.addChild(nextPlayer);
        let mask=egret.Rectangle.create();
        mask.setTo(0,0,this.viewBg.width,487);
        playerContainer.mask=mask;

        let nextOfficeBg = BaseBitmap.create("composeneedlvupviewbg_new_tipbg");
        this.addChildToContainer(nextOfficeBg);
        nextOfficeBg.setPosition(70,440);

        let nextOfficeNeedTxt = ComponentManager.getTextField(LanguageManager.getlocal(`composeneedlvup_new_office`),18,TextFieldConst.COLOR_LIGHT_YELLOW);
        nextOfficeNeedTxt.setPosition(nextOfficeBg.x+20,nextOfficeBg.y+12);
        this.addChildToContainer(nextOfficeNeedTxt);

        let nextOfficeTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerMinLevelStr(Api.playerVoApi.getPlayerMinLevelId()+1),24,TextFieldConst.COLOR_QUALITY_YELLOW_NEW);
        nextOfficeTxt.setPosition(nextOfficeBg.x+120,nextOfficeBg.y+9);
        this.addChildToContainer(nextOfficeTxt);

        //上方右侧
        let nextChallengeBg = BaseBitmap.create("composeneedlvupviewbg_new_tipbg");
        this.addChildToContainer(nextChallengeBg);
        nextChallengeBg.setPosition(335,440);

        let nextChallengeNeedTxt = ComponentManager.getTextField(LanguageManager.getlocal(`composeneedlvup_new_challenge`),18,TextFieldConst.COLOR_LIGHT_YELLOW);
        nextChallengeNeedTxt.setPosition(nextChallengeBg.x+20,nextChallengeBg.y+12);
        this.addChildToContainer(nextChallengeNeedTxt);

        let nextAddPersonId = Config.ChallengelvCfg.getNextAddChallengeId(Api.challengeVoApi.getHasPassId());
        let nextChallengeTxt = ComponentManager.getTextField(LanguageManager.getlocal("composeneedlvup_new_challengeTitle",[Api.challengeVoApi.getBigChannelIdByCid2(nextAddPersonId)+'']),24,TextFieldConst.COLOR_QUALITY_YELLOW_NEW);
        nextChallengeTxt.setPosition(nextChallengeBg.x+110,nextChallengeBg.y+9);
        this.addChildToContainer(nextChallengeTxt);

        //下方展示
        let curMinLv = Api.playerVoApi.getPlayerMinLevelId();
        let nextLvCfg =  Config.MinlevelCfg.getCfgByMinLevelId(curMinLv+1);
        let isShowGold = Api.mainTaskVoApi.getHistoryMaxLevyRate() < nextLvCfg.needRate;
        let isShowPromp = Api.playerVoApi.getPlayerExp() < nextLvCfg.exp;
        
        isShowPromp = false;
        isShowGold = false;

        const leftPartCenterX = 193;
        const rightPartCenterX = 458;
        //赚速
        if(isShowGold){
            let needGoldStr = LanguageManager.getlocal(`composeneedlvup_new_needGoldSpeed`,[App.StringUtil.changeIntToText3(nextLvCfg.needRate-Api.mainTaskVoApi.getHistoryMaxLevyRate())]);
            let goldTxt = ComponentManager.getTextField(needGoldStr,18,TextFieldConst.COLOR_BROWN_NEW);
            goldTxt.textAlign = egret.HorizontalAlign.CENTER;
            goldTxt.setPosition(leftPartCenterX-goldTxt.width/2,495);
            this.addChildToContainer(goldTxt);
            
            let conBtnKey = "composeGoCompose";
            let conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,conBtnKey,()=>{
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND);	
                this.hide();
            },this);
            conBtn.setPosition(leftPartCenterX-conBtn.width/2,goldTxt.y+goldTxt.height-3);
            this.addChildToContainer(conBtn);
            if(!isShowPromp){
                goldTxt.y += 44;
                conBtn.y += 44;
            }
        }
        //政绩
        if(isShowPromp){
            let needPrompStr = LanguageManager.getlocal(`composeneedlvup_new_needPromp`,[String(nextLvCfg.exp-Api.playerVoApi.getPlayerExp())]);
            let prompTxt = ComponentManager.getTextField(needPrompStr,18,TextFieldConst.COLOR_BROWN_NEW);
            prompTxt.textAlign = egret.HorizontalAlign.CENTER;
            prompTxt.setPosition(leftPartCenterX-prompTxt.width/2,597);
            this.addChildToContainer(prompTxt);
            
            let conBtnKey = "composeGoChallenge";
            let conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,conBtnKey,()=>{
                 App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_SHOWUNLOCK);
                this.hide();
            },this);
            conBtn.setPosition(leftPartCenterX-conBtn.width/2,prompTxt.y+prompTxt.height-3);
            this.addChildToContainer(conBtn);
            if(!isShowGold){
                prompTxt.y -= 58;
                conBtn.y -= 58;
            }
        }
        //赚速政绩都没有 去升官
        if(!isShowPromp && !isShowGold){
            let canUpStr = LanguageManager.getlocal(`composeneedlvup_new_canLevelUp`);
            let canUpTxt = ComponentManager.getTextField(canUpStr,18,TextFieldConst.COLOR_BROWN_NEW);
            canUpTxt.textAlign = egret.HorizontalAlign.CENTER;
            canUpTxt.setPosition(leftPartCenterX-canUpTxt.width/2,557);
            this.addChildToContainer(canUpTxt);
            let conBtnKey = "composeGoUpLv";
            let conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,conBtnKey,()=>{
                PlayerBottomUI.getInstance().show();
                this.hide();
            },this);
            conBtn.setPosition(leftPartCenterX-conBtn.width/2,canUpTxt.y+canUpTxt.height-3);
            this.addChildToContainer(conBtn);
        }

        //右边去关卡
        let needChallengeStr = LanguageManager.getlocal(`composeneedlvup_new_needChallenge`,[String(nextAddPersonId - Api.challengeVoApi.getHasPassId())]);
        let challengeTxt = ComponentManager.getTextField(needChallengeStr,18,TextFieldConst.COLOR_BROWN_NEW);
        challengeTxt.textAlign = egret.HorizontalAlign.CENTER;
        challengeTxt.setPosition(rightPartCenterX-challengeTxt.width/2,557);
        this.addChildToContainer(challengeTxt);
        
        let rightConBtnKey = "composeGoChallenge";
        let rightConBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,rightConBtnKey,()=>{
            //  App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_SHOWUNLOCK);
            ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
            this.hide();
        },this);
        rightConBtn.setPosition(rightPartCenterX-rightConBtn.width/2,challengeTxt.y+challengeTxt.height-3);
        this.addChildToContainer(rightConBtn);

        
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
		return "composeneedlvupviewbg_new_bg";
    }
    
    protected resetBgSize():void
	{
        super.resetBgSize();
        this.closeBtn.y = this.viewBg.y+5;
    }

    protected getResourceList():string[]
    {
        let resArr=[
            "composeneedlvupviewbg_new_tipbg"
        ];
        return super.getResourceList().concat(resArr);
    }
    public dispose():void
    {
        super.dispose();
    }
}