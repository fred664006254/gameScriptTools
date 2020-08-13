/**
 * 选择好友
 */
class ZhenqifangSelectFriendView extends PopupView
{
	private _scrollView:ScrollList = null;
	private _emptyTipNode:BaseDisplayObjectContainer;
	private _list : ScrollList = null;
	private _selIndex = 0;
	private _sendbtn : BaseButton = null;

    public constructor() 
	{
		super();
	}

	private get cfg(){
        return Config.ZhenqifangCfg;
    }
    private get api(){
        return Api.zhenqifangVoApi;
	}

    protected getTitleStr():string{
        return `ZhenqifangShopSelectFriend`;
    }

	protected getResourceList():string[]
	{
		let resArr:string[]=["friends_applyflag","friends_arrow1","friends_arrow2",
        "friends_progress","friends_progressbg","progress3_bg",
        "arena_bottom","friends_seprate_bg","friend_bigBtn_down","friend_bigBtn","friends_sendflag",`countrywarrewardview_itembg`];
		return super.getResourceList().concat(resArr);
	}

	protected initView():void
	{
		
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_GETINFO),this.receiveFriendData,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_FRIENDS_HIDE_FRIENDS_OR_SADUN,this.doRefreshList,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_SELECT,this.checkSelect,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_GETFRIENDSERVANT),this.servantlistcallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_SELECTSERVANT),this.sendCallback,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_SERVANT,this.doRefreshList,this);
		let topbg = BaseBitmap.create(`zqfselectfriendbg`);
		topbg.x = this.viewBg.width/2 - topbg.width/2;
        topbg.y = 15;
		this.addChildToContainer(topbg);
		let data = this.param.data.data;
		this._selIndex = this.param.data.index;
		let servantarr= [];
		let taskinfo = data.taskdata;
		let needcfg = this.param.data.data;
		let total = 0;
		for(let i in taskinfo.svtInfo){
			let unit = taskinfo.svtInfo[i];
			servantarr.push({
				empty : unit.sid ? false : true,
				servantID : unit.sid ? unit.sid : 0,
				type : data.type,
				taskId : data.taskId,
				note : unit.note ? unit.note : null,
				requirement : unit.requirement ? unit.requirement : null,
				insend : unit.sid ? true : false,
				index : Number(i) + 1,
				friend : data.friend,
				needfriend : unit.friend,
				clv : unit.clv ? unit.clv : 0,
				equip : unit.equip ? unit.equip : ``,
				deduction : unit.deduction ? unit.deduction : 0,
				onlyshow : true,
				tabindex : this.param.data.tabindex
			});
		}
		
		let tmpRect2 = new egret.Rectangle(0,0,500,110);
		let servantlist = ComponentManager.getScrollList(ZhenqifangServantItem,servantarr,tmpRect2);
		servantlist.verticalScrollPolicy = `off`;
		servantlist.setContentPosY(10);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, servantlist, topbg, [0,0]);
		this.addChildToContainer(servantlist);
		this._list = servantlist;

		let item = <ZhenqifangServantItem>servantlist.getItemByIndex(this._selIndex);
		item.setSelect(true);

		let notebg:BaseBitmap = BaseBitmap.create("countrywarrewardview_itembg");
		notebg.width = 520;
		notebg.x = topbg.x + topbg.width/2 - notebg.width/2;
		notebg.y = servantlist.y + servantlist.height + 2;
		this.addChildToContainer(notebg);
		notebg.name = `notebg`;
		
		let notedescTF = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangcdtip21`, [`${LanguageManager.getlocal(`zhenqifangnote${needcfg.note}`)} >= ${total}`]), 20);
		notedescTF.textAlign = TextFieldConst.ALIGH_LEFT;
		notedescTF.x = notebg.x + (notebg.width -  notedescTF.width) / 2;
		notedescTF.y = notebg.y + (notebg.height - notedescTF.textHeight) / 2 + 1;
		this.addChildToContainer(notedescTF);
		notedescTF.name = `notedescTF`;

		let notetipbg = BaseBitmap.create(`public_itemtipbg2`);
		notetipbg.width = 510;
		this.addChildToContainer(notetipbg);

		let notetipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangcdtip4`, [((Config.ZhenqifangCfg.friend.deduction) * 100).toFixed(0)]),20, TextFieldConst.COLOR_BROWN);
		notetipTxt.textAlign = TextFieldConst.ALIGH_CENTER;
		notetipTxt.width = 480;
		notetipTxt.lineSpacing = 5;
		this.addChildToContainer(notetipTxt);

		notetipbg.height = notetipTxt.height + 20;
		notetipbg.x =  topbg.x + topbg.width/2 - notetipbg.width/2;
		notetipbg.y = notebg.y + notebg.height + 2;
		
		notetipTxt.x = notetipbg.x + (notetipbg.width - notetipTxt.width) / 2;
		notetipTxt.y = notetipbg.y + (notetipbg.height - notetipTxt.height) / 2;
		notetipTxt.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		
		let bg = BaseBitmap.create(`public_9_bg4`);
        bg.width = 532;
		bg.height = 520;
		bg.x = this.viewBg.width/2 - bg.width/2;
        bg.y = topbg.y + topbg.height + 2;
        this.addChildToContainer(bg);

        let rect = new egret.Rectangle(0,0,bg.width - 10,bg.height - 10);
		this._scrollView = ComponentManager.getScrollList(ZhenqifangSelectFriendItem,[],rect);
       	App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._scrollView, bg, [0,5]);
		this.addChildToContainer(this._scrollView);
		
		for(let i in this.api.friendobj[this.param.data.tabindex]){
			let unit = this.api.friendobj[this.param.data.tabindex][i];
			if(unit){
				let item = <ZhenqifangServantShowItem>servantlist.getItemByIndex(Number(i));
				if(item && unit && unit.id){
					item.addServant(unit);
				}
			}
		}

		let sendBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `allianceTaskSendBtnTxt`, ()=>{
			//
			if(sendBtn.getIsGray()){
				App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip8"));
				return;
			}
			let servantarr = [];
			let list : any = this._list;
			for(let i in list._scrollListItemArr){
				let unit : ZhenqifangServantItem = list._scrollListItemArr[i];
				if(unit.curServantId && Number(unit.curServantId) > 0){
					servantarr.push({
						sid : unit.curServantId,
						uid : unit.getUid()
					});
				}
			}
			//派遣
			let index = this.param.data.tabindex;
			Api.zhenqifangVoApi.selIdx = index;
			NetManager.request(NetRequestConst.REQUEST_ZQF_SELECTSERVANT,{
				idx : index + 1, 
				taskType : data.friend ? 2 : 1,
				slist : servantarr, 
				cts : data.taskdata.cts
			});
			
		}, this);
		this.addChildToContainer(sendBtn);
		sendBtn.setGray(true);
		this._sendbtn = sendBtn;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendBtn, bg, [0,bg.height+10]);
		
		this.doRequestFriendList();
		this.freshNote();
	}

	protected doRequestFriendList()
	{
		NetManager.request(NetRequestConst.REQUEST_FRIEND_GETINFO,{});
	}

	protected receiveData(data: { ret: boolean, data: any }): void
    {
		if(data.ret){
			let rData = data.data;
			if(rData.ret == 0)
			{
				let cmd = rData.cmd;
				if(cmd == NetRequestConst.REQUEST_SADUN_GETFRIENDLISTINFO){
					Api.friendVoApi.sadunList = rData.data.sadunList;
				}
			}
		}
    }
	protected getRequestData():{requestType:string,requestData:any} 
	{
		if(Api.switchVoApi.checkopenSadun()){
			return {requestType:NetRequestConst.REQUEST_SADUN_GETFRIENDLISTINFO,requestData:{}};
		}
		return null;
	}


	protected doRefreshList()
	{
		let uiType = null;
		let dataList = [];
		let friendDataList = [];
		let sadunList = [];
		// Api.friendVoApi.sadunList
		let sadun = Api.friendVoApi.sadunList;
		let total = Config.ZhenqifangCfg.friend.supportTimes;
		if(Api.friendVoApi.isHideFriendsList() == false){
			for (var index = 0; index < Api.friendVoApi.friendList.length; index++) {
				let tmpData = Api.friendVoApi.friendList[index];
				if(Api.friendVoApi.isFriendByUid(tmpData.uid)){
					let notsadun = true;
					for(let i in sadun){
						if(sadun[i].uid == tmpData.uid){
							notsadun = false;
							break;
						}
					}
					if(notsadun){
						tmpData["num"] = total - Api.zhenqifangVoApi.getFriendSupportTimes(tmpData.uid);
						tmpData["uiType"] = FriendScrollItem.UITYPE1;
						uiType = FriendScrollItem.UITYPE1;
						friendDataList.push(tmpData);
					}
					
				}
			}
			friendDataList.sort((dataA:any,dataB:any)=>{
				if(dataB["num"] == dataA["num"]){
					return dataB["power"] -  dataA["power"];
				}
				else{
					return dataB["num"] -  dataA["num"];
				}
			});
		}
		if(Api.switchVoApi.checkopenSadun()){
			if(Api.friendVoApi.isHideSaduList() == false){
				// sadunList = Api.friendVoApi.sadunList;
				for (var index = 0; index < Api.friendVoApi.sadunList.length; index++) {
					let tmpData = Api.friendVoApi.sadunList[index];
					tmpData["uiType"] = FriendScrollItem.UITYPE7;
					uiType = FriendScrollItem.UITYPE7;
					tmpData["num"] = total - Api.zhenqifangVoApi.getFriendSupportTimes(tmpData.uid);
					sadunList.push(tmpData);
				}
				sadunList.sort((dataA:any,dataB:any)=>{
					if(dataB["num"] == dataA["num"]){
						if(dataB["friend"] == dataA["friend"]){
							return dataB["power"] -  dataA["power"];
						}
						else{
							return dataB["friend"] -  dataA["friend"];
						}
					}
					else{
						return dataB["num"] -  dataA["num"];
					}
					
				});
			}
			dataList.push({sadTitle:true});//亲家标题
			dataList = dataList.concat(sadunList);
			dataList.push({friendsTitle:true});//亲家标题
		}
		
		dataList = dataList.concat(friendDataList);
		if(this._scrollView)
		{
			this._scrollView.refreshData(dataList,{uiType:uiType});
		}
		let isEmpty = true;
		if( Api.friendVoApi.sadunList.length > 0 || Api.friendVoApi.friendList.length > 0){
			isEmpty = false;
		}
		if( (Api.switchVoApi.checkopenSadun() && dataList.length == 2) &&  isEmpty)
		{
			if(!this._emptyTipNode){
				this._emptyTipNode = new BaseDisplayObjectContainer();
				this.addChild(this._emptyTipNode);

				// let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("friends_emptyTip1"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
				// tipTxt.x = GameConfig.stageWidth/2 - tipTxt.width/2;
				// tipTxt.y = GameConfig.stageHeigth/2  - tipTxt.height/2 - 90;
				// this._emptyTipNode.addChild(tipTxt);
			}
			this._emptyTipNode.visible = true;
		}else{
			if(this._emptyTipNode)
			{
				this._emptyTipNode.visible = false
			}
		}
		this.freshView();
    }
    
	protected receiveFriendData(data: egret.Event): void
    {
		if(data.data.ret){
			let rData = data.data.data;
			if(rData.ret == 0)
			 {
				 let cmd = rData.cmd;
				 Api.friendVoApi.friendList = rData.data.friendList;
				 this.doRefreshList();
			 }
			 this.freshView();
		}
	}
	
	public getShowWidth():number{
		return 590;
	}

	private servantlistcallback(evt : egret.Event):void{
		let view = this;
		if(evt.data.ret){
			let data = evt.data.data.data;
			if(data){
				let allServantInfo = {};
				//let allKey:string[] = Object.keys(data.svtList);//Api.servantVoApi.getServantInfoIdListByProperty(data.type);
				let showTab:any[] = [];
				let needcfg = view.param.data.data;
	
				for (let k in data.svtList){
					let key:string = k;
					let mainAtr = 0;
					let attr = '';
					let servantInfoObj = data.svtList[k];
					servantInfoObj.book1 = servantInfoObj.anumArr[0];
					servantInfoObj.book2 = servantInfoObj.anumArr[1];
					servantInfoObj.book3 = servantInfoObj.anumArr[2];
					servantInfoObj.book4 = servantInfoObj.anumArr[3];
					servantInfoObj.book0 = servantInfoObj.book1 + servantInfoObj.book2 + servantInfoObj.book3 + servantInfoObj.book4;
					servantInfoObj.level = servantInfoObj.lv;
					if(needcfg.note){
						mainAtr = servantInfoObj[needcfg.note];
						attr = `zhenqifangnotetotal`
						// attr = `zhenqifangnote${needcfg.note}`;  
						showTab.push({
							'servantId':key,
							'equip':servantInfoObj.equip,
							'support':true,
							'text':LanguageManager.getlocal(attr),
							'inBuzhen':Api.zhenqifangVoApi.haveInBuzhen(key, true, data.fuid),
							'value':mainAtr,
							'need' : needcfg.requirement,
							'level':servantInfoObj.level,
							'clv':servantInfoObj.clv,
							total : servantInfoObj.total,
							insend : Api.zhenqifangVoApi.friendsendList[data.fuid] && Api.zhenqifangVoApi.friendsendList[data.fuid][key],
						});
					}
					else{
						mainAtr = servantInfoObj[`total`];
						attr = `zhenqifangnotetotal`;  
						showTab.push({
							'servantId':key,
							'equip':servantInfoObj.equip,
							'support':true,
							'text':LanguageManager.getlocal(attr),
							'inBuzhen':Api.zhenqifangVoApi.haveInBuzhen(key, true, data.fuid),
							'value':mainAtr,
							'level':servantInfoObj.level,
							'clv':servantInfoObj.clv,
							total : servantInfoObj.total,
							insend : Api.zhenqifangVoApi.friendsendList[data.fuid] && Api.zhenqifangVoApi.friendsendList[data.fuid][key],
						});
					}
					
				}
				showTab.sort((a,b)=>{
					if(a.inBuzhen && b.inBuzhen){
						return b.value - a.value;
					}
					else if(a.inBuzhen){
						return 1;
					}
					else if(b.inBuzhen){
						return -1;
					}
					else{
						return b.value - a.value;
					}
				});
				ViewController.getInstance().openView(ViewConst.POPUP.ZHENQIFANGSELECTSERVANTVIEW,{
					needtext : needcfg.note ? `${LanguageManager.getlocal(`zhenqifangnote${needcfg.note}`)} >= ${needcfg.requirement}` : null,
					"info":showTab,
					callback:(data)=>{
						if(Api.zhenqifangVoApi.otherinfo && Api.zhenqifangVoApi.otherinfo.times){
							data.freind = Api.zhenqifangVoApi.otherinfo.friend;
							data.times = Api.zhenqifangVoApi.otherinfo.times;
						}
						
						Api.zhenqifangVoApi.otherinfo = null;	
						let item = <ZhenqifangServantItem>this._list.getItemByIndex(this._selIndex);
						item.fresh_servant(data);
						this.getSelectIndex();
					},
					handler:this,
					uid:data.fuid,
					friend:1
				});
			}
			this.freshView();
		}
	}

	private checkSelect(evt : egret.Event):void{
		this._selIndex = evt.data;
		this.freshView();
		this.freshNote();
	}

	private freshNote():void{
		let view = this;
		let notebg = view.container.getChildByName(`notebg`);
		let notedescTF = <BaseTextField>view.container.getChildByName(`notedescTF`);
		let data = this.param.data.data;
		let taskinfo = data.taskdata;
		let total = 0;
		let unit = taskinfo.svtInfo[this._selIndex];
		if(unit.note){
			total = unit.requirement;
			notedescTF.text = LanguageManager.getlocal(`zhenqifangcdtip20`, [`${LanguageManager.getlocal(`zhenqifangnote${unit.note}`)} >= ${total}`]);
		}
		else{
			notedescTF.text = LanguageManager.getlocal(`zhenqifangcdtip21`);
		}
		notedescTF.x = notebg.x + (notebg.width -  notedescTF.width) / 2;
		notedescTF.y = notebg.y + (notebg.height - notedescTF.textHeight) / 2 + 1;
	}


	protected getShowHeight():number{
		return 900;
	}

	public hide():void{
		let data = [];
		if(this._list){
			for(let i = 0; i < 5; ++ i){
				let item = <ZhenqifangServantItem>this._list.getItemByIndex(i);
				if(item){
					let obj : any = {};
					if(item.getUid()){
						obj = this.api.friendobj[this.param.data.tabindex][i];
					}
					data.push(obj);
				}
			}
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_ADDSERVANT, {
				data : data,
				index : this.param.data.tabindex
			});
		}
		super.hide();
	}

	private getSelectIndex():void{
		for(let i = 0; i < 5; ++ i){
			let item = <ZhenqifangServantItem>this._list.getItemByIndex(i);
			if(item.checkEmpty()){
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_SELECT, i);
				break;
			}
		}
		this.doRefreshList();
	}

	private freshView():void{
		let view = this;
        let list : any = view._list;
        let servantnum = 0;
        //门客派遣
		let data = view.param.data.data;
        let issend = data.st > 0;
        if(issend){
        }
        else{
            for(let i in list._scrollListItemArr){
                let unit : ZhenqifangServantItem = list._scrollListItemArr[i];
                if(unit.curServantId && Number(unit.curServantId) > 0){
                    ++ servantnum;
                }
            }
        }
		if(view._sendbtn){
            view._sendbtn.setGray(servantnum < list._scrollListItemArr.length);
        }
	}

	private sendCallback(evt : egret.Event):void{
		if(evt.data.ret){
			let view = this;
			if(evt.data.data.data){
				view.hide();
			}
		}
	}

    public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_FRIEND_GETINFO),this.receiveFriendData,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FRIENDS_HIDE_FRIENDS_OR_SADUN,this.doRefreshList,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_GETFRIENDSERVANT),this.servantlistcallback,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_SELECT,this.checkSelect,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ZQF_SELECTSERVANT),this.sendCallback,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_SERVANT,this.doRefreshList,this);
		this._scrollView = null;
		this._emptyTipNode = null;
		this._list = null;
		this._selIndex = 0;
		this._sendbtn = null;
		super.dispose();
	}

}