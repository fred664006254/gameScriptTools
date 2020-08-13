/**
 * 小额礼包
 * author jiang
 * date 2018.8.28
 * @class AcDailyGiftScrollItem
 */
class AcDailyGiftScrollItem  extends ScrollListItem
{
    private buyBtn: BaseButton = null;
    private limitCount: number = 0;
    private buyCount: number = 0;
    private _data:any = null;
    public constructor()
    {
        super();
    }
    
    protected initItem(index:number,data:any,code:any)
    {
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYGIFT_REFRESHVO,this.refreshBtnStatus,this); 

        this.width = 608;
        this.height = 171;   

        this._data = data;
        this.limitCount = data.limit ? data.limit : 1;
        let titleImg = App.CommonUtil.getResByCode(`acdailygiftview_titlebg${index+1}`,code);

        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = this.width;
        bg.height = this.height;
        this.addChild(bg);

        let titleBg = BaseBitmap.create(titleImg);
        titleBg.y = 6;
        titleBg.x = 3;
        this.addChild(titleBg);

        let innerBg = BaseBitmap.create("public_9_managebg");
		innerBg.width = 455;
		innerBg.height = 100;
		innerBg.x = bg.x +10;
        innerBg.y = titleBg.y + titleBg.height + 5;
        this.addChild(innerBg);

        let rechargeCount = 0;
        if(this._data.rechargeCount){
            rechargeCount = this._data.rechargeCount;
        }
        let buynum = Math.max(0,this.limitCount - rechargeCount);

        let limitTxt = ComponentManager.getTextField(LanguageManager.getlocal(buynum == 0 ? `acDailyActivity_buyTips` : `acDailyActivity_buyTimes`, [`${buynum}/${this.limitCount}`]), 22, 0x3e1f0f)
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, limitTxt, bg, [20,20]);
        this.addChild(limitTxt);

        let acdailygift_costbg = BaseBitmap.create("acdailygift_costbg");
		acdailygift_costbg.x = this.width - acdailygift_costbg.width - 20;
        acdailygift_costbg.y = bg.y + 60;
        this.addChild(acdailygift_costbg);

        let acdailygift_costflag = BaseBitmap.create("acdailygift_costflag");
		acdailygift_costflag.x = acdailygift_costbg.x + 53;
        acdailygift_costflag.y = acdailygift_costbg.y + 3;
        this.addChild(acdailygift_costflag);
        
        let cost = data.cfg ? data.cfg.cost : 0;
        let costTxt = ComponentManager.getBitmapText(""+cost,"tip_fnt");
        costTxt.setScale(0.75);
        costTxt.name = "lvTxt";
        costTxt.x = acdailygift_costflag.x + acdailygift_costflag.width+1;
        costTxt.y = acdailygift_costflag.y +3;
        this.addChild(costTxt);

        if(PlatformManager.checkIsEnLang())
        {
            let offestWidth = (acdailygift_costbg.width -  acdailygift_costflag.width - costTxt.width * 0.75) / 2;
            acdailygift_costflag.x = acdailygift_costbg.x + offestWidth;
            costTxt.x = acdailygift_costflag.x + acdailygift_costflag.width;
            
        }
        if(PlatformManager.checkIsThSp())
        {
            acdailygift_costflag.setVisible(false);
            costTxt.y = acdailygift_costflag.y + 6;
            costTxt.x = acdailygift_costflag.x + acdailygift_costflag.width+5;
        }

        this.buyBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"acPunishBuyItemBuy",this.buyBtnHandler,this);
        this.buyBtn.setBtnCdSecond(30);
        this.buyBtn.x = 464;
        this.buyBtn.y = 100;
        this.addChild(this.buyBtn);

        let reward = "1_1_" +(data.cfg ? data.cfg.gemCost : 0) + "|" +(data.cfg ? data.cfg.getReward : '');    
        let rewardArr = GameData.formatRewardItem(reward); 
		let scroStartY = innerBg.y + 10;
        let tmpX = innerBg.x + 10;
   
        // for (var index = 0; index < rewardArr.length;index ++){
        //     let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
        //     iconItem.setScale(0.75);
        //     iconItem.x = tmpX;
        //     iconItem.y = scroStartY;
        //     tmpX += (iconItem.width * iconItem.scaleX + 7);
        //     if(tmpX > bg.width - 8){
        //         tmpX = 18;
        //         scroStartY += iconItem.height + 10;
        //         iconItem.x = tmpX;
        //         iconItem.y = scroStartY;
        //         tmpX += (iconItem.width+7);
        //     }
        //     this.addChild(iconItem);
        // }
        let scale = 0.75;
        let iconItemHeight:number = 0;
        for (let i = 0; i < rewardArr.length; i++) {
            let iconItem = GameData.getItemIcon(rewardArr[i], true, true);
            iconItem.setScale(scale);
            iconItem.setPosition(innerBg.x + 7 + ((iconItem.width * scale + 9) * (i % 5)), innerBg.y + 7 + ((iconItem.height * scale + 12) * Math.floor(i / 5)))
            this.addChild(iconItem);

            iconItemHeight = iconItem.height * scale;
        }

        if ((rewardArr.length / 5) > 1) {
            let addLineNumber: number = 0;
            if (rewardArr.length % 5 == 0) {
                addLineNumber = (rewardArr.length - 5) / 5;
            }
            else {
                addLineNumber = Math.floor((rewardArr.length - 5) / 5) + 1;
            }
            let offestValue = addLineNumber * iconItemHeight;
            this.height += offestValue;
            bg.height = this.height;
            innerBg.height += offestValue;
            acdailygift_costbg.y += offestValue;
            acdailygift_costflag.y += offestValue;
            costTxt.y += offestValue;
            this.buyBtn.y += offestValue;
        }

        this.refreshBtnStatus();
    }

    private buyBtnHandler(): void{
        if (Number(this._data.code) > 4) {
            let vo = <AcDailyGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this._data.aid, this._data.code);
            if (vo.checkAcEnd()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
        }
        let rechargeCount = 0;
        if(this._data.rechargeCount){
            rechargeCount = this._data.rechargeCount;
        }
        let buynum = Math.max(0,this.limitCount - rechargeCount);
        if(buynum <= 0){
            return;
        }
        if (GameData.idcardSwitch==true && GameData.idcardNormal==1 && Api.gameinfoVoApi.getRealnameRewards()==null)
		{	
			ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW);
            return;
		}
        //点击购买按钮
        let rechargeId  = this._data.rechargeId;
        PlatformManager.checkPay(rechargeId); 
    }

    //刷新按钮状态
    private refreshBtnStatus(): void{
        let rechargeCount = 0;
        if(this._data.rechargeCount){
            rechargeCount = this._data.rechargeCount;
        }
        let buynum = Math.max(0,this.limitCount - rechargeCount);
        if(buynum <= 0){
             this.buyBtn.setText("atkrace_buy_already");
            //   App.DisplayUtil.changeToGray(this.buyBtn);
            this.buyBtn.setEnable(false);
        } else {
             this.buyBtn.setText("acPunishBuyItemBuy");
            //  App.DisplayUtil.changeToNormal(this.buyBtn);
             this.buyBtn.setEnable(true);
        }
    }

    public getSpaceX():number
	{
		return 5;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 5;
	}
    public dispose():void
    {
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DAILYGIFT_REFRESHVO,this.refreshBtnStatus,this); 

        this.buyBtn  = null;
        this.limitCount = 0;
        this.buyCount = 0;
        this._data = null;

        super.dispose();
    }
}