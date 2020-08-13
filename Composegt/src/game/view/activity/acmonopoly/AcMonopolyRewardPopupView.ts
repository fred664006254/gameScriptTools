/**
 * author yanyuling 
 */
class AcMonopolyRewardPopupView  extends PopupView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    public constructor() 
	{
		super();
	}
      protected get acVo():AcMonopolyVo
	{
		return <AcMonopolyVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid,this.param.data.code);
	}
	public initView():void
	{	
        // {turn:this.acVo.theturn,aid:this.aid,code:this.code}
        let cfg = <Config.AcCfg.MonopolyCfg>this.acVo.config;
        let turn = this.param.data.turn;
        let turnReward = cfg.turnReward ;

        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);

        let topBg = BaseBitmap.create("monopoly_bg5");
        topBg.x =  GameConfig.stageWidth/2 - topBg.width/2;
        topBg.y = GameConfig.stageHeigth/2 - topBg.height/2 -80;
        this._nodeContainer.addChild(topBg)

        let toptxt = BaseBitmap.create("monopoly_txt2");
        toptxt.x =  GameConfig.stageWidth/2 - toptxt.width/2;
        toptxt.y = topBg.y +65;
        this._nodeContainer.addChild(toptxt);

        let topBg2 = BaseBitmap.create("monopoly_bg6");
        topBg2.width = 320;
        topBg2.height = 90;
        topBg2.x =  GameConfig.stageWidth/2 - topBg2.width/2;
        topBg2.y = toptxt.y + toptxt.height+5 ;
        this._nodeContainer.addChild(topBg2)
        // 
        let lockTxt = "acMonopoly_reward_tip1"
        let tipTxt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        
        let rewardVo = GameData.formatRewardItem(this.param.data.rewards)[0];
        tipTxt1.text = LanguageManager.getlocal(lockTxt,[""+rewardVo.num]);
        tipTxt1.multiline = true;
        tipTxt1.lineSpacing = 3;
        tipTxt1.width = topBg2.width - 40;
        // topBg2.height = tipTxt1.height +  40;
        tipTxt1.x = topBg2.x + topBg2.width/2 - tipTxt1.width/2;
        tipTxt1.y =topBg2.y + topBg2.height/2 - tipTxt1.height/2;
        this._nodeContainer.addChild(tipTxt1);
        
        if( turnReward[turn-1]){
            let rewardstr = turnReward[turn-1].getReward;
            let topBg3:BaseBitmap = BaseBitmap.create("monopoly_bg7");
            topBg3.x = GameConfig.stageWidth/2 - topBg3.width/2;
            topBg3.y = topBg2.y + topBg2.height + 10 ;
            this._nodeContainer.addChild(topBg3);

            let tipTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
            tipTxt2.text = LanguageManager.getlocal( "acMonopoly_reward_tip2" );
            tipTxt2.x = topBg3.x + topBg3.width/2 - tipTxt2.width/2;
            tipTxt2.y = topBg3.y + topBg3.height/2 - tipTxt2.height/2;
            this._nodeContainer.addChild(tipTxt2);

            let iconItem = GameData.getRewardItemIcons(rewardstr)[0];
            iconItem.x =  GameConfig.stageWidth/2 - iconItem.width/2;
            iconItem.y = topBg.y +310;
            this._nodeContainer.addChild(iconItem);
        }
        
        let goBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sysConfirm",this.hide,this);
		goBtn.x = GameConfig.stageWidth/2 - goBtn.width/2;
		goBtn.y = topBg.y + topBg.height - 25;
		this._nodeContainer.addChild(goBtn);

        let closebtn = ComponentManager.getButton("load_closebtn","",this.hide,this);
		closebtn.x = toptxt.x + toptxt.width + 50;
		closebtn.y = toptxt.y + 25;
		this._nodeContainer.addChild(closebtn);

        this._nodeContainer.anchorOffsetX = this._nodeContainer.width/2;
        this._nodeContainer.anchorOffsetY = this._nodeContainer.height/2;
        this._nodeContainer.x = this._nodeContainer.width/2;
        this._nodeContainer.y = this._nodeContainer.height/2;
        this._nodeContainer.setScale(0.7);
        egret.Tween.get(this._nodeContainer,{loop:false}).to({scaleX:1.0,scaleY:1.0},100);
    }

    public hide()
    {
        let  callback:Function = this.param.data.callback;
        if(callback)
        {
            callback.apply( this.param.data.tarobj);
        }
        super.hide();
    }
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "monopoly_bg5","monopoly_bg7","monopoly_bg6",
            "monopoly_txt2",
		]);
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
    protected getTitleStr():string
	{
		return  "";
	}
	public dispose():void
	{
        this._nodeContainer = null
        super.dispose();
    }
}