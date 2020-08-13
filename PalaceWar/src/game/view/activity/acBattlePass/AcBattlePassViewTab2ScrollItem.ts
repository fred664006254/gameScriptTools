/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 励精图治 任务itemrender
 */
class AcBattlePassViewTab2ScrollItem  extends ScrollListItem
{
	private _data = null; 
	private _btn = null;

	public constructor(){
		super();
	}
	public getSpaceY():number {
		return 5;
	}
    private get cfg() : Config.AcCfg.BattlePassCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_BATTLEPASS, this._code);
    }

    private get vo() : AcBattlePassVo{
        return <AcBattlePassVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS, this._code);
	}
	
	private get acTivityId() : string{
        return `${AcConst.AID_BATTLEPASS}-${this._code}`;
	}

	private get uiCode():string{
		let baseview : any = ViewController.getInstance().getView('AcBattlePassView');
		let code = baseview.getUiCode();
		return code;
	}
	
	private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any){	
        let view = this;
        view._code = itemparam;
		view.width = 610;
		view.height = 147 + 5;
		view._data = data;

		let code = view.uiCode;

		let bgstr = this.vo.isNewUi() ? "public_popupscrollitembg" : "public_9_bg14";
		let bg = BaseBitmap.create(bgstr);
		bg.width = view.width;
		bg.height = view.height - 5;
		view.addChild(bg);

		let winimgStr = this.vo.isNewUi() ? "battlepassprobggreen" : "battlepassgreen";
		let loseimgStr = this.vo.isNewUi() ? "shopview_itemtitle" : "alliance_taskAttrbg1";		

		let topbg = BaseBitmap.create(winimgStr);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, topbg, bg, [0,3]);
		view.addChild(topbg);
		//随机任务
		/*--普通任务 - 随机任务
        --questType:任务类型
        --sortId:排序
        --value:任务参数
        --times:任务可完成次数，一轮
        --turn:X轮及X轮以后才可随机到该任务
        --right:任务随机权重
        --openType:任务跳转
		--expGet:获得经验值*/
		let param = '';
		if(data.questType == `1028`){
			let cfg = Config.SearchCfg.getPersonItemCfgByPersonId(data.value2);
			if(cfg && cfg.name){
				param = cfg.name;
			}
		}

		let str = App.CommonUtil.getCnByCode(`taskDesc${data.questType}`, code);
		let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal(str, [data.value, param]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, titleTxt, topbg, [10,0]);
		view.addChild(titleTxt);

		topbg.width = titleTxt.width + 60;
		if (this.vo.isNewUi() && (!PlatformManager.checkIsEnLang()) && (!PlatformManager.checkIsThSp()) && (!PlatformManager.checkIsRuLang())){
			topbg.width = 300;
		}

		let expbg = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepassexpbg`, code));
		if(this.vo.isNewUi())
		{
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, expbg, topbg, [20, topbg.height + 25]);
		}else
		{
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, expbg, topbg, [20, topbg.height + 10]);
		}
		view.addChild(expbg);

		let numbg = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepassfntbg`, code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, numbg, expbg, [0,-10]);
        view.addChild(numbg);

        let fntBmp = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepasslevelfnt`, code));
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fntBmp, numbg);
		view.addChild(fntBmp);

		let expTxt = ComponentManager.getTextField(`${data.expGet}`, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, expTxt, expbg);
		view.addChild(expTxt);

		let taskNum = view.vo.getTaskValue(data.questType, data.round); 
		let finishNum = view.vo.getTaskFinishNum(data.questType, data.round); 
		let isTaskFinish = finishNum >= data.times;

		if(data.times == 1){
			let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTaskTip1`, code), [data.times]), 22, TextFieldConst.COLOR_BLACK);
			if(this.vo.isNewUi())
			{
				tipTxt.setColor(TextFieldConst.COLOR_BROWN2);
			}
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, bg, [190,80]);
			view.addChild(tipTxt);
		}
		else{
			let progressbar = ComponentManager.getProgressBar(`progress5`,`progress3_bg`, 300);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, progressbar, bg, [130, 25]);
			view.addChild(progressbar);

			if(isTaskFinish){
				progressbar.setPercentage(1);
				progressbar.setText(LanguageManager.getlocal(`allianceTask_completeTip`));
			}
			else{
				progressbar.setPercentage(taskNum / data.value);
				progressbar.setText(`${taskNum}/${data.value}`);
			}
			let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTaskTip2`, code), [String(Math.max(0, data.times - finishNum))]), 22, TextFieldConst.COLOR_BLACK);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, progressbar, [0, -tipTxt.textHeight-5]);
			view.addChild(tipTxt);
		}

		if(isTaskFinish){
			let flag = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepasscollect2`, code));
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, flag, bg, [25,0]);
			view.addChild(flag);
			view._btn = flag;
		}
		else{
			if(taskNum >= data.value){
				let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `taskCollect`, view.collectHandler, view);
				App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, bg, [25,0]);
				view.addChild(btn);
				view._btn = btn;
			}
			else{
				topbg.setRes(loseimgStr);
				//是否过期
				let curRound = view.vo.getCurRound();
				if(curRound > data.round){
					let flag = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepasscollect1`, code));
					App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, flag, bg, [25,0]);
					view.addChild(flag);
					view._btn = flag;
				}
				else{
					let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, `allianceBtnGo`, view.collectHandler, view);
					App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, bg, [25,0]);
					view.addChild(btn);
					view._btn = btn;

					if(!view.vo.isInActivity()){
						App.DisplayUtil.changeToGray(btn)
					}
					else{
						App.DisplayUtil.changeToNormal(btn)
					}
				}	
			}
		}
	} 

	private collectHandler(evt:egret.TouchEvent):void{
		let view = this;
		let data = view._data;
		let taskNum = view.vo.getTaskValue(data.questType, data.round); 
		let finishNum = view.vo.getTaskFinishNum(data.questType, data.round); 
		let isTaskFinish = finishNum >= data.times;
		if(view.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
		}
		//是否过期
		if(taskNum >= data.value){	
			//发消息
			// if(!view.vo.isInActivity()){
			// 	App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			// 	return;
			// }
			view.vo.selIdx = view._index;
			NetManager.request(NetRequestConst.REQUEST_BATTLEPASS_TASKRWD,{
				activeId : view.acTivityId, 
				questType : data.questType, 
				taskType : 1,
				round : data.round
			});
		} 
		else{
			if(!view.vo.isInActivity()){
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}
			let curRound = view.vo.getCurRound();
			if(curRound > data.round){
				App.CommonUtil.showTip(LanguageManager.getlocal("mailOver"));
				return;
			}	
			if(data.questType==2){
				ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
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
        let rewardList =  GameData.formatRewardItem(rewards);
        let pos = view.localToGlobal(view._btn.x + 20, view._btn.y);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    }

	public dispose():void{
		let view = this;
		view._data = null;
		view._btn = null;
		super.dispose();
	}
}