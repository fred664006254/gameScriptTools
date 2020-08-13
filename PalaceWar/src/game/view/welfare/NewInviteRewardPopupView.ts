/**
 *新邀请好友奖励预览
 * author qianjun
 */
class NewInviteRewardPopupView extends PopupView{ 
    private _list : ScrollList = null;

	public constructor(){
		super();
    }

    private get api(){
		return Api.newinviteVoApi;
	}

	private get cfg(){
		return Config.Invitefriend2Cfg;
	}
    
	protected getResourceList():string[]{
		return super.getResourceList().concat([
            `progress21_bg`,`progress21`,`public_popupscrollitembg`
		]);
    }

    protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
    }

	public initView():void{		
		// let tabName = ["acPunishRankRewardTab1"];
		let view = this;
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWINVITE_GETPOWERREWARD, view.rewardCallback, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWINVITE_GETINVITEREWARD, view.rewardCallback, view);
        let isinviteTask = view.param.data.isinviteTask;
		let taskarr = view.updateArr(view.cfg.inviteTask);
        let powerTaskarr = view.updateArr2(view.cfg.powerTask);
		//排名列表
		let obj = isinviteTask ? taskarr : powerTaskarr;

        let list = ComponentManager.getScrollList(NewInviteRewardItem, obj, new egret.Rectangle(0,0,515,616));
		view.addChildToContainer(list);
		view._list = list;
		list.setPosition(57,10);

        // view.update();
    }

    private updateArr(arr : Config.InviteTaskCfg[]):any[]{
		let view = this;
		let vo = view.api; 
		if(!vo){
			return;
		}
		let arr1=[];
		let arr2=[];
		let arr3=[];
		
		let rechareTotal = vo.getInviteFriendNum();
		for(let i:number= 0;i < arr.length; i++)
		{
			if(vo.isGetInviteFriendTask(arr[i].id)){//
				arr1.push({
                    data : arr[i],
                    type : `invite`
                });
			}
			else{
				if(rechareTotal >= arr[i].value)
				{
					arr2.push({
                        data : arr[i],
                        type : `invite`
                    });
				}
				else
				{
					arr3.push({
                        data : arr[i],
                        type : `invite`
                    });
				} 
			}
		}
		arr1.sort((a,b)=>{
			return b.id - a.id;
		});
		return arr2.concat(arr3).concat(arr1); 
	}

	private updateArr2(arr : Config.InvitePowerTaskCfg[]):any[]{
		let view = this;
		let vo = view.api; 
		if(!vo){
			return;
		}
		let arr1=[];
		let arr2=[];
		let arr3=[];
	
		for(let i:number= 0;i < arr.length; i++)
		{
			let rechareTotal = vo.getInvitePowerNum(arr[i].needPower);
			if(vo.isGetInvitePowerTask(arr[i].id)){//
				arr1.push({
                    data : arr[i],
                    type : `power`
                });
			}
			else{
				if(rechareTotal >= arr[i].value)
				{
					arr2.push({
                        data : arr[i],
                        type : `power`
                    });
				}
				else
				{
					arr3.push({
                        data : arr[i],
                        type : `power`
                    });
				} 
			}
		}
		arr1.sort((a,b)=>{
			return b.id - a.id;
		});
		return arr2.concat(arr3).concat(arr1); 
	}

	private rewardCallback(evt : egret.Event):void{		
		let view = this;
		if(evt.data.ret){
			let rData = evt.data.data.data;
			let rewards = rData.rewards;
			let rewardList =  GameData.formatRewardItem(rewards);
			let pos = view.api.lastpos;
			App.CommonUtil.playRewardFlyAction(rewardList,pos);
			view.update();
        }
	}

	private update():void{
		let view = this;
		let taskarr = view.updateArr(view.cfg.inviteTask);
        let powerTaskarr = view.updateArr2(view.cfg.powerTask);
        let isinviteTask = view.param.data.isinviteTask;

		//排名列表
		let obj = isinviteTask ? taskarr : powerTaskarr;
		view._list.refreshData(obj, true);
	}

	protected getTitleStr():string{
		return `acNewYearPopupViewTitle`;
    }

	public dispose():void{
        let view = this;
        view._list = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWINVITE_GETINVITEREWARD, view.rewardCallback, view);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWINVITE_GETPOWERREWARD, view.rewardCallback, view);
		super.dispose();
	}
}