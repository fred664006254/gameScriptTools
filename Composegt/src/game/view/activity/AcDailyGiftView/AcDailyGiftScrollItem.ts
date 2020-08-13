/**
 * 小额礼包
 * author jiang
 * date 2018.8.28
 * @class AcDailyGiftScrollItem
 */
class AcDailyGiftScrollItem  extends ScrollListItem
{
    private buyBtn: BaseButton = null;
    private onlyImg: BaseBitmap = null;
    private emptyImg: BaseBitmap = null;
    // private limitCount: number = 0;
    private buyCount: number = 0;
    private curData:any = null;
    private _currId:number=0;
    private isClick:boolean = false;
    private curCode:string = null;
    public constructor()
    {
        super();
    }
    


    protected initItem(index:number,data:any)
    {
   

        this.width = 610;
        this.height = 210;   

        let titleImg = "";
        let titleName = "";
        this.curData = data;
        this.curCode = this.curData.code;
        // this.limitCount = data.cfg.limit;
        // this.limitCount = data.limit;
        switch(index){
            case 0:
                
                titleImg = "acdailygiftview_titlebg1";
                titleName = LanguageManager.getlocal("dailyGiftItemTitle1");
                break;
            case 1:
                
                titleImg = "acdailygiftview_titlebg2";
                titleName = LanguageManager.getlocal("dailyGiftItemTitle2");
                break;
            case 2:
                
                titleImg = "acdailygiftview_titlebg3";
                titleName = LanguageManager.getlocal("dailyGiftItemTitle3");
                break;
        }

        let bg = BaseBitmap.create("activity_db_01");
        bg.width = this.width;
        bg.height = this.height - 10;
        this.addChild(bg);

        let titleBg = BaseBitmap.create(titleImg);
        titleBg.y = 3;
        this.addChild(titleBg);


        let titleText = ComponentManager.getTextField(titleName,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText.x = 30;
        titleText.y = titleBg.y + titleBg.height/2 - titleText.height/2;
        this.addChild(titleText);

        this.onlyImg = BaseBitmap.create("acdailygiftview_onlysell");
        this.onlyImg.x = 480;
        this.onlyImg.y = 60;
        this.addChild(this.onlyImg);


        this.emptyImg = BaseBitmap.create("acdailygiftview_empty");
        this.emptyImg.x = 480;
        this.emptyImg.y = 65;
        this.addChild(this.emptyImg);


        this.buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,null,this.buyBtnHandler,this);
        this.buyBtn.setBtnCdSecond(60);
        // this.buyBtn.setBtnCdCallback(8,this.btnCdCallback,this);
        
        this.buyBtn.x = this.width - 15 - this.buyBtn.width;
        this.buyBtn.y = 110;
        this.addChild(this.buyBtn);

        let cost = data.cfg.cost;
        this.buyBtn.setText(LanguageManager.getlocal("dailyGiftItemBtnText",[cost]),false);
        let reward = "1_1_" +data.cfg.gemCost + "|" + data.cfg.getReward;  
        let rewardArr = GameData.formatRewardItem(reward); 
		let scroStartY = 80;
        let tmpX = 18;
        let rewardBg = BaseBitmap.create("public_9v_bg06");
   

        for (var index = 0; index < rewardArr.length;index ++){
            let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
            iconItem.setScale(0.75);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 7);
            if(tmpX > bg.width - 8){
                tmpX = 18;
                scroStartY += iconItem.height + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width+7);
            }
            this.addChild(iconItem);
        }

        this.refreshBtnStatus();

    }

    private buyBtnHandler(): void{
        //点击购买按钮

        // this._isClick = true;
  
        // PlatformManager.pay(rechargeId); 

        let rechargeId  = this.curData.rechargeId;
        PlatformManager.pay(rechargeId);

        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETACTIVITYMODEL,this.checkCanBuy,this);
        // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETACTIVITYMODEL,{});
    }
    private checkCanBuy(event:egret.Event):void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETACTIVITYMODEL,this.checkCanBuy,this);
        // if(this._isClick){
            let activityInfo = event.data.data.data.activity.info;
            let k = null;
            for(let key in activityInfo){
                if(key.indexOf("dailyGift-"+this.curCode)>-1){
                    k = key;
                    break;
                }
            }
            if(k !=null){
                let info = activityInfo[k];
                let ainfo = info.ainfo;
                if(ainfo[this.curData.rechargeId] != 1) {
                    //可以购买
                    let rechargeId  = this.curData.rechargeId;
                    PlatformManager.pay(rechargeId);
                }
            }
        // }
        // this._isClick = false;
    }

    private btnCdCallback():void{
        //  NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETACTIVITYMODEL,{});
        //  NetManager.request(NetRequestConst.REQUEST_SHOP_GETSHOPCFG,{});
    }
    //刷新按钮状态
    private refreshBtnStatus(): void{
        // this._data.rechargeId;

        if(this.curData.rechargeCount==1){
            this.buyBtn.visible = false;
            this.onlyImg.visible = false;
            this.emptyImg.visible = true;
        } else {


            this.buyBtn.visible = true;
            this.onlyImg.visible = true;
            this.emptyImg.visible = false;
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

        this.buyBtn  = null;
        this.onlyImg = null;
        this.emptyImg = null;
        // this.limitCount = 0;
        this.buyCount = 0;
        this.curData = null;
        this._currId = 0;
        this.curCode = null;
        this.isClick = false;
        super.dispose();
    }
}