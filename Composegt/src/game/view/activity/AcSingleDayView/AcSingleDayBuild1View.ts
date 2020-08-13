class AcSingleDayBuild1View  extends CommonView
{

	public constructor(){
		super();
    }


    private public_dot1:BaseBitmap =null;
    private public_dot2:BaseBitmap =null;
    private public_dot3:BaseBitmap =null;
    private _suffix:string = "1";//this.param.data.code;
    protected init():void
	{
        let code = this.param.data.code;
        if(Number(code) <= 4 ){
            this._suffix = "1";//;
        }else{
            this._suffix = code;
        }
        super.init();
    }
    protected getBgName():string{
        return `acsingleday_bg${this._suffix}`;
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
    

	//创建底部通用切换按钮，由 initBottom，bottomBtnHandler 两个接口一起完成
	private initBottom()
	{
		let btNode = new AcSingleDayBottomNode({selectIdx:1,switchCallback:this.bottomBtnHandler,callbackOgj:this});
		btNode.y = -this.container.y;
		this.addChildToContainer(btNode);
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
    
	public initView():void{
        // NetManager.request(NetRequestConst.REQUEST_ITEM_GETMODEL,{});
        let view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MODEL_ACTIVITY,view.update,view); 

        //红点
        for(let i = 1; i < 4; ++ i){
            let public_dot = BaseBitmap.create("public_dot2");
            view.addChild(public_dot);
            public_dot.x = view.tabbarGroup.getChildAt(i + 1).x + this.tabbarGroup.getChildAt(i + 1).width - 10;
            public_dot.y = view.tabbarGroup.y + 10; 
            view[`public_dot${i}`] = public_dot;
        }
        view.update();


        view.initBottom();

        // let npc = BaseLoadBitmap.create('wife_full_101');
        // npc.width = 640;
        // npc.height = 840;
        // npc.setScale(0.4);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, npc, view, [0,0]);
        // view.addChildToContainer(npc);
        // view._npc = npc;
       if(PlatformManager.checkHideIconByIP())
        {
            this.tabbarGroup.setLocked(1,true);
        }
    }

     // (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
	protected checkTabCondition(index:number):boolean
	{
        if(index==1&&PlatformManager.checkHideIconByIP())
        {
            return false;
        }
		return true;
	}

    protected clickTabbarHandler(data : any):void{
        let view = this;
        let viewBg : any = view.viewBg;
        viewBg.setRes(data.index == 0 ? `acsingleday_bg${this._suffix}` : `public_9_bg20`);
        if(data.index > 0){
            viewBg.height = 1136;
        }
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
        return `buildtxt1_${this._suffix}`
    }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "common_shopmark","rechargevie_db_01","itemview_daoju_bg01","itemview_daoju_bg02","itemview_daoju_bg03","itembg_0","progress_type3_bg","progress_type1_yellow2","collectflag",
            "acsingleday_cdbg","acsingleday_couponIcon","acsingleday_cd_num1","acsingleday_cd_num2","acsingleday_cd_num3","acsingledayredpt"
		]);
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
            view[`public_dot${i}`].visible = vo[`getpublicRedhot${i}`]();
        }  
   } 

   public tick():void{
       let view = this;
       view.update();
   }

	protected getTabbarTextArr():Array<string>
	{
		return [`buildtxt1Tab1_${this._suffix}`,`buildtxt1Tab2_${this._suffix}`,`buildtxt1Tab3_${this._suffix}`,`buildtxt1Tab4_${this._suffix}`];
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
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,view.update,view); 
    
        view.public_dot1 = null;
        view.public_dot2 = null;
        view.public_dot3 = null;
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE,this.checkRedPoint,this);
		// App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE,this.checkRedPoint,this);
        this._suffix = null;
		super.dispose();
	}
}