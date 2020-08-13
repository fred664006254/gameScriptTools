/*
    author : shaoliang
    date : 2019.5.22
    desc : 粽叶飘香-端午节活动 
*/
class AcDuanWuPopupViewTab2 extends AcCommonViewTab
{   
    private _scrollList:ScrollList = null; 
    private _timesText:BaseTextField = null;
    private _progress:ProgressBar = null;
    private _topbtn:BaseButton = null;

    public constructor() 
	{
		super();
		this.initView();
	}

    private get cfg() : Config.AcCfg.DuanWuCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDuanWuVo{
        return <AcDuanWuVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    protected initView():void
	{
        let view = this;
		view.height = 620;
		view.width = 545;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYDUANWUSHOP),this.buyCallBack,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETDUANWUSHOPTASK),this.taskCallBack,this);
		
		let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 540;
		Bg.height = 660;
        Bg.x = 20;
        Bg.y = 55;
		view.addChild(Bg);
        
        let topBg:BaseBitmap = BaseBitmap.create(`acduanwu_topbg2_${this.getUiCode()}`);
		topBg.setPosition( Bg.x+5, Bg.y+5);
        topBg.scaleX = 530/topBg.width;
		view.addChild(topBg);
       

		let vo = this.vo;
		let shopArr = vo.getArr("shop"); 
		shopArr = view.updataArr(shopArr);

        let tmpRect =  new egret.Rectangle(0,0,520,view.height-112);
		let scrollList = ComponentManager.getScrollList(AcDuanWuTab4Item,shopArr,tmpRect,[view.code,view.getUiCode()]);
        view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.lefttop, scrollList, view, [30,204]);
		view.addChild(scrollList); 
		scrollList.bounces = false;

        //上面的任务
        
        let bottom2:BaseBitmap = BaseBitmap.create("activity_charge_red");  
        bottom2.setPosition(topBg.x-5, topBg.y);
		this.addChild(bottom2);  

        
        let taskTxt = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnTaksTitleType2",[String(view.cfg.shopTask.value)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        taskTxt.width=bottom2.width;
		taskTxt.x = bottom2.x+20;
		taskTxt.y = bottom2.y+10; 
		this.addChild(taskTxt); 

        let icon: BaseDisplayObjectContainer = GameData.getRewardItemIcons( `1014_0_${view.cfg.shopTask.daGaoGet}_${this.getUiCode()}|`,true)[0];
        icon.setPosition(Bg.x+35,Bg.y+54);
        this.addChild(icon);
        icon.setScale(0.75);

       
        this._timesText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		this._timesText.setPosition(topBg.x+145,topBg.y+60);
		this.addChild(this._timesText); 
        
        this._progress = ComponentManager.getProgressBar("progress5","progress3_bg",246);
        this._progress.setPosition(topBg.x+120,topBg.y+90);
        this.addChild(this._progress); 


        this.updataTask();
       
    }

    private updataTask():void
    {   
        let view = this;
        let times:number = view.cfg.shopTask.times - view.vo.getShopTask();
        this._timesText.text = LanguageManager.getlocal("acDuanWuBuyTaskTimes",[String(times),String(view.cfg.shopTask.times)]);
        let curV:number = view.vo.getShopTaskV() - view.vo.getShopTask()*view.cfg.shopTask.value;
        this._progress.setText(LanguageManager.getlocal("acBattlealivemn",[String(curV),String(view.cfg.shopTask.value)]));
        this._progress.setPercentage(curV / view.cfg.shopTask.value);

        if (this._topbtn)
        {
            this._topbtn.dispose();
            this._topbtn = null;
        }

        let canGetNum:number = Math.floor(view.vo.getShopTaskV()/view.cfg.shopTask.value);
        if (canGetNum > view.vo.getShopTask() ||  view.vo.getShopTask() >= view.cfg.shopTask.times )
        {
            let collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"ac_recharge_Btntxt2",this.eventCollectHandler ,this);        
            collectBtn.x = this._progress.x + this._progress.width + 16;
            collectBtn.y = this._progress.y + this._progress.height - collectBtn.height;
            collectBtn.name = "collectBtn";
            this.addChild(collectBtn);
            this._topbtn = collectBtn;

            if (view.vo.getShopTask() >= view.cfg.shopTask.times)
            {
                this._topbtn.setEnable(false);
                this._timesText.text = LanguageManager.getlocal("acDuanWuBuyTaskTimes2",[String(times),String(view.cfg.shopTask.times)]);
                this._progress.setPercentage(1);
                this._progress.setText(LanguageManager.getlocal("acDuanWuShopTaskMax"));
            }
        }else
        {
            let chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED,"acCarnivalToCostBtnText",this.goRechargeHandler ,this);        
            chargeBtn.x = this._progress.x + this._progress.width + 16;
            chargeBtn.y =  this._progress.y + this._progress.height -chargeBtn.height;
            chargeBtn.name = "costBtn";
            this.addChild(chargeBtn);
            this._topbtn = chargeBtn;
            if(!this.vo.isInActivity()){
                App.DisplayUtil.changeToGray(this._topbtn);
            }
        }
    }

    protected eventCollectHandler(event:egret.TouchEvent) {
        if(this.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }

        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETDUANWUSHOPTASK,{
            activeId:this.acTivityId,
        })
    }

    protected goRechargeHandler(event:egret.Event){
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
    }


    private update() :void{
        this.updateList();
        this.updataTask();
    }


    private updateList() :void{

		if(!this.vo){
			return;
		}
		let shopArr = this.vo.getArr("shop"); 
		shopArr = this.updataArr(shopArr);
		this._scrollList.refreshData(shopArr,[this.code,this.getUiCode()]);
	}

    private updataArr(arr:Array<any>=[]):Array<any>
	{
		let acDuanWuVo = this.vo; 
		if(!acDuanWuVo)
		{
			return;
		}
		let arr1=[];
		let arr2=[];
		let arr3=[];
		
		for(var i:number= 0;i<arr.length; i++)
		{
			let shopNum = acDuanWuVo.getShop(arr[i].id); 
			if(shopNum<arr[i].limit)
            {
                arr2.push(arr[i]);
            }
            else
            {
                arr3.push(arr[i]);
            } 
		}
		return arr2.concat(arr3).concat(arr1); 
	} 

    private buyCallBack(evt : egret.Event):void{
		let view = this;
		let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		let rewards = rData.rewards;
		let cfg = view.cfg.shop[view.vo.lastidx];
        let str = rewards;
		let rewardList =  GameData.formatRewardItem(str);
		let pos = this.vo.lastpos;
		App.CommonUtil.playRewardFlyAction(rewardList,pos);
		this.vo.lastidx = null;
	}

    private taskCallBack(evt : egret.Event):void{
		let view = this;
		let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		let rewards =  `1014_0_${rData.daGaoGet}_${this.getUiCode()}`;
		let cfg = view.cfg.shop[view.vo.lastidx];
        let str = rewards;
		let rewardList =  GameData.formatRewardItem(str);
		let pos = this.vo.lastpos;
		App.CommonUtil.playRewardFlyAction(rewardList,pos);
		this.vo.lastidx = null;
	}

    public dispose():void
	{	
		let view = this;
		this._scrollList =null;
        this._timesText = null;
        this._progress = null;
        this._topbtn = null;

		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYDUANWUSHOP),this.buyCallBack,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETDUANWUSHOPTASK),this.taskCallBack,this);

		super.dispose();
	}
}