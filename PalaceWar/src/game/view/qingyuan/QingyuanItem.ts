/**
 * author:qianjun
 * desc:情缘绘卷Item
*/
class QingyuanItem extends ScrollListItem
{
	private _reddotgroup : BaseDisplayObjectContainer = null;
	public constructor() {
		super();
    }
    
    private _data : Config.EncounterCfg.EncounterInfoCfg = null;

	protected initItem(index:number,data:Config.EncounterCfg.EncounterInfoCfg){	
        let view = this;
        view._data = data;
        view.width = 531;
		view.height = 250 + 20;
		let type = data.type;

		let namebg = BaseBitmap.create(`qingyuanitemtitlebg`);
		let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal(`qingyuantitlename${data.type}`), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
		namebg.width = titleTxt.textWidth + 70;
		
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, namebg, view, [0,0], true);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titleTxt, namebg);
		titleTxt.addTouchTap(()=>{
			// ViewController.getInstance().openView(`QingyuantestView`, data);
		}, view, null);

		let bg = BaseBitmap.create(`qingyuanitembg${data.type}`);
		let kuang = BaseBitmap.create(`qingyuanitem${data.type}`);
		kuang.width = 515;
		kuang.height = 229;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, kuang, view, [0,17], true);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, kuang, [0,9]);
		view.addChild(bg);


		//人物形象
		// let poscfg = {
		// 	fourrenegade : [
		// 		{x : -9, y : 23, emptyx : 8, emptyy : 3, sid : 20011}, 
		// 		{x : 318, y : 22, emptyx : 299, emptyy : 8, sid : 20021}, 
		// 		{x : 232, y : 17, emptyx : 216, emptyy : 20, sid : 20031},
		// 		{x : 59, y : 15, emptyx : 82, emptyy : 5, sid : 20041}, 
		// 	],
		// };//(view.width - data.need.length * 150) / 2;
		let rolegroup = new BaseDisplayObjectContainer();
        rolegroup.width = 498;
        rolegroup.height = 211;
        rolegroup.x = bg.x;
		rolegroup.y = 26;
		rolegroup.name = `rolegroup`;
        rolegroup.mask = new egret.Rectangle(0,0, bg.width, bg.height);
		view.addChild(rolegroup);

		let qingyuanbg = BaseBitmap.create(`qingyuanbgmask`);
		qingyuanbg.width = 515;
		qingyuanbg.scaleY = 0.7;
		view.addChild(qingyuanbg);
		qingyuanbg.x = 8;
		qingyuanbg.y = 210;
		view.addChild(kuang);
		for(let i in data.need){
			let unit = data.need[i];
			let rewardvo = GameData.formatRewardItem(unit)[0];
			let str = ``;
			let id = rewardvo.id;
			let info = Api.encounterVoApi.getNeedInfo(data.type, id.toString());
			let role = BaseBitmap.create(`${type}role${id}`); 
			let poscfg = data.coordinateOutside[id];
			role.x = poscfg.x;
			role.y = poscfg.y;
			role.mask = new egret.Rectangle(0,0,role.width,357);
			rolegroup.addChild(role);
			role.name = `role${Number(i) + 1}`;
			role.setScale(0.7);

			if(info.isopen){
				//已解锁
				if(info.have && Api.encounterVoApi.getActiveBuffIndex(data.type, Number(i) + 1)){
					App.DisplayUtil.changeToNormal(role);
				}
				else{
					App.DisplayUtil.changeToAlpha(role);
				}
			}
			else{
				App.DisplayUtil.changeToBlack(role);
				// let square:egret.Shape = new egret.Shape();
				// square.graphics.beginFill(0x090b1a);
				// square.graphics.drawRect(role.x,role.y,role.width * role.scaleX, 250);
				// square.graphics.endFill();
				// square.alpha = 1;
				// rolegroup.addChild(square);
				// square.mask = role;

				// let unlock = BaseBitmap.create(`qingyuannpcempty`);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, unlock, role);
                // rolegroup.addChild(unlock);
			}
		}
		// view.setIndex();
		view.addChild(namebg);
		view.addChild(titleTxt);
		view.addTouchTap(()=>{
			//打开弹窗
			ViewController.getInstance().openView(ViewConst.POPUP.QINGYUANDETAILVIEW, data);
			//ViewController.getInstance().openView(`QingyuantestView`, data);
		}, view);

		let group = new BaseDisplayObjectContainer();
		view.addChild(group);
		view._reddotgroup = group;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, group, view, [0,30], true);
		
		let reddot = BaseBitmap.create(`qingyuannew`);
		group.addChild(reddot);
		group.visible = Api.encounterVoApi.checkRed(view._data.type);

		let click = ComponentManager.getCustomMovieClip(`qingyuanred`, 15, 70);
        click.width = 110;
		click.height = 81;
		click.playWithTime(-1);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, click, reddot, [-10,3]);
		group.addChild(click);
	}

	private setIndex():void{
		let view = this;
		let data = view._data;
		let type = data.type;
		let rolegroup = <BaseDisplayObjectContainer>view.getChildByName(`rolegroup`);

		let haveidx = 0;
		let nothaveidx = 0;
		let notopenidx = 0;
		let imageIndex = {
			have : {},
			nothave : {},
			notopen : {} 
		};
		for(let i in data.need){
			let unit = data.need[i];
			let rewardvo = GameData.formatRewardItem(unit)[0];
			let str = ``;
			let id = rewardvo.id;
			let info = Api.encounterVoApi.getNeedInfo(data.type, id.toString());
			if(info.isopen){
				//已解锁
				if(info.have && Api.encounterVoApi.getActiveBuffIndex(data.type, Number(i) + 1)){
					++ haveidx;
					imageIndex.have[Number(i) + 1] = haveidx;
				}
				else{
					++ nothaveidx;
					imageIndex.nothave[Number(i) + 1] = nothaveidx;
				}
			}
			else{
				++ notopenidx;
				imageIndex.notopen[Number(i) + 1] = notopenidx;
			}
		}

		for(let i in imageIndex.notopen){
			let role = rolegroup.getChildByName(`role${i}`);
			rolegroup.setChildIndex(role, imageIndex.notopen[i]);
		}

		for(let i in imageIndex.nothave){
			let role = rolegroup.getChildByName(`role${i}`);
			rolegroup.setChildIndex(role, imageIndex.nothave[i] + Object.keys(imageIndex.notopen).length);
		}

		for(let i in imageIndex.have){
			let role = rolegroup.getChildByName(`role${i}`);
			rolegroup.setChildIndex(role, imageIndex.have[i] + Object.keys(imageIndex.notopen).length + Object.keys(imageIndex.nothave).length);
		}
	}
	
	public refresh():void{
		let view = this;
		view._reddotgroup.visible = Api.encounterVoApi.checkRed(view._data.type);
		let rolegroup = <BaseDisplayObjectContainer>view.getChildByName(`rolegroup`); 
		for(let i in view._data.need){
			let unit = view._data.need[i];
			let rewardvo = GameData.formatRewardItem(unit)[0];
			let str = ``;
			let info = Api.encounterVoApi.getNeedInfo(view._data.type, rewardvo.id.toString());
			let role = rolegroup.getChildByName(`role${Number(i) + 1}`); 
			if(role){
				if(info.isopen){
					//已解锁
					
					if(info.have && Api.encounterVoApi.getActiveBuffIndex(view._data.type, Number(i) + 1)){
						App.DisplayUtil.changeToNormal(role);
					}
					else{
						App.DisplayUtil.changeToAlpha(role);
					}
				}
			}
		}
		// view.setIndex();
	}

   /**
	 * 不同格子X间距
	 */
	public getSpaceX():number
	{
		return 0;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 0;
	}
	public dispose():void{
		let view = this;
		view._reddotgroup = null;
		view.removeTouchTap();
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        super.dispose();
    }
}