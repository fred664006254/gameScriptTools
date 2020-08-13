/*
author : qinajun
date : 2018.4.14
desc : 珍器坊 工坊差事
*/
class ZhenqifangViewTab1 extends AcCommonViewTab
{
    //滑动列表
    private _freeTxt : BaseTextField = null;
	private _scrollList:ScrollList = null; 
	private _allbtn : BaseButton = null;

	public constructor(){
		super();
		this.initView();
    }
    
    private get cfg(){
        return Config.ZhenqifangCfg;
    }
    private get api(){
        return Api.zhenqifangVoApi;
	}
	
	public refreshWhenSwitchBack():void{
		let view = this;
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_SERVANT,{clear : true, friend : 0});
		Api.zhenqifangVoApi.sendList = [];
	}
	
	protected initView():void{	
		let view = this;
		NetManager.request(NetRequestConst.REQUEST_FRIEND_GETINFO,{});
		// App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_SELECTSERVANT), view.sendCallback, view);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_DATAREFRESH,this.update,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_FRESHTASK), view.refreshTaskCallback, view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_GETREWARD),view.rewardCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_GETITASK),view.update,view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_BATCHITASK), view.update, view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_GETFRIENDLISTINFO), view.saduncallback, view);
		NetManager.request(NetRequestConst.REQUEST_SADUN_GETFRIENDLISTINFO,{});

		let baseview : any = ViewController.getInstance().getView('ZhenqifangView');
		view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        
        let freeTxt = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, freeTxt, view, [55, 20], true);
        view.addChild(freeTxt)
        view._freeTxt = freeTxt;

        let freshTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangtip5`, [App.DateUtil.formatSvrHourByLocalTimeZone(0).hour+'']), 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, freshTxt, view, [55, 20], true);
        view.addChild(freshTxt)
        
        let listbg = BaseBitmap.create(`public_9_bg43`);
        listbg.width = 600;
		listbg.height = view.height - 190;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, view, [0, 50], true);
		view.addChild(listbg);

		// let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangtip4`), 20, TextFieldConst.COLOR_BLACK);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, listbg, [0, listbg.height + 10]);
        // view.addChild(tipTxt)

		let arr = view.api.getCurTaskarr();
 		let tmpRect =  new egret.Rectangle(0,0,600,listbg.height - 18);
		let scrollList = ComponentManager.getScrollList(ZhenqifangViewTab1ScrollItem, arr, tmpRect);
		view._scrollList = scrollList;     
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, 8]);
		view.addChild(scrollList); 
		// scrollList.bindMoveCompleteCallback(()=>{
		// 	let level = Math.ceil(scrollList.scrollTop / 90 + ((listbg.height - 195) / 90));
		// 	//当前滑动到的等级
		// 	view.freshBottomSpecialReward(level);
		// }, view);

		// let listmask = BaseBitmap.create(`battlepassscrollmask`);
		// listmask.width = listbg.width;
		// listmask.height = listbg.height - 185;
		// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, listmask, listbg, [0,85]);
		// view.addChild(listmask);

		//按钮
		let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `ZhenqifangShopAllSelect`, ()=>{
			if(btn.getIsGray()){
				let allsend = 0;
				let canSend  = 0;
				let list : any = view._scrollList;
				let canselectservant = [];
				let haveservant = [];
		
				for(let i in list._scrollListItemArr){
					let unit : ZhenqifangViewTab1ScrollItem = list._scrollListItemArr[i];
					if(unit.canSend()){
						++ allsend;
					}
					if(unit.isInState()){
						++ canSend;
					}
					if(unit.isSend()){
						let arr = unit.getServantArr();
						for(let k in arr){
							haveservant.push(Number(arr[k].sid));
						}
					}
				}
				if(canSend == 0){
					App.CommonUtil.showTip(LanguageManager.getlocal(`zhenqifangcdtip16`));
				}
				else if(canSend * 5 > canselectservant.length){
					App.CommonUtil.showTip(LanguageManager.getlocal(`zhenqifangcdtip27`));
				}
				return;
			}
			if(view.api.canGetTakReward(1)){
				//一键领取
				NetManager.request(NetRequestConst.REQUEST_ZQF_GETREWARD, {
					idx : 0, 
					taskType : 1,
					cts : 0,
					isBatch : 1
				});
			}
			else{
				let allsend = 0;
				let list : any = view._scrollList;
				let servantobj : any = {};
				for(let i in list._scrollListItemArr){
					let unit : ZhenqifangViewTab1ScrollItem = list._scrollListItemArr[i];
					if(unit.canSend()){
						++ allsend;
						let arr = [];
						arr = unit.getServantArr();
						servantobj[Number(i) + 1] = [];
						servantobj[Number(i) + 1] = arr;
					}
				}
				if(allsend > 0){
					Api.zhenqifangVoApi.freshlist = true;
					NetManager.request(NetRequestConst.REQUEST_ZQF_BATCHITASK,{
						sarr : servantobj
					});
				}
				else{
					//自动填充
					let canselectservant = [];
					let haveservant = [];
					for(let i in list._scrollListItemArr){
						let unit : ZhenqifangViewTab1ScrollItem = list._scrollListItemArr[i];
						let arr = unit.getServantArr();
						for(let k in arr){
							haveservant.push(Number(arr[k].sid));
						}
					}

					let servantlist : ServantInfoVo[] = Api.servantVoApi.getServantInfoListWithSort(1);
					for(let i in servantlist){
						let sid = Number(servantlist[i].servantId);
						if(haveservant.indexOf(sid) == -1){
							canselectservant.push(sid);
						}
					}
					
					for(let i in list._scrollListItemArr){
						let unit : ZhenqifangViewTab1ScrollItem = list._scrollListItemArr[i];
						if(!unit.canSend()){
							unit.setServantArr(canselectservant, haveservant);
						}
					}
				}
			}
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, view, [0,20], true);
		view.addChild(btn);
		view._allbtn = btn;
		view.update(null);
		TickManager.addTick(view.tick,view);
		if(Api.rookieVoApi.getIsGuiding()){
            scrollList.verticalScrollPolicy = `off`;
		}
		view.tick();
	}

	private update(evt : egret.Event):void{
		if(evt && evt.data && !evt.data.ret){
			return;
		}
		let view = this;
        //免费次数
		let freenum = Math.max(0, Config.ZhenqifangCfg.individual.freeFresh[0] - view.api.curFreeNum);
		view._freeTxt.text = LanguageManager.getlocal(`zhenqifangfreenum`, [freenum.toString()]);
		
		if(Api.zhenqifangVoApi.freshlist){
			Api.zhenqifangVoApi.freshlist = false;
			let arr = view.api.getCurTaskarr();
			Api.zhenqifangVoApi.sendList = [];
			view._scrollList.refreshData(arr);
		}
    }
    
	private sendCallback(evt : egret.Event) : void{
		if(evt.data.ret){
			let view = this;
			let data = evt.data.data.data;
			if(data && data.taskType && data.taskType == 1){
				App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip18"));
				let item : ZhenqifangViewTab1ScrollItem = <ZhenqifangViewTab1ScrollItem>view._scrollList.getItemByIndex(view.api.selIdx);
				let info = view.api.getTaskData(false, view.api.selIdx);
				item.refreshAfterSend(info);
				view.api.selIdx = -1;
			}
		}
	}

	private refreshTaskCallback(evt : egret.Event) : void{
		let view = this;
		if(evt.data.ret){
			let data = evt.data.data.data;
			if(data && data.taskType && data.taskType == 1){
				App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip12"));
				let item : ZhenqifangViewTab1ScrollItem = <ZhenqifangViewTab1ScrollItem>view._scrollList.getItemByIndex(view.api.selIdx);
				let info = view.api.getTaskData(false, view.api.selIdx);
				item.refreshAfterFresh(info);
				view.api.selIdx = -1;
			}
		}
	}

	private rewardCallback(evt : egret.Event) : void{
		let view = this;
		if(evt.data.ret){
			let data = evt.data.data.data;
			if(data && data.taskType && data.taskType == 1){
				let rewards = data.rewards;
				let rList = GameData.formatRewardItem(rewards);
				App.CommonUtil.playRewardFlyAction(rList);	
				let arr = view.api.getCurTaskarr();
				view._scrollList.refreshData(arr);
				Api.zhenqifangVoApi.sendList = [];
				if(data.isfirst){
					// Api.rookieVoApi.curGuideKey = "zhenqifang";
					// Api.rookieVoApi.insertWaitingGuide({"idx":"zhenqifang_11"},true);
					// Api.rookieVoApi.checkWaitingGuide();
					view._scrollList.verticalScrollPolicy = `on`;
					Api.rookieVoApi.checkNextStep();
					let baseview : any = ViewController.getInstance().getView('ZhenqifangView');
					baseview.hide();
				}
			}
		}
	}

	public tick() : void{
		let view = this;
		let allsend = 0;
		let canSend  = 0;
		let list : any = view._scrollList;
		let canselectservant = [];
		let haveservant = [];

		for(let i in list._scrollListItemArr){
			let unit : ZhenqifangViewTab1ScrollItem = list._scrollListItemArr[i];
			if(unit.canSend()){
				++ allsend;
			}
			if(unit.isInState()){
				++ canSend;
			}
			if(unit.isSend()){
				let arr = unit.getServantArr();
				for(let k in arr){
					haveservant.push(Number(arr[k].sid));
				}
			}
		}
		if(view.api.canGetTakReward(1)){
			view._allbtn.setText(`zhenqifangallget`);
			view._allbtn.setGray(false);
		}
		else{
			view._allbtn.setText(allsend > 0 ? `ZhenqifangShopAllSend` : `ZhenqifangShopAllSelect`);
			if(allsend == 0){
				let servantlist : ServantInfoVo[] = Api.servantVoApi.getServantInfoListWithSort(1);
				for(let i in servantlist){
					let sid = Number(servantlist[i].servantId);
					if(haveservant.indexOf(sid) == -1){
						canselectservant.push(sid);
					}
				}
				if(canSend == 0){
					view._allbtn.setGray(true);
				}
				else{
					if(canselectservant.length >= 5){
						view._allbtn.setGray(false);
					}
					else{
						view._allbtn.setGray(true);
					}
				}
			}
		}
		
	}

	private saduncallback(evt : egret.Event):void{
		let view = this;
		if(evt.data.ret){
			Api.friendVoApi.sadunList = evt.data.data.data.sadunList;
		}
	}

	public dispose():void{	
		let view = this;
		TickManager.removeTick(view.tick,view);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_DATAREFRESH,this.update,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_SELECTSERVANT), view.sendCallback, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_FRESHTASK), view.refreshTaskCallback, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_GETREWARD),view.rewardCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_GETITASK), view.update, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_BATCHITASK), view.update, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_GETFRIENDLISTINFO), view.saduncallback, view);
        view._scrollList = null;
		view._freeTxt = null;
		view._allbtn = null;
		super.dispose();
	}
}