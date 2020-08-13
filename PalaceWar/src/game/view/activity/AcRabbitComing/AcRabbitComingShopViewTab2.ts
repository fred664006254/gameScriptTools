/*
author : qinajun
desc : 任务奖励
*/
class AcRabbitComingShopViewTab2 extends CommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList = null; 
	private _haveTxt : BaseTextField = null;

	public constructor(data) {
		super();
		this.param = data;
		this.initView();
	}
	private get cfg() : Config.AcCfg.RabbitComingCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcRabbitComingVo{
        return <AcRabbitComingVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    private get aid() : string{
        return `${this.param.data.aid}`;
    }

    private get code() : string{
        return `${this.param.data.code}`;
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
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RABBIT_BUY),this.buyCallBack,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RABBIT_TASK),this.rewardCallBack,this);
		let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 530;
		Bg.height = 650;
        Bg.x = 25;
        Bg.y = 55;
		view.addChild(Bg);
		
		let code = view.getUiCode();
		let topbg = BaseBitmap.create(App.CommonUtil.getResByCode(`rabittaskrewardbg`, code));
		view.addChild(topbg);
		topbg.width = 532;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, Bg, [0,3]);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acrabbitcomingtip5`, code), [view.vo.getChoclateNum().toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChild(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, topbg, [20,12]);
		view._haveTxt = tipTxt;

		let reward = GameData.formatRewardItem(`1050_1_0`)[0];
		let icon = GameData.getItemIcon(reward, true);
		view.addChild(icon);
		icon.setScale(0.8);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, topbg, [20,40]);

		let dailyTxt = ComponentManager.getTextField(reward.desc, 20, TextFieldConst.COLOR_BLACK);
		dailyTxt.width = 255;
		dailyTxt.lineSpacing = 5;
		view.addChild(dailyTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, dailyTxt, icon, [icon.width*icon.scaleX+10,0]);

		let gemIcon = BaseBitmap.create("public_icon1");
		gemIcon.scaleX = 40/gemIcon.width;
        gemIcon.scaleY = 40/gemIcon.height;
		view.addChild(gemIcon);

		let gemTxt = ComponentManager.getTextField(view.cfg.cost.toString(),TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
		view.addChild(gemTxt); 
		
		let getBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `acPunishBuyItemBuy`, ()=>{
			if(!view.vo.isInActivity()){
				App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
				return;
			}
			let playerNum = Api.playerVoApi.getPlayerGem();
			ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMSLIDERPOPUPVIEW,
			{
				"confirmCallback": (data)=>{
					if (Api.playerVoApi.getPlayerGem() < (view.cfg.cost * data)){
						//确认弹框
						ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
							msg : LanguageManager.getlocal(`acConquerMainLandTip19-1`),
							touchMaskClose : true,
							title : `itemUseConstPopupViewTitle`,
							callback : ()=>{
								if(view.vo.isInActivity()){
									//充值
									ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
								}	
							},
							handle : view,
							needClose : 1,
							needCancel : true,
							confirmTxt : `gotocharge`,
							recommand : false
						});
						return;
					}
					NetManager.request(NetRequestConst.REQUEST_RABBIT_BUY, { 
						activeId : view.vo.aidAndCode, 
						num : data
			        });
				},	//确认回调函数
				"maxNum":100,//Math.floor(playerNum/this.cfg.cost),								//物品的限制数量
				"shopItemCost":this.cfg.cost,			//物品的价格
				"shopItemName":reward.name,				//物品的名字
				"handler": this,									//target
				"playerNum":playerNum,								//当前的拥有的元宝数
				"id":1,												//消耗物品的id
			}
			);

			// ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			// 	msg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acrabbitcomingtip14`, code), [view.cfg.cost.toString()]),
			// 	title : `itemUseConstPopupViewTitle`,
			// 	touchMaskClose : true,
			// 	callback : ()=>{          
			//         NetManager.request(NetRequestConst.REQUEST_RABBIT_BUY, { 
			//             activeId : view.vo.aidAndCode, 
			//         });
			// 	},
			// 	handle : view,
			// 	needClose : 1,
			// 	needCancel : true
			// });  
		}, view);
		view.addChild(getBtn);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, getBtn, topbg, [20,20]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, gemIcon, getBtn, [23,-gemIcon.height+8]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemTxt, gemIcon, [gemIcon.width-5,0]);

        
        let vo = this.vo;
		let arr = view.getArr();//
 		let tmpRect =  new egret.Rectangle(0,0,530,Bg.height - topbg.height - 10);
		let scrollList = ComponentManager.getScrollList(AcRabbitComingShopTaskItem,arr,tmpRect,view.code);
        view._scrollList = scrollList;     
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, topbg, [0,topbg.height + 2]);
        view.addChild(scrollList); 
		scrollList.bounces = false;
	}

	private getArr():any[]{
		let view = this;
		let arr : Config.AcCfg.RabbitComingTaskItemCfg[] = view.vo.getArr("task");//
		let arr1=[];
		let arr2=[];
		let arr3=[];
		
		for(let i:number= 0;i<arr.length; i++)
		{
			let taskNum = view.vo.getTask(arr[i].id); 
			if(view.vo.isGetTaskReward(arr[i].id)){
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

	private buyCallBack(evt : egret.Event):void{
		let view = this;
        if(evt.data.ret){
			App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acrabbitcomingtip15`, view.getUiCode())));
        }
	}


	private update():void{
		let view = this;
		let code = view.getUiCode();
		if(!view.vo){
			return;
		}
		view._haveTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acrabbitcomingtip5`, code), [view.vo.getChoclateNum().toString()]);
		let arr = view.getArr()
		view._scrollList.refreshData(arr, view.code);
	}

	private rewardCallBack(evt : egret.Event):void{
		let view = this;
		let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		let rewards = rData.rewards;
		if(rData.replacerewards)
		{
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards});
		}
		let cfg = view.cfg.task[view.vo.lastidx];
		let str = rewards;
		if(cfg.specialGift){
			str = `1050_1_${cfg.specialGift}|${str}`;
		}
		let rewardList =  GameData.formatRewardItem(str);
		let pos = this.vo.lastpos;
		App.CommonUtil.playRewardFlyAction(rewardList,pos);
		this.vo.lastidx = null;
	}

	public dispose():void
	{	
		let view = this;
		this._scrollList =null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RABBIT_BUY),this.buyCallBack,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RABBIT_TASK),this.rewardCallBack,this);
		
		super.dispose();
	}
}