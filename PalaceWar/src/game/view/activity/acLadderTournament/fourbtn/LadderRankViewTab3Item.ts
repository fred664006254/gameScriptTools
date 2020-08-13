class LadderRankViewTab3Item  extends ScrollListItem
{
    private _limitTxt : BaseTextField = null;
    private _itemCfg:Config.AcCfg.LTShopCfg = null;
    private _composeBtn:BaseButton;
    private _flag : BaseBitmap = null;
    private vo:AcLadderTournamentVo=null;

    public constructor()
    {
        super();
    }

    protected initItem(index:number,cfg:Config.AcCfg.LTShopCfg,itemparam:any)
    {  
        let view = this;
        view.width = 205;
        this._itemCfg = cfg;
        let itemCfg = cfg;

        this.vo = itemparam;

        let bg:BaseBitmap = BaseBitmap.create("acsingledayitembg");//public_dj_bg01  public_9_probiginnerbg
        bg.setPosition(3,3);
        view.addChild(bg);
        
        let rewardvo = GameData.formatRewardItem(itemCfg.item)[0];
        let nameTxt : BaseTextField = ComponentManager.getTextField(rewardvo.name,TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTxt.setPosition(bg.x+(bg.width-nameTxt.width)/2,bg.y+30); 
        nameTxt.textColor = TextFieldConst.COLOR_BROWN;
        view.addChild(nameTxt);

        let icon:BaseDisplayObjectContainer = GameData.getItemIcon(rewardvo, true);
        icon.setPosition(bg.x+(bg.width-icon.width)/2,bg.y+nameTxt.y+nameTxt.height+5);
        view.addChild(icon);
        view.width=bg.width+this.getSpaceX();
    
        let limitNum = itemCfg.limit - view.vo.getShopNum(itemCfg.id);
        let limitTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal(`acLadder_task_timesdesc`+itemCfg.limitType, [limitNum.toString()]), 18, limitNum > 0 ? 0x3e9b00 : 0xff3c3c);
        limitTxt.width = 170;
        limitTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(limitTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, icon, [0,icon.height + 3]);
        view._limitTxt = limitTxt;


        let rectd = new egret.Rectangle(0,0,40,38);
        let costicon = BaseLoadBitmap.create("ladder_training_small",rectd);
        costicon.setPosition(70,186);
		view.addChild(costicon);

        //原价
        let needNum:string = String(itemCfg.price);
        let originPriceTxt = ComponentManager.getTextField(needNum, 20, TextFieldConst.COLOR_BLACK);
        view.addChild(originPriceTxt);
        originPriceTxt.setPosition(costicon.x+costicon.width,195);


        let composeBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"exchange",this.composeHandler,this);
        composeBtn.setPosition(bg.x+(bg.width-composeBtn.width * composeBtn.scaleX)/2,bg.y+bg.height-composeBtn.height-20);
        view.addChild(composeBtn);
        view._composeBtn = composeBtn;

        let flag = BaseBitmap.create(`battlepasscollect3-1`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, composeBtn);
        view.addChild(flag);
        view._flag = flag;

        composeBtn.visible = limitNum > 0;
        flag.visible = !composeBtn.visible;

        this.tick();
    }

    public refreshItem(rewards? : string):void{
        let view = this;
        let itemCfg = view._itemCfg;
        if(view._limitTxt){
            let limitNum = itemCfg.limit - view.vo.getShopNum(itemCfg.id);
            view._limitTxt.text= LanguageManager.getlocal(`acLadder_task_timesdesc`+itemCfg.limitType, [limitNum.toString()]);
            view._limitTxt.textColor = limitNum > 0 ? 0x3e9b00 : 0xff3c3c;
            view._composeBtn.visible = limitNum > 0;
            view._flag.visible = !view._composeBtn.visible;
        }
        if (rewards)
        {   
            let rewardList =  GameData.formatRewardItem(rewards);
            let pos = view.localToGlobal(view._composeBtn.x + 60, view._composeBtn.y + 10);
            App.CommonUtil.playRewardFlyAction(rewardList, pos);
        }
        this.tick();
    }

    private composeHandler():void{
        let view = this;
        let itemcfg = this._itemCfg;

        if(view.vo.isEnd){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }

        let limitNum = itemcfg.limit - view.vo.getShopNum(itemcfg.id);
        if(limitNum <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acSingleDaybuyTips"));
            return;
        }
        let hasNum:number = Api.laddertournamentVoApi.getShopscore();
        let needNum:string = String(this._itemCfg.price);
        let cost = hasNum - Number(needNum);
        if(cost < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal(`acLadder_Point_less`));
            return;
        }

        view.vo.selIdx = view._index;
        NetManager.request(NetRequestConst.REQUEST_LT_SHOPBUY,{
            activeId : view.vo.aidAndCode, 
            rkey : itemcfg.id, 
        });

    }

    /**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 5;
    }

    public tick():void
    {   
        let view = this;
        let itemCfg = view._itemCfg;
        if(view._limitTxt){

            let limitNum = itemCfg.limit - view.vo.getShopNum(itemCfg.id);
            view._limitTxt.text= LanguageManager.getlocal(`acLadder_task_timesdesc`+itemCfg.limitType, [limitNum.toString()]);
            view._limitTxt.textColor = limitNum > 0 ? 0x3e9b00 : 0xff3c3c;
            view._composeBtn.visible = limitNum > 0;
            view._flag.visible = !view._composeBtn.visible;

            if (limitNum<=0)
            {
                if (itemCfg.limitType == 1)
                {   
                    if (Api.laddertournamentVoApi.isTodayFinalDay() == false)
                    {
                        let lessTime = Api.laddertournamentVoApi.getTodayLessTime();
                        view._limitTxt.text= LanguageManager.getlocal(`acLadder_refresh_time`, [App.DateUtil.getFormatBySecond(lessTime,5)]);
                    }
                }
                else if (itemCfg.limitType == 2)
                {   
                    if (Api.laddertournamentVoApi.getNowturn()<4)
                    {   
                        let lessTime = Api.laddertournamentVoApi.getNowturnLessTime();
                        view._limitTxt.text= LanguageManager.getlocal(`acLadder_refresh_time`, [App.DateUtil.getFormatBySecond(lessTime,5)]);
                    }
                }
            }
        }
    }
        
	public dispose():void{
		this._itemCfg = null;
        this._composeBtn = null;
        this._flag = null;
        this._limitTxt = null;
        this.vo = null;

		super.dispose();
	}
}