/**
 * 朝廷诏令
 * date 2020.3.24
 * author ycg
 * @class AcChaoTingView
 */
class AcChaoTingView extends AcCommonView{
    private _acTimeTf:BaseTextField = null;
    private _tabShowHeight:number = 0;
    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);

        this.container.y = 0;
        let infoBgStr = ResourceManager.hasRes("acchaoting_topbg-"+this.getTypeCode()) ? "acchaoting_topbg-"+this.getTypeCode() : "acchaoting_topbg-1";
        let infoBg = BaseBitmap.create(infoBgStr);
        infoBg.setPosition(this.titleBg.x + this.titleBg.width/2 - infoBg.width/2, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(infoBg);

        this.tabbarGroup.setSpace(0);
		this.setTabBarPosition();
		this.tabbarGroup.y = infoBg.y + infoBg.height - 7;
		if(this.tabbarGroupBg){
			this.tabbarGroupBg.x = GameConfig.stageWidth/2 - this.tabbarGroupBg.width/2;
			this.tabbarGroupBg.y = infoBg.y + infoBg.height;
        }

        this.setBigFameY(0);
        this.setBigFameCorner(1);
        this._tabShowHeight = GameConfig.stageHeigth - infoBg.y - infoBg.height - this.tabbarGroupBg.height - 5;

        let decsBgImg = ResourceManager.hasRes("acchaoting_infobg-"+this.getTypeCode()) ? "acchaoting_infobg-"+this.getTypeCode() : "acchaoting_infobg-1";
        let descBg = BaseBitmap.create(decsBgImg);
        descBg.setPosition(GameConfig.stageWidth - descBg.width, infoBg.y + 5);
        this.addChildToContainer(descBg);

        //活动时间
        let acDate = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDate.setPosition(descBg.x + 25, descBg.y + 30);
        this.addChild(acDate);
        //倒计时
        this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._acTimeTf.setPosition(acDate.x, acDate.y + acDate.height + 5);
        this.addChildToContainer(this._acTimeTf);
        //活动说明
        let acDescStr = LanguageManager.getlocal("acChaotingInfo-"+this.getTypeCode(), [""+this.cfg.cost, ""+this.cfg.number]);
        let acDesc = ComponentManager.getTextField(acDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.setPosition(acDate.x , this._acTimeTf.y + this._acTimeTf.height + 6);
        acDesc.width = 300;
        acDesc.lineSpacing = 5;
        this.addChildToContainer(acDesc);

        //排行榜按钮
        let rankBtnImg = ResourceManager.hasRes("acchaoting_rankbtn-"+this.getTypeCode()) ? "acchaoting_rankbtn-"+this.getTypeCode() : "acchaoting_rankbtn-1";
        let rankBtn = ComponentManager.getButton(rankBtnImg, "", ()=>{
            // if (this.vo.getToolNum() >= this.cfg.number){
            //     //打开
            // }
            ViewController.getInstance().openView(ViewConst.POPUP.ACCHAOTINGRANKLISTPOPUPVIEW, {aid: this.aid, code:this.code});
        }, this);
        rankBtn.setPosition(infoBg.x + infoBg.width - rankBtn.width - 20, infoBg.y + infoBg.height - rankBtn.height - 5);
        this.addChildToContainer(rankBtn);

        //诏令
        let toolFlagImg = ResourceManager.hasRes("acchaoting_toolicon-"+this.getTypeCode()) ? "acchaoting_toolicon-"+this.getTypeCode() : "acchaoting_toolicon-1";
        let toolFlag = BaseBitmap.create(toolFlagImg);
        toolFlag.setPosition(infoBg.x + 60, infoBg.y + 50);
        this.addChildToContainer(toolFlag);

        let toolFlagEff = ComponentManager.getCustomMovieClip("acchaoting_dragoneff", 12, 70);
        toolFlagEff.width = 235;
        toolFlagEff.height = 212;
        toolFlagEff.setPosition(toolFlag.x + toolFlag.width/2 - toolFlagEff.width/2, toolFlag.y + toolFlag.height/2 - toolFlagEff.height/2 - 10);
        this.addChildToContainer(toolFlagEff);
        toolFlagEff.playWithTime(0);
        toolFlagEff.blendMode = egret.BlendMode.ADD;

        let infoTxtImg = ResourceManager.hasRes("acchaoting_infotxt-"+this.getTypeCode()) ? "acchaoting_infotxt-"+this.getTypeCode() : "acchaoting_infotxt-1";
        let infoTxt = BaseBitmap.create(infoTxtImg);
        infoTxt.setPosition(infoBg.x + 5, infoBg.y + infoBg.height - infoTxt.height);
        this.addChildToContainer(infoTxt);

        this.refreshView();
    }

    public getListShowHeight():number{
        return this._tabShowHeight;
    }

    public tick():void{
        this._acTimeTf.text = LanguageManager.getlocal("acChaotingTimeCountDown", [this.vo.getCountDown()]);
    }

    public refreshView():void{
        if (this.vo.checkRechargeRedDot()){
            this.tabbarGroup.addRedPoint(1);
        }
        else{
            this.tabbarGroup.removeRedPoint(1);
        }

        if (this.vo.checkTaskRedDot() || this.vo.checkUnlockRed()){
            this.tabbarGroup.addRedPoint(2);
        }
        else{
            this.tabbarGroup.removeRedPoint(2);
        }
    }

    protected getTabbarGroupY():number
	{
		return 425;
	}

    protected getTabbarTextArr():string[]{
        let code = this.getTypeCode();
        return [
            "acChaotingTabName1-"+code,
            "acChaotingTabName2-"+code,
            "acChaotingTabName3-"+code,
        ]
    }

    protected get uiType():string
	{
		return "2";
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }
    
    protected getTitleBgName():string{
        return ResourceManager.hasRes("acchaoting_titlebg-"+this.code) ? "acchaoting_titlebg-"+this.code : "acchaoting_titlebg-1";
    }

    protected getTitleStr():string{
        return "";
    }

    protected getCloseBtnName():string{
        return "acchaoting_closebtn";
    }

    protected addTabbarGroupBg():boolean{
        return true;
    }

    protected getRuleInfo():string{
        return "acChaotingRuleInfo-"+this.getTypeCode();
    }

    protected getReportTipData(): { title: { key: string, param?: string[] }, msg: { key: string, param?: string[] } } {
        return { title: { key: `acChaotingReportTitle-${this.getTypeCode()}` }, msg: { key: `acChaotingReportMsg-${this.getTypeCode()}` } };
    }

    private getTypeCode():string{
        return this.code;
    }

    private get vo():AcChaoTingVo{
        return <AcChaoTingVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.ChaoTingCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        if (this.getTypeCode() != "1"){
            list = [
                "acchaoting_topbg-1","acchaotingcode1", "acchaoting_titlebg-1"
            ];
        }
        return super.getResourceList().concat([
            "progress7", "progress7_bg","accourtduty_txtbg","guide_hand","public_textbrownbg","progress5", "progress3_bg",
            "acchaoting_closebtn", 
            "acchaoting_titlebg-"+this.getTypeCode(), 
            "acchaoting_topbg-"+this.getTypeCode(),
            "acchaotingcode"+this.getTypeCode(),
           

        ]).concat(list);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);

        this._acTimeTf = null;
        super.dispose();
    }
}