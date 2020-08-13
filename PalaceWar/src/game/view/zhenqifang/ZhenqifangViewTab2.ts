/*
author : qinajun
date : 2018.4.14
desc : 珍器坊 好友差事
*/
class ZhenqifangViewTab2 extends AcCommonViewTab
{
    //滑动列表
	private _scrollList:ScrollList = null; 
	private _allbtn : BaseButton = null;
	private _alltipTxt : BaseTextField = null;

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
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_SERVANT,{clear : true, friend : 1});
		Api.zhenqifangVoApi.friendsendList = [];
		Api.zhenqifangVoApi.friendobj = {};
		// let historylist = Api.zhenqifangVoApi.getFriendHistoryList();
		// if(historylist){
		// 	for(let i in historylist){
		// 		let unit = historylist[i];
		// 		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_ADDSERVANT_FRIEND, {
		// 			data : unit,
		// 			index : i
		// 		});
		// 	}
		// }
	}
	
	protected initView():void{	
		let view = this;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_SELECTSERVANT), view.sendCallback, view);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_DATAREFRESH,this.update,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_FRESHTASK), view.refreshTaskCallback, view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_GETREWARD),view.rewardCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_BATCHFTASK), view.update, view);
		let baseview : any = ViewController.getInstance().getView('ZhenqifangView');
		view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        
        // let freeTxt = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_BLACK);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, freeTxt, view, [55, 20], true);
        // view.addChild(freeTxt)
        // view._freeTxt = freeTxt;

        let freshTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangtip3`, [App.DateUtil.formatSvrHourByLocalTimeZone(0).hour+'']), 20, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, freshTxt, view, [0, 20], true);
        view.addChild(freshTxt)
        
        let listbg = BaseBitmap.create(`public_9_bg43`);
        listbg.width = 600;
		listbg.height = view.height - 190;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, view, [0, 50], true);
		view.addChild(listbg);

		// let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangtip4`), 20, TextFieldConst.COLOR_BLACK);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, listbg, [0, listbg.height + 10]);
        // view.addChild(tipTxt)

		let arr = view.api.getCurFTaskarr();
 		let tmpRect =  new egret.Rectangle(0,0,600,listbg.height - 18);
		let scrollList = ComponentManager.getScrollList(ZhenqifangViewTab1ScrollItem, arr, tmpRect);
		view._scrollList = scrollList;    
		scrollList.setEmptyTip(LanguageManager.getlocal(`allianceTaskoutTimeTip`));
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, 8]);
		view.addChild(scrollList); 

		//按钮
		let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `ZhenqifangShopAllSelect`, ()=>{
			if(btn.getIsGray()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`zhenqifangcdtip16`));
				return;
			}
			if(view.api.canGetTakReward(2)){
				//一键领取
				NetManager.request(NetRequestConst.REQUEST_ZQF_GETREWARD, {
					idx : 0, 
					taskType : 2,
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
					NetManager.request(NetRequestConst.REQUEST_ZQF_BATCHFTASK,{
						sarr : servantobj
					});
				}
				else{
					//自动填充
					let historylist = Api.zhenqifangVoApi.getFriendHistoryList();
					if(historylist){
						for(let i in historylist){
							let unit = historylist[i];
							App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_ADDSERVANT_FRIEND, {
								data : unit,
								index : i
							});
						}
					}
				}
			}
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, view, [0,20], true);
		view.addChild(btn);
		view._allbtn = btn;

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangcdtip26`), 20);
		view._alltipTxt = tipTxt;
		view.addChild(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, btn);
		TickManager.addTick(view.tick,view);
		view.tick();

	}

	private update():void{
		let view = this;
        //免费次数
		// let freenum = Math.max(Config.ZhenqifangCfg.friend.freeFresh[0] - view.api.curFreeNum, 0);
		// view._freeTxt.text = LanguageManager.getlocal(`zhenqifangfreenum`, [freenum.toString()]);
		let arr = view.api.getCurFTaskarr();
		view._scrollList.refreshData(arr);
		Api.zhenqifangVoApi.friendsendList = [];
    }
    
	private sendCallback(evt : egret.Event) : void{
		if(evt.data.ret){
			let view = this;
			let data = evt.data.data.data;
			if(data && data.taskType && data.taskType == 2){
				App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip18"));
				let item : ZhenqifangViewTab1ScrollItem = <ZhenqifangViewTab1ScrollItem>view._scrollList.getItemByIndex(view.api.selIdx);
				let info = view.api.getTaskData(true, view.api.selIdx);
				item.refreshAfterSend(info);
				view.api.selIdx = -1;
			}
			else{
				//App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip12"));
			}
		}
	}

	private rewardCallback(evt : egret.Event) : void{
		let view = this;
		if(evt.data.ret){
			let data = evt.data.data.data;
			if(data && data.taskType && data.taskType == 2){
				let rewards = data.rewards;
				let rList = GameData.formatRewardItem(rewards);
				App.CommonUtil.playRewardFlyAction(rList);	
				let arr = view.api.getCurFTaskarr();
				view._scrollList.refreshData(arr);
				// Api.zhenqifangVoApi.friendsendList = [];
				// Api.zhenqifangVoApi.friendobj = {};
				// let historylist = Api.zhenqifangVoApi.getFriendHistoryList();
				// if(historylist){
				// 	for(let i in historylist){
				// 		let unit = historylist[i];
				// 		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_ADDSERVANT_FRIEND, {
				// 			data : unit,
				// 			index : i
				// 		});
				// 	}
				// }
			}
		}
	}

	private refreshTaskCallback(evt : egret.Event) : void{
		let view = this;
		if(evt.data.ret){
			let data = evt.data.data.data;
			if(data && data.taskType && data.taskType == 2){
				App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip12"));
				let item : ZhenqifangViewTab1ScrollItem = <ZhenqifangViewTab1ScrollItem>view._scrollList.getItemByIndex(view.api.selIdx);
				let info = view.api.getTaskData(true, view.api.selIdx);
				item.refreshAfterFresh(info);
				view.api.selIdx = -1;
			}
		}
	}


	public getServantNumByUid(uid : number):number{
		let view = this;
		let count = 0;
		let list : any = view._scrollList;
		for(let i in list._scrollListItemArr){
			let unit : ZhenqifangViewTab1ScrollItem = list._scrollListItemArr[i];
			let arr = unit.getServantArr();
			for(let j in arr){
				if(arr[j].uid == uid){
					++ count;
				}
			}
		}
		return count;
	}

	public tick() : void{
		let view = this;
		let allsend = 0;
		let canSend  = 0;
		let history = 0;
		let list : any = view._scrollList;
		let obj = view.api.getFriendHistoryList();
		for(let i in list._scrollListItemArr){
			let unit : any = list._scrollListItemArr[i];
			if(unit.canSend()){
				++ allsend;
			}
			if(unit.isInState()){
				++ canSend;
			}
			if(unit.isInState() && obj && obj[unit._data.index]){
				++ history;
			}
		}
		if(view.api.canGetTakReward(2)){
			view._allbtn.visible = true;
			view._alltipTxt.visible = false;
			view._allbtn.setText(`zhenqifangallget`);
			view._allbtn.setGray(false);
		}
		else{
			view._allbtn.setText(allsend > 0 ? `ZhenqifangShopAllSend` : `ZhenqifangShopAllSelect`);
			if(allsend > 0){
				view._allbtn.visible = true;
				view._alltipTxt.visible = false;
			}
			else{
				if(canSend == 0){
					view._allbtn.visible = true;
					view._alltipTxt.visible = false;
					view._allbtn.setGray(true);
				}
				else{
					view._allbtn.setGray(false);
					if(history > 0){
						view._allbtn.visible = true;
						view._alltipTxt.visible = false;
					}
					else{
						view._allbtn.visible = false;
						view._alltipTxt.visible = true;
					}
				}
			}
		}
		
	}

	public dispose():void{	
		let view = this;
		TickManager.removeTick(view.tick,view);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_DATAREFRESH,this.update,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_SELECTSERVANT), view.sendCallback, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_GETREWARD),view.rewardCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_FRESHTASK), view.refreshTaskCallback, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_BATCHFTASK), view.update, view);
		view._scrollList = null;
		view._allbtn = null;
		view._alltipTxt = null;
		Api.zhenqifangVoApi.friendobj = {};
        // view._freeTxt = null;
		super.dispose();
	}
}