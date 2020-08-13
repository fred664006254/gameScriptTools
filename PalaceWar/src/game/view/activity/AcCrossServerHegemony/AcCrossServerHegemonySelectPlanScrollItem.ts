/**
 * 选择计策的item
 * author jiangly
 * date 2018/10/15
 * @class AcCrossServerHegemonySelectPlanScrollItem
 */
class AcCrossServerHegemonySelectPlanScrollItem extends ScrollListItem {

	public constructor() {
		super();
	}

	public initItem(index: number, data: any,itemParam:any): void {
// 		id: 1
// item: "2201"
// moreguest: 1
// powerdown: 0
// powerup: 0
// wins: 0
		this.width = 510;
		let bg = BaseBitmap.create("public_9_bg94");
		bg.width = this.width;
		bg.height = 140;
		this.addChild(bg);
		// console.log(index,data,itemParam);
		let itemNum = Api.itemVoApi.getItemNumInfoVoById(data.itemID) || 0;
		let itemCfg = Config.ItemCfg.getItemCfgById(data.itemID);

		let itemDB = GameData.getItemIcon(itemCfg, false, false, false, itemNum);
		itemDB.setPosition(bg.x + 15,bg.y + bg.height / 2 - itemDB.height / 2);
		this.addChild(itemDB)

		// if(itemNum && itemNum > 0)
		// {
		// 	let itemNumTxt = ComponentManager.getTextField(String(itemNum),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		// 	itemNumTxt.setPosition(itemDB.x + itemDB.width - 6 - itemNumTxt.width, itemDB.y + itemDB.height - 6 - itemNumTxt.height);
		// 	this.addChild(itemNumTxt)
		// }


		let itemNameTxt = ComponentManager.getTextField(itemCfg.name,TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_WARN_GREEN4);
		itemNameTxt.setPosition(itemDB.x + itemDB.width + 15,bg.y + 20);
		this.addChild(itemNameTxt);

		
		let itemDescTxt = ComponentManager.getTextField(itemCfg.desc,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		// if(PlatformManager.checkIsKRSp() || PlatformManager.checkIsJPSp() || PlatformManager.checkIsViSp()||PlatformManager.checkIsKRNewSp()){
		// 	itemDescTxt.size = 18;
		// }
		itemDescTxt.width = 220;
		itemDescTxt.lineSpacing = 3;
		itemDescTxt.setPosition(itemNameTxt.x ,itemNameTxt.y + itemNameTxt.height + 10);
		this.addChild(itemDescTxt);
		
		let useBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"useBtn",()=>{
			ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYUSEPLANPOPUPVIEW,{"itemCfg":itemCfg,"itemNum":itemNum,"cfgId":data.id,aid:itemParam.aid,code:itemParam.code,matchId:itemParam.matchId,servantInfo:itemParam.servantInfo});
		},this,null,null,null,TextFieldConst.COLOR_BLACK);
		useBtn.setPosition(bg.x + bg.width - useBtn.width - 5,bg.y + bg.height / 2 - useBtn.height / 2);
		this.addChild(useBtn);

		let useBM = BaseBitmap.create("awused");
		useBM.setPosition(useBtn.x + useBtn.width / 2 - useBM.width / 2,useBtn.y + useBtn.height / 2 - useBM.height / 2);
		this.addChild(useBM);

		// let myInfo = Api.allianceWarVoApi.getMyInfo();
		let myInfo = Api.crossServerHegemonyVoApi.getMyInfo();
		// console.log("myInfo--->",myInfo);
		if(myInfo&&myInfo['stra'])
		{
			if(myInfo['stra'] == data.id)
			{
				useBM.setVisible(true);
				useBtn.setVisible(false);
			}
			else
			{
				useBM.setVisible(false);
				useBtn.setVisible(true);
				useBtn.setEnable(false);
			}
			return;
		}
		else
		{
			useBM.setVisible(false);
			useBtn.setVisible(true);
			// if(itemNum && itemNum > 0)
			// {
			// 	useBtn.setEnable(true);
			// }
			// else
			// {
			// 	useBtn.setEnable(false);
			// }
		}
		


	}
	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {

		super.dispose();
	}
}