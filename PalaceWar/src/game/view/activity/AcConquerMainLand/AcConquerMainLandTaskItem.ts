/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 劳动活动 任务itemrender
 */
class AcConquerMainLandTaskItem  extends ScrollListItem{
	private _btn : any = null;
	private _data : any = null;
	public constructor(){
		super();
	}

	private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_CONQUERMAINLAND;
    }

    private get code() : string{
        return this._code;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }
    
	private _code : string = '';
	
	protected initItem(index:number,data:any,itemparam:any)
    {	
		let view = this;
		view._data = data;
        view._code = itemparam;
		view.width = 606;
		view.height = 205 + 10;

		let code = view.getUiCode();

		let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg14");  
		wordsBg.width  = view.width;
		wordsBg.height = view.height - 10; 
		view.addChild(wordsBg); 

		let bottom2:BaseBitmap = BaseBitmap.create("activity_charge_red");  
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bottom2, wordsBg, [0,2]);
		view.addChild(bottom2);  

		let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal(`taskDesc${data.questType}`, [App.StringUtil.changeIntToText(Number(data.value))]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, titleTxt, bottom2, [10,0]);
		view.addChild(titleTxt);
		bottom2.width = titleTxt.textWidth + 60;

		let listbg = BaseBitmap.create(`public_9_managebg`);
        listbg.width = 445;
        listbg.height = 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, listbg, wordsBg, [10, 55]);
        view.addChild(listbg);
		
		let str = `1016_0_${data.specialReward}_${view.getUiCode()}`;
		if(this.vo.checkIsJJL)
		{
			str = `1059_0_${data.specialGift}_${view.getUiCode()}`;
		}
		let iconList: BaseDisplayObjectContainer[] = GameData.getRewardItemIcons(str,true);
		if(iconList&&iconList.length>0) {
			//额外赠送ICON
			let startX: number = listbg.x + 7;
			let startY: number = listbg.y + 7;
			let l: number = iconList.length;
			for (let i: number = 0; i < l; i++) {
				let icon: BaseDisplayObjectContainer = iconList[i]; 
				icon.setScale(0.8);
				icon.setPosition(startX + i * (icon.width*icon.scaleX + 5), startY);
				view.addChild(icon); 
			}
		}

		let taskNum = view.vo.getTaskValue(data.questType); 
		let isLq = view.vo.getTaskLq(data.sortId);
		let progressbar = ComponentManager.getProgressBar(`progress3`,`progress3_bg`, 460);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, progressbar, wordsBg, [10, 10]);
		view.addChild(progressbar);
		if(isLq){
			progressbar.setPercentage(1);
			progressbar.setText(LanguageManager.getlocal(`allianceTask_completeTip`));

			let flag = BaseBitmap.create(`collectflag`);
			flag.setScale(0.8);
			view.addChild(flag);
			view._btn = flag;
		}
		else{
			progressbar.setPercentage(taskNum / data.value);
			progressbar.setText(`${taskNum}/${data.value}`);
			if(taskNum >= data.value){
				let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `taskCollect`, view.collectHandler, view);
				view.addChild(btn);
				view._btn = btn;
			}
			else{
				let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `allianceBtnGo`, view.collectHandler, view);
				view.addChild(btn);
				view._btn = btn;
			}
			if(!view.vo.isInActivity()){
				App.DisplayUtil.changeToGray(view._btn);
			}
			else{
				App.DisplayUtil.changeToNormal(view._btn);
			}	
		}
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._btn, listbg, [listbg.width + 4, 0]);
	} 

	private collectHandler(evt:egret.TouchEvent):void{
		let view = this;
		let data = view._data;
		let taskNum = view.vo.getTaskValue(data.questType); 
		let isLq = view.vo.getTaskLq(data.sortId);
		if(view.vo.getCurPeriod() == 1){
            App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNotStart-1`));
            return
        }
		if(!view.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal(`acPunishEnd`));
            return;
		}

		if(!view.vo.isCanJoin()){
			App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip23-${view.getUiCode()}`));
			return
		}

		if(taskNum >= data.value){	
			view.vo.selIdx = view._index;
			NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETTASKRWD,{
				activeId : view.acTivityId, 
				taskNum : data.sortId, 
			});
		} 
		else{
			if(!view.vo.isInActivity()){
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}
			if(!data.openType){
				return; 
			}
			App.CommonUtil.goTaskView(data.openType);
		}   
	}

	public refreshItem(rewards : string):void{
        let view = this;
        let rewardList = GameData.formatRewardItem(rewards);
        let pos = view.localToGlobal(view._btn.x + 20, view._btn.y);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    }
   

	public getSpaceY():number
	{
		return 0;
	}
	
	public dispose():void
    {
		let view = this;
		view._btn = null;
		view._data = null;
		super.dispose();
	}
}