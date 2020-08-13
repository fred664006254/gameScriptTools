/**
 * 防守消息
 */
class AcBattleGroundCheerViewTab1 extends PopupViewTab{
	private _btn : BaseButton = null;
	private _cheerTxt : BaseTextField = null;

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
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEGROUND_CHEER), view.prankCallback, view)

		let baseview : any = ViewController.getInstance().getView('AcBattleGroundCheerView');
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;
		let code = view.getUiCode();

		let bg = BaseBitmap.create("battle-purport");
		// bg.width=516;
		// bg.height=618;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
		view.addChild(bg);

		let tiptxt = ComponentManager.getTextField(LanguageManager.getlocal(`battlegroundcheertip-${code}`, [App.DateUtil.formatSvrHourByLocalTimeZone(22).hour.toString()]), 22, TextFieldConst.COLOR_BLACK);
		tiptxt.width = 555;
		tiptxt.lineSpacing = 5;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, bg, [0,20]);
		view.addChild(tiptxt);

		let tip2txt = ComponentManager.getTextField(LanguageManager.getlocal(`battlegroundcheertip2-${code}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tip2txt, bg, [0, bg.height + 10]);
		view.addChild(tip2txt);
		// let CheerId = view.vo.getCheerId();
		// if(CheerId > 0){

		// }

		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY), this.freshlist, this);
		// NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY, {
		// 	activeId : this.acTivityId
		// });
		// AcBattileGroundVisitViewTab1.AtkaceType = 0;

		let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, ``, ()=>{
			if(view.vo.getCurRound() > 1 && !view.vo.getCheerId()){
				let str = LanguageManager.getlocal(`battlegroundcheertip3-${code}`);
				App.CommonUtil.showTip(str);
				baseview.hide();
				return;
			}
			if(view.vo.getCheerId()){
				//打开排行
				ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEDETAILSVIEW,{
                    aid : view.aid,
                    code : view.code,
                    type : "rank"
                });
			}
			else{
				//打开选择帮会
				if(Api.atkraceVoApi.isShowNpc()){
					ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDCHEERSELECTVIEW,{
						aid : view.aid,
						code : view.code,
					});
				}
				else{
					App.CommonUtil.showTip(LanguageManager.getlocal(`battlegroundcheertip6-${code}`));
				}
			}
		}, view);
		view._btn = btn;
		view.addChild(btn);

		let info = view.vo.getCheerId();
		let txt = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_BLACK);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt, tiptxt, [85, tiptxt.height + 30]);
		view._cheerTxt = txt;
		view.addChild(txt);

		for(let i in this.cfg.audienceReward){
			let unit = this.cfg.audienceReward[i];
			unit.idvRank = unit.allianceRank;
		}
		let rewardData = this.cfg.audienceReward; 
		let rect = new egret.Rectangle(0, 0, 640, GameConfig.stageHeigth-395);
		var data:any={};
		data.type = 1;
		data.code = this.param.data.code;

		let list = ComponentManager.getScrollList(AcBattleRewardScrollItem, rewardData, rect,data);
		list.setPosition(-3,bg.y+bg.height + 40);
		list.bounces = false;
		view.addChild(list);

		view.freshview();
		
	}

	private freshview():void{
		let view = this;
		let code = view.getUiCode();
		let info = view.vo.getCheerId();
		if(info){
			let param = [info.name];
			let str = `battlegroundcheertip4`;
			view._btn.visible = false;
			if(info.isout){
				param.push(LanguageManager.getlocal(`acBattleRoundOut-${code}`));
			}
			else if(view.vo.getCurperiod() > 2){
				if(Number(view.vo.getWinnerAlliance().mid) == Number(info.id)){
					param.push(LanguageManager.getlocal(`acBattleRoundWin-${code}`));
				}
				else{
					param.push(LanguageManager.getlocal(`acBattleRoundOut-${code}`));
				}
			}
			else{
				view._btn.visible = true;
				str = `battlegroundcheertip14`;
			}
			view._cheerTxt.text = LanguageManager.getlocal(`${str}-${code}`, param);
			view._cheerTxt.visible = true;

			view._btn.setText(`battlegroundcheertip5-${code}`, true);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._btn, view._cheerTxt, [view._cheerTxt.textWidth + 25, 0]);
			App.CommonUtil.removeIconFromBDOC(view._btn);
		}
		else{
			if(view.vo.getCurRound() == 1){
				view._btn.visible = true;
				view._btn.setText(`battlegroundcheertip7-${code}`, true);
				view._cheerTxt.visible = false;
				App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._btn, view._cheerTxt, [110, 0]);
				if(Api.atkraceVoApi.isShowNpc()){
					App.CommonUtil.addIconToBDOC(view._btn);
				}
			}
			else{
				view._btn.visible = false;
				view._cheerTxt.text = LanguageManager.getlocal(`battlegroundcheertip3-${code}`);
				view._cheerTxt.visible = true;
				App.DisplayUtil.changeToGray(view._cheerTxt);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._cheerTxt, view, [0]);
			}
		}
	}
	// public useCallback(data:any):void
	// {
	// 	if(data.data.ret)
	// 	{
	// 		if(data.data.data.data.atkrace.dinfo&&data.data.data.data.atkrace.dinfo.length>=1)
	// 		{
	// 			this.defenseList=data.data.data.data.atkrace.dinfo;
	// 			if(AtkraceVisitViewTab1.AtkaceType ==0)
	// 			{
	// 				this.showList();
	// 			}
	// 		}
	// 		else 
	// 		{
	// 			//没有数据消息
	// 			if(this.noDataTxt==null)
	// 			{
	// 				this.noDataTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_WHITE);
	// 				this.noDataTxt.text =LanguageManager.getlocal("atkracedes1");
	// 				this.noDataTxt.x = 220;//rankImg.x+60
	// 				if(PlatformManager.checkIsEnLang()){
	// 					this.noDataTxt.x = 570 / 2 - this.noDataTxt.width / 2;
	// 				}
	// 				this.noDataTxt.y = 300;//rankImg.y+10;
	// 			}
	// 			this.addChild(this.noDataTxt);
	// 		}	
	// 	}
	//}

    private prankCallback(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret && evt.data.data.data){
			view.freshview();
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCheerSucess"));
            let baseview : any = ViewController.getInstance().getView('AcBattleGroundCheerSelectView');
            baseview.hide();
        }
    }

    public dispose():void{
		let view = this;
		view._btn = null;
		view._cheerTxt = null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEGROUND_CHEER), view.prankCallback, view)
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY), this.freshlist, this);
   		//App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_GETMODEL), this.useCallback, this)
		super.dispose();
   	}
}