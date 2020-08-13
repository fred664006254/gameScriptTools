/**
 *新邀请好友奖励预览
 * author qianjun
 */
class PlayerComeBackRewardPopupView extends PopupView{ 
    private _list : ScrollList = null;

	public constructor(){
		super();
    }

    private get api(){
		return Api.newrebackVoApi;
	}

	private get cfg(){
		return Config.PlayercomebackCfg;
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

	protected getBgExtraHeight():number
	{
		return 20;
	}

	public initView():void{		
		// let tabName = ["acPunishRankRewardTab1"];
		let view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_REBACK_GETINVITEREWARD, view.rewardCallback, view);
        let isinviteTask = view.param.data.isinviteTask;
		let taskarr = view.updateArr(view.cfg.comeReward);
		//排名列表
		let obj = taskarr;

        let list = ComponentManager.getScrollList(PlayerComeBackRewardItem, obj, new egret.Rectangle(0,0,515,616));
		view.addChildToContainer(list);
		view._list = list;
		list.setPosition(57,10);

        // view.update();
    }

    private updateArr(arr : Config.ComebackTaskCfg[]):any[]{
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
				if(rechareTotal >= arr[i].needGem)
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
		let taskarr = view.updateArr(view.cfg.comeReward);
        let isinviteTask = view.param.data.isinviteTask;

		//排名列表
		let obj = taskarr;
		view._list.refreshData(obj, true);
	}

	protected getTitleStr():string{
		return `acNewYearPopupViewTitle`;
    }

	public dispose():void{
        let view = this;
        view._list = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_REBACK_GETINVITEREWARD, view.rewardCallback, view);
		super.dispose();
	}
}