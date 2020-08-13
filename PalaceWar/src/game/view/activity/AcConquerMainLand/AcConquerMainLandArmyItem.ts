/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 军队item
 */
class AcConquerMainLandArmyItem  extends ScrollListItem
{
	private _data = null; 
	private _sendBtn = null;
	private _sendBtn2 = null;
	private _cancelBtn = null;
	private _solderAddTxt : BaseTextField = null;
	private _totalNumTxt : BaseTextField = null;
	private _list : ScrollList = null;

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

	private getScorePer(data:any,jizhan:boolean=true):any
	{
		let info = this.vo.getArmyInfo(data);
		let num = info.scoreper;
		if(jizhan)
		{
			return num;
		}
		let timebuff = this.vo.getTimeBuff();
		if(timebuff)
		{
			return Math.floor(num/this.vo.getTimeBuff());
		}
		return num;
	}
    
    private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any){	
        let view = this;
        view._code = itemparam;
		view.width = 606;
		view._data = data;
		let code = view.getUiCode();

		let isSend = view.vo.isArmySend(data);
		let servantObj = view.vo.getArmyServant(data);
		let row = Math.ceil(servantObj.length / 5);
		view.height = isSend ? (5 + 7 + 40 + 60 + (row * 108 + (row - 1) * 5) + 14 + 60) : 180;

		let army = data;
		let res = '';
		let armynameres = '';
		switch(army){
			case 1:
				res = `public_9_bg66`;
				armynameres = `alliance_taskAttrbg1`;
				break;
			case 2:
				res = `public_9_bg68`;
				armynameres = `alliance_taskAttrbg2`;
				break;
			case 3:
				res = `public_9_bg69`;
				armynameres = `alliance_taskAttrbg5`;
				break;
		}
		let bg = BaseBitmap.create(res);
		bg.width = view.width;
		bg.height = view.height - 5;
		view.addChild(bg);

		let diwen = BaseBitmap.create(`mainlandarmybg${data}-${code}`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, diwen, bg);
		view.addChild(diwen);

		let topbg = BaseBitmap.create(armynameres);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, topbg, bg, [5,7]);
		view.addChild(topbg);

		let armyicon = BaseBitmap.create(`mainlandarmyicon${data}-${code}`);
		armyicon.setScale(0.45);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, armyicon, topbg, [20,-2]);
		view.addChild(armyicon);

		let armyname = BaseBitmap.create(`mainlandarmytitle${data}-${code}`);
		armyname.setScale(0.7);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, armyname, topbg, [65,0]);
		view.addChild(armyname);

		if(isSend){
			let info = view.vo.getArmyInfo(data);
			//正在占领
			let cityName = view.vo.getCityName(`${info.citylevel}_${info.cityNum}_${info.cityIdx}`);
			let cityInfoTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip6-${code}`, [cityName]), 20, TextFieldConst.COLOR_BLACK);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cityInfoTxt, topbg, [15, topbg.height + 10]);
			view.addChild(cityInfoTxt);

			if(!this.vo.checkIsJJL)
			{
				let solderAddTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip3-${code}`, [App.StringUtil.changeIntToText(info.addPower)]), 20, TextFieldConst.COLOR_BLACK);
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, solderAddTxt, cityInfoTxt, [0, cityInfoTxt.height + 5]);
				view.addChild(solderAddTxt);
				view._solderAddTxt = solderAddTxt;
			}

			let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip7-${code}`, [info.scoreper]), 20, TextFieldConst.COLOR_BLACK);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, topbg, [365, topbg.height + 10]);
			view.addChild(tipTxt);

			let tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip8-${code}`, [App.StringUtil.changeIntToText(info.totalnum)]), 20, TextFieldConst.COLOR_BLACK);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip2Txt, tipTxt, [0, tipTxt.textHeight + 5]);
			view.addChild(tip2Txt);
			view._totalNumTxt = tip2Txt;
			if(this.vo.checkIsJJL)
			{
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip2Txt, cityInfoTxt, [0, cityInfoTxt.textHeight + 5]);
			}

			let roundbg = BaseBitmap.create(`public_9_managebg`);
			roundbg.width = 585;
			roundbg.height = (row * 108 + (row - 1) * 5) + 14;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, roundbg, bg, [0, 105]);
			view.addChild(roundbg);

			let tmpRect =  new egret.Rectangle(0,0,roundbg.width - 15,roundbg.height - 10);
			let scrollList = ComponentManager.getScrollList(AcConquerMainLandSearvantItem, servantObj, tmpRect, view.code);
			view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, roundbg, [0,5]);
			view.addChild(scrollList); 
			scrollList.bounces = false;
			scrollList.verticalScrollPolicy = 'off';
			view._list = scrollList

			let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `allianceWarUseServantBtn2`, ()=>{
				if(view.vo.getCurPeriod() == 1){
					App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNotStart-1`));
					return
				}
				//打开商店
				if(!view.vo.isCanJoin()){
					App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip23-${code}`));
					return
				}
				//撤回
				let info = view.vo.getArmyInfo(data);
				//正在占领
				let cityName = view.vo.getCityName(`${info.citylevel}_${info.cityNum}_${info.cityIdx}`);
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					msg : LanguageManager.getlocal(this.vo.getThisCn("acConquerMainLandTip21"), [LanguageManager.getlocal(`acmainlandarmy${data}-${code}`),  cityName]),
					title : `itemUseConstPopupViewTitle`,
					touchMaskClose : true,
					callback : ()=>{
						if(!view.vo.isInActivity()){
							App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
							return;
						}		
						if(view.vo.getCurPeriod() == 3){
							App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip40-${code}`));
							//关闭到预热
							App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINLAND_CLOSE);
							return;
						}
						//发撤回消息
						NetManager.request(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT,{
                            activeId : view.acTivityId, 
                            teamnum : data
                        });
					},
					handle : view,
					needClose : 1,
					needCancel : true,
				});
			}, view);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, btn, bg, [100, 10]);
			view.addChild(btn);

			let btn2;
			if(this.vo.checkIsJJL)
			{
				btn2 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `acConquerMainLandJiaJiang-${code}`, ()=>{
					if(view.vo.getCurPeriod() == 1){
						App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNotStart-1`));
						return
					}					
					//嘉奖
					if(!view.vo.isCanJoin()){
						App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip23-${view.getUiCode()}`));
						return
					}
					if(view.vo.getCurPeriod() == 3)
					{
						App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip48`));
						return
					}					
					if(view.vo.getItemNum() == 0){
						App.CommonUtil.showTip(LanguageManager.getlocal('itemNumNotEnough'));
						return;
					}
					ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDITEMUSEPOPUPVIEW,{
						aid:this.aid,
						code:this.code,
						army : data,
						scoreper:this.getScorePer(data,false)
					});
				}, view);
			}else
			{
				btn2 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `acConquerMainLandCollect-${code}`, ()=>{
					if(view.vo.getCurPeriod() == 1){
						App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNotStart-1`));
						return
					}
					//征兵
					if(!view.vo.isCanJoin()){
						App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip23-${view.getUiCode()}`));
						return
					}
					if(view.vo.getItemNum() == 0){
						App.CommonUtil.showTip(LanguageManager.getlocal('itemNumNotEnough'));
						return;
					}
					ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDITEMUSEPOPUPVIEW,{
						aid:this.aid,
						code:this.code,
						army : data
					});
				}, view);				
			}
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, btn2, bg, [100, 10]);
			view.addChild(btn2);
			view._sendBtn2 = btn2;
			if(view.vo.getpublicRedhot2()){
				App.CommonUtil.addIconToBDOC(btn2);
			}
			else{
				App.CommonUtil.removeIconFromBDOC(btn2);
			}
		}
		else{
			// let solderAddTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip3-${code}`, [App.StringUtil.changeIntToText(view.vo.getAddpower(data))]), 20, TextFieldConst.COLOR_BLACK);
			// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, solderAddTxt, topbg, [15, topbg.height + 7]);
			// view.addChild(solderAddTxt);
			// view._solderAddTxt = solderAddTxt;

			let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip4-${code}`), 20, TextFieldConst.COLOR_BLACK);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, topbg, [15, topbg.height + 7]);
			view.addChild(tipTxt);

			let tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip5-${code}`), 20, TextFieldConst.COLOR_WARN_RED2);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tip2Txt, bg, [0, 85]);
			view.addChild(tip2Txt);

			let btn;
			if(this.vo.checkIsJJL)
			{
				btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `acConquerMainLandJiaJiang-${code}`, ()=>{
					if(view.vo.getCurPeriod() == 1){
						App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNotStart-1`));
						return
					}
					if(!view.vo.isCanJoin()){
						App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip23-${view.getUiCode()}`));
						return
					}
					App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip44-${view.getUiCode()}`));
				}, view);
			}else
			{
				btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `acConquerMainLandCollect-${code}`, ()=>{
					if(view.vo.getCurPeriod() == 1){
						App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNotStart-1`));
						return
					}
					//征兵
					if(!view.vo.isCanJoin()){
						App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip23-${view.getUiCode()}`));
						return
					}
					if(view.vo.getItemNum() == 0){
						App.CommonUtil.showTip(LanguageManager.getlocal('itemNumNotEnough'));
						return;
					}
					// App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip44-${view.getUiCode()}`));
					ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDITEMUSEPOPUPVIEW,{
						aid:this.aid,
						code:this.code,
						army : data
					});
				}, view);
			}
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, btn, bg, [100, 10]);
			//App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, bg, [0, 10]);
			view.addChild(btn);
			btn.setGray(true);
			view._sendBtn = btn;
			// if(view.vo.getpublicRedhot2()){
			// 	App.CommonUtil.addIconToBDOC(btn);
			// }
			// else{
			// 	App.CommonUtil.removeIconFromBDOC(btn);
			// }

			let gobackBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `gotowar`, ()=>{
				if(view.vo.getCurPeriod() == 1){
					App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNotStart-1`));
					return
				}
				if(!view.vo.isCanJoin()){
					App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip23-${view.getUiCode()}`));
					return
				}
				if(view.vo.getCurPeriod() == 3){
					App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip42-1`));
					return
				}
				let mapview = ViewController.getInstance().getView(ViewConst.COMMON.ACCONQUERMAINLANDWARVIEW);
				if((!mapview || (mapview && !mapview.isShow())) && view.vo.getCurPeriod() == 2){
					ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDWARVIEW,{
						aid : view.aid,
						code : view.code
					});
				}

				let baseview = ViewController.getInstance().getView(ViewConst.COMMON.ACCONQUERMAINLANDDETAILVIEW);
				baseview.hide();
				
			}, view);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, gobackBtn, bg, [100, 10]);
			view.addChild(gobackBtn);
		}

		let kuangbg = BaseBitmap.create(`public_9_bg67`);
		kuangbg.width = view.width;
		kuangbg.height = view.height;
		view.addChild(kuangbg);
	} 

	public refresh():void{
		let view = this
		let code = view.getUiCode();;
		if(!view.vo)
		{
			return;
		}
		let info = view.vo.getArmyInfo(view._data);
		// view._solderAddTxt.text = LanguageManager.getlocal(`acConquerMainLandTip3-${code}`, [App.StringUtil.changeIntToText(info.addPower)]);
		if(view._totalNumTxt){
			view._totalNumTxt.text = LanguageManager.getlocal(`acConquerMainLandTip8-${code}`, [App.StringUtil.changeIntToText(info.totalnum)]);
		}
		if(view._list){
			//兵力刷新
			let list : any = view._list;
			for(let i in list._scrollListItemArr){
				let unit = <AcConquerMainLandSearvantItem>list._scrollListItemArr[i];
				unit.refresh();
			}
		}
		// if(view._sendBtn){
		// 	if(view.vo.getpublicRedhot2()){
		// 		App.CommonUtil.addIconToBDOC(view._sendBtn);
		// 	}
		// 	else{
		// 		App.CommonUtil.removeIconFromBDOC(view._sendBtn);
		// 	}
		// }
		if(view._sendBtn2){
			if(view.vo.getpublicRedhot2()){
				App.CommonUtil.addIconToBDOC(view._sendBtn2);
			}
			else{
				App.CommonUtil.removeIconFromBDOC(view._sendBtn2);
			}
		}
	}

	public getSpaceY(){
        return 0;
    }

	public dispose():void{
		let view = this;
		view._sendBtn = null;
		view._cancelBtn = null;
		view._data = null;
		view._solderAddTxt = null;
		view._totalNumTxt = null;
		view._list = null;
		view._sendBtn2 = null;
		super.dispose();
	}
}