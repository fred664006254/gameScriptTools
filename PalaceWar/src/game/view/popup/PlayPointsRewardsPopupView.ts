/**
 * google play points 充值奖励面板
 * author shaoliang
 * date 2017/6/8
 * @class PlayPointsRewardsPopupView
 * 参数 ：rechangeId
 */

class PlayPointsRewardsPopupView extends PopupView
{
    public constructor() 
	{
		super();
	}

    public initView():void
    {
        let rechangeId:string = this.param.data.rechangeId;
        let cfg = Config.RechargeCfg.getRechargeItemCfgByKey(rechangeId);

        let messageStr = LanguageManager.getlocal("googlePlayPointsRewards",[cfg.name,String(cfg.getVipExp)]);

        let msgTF:BaseTextField = ComponentManager.getTextField(messageStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		msgTF.width = 480;
		msgTF.setColor(TextFieldConst.COLOR_BLACK);
		msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
		msgTF.x = this.viewBg.x + this.viewBg.width/2 - msgTF.width/2;
		msgTF.lineSpacing = 5;
		msgTF.y = 30;
		this.addChildToContainer(msgTF);

        let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 130;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = msgTF.y+msgTF.height+20;
		this.addChildToContainer(bg);

        let rewardsIcon = GameData.getRewardItemIcons(cfg.getReward,true);
        for (let i = 0; i<rewardsIcon.length; i++)
        {
            let oneIcon = rewardsIcon[i];
            oneIcon.setScale(0.9);
            oneIcon.setPosition( this.viewBg.x + this.viewBg.width/2 - (rewardsIcon.length*100-10)/2 + i*100 -4 ,bg.y+17);
            this.addChildToContainer(oneIcon);
        }

        let conBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"confirmBtn",this.hide,this);
		conBtn.setColor(TextFieldConst.COLOR_BLACK);
		conBtn.x = this.viewBg.x + this.viewBg.width/2 - conBtn.width/2;
		conBtn.y = bg.y + bg.height + 20;
		this.addChildToContainer(conBtn);
    }

    protected getTitleStr(){    
        return "itemUseConstPopupViewTitle";
    }

    protected getCloseBtnName():string
	{
		return null;
	}

    protected getBgExtraHeight():number
	{
		return 20;
	}

}

