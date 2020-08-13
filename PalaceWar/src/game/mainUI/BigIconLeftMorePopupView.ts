/**
 * 三国加入确认面板
 * author qianjun
 * date 2017/11/24
 * @class ConfirmPopupView
 * 参数 ：title,msg,callback,handler  needCancel
 * 
 */
class BigIconLeftMorePopupView extends PopupView{

	//左侧icon list
	private _leftIconList:BaseDisplayObjectContainer[] = [];
	private _leftIconMsgList = [];
	private _leftIconMsgListBak = [];
	private _stop : boolean = false;
	private _leftIconArrowContainer:BaseDisplayObjectContainer = null;

	public constructor(){
		super();
    }
    
    protected getBgName():string{
		return `public_lefticonbg`;
	}

	protected getCloseBtnName():string{
		return null;//`popupview_closebtn2`;
	}

	private _callback = null;

	protected initBg():void{
		let view = this;
		let tmpY = view.param.data.posY;
		super.initBg();
		view._leftIconArrowContainer = new BaseDisplayObjectContainer();
		view._leftIconArrowContainer.width = 67;
		view._leftIconArrowContainer.height = 54;
		view._leftIconArrowContainer.anchorOffsetX = this._leftIconArrowContainer.width / 2;
		view._leftIconArrowContainer.x = 50;
		view._leftIconArrowContainer.y = tmpY;
		view._leftIconArrowContainer.scaleX = 1;
		view.addChild(view._leftIconArrowContainer);

		let arrow = BaseBitmap.create(`public_lefticonarrow`);
		view._leftIconArrowContainer.addChild(arrow);

		let eff = ComponentManager.getCustomMovieClip(`lefticonarrow`, 10);
		eff.width = 67;
		eff.height = 54;
		eff.playWithTime(-1);
		view._leftIconArrowContainer.addChild(eff);

		view._leftIconArrowContainer.addTouchTap(()=>{
			//打开弹窗
			view._leftIconArrowContainer.alpha = 0;
			view.hide();
		}, view, null); 
	}
	// 打开该面板时，需要传参数msg
	public initView():void{
		let view = this;
		let arr = Config.BigiconCfg.getBigIcon();
		let maxlen =  Config.BigiconCfg.getMaxIconLength();
		view.viewBg.height = 173 + (Math.ceil((arr.length - maxlen) / 3) - 1) * 110;
		if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsRuLang){
			view.viewBg.height = 193 + (Math.ceil((arr.length - maxlen) / 3) - 1) * 130;
		}
	}

	protected resetBgSize():void{
		let view = this;
		let tmpY = view.param.data.posY;
		super.resetBgSize();
		let arr = Config.BigiconCfg.getBigIcon();
		let maxlen =  Config.BigiconCfg.getMaxIconLength();
		let pow =  Math.ceil((arr.length - maxlen) / 3);
		view.viewBg.x = 110;
		view.viewBg.y = tmpY - 35 - (pow - 1) * 115;
		view.container.x = view.viewBg.x;
		view.container.y = view.viewBg.y;
		view.sortLeftIcon();
		view.initLeftIcon();
		view.checkLeftRedpoint();
		view.setLeftIconPos();
		view.viewBg.x = -view.viewBg.width;
		view.container.x = -view.viewBg.width;

		view._leftIconArrowContainer.alpha = 0;
		let speed = 1.5;
		view._stop = true;
		egret.Tween.get(view.viewBg).to({x : 110}, (view.viewBg.width+110) / speed).call(()=>{
			egret.Tween.removeTweens(view.viewBg);
			view._leftIconArrowContainer.alpha = 1;
		},view);
		egret.Tween.get(view.container).to({x : 110}, (view.viewBg.width+110) / speed).call(()=>{
			egret.Tween.removeTweens(view.container);
			view._stop = false;
		},view);
	}


	public tick():void{
		this.sortLeftIcon();
		this.initLeftIcon();
		this.checkLeftRedpoint();
		this.setLeftIconPos();
		if(GameData.checkTimeLimitWife())
		{
			let container = <BaseDisplayObjectContainer>this.container.getChildByName("timelimitwife_");
			if(container)
			{
				let vo = Api.shopVoApi.getPayInfoById2("g16");
				let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
				let str =  App.DateUtil.getFormatBySecond(vo.st + cfg.lastTime  - GameData.serverTime,1);
				let timeTF =  <BaseTextField>container.getChildByName("timelimitwife_TF");
				if(timeTF)
				{
					timeTF.text = str;
				}
			}	
		}
		else
		{
			this.removeLeftIcon("timelimitwife");
		}
	}

	private sortLeftIcon():void{
		let iconStr = null;
		let iconMsg = null;
		this._leftIconMsgListBak = this._leftIconMsgList;
		this._leftIconMsgList = [];
		let arr = Config.BigiconCfg.getBigIcon();
		let maxlen =  Config.BigiconCfg.getMaxIconLength();
		for(let i = maxlen; i < arr.length; ++ i){
			if(arr[i]){
				this._leftIconMsgList.push(arr[i]);
			}
		}
	}

	//初始化左侧icon栏
	private initLeftIcon(init : boolean = false):void{	
		let l = this._leftIconMsgList.length;
		let lBak = this._leftIconMsgListBak.length;
		let change = false;
		//remove icon
		for(let j = lBak-1;j>=0;j--){
			let isdelete = true;
			for(let i = l-1; i >=0; i --){
				if((this._leftIconMsgList[i].activity+this._leftIconMsgList[i].type) == (this._leftIconMsgListBak[j].activity+this._leftIconMsgListBak[j].type))
				{
					isdelete = false;
				}
			}
			if(isdelete){
				change = true;
				this.removeLeftIcon(this._leftIconMsgListBak[j].activity);
			}
		}

		//add icon
		for(let i = 0; i < l; i ++){
			let isadd = true;
			if(this._leftIconMsgList[i].activity == `battlePass` && Number(this._leftIconMsgList[i].type) == 4){
				continue;
			}
			if(this._leftIconMsgList[i].activity == `timelimitwife` && !GameData.checkTimeLimitWife()){
				continue;
			}
			for(let j = 0; j < lBak; j++){
				if((this._leftIconMsgList[i].activity+this._leftIconMsgList[i].type) == (this._leftIconMsgListBak[j].activity+this._leftIconMsgListBak[j].type))
				{
					isadd = false;
				}
			}
			if(isadd){
				change = true;
				this.createLeftIcon(this._leftIconMsgList[i]);
			}
		}

		for(let i in this._leftIconList){
			let name = this._leftIconList[i].name.split(`_`)[0];
			let isdelete = true;
			for(let j in this._leftIconMsgList){
				if(this._leftIconMsgList[j].activity == name){
					isdelete = false;
					break;
				}
			}
			if(isdelete){
				this.removeLeftIcon(this._leftIconList[i].name, true);
			}
		}
	}

	private createLeftIcon(iconMsg):BaseDisplayObjectContainer
	{
		let modelName = iconMsg.activity;
		let type = iconMsg.type;
		for(let i in this._leftIconList){
			if(this._leftIconList[i].name && this._leftIconList[i].name == (modelName + `_` + type)){
				return;
			}
		}

		let iconContainer : BaseDisplayObjectContainer;
		let ismainui = iconMsg.ismainui && iconMsg.ismainui == 1;
		//主页面图标
		if(ismainui){
			let str = null;
			if(modelName == `timelimitwife`){
				let vo = Api.shopVoApi.getPayInfoById2("g16");
				let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
				str =  App.DateUtil.getFormatBySecond(vo.st + cfg.lastTime - GameData.serverTime,1);
			}

			iconContainer = App.CommonUtil.createMainUIIcon(iconMsg.activity.toLowerCase()+"_icon",iconMsg.activity.toLowerCase()+"_icon_name",true,0,{
				aid : modelName.toLowerCase(),
				type : type + ``
			},str);
			iconContainer.addTouchTap(()=>{
				//引导过程种不响应
				if(Api.rookieVoApi.isGuiding){
					return;
				}
				let viewName:string=App.StringUtil.firstCharToUper(modelName)+"View";
				let popupViewName:string=App.StringUtil.firstCharToUper(modelName)+"PopupView";
				let param = null;
				if(egret.hasDefinition(viewName)==false&&egret.hasDefinition(popupViewName))
				{
					viewName=popupViewName;
				}
				if(modelName=="rechargeVip")
				{
					viewName+="|1";
				}
				else if(modelName=="firstrecharge")
				{
					if(Api.switchVoApi.checkWeChatFirstcharge())
					{
						viewName=ViewConst.POPUP.FIRSTRECHARGEVIEW;
					}
					else
					{
						viewName=ViewConst.COMMON.WELFAREVIEWFIRSTRECHARGE;
					} 
				}
				else if(modelName=="monthcard")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWMONTHCARD;
				}
				else if(modelName=="yearcard")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWYEARCARD;
				}
				else if(modelName=="candyget")
				{
					viewName=ViewConst.POPUP.CANDYGETPOPUPVIEW;
				}
				else if(modelName=="newcharge")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWRECHARGEBOX;
				}
				else if(modelName=="sign2"||modelName=="sign3"||modelName=="sign7"||modelName=="augustsign")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWSIGNIN;
				}
				else if(modelName=="rebate")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWREBATE;
				}
				else if(modelName=="rebate2")
				{
					viewName=ViewConst.COMMON.WELFAREVIEWREBATE2;
				}
				else if(modelName == "fqStrategy")
				{ 
					if(Api.switchVoApi.checkOpenStrengthen()&&Config.GameprojectCfg.closeFunction&&Api.playerVoApi.getPlayerLevel() < Config.GameprojectCfg.closeFunction) 
					{
						viewName = ViewConst.COMMON.FQSTRATEGYVIEWTAB3;
					}
					else
					{
						viewName = ViewConst.COMMON.FQSTRATEGYVIEW;
					}
				}
				else if(modelName == 'playerReturn'){
					viewName == ViewConst.COMMON.PLAYERRETURNVIEW;
				}
				else if(modelName == "timelimitwife"){
					viewName = ViewConst.POPUP.TIMELIMITWIFEVIEW;
				}
				else if(modelName == "limitedgift")
				{
					viewName=ViewConst.POPUP.LIMITEDGIFTVIEW;
				}
				else if(modelName=="wywegameqq")
				{
					viewName=ViewConst.POPUP.EGAMEQQPOPUPVIEW;
				}
				// else if(modelName == "strengthen")
				// {
				// 	viewName=ViewConst.POPUP.STRENGTHENPOPUPVIEW;
				// }
				else if (modelName == "welfare")
				{
					let firstRechargeflag = Api.shopVoApi.getPayFlag();
					if (firstRechargeflag == 0 && Api.rechargeVoApi.checkFirstRecharge() && !Api.switchVoApi.checkClosePay())
					{
						viewName=ViewConst.COMMON.WELFAREVIEWFIRSTRECHARGE;
					}
				}
				else if(modelName == "sevenDaysSignUp1" || modelName == "sevenDaysSignUp2" || modelName == "sevenDaysSignUp7")
				{
					viewName=ViewConst.COMMON.SEVENDAYSSIGNUPVIEW;
				}
				else if(modelName=="newCrossServerAtkRace")
				{
					viewName="AcNewCrossServerAtkRaceView";
				}
				//不要跟随着随意加if了，大部分都是无用的，尽量走规范
				ViewController.getInstance().openView(viewName);
			// window.open("https://www.baidu.com");
			},this);
		}
		//活动图标
		else{
			iconContainer = Api.acVoApi.getAcIconListByAid(iconMsg.activity, [], null, {
				aid : modelName,
				type : type + ``
			})[0];
		}
		iconContainer.name = modelName + `_` + type;
		this._leftIconList.push(iconContainer);
		this.addChildToContainer(iconContainer);
		return iconContainer;
	}

	private removeLeftIcon(modelName:string, isChildName : boolean = false):void
	{
		let l:number=this._leftIconList.length;
		let iconname = ``;
		if(isChildName){
			iconname = modelName;
		}
		else{
			for(let i of this._leftIconMsgList){
				if(i.activity == modelName){
					iconname = i.activity + "_" + i.type;
					break;
				}
			}
		}
		

		for(let i:number=l-1;i>=0;i--)
		{

			if(this._leftIconList[i].name && this._leftIconList[i].name == iconname)
			{
		
				this._leftIconList[i].dispose();
				this._leftIconList.splice(i,1);
				break;
			}
		}
	}

	private getLeftIcon(modelName:string):BaseDisplayObjectContainer
	{
		let iconname = ``;
		for(let i of this._leftIconMsgList){
			if(i.activity == modelName){
				iconname = i.activity + "_" + i.type;
				break;
			}
		}

		let l:number=this._leftIconList.length;
		let obj : BaseDisplayObjectContainer = null;
		for(let i:number=l-1;i>=0;i--)
		{

			if(this._leftIconList[i].name && this._leftIconList[i].name == iconname)
			{
				obj = this._leftIconList[i];
				break;
			}
		}
		return obj;
	}

	private checkLeftRedpoint():void{
		//活动部分 首冲月卡年卡在原有方法中处理
		let leftactlist = this._leftIconList;
		let leftred = false;
		for(let i in leftactlist){
			let unit = leftactlist[i].name;
			let aid = unit.split(`_`)[0];
			let type = unit.split(`_`)[1] ? unit.split(`_`)[1] : '';
			let vo : AcBaseVo = null;
			if(type == ``){
				if(aid == `battlePass`){
					let voList = Api.acVoApi.getActivityVoListByAid(aid);
					for(let i = 0; i < voList.length; ++ i){
						let acvo = voList[i];
						if(Number(acvo.code) != 4 && Number(acvo.code) != 7){
							vo = acvo;
							break;
						}
					}
				}
				else{
					vo = Api.acVoApi.getActivityVoByAidAndCode(aid);
				}
			}
			else{
				vo = Api.acVoApi.checkActivityStartByAidAndType(aid, type);
			}
			if(vo && vo.isStart && (vo.isShowRedDot == true)){//
				App.CommonUtil.addIconToBDOC(leftactlist[i]);
				leftred = true;
				let redpot = leftactlist[i].getChildByName(`reddot`);
				if(redpot){
					redpot.x = 90;
					redpot.y = 20;
				}
			}
			else{
				App.CommonUtil.removeIconFromBDOC(leftactlist[i]);
			}
		}

		if(leftred){
			App.CommonUtil.addIconToBDOC(this._leftIconArrowContainer);
			let redpot = this._leftIconArrowContainer.getChildByName(`reddot`);
			if(redpot){
				redpot.x = this._leftIconArrowContainer.scaleX == 1 ? 45 : 0;
				redpot.y = 0;
			}
		}
		else{
			App.CommonUtil.removeIconFromBDOC(this._leftIconArrowContainer);
		}
	}

	private setLeftIconPos():void{
		let view = this;
		let tmpY = this.param.data.posY;
		let arr = Config.BigiconCfg.getBigIcon();
		let maxlen =  Config.BigiconCfg.getMaxIconLength();
		let pow =  Math.ceil((arr.length - maxlen) / 3);
		view.viewBg.y = tmpY - 35 - (pow - 1) * 115;
		view.viewBg.height = 173 + (Math.ceil((arr.length - maxlen) / 3) - 1) * 110;
		if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsRuLang){
			view.viewBg.height = 193 + (Math.ceil((arr.length - maxlen) / 3) - 1) * 130;
		}
		view.container.y = view.viewBg.y;
		
		for(let i in this._leftIconMsgList){
			let unit = this._leftIconMsgList[i];
			let icon = <BaseDisplayObjectContainer>this.container.getChildByName(`${unit.activity}_${unit.type}`);
			if(icon){
				icon.x = 30 + (Number(i) % 3) * 135 + icon.anchorOffsetX;
				icon.y = tmpY - this.container.y - Math.floor(Number(i) / 3) * 117 + icon.anchorOffsetY - 15;
			}
		}
		if(view._leftIconMsgList.length == 0){
			view.hide();
		}
	}

	protected isTouchMaskClose():boolean{
		return true;
	}

    protected getTitleStr(){
        
        return null;
    }

	public hide(){		
		let view = this;
		if(view._stop){
			return;
		}
		let speed = 1.5;
		view._leftIconArrowContainer.alpha = 0;
		egret.Tween.get(view.viewBg).to({x : -view.viewBg.width}, (110+view.viewBg.width) / speed).call(()=>{
			egret.Tween.removeTweens(view.viewBg);
		},view);
		egret.Tween.get(view.container).to({x : -view.viewBg.width}, (110+view.viewBg.width) / speed).call(()=>{
			egret.Tween.removeTweens(view.container);
			if(this.param.data.callback){
				this.param.data.callback.apply(this.param.data.handler,[this]);
			}
			super.hide()
		},view);
	}

	//是否展示弹窗动效
	protected isShowOpenAni():boolean{
		return false;
	} 

	public dispose():void{
		//左侧icon list
		this._stop = false;
		this._leftIconList = [];
		this._leftIconMsgList = [];
		this._leftIconMsgListBak = [];
		this._leftIconArrowContainer.dispose();
		super.dispose();
	}
}