/**
 * 修身资质UI
 * author yanyuling
 * date 2018/04/16
 * @class PracticeAbilityView
 */
class PracticeAbilityView extends CommonView
{
	protected _nodeContainer:BaseDisplayObjectContainer;
	private _scrollList:ScrollList;
	private _attrType:number=0;
	private _refreshTxtList:BaseTextField[] = [];
	private _tabbarGroup:TabBarGroup;
	public constructor() 
	{
		super();
	}

	public initView():void
	{	
		PlayerBottomUI.getInstance().visible = false;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK),this.refreshTxt,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK),this.refreshListAfterUnlock,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.refreshAfrerIdx,this);

		this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._attrType = this.param.data.type;

		let topbg = BaseBitmap.create("playerpromo_abitopbg");
		topbg.y = -15;
		topbg.height = 140;
		this._nodeContainer.addChild(topbg);

		let totalTxt  = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		totalTxt.text = LanguageManager.getlocal("servantInfo_title",["100"]);
		totalTxt.x = topbg.x + topbg.width/2;
		totalTxt.y = topbg.y + 15;
		this._nodeContainer.addChild(totalTxt);
		this._refreshTxtList.push(totalTxt);

		
		for (var index = 1; index <= 4; index++) {
			let abiTxt  = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
			abiTxt.text = LanguageManager.getlocal("servantInfo_attrTxt"+index);
			abiTxt.x = 80;
			abiTxt.y = topbg.y + 60;
			if(index%2 == 0)
			{
				abiTxt.x = GameConfig.stageWidth/2 + 100;
			}
			if(index > 2 )
			{
				abiTxt.y = topbg.y + 90;
			}
			this._nodeContainer.addChild(abiTxt);
			this._refreshTxtList.push(abiTxt);
		}
		
		// let btHeight =  PlayerBottomUI.getInstance().showHeight;
		let btHeight =  0;
		let bottomBg:BaseBitmap = BaseBitmap.create("servant_bottombg");
		bottomBg.x = GameConfig.stageWidth/2 - bottomBg.width/2 ;
		bottomBg.y = topbg.y +topbg.height;
		bottomBg.height = GameConfig.stageHeigth - bottomBg.y - this.container.y - btHeight+10;
		this._nodeContainer.addChild(bottomBg);

		let innerBg:BaseBitmap = BaseBitmap.create("public_9_bg32");
		innerBg.width = GameConfig.stageWidth - 30;
		innerBg.height = bottomBg.height - 100;
		innerBg.x = 15;
		innerBg.y = bottomBg.y+80;
		this._nodeContainer.addChild(innerBg);

		let tabName = ["servantInfo_speciality1","servantInfo_speciality2","servantInfo_speciality3","servantInfo_speciality4"];
		let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
       	tabbarGroup.setSpace(2);
		tabbarGroup.x = 25;
        tabbarGroup.y = bottomBg.y + 24;
        this._nodeContainer.addChild(tabbarGroup);
		this._tabbarGroup = tabbarGroup;

		let rect = new egret.Rectangle(0,0,bottomBg.width,innerBg.height-10);
		this._scrollList = ComponentManager.getScrollList(PracticeAbilityScrollItem,[],rect);
		this._scrollList.setPosition(20,innerBg.y+5); 
		this._nodeContainer.addChild(this._scrollList);
		this.tabBtnClickHandler({index:this._attrType});
		tabbarGroup.selectedIndex =this._attrType;
		this.refreshTxt();
    }

	protected refreshTxt()
	{
		this.checkRedPoints();
		PlayerBottomUI.getInstance().checkRedPoints();
		let attrV:number[] = Api.practiceVoApi.geAbilityValues();
		let totalV = String(attrV[0]+attrV[1]+attrV[2]+attrV[3]);
		this._refreshTxtList[0].text = LanguageManager.getlocal("servantInfo_title",[totalV]); 
		this._refreshTxtList[1].text = LanguageManager.getlocal("servantInfo_attrTxt1") + String(attrV[0]) ;
		this._refreshTxtList[2].text =  LanguageManager.getlocal("servantInfo_attrTxt2") + String(attrV[1]) ;
		this._refreshTxtList[3].text =  LanguageManager.getlocal("servantInfo_attrTxt3") + String(attrV[2]) ;
		this._refreshTxtList[4].text =  LanguageManager.getlocal("servantInfo_attrTxt4") + String(attrV[3]) ;
		this._refreshTxtList[0].anchorOffsetX = this._refreshTxtList[0].width/2;
	}
	protected refreshListAfterUnlock(event:egret.Event)
    {
        let rdata = event.data.data;
        if(rdata.ret != 0)
        {
            return;
        }
		egret.callLater(()=>{
			this.refreshAfrerIdx();
			this.refreshTxt();
		},this);
		
	}
	protected tabBtnClickHandler(params:any)
    {
		this._attrType = params.index;
		let list = Config.PracticeCfg.getPracticeShowListByType(this._attrType+1);
		let list1 = [];
		let list2 = [];
		let list3 = [];
		let list4 =[];
		for (var index = 0; index < list.length; index++) {
			let cfg = list[index];
			if(Api.practiceVoApi.isTaskLvEnable(cfg.id))
			{
				list1.push(cfg);
			}else{
				if(cfg.wifeId && Api.wifeVoApi.getWifeInfoVoById(cfg.wifeId))
				{
					if(Api.practiceVoApi.getPracticeTaskInfo(cfg.id).f == 2)
					{
						list4.push(cfg);
					}else{
						list2.push(cfg);
					}
				} else if(cfg.servantId && Api.servantVoApi.getServantObj(cfg.servantId))
				{
					if(Api.practiceVoApi.getPracticeTaskInfo(cfg.id).f == 2)
					{
						list4.push(cfg);
					}else{
						list2.push(cfg);
					}
				}else{
					list3.push(cfg);
				}
			}
		}

		list2.sort((dataA:Config.PracticeItemCfg,dataB:Config.PracticeItemCfg)=>{
			let aVo:PracticeTaskVo = Api.practiceVoApi.getPracticeTaskInfo(dataA.id);
			let bVo:PracticeTaskVo = Api.practiceVoApi.getPracticeTaskInfo(dataB.id);
			let aSinfo = Api.practiceVoApi.getPracticeTaskAccumulation(aVo);
			let bSinfo = Api.practiceVoApi.getPracticeTaskAccumulation(bVo);
			let aConV = aSinfo.conditionV/aSinfo.conditionNeed;
			let bConV = bSinfo.conditionV/bSinfo.conditionNeed;
			return bConV - aConV;
		});
		this.refreshList(list1.concat(list2).concat(list3).concat(list4));
		// this.refreshList.setScrollTopByIndex(0,false);
		this._scrollList.setScrollTopByIndex(0,0);
    }

	protected refreshAfrerIdx()
	{
		this.checkRedPoints();
		this.tabBtnClickHandler({index:this._attrType});
		PlayerBottomUI.getInstance().checkRedPoints();
	}

	protected refreshList(data:any)
	{
		this._scrollList.refreshData(data);
	}

	protected checkRedPoints()
	{
		let idxList = Api.practiceVoApi.practiceAttrRedList();
		// for (let key in idxList) {
		for (var index = 0; index < 4; index++) {
			let visible = false;
			if(idxList[String(index+1)])
			{
				visible = true;
			}
			if(visible){
				this._tabbarGroup.addRedPoint(index);
			}else{
				this._tabbarGroup.removeRedPoint(index);
			}
		}
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"playerpromo_abitopbg",
			"servant_bottombg",
			"progress5","progress3_bg",
			"practice_comp_flag",
		]);
	}
	public closeHandler():void
	{
		this.hide();
		PlayerBottomUI.getInstance().visible =true;
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK),this.refreshTxt,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK),this.refreshListAfterUnlock,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.refreshAfrerIdx,this);

		this._nodeContainer = null;
		this._scrollList = null;
		this._attrType = 0;
		this._refreshTxtList = [];
		this._tabbarGroup = null;

		super.dispose();
	}
}