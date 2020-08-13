class AcSingleDayBuild1View  extends CommonView
{
    public constructor(){
		super();
    }

    protected getBgName():string{
        return `acsingleday_bg${this.getUiCode()}`;
    }

    protected getUiCode():string{
        let code = this.param.data.code;
        if (code == "3"){
            return "2";
        }
        return code;
    }

    protected initBg():void{
        let bgName:string=this.getBgName();
		if(bgName){
			this.viewBg = BaseBitmap.create(bgName);
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
			this.addChild(this.viewBg);
			this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.y = GameConfig.stageHeigth - 1136;
		}
	}
	public initView():void{
        // NetManager.request(NetRequestConst.REQUEST_ITEM_GETMODEL,{});
        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.update,this);

        // let tarGroupBg:BaseBitmap = BaseBitmap.create('dragonboattarbg');
        // tarGroupBg.width = view.width;
        // tarGroupBg.height = GameConfig.stageHeigth - view.tabbarGroup.y + 15;
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, tarGroupBg, view, [0, view.titleBg.height - 10]);
        // view.addChild(tarGroupBg);
        // view.swapChildren(view.tabbarGroup, tarGroupBg);
        let topBg = BaseLoadBitmap.create("acmidautumnview_topbg")
		topBg.height = 70;
		topBg.width = 640;
		topBg.setPosition(0,- this.getTabbarGroupY() - this.getContainerY() - 60 - 5+14);
        this.addChildToContainer(topBg);

        view.tabbarGroup.y+=2;
        //红点
        view.update();
        view.initBottom();

        // let npc = BaseLoadBitmap.create('wife_full_101');
        // npc.width = 640;
        // npc.height = 840;
        // npc.setScale(0.4);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, npc, view, [0,0]);
        // view.addChildToContainer(npc);
        // view._npc = npc;
    }

    protected clickTabbarHandler(data : any):void{
        let view = this;
        let viewBg : any = view.viewBg;
        
        viewBg.setRes(data.index == 0 ? `acsingleday_bg${this.getUiCode}` : `public_9_bg40`);
        super.clickTabbarHandler(data);
    }

    private get cfg() : Config.AcCfg.SingleDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcSingleDayVo{
        return <AcSingleDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.param.data.code}`;
	}
    
	// protected getRequestData():{requestType:string,requestData:any}
	// {
	// 	return {requestType:NetRequestConst.REQUEST_ITEM_GETMODEL,requestData:{}};
	// }
	// protected getRuleInfo():string
	// {
	// 	return "itemRuleInfo";
    // }
    protected getTitleStr():string{
        return `buildtxt1_${this.getUiCode()}`
    }

    protected getRuleInfo():string{
		return "acSingleDayRuleInfo-" + this.getUiCode();
    } 

    protected getRuleInfoParam():string[]{
        let vo = this.vo;
        let cfg = this.cfg;
        return [
            (cfg.startTime / 3600).toString(),
            ((cfg.startTime + cfg.luckyPacketCD) / 3600).toString(),
            String(cfg.luckyPacketPurchase / 3600),
            cfg.couponLimit.toString()
        ];
    } 


	protected getResourceList():string[]
	{
        let list:string[] = [];
        if (this.getUiCode() == "2"){
            list = [
                "acsingleday_tokenicon-"+this.getUiCode(),
            ]
        }
		return super.getResourceList().concat([
            "common_shopmark","rechargevie_db_01","itemview_daoju_bg01","itemview_daoju_bg02","itemview_daoju_bg03","itembg_0","progress7","progress7_bg","signin_had_get","progress7_2",
            "acsingleday_cdbg","acsingleday_couponIcon","acsingleday_cd_num1","acsingleday_cd_num2","acsingleday_cd_num3","acsingledayredpt","dragonboattarbg",
            "tailor_get_light","acmidautumnview_topbg","acsingledayline","acsearchproofview_common_skintxt"
		]).concat(list);
    }
    
    private update(): void{
        //第一页 红点
        let vo = this.vo;
        let view = this;
        if(!vo)
        {
            return;
        }	
        //红点
        for(let i = 1; i < 4; ++ i){
            if(vo[`getpublicRedhot${i}`]()){
                this.tabbarGroup.addRedPoint(i - 1);
            }
            else{
                this.tabbarGroup.removeRedPoint(i - 1);
            }
        }  
   } 

    public tick():void{
        let view = this;
        view.update();
    }

    private _bottom : AcSingleDayBottomNode = null;
	//创建底部通用切换按钮，由 initBottom，bottomBtnHandler 两个接口一起完成
    private initBottom()
    {
        let btNode = new AcSingleDayBottomNode({selectIdx:1,switchCallback:this.bottomBtnHandler,callbackOgj:this});
        btNode.y = -this.container.y;
        this.addChildToContainer(btNode);
        this._bottom = btNode;
    }

	private bottomBtnHandler(index:number)
	{
	   if(index == 1){
		   return;
	   }else if(index == 2){
			ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYSKINVIEW,{
			   code: this.param.data.code,
			   aid: this.param.data.aid
		   });
	   }else if(index == 3){
		   ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYBUILD3VIEW,{
			   code : this.param.data.code,
			   aid : this.param.data.aid
		   })
	   }

		this.hide();
	}

	protected getTabbarTextArr():Array<string>{
		return [`buildtxt1Tab1_${this.getUiCode()}`,`buildtxt1Tab2_${this.getUiCode()}`,`buildtxt1Tab3_${this.getUiCode()}`,`buildtxt1Tab4_${this.getUiCode()}`];
	}

	private checkRedPoint():void
	{
		if(Api.itemVoApi.checkRedPoint())
		{
			this.tabbarGroup.addRedPoint(1);
		}
		else
		{
			this.tabbarGroup.removeRedPoint(1);
		}
		// App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE,this.checkRedPoint,this);
		// App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE,this.checkRedPoint,this);
	}

	public dispose():void
	{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.update,this);
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE,this.checkRedPoint,this);
		// App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE,this.checkRedPoint,this);
		super.dispose();
	}
}