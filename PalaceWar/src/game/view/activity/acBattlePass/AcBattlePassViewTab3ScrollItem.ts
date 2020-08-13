/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 令牌兑换itemrender
 */
class AcBattlePassViewTab3ScrollItem  extends ScrollListItem
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

		let bgstr = this.vo.isNewUi() ? "public_popupscrollitembg" : "public_9_bg66";
		let bg = BaseBitmap.create(bgstr);
		bg.width = view.width;
		bg.height = view.height - 5;
		view.addChild(bg);

		let winimgStr = this.vo.isNewUi() ? "battlepassprobggreen" : "battlepassgreen";
		let loseimgStr = this.vo.isNewUi() ? "shopview_itemtitle" : "alliance_taskAttrbg1";

		let topbg = BaseBitmap.create(winimgStr);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, topbg, bg, [0,3]);
		view.addChild(topbg);

		let kuangbg = BaseBitmap.create(`public_9_bg67`);
		kuangbg.width = view.width;
		kuangbg.height = view.height - 4;
		view.addChild(kuangbg);
		if(this.vo.isNewUi())
		{
			kuangbg.visible = false;
		}
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

		let str = `taskDesc${data.questType}`;
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

		let taskNum = view.vo.getSpecialTaskValue(data.questType); 
		let finishNum = view.vo.getSpecialTaskFinishNum(data.questType); 
		let isTaskFinish = finishNum >= data.times;

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

		if(isTaskFinish){
			let flag = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepasscollect2`, code));
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, flag, bg, [25,0]);
			view.addChild(flag);
			view._btn = flag;
		}
		else{
			//是否过期
			if(view.vo.isEnd){
				topbg.setRes(loseimgStr);
				let flag = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepasscollect`, code));
				App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, flag, bg, [25,0]);
				view.addChild(flag);
				view._btn = flag;
			}
			else{
				let btnStr = ``;
				let btnPic = ButtonConst.BTN_SMALL_YELLOW;
				if(taskNum >= data.value){
					btnStr = `taskCollect`;
				}
				else{
					btnPic = ButtonConst.BTN_SMALL_RED;
					topbg.setRes(loseimgStr);
					btnStr = `allianceBtnGo`;
				}
				let btn = ComponentManager.getButton(btnPic, btnStr, view.collectHandler, view);
				App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, bg, [25,0]);
				view.addChild(btn);
				view._btn = btn;

				if(!view.vo.isInActivity()){
					if(taskNum >= data.value){
						App.DisplayUtil.changeToNormal(btn);
					}
					else{
						App.DisplayUtil.changeToGray(btn)
					}
				}
				else{
					App.DisplayUtil.changeToNormal(btn)
				}
			}
		}
	} 

	private collectHandler(evt:egret.TouchEvent):void{
		let view = this;
		let data = view._data;
		let taskNum = view.vo.getSpecialTaskValue(data.questType); 
		let finishNum = view.vo.getSpecialTaskFinishNum(data.questType); 
		let isTaskFinish = finishNum >= data.times;
		if(view.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
		}
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
				taskType : 2
			});
		} 
		else{	
			//是否过期
			if(!view.vo.isInActivity()){
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
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
		view._btn = null;
		view._data = null;
		super.dispose();
	}
}