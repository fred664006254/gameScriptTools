class DailybossView extends CommonView
{
	private _scrollContiner:BaseDisplayObjectContainer=undefined;

	private _infoTab:any[] = [];
	private _bannerTab:DailybossBanner[] = [];

	public constructor()
	{
		super();
	}
	
	protected get uiType():string
	{
		return "2";
	}

	protected getContainerY():number
	{
		return 14;
	}

	protected getBigFrame():string
	{	
		return null;
	}

	// protected getResourceList():string[]
	// {
		

	// 	let resArray:string[] = ["dailyboss_underway"];

	// 	for (let i:number = 0; i < this._infoTab.length; i++)
	// 	{
	// 		resArray.push("dailyboss_"+this._infoTab[i].name)
	// 	}

	// 	return super.getResourceList().concat(resArray);
	// }

	protected getRequestData():{requestType:string,requestData:any}{	
		let view = this;
		if(Api.switchVoApi.checkOpenCountryWar()){
			return {requestType:NetRequestConst.REQUEST_COUNTRYWAY_GETMODEL,requestData:null};
		}
		else{
			return null;
		}
    }
    
    protected receiveData(rdata:any):void{
		let view = this;
		if(!rdata.ret){
            return;
        }
		let api = Api.countryWarVoApi;
        if(rdata.data.data.countrywar){
            api.formatData(rdata.data.data.countrywar);
        }
        
        if(rdata.data.data.announce){
            api.setAnnouce(rdata.data.data.announce);
        }

        if(rdata.data.data.numpercity){
            api.setMyCityInfo(rdata.data.data.numpercity);
        }
        if(rdata.data.data.tnumpercity){
            api.setEnermyCityInfo(rdata.data.data.tnumpercity);
        }
        if(rdata.data.data.history){
            api.setHistoryInfo(rdata.data.data.history);
        }
    }

	protected initView():void
	{
		this._infoTab.push({name:"boss1",  });
		if (Api.switchVoApi.checkNewDailyBoss())
		{
			this._infoTab.push({name:"bossnew",  });
		}
		else
		{
			this._infoTab.push({name:"boss2",  });
		}
		
	
		if(Api.switchVoApi.checkOpenCountryWar() && !Api.countryWarVoApi.isNotCross())
		{
			this._infoTab.push({name:"countryWar",  });
		}

		
		let vo = Api.acVoApi.getActivityVoByAidAndCode("ladderTournament");
		if (vo && vo.isStart)
		{	
			this._infoTab.push({name:"ladderTournament",  });
		}


		let bottomBg:BaseBitmap = BaseBitmap.create("public_9_bg22");
		bottomBg.y = -15;
		bottomBg.height = GameConfig.stageHeigth - this.getTitleButtomY() -5;
		this.addChildToContainer(bottomBg);

		this._scrollContiner = new BaseDisplayObjectContainer();

		let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,5,GameConfig.stageWidth,bottomBg.height-50);

		let scrollView = ComponentManager.getScrollView(this._scrollContiner,rect);
		this.addChildToContainer(scrollView);

		
		for (let i:number = 0; i < this._infoTab.length; i++)
		{
			let banner:DailybossBanner = new DailybossBanner();
			banner.init(this._infoTab[i],i,this.bannerCallback,this,this.removeCallback);
			this._scrollContiner.addChild(banner);
			banner.y = 233*i;
			this._bannerTab.push(banner);
		}

		this.tick();
	}

	private removeCallback(idx:number):void
	{	
		this._bannerTab[idx].dispose();
		this._bannerTab.splice(idx,1);
		for (let i:number = 0; i < this._infoTab.length; i++)
		{
			let banner:DailybossBanner = this._bannerTab[i];
			banner.y = 233*i;
		}
	}

	private bannerCallback(name:string):void
	{
		if (name == "boss1")
		{
			ViewController.getInstance().openView(ViewConst.COMMON.DAILYBOSSDETILVIEW,{bname:name,type:1});
		}
		else if (name == "boss2")
		{
			ViewController.getInstance().openView(ViewConst.COMMON.DAILYBOSSDETILVIEW,{bname:name,type:2});
		}
		else if (name == "bossnew")
		{
			ViewController.getInstance().openView(ViewConst.COMMON.DAILYBOSSNEWVIEW,{});
		}
		else if (name == "countryWar")
		{
			if(Api.countryWarVoApi.getEnermyZid() !== 0){
				ViewController.getInstance().openView(ViewConst.COMMON.COUNTRYWARENTERVIEW);
			}
			else{
				App.CommonUtil.showTip(LanguageManager.getlocal("CountryWarCityTip3"));
				return;
			} 
		}
		else if (name == "ladderTournament")
		{	
			let vo = <AcLadderTournamentVo>Api.acVoApi.getActivityVoByAidAndCode("ladderTournament");
			if (vo)
			{	
				Api.acVoApi.openActivityViewByAid(vo.aid,vo.code,vo.atype);
			}
			
		}
	}

	public tick():void
	{
		for (let i:number = 0; i < this._bannerTab.length; i++)
		{
			this._bannerTab[i].tick();
		}
	}

	protected getTitleStr():string
	{
		return "dailybossTitle";
	}

	protected getRuleInfo():string{
		return "DailyAbyssEntranceRuleInfo";
    } 

	public dispose():void
	{
		this._scrollContiner = null;
		this._infoTab.length = 0;
		this._bannerTab.length = 0;

		super.dispose();
	}
}