/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 端午活动 累计充值itemrender
 */
class PlayerReturnViewTab3ScrollItem  extends ScrollListItem
{
    //item数据
    private _itemData = undefined;
    //进度条
    private _progress:ProgressBar;
    private _lqBtn : BaseButton = null;
	private _lqImg : BaseBitmap = null;
	private _goBtn : BaseButton = null; 

    //序号
    private _curIdx:number=0;
    private _rechargeItem = null;
    
    public constructor()
    {
        super();
    }

	private get cfg(){
        return Config.PlayerreturnCfg;
    }

    private get api(){
        return Api.playerReturnVoApi;
    }
    
    private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
       // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBRECHARGE),this.eventCollectHandlerCallBack,this);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.refreshBtnStatus,this);
		view.width = 608;
		view.height = 188 + 10;
		this._itemData = data.key - 1;
        this._curIdx = index;
        this._rechargeItem = data;
		// let objList = view.api.getArr(`recharge`);
        // this._rechargeItem = view.cfg.recharge[this._itemData]//cfgObj.getChargeRewardById(this._itemData);
        //创建ui
        //背景图片
        let wordsBg : BaseBitmap = BaseBitmap.create("public_9_bg14");  
		wordsBg.width  = view.width;
		wordsBg.height = view.height - 10; 
		view.setLayoutPosition(LayoutConst.horizontalCentertop, wordsBg, view);
		view.addChild(wordsBg); 

		let topbg : BaseBitmap = BaseBitmap.create("acmidautumnview_titlebg");  
		view.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, wordsBg, [0,5]);
		view.addChild(topbg); 

		let line : BaseBitmap = BaseBitmap.create("public_line3");  
		line.width = 466;
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, topbg);
		view.addChild(line); 
				
		let datTxt = ComponentManager.getTextField(LanguageManager.getlocal("acMayDayTotal_recharge",[String(view._rechargeItem.needGem)]),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, datTxt, line);
		view.addChild(datTxt); 

       //创建奖励列表
		let rewardArr : Array<RewardItemVo> = GameData.formatRewardItem(`${data.getReward}`);
		let scroStartY = 45;
		let tmpX = 15;
		for (var index = 0; index < rewardArr.length; index++) {
			let iconItem = GameData.getItemIcon(rewardArr[index],true,false);
			iconItem.setScale(0.9);
			iconItem.x = tmpX;
			iconItem.y = scroStartY;
			tmpX += (iconItem.width * iconItem.scaleX + 10);
			if (tmpX > (15 + 4 * 108 * iconItem.scaleX + 4 * 10))
			{
				tmpX = 15;
				scroStartY += iconItem.height * iconItem.scaleY + 10;
				iconItem.x = tmpX;
				iconItem.y = scroStartY;
				tmpX += (iconItem.width * iconItem.scaleX + 10);
			}
			view.addChild(iconItem);
		}
		scroStartY += (108 * 0.9);
        wordsBg.height = scroStartY + 45;
        view.height = wordsBg.height;
        
        //进度条
        view._progress = ComponentManager.getProgressBar("progress3","progress3_bg",570);
        view.addChild(this._progress);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._progress, wordsBg, [0,10]);

        //领取
		let lqBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'taskCollect', view.eventCollectHandler, view);
		view.setLayoutPosition(LayoutConst.rightverticalCenter, lqBtn, wordsBg, [7, 0]);
		view.addChild(lqBtn);
		view._lqBtn = lqBtn;

		let lqimg = BaseBitmap.create(`signin_had_get`);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lqimg, lqBtn);
		view.addChild(lqimg);
		view._lqImg = lqimg;

		//前往
		view._goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"acRechargeBoxPopupViewGoRecharge",view.goRechargeHandler,view);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._goBtn, lqBtn);
		view._goBtn.visible =false;
		view.addChild(view._goBtn);
        view.refreshBtnStatus();
        if(!view.api.isInActTime()){
            lqBtn.setEnable(false);
			view._goBtn.setEnable(false);
		}
    }

    //刷新按钮状态
    protected refreshBtnStatus()
    {
        let view = this;
        let tmpVo = view.api;
		if(!tmpVo){
			return;
		}	
        let chargeTotal : number = tmpVo.getChargeNum();
        view._progress.setText(LanguageManager.getlocal("acCarnivalProgressText",[String(chargeTotal),this._rechargeItem.needGem]));
        view._progress.setPercentage(chargeTotal / view._rechargeItem.needGem);

        if(chargeTotal >= view._rechargeItem.needGem){	
            view._lqImg.visible = view.api.isGetRecharge(view._rechargeItem.key);
            view._goBtn.visible = false;
            view._lqBtn.visible = !view._lqImg.visible;
        }
        else{	
            view._lqImg.visible =  view._lqBtn.visible = false;
            view._goBtn.visible = true;
            view._lqBtn.setGray(true);
        }	
    }

    // protected eventCollectHandlerCallBack(event:egret.Event)
    // {
    //     let rData = event.data.data.data;
    //     if(!rData){
    //         App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
    //         return;
    //     }
    //     if(PlayerReturnViewTab3ScrollItem._lastReqIdx != this._curIdx)
    //     {
    //         return;
    //     }
    //     PlayerReturnViewTab3ScrollItem._lastReqIdx = null;
    //     this.refreshUI();
    //     let rewards = rData.rewards
    //     let rewardList =  GameData.formatRewardItem(rewards);
    //     let pos = PlayerReturnViewTab3ScrollItem._lastPos;
    //     App.CommonUtil.playRewardFlyAction(rewardList,pos);
    // }

    protected eventCollectHandler(event:egret.TouchEvent)
    {
        let view = this;
        if(view.api.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        view.api.setClickIdx(view._curIdx);
        NetManager.request(NetRequestConst.REBACK_GETRECHARGEREWARD,{
            "keyid" : view._rechargeItem.key
        });
        // PlayerReturnViewTab3ScrollItem._lastReqIdx = this._curIdx;
        // PlayerReturnViewTab3ScrollItem._lastPos = this._collectBtn.localToGlobal(this._collectBtn.width/2 + 50,20);
       // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DBRECHARGE,{activeId:this.acTivityId,rechargeId:this._itemData + 1})
    }
    
    protected goRechargeHandler(event:egret.Event)
    {
        let view = this;
        if(view.api.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }

    public getSpaceX():number
    {
        return 10;
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
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBRECHARGE),this.eventCollectHandlerCallBack,this);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.refreshBtnStatus,this);
        let view = this;
        view._itemData = null;
        view._progress = null;
        view._curIdx = 0;
        view._rechargeItem = null;
        view._lqBtn = null;
		view._lqImg = null;
		view._goBtn = null; 
        // this._lastReqIdx = null;
        super.dispose();
    }
}