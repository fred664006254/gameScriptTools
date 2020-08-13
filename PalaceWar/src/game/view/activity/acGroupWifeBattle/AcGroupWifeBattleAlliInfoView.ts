/*
author : qianjun---wxz
desc : 帮会争顶 帮派详情信息
*/
class AcGroupWifeBattleAlliInfoView extends PopupView{
	private _list : ScrollList = null;
	private _chalBtn : BaseButton = null;
	private _numText:BaseTextField = null;
	public constructor(){
		super();
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

	protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }

	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		let alliinfo = view.vo.getAllInfoById(view.param.data.alliId);
		return {requestType:NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETALNDETAIL,requestData:{
			activeId : view.vo.aidAndCode,
			allianceId : alliinfo.mid
		}};
    }
	
	private _data : any[] = [];
	private _isfresh = false;
	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let view = this;
		view._data = [];
        if(data.data.data && data.data.data.allianceList){
			view._data = data.data.data.allianceList;
			view._data.sort((a,b)=>{
				return a.myrank - b.myrank;
			});
        }
		if(view._isfresh)
		{
			view._isfresh = false;
			this.freshList();
		}
		//view.api.setBossNumInfo(data.data.data);
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"acmidautumnview_titlebg","rank_line","rankinglist_rankn1","rankinglist_rankn2",
			"rankinglist_rankn3","rankbgs_1","rankbgs_2","rankbgs_3"
		]);
    }

	public initView():void
	{		
		let view = this;

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHALLENGE), view.challengeCallback, view)

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_GROUPWIFEBATTLE_BATTLEEND,view.battleEnd,view);

		let alliinfo = view.vo.getAllInfoById(view.param.data.alliId);

		let abg = BaseBitmap.create(`public_9_bg4`);
		abg.width = 530;
		abg.height = 575;
		abg.setPosition(this.viewBg.x + this.viewBg.width / 2 - abg.width / 2,70);
        view.addChildToContainer(abg);

		let bg = BaseBitmap.create(`public_popupscrollitembg`);
		bg.width = abg.width-10;
		bg.height = abg.height-15;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2,80);
		view.addChildToContainer(bg);

		let mask = BaseBitmap.create(`public_9_bg37`);
		mask.width = bg.width;
		mask.height = 40;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, mask, bg);
		view.addChildToContainer(mask);

		let title1Text = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleAlliRank-${view.getUiCode()}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, title1Text, mask, [40, 0]);
		view.addChildToContainer(title1Text);

		let title2Text = ComponentManager.getTextField(LanguageManager.getlocal(`ranknickName`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, title2Text, mask);
		view.addChildToContainer(title2Text);

		let title3Text = ComponentManager.getTextField(LanguageManager.getlocal(`acPunish_score`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, title3Text, mask, [60, 0]);
		view.addChildToContainer(title3Text);
		
        let alliNameText = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleAlliName-${view.getUiCode()}`, [alliinfo.alliName]), 20, TextFieldConst.COLOR_BROWN);
        alliNameText.setPosition(view.viewBg.x + 40+GameData.popupviewOffsetX,15);
		view.addChildToContainer(alliNameText);
		
		let serverText = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleAlliRankServer-${view.getUiCode()}`, [Api.mergeServerVoApi.getAfterMergeSeverName(null, true, alliinfo.server)]), 20, TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, serverText, alliNameText, [0, alliNameText.textHeight + 10]);
		view.addChildToContainer(serverText);

		let numText = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleAlliNum-${view.getUiCode()}`, [alliinfo.num.toString(), alliinfo.total.toString()]), 20, TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, numText, bg, [15, alliNameText.textHeight + 10]);
		view.addChildToContainer(numText);
		numText.y = serverText.y;
		this._numText = numText;
        
		let rect = egret.Rectangle.create();
        rect.setTo(0,0,530,bg.height - 40 - 10);
        
        let arr = [];
        for(let i in view._data){
			let unit = view._data[i];
            arr.push({
                name : unit.name,
                rank : unit.myrank,
				score : unit.value,
				alliId : view.param.data.alliId,
				uid : unit.uid,
				alive : unit.alive
            });
        }

		let scrollList = ComponentManager.getScrollList(AcGroupWifeBattleAlliInfoItem,arr,rect,view.code);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, mask, [0,mask.height]);
		scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		view.addChildToContainer(scrollList);
		view._list = scrollList;
		scrollList.bounces = false;

		let challBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `atkraceChallengeViewTitle`, ()=>{
			if(!this.vo.getAttendQuality()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleNoAttend-${this.getUiCode()}`));
				return;
			}
			if(view.vo.isActyEnd()){
                App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
                return;
			}
			if(view.vo.getCurperiod() == 3){
                App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime4`));
                return;
			}
			if(view.vo.getAttendQuality() && view.vo.getJoinIn()){
				//打开挑战弹窗
				ViewController.getInstance().openView(ViewConst.POPUP.ACGROUPWIFEBATTLESELECTVIEW,{
					code : view.code,
					aid : view.aid,
					alliId : view.param.data.alliId,
					mem : view._data
				});
			}
			else{
				App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
			}
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, challBtn, bg, [0, bg.height+15]);
		view.addChildToContainer(challBtn);
		challBtn.visible = view.vo.getAttendQuality() && view.vo.getJoinIn() && !view.vo.isAlliOut(view.param.data.alliId);
		view._chalBtn = challBtn;

		// if(Api.switchVoApi.checkOpenAtkracegChangegpoint()){
		// 	let cdText = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleTip12-${view.getUiCode()}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		// 	App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cdText, scrollList, [0, scrollList.height + 100]);
		// 	view.addChildToContainer(cdText);
		// }
	}

	private _end : boolean;


	public tick():void{
		let view = this;
		// if(view.vo.isActyEnd() && !view._end){
		// 	view._end = true;
		// 	view.freshList();
		// }
		view._chalBtn.visible = view.vo.getAttendQuality() && view.vo.getJoinIn() && !view.vo.isAlliOut(view.param.data.alliId);
	}

	private freshList():void{
		let view = this;
        let arr = [];
        for(let i in view._data){
			let unit = view._data[i];
            arr.push({
                name : unit.name,
                rank : unit.myrank,
				score : unit.value,
				alliId : view.param.data.alliId,
				uid : unit.uid,
				alive : unit.alive
            });
        }
		view._list.refreshData(arr,view.code);

		let alliinfo = view.vo.getAllInfoById(view.param.data.alliId);
		this._numText.text = LanguageManager.getlocal(`acGroupWifeBattleAlliNum-${view.getUiCode()}`, [alliinfo.num.toString(), alliinfo.total.toString()]);
	}

	private challengeCallback(event: egret.Event):void
	{
		if(event.data.ret && event.data.data.ret == 0)
		{
			let view = this;

			ViewController.getInstance().hideView(ViewConst.POPUP.ACGROUPWIFEBATTLESELECTVIEW);
			
			this._isfresh = true;
			let alliinfo = view.vo.getAllInfoById(view.param.data.alliId);
			this.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETALNDETAIL,{activeId:view.vo.aidAndCode,allianceId : alliinfo.mid});
		}
	}

	private battleEnd(event: egret.Event):void
	{
		let view = this;
		this._isfresh = true;
		let alliinfo = view.vo.getAllInfoById(view.param.data.alliId);
		this.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETALNDETAIL,{activeId:view.vo.aidAndCode,allianceId : alliinfo.mid});
	}

	protected getShowHeight():number{
		return 800;
	}

	protected getShowWidth():number{
		return 560;
	}

	protected getTitleStr():string{
		return `acGroupWifeBattleAlliInfo-${this.getUiCode()}`;
	}

	public dispose():void{
		let view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHALLENGE),view.challengeCallback,view);		
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_GROUPWIFEBATTLE_BATTLEEND,this.battleEnd,this);
		view._end = false;
		view._list = null;
		view._chalBtn = null;
		this._numText = null;
		this._isfresh = false;
		super.dispose();
	}
}