/**
 对战信息logitem
 * author qianjun
 */
class AcConquerMainLandLogItem extends ScrollListItem
{
	private _data:any = null;
	// private _applyBtn:BaseButton;
	// private _cancelApplyBtn:BaseButton;
	private _itemIndex:number;
	private _nameTf:BaseTextField;
	private _code : string = '';
	public constructor() 
	{
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
	
	protected initItem(index:number,data:any,itemparam:any) {	
		let view = this;
		view._data = data;
        view._code = itemparam;
		this.width = 580;
		// childInfo.total
		this._data = data;
		this._code = itemparam;
		this._itemIndex = index;
		let code = view.getUiCode();
		
		// let nameTxt = ComponentManager.getTextField(`${index + 1}. ${LanguageManager.getlocal(`atkraceyamenid`,[data.winId])}`, 20, TextFieldConst.COLOR_WARN_YELLOW2);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nameTxt, view, [0,5]);
		// view.addChild(nameTxt);

		let str = `${index + 1}.`;
		let cityname = view.vo.getCityName(`${data.citylevel}_${data.cityNum}_${data.cityIdx}`);
		//撤军
		if(data.callback){
			str = LanguageManager.getlocal(`acConquerMainLandLog5_1-${code}`, [data.winName, cityname]);
		}
		else{
			/**1 
			* 通报标头→玩家ID 成功夺取 地标名 
			* 进攻胜利通报：玩家ID 已成功夺取 地标名
			* 防御胜利通报：玩家ID 成功防御 地标名
			* */
			let str1 = LanguageManager.getlocal(`acConquerMainLandLog1_${data.title.type}-${code}`, [data.winName, cityname]);
			/**2
			* （通报内容）→玩家ID 出动大军，来势汹汹，击败了 玩家ID2，成功夺取了 地标名！
			* */
			let str2 = ``;
			if(data.report.type == 5){
				str2 = LanguageManager.getlocal(`acConquerMainLandLog2_${data.report.type}_${data.report.rid}-${code}`, [data.winName, data.loseName, cityname]);
			}
			else{
				str2 = LanguageManager.getlocal(`acConquerMainLandLog2_${data.report.type}-${code}`, [data.winName, data.loseName, cityname]);
			}
			/**3
			* （接②，连胜通报）→并取得x连胜！
			* */
			let str3 = ``;
			if(data.win.type){
				str3 = LanguageManager.getlocal(`acConquerMainLandLog3_${data.win.type}-${code}`, [data.win.type == 1 ? data.win.num : data.loseName, data.win.num]);
			}
			str = str1 + `\n` + str2 + str3;
		}    
		/**4
		* 时间戳
		* */
		// str += `\n${App.DateUtil.getFormatBySecond(data.time, 9)}`;   

		let descTxt = ComponentManager.getTextField(str, 18,TextFieldConst.COLOR_BROWN_NEW);
		descTxt.width = 450;
		descTxt.lineSpacing = 5;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descTxt, view, [25,10]);
		view.addChild(descTxt);
		
		let timeTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acBattileGroundTime-${view._code}`, [App.DateUtil.getFormatBySecond(data.time, 13)]), 18,TextFieldConst.COLOR_BROWN_NEW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, descTxt, [0,descTxt.textHeight + 7]);
		view.addChild(timeTxt);	

		this.height = timeTxt.y + timeTxt.textHeight + 15;
		
		let line : BaseBitmap = BaseBitmap.create(`public_line4`);
		line.width = view.width - 10;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view,[3,0]);
		this.addChild(line);

		let hfBtn = ComponentManager.getButton(`dinner_detail`, ``, ()=>{
			//刷新界面
			let attackwin = data.title.type == 1;
			let wardata = {
				info : {
					team :  attackwin ? data.winteam : data.loseteam,
					titleId : attackwin ? data.winTitle : data.loseTitle,
					zid : attackwin ? data.winzid : data.losezid,
					name :  attackwin ? data.winName : data.loseName,
				},
				tinfo : {
					team :  !attackwin ? data.winteam : data.loseteam,
					titleId : !attackwin ? data.winTitle : data.loseTitle,
					zid : !attackwin ? data.winzid : data.losezid,
					name :  !attackwin ? data.winName : data.loseName,
				},
			}
			ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDWARSHOWVIEW,{
				aid : this.aid,
				code : this.code,
				wardata : wardata,
				result : `win`,
				attackwin : attackwin,
				cityName : view.vo.getCityName(`${data.citylevel}_${data.cityNum}`),
				cityName2 : view.vo.getCityName(`${data.citylevel}_${data.cityNum}_${data.cityIdx}`),
			});
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, hfBtn, view, [10,0]);
		view.addChild(hfBtn);
		
		hfBtn.visible = !data.callback;
	}

	private clickItemHandler(event: egret.TouchEvent): void {
		
		this.showUserInfo();
	}

	private showUserInfo()
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._data.uid});
    }

	protected userShotCallback(event:egret.Event)
    {
        let data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
            ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW,data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
    }


	private cancelBlock()
    {
		let data = this._data;
		if(data.type == 'choosevisit'){
			let itemid = 1411;
			let info = Api.adultVoApi.getAdultInfoVoById(this._data.childid);
			let itemUseCount = Api.adultVoApi.getVisitUseByQuality(info.aquality);
			let itemCount = Api.itemVoApi.getItemNumInfoVoById(itemid);
			let itemCfg = Config.ItemCfg.getItemCfgById(itemid);
			let message: string = LanguageManager.getlocal("adultvisiconfirm", [itemCfg.name + "x" +itemUseCount, this._data.name]);
			ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, {	
				confirmCallback: this.useItemConfirmCallbackHandler, 
				handler: this, 
				icon: itemCfg.icon,
				iconBg:itemCfg.iconBg, 
				num: itemCount, 
				useNum:itemUseCount,
				msg: message, 
				id : itemid
			});
		}
		else{
			//this.request(NetRequestConst.REQUEST_RADULT_PROPOSE, { childId: this._adultInfoVo.id });
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSE_SADUNMARRY,{"fuid":this._data.uid,"childId":this._data.id});
			// NetManager.request(NetRequestConst.REQUEST_RADULT_PROPOSE, {
			// 	childId : this._data.childid, 
			// 	fuid : this._data.uid ,
			// 	protype : 2
			// });
			// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CLICKMARRY,{"id":this._data.id,"childId":this._data.childId});
		}
	}
	
	private useItemConfirmCallbackHandler(evt : egret.Event){
		NetManager.request(NetRequestConst.REQUEST_SADUN_VISIT, {
			childId : this._data.childid,
			fuid : this._data.uid || 0,
			protype : 3
		});
		Api.adultVoApi.setVisitId(this._data.uid);
		//App.CommonUtil.showTip(LanguageManager.getlocal('adultissendVisit'));
	}

	private doShield()
	{
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CANCEBLOCK,{"uid":this._data.uid,"name":this._data.name});
	}


	public getSpaceY():number
	{
		return 0;
	}

	public dispose():void
	{

		this._data = null;
		// this._applyBtn = null;
		// this._cancelApplyBtn = null;
		this._itemIndex = null;
		this._nameTf = null;
		super.dispose();
	}
}