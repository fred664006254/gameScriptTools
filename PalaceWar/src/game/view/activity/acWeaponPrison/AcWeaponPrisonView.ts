/**
 * 神器地牢
 * author zsl
 * date 2020.8.11
 * @class AcWeaponPrisonView
 */

class AcWeaponPrisonView extends AcCommonView
{
    private _rechargeTip:BaseTextField = null;
    private _detailBtn:BaseButton = null;
    private _timeBg:BaseBitmap = null;
    private _timeTxt:BaseTextField = null;
    private _gameNode:BaseDisplayObjectContainer = null;
    private _rewardNodeTab:WeaponPrisonRewardNode[] = [];
    private _isPlaying:boolean = false;
    private _playTimesText : BaseTextField = null;

    public constructor(){
        super();
    }

    protected getBgName():string{
        return App.CommonUtil.getResByCode("weaponprison_bg", this.getUiCode());
    }

    protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        return App.CommonUtil.getResByCode("weaponprison_title", this.getUiCode());
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getRuleInfo():string{
        return App.CommonUtil.getCnByCode("acWeaponPrisonRuleInfo",this.getUiCode());
    }

    protected getProbablyInfo():string{
        return App.CommonUtil.getCnByCode("acWeaponPrisonProbablyInfo",this.getUiCode());
    }

    protected getRuleBtnName():string{
        return ButtonConst.BTN2_RULE;
    }

    protected getResourceList():string[]{
        return super.getResourceList().concat([
            "acnightsky_infobg-1",
            App.CommonUtil.getResByCode("weaponprison_bottom",this.getUiCode()),

            "weaponprisoncode1", "weaponprisoncode"+this.getUiCode(),
            "acthreekingofwife_infobg-1", "luckydrawrewardword-2", "servantweapontxt", "acwealthcarpview_skineffect", "acheroine_free", "public_9_powertipbg2", "acrecovery_boxlight", "acweaponmazeboxopenlighteff", "acweaponmazebox2openeff", "acweaponmazebox1openeff", "acweaponmazeboxyanwueff"
        ]);
    }

