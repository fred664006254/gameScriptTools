/**
 * 情系良缘 活动详情
 * date 2020.7.21
 */
class AcGoodMatchDetailPopupView extends PopupView{
    private _isFirst:boolean = false;
    public constructor(){
        super();
    }

    protected setTabBarPosition():void {
        this.tabbarGroup.x = GameConfig.stageWidth/2 - this.tabbarGroup.width/2;
        this.tabbarGroup.y = this.viewBg.y + 70-4-16;
    }

    protected getRequestData():{requestType:string,requestData:any}
	{	
        let view = this;
        if (!view.vo.isStart){
            return null;
        }
		return {requestType:NetRequestConst.REQUEST_ACGOODMATCH_GETSERVERACHDATA, requestData:{
			activeId : view.vo.aidAndCode,
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if (data.ret){

        }
	}

    public initView():void{
        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        
        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }

        if (view.param && view.param.data.isFirst){
            view._isFirst = true;
        }

        this.refreshView();
    }

    public refreshView():void{
        if (!this.vo){
            return;
        }
        if (this.vo.checkAchieveRed()){
            this.tabbarGroup.addRedPoint(0); 
        }
        else{
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.checkServerRewardRed()){
            this.tabbarGroup.addRedPoint(1); 
        }
        else{
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.checkExchangeRed()){
            this.tabbarGroup.addRedPoint(3);
        }
        else{
            this.tabbarGroup.removeRedPoint(3);
        }
    }

    protected closeHandler():void{
        if (this._isFirst){
            this._isFirst = false;
            if (this.vo.getPoolRewardId() == 0 && this.vo.getProcessNum() == 0){
                this.showSelectPoolTip();
            }
            else{
                this.hide();
            }
        }
        else{
            this.hide();
        }
    }

    private showSelectPoolTip():void{
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            msg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acGoodMatchPoolTip1`, this.getTypeCode())),
            touchMaskClose : true,
            title : `itemUseConstPopupViewTitle`,
            callback : ()=>{
                this.hide();
            },
            handle : this,
            needClose : 1,
            needCancel : true,
            confirmTxt : `sysConfirm`,
            cancelcallback : null,
        });
    }

	private get cfg():Config.AcCfg.GoodMatchCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcGoodMatchVo{
        return <AcGoodMatchVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }
    
    protected getTabbarTextArr():Array<string>
	{
		return [
            App.CommonUtil.getCnByCode("acGoodMatchDetailTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acGoodMatchDetailTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acGoodMatchDetailTabName3", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acGoodMatchDetailTabName4", this.getTypeCode()),
		];
    }

    protected getTabbarName():string|string[]
	{	
		return ButtonConst.BTN2_SMALL_TAB;
	}

    protected get uiType():string
	{
		return "2";
	}

     /**标题 */
	protected getTitleStr():string
	{
		return App.CommonUtil.getCnByCode("acGoodMatchDetailPopupTitle", this.getTypeCode());
    }
    
	protected getShowHeight():number
	{
		return 830;
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "skin_detail_namebg", "progress5", "progress3_bg", "progress3", "collectflag", "servant_star", "ackite_skintopbg", "ackite_skintopline",
            "settingview_line", "public_popupscrollitembg", "public_scrolllistbg" ,"ackite_processtitlebg-1",
            "shopview_corner", "acpowerfull_skinexchangebg", "specialview_commoni_namebg", "previewbg_wifeskin", "ac_skinoflibai_chargeitem_green",
            "ac_skinoflibai_chargeitem_red","acgoodmatch_pooltitlebg", "acgoodmatch_topbg", "acgoodmatch_selected",
		]);
	}

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);

        this._isFirst = false;
        super.dispose();
    }
}