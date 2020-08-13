//
class AcCrossServerHegemonyRewardViewTab2 extends CommonViewTab
{
    private _listBtn:BaseButton = null;
	
	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}


	
	private get cfg() : Config.AcCfg.CrossServerHegemonyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerHegemonyVo{
        return <AcCrossServerHegemonyVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected getListType():number
	{
		return 1;
	}

	protected initView():void
	{
        let detailBg = BaseBitmap.create("arena_bottom");
        detailBg.width = 620;
        detailBg.height = 115;
        detailBg.x = GameConfig.stageWidth/2 - detailBg.width/2;
        detailBg.y = GameConfig.stageHeigth - 89 - 60 - detailBg.height - 10;
        this.addChild(detailBg);

        let tip:BaseTextField = null;
        if(this.vo.isCanJoin()){
            tip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRewardCanJoinTip1"),22,TextFieldConst.COLOR_WARN_GREEN);
           
        } else {
            if (this.vo.isHasAlliance()){
                tip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRewardCanJoinTip2"),22,0xbe4545);
            }
            else{
                tip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRewardCanJoinTip3"),22,0xbe4545);
            }
        }
        tip.textAlign = egret.HorizontalAlign.CENTER;
        tip.lineSpacing = 3;
        tip.x = detailBg.x + 150 - tip.width/2;
        tip.y = detailBg.y + detailBg.height/2 - tip.height/2;
        this.addChild(tip);

        let listBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW,"acCrossServerHegemonyRewardListBtn1",this.listBtnClick,this,null,null,null,TextFieldConst.COLOR_BLACK);
        listBtn.x = detailBg.x + detailBg.width - listBtn.width - 10;
        listBtn.y = detailBg.y + detailBg.height/2 - listBtn.height/2;
        this.addChild(listBtn);
        this._listBtn = listBtn;
        if (this._listBtn){
            if (this.vo.getEndTimeByMatchId(29, 0) <= GameData.serverTime){
                this._listBtn.setGray(false);
            }
            else{
                this._listBtn.setGray(true);
            }
        }

        let list = this.cfg.getFinalRewardList();
        let rect = new egret.Rectangle(0, 0, 610, GameConfig.stageHeigth - 89 - 60 - 60 - detailBg.height + 35 - 84);
        let scrollList = ComponentManager.getScrollList(AcCrossServerHegemonyRewardScrollItem2,list,rect);
        scrollList.x = GameConfig.stageWidth/2 - scrollList.width/2;//bottomBg.x;
        scrollList.y = 10;
        this.addChild(scrollList);

        //tip
        let tipBg = BaseBitmap.create("public_9_bg98");
        tipBg.width = GameConfig.stageWidth - 20;
        tipBg.setPosition(GameConfig.stageWidth/2 - tipBg.width/2, detailBg.y - tipBg.height);
        this.addChild(tipBg);

        let rewardTip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRewardTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        rewardTip.width = tipBg.width - 60;
        rewardTip.lineSpacing = 5;
        rewardTip.setPosition(tipBg.x + tipBg.width/2 - rewardTip.width/2, tipBg.y + tipBg.height/2 - rewardTip.height/2);
        this.addChild(rewardTip);
	}

    private listBtnClick():void
    {
        if (!this.vo.isInActivity()){
            this.vo.showAcEndTip();
            return;
        }
        if (this.vo.getEndTimeByMatchId(29, 0) > GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyRewardTTNotInRank"));
            return ;
        }
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYRANKLISTPOPUPVIEW,{
			aid : this.param.data.aid,
			code : this.param.data.code,
			type: 1
		});
    }

	public tick():void{	
        if (this._listBtn){
            if (this.vo.getEndTimeByMatchId(29, 0) <= GameData.serverTime){
                this._listBtn.setGray(false);
            }
            else{
                this._listBtn.setGray(true);
            }
        }
	}


	public dispose():void
	{
        this._listBtn = null;
		super.dispose();
	}

}