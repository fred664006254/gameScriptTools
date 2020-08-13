/**
 * 	圣诞活动奖励预览
 * author 张朝阳
 * date 2018/11/27
 * @class AcChristmasView
 */
class AcChristmasRewardPopupView extends PopupView {
	public constructor() {
		super();
	}

	protected initView(): void {
		let floorRewardList: {id:string, reward: string, weight: number, isLight: boolean }[] = this.param.data.floorRewardList;
		let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
		let acCfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
		let floor =  Number(this.param.data.floor);
		let topStr = "";
		if(vo.getFloor() >= 4)
		{
			topStr = LanguageManager.getlocal("acChristmasRewardPopupViewTopDesc_11");
			if(this.isValentines()||this.getUiCode() || this.isMagpieBridge())
			{
				topStr = LanguageManager.getlocal("acChristmasRewardPopupViewTopDesc_11_" + this.param.data.code);
			}
		}
		else
		{
			topStr = LanguageManager.getlocal("acChristmasRewardPopupViewTopDesc");
			if(this.isValentines()||this.getUiCode() || this.isMagpieBridge())
			{
				topStr = LanguageManager.getlocal("acChristmasRewardPopupViewTopDesc_" + this.param.data.code);
			}
		}
		let topTxt = ComponentManager.getTextField(topStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		topTxt.setPosition(this.viewBg.x + this.viewBg.width / 2 - topTxt.width / 2, 5);
		this.addChildToContainer(topTxt);

		let rewardBg = BaseBitmap.create("public_9_probiginnerbg");
		rewardBg.width = 530;
		rewardBg.height = 400;
		rewardBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardBg.width / 2, topTxt.y + topTxt.height + 5);
		this.addChildToContainer(rewardBg);

		let rect = new egret.Rectangle(0,0,rewardBg.width - 6,rewardBg.height - 15)
		let scrollList = ComponentManager.getScrollList(AcChristmasRewardScrollItem,floorRewardList,rect,{aid:this.param.data.aid,code:this.param.data.code,floor:this.param.data.floor});
		scrollList.setPosition(rewardBg.x + rewardBg.width / 2 - scrollList.width / 2,rewardBg.y + 7);
		this.addChildToContainer(scrollList);

		let buttomBg = BaseBitmap.create("public_9_downbg");
		buttomBg.width = 548;
		buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, rewardBg.y + rewardBg.height + 10);
		this.addChildToContainer(buttomBg);

		let haveRewardStr = "";
		if(vo.getFloor() >= 4)
		{
			haveRewardStr = LanguageManager.getlocal("acChristmasRewardPopupViewHaveReward",[String(acCfg.cost2)]);
			if(this.isValentines()||this.getUiCode() || this.isMagpieBridge())
			{
				haveRewardStr = LanguageManager.getlocal("acChristmasRewardPopupViewHaveReward_" + this.param.data.code,[String(acCfg.cost2)]);
			}
		}
		else
		{
			haveRewardStr = LanguageManager.getlocal("acChristmasRewardPopupViewHaveReward",[String(acCfg.getFloorCost(String(floor)))])
			if(this.isValentines()||this.getUiCode() || this.isMagpieBridge())
			{
				haveRewardStr = LanguageManager.getlocal("acChristmasRewardPopupViewHaveReward_" + this.param.data.code,[String(acCfg.getFloorCost(String(floor)))]);
			}
		}
		let haveRewardTxt = ComponentManager.getTextField(haveRewardStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		haveRewardTxt.setPosition(buttomBg.x + 12, buttomBg.y + 12);
		this.addChildToContainer(haveRewardTxt);
		let rewardNumStr = ""
		if(vo.getFloor() >= 4)
		{
			rewardNumStr = LanguageManager.getlocal("acChristmasRewardPopupViewRewardNum_11");
		}
		else
		{
			rewardNumStr = LanguageManager.getlocal("acChristmasRewardPopupViewRewardNum", [String(vo.getFloorValue(floor)), String(acCfg.getFloorStarNum(String(floor)))]);
		}
		let rewardNumTxt = ComponentManager.getTextField(rewardNumStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		rewardNumTxt.setPosition(buttomBg.x + buttomBg.width - rewardNumTxt.width - 12, buttomBg.y + 12);
		this.addChildToContainer(rewardNumTxt);

		let buttomDescStr = LanguageManager.getlocal("acChristmasRewardPopupViewButtomDesc");
		if(this.isValentines()||this.getUiCode() || this.isMagpieBridge())
		{
			buttomDescStr = LanguageManager.getlocal("acChristmasRewardPopupViewButtomDesc_" + this.param.data.code);
		}
		if(Number(this.param.data.floor) == 3)
		{
			buttomDescStr = LanguageManager.getlocal("acChristmasRewardPopupViewButtomDesc_2");
			if(this.isValentines()||this.getUiCode())
			{
				buttomDescStr = LanguageManager.getlocal("acChristmasRewardPopupViewButtomDesc_2_" + this.param.data.code);
			}
		}
		if(vo.getFloor() >= 4||this.getUiCode())
		{
			buttomDescStr = LanguageManager.getlocal("acChristmasRewardPopupViewButtomDesc_11");
			if(this.isValentines()||this.getUiCode() || this.isMagpieBridge())
			{
				buttomDescStr = LanguageManager.getlocal("acChristmasRewardPopupViewButtomDesc_11_" + this.param.data.code);
			}
		}
		let buttomDescTxt = ComponentManager.getTextField(buttomDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		buttomDescTxt.width = 524;
		buttomDescTxt.lineSpacing = 3;
		buttomDescTxt.setPosition(buttomBg.x + 12, haveRewardTxt.y + haveRewardTxt.height + 3);
		this.addChildToContainer(buttomDescTxt);

		buttomBg.height += buttomDescTxt.height + 5;


	}
	/**是否情人节 */
    private isValentines() {
        if (this.param.data.code == "3" || this.param.data.code == "4") {
            return "3";
        }
        return null;
    }

	protected getUiCode(): string {
        if (this.param.data.code == "5") {
            return "5"
        }
        return null;
    }

	 /**是否为鹊桥相会 7泰国*/
    protected isMagpieBridge(){
        if (this.param.data.code == "6" || this.param.data.code == "7"){
            return "6";
        }
        return null;
    }
	protected getResourceList(): string[] {
        return super.getResourceList().concat([
            "acchristmasview_smalldescbg"
        ]);
    }
	protected getTitleStr(): string {
		return "acChristmasRewardPopupViewTitle";
	}
	public dispose(): void {
		super.dispose();
	}
}