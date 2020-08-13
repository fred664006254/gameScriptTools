/**
 * author jiangliuyang
 */
class QQVipGiftPopupView  extends PopupView
{

	public initView():void
	{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETWBQQREWARD,this.reward,this);
        // let _acvo:AcSeasideGameVo =  <AcSeasideGameVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        // let config = _acvo.config;

        let bg1= BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height = 270;
        bg1.x =42;
        bg1.y =10;//70;
        this.addChildToContainer(bg1);

        let bg2= BaseBitmap.create("public_tc_bg03");
        bg2.width = bg1.width - 20;
        bg2.height = bg1.height - 130;
        bg2.x =bg1.x + 10;
        bg2.y =bg1.y + 115;
        this.addChildToContainer(bg2);
        // let boxcfg = config.drawNum[this.param.data.boxid-1];
        let getReward = Config.GameprojectCfg.rewardwbqq; //boxcfg.getReward;

        
        let descTxt = ComponentManager.getTextField(LanguageManager.getlocal("qqVipGiftPopupViewDesc"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.x = bg1.x + bg1.width/2 - descTxt.width/2;
        descTxt.y = bg1.y + 25;
        descTxt.textAlign = egret.HorizontalAlign.CENTER;
        descTxt.lineSpacing = 10;
        this.addChildToContainer(descTxt);



		let rewardIcons = GameData.getRewardItemIcons(getReward,true);
        //bg2.y + 25;
        let iconScale = 0.8;
        let starY = bg2.y + bg2.height/2 - 106 * iconScale / 2;
        let space = 10;
        let startX = bg2.x + bg2.width/2 - (rewardIcons.length * 106 * iconScale + (rewardIcons.length-1) * space)/2;
        for (var index = 0; index < rewardIcons.length; index++) {
            var element = rewardIcons[index];
            element.setScale(0.7);
            element.x = startX + index * (106 * iconScale + space);
            element.y = starY;

            this.addChildToContainer(element);
        }
        
        let button = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sysConfirm",this.btnClick,this);
        button.x = bg1.x + bg1.width/2 - button.width/2;
        button.y = bg1.y + bg1.height + 10;
        this.addChildToContainer(button);
        //  bg1.height = bg2.height + 80
    }

    private btnClick()
    {
        NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETWBQQREWARD,{});
    }
    private reward(event:egret.Event){
        if(event)
		{
			if(event.data&&event.data.ret)
			{
				// let cmd =  event.data.data.cmd;
				
				let data = event.data.data.data;
				let rewards = data.rewards;
				let rList = GameData.formatRewardItem(rewards);
				App.CommonUtil.playRewardFlyAction(rList);
                this.hide();
				// Api.servantVoApi.checkServantChangeRewards( data.cfrewards, data.rewards);
				
				// SoundManager.playEffect(SoundConst.EFFECT_SHOWTIP);
                // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                //     "rewards":data.rewards,
                //     "otherRewards":null,
                //     "isPlayAni":true, 
                //     showTip:null,
                //     callback:null,
                //     target:this
                // });
			}
		}
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}

    public dispose()
    {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETWBQQREWARD,this.reward,this);
        super.dispose()
    }
}