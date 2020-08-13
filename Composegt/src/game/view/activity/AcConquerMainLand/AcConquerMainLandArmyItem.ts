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
    
    private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any){	
        let view = this;
        view._code = itemparam;
		view.width = GameConfig.stageWidth;
		view._data = data;
		let code = view.getUiCode();

		let isSend = view.vo.isArmySend(data);
		let servantObj = view.vo.getArmyServant(data);
		if(servantObj.length){
			for (let i = 0; i < 10; i++) {
				const element = servantObj[i];
				if(!element){
					servantObj.push({empty:true})
				}
			}
			view.height = 200 + 200 + 50
		}else{
			view.height = 200;
		}

		let bg = BaseBitmap.create(`mainland_detailtab1_itemround`);
		bg.width = view.width - 20;
		bg.height = view.height;
		bg.setPosition(10,0);
		view.addChild(bg);

		//绳子
		let shengzi1 = BaseBitmap.create(`mainland_detail_shengzi`);
		shengzi1.setPosition(bg.x - 10, bg.y + bg.height / 2 - shengzi1.height / 2);
		view.addChild(shengzi1);
		let shengzi2 = BaseBitmap.create(`mainland_detail_shengzi`);
		shengzi2.scaleX = -1;
		shengzi2.setPosition(bg.x + bg.width + 10, bg.y + bg.height / 2 - shengzi1.height / 2);
		view.addChild(shengzi2);

		let topbg = BaseBitmap.create('mainland_recorditem_timebg1');
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg, [5,7]);
		view.addChild(topbg);

		let armyname = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainArmyTitle${data}-${code}`),22,TextFieldConst.COLOR_BROWN_NEW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, armyname, topbg, [-7,0]);
		view.addChild(armyname);

		if(servantObj.length){
			let topLine = BaseBitmap.create("public_line4");
			let bottomLine = BaseBitmap.create("public_line4");
			topLine.width = bottomLine.width = bg.width - 80;
			topLine.x = bottomLine.x = bg.x +  bg.width/2 - topLine.width/2;
			topLine.y = bg.y + 100;
			bottomLine.y = bg.y + 350;
			this.addChild(topLine);
			this.addChild(bottomLine);

			let tmpRect =  new egret.Rectangle(0,0,this.width-70,bottomLine.y - topLine.y - 20);
			let scrollList = ComponentManager.getScrollList(AcConquerMainLandSearvantItem, servantObj, tmpRect, view.code);
			scrollList.setPosition(37,topLine.y + 20);
			view.addChild(scrollList); 
			scrollList.bounces = false;
			scrollList.verticalScrollPolicy = 'off';
			view._list = scrollList;
		}

		if(isSend){

			let info = view.vo.getArmyInfo(data);
			//正在占领
			let cityName = view.vo.getCityName(`${info.citylevel}_${info.cityNum}_${info.cityIdx}`);
			let cityInfoTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip6-${code}`, [App.StringUtil.formatStringColor(cityName,0x3e9b00) ]), 20, TextFieldConst.COLOR_BROWN_NEW);
			cityInfoTxt.setPosition(this.x + 80,this.y + 48);
			view.addChild(cityInfoTxt);

			let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip7-${code}`, [info.scoreper]), 20, TextFieldConst.COLOR_BLACK);
			tipTxt.setPosition(this.x + 360,cityInfoTxt.y);
			view.addChild(tipTxt);

			let tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip8-${code}`, [App.StringUtil.changeIntToText(info.totalnum)]), 20, TextFieldConst.COLOR_BROWN_NEW);
			tip2Txt.setPosition(cityInfoTxt.x,cityInfoTxt.y + 32);
			view.addChild(tip2Txt);
			view._totalNumTxt = tip2Txt;

			if(PlatformManager.checkIsViSp()){
				cityInfoTxt.setPosition(this.x + 60,this.y + 48);
				tip2Txt.setPosition(cityInfoTxt.x,cityInfoTxt.y + 32);
				tipTxt.setPosition(this.x + 370,tip2Txt.y);
			}

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
				if (!view.vo.isInActivity()) {
					App.CommonUtil.showTip(LanguageManager.getlocal(`acPunishEnd`));
					return
				}
				//撤回
				let info = view.vo.getArmyInfo(data);
				//正在占领
				let cityName = view.vo.getCityName(`${info.citylevel}_${info.cityNum}_${info.cityIdx}`);
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					msg : LanguageManager.getlocal(`acConquerMainLandTip21-${code}`, [LanguageManager.getlocal(`acmainlandarmy${data}-${code}`),  cityName]),
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

			let btn2 = ComponentManager.getButton(ButtonConst.BTN_SMALL_ORANGE, `acConquerMainLandCollect-${code}`, () => {
				if (view.vo.getCurPeriod() == 1) {
					App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNotStart-1`));
					return
				}
				if (!view.vo.isCanJoin()) {
					App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip23-${code}`));
					return
				}
				if (!view.vo.isInActivity()) {
					App.CommonUtil.showTip(LanguageManager.getlocal(`acPunishEnd`));
					return
				}
				ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
			}, this);
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, btn2, bg, [100, 10]);
			view.addChild(btn2);
			view._sendBtn2 = btn2;
		}
		else{

			let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip4-${code}`), 20, TextFieldConst.COLOR_QUALITY_GREEN_NEW);
			tipTxt.setPosition(bg.x + bg.width/2 - tipTxt.width/2 ,this.y +53)
			view.addChild(tipTxt);

			let line = BaseBitmap.create("public_line4");
			line.width = bg.width - 80;
			line.x  = bg.x +  bg.width/2 - line.width/2;
			line.y = tipTxt.y + tipTxt.height + 10;
			this.addChild(line);

			let tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip5-${code}`), 20, TextFieldConst.COLOR_BROWN_NEW);
			tip2Txt.setPosition(bg.x + bg.width/2 - tip2Txt.width/2 ,line.y + line.height + 10)
			view.addChild(tip2Txt);

			let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `acConquerMainLandCollect-${code}`, ()=>{
				if(view.vo.getCurPeriod() == 1){
					App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNotStart-1`));
					return
				}
				//征兵
				if(!view.vo.isCanJoin()){
					App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip23-${view.getUiCode()}`));
					return
				}
				if (!view.vo.isInActivity()) {
					App.CommonUtil.showTip(LanguageManager.getlocal(`acPunishEnd`));
					return
				}
				ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
			}, view);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, bg, [0, 10]);
			view.addChild(btn);
			view._sendBtn = btn;
		}

		view.height += 20;
	} 

	public refresh():void{
		let view = this
		let code = view.getUiCode();;
		let info = view.vo.getArmyInfo(view._data);
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