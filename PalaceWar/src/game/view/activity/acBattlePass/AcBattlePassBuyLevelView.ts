/**
 * 励精图治 购买等级
 */

class AcBattlePassBuyLevelView extends PopupView{	

	private _buyLvTxt : BaseTextField = null;
    public constructor(){
		super();
	}

	private get cfg() : Config.AcCfg.BattlePassCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcBattlePassVo{
        return <AcBattlePassVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
	protected getRuleBtnName():string
	{	
		return ButtonConst.BTN2_RULE;
	}	
	protected getUiCode():string{
        let code = ``;
        switch(Number(this.code)){
            case 2:
                code = '1';
				break;
			case 7:
				code = '4';
				break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

	protected getResourceList():string[]{
		return super.getResourceList().concat([
			`countrywarrewardview_itembg`
        ]);
	}

	protected getTitleStr():string{
        let view = this;
        let code = view.getUiCode();
        return App.CommonUtil.getCnByCode(`acBattlePassBuyLevelTitle`, code);
    }

    public initView():void
	{
		let view = this;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEPASS_BUYLV), view.buyCallback, view)
		let code = view.getUiCode();
		let tipTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTip6`, code)),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		tipTxt.lineSpacing = 5;
		tipTxt.textAlign = egret.HorizontalAlign.CENTER;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view.viewBg, [0,20]);
		view.addChildToContainer(tipTxt);

		let tmpY = 0;
		if(this.cfg.lvLimit){
			let tipbg = BaseBitmap.create(`countrywarrewardview_itembg`);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipbg, tipTxt, [0,tipTxt.textHeight + 5]);
			view.addChildToContainer(tipbg);

			let buyTipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(view.vo.getCurBuyLevelNum() < view.cfg.lvLimit ? `battlepasscanbuy`:`battlepasscanbuymax`, code), [view.vo.getCurBuyLevelNum().toString(), view.cfg.lvLimit.toString()]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, buyTipTxt, tipbg);
			view.addChildToContainer(buyTipTxt);
			view._buyLvTxt = buyTipTxt;

			tmpY = tipbg.height + 10;
		}

		let rankBg : BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		rankBg.width = 540;
		rankBg.height = 250;
		rankBg.setPosition(view.viewBg.width/2 - rankBg.width/2, tipTxt.y + tipTxt.textHeight + 10 + tmpY);
		view.addChildToContainer(rankBg);

		let curBattleLevel = view.vo.getMyBattleLevel();
		/*
		--战令分级显示
        --open:是否开启政令版本(1-开启，0不开启)
        --unlockBP:解锁的战令。Primary-初级。Intermediate-中级。Advanced-高级
        --unlockRecharge:解锁充值。玩家购买advanced后直接解锁intermediate
        --lvAdd:购买后直接赠送等级
        --unlockTask:open=1时，开放的任务
		**/
		// let arr = [1, 10, 20, 30];
		// let recharge = [`g1`, `g2`, `g3`, `g4`];
		let arr = view.cfg.getBattleCostArr();
		for(let i in arr){
			let num = arr[i].lvAdd;
			let bg : BaseBitmap = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepassbuylevelbg`, code));
			view.setLayoutPosition(LayoutConst.lefttop, bg, rankBg, [8 + (Number(i) * (bg.width)), 7]);
			view.addChildToContainer(bg);

