/**
 * 姻缘记录item
 * author 钱竣
 */
class AdultYinYuanRecordScrollItem extends ScrollListItem
{
	private _data:any;
	private _arrow1 : BaseBitmap = null;
	private _list1 : ScrollList = null;

	public constructor() 
	{
		super();
	}
	//{total:number,fatherName:string,et:number,id:number,aquality:number,st:number,name:string,uid:number,sex:number}
	public initItem(index:number,data:any):void
	{
		let view = this;
		view._data = data;
		view.width = 530;
		
		let separate1 = BaseBitmap.create('public_listbtn');
		separate1.width = 525;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, separate1, view, [0, 7]);
		view.addChild(separate1);
		separate1.addTouchTap(view.arrow1click, view);

		let arrow1 = BaseBitmap.create('friends_arrow2');
		arrow1.anchorOffsetX = arrow1.width / 2;
		arrow1.anchorOffsetY = arrow1.height / 2;
		arrow1.rotation = data.show ? 0 : 180;
		
		let qinjiaTxt = ComponentManager.getTextField(LanguageManager.getlocal(`adultyinyuanrecordTitle${data.index + 1}`), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		let param1 = (separate1.width - arrow1.width - qinjiaTxt.textWidth - 5) / 2;
		view._arrow1 = arrow1;

		this.setLayoutPosition(LayoutConst.leftverticalCenter, qinjiaTxt, separate1, [param1, 0]);
		this.addChild(qinjiaTxt);

		this.setLayoutPosition(LayoutConst.lefttop, arrow1, qinjiaTxt, [qinjiaTxt.textWidth + 5 + arrow1.width / 2, arrow1.height / 2 - 5]);
		this.addChild(arrow1);

		let empTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acPunishNoData`), 22, TextFieldConst.COLOR_LIGHT_YELLOW); 
		this.addChild(empTxt);
		empTxt.visible = false;
		if(data.show){
			let info = Api.adultVoApi.getALlMarryPlayerInfo();
			let arr = [];
			for(let i = 0; i < info[data.param].length; ++ i){
				let unit = info[data.param][i];
				arr.push({
					uid : unit.uid,
					name : unit.name,
					pic : unit.pic,
					level : unit.level,
					power : unit.power,
					mygname : unit.mygname,
					offtime : unit.olt,//olt
					type : data.type,
					friend : unit.friend,
					title : unit.ptitle,
					childid : data.childid
				});
			}
			arr.sort((a,b)=>{
				if(data.param == 'notsadun'){
					let lynuma = Api.adultVoApi.getLyinnum(a.uid);
					let lynumb = Api.adultVoApi.getLyinnum(b.uid);
					if(lynuma == lynumb){
						if(a.power == b.power){
							return a.uid - b.uid;
						}
						else{
							return b.power - a.power
						}
					}
					else{
						return lynumb - lynuma;
					}
				}
				else{
					let baifanga = Api.adultVoApi.isUidVisited(a.uid);
					
					let baifangb = Api.adultVoApi.isUidVisited(b.uid);
					
					let laifanga = Api.adultVoApi.isLaifang(a.uid);
					let laifangb = Api.adultVoApi.isLaifang(b.uid);
					let hufanga = laifanga && baifanga;
					let hufangb = laifangb && baifangb;
					
					if(hufanga && hufangb){
						if(a.friend == b.friend){
							return b.power - a.power;
						}
						else{
							return b.friend - a.friend
						}
					}
					else if(hufanga && !hufangb){
						return -1;
					}
					else if(!hufanga && hufangb){
						return 1;
					}
					else{
						if(baifanga && baifangb){
							if(a.friend == b.friend){
								return b.power - a.power;
							}
							else{
								return b.friend - a.friend
							}
						}
						else if(baifanga && !baifangb){
							return -1;
						}
						else if(!baifanga && baifangb){
							return 1;
						}
						else{
							if(laifanga && laifangb){
								if(a.friend == b.friend){
									return b.power - a.power;
								}
								else{
									return b.friend - a.friend
								}
							}
							else if(laifanga && !laifangb){
								return -1;
							}
							else if(!laifanga && laifangb){
								return 1;
							}
							else{
								if(a.friend == b.friend){
									return b.power - a.power;
								}
								else{
									return b.friend - a.friend
								}
							}
						}
					}
					// return b.friend - a.friend;
				}
			});
			let tmpRect =  new egret.Rectangle(0,0,530,arr.length * 132);
			let scrollList = ComponentManager.getScrollList(AdultPlayerInfoScrollItem, arr, tmpRect);
			view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, separate1, [0, separate1.height]);
			//scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData") );
			view.addChild(scrollList);
			view._list1 = scrollList; 
			empTxt.visible = arr.length == 0;
		}
		if(empTxt.visible){
			this.setLayoutPosition(LayoutConst.horizontalCentertop, empTxt, separate1, [0, separate1.height + 6]);
		}
		else{
			this.height -= 5;
		}

	}

	private arrow1click():void{
		let view = this;
		let list: any = view.parent.parent;
		let arr = list._dataList;

		if(view._arrow1.rotation == 0){
			view._arrow1.rotation = 180;
		}
		else{
			view._arrow1.rotation = 0;
		}

		for(let i in arr){
			let show = view._arrow1.rotation == 0;
			if(arr[i].param == this._data.param){
				arr[i].show = show;
			}
		}
		// arr[view._data.index].show = view._arrow1.rotation == 0;
		list.refreshData(arr);
	}

	private clickItemHandler(event: egret.TouchEvent): void {
		
		this.showUserInfo();
	}

	private showUserInfo()
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._data.uid});
	}
	
	private cancelBlock()
    {
		let data = this._data;	
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSE_SADUNMARRY,{"fuid":this._data.uid,"childId":this._data.id});	
	}

	private userShotCallback(event:egret.Event)
    {
        let data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
            ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW,data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
    }


	public dispose():void
	{
		this._data = null;
		if(this._arrow1){
			this._arrow1.removeTouchTap();
			this._arrow1 = null;
		}
		if(this._list1){
			this._list1 = null;
		}
		super.dispose();
	}
}