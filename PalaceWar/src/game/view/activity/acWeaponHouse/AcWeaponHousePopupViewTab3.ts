/**
 * 活动奖励
 * author yangtao
 * date 2020.5.18
 * @class AcDrinkTeaRewardPopViewTab1
 */
class AcWeaponHousePopupViewTab3 extends AcCommonViewTab{
    public _scrollList:ScrollList = null;
    private _taskArr =null;
    public constructor(){
        super();
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WEAPONHOUSE_GETSCHEDULEALL, this.requestCallback, this);

        let rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 690;
        rewardBg.setPosition(25, 55);
        this.addChild(rewardBg);     

        let vo = this.vo;
		let dataList = this.getArr();
		dataList = this.updataArr(dataList);
        //let dataList = this.vo.getSortrechargeAllCfg();
        let rect =  new egret.Rectangle(0, 0, 530, 680);
        let scrollList = ComponentManager.getScrollList(AcWeaponHousePopupViewTab2ScrollItem, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(25, 60);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    }

    private requestCallback(event:egret.Event){
        let rData = event.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        let replacerewards = rData.replacerewards;      
        let rewards = rData.rewards;    
        let rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        this.refreshView();
    }

    private refreshView(event?:egret.Event):void{
        if (!this.vo){
            return;
        }
        //let dataList = this.vo.getSortrechargeAllCfg();
        //this._scrollList.refreshData(dataList, {aid:this.aid, code:this.code});
        this.update();
    }

	private get cfg():Config.AcCfg.WeaponHouseCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo():AcWeaponHouseVo{
        return <AcWeaponHouseVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
    private update() :void{
        if(!this.vo){
            return;
        }
        let taskArr = this.getArr(); 
        taskArr = this.updataArr(taskArr);
        this._taskArr = taskArr;
        this._scrollList.refreshData(taskArr,{aid:this.aid, code:this.code});
	}

    private getArr():any[]{
		let view = this;
		let arr = [];
		let task = view.cfg.scheduleAll;
		for(let i in task){
			let unit = task[i];
			let id = Number(i);
			for(let k in unit){
				let isget = view.vo.isGetTaskReward(id,Number(k)-1);
				let tmp = unit[k];
				tmp.id1 = id;
				tmp.id2 = k;
				if(isget && k=="5")
				{
					arr.push(tmp);
					break;
				}
				if(!isget){
					arr.push(tmp);
					break;
				}
			}
		}
		return arr;
	}

    private updataArr(arr:Array<any>=[]):Array<any>
	{
		let AcMayDayVo = this.vo; 
		if(!AcMayDayVo)
		{
			return;
		}
		let arr1=[];
		let arr2=[];
		let arr3=[];
		
		for(var i:number= 0;i<arr.length; i++)
		{
			let taskNum = AcMayDayVo.getTask(arr[i].id1,Number(arr[i].id2)-1); 
			if(this.vo.isGetTaskReward(arr[i].id1,Number(arr[i].id2)-1)){
				arr1.push(arr[i]);
			}
			else{
                if(arr[i].taskType == 1)
                {
                    if(taskNum>=arr[i].needNum)
                    {
                        arr2.push(arr[i]);
                    }
                    else
                    {
                        arr3.push(arr[i]);
                    } 
                }else{
                    if(taskNum>=arr[i].value2)
                    {
                        arr2.push(arr[i]);
                    }
                    else
                    {
                        arr3.push(arr[i]);
                    } 
                }

			}
		}
		return arr2.concat(arr3).concat(arr1); 
	} 

     public dispose(){
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WEAPONHOUSE_GETSCHEDULEALL, this.requestCallback, this);
        this._scrollList = null;
        super.dispose();
     }
}