    protected getUiCode():string{
        let code = "";
        switch(Number(this.code)){
            case 2:
                code = "1";
                break;
            case 4:
                code = "3";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    private get vo():AcWeaponPrisonVo{
        return <AcWeaponPrisonVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.WeaponPrisonCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }


    protected initBg():void
    {
        this.viewBg = BaseBitmap.create(this.getBgName());
		this.addChild(this.viewBg);
        this.viewBg.y = (GameConfig.stageHeigth-1136)/2.03
    }

    public initView():void
    {
        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);

        let infoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnightsky_infobg", this.getUiCode()));
        infoBg.setPosition(GameConfig.stageWidth/2 - infoBg.width/2, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(infoBg);

        //活动时间   
        let dateText = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        dateText.x = infoBg.x + 170;
        dateText.y = this.titleBg.y + this.titleBg.height + 3;
        this.addChildToContainer(dateText);

        //活动文本
        let descTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponPrisonDesc", this.getUiCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = 470;
        descTxt.lineSpacing = 5;
        descTxt.x = dateText.x;
        descTxt.y = dateText.y + dateText.height + 10;
        this.addChildToContainer(descTxt);

        let rechargeTip = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponPrisonRechargeInfo", this.getUiCode()), [""+this.vo.getNextTimeNeedRecharge()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rechargeTip.setPosition(descTxt.x, infoBg.y + infoBg.height - rechargeTip.height - 15);
        this.addChildToContainer(rechargeTip);
        this._rechargeTip = rechargeTip;

         //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height / 2;
        this.addChildToContainer(this._timeBg);
        this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 40 + this._timeTxt.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 10;
        this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
        this.addChildToContainer(this._timeTxt);
        
        //预览
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
		skinTxtEffect.setPosition(infoBg.x - 15, infoBg.y + infoBg.height - skinTxtEffect.height / 2 - 30);
		this.addChildToContainer(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);

        let skinTxt = BaseBitmap.create("servantweapontxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect,[0, 0]);
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxt1 = BaseBitmap.create("servantweapontxt");
		skinTxt1.anchorOffsetX = skinTxt1.width / 2;
		skinTxt1.anchorOffsetY = skinTxt1.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
		this.addChildToContainer(skinTxt1);
		skinTxt1.blendMode = egret.BlendMode.ADD;
		skinTxt1.alpha = 0;
        egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);

        let skinAlpha = BaseBitmap.create(`public_alphabg`);
        skinAlpha.width = 160;
        skinAlpha.height = 70;
        skinAlpha.setPosition(skinTxt.x - skinAlpha.width/2, skinTxt.y - 40);
        this.addChildToContainer(skinAlpha);

        skinAlpha.addTouchTap(() => {
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONPRISONPOPUPVIEWTAB4, {aid: this.aid, code: this.code, uicode:this.getUiCode()});
        }, this);

        this._gameNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._gameNode);

        //详情按钮
        let detailBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("weaponprison_detail", this.getUiCode()), "", ()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONPRISONPOPUPVIEW, {aid: this.aid, code: this.code, uicode:this.getUiCode()});
        }, this,null,1);
        detailBtn.setPosition(12, infoBg.y+infoBg.height+20);
        this.addChildToContainer(detailBtn);
        this._detailBtn = detailBtn;

        let code = this.getUiCode();
        let playstr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponPrisonTimes",code),[String(this.vo.ainfo.v)]);
        let playtimeText = ComponentManager.getTextField(playstr, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        playtimeText.width = 120;
        playtimeText.lineSpacing = 3;
        playtimeText.textAlign = egret.HorizontalAlign.CENTER;
        playtimeText.setPosition(detailBtn.width/2 - playtimeText.width/2-2,52);
        detailBtn.addChild(playtimeText);
        this._playTimesText = playtimeText;

         //成就奖励
         let scrollContiner = new BaseDisplayObjectContainer()
         let rect:egret.Rectangle = egret.Rectangle.create();
         rect.setTo(0,0,530,120);
 
         let scrollView = ComponentManager.getScrollView(scrollContiner,rect);
         this.addChildToContainer(scrollView);
         scrollView.setPosition(GameConfig.stageWidth-rect.width,infoBg.y+infoBg.height+40);
         scrollView.verticalScrollPolicy = "off";
         let cfgs = this.cfg.achievementOne;
         
         for (let i=0; i<cfgs.length; i++)
         {
             let oneNode = new WeaponPrisonRewardNode();
             oneNode.init(cfgs[i],code,this.rewardHandle,this);
             oneNode.setPosition(i*92+5,0);
             scrollContiner.addChild(oneNode);
             oneNode.setShowType(this.vo.getAchievementType(i+1));
             this._rewardNodeTab.push(oneNode);
         }
         scrollContiner.width+=10;
         scrollView.setScrollLeft(scrollContiner.width-rect.width);
         egret.Tween.get(scrollView).wait(1).call(()=>{
             scrollView.setScrollLeft(0, 1000);
         });


         
    }

    private rewardHandle(id : number):void
    {   
        if (this._isPlaying)
        {
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONPRISONPOPUPVIEWTAB2,{
            aid:this.aid, 
            code:this.code,
            uicode:this.getUiCode(),
            id:id,
        });
        
    }


    private freshView():void
    {
        if (this.vo.isCangetAchieveReward() || this.vo.isCanGetRankReward())
        {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            let reddot = this._detailBtn.getChildByName("reddot");
            reddot.x = 51;
            reddot.y =  10;
        }
        else
        {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
        for (let i=0; i<this._rewardNodeTab.length; i++)
        {
            let oneNode = this._rewardNodeTab[i];
            oneNode.setShowType(this.vo.getAchievementType(i+1));
        }
        this._rechargeTip.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponPrisonRechargeInfo", this.getUiCode()), [""+this.vo.getNextTimeNeedRecharge()]);
        this._playTimesText.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponPrisonTimes",this.getUiCode()),[String(this.vo.ainfo[0].v)]);

    }

    public tick():void{
        this._timeTxt.text = LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]);
		this._timeBg.width = 40 + this._timeTxt.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 10;
		this._timeTxt.x = this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2;

        // if (App.DateUtil.checkIsToday(this._oneTime) == false)
        // {   
        //     this.showLoadingMask();
        //     this.vo.rtype = 0;
        //     this.vo.isfree = 1;
        //     this.refreshView();
        //     this.request(NetRequestConst.REQUEST_ACTIVITY_GETMODEL,{});
        //     this._oneTime = GameData.serverTime;
        // }
    }


    public dispose():void
    {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
        this._rechargeTip = null;
        this._detailBtn = null;
        this._timeBg = null;
        this._timeTxt = null;
        this._gameNode = null;
        this._rewardNodeTab.length = 0;
        this._isPlaying = false;
        this._playTimesText = null;

        super.dispose();
    }
}