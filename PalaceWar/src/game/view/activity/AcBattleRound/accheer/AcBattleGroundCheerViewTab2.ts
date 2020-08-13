/**
 * 任务
 */
class AcBattleGroundCheerViewTab2 extends PopupViewTab{
	private _list : ScrollList = null;
	private _needSnedMsg : boolean = false;

    public constructor(data?) 
	{
		super();
		this.param = data;
		this.initView();
	}

	  protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }
	
	private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
	}
	
	public initView():void{
		let view = this;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreashView, view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEGROUND_TASK), this.christmasTaskRewardHandel, this)
		let baseview : any = ViewController.getInstance().getView('AcBattleGroundCheerView');
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;
		let code = view.getUiCode();

		let downottomBg = BaseBitmap.create(`battlegroundbottombg-${code}`);
		downottomBg.height = 85; 
		downottomBg.y = view.height - downottomBg.height;
		this.addChild(downottomBg); 
		
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`battlegroundcheertip15-${code}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		tipTxt.lineSpacing = 5;
		tipTxt.textAlign = egret.HorizontalAlign.CENTER;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, downottomBg);
		this.addChild(tipTxt); 

		let leftHorn = BaseBitmap.create(`battlehorn`); 
		leftHorn.x = downottomBg.x;
		leftHorn.y = downottomBg.y+downottomBg.height;  
        this.addChild(leftHorn);  
		
		let rightHorn = BaseBitmap.create(`battlehorn`); 
		rightHorn.scaleX =-1;
		rightHorn.x = downottomBg.width -rightHorn.width+22;
		rightHorn.y = leftHorn.y; 
        this.addChild(rightHorn);
		
		let taskData = this.cfg.audienceTask;
        let processCfg = [];
		for(let i in taskData){
			let unit = taskData[i];
			processCfg.push({
				value : unit.value,
				getReward : unit.getReward,
                id : Number(i),
                helpAdd : unit.helpAdd,
				isGet : view.vo.isGetTask(i),
				questType : unit.questType,
				openType : unit.openType
			});
		}
		let tmp = this.sortFunc(processCfg);
        let rect = new egret.Rectangle(0, 0, 620, downottomBg.y - 10);
        view._list = ComponentManager.getScrollList(AcBattlegroundChargeItem, tmp, rect, this.code);
		view.addChild(view._list);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._list, view);
	}

	private sortFunc(arr):any[]{
		let vo = this.vo; 
		if(!vo)
		{
			return;
		}
		let arr1=[];
		let arr2=[];
		let arr3=[];
		
		for(var i:number= 0;i<arr.length; i++)
		{
			let taskNum = vo.getTaskValue(arr[i].questType); 
			if(this.vo.isGetTask(arr[i].id)){
				arr1.push(arr[i]);
			}
			else{
				if(taskNum>=arr[i].value)
				{
					arr2.push(arr[i]);
				}
				else
				{
					arr3.push(arr[i]);
				} 
			}
		}
		return arr2.concat(arr3).concat(arr1); 
    }
    
    /**
     * 领奖回调
     */
    private christmasTaskRewardHandel(event: egret.Event) {
        let view = this;
        if (event.data.ret){
			view._needSnedMsg = true;
            // taskId
            let list: { icon: string, tipMessage: string, type: number }[] = [];
            let rechargeId = view.vo.selIdx;
			let starnum = view.cfg.audienceTask[rechargeId].helpAdd;

            let reward = `1020_0_${starnum}_${view.getUiCode()}|` + event.data.data.data.rewards;
            let rewardVo = GameData.formatRewardItem(reward);
            for (let key in rewardVo) {
                let item: { icon: string, tipMessage: string, type: number } = { icon: rewardVo[key].icon, tipMessage: rewardVo[key].tipMessage, type: rewardVo[key].type };
                list.push(item);
            }
            App.CommonUtil.playRewardFlyAction(list, view.vo.lastpos);
        }
    }

    private refreashView() {
        let view = this;
		let taskData = this.cfg.audienceTask;
        let processCfg = [];
		for(let i in taskData){
			let unit = taskData[i];
			processCfg.push({
				value : unit.value,
				getReward : unit.getReward,
                id : Number(i),
                helpAdd : unit.helpAdd,
				isGet : view.vo.isGetTask(i),
				questType : unit.questType,
				openType : unit.openType
			});
		}
		let tmp = this.sortFunc(processCfg);

        this._list.refreshData(tmp, this.code);
    }

    public dispose():void{
		let view = this;
		view._list = null;
		if(view._needSnedMsg){
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_BATTLEGROUND_MAPFRESH);
		}
		view._needSnedMsg = false;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreashView, view);
   		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEGROUND_TASK), this.christmasTaskRewardHandel, this)
		super.dispose();
   	}
}