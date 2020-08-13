/*
author : qinajun
desc : 每日任务
*/
class AcDechuanshidaiTaskViewTab1 extends AcCommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList = null; 
	private _taskArr = null;
	private _day = 1;
	private _dailyTaskTxt = null;
	private _dailyBtn = null;
	private _collectflag = null;
	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
	}
    private get cfg() : Config.AcCfg.DechuanshidaiCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDechuanshidaiVo{
        return <AcDechuanshidaiVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}
	
	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
	
	protected initView():void
	{	
		let view = this;
		// let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
		view.height = 660;
		view.width = 545;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_DAILYTASK),this.rewardCallBack,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_DAILYTOTALTASK),this.totalrewardCallBack,this);

		let code = view.getUiCode();
		let topbg = BaseBitmap.create(`dechuandetailbg-${code}`);
		view.addChild(topbg);
		topbg.x = 30;
		topbg.y = 55;

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acDechuanshidaitip7-${code}`), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChild(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, topbg, [0,12]);

		let reward = GameData.formatRewardItem(view.cfg.getDailyReward(view._day))[0];
		let icon = GameData.getItemIcon(reward, true);
		view.addChild(icon);
		icon.setScale(0.8);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, topbg, [50,45]);

		let daulyfinish = view.vo.getDayTaskFinish(view._day);
		let tasktotal = Object.keys(view.cfg.dailyTask[view._day - 1]).length;
		let dailyTxt = ComponentManager.getTextField(`<font color=${daulyfinish >= tasktotal ? 0x3e9b00 : 0xff3c3c}>${daulyfinish}</font>/${tasktotal}`, 20, TextFieldConst.COLOR_BLACK);
		view._dailyTaskTxt = dailyTxt;
		view.addChild(dailyTxt);

		let getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, ``, ()=>{
			if(this.vo.et < GameData.serverTime){
				App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
				return;
			}
			if(view._day > view.vo.getCurDays()){
				let time = App.DateUtil.getWeeTs(GameData.serverTime) + (view._day - view.vo.getCurDays()) * 3600 * 24 - GameData.serverTime;
				App.CommonUtil.showTip(LanguageManager.getlocal(`acDechuanshidaitip9-${code}`, [App.DateUtil.getFormatBySecond(time)]));
				return;
			}
			let finish = view.vo.getDayTaskFinish(view._day);
			if(finish < tasktotal){
				App.CommonUtil.showTip(LanguageManager.getlocal(`acDechuanshidaitip8-${code}`));
				return;
			}
			view.vo.lastday = view._day;
			NetManager.request(NetRequestConst.REQUEST_DECHUAN_DAILYTOTALTASK,{
				"activeId":view.acTivityId, 
				"diffday":view._day,
			});

		}, view);
		view._dailyBtn = getBtn;
		view.addChild(getBtn);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, getBtn, topbg, [35,25]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dailyTxt, getBtn, [0,-dailyTxt.textHeight-3]);
		getBtn.setGray(daulyfinish < tasktotal || view._day > view.vo.getCurDays());
		if(view._day > view.vo.getCurDays()){
			getBtn.setText(`acbattlenobegun`);
		}
		else{
			getBtn.setText(daulyfinish < tasktotal ? `acDechuanshidaitip10-${code}` : `taskCollect`);
		}

		let collectflag = BaseBitmap.create("collectflag");
		collectflag.scaleX=0.7; 
		collectflag.scaleY=0.7;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, collectflag, getBtn);
		collectflag.visible =false;
		view.addChild(collectflag);
		view._collectflag = collectflag;
		
		let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 545;
		Bg.height = 550;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, Bg, topbg, [0,topbg.height]);
        view.addChild(Bg);
        
        let vo = this.vo;
		let arr = view.getArr();//
 		let tmpRect =  new egret.Rectangle(0,0,530,Bg.height - 10);
		let scrollList = ComponentManager.getScrollList(AcDechuanshidaiTaskItem,arr,tmpRect,view.code);
        view._scrollList = scrollList;     
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, Bg, [0,5]);
        view.addChild(scrollList); 
		scrollList.bounces = false;

		if(view.vo.getDayTaskFinishReward(view._day)){
			view._collectflag.visible = true;
			view._dailyTaskTxt.visible = getBtn.visible = false;
		}
		else{
			view._collectflag.visible = false;
			view._dailyTaskTxt.visible = getBtn.visible = true;
		}
	}

	private getArr():any[]{
		let view = this;
		let arr = [];
		let day = view._day;
		let taskcfg = view.cfg.dailyTask[day - 1];
		for(let i in taskcfg){
			let unit = taskcfg[i];
			unit.day = day;
			arr.push(unit);
		}
		arr.sort((a,b)=>{
			return a.sortId - b.sortId;
		});
		let arr1=[];
		let arr2=[];
		let arr3=[];
		
		for(var i:number= 0;i<arr.length; i++)
		{
			let taskNum = view.vo.getTask(arr[i].questType, day); 
			if(view.vo.isGetTaskReward(arr[i].questType, day)){
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

	private rewardCallBack(evt : egret.Event):void{
		let view = this;
		if(view.vo.lastday != view._day){
			return;
		}
		let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		let rewards = rData.rewards;
		let cfg = view.cfg.recharge[view.vo.lastidx];
        let str = rewards;
		let rewardList =  GameData.formatRewardItem(str);
		let pos = this.vo.lastpos;
		App.CommonUtil.playRewardFlyAction(rewardList,pos);
		this.vo.lastidx = null;
	}

	private totalrewardCallBack(evt : egret.Event):void{
		let view = this;
		if(view.vo.lastday != view._day){
			return;
		}
		let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		let rewards = rData.rewards;
        let str = rewards;
		let rewardList =  GameData.formatRewardItem(str);
		let pos = new egret.Point(view._dailyBtn.x + 20, view._dailyBtn.y + 10);
		App.CommonUtil.playRewardFlyAction(rewardList,pos);
	}


	private update():void{
		let view = this;
		let code = view.getUiCode();
		if(!view.vo){
			return;
		}
		let arr = view.getArr()
		view._scrollList.refreshData(arr, view.code);

		let daulyfinish = view.vo.getDayTaskFinish(view._day);
		let tasktotal = Object.keys(view.cfg.dailyTask[view._day - 1]).length;
		view._dailyTaskTxt.text = `<font color=${daulyfinish >= tasktotal ? 0x3e9b00 : 0xff3c3c}>${daulyfinish}</font>/${tasktotal}`;

		let getBtn = view._dailyBtn;
		if(daulyfinish >= tasktotal){
			getBtn.setGray(false);
		}
		else{
			getBtn.setGray(daulyfinish < tasktotal || view._day != view.vo.getCurDays());
		}
		
		if(view._day > view.vo.getCurDays()){
			getBtn.setText(`acbattlenobegun`);
		}
		else{
			getBtn.setText(daulyfinish < tasktotal ? `acDechuanshidaitip10-${code}` : `taskCollect`);
		}

		if(view.vo.getDayTaskFinishReward(view._day)){
			view._collectflag.visible = true;
			view._dailyTaskTxt.visible = getBtn.visible = false;
		}
		else{
			view._collectflag.visible = false;
			view._dailyTaskTxt.visible = getBtn.visible = true;
		}
			
	}

	public dispose():void
	{	
		let view = this;
		this._scrollList =null;
		view._dailyBtn = null;
		view._dailyTaskTxt = null;
		view._collectflag = null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_DAILYTASK),this.rewardCallBack,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_DAILYTOTALTASK),this.totalrewardCallBack,this);
		
		super.dispose();
	}
}