
class ZhenqifangShopView extends CommonView
{  

    private _scrollList:ScrollList = null; 
	private _numTxt : BaseTextField = null;
	private _numTxt2 : BaseTextField = null;
	private _cdTxt : BaseTextField = null;
	private _time = 0;
    public constructor() {
		super();
	}

    protected getTitleStr():string
	{
		return "ZhenqifangShoptitle";
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([ 

			 "servant_bottombg",`acchristmasview_smalldescbg`,"acsingledayitembg","battlepasscollect3-1","ladderteam_add"
         ]);
	}

	private get api(){
		return Api.zhenqifangVoApi;
	}

    
    public initView():void
	{   
        let view = this;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_SHOPBUY),this.useCallback,this);  
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_DATAREFRESH,this.freshView,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WEAPON_RESOLVE, this.freshView, this);
        let bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth -this.container.y+89;
        bottomBg.x = 0; 
        bottomBg.y = -80; 
		this.addChildToContainer(bottomBg);

		let topbg = BaseBitmap.create("zqfshoptopbg");
        topbg.x = GameConfig.stageWidth/2  - topbg.width/2;
        topbg.y = bottomBg.y + 75;
		this.addChildToContainer(topbg);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`ZhenqifangShopTip1`),22,TextFieldConst.COLOR_LIGHT_YELLOW);
		tipTxt.lineSpacing = 13;
		tipTxt.textAlign = egret.HorizontalAlign.CENTER;
		tipTxt.x = GameConfig.stageWidth/2  - tipTxt.width/2;
        tipTxt.y = topbg.y + 28;
		this.addChildToContainer(tipTxt);

		let date: Date = App.DateUtil.getServerDate();
		let year:number = date.getFullYear();
		let month:number = date.getMonth() + 1;
		let day = date.getDate();
		let endday = new Date(year,month,0);
		let daycount = endday.getDate();
		let endtime = App.DateUtil.getWeeTs(GameData.serverTime) + (daycount - day + 1) * 86400 - GameData.serverTime;
        // 
    
		let cdTxt = ComponentManager.getTextField(LanguageManager.getlocal(`ZhenqifangShopTip2`, [App.DateUtil.getFormatBySecond(endtime, 16)]),22,TextFieldConst.COLOR_LIGHT_YELLOW);
		cdTxt.x = GameConfig.stageWidth/2  - cdTxt.width/2;
        cdTxt.y = tipTxt.y + tipTxt.textHeight + 13;
		this.addChildToContainer(cdTxt);
		this._cdTxt = cdTxt;

        let bottomBg2 = BaseBitmap.create("public_9_bg32");
        bottomBg2.height = bottomBg.height - 160 - topbg.height;
        bottomBg2.width = 615;
        bottomBg2.x = GameConfig.stageWidth/2  - bottomBg2.width/2;
        bottomBg2.y = topbg.y + topbg.height + 70;
		this.addChildToContainer(bottomBg2);
        
		let numbg = BaseBitmap.create(`public_9_resbg`);
		let rectd = new egret.Rectangle(0,0,40,40);
		let icon = BaseBitmap.create("public_icon1");
		let numTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerGemStr(), 20);
        numbg.setPosition(95, 148);
		this.addChildToContainer(numbg);

        icon.setPosition(numbg.x-3, numbg.y+numbg.height/2-icon.height/2);
		view.addChildToContainer(icon);
        
        numTxt.setPosition(icon.x+icon.width,icon.y+icon.height/2-numTxt.height/2+2);
		view.addChildToContainer(numTxt);
		view._numTxt = numTxt;


		let needid = 2040;
		let numbg2 = BaseBitmap.create(`public_9_resbg`);
		let rectd2 = new egret.Rectangle(0,0,40,40);
		let icon2 = BaseBitmap.create(`zqfshopicon`);
		let numTxt2 = ComponentManager.getTextField(Api.itemVoApi.getItemNumInfoVoById(needid).toString(), 20);
        numbg2.setPosition(GameConfig.stageWidth - 95 - numbg2.width, 148);
		this.addChildToContainer(numbg2);

        icon2.setPosition(numbg2.x - 3, numbg2.y+numbg2.height/2-icon2.height/2);
		view.addChildToContainer(icon2);
        
        numTxt2.setPosition(icon2.x+icon2.width,icon2.y+icon2.height/2-numTxt2.height/2+2);
		view.addChildToContainer(numTxt2);
		view._numTxt2 = numTxt2;

		let addBtn = ComponentManager.getButton("ladderteam_add",null,()=>
		{
			ViewController.getInstance().openView(ViewConst.POPUP.WEAPONRESOLVEPOPVIEW);
		},this,null,1);
        addBtn.setPosition(numbg2.x+numbg2.width-25,numbg2.y+numbg2.height/2-addBtn.height/2);
        this.addChildToContainer(addBtn);		

		let shop = Config.ServantweaponCfg.getShopArr();

        let listbg = bottomBg2;
 		let tmpRect =  new egret.Rectangle(0,0,615,listbg.height - 10);
		let scrollList = ComponentManager.getScrollList(ZhenqifangShopItem, shop, tmpRect);
		view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0,5]);
		view.addChildToContainer(scrollList); 
		view.update();
		view._time = GameData.serverTime;
		
		// let resetText = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightExchangeReset"), 20,TextFieldConst.COLOR_BROWN);
        // resetText.setPosition(GameConfig.stageWidth/2 - resetText.width/2, bottomBg2.y+bottomBg2.height+12);
		// view.addChildToContainer(resetText);
        
    }

    private update():void{
		let view = this;
		let numTxt = view._numTxt;
		numTxt.text = Api.playerVoApi.getPlayerGemStr();
		let needid = 2040;
		view._numTxt2.text = Api.itemVoApi.getItemNumInfoVoById(needid).toString()
	}

	private freshView():void{
		let view = this;
		if(Api.zhenqifangVoApi.freshshop){
			let shop = Config.ServantweaponCfg.getShopArr();
			view._scrollList.refreshData(shop);
			Api.zhenqifangVoApi.freshshop = false;
		}
		view.update();
	}

	public tick():void{
		let view = this;
		let date: Date = App.DateUtil.getServerDate();
		let year:number = date.getFullYear();
		let month:number = date.getMonth() + 1;
		let day = date.getDate();
		let endday = new Date(year,month,0);
		let daycount = endday.getDate();
		let endtime = App.DateUtil.getWeeTs(GameData.serverTime) + (daycount - day + 1) * 86400 - GameData.serverTime;
		if(GameData.serverTime == App.DateUtil.getWeeTs(GameData.serverTime)){
			view._cdTxt.text = LanguageManager.getlocal(`ZhenqifangShopTip3`, [App.DateUtil.getFormatBySecond(endtime, 16)]);
			Api.zhenqifangVoApi.freshshop = true;
			NetManager.request(NetRequestConst.REQUEST_ZQF_GETINFO, {});
		}
		else{
			view._cdTxt.text = LanguageManager.getlocal(`ZhenqifangShopTip2`, [App.DateUtil.getFormatBySecond(endtime, 16)]);
		}
		view._cdTxt.x = GameConfig.stageWidth/2  - view._cdTxt.width/2;

		if(view._time > 0 && (GameData.serverTime - App.DateUtil.getWeeTs(view._time)) >= 86400){
			view._time = GameData.serverTime;
			view._cdTxt.text = LanguageManager.getlocal(`ZhenqifangShopTip3`, [App.DateUtil.getFormatBySecond(endtime, 16)]);
			Api.zhenqifangVoApi.freshshop = true;
			NetManager.request(NetRequestConst.REQUEST_ZQF_GETINFO, {});
		}
	}

    public useCallback(event:egret.Event):void
	{
		if(event.data.ret){
			let view = this;
			let data = event.data.data.data;
			if(data && data.rewards){
				let rewards = data.rewards;
				let selIdx = view.api.selIdx;
				let item = <ZhenqifangShopItem>view._scrollList.getItemByIndex(selIdx);
				if(item){
					item.refreshItem(rewards);
				}
				view.api.selIdx = -1;
			}
		}
	}

    public dispose():void
	{ 
        let view = this;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_SHOPBUY),this.useCallback,this);  
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_DATAREFRESH,this.freshView,this);
		App.MessageHelper.removeEventListener(NetRequestConst.REQUEST_WEAPON_RESOLVE, this.freshView, this);
		this._numTxt = null;
		this._numTxt2 = null;
        this._scrollList = null;
		this._cdTxt = null;
		this._time = 0;
        super.dispose();
    }
}