			let tipTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassLevelUp`, code), [`${num}`]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
			view.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, bg, [0, 20]);
			view.addChildToContainer(tipTxt);

			let icon : BaseBitmap = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepassbuylevel${Number(i) + 1}`, code));
			view.setLayoutPosition(LayoutConst.horizontalCenterbottom, icon, bg, [0, 25]);
			view.addChildToContainer(icon);

			let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, ``, ()=>{
				//购买
				if(!view.vo.isInActivity()){
					App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
					return;
				}
				if(Api.playerVoApi.getPlayerGem() < Number(arr[i].cost)){
					App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
					return;
				}
				let index =  arr[i].index;
				let curBuylevel = view.vo.getCurBuyLevelNum();
				
				if(view.cfg.lvLimit > 0 && view.vo.getCurBuyLevelNum() >= view.cfg.lvLimit){
					App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`battlepasscanbuymax2`, code)));
					return;
				}			
									
				let curLevel = view.vo.getLevel();
				if(curLevel >= view.cfg.maxlevel){
					App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassMaxLevel`, code)));
					return;
				}

				let tmp = curLevel + num - view.cfg.maxlevel;
				let tmp2 = view.cfg.lvLimit  > 0 ? (curBuylevel + num - view.cfg.lvLimit) : 0;
				let tmp3 = view.cfg.lvLimit - curBuylevel;
				let tmp4 = view.cfg.maxlevel - curLevel;

				let showMaxLeveltip = false;
				let showBuyLeveltip = false;
				if(tmp > 0 && tmp2 > 0){
					showBuyLeveltip = tmp3 <= tmp4;
					showMaxLeveltip = tmp4 < tmp3;
				}
				else if(tmp > 0){
					showMaxLeveltip = true;
				}
				else if(tmp2 > 0){
					showBuyLeveltip = true;
				}

				let msg = "";
				if(showMaxLeveltip){
					msg = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTip7`, code), [`${view.cfg.maxlevel}`, `${tmp}`]);
				}
				else if(showBuyLeveltip){
					msg = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTip18`, code), [tmp3.toString(), tmp2.toString(), (curLevel + num - tmp2).toString()]);
				}
				else{
					msg = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTip17`, code), [arr[i].cost.toString(), num.toString()]);
				}
				
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					msg : msg,
					title : `itemUseConstPopupViewTitle`,
					touchMaskClose : true,
					callback : ()=>{
						if(!view.vo.isInActivity()){
							App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
							return;
						}
						//购买
						NetManager.request(NetRequestConst.REQUEST_BATTLEPASS_BUYLV,{
							activeId : view.acTivityId, 
							shownum : index
						});
					},
					handle : view,
					needClose : 1,
					needCancel : true
				});  
			}, view);
			btn.name = `btn${i}`;
			btn.setText(arr[i].cost, false);
			btn.addTextIcon("public_icon1");
			view.addChildToContainer(btn);
			view.setLayoutPosition(LayoutConst.horizontalCentertop, btn, bg, [0, bg.height + 10]);
			if(view.cfg.lvLimit > 0 && view.vo.getCurBuyLevelNum() >= view.cfg.lvLimit){
				btn.setGray(true);
			}
		}

		let tip2Txt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTip8`, code)), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		tip2Txt.lineSpacing = 5;
		tip2Txt.textAlign = egret.HorizontalAlign.CENTER;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, tip2Txt, rankBg, [0, rankBg.height + 20]);
		view.addChildToContainer(tip2Txt);
	}

	private buyCallback(evt : egret.Event) : void{
		let view = this;
		if(evt.data.ret){
			if(evt.data.data.ret >= 0){
				App.CommonUtil.showTip(LanguageManager.getlocal('allianceTaskBuffBuyTip2'));
			}
			if(view._buyLvTxt){
				view._buyLvTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(view.vo.getCurBuyLevelNum() < view.cfg.lvLimit ? `battlepasscanbuy` : `battlepasscanbuymax`,this.getUiCode()), [view.vo.getCurBuyLevelNum().toString(), view.cfg.lvLimit.toString()]);
			}
			
			let arr = view.cfg.getBattleCostArr();
			for(let i = 0; i < arr.length; ++ i){
				let btn = <BaseButton>view.container.getChildByName(`btn${i}`);
				if(view.cfg.lvLimit > 0 && view.vo.getCurBuyLevelNum() >= view.cfg.lvLimit){
					btn.setGray(true);
				}
			}
		}
	}
	
	public getShowWidth():number{
		return 580;
	}

	public getShowHeight():number{
		return Number(this.cfg.maxlevel) > 0 ? 530 : 490;
	}

    public dispose():void{
		let view = this;
		view._buyLvTxt = null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEPASS_BUYLV), view.buyCallback, view)	
		super.dispose();
	}
}