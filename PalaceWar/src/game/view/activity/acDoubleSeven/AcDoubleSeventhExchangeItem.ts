class AcDoubleSeventhExchangeItem extends ScrollListItem
{
    private _limitTxt : BaseTextField = null;
    private _itemCfg:any = null;
    private _composeBtn:BaseButton;
    private _flag : BaseBitmap = null;
    private _code = '';
    private _aid:string = null;
    public constructor() 
    {
        super();
    }

    private get cfg() : Config.AcCfg.DoubleSeventhCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
    }

    private get vo() : AcDoubleSeventhVo{
        return <AcDoubleSeventhVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
	}
	
	private get acTivityId() : string{
        return `${this._aid}-${this._code}`;
	}

    private get requestStr():string
    {
        return NetRequestConst.REQUST_ACTIVITY_GETDOUBLESEVENTHEXCHANGE;
    }

    protected initItem(index:number, data:any, item):void{
        let view = this;
        view.width = 205;
        view._code = item.code;
        this._aid = item.aid;
        let itemCfg = data;
        view._itemCfg = itemCfg;

        let bg:BaseBitmap = BaseBitmap.create("scene_exchange_itembg");//public_dj_bg01  public_9_probiginnerbg
        bg.setPosition(3,3);
        view.addChild(bg);
        
        let rewardvo = GameData.formatRewardItem(itemCfg.getReward)[0];
        let nameTxt : BaseTextField = ComponentManager.getTextField(rewardvo.name,TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTxt.setPosition(bg.x+(bg.width-nameTxt.width)/2,bg.y+30); 
        nameTxt.textColor = TextFieldConst.COLOR_BROWN;
        view.addChild(nameTxt);

        let icon:BaseDisplayObjectContainer = GameData.getItemIcon(rewardvo, true);
        icon.setPosition(bg.x+(bg.width-icon.width)/2,bg.y+nameTxt.y+nameTxt.height+5);
        view.addChild(icon);
        view.width=bg.width+this.getSpaceX();
    
        let limitNum = itemCfg.limit - view.vo.getShopNum(itemCfg.id);
        let limitTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal(`acBattlePassShopEchange-1`, [limitNum.toString()]), 18, limitNum > 0 ? 0x3e9b00 : 0xff3c3c);
        view.addChild(limitTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, icon, [0,icon.height + 3]);
        view._limitTxt = limitTxt;


        let rectd = new egret.Rectangle(0,0,38,38);
        let costicon = BaseLoadBitmap.create("itemicon"+this.cfg.getExchangeNeedItemId(),rectd);
        costicon.setPosition(70,186);
		view.addChild(costicon);

        //原价
        let needparts:string =  itemCfg.needPart;
        let needNum:string = needparts.split("_")[2];
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

        view._composeBtn.setEnable(limitNum > 0);
        flag.visible = !composeBtn.visible;
    }

    public refreshItem(rewards : string):void{
        let view = this;
        let code = view._code;
        let itemCfg = view._itemCfg;
        if(view._limitTxt){
            let limitNum = itemCfg.limit - view.vo.getShopNum(itemCfg.id);
            view._limitTxt.text= LanguageManager.getlocal(`acBattlePassShopEchange-1`, [limitNum.toString()]);
            view._limitTxt.textColor = limitNum > 0 ? 0x3e9b00 : 0xff3c3c;
            view._composeBtn.setEnable(limitNum > 0);
            view._flag.visible = !view._composeBtn.visible;
        }
        let rewardList =  GameData.formatRewardItem(rewards);
        let pos = view.localToGlobal(view._composeBtn.x + 60, view._composeBtn.y + 10);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
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
        let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(this.cfg.getExchangeNeedItemId());
        let needparts:string =  this._itemCfg.needPart;
        let needNum:string = needparts.split("_")[2];
        let cost = hasNum - Number(needNum);
        if(cost < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal(`itemNumNotEnough`));
            return;
        }
        view.vo.selIdx = view._index;
        NetManager.request(this.requestStr,{
            activeId : view.acTivityId, 
            isscene : 0,
            rkey : itemcfg.id, 
        });

    }
    
    /**
	 * 不同格子X间距
	 */
	public getSpaceX():number
	{
		return 0;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 5;
    }
    
	public dispose():void{
		this._itemCfg = null;
        this._composeBtn = null;
        this._flag = null;
        this._limitTxt = null;
        this._aid = null;
		super.dispose();
	}
}