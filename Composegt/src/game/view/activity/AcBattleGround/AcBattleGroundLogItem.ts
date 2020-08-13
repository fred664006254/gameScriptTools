/**
 对战信息logitem
 * author qianjun
 */
class AcBattleGroundLogItem extends ScrollListItem
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

	private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this._code;
    }

    private get aid():string{
        return AcConst.AID_BATTLEGROUND;
	}

	public initItem(index:number,data:any,itemparam?):void
	{
		let view = this;
		this.width = 620;
		this.height = 118 + this.getSpaceY();
		// childInfo.total
		this._data = data;
		this._code = itemparam;
		this._itemIndex = index;
		
		let nameTxt = ComponentManager.getTextField(`${index + 1}. ${data.playerName}<font color=0xfedb38>${LanguageManager.getlocal(`atkraceyamenid`,[data.uid])}</font>`, 20, TextFieldConst.COLOR_WHITE);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nameTxt, view, [0,5]);
		view.addChild(nameTxt);

		let textStr = '';
		if(1){
			//击败｜｜全歼
			let str = "";
			if(data.info.type==1){
				str =LanguageManager.getlocal("atkracebeat")
			}
			else
			{
				str =LanguageManager.getlocal("atkraceAnnihilation")
			}
			
			//描述    
			let servantName =Config.ServantCfg.getServantItemById(data.info.sid).name;
			//  (1随机 2复仇 3挑战 4追杀 5出师令)
			if(data.info.atype&&data.info.atype==2)
			{
				if(data.info.streak&&data.info.streak>=3)
				{
					textStr = LanguageManager.getlocal("acBattleStraight_1",[servantName,str,data.info.uname2,data.info.fightnum,data.info.streak]);
				}
				else
				{
					textStr = LanguageManager.getlocal("acBattleDescription_1",[servantName,str,data.info.uname2,data.info.fightnum]);
				}
			}
			else if(data.info.atype==4)
			{
				if(data.info.streak&&data.info.streak>=3)
				{
					textStr = LanguageManager.getlocal("acBattleStraight_4_2",[servantName,str,data.info.uname2,data.info.fightnum,data.info.streak]);
				}
				else
				{
					textStr = LanguageManager.getlocal("acBattleDescription_4",[servantName,str,data.info.uname2,data.info.fightnum]);
				}
			}
			else
			{
				if(data.info.streak&&data.info.streak>=3)
				{
					textStr =LanguageManager.getlocal("acBattleStraight",[servantName,str,data.info.uname2,data.info.fightnum,data.info.streak]);
				}
				else
				{
					textStr =LanguageManager.getlocal("acBattleDescription",[servantName,str,data.info.uname2,data.info.fightnum]);
				}
			}
		}
		let descTxt = ComponentManager.getTextField(textStr, 18, TextFieldConst.COLOR_WHITE);
		descTxt.width = 450;
		descTxt.lineSpacing = 5;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descTxt, nameTxt, [24,nameTxt.textHeight + 10]);
		view.addChild(descTxt);
		
		let timeTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acBattileGroundTime"), [App.DateUtil.getFormatBySecond(data.time, 2)]), 18, 0xc68739);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, timeTxt, view, [descTxt.x,10]);
		view.addChild(timeTxt);	
		
		let line : BaseBitmap = BaseBitmap.create(`atkrace_xian_1`);
		line.width = view.width;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view);
		this.addChild(line);

		let challBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `atkraceChallengeViewTitle`, ()=>{
			if(!this.vo.getAttendQuality()){
				App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundNoAttend")));
				return;
			}
			if(this.vo.isActyEnd()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
				return;
			}
			if(view.vo.getCurperiod() == 3){
                App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime4`));
                return;
            }
			if(!this.vo.getJoinIn()){
				App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip4")));
				return;
			}
			let tmp:any =[];
			tmp.type=1;//挑战
			tmp.battleground = true;
			tmp.uid = data.uid;
			tmp.code = this._code;
			AtkraceChallengeItem.data = tmp;
			ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
		}, this);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, challBtn, view, [0,20]);
		challBtn.visible = data.uid != Api.playerVoApi.getPlayerID();
		this.addChild(challBtn);	
	}

	private clickItemHandler(event: egret.TouchEvent): void {
		
		this.showUserInfo();
	}
    private getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.code)){
            return cnName + "-" + this.code;
        } else {
            return cnName + "-" + defaultCode;
        }
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
			fuid : this._data.uid,
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