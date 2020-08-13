/**
 选择对战信息列表
 * author qianjun
 */
class AcBattleGroundSelectItem extends ScrollListItem
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

	public initItem(index:number,bData:any,itemparam?):void
	{
		this.width = 520;
		this.height = 140  + this.getSpaceY();
		// childInfo.total
		this._data = bData;
		this._code = itemparam;
		this._itemIndex = index;
		
		let bg:BaseBitmap = BaseBitmap.create("public_listbg");
		bg.width = this.width;
		bg.height = this.height - this.getSpaceY();
		this.addChild(bg);

		 let leftBg = BaseBitmap.create("public_left");
		leftBg.width = 130;
		leftBg.height = 120;
		leftBg.x = 5.5;
		leftBg.y = 5.5;
		this.addChild(leftBg);


		let iconContainer = new BaseDisplayObjectContainer();
		this.addChild(iconContainer);
		let headContainer = Api.playerVoApi.getPlayerCircleHead(Number(bData.pic),Number(bData.ptitle));
		iconContainer.addChild(headContainer);
		iconContainer.width = 103;
		iconContainer.height = 100;

		let nameStr = bData.name + " " +  Api.mergeServerVoApi.getAfterMergeSeverName(bData.uid);
		this._nameTf = ComponentManager.getTextField(nameStr,20, TextFieldConst.COLOR_BROWN);
		this.setLayoutPosition(LayoutConst.lefttop, this._nameTf, bg, [leftBg.x + leftBg.width + 15, 30]);
		this.addChild(this._nameTf);

		this.setLayoutPosition(LayoutConst.leftverticalCenter, iconContainer, bg, [15,-8]);
		
		let rankTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundSelectRank"), [bData.rank]), 20, TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rankTxt, this._nameTf, [0,this._nameTf.textHeight + 17]);
		this.addChild(rankTxt);
		
		let scoreTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundSelectScore"), [bData.score]), 20, TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, scoreTxt, rankTxt, [0,rankTxt.textHeight + 8]);
		this.addChild(scoreTxt);
		
		let tmp:any =[];
		tmp.uid=bData.uid;
		tmp.battleground = true;
		tmp.code = this._code;
	

		let killBtn = ComponentManager.getButton(ButtonConst.BTN_COMMON, `atkraceVisitTab3`, ()=>{
			if(!this.vo.getAttendQuality()){
				App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundNoAttend")));
				return;
			}
			if(this.vo.isActyEnd()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
				return;
			}
			if(this.vo.getCurperiod() == 3){
				App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime4`));
				return;
			}
			//追杀
			tmp.type=3;//追杀
			AtkraceChallengeItem.data = tmp;
			ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
		}, this);
		killBtn.setScale(0.65);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, killBtn, bg, [15,20]);
		this.addChild(killBtn);


		let challBtn = ComponentManager.getButton(ButtonConst.BTN_COMMON, `atkraceChallengeViewTitle`, ()=>{
			if(!this.vo.getAttendQuality()){
				App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundNoAttend")));
				return;
			}
			if(this.vo.isActyEnd()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
				return;
			}
			if(this.vo.getCurperiod() == 3){
				App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime4`));
				return;
			}
			//挑战
			tmp.type=1;//挑战
			AtkraceChallengeItem.data = tmp;
			ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
		}, this);
		challBtn.setScale(0.65);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, challBtn, killBtn, [0,killBtn.height * killBtn.scaleX + 10]);
		this.addChild(challBtn);	
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