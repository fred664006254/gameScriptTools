//任务
class AcCrossServerPowerCheerViewTab3 extends CommonViewTab
{
	private _scrollList:ScrollList = null;
	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
    }
    
    protected getUiCode():string{
        let code = "";
        switch(Number(this.code)){
            default:
                code = this.code;
                break;
        }
        return code;        
    }
	
    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
    }

    private get vo() : AcCrossServerPowerVo{
        return <AcCrossServerPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }	
	private get cfg() : Config.AcCfg.CrossServerPowerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

	protected initView():void
	{
        let baseView = <AcCrossServerPowerCheerView>ViewController.getInstance().getView("AcCrossServerPowerCheerView");
        this.height = baseView.tabHeight;
        this.width = GameConfig.stageWidth;

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETTASKREWARD,this.getRewardCallback,this);

		let tmpRect =  new egret.Rectangle(0, 0, 620, this.height - 20);
		let dataList = this.vo.getSortTaskCfg();
		let scrollList = ComponentManager.getScrollList(AcCrossServerPowerCheerViewScrollItem3, dataList, tmpRect, {aid:this.aid, code:this.code});
		scrollList.x = GameConfig.stageWidth/2 - scrollList.width/2;
		scrollList.y = 10;
		this.addChild(scrollList);
		this._scrollList = scrollList;

		let maskContainer = new BaseDisplayObjectContainer();
		maskContainer.width = this.width;
		maskContainer.height = this.height;
		this.addChild(maskContainer);
		maskContainer.touchEnabled = true;

		let blackBg = BaseBitmap.create("public_9_viewmask");
		blackBg.width = maskContainer.width;
		blackBg.height = maskContainer.height;
		maskContainer.addChild(blackBg);

		let lockImg = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_tasklock", this.getUiCode()));
		maskContainer.addChild(lockImg);

		let tipbg = BaseLoadBitmap.create(`countrywarrewardview_itembg`);
		tipbg.width = 560;
        tipbg.height = 85;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipbg, blackBg,[0,145], true);
		maskContainer.addChild(tipbg);

		let lv = LanguageManager.getlocal("officialTitle"+this.cfg.needLv);
		let lockTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acCrossserverPower_taskNeedTip`, this.getUiCode()), [lv]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
		lockTxt.lineSpacing = 6;
		lockTxt.textAlign = egret.HorizontalAlign.CENTER;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lockTxt, tipbg);
		maskContainer.addChild(lockTxt);
		scrollList.setShowArrow(false);
		let playerLv = Api.playerVoApi.getPlayerLevel();
		if (playerLv >= this.cfg.needLv){
			maskContainer.visible = false;
			scrollList.setShowArrow(true);
		}
	}
	
	public refreshView():void{
		let dataList = this.vo.getSortTaskCfg();
		this._scrollList.refreshData(dataList, {aid: this.aid, code: this.code});
	}
    
	public getRewardCallback(event:egret.Event):void{
		if(event.data && event.data.ret){
			let data = event.data.data.data;
			let rewards = data.rewards;
			if (data.specialGift) {
				if (data.rewards){
					rewards = "1054_0_" + data.specialGift + "_" + this.getUiCode() + "|" + data.rewards;
				}
				else{
					rewards = "1054_0_" + data.specialGift + "_" + this.getUiCode();
				}
			}
			let rList = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rList);
		}
	}
	
	public dispose():void
	{
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETTASKREWARD,this.getRewardCallback,this);
		this._scrollList = null;

		super.dispose();
	}

}