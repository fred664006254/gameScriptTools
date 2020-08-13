class AcGroupWifeBattleGuessView extends CommonView
{
	private _btn : BaseButton = null;
	private _cheerTxt : BaseTextField = null;    
    public constructor(){
		super();
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
	
	private get cfg() : Config.AcCfg.GroupWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcGroupWifeBattleVo{
        return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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

	protected getResourceList():string[]{
        let code = this.getUiCode();
		return super.getResourceList().concat([`battle-purport`,`activity_charge_red`
		]);
    }

    protected getRuleInfo() : string{
		let code = this.getUiCode();
        // if(Api.switchVoApi.checkServantRefuseBattle() && this.getUiCode() == '1' &&Api.switchVoApi.checkOpenAtkracegChangegpoint()){
		// 	return "acBattleRoundRule-1_newRule_withOpenRefusal";
		// }
        // return Api.switchVoApi.checkOpenAtkracegChangegpoint() ? (`acBattleRoundRule-${this.getUiCode()}_newRule`) : (`acBattleRoundRule-${this.getUiCode()}`);
		return `acGroupWifeBattleRule-${code}`;  
	}
    
    protected getRuleInfoParam() : string[]{
        return this.vo.getRuleInfoParam();
    } 

    protected getTitleStr() : string{
        return `acGroupWifeBattlecheerTitle-${this.getUiCode()}`;
    }
	protected getRuleBtnName():string
	{	
		return ButtonConst.BTN2_RULE;
	}
    public initView():void{
        let view = this;

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHEER), view.prankCallback, view)

        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
       
        let bouttom:BaseBitmap =BaseBitmap.create("battledownbg");
        bouttom.width = GameConfig.stageWidth;
        bouttom.height = GameConfig.stageHeigth;
        this.addChildToContainer(bouttom);
		this.container.y = 0;

		let bg = BaseBitmap.create("battle-purport");
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view,[0,100]);
		view.addChild(bg);

		let tiptxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattlecheertip-${code}`, [App.DateUtil.formatSvrHourByLocalTimeZone(22).hour.toString()]), 22, TextFieldConst.COLOR_BLACK);
		tiptxt.width = 555;
		tiptxt.lineSpacing = 5;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, bg, [0,20]);
		view.addChild(tiptxt);

		let tip2txt = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattlecheertip2-${code}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tip2txt, bg, [0, bg.height + 10]);
		view.addChild(tip2txt);

		let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, ``, ()=>{
			if(view.vo.getCurRound() > 1 && !view.vo.getCheerId()){
				let str = LanguageManager.getlocal(`acGroupWifeBattlecheertip3-${code}`);
				App.CommonUtil.showTip(str);
				view.hide();
				return;
			}
			if(view.vo.getCheerId()){
				//打开排行
				ViewController.getInstance().openView(ViewConst.COMMON.ACGROUPWIFEBATTLEDETAILSVIEW,{
                    aid : view.aid,
                    code : view.code,
                    type : "rank"
                });
			}
			else{
				//打开选择帮会
				if(Api.wifebattleVoApi.isBaseWifeBattleOpen())
				{
					ViewController.getInstance().openView(ViewConst.POPUP.ACGROUPWIFEBATTLEGUESSSELECTVIEW,{
						aid : view.aid,
						code : view.code,
					});
				}
				else{
					App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattlecheertip6-${code}`));
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

        let bottomBg = BaseBitmap.create(`acgroupwifebattlebottombg-${code}`);
        bottomBg.height = 80;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view,[0,-60]);
        view.addChild(bottomBg);

        let bottomleft = BaseBitmap.create(`acgroupwifebattlecorner-${code}`);
        bottomleft.setPosition(0,GameConfig.stageHeigth-bottomleft.height);
        view.addChild(bottomleft);
        let bottomright = BaseBitmap.create(`acgroupwifebattlecorner-${code}`);
        bottomright.scaleX = -1;
        bottomright.setPosition(GameConfig.stageWidth,GameConfig.stageHeigth-bottomright.height);
        view.addChild(bottomright);

		for(let i in this.cfg.audienceReward){
			let unit = this.cfg.audienceReward[i];
			unit.idvRank = unit.allianceRank;
		}
		let rewardData = this.cfg.audienceReward; 
		let rect = new egret.Rectangle(0, 0, 640, bottomBg.y - (bg.y+bg.height + 40));
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
			let str = `acGroupWifeBattlecheertip4`;
			view._btn.visible = false;
			if(info.isout){
				param.push(LanguageManager.getlocal(`acBattleRoundOut-${code}`));
			}
			else if(view.vo.getCurperiod() > 2){
				if(Number(view.vo.getWinnerAlliance().mid) == Number(info.id)){
					param.push(LanguageManager.getlocal(`acGroupWifeBattledWin-${code}`));
				}
				else{
					param.push(LanguageManager.getlocal(`acBattleRoundOut-${code}`));
				}
			}
			else{
				view._btn.visible = true;
				str = `acGroupWifeBattlecheertip14`;
			}
			view._cheerTxt.text = LanguageManager.getlocal(`${str}-${code}`, param);
			view._cheerTxt.visible = true;

			view._btn.setText(`acGroupWifeBattlecheertip5-${code}`, true);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._btn, view._cheerTxt, [view._cheerTxt.textWidth + 25, 0]);
			App.CommonUtil.removeIconFromBDOC(view._btn);
		}
		else{
			if(view.vo.getCurRound() == 1){
				view._btn.visible = true;
				view._btn.setText(`acGroupWifeBattlecheertip7-${code}`, true);
				view._cheerTxt.visible = false;
				App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._btn, view._cheerTxt, [110, 0]);
				if(view.vo.getRedPot2()){
					App.CommonUtil.addIconToBDOC(view._btn);
				}
			}
			else{
				view._btn.visible = false;
				view._cheerTxt.text = LanguageManager.getlocal(`acGroupWifeBattlecheertip3-${code}`);
				view._cheerTxt.visible = true;
				App.DisplayUtil.changeToGray(view._cheerTxt);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._cheerTxt, view, [0]);
			}
		}
	}

    private prankCallback(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret && evt.data.data.data){
			view.freshview();
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCheerSucess"));
            let baseview : any = ViewController.getInstance().getView('AcGroupWifeBattleGuessSelectView');
            baseview.hide();
        }
    }

    public dispose():void{
		let view = this;
		view._btn = null;
		view._cheerTxt = null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHEER), view.prankCallback, view)        
        super.dispose();
    }
}