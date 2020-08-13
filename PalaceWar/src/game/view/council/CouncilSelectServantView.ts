/**
 * 议事院选择门客
 * author 钱竣
 */
class CouncilSelectServantView extends PopupView
{
	public constructor() 
	{
		super();
	}

	private _buzheninfo : any[] = null;
	private _cyrAttrTxt : BaseTextField = null;
	private _list : ScrollList = null;
	private _bottomList : ScrollList = null;
	private _data : any;
	private _seatId : number = 0;

	private get api(){
        return Api.councilVoApi;
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
            "discusspqzhong","discussypqian"
        ]);
    }
	
	protected resetBgSize() : void{
		super.resetBgSize();
		if (this.getBgName() != "public_rule_bg") {
			this.closeBtn.y = this.viewBg.y - 15;
			this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 15);
		}
		else {
			this.closeBtn.y = this.viewBg.y - 18;
			this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 37);
		}
	}

	protected initView():void
	{
		let view = this;
		view.viewBg.width = 580;
		view.viewBg.height = 900;
		let eventId = view.param.data.eventId;
		let data = view.api.getEventInfoById(eventId);
		view._data = data;
		view._seatId = view.param.data.index ? view.param.data.index : 0;

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_COUNCIL_TEAMCHANGE,view.teamChange,view);
		
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0,12]);

		let needTypeTxt = ComponentManager.getTextField(LanguageManager.getlocal(`discussViewNeedType2`, [LanguageManager.getlocal(`servantInfo_speciality${data.eventNeedType == 0 ? 7 : data.eventNeedType}`)]), 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, needTypeTxt, view.viewBg, [50,70]);
		view.addChild(needTypeTxt);

		let cyrAttrTxt = ComponentManager.getTextField('', 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.righttop, cyrAttrTxt, view.viewBg, [50,70]);
		view.addChild(cyrAttrTxt);
		view._cyrAttrTxt = cyrAttrTxt;
		
		let topbg : BaseBitmap = BaseBitmap.create("public_9_bg44");
		topbg.width = 526;
		topbg.height = 120;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.viewBg, [0,95]);
		view.addChild(topbg);

		view._buzheninfo = [];
		
		let tmpRect =  new egret.Rectangle(0,0,520,114);
		let scrollList = ComponentManager.getScrollList(CouncilEventSearvantItem, [], tmpRect);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, scrollList, topbg, [-2,0]);
		view.addChild(scrollList); 
		view._list = scrollList;
		view.fresh_List();
		//needType

		let kuang : BaseBitmap = BaseBitmap.create("public_9_bg4");
		kuang.width = 528;
		kuang.height = 550;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, kuang, topbg, [0,topbg.height + 10]);
		view.addChild(kuang);

		let bottomtmpRect =  new egret.Rectangle(0,0,508,530);
		let bottomscrollList = ComponentManager.getScrollList(CouncilEventSelectSearvantItem, [], bottomtmpRect);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, bottomscrollList, kuang, [0,10]);
		view.addChild(bottomscrollList); 
		view._bottomList = bottomscrollList;

		view.fresh_List();
		view.fresh_bottom_list();

		let selectBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, 'discussConfirmJoin', view.selectClick, view);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, selectBtn, kuang, [10,kuang.height + 10]);
		view.addChild(selectBtn);
		
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`discussJoinEventTip2`), 20, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt, view.viewBg, [0,22]);
		view.addChild(tipTxt);
	}

	private selectClick():void{
		let view = this;
		if(Api.switchVoApi.checkOpenServerMaintain()){
            App.CommonUtil.showTip(LanguageManager.getlocal("mergeServerTip"));
            return;
        }
		if(!view._buzheninfo.length){
			App.CommonUtil.showTip(LanguageManager.getlocal("discussJoinEventTip3"));
			return;
		}
		let itemId = 1921;
		let ownNum = Api.itemVoApi.getItemNumInfoVoById(itemId);
		let iteminfo = Config.ItemCfg.getItemCfgById(itemId);
		//出恢复弹窗
		let mesObj = {
			confirmCallback : ()=>{
				if(Api.switchVoApi.checkOpenServerMaintain()){
					App.CommonUtil.showTip(LanguageManager.getlocal("mergeServerTip"));
					return;
				}
				if(view.api.getCurpeirod() > 2){
					App.CommonUtil.showTip(LanguageManager.getlocal("discussJoinEventTip4"));
					view.hide();
					return;
				}
				if(view._data.num >= Config.CouncilCfg.maxPlayer){
					App.CommonUtil.showTip(LanguageManager.getlocal("discussJoinEventTip5"));
					view.hide();
					return;
				}
				if(ownNum <= 0){
					App.CommonUtil.showTip(LanguageManager.getlocal("discussJoinEventTip6"));
					return;
				}
				let arr = [];
				for(let i in view._buzheninfo){
					let unit = view._buzheninfo[i];
					arr.push(unit.data.servantId);
				}
				NetManager.request(NetRequestConst.REQUST_COUNCIL_JOINEVENT, {
					eventId  : view._data.eventId,
					servant : arr,
					seatId : view._seatId ? view._seatId : view.api.getSeatId(view._data.eventId)
				});
				view.hide();
			},
			handler : view, 
			icon : "itemicon"+itemId,
			iconBg : iteminfo.iconBg, 
			num : ownNum, 
			msg : LanguageManager.getlocal("discussConfirmUse",[iteminfo.name]),
			id : itemId,
			useNum : 1,
			linespacing : 6,
			height : 250
		};
		// itemName_109
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj);
			
		
		
	}

	private fresh_bottom_list():void{
		let view = this;
		let total = 0;
		let type = Number(view._data.eventNeedType);
		let eventId = view._data.eventId;
		let keys = Api.servantVoApi.getServantInfoIdListByProperty(type);
		let arr = [];
		for(let i in keys){
			arr.push({
				needType : type,
				data : Api.servantVoApi.getServantObj(keys[i]),
				eventId : eventId
			});
		}
		arr.sort((a,b)=>{
			let notjoina = view.api.servantIsJoined(a.eventId, a.data.servantId) == 'NOT_JOIN';
			let notjoinb = view.api.servantIsJoined(b.eventId, b.data.servantId) == 'NOT_JOIN';
			
			if(notjoina && !notjoinb){
				return -1;
			}
			else if(!notjoina && notjoinb){
				return 1;

			}
			else if(notjoina && notjoinb){
				let valueA = 0;
				let valueB = 0;
				switch (type) 
				{
					case 1:
						valueA = a.data.attrVo.forceTotal;
						valueB = b.data.attrVo.forceTotal;
						break;
					case 2:
						valueA = a.data.attrVo.brainsTotal;
						valueB = b.data.attrVo.brainsTotal;
						break;
					case 4:
						valueA = a.data.attrVo.charmTotal;
						valueB = b.data.attrVo.charmTotal;
						break;
					case 3:
						valueA = a.data.attrVo.politicsTotal;
						valueB = b.data.attrVo.politicsTotal;
						break;
					case 0:
						valueA = a.data.total;
						valueB = b.data.total;
						break;
				}
				if (Api.switchVoApi.checkOpenExile()) {
					if (a.data.banishSt && (!b.data.banishSt)) {
						return 1;
					}
					else if (a.data.banishSt && b.data.banishSt) {
						return valueB - valueA;
					}
					else if ((!a.data.banishSt) && b.data.banishSt) {
						return -1;
					}
					else if ((!a.data.banishSt) && (!b.data.banishSt)) {
						return valueB - valueA;
					}
				}
				else {
					return valueB - valueA;
				}
				// return valueB- valueA;
			}
			else{
				let jointhisa = view.api.servantIsJoined(a.eventId, a.data.servantId) == 'JOIN_THIS';
				let jointhisb = view.api.servantIsJoined(b.eventId, b.data.servantId) == 'JOIN_THIS';
				if(jointhisa && !jointhisb){
					return 1;
				}
				else if(!jointhisa && jointhisb){
					return -1;
				}
				else if(jointhisa && jointhisb){
					let valueA = 0;
					let valueB = 0;
					switch (type) 
					{
						case 1:
							valueA = a.data.attrVo.forceTotal;
							valueB = b.data.attrVo.forceTotal;
							break;
						case 2:
							valueA = a.data.attrVo.brainsTotal;
							valueB = b.data.attrVo.brainsTotal;
							break;
						case 4:
							valueA = a.data.attrVo.charmTotal;
							valueB = b.data.attrVo.charmTotal;
							break;
						case 3:
							valueA = a.data.attrVo.politicsTotal;
							valueB = b.data.attrVo.politicsTotal;
							break;
						case 0:
							valueA = a.data.total;
							valueB = b.data.total;
							break;
					}
					if(Api.switchVoApi.checkOpenExile())
					{
						if (a.data.banishSt && (!b.data.banishSt)) {
							return 1;
						}
						else if (a.data.banishSt && b.data.banishSt) {
							return valueB - valueA;
						}
						else if ((!a.data.banishSt) && b.data.banishSt) {
							return -1;
						}
						else if ((!a.data.banishSt) && (!b.data.banishSt)) {
							return valueB - valueA;
						}
					}
					else
					{
						return valueB - valueA;
					}
					// return valueB - valueA;
					}
				else {
					let joinothera = view.api.servantIsJoined(a.eventId, a.data.servantId) == 'JOIN_OTHER';
					let joinotherb = view.api.servantIsJoined(b.eventId, b.data.servantId) == 'JOIN_OTHER';
					if(joinothera && !joinotherb){
						return 1;
					}
					else if(!joinothera && joinotherb){
						return -1;
					}
				}
			}
		});
		view._bottomList.refreshData(arr);
	}

	private fresh_List(){
		let view = this;
		let total = 0;
		let type = Number(view._data.eventNeedType);
		let eventId = view._data.eventId;
		for(let i in view._buzheninfo){
			let unit = view._buzheninfo[i];
			total += (Api.servantVoApi.getServantProByType(unit.data.servantId, type));
		}
		view._cyrAttrTxt.text = LanguageManager.getlocal(`discussViewAttrCurTotal`, [total.toString()]);
		view.setLayoutPosition(LayoutConst.righttop, view._cyrAttrTxt, view.viewBg, [50,70]);

		let emptyarr = [];
		for(let i = 0; i < Config.CouncilCfg.maxServant; ++ i){
			if(view._buzheninfo[i]){
				emptyarr.push(
					view._buzheninfo[i]
				);
			}
			else{
				emptyarr.push({
					empty : true,
					select : true
				});
			}
		}
		view._list.refreshData(emptyarr);
	}

	private teamChange(evt : any):void{
		let view = this;
		let data = evt.data;
		if(data.type == 'delete'){
			for(let i in view._buzheninfo){
				if(view._buzheninfo[i].data.servantId == data.servantId){
					view._buzheninfo.splice(Number(i), 1);
					break;
				}
			}
		}
		else{
			if(view._buzheninfo.length >= 5){
				App.CommonUtil.showTip(LanguageManager.getlocal("discussJoinEventTip1"));
				return;
			}
			let obj = Api.servantVoApi.getServantObj(data.servantId);
			view._buzheninfo.push({
				data : obj,
				select : true
			});
		}
		view.api.setBuzhenInfo(view._buzheninfo);
		view.fresh_List();
		//上半部分列表
		// let list : any = view._list;
		// let arr = list._dataList;
		// let upidx = 0;
		// let bottomidx = 0;
		// for(let i in arr){
		// 	if(data.type == 'delete'){
		// 		if(arr[i].data.servantId == data.servantId){
		// 			arr[i] = {
		// 				empty : true,
		// 				select : true
		// 			};
		// 			upidx = Number(i);
		// 			break;
		// 		}
		// 	}
		// 	else{
		// 		if(arr[i].empty){
		// 			arr[i] = {
		// 				data : Api.servantVoApi.getServantObj(data.servantId),
		// 				select : true
		// 			};
		// 			upidx = Number(i);
		// 			break;
		// 		}
		// 	}
		// }
		// let item : ScrollListItem  = view._list.getItemByIndex(upidx);
		// item['refreshData'](data.type == 'delete' ? null : data.servantId);
		// view.fresh_List();
		let bottomList : any = view._bottomList;
		let bottomArr = bottomList._dataList;
		for(let i in bottomArr){
			if(bottomArr[i].data.servantId == data.servantId){
				let item : any = view._bottomList.getItemByIndex(Number(i));
				item.refreshStatus(data.type);
				break;
			}
		}
		// view._bottomList.refreshData(bottomList._dataList);
	}

	protected isShowOpenAni():boolean{
		return false;
	}

	public dispose():void
	{
		let view = this;
		view._seatId = 0;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_COUNCIL_TEAMCHANGE,view.teamChange,view);
		view._cyrAttrTxt = null;
		view._list = null;
		view._bottomList = null;
		view._buzheninfo = [];
		view.api.setBuzhenInfo(view._buzheninfo);
		super.dispose();
	}
}