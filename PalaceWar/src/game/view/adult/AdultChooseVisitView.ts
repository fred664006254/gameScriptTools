/**
 * 联姻选择拜访对象弹窗
 * author 钱竣
 */
class AdultChooseVisitView extends PopupView
{
	public constructor() 
	{
		super();
	}
	private _list : ScrollList = null;

	private get cfg() : any{
        return Config.SadunCfg;
    }

    private get api() : AdultVoApi{
        return <AdultVoApi>Api.adultVoApi;
    }

    // private get acTivityId() : string{
    //     return `${AcWorldCupView.AID}-${AcWorldCupView.CODE}`;
	// }
	
	protected getTitleStr() : string{
		return 'adultchoosevisitviewTitle';
	}

	protected resetBgSize() : void{
		super.resetBgSize();

		if (this.getBgName() != "public_rule_bg") {
			this.closeBtn.y = this.viewBg.y - 15;
			this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 15);
		}
		else {
			this.closeBtn.y = this.viewBg.y - 18;
			this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 37);
		}
	}

	protected initView():void
	{
		let view = this;
		view.viewBg.width = 560;
		view.viewBg.height = 860;
		
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_GETVISITME),this.getvisitCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_VISIT),view.visitCallback,this);
		//App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SUDANFRESH,this.doRefresh,this);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
		// view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0,12]);

		let bg : BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		bg.height = 770;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view.viewBg, [0,70]);
		view.addChild(bg);
		// let bg : BaseBitmap = BaseBitmap.create("public_9_bg44");
		// bg.width = kuang.width - 10;
		// bg.height = kuang.height - 10;
		// view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, kuang);
		// view.addChild(bg);
		let childInfo = Api.adultVoApi.getAdultInfoVoById(this.param.data.childId);
		this.request(NetRequestConst.REQUEST_SADUN_GETVISITME, { aquality: childInfo.aquality ,sex : childInfo.sex});

		
        let tmpRect =  new egret.Rectangle(0,0,520,bg.height - 10);
		let scrollList = ComponentManager.getScrollList(AdultPlayerInfoScrollItem, null, tmpRect);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg, [0, 5]);
		view.addChild(scrollList); 
		scrollList.setEmptyTip(LanguageManager.getlocal('adultnosadun'));
		view._list = scrollList;
	}

	private getvisitCallback(evt):void{
		if(evt.data.ret){
			Api.adultVoApi.setVisitInfo(evt.data.data.data.visitedmelist);
		}
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
		if(data.ret){
			if(!data.data.data)
			{
				return;
			}
			let laifanglist = data.data.data.visitedmelist;
			let qinjiainfo = Api.adultVoApi.getQinjiaInfo();
			let arr = [];
			for(let i in qinjiainfo){
				let unit = qinjiainfo[i];
				if(unit.times >= Config.SadunCfg.needNum){
					arr.push({
						childid : this.param.data.childId,
						uid : i,
						name : unit.name,
						pic : unit.pic,
						level : unit.level,
						power : unit.power,
						mygname : unit.mygname,
						offtime : unit.olt,
						type : 'choosevisit',
						friend : unit.friend,
						title : unit.ptitle,
						visiting : unit.visiting,
						laifang : typeof laifanglist[unit.uid] != 'undefined' && laifanglist[unit.uid] == 1
					});
				}
			}
			arr.sort((a,b)=>{
				let inviista = Api.adultVoApi.isUidInVisit(a.uid);
				let inviistb = Api.adultVoApi.isUidInVisit(b.uid);
				let visiteda = a.laifang;
				let visitedb = b.laifang;


				if (a.offtime && a.offtime != b.offtime)
				{
					return b.offtime - a.offtime;
				}

				if(visiteda && !visitedb){
					return -1;
				}
				else if(visitedb && !visiteda){
					return 1;
				}
				else{
					if(inviista && !inviistb){
						return 1;
					}
					else if(inviistb && !inviista){
						return -1;
					}
					else{
						return b.friend - a.friend;
					}
				}
			});
			this._list.refreshData(arr);
		}
	}

	private doRefresh():void{
		let view = this;

	}


	private visitCallback(evt):void{
		if(evt.data.ret){
			if(Number(evt.data.data.data.sadunstat)){
				let id = Api.adultVoApi.getVisitId();
				let name = '';
				if(id){
					name = Api.adultVoApi.getSadunInfoByUid(Api.adultVoApi.getVisitId()).name;
				}
				App.CommonUtil.showTip(LanguageManager.getlocal(`adultvisittip${Number(evt.data.data.data.sadunstat)}`, [name]));
				return;
			}
			let view = this;
			let data = evt.data.data.data;
			if(view.param.data.confirmCallback){
				view.param.data.confirmCallback.apply(view.param.data.handler,['visitSuccess']);
			}
			view.hide();
		}
	}

	public dispose():void
	{
		let view = this;
		view._list = null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_GETVISITME),this.getvisitCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_VISIT),view.visitCallback,this);
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SUDANFRESH,this.doRefresh,this);
		super.dispose();
	}
}