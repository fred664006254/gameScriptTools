/**
 * author:qianjun
 * desc:兔宝商铺奖励
*/
class AcBeatXiongNuRewardView extends PopupView{
	public constructor() {
		super();
	}
	
    private get cfg() : Config.AcCfg.BeatXiongNuCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcBeatXiongNuVo{
        return <AcBeatXiongNuVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    protected get uiType():string
	{
		return "2";
	}

    
    private get aid() : string{
        return `${this.param.data.aid}`;
    }

    private get code() : string{
        return `${this.param.data.code}`;
    }

    protected getResourceList():string[]
	{
        let view = this;
        let arr = [];
        return super.getResourceList().concat([
            `progress5`,`progress3`,`progress3_bg`,`ac_skinoflibai_chargeitem_red`,`ac_skinoflibai_chargeitem_green`,`collectflag`,`wife_btnbg`,
            `activity_charge_red`,`shopview_corner`,`shopview_line`,`skin_detail_namebg`,`countrywarrewardview_itembg`,`acthreekingdomrecharge_topbg`
        ]).concat(arr);
    }
	
	protected getTabbarTextArr():Array<string>{
        let code = this.getUiCode();
        return [
			`acRechargeViewTitle`,
            `acLuckyDrawTab1`,
            `motherdaypoolreward-1`,
            `acCommonWifeSkinRewardPopupViewTitle`
		];
    }

    protected getTabbarName():string|string[]
	{	
		return ButtonConst.BTN2_SMALL_TAB;
	}

    
    protected initTabbarGroup():void
	{
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this);
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.container.y = this.getTitleButtomY();
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;
            if (this.uiType == "2")
			{
				this.tabbarGroup.setSpace(0);
				this.tabbarGroup.setColor(0xe1ba86,0x472c26);
            }
            this.container.x = 45;
    
		}
    }

    // protected getContainerY():number{

    // }
    
    protected setTabBarPosition():void
	{
        super.setTabBarPosition();
        // this.tabbarGroup.setScale(0.88);
        this.tabbarGroup.x=63;
        this.tabbarGroup.y-=16;
        // this.tabbarGroup.y;
	}

    protected getTitleStr():string{
        return App.CommonUtil.getCnByCode(`atkracecrossDetailTitle`, this.getUiCode());
    }
    
    protected clickTabbarHandler(data):void{
        let view = this;
        super.clickTabbarHandler(data);
    }

    // protected getRequestData():{requestType:string,requestData:any}
	// {	
	// 	// let view = this;
	// 	// return {requestType:NetRequestConst.REQUEST_ACTIVITY_ARENARANK,requestData:{
	// 	// 	activeId : view.vo.aidAndCode,
	// 	// }};
	// }

	// protected receiveData(data:{ret:boolean,data:any}):void
	// {
	// 	let view = this;
	// 	//view.vo.setRankInfo(data.data.data);
	// }

	protected initView():void{	
        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
        let key = `${AcConst.AID_BEATXIONGNU}-${this.code}report-${Api.playerVoApi.getPlayerID()}-${this.vo.st}-hand`;
        let storage = LocalStorageManager.get(key);
        if(!storage){
            LocalStorageManager.set(key, `1`);
        }
    }
    
    protected getShowWidth():number{
		return 630;
    }

	protected getShowHeight():number{
		return 860;
    }

    public freshView():void{
        let view = this;
        if(view.vo.getpublicRedhot1()){
            view.tabbarGroup.addRedPoint(0);
        }
        else{
            view.tabbarGroup.removeRedPoint(0);
        }

        if(view.vo.getpublicRedhot3()){
            view.tabbarGroup.addRedPoint(1);
        }
        else{
            view.tabbarGroup.removeRedPoint(1);
        }

        // let code = this.getUiCode();
        // for(let i = 1; i <= 4; ++ i){
        //     let haveTxt = <BaseTextField>this.getChildByName(`haveTxt${i}`);
        //     haveTxt.text = `X${this.vo.dayNumById(i)}`;
        // }
    }

    protected resetBgSize():void{
        this.viewBg.width = 630;
        super.resetBgSize();
        // let descbg = BaseBitmap.create(`public_9_bg1`);
		// descbg.width = 540;
		// descbg.height = 50;
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, descbg, this.viewBg, [0,25]);
        // this.addChild(descbg);

        // let code = this.getUiCode();
        // for(let i = 1; i <= 4; ++ i){
        //     let img = BaseLoadBitmap.create(`dechuantype${i}-${code}`);
        //     img.width = 100;
        //     img.height = 100;
        //     img.setScale(0.4);
        //     this.addChild(img);
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, img, descbg, [20 + (i - 1)*135,0]);

        //     let haveTxt = ComponentManager.getTextField(`X${this.vo.dayNumById(i)}`, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        //     this.addChild(haveTxt);
        //     haveTxt.name = `haveTxt${i}`;
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, haveTxt, img, [img.width*img.scaleX+3,0]);
        // }
        this.freshView();
    }

	public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
		super.dispose();
	}
}