/*
    author : shaoliang
    date : 2019.10.23
    desc : 天下至尊-每日任务
*/

class LadderTaskView extends CommonView
{
    private _countDownTime: BaseTextField = null;
    private _countDownTimeBg: BaseBitmap = null;

    public constructor(){
        super();
    }
    private get cfg() : Config.AcCfg.LadderTournamentCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLadderTournamentVo{
        return <AcLadderTournamentVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    private get aid() : string{
        return `${this.param.data.aid}`;
    }

    private get code() : string{
        return `${this.param.data.code}`;
    }

    protected getTitleBgName():string
	{
		return "ladderview_title";
	}

    protected getTitleStr():string
	{
		return null;
    }

    protected getResourceList():string[]{
        
        return super.getResourceList().concat([
           "ladder_task_topbg","servant_bottombg","progress7_bg","progress7"
        ]);
    }

    protected getTabbarTextArr():Array<string>{
        return [
			"acCharge_tab1",
            "acLadder_task_tab2",
            "acLadder_task_tab3",
            "acLadder_task_tab4",
		];
    }

    public initView()
    {   
        this.titleBgShadow.visible = false;
        let view = this;   
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETASK),this.rewardCallBack,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE,this.hide,this);

        let vo = this.vo;
        let acDescBg = BaseBitmap.create("ladder_task_topbg");
		acDescBg.width = 640;
		acDescBg.height = 225;
		acDescBg.setPosition(0, -62);
        this.addChildToContainer(acDescBg);

        let acTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acLadderTournamentView_acTime", [vo.acTimeAndHour]), 18, TextFieldConst.COLOR_WHITE);
		acTimeDesc.setPosition(220, acDescBg.y + 52);
		this.addChildToContainer(acTimeDesc);

		let descTF = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_task_desc"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
		descTF.width = 406;
		descTF.lineSpacing = 3;
		descTF.setPosition(acTimeDesc.x-2, acTimeDesc.y + acTimeDesc.height + 7);
        this.addChildToContainer(descTF);
        
        this._countDownTimeBg = BaseBitmap.create("public_9_bg61");
		this._countDownTimeBg.y = acDescBg.y + acDescBg.height - this._countDownTimeBg.height-5;
		this.addChildToContainer(this._countDownTimeBg);

		this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyView_acCountTime-" + this.code, [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
		this._countDownTimeBg.width = 60 + this._countDownTime.width;
		this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
		this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
        this.addChildToContainer(this._countDownTime);
        this.tick();

        let midtop = BaseBitmap.create(`servant_bottombg`);
        midtop.width = 660;
        midtop.height = GameConfig.stageHeigth - 310;
        midtop.setPosition(-10,acDescBg.y+acDescBg.height-3);
        this.container.addChildAt(midtop,0);

        view.tabbarGroup.y =307;

        this.freshView();
    }

    private rewardCallBack(evt : egret.Event):void{
		let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if ( evt.data.ret)
        {
            let rewardList =  GameData.formatRewardItem(Api.laddertournamentVoApi.taskReward);
		    App.CommonUtil.playRewardFlyAction(rewardList);
        }
		
	}

     public tick() {
		let vo = this.vo;
		if (vo.checkIsInEndShowTime()) {
			this._countDownTime.text = LanguageManager.getlocal("acPunishEnd");
		}
		else {
            let today0 = App.DateUtil.getWeeTs(GameData.serverTime);
		    let et = today0 + 24 * 3600;
            let time= et -GameData.serverTime;
			this._countDownTime.text = LanguageManager.getlocal("acLadder_today_time", [App.DateUtil.getFormatBySecond((time),1)]);
		}
		this._countDownTimeBg.width = 60 + this._countDownTime.width;
		this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
		this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);

	}

    public freshView():void{

        for(let i = 1; i <= 4; ++ i){
            if (this.vo.getpublicRedDot(i))
            {
                this.tabbarGroup.addRedPoint(i-1);
            }
            else
            {
                this.tabbarGroup.removeRedPoint(i-1);
            }
		}
    }


    public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETASK),this.rewardCallBack,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE,this.hide,this);
        
		super.dispose();
	}

}