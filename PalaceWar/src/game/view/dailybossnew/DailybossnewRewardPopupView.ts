class DailybossnewRewardPopupView extends PopupView 
{
    private _rewardBtn:BaseButton = null;

	public constructor() {
		super();
	}

    public initView(): void 
    {   
        let tiptext = ComponentManager.getTextField(LanguageManager.getlocal("dailybossnewRewardTip"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_RED2);
        tiptext.width = 520;
        tiptext.setPosition(this.viewBg.width/2-tiptext.width/2,12);
        tiptext.textAlign = egret.HorizontalAlign.CENTER;
        this.addChildToContainer(tiptext);

        let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 595;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, tiptext.y+tiptext.height+10);
		this.addChildToContainer(bg);

        var newarr = Config.DailybossnewCfg.boss2; 
        let allkeys = Object.keys(newarr);
        let cfgArray:Config.DailybossnewShopItemCfg[] = [];
        for (let i = 0; i<allkeys.length ; i++)
        {
            cfgArray.push(newarr[allkeys[i]]);
        }

		let rect = new egret.Rectangle(0, 0, 510, 585);
		let scrollList = ComponentManager.getScrollList(DailybossnewRewardItem, cfgArray, rect,);
		scrollList.setPosition(bg.x + 5, bg.y + 5);
		scrollList.bounces = false;
		this.addChildToContainer(scrollList);
        
        let bg3= BaseBitmap.create("public_9_bg1");
		bg3.width = bg.width;
		bg3.height = 90;
		bg3.setPosition(bg.x,bg.y + bg.height + 15);
		this.addChildToContainer(bg3);


        let rankV = "10000+";
        let addV = 0;
        if(this.param.data.myrank && this.param.data.myrank.myrank)
        {
            rankV = String(this.param.data.myrank.myrank);
            addV = this.param.data.myrank.value;
        }

        let myRankTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossnewRankDesc1",[String(addV)]),
        TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTxt.x = bg3.x+25;
        myRankTxt.y = bg3.y+16;
        this.addChildToContainer(myRankTxt);

        let addvalueTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossnewRankDesc2",[rankV]),
        TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        addvalueTxt.x = myRankTxt.x;
        addvalueTxt.y = myRankTxt.y+38;
        this.addChildToContainer(addvalueTxt);


        if (Api.dailybossnewVoApi.getRewardFlag() == 0)
        {
            let noawardText = ComponentManager.getTextField(LanguageManager.getlocal("dailybossnewNoAward"),
            TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
            noawardText.width = 140;
            noawardText.x = bg3.x+bg3.width -noawardText.width - 20;
            noawardText.textAlign = egret.HorizontalAlign.CENTER;
            noawardText.y = bg3.y+bg3.height/2 - noawardText.height/2;
            this.addChildToContainer(noawardText);
        }
        else
        {
            this._rewardBtn=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"dailybossnewReward",this.rewardHandle,this);
            this._rewardBtn.setPosition(bg3.x+bg3.width -this._rewardBtn.width - 26,bg3.y+bg3.height/2 - this._rewardBtn.height/2);
            this.addChildToContainer(this._rewardBtn);

            this.resetBtn();
        }

        
    }

    private resetBtn():void
    {   
        let f = Api.dailybossnewVoApi.getRewardFlag();
        if (f == 1)
        {
            App.CommonUtil.addIconToBDOC(this._rewardBtn);
        }
        else if (f == 2)
        {
            App.CommonUtil.removeIconFromBDOC(this._rewardBtn);
            this._rewardBtn.setEnable(false);
            this._rewardBtn.setText("candyGetAlready");
        }
        else
        {
            this._rewardBtn.visible = false;
        }
    }

    private rewardHandle():void
    {
        this.request(NetRequestConst.REQUEST_NEWBOSS_GETREWARD,{});
    }

    protected receiveData(data:{ret:boolean,data:any})
	{   

        this.resetBtn();
        if (data.data.data.rewards)
        {
            let rewards = data.data.data.rewards;
            let score =  data.data.data.score;
            let awardstr = rewards;
            if (score)
            {
                awardstr = `1022_0_${score}|`+rewards;
            }
             
			let rewardVo = GameData.formatRewardItem(awardstr);
			App.CommonUtil.playRewardFlyAction(rewardVo);
        }
	}

    protected getTitleStr():string
    {
        return "acPunishRankRewardPopupViewTitle";
    }

    protected getBgExtraHeight():number
	{
		return 10;
	}

    public dispose():void
	{
        this._rewardBtn = null;

		super.dispose();
	}